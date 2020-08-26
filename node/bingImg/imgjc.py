
from os import PathLike
from PIL import Image
import urllib.request
import io
# 判断文件是否为有效（完整）的图片
# 从网络上判断图片是否损坏
def IsValidImage_remote_img(url):
    try:
        bValid = True
        '''python2写法
        request = urllib2.Request(img_url)
        img_data = urllib2.urlopen(request).read()
        img_buffer = StringIO.StringIO(img_data)
        img = Image.open(img_buffer)
        img.save('remote.jpg')#保存图片
        (width,height) = img.size
        out = img.resize((200,height * 200 / width),Image.ANTIALIAS)
        out.save('remote_small.jpg')        '''
        buf = urllib.request.urlopen(url).read()  # bytearray
        img_buffer = io.BytesIO(buf)  # 转换为字符串
        if not buf.startswith(b'\xff\xd8'):#是否以\xff\xd8开头
            bValid=False
        elif buf[6:10] in (b'JFIF', b'Exif'):  # “JFIF”的ASCII码
            if not buf.rstrip(b'\0\r\n').endswith(b'\xff\xd9'):#是否以\xff\xd9结尾
                bValid = False
        else:
            try:
                Image.open(img_buffer).verify()
            except Exception as e:
                bValid = False
                print(e)
    except Exception as e:
        print(e)
 
    return bValid
# 从本地判断图片是否损坏
def IsValidImage_native_img(file):
    try:
        bValid = True
        if isinstance(file, (str, PathLike)):  # 文件路径
            fileObj = open(file, 'rb')  # 以二进制形式打开
        else:
            fileObj = file  # 文件对象
        buf = fileObj.read()
        if not buf.startswith(b'\xff\xd8'):  # 是否以\xff\xd8开头
            bValid = False
        elif buf[6:10] in (b'JFIF', b'Exif'):  # “JFIF”的ASCII码
            if not buf.rstrip(b'\0\r\n').endswith(b'\xff\xd9'):  # 是否以\xff\xd9结尾
                bValid = False
        else:
            try:
                Image.open(fileObj).verify()
            except Exception as e:
                bValid = False
                print(e)
    except Exception as e:
        print(e)
    return bValid
 
#打印一个字节数组
def print_bytearray(buf):
    i = 0
    for ebuf in buf:
        i = i + 1
        print('0x%-2x' % ebuf, end='')
        print("  ", end='')
        if i == 16:
            print("\n")
            i = 0
    print("\n")
 
def main():
    flag1=IsValidImage_remote_img('./img/page/1580553113842_p40.jpg')
    # flag2=IsValidImage_native_img('./img/page/1580553113842_p40.jpg')
    print(flag1)
    # print(flag2)
if __name__ == '__main__':
    main()