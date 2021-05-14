import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FootageModule } from 'src/footages/footage.module';
import { WxcloudModule } from 'src/modules/wxcloud/wxcloud.module';
import { LivesController } from "./lives.controller"
import { LiveService } from "./lives.service"
import { Lives,LiveSchema,Footages,FootageSchema } from "./schema/lives.schema";
// import { LivePhotos,photoSchema } from "./schema/photos.schema";
@Module({
    imports: [
        FootageModule,
        WxcloudModule,
        HttpModule,
        MongooseModule.forFeature([
            { name: Lives.name, schema: LiveSchema },
            { name: Footages.name, schema: FootageSchema },
        ])
    ],
    controllers: [LivesController],
    providers: [LiveService],
})
export class LivesModule {}
