import machine
import time

led = machine.Pin(2,machine.Pin.OUT)
led.off()

print("staring...")

while True:
    led.on()
    time.sleep(0.5)
    led.off()
    time.sleep(0.5)
    print("blinking.")