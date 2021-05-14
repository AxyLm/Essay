import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lives, LiveDocument,Footages,FootagesDocument } from "./schema/lives.schema";
import { PhotoEntity } from './transformer/photo';
import * as qs from 'qs';

// import { LivePhotos,photoDocument } from "./schema/photos.schema";
@Injectable()
export class LiveService {
  constructor(
    @InjectModel('Lives')
    private liveModel: Model<LiveDocument>,

    @InjectModel('Footages')
    private photoModel: Model<FootagesDocument>,

  ) { }
  async queryLivesByPage(param): Promise<any[]> {
    const {page,pageSize} = param
    const data = await this.liveModel.find().populate("footageList").limit(pageSize).skip((page - 1) * pageSize);
    return data
  }
}
