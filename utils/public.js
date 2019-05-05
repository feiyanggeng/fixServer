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

/**
 * 获取前后时间
 * @month Number 时间戳
 */
function getStartEnd(month) {
    month = parseInt(month)
    let time = new Date(month)
    let Year = time.getFullYear()
    let Month = time.getMonth()
    let Next = Month+1
    let timeCon = new Date(Year, Month, 1)
    let nextTime = new Date(Year, Next, 1)
    return {
        start: timeCon,
        end: nextTime
    }
}

module.exports = {
    checkSession,
    getTimeNum,
    getStartEnd
}