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
    images: String, //报修情况图片详情（‘http：//XXXX,http://XXXXX’）多张图片以逗号隔开
    remark: String, // 报修单备注
    address: String, // 报修地址详情
    passTime: String, // 维修单通过时间
    status: Number      // 报修单状态（0： 审核不通过，1：已提交， 2： 审核通过（未接单），3： 已接单， 4： 维修完毕（未评价）， 5： 已评价
}, { timestamps: { createdAt: 'createdTime'}})

module.exports = mongoose.model('repair', repair)
