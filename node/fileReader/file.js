const express = require('express')
const Router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const axios = require("axios")
const FormData = require("form-data")
const qs = require("qs")
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 指定文件路径
        console.log(file)
        file.createTime = (new Date()).getTime()
        cb(null, path.join(__dirname,'./static/IN'))
        
    },
    filename: function (req, file, cb) {
        // 指定文件名
        //文件名重复覆盖
        // 后缀名发生改变

        let exts = file.originalname.split('.')
        let ext = exts[exts.length - 1]
        let tmpname = (new Date()).getTime() + '-' + parseInt(Math.random() * 9999)
        file.fieldname = tmpname
        cb(null, `${tmpname}.${ext}`);
    }
});
var upload = multer({
    storage:storage
});
/**
 * @api {post} /file/upload  文件上传
 * @apiGroup File
 *
 * @apiParam {String} file  file.
 *
 */
Router.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        const fileDesc = req.file
        const exts = fileDesc.originalname.split('.')
        const ext = exts[exts.length-1]
        const mimetype = fileDesc.mimetype
        const buffer = fs.readFileSync(fileDesc.path);
        res.send({ code: 0, msg: 'ok', data: { imgPath: req.file.filename } })
    } else {
        res.send("err")
    }
})

module.exports = Router
