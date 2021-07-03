//ffmpeg -ss 00:00:10 -i https://qn.soulfree.cn/wxs_cloud/video/CLFSSSZM_210703_1545.mp4 -y -f image2 -t 0.001 image.jpg
const ffmpeg = require('fluent-ffmpeg')
var commend = ffmpeg('https://qn.soulfree.cn/wxs_cloud/video/CLFSSSZM_210703_1545.mp4') //可以是线上数据源哦，
.withSize("600x600")
.takeScreenshots({
    count:2,
    timemarks: ["0.5", "1"]
}, "test", function (err, filename) {
    console.log(filename);
})