import { BadRequestException, HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lives, LiveDocument, Footages, FootagesDocument } from "./schema/lives.schema";
import { PhotoEntity } from './transformer/photo';
import * as qs from 'qs';
import { WxcloudService } from '../modules/wxcloud/wxcloud.service';
import { FootageService } from 'src/footages/footage.service';
import { addLives } from './lives.dto';

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
  async queryLivesByPage(param) {
    const { page, pageSize } = param
    const $ = this.wxcloudService.wxApp().database().command.aggregate
    const _ = this.wxcloudService.wxApp().database().command
    const data = await this.wxcloudService.wxApp().database().collection("lives").aggregate().limit(pageSize).skip((page - 1) * pageSize).lookup({
      from: "footages",
        let: {
          order_footages: '$footages',
        },
      pipeline: $.pipeline().match(
        _.expr(
          $.in(["$id", "$$order_footages"]),
        )
        ).sort({
          createTime: -1
        }).done(),
        as: "footageList"
  }).project({
      footages: 0
  }).end().then(res=>res.data)
      // this.liveModel.find().populate("footageList").limit(pageSize).skip((page - 1) * pageSize);
    return data
  }


  async addLives(param: addLives) {

    const data = await this.footageService.addFootage(param.footageList)
    param.footageList = data.ids
    const mainData = await this.wxcloudService.collection("lives").add(param)
    return mainData
  }
}
