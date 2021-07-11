import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { KboxService } from "./kbox.service"
import { ApiTags } from '@nestjs/swagger';

@ApiTags('可道云')
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


    @Get("geToken")
    getToken() {
        return this.kboxService.getAccToken()
    }


    @Get("list")
    getList() {
        return this.kboxService.getListPath("{source:25}/")
    }


    @Get("syncImage")
    async syncImage() {
        const data = await this.kboxService.syncFileImage()
        return data
    }


    @Get("group")
    groupDate() {
        return this.kboxService.groutDate()
    }
}
