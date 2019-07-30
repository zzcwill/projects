var cardType, comn, initEvent, interUrl, managementType, queryParams, relationship, customerType,resultStatus, tip;

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
		    addTab: function(o) {
		      if (o.href) {
		        return window.parent.menuItemClick.call(o);
		      }
		    },
        closeTab: function(){
          window.parent.closeTab();
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
		              return window.parent.location.href = "../../../index.html";
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
		    }
		  };
  
})();

initEvent = function() {
  return $("body").on("click", ".btn[modal='reset']", function() {
    var ref;
    return (ref = $(this).parents("form")[0]) != null ? ref.reset() : void 0;
  });
};

$.fn.nameValues = function() {
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
      return $(item).html(value || arg[key] || "");
    }
  });
};
$.fn.dataValues1 = function() {
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
	      return $(item).val(value || arg[key] || "");
	    }
	  });
	};

$.fn.getCompany = function() {
	comn.ajax({
	    url: interUrl.common.getCompany,
	    success: (function(_this) {
	      return function(res) {
	        var j, len, o, ref, str;
	        str = "";
	        var defaultValue = $(_this).attr('defaultValue');
	        ref = res.data;
	        for (j = 0, len = ref.length; j < len; j++) {
	          o = ref[j];
	          str += "<option value='" + o.id + "' "+(defaultValue==o.id?"selected":"")+">" + o.name + "</option>";
	        }
	        return $(_this).append(str);
	      };
	    })(this)
	  });
	  return this;
}

$.fn.getUserByCompanyId = function(companyId) {
	comn.ajax({
	    url: interUrl.common.getUserByCompanyId,
	    data: {
	    	companyId: companyId
	    },
	    success: (function(_this) {
	      return function(res) {
	        var j, len, o, ref, str;
	        str = "<option value=''>--请选择--</option>";
	        var defaultValue = $(_this).attr('defaultValue');
	        ref = res.data;
	        for (j = 0, len = ref.length; j < len; j++) {
	          o = ref[j];
	          str += "<option value='" + o.uid + "' "+(defaultValue==o.uid?"selected":"")+">" + o.realname + "</option>";
	        }
	        return $(_this).html(str);
	      };
	    })(this)
	  });
	  return this;
}

$.fn.getGroup = function(companyId) {
	  comn.ajax({
	    url: interUrl.common.getGroup,
	    data: {
	    	companyId: companyId
	    },
	    success: (function(_this) {
	      return function(res) {
	        var j, len, o, ref, str;
	        str = "<option value='-1'>--请选择--</option>";
	        ref = res.data;
	        for (j = 0, len = ref.length; j < len; j++) {
	          o = ref[j];
	          str += "<option value='" + o.id + "'>" + o.name + "</option>";
	        }
	        return $(_this).html(str);
	      };
	    })(this)
	  });
	  return this;
};

$.fn.getProvince = function() {
  comn.ajax({
    url: interUrl.common.getProvince,
    success: (function(_this) {
      return function(res) {
        var j, len, o, ref, str;
        str = "<option value=''>--请选择--</option>";
        ref = res.data;
        var defaultValue = $(_this).attr('defaultValue');
        for (j = 0, len = ref.length; j < len; j++) {
          o = ref[j];
          str += "<option value='" + o.areacode + "' "+(defaultValue==o.areacode?"selected":"")+">" + o.province + "</option>";
          //console.log(str)
        }
        return $(_this).html(str);
      };
    })(this)
  });
  return this;
};

$.fn.getCity = function(provinceCode) {
  comn.ajax({
    url: interUrl.common.getCity,
    data: {
      areacode: provinceCode
    },
    success: (function(_this) {
      return function(res) {
        var j, len, o, ref, str;
        str = "<option value=''>--请选择--</option>";
        ref = res.data;
        var defaultValue = $(_this).attr('defaultValue');
        for (j = 0, len = ref.length; j < len; j++) {
          o = ref[j];
          str += "<option value='" + o.areacode + "' "+(defaultValue==o.areacode?"selected":"")+">" + o.city + "</option>";
        }
         $(_this).html(str);
         return;
      };
    })(this)
  });
  return this;
};

$.fn.getArea = function(cityCode) {
  comn.ajax({
    url: interUrl.common.getArea,
    data: {
      areacode: cityCode
    },
    success: (function(_this) {
      return function(res) {
        var j, len, o, ref, str;
        str = "<option value=''>--请选择--</option>";
        ref = res.data;
        var defaultValue = $(_this).attr('defaultValue');
		  if(ref) {
			  for (j = 0, len = ref.length; j < len; j++) {
				  o = ref[j];
				  str += "<option value='" + o.areacode + "' "+(defaultValue==o.areacode?"selected":"")+">" + o.county + "</option>";
			  }
			  $(_this).html(str);
		  }
        return
      };
    })(this)
  });
  return this;
};

$.fn.getOrg = function() {
  comn.ajax({
    url: interUrl.common.orgsList,
    data: {},
    success: (function(_this) {
      return function(res) {
        var j, len, o, ref, str;
        str = "<option value=''>--请选择--</option>";
        ref = res.data;
		  var defaultValue = $(_this).attr('defaultValue');
		  for (j = 0, len = ref.length; j < len; j++) {
          o = ref[j];
          str += "<option value='" + o.id + "' "+(defaultValue==o.id?"selected":"")+">" + o.name + "</option>";
        }
        return $(_this).html(str);
      };
    })(this)
  });
  return this;
};

//获取合作银行
$.fn.getBank= function(value) {
	comn.ajax({
		url: interUrl.common.bankList,
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
};

//获取资料目录
$.fn.getDir= function(value) {
	comn.ajax({
		url: interUrl.bank.getDirList,
		success: (function(_this) {
			return function(res) {
				var o;
				return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
						var j, len, ref, results;
						ref = res.data;
						results = [];
						for (j = 0, len = ref.length; j < len; j++) {
							o = ref[j];
							results.push("<option value='" + o.id + "' data-parentId='"+ o.parentDicId+"'>" + o.directoryPath + "</option>");
						}
						return results;
					})()).join("")).val(value || "");
			};
		})(this)
	});
	return this;
};
//用户角色
$.fn.getRole = function() {
	comn.ajax({
		url: interUrl.common.roleList,
		data: {},
		success: (function(_this) {
			return function(res) {
				var j, len, o, ref, str;
				str = "<option value=''>--请选择--</option>";
				ref = res.data;
				var defaultValue = $(_this).attr('defaultValue');
				for (j = 0, len = ref.length; j < len; j++) {
					o = ref[j];
					str += "<option value='" + o.id + "'>" + o.name + "</option>";
				}
				return $(_this).html(str);
			};
		})(this)
	});
	return this;
};

$.fn.getRuleList = function() {
  comn.ajax({
    url: interUrl.common.ruleList,
    data: {},
    success: (function(_this) {
      return function(res) {
        var j, len, o, ref, str;
        o = res.data;
        str = "<option value=''>--请选择--</option>";
        ref = res.data;
        for (j = 0, len = ref.length; j < len; j++) {
          o = ref[j];
          str += "<option value='" + o.id + "'>" + o.name + "</option>";
        }
        return $(_this).html(str);
      };
    })(this)
  });
  return this;
};
$.fn.getProblemList = function() {
	comn.ajax({
		url: interUrl.problem.listType,
		data: {},
		success: (function(_this) {
			return function(res) {
				var j, len, o, ref, str;
				o = res.data;
				str = "<option value=''>--请选择--</option>";
				ref = res.data;
				for (j = 0, len = ref.length; j < len; j++) {
					o = ref[j];
					str += "<option value='" + o.id + "'>" + o.name + "</option>";
				}
				return $(_this).html(str);
			};
		})(this)
	});
	return this;
};
//合作银行列表
$.fn.getLoanBank = function(id, value) {
    comn.ajax({
        url: interUrl.loanProduct.bankList,
        data: {
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
                        results.push("<option value='" + o.id + "'>" + o.bankName + "</option>");
                    }
                    return results;
                })()).join("")).val(value || "");
            };
        })(this)
    });
    return this;
};
//合作机构列表
$.fn.getTrustIdList = function(id, value) {
    comn.ajax({
        url: interUrl.cooperationAgency.loanProductTrustRefList,
        data: {
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
                        results.push("<option value='" + o.id + "'>" + o.bankName + "</option>");
                    }
                    return results;
                })()).join("")).val(value || "");
            };
        })(this)
    });
    return this;
};
//获取合同模版的合作机构列表
$.fn.getTrustIdList2 = function (value, callback) {
	comn.ajax({
		url: interUrl.cooperationAgency.loanProductTrustRefList,
		success: (function(_this) {
			return function(res) {
				var o;
				$(_this).html((callback ? "" : "<option value=''>--请选择--</option>") + ((function() {
						var j, len, ref, results;
						ref = res.data;
						results = [];
						for (j = 0, len = ref.length; j < len; j++) {
							o = ref[j];
							results.push("<option value='" + o.id      + "'>" + o.bankName + "</option>");
						}
						return results;
					})()).join("")).val(value || "");
				if(typeof(callback) == 'function'){callback();}
			};
		})(this)
	});
	return this;
};

$.fn.getProductIds = function(id, value, callback) {
	comn.ajax({
		url: 'cooperation/product/allList',
		data: {
			bankId : id
		},
		success: (function(_this) {
			return function(res) {
				var o;
				$(_this).html(((function() {
						var j, len, ref, results;
						ref = res.data;
						results = [];
						var valueArr = [];
						if(value){
							valueArr = value.split(",");
						}
						for (j = 0, len = ref.length; j < len; j++) {
							o = ref[j];
							var flag = false;
							for (var i = 0; i < valueArr.length; i++) {
								if (o.productNo == valueArr[i]) {
									flag = true;
								}
							}

							results.push("<option value='" + o.productNo + "'"+ (flag ? 'selected' : '') +"'>" + o.productName + "</option>");
						}
						return results;
					})()).join(""));
				if(typeof(callback) == 'function'){callback();}
			};
		})(this)
	});
	return this;
};
//获取合作银行列表
$.fn.eContractBank = function (value, callback) {
	comn.ajax({
		url: interUrl.eContract.bankList,
		success: (function(_this) {
			return function(res) {
				var o;
				$(_this).html((callback ? "" : "<option value=''>--请选择--</option>") + ((function() {
						var j, len, ref, results;
						ref = res.data;
						results = [];
						for (j = 0, len = ref.length; j < len; j++) {
							o = ref[j];
							results.push("<option value='" + o.id      + "'>" + o.bankName + "</option>");
						}
						return results;
					})()).join("")).val(value || "");
				if(typeof(callback) == 'function'){callback();}
			};
		})(this)
	});
	return this;
};

//获取开放银行列表
$.fn.getOpenBanklist = function (value, callback) {
	comn.ajax({
		url: interUrl.branchData.openingBankManageAllOpeningBankNoPage,
		success: (function(_this) {
			return function(res) {
				//console.log(res)
				var o;
				$(_this).html((callback ? "" : "<option value=''>--请选择--</option>") + ((function() {
						var j, len, ref, results;
						ref = res.data;
						results = [];
						for (j = 0, len = ref.length; j < len; j++) {
							o = ref[j];
							results.push("<option value='" + o.bankCode      + "'>" + o.bankName + "</option>");
						}
						return results;
					})()).join("")).val(value || "");
				if(typeof(callback) == 'function'){callback();}
			};
		})(this)
	});
	return this;
};
//获取开启电子合同的分公司
$.fn.getOpenEcontractbranchCompany= function(value) {
    comn.ajax({
        url: interUrl.eContract.getOpenEcontractbranchCompany,
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
};
$.fn.getTemplate = function (idV, value) {
	comn.ajax({
		url: interUrl.onlineSigning.selectTemplate,
		data: {
			bankId: idV
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
							results.push("<option value='"+ o.id +"'>" + o.templateName + "</option>");
						}
						return results;
					})()).join("")).val(value || "");
			};
		})(this)
	});
	return this;
};
//获取印章名称
$.fn.getSealname = function (orgId, value) {
	comn.ajax({
		url: interUrl.onlineSigning.listAll,
		data: {
			orgId: orgId
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
								results.push("<option value='"+ o.id +"'>" + o.sealName + "</option>");
							}
							return results;
						})()).join("")).val(value || "");
			};
		})(this)
	});
	return this;
};
$.fn.getOverDueBank = function(value) {
	comn.ajax({
		url: interUrl.overDueRule.bankList,
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
};
$.fn.getAllBank = function(value) {
	comn.ajax({
		url: interUrl.overDueRule.allBankList,
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
};
$.extend({
    /*
  1. 参数1 eg: dataArr:{["id/class", "key", "value", 'status']}; id/class：绑定元素; key：参数, value为选中元素value值; status: 不需要‘--请选择--’字样时设置为‘-1’
  2. 参数2 callback回调函数
*/

    getCommonMethodPort: function(dataArr, callback, async) {
        var dataKeyArr = [];
        for(var i = 0; i < dataArr.length; i++) {
            dataKeyArr.push(dataArr[i][1]);
        }
        comn.ajax({
            url: interUrl.common.commonMethod,
            async: async,
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
				if(typeof(callback) == 'function'){callback();}
			}
        });
    }
});
interUrl = {
  mockList: "",
  basic: "/",
  //basic: "/api/",
  common: {
    login: "login",
    getProvince: "area/getProvince",
    getCity: "area/getCityByProvince",
    getArea: "area/getCountyByCity",
    getCompany: "carDealer/branchComp/list",
    getGroup: "carDealer/group/list",
    getUserByCompanyId: "carDealer/compUser/list",
    orgList: "org/list",
    ruleList: "role/list",
	roleList:'za/role/listAll',
    bankList: "organization/bankList",
  	financial: "organization/financeOrgList",
    insuList: "insurance/list",
    orgsList: "organization/brachCompany",
  	commonMethod: "codeLibrary/codeLibrary/list"
  },
  carDealer: {
	  get: "carDealer/get",
	  add: "carDealer/add",
	  update: "carDealer/update",
	  setStatus: "carDealer/setStatus",
	  list: "carDealer/list",
	  accountList: "carDealer/account/list",
	  accountAdd: "carDealer/account/add",
	  accountDel: "carDealer/account/del",
	  accountStop: "carDealer/account/setStatus",
	  "delete": "carDealer/del"
  },
  org: {
	  organizationAllDir: "organization/list",
	  add: "organization/add",
	  get: "organization/company/get",
	  update: "organization/update",
	  setBank: "organization/bankComp/update",
	  insuranceList: "organization/insurance/list",
	  setInsurance: "organization/insurance/update",
	  userList: "za/user/list",
	  accountAdd: "company/account/add",
	  accountList: "company/account/list",
	  accountStop: "company/account/status",
	  accountDel: "company/account/del",
      organizationList: "organization/businessRegion/list",
      organizationAdd: "organization/businessRegion/add",
      organizationDel: "organization/businessRegion/delete",
      openEcontractAccount: "organization/openEcontractAccount",
	  channelDealerList: "organization/channelDealerList",
	  channelDealerUpdate: "organization/channelDealer/update",
      setFinancial: "organization/financeOrgComp/update"
  },
  guarantee: {
	  tree: "guarantee/list",
	  add: "guarantee/add",
	  update: "guarantee/update",
	  del: "guarantee/del",
	  get: "guarantee/info",
	  setBank: "guarantee/bankComp/update",
	  setStatus: "guarantee/setStatus",
	  accountList: "guarantee/account/list",
	  accountAdd: "guarantee/account/add",
	  accountSetStatus: "guarantee/account/setStatus",
	  accountDel: "guarantee/account/del",
      setFinancial: "guarantee/financeOrgComp/update"
  },
  bank: {
	  tree: "cooperation/list",
	  add: "cooperation/add",
	  get: "cooperation/get",
	  update: "cooperation/update",
	  setStatus: "cooperation/setStatus",
	  del: "cooperation/del",
	  rateInfosGet: "cooperation/product/list",
	  rateInfosUpdate: "cooperation//product/update",
	  rateInfosAdd: "cooperation/product/add",
	  rateInfosDel: "cooperation/product/del",
	  rateInfosSetStatus: "cooperation/product/setStatus",
	  guaranteeGet: "cooperation/guarantee/get",
	  //productAdd: "cooperation/product/add",
	  productAdd: "cooperation/product/addList",
	  //productUpdate: "cooperation/product/update",
	  productUpdate: "cooperation/product/updateList",
	  memberGets: "cooperation/member/get",
      userBankList: "za/userBank/listForPage",
      userBankAdd: "za/userBank/add",
      userBankDel: "za/userBank/delete",
	  //dirList: "outRefDocumentDir/querySelectedDir",
      dirList: "outRefDocumentDir/queryAllSelectedDir",
	  getDirList: "bankDir/getAllChildrenDir",
	  delDir: "outRefDocumentDir/deleteDocumentDir",
	  addDir: "outRefDocumentDir/addDocumentDir",
      modifyDocumentDir: "outRefDocumentDir/modifyDocumentDir"
  },
    financialInstitution: {
        tree: "cooperation/organization/list",
        get: "cooperation/organization/get",
        add: "cooperation/organization/add",
        update: "cooperation/organization/update",
        productAdd: "cooperation/organization/product/addList",
        productUpdate: "cooperation/organization/product/updateList",
        rateInfosGet: "cooperation/organization/product/list",
        rateInfosSetStatus: "cooperation/organization/product/setStatus",
        rateInfosDel: "cooperation/organization/product/del",
        guaranteeGet: "cooperation/organization/guarantee/get",
		del: "cooperation/organization/del",
        setStatus: "cooperation/organization/setStatus",
		copy: 'cooperation/organization/copyProduct'
},
  insu: {
	  tree: "insurance/list",
	  add: "insurance/add",
	  get: "insurance/get",
	  update: "insurance/update",
	  setStatus: "insurance/setStatus",
	  del: "insurance/del",
	  typeGet: "insurance/type/list",
	  typeUpdate: "insurance/type/update",
	  typeAdd: "insurance/type/add",
	  typeDel: "insurance/type/del",
	  typeSetStatus: "insurance/type/setStatus"
  },
  loanModal: {
    getModalList: "loanTemplateManage/loanTemplate/list",
    startModal: "loanTemplateManage/loanTemplate/start",
    stopModal: "loanTemplateManage/loanTemplate/stop",
    delModal: "loanTemplateManage/loanTemplate/del",
    getModalInfo: "loanTemplateManage/loanTemplate/get",
    saveModalinfo: "loanTemplateManage/loanTemplate/save",
    loadModalBg: "loanTemplateManage/loanTemplateContent/uploadFile",
	  copyModal: "loanTemplateManage/loanTemplate/copyTemplate"
  },
	supplier: {
		tree: "supplier/list",
		get: "supplier/get",
		add: "supplier/add",
		update: "supplier/update",
		del: "supplier/del",
		setStatus: "supplier/setStatus"
	},
	product: {
		list: "product/list",
		typeGet: "product/get",
		typeAdd: "product/add",
		typeUpdate: "product/update",
		typeDel: "product/del",
		typeSetStatus: "product/setStatus"
	},
	blankContract:{
		list:'contractManage/list', //合同类型列表
		addType:'contractManage/type/add',//新增合同类型
		delType: 'contractManage/type/del',//删除合同类型
		startType:'contractManage/type/start',//启用用当前合同
		stopType:'contractManage/type/stop',//停用当前合同
		bankList:'contractManage/bank/list',//银行列表获取
		bankStop: 'contractManage/bank/stop',//合同银行停用
		bankStart: 'contractManage/bank/start',//合同银行启用
		addBank: 'contractManage/bank/add',//新增银行
		updateBank: 'contractManage/bank/update',//修改银行
		bankDel: 'contractManage/bank/del',//删除银行
	},
    dealerGroup:{
        list:'dealerGroupManage/list',
        add:'dealerGroupManage/add',
        update:'dealerGroupManage/update'
	},
	directory: {
		tree: "bankDir/getAllDir",
		add: "bankDir/addTemplet",
		update: "bankDir/modifyTemplet",
		del: "bankDir/deleteTemplet",
		setStatus: "bankDir/modifyIsInuse"
	},
	problem: {
		addType: "question/type/add",
		add: "question/add",
		update: "question/update",
		get: "question/get",
		list: "question/list",
		status: "question/enOrDisable",
		listType: "question/type/allList",
		del: "question/delete"
	},
	//逾期规则管理
	overDueRule: {
		saveBank: "overdueConfig/add",//新增/修改 合作银行逾期规则
		overdueConfigList:"overdueConfig/overdueConfigList",//逾期规则数据列表
		delOverdueConfig:"overdueConfig/delOverdueConfig",//删除逾期规则
		setOverdueConfig: "overdueConfig/setOverdueConfig",//  启用/停用规则
		addOverdueConfigRecord:"overdueConfig/addOverdueConfigRecord",//逾期规则设置
		configDetail: "overdueConfig/configDetail",//逾期规则详情
		bankList:"overdueConfig/bankList",//新增合作银行获取
		allBankList: "overdueConfig/allBankList"
	},
    loanProduct: {
        list: "loanProduct/list",
        get: "loanProduct/get",
        add: "loanProduct/save",
        status: "loanProduct//reset",
        update: "loanProduct/update",
        bankList: "loanProduct/bank/refList"
    },
    codeLibrary:{
  		codeTypeList:"codeLibrary/getCodeTypePageData",
		list:"codeLibrary/getPageData",
		get:"codeLibrary/getCodeLibraryById",
		delete:"codeLibrary/delete",
		update:"codeLibrary/update",
		add:"codeLibrary/save",
        cacheClear:"codeLibrary/cacheClear"
	},
    sysConfig:{
        list:"sysConfig/getPageData",
        get:"sysConfig/getSysConfigById",
        delete:"sysConfig/delete",
        update:"sysConfig/update",
        add:"sysConfig/save",
        cacheClear:"sysConfig/cacheClear"
	},
	eContract: {
		list: "econtract/list",
		bankList: "cooperation/product/cooperation/list",
		modifyStatus: "econtract/modifyStatus",
		econtractModel: "econtract/getTemplateParams",
		getParam: "econtract/getParam",
		eContractAdd: "econtract/add",
		econtractSelect: "econtract/select",
		econtractModify: "econtract/modify",
        getOpenEcontractbranchCompany: "organization/getOpenEcontractbranchCompany"
	},
	onlineSigning: {
		list: "onlineSign/list",
		add: "onlineSign/add",
		update: "onlineSign/modify",
		modifyStatus: "onlineSign/modifyStatus",
		modify: "onlineSign/select",
		selectTemplate: "econtract/selectTemplate",
		sealList:'companySealInfo/list',//印章数据列表获取
		statusChange:"companySealInfo/enOrDisable",//启用/停用
		saveSeal: "companySealInfo/save",//新增印章保存
		listAll:'companySealInfo/listAll'
	},
	eContractSituation: {
		list: "signInfo/list"
	},
	channelDealer: {
		get: "channelDealer/get",
		tree: "channelDealer/list",
		add: "channelDealer/add",
		update: "channelDealer/update",
		setStatus: "channelDealer/setStatus"
	},
	//开放银行支行管理
	branchData: {
		openingBankManageAllOpeningBankNoPage: "openingBankManage/allOpeningBankNoPage",//开放银行列表接口
		cooperationSelectBranchBankByCondition: "cooperation/selectBranchBankByCondition",//开放银行支行查询接口
		cooperationUpdateAndSaveBranchBank: "cooperation/updateAndSaveBranchBank",//开放银行支行新增修改接口
	},
	//合作机构列表
	cooperationAgency: {
		loanProductTrustRefList: "loanProduct/trust/refList",//合作机构列表
	}
};

$(function() {
  $("body").on("click", "a", function(e) {
    var ref;
    if (((ref = $(this).href) != null ? ref.index(".html") : void 0) > -1) {
      e.preventDefault();
      return comn.toUrl({
        "url": $(this).href
      });
    }
  });
  
  try{
	  $(".date").datetimepicker({
	        format: "yyyy-mm-dd",
	        pickerPosition: "bottom-right",
	        language: "zh-CN",
	        minView: 2,
	        todayHighlight: true,
	        autoclose: true,
	        todayBtn: true,
	        show: true
	      });
  }catch(e){};
  initEvent();
  $(".modal").on("show.bs.modal", function() {
    if ($(this).find("form").length) {
      return $(this).find("form")[0].reset();
    }
  });
  return $("#btn-search").click(function() {
    return $("#table").bootstrapTable('refresh', {url: '...'});
  });
});

Mock.mock(/list.json/, {
  'totalItem': 500,
  'data|40': [
    {
      'type|1': [1,2,3,4,5,6,7,8,9,10,11,12,13],
      'id': '@INT(1000, 60000)',
      'customerId': '@INT(1000, 60000)',
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

$.validator.setDefaults({
  highlight: function(e) {
    return $(e).closest(".input-tip").removeClass("has-success").addClass("has-error");
  },
  success: function(e, r) {
    return $(r).closest(".input-tip").removeClass("has-error").addClass("has-success");
  },
  errorPlacement: function(e, r) {
    if (e.text()) {
      return layer.tips(e.text(), r, {
        tips: [1, "#000"]
      });
    }
  }
});

queryParams = function(params) {
  return {
    search: params.search,
    page: (params.limit + params.offset) / params.limit,
    pageSize: params.limit
  };
};
accountType = function (value, row, index) {
    return [null, "对公账户", "个人账户"][value] || null;
};
accountPurpose = function (value, row, index) {
    return [null, "公司账户", "垫款账户", "贴息账户", "7*24账户"][value] || null;
};
//文件类型
docType = function (value, row, index) {
	return [null, "图片", "视频"][value] || null;
}
bankFormatter = function (value) {
    switch (value) {
        case "ICBC":
            return "工商银行";
            break;
        case "CCB":
            return "建设银行";
            break;
        case "BOC":
            return "中国银行";
            break;
        case "ABC":
            return "农业银行";
            break;
        case "CMB":
            return "招商银行";
        case "RCC":
            return "农村信用合作社";
        case "BCM":
            return "交通银行";
        case "CCBZX":
            return "中信银行";
        case "ZMCB":
            return "浙江民泰商业银行";
        case "TZB":
            return "台州银行";
        case "WZB":
            return "温州银行";
        case "ALIPAY":
            return "支付宝";
        case "NBBC":
            return "宁波银行";
        case "ZJTLBC":
            return "浙江泰隆商业银行";
        case "PSBC":
            return "邮政银行";
        case "NCBANK":
            return "南昌银行";
        case "RCBANK":
            return "农村商业银行";
        case "CMBC":
            return "民生银行";
        case "CEBBANK":
            return "中国光大银行";
        case "YZBANK":
            return "银座村镇银行";
        case "CZBANK":
            return "浙商银行";
            break;
    }
};
cardType = function(value, row, index) {
  return (value === 1 && "身份证") || (value === 2 && "军官证") || (value === 3 && "侨胞证") || (value === 4 && "外籍人士") || "";
};

resultStatus = function(value, row, index) {
  return (value === 1 && "未处理") || (value === 2 && "关闭") || (value === 3 && "退回") || (value === 4 && "发起征信") || "";
};

managementType = function(value, row, index) {
  return (value === 1 && "管理权") || (value === 2 && "业务权") || "";
};

relationship = function(value, row, index) {
  return (value === 1 && "本人") || (value === 2 && "夫妻") || (value === 3 && "父亲") || (value === 4 && "母亲") || (value === 5 && "姐妹") || (value === 6 && "兄弟") || (value === 7 && "子女") || "";
};

jQuery.validator.addMethod("telephone", function(value,element){  
	  return this.optional(element) || /^[[\d]{3,4}-]?[\d]{7,8}$/.test(value);  
});
jQuery.validator.addMethod("mobile", function(value, element) {
	    return this.optional(element) || /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value);
});
jQuery.validator.addMethod("phoneMix", function(value, element) {
	    return this.optional(element) || /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value) || /^[[\d]{3,4}-]?[\d]{7,8}$/.test(value);
});
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
$.ajax({
	url: '/getSystemName',
	type: "GET",
	dataType: "json",
	success: function(data, textStatus, jqXHR) {
		if (typeof data === "string") {
			data = JSON.parse(data);
		}
		var o = data.data;
		if (o) {
			if(data.data.systemName === "shengan") {
				$(".gray-bg").addClass("styleShengAn")
			} else if(data.data.systemName === "cherong"){
				$(".gray-bg").addClass("styleCherong")
			} else {
				$(".gray-bg").removeClass("styleShengAn styleCherong")
			}
		}
	}
});