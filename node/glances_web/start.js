const express = require('express')
const app = require('express')()
const path = require('path')
const cors = require('cors')
const {SERVER_NAME,SERVER_PORT} = require('./config/config')
app.use(cors())

app.use('/',express.static(path.join(__dirname,'./dist'))) // 静态目录
app.listen(SERVER_PORT,()=>{
  console.log(SERVER_NAME,'start：http://localhost:'+SERVER_PORT)
})