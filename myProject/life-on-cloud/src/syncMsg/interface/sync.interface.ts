import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";

@Schema()
export class syncMsg extends Document {

    @Prop()
    content: string;

    @Prop()
    @ApiProperty({
        default:"消息同步"
    })
    msgType: number;

    @Prop()
    sendTime: string;

    @Prop()
    sendAccount: string;

}

export const syncMsgSchema = SchemaFactory.createForClass(syncMsg)
