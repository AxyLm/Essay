import { Injectable } from '@nestjs/common';
import { QiniuService } from 'src/modules/qiniu/qiniu.service';
import { WxcloudService } from 'src/modules/wxcloud/wxcloud.service';

@Injectable()
export class FootageService {
    constructor(
        private wxcloud: WxcloudService,
        private qiniu: QiniuService
    ) { }
    
    async addFootage(param: object) {
        return await this.wxcloud.collection("footages").add(param)
    }
 }
