import { SyncfileService } from './syncfile.service';
import { Module } from '@nestjs/common';
import { QiniuModule } from '../qiniu/qiniu.module';

@Module({
    imports: [QiniuModule],
    controllers: [],
    providers: [
        SyncfileService,],
})
export class SyncFileModule { }
