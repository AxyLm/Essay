import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class sendMsgDto {
    @ApiProperty({
        description:"内容"
    })
    @Exclude()
    content: string;

    @ApiProperty({
        description:"消息类型"
    })
    @IsNotEmpty()
    msgType: number;

    @ApiProperty({
        description:"发送时间"
    })
    @IsNotEmpty()
    sendTime: string;

    @ApiProperty({
        description:"发送账号"
    })
    @Exclude()
    sendAccount: string;
}