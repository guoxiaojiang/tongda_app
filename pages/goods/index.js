var app = getApp()
var event = require('../../utils/event')
Page({
    data: {
        head: {
            currentCity: '',
            placestr: '查找货源或车主'
        },
        indexData: {},
        counts: 10,
        start: 0,
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        index: 2
    },

    onLoad: function () {
        var that = this
        
        wx.request({
          url: 'http://' + app.globalData.host + '/api/index?city=' + that.data.currentCity + '&counts=' + that.data.counts + '&start=' + that.data.start,
            success: function (res) {
                console.log(res.data)
                that.setData({
                    indexData: res.data.data,
                    start: that.data.start + that.data.counts
                })
            }
        })
       
    },
    onShow: function () {
        console.log('index-onShow')
        var that = this
        app.getpol(
            function (currentCity) {
              console.log('getpol:' + currentCity)
                that.setData({
                    'head.currentCity': currentCity
                })
            }
        )
    },
    //下拉刷新
    onPullDownRefresh: function () {
      var that = this
      that.setData({
        start: 0
      })
      wx.request({
        url: 'http://' + app.globalData.host + '/api/index?city=' + that.data.head.currentCity + '&counts=' + that.data.counts + '&start=' + that.data.start,
        success: function (res) {
          console.log(res.data)
          that.setData({
            indexData: res.data.data,
            start: that.data.start + that.data.counts
          })
        },
        complete: function() {
          wx.stopPullDownRefresh()
        },
        fail: function() {
          wx.showToast({
            title: '刷新失败',
            icon: 'none',
            duration: 1000
          })
        }
      })
    },
    onReachBottom: function () {
        var that = this
        var url = 'http://' + app.globalData.host + '/api/index?city=' + that.data.head.currentCity + '&counts=' + that.data.counts + '&start=' + that.data.start;
        console.log("nextPage url:" + url)
        wx.request({
          url: url,
            success: function (res) {
              var goodsList = that.data.indexData.goodsList
              var nextLi = res.data.data.goodsList;
              var newLi = goodsList.concat(nextLi)
                that.setData({
                    'indexData.goodsList': newLi,
                    start: that.data.start + that.data.counts
                })
            }
        })
    }
})
