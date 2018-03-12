var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userImage: '',
    userName: '',
    mobile:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    
    wx.getStorage({
      key: 'mobile',
      success: function (res) {
        console.log("saved mobile:" + res.data)
      },
      fail: function (err) {
        console.log("saved error:" + JSON.stringify(err))
        wx.redirectTo({
          url: '../login/login',
        })
      }
    })

    this.setData({
      mobile: app.globalData.moble
    })
    
    
    wx.getUserInfo({
      success: function (res) {
        console.log("getuser info:" + res.userInfo.nickName)
        _this.setData({
          userImage: res.userInfo.avatarUrl,
          userName: res.userInfo.nickName
        })
        app.globalData.avatarUrl = res.userInfo.avatarUrl
        app.globalData.nickName = res.userInfo.nickName
      }
    })
  }
})