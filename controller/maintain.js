/**
 * Created by GFY on 2019-04-20.
 * 维修单接口
 */
const express = require('express')
const router  = express.Router()

const maintainModel = require('../model/maintain')
const repairModel = require('../model/repair')
let {getTimeNum,getStartEnd} = require('../utils/public')

/**
 * 接单
 */
router.post('/takeOrder', async (req, res, next) => {
    try {
        let {user, id} = req.body
        let repair = await repairModel.findOne({_id: id})
        if (repair.status === 3) {
            res.json({
                code: 200,
                msg: '来晚了一步，订单已被接收',
            })
        } else {
            let timeNum = getTimeNum()
            let count = await maintainModel.find().count()
            count = count < 10 ? `00${count}` : (count < 100 ? `0${count}` : count)
            let code = `WX${timeNum}${count}`
            await repairModel.update({_id: id},{status: 3, maintainCode: code})
            let maintain = await maintainModel.create({code,user,repairsId: id, status: 1})
            res.json({
                code: 200,
                msg: '接单成功',
                data: maintain
            })
        }
    } catch (e) {
        next(e)
    }
})
/**
 * 获取维修单
 */
router.get('/get', async (req, res, next) => {
    try {
        let {id='', status='', month = ''} = req.query
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
        console.log(data);
        let maintain = await maintainModel.find(data)
            .populate({
                path: 'repairsId',
                populate: {
                    path: 'user type'
                }
            })
            .populate({
                path: 'user'
            }).sort({updatedAt: -1})
        res.json({
            code: 200,
            msg: '维修单列表',
            data: maintain
        })
    } catch (e) {
        next(e)
    }
})
/**
 * 获取维修单详情
 */
router.get('/getDetail', async (req, res, next) => {
    let {id} = req.query
    let maintain = await maintainModel.findOne({_id: id})
        .populate({
            path: 'repairsId',
            populate: {
                path: 'user type'
            }
        })
        .populate({
            path: 'user'
        })
    res.json({
        code: 200,
        msg: '维修单详情',
        data: maintain
    })
})
/**
 * 更新维修单信息
 */
router.post('/update', async (req, res, next) => {
    try {
        let {_id = '', rejectMsg='', images = '', remark = '', status = 2} = req.body
        let data = {}
        if (images !== '') data.images = images
        if (remark !== '') data.remark = remark
        if (rejectMsg !== '') data.rejectMsg = rejectMsg
        data.status = status
        if(status === 3) {
            let maintain = await maintainModel.findOne({_id})
            await repairModel.updateOne({_id: maintain.repairsId},{$set: {status:4}})
        }
        await maintainModel.updateOne({_id},{$set: data})
        res.json({
            code: 200,
            msg: '修改成功'
        })
    } catch (e) {
        next(e)
    }
})

/**
 * 评价
 */
router.post('/evaluate', async (req, res, next) => {
    try {
        let {repairId, id, serverLevel, level, comment = ''} = req.body
        await repairModel.updateOne({_id: repairId},{$set: {status: 5}})
        await maintainModel.updateOne({_id: id},{$set: {serverLevel, level, comment, status: 4}})
        res.json({
            code: 200,
            msg: '评价完成'
        })
    } catch (e) {
        next(e)
    }
})

module.exports = router