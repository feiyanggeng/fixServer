/**
 * Created by Administrator on 2019/5/4 0004.
 */
const express = require('express')
const router  = express.Router()

const repairModel = require('../model/repair')
const repairTypeModel = require('../model/repairType')
let {getStartEnd} = require('../utils/public')
/**
 * 维修类型统计  按月 饼状图
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
module.exports = router