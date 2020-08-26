import socket
from machine import Pin
from re import search


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


html = """
<p/>hello world</>

"""
wlan = do_connect()

ip = wlan.ifconfig()[0]
port = 80
led2 = Pin(2, Pin.OUT)
led14 = Pin(14, Pin.OUT)

websever = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
print(websever,ip)
# websever.setsocket(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
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
            print(url,'a')
            conn.send("HTTP/1.1 200 OK\r\n")
            conn.send("Server: Esp8266\r\n")
            conn.send("Content-Type: text/html;charset=UTF-8\r\n")
            conn.send("Connection: close\r\n")
            conn.send("\r\n")
            if url == '/led1':
                led2.on()
            elif url == '/led2':
                led2.off()
            elif url == '/led14':
                led14.on()
            elif url == '/led214':
                led14.off()
            else:
                conn.sendall(html)
            conn.send("\r\n")
        else:
            print('not found url ')
    else:
        print('no request')
    conn.close()
