var app = getApp()
Page({
  data: {
    flexed: false,
    autoplay: false,
    indicator_dots: false,
    detailData: {}
  },
  onLoad: function (param) {
    var that = this;
    var goodsId = param.goodsId
    console.log("goodsId:" + goodsId)
    wx.request({
      url: 'http://' + app.globalData.host + '/api/detail?id=' + goodsId,
      success: function (res) {
        console.log(res.data)
        console.log("coverImgs typeof:" + res.data.data.coverImgs)
        that.setData({
          detailData: res.data.data
        })
      }
    })

  },
  flex: function () {
    var that = this
    this.setData({
      flexed: !that.data.flexed
    })
  },
  callPhone: function () {
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.detailData.phoneNum,
    })
  },

  naviFrom: function () {
    var that = this
    wx.openLocation({
      latitude: parseFloat(that.data.detailData.fromLatitude),
      longitude: parseFloat(that.data.detailData.fromLongitude),
    })
  },

   naviTo: function () {
    var that = this
    wx.openLocation({
      latitude: parseFloat(that.data.detailData.toLatitude),
      longitude: parseFloat(that.data.detailData.toLongitude),
    })
  }
})