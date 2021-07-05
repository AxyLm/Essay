/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { TravelService } from './travel.service';

@Controller("travel")
export class TravelController {
    constructor(
        private readonly travelService:TravelService
    ) { }
    @Get("mediaList")
    findAllMedia() {
        return this.travelService.findAllMedia()
    }
}
