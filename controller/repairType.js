/**
 * Created by GFY on 2019-04-20.
 * 报修类型接口
 */
const express = require('express')
const router  = express.Router()

const repairTypeModel = require('../model/repairType')

/**
 * 获取所有报修类型
 */
router.get('/getAll', async (req, res, next) => {
    try {
        let repairTypes = await repairTypeModel.find()
        res.json({
            code: 200,
            data: repairTypes,
            msg: '报修分类'
        })
    } catch (e) {
        next(e)
    }
})
/**
 * 添加报修类型
 */
router.post('/add', async (req, res, next) => {
    try {
        let {name,img} = req.body
        let repairs=await repairTypeModel.findOne({name})
        if(!repairs){
            repairs = await repairTypeModel.create({name,img})
            res.json({
                code :200,
                msg  :"添加成功",
                data:repairs
            })
        }else{
           res.json({
               code:301,
               msg:"分类已存在"
           })
        }
    } catch (e) {
        next(e)
    }
})
/**
 * 修改报修类型
 */
router.post('/update', async (req,res,next)=>{
    try {
        let {_id, img, name} = req.body
        await repairTypeModel.updateOne({_id: _id}, {$set: {img, name}})
        res.json({
            code: 200,
            msg: '修改成功'
        })
    }catch (e){
        next(e)
    }
})
/**
 * 删除
 * @type {Router|router|*}
 */
router.post('/del', async (req,res,next)=>{
    try {
        let { _id }=req.body
        await repairTypeModel.deleteOne({_id : _id})
        res.json({
            code: 200,
            msg: '删除成功'
        })
    }catch(e){
        next(e)
    }
})
module.exports = router