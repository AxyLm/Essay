from aip import AipSpeech

""" 你的 APPID AK SK """
APP_ID = '23990829'
API_KEY = '9V3Q2RepXikL1xQnl3PquBKS'
SECRET_KEY = 'CdSj2lvK0WRgG2GIEQKTMMbaBammHiNr'

client = AipSpeech(APP_ID, API_KEY, SECRET_KEY)

result  = client.synthesis('你好百度', 'zh', 1, {
    'vol': 5,'per':4
})

print(result)
# 识别正确返回语音二进制 错误则返回dict 参照下面错误码
if not isinstance(result, dict):
    with open('auido.mp3', 'wb') as f:
        f.write(result)