import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { DictService } from './dict.service';
import { CreateDictDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';

@ApiTags("字典")
@Controller('dict')
export class DictController {
  constructor(private readonly dictService: DictService) { }

  @Post("create")
  create(@Body() createDictDto: CreateDictDto) {
    return this.dictService.create(createDictDto);
  }

  @Post('getDict')
  findOne(@Body('dataCode') dataCode: string) {
    return this.dictService.findDict(dataCode);
  }

  @Post('update')
  update(@Body() updateDictDto: UpdateDictDto) {
    const id = updateDictDto._id
    return this.dictService.update(id,updateDictDto);
  }

  @Post('remove')
  remove(@Body("id") id: ObjectId) {
    return this.dictService.remove(id);
  }
}
