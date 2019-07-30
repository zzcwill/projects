var G_FIELD_DICT, args, checkBox, dataLoad_1, dataLoad_2, dataLoad_3, dataLoad_4, dataLoad_5, dataLoad_6, dataLoad_7, department, fun_2, handle_1, handle_2, handle_4, handle_5, handle_6, role, tableEvent, tableEvent_2, tableEvent_4, tableEvent_5, tableEvent_6;

args = comn.getArgs();
$("#post").getJobList(); //职务预算加载
$("#profession_Code").getOccupationList();//职业
$("#workNatureCode").getUnitList();//单位经济性质预算加载
dataLoad_1 = function(params) {
  var p;
  p = params.data;
  p["customerId"] = args["customerId"];
  return comn.ajax({
    url: interUrl.mockList || interUrl.credit.creditList,
    data: p,
    success: function(res) {
      params.success({
        'total': res.totalItem,
        rows: res.data
      });
      return params.complete();
    }
  });
};

handle_1 = function(value, row, index) {
  return ["<button class='btn btn-primary btn-xs info'>查看详情</button>"].join("");
};

tableEvent = {
  "click .info": function(e, a, item, index) {
    return window.parent.toUrl({
      url: "./Modal/loanManage/creditManage/creditInfo.html?type=1&businessId=" + item.id
    });
  }
};

dataLoad_2 = function(params) {
  var p;
  p = params.data;
  p["id"] = args["customerId"];
  return comn.ajax({
    url: interUrl.mockList || interUrl.gr.teamList,
    data: p,
    success: function(res) {
      params.success({
        'total': res.totalItem,
        rows: res.data
      });
      return params.complete();
    }
  });
};

handle_2 = function(value, row, index) {
  if(row.authType == 0){ return; }
  var quan, str;
  quan = "";
  if (row.managementType === 2) {
    quan = "<li><a class='addPower'>赋管户权</a></li>";
  } else if (row.managementType === 1) {
    return '--';
    //quan = "";
  }
  str = "";
  if (row.status === 0) {
    str = "<li><a class='stop'>启用</a></li>";
  } else if (row.status === 1) {
    str = "<li><a class='stop'>停用</a></li>";
  }
  return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>" + str, "<li><a class='del'>删除</a></li>" + quan, "</ul>", "</div>"].join("");
};

fun_2 = null;

tableEvent_2 = {
  "click .stop": function(e, a, item, index) {
    var o;
    $("#sure").nameValues({
      content: ["启用【"+ item.managerName +"】业务权？", "停用【"+ item.managerName +"】业务权？"][item.status]
    });
    $("#sure").modal("show");
    o = {};
    if (item.status === 0) {
      o['status'] = 1;
    } else if (item.status === 1) {
      o['status'] = 0;
    }
    o["id"] = item["id"];
    return fun_2 = function() {
      return comn.ajax({
        url: interUrl.gr.customerStatus,
        data: o,
        success: function(res) {
          if (o["status"] === 0) {
            tip({
              content: "停用成功!"
            });
          } else if (o["status"] === 1) {
            tip({
              content: "启用成功!"
            });
          }
          $("#sure").modal("hide");
          return $("#table_2").bootstrapTable('selectPage', 1);
        }
      });
    };
  },
  "click .del": function(e, a, item, index) {
    $("#sure").nameValues({
      content: "是否删除【"+ item.managerName +"】业务权？"
    });
    $("#sure").modal("show");
    return fun_2 = function() {
      return comn.ajax({
        url: interUrl.gr.customerManagerDel,
        data: {
          id: item["id"]
        },
        success: function(res) {
          tip({
            content: "删除成功!"
          });
          $("#sure").modal("hide");
          return $("#table_2").bootstrapTable('selectPage', 1);
        }
      });
    };
  },
  "click .addPower": function(e, a, item, index) {
    $("#sure").nameValues({
      content: "将【"+ comn.user.realname +"】管户权移交给【"+ item.managerName +"】？"
    });
    $("#sure").modal("show");
    return fun_2 = function() {
      return comn.ajax({
        url: interUrl.gr.customerSetAut,
        data: {
          id: item["id"],
          managementType: 1
        },
        success: function(res) {
          tip({
            content: "用户移交成功!"
          });
          $("#sure").modal("hide");
          return $("#table_2").bootstrapTable('selectPage', 1);
        }
      });
    };
  }
};

dataLoad_3 = function(params) {
  var p;
  p = params.data;
  p["id"] = args["customerId"];
  return comn.ajax({
    url: interUrl.mockList || interUrl.gr.customerAssetList,
    data: p,
    success: function(res) {
      params.success({
        'total': res.totalItem,
        rows: res.data
      });
      return params.complete();
    }
  });
};

dataLoad_4 = function(params) {
  var p;
  p = params.data;
  p["id"] = args["customerId"];
  return comn.ajax({
    url: interUrl.mockList || interUrl.gr.relationShipList,
    data: p,
    success: function(res) {
      params.success({
        'total': res.totalItem,
        rows: res.data
      });
      return params.complete();
    }
  });
};

handle_4 = function(value, row, index) {
  return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='update'>修改</a></li>", "<li><a class='delete'>删除</a></li>", "</ul>", "</div>"].join("");
};

tableEvent_4 = {
  "click .delete": function(e, a, item, index) {
    $("#sure").nameValues({
      content: "删除关系人？"
    });
    $("#sure").modal("show");
    return fun_2 = function() {
      return comn.ajax({
        url: interUrl.gr.customerRelationDel,
        data: {
          id: item["id"]
        },
        success: function(res) {
          tip({
            content: "删除成功!"
          });
          $("#sure").modal("hide");
          return $("#table_4").bootstrapTable('selectPage', 1);
        }
      });
    };
  },
  "click .update": function(e, a, item, index) {
    $("#addRelationUser").modal("show");
    return $("#addRelationUser").find("form").values(item);
  }
};

dataLoad_5 = function(params) {
  var p;
  p = params.data;
  p['id'] = args["customerId"];
  return comn.ajax({
    url: interUrl.mockList || interUrl.gr.loanList,
    data: p,
    success: function(res) {
      params.success({
        'total': res.totalItem,
        rows: res.data
      });
      return params.complete();
    }
  });
};

handle_5 = function(value, row, index) {
  return "<button class='btn btn-primary btn-xs loanDetail'>查看项目详情</button>";
};

tableEvent_5 = {
  "click .loanDetail": function(e, a, item, index) {
	  comn.addTab({title: '项目详情', href: "./Modal/customManage/customer/loanDetail.html?id=" + item.relativeApplyId1 + "&loanApplyId="+ item.relativeApplyId1 +"&projectId=" + item.projectId + "&space=LOAN&releventFlowNode=LOAN_OFFICE_STAFF_BUDGET&releventFlow=LOAN_APPLY_FLOW&businessTypeCode=" + item.flowType});
  }
};

dataLoad_6 = function(params) {
  var p;
  p = params.data;
  p["id"] = args["customerId"];
  return comn.ajax({
    url: interUrl.mockList || interUrl.gr.history,
    data: p,
    success: function(res) {
      params.success({
        'total': res.totalItem,
        rows: res.data
      });
      return params.complete();
    }
  });
};

handle_6 = function(value, row, index) {
  return ["<button class='btn btn-primary btn-xs show'>查看</button>"].join("");
};

monthlyIncomeType = function(v){return ['-','1-4999','5000-9999','10000-14999','15000-19999','2万以上'][parseInt(v)];};
reservedFundsType = function(v){return ['-','无','1-500','501-1000','1001-1500','1501-2000','2001-2500','2501-3000','3000以上'][parseInt(v)];}
G_FIELD_DICT = {
  'cardType': {title:'证件类型',format:cardType},
  'mobile': '手机号码',
  'cardNo': '证件号码',
  'customerName': '客户名称',
  'customerNo': '客户编号',
  'registerDate': '建档日期',
  'status': {title:'客户状态',format:statuss},
  'gender': {title:'性别',format:function(value){return (value == 1 && "男") || (value == 0 && "女") || "";}},
  'birthday': '出生日期',
  'age': '年龄',
  'maritalStatus': {title:'婚姻状态',format:function(v){return ['-','已婚','未婚','离异','丧偶'][parseInt(v)]}},
  'homePhone': '家庭电话',
  'nativePlace': '籍贯',
  'education': {title:'最高学历',format:function(v){return ['-','初中及以下','高中','大专','本科','硕士及以上'][parseInt(v)]}},
  'housingStatus': {title:'住房状况',format:function(v){return ['-','自有住房','贷款购房','租房','其他'][parseInt(v)]}},
  'monthRepayment': '月租',
  'profession': '职业',
  'industry': {title:'所属行业',format:function(v){return ['-','邮电通讯行业','房地产行业','交通运输行业','法律/司法行业','文化/娱乐/体育行业','医疗行业','计算机/网络行业','商业贸易行业','财政行业','税务行业','咨询行业','社会服务行业','旅游/饭店行业','部队系统','证券行业','银行业','保险业','其他金融行业','采矿业','建筑业','工业','制造业','水电气供应','机关团体','农林牧渔','其它'][parseInt(v)]}},
  'monthlyIncome': {title:'个人月收入',format:monthlyIncomeType},
  'company': '工作单位',
  'workPhone': '单位电话',
  'reservedFunds': {title:'公积金',format:reservedFundsType},
  'companyAddressProvince': '单位地址(省)',
  'companyAddressCity': '单位地址(市)',
  'companyAddressCounty': '单位地址(区)',
  'companyAddress': '单位地址',
  'homeAddressProvince': '家庭地址(省)',
  'homeAddressCity': '家庭地址(市)',
  'homeAddressCounty': '家庭地址(区)',
  'homeAddressVillage': '家庭详细地址',
  'spouseName': '配偶姓名',
  'spouseCardType': {title:'配偶证件类型',format:cardType},
  'spouseCardNo': '配偶证件号码',
  'spouseMobile': '配偶手机号',
  'spouseNativePlace': '配偶户籍',
  'spouseReservedFunds': {title:'配偶公积金',format:reservedFundsType},
  'spouseCompanyAddrProvince': '配偶单位地址(省)',
  'spouseCompanyAddrCity': '配偶单位地址(市)',
  'spouseCompanyAddrCounty': '配偶单位地址(区)',
  'spouseCompanyAddr': '配偶公司地址',
  'spouseCompany': '配偶工作单位',
  'spouseCompanyPhone': '配偶单位电话',
  'spouseMonthlyIncome': {title:'配偶月收入',format:monthlyIncomeType}
};

tableEvent_6 = {
  "click .show": function(e, a, item, index) {
    var $table_8;
    $table_8 = $("#table_8 > tbody");
    $table_8.html("<tr><td></td><td>暂无修改记录！</td><td></td></tr>");
    (function() {
      var p;
      p = {};
      p['id'] = item['id'];
      p['modifyTime'] = item['modifyTime'];
      return comn.ajax({
        url: interUrl.mockList || interUrl.gr.record,
        data: p,
        success: function(res) {
          var k, v;
          str = ((function() {
            var ref, results;
            ref = res.data;
            results = [];
            for (k in ref) {
			  if(!G_FIELD_DICT[k])continue;
			  var title,v0,v1;
			  try{
				  if(typeof G_FIELD_DICT[k] === "string"){
					  title = G_FIELD_DICT[k];
					  v0 = ref[k][0];
					  v1 = ref[k][1];
				  }else if(typeof G_FIELD_DICT[k] === "object"){
					  title = G_FIELD_DICT[k].title;
					  v0 = G_FIELD_DICT[k].format?G_FIELD_DICT[k].format(ref[k][0]):ref[k][0];
					  v1 = G_FIELD_DICT[k].format?G_FIELD_DICT[k].format(ref[k][1]):ref[k][1];
				  }
			  }catch(e){}
              results.push("<tr><td>" + title + "</td><td>" + (v0 || "--") + "</td><td>" + (v1 || "--") + "</td></tr>");
            }
            return results;
          })()).join("");
		  if(str){ $table_8.html(str); }
        }
      });
    })();
    return $("#record").modal("show");
  }
};

dataLoad_7 = function(params) {
  var p;
  p = params.data;
  return comn.ajax({
    url: interUrl.mockList || interUrl.gr.userList,
    data: $.extend($("#userInfo").values(), p),
    success: function(res) {
      params.success({
        'total': res.totalItem,
        rows: res.data
      });
      return params.complete();
    }
  });
};

checkBox = function(value, row, index) {
  return "<input name='uid' type='checkbox' value='" + value + "' />";
};

department = function(value, row, index) {
  var o, ref;
  return (ref = ((function() {
    var i, len, ref1, results;
    if (row.roleList != null) {
      ref1 = row.roleList;
      results = [];
      for (i = 0, len = ref1.length; i < len; i++) {
        o = ref1[i];
        results.push(o.name);
      }
      return results;
    }
  })())) != null ? ref.join("/") : void 0;
};

//根据身份证取 省份,生日，性别  
function getInfo(ic) {  
    //获取输入身份证号码  
    var ic = String(ic);  
    //获取出生日期  
    var birth = ic.substring(6, 10) + "-" + ic.substring(10, 12) + "-" + ic.substring(12, 14);  
	$("#basicInfo").find("input[name='birthday']").val(birth);
    //获取性别  
    var gender = ic.slice(14, 17) % 2 ? "1" : "0"; // 1代表男性，0代表女性  
	$("#basicInfo").find("input[name='gender'][value="+gender+"]")[0].checked = true;
    //获取年龄  
    var myDate = new Date();  
    var month = myDate.getMonth() + 1;  
    var day = myDate.getDate();  
    var age = myDate.getFullYear() - ic.substring(6, 10) - 1;  
    if (ic.substring(10, 12) < month || ic.substring(10, 12) == month && ic.substring(12, 14) <= day) {  
        age++;  
    }  
	$("#basicInfo").find("input[name='age']").val(age + "");
}  

$(function() {
    //证件是否长期有效
    $("input[name='cardNoValid']").change(function(){
        if(this.value == 0){
            $("input[name='cardNoValidTime']").addClass("required");
        }else{
            $("input[name='cardNoValidTime']").removeClass("required");
        }
    });
  $("#orgList").getOrg(0);
  $("#ruleList").getRuleList();
  $("#userSearch").click(function() {
    return $("#table_7").bootstrapTable('selectPage', '1');
  });


  $("select[name='housingStatus']").change(function(){
	  $el = $("#explain");
	  //if(this.value == "2"){
		//  $el.show().find("label").eq(0).html("<span class='text-danger'>*&nbsp;</span>月还款： ")
	  //}else if(this.value == "3"){
		//  $el.show().find("label").eq(0).html("<span class='text-danger'>*&nbsp;</span>月租： ")
	  //}else if(this.value == "4"){
		//  $el.show().find("label").eq(0).html("<span class='text-danger'>*&nbsp;</span>说明： ")
	  //}else{
		//  $el.hide();
	  //}
    if (this.value == 5) {
      $el.show().find("label").html("<span class='text-danger'>*&nbsp;</span>租金:");
    } else if (this.value == 6) {
      $el.show().find("label").html("<span class='text-danger'>*&nbsp;</span>说明:");
    } else {
      $el.hide();
    }
  })

  $("#addUserModal").on("shown.bs.modal", function() {
    return $("#table_7").bootstrapTable(comn.table);
  });
  $("#checkSure").click(function() {
    var ids;
    ids = [];
    $(this).parents(".modal").find("[name='uid']:checked").each(function(index, item) {
      return ids.push($(this).val());
    });
    return comn.ajax({
      url: interUrl.gr.managerAdd,
      data: {
        id: args['customerId'],
        userIds: ids.join(",")
      },
      success: function(res) {
        $("#addUserModal").modal("hide");
        return $("#table_2").bootstrapTable('selectPage', 1);
      }
    });
  });
  $("#addUser").click(function() {
    return $("#addUserModal").modal("show");
  });
  if (args["type"] === "show") {
    $("fieldset").attr("disabled", "true");
	$("#save, #addUser, #addRelationUser_4").addClass("hide");

  }
  $("#OK").click(function() {
    return fun_2();
  });
  comn.ajax({
    url: interUrl.gr.get,
    data: {
      id: args["customerId"]
    },
    success: function(res) {
        if(!res.data.cardNoValid){ $("input[name='cardNoValidTime']").addClass("required"); }
      if (res.data.managerType === 2) {
        $("#basicInfo fieldset, #tempSave, #save").prop("disabled", "disabled");
      }
      $("#province_1").getProvinceC({
        code: res.data.companyAddressProvinceCode,
        value: res.data.companyAddressProvince || "--请选择--"
      }, $("#province_1").is(":disabled"));
      $("#city_1").getCityC(res.data.companyAddressProvinceCode, {
        code: res.data.companyAddressCityCode,
        value: res.data.companyAddressCity || "--请选择--"
      }, $("#city_1").is(":disabled"));
      $("#area_1").getAreaC(res.data.companyAddressCityCode, {
        code: res.data.companyAddressCountyCode,
        value: res.data.companyAddressCounty || "--请选择--"
      }, $("#area_1").is(":disabled"));
      // before2016-06-02
      // $("#city_1").getCity(res.data.companyAddressProvinceCode, res.data.companyAddressCityCode);
      // $("#area_1").getArea(res.data.companyAddressCityCode, res.data.companyAddressCountyCode);
      //$("#province_1").getProvince(res.data.companyAddressProvinceCode)
      $("#province_1").change(function() {
        if (this.value) {
          $("input[name=companyAddressProvince]").val($(this).find("option:selected").html());
          $("#area_1").val("");
          return $("#city_1").getCity(this.value).unbind("change").change(function() {
            if (this.value) {
              $("input[name=companyAddressCity]").val($(this).find("option:selected").html());
              return $("#area_1").getArea(this.value);
            }
          });
        }
      });
      $("#city_1").change(function() {
            if (this.value) {
              $("input[name=companyAddressCity]").val($(this).find("option:selected").html());
              return $("#area_1").getArea(this.value);
            }
          });
      $("#area_1").change(function() {
          $("input[name=companyAddressCounty]").val($(this).find("option:selected").html());
      });
      $("#province_2").getProvinceC({
        code: res.data.homeAddressProvinceCode,
        value: res.data.homeAddressProvince || "--请选择--"
      }, $("#province_2").is(":disabled"));
      $("#city_2").getCityC(res.data.homeAddressProvinceCode, {
        code: res.data.homeAddressCityCode,
        value: res.data.homeAddressCity || "--请选择--"
      }, $("#city_2").is(":disabled"));
      $("#area_2").getAreaC(res.data.homeAddressCityCode, {
        code: res.data.homeAddressCountyCode,
        value: res.data.homeAddressCounty || "--请选择--"
      }, $("#area_2").is(":disabled"));
      //before2016-06-02
      // $("#city_2").getCity(res.data.homeAddressProvinceCode, res.data.homeAddressCityCode);
      // $("#area_2").getArea(res.data.homeAddressCityCode, res.data.homeAddressCountyCode);
      // $("#province_2").getProvince(res.data.homeAddressProvinceCode);
      $("#province_2").change(function() {
        if (this.value) {
          $("input[name=homeAddressProvince]").val($(this).find("option:selected").html());
          $("#area_2").val("");
          return $("#city_2").getCity(this.value).unbind("change").change(function() {
            if (this.value) {
              $("input[name=homeAddressCity]").val($(this).find("option:selected").html());
              return $("#area_2").getArea(this.value);
            }
          });
        }
      });
      $("#city_2").change(function() {
            if (this.value) {
              $("input[name=homeAddressCity]").val($(this).find("option:selected").html());
              return $("#area_2").getArea(this.value);
            }
          });
      $("#area_2").change(function() {
        $("input[name=homeAddressCounty]").val($(this).find("option:selected").html());
      });
      $("#province_3").getProvinceC({
        code: res.data.spouseCompanyAddrProvinceCode,
        value: res.data.spouseCompanyAddrProvince || "--请选择--"
      }, $("#province_3").is(":disabled"));
      $("#city_3").getCityC(res.data.spouseCompanyAddrProvinceCode, {
        code: res.data.spouseCompanyAddrCityCode,
        value: res.data.spouseCompanyAddrCity || "--请选择--"
      }, $("#city_3").is(":disabled"));
      $("#area_3").getAreaC(res.data.spouseCompanyAddrCityCode, {
        code: res.data.spouseCompanyAddrCountyCode,
        value: res.data.spouseCompanyAddrCounty || "--请选择--"
      }, $("#area_3").is(":disabled"));
      // $("#city_3").getCity(res.data.spouseCompanyAddrProvinceCode, res.data.spouseCompanyAddrCityCode);
      // $("#area_3").getArea(res.data.spouseCompanyAddrCityCode, res.data.spouseCompanyAddrCountyCode);
      // $("#province_3").getProvince(res.data.spouseCompanyAddrProvinceCode);
      $("#province_3").change(function() {
        if (this.value) {
          $("input[name=spouseCompanyAddrProvince]").val($(this).find("option:selected").html());
          $("#area_3").val("");
          return $("#city_3").getCity(this.value).unbind("change").change(function() {
            if (this.value) {
              $("input[name=spouseCompanyAddrCity]").val($(this).find("option:selected").html());
              return $("#area_3").getArea(this.value);
            }
          });
        }
      });
      $("#city_3").change(function() {
            if (this.value) {
              $("input[name=spouseCompanyAddrCity]").val($(this).find("option:selected").html());
              return $("#area_3").getArea(this.value);
            }
          });
      $("#area_3").change(function() {
        $("input[name=spouseCompanyAddrCounty]").val($(this).find("option:selected").html());
      });
      $("#basicInfo").values($.extend(res.data, {
        id: args['customerId']
      }));

	  $("select[name='cardType']").trigger("change");
      $("select[name='housingStatus']").trigger("change");
      return $("#marriage").change(function() {
        if (this.value !== "1") {
          return $("#spouseInfo").hide();
        } else {
          return $("#spouseInfo").show();
        }
      }).trigger("change");
    }
  });
  $("#addRelationUser_4").click(function() {
    return $("#addRelationUser").modal("show");
  });
  $("#relationUserAdd").click(function() {
	  if($("#addRelationPresion").valid()){ 
		var o, url;
		o = $("#addRelationPresion").values();
		if (o.id) {
		  url = interUrl.gr.customerRelationEdit;
		} else {
		  url = interUrl.gr.customerRelationAdd;
		}
		return comn.ajax({
		  url: url,
		  data: $.extend(o, {
			customerId: args["customerId"]
		  }),
		  success: function(res) {
			if (o.id) {
				$("#table_4").bootstrapTable('refresh');
			}else{
				$("#table_4").bootstrapTable('insertRow', {index: 0, row: res.data}); 
			}
			tip({
			  content: "添加成功!!!"
			});
			return $("#addRelationUser").modal("hide");
		  }
		});
	  }
  });
  return $("#save").click(function() {
    if ($("#basicInfo").find("form").valid()) {
      return comn.ajax({
        url: interUrl.gr.update,
        data: $.extend($("#basicInfo").find("form").values(), {
          customerId: args["customerId"]
        }),
        success: function(res) {
			comn.closeTab();
        }
      });
    }
  });
  
});

role = function(value, row, index) {
  var o, ref;
  return (ref = ((function() {
    var i, len, ref1, results;
    if (row.roleList != null) {
      ref1 = row.roleList;
      results = [];
      for (i = 0, len = ref1.length; i < len; i++) {
        o = ref1[i];
        results.push(o.name);
      }
      return results;
    }
  })())) != null ? ref.join("") : void 0;
};

$(function () {
	
	//添加暂存按钮
	$("#tempSave").click(function() {
			var value_mobile = $("input[name=mobile]").val();
			var value_homePhone = $("input[name=homePhone]").val();
			var value_workPhone = $("input[name=workPhone]").val()
			if (value_mobile) {
					if (!$("input[name=mobile]").valid()) {
							return false;
					};
			}
			if (value_homePhone) {
					if (!$("input[name=homePhone]").valid()) {
							return false;
					};
			}
			
			if (value_workPhone) {
					if (!$("input[name=workPhone]").valid()) {
							return false;
					};
			}
      comn.ajax({
	        url: interUrl.gr.update,
	        data: $.extend($("#basicInfo").find("form").values(), {
	          	customerId: args["customerId"],
	          	isTempStorage : true
	        }),
	        success: function(res) {
	        		tip({content : "客户信息暂存成功"})
	        }
      });
  });
  
  $("select[name='cardType']").change(function(){
	  if(this.value == "1"){
		  $(this).parents("form").find("input[name='cardNo']").eq(0).addClass("idCard");
		  //解析身份证
		  $("input[name='cardNo']").unbind("keyup").on("keyup" ,function(event){
			  var partten = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			  if(partten.test(this.value)){ getInfo(this.value); }
		  }).trigger("keyup");
	  }else{
		  $("input[name='cardNo']").unbind("keyup");
		  $("#basicInfo").find("input[name='age']").val("");
		  $("#basicInfo").find("input[name='birthday']").val("");
		  $(this).parents("form").find("input[name='cardNo']").eq(0).removeClass("idCard");
	  } 
  })
});
//职务更变
$(document).on("change", "#post", function () {
  $("#postName").val($(this).find("option:selected").text());
});
//职业更变
$(document).on("change", "#profession_Code", function () {
  $("#professionName").val($(this).find("option:selected").text());
});
//单位经济性质更变
$(document).on("change", "#workNatureCode", function () {
  $("#workNature").val($(this).find("option:selected").text());
});