var date = new Date()
class buyMate{
  constructor(){
      this.buy = window.location
      this.day = date.getDate()
      this.d = new Date(date.getFullYear() + '-' + ( date.getMonth() + 1 ) + '-' + this.day + ' 10:08')
      this.netms = 100
  }
  init(){
      let href = window.location.href
      if(href.indexOf('')>-1){
          this.clickBuy()
      }else if(href.indexOf('sale')>-1){
          this.timeoutBack()
      }else if(href.indexOf('submit_order.html') > -1){
          // 内置函数  订单页 提交订单
          sureSubmit()
      }
  }
  selectVersion(){
      document.querySelector().click()
      document.querySelector().click()
  }
  clickBuy(){
      setInterval(() => {
          let diffTime = this.d.getTime() - Date.now() - this.netms
          console.log(diffTime,this.d.getTime(),Date.now(),this.netms)
          // if(diffTime < 0){
          //     rush.business.clickBtn()
          // }
      }, 1000);
  }
  timeoutBack(){
      setTimeout(() => {
          window.location.href = buyIndex
      }, 5 * 1000);
  }
}

var buyMates = new buyMate()
buyMates.init()