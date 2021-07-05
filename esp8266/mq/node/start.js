const mqtt = require('mqtt')
const client = mqtt.connect('http://frp.soulfree.cn:7084',{
    clientId:'node_mqtt_test2',
})

const store = mqtt.Store()
// 连接成功
client.on('connect', function () {
    client.publish('pin_control', '0|')
    // 发布主题 主题 消息 [option{qos,}]
    // client.publish('presence', 'Hello mqtt')
    // 订阅主题
    client.subscribe('pin_control', function(err,granted){
        if(!err){
            console.log('主题test 订阅成功')
        }
        console.log(granted)
    })
    client.on('message', function (topic, message,packet) {
        /**
         * topic 主题
         * message 消息
         * packet 包
         */
        console.log("主题",topic,"消息",message.toString())
        store.put(packet,function(){
            console.log('store suc')
        })
        var bro = store.createStream()
        // client 关闭
        // client.end()
    })
    client.on('error',function(error){
        console.log('发生错误',error)
    })
})


var mode = 0
setInterval(() => {

    if(mode){
        mode = 0
    }else{
        mode = 1
    }
    client.publish('pin_control', '0|'+mode)
    console.log(mode)
}, 1000* 30);
