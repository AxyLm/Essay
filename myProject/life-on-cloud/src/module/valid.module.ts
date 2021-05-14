import { Module } from '@nestjs/common';
import { ValidationPipe } from "../pipes/valid.pipe"
@Module({
    providers: [ValidationPipe],
})
export class ValidModule { }
