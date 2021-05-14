import { QiniuController } from './qiniu.controller';
import { QiniuService } from './qiniu.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        QiniuController,],
    providers: [
        QiniuService]
})
export class QiniuModule { }
