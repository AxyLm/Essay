import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Date, Document, ObjectId } from 'mongoose';


export type kdFileDocument = kdFile & Document;
@Schema()
export class kdFile extends Document {
    @Prop()
    name: string;

    @Prop()
    path: string;

    @Prop()
    type: string;

    @Prop()
    ext: string;

    @Prop()
    size: string;

    @Prop()
    createTime: string;

    @Prop()
    modifyTime: string;

    @Prop()
    targetType: string;

    @Prop()
    targetID: string;

    @Prop()
    isDelete: string;

    @Prop()
    pathDisplay: string;

    @Prop()
    parentLevel: string;

    @Prop()
    sourceID: string;

    @Prop()
    parentID: string;

    @Prop()
    isFolder: string;

    @Prop({type: Date})
    createTimes;
    // @Prop()
    // metaInfo: boolean | any;

    // @Prop()
    // canDownload: boolean;

    // @Prop()
    // createUser: createUser;

    // @Prop()
    // modifyUser: modifyUser;

    // @Prop(
    //     raw({})
    // )
    // fileInfo:fileInfoSchema
    // @Prop()
    // sourceInfo: sourceInfo;

    // @Prop()
    // fileInfoMore: fileInfoMore
}
export const kdFileScheme = SchemaFactory.createForClass(kdFile)

// @Schema()
// export class createUser extends Document {
//     @Prop()
//     userID:string;

//     @Prop()
//     nickName:string;

//     @Prop()
//     name:string;

//     @Prop()
//     avatar:string;

//     @Prop()
//     sex:string;

// }

// @Schema()
// export class modifyUser extends Document{
//     @Prop()
//     userID:string;

//     @Prop()
//     nickName:string;

//     @Prop()
//     name:string;

//     @Prop()
//     avatar:string;

//     @Prop()
//     sex:string;
// }

// @Schema()
// export class sourceInfo extends Document{
//     @Prop()
//     isFav: number;

//     @Prop()
//     tagInfo: number;

//     @Prop()
//     shareInfo: number;

// }

@Schema()
export class fileInfoSchema extends Document{
    @Prop()
    fileID: string;

    @Prop()
    hashSimple: string;

    @Prop()
    hashMd5: string;

    @Prop()
    linkCount: string;

}

// @Schema()
// export class fileInfoMore extends Document{
//     @Prop()
//     sizeWidth: number;

//     @Prop()
//     sizeHeight: number;

//     @Prop()
//     playtime: number;

//     @Prop()
//     createTime: string;

//     @Prop()
//     playtimeShow: string;

//     @Prop()
//     modifyTime: string;

//     @Prop()
//     fileType: string;

//     @Prop()
//     audio: audio
// }

// @Schema()
// export class audio extends Document {
//     @Prop()
//     channel: number;

//     @Prop()
//     charatennel: number;

//     @Prop()
//     dataformat: string;

//     @Prop()
//     bitPerSimple: number;

// }


