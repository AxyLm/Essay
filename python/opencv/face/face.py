import cv2
import os,sys
import asyncio
import threading
def faceDets():
    face = cv2.CascadeClassifier(cv2.haarcascades + 'haarcascade_frontalface_default.xml')
    
    # cv2.namedWindow('facedet')
    # cv2.imshow('facedet',img)
    # cv2.waitKey()
    # cv2.imwrite('./img/dlrb/dldets.jpg',img)
    jpath = os.getcwd()


    names = os.listdir(jpath+'\\img\\dlrb\\')

    for item in names:
            print(item)
            name = item.split('.')[0]
            outpath = './img/out/' + name+'.jpg'
            img = cv2.imread('./img/dlrb/' + item)
            faces = face.detectMultiScale(img,1.3,5)
            for (x,y,w,h) in faces:
                img = cv2.rectangle(img,(x,y),(x+w,y+h),(255,0,0),2)
            cv2.imwrite(outpath,img)
            cv2.waitKey (0)
            cv2.destroyAllWindows()
    # cv2.destroyAllWindows()
def faceDet():
    face = cv2.CascadeClassifier(cv2.haarcascades + 'haarcascade_frontalface_default.xml')
    jpath = os.getcwd()
    name = jpath+'\\img\\dlrb\\1.jpg'
    print(name)
    outpath = './img/out/1.jpg'
    img = cv2.imread(name)
    faces = face.detectMultiScale(img,1.3,5)
    for (x,y,w,h) in faces:
        img = cv2.rectangle(img,(x,y),(x+w,y+h),(255,0,0),2)
    cv2.imwrite(outpath,img)
    cv2.waitKey (0)
    cv2.destroyAllWindows()
    return False

def writ(path,file):
    try:
        if (path):
            cv2.imwrite(path,file)
        else:
            return False
    finally:
        return False
    

# faceDets()


faceDets()