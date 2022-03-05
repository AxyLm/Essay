var list = require("./list.json")
var request = require('request')
var fs = require("fs")
var qs = require("qs")

function dFile(src, dest) {
    return  new Promise((resolve, reject) => {
        request(src).pipe(fs.createWriteStream(dest)).on('close',function(){
            console.log('end:-:' + dest)
            resolve(src,dest)
        })
    })
}

function getToken() {
    return new Promise((resolve, reject) => {
        request("http://localhost:8033/kbox/geToken", function (error, response, body) {
            let data = (JSON.parse(body))
            console.log(data);
            resolve(data.data)
        })
    })
}

console.log(typeof list);

(async function () {
    for (const item of list.data) {
        console.log(item);
        let token = await getToken();
        await dFile(`http://192.168.0.106:9634/?explorer/index/fileOut&path=${item.path}&accessToken=${token}`,`D:/LomorageFile/百度云/相册/${item.name}`)
    }
})()
// console.log(list)

// http://cloud.soulfree.cn/?explorer/index/fileOut&path={source:10658}&accessToken=95b70nWABA_wwo1LH-lLrloLuFOav8PV7cZnZbHSZlzzOVVE4-yxuTuxxUd9h00Cy4PtS9llfHhQigU2Qw