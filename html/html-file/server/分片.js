//后端
const express = require('express');
const body = require('body-parser')
const multiparty = require('multiparty');
const fse = require('fs-extra');
const path = require('path');
const fs = require('fs')

const app = new express();
app.use(express.static(__dirname + '/public'))
app.use(body.urlencoded({ extended: true }))
app.use(body.json())

const PUBLIC_PATH = path.resolve(__dirname, 'public/upload')

app.post('/upload', (req, res) => {
    const form = new multiparty.Form({ uploadDir: 'temp' })//选择上传目录
    form.parse(req)
    //监听文件上传
    form.on('file', async (name, chunk) => {
        //命名文件夹
        let chunkDir = `${PUBLIC_PATH}/${chunk.originalFilename.split('.')[0]}`
        if (!fse.existsSync(chunkDir)) {
            await fse.mkdirs(chunkDir)
        }
        var dPath = path.join(chunkDir, chunk.originalFilename.split('.')[1])
        await fse.move(chunk.path, dPath, { overwrite: true })
        res.send('文件上传成功');
    })
}
)
//合并分片
app.post('/merge', async function (req, res) {
    var name = req.body.name
    var fname = name.split('.')[0]
    let chunkDir = path.join(PUBLIC_PATH, fname);
    let chunks = await fse.readdir(chunkDir);
    chunks.sort((a, b) => {
        a - b;
    }).map(chunkPath => {
        //合并文件        fs.appendFileSync(path.join(PUBLIC_PATH,name),fs.readFileSync(`${chunkDir}/${chunkPath}`))
    })
    //移除分片目录
    fse.removeSync(chunkDir);
    res.send({ merge: '合并成功' })
})

app.listen(4050, () => { console.log('开启端口') });