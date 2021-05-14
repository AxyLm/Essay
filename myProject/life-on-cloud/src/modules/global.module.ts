import { Global, Module, HttpService, HttpModule } from '@nestjs/common';
import customConfig from '../config';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [customConfig],
            isGlobal: true,
        }),
        MongooseModule.forRoot(customConfig().MONGODB.CONNECT,{useNewUrlParser: true,useUnifiedTopology: true}),
        HttpModule
    ],
    providers: [ConfigService],
    exports:[ConfigService,HttpService]
})
export class GlobalModule { }
