/**
 * Created by GFY on 2019-04-19.
 * 调用钉钉接口
 */
const express = require('express')
const router = express.Router()
const axios = require('axios')

const sid = "ab6ec8db929dd73c97948eb9b1405fa7"
const token = "d71da22ef74b69708bda0ce4ace0e017"
const appid = "0c1ef18e555f48148dd1cac1f9c32ebf"
const templateid ="462575"

router.get('/forget', (req, res) => {
    let {mobile} = req.query
    let param = ''
    for (let i = 0; i < 6; i++) {
        param += ''+parseInt(Math.random()*10)
    }
    console.log(param)
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

module.exports = router