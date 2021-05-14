import { FootageService } from './footage.service';
import { Module } from '@nestjs/common';
import { WxcloudModule } from 'src/modules/wxcloud/wxcloud.module';
import { QiniuModule } from 'src/modules/qiniu/qiniu.module';

@Module({
    imports: [WxcloudModule,QiniuModule],
    controllers: [],
    providers: [
        FootageService,],
    exports:[FootageService]
})
export class FootageModule { }
