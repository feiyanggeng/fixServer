/**
 * Created by GFY on 2019-04-19.
 * 调用钉钉接口
 */
const express = require('express')
const router = express.Router()
const https = require('https')

const sid = "ab6ec8db929dd73c97948eb9b1405fa7"
const  token = "d71da22ef74b69708bda0ce4ace0e017"
const  appid = "0c1ef18e555f48148dd1cac1f9c32ebf"
const  templateid ="462575"

router.get('/forget', (req, res) => {
    let {mobile} = req.query
    let postData=JSON.stringify({
        sid,
        token,
        appid,
        templateid,
        mobile,
    })
    const options = {
        hostname: 'open.ucpaas.com',
        port: 3030,
        path: '/ol/sms/sendsms',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const request = https.request(options, (data) => {
        data.on('data', (chunk) => {
            let response =JSON.parse(chunk.toString())
            res.json({
                code: 200,
                data: response
            })
        });
    });

    request.end();

})

module.exports = router