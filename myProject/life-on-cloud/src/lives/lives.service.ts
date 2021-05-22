import { BadRequestException, HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lives, LiveDocument, Footages, FootagesDocument } from "./schema/lives.schema";
import { PhotoEntity } from './transformer/photo';
import * as qs from 'qs';
import { WxcloudService } from '../modules/wxcloud/wxcloud.service';
import { FootageService } from 'src/footages/footage.service';
import { addLives, queryByPageDto } from './lives.dto';

import {format} from "../util/timeFormat"
import { liveEntity } from './transformer/lives.entity';
// import { LivePhotos,photoDocument } from "./schema/photos.schema";
@Injectable()
export class LiveService {
  constructor(
    @InjectModel('Lives')
    private liveModel: Model<LiveDocument>,

    @InjectModel('Footages')
    private photoModel: Model<FootagesDocument>,

    private wxcloudService: WxcloudService,

    private footageService: FootageService

  ) { }
  async queryLivesByPage(param):Promise<Array<liveEntity>> {
    const { page, pageSize } = param
    const $ = this.wxcloudService.wxApp().database().command.aggregate
    const _ = this.wxcloudService.wxApp().database().command
    const lives = await this.wxcloudService.wxApp().database().collection("lives").aggregate().limit(pageSize).skip((page - 1) * pageSize).match({
      liveStatus: _.eq(10)
    }).lookup({
      from: "footages",
        let: {
          order_footages: '$footages',
        },
      pipeline: $.pipeline().match(
        _.expr(
          $.in(["$_id", "$$order_footages"]),
        )
        ).sort({
          sort: 1
        }).done(),
        as: "footageList"
  }).project({
      footages: 0
  }).sort({
    createTime:-1
  }).end().then(res =>
    res.data
  )
      // this.liveModel.find().populate("footageList").limit(pageSize).skip((page - 1) * pageSize);
    return lives
  }


  async addLives(param: addLives) {
    if (param.footageList.length > 0) {
      param.footageList.forEach((element,index) => {
        element.createTime = format("YYYY-MM-DD hh:mm:ss", (new Date()).getTime())
        element.sort = index
      });
      const data = await this.footageService.addFootage(param.footageList)
      param.footages = data.ids
    } else{
      param.footages = []
    }
    param.createTime = format("YYYY-MM-DD hh:mm:ss", (new Date()).getTime())
    delete param.footageList
    const mainData = await this.wxcloudService.collection("lives").add(param)
    return mainData
  }


  async removeLive(liveId: string) {
    const now = format("YYYY-MM-DD hh:mm:ss", (new Date()).getTime())
    const opera = await this.wxcloudService.collection("lives").doc(liveId).update({
      liveStatus: 4,
      deleteTime: now
    })
    return opera
  }
}
