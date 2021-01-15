const { Worker, isMainThread, parentPort, workerData } = require('worker_threads')

function getImgBuffer(list, index) {
  let str = list[index] || list
  return new Promise((resolve, reject) => {
    DownloadImg(str).then((res) => {
      console.log(list[index++])
      if (list[index++]) {// 下一个递归地址存在
        getImgBuffer(list,list[index++])
      } else {
        resolve("下载完成："+list)
      }
    })
  })
}
function DownloadImg(buffer) {
  return new Promise((resolve, reject) => {
    resolve(buffer)
  })
}
function sliceArray (arr, size) {
  var arr2 = [];
  for(var i=0; i<arr.length; i=i+size){
    arr2.push(arr.slice(i,i+size));
  }
  return arr2;
}
if (isMainThread) {
  let len = 5
  let imgList = []
  for (let i = 0; i < len; i++) {
    imgList.push(
      (Math.random(10, 100)).toFixed(2)
    )
  }
  console.log(imgList,len)
  const threadCount = +process.argv[2] || 2
  const threads = new Set()
  console.log(`Running with ${threadCount} threads...`)

  let maxArr = Math.ceil(imgList.length / threadCount)

  let slarr  = sliceArray(imgList, maxArr)
  console.log(slarr)
  for (let i = 0; i < threadCount - 1; i++) {
    // let arr = imgList.slice(start, end)
    // console.log(arr,start, end)
    threads.add(
      new Worker(__filename, { workerData: { buffer: slarr[i] } }))
  }

  // threads.add(new Worker(__filename, { workerData: { buffer:imgList } }))

  for (let worker of threads) {
    worker.on('error', (err) => { throw err })
    worker.on('exit', () => {
      threads.delete(worker)
      console.log(`Thread exiting, ${threads.size} running...`)
      if (threads.size === 0) {
        console.log("end")
        // console.log(primes.join('\n'))
      }
    })

    worker.on('message', (msg) => {
      console.log("接受到消息", msg)
    })
  }
} else {
  getImgBuffer(workerData.buffer,0).then((res) => {
    parentPort.postMessage(res)
  })
}