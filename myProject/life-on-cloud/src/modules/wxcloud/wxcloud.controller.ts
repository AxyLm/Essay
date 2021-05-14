import { Controller, Get } from '@nestjs/common';
import { WxcloudService } from './wxcloud.service';

@Controller("wxcloud")
export class WxcloudController {
    constructor(
        private readonly wxcloudService:WxcloudService
    ) { }
    
    @Get("init")
    getData() {
        const data = this.wxcloudService.getLives();
        return data
    }
}
