import ntptime
import utime
#import time
import machine
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
while 1 :
  (year, month, mday, hour, minute, second, weekday, yearday)=utime.localtime()
  print (year,'-','%02d' % month, '-','%02d'% mday, ' ', '%2d'% hour, ':', '%02d'% minute, ':','%02d'% second, '  Week:',weekday+1, sep = '')
  count=count+1
  if ((count%(60*30)==0) or (count%10==0 and IF_NTP==0)):
      IF_NTP=ntpsettime(IF_NTP)
      count=0
  utime.sleep(1)


