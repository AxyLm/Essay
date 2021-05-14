import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Post, SerializeOptions, UseFilters, UseInterceptors, UsePipes } from '@nestjs/common';
import { queryByPageDto } from './lives.dto';
import { ValidationPipe } from "../pipes/page.pipe"
import { LivesInterceptor } from "./transformer/lives.interceptor"
import { LiveService } from './lives.service';
import { FootagesEntity, PhotoEntity } from './transformer/photo';
import { HttpExceptionFilter } from 'src/ExceptionFilter/HttpException';
@Controller("lives")
export class LivesController {
  constructor(
    private readonly liveService: LiveService
  ) { }

  @Post("list")
  @UseFilters(new HttpExceptionFilter())
  async queryLivesByPage(@Body(new ValidationPipe()) queryDto: queryByPageDto) {
    try {
      const data = (await this.liveService.queryLivesByPage(queryDto)).map(e => {
        var ent = new PhotoEntity(e._doc)
        return ent
      })
      return {
        code: 200,
        data,
        ...queryDto,
        msg: "success"
      }
    } catch (error) {
      return new BadRequestException()
    }
  }

  // @Post("photo")
  // @UseInterceptors(ClassSerializerInterceptor)
  // queryPhoto(@Body() queryDto: queryByPageDto) {
  //   return this.liveService.queryPhotoByPage(queryDto)
  // }
}
