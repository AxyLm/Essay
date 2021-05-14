import { WxcloudController } from './wxcloud.controller';
import { WxcloudService } from './wxcloud.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        WxcloudController,],
    providers: [
        WxcloudService,],
    exports:[WxcloudService]
})
export class WxcloudModule { }
