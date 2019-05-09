const express = require('express')
const router = express.Router()

const token = require('../utils/getToken')
const ddAuth = require('../controller/ddAuth')
const repair = require('../controller/repair')
const repairType = require('../controller/repairType')
const user = require('../controller/user')
const maintain = require('../controller/maintain')
const {checkSession} = require('../utils/public')

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

router.use('/dd',ddAuth)        //调用dd方法接口
router.use('/repair', checkSession, repair)    // 调用报修单接口
router.use('/repairType', checkSession, repairType)    // 调用报修类型接口
router.use('/maintain', checkSession, maintain)        // 调用维修单接口
router.use('/user',user)                // 调用用户接口

module.exports = router;
