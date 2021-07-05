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
    sta_if.connect("nianse", "nianse12")  # Connect to an AP
    while not sta_if.isconnected():
        pass
    print('network config:', sta_if.ifconfig())
    return sta_if
wlan = do_connect()
ip = wlan.ifconfig()[0]
port = 80
led2 = Pin(2, Pin.OUT)
led14 = Pin(14, Pin.OUT)
websever = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
address = (ip,port)
websever.bind(address)
websever.listen(5)
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
            print(url)
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
                conn.sendall("index")
            conn.send("\r\n")
        else:
            print('not found url ')
    else:
        print('no request')
    conn.close()
