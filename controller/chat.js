/**
 * Created by Administrator on 2019/5/4 0004.
 */
const express = require('express')
const router  = express.Router()

const repairModel = require('../model/repair')
const maintainModel = require('../model/maintain')
const repairTypeModel = require('../model/repairType')
const userModel = require('../model/user')
let {getStartEnd} = require('../utils/public')
/**
 * 报修类型统计  按月 饼状图
 * @type {Router|router|*}
 */
router.get('/getType',async(req,res,next) =>{
    try{
        let {month = 0} =req.query
        let date = getStartEnd(month)
        let typesCount = []
        if (month == 0) {
             typesCount = await repairModel.aggregate([
                {$group: {_id: "$type",count: {$sum: 1}}}])
        } else {
            typesCount = await repairModel.aggregate([
                {$match: {createdTime: {$gt: date.start, $lte: date.end }}},
                {$group: {_id: "$type",count: {$sum: 1}}}])
        }
        let types = await repairTypeModel.find()
        let seriesData = []
        types.forEach(item => {
            let _index = -1
            typesCount.forEach((count, index) => {
                if (item._id.toString() === count._id.toString()) {
                    _index = index
                }
            })
            seriesData.push({
                name: item.name,
                value: _index === -1 ? 0 : typesCount[_index].count
            })
        })
        let legendData = types.map(item => {
            return item.name
        })
        res.json({
            code: 200,
            msg: '报表数据',
            data: {
                seriesData,
                legendData
            }
        })

    }catch(e){
        next(e)
    }
})

/**
 * 维修人员 完成单量对比 按月  柱状图
 */
router.get('/getRepairMatch',async(req,res,next)=>{
    try{
        let {month = 0} =req.query
        month = parseInt(month)
        let date = getStartEnd(month)
        let repairPeo=[]
        let repair = await userModel.find({level:1})
        if(month == 0){
            repairPeo = await maintainModel.aggregate([
                {$match: {status: {$gte: 3}}},
                {$group: {_id: "$user",count: {$sum: 1}}}])
        }else{
            repairPeo = await maintainModel.aggregate([
                {$match: {status: {$gte: 3}}},
                {$match: {createdTime: {$gt: date.start, $lte: date.end }}},
                {$group: {_id: "$user",count: {$sum: 1}}}])
        }
        let peoData = []
        let index
        for (let i = 0; i < repair.length; i++) {
            index = -1
            for (let j = 0; j < repairPeo.length; j++) {
                if (repair[i]._id.toString() == repairPeo[j]._id.toString()) {
                    index = j
                }
            }
            if (index === -1) {
                peoData.push(0)
            } else {
                peoData.push(repairPeo[index].count)
            }
        }
        repair = repair.map(item => {
            return item.name
        })
        res.json({
            code: 200,
            msg: '维修员完成量统计',
            sumData: peoData,
            userData: repair
        })

        }catch(e){
        next(e)
        }
})

module.exports = router