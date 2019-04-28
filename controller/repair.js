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
    let count = await repairModel.find()
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
 * 获取报修单
 */
router.get('/get', async (req, res, next) => {
    try {
        let {id = '', status = ''} = req.query
        if (status !== '') status = parseInt(status)
        let repairList = []
        if (id === '' && status == '') {
            repairList = await repairModel.find()
        } else if (status !== '' && id === '') {
            repairList = await repairModel.find(status)
        } else {
            repairList = await repairModel.find({user: id, status})
        }
        res.json({
            code: 200,
            msg: '维修单列表',
            data: repairList
        })
    } catch (e) {
        next(e)
    }
})

module.exports = router