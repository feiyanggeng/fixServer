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
                    req.session.userinfo = userInfo
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
/**
 * 添加维修人员
 * @type {Router|router|*}
 */
router.post('/addRepair' , async (req,res,next) =>{
    try{
        let {name,phone,address,sex} =req.body
        await userModel.deleteOne({phone: '18438610510'})
        let userInfo = await userModel.findOne({phone})
        if(userInfo){
            res.json({
                code :301,
                msg:"已存在"
            })
        }else{
            await userModel.create({name,phone,address,sex,level:1})
            res.json({
                code :200,
                msg:"添加成功"
            })
        }
    }catch(e){
        next(e)
    }
})
/**
 * 修改维修人员
 * @type {Router|router|*}
 */
router.post('/updateRepair', async (req,res,next) =>{
    try {
        let {_id,name,phone,address,sex} = req.body
        await userModel.updateOne({_id:_id},{$set: {name,phone,address,sex}})
        res.json({
            code:200,
            msg:"修改成功"
        })
    }catch(e){
        next(e)
    }
})
/**
 * 删除维修人员
 * @type {Router|router|*}
 */
router.post('/delRepair',async (req,res,next) =>{
    try {
        let {_id}=req.body
        await userModel.deleteOne({_id:_id})
        res.json({
            code:200,
            msg:"删除成功"
        })
    }catch(e){
        next(e)
    }


})
/**
 * 获取维修人员列表
 * @type {Router|router|*}
 */
router.get('/getRepair', async (req,res,next) =>{
    try {
        let repair = await userModel.find({level:1})
        res.json({
            code: 200,
            data: repair,
            msg: '获取维修人员成功'
        })
    }catch(e){
        next(e)
    }
})

/**
 * 添加管理员
 * @type {Router|router|*}
 */
router.post('/addAdmin' , async (req,res,next) =>{
    try{
        let {name,phone,address,sex} =req.body
        let userInfo = await userModel.findOne({phone})
        if(userInfo){
            res.json({
                code :301,
                msg:"已存在"
            })
        }else{
            await userModel.create({name,phone,address,sex,level:0})
            res.json({
                code :200,
                msg:"添加成功"
            })
        }
    }catch(e){
        next(e)
    }
})
/**
 * 修改管理员
 * @type {Router|router|*}
 */
router.post('/updateAdmin', async (req,res,next) =>{
    try {
        let {_id,name,phone,address,sex} = req.body
        await userModel.updateOne({_id:_id},{$set: {name,phone,address,sex}})
        res.json({
            code:200,
            msg:"修改成功"
        })
    }catch(e){
        next(e)
    }
})
/**
 * 删除管理员
 * @type {Router|router|*}
 */
router.post('/delAdmin',async (req,res,next) =>{
    try {
        let {_id}=req.body
        await userModel.deleteOne({_id:_id})
        res.json({
            code:200,
            msg:"删除成功"
        })
    }catch(e){
        next(e)
    }


})
/**
 * 获取管理员
 * @type {Router|router|*}
 */
router.get('/getAdmin', async (req,res,next) =>{
    try {
        let repair = await userModel.find({level:0})
        res.json({
            code: 200,
            data: repair,
            msg: '获取管理员成功'
        })
    }catch(e){
        next(e)
    }
})
module.exports = router