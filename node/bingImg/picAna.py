import os
import hashlib
from PIL import Image


dir = './home/'
iobj = {
    'w':1920,
    'h':1080
}
imgList = os.listdir(dir)
    
# print( imgList )
def is_valid(file):
    valid = True
    try:
        Image.open(file).load()
    except OSError:
        valid = False
    return valid 


def is_tf( fileList , dir ):
    obj = {
        'tList' : [],
        'fList' : []
    }
    for e in fileList:
        path = dir + e
        tf = is_valid(path)
        if tf :
            obj['fList'].append(e)
        else:
            print(e)
            obj['tList'].append(e)
    return obj
def is_hd( imgPath , obj ):
    im = Image.open( imgPath )
    if ( im.width == obj['w'] ):
        if ( im.height == obj['h'] ):
            return 0 # true
        else:
            return 2 # width err
    else:
        return 1 # height  err

def aHash(image_path, hash_size=8):
    img = plt.imread(image_path) 
    # 转换为灰度图     
    gray_img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)     
    resize_img = cv2.resize(gray_img, (hash_size, hash_size))     
    # avg 和每个像素比较     
    img_ = resize_img > resize_img.mean()    
    # 二值化     
    img_bi = ''.join(img_.astype('B').flatten().astype('U').tolist())     
    #切割，每4个字符一组，转成16进制字符     
    return ''.join(map(lambda x:'%x' % int(img_bi[x:x+4],2), range(0,64,4)))


print( aHash('./page/1580552398252.jpg') )



# print( im,ims,img )

# print( hashlib.md5(img).hexdigest() )
# print( hashlib.md5(imgs).hexdigest() )

# imgTypeObj = is_tf(imgList,dir) 

# for e in imgTypeObj['fList']:
#     if( is_hd( dir + e , iobj ) == 0 ):
#         os.rename( dir+e,'./img/home/'+e )
#         print( './img/home/' + e )
#     else:
#         print( '跳过' + e )


    # 

# imgTypeObj = is_tf(imgList,dir) 
# print( imgTypeObj['tList'] )

# for e in imgTypeObj['tList']:
#     os.rename(dir+e,'./f/'+e)




