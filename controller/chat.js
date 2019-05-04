/**
 * Created by Administrator on 2019/5/4 0004.
 */
const express = require('express')
const router  = express.Router()

const repairModel = require('../model/repair')
const repairTypeModel = require('../model/repairType')
/**
 * 维修类型统计  按月 饼状图
 * @type {Router|router|*}
 */
router.get('/getType',async(req,res,next) =>{
    try{
        let {month = 0} =req.query
        month = parseInt(month)
        let time = new Date(month)
        let Year =time.getFullYear()
        let Month = time.getMonth()+1
        let Next = Month+1
        let timeCon = new Date(`${Year}-${Month}-01 00:00:00`)
        let nextTime = new Date(`${Year}-${Next}-01 00:00:00`)
        console.log(timeCon)
        console.log(nextTime)
        let typesCount = []
        if (month == 0) {
             typesCount = await repairModel.aggregate([
                {$group: {_id: "$type",count: {$sum: 1}}}])
        } else {
            typesCount = await repairModel.aggregate([
                {$group: {_id: "$type",count: {$sum: 1}}},
                {$match: {createdTime: { $gte : timeCon, $lt : nextTime }}}])
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