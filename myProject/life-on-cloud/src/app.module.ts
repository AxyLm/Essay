import { KboxModule } from './shard/kodbox/kbox.module';
import { GlobalModule } from './modules/global.module';
import { LivesModule } from './lives/lives.module';

import { Module, HttpModule, Global } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { ValidModule } from "./module/valid.module"
import { HttpExceptionFilter } from "./ExceptionFilter/HttpException";


@Module({
  imports: [
    KboxModule,
    GlobalModule,
    LivesModule,
    ValidModule,
    // HttpModule,
    // ConfigModule,
    // KodboxModule
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
