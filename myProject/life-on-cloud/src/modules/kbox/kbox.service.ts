import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import * as qs from 'qs';
import * as fs from "fs"
import * as FormData from "form-data"
import { PassThrough, Writable, Readable } from "stream"
import * as moment from 'moment';
import { AlicloudOssService, UploadedFileMetadata } from 'nestjs-alicloud-oss'
import path from 'path';
import { Model } from 'mongoose';
import { kdFile, kdFileDocument } from './interface/kdfile.interface';
import { InjectModel } from '@nestjs/mongoose';
import { isEmpty } from 'class-validator';

@Injectable()
export class KboxService {
    private token: string;
    private tokenUpdateTime: number = (new Date()).getTime();
    private kdbodBaseUrl: string = this.configService.get("KODBOX.URL");
    constructor(
        private httpService: HttpService,
        private configService: ConfigService,

        @InjectModel(kdFile.name)
        private readonly kdFileModel:Model<kdFileDocument>
    ) {
        // this.accToken =  this.getAccToken()
    }

    async getAccToken(): Promise<string> {
        // 存在token  并且 剩余时间大于60秒时
        const ase = new Date().getTime() - new Date(this.tokenUpdateTime).getTime()
        if (this.token && ase> 60) {
            return this.token
        } else {
            const token: string = await this.httpService.get(this.kdbodBaseUrl+"/?user/index/loginSubmit&name=soulfree&password=42zvSs7QKU2Rhyy").toPromise().then(v => {
                if (v.data.code) {
                    // this.tokenUpdateTime = (new Date()).getTime()
                    return v.data.info
                } else {
                    return ""
                }
            })
            this.token = token
            return token
        }
    }

    async groupDay() {
        const data = await this.kdFileModel.aggregate([
            {
                $project: {
                    // 时区数据校正，8小时换算成毫秒数为8*60*60*1000=288000后分割成YYYY-MM-DD日期格式便于分组
                    day: {
                        $substr: [{ "$add": ["$createTimes", 28800000] }, 0, 10]
                    },
                    "_id": 1,
                    "path": 1,
                    "name": 1,
                    "ext": 1,
                    "createTime": 1,
                    "size": 1,
                },
            },
            {
                $group: {
                    _id: "$day",
                    count: { $sum: 1 },
                    photos: {
                        $push: {
                            "id":"$_id",
                            "path":"$path",
                            "name":"$name",
                            "ext":"$ext",
                            "createTime":"$createTime",
                            "size":"$size"
                        },
                    }
                },
            },
            {
                $sort: { _id: -1 }
            },
            {
                $match: {
                    _id: { $gt: "2001-01-01" },
                    count: { $gt: 0 } // 该天照片数量大于0
                }
            }
        ]).exec()
        return {data,count:data.length}
    }

    async getListPath(path:string) {
        if (isEmpty(path)) { return "path is not defined" }
        const token = await this.getAccToken()
        var fileList = []
        const findByPage = async (page)=> {
            return this.httpService.request({
                url: this.kdbodBaseUrl + "/?explorer/list/path",
                method: "POST",
                data:qs.stringify( {
                    path: path,
                    page: page || 1,
                    pageNum: 2000,
                    accessToken: token,
                    API_ROUTE: "explorer/list/path",
                })
            }).toPromise().then(async res => {
                const data = res.data.data
                fileList = fileList.concat(data.fileList)
                if (page !== data.pageInfo.pageTotal) {
                    await findByPage(page+1)
                } else {
                    return fileList
                }
            }).catch(err => {
                console.log(err);
            })
        }
        await findByPage(1)
        return fileList
    }

    // TODO 增加定时任务 每xx 同步一次
    async syncFileImage() {
        var fileList = await this.getListPath("{source:25}/")
        let syncNewList = []
        let deletNum = 0
        let skipList = []
        for (var item of fileList) {
            const { sourceID, name } = item
            const fd = await this.kdFileModel.deleteMany({ sourceID, name })
            deletNum += fd.deletedCount
            let t = moment(item.name, ["YYYYMMDD_HHmmss", "x"])
            if (moment(item.name, ["YYYYMMDD_HHmmss", "x"]).isValid()) {
                item.createTime = t.format("YYYY-MM-DD HH:mm:ss")
                item.createTimes = t
            } else {
                item.createTime = null
                skipList.push(item)
                console.log('inser skip :>> ', item.name);
            }
            syncNewList.push(item)
        }
        await this.kdFileModel.insertMany(syncNewList)
        return {
            delet: deletNum,
            insert: syncNewList.length,
            skipFormatTime:skipList
        }
    }

    async inserDb(list) {
        const createdCat = await this.kdFileModel.insertMany(list)
       return createdCat
    }
    async upload(file): Promise<object>{
        return await {}
        const accToken = await this.httpService.post("http://cloud.soulfree.cn/?user/index/loginSubmit&name=lifeCloud&password=F520C8S4LPWI").toPromise().then(v => v.data.info)
        const url = this.configService.get("KODBOX.URL")
        var data = new FormData();

        console.log( typeof file)
        // "D:\\Project\\magic-of-life-web\\static\\xuanque\\1618900662299-2373.jpg"
        // const pass = new Readable();
        // var bufferStream = new PassThrough();
        // bufferStream.end(new Buffer(file.arrayBuffer));
        // var dats
        // bufferStream.pipe(process.stdout)
        data.append("magic_life", fs.createReadStream(file.path));
        // bufferStream.unpipe(process.stdout)
        data.append("accessToken", accToken);
        data.append("name", "123455.jpg");
        data.append("path", "{source:6504}/");
        // const data = {
        //     file,
        //     accessToken: accToken,
        //     name: 'a123.jpg',
        //     path:"{source:6504}/"
        // }
        // const ques = qs.stringify({
        //     path: "{source:6504}/",
        //     accessToken:accToken
        // })
        // return this.httpService.post("http://cloud.soulfree.cn/index.php?explorer/list/path",ques).toPromise().then(v => v.data)
        return this.httpService.request({
            url: "http://cloud.soulfree.cn/?explorer/upload/fileUpload",
            data,
            method: "POST",
            headers: data.getHeaders()
        }).toPromise().then(
            v => v.data
        ).catch((err) => {
            err
        })
        return this.httpService.post("http://cloud.soulfree.cn/?explorer/upload/fileUpload",(data), {
            headers: {
                "Content-Type":"multipart/form-data"
            }
        }).toPromise().then(
            v => v.data
        ).catch((err) => {
            err
        })
    }
}