// pages/search/search.js
var app = getApp()
Page({
  data: {
    search: {
      placeholder: '找货源,车源',
      his: ['钢铁', '大货车', '小箱车']
    },
    theater: []

  },
  onLoad: function (options) {

  },
  searchinput: function (ev) {
    var that = this
    var value = ev.detail.value
    console.log(value)
    wx.request({
      url: 'http://' + app.globalData.host + '/api/search',
      data: {
        key: value
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        var data = res.data
        if (data.code == 200&&data.data) {
          that.setData({
            theater: data.data
          })
        }
        if (data.code == 2) {
          that.setData({
            theater: []
          })
        }
      }
    })

  },
  navWanda:function(ev){
    var that = this
    var value = ev.currentTarget.dataset.theater
    console.log(value)
    wx.request({
      url: 'http:' + app.globalData.host + '/api/search',
      data: {
        key: value
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        var data = res.data
        if (data.code == 200&&data.data) {
          that.setData({
            theater: data.data
          })
        }
        if (data.code == 2) {
          that.setData({
            theater: []
          })
        }
      }
    })

  },
clearHis:function(ev){
var index=ev.currentTarget.dataset.clear
var his=this.data.search.his
his.splice(index,1)
this.setData({
  'search.his':his
})

console.log(index)


},



  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  }
})