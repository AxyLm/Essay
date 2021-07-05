/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { kdFile } from 'src/modules/kbox/interface/kdfile.interface';
import { KboxService } from 'src/modules/kbox/kbox.service';

@Injectable()
export class TravelService {
    constructor(
        @InjectModel(kdFile.name)
        private readonly kdFileModel:Model<kdFile>
    ) { }
    
    async findAllMedia() {
        return await this.kdFileModel.find()
    }
}
