import { Body, Controller, Get, Header, HttpCode, Param, Post, UsePipes, HttpException, Redirect } from '@nestjs/common';
import { UploadPipe } from "../pipes/upload.pipe";
import { UploadDTO } from "../dto/upload.dto";
@Controller("upload")
export class UploadController {
  constructor() { }

  @Post("file")
  @UsePipes(new UploadPipe())
  createCat(@Body() UploadDTO: UploadDTO): string {
    return JSON.parse(JSON.stringify(UploadDTO))
    return `接受到的UploadDTO的数据accountName:${UploadDTO.accountName}&age:${UploadDTO.accountName} dto:${UploadDTO}`;
  }


  @Get("img")
  @Redirect("https://img01.yzcdn.cn/vant/logo.png", 301)
  UploadImg(): any {

  }

  @Post("kd")
  kdLodin(){
    return 0
  }
}
