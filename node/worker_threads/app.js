const cluster = require('cluster')
const { isMaster } = cluster
const os = require("os")
const colors = require('colors')
const port = 9333

if (isMaster) {


    // 每个cpu核心衍生出一个子进程
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`子进程, ${worker.process.pid} 已退出`)
    })
    for (const id in cluster.workers) {
        const workers = cluster.workers[id]
        workers.on('message', (e) => {
            if (e.type == "app") {
                console.log(colors.green(e.msg))
            }
            if (e.type == "notifyRequest") {
                console.log(colors.yellow(workers.process.pid, "收到请求"))
            }
        })
    }

    console.log(`主进程 ${process.pid} app start success http://localhost:${port}`)
} else {
    const express = require('express')
    const app = express()

    app.use("*", (req, res) => {
        res.send(`<h2>Hello Cluster ${process.pid}</h2>`)
        process.send({ type: "notifyRequest" })
    })

    // 多个进程监听 同一端口 分发请求
    app.listen(port, () => {
        process.send({ type: "app", msg: `子进程 ${process.pid} 已启动` });
    })
}