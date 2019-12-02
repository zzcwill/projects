import Common from "../../../assets/js/common";
import { Config } from "../../../config/env";
import Request from "axios";
import jsonp from "jsonp";
Request.jsonp = jsonp;

let _http = {
  /**
   * @desc 获取url地址
   * @param  {String} url 地址
   * @param  {Number} type 类型，:测试 1:预发 2:正式
   * @return {String} url 地址
   */
  getUrl(url, type) {
    let domain = "";
    if (type == 1) {
      domain = Config.devDomain;
    } else if (type == 2) {
      domain = Config.adDomain;
    } else if (type == 3) {
      domain = Config.proDomain;
    }
    return domain + url;
  },
  /**
   * @desc  获取返回数据，兼容不同返回格式
   * @param  {Object} res 对象数据
   * @return {Object}
   */
  getResponseData(res = {}) {
    return Common.isEmptyObject(res.data) ? res.body : res.data;
  }
};

export default {
  /**
   * @desc get调用
   * @param  参数说明
   */
  get({
    url,
    config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    },
    domainType = 1,
    data = {}
  }) {
    return Request.get(_http.getUrl(url, domainType), config).then(res => {
      return _http.getResponseData(res);
    });
  },

  /**
   * @desc post调用
   * @param  {String} url 调用url
   * @param  {Object} config ajax配置数据
   * @param  {String} domainType 域名类型
   * @param  {Object} data post传输数据
   */
  post({
    url,
    config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8"
      }
    },
    domainType = 1,
    data = {}
  }) {
    return Request.post(_http.getUrl(url, domainType), data, config).then(
      res => {
        return _http.getResponseData(res);
      }
    );
  },

  /**
   * @desc jsonp调用
   * @param  参数说明
   */
  jsonp({
    url,
    config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8"
      }
    },
    domainType = 1,
    data = {}
  }) {
    let rs = {};
    // 让json也能采用promise的级联then方法
    return new Promise((resolve, reject) => {
      return Request.jsonp(
        _http.getUrl(url, domainType),
        config,
        (err, data) => {
          if (data) {
            rs = data;
            resolve();
          }
        }
      );
    }).then(() => {
      return rs;
    });
  },

  /**
   * @desc ajax调用
   * @param  {XHR} Http对象
   * @param  {String} t 调用Http.AJAX对象
   * @param  {Object} params ajax配置数据
   * @return  {Object} Promise对象
   */
  ajax(params) {
    let method = _http.getMethod(params.method);
    if (method == "post") return this.post(params);
    else if (method == "get") return this.get(params);
    else if (method == "jsonp") return this.jsonp(params);
    else return this.get(params);
  }
};
