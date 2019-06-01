const express = require('express')
const router = express.Router()
const path = require('path')

const token = require('../utils/getToken')
const repair = require('../controller/repair')
const ddAuth = require('../controller/ddAuth')
const message = require('../controller/forgetPassword')
const repairType = require('../controller/repairType')
const user = require('../controller/user')
const maintain = require('../controller/maintain')
const chat = require('../controller/chat')
const {checkSession} = require('../utils/public')
const store = require('../utils/store')

/**
 * 获取七牛的token
 */
router.get('/getToken', (req, res) => {
    res.json({
        code: 200,
        data: token(),
        msg: '获取成功'
    })
})
/* GET home page. */
router.get('/', function(req, res, next) {
    let {code} = req.query
    store.setCode(code)
    res.sendFile(path.resolve(__dirname, './admin.html'))
});
router.use('/dd',ddAuth)        //调用dd方法接口
router.use('/message',message)        //获取短信验证码接口
router.use('/repair', checkSession, repair)    // 调用报修单接口
router.use('/repairType', checkSession, repairType)    // 调用报修类型接口
router.use('/maintain', checkSession, maintain)        // 调用维修单接口
router.use('/chat', chat)                    // 调用统计接口
router.use('/user',user)                // 调用用户接口

module.exports = router;
