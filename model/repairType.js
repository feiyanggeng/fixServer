/**
 * Created by GFY on 2019-04-20.
 * 报修类型表
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var repairType = new Schema({
    name: String,    // 报修类型
    img: String   ,  //报修类型图标
    category: String   ,  //报修分类
}, { timestamps: { createdAt: 'createdTime'}})

module.exports = mongoose.model('repairType', repairType)
