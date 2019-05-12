/**
 * Created by GFY on 2019-04-19.
 * 调用钉钉接口
 */
const express = require('express')
const router = express.Router()
const axios = require('axios')
const userModel = require('../model/user')

const sid = "ab6ec8db929dd73c97948eb9b1405fa7"
const token = "d71da22ef74b69708bda0ce4ace0e017"
const appid = "0c1ef18e555f48148dd1cac1f9c32ebf"
const templateid ="462575"

/**
 * 获取验证码
 */
router.get('/getCode', (req, res) => {
    let {mobile} = req.query
    let param = ''
    for (let i = 0; i < 6; i++) {
        param += ''+parseInt(Math.random()*10)
    }
    let postData={
        sid,
        token,
        appid,
        templateid,
        param,
        mobile
    }
    axios.post('https://open.ucpaas.com/ol/sms/sendsms', postData).then(response => {
        if (response.data.code === '000000') {
            req.code = param
            req.phone=mobile
            res.json({
                message: '发送成功',
                code: response.data
            });
        } else {
            res.json({
                message: '请求失败',
                code: response.data
            });
        }
    })

})
/**
 * 验证手机号是否为普通管理员
 */
router.post('/checkPhone', async (req,res,next)=>{
    try{
        let {phone}=req.body
       let userInfo = await userModel.findOne({phone,level:0})
        if(userInfo){
            res.json({
                code:200,
                msg:"存在该用户"
            })
        }else{
            res.json({
                code:203,
                msg:"不存在该用户"
            })
        }

    }catch(e){
        next(e)
    }
})

/**
 * 验证验证码
 */
router.post('/conform', (req, res) => {
    try {
        let {phone,password}=req.body
        if(phone == req.phone && password == req.code){
            res.json({
                code:200,
                msg:"验证通过"
            })
        }else{
            res.json({
                code:203,
                msg:"验证不通过"
            })
        }


    }catch(e){
        next(e)
    }
})
/**
 * 设置新密码
 * @type {Router|router|*}
 */
router.post('/setNewPass',async (req,res,next)=>{
    try {
        let {phone,password}=req.body
        let admin = await userModel.findOne({phone:phone,level:0})
        if(admin){
            await userModel.updateOne({phone,level:0},{$set:{password}})
            res.json({
                code:200,
                msg:"修改成功"
            })
        }
    }catch(e){
        next(e)
    }
})

module.exports = router