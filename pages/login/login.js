var base = getApp();
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: 1,
    btnStatus: true,//倒计时已结束
    sec: 0,
    phone: "",
    phoneOk: false,
    code: "",
    vcode: "",
    codeOk: false,
    pwd: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  checkPhone: function (e) {
    var v = e.detail.value;
    if (v && v.length == 11) {
      this.setData({
        phone: v,
        phoneOk: true
      });
    } else {
      this.setData({
        phone: "",
        phoneOk: false
      });

    }
  },
  checkCode: function (e) {
    var v = e.detail.value;
    if (v && v.length > 3) {
      this.setData({
        code: v,
        codeOk: true
      });
    } else {
      this.setData({
        code: "",
        codeOk: false
      });
    }
  },

  sendCode: function () {
    var that = this
    if (!util.checkPhone(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.request({
      url: 'http://' + base.globalData.host + '/api/verify?phone=' + that.data.phone,
      success: function (res) {
        console.log(res.data)
        that.setData({
          vcode: res.data.vcode,
        })
      }
    })
  },

  changeTab: function (e) {
    var d = e.currentTarget.dataset.index;
    this.setData({ tab: d });
  },
  changepwd: function (e) {
    this.setData({
      pwd: e.detail.value
    });
  },

  login: function () {
    //   if (this.key) {
    var flag = true;
    var err = "";
    if (this.data.phoneOk) {
      if (this.data.tab == 1) {
        if (!this.data.pwd) {
          flag = false;
          err = "请输入密码！";
        }
      }
      else {
        if (!this.data.code) {
          flag = false;
          err = "请输入手机验证码";
        }

      }

      if (this.data.code === this.data.vcode) {
        //验证成功，登录 or 注册
        console.log('登录成功！');
        wx.reLaunch({
          url: '../goods/index'
        })
        wx.setStorage({
          key: "mobile",
          data: this.data.phone
        })
      } else {
        wx.showToast({
          title: '验证码错误！',
          icon: 'none',
          duration: 2000
        })
      }
    }
  }
})