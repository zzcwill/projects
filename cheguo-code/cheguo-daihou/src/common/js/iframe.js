/**
 * Created by apple on 17/12/6.
 */
/*
 数字字典
 */
export function codeLibrary(_this, library) {
  if (typeof library !== 'object') return tip(_this, {
    message: '参数异常'
  });
  let keysArr = Object.keys(library);
    Fetch(_this, 'cooperation/codeLibrary/list', {codeTypes: keysArr}).then((res)=> {
      keysArr.forEach((item)=>{
        let optionName = library[item];
        let codeId = '';
        let result = res.data[item].map((item)=>{
          if(isNaN(item.codeId)){
            codeId = item.codeId;
          }else{
            codeId = Number(item.codeId);
          }
          return {
            label: item.codeName,
            value: codeId
          }
        });
        result.unshift({label: '全部',value: ''});
        _this[optionName] = result;
      })
    })
}


/*
 消息提示
 */
export function tip(_this, o) {
  _this.$message({
    type: o.type || 'success',
    center: o.center || true,
    duration: o.duration || 2000,
    message: o.message || '操作成功',
    customClass: o.customClass || 'messageTip'
  })
}
/*
 tab栏新增标签
 */
export function addTab(o) {
  if (o.href) {
    return window.parent.menuItemClick.call(o);
  }
}
/*
 关闭当前页签
 */
export function closeTab() {
  window.parent.closeTab();
}
/*
 /*
 对象合并返回新对象
 */
export function extend(...source) {
  let result = {};
  source.map((item)=> {
    for (var keys in item) {
      result[keys] = item[keys];
    }
  });
  return result;
}

/*
 获取地址参数
 */
export function getArgs() {
  var args, i, item, items, name, qs, value;
  qs = (location.search.length > 0 ? location.search.substring(1) : "");
  items = (qs.length ? qs.split("&") : []);
  args = {};
  i = 0;
  while (i < items.length) {
    item = items[i].split("=");
    name = decodeURIComponent(item[0]);
    value = decodeURIComponent(item[1]);
    if (name.length) {
      args[name] = value;
    }
    i++;
  }
  return args;
}
/*
 封装vue-resource http方法
 */
export function Fetch(_this, url, params, method = 'post') {
  return new Promise((resolve,reject) => {
    _this.$http[method]('/api/' + url,params).then((res) => {
      let data = res.data;
      if (data.code === 20000) {
        tip(_this, {
          type: 'error',
          message: data.message || url + " 接口异常！！！"
        });
        reject();
      } else if (data.code === 30000) {
        return window.parent.location.href = "../../../index.html";
      } else {
        if (typeof data === "string") {
          data = JSON.parse(res.data);
        }
        resolve(data);
      }
    })
  });

}
/*
 判断登陆类型是 晟安/中安/车融
 */
export function getSystem(_this) {
  _this.$http.get('/api/getSystemName').then(function (res) {
    let data = res.data;
    let className = 'gray-bg';
    if (typeof res.data === "string") {
      data = JSON.parse(res.data);
    }
    if(data.code === 10000){
      if (data.data.systemName === "shengan") {
        className = 'gray-bg styleCR';
      } else if (data.data.systemName === "cherong") {
        className = 'gray-bg styleCRW';
      } else {
        className = 'gray-bg';
      }
      document.getElementsByClassName('gray-bg')[0].className = className;
    }
  }).catch(function (res) {
    console.log('404 Not Found');
  })
}
/*
 机构获取
 */
export function getOrg(_this, optionName) {
  Fetch(_this, 'org/list').then((res)=> {
    let data = res.data.module;
    let orgList = data.map((item, index) => {
      return {
        label: item.name,
        value: item.id
      }
    });
    orgList.unshift({label: '全部', value: ''});
    _this[optionName] = orgList;
  }).catch((res)=> {
    _this.$message({
      message: '接口 org/list 未找到',
      type: 'error',
      center: 'true',
      duration: 2000
    })
  })
}
/*
 合作银行获取
 */
export function getAllBank(_this, optionName) {
  Fetch(_this, 'cooperation/bank/all').then(function (res) {
    let data = res.data;
    let bankList = data.map((item, index)=> {
      return {
        label: item.bankName,
        value: item.id
      }
    });
    bankList.unshift({label: '全部', value: ''});
    _this[optionName] = bankList;
  }).catch((res)=> {
    _this.$message({
      message: '接口 cooperation/bank/all 未找到',
      type: 'error',
      center: 'true',
      duration: 2000
    })
  })
}
/*
 投诉类别list
 */
export function getComplainList(_this, optionName) {
  Fetch(_this, 'complaint/configList').then((res)=> {
    let data = res.data;
    let complainList = data.map((item, index) => {
      return {
        label: item.reason,
        value: item.id
      }
    });
    complainList.unshift({label: '全部', value: ''});
    _this[optionName] = complainList;
  }).catch((res)=> {
    tip(_this, {
      type: 'error',
      message: '接口 complaint/configList 未找到'
    })
  })
}
/*
 根据类别判断投诉类型
 */
export function getComplainType(_this, id, name) {
  if (id) {
    return Fetch(_this, 'complaint/configList').then((res)=> {
      let complainList = res.data;
      let type = complainList.filter((item, index)=> {
        return item.id == id
      });
      _this[name] = type[0]['complaintType'];
    }).catch(()=> {
      tip(_this, {
        type: 'error',
        message: '接口 complaint/configList 未找到'
      })
    })
  }

}
/*
 gps供应商列表
 */
export function getSupplierList(_this, optionName) {
  Fetch(_this, 'gps/getSupplierList').then(function (res) {
    let data = res.data;
    let supplierList = data.map((item) => {
      return {
        label: item.supplierName,
        value: item.supplierId
      }
    });
    supplierList.unshift({label: '全部', value: ''});
    _this[optionName] = supplierList;
  }).catch(function () {
  })
}
