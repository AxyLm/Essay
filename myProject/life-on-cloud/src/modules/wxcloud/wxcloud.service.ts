import { Injectable } from '@nestjs/common';
import * as cloud from  "../qiniu/cloud"

@Injectable()
export class WxcloudService {
    private readonly cloud: object;
    constructor() { }
    
    init() {
        new cloud.Cloud({
            resourceAppid: 'wx83c1e009599b1117',
            resourceEnv: 'lives-1grzxd6l364d3b9b', // 资源方云环境 ID
            traceUser: true,
        })
    }
}
