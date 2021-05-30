import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IsEmpty, IsNotEmpty } from 'class-validator';
import { Model } from 'mongoose';
import * as qs from 'qs';
import { EmqxService } from 'src/modules/emqx/emqx.service';
import { syncMsg } from './interface/sync.interface';
import { sendMsgDto } from './syncmsg.dto';

@Injectable()
export class SyncmsgService {
    constructor(
        private readonly emqxService: EmqxService,

        @InjectModel(syncMsg.name)
        private readonly syncModal: Model<syncMsg>,
    ) { }
    async sendMsg(param):Promise<any> {
        const cteatedMsg = new this.syncModal(param);
        const data = await cteatedMsg.save()
        let msgPutStatus;
        if (IsNotEmpty(cteatedMsg._id)) {
            await new Promise((res, rej) => {
                this.emqxService.connect().publish('sendmsg', JSON.stringify(data), {
                    qos: 2,
                    retain:true,
                }, function (err) {
                    if (IsEmpty(err)) {
                        msgPutStatus = true
                        console.log('消息发送成功')
                        res(true)
                    } else {
                        rej(err)
                    }
                })
            })
        }
        
        return {
            param: data,
            msgPutStatus
        };
    }


    async findMsgList(param): Promise<Array<any>>{
        return await this.syncModal.find({})
    }
}
