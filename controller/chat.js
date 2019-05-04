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
        let {month} =req.query
        month=parseInt(month)
        if(month == 0){
            //全部
            let typesCount = await repairModel.aggregate([{$group: {
                    _id: "type",
                    count: {$sum: 1}
                }}])
            let types = await repairTypeModel.find()
            res.json({
                code: 200,
                msg: '报表数据',
                data: {
                    typesCount,
                    types
                }
            })
        }
    }catch(e){
        next(e)
    }
})
module.exports = router