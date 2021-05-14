import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type photoDocument = LivePhotos & Document;

@Schema()
export class LivePhotos extends Document {
  @Prop()
  source: string;

  @Prop()
  path: string;

  @Prop()
  createTime: string;

  @Prop()
  updateTime: string;

  @Prop()
  dataStatus: string;
}

export const photoSchema = SchemaFactory.createForClass(LivePhotos);