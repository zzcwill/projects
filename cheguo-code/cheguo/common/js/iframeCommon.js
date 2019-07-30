var comn, queryParams, ref, tableData, tip;

comn = {};

tip = null;

(function() {
  tip = function(o) {
    var base;
    return typeof (base = window.parent.comn).tip === "function" ? base.tip(o) : void 0;
  };
  return comn = {
    user: window.parent.user,
    cache: window.parent.cache,
    table: {
      "undefinedText": "--",
      "classes": "table-striped table-hover table",
      "pagination": true,
      "sidePagination": "server",
      "queryParams": "queryParams",
      "paginationFirstText": "第一页",
      "paginationPreText": "上一页",
      "paginationNextText": "下一页",
      "paginationLastText": "最后一页",
      "clickToSelect": true,
      "height": "500"
    },
    toUrl: function(o) {
      var base;
      if (o.url.indexOf(".html") > -1) {
        return typeof (base = window.parent).toUrl === "function" ? base.toUrl(o.url) : void 0;
      }
    },
    diffDate:function(date){
    var newDate=date.replace(/-/g,'/');
      if(new Date()>Date.parse(newDate)){
      return true;
    }else{
      return false;
    }
    },
	closeTab: function(){
		window.parent.closeTab();
	},
    addTab: function(o) {
      if (o.href) {
        return window.parent.menuItemClick.call(o);
      }
    },
	accAdd: function(arg1, arg2){ //js精度问题(加法)
		var r1,r2,m;
		try{
			r1=arg1.toString().split(".")[1].length
		}catch(e){r1=0}
		try{
			r2=arg2.toString().split(".")[1].length
		}catch(e){r2=0}
		m=Math.pow(10,Math.max(r1,r2))
		return (arg1*m+arg2*m)/m
	},
    //数字金额千分位显示
    toThousands:function toThousands(num){
    if(num){
      var newNum=num.toString();
      if(newNum.indexOf(".")!= -1){
        return newNum.replace(/(\d)(?=(?:\d{3})+\.)/g,'$1,');
      }else{
        return newNum.replace(/(\d)(?=(?:\d{3})+$)/g,'$1,');
      }
    }
  },
	accSub: function(arg1, arg2){ //js精度问题(减法)
		var r1,r2,m,n;
		try{
			r1=arg1.toString().split(".")[1].length
		}catch(e){r1=0}
		try{
			r2=arg2.toString().split(".")[1].length
		}catch(e){r2=0}
		m=Math.pow(10,Math.max(r1,r2));
		//last modify by deeka
		//动态控制精度长度
		n=(r1>=r2)?r1:r2;
		return ((arg1*m-arg2*m)/m).toFixed(n);
	},
	accMul: function(arg1, arg2){  //js精度问题(乘法)
		var m=0,s1=arg1.toString(),s2=arg2.toString();
		try{m+=s1.split(".")[1].length}catch(e){}
		try{m+=s2.split(".")[1].length}catch(e){}
		return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
	},
	accDiv: function(arg1, arg2){  //js精度问题(除法)
		var t1=0,t2=0,r1,r2;
		try{t1=arg1.toString().split(".")[1].length}catch(e){}
		try{t2=arg2.toString().split(".")[1].length}catch(e){}
		with(Math){
			r1=Number(arg1.toString().replace(".",""))
				r2=Number(arg2.toString().replace(".",""))
				return (r1/r2)*pow(10,t2-t1);
		}
	},
    ajax: function(o) {
      var _this, mask;
      //console.log((o.url + " -->") + JSON.stringify(o.data));
      mask = layer.load();
      _this = this;
      if (o.url) {
        return $.ajax({
          url: interUrl.basic + o.url,
          type: o.type || "POST",
          dataType: "json",
          async: o.async === false ? false : true,
          data: o.data || {},
          complete: function(jqXHR, textStatus) {
            return layer.close(mask);
          },
          success: function(data) {
            if (data.code === 20000) {
              return tip({
                content: data.message || "<code>" + o.url + "</code><br /> 接口异常！！！"
              });
            } else if (data.code === 30000) {
              location.reload();
              //return window.parent.location.href = "../../../index.html";
            } else {
              if (typeof data === "string") {
                data = JSON.parse(data);
              }
              return typeof o.success === "function" ? o.success(data) : void 0;
            }
          },
          error: function(jqXHR, textStatus, errorThrown) {
            return typeof o.error === "function" ? o.error(textStatus) : void 0;
          }
        });
      }
    },
    getArgs: function() {
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
    },
	/*
	 *省市区三级联动,传递参数
	 *{type: "car", level: [{
	 *    el: $("#carBrandID")  渲染对象
	 *    key: code  选中值
	 *    target: $("#id") 中文赋值对象
	 *},{
	 *    el: $("#carMakeID")
	 *    key: code
	 *    target: $("#id")
	 *},{
	 *    el: $("#carModelID")
	 *    key: code
	 *}]}
	 */
    linkage: function(o) {
      var o0, o1, o2;
      if (o.type === "car") {
        o0 = o.level[0];
        o1 = o.level[1];
        o2 = o.level[2];
        if (o1.key) {
          o1.el.getCarList(o0.key, o1.key).unbind("change").change(function() {
            if (o1.target) {
              o1.target.val($(this).find("option:selected").text());
            }
            o2.el.val("");
            if (this.value) {
              return o2.el.getCarModel(this.value);
            }
          });
        }
        if (o2.key) {
          o2.el.getCarModel(o1.key, o2.key).unbind("change").change(function() {
            if (o1.target) {
              return o2.target.val($(this).find("option:selected").text());
            }
          });
        }
        return o0.el.getBrand(o0.key || "").unbind("change").change(function() {
          if (o0.target) {
            o0.target.val($(this).find("option:selected").text());
          }
          if (this.value) {
            o2.el.val("");
            return o1.el.getCarList(this.value).unbind("change").change(function() {
              if (o1.target) {
                o1.target.val($(this).find("option:selected").text());
              }
              if (this.value) {
                return o2.el.getCarModel(this.value).unbind("change").change(function() {
                  if (o2.target) {
                    return o2.target.val($(this).find("option:selected").text());
                  }
                });
              }
            });
          }
        });
      }
    }
  };
})();
$.extend({
    /*
    1. 参数1 eg: dataArr:{["id/class", "key", "value", 'status']}; id/class：绑定元素; key：参数, value为选中元素value值; status: 不需要‘--请选择--’字样时设置为‘-1’
    2. 参数2 callback回调函数
  */

    getCommonMethodPort: function(dataArr, callback) {
        var dataKeyArr = [];
        for(var i = 0; i < dataArr.length; i++) {
            dataKeyArr.push(dataArr[i][1]);
        }
        comn.ajax({
            url: interUrl.common.commonMethodPort,
            data: {
                codeTypes: dataKeyArr
            },
            success: function(res) {
                var elData = res.data, o;
                for (i in elData) {
                    var _name = "", _value = "", _status = 0;
                    for (var l = 0; l < dataArr.length; l++) {
                        if (i == dataArr[l][1]) {
                            _name = dataArr[l][0] || "";
                            _value = dataArr[l][2] !== undefined ? dataArr[l][2] : "";
                            _status = dataArr[l][3] !== undefined ? dataArr[l][3] : "";
                            break;
                        }
                    }
                    $(_name).html((_status === '-1' ? '' : "<option value=''>--请选择--</option>") + ((function() {
                        var j, len, ref, results;
                        ref = elData[i];
                        results = [];
                        for (j = 0, len = ref.length; j < len; j++) {
                            o = ref[j];
                            results.push("<option value='" + o.codeId + "'>" + o.codeName + "</option>");
                        }
                        return results;
                    })()).join("")).val(_value);
                }
                if(typeof(callback) == 'function'){
                    return callback(res.data);
                }
            }
        });
    }
});
$.fn.extend({
  nameValues: function() {
    var arg;
    arg = arguments[0];
    return $(this).find("[data-name]").each(function(index, item) {
      var key, keySwitch, value;
      key = $(this).data("name");
      keySwitch = $(this).data("formatter");
      if (keySwitch) {
        value = window[keySwitch](arg[key]) || "";
      }
      if (key) {
          return $(item).html(value || (arg[key] !== undefined ? arg[key] : "")); //arg[key] !== undefined 产品需要把0 也显示；
      }
    });
  },
    getInterviewBankList: function (value, callback) {
        comn.ajax({
            url: interUrl.interviewManage.interviewBankList,
            success: (function(_this){
                return function(res) {
                    var o;
                    $(_this).html("<option value=''>--请选择--</option>" + ((function() {
                        var j, len, ref, results;
                        ref = res.data;
                        results = [];
                        for (j = 0, len = ref.length; j < len; j++) {
                            o = ref[j];
                            results.push("<option value='" + o.bankId + "'>" + o.bankName + "</option>");
                        }
                        return results;
                    })()).join("")).val(value || "");
                };
            })(this)
        });
        return this;
    },
  getfeeScheme: function(value){
    comn.ajax({
      url:interUrl.ownersStaging.queryList,
      success: (function(_this){
        return function(res) {
          var o;
          $(_this).html("<option value=''>--请选择--</option>" + ((function() {
                var j, len, ref, results;
                ref = res.data;
                results = [];
                for (j = 0, len = ref.length; j < len; j++) {
                  o = ref[j];
                  results.push("<option value='" + o.id + "'>" + o.name + "</option>");
                }
                return results;
              })()).join("")).val(value || "");
        };
      })(this)
    });
    return this;
  },
  getProvince: function(value, callback) {
    comn.ajax({
      url: interUrl.common.getProvince,
      success: (function(_this) {
        return function(res) {
          var o;
          $(_this).html("<option value=''>--请选择--</option>" + ((function() {
            var j, len, ref, results;
            ref = res.data;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              o = ref[j];
              results.push("<option value='" + o.areacode + "'>" + o.province + "</option>");
            }
            return results;
          })()).join("")).val(value || "");
		  if (typeof(callback) == "function"){callback()};
        };
      })(this)
    });
    return this;
  },
  getCity: function(provinceCode, value) {
    if (provinceCode) {
      comn.ajax({
        url: interUrl.common.getCity,
        data: {
          areacode: provinceCode
        },
        success: (function(_this) {
          return function(res) {
            var o;
            return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
              var j, len, ref, results;
              ref = res.data;
              results = [];
              for (j = 0, len = ref.length; j < len; j++) {
                o = ref[j];
                results.push("<option value='" + o.areacode + "'>" + o.city + "</option>");
              }
              return results;
            })()).join("")).val(value || "");
          };
        })(this)
      });
    }
    return this;
  },
  getArea: function(cityCode, value) {
    if (cityCode) {
      comn.ajax({
        url: interUrl.common.getArea,
        data: {
          areacode: cityCode
        },
        success: (function(_this) {
          return function(res) {
            var o;
            return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
              var j, len, ref, results;
              ref = res.data;
              results = [];
              for (j = 0, len = ref.length; j < len; j++) {
                o = ref[j];
                results.push("<option value='" + o.areacode + "'>" + o.county + "</option>");
              }
              return results;
            })()).join("")).val(value || "");
          };
        })(this)
      });
    }
    return this;
  },
  getBusinessGroup: function(value, callback) {
    comn.ajax({
      url: interUrl.second.getAllBusinessGroup,
      success: (function(_this) {
        return function(res) {
          var o;
          $(_this).html("<option value=''>--请选择--</option>" + ((function() {
            var j, len, ref, results;
            ref = res.data.data;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              o = ref[j];
              results.push("<option value='" + o.id + "'>" + o.name + "</option>");
            }
            return results;
          })()).join("")).val(value || "").change();
            if (typeof(callback) == "function"){callback(res.data)};
        };
      })(this)
    });
    return this;
  },
    getOrg: function(value, callback, isSelect) {
        comn.ajax({
            url: interUrl.common.orgList,
            success: (function(_this) {
                return function(res) {
                    var o;
                    $(_this).html((isSelect === '-1' ? '' : "<option value=''>--请选择--</option>") + ((function() {
                        var j, len, ref, results;
                        ref = res.data.module;
                        results = [];
                        for (j = 0, len = ref.length; j < len; j++) {
                            o = ref[j];
                            results.push("<option value='" + o.id + "'>" + o.name + "</option>");
                        }
                        return results;
                    })()).join("")).val(value || "").change();
                    if (typeof(callback) == "function"){callback()};
                };
            })(this)
        });
        return this;
    },
  getBranchCompany: function(value, callback) {
    comn.ajax({
      url: interUrl.common.branchCompanyList,
      success: (function(_this) {
        return function(res) {
          var o;
          $(_this).html("<option value=''>--请选择--</option>" + ((function() {
              var j, len, ref, results;
              ref = res.data;
              results = [];
              for (j = 0, len = ref.length; j < len; j++) {
                o = ref[j];
                results.push("<option value='" + o.id + "'>" + o.name + "</option>");
              }
              return results;
            })()).join("")).val(value || "").change();
          if (typeof(callback) == "function"){callback()};
        };
      })(this)
    });
    return this;
  },
  // 付款申请-获取渠道商列表
  channelDealer: function(orgId,value, callback) {
    comn.ajax({
      url: interUrl.myTask.getChannel,
      data:{
        orgId:orgId
      },
      success: (function(_this) {
        return function(res) {
          var o;
          $(_this).html("<option value=''>--请选择--</option>" + ((function() {
              var j, len, ref, results;
              ref = res.data;
              results = [];
              for (j = 0, len = ref.length; j < len; j++) {
                o = ref[j];
                results.push("<option value='" + o.channelId + "'>" + o.name + "</option>");
              }
              return results;
            })()).join("")).val(value || "").change();
          if (typeof(callback) == "function"){callback()};
        };
      })(this)
    });
    return this;
  },
  getDepartment: function(id,value){
    comn.ajax({
      url: interUrl.common.departmentList,
      data: {
        branchCompanyId: id
      },
      success: (function(_this){
        return function (res){
          var o;
          $(_this).html('<option value="">--请选择--</option>' + ((function(){
              var ref, results;
              results = [];
              ref = res.data.module;
              for(var j = 0;j < ref.length;j++){
                o = ref[j];
                results.push('<option value="' + o.id + '">'+ o.name +'</option>')
              }
              return id ? results : [];
            })()).join('')).val(value)
        }
      })(this)
    });
  },
  //库存台账管理
  getStockCompany: function(callback){
    comn.ajax({
      url: interUrl.purchase.stockCompany,
      success: (function(_this){
        return function (res){
          var template;
          if(res.data.length == 1){
            template = '<option value="'+ res.data[0].id +'">'+ res.data[0].name +'</option>';
          }else{
            var o;
            template = '<option value="">--请选择--</option>' + ((function(){
                var ref, results;
                results = [];
                ref = res.data;
                for(var j = 0;j < ref.length;j++){
                  o = ref[j];
                  results.push('<option value="' + o.id + '">'+ o.name +'</option>')
                }
                return results;
              })()).join('')
          }
          if(typeof callback == 'function'){
            $(_this).html(template);
            return callback(res.data);
          }else{
            return $(_this).html(template).val('' || callback);
          }
        }
      })(this)
    });
  },
  getStockGroup: function(orgId,callback){
    comn.ajax({
      url: interUrl.purchase.stockGroup,
      data: {
        companyId: orgId
      },
      success: (function(_this){
        return function (res){
          var template;
          if(res.data.length == 1){
            template = '<option value="'+ res.data[0].id +'">'+ res.data[0].name +'</option>';
          }else{
            var o;
            template = '<option value="">--请选择--</option>' + ((function(){
                var ref, results;
                results = [];
                ref = res.data;
                for(var j = 0;j < ref.length;j++){
                  o = ref[j];
                  results.push('<option value="' + o.id + '">'+ o.name +'</option>')
                }
                return results;
              })()).join('')
          }
          if(typeof callback == 'function'){
            $(_this).html(template);
            return callback(res.data);
          }else{
            $(_this).html(template).val('' || callback);
          }
        }
      })(this)
    });
  },
  getStockUser: function(groupId,value){
    comn.ajax({
      url: interUrl.purchase.stockUser,
      data: {
        groupId: groupId
      },
      success: (function(_this){
        return function (res){
          var o;
          $(_this).html('<option value="">--请选择--</option>' + ((function(){
              var ref, results;
              results = [];
              ref = res.data;
              for(var j = 0;j < ref.length;j++){
                o = ref[j];
                results.push('<option value="' + o.uid + '">'+ o.realname +'</option>')
              }
              return results;
            })()).join('')).val(value)
        }
      })(this)
    });
  },
  //getBranchComp: function(value) {
  //  comn.ajax({
  //    url: interUrl.purchase.singleBranchComp,
  //    success: (function(_this) {
  //      return function(res) {
  //        var o;
  //        return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
  //              var results = [];
  //              results.push("<option value='" + res.data[0].orgId + "'>" + res.data[0].orgName + "</option>");
  //              return results;
  //            })()).join("")).val(value || "").change();
  //      };
  //    })(this)
  //  });
  //  return this;
  //},
  //根据登录用户获取机构
  getOrgList: function(callback){
    comn.ajax({
      url:interUrl.customer.orglist,
      success:(function(_this) {
        return function(res) {
          if(res.data.length == 1){
            return callback(res.data[0]);
            //$(_this).html("<option value='" + res.data[0].companyId + "'>" + res.data[0].companyName + "</option>").attr('disabled','disabled');
            //if(res.data[0].bzgroupId){
            //  return callback(res.data[0].bzgroupId,res.data[0].bzGroupName)
            //}
          }else{
            var o;
            return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
                var j, len, ref, results;
                ref = res.data;
                results = [];
                for (j = 0, len = ref.length; j < len; j++) {
                  o = ref[j];
                  results.push("<option value='" + o.companyId + "'>" + o.companyName + "</option>");
                }
                return results;
              })()).join(""));
          }
        };
      })(this)
    });
    return this;
  },
  //根据供应商获取规格型号  (分公司分配)
  getSpecCompany: function(_supplierId,productType, value) {
    comn.ajax({
      url: interUrl.purchase.productSpec,
      data: {
        supplierId: _supplierId,
        productType: productType
      },
      success: (function(_this) {
        return function(res) {
          var o;
          return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
              var j, len, ref, results;
              ref = res.data;
              results = [];
              for (j = 0, len = ref.length; j < len; j++) {
                o = ref[j];
                results.push("<option value='" + o.spec + "' data-type='"+ o.type +"'>" + o.spec + "</option>");
              }
              return results;
            })()).join("")).val(value || "");
        };
      })(this)
    });
    return this;
  },
  //获取业务组
  getOneGroup: function(id,value){
    comn.ajax({
      url:interUrl.customer.oneGroup,
      data:{orgId:id},
      success:(function(_this) {
        return function(res) {
          var o;
          return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
              var j, len, ref, results;
              ref = res.data;
              results = [];
              for (j = 0, len = ref.length; j < len; j++) {
                o = ref[j];
                results.push("<option value='" + o.bzGroupId + "'>" + o.bzGroupName + "</option>");
              }
              return id ? results : [];
            })()).join("")).val(value || "");
        };
      })(this)
    });
    return this;
  },
   getGroupList: function(id,value){
     comn.ajax({
       url:interUrl.purchase.group,
       data:{companyId:id},
       success:(function(_this) {
         return function(res) {
           var o;
           return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
                 var j, len, ref, results;
                 ref = res.data;
                 results = [];
                 for (j = 0, len = ref.length; j < len; j++) {
                   o = ref[j];
                   results.push("<option value='" + o.id + "'>" + o.name + "</option>");
                 }
                 return results;
               })()).join("")).val(value || "").change();
         };
       })(this)
     });
     return this;
   },
    //分配设备所属区域
    getGroupList1:  function(value){
        comn.ajax({
            url:interUrl.purchase.groupArea,
            success:(function(_this) {
                return function(res) {
                    var o;
                    return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
                            var j, len, ref, results;
                            ref = res.data;
                            results = [];
                            for (j = 0, len = ref.length; j < len; j++) {
                                o = ref[j];
                                results.push("<option value='" + o.bzGroupId + "'>" + o.bzGroupName + "</option>");
                            }
                            return results;
                        })()).join("")).val(value || "").change();
                };
            })(this)
        });
        return this;
    },
  getSpecificSupp: function(value){
    comn.ajax({
      url: interUrl.purchase.specificSupp,
      success: (function(_this) {
        return function(res) {
          var o;
          return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
                var j, len, ref, results;
                ref = res.data;
                results = [];
                for (j = 0, len = ref.length; j < len; j++) {
                  o = ref[j];
                  results.push("<option value='" + o.supplierId + "'>" + o.supplierName + "</option>");
                }
                return results;
              })()).join("")).val(value || "");
        };
      })(this)
    });
    return this;
  },
  getSingleGroup: function(){
    comn.ajax({
      url:interUrl.purchase.singleGroup,
      success: (function(_this){
        return function(res){
          return $(_this).html("<option value='"+res.data[0].id+"'>"+res.data[0].name+"</option>")
        }
      })(this)
    });
    return this;
  },
  getSingleBranchComp: function(callback){
    comn.ajax({
      url:interUrl.purchase.singleBranchComp,
      success: (function(_this){
        return function(res){
          $(_this).html("<option value='"+res.data[0].id+"'>"+res.data[0].name+"</option>");
            if (typeof(callback) == "function"){callback(res.data[0].name, res.data[0].id)};
        }
      })(this)
    });
    return this;
  },
  getBranchOrg: function(value) {
      comn.ajax({
          url: interUrl.purchase.getBranchComp,
          success: (function(_this) {
              return function(res) {
                  var o;
                  return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
                      var j, len, ref, results;
                      ref = res.data;
                      results = [];
                      for (j = 0, len = ref.length; j < len; j++) {
                          o = ref[j];
                          results.push("<option value='" + o.id + "'>" + o.name + "</option>");
                      }
                      return results;
                  })()).join("")).val(value || "");
              };
          })(this)
      });
      return this;
  },
  getManager: function(id,value){
    comn.ajax({
      url: interUrl.purchase.manager,
      data:{
        groupId:id
      },
      success: (function(_this) {
        return function(res) {
          var o;
          return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
                var j, len, ref, results;
                ref = res.data;
                results = [];
                for (j = 0, len = ref.length; j < len; j++) {
                  o = ref[j];
                  results.push("<option value='" + o.uid + "'>" + o.realname + "</option>");
                }
                return results;
              })()).join("")).val(value || "");
        };
      })(this)
    });
    return this;
  },
    //客户经理-区域分配设备
    getManager1: function(id,companyId,value){
        comn.ajax({
            url: interUrl.purchase.oneManager,
            data:{
              groupId:id,
              companyId:companyId
            },
            success: (function(_this) {
                return function(res) {
                    var o;
                    return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
                            var j, len, ref, results;
                            ref = res.data;
                            results = [];
                            for (j = 0, len = ref.length; j < len; j++) {
                                o = ref[j];
                                results.push("<option value='" + o.uid + "'>" + o.realname + "</option>");
                            }
                            return results;
                        })()).join("")).val(value || "");
                };
            })(this)
        });
        return this;
    },
    //资金划拨-提交下一人
    getNextNodeId: function(id, value, callback){
        comn.ajax({
            url: interUrl.myTask.queryNextNodeUserForSubmit,
            data:{
                loanApplyIds: id
            },
            success: (function(_this) {
                return function(res) {
                    var o;
                    $(_this).html(((function() {
                        var j, len, ref, results;
                        ref = res.data;
                        results = [];
                        for (j = 0, len = ref.length; j < len; j++) {
                            o = ref[j];
                            results.push("<option value='" + o.userId + "'>" + o.userName + "</option>");
                        }
                        return results;
                    })()).join(""));
                    if (value !== undefined) {
                        $(_this).val(value);
                    }
                    if (typeof(callback) == "function"){callback(res.data[0].userId, res.data[0].userName)};
                };
            })(this)
        });
        return this;
    },
  getRuleList: function(value) {
    comn.ajax({
      url: interUrl.common.ruleList,
      success: (function(_this) {
        return function(res) {
          var o;
          return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
            var j, len, ref, results;
            ref = res.data;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              o = ref[j];
              results.push("<option value='" + o.id + "'>" + o.name + "</option>");
            }
            return results;
          })()).join("")).val(value || "");
        };
      })(this)
    });
    return this;
  },
  /*
   1、省获取(改造)
   2、参数1: eg: { code: '选中的code值', value: '选中值的中文名称', callback: '获取数据后回调方法'}
   3、参数2: 标识查看/修改(true/false)
   */
  getProvinceC: function(c, flag) {
    if (flag) {
      $(this).html("<option value='" + c.code + "'>" + (c.value || '') + "</option>");
    } else {
      $(this).getProvince(c.code, c.callback);
    }
    return this;
  },

  /*
   1、市获取(改造)
   2、id 从上一级获取过来的ID值
   3、参数1: eg: { code: '选中的code值', value: '选中值的中文名称'}
   4、参数2: 标识查看/修改(true/false)
   */
  getCityC: function(id, c, flag) {
    if (flag) {
      $(this).html("<option value='" + c.code + "'>" + (c.value || '') + "</option>");
    } else {
      $(this).getCity(id, c.code);
    }
    return this;
  },

  /*
   1、区获取(改造)
   2、参数1: eg: { code: '选中的code值', value: '选中值的中文名称'}
   3、参数2: 标识查看/修改(true/false)
   */
  getAreaC: function(id, c, flag) {
    if (flag) {
      $(this).html("<option value='" + c.code + "'>" + (c.value || '') + "</option>");
    } else {
      $(this).getArea(id, c.code);
    }
    return this;
  },
  /*
  		1、参数1: 标识查看/修改(true/false)
   */
  getBrandC: function(flag) {
    if (flag == null) {
      flag = true;
    }
    if (!flag) {
      $(this).getBrand();
    }
    return this;
  },
    /*
     1、车系获取(改造)
     2、参数1: eg: { code: '选中的code值', value: '选中值的中文名称'}
     3、参数2: 标识查看/修改(true/false)
     */
    getCarListC: function(id, c, flag) {
      if (flag == null) {
        flag = true;
      }
      if (!flag) {
        $(this).getCarList(id, c.code);
      }
      return this;
        //if (flag) {
        //    $(this).html("<option value='" + c.code + "'>" + (c.value || '') + "</option>");
        //} else {
        //    $(this).getCarList(id, c.code);
        //}
        //return this;
    },

    /*
     1、车型(改造)
     2、参数1: eg: { code: '选中的code值', value: '选中值的中文名称'}
     3、参数2: 标识查看/修改(true/false)
     */
    getCarModelC: function(id, c, flag) {
      if (flag == null) {
        flag = true;
      }
      if (!flag) {
        $(this).getCarModel(id, c.code);
      }
      return this;
        //if (flag) {
        //    $(this).html("<option value='" + c.code + "'>" + (c.value || '') + "</option>");
        //} else {
        //    $(this).getCarModel(id, c.code);
        //}
        //return this;
    },
  getBrand: function() {
    var codeItem;
    if ($(this).parent().find(".select-box").length) {
      return;
    }
    codeItem = function(arr) {
      var o;
      return ((function() {
        var j, len, results;
        results = [];
        for (j = 0, len = arr.length; j < len; j++) {
          o = arr[j];
          results.push("<li data-code='" + o.brandid + "'>" + o.brandname + "</li>");
        }
        return results;
      })()).join("");
    };
    comn.ajax({
      url: interUrl.common.brandList,
      success: (function(_this) {
        return function(res) {
          var $element, item, j, len, o, ref;
          item = {};
          $element = ["<ul class='select-box hidden'>", "<div class='select-box-list'></div>", "<div class='select-box-letter'>"];
          ref = res.data;
          for (j = 0, len = ref.length; j < len; j++) {
            o = ref[j];
            if (o.cars && o.cars.length) {
              $element.push("<a href='javascript:;'>" + o.name + "</a>");
              item[o.name] = o.cars;
            }
          }
          $element.push("</div></ul>");

          /*
          				 *  事件绑定
           */
          $(_this).css("background-color", "#FFF").on("click", function() {
            $(".select-box").addClass("hidden");
             $(this).next(".select-box").removeClass("hidden").scrollTop(0);
          }).parent().append($element.join("")).on("click", ".select-box-letter a", function() {
            var htmlCode;
            htmlCode = codeItem(item[$(this).text()]);
             $(this).parents(".select-box").scrollTop(0).find(".select-box-list").html(htmlCode);
          }).find(".select-box-letter").each(function() {
             $(this).find("a").eq(0).trigger("click");
          });
           $("body").on("click", function(e) {
            var flag;
            _this = e.target;
            flag = !$(_this).closest(".input-tip").not(".select-box-letter").length;
            if (flag) {
               $(".select-box").addClass("hidden");
            }
          });
        };
      })(this)
    });
    return this;
  },
	getCarList: function(code, value) {
    if (code) {
      comn.ajax({
        url: interUrl.common.carList,
        data: {
              brandcode: code
            },
        success: (function(_this) {
          return function(res) {
            //$(_this).val("--请选择--").next().remove();
            var $element, item, i, j, len, o, ref;
            item = {};
            $element = ["<ul class='select-box carListSelect hidden'>"];
            ref = res.data.manuInfo;
            for (i = 0, len = ref.length; i < len; i++) {
              o = ref[i];
              if (o.child && o.child.length) {
                $element.push("<li><p>"+ o.parent.brandname +"</p><ul class='select-box-list'>");
                for (j = 0; j < o.child.length; j++) {
                  var ochild = o.child[j];
                  $element.push("<li data-code='" + ochild.brandcode + "'>" + ochild.brandname + "</li>");
                }
                $element.push("</ul></li>");
              }
            }
            /*
             *  事件绑定0
             */
            $(_this).css("background-color", "#FFF").on("click", function() {
              $(".select-box").addClass("hidden");
               $(this).next(".select-box").removeClass("hidden").scrollTop(0);
            }).parent().append($element.join(""));

             $("body").on("click", function(e) {
              var flag;
              _this = e.target;
              flag = !$(_this).closest(".input-tip").not(".select-box-letter").length;
              if (flag) {
                 $(".select-box").addClass("hidden");
              }
            });
          };
        })(this)
      });
      //comn.ajax({
      //  url: interUrl.common.carList,
      //  data: {
      //    brandcode: code
      //  },
      //  success: (function(_this) {
      //    return function(res) {
      //      var o;
      //      return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
      //        var j, len, ref, results;
      //        results = [];
      //        ref = res.data.manuInfo;
      //        for(var i=0; i<ref.length;i++){
      //            var carListName = ref[i].parent.brandname;
      //      	  var carList = ref[i].child;
      //      	  for (j = 0, len = carList.length; j < len; j++) {
      //                o = carList[j];
      //                results.push("<option value='" + o.brandcode + "'>" + carListName +" "+ o.brandname + "</option>");
      //              }
      //        }
      //        return results;
      //      })()).join("")).val(value || "");
      //    };
      //  })(this)
      //});
    }
    return this;
  },
  getCarModel: function(code, value) {
	if (code) {
      comn.ajax({
        url: interUrl.common.carModels,
        data: {
          brandcode: code
        },
        success: (function(_this) {
          return function(res) {
            //$(_this).val("--请选择--").next().remove();
            var $element, item, i, j, len, o, ref;
            item = {};
            $element = ["<ul class='select-box carListSelect hidden'>"];
            ref = res.data;
            for (i = 0, len = ref.length; i < len; i++) {
              o = ref[i];
              if (o.cars && o.cars.length) {
                $element.push("<li><p>"+ o.year +"</p><ul class='select-box-list'>");
                for (j = 0; j < o.cars.length; j++) {
                  var ochild = o.cars[j];
                  $element.push("<li data-code='" + ochild.carid + "' data-msrp='"+ ochild.msrp +"'>" + ochild.carname + "</li>");
                }
                $element.push("</ul></li>");
              }
            }
            /*
             *  事件绑定0
             */
            $(_this).css("background-color", "#FFF").on("click", function() {
              $(".select-box").addClass("hidden");
               $(this).next(".select-box").removeClass("hidden").scrollTop(0);
            }).parent().append($element.join(""));
             $("body").on("click", function(e) {
              var flag;
              _this = e.target;
              flag = !$(_this).closest(".input-tip").not(".select-box-letter").length;
              if (flag) {
                 $(".select-box").addClass("hidden");
              }
            });
          };
        })(this)
      });
      //comn.ajax({
      //  url: interUrl.common.carModels,
      //  data: {
      //    brandcode: code
      //  },
      //  success: (function(_this) {
      //    return function(res) {
      //      var o;
      //      return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
      //        var j, len, ref, results;
      //        ref = res.data;
      //        results = [];
      //        for (j = 0, len = ref.length; j < len; j++) {
      //          o = ref[j];
      //          for(var o in ref[j].cars)
      //          results.push("<option value='" + ref[j].cars[o].carid + "' data-msrp='"+ref[j].cars[o].msrp+"'>" + ref[j].cars[o].carname + "</option>");
      //        }
      //        return results;
      //      })()).join("")).val(value || "");
      //    };
      //  })(this)
      //});
    }
    return this;
  },
  getInsurance: function(value, callback) {
    comn.ajax({
      url: interUrl.common.insuranceList,
      success: (function(_this) {
        return function(res) {
          var o;
          $(_this).html("<option value=''>--请选择--</option>" + ((function() {
            var j, len, ref, results;
            ref = res.data;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              o = ref[j];
              results.push("<option value='" + o.id + "'>" + o.insuranceCompanyName + "</option>");
            }
            return results;
          })()).join("")).val(value || "");
          if(typeof(callback) == 'function'){callback();}
        };
      })(this)
    });
    return this;
  },
	getWords: function(value, callback) {
  	console.log(value)
    comn.ajax({
      url: interUrl.myTask.paymentTypeList,
	    data:{codeType:value},
      success: (function(_this) {
        return function(res) {
          var o;
          $(_this).html(((function() {
            var j, len, ref, results;
            ref = res.data;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              o = ref[j];
              results.push("<option value='" + o.id + "'>" + o.codeName + "</option>");
            }
            return results;
          })()).join("")).val(value || "");
          if(typeof(callback) == 'function'){callback();}
        };
      })(this)
    });
    return this;
  },
	getWords2: function(value, callback) {
  	console.log(value)
    comn.ajax({
      url: interUrl.myTask.paymentTypeList,
	    data:{codeType:value},
      success: (function(_this) {
        return function(res) {
          var o;
          $(_this).html("<option value=''>--请选择--</option>" + ((function() {
            var j, len, ref, results;
            ref = res.data;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              o = ref[j];
              results.push("<option value='" + o.codeName + "'>" + o.codeName + "</option>");
            }
            return results;
          })()).join("")).val(value || "");
          if(typeof(callback) == 'function'){callback();}
        };
      })(this)
    });
    return this;
  },
  getLoad: function(callback) {
    if (!$(this).hasClass("loaded")) {
      $(this).load($(this).data("url") + ("?t=" + (new Date().getTime())), (function(_this) {
        return function() {
          if (typeof callback === "function") {
            callback();
          }
          return $(_this).addClass("loaded");
        };
      })(this));
    }
    return this;
  },
  //空白合同获取合作银行
  contractBankGet: function(value) {
    comn.ajax({
      url: interUrl.blankContract.contractBank,
      success: (function(_this) {
        return function(res) {
          var o;
          return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
              var j, len, ref, results;
              ref = res.data;
              results = [];
              for (j = 0, len = ref.length; j < len; j++) {
                o = ref[j];
                results.push("<option value='" + o.bankId + "'>" + o.bankName + "</option>");
              }
              return results;
            })()).join("")).val(value || "");
        };
      })(this)
    });
    return this;
  },
  //空白合同获取机构
  contractOrg: function(stockType,value) {
    comn.ajax({
      url: interUrl.blankContract.branchComp,
      data: {
        stockType: stockType
      },
      success: (function(_this) {
        return function(res) {
          var o;
          return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
              var j, len, ref, results;
              ref = res.data;
              results = [];
              for (j = 0, len = ref.length; j < len; j++) {
                o = ref[j];
                results.push("<option value='" + o.id + "'>" + o.name + "</option>");
              }
              return results;
            })()).join("")).val(value || "");
        };
      })(this)
    });
    return this;
  },
  //获取机构下所属区域
  contractArea: function(id,stockType,value) {
    comn.ajax({
      url: interUrl.blankContract.contractGroup,
      data:{
        companyId: id,
        stockType: stockType
      },
      success: (function(_this) {
        return function(res) {
          var o;
          return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
              var j, len, ref, results;
              ref = res.data;
              results = [];
              for (j = 0, len = ref.length; j < len; j++) {
                o = ref[j];
                results.push("<option value='" + o.id + "'>" + o.name + "</option>");
              }
              return results;
            })()).join("")).val(value || "");
        };
      })(this)
    });
    return this;
  },
  //获取区域下面的客户经理
    getareaManager: function(id,value) {
        comn.ajax({
            url: interUrl.blankContract.contractUserList,
            data:{
                groupId: id
            },
            success: (function(_this) {
                return function(res) {
                    var o;
                    return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
                        var j, len, ref, results;
                        ref = res.data;
                        results = [];
                        for (j = 0, len = ref.length; j < len; j++) {
                            o = ref[j];
                            results.push("<option value='" + o.uid + "'>" + o.realname + "</option>");
                        }
                        return results;
                    })()).join("")).val(value || "");
                };
            })(this)
        });
        return this;
    },
    //空白合同-台账获取机构
    getContractOrg: function(value) {
        comn.ajax({
            url: interUrl.blankContract.orgBranchCompList,
            success: (function(_this) {
                return function(res) {
                    var o;
                    return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
                        var j, len, ref, results;
                        ref = res.data;
                        results = [];
                        for (j = 0, len = ref.length; j < len; j++) {
                            o = ref[j];
                            results.push("<option value='" + o.id + "'>" + o.name + "</option>");
                        }
                        return results;
                    })()).join("")).val(value || "");
                };
            })(this)
        });
        return this;
    },
    //空白合同-台账获取区域
    getContractArea: function(id, value) {
        comn.ajax({
            url: interUrl.blankContract.areaGroupList,
            data:{
                companyId: id
            },
            success: (function(_this) {
                return function(res) {
                    var o;
                    return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
                        var j, len, ref, results;
                        ref = res.data;
                        results = [];
                        for (j = 0, len = ref.length; j < len; j++) {
                            o = ref[j];
                            results.push("<option value='" + o.id + "'>" + o.name + "</option>");
                        }
                        return results;
                    })()).join("")).val(value || "");
                };
            })(this)
        });
        return this;
    },
    getBank: function(value) {
    comn.ajax({
      url: interUrl.gr.bankList,
      success: (function(_this) {
        return function(res) {
          var o;
          return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
            var j, len, ref, results;
            ref = res.data;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              o = ref[j];
              results.push("<option value='" + o.id + "'>" + o.bankName + "</option>");
            }
            return results;
          })()).join("")).val(value || "");
        };
      })(this)
    });
    return this;
  },
  getCarDealer: function(value) {
    comn.ajax({
      url: interUrl.common.loanCarList,
      success: (function(_this) {
        return function(res) {
          var o;
          return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
            var j, len, ref, results;
            ref = res.data;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              o = ref[j];
              results.push("<option value='" + o.id + "'>" + o.dealerName + "</option>");
            }
            return results;
          })()).join("")).val(value || "");
        };
      })(this)
    });
    return this;
  },
  getCompanyC: function (c, flag) {
      if (flag) {
          $(this).html("<option value='" + c.code + "'>" + (c.value || '') + "</option>");
      } else {
          $(this).getCompany(c.code, c.callback);
      }
      return this;
  },
  getGroupC: function(id, c, flag) {
      if (flag) {
          $(this).html("<option value='" + c.code + "'>" + (c.value || '') + "</option>");
      } else {
          $(this).getGroup(id, c.code);
      }
      return this;
  },
  getCompany: function(value) {
    comn.ajax({
      url: interUrl.common.getCompany,
      success: (function(_this) {
        return function(res) {
          var o;
          return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
            var j, len, ref, results;
            ref = res.data;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              o = ref[j];
              results.push("<option value='" + o.id + "'>" + o.name + "</option>");
            }
            return results;
          })()).join("")).val(value || "");
        };
      })(this)
    });
    return this;
  },
  getDealerGroup: function(value) {
    comn.ajax({
      url: interUrl.carDealer.getDealerGroup,
      success: (function(_this) {
        return function(res) {
          var o;
          return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
                var j, len, ref, results;
                ref = res.data;
                results = [];
                for (j = 0, len = ref.length; j < len; j++) {
                  o = ref[j];
                  results.push("<option value='" + o.id + "'>" + o.groupName + "</option>");
                }
                return results;
              })()).join("")).val(value || "");
        };
      })(this)
    });
    return this;
  },
  getGroup: function(companyId, value) {
    if (companyId) {
      comn.ajax({
        url: interUrl.common.getGroup,
        data: {
          companyId: companyId
        },
        success: (function(_this) {
          return function(res) {
            var o;
            return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
              var j, len, ref, results;
              ref = res.data;
              results = [];
              for (j = 0, len = ref.length; j < len; j++) {
                o = ref[j];
                results.push("<option value='" + o.id + "'>" + o.name + "</option>");
              }
              return results;
            })()).join("")).val(value || "").change();
          };
        })(this)
      });
    }
    return this;
  },

  getGroup_comp: function(companyId, value, callback) {
    if (companyId) {
      comn.ajax({
        url: interUrl.common.getGroup,
        data: {
          companyId: companyId
        },
        success: (function(_this) {

          return function(res) {
            var o;
            $(_this).html("<option value='-2'>--所有业务组--</option>" + ((function() {
              var j, len, ref, results;
              ref = res.data;
              results = [];
              for (j = 0, len = ref.length; j < len; j++) {
                o = ref[j];
                results.push("<option value='" + o.id + "'>" + o.name + "</option>");
              }
              return results;
            })()).join("")).val(value || "").change();
              if(typeof(callback) == 'function'){callback();}
          };
        })(this)
      });
    }
    return this;
  },
    //获取供应商
    getSupplier: function(value) {
        comn.ajax({
            url: interUrl.purchase.getSupplierList,
            success: (function(_this) {
                return function(res) {
                    var o;
                    return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
                            var j, len, ref, results;
                            ref = res.data;
                            results = [];
                            for (j = 0, len = ref.length; j < len; j++) {
                                o = ref[j];
                                results.push("<option value='" + o.supplierId + "'>" + o.supplierName + "</option>");
                            }
                            return results;
                        })()).join("")).val(value || "");
                };
            })(this)
        });
        return this;
    },
    //获取规格型号
    getProductSpec: function(_supplierId,productType, value) {
        comn.ajax({
            url: interUrl.purchase.getSpec,
            data: {
                supplierId: _supplierId,
                productType: productType
            },
            success: (function(_this) {
                return function(res) {
                    var o;
                    return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
                            var j, len, ref, results;
                            ref = res.data;
                            results = [];
                            for (j = 0, len = ref.length; j < len; j++) {
                                o = ref[j];
                                results.push("<option value='" + o.spec + "' data-type='"+ o.type +"'>" + o.spec + "</option>");
                            }
                            return results;
                        })()).join("")).val(value || "");
                };
            })(this)
        });
        return this;
    },
    //获取资金通道
    getCapitalChannel: function(orgId,loanApplyId,value) {
        var loanApplyIds = loanApplyId ? loanApplyId : '';
        comn.ajax({
            url: interUrl.common.getCompanyFinanceChannel,
            data: {
                orgId: orgId,
                loanApplyIds: loanApplyIds
            },
            success: (function(_this) {
                return function(res) {
                    var o;
                    return $(_this).html(((function() {
                        var j, len, ref, results;
                        ref = res.data;
                        results = [];
                        for (j = 0, len = ref.length; j < len; j++) {
                            o = ref[j];
                            results.push("<option value='" + o.code + "'>" + o.name + "</option>");
                        }
                        return results;
                    })()).join("")).val(value || "");
                };
            })(this)
        });
        return this;
    },
  //根据产品类型获取规格型号
  getSpecProduct: function(_supplierId,productType, value) {
    comn.ajax({
      url: interUrl.purchase.specificPro,
      data: {
        supplierId: _supplierId,
        productType: productType
      },
      success: (function(_this) {
        return function(res) {
          var o;
          return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
              var j, len, ref, results;
              ref = res.data;
              results = [];
              for (j = 0, len = ref.length; j < len; j++) {
                o = ref[j];
                results.push("<option value='" + o.spec + "' data-type='"+ o.type +"'>" + o.spec + "</option>");
              }
              return results;
            })()).join("")).val(value || "");
        };
      })(this)
    });
    return this;
  },
  //
  getContractType: function(value, url) {
      comn.ajax({
          url: url ? url : interUrl.blankContract.contractManageList,
        success: (function(_this) {
          return function(res) {
            var o;
            return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
                  var j, len, ref, results;
                  ref = res.data;
                  results = [];
                  for (j = 0, len = ref.length; j < len; j++) {
                    o = ref[j];
                    results.push("<option value='" + o.contractTypeId + "'>" + o.contractTypeName + "</option>");
                  }
                  return results;
                })()).join("")).val(value || "");
          };
        })(this)
      })
  },
  getProblemList: function(value) {
      comn.ajax({
          url: interUrl.problem.listType,
          success: (function(_this) {
              return function(res) {
                  var o;
                  return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
                      var j, len, ref, results;
                      ref = res.data;
                      results = [];
                      for (j = 0, len = ref.length; j < len; j++) {
                          o = ref[j];
                          results.push("<option value='" + o.id + "'>" + o.name + "</option>");
                      }
                      return results;
                  })()).join("")).val(value || "");
              };
          })(this)
      })
  },
  //获取token值校验重复提交
  getPaymentToken:function(){
    var _this=this;
    comn.ajax({
      url:interUrl.myTask.getPaymentToken,
      success:function(res){
        $(_this).val(res.data);
      }
    })
  },
  flexBtnInit: function(value){//flexBtn初始化，value取值0或1，0代表展开状态，1代表折叠状态
      value=value?value:0;
      var pbody=$(this).parents('.collapseFlex').find('.panel-body');
      $(this).off('click').click(function(){
      var status=$(this).attr('data-status');
      if(status=='0'){
      pbody.slideUp();
      $(this).attr('data-status',1).css('transform','rotate(0)');
      }else{
      pbody.slideDown();
      $(this).attr('data-status',0).css('transform','rotate(90deg)');
      }
      });
      if(value==0){
      pbody.show();
      $(this).css('transform','rotate(90deg)');
      }else{
      pbody.hide();
      $(this).css('transform','rotate(0)');
      }
      },
    addRule: function() {
        var ruleArr = [];
        $(this).off("click").click(function(){
            var ruleEl = $(this).parents(".sortRuleStr").find(".ruleName").val();
            if (ruleEl === ""){
                tip({content: "请选择排序规则！"});
                return false;
            }
            if (ruleArr.indexOf(ruleEl) != -1) {
                tip({content: "您已添加相同排序规则！"});
                return false;
            }
            ruleArr.push(ruleEl);
            console.log(ruleArr);
            var len = $(".sortRuleDel").length + 1;
            var rule = $(".sortRule");
            var a = rule.clone(true);
            $(this).parents(".sortRule").find(".ruleName").attr("name", "ruleNames["+ len +"]");
            $(this).parents(".sortRule").find(".ruleSort").attr("name", "ruleSorts["+ len +"]");
            $(this).parents(".sortRule").find(".glyphicon-plus").removeClass("addRule glyphicon-plus").addClass("glyphicon-minus delRule");
            $(this).parents(".sortRule").removeClass("sortRule").addClass("sortRuleDel");
            $("#putRule").append(a);
            $(".delRule").off("click").click(function(){
                var el = $(this).parents(".sortRuleDel");
                el.remove();
                ruleArr.splice($.inArray(el.find(".ruleName").val(), ruleArr), 1);
                console.log(ruleArr)
                var idx = $(".sortRuleDel");
                $.each(idx, function(k, v) {
                    var $el, _index;
                    $el = $(v);
                    _index = $(v).index() + 1;
                    $el.find(".ruleName").attr("name", "ruleNames["+ _index +"]");
                    $el.find(".ruleSort").attr("name", "ruleSorts["+ _index +"]");
                });
            })
            $("#resetBtn").off("click").click(function(){
                $(".sortRuleDel").remove();
                ruleArr = [];
                console.log(ruleArr)
            })
        })
    }
});

$(function() {
  $(document).on("click", ".select-box-list li", function(){
    var $el = $(this).parents(".select-box").addClass("hidden").prev("input");
    var nameId = $el.attr("id");
    if (nameId === "getCarModel" || nameId === "getCarModel1") {
      $el.attr("data-msrp", $(this).attr("data-msrp"))
    }
    nameId === "getBrand1" ? $el.attr("data-id", $(this).attr("data-id")) : "";
    $el.val($(this).html()).attr("data-code", $(this).attr("data-code")).trigger("change");
  });
  $(document).on("click", ".select-box p", function() {
    $(this).parents(".select-box").animate({scrollTop: '0px'}, 300);
    $(this).next("ul").slideToggle();
    $(this).parent().siblings().children("ul").slideUp();
  });
  $(window).resize(function() {
    var base;
    return typeof (base = $("table")).bootstrapTable === "function" ? base.bootstrapTable('resetView') : void 0;
  });
  $("body").on("click", "a", function(e) {
    var ref;
    if (((ref = $(this).href) != null ? ref.index(".html") : void 0) > -1) {
      e.preventDefault();
      return comn.toUrl({
        "url": $(this).href
      });
    }
  }).on("focus", ".date", function() {
    //if(!$(this).is(":disabled")){ $(this).attr("readonly", true).css("background-color", "#FFF"); }
    var base;
    return typeof (base = $(this)).datetimepicker === "function" ? base.datetimepicker({
      format: "yyyy-mm-dd",
      pickerPosition: "bottom-right",
      language: "zh-CN",
      minView: 2,
      todayHighlight: true,
      autoclose: true,
      todayBtn: true,
      show: true
    }) : void 0;
  }).on("show.bs.tab", "[data-toggle='tab']", function(e) {
    return $($(this).attr("href")).find("[data-url]").each(function(){ $(this).getLoad(); });
  }).on("click", ".btn[modal='reset']", function() {
    var ref;
    return (ref = $(this).parents("form")[0]) != null ? ref.reset() : void 0;
  }).on("keyup", ".number, .mobile", function(){
	  //if(!/^\d*(?:\.\d{0,2})?$/.test(this.value)){
		  //this.value = '';
	  //}
	  //this.value = this.value.replace(/\D+.]/g,'');
  });
  $(".modal").on("show.bs.modal", function() {
    if ($(this).find("form").length) {
      return $(this).find("form")[0].reset();
    }
  });
  return $("#btn-search").click(function() {
    return $("#table").bootstrapTable('refresh', {url: "..."});
  });
});

if (typeof Mock !== "undefined" && Mock !== null) {
  Mock.mock(/list.json/, {
    'totalItem': 500,
    'data|40': [
      {
        'id': '@INT(1000, 60000)',
        'customerId': '@INT(1000, 60000)',
        'cardNo': '@INT(1000000000000000, 6000000000000000)',
        'loanAmount': '@INT(1000, 60000)',
        'loanTerm|1': [1, 2, 3],
        'customerName': '@CHINESENAME',
        'cardId': '@INT(1,100)',
        'projcetName|1': ['车贷项目申请', '某某项目申请'],
        'mobile': '@INT(600000)',
        'proceing|1': ['调度岗', '集团估计师', '录入内勤', '审核内勤'],
        'handleP': '@NAME',
        'proced|1': ['银行征信', '公安征信', '签单分配', '签单调查'],
        'orgname|1': ['杭州分公司', '湖北分公司'],
        'faqiren': '@CHINESENAME',
        'dbe': '@FLOAT(1,2)',
        'modifyTime': Random.datetime('yyyy-MM-dd A HH:mm:ss')
      }
    ]
  });
}

if ((ref = $.validator) != null) {
  ref.setDefaults({
    highlight: function(e) {
      return $(e).closest(".input-tip").removeClass("has-success").addClass("has-error");
    },
    success: function(e, r) {
      return $(r).closest(".input-tip").removeClass("has-error").addClass("has-success");
    },
    errorPlacement: function(e, r) {
	  if(r.parent('.input-group').length) {
		  e.insertAfter(r.parent());
	  } else {
		  if (e.text()) {
			return e.appendTo((r.is(":radio") || r.is(":checkbox") ? r.parent().parent().parent() : r.parent()));
		  }
	  }
    }
  });
}

tableData = function(params, data, url, callback) {
  var p;
  p = params.data;
  if (url) {
    return comn.ajax({
      url: url,
      data: $.extend(data, p),
      success: function(res) {
        params.success({
          'total': res.totalItem,
          'rows': res.data
        });
        params.complete();
        return typeof callback === "function" ? callback(res) : void 0;
      }
    });
  }
};

queryParams = function(params) {
  return {
    search: params.search,
    page: (params.limit + params.offset) / params.limit,
    pageSize: params.limit
  };
};

$.ajax({
  url: interUrl.basic + interUrl.common.getSystemName,
  type: "GET",
  dataType: "json",
  success: function(data, textStatus, jqXHR) {
    if (typeof data === "string") {
      data = JSON.parse(data);
    }
      if(data.data.systemName === "shengan") {
          $(".gray-bg").addClass("styleCR")
      } else if(data.data.systemName === "cherong"){
          $(".gray-bg").addClass("styleCRW")
      } else {
          $(".gray-bg").removeClass("styleCR styleCRW")
      }
  }
});
(function (){
  var getToday = function(){
    var date,year,month,day;
    date = new Date();
    year = date.getFullYear();
    month = date.getMonth() < 9 ? '0' + (date.getMonth()+1) : date.getMonth()+1;
    day = date.getDay() < 10 ? '0' + date.getDay() : date.getDay() ;
    return year + '-' + month + '-' + day;
  };
  var currentDate = $('.currentDate');
  if(!currentDate.length) return;
  for(var i = 0;i < currentDate.length;i++){
    currentDate[i].value = getToday();
  }
})();
