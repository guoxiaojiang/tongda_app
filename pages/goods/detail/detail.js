var app = getApp()
Page({
  data: {
    des: {},
    flexed: false,
    autoplay: false,
    indicator_dots: false
  },
  onLoad: function (param) {
    var that = this;
    var title = param.title;
    var id = param.id;
    wx.request({
      url: 'http://' + app.globalData.host + '/api/goodsDetail?title=' + param.title,
      data: {},
      success: function (res) {
        that.setData({
          des: res.data.data
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
      phoneNumber: that.data.des.phoneNum,
    })
  },

  navi: function () {
    var that = this
    wx.openLocation({
      latitude: parseFloat(that.data.des.latitude),
      longitude: parseFloat(that.data.des.longitude),
    })
  }
})