import { Controller, Get, Post } from '@nestjs/common';
import { QiniuService } from './qiniu.service';

@Controller("qiniu")
export class QiniuController {
    constructor(
        private qiniu: QiniuService,
    ) { }
    
    @Get("/getToken")
    getToken(): string{
        const token = this.qiniu.getToken();
        return token
    }

    @Post("checkToken")
    checkTokne(){
        return ""
    }
}
