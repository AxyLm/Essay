#!/usr/bin/python2
#coding:utf8
#自动风扇控制程序，使用wiringPi的gpio命令来操作GPIO
import commands,time
import RPi.GPIO as GPIO
#控制风扇的GPIO

FAN_GPIO = 14
GPIO.setmode(GPIO.BCM)     
GPIO.setup(FAN_GPIO, GPIO.OUT)
p = GPIO.PWM(FAN_GPIO, 133) #通道为 11 频率为 128Hz
p.start(100) # 启动pwm

while True:
     # 获取CPU温度
    tmpFile = open( '/sys/class/thermal/thermal_zone0/temp' )
    cpu_temp_raw = tmpFile.read()
    tmpFile.close()
    cpu_temp = round(float(cpu_temp_raw)/1000, 1)
    print cpu_temp,FAN_GPIO
 
    
    if cpu_temp >= 50 :
            p.ChangeDutyCycle(1)
            time.sleep(20)
    if 49 <= cpu_temp < 50 :
            p.ChangeDutyCycle(10)
            time.sleep(10)
    if 48 <= cpu_temp < 49 :
            p.ChangeDutyCycle(20)
            time.sleep(10)
    if 47 <= cpu_temp < 48 :
            p.ChangeDutyCycle(30)
            time.sleep(10)
    if 46 <= cpu_temp < 47 :
            p.ChangeDutyCycle(40)
            time.sleep(5)
    if cpu_temp < 46 :
            p.ChangeDutyCycle(50)
    time.sleep(5)