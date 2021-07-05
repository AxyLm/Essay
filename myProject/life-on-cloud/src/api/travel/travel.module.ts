import { TravelService } from './travel.service';
import { TravelController } from './travel.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { KboxModule } from 'src/modules/kbox/kbox.module';
import { MongooseModule } from '@nestjs/mongoose';
import { kdFile } from 'src/modules/kbox/interface/kdfile.interface';
import { kdFileScheme } from 'src/modules/kbox/scheme/kdFile.scheme';

@Module({
    imports: [
        KboxModule,
        MongooseModule.forFeature([
            {
                name: kdFile.name,
                schema: kdFileScheme
            }
        ])
    ],
    controllers: [
        TravelController,],
    providers: [
        TravelService,],
})
export class TravelModule { }
