/**
             * @name 时间格式化
             * @param {String} fmt 时间格式 YYYY年MM月DD日 hh:mm:ss 星期W
             * @param {Number} timestamp 时间戳
             * @return {String} 2021年03月23日 16:56:46 星期二
             */
const format = function(fmt, timestamp) {
    var value = null
    var date = new Date()
    if (timestamp) {
        try {
            value = Date.parse(timestamp.replace(/-/g, "/"))
        } catch (error) {
            value = Date.parse(timestamp)
        }
        if (!value) {
            value = new Date(timestamp)
        }
        date = new Date(value)
    }
    var o = {
        "Y+": date.getFullYear(),
        "M+": date.getMonth() + 1,     // 月
        "D+": date.getDate(),          // 日
        "h+": date.getHours(),         // 时
        "m+": date.getMinutes(),       // 分
        "s+": date.getSeconds(),       // 秒
        "W": date.getDay()             // 周
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, () => {
                if (k === 'W') {                                    // 星期几
                    var week = ['日', '一', '二', '三', '四', '五', '六']
                    return week[o[k]]
                } else if (k === 'Y+' || RegExp.$1.length == 1) {    // 年份 or 小于10不加0
                    return o[k]
                } else {
                    return ("00" + o[k]).substr(("" + o[k]).length)  // 小于10补位0
                }
            })
        }
    }
    return fmt
}

export {
    format
}