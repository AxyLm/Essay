import { Exclude, Expose } from "class-transformer";


export class liveEntity {
    footageList: Array<FootagesEntity>;
    @Exclude()
    footages: [];

    @Exclude()
    _id: string;
    createTime: string;

    @Expose()
    get id(): string {
        return this._id
    }

    tripStartTime: string;

    tripEndTime: string;

    content: string;

    place: string;
    like: number;

    liveStatus: number;

    constructor(partial: Partial<liveEntity>) {
        Object.assign(this, partial);
    }
}


export class FootagesEntity {
    @Exclude()
    _id: string;
    createTime: string;
    url: string;
    showType:  string;
    @Expose()
    get id(): string {
        return this._id
    }

    constructor(partial: Partial<FootagesEntity>) {
        Object.assign(this, partial);
    }
}