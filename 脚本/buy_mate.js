const buyUrl = 'https://www.vmall.com/product/10086726905036.html'
const saleUrl = ""

if(window.location.pathname == 'product/10086726905036.html'){

}




// 选择版本 跳转排队
function imBuy(){

}

// 排队开始 5s未进入订单页 取消排队 重新开始
function inQueue(){
    setTimeout(() => {
        window.location.href = buyUrl
    }, 5 * 1000);
}

// 订单页 提交订单
function submitOrder(){
    sureSubmit()
}


/**
 * 基本流程
 * 1. 首页 选择版本 内存  跳转排队
 *
 * 2. 排队页
 *  5s内成功跳转订单页
 *  超过5s 失败 回退会首页  循环1 > 2
 *
 * 3.订单页 秒提订单
 *
 */