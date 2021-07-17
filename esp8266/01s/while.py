from machine import Pin
import time

open_led = True
io0 = Pin(0, Pin.OUT)
io2 = Pin(2, Pin.OUT)

io2.off()
time.sleep(1)
io2.on()
time.sleep(1)
io2.off()
time.sleep(1)
io2.on()
time.sleep(1)
while True:
    if(open_led):
        io0.on()
        io2.on()
        open_led = False
    else:
        io0.off()
        io2.off()
        open_led = True
    time.sleep(30)