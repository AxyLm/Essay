import ntptime
import time
import machine

from machine import I2C
i2c=machine.I2C(-1, sda=machine.Pin(9), scl=machine.Pin(10), freq=400000)
from ssd1306 import SSD1306_I2C
oled = SSD1306_I2C(128, 64, i2c)
ntptime.settime()
time.sleep(3)
def gTime():
    (year, month, mday, hour, minute, second, weekday, yearday) = time.localtime()
    hour = hour + 8
    
    return {
        "day": (str(year) + '-' + str(month) + '-' + str(mday)),
        "time": (str(hour) + ':' + str(minute) + ':' + str(second))
    }

def show_led():
    oled.fill(0)
    oled.text( gTime()["day"] , 25, 0)
    oled.text( gTime()["time"], 32, 8)
    oled.show()

while True:
    show_led()
    time.sleep(.1)




def show_bit_image(self,image, x_pos, y_pos, size_x, size_y, inv=False):
    x = 0
    y = 0
    for data in image:
    for a in range(0, 31):
        if (data & 1<<a):
        oled.pixel(x_pos + x, y_pos + y, not inv)
        x = x + 1
        if x == size_x:
        x = 0
        y = y + 1