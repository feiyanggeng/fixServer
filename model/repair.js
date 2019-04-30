/**
 * Created by GFY on 2019-04-20.
 * 报修表
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var repair = new Schema({
    code: String,   // 报修单编号
    maintainCode: String, // 维修单编号
    user: {
        type: Schema.ObjectId,
        ref: 'user'
    },              // 创建订单的用户id
    type: {
        type: Schema.ObjectId,
        ref: 'repairType'
    },              // 报修类型
    images: {
        type: String,
        default: ''
    }, //报修情况图片详情（‘http：//XXXX,http://XXXXX’）多张图片以逗号隔开
    remark:  {
        type: String,
        default: ''
    }, // 报修单备注
    address:  {
        type: String,
        default: ''
    }, // 报修地址详情
    passTime:  {
        type: String,
        default: ''
    }, // 维修单通过时间
    rejectMeg: {
        type: String,
        default: ''
    }, //驳回理由
    status: Number      // 报修单状态（0： 审核不通过，1：已提交， 2： 审核通过（未接单），3： 已接单， 4： 维修完毕（未评价）， 5： 已评价
}, { timestamps: { createdAt: 'createdTime'}})

module.exports = mongoose.model('repair', repair)
