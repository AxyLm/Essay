import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import * as qs from 'qs';
import * as fs from "fs"
import * as FormData from "form-data"
import { PassThrough, Writable, Readable } from "stream"

import { AlicloudOssService, UploadedFileMetadata } from 'nestjs-alicloud-oss'

@Injectable()
export class KboxService {
    private accToken:String
    constructor(
        private httpService: HttpService,
        private configService: ConfigService
    ) { }

    async getAccToken(): Promise<any> {
        this.accToken = await this.httpService.get("http://cloud.soulfree.cn/?user/index/loginSubmit&name=lifeCloud&password=F520C8S4LPWI").toPromise().then(v => v.data)
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