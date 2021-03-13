import socket
from machine import Pin
from re import search

def show_led(url,query):
    from machine import I2C
    i2c=machine.I2C(-1, sda=machine.Pin(9), scl=machine.Pin(10), freq=400000)  
    from ssd1306 import SSD1306_I2C
    oled = SSD1306_I2C(128, 64, i2c)
    oled.text("Hi", 0, 0)
    oled.text(url, 0, 15)
    oled.text(query, 0, 30)
    oled.show()

def do_connect():
    import network
    sta_if = network.WLAN(network.STA_IF)
    ap_if = network.WLAN(network.AP_IF)
    if ap_if.active():
        ap_if.active(False)
    if not sta_if.isconnected():
        print('connectiong to network...')
    sta_if.active(True)
    sta_if.connect("Nian", "Nian@161718")  # Connect to an AP
    while not sta_if.isconnected():
        pass
    print('network config:', sta_if.ifconfig())
    return sta_if

show_led('soulfree',"0")
html = """
<p>hello world<p/>
"""
wlan = do_connect()

ip = wlan.ifconfig()[0]
port = 80
led2 = Pin(2, Pin.OUT)
led14 = Pin(14, Pin.OUT)

websever = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
print(websever,ip)
address = (ip,port)
websever.bind(address)
websever.listen(5)
print('{}:{}'.format(ip, port))
while True:
    conn, addr = websever.accept()
    request = conn.recv(1024)
    if len(request) > 0:
        request = request.decode()
        result = search("(.*?) (.*?) HTTP/1.1", request)
        if result:
            method = result.group(1)
            url = result.group(2)
            conn.send("HTTP/1.1 200 OK\r\n")
            conn.send("Server: Esp8266\r\n")
            conn.send("Content-Type: text/html;charset=UTF-8\r\n")
            conn.send("Connection: close\r\n")
            conn.send("\r\n")
            show_led(url,method)
            if url == '/led1':
                led2.on()
            elif url == '/led2':
                led2.off()
            elif url == '/led14':
                led14.on()
            elif url == '/led214':
                led14.off()
            else:
                if (("|" in url) or ("%7C" in url)):
                    query = url.split("/")[1]
                    splitstr = "|"
                    if ("%7C" in url):
                        splitstr = "%7C"
                    coms = query.split(splitstr,1)[0]
                    status = query.split(splitstr, 1)[1]
                    print('{}:{}'.format(coms, status))
                    if (status == "1"):
                        Pin(int(coms), Pin.OUT).on()
                    else:
                        Pin(int(coms), Pin.OUT).off()
                    conn.send('{}:{}'.format(coms, status))
                else:
                    conn.sendall(html)
            conn.send("\r\n")
        else:
            print('not found url ')
    else:
        print('no request')
    conn.close()
