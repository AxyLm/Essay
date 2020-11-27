
let href = window.location.href

//购买页
// https://www.vmall.com/product/10086726905036.html
// host: "sale.vmall.com"   排队页
/**
 *
 * 购买页    https://www.vmall.com/product/10086726905036.html
 *
 * 排队页    host: "sale.vmall.com"   https://sale.vmall.com/rush/m40pptcsx.html?mainSku=10086963883857&backUrl=https%3A%2F%2Fwww.vmall.com%2Fproduct%2F10086726905036.html%2310086963883857&_t=1606310536915
 *
 * https://sale.vmall.com/rush/m40pptcsx.html?mainSku=10086963883857&backUrl=https%3A%2F%2Fwww.vmall.com%2Fproduct%2F10086726905036.html%2310086963883857&_t=1606357412930
 */
if( href == 'https://www.vmall.com/product/10086726905036.html' ){


    window.onload = function(){
        document.querySelector("#pro-skus > dl.product-choose.clearfix.product-choosepic > div > ul > li.attr4.attr19.attr34 > div").click()
        document.querySelector("#pro-skus > dl:nth-child(2) > div > ul > li.attr2.attr5.attr8.attr11.attr14.selected > div").click()
        var date = new Date()
        var msObj = {
            d: date.getFullYear() + '-' + ( date.getMonth() + 1 ) + '-' + date.getDate() + ' 10:08',
            goDate: '', //秒杀时间
            delay: 1, //轮询间隔
            netms: 100, //网络延迟量。提前秒杀。2000毫秒
            nIntervId: 0
        }


        if (!msObj.d) {
            msObj.d = prompt("请输入抢购开始时间", "2020-11-09 10:08:00");
        }
        if (msObj.d) {
            try {
                msObj.goDate = new Date(msObj.d);
                console.log("设定时间成功:" + msObj.goDate);
                msObj.nIntervId = setInterval("ms_go()", msObj.delay);
            } catch (e) {
                alert("时间格式不正确,请使用yyyy-MM-dd hh:mm:ss格式,精确到秒, 请重试");
            }
        }

        function ms_go() {
            var left = msObj.goDate.getTime() - Date.now() - msObj.netms
            console.log('alive->剩余时间=' + left / 1000)
            if (left < 0) {
                clearInterval(msObj.nIntervId);
                console.log("时间到 开始抢购" + Date.now())
                rush.business.clickBtn()
            }
        }

}


}else{
    window.location.href = 'https://www.vmall.com/product/10086726905036.html'
}



if( location.pathname ==  "/rush/m40pptcsx.html") {
    console.log('排队页')
}


