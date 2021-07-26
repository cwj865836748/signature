
// 获取连接参数值
export function getUrlParams (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}
// 判断设备处于PC还是移动端
export function isIOS () {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    return true
  } else {
    return false
  }
}
// 判断安卓或者ios终端
export function testMobileType () {
  const u = navigator.userAgent
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  if (isAndroid) {
    return 'android'
  } else if (isiOS) {
    return 'ios'
  } else {
    return 'pc'
  }
}
// 校验手机号码
export function isPhone (val) {
  var patrn = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/
  if (!patrn.test(val) || val === '') {
    return false
  } else {
    return true
  }
}
// 检验身份证号码
export function isSfz (idcard) {
  var Errors = [1, '身份证号码位数不对', '出生日期错误', '身份证号码错误', '身份证地区非法']
  var area = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: 'xinjiang', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' }
  var Y, JYM
  var S, M, ereg, Err
  var arr = []
  arr = idcard.split('')
  if (area[parseInt(idcard.substr(0, 2))] == null) {
    Err = Errors[4]
    return Err
  }
  switch (idcard.length) {
    case 15:
      if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 === 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 === 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 === 0)) {
        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/ // 测试出生日期的合法性
      } else {
        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/ // 测试出生日期的合法性
      }
      if (ereg.test(idcard)) {
        Err = Errors[0]
      } else {
        Err = Errors[2]
      }
      return Err
    case 18:
      if (parseInt(idcard.substr(6, 4)) % 4 === 0 || (parseInt(idcard.substr(6, 4)) % 100 === 0 && parseInt(idcard.substr(6, 4)) % 4 === 0)) {
        ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/ // 闰年出生日期的合法性正则表达式
      } else {
        ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/ // 平年出生日期的合法性正则表达式
      }
      if (ereg.test(idcard)) {
        S = (parseInt(arr[0]) + parseInt(arr[10])) * 7 + (parseInt(arr[1]) + parseInt(arr[11])) * 9 + (parseInt(arr[2]) + parseInt(arr[12])) * 10 + (parseInt(arr[3]) + parseInt(arr[13])) * 5 + (parseInt(arr[4]) + parseInt(arr[14])) * 8 + (parseInt(arr[5]) + parseInt(arr[15])) * 4 + (parseInt(arr[6]) + parseInt(arr[16])) * 2 + parseInt(arr[7]) * 1 + parseInt(arr[8]) * 6 + parseInt(arr[9]) * 3
        Y = S % 11
        M = 'F'
        JYM = '10X98765432'
        M = JYM.substr(Y, 1)
        if (M === arr[17]) {
          Err = Errors[0]
        } else {
          Err = Errors[3]
        }
      } else {
        Err = Errors[2]
      }
      return Err
    default:
      Err = Errors[1]
      return Err
  }
}
// 日期格式化
export function dateFormat (now) {
  var year = now.getFullYear()
  var month = now.getMonth() + 1
  var date = now.getDate()
  var hour = now.getHours()
  var minute = now.getMinutes()
  var second = now.getSeconds()
  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
}
// 日期格式化
export function dateFormat2 (now) {
  var hour = now.getHours()
  var minute = now.getMinutes()
  return hour + ':' + minute
}
// 时间格式化
export function TimeFormat (val, s) {
  if (!val) {
    return ''
  }
  if (s) {
    val = val * 1000
  }
  var date = new Date(val)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var min = date.getMinutes()
  var second = date.getSeconds()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  hour = hour < 10 ? '0' + hour : hour
  min = min < 10 ? '0' + min : min
  second = second < 10 ? '0' + second : second
  return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + second
}
// 日期年月日
export function getDate (n) {
  var date = new Date()
  date.setDate(date.getDate() + n)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  return year + '-' + month + '-' + day
}
// 最多保留两位小数
export function formatMomey (num) {
  return Math.round(num * 100) / 100
}
// 保留两位小数
export function strFixTwo (val) {
  if (!val) {
    return '0.00'
  }
  var str = val.toFixed(2)
  return str
}
// 保留三位位小数
export function strFixThree (val) {
  if (!val) {
    return '0.000'
  }
  var str = val.toFixed(3)
  return str
}
// 压缩图片
export function dealImage (path, obj, callback) {
  var img = new Image()
  img.src = path
  img.onload = function () {
    var that = this
    // 默认按比例压缩
    var w = that.width
    var h = that.height
    var scale = w / h
    w = obj.width || w
    h = obj.height || w / scale
    var quality = 0.5 // 默认图片质量为0.7
    // 生成canvas
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    // 创建属性节点
    var anw = document.createAttribute('width')
    anw.nodeValue = w
    var anh = document.createAttribute('height')
    anh.nodeValue = h
    canvas.setAttributeNode(anw)
    canvas.setAttributeNode(anh)
    ctx.drawImage(that, 0, 0, w, h)
    // 图像质量
    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
      quality = obj.quality
    }
    // quality值越小，所绘制出的图像越模糊
    var base64 = canvas.toDataURL('image/jpeg', quality)
    // 回调函数返回base64的值
    callback(base64)
  }
}
// 图片转成base64
export function getImgData (img, dir, next) {
  var image = new Image()
  image.onload = function () {
    var degree = 0
    var drawWidth
    var drawHeight
    var width
    var height
    drawWidth = this.naturalWidth
    drawHeight = this.naturalHeight
    // 以下改变一下图片大小
    var canvas = document.createElement('canvas')
    canvas.width = width = drawWidth
    canvas.height = height = drawHeight
    var context = canvas.getContext('2d')
    // 判断图片方向，重置canvas大小，确定旋转角度，iphone默认的是home键在右方的横屏拍摄方式
    switch (dir) {
      // iphone横屏拍摄，此时home键在左侧
      case 3:
        degree = 180
        drawWidth = -width
        drawHeight = -height
        break
        // iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
      case 6:
        canvas.width = height
        canvas.height = width
        degree = 90
        drawWidth = width
        drawHeight = -height
        break
        // iphone竖屏拍摄，此时home键在上方
      case 8:
        canvas.width = height
        canvas.height = width
        degree = 270
        drawWidth = -width
        drawHeight = height
        break
    }
    // 使用canvas旋转校正
    context.rotate((degree * Math.PI) / 180)
    context.drawImage(this, 0, 0, drawWidth, drawHeight)
    // 返回校正图片
    next(canvas.toDataURL('image/jpeg', 0.8))
  }
  image.src = img
}
// 防抖
export function _debounce (fn, delay) {
  var delay1 = delay || 200
  var timer
  return function () {
    var th = this
    var args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      timer = null
      fn.apply(th, args)
    }, delay1)
  }
}
// 节流
export function _throttle (fn, interval) {
  var last
  var timer
  var interval1 = interval || 200
  return function () {
    var th = this
    var args = arguments
    var now = +new Date()
    if (last && now - last < interval) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        last = now
        fn.apply(th, args)
      }, interval1)
    } else {
      last = now
      fn.apply(th, args)
    }
  }
}
// 转换时分秒
export function setMinutes (timeTap) {
  let time = parseFloat(timeTap) / 1000 // 先将毫秒转化成秒
  if (time) {
    if (time > 60 && time < 60 * 60) {
      time = parseInt(time / 60.0) + '分钟' + parseInt((parseFloat(time / 60.0) -
        parseInt(time / 60.0)) * 60) + '秒'
    } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
      time = parseInt(time / 3600.0) + '小时' + parseInt((parseFloat(time / 3600.0) -
        parseInt(time / 3600.0)) * 60) + '分钟' +
        parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
          parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + '秒'
    } else {
      time = parseInt(time) + '秒'
    }
  } else {
    time = ''
  }
  return time
}

export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return str
}

export function formatTime (time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}
