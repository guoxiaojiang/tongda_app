var app = getApp()
Page({
  data: {
    flexed: false,
    autoplay: false,
    indicator_dots: false,
    goodsName: "",
    goodsDetail: "",
    price: "",
    publishTime: "",
    fromAddress: "",
    fromLatitude: "",
    fromLongitude: "",
    toAddress: "",
    deliverTime: "",
    phoneNum: "",
    coverImg:"",
    coverImgs:[],
  },
  onLoad: function (param) {
    var that = this;
    var name = param.goodsName;
    var detail = param.goodsDetail;
    var price = param.price;
    var time = param.deliverTime;
    var date = param.deliverDate;
    var publishTime = param.publishTime;
    var fromAdd = param.fromAddress;
    var toAdd = param.toAddress;
    var fromLong = param.fromLongitude;
    var fromLat = param.fromLatitude;
    var coverImg = param.coverImg;
    var phone = param.phoneNum;
    console.log("goodsName:" + name + ", goodsDetail:" + detail + ", price:" + price
      + ", publishTime:" + publishTime
      + ", deliverTime:" + date + " " + time + ", fromAddress:" + fromAdd + ", toAddress:" + toAdd + ", fromLatitude:" + fromLat + ", fromLongitude:" + fromLong + ", phoneNum:" + phone)
    that.setData({
      goodsName: name,
      goodsDetail: detail,
      price: price,
      deliverTime: date + " " + time,
      fromAddress: fromAdd,
      fromLatitude: fromLat,
      fromLongitude: fromLong,
      toAddress: toAdd,
      publishTime: publishTime,
      phoneNum: phone,
      coverImg: coverImg,
      coverImgs: [coverImg]
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
      phoneNumber: that.data.phoneNum,
    })
  },

  navi: function () {
    var that = this
    wx.openLocation({
      latitude: parseFloat(that.data.fromLatitude),
      longitude: parseFloat(that.data.fromLongitude),
    })
  }
})