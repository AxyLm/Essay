import imghdr
import os
from PIL import Image



def is_rename(path):
    if is_valid(path):
        print(filePath,'未损坏')
    else:
        os.rename(filePath,'./img/page/false2.jpg')
        print(filePath,'已损坏')
def is_valid(file):
    valid = True
    try:
        Image.open(file).load()
    except OSError:
        valid = False
    return valid 

 
img = imghdr.what('./img/page/1580553077045_p39.jpg')
 
print(img)
 

filePath = './img/page/1580553077045_p39.jpg'
is_rename(filePath)


   



# print(is_valid('./img/page/1580553113842_p40.jpg') )
# print(is_valid('./img/page/1580553077045_p39.jpg') )

# os.rename('./img/page/1580553113842_p40.jpg','./img/page/1580553113842_p40false.jpg') 
