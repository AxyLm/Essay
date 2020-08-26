const mqtt = require('mqtt')
const client = mqtt.connect('ws://frp.soulfree.cn:7083/mqtt',{
    clientId:'node_mqtt_test',
    username:'nodemq',
    password:'123456'
})

const store = mqtt.Store()
// 连接成功
client.on('connect', function () {
    // 发布主题 主题 消息 [option{qos,}]
    // client.publish('presence', 'Hello mqtt')
    // 订阅主题
    client.subscribe('test', function(err,granted){
        if(!err){
            console.log('主题test 订阅成功')
        }
        console.log(granted)
    })
})

client.on('message', function (topic, message,packet) {
    /**
     * topic 主题
     * message 消息
     * packet 包
     */
    console.log('收到消息')
    console.log(topic,message.toString())
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