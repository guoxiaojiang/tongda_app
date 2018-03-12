// pages/explore/explore.js、
var app = getApp()
var util = require('../../utils/util.js')
var qqMapWX = require('../../utils/qqmap-wx-jssdk.js')
var qqmapsdk

Page({

  /**
   * 页面的初始数据
   */
  data: {
    /** 
      * 页面配置 
      */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    showUploading: false,
    date: "",//发货日期
    time: "", //发货时间
    todayDate: "",
    fromCity: "",
    fromAddress: "",
    fromLatitude: "",
    fromLongitude: "",
    toCity: "",
    toAddress: "",
    toLatitude: "",
    toLongitude: "",
    coverImg: "",
    coverImgs: [],
    price: "",
    goodsName: "",
    goodsDetail: "",
    phoneNum: "",
    userName: "",
    userMobile: "",
    iconSel: "../../img/publish/timg.jpeg",
    isIconFull: false,

    goodsPicList: [{
      path: "../../img/publish/timg.jpeg",
      isSelect: true
    }],
  },

  /**
   * 生命周期函数--监听页面加
   */
  onLoad: function (options) {
    var that = this;

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

    that.setData({
      phoneNum: app.globalData.moble,
      userMobile: app.globalData.moble
    }),

      /** 
       * 获取系统信息 
       */
      wx.getSystemInfo({

        success: function (res) {
          that.setData({
            winWidth: res.windowWidth,
            winHeight: res.windowHeight
          });
        }

      });

    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userName: res.userInfo.nickName
        })
      }
    });

    qqmapsdk = new qqMapWX({
      key: 'EF5BZ-UUSYO-DGAWA-SJYJK-LOMBQ-HZBWX'
    });

    //1、获取当前位置坐标
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.setData({
          fromLatitude: res.latitude,
          fromLongitude: res.longitude,
          toLatitude: res.latitude,
          toLongitude: res.longitude
        })
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            var city = addressRes.result.address_component.city;
            var address = addressRes.result.formatted_addresses.recommend;
            console.log("address is:" + address);
            that.setData({
              fromAddress: city + address,
              fromCity: city,
              toAddress: city + address,
              toCity: city
            })
          }
        })
      }
    })

  },

  onConsumptionItemClick: function () {
    var that = this
    var goodsPicList = this.data.goodsPicList
    var currentLength = goodsPicList.length
    wx.chooseImage({
      count: 5 - currentLength, // 最多总共可选4张，默认9
      // sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      // sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        if (goodsPicList.length < 4) {
          var consumpLength = goodsPicList.length

          for (var i = 0; i < tempFilePaths.length; i++) {

            var tempPic = {
              path: tempFilePaths[i],
              isSelect: false
            }

            goodsPicList.unshift(tempPic)
            consumpLength++;
            if (consumpLength >= 5) {
              goodsPicList.pop()
              console.log("after goodsPicList pop:" + goodsPicList.length)
              that.setData({
                isIconFull: true
              })
              break;
            }
          }

          that.setData({
            goodsPicList: goodsPicList
          })
        } else if (goodsPicList.length == 4) {
          var tempPic = {
            path: tempFilePaths[0],
            isSelect: false
          }
          goodsPicList.unshift(tempPic)
          goodsPicList.pop()
          that.setData({
            goodsPicList: goodsPicList,
            isIconFull: true
          })
        }
      }
    })
  },

  //名字输入
  onInputGoodsName: function (e) {
    this.setData({
      goodsName: e.detail.value
    });
  },

  //价格输入
  onInputPrice: function (e) {
    this.setData({
      price: e.detail.value
    });
  },

  onInputPhone: function (e) {
    this.setData({
      phoneNum: e.detail.value
    });
  },

  //详细描述
  onInputGoodsDetail: function (e) {
    this.setData({
      goodsDetail: e.detail.value
    });
  },

  //选择日期
  onDateChange: function (e) {
    this.setData({
      date: e.detail.value,
    });
  },

  //选择时间
  onTimeChange: function (e) {
    this.setData({
      time: e.detail.value,
    });
  },

  //选择出发城市
  onfromAddressChange: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(JSON.stringify(res))
        that.setData({
          fromLatitude: res.latitude,
          fromLongitude: res.longitude
        })

        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            var city = addressRes.result.address_component.city;
            var address = addressRes.result.formatted_addresses.recommend;
            console.log("address is:" + address);
            that.setData({
              fromAddress: city + address,
              fromCity: city,
            })
          }
        })

      },
      fail: function (err) {
        console.log(JSON.stringify(err))
      }
    })
  },

  //选择到达城市
  ontoAddressChange: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          toLatitude: res.latitude,
          toLongitude: res.longitude
        })

        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            var city = addressRes.result.address_component.city;
            var address = addressRes.result.formatted_addresses.recommend;
            that.setData({
              toAddress: city + address,
              toCity: city,
            })
          }
        })

      },
      fail: function (err) {
        console.log(JSON.stringify(err))
      }
    })
  },

  //发布按钮
  onPublish: function () {
    var that = this
    this.setData({
      todayDate: util.formatTime(new Date(), "MM-dd hh:mm")
    });
    if (util.isEmpty(this.data.goodsName)) {
      wx.showToast({
        title: '请输入货物名称',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (util.isEmpty(this.data.price)) {
      this.setData({
        price: "面议"
      });
    }

    if (util.isEmpty(this.data.phoneNum)) {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    if (!(util.checkPhone(this.data.phoneNum) || util.checkTel(this.data.phoneNum))) {
      wx.showToast({
        title: '请输入正确的电话',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    if (util.isEmpty(this.data.goodsDetail)) {
      wx.showToast({
        title: '请输入详细描述',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    if (util.isEmpty(this.data.fromAddress)) {
      wx.showToast({
        title: '发货地点未获取到',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    if (util.isEmpty(this.data.toAddress)) {
      wx.showToast({
        title: '请选择收货地点',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    this.setData({
      showUploading: true
    })

    //-------------------------------------just for test
    var testImgs = [
      'http://211.159.175.56:8888/public/img/pingguo.png',
      'http://211.159.175.56:8888/public/img/gangcai.png',
      'http://211.159.175.56:8888/public/img/juzi.png',
      'http://211.159.175.56:8888/public/img/feiliao.png',
      'http://211.159.175.56:8888/public/img/pingguo.png',
      'http://211.159.175.56:8888/public/img/mei.png',
      'http://211.159.175.56:8888/public/img/sanlun.png',
      'http://211.159.175.56:8888/public/img/xiangzi.png',
    ];
    var testImg = testImgs[util.randomFrom(0, 7)];
    console.log('testImg is:' + testImg);
    //------------------------------------------------end

    var publishData = {
      deliverDate: this.data.date,
      deliverTime: this.data.time,
      publishTime: this.data.todayDate,
      fromCity: this.data.fromCity,
      fromAddress: this.data.fromAddress,
      fromLatitude: this.data.fromLatitude,
      fromLongitude: this.data.fromLongitude,
      toCity: this.data.toCity,
      toAddress: this.data.toAddress,
      toLatitude: this.data.toLatitude,
      toLongitude: this.data.toLongitude,
      coverImg: testImg,
      coverImgs: ['http://211.159.175.56:8888/public/img/pingguo.png', 'http://211.159.175.56:8888/public/img/gangcai.png',
        'http://211.159.175.56:8888/public/img/juzi.png'],
      price: this.data.price,
      goodsName: this.data.goodsName,
      goodsDetail: this.data.goodsDetail,
      phoneNum: this.data.phoneNum,
      userName: this.data.userName,
      userMobile: this.data.userMobile
    }

    var goodsPicList = this.data.goodsPicList
    var isFull = this.data.isIconFull
    var poped = {}
    if (goodsPicList.length > 1) {
      if (!isFull) {
        poped = goodsPicList.pop()
      }
      util.uploadimg({
        url: 'http://' + app.globalData.host + '/api/uploadPic?page=publishGoods',
        path: goodsPicList,
        result : []
      }, function(result) {
        console.log("uploadimg success, result:" + result)
        publishData.coverImgs = result
        var last = result.length-1
        publishData.coverImg = result[0]
        wx.request({
          url: 'http://' + app.globalData.host + '/api/publish',
          data: publishData,
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res.data)
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 2000
            })
            that.setData({
              price: "",
              goodsName: "",
              goodsDetail: "",
              goodsPicList: [{
                path: "../../img/publish/timg.jpeg",
                isSelect: true
              }]
            })
          },
          complete: function () {
            that.setData({
              showUploading: false
            })
          }
        })
      }, function() {
        wx.showToast({
          title: '图片发布失败.请重试',
          icon: 'none',
          duration: 1000
        })
        goodsPicList.push(poped)
        that.setData({
          showUploading: false
        })
      })
    } else {
      var that = this;
      wx.request({
        url: 'http://' + app.globalData.host + '/api/publish',
        data: publishData,
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res.data)
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            price: "",
            goodsName: "",
            goodsDetail: "",
            goodsPicList: [{
              path: "../../img/publish/timg.jpeg",
              isSelect: true
            }]
          })
        },
        complete: function () {
          that.setData({
            showUploading: false
          })
        }
      })
    }

  },

  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },

  /** 
 * 点击tab切换 
 */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      date: util.formatTime(new Date(), "yyyy-MM-dd"),
      time: util.formatTime(new Date(), "hh:mm"),
      todayDate: util.formatTime(new Date(), "MM-dd hh:mm"),
    });
  }

})