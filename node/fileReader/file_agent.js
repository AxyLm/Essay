const express = require('express')
const Router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const axios = require("axios")
const stream = require('stream');
const FormData = require("form-data")
const qs = require("qs")
var upload = multer({
});
/**
 * @api {post} /file/upload  文件上传
 * @apiGroup File
 *
 * @apiParam {String} file  file.
 *
 */
Router.post('/upload', upload.single('magic_life'), (req, res) => {
    try {
        var data = new FormData();
        const bufferStream = new stream.PassThrough();
        const streams = bufferStream.end(req.file.buffer);
        streams.on('data', (chunk) => {
            data.append("file", streams);
        });
        axios({
            url: "http://localhost:8666/fileIn/upload",
            data: data,
            method: "POST",
        })
        res.send({ code: 0, msg: 'ok', data: { imgPath: req.file.filename } })
    } catch (error) {
        console.log(error)
        res.send("err")
    }
})

module.exports = Router
