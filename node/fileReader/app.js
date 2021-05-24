const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

const file_agent = require("./file_agent")
const fileIn = require("./fileIn")
app.use(cors())

app.use('/',express.static(path.join(__dirname,'./public'))) // 静态目录
app.use("/file_agent", file_agent)
app.use("/file", fileIn)

app.listen(8666, () => {
    console.info('[app] start success http://localhost:8666')
})