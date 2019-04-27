/**
 * Created by GFY on 2019-04-20.
 * 用户表
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var user = new Schema({
    name: String,    // 用户名
    avatar: String,   // 用户头像
    phone: String,   // 用户账号（电话）
    password: String, // 用户密码
    level: Number,      // 用户等级（0：管理员， 1：维修员， 2或空： 普通用户）
    sex: Number         // 用户性别（0：女， 1：男）
}, { timestamps: { createdAt: 'createdTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('user', user)
