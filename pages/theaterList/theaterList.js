var util = require('../../utils/util.js');
var weekday = util.getWeek(12);
var app = getApp();
Page({
  data: {
    activeIndex: 0,
    weekday: weekday,
    currentCity: '',
    theater: []
  },
  onLoad: function (options) {
    var id = options.id;
    var title = options.title;
    wx.setNavigationBarTitle({
      title: title
    })
    var that = this;
    wx.request({
      url: 'http://' + app.globalData.host + '/data/indexTheater?city='+that.data.currentCity+'&id='+id+'&index=0',
      success: function (res) {
        that.setData({
          theater: res.data.data
        })
      }
    })
  },
  selDate: function (ev) {
    this.setData({
      activeIndex: ev.target.id
    })
    wx.request({
      url: 'http://' + app.globalData.host + '/data/indexTheater?city='+that.data.currentCity+'&id='+id+'&index='+ev.target.id,
      success: function (res) {
        that.setData({
          theater: res.data.data
        })
      }
    })
  }
})