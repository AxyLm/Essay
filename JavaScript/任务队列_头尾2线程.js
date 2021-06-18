var arrlist = []
var startTime;
var endTime;
arrlist.length = 100
const nums = 4
const endList = []

function update(item) {
    return new Promise((resolve, reject) => {
        let ti = Math.random() * 30
        setTimeout(() => {
            resolve()
        },ti)
    })
}

async function startDo(type) {
    let isDo = true
    while (isDo) {
        if (arrlist.length === 0) {
            isDo = false
            console.log(endList.length);
            console.log(new Date().getTime() - startTime)
            return await Promise.resolve()
        } else {
            let ti = Math.random() * 20
            let item;
            if (type) {
                item = arrlist.shift()
            } else {
                item = arrlist.pop()
            }
            item = ti
            endList.push(item)
            console.log(item,arrlist.length,type);
            await update(item)
        }
    }
    return Promise.resolve()
}

// 主进程  发起
async function start() {
    startTime = new Date().getTime()
    // 头尾
    await Promise.all([startDo(true), startDo(false)])
    console.log("done");
}

start()
