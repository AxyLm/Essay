
import paho.mqtt.client as mqtt
 
HOST = "frp.soulfree.cn"
PORT = 7183
 
def test():
    client = mqtt.Client('python_mqtt_test')
    client.connect(HOST,PORT,60)
    client.publish("chat","hello liefyuan",2) # 发布一个主题为'chat',内容为‘hello liefyuan’的信息
    client.subscribe('test')
    client.loop_forever()
 
if __name__ == '__main__':
    test()