

/**
 * @name 时间格式化
 * @param {String} fmt 时间格式 YYYY年MM月DD日 hh:mm:ss 星期W
 * @param {Number} timestamp 时间戳：1617940021732 时间：2021-03-23 16:56
 * @return {String} 2021年03月23日 16:56:46 星期二
 */
function format(fmt, timestamp) {
    // ios 兼容处理 2021-03-23 16:56 > 2021/03/23 16:56
    timestamp = Date.parse(timestamp.replace(/-/g,"/"))
    if(!timestamp){
        timestamp = new Date(timestamp)
    }
    const date = timestamp ? new Date(timestamp) : new Date()
    const o = {
        "Y+": date.getFullYear(),
        "M+": date.getMonth() + 1,     // 月
        "D+": date.getDate(),          // 日
        "h+": date.getHours(),         // 时
        "m+": date.getMinutes(),       // 分
        "s+": date.getSeconds(),       // 秒
        "W": date.getDay()             // 周
    }
    for (var k in o) {
       if (new RegExp("("+ k +")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, () => {
                if (k === 'W') {                                    // 星期几
                    const week = ['日', '一', '二', '三', '四', '五', '六']
                    return week[o[k]]
                } else if (k === 'Y+' || RegExp.$1.length == 1) {    // 年份 or 小于10不加0
                    return o[k]
                } else {
                    return ("00"+ o[k]).substr(("" + o[k]).length)  // 小于10补位0
                }
            })
        }
    }
    return fmt
}
console.log(
    format('星期W')                  // 星期二
,format("YYYY-MM-DD hh:mm:ss")   // 2021-03-23 16:56:46
,format("MM/DD/YYYY hh:mm")      // 03/23/2021 16:56
,format("MM/DD/YYYY hh:mm")      // 03/23/2021 16:56
,format("YYYY年MM月DD日 hh:mm:ss 星期W") // 2021年03月23日 16:56:46 星期二
)


/**
 * @name 相对时间
 * @param {Number} timestemp
 * @return {String}  1小时前,3周前,2年前
 */
const time = (timestemp) => {
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = month * 12;
    const diffValue = new Date().getTime() - timestemp; // 当前时间戳-原时间戳=相差时间

    // 如果本地时间小于变量时间
    if (diffValue <= 0) {
        return '现在'
    }

    // 计算差异时间的量级
    const yearC = diffValue / year;
    const monthC = diffValue / month;
    const weekC = diffValue / (7 * day);
    const dayC = diffValue / day;
    const hourC = diffValue / hour;
    const minC = diffValue / minute;

    // 从大到小排序 满足1以上即成立
    const map = {
        [yearC]: '年',
        [monthC]: "月",
        [weekC]: "周",
        [dayC]: "天",
        [hourC]: "小时",
        [minC]: "分钟",
    }
    for (let i in map) {
        if (i >= 1) {
            return `${parseInt(i)}${map[i]}前`
        }
    }
}
time(new Date().getTime())                // 现在
time(new Date('2021-1-11').getTime())     // 2月前
time(new Date('2021-2-22').getTime())     // 3周前
time(new Date('2020-3-11').getTime())     // 1年前
time(new Date('2019-3-11').getTime())     // 2年前
time(new Date(1616330071538).getTime())   // 1小时前