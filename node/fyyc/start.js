let axios = require('axios')
let date = new Date()

axios.get('https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5&_='+date.getTime())
.then((res)=>{
    //JSON.parse(res.data.data)
    console.log( res.data )
})
