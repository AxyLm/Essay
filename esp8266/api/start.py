import flask
from flask import request
from flask import jsonify
import machine
import time

led = machine.Pin(2,machine.Pin.OUT)
led.off()
'''
flask： web框架，可以通过flask提供的装饰器@server.route()将普通函数转换为服务
登录接口，需要传url、username、passwd
'''
#创建一个服务，把当前这个python文件当做一个服务
server = flask.Flask(__name__)
#server.config['JSON_AS_ASCII'] = False

# @server.route()可以将普通函数转变为服务 登录接口的路径、请求方式
@server.route('/on', methods=['get'])
def on():
    led.on()
    return 'on'
    
@server.route('/off', methods=['get'])
def off():
    led.off()
    return 'off'

    

if __name__ == '__main__':
    server.run(debug=True, port=8888) #指定端口、host,0.0.0.0代表不管几个网卡，任何ip都可以访问
