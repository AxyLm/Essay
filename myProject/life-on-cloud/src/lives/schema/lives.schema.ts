import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

export type LiveDocument = Lives & Document;
@Schema()
export class Lives extends Document {
  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Footages' }
    ]
  })
  footageList:  Footages[] ;

  @Prop({ required: true })
  createTime: string;

  @Prop({ default: null })
  tripStartTime: string;

  @Prop({ default: null })
  tripEndTime: string;

  @Prop({ default: "" })
  content: string;

  @Prop({ default: null })
  place: string;

  @Prop({ default: 0 })
  like: number;

}
export const LiveSchema = SchemaFactory.createForClass(Lives);



export type FootagesDocument = Footages & Document;
@Schema()
export class Footages extends Document {

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
export const FootageSchema = SchemaFactory.createForClass(Footages);

