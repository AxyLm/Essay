document.querySelector("#pro-skus > dl.product-choose.clearfix.product-choosepic > div > ul > li.attr4.attr19.attr34 > div").click()
document.querySelector("#pro-skus > dl:nth-child(2) > div > ul > li.attr2.attr5.attr8.attr11.attr14.selected > div").click()


var date = new Date()
var msObj = {
    d: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' 10:08',
    goDate: '', //秒杀时间
    delay: 1, //轮询间隔
    netms: 100, //网络延迟量。提前秒杀。2000毫秒
    nIntervId: 0
}


if (!msObj.d) {
    msObj.d = prompt("请输入抢购开始时间", "2020-11-09 10:08:00");
}
if (msObj.d) {
    msObj.goDate = new Date(msObj.d);
    console.log("设定时间成功:" + msObj.goDate);
    msObj.nIntervId = setInterval(function () {
        var left = msObj.goDate.getTime() - Date.now() - msObj.netms
        if (left < 1000) {
            document.querySelector("#pro-skus > dl.product-choose.clearfix.product-choosepic > div > ul > li.attr4.attr19.attr34 > div").click()
            document.querySelector("#pro-skus > dl:nth-child(2) > div > ul > li.attr2.attr5.attr8.attr11.attr14.selected > div").click()
        }
        if (left < 0) {
            clearInterval(msObj.nIntervId);
            console.log("时间到 开始抢购" + Date.now())
            rush.business.clickBtn()
        }
    }, msObj.delay);
    setInterval(function () {
        var left = msObj.goDate.getTime() - Date.now() - msObj.netms
        console.log('alive->剩余时间=' + left / 1000)
    }, 1000);
}

if( window.location.pathname == 'wap_submit_order.html'){
    // 订单页提交订单
    sureSubmit();
}