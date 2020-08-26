let fs = require('fs')
let imgSize = require('image-size')

console.log('开始运行',)

let imgList = fs.readdirSync('./page/')

// fs.renameSync( './page/1580552273206.jpg' , './img/page/1580552273206.jpg' )
type(imgList)
function type(list){
    let list1920 = []
    list.forEach(e => {
        let imgInfo = imgSize('./page/'+e)
        if( imgInfo.width === 1920 ){
            fs.renameSync( './page/'+e , './img/page/'+e )
        }else{

        }
    });
}

console.log('运行完毕',imgList,imgInfo)