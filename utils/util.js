var app = getApp()

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}



function getWeek(len) {
  var weekday = new Array(7)
  weekday[0] = "周日";
  weekday[1] = "周一";
  weekday[2] = "周二";
  weekday[3] = "周三";
  weekday[4] = "周四";
  weekday[5] = "周五";
  weekday[6] = "周六";
  var result = [];
  var now = new Date();
  Date.prototype.getMonthDay = function () {
    return weekday[this.getDay()] + formatNumber(this.getMonth() + 1) + '月' + formatNumber(this.getDate()) + '日';
  }
  var str = '今天' + formatNumber(now.getMonth() + 1) + '月' + now.getDate() + '日';
  result.push(str);
  for (var i = 0; i < len - 1; i++) {
    now.setDate(now.getDate() + 1);
    result.push(now.getMonthDay())
  };
  return result;
  
}


/**
 * 时间格式转化date对象->其他
 */
function formatTime(date, format) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
 

  var week = date.getUTCDay();


  switch (format) {
    case "yyyy-MM-dd":
      return [year, month, day].map(formatNumber).join('-');
      break;

    case "MM-dd hh:mm":
      return month + "-" + day + " " + hour + ":" + minute;
      break;

    case "yyyy年MM月dd日":
      return year + "年" + month + "月" + day + "日";
      break;
    case "yyyy年MM月dd日 hh:mm":
      return year + "年" + month + "月" + day + "日" + " " + hour + ":" + minute;
      break;
    case "MM.dd":
      return month + "." + day;
      break;
    case "yyyy-MM":
      return year + "-" + month;
      break;
    case "yyyy":
      return year;
      break;
    case "hh:mm:ss":
      return [hour, minute, second].map(formatNumber).join(':');
      break;
    case "hh:mm":
      return [hour, minute].map(formatNumber).join(':');
      break;
    case "week":
      var weekDay = "";
      switch (week) {
        case 0:
          weekDay = "星期天";
          break;
        case 1:
          weekDay = "星期一";
          break;
        case 2:
          weekDay = "星期二";
          break;
        case 3:
          weekDay = "星期三";
          break;
        case 4:
          weekDay = "星期四";
          break;
        case 5:
          weekDay = "星期五";
          break;
        case 6:
          weekDay = "星期六";
          break;

      }
      return weekDay;
      break;
    default:
      return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
      break;
  }

}

function isEmpty(obj) {
  if (obj === null) return true;
  if (typeof obj === 'undefined') {
    return true;
  }
  if (typeof obj === 'string') {
    if (obj === "") {
      return true;
    }
    var reg = new RegExp("^([ ]+)|([　]+)$");
    return reg.test(obj);
  }
  return false;
}

function randomFrom(lowerValue, upperValue) {
  return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
}

function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}

function checkPhone(phone) {
  if (!(/^1[34578]\d{9}$/.test(phone))) {
    return false;
  } else {
    return true;
  }
}

function checkTel(tel) {
  if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(tel)) {
    return false;
  } else {
    return true;
  }
}


//多张图片上传
function uploadimg(imgData, succ, err) {
  var that = this
  var i = imgData.i ? imgData.i : 0,//当前上传的哪张图片
    success = imgData.success ? imgData.success : 0,//上传成功的个数
    fail = imgData.fail ? imgData.fail : 0;//上传失败的个数
  wx.uploadFile({
    url: imgData.url,
    filePath: imgData.path[i].path,
    name: 'file',//这里根据自己的实际情况改
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    success: (res) => {
      //好坑啊，uploadFile success 中res.data拿到的是string,需要转成json
      var jsonData = JSON.parse(res.data)
      console.log("jsonData.message:" + jsonData.message)
      if (jsonData.code === 1) {
        //把成功之后的远程文件路径保存
        imgData.result.push('http://' + app.globalData.host + jsonData.couldPath)
        console.log("result[" + success + "]:" + imgData.result[success])
        success++;//图片上传成功，图片上传成功的变量+1
      } else {
        fail++;
      }
    },
    fail: (res) => {
      fail++;//图片上传失败，图片上传失败的变量+1
      console.log('fail:' + i + "fail:" + fail);
    },
    complete: () => {
      console.log(i);
      i++;//这个图片执行完上传后，开始上传下一张
      if (i == imgData.path.length) {   //当图片传完时，停止调用  
        if (success > 0) {
          succ(imgData.result)
        } else {
          err()
        }
        console.log('执行完毕');
        console.log('成功：' + success + " 失败：" + fail);
      } else {//若图片还没有传完，则继续调用函数
        console.log(i);
        imgData.i = i;
        imgData.success = success;
        imgData.fail = fail;
        that.uploadimg(imgData, succ, err);
      }

    }
  });
}


module.exports = {
  formatTime: formatTime,
  getWeek:getWeek,
  isEmpty: isEmpty,
  randomFrom: randomFrom,
  json2Form: json2Form,
  checkPhone: checkPhone,
  checkTel: checkTel,
  uploadimg: uploadimg
}
