import { Exclude } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class sendMsgDto {
    @Exclude()
    content: string;

    @IsNotEmpty()
    msgType: number;

    @IsNotEmpty()
    sendTime: string;

    @Exclude()
    sendAccount: string;
}