from simple import MQTTClient
from machine import Pin
import network
led=Pin(2,Pin.OUT)

def sub_cb(topic, msg):
    msg = str(msg,'utf-8')
    topic = str(topic,'utf-8')
    print(topic, msg)
    if topic=='pin_control':
        if "|" in msg:
            nu = msg.split("|")
            if (nu[1] == "1"):
                Pin(int(nu[0]), Pin.OUT).on()
            else:
                Pin(int(nu[0]), Pin.OUT).off()
def do_connect():
    sta_if = network.WLAN(network.STA_IF)
    ap_if = network.WLAN(network.AP_IF)
    if ap_if.active():
        ap_if.active(False)
    if not sta_if.isconnected():
        print('connectiong to network...')
    sta_if.active(True)
    sta_if.connect("nianse", "nianse12")  # Connect to an AP
    while not sta_if.isconnected():
        pass
    print('network config:', sta_if.ifconfig())
do_connect()
# c = MQTTClient("esp01s_micropython_01", "192.168.0.106",1883,"esp01s_py","4L2XZLWVTRLR")
c = MQTTClient("esp01s_micropython_01", "frp.soulfree.cn",7084,"esp01s_py","4L2XZLWVTRLR")
c.set_callback(sub_cb)
c.connect()
c.subscribe(b"pin_control")
while True:
    c.check_msg()