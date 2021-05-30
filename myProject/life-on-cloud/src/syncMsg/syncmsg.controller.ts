import { Body, Controller, Param, Post } from '@nestjs/common';
import { sendMsgDto } from './syncmsg.dto';
import { SyncmsgService } from './syncmsg.service';
import * as moment from 'moment';

@Controller("msg")
export class SyncmsgController {

    constructor(
        private readonly syncMsgService:SyncmsgService
    ) { }

    @Post("sendMsg")
    send(@Body() param: sendMsgDto) {
        param.sendTime = moment(param.sendTime).format("YYYY-MM-DD HH:mm:ss")
        return this.syncMsgService.sendMsg(param)
    }

    @Post("getMsgs")
    findMsgList(@Body() param ) {
        return this.syncMsgService.findMsgList(param)
    }

}
