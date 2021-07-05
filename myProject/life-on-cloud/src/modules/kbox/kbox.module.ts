import { KboxController } from './kbox.controller';
import { KboxService } from './kbox.service';
import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { kdFile } from './interface/kdfile.interface';
import { kdFileScheme } from './scheme/kdFile.scheme';

@Module({
    imports: [
        HttpModule,
        MongooseModule.forFeature([
            {
                name: kdFile.name,
                schema: kdFileScheme
            }
        ])
    ],
    controllers: [
        KboxController,],
    providers: [
        KboxService,],
    exports:[KboxService]
})
export class KboxModule { }
