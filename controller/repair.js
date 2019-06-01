/**
 * Created by GFY on 2019-04-20.
 * 报修单接口
 */
const express = require('express')
const router  = express.Router()

const maintainModel = require('../model/maintain')
const repairModel = require('../model/repair')
let {getTimeNum, getStartEnd} = require('../utils/public')

/**
 * 添加报修单
 */
router.post('/add', async (req, res, next) => {
    let {_id='', user, type, images, remark, address} = req.body
    if (user == '' || type == '' || remark == '' || address == '') {
        res.json({
            code: 401,
            msg: '参数不能为空'
        })
    } else {
        let timeNum = getTimeNum()
        let count = await repairModel.find().count()
        count = count < 10 ? `00${count}` : (count < 100 ? `0${count}` : count)
        let repairNum = `BX${timeNum}${count}`
        if (_id !== '') {
            await repairModel.updateOne({_id},{$set: {images, remark, address, status: 1}})
            res.json({
                code: 200,
                msg: '修改成功',
                data: ''
            })
        } else {
            let repair = await repairModel.create({code: repairNum, user, type, images, remark, address, status:1})
            res.json({
                code: 200,
                msg: '添加成功',
                data: repair
            })
        }
    }
})
/**
 * 获取报修单 (id: 用户id，status：报修单状态状态)
 */
router.get('/get', async (req, res, next) => {
    try {
        let {id = '', status = '', month = ''} = req.query
        let data = {}
        if (id !== '') data.user = id
        if (status !== '') {
            status = parseInt(status)
            data.status = status
        }
        if (month !== '') {
            let date = getStartEnd(month)
            data.createdTime = {$gt: date.start, $lte: date.end}
        }
        console.log(data)
        let  repairList = await repairModel.find(data)
            .populate({
                path: 'type'
            })
            .populate({
                path: 'user'
            })
            .sort({updatedAt: -1})
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

/**
 * 根据维修单code获取维修单详情
 */
router.get('/maintainDetail', async (req, res, next) => {
    let {code = ''} = req.query
    let order = await maintainModel.findOne({code})
        .populate({
            path: 'repairsId',
            populate: {
                path: 'user type'
            }
        }).populate({
            path: 'user'
        })
    res.json({
        code: 200,
        msg: '维修单详情',
        data: order
    })
})

/**
 * 删除type为空的数据
 */
router.get('/delRepairNull', async (req, res, next) => {
    await repairModel.deleteMany({})
    await maintainModel.deleteMany({})
    res.json({
        code: 200,
        msg: '数据清除完成'
    })
})


module.exports = router