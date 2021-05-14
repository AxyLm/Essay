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
        pageSize:10
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const _this = this
        wx.showLoading()
        setTimeout(()=>{
            wx.hideLoading()
        },3000)
        this.getLives().then(()=>{
            wx.hideLoading()
        }).catch(err=>{
            wx.hideLoading()
        })

        const topbanner = wx.getStorageSync("topbanner")
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
                    wx.setStorageSync("topbanner", res.data[0].value)
                    this.setData({
                        topBanner:res.data[0].value
                    })
                }
            }
        }))

        wx.getUserInfo({
            success: function (res) {
                fetch({
                    name: "login",
                    data: {data:res.userInfo},
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.setData({
            page:1
        })
        this.getLives().then(()=>{
            wx.stopPullDownRefresh()
        }).catch(()=>{
            wx.stopPullDownRefresh()
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    imageShow:function(e) {
        var {list ,index} = e.target.dataset
        wx.previewMedia({
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
            wx.showNavigationBarLoading()
            fetch({
                name: "lives",
                data: {
                    page:this.page,
                    pageSize:this.pageSize
                },
            }).then(resolve => {
                wx.hideLoading()
                wx.hideNavigationBarLoading()
                if(resolve.code == 200){
                    resolve.data.forEach(element => {
                        return element.createTimes = formaTime( new Date(element.createTime).getTime())
                    })
                    this.setData({
                        lives: resolve.data
                    })
                    then(resolve)
                }
            }).catch((err)=>{
                wx.hideLoading()
                wx.hideNavigationBarLoading()
                console.log(err)
                reject(err)
            })
        })
    },
})