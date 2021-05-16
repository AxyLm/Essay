import { Injectable } from '@nestjs/common';
const tcb = require("@cloudbase/node-sdk");

@Injectable()
export class WxcloudService {
    private readonly cloud: object;
    private app = tcb.init({
        secretId: "AKIDkLifPvBCyVmocBUWKsAC4i7HBqFOLBn8",
        secretKey: "80cy4vd7KHyQbWn59xVnpbDbpnY3II5c",
        env: "lives-1grzxd6l364d3b9b"
    });
    constructor() { }
    
    async init() {
        const app = tcb.init({
            secretId: "AKIDkLifPvBCyVmocBUWKsAC4i7HBqFOLBn8",
            secretKey: "80cy4vd7KHyQbWn59xVnpbDbpnY3II5c",
            env: "lives-1grzxd6l364d3b9b"
        });

        const db = app.database();
        const collection = db.collection("lives")
        const data = await  collection.aggregate().limit(10).skip(0).lookup({
            from: "footages",
            localField: 'footages',
            foreignField: 'id',
            as: "footageList"
        }).project({
            footages: 0
        }).end()
        return   data
    }

    collection(name: string) {
        if (name) {
            return this.app.database().collection(name)
        } else {
            return null
        }
    }

    command() {
        return this.app.database().command
    }

    wxApp() {
        return this.app
    }

    async getLives() {
        return await this.collection("lives").aggregate().limit(10).skip(0).lookup({
            from: "footages",
            localField: 'footages',
            foreignField: 'id',
            as: "footageList"
        }).project({
            footages: 0
        }).end()
    }
}
