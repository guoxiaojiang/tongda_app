// pages/trucks/detail/truck-details.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    des: {},
    flexed: false,
    autoplay: false,
    indicator_dots: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (param) {
    var that = this;
    var title = param.title;
    var id = param.id;
    wx.request({
      url: 'http://' + app.globalData.host + '/api/truckDetail?title=' + param.title + '&id=' + param.id,
      data: {},
      success: function (res) {
        that.setData({
          des: res.data.data
        })
      }
    })
  },

  /**
   * 拨打电话
   */
  callPhone: function () {
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.des.phoneNum,
    })
  },

/**
 * 查看位置
 */
  showAddress: function () {
    var that = this
    wx.openLocation({
      latitude: parseFloat(that.data.des.latitude),
      longitude: parseFloat(that.data.des.longitude),
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

  }
})