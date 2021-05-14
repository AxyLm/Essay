import { Injectable } from '@nestjs/common';
import { QiniuService } from '../qiniu/qiniu.service';

@Injectable()
export class SyncfileService {
    constructor(
        private qiniu:QiniuService
    ) { }
    
    qiniuUpload(FILE): object{
        this.qiniu.getToken()
        
        return {t:this.qiniu.getToken()}
    }
}
