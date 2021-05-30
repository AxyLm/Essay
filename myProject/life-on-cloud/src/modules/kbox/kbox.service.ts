import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import * as qs from 'qs';
import * as fs from "fs"
import * as FormData from "form-data"
import { PassThrough, Writable, Readable } from "stream"

import { AlicloudOssService, UploadedFileMetadata } from 'nestjs-alicloud-oss'
import path from 'path';
import { Model } from 'mongoose';
import { kdFile } from './interface/kdfile.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class KboxService {
    private token: string;
    private tokenUpdateTime: number = (new Date()).getTime();
    constructor(
        private httpService: HttpService,
        private configService: ConfigService,

        @InjectModel(kdFile.name)
        private readonly kdFileModel:Model<kdFile>
    ) {
        // this.accToken =  this.getAccToken()
    }

    async getAccToken(): Promise<string> {
        // 存在token  并且 剩余时间大于60秒时
        // const ase = new Date().getTime() - new Date(this.tokenUpdateTime).getTime()
        // if (this.token && ase> 60) {
        //     return this.token
        // } else {
            const token: string = await this.httpService.get("http://192.168.0.106:9634/?user/index/loginSubmit&name=soulfree&password=42zvSs7QKU2Rhyy").toPromise().then(v => {
                if (v.data.code) {
                    // this.tokenUpdateTime = (new Date()).getTime()
                    return v.data.info
                } else {
                    return ""
                }
            })
            this.token = token
            return token
        // }
    }

    async getListPath() {
        const token = await this.getAccToken()
        const data = await this.httpService.request({
            url: "http://192.168.0.106:9634/?explorer/list/path",
            method: "POST",
            data:qs.stringify( {
                path: "{source:25}/",
                page: "1",
                pageNum: "5000",
                accessToken: token,
                API_ROUTE: "explorer/list/path",
            })
        }).toPromise().then(res => {
            // fs.writeFileSync("./res.json",qs.stringify(res.data))
            return res.data
        })

        return data
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