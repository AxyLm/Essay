import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import * as moment from "moment"
import { number } from "@hapi/joi";

@Schema()
export class dict extends Document {

    @Prop({ default: 0, required: true })
    dataCode: string;

    @Prop({ required: true, default: "", })
    name: string;

    @Prop({ required: true })
    dictCode: string;

    @Prop({ required: true })
    dictValue: string;

    @Prop({ default: null })
    parent: string;

    @Prop({ default: moment().format("YYYY-MM-DD HH:mm:ss") })
    createTime: string;

    @Prop({ default: moment().format("YYYY-MM-DD HH:mm:ss") })
    updateTime: string;

    @Prop({ default: 2 })
    status: number;

    @Prop({ default: ""})
    remark: string;

}

export const dictSchema = SchemaFactory.createForClass(dict)
