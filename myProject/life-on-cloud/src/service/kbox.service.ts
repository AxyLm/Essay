import { HttpService, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KboxService {
    httpService: HttpService;
    constructor(
        private configService: ConfigService
) { }
    private accToken: String
    async getToken() {
        return await this.accToken
    }

    async Upload() {
        const url = this.configService.get("KODBOX.URL")
        return 0
    }
}
