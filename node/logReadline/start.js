const readline = require('readline');
const fs = require('fs');
const log = require("./log.js")
const rl = readline.createInterface({
    // input: fs.createReadStream('./log/pm2_out.log')
    input: fs.createReadStream('./log/app.log')
});
console.log(log)
// log.info('[app] 启动成功')
var concatLog = []
var lineFlag = true
rl.on('line', (line) => {
    const arr = line.split('] [');
    if (arr[1]) {
        if (lineFlag == false) {
            lineFlag = true
            let str = concatLog.join("")
            
            console.log(decodeURI(str))
            //console.log('日志时间：%s] 日志内容 [%s', str[0], str[1])
            // concatLog = []

        }
        console.log('日志时间：%s] 日志内容 [%s', arr[0], arr[1])
    } else {
        if (lineFlag) {
            lineFlag = false
            concatLog[0] = arr[0]
        } else {
            // console.log(encodeURI(line))
            concatLog.push(encodeURI(line))
        }
    }
})
log.info('[app] 日志读取完毕')

