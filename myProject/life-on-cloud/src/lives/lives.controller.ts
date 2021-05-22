import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, Inject, Param, Post, SerializeOptions, UseFilters, UseInterceptors, UsePipes } from '@nestjs/common';
import { addLives, queryByPageDto } from './lives.dto';
import { ValidationPipe } from "../pipes/page.pipe"
import { LivesInterceptor } from "./transformer/lives.interceptor"
import { LiveService } from './lives.service';
import { HttpExceptionFilter } from 'src/ExceptionFilter/HttpException';
import { FootageService } from 'src/footages/footage.service';
import { liveEntity, FootagesEntity } from './transformer/lives.entity';
import { ApiTags,ApiOperation } from '@nestjs/swagger';

@Controller()
@ApiTags('旧游记')
@Controller("lives")
export class LivesController {
  constructor(
    private readonly liveService: LiveService,

  ) { }

  @Post("list")
  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(new HttpExceptionFilter())
  async queryLivesByPage(@Body(new ValidationPipe()) queryDto: queryByPageDto):Promise<Array<liveEntity>>{

    const lives = await this.liveService.queryLivesByPage(queryDto)
    let data = [];
    if (lives.length > 0) {
      data = lives.map(e => {
        e.footageList = e.footageList.map(footage => {
          return new FootagesEntity(footage)
        })
        return new liveEntity(e)
      })
    }
    return data
  }

  @Post("saveLive")
  @UseFilters(new HttpExceptionFilter())
  addLives(@Body() addLives: addLives) {
    const data = this.liveService.addLives(addLives)
    return data
  }

  @Post("removeLive")
  removeLive(@Body() Param) {
    return this.liveService.removeLive(Param.liveId)
  }
  // @Post("photo")
  // @UseInterceptors(ClassSerializerInterceptor)
  // queryPhoto(@Body() queryDto: queryByPageDto) {
  //   return this.liveService.queryPhotoByPage(queryDto)
  // }
}
