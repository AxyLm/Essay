import network
import machine
import time
import os
sta_if = network.WLAN(network.STA_IF); sta_if.active(True)
sta_if.scan()                             # Scan for available access points
sta_if.connect("FAST_29E6", "13703410336") # Connect to an AP
sta_if.isconnected()                      # Check for successful connection


led = machine.Pin(2,machine.Pin.OUT)
led14 = machine.Pin(14,machine.Pin.OUT)
led.off()
led14.off()

print("staring...")

while True:
    led.on()
    led14.on()
    time.sleep(0.5)
    led.off()
    led14.off()
    time.sleep(0.5)
    print("blinking.")



def ledc(num,static):
    ledn = machine.Pin(num,machine.Pin.OUT)
    if static == 'off':
        ledn.value(1)
        print(num,ledn.value() )
    else:
        ledn.value(0)
        print(num,ledn.value() )
