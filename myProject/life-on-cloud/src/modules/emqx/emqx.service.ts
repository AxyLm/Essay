import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mqtt  from 'mqtt';

@Injectable()
export class EmqxService {
    private client = null;
    private readonly emqxConfig;
    private emqxConnectOption:object;
    constructor(
        private readonly configService: ConfigService
    ) {
        this.emqxConfig = this.configService.get("EMQX");
        this.emqxConnectOption = {
            username:this.emqxConfig.MSG_ACCOUNT,
            password:this.emqxConfig.MSG_PS,
            clientId: 'Nodejs-ed16ef77-5cf2-4e5c-b511-1af14451df58'
        };
        this.connect()
    }
    connect() {
        if (this.client) {
            return this.client
        } else {
            this.client = mqtt.connect(this.emqxConfig.SOCKET_URL, this.emqxConnectOption)
            return this.client
        }
    }

}
