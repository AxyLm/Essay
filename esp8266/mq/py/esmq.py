import time
from simple import MQTTClient

def sub_cb(topic, msg):   #回调函数，收到服务器消息后会调用这个函数
    print(topic, msg)

c = MQTTClient("umqtt_client", "frp.soulfree.cn:7083/mqtt") #建立一个MQTT客户端
c.set_callback(sub_cb) #设置回调函数
c.connect() #建立连接
c.subscribe(b"ledctl") #监控ledctl这个通道，接收控制命令
while True:
    c.check_msg()
    time.sleep(1)