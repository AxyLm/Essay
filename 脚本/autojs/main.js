"auto"
toast('hello');
console.show()
device.keepScreenDim()

app.launchApp('华为商城')
// app.startActivity("com.vmall.client.product.fragment.ProductDetailActivity")
app.openUrl('https://m.vmall.com/product/10086726905036.html#10086963883857')
var datas = new Date()
var msObj = {
    h:10,
    m:8,
    delay: 5,
    netms: 20,
    nIntervId: 0
}
toast('倒计时')
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
toast('开始点击')
while(!click("立即申购")){
    break
}
setInterval(() => {
    click("提交订单")
}, 100);
setTimeout(() => {
    back()
}, 5 * 1000);
// msObj.nIntervId = setInterval(function () {
//     console.log(msObj.d)
//     console.log(new Date(msObj.d).getTime())
//     // var left = msObj.d.getTime() - Date.now() - msObj.netms
//     // if (left < 1000) {

//     // }
//     // console.log(left)
//     // if (left < 0) {
//     //     clearInterval(msObj.nIntervId);
//     //     console.log("时间到 开始抢购" + Date.now())
//     //     rush.business.clickBtn()
//     // }
// }, msObj.delay);