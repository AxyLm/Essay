import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const tcb = require("@cloudbase/node-sdk");

@Injectable()
export class WxcloudService {
    private readonly cloud: object;
    private updateTime : number = (new Date()).getTime();
    private app = null;

    constructor(
        private readonly configService:ConfigService
    ) { }
    
    init() {
        const {secretId,secretKey,env} = this.configService.get("WXCLOUD")
        const app = tcb.init({secretId,secretKey,env});
        this.app = app
        return this.app
    }

    /**
     *
     *
     * @param {number} intervalTime wxSdk更新间隔
     * @return {*} app
     * @memberof WxcloudService
     */
    wxApp(intervalTime:number = 60) {
        // 大于60秒  重新初始化 wxSdk
        const now = (new Date()).getTime()
        if (!this.app || (this.updateTime - now) > intervalTime * 1000) {
            this.updateTime = now
            return this.init()
        }
        return this.app
    }
    collection(name: string) {
        if (name) {
            const app = this.wxApp()
            return app.database().collection(name)
        } else {
            return null
        }
    }

    command() {
        return this.wxApp().database().command
    }

    async testFind() {
        const db = this.wxApp().database();
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
