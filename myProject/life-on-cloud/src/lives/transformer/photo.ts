import { Exclude, Expose, Type } from 'class-transformer';
import { ObjectId } from 'mongoose';

export class PhotoEntity {
    @Exclude()
    _id: ObjectId;

    @Exclude()
    name: string;
    age: number;
    breed: string ;
    breeds: string;
    

    constructor(partial: Partial<PhotoEntity>) {
        Object.assign(this, partial);
    }
}

export class FootagesEntity {
    source: string;
    path: string;
    createTime: string;
    updateTime: string;
    dataStatus: string;
}
