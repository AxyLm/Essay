import ntptime
import utime
import time
import machine

from machine import I2C
i2c=machine.I2C(-1, sda=machine.Pin(9), scl=machine.Pin(10), freq=400000)
from ssd1306 import SSD1306_I2C
oled = SSD1306_I2C(128, 64, i2c)
IF_NTP=0
def ntpsettime(IF_NTP):
    try:
        ntptime.time()
        ntptime.settime()
        rtc=machine.RTC()
        tampon1=utime.time()
        tampon2=tampon1+8*60*60
        rtc.datetime ( utime.localtime(tampon2)[0:3] + (0,) + utime.localtime(tampon2)[3:6] + (0,))
        IF_NTP=1
    except:
        print('XXX')
        IF_NTP=0
    return IF_NTP
#time.localtime()
#开始循环
utime.sleep(3)
IF_NTP=ntpsettime(IF_NTP)
count=0
def gTime():
    (year, month, mday, hour, minute, second, weekday, yearday)=utime.localtime()
    return str(year)+'-'+str(month)+'-'+str(mday)+' '+str(hour)+':'+str(minute)+':'+str(second)

def show_led(texts):
    (year, month, mday, hour, minute, second, weekday, yearday) = utime.localtime()
    if second < 10:
        second = "0" + str(second)
    if minute < 10:
        minute ="0"+str(minute)
    if month < 10:
        month ="0"+str(month)
    oled.fill(0)
    oled.text(str(str(year) + '-' + str(month) + '-' + str(mday)), 25, 0)
    oled.text(str(str(hour)+':'+str(minute)+':'+str(second)), 32, 8)
    oled.show()


while True:
    show_led(gTime())
    time.sleep(.1)