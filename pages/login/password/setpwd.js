var util = require('../../../utils/util.js')
var md5 = require('../../../utils/md5.js')
var app = getApp()
Page({
  data: {
    pwd : "",
    confirmpwd : ""
  },
  onInputPwd: function (e) {
    this.setData({
      pwd: e.detail.value
    });
  },
  onInputConfirmPwd: function (e) {
    this.setData({
      confirmpwd: e.detail.value
    });
  },

  doRegist: function () {

    var pwd = this.data.pwd
    var confirmpwd = this.data.confirmpwd
    if (pwd !== confirmpwd) {
      wx.showToast({
        title: '两次密码不一致！',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (pwd.length < 8) {
      wx.showToast({
        title: '密码位数不符合要求',
        icon: 'none',
        duration: 2000
      })
      return;
    }


   pwd = md5.hexMD5(pwd);
   confirmpwd = md5.hexMD5(confirmpwd);
   console.log("pwd is:" + pwd +  ", confirm:" + confirmpwd)

   var registData = {
     pwd: pwd,
     phoneNum: app.globalData.moble,
     nickName: app.globalData.nickName,
     avatarUrl: app.globalData.avatarUrl
   }

  var that = this;
   wx.request({
     url: 'http://' + app.globalData.host + '/api/register',
     data: registData,
     method: "POST",
     header: {
       "Content-Type": "application/x-www-form-urlencoded"
     },
     success: function (res) {
       console.log(res.data)
       wx.showToast({
         title: '修改密码成功',
         icon: 'success',
         duration: 2000
       })
        wx.reLaunch({
          url: '../../goods/index'
        })
     }
   })

  },

  skip: function () {
    wx.reLaunch({
      url: '../../goods/index'
    })
  }

})