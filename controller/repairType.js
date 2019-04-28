/**
 * Created by GFY on 2019-04-20.
 * 报修类型接口
 */
const express = require('express')
const router  = express.Router()

const repairTypeModel = require('../model/repairType')

/**
 * 获取所有报修类型
 */
router.get('/getAll', async (req, res, next) => {
    try {
        let repairTypes = await repairTypeModel.find()
        res.json({
            code: 200,
            data: repairTypes,
            msg: '报修分类'
        })
    } catch (e) {
        next(e)
    }
})

module.exports = router