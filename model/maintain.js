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
    images:  {
        type: String,
        default: ''
    }, //维修情况图片详情（‘http：//XXXX,http://XXXXX’）多张图片以逗号隔开
    remark:  {
        type: String,
        default: ''
    }, // 维修单备注
    passTime: {
        type: String,
        default: ''
    }, // 维修单通过时间
    status: {
        type: Number,
        default: 1
    },      // 维修单状态（1：已提交， 2： 审核通过，0： 审核不通过）
    comment:  {
        type: String,
        default: ''
    },     // 评价
    rejectMsg: {
        type: String,
        default: ''
    },      // 驳回意见
    level:  {
        type: Number,
        default: ''
    }           //评价的星级（0,1,2,3,4,5）
}, { timestamps: { createdAt: 'createdTime'}})

module.exports = mongoose.model('maintain', maintain)
