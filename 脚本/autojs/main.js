"auto"
toast('hello');
console.show()
device.keepScreenDim()

app.launchApp('华为商城')
app.openUrl('https://m.vmall.com/product/10086726905036.html#10086963883857') // mate40 pro 白 256
var datas = new Date()
var msObj = {
    h:10,
    m:8,
    delay: 5,
    netms: 20,
    nIntervId: 0
}
toast('倒计时开始')
var timeShow = setInterval(() => {
    console.log((new Date()).getSeconds())
}, 1000);
// 阻断
while (true) {
    var myDate = new Date();
    if (myDate.getHours() == msObj.h ) {
        if( ( myDate.getMinutes() + 1 ) == msObj.m ){ // 提前
            var s = myDate.getSeconds()
            if( s == 59 ){
                var ms = myDate.getMilliseconds()
                if( ms + msObj.netms >= 1000){
                    console.log("时间到");
                    console.log(new Date().getTime())
                    break;
                }
            }
        }
    }
}
sleep(15)
toast('开始点击')
startBuy()
var findViewTime
function startBuy(){
    findViewTime = setInterval(() => {
        if( text("提交订单").find().nonEmpty() ){
            clearInterval(findViewTime)
            text("提交订单").findOne().click()
            startBuy()
        }else if(text("退出排队").find().nonEmpty()){
            setTimeout(() => {
                clearInterval(findViewTime)
                back()
                startBuy()
            }, 5000);
        }else if( text("立即申购").find().nonEmpty() ){
            clearInterval(findViewTime)
            text("立即申购").findOne().click()
            startBuy()
        }
    }, 20);
}