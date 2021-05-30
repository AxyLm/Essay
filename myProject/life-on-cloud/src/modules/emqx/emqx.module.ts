import { EmqxService } from './emqx.service';
import { HttpModule, Module } from '@nestjs/common';

@Module({
    imports: [
        HttpModule
    ],
    controllers: [],
    providers: [
        EmqxService,],
    exports:[EmqxService]
})
export class EmqxModule { }
