import { SyncmsgController } from './syncmsg.controller';
import { SyncmsgService } from './syncmsg.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { syncMsg, syncMsgSchema } from './interface/sync.interface';
import { EmqxModule } from 'src/modules/emqx/emqx.module';

@Module({
    imports: [
        EmqxModule,
        MongooseModule.forFeature([
            {
                name: syncMsg.name,
                schema: syncMsgSchema,
                collection:"send_msg"
            }
        ])
    ],
    controllers: [
        SyncmsgController,],
    providers: [
        SyncmsgService,],
})
export class SyncMsgModule { }
