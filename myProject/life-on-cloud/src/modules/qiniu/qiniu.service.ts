import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as qiniu from "qiniu";
@Injectable()
export class QiniuService {
    private token: string;
    private updateTime: number = (new Date()).getTime();
    private expires: number = 7200;
    private readonly accessKey: string = this.configService.get("QINIU.accessKey");
    private readonly secretKey: string = this.configService.get("QINIU.secretKey");
    constructor(
        private readonly configService:ConfigService
    ){}
    getToken(): string {
        // 存在token  并且 剩余时间大于60秒时
        if (this.token && ( new Date(this.updateTime).getTime() - new Date().getTime()) > 60  ) {
            return this.token
        } else {
            // 重新生成并返回
            const mac = new qiniu.auth.digest.Mac(this.accessKey, this.secretKey)
            const options = {
              scope: 'myliving',
              expires: this.expires
            }
            const putPolicy = new qiniu.rs.PutPolicy(options)
            const uploadToken = putPolicy.uploadToken(mac)
            this.updateTime = (new Date()).getTime()
            this.token = uploadToken
            return uploadToken
        }
    }

    getQiniuDomain(): string{
        return this.configService.get("KODBOX.URL")
    }

    checkToken(token: string): boolean{
        return ( this.token === token && ( new Date(this.updateTime).getTime() - new Date().getTime()) > 60  )
    }
}
