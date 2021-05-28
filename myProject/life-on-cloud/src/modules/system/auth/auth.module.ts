import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';

@Module({
    imports: [UserModule, PassportModule],
    controllers: [
        AuthController,],
    providers: [
        AuthService, LocalStrategy],
})
export class AuthModule { }
