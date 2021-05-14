import { KboxController } from './kbox.controller';
import { KboxService } from './kbox.service';
import { HttpModule, Module } from '@nestjs/common';
@Module({
    imports: [
        HttpModule
    ],
    controllers: [
        KboxController,],
    providers: [
        KboxService,],
})
export class KboxModule { }
