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
            console.log(date)
            data.createdTime = {$gt: data.start, $lte: date.end}
        }
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
 * 报修单搜索（全部：-1，未通过：0，待审核：1，已通过：2）
 * @type {Router|router|*}
 */
router.get('/search' ,async (req,res,next)=>{
    try{
        let repairs = []
        let {status}=req.query
        status = parseInt(status)
        if(status === -1){
            repairs = await repairModel.find()
                .populate({
                    path: 'user'
                }).populate({
                    path: 'type'
                })
            res.json({
                code:200,
                msg: "搜索成功",
                status:-1,
                data:repairs
            })
        }else{
            repairs = await repairModel.find({status:status})
                .populate({
                    path: 'user'
                }).populate({
                    path: 'type'
                })
            res.json({
                code:200,
                msg: "搜索成功",
                status:status,
                data:repairs
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

module.exports = router