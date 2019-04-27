/**
 * Created by GFY on 2019-04-19.
 * 调用钉钉接口
 */
const express = require('express')
const router = express.Router()
const https = require('https')

/**
 * 钉钉小程序密匙
 */
let appSecret = 'wuyYZMFD5pJMoGWxoY7_6XBmZod3ZrIO7udbi1YBzX0HfLZoC88vlxGI5F259ruv'
let appKey = 'dingitaqpojj1jlcn2z5'
/**
 * 获取access_token
 */
function getAccessToken() {
    return new Promise((reslove, reject) => {
        https.get(`https://oapi.dingtalk.com/gettoken?appkey=${appKey}&appsecret=${appSecret}`, (res) => {
            res.on('data', (d) => {
                let data =JSON.parse(d.toString())
                if (data.errcode === 0) {
                    reslove(data.access_token)
                } else {
                    reject('数据请求失败')
                }
            })
        })
    })
}
/**
 * 获取userid
 */
function getUserId(accessToken, code) {
    return new Promise((reslove, reject) => {
        https.get(`https://oapi.dingtalk.com/user/getuserinfo?access_token=${accessToken}&code=${code}`, (response) => {
            response.on('data', (d) => {
                let data =JSON.parse(d.toString())
                if (data.errcode === 0) {
                    reslove(data.userid)
                } else {
                    reject(data)
                }
            })
        })
    })
}
/**
 * 获取userMessage
 */
function getUserMessage(accessToken,userId) {
    return new Promise((reslove, reject) => {
        https.get(`https://oapi.dingtalk.com/user/get?access_token=${accessToken}&userid=${userId}`, response => {
            response.on('data', (d) => {
                let data = JSON.parse(d.toString())
                if (data.errcode === 0) {
                    reslove(data)
                } else {
                    reject(data)
                }
            })
        })
    })
}

router.get('/getMessage', (req, res) => {
    let {code} = req.query
    getAccessToken().then(accessToken => {
        getUserId(accessToken, code).then(userid => {
            getUserMessage(accessToken, userid).then(userInfo => {
                res.json({
                    code:200,
                    message: '数据请求成功',
                    data: userInfo
                })
            }).catch(err => {
                res.json({
                    code: 400,
                    message: '数据请求失败',
                    err
                })
            })
        }).catch(err => {
            res.json({
                code: 400,
                msg: '数据请求失败',
                data: err
            })
        })
    })
})

module.exports = router