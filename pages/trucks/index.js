var app = getApp()
var event = require('../../utils/event')
Page({
  data: {
    head: {
      currentCity: '',
      placestr: '查找货源或车主'
    },
    indexData: {},
  },

  onLoad: function () {
    var that = this

    wx.request({
      url: 'http://' + app.globalData.host + '/api/truncks/index?city=' + that.data.currentCity + '&counts=' + that.data.counts + '&start=' + that.data.start,
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
  },    //下拉刷新
  onPullDownRefresh: function () {
    var that = this
    that.setData({
      start: 0
    })
    wx.request({
      url: 'http://' + app.globalData.host + '/api/truncks/index?city=' + that.data.head.currentCity + '&counts=' + that.data.counts + '&start=' + that.data.start,
      success: function (res) {
        console.log(res.data)
        that.setData({
          indexData: res.data.data,
          start: that.data.start + that.data.counts
        })
      },
      complete: function () {
        wx.stopPullDownRefresh()
      },
      fail: function () {
        wx.showToast({
          title: '刷新失败',
          icon: 'none',
          duration: 1000
        })
      }
    })
  }, //上拉更多
  onReachBottom: function () {
    var that = this
    var url = 'http://' + app.globalData.host + '/api/truncks/index?city=' + that.data.head.currentCity + '&counts=' + that.data.counts + '&start=' + that.data.start;
    console.log("nextPage url:" + url)
    wx.request({
      url: url,
      success: function (res) {
        var trucksList = that.data.indexData.trucks
        var nextLi = res.data.data.trucks;
        var newLi = trucksList.concat(nextLi)
        that.setData({
          'indexData.trucks': newLi,
          start: that.data.start + that.data.counts
        })
      }
    })
  }
})
