import time
from simple import MQTTClient


def sub_cb(topic, msg):
    print((topic, msg))


def main(server, port, USER, PWD):
    c = MQTTClient("umqtt_client", server, port, USER, PWD)
    c.set_callback(sub_cb)
    c.connect()
    c.subscribe("foo_topic")
    while True:
        if True:
            c.wait_msg()
        else:
            c.check_msg()
            time.sleep(1)
    c.disconnect()


if __name__ == "__main__":
    main("frp.soulfree.cn", 7084, "esp01s_py", "4L2XZLWVTRLR")
