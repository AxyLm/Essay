import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LivesController } from "./lives.controller"
import { LiveService } from "./lives.service"
import { Lives,LiveSchema,Footages,FootageSchema } from "./schema/lives.schema";
// import { LivePhotos,photoSchema } from "./schema/photos.schema";
@Module({
    imports: [
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
