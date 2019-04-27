/**
 * Created by GFY on 2019-04-20.
 * 用户接口
 */
const express = require('express')
const router = express.Router()

const userModel = require('../model/user')

/**
 * 钉钉平台登录
 */
router.post('/ddLogin', async (req, res, next) => {
    try {
        let {name, avatar, phone} = req.body
        let userInfo = await userModel.findOne({phone})
        if (!userInfo) {
            userInfo = await userModel.create({name, avatar, phone, level: 2, password: phone})
        }
        req.session.userinfo = userInfo
        res.json({
            code: 200,
            data: userInfo,
            msg: '获取成功'
        })
    } catch (e) {
        next(e)
    }
})
/**
 * 后台管理系统  登录
 */
router.post('/adminLogin', async (req, res, next) => {
    try {
        let {phone, password} = req.body
        let userInfo = await userModel.findOne({phone})
        if (userInfo) {
            if (userInfo.level === 0) {
                //管理员
                if (password === userInfo.password) {
                    res.json({
                        code: 200,
                        data: userInfo,
                        msg: '登录成功'
                    })
                } else {
                    res.json({
                        code: 202,
                        msg: '密码错误'
                    })
                }

            } else {
                res.json({
                    code: 203,
                    msg: '身份错误'
                })
            }

        }
    } catch (e) {
        next(e)
    }
})

module.exports = router