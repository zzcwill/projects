/**
 * @desc 扩展对象继承
 * @param  {Object} out 一个或多个对象
 * @return {Object} 对象
 */
Object.extend = function(out) {
  out = out || {};
  for (var i = 1; i < arguments.length; i++) {
    if (!arguments[i]) continue;

    for (var key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
    }
  }
  return out;
};

/**
 * @desc  时间格式转化
 * @param  {String} format 转化格式
 * @return {String} 已转化的时间
 */
Date.prototype.format = function(format) {
  let args = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
    S: this.getMilliseconds()
  };
  if (/(y+)/.test(format))
    format = format.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var i in args) {
    var n = args[i];
    if (new RegExp("(" + i + ")").test(format))
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length)
      );
  }
  return format;
};

export default {
  /**
   * @desc  判断对象是否为空
   * @param  {Object} o 对象
   * @return {Boolean}
   */
  isEmptyObject(o = {}) {
    let flag = true;
    for (let k in o) {
      if (k) {
        flag = false;
        break;
      }
    }
    return flag;
  },

  /**
   * @description 去除前后空格
   * @param  {String} 值
   * @return {String}
   */
  trim(val) {
    return val.replace(/(^\s*)|(\s*$)/g, "");
  },

  /**
   * @desc  获取 cookie
   * @param  {String}
   * @return {*}
   */
  getCookie(name) {
    let rs = "";
    var name = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) != -1) {
        rs = this._string2json(c.substring(name.length, c.length));
      }
    }
    return rs;
  },

  /**
   * @desc  设置 cookie
   * @param {String} name 名称
   * @param {*} value 值
   * @param {Number} hours 时长
   */
  setCookie(name, value, hours) {
    let str = name + "=" + this._json2string(value);
    if (hours && hours > 0) {
      var date = new Date();
      date.setTime(date.getTime() + hours * 3600 * 1000);
      str += "; expires=" + date.toUTCString();
    }
    document.cookie = str;
  },

  /**
   * @desc  清除 cookie
   * @param  {String} 名称
   */
  delCookie(name) {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = name + "=a; expires=" + date.toGMTString();
  },

  /**
   * @desc  获取 localStorage 中指定的变量
   * @param  {String} name 名称
   * @return {*} rs
   */
  getStorage(name) {
    return this._string2json(window.localStorage[name]);
  },

  /**
   * @desc  设置或添加 localStorage 中指定的变量
   * @param {String} name 名称
   */
  setStorage(name, value) {
    window.localStorage[name] = this._json2string(value);
  },

  /**
   * @desc  删除 localStorage 中指定的变量
   * @param  {String} name 名称
   */
  delStorage(name) {
    window.localStorage.removeItem(name);
  },

  /**
   * @desc json转string
   * @param  {*} value 值
   * @return {*} value 值
   */
  _json2string(value) {
    return JSON.stringify(value);
  },
  /**
   * @desc  string转json
   * @param  {*} value 值
   * @return {*} value 值
   */
  _string2json(value) {
    try {
      value = JSON.parse(value);
    } catch (e) {}
    return value;
  },
  /**
   *@desc 只能输入单词字符
   *@param { String } value
   */
  character(value) {
    if (value) {
      value = value.replace(/[^A-Za-z0-9]/g, "");
    }
    return value;
  },
  // 保留小数位，替代Number.toFixed()方法，针对于某些数据（16.455）不能做到四舍五入
  toFixed(value, num = 0) {
    let pos = value.toString().indexOf(".");
    let decimalPlaces = value.toString().length - pos - 1;
    let intValue = value * Math.pow(10, decimalPlaces);
    let divisor1 = Math.pow(10, decimalPlaces - num);
    let divisor2 = Math.pow(10, num);
    return Math.round(intValue / divisor1) / divisor2;
  },

  /**
   * 如果是小数则保留小数位，默认两位
   * @param  {[type]} value [description]
   * @param  {Number} num   [description]
   * @return {[type]}       [description]
   */
  toFloatFixed(value, num = 2) {
    let values = Number(value);
    if (values) {
      if (/^\d+\.\d+/.test(values)) {
        return this.toFixed(values, num);
      } else {
        return this.toFixed(values);
      }
    }
    return value;
  },

  urlParam() {
    let result = {};
    let name,
      value,
      str = location.href,
      num = str.indexOf("?"); //取得整个地址栏
    str = str.substr(num + 1); //取得所有参数 stringvar.substr(start [, length ]
    let arr = str.split("&"); //各个参数放到数组里
    for (let i = 0; i < arr.length; i++) {
      num = arr[i].indexOf("=");
      if (num > 0) {
        name = arr[i].substring(0, num);
        value = arr[i].substr(num + 1);
        result[name] = value;
      }
    }
    return result;
  }
};
