/**
 * Created by GFY on 2019-04-20.
 * 维修表
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var maintain = new Schema({
    code: String,   // 维修单编号
    repairsId: {
        type: Schema.ObjectId,
        ref: 'repair'
    }, // 报修单id
    user: {
        type: Schema.ObjectId,
        ref: 'user'
    },              // 维修员Id
    images: String, //维修情况图片详情（‘http：//XXXX,http://XXXXX’）多张图片以逗号隔开
    remark: String, // 维修单备注
    address: String, // 维修地址详情
    passTime: String, // 维修单通过时间
    status: Number,      // 维修单状态（1：已提交， 2： 审核通过，0： 审核不通过）
    comment: String,     // 评价
    level: Number           //评价的星级（0,1,2,3,4,5）
}, { timestamps: { createdAt: 'createdTime'}})

module.exports = mongoose.model('maintain', maintain)
