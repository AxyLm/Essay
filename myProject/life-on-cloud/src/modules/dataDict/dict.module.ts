import { Module } from '@nestjs/common';
import { DictService } from './dict.service';
import { DictController } from './dict.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { dict, dictSchema } from './dict.interface';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: dict.name,
      schema: dictSchema,
      collection:"dataDicts"
    }
  ])],
  controllers: [DictController],
  providers: [DictService]
})
export class DictModule {}
