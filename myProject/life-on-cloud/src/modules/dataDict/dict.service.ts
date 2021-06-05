import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model, ObjectId } from 'mongoose';
import { dict } from './dict.interface';
import { CreateDictDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';

@Injectable()
export class DictService {
  constructor(
    @InjectModel(dict.name)
    private readonly dictModel:Model<dict>
  ){}
  async create(createDictDto: CreateDictDto) {
    return await (new this.dictModel(createDictDto)).save()
  }

  async findDict(dataCode: string) {
    const data = await this.dictModel.find({dataCode:dataCode,status:2},"-__v").exec()
    return data
  }

  async update(id: ObjectId, updateDictDto: UpdateDictDto) {
    delete updateDictDto._id
    updateDictDto.updateTime = moment().format("YYYY-MM-DD HH:mm:ss")
    await this.dictModel.findByIdAndUpdate(id,updateDictDto)
    return updateDictDto
  }

  async remove(id: ObjectId) {
    const data = await this.dictModel.findByIdAndUpdate(id, { status: 3, updateTime: moment().format("YYYY-MM-DD HH:mm:ss") })
    return data
  }

  async getDictValueByCode(dataCode, dictCode): Promise<string> {
    const data = await this.dictModel.findOne({ dataCode, dictCode })
    return data.dictValue
  }
}
