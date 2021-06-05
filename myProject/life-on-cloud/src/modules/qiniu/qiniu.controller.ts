import { Controller, Get, Post } from '@nestjs/common';
import { QiniuService } from './qiniu.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('七牛云')
@Controller("qiniu")
export class QiniuController {
    constructor(
        private qiniu: QiniuService,
    ) { }
    @Get("getToken")
    getToken(){
        const token = this.qiniu.getToken();
        return token
    }

    @Post("checkToken")
    checkTokne() {
        const data = this.qiniu.checkToken("");
        return data
    }
}
