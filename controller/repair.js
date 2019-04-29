/**
 * Created by GFY on 2019-04-20.
 * 报修单接口
 */
const express = require('express')
const router  = express.Router()

const repairModel = require('../model/repair')
let {getTimeNum} = require('../utils/public')

/**
 * 添加报修单
 */
router.post('/add', async (req, res, next) => {
    let {user, type, images, remark, address} = req.body
    let timeNum = getTimeNum()
    let count = await repairModel.find().count()
    count = count < 10 ? `00${count}` : (count < 100 ? `0${count}` : count)
    let repairNum = `BX${timeNum}${count}`
    let repair = await repairModel.create({code: repairNum, user, type, images, remark, address, status:1})
    res.json({
        code: 200,
        msg: '添加成功',
        data: repair
    })
})
/**
 * 获取报修单 (id: 用户id，status：报修单状态状态)
 */
router.get('/get', async (req, res, next) => {
    try {
        let {id = '', status = '', time = ''} = req.query
        let data = {}
        if (id !== '') data.user = id
        if (status !== '') {
            status = parseInt(status)
            data.status = status
        }
        console.log(data)
        if (time !== '') data.createdTime = time
        let  repairList = await repairModel.find(data)
            .populate({
                path: 'type'
            })
            .populate({
                path: 'user'
            }).sort({_id: -1})
        res.json({
            code: 200,
            msg: '报修单列表',
            data: repairList
        })
    } catch (e) {
        next(e)
    }
})
/**
 * 获取报修单详情
 */
router.get('/getDetail', async (req, res, next) => {
    try {
        let {id} = req.query
        let repair = await repairModel.findOne({_id: id})
            .populate({
                path: 'type'
            }).populate({
                path: 'user'
            })
        res.json({
            code: 200,
            msg: '报修单详情',
            data: repair
        })
    } catch (e) {
        next(e)
    }
})
/**
 * 修改报修单状态status
 * @type {Router|router|*}
 */
router.post('/updateStatus', async (req,res,next) =>{
    try {
        let { _id,status,rejectMsg} =req.body
        let repairs = await repairModel.findOne({_id : _id})
        if(repairs){
            await repairModel.updateOne({_id : _id},{$set :{status,rejectMsg}})
            res.json({
                code : 200,
                msg :"修改成功"
            })
        }
    }catch(e){
        next(e)
    }
})

module.exports = router