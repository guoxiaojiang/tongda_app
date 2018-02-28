Page({

  /**
   * 页面的初始数据
   */
  data: {
    userImage: '',
    userName: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    wx.getUserInfo({
      success: function (res) {
        _this.setData({
          userImage: res.userInfo.avatarUrl,
          userName: res.userInfo.nickName
        })
      }
    })

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




  }
})