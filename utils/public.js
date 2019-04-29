/**
 * Created by GFY on 2019-04-22.
 */

/**
 * 校验session中间层
 * @param req
 * @param res
 * @param next
 */
function checkSession(req, res, next) {
    let userInfo = req.session.userinfo
    if (userInfo) {
        next()
    } else {
        res.json({
            code: 403,
            msg: '用户登录信息失效'
        })
    }
}

function getTimeNum () {
    let date = new Date()
    let fullYear = date.getFullYear()
    let month = date.getMonth()
    month = month + 1 < 10 ? `0${month+1}` : month+1
    let day = date.getDate()
    return `${fullYear}${month}${day}`
}

module.exports = {
    checkSession,
    getTimeNum
}