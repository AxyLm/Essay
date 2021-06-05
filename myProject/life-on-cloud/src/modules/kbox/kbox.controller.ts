import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as moment from 'moment';
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
        return this.kboxService.getListPath()
    }


    @Get("insertdb")
    async insert() {
        const data = await this.kboxService.getListPath()
        var list = data.data.fileList
        for (var item of list) {
            if (item.name.indexOf("IMG") == 0) {
                
                try {
                    let tlist = item.name.split(/IMG_|_|.jpg/)
                    var str = moment(tlist[1] + " "+ tlist[2],"YYYYMMDD HHmmss")
                    // let year = tlist[1].slice(0,4)
                    // let month = tlist[1].slice(4,6)
                    // let day = tlist[1].slice(6, 8)
                    // let times = tlist[2].slice(0, 2) + ":" + tlist[2].slice(2, 4)
                    item.createTime = str.format("YYYY-MM-DD HH:mm:ss")
                } catch (error) {
                    break
                }
            }
            console.log('inser :>> ', item.createTime);
        }
        const inser = await this.kboxService.inserDb( list)
        return list.length
    }
}
