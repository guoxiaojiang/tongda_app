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



module.exports = {
  formatTime: formatTime,
  getWeek:getWeek,
  isEmpty: isEmpty,
  randomFrom: randomFrom,
  json2Form: json2Form,
  checkPhone: checkPhone,
  checkTel: checkTel
}
