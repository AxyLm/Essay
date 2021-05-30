import { EmqxModule } from './modules/emqx/emqx.module';
import { SyncMsgModule } from './syncMsg/syncmsg.module';
import { GlobalModule } from './modules/global.module';

import { DbModule } from './modules/db/db.module';
import { UserModule } from './modules/system/user/user.module';
import { AuthModule } from './modules/system/auth/auth.module';
import { KboxModule } from './modules/kbox/kbox.module';
import { LivesModule } from './lives/lives.module';
import { QiniuModule } from './modules/qiniu/qiniu.module';

import { Module, HttpModule, Global } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { ValidModule } from "./module/valid.module"
import { HttpExceptionFilter } from "./ExceptionFilter/HttpException";
import { WxcloudModule } from './modules/wxcloud/wxcloud.module';


@Module({
  imports: [
    EmqxModule,
    SyncMsgModule,
    DbModule,
    UserModule,
    AuthModule,
    GlobalModule,
    LivesModule,
    KboxModule,
    ValidModule,
    QiniuModule,
    WxcloudModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule { }
