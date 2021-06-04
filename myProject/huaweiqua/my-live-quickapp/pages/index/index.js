// pages/index.js
import { fetch, formaTime } from "../tool"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        lives: [],
        topBanner:null,
        page:1,
        pageSize:10,
        triggered:false,
        scrollStatus:"loading",
        endText:"没有更多了"
    },

    onReady:function(){
        qa.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        })
    },
    onLoad: function (options) {
        const _this = this
        qa.showLoading({
            title:"稍等..."
        })
        setTimeout(()=>{
            qa.hideLoading()
        },3000)
        this.getLives().then(()=>{
            qa.hideLoading()
        }).catch(err=>{
            qa.hideLoading()
        })

        const topbanner = qa.getStorageSync("topbanner")
        if (topbanner) {
            this.setData({
                topBanner:topbanner
            })
        }
        fetch({
            name: "redis",
            data: { key: "topbanner" },
        }).then((res => {
            if (res.code == 200 && res.data.length > 0) {
                if (topbanner != res.data[0].value) {
                    qa.setStorageSync("topbanner", res.data[0].value)
                    this.setData({
                        topBanner:res.data[0].value
                    })
                }
            }
        }))

// 暂不支持api qa.getUserInfo TODO
        qa.getUserInfo({
            desc:"用于头像显示",
            success: function (res) {
                fetch({
                    name: "login",
                    data: {data:res.userInfo},
                })
            }
        })
    },




    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.setData({
            page:1
        })
        this.getLives().then(()=>{
            qa.stopPullDownRefresh()
        }).catch(()=>{
            qa.stopPullDownRefresh()
        })
    },

    pageRefresh:function(e){
        this.setData({
            page:1,
            scrollStatus:"loading"
        })

        this.getLives().then(()=>{
            this.setData({
                triggered:false
            })
        })
    },
    scrolltolower:function(){
        if(this.data.scrollStatus != "end"){

            let page = this.data.page+1
            this.setData({
                page:page
            })
            console.log(page)
            this.getLives()
        }
    },
    scrollTop:function(e){
        console.log(e)
    },
    imageShow:function(e) {
        var {list ,index} = e.target.dataset
        qa.previewMedia({
            sources: list.map(e => {
                return {
                    url: e.url,
                    type: e.showType
                }
            }),
            current: index
        })
    },
    getLives(){
        return new Promise((then,reject)=>{
            qa.showNavigationBarLoading()
            const {page,pageSize} = this.data
            fetch({
                name: "lives",
                data: {
                    page:page,
                    pageSize:pageSize
                },
            }).then(resolve => {
                qa.hideLoading()
                qa.hideNavigationBarLoading()
                if(resolve.code == 200){
                    let list = []
                    resolve.data.forEach(element => {
                        return element.createTimes = formaTime( new Date(element.createTime).getTime())
                    })
                    if(this.data.page != 1){
                        list = this.data.lives
                        if(resolve.data.length != this.data.pageSize){
                            this.setData({
                                scrollStatus:"end"
                            })
                        }
                    }
                    list = list.concat(resolve.data)
                    this.setData({
                        lives: list
                    })
                    then(resolve)
                }
            }).catch((err)=>{
                qa.hideLoading()
                qa.hideNavigationBarLoading()
                console.log(err)
                reject(err)
            })
        })
    },
})