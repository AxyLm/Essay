import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {KboxService} from "./kbox.service"
@Controller("kbox")
export class KboxController {
    constructor(
        private kboxService :KboxService
    ) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        dest: '/upload',
        preservePath:true
    }))
    uploadFile(@UploadedFile() file) {
        return this.kboxService.upload(file)
    }
}
