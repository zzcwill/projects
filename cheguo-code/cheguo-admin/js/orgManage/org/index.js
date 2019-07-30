var args, zTreeOnClick,dataLoad_1,tableEvent_1, g_isModify = false;

jQuery.browser = {};

(function() {
  jQuery.browser.msie = false;
  jQuery.browser.version = 0;
  if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
    jQuery.browser.msie = true;
    return jQuery.browser.version = RegExp.$1;
  }
})();

args = comn.getArgs();
	
current_node = null;

zTreeOnClick = function(event, treeId, treeNod) {
	current_node = treeNod;
	$("#orgName").html(current_node.name);
	$("#syncButton").hide();
	if (current_node.type == 'BRANCH_COMPANY') {
        $("#setExhibition, #setChannelDealer").removeClass("hide"); //分公司： 显示渠道商关联和展业区域设置
		if(current_node.state != 1){
			$("#syncButton").show();
		}
	} else {
        $("#setExhibition, #setChannelDealer").addClass("hide");
    }
	openOrg();	
};
var channelArr = [];
openOrg = function(){
	var _callback;
	switch(current_node.type){
	case "HEAD_COMPANY":
	case "BRANCH_COMPANY":	
		_callback = function(res){
			$(".userInfo").hide();
			$(".departInfo").hide();
			$(".orgInfo").show();
			$("#allFinancial").html();
			$("#allBank").html();
			$("#allBusi").html();
			$("#allInsurance").html();
			var _html = "";
	    	if(res.data.insuranceInfos){
	    		for (j = 0, len = res.data.insuranceInfos.length; j < len; j++) {
	    			
		    		_html += "<span vid='"+res.data.insuranceInfos[j].id+"'>"+res.data.insuranceInfos[j].insuranceCompanyName +"</span>&nbsp;&nbsp;";
				}
				$("#allInsurance").html(_html);
	    	}
	    	_html = "";
	    	if(res.data.bankInfos){
	    		for (j = 0, len = res.data.bankInfos.length; j < len; j++) {
		    		_html += "<span bid='"+res.data.bankInfos[j].id +"'>"+res.data.bankInfos[j].bankName+"</span>" +"&nbsp;&nbsp;";
				}
				$("#allBank").html(_html);
	    	}
			channelArr = [];
			if (res.data.companyChannelRs) {
				var o = res.data.companyChannelRs;
				for (var j = 0; j < o.length; j++) {
					channelArr.push(o[j].channelId);
				}
			}
			var _financial = "";
			if (res.data.orgInfos) {
				var _el = res.data.orgInfos;
				for (var h = 0; h < _el.length; h++) {
                    _financial += "<span vid='"+_el[h].id+"'>"+_el[h].bankName +"</span>&nbsp;&nbsp;";
				}
				$("#allFinancial").html(_financial)
			}
		};
		$("#accountBox").show();
		$("#table_account").bootstrapTable('refresh');
		break;
	case "DEPARTMENT":
		_callback = function(res){
			$(".userInfo").show();
			$(".orgInfo").hide();
			$(".departInfo").show();
			$("#table").bootstrapTable('load', {
		        'total': res.totalItem,
		        rows: res.data.users
		      });
			$("#accountBox").hide();
		};
		break;
	case "BUSINESS_GROUP":
		_callback = function(res){
			$(".userInfo").show();
			$(".departInfo").hide();
			$(".orgInfo").hide();
			$("#table").bootstrapTable('load', {
		        'total': res.totalItem,
		        rows: res.data.users
		      });
			$("#accountBox").hide();
		}
	}

	comn.ajax({
	    url: interUrl.org.get,
	    data: {orgId:current_node.id},
	    success: function(res) {
	    	//$("#orgForm").values(current_node);
	    	$("#orgForm").values(res.data.companyDetail);
	    	if(current_node.getParentNode())
	    		$("#orgForm").find("#parentOrg").val(current_node.getParentNode().name);
	    	else
	    		$("#orgForm").find("#parentOrg").val("");
	    	setButtonStatus();
            if (current_node.type === "HEAD_COMPANY" || current_node.type === "BRANCH_COMPANY") {
                $("#orgForm .isCompany, #isOpenAccount").removeClass("hide");
                if (res.data.companyDetail.openAccountStatus && res.data.companyDetail.openAccountStatus === 1) {
                    $("#getCoStatus").removeClass("isOpenAccountState").addClass("hide");
                } else {
                    $("#getCoStatus").addClass("isOpenAccountState");
                }
            } else {
                $("#orgForm .isCompany, #isOpenAccount").addClass("hide");
            }
	    	if(_callback)_callback(res);
	    }
	  });
	
	/*if(current_node.getParentNode())
		$("#orgForm").find("#parentOrg").val(current_node.getParentNode().name);
	else
		$("#orgForm").find("#parentOrg").val("");*/
};
$(document).on("click", "#getCoStatus", function(){
    if($("#orgForm").valid()==false) return;
	comn.ajax({
		url: interUrl.org.openEcontractAccount,
		data: $("#orgForm").values(),
		success: function(res) {
			tip({content: res.message});
			$("#orgForm").values(res.data);
			if (res.data.openAccountStatus && res.data.openAccountStatus === 1) {
				$("#getCoStatus").removeClass("isOpenAccountState");
			} else {
				$("#getCoStatus").addClass("isOpenAccountState");
			}
		}

	})
})

openTree = function(){
	comn.ajax({
	    url: interUrl.org.organizationAllDir,
	    success: function(res) {
	      var treeObj;
	      treeObj = $.fn.zTree.init($("#tree"), {
	        showLine: true,
	        expand: true,
	        callback: {
	          onClick: zTreeOnClick
	        },
	        data: {
	          key: {
	            name: "name"
	          },
	          simpleData: {
	            enable: true,
	            idKey: "id",
	            pIdKey: "parentId",
	            state:"state",
	            type:"type",
	            rootPId: 0
	          }
	        },
	        view: {
	    		addDiyDom: addDiyDom
	    	},
	        check : {
	        	  enable:true
	        }
	      }, res.data);
	      var node = treeObj.getNodes()[0];
	      if(node){
		      treeObj.selectNode(node);
		      zTreeOnClick(null, null, node);
		  }
	      return treeObj.expandAll(true);
	    }
	  });
};
addDiyDom = function(treeId,treeNode) {
	if (treeNode.type != 'BRANCH_COMPANY') return;
	var btn = $("#diyBtn_"+treeNode.id);
	if (btn.length>0) return;
	var str = (treeNode.state == 0) ? "<span id='diyBtn_" + treeNode.id + "' style='color:red;'>" + "[同步失败]" +"</span>"
			: "<span id='diyBtn_" + treeNode.id + "' style='color:green;'>" + "[同步成功]" +"</span>";
	$("#" + treeNode.tId + "_a").append(str);
	btn.bind("click", function(){alert("diy Button for " + treeNode.name);});
};

saveOrg = function(_form, _callback){
	var _data = _form.values();
	var _url = _data.id?interUrl.org.update:interUrl.org.add;
    return comn.ajax({
      url: _url,
      data: _data,
      success: function(res) {
    	if(res.code==10000){
    		if(_callback)_callback();
	        openTree();
	        g_isModify = false;
	        setButtonStatus();
    	}else{
    		tip({content: res.message});
    	}
      }
    });
};
syncState = function(){
	comn.ajax({
	      url: "organization/updateSyncer",
	      data: {orgId:current_node.id},
	      success: function(res) {
	    	if(res.code==10000){
		        openTree();
		        g_isModify = false;
		        setButtonStatus();
	    		$("#syncButton").hide();
	    		tip({content: res.message?res.message:"同步成功"});
	    	}else{
	    		tip({content: res.message});
	    	}
	      }
	    });
};
setButtonStatus = function(){
	var span = $('#modify').find("span:last");
	  if(g_isModify==true){
		  span.html("&nbsp;取消&nbsp;");
		  $("#orgForm").find(":input").attr("disabled",false);
		  $("#orgForm").find("#parentOrg").attr("disabled",true);
		  $("#orgForm").find("#selectType").attr("disabled",true);
		  $("#orgForm").find("#orgCode").attr("readonly",true);
		  $("#openAccountStatus").attr("disabled", true)
		  $("#orgForm").find("#save").show();
		  $(".isOpenAccountState").removeClass("hide");
	  }else{
		  span.html("&nbsp;修改&nbsp;");
		  $("#orgForm").find(":input").not(":button").attr("disabled",true);
	      $("#orgForm").find("#save").hide();
		  $(".isOpenAccountState").addClass("hide");
	  }
};

//新增账户
$("#saveAccount").click(function () {
    var companyId = current_node.id;
    if ($("#addAccountForm").valid() == true) {
        var data = $("#addAccountForm").values();
        return comn.ajax({
            url: interUrl.org["accountAdd"],
            data: $.extend(data, {companyId: companyId}),
            success: function (res) {
                $("#addAccountModal").modal("hide");
                tip({content: res.message || "新增账户成功"});
                $("#table_account").bootstrapTable('refresh');
            }
        });
    }
});
$("#openingBankSelect").change(function(){
	$("#openBankName").val($(this).find('option:selected').text())
});

$("#setAccount").click(function() {
	  if(!current_node){
		  tip({content: "请选择机构!"}); 
		  return;
	  }
	  $("#accountId").val('');
	  $("#addAccountModal .modal-title").html("添加账户");
	  $("#addAccountModal").modal("show");
	  
//	  comn.ajax({
//			url : "company/account/selectList",
//			success : function(res) {
//				$("#openingBankSelect").empty();
//				if(res.data.length > 0){
//					//$("#openingBankSelect").val($(this).find('option:selected').text());
//					var opts = "<option value='' selected>--请选择--</option>";
//					for(var i = 0; i < res.data.length; i++){
//						var content = res.data[i];
//						opts += "<option value='"+content.bankCode+"'>"+content.bankName+"</option>"
//					}
//					$("#openingBankSelect").append(opts);
//				}
//			}
//		});
});
handle_1 = function (value, row, index) {
	var btnModify = "<li><a class='modify'>修改</a></li>";
    var btnStatus = "<li><a class='stop'>" + (row["status"] == "1" ? "停用" : "启用") + "</a></li>";
    return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>",btnModify, btnStatus, "<li><a class='delete'>删除</a></li>", "</ul>", "</div>"].join("");
};
//基本信息-账户信息
dataLoad_1 = function(params) {
	if(!current_node){
		return params.complete();
	  }
	var companyId = current_node.id;
	if (companyId) {
		comn.ajax({
			url : interUrl.mockList || interUrl.org.accountList,
			data : {
				companyId : companyId
			},
			success : function(res) {
				params.success({
					'total' : res.totalItem,
					rows : res.data
				});
				return params.complete();
			}
		});
	} else {
		return params.complete();
	}
};

tableEvent_1 = {
		"click .modify": function(e, a, item, index) {
//	        return comn.addTab({
//	            title:"车商修改",
//	            href:"./Modal/carDealerManage/carDealer/carDealer.html?dealerId="+item['id']+"&type=1&isManager="+a
//	        });
			$("#addAccountModal .modal-title").html("修改账户");
			$("#addAccountModal").modal("show");
			$("#addAccountModal .form-horizontal").values(item);
			 
			 
	    },
	    "click .stop": function (e, a, item, index) {
	        $("#sureModal").modal("show");
	        $("#sureModal").find(".tipText").text("确定要" + (item['status'] == 0 ? "启用" : "停用") + "账户吗?");
	        $("#sureOption").unbind("click").click(function(){
	            comn.ajax({
	                url: interUrl.org.accountStop,
	                data: {
	                    accountId: item['id'],
	                    status: (item['status'] == 0 ? 1 : 0)
	                },
	                success: function (res) {
	                    $("#sureModal").modal("hide");
	                    tip({content: (item['status'] == 0 ? "启用" : "停用") + "成功!"});
	                    return $("#table_account").bootstrapTable('refresh');
	                }
	            });
	        });
	    },
	    "click .delete": function (e, a, item, index) {
	        $("#sureModal").modal("show");
	        $("#sureModal").find(".tipText").text("确定要删除账户吗?");
	        $("#sureOption").unbind("click").click(function(){
	            return comn.ajax({
	                url: interUrl.org["accountDel"],
	                data: {
	                    accountId: item['id']
	                },
	                success: function (res) {
	                    $("#sureModal").modal("hide");
	                    tip({
	                        content: "删除成功!"
	                    });
	                    $("#table_account").bootstrapTable('refresh');
	                }
	            });
	        })
	    }
	};


$(function() {
	comn.ajax({
		url : "company/account/selectList",
		success : function(res) {
			$("#openingBankSelect").empty();
			if(res.data.length > 0){
				//$("#openingBankSelect").val($(this).find('option:selected').text());
				var opts = "<option value='' selected>--请选择--</option>";
				for(var i = 0; i < res.data.length; i++){
					var content = res.data[i];
					opts += "<option value='"+content.bankCode+"'>"+content.bankName+"</option>"
				}
				$("#openingBankSelect").append(opts);
			}
		}
	});

	var search;
	$(document).on("change", "#openingBankSelect", function () {
		clearTimeout(search);
		$(".cashBank,#getCashBank").addClass("hide");

		var $subBankName=$("input[name=subBankName]");
		var bankName=$(this).find("option:selected").text();
		var bankCode=$(this).find("option:selected").val();
		$("input[name=openBankName]").val(bankName);
		$subBankName.on("focus",function(){
			$(".cashBank,#getCashBank").removeClass("hide");
			//初始化查询列表
			$(".cashBank").val("");
			$("#getCashBank").html("");
		});
		$(".cashBank").bind('input propertychange',function(){
			//条件查询(输入长度大于2开始查询)
			if($(this).val().trim().length>1){
				clearTimeout(search);
				$("#getCashBank").removeClass('hide');
				var _this=this;
				search=setTimeout(function(){
					console.log(3);
					comn.ajax({
						url:'cooperation/cash/bank',
						data:{bankType:bankCode,bankName:$(_this).val().trim()},
						success:function(res) {
							$("#getCashBank").empty();
							var o;
							if (res.data.length > 0) {
								var j,len,ref,results;
								ref=res.data;
								results=[];
								for(j = 0,len = ref.length;j < len;j++){
									o=ref[j];
									results.push("<li><a href='javascript:;' data-code='"+o.id+"'>"+o.bankName+"</a></li>");
								}
								$("#getCashBank").append(results.join(""));
							}
						}
					})
				},1000);
				$("#getCashBank").on('click','a',function(){
					$(".cashBank,#getCashBank").addClass('hide');
					$subBankName.val($(this).html());
					$(".cashBank").val($(this).attr('data-code'));
				})
			}
		})
	});
	$("#table").bootstrapTable('resetView', {height:500});
	$("#province_1").getProvince().change(function() {
		var v = this.value || $(this).attr('defaultValue');
	    if (v) {
	    	$("#addrProvinceName_1").val($(this).find('option:selected').text());
	      $("#area_1").val("");
	      $("#city_1").getCity(v).change(function() {
	          if (this.value || $(this).attr('defaultValue')) {
	        	  $("#addrCityName_1").val($(this).find('option:selected').text());
	        	  return $("#area_1").getArea(this.value || $(this).attr('defaultValue'));
	          }
	      });
	    }
	  });
	$("#area_1").change(function(){
        $("#addrAreaName_1").val($(this).find('option:selected').text());
    });
	$("#province_2").getProvince().change(function() {
	    if (this.value) {
	    	$("#addrProvinceName_2").val($(this).find('option:selected').text());
	      $("#area_2").val("");
	      return $("#city_2").getCity(this.value).change(function() {
	        if (this.value) {
	        	$("#addrCityName_2").val($(this).find('option:selected').text());
	          return $("#area_2").getArea(this.value);
	        }
	      });
	    }
	  });
	$("#area_2").change(function(){
        $("#addrAreaName_2").val($(this).find('option:selected').text());
    });
	$(".orgTypeSelect").change(function() {
		if ($(this).val() === "HEAD_COMPANY" || $(this).val() === "BRANCH_COMPANY") {
			$("#addOrgForm .isCompany").removeClass("hide");
		} else {
            $("#addOrgForm .isCompany").addClass("hide");
		}
		var form = $(this).parents("form");
		switch(this.value){
			case "HEAD_COMPANY":
			case "BRANCH_COMPANY":	
				form.find(".departInfo").hide();
				form.find(".orgInfo").show();
				break;
			case "DEPARTMENT":
				form.find(".orgInfo").hide();
				form.find(".departInfo").show();
				break;
			case "BUSINESS_GROUP":
				form.find(".orgInfo,.departInfo").hide();
		}
	});
  var validate = {
	      rules: {
	    	  telephone: {phoneMix: true},
	          fax: {telephone: true}
	      },
	      messages: {
	    	  telephone: {phoneMix: "公司电话格式不正确"},
	          fax: {telephone: "传真格式不正确"}
	      }
	  };
  $("#addOrgForm").validate(validate);
  $("#orgForm").validate(validate);
  $("#add").click(function() {
	  $("#addOrg").modal("show");
	  if(current_node){
		  $("#addOrg").find("#parentId").val(current_node.id);
		  $("#addOrg").find("#parentOrg").val(current_node.name);
	  }
  });
  $("#saveOrg").click(function() {
	  //if($("#addOrgForm").valid()==false)return;
	 saveOrg($("#addOrgForm"), function(){$("#addOrg").modal("hide");});
 });
  $("#modify").click(function(){
	  g_isModify = g_isModify?false:true;
	  setButtonStatus();
  });
  $("#syncButton").click(function(){
	 syncState(); 
  });
  $("#save").click(function(){
	  if($("#orgForm").valid()==false)return;
	  saveOrg($("#orgForm"));
  });
  $("#stop").click(function() {
	   if(!current_node){
		   tip({content: "请选择机构!"});
		   return;
	   }
	    return comn.ajax({
	        url: interUrl.org["setStatus"],
	        data: {
	        	dealerId: current_node.id,
	        	status: (current_node['status']==0?1:0)
	        },
	        success: function(res) {
	        	tip({content: "操作成功!"});
	        	return $("#btn-search").trigger("click");
	        }
	      });
  });
  $("#del").click(function() {
	  if(!current_node){
		   tip({content: "请选择机构!"});
		   return;
	  }
	  $("#sure").modal("show");
	  return $("#OK").unbind("click").on("click", function() {
	      return comn.ajax({
	        url: interUrl.org["delete"],
	        data: {
	        	orgId: current_node.id
	        },
	        success: function(res) {
	          tip({
	            content: "删除成功!"
	          });
	          $("#sure").modal("hide");
	          return $("#btn-search").trigger("click");
	        }
	      });
	    });
  });
  $("#setBank").click(function() {
	  if(!current_node){
		  tip({content: "请选择机构!"}); 
		  return;
	  }
	  $("#bank").modal("show");
	  
	  var bankIds = [];
	  $("#allBank").find("span").each(function(){
		  bankIds.push($(this).attr("bid"));
	  });
	  
	  comn.ajax({
	        url: interUrl.common["bankList"],
	        success: function(res) {
	        	var html = "";
	        	ref = res.data;
	            for (j = 0, len = ref.length; j < len; j++) {
	              var item = ref[j];
	              
	              if(bankIds.length > 0){
	            	  var m = 0;
	            	  for(; m < bankIds.length; m++){
		            	  if(bankIds[m] == item.id){
		            		  html += ["<tr>", "<td><input type='checkbox' value="+item.id+" checked=true>", item.bankName, "</td>", "</tr>"].join("");
		            		  break;
		            	  }
		              }
	            	  if(m == bankIds.length)
	            		  html += ["<tr>", "<td><input type='checkbox' value="+item.id+">", item.bankName, "</td>", "</tr>"].join("");
	              }else{
	            	  html += ["<tr>", "<td><input type='checkbox' value="+item.id+">", item.bankName, "</td>", "</tr>"].join("");
	              }
	            }
	            
	    	  return $("#bank tbody").html(html);
	        }
	      });
	  $("#selBank").unbind("click").click(function(){
		  var ids = "";
		  $("#bank tbody").find("input[type='checkbox']:checked").each(function(){
			  ids += "," + this.value;
		  });
		  if(ids.length>0)ids = ids.substr(1);
		  comn.ajax({
		        url: interUrl.org["setBank"],
		        data: {companyId:current_node.id,bankIds:ids},
		        success: function(res) {
		        	//TODO
		        	openOrg();
		        	$("#bank").modal("hide");
		        }
		      });
	  });
  });
    
    $("#searchFinancialBtn, #setFinancial").click(function() {
        if(!current_node){
            tip({content: "请选择机构!"});
            return;
        }
        $("#financial").modal("show");
        
        var allFinancialIds = [];
        $("#allFinancial").find("span").each(function(){
            allFinancialIds.push($(this).attr("vid"));
        });
        
        comn.ajax({
            url: interUrl.common["financial"],
			data: {
                bankName: $("#financial input[name=bankName]").val()
			},
            success: function(res) {
                var html = "";
                ref = res.data;
                for (j = 0, len = ref.length; j < len; j++) {
                    var item = ref[j];
                    
                    if(allFinancialIds.length > 0){
                        var m = 0;
                        for(; m < allFinancialIds.length; m++){
                            if(allFinancialIds[m] == item.id){
                                html += ["<tr>", "<td><input type='checkbox' value="+item.id+" checked=true>", item.bankName, "</td>", "</tr>"].join("");
                                break;
                            }
                        }
                        if(m == allFinancialIds.length)
                            html += ["<tr>", "<td><input type='checkbox' value="+item.id+">", item.bankName, "</td>", "</tr>"].join("");
                    }else{
                        html += ["<tr>", "<td><input type='checkbox' value="+item.id+">", item.bankName, "</td>", "</tr>"].join("");
                    }
                }
                
                return $("#financial tbody").html(html);
            }
        });
        $("#setFinanical").unbind("click").click(function(){
            var ids = "";
            $("#financial tbody").find("input[type='checkbox']:checked").each(function(){
                ids += "," + this.value;
            });
            if(ids.length>0)ids = ids.substr(1);
            comn.ajax({
                url: interUrl.org["setFinancial"],
                data: {companyId:current_node.id,financeOrgIds:ids},
                success: function(res) {
                    //TODO
                    openOrg();
                    $("#financial").modal("hide");
                }
            });
        });
    });
  $("#setBusi").click(function() {
	  $("#busi").modal("show");
  });
  $("#setInsurance").click(function() {
	  if(!current_node){
		  tip({content: "请选择机构!"}); 
		  return;
	  }
	  $("#insurance").modal("show");
	  var insuIds = [];
	  $("#allInsurance").find("span").each(function(){
		  insuIds.push($(this).attr("vid"));
	  });
	  
	  comn.ajax({
	        url: interUrl.org["insuranceList"],
	        data:{orgId:current_node.id},
	        success: function(res) {
	        	var html = "";
	        	ref = res.data.insuranceInfos;
	        	refType = res.data.typeSelected;
	            for (j = 0, len = ref.length; j < len; j++) {
	              var item = ref[j];
	              var sels = "<ul>";
	              for(k = 0; k<item.insuranceTypes.length;k++){
	            	  var n = 0;
	            	  for(; n < refType.length; n++){
	            		  var itemType = refType[n];
	            		  if(itemType.id == item.insuranceTypes[k].id){
	            			  sels += "<li><input type='checkbox' value='"+item.insuranceTypes[k].id+"' checked=true>"+item.insuranceTypes[k].insuranceName;+"</li>";
	            			  break;
	            		  }
	            	  }
	            	  if(n == refType.length)
	            	  sels += "<li><input type='checkbox' value='"+item.insuranceTypes[k].id+"'>"+item.insuranceTypes[k].insuranceName;+"</li>"
	              
	              }
	              sels += "</ul>";
	              
	              if(insuIds.length > 0){
	            	  var m = 0;
	            	  for(; m < insuIds.length; m++){
		            	  if(insuIds[m] == item.id){
		            		  html += ["<tr>", "<td><input name='insurances' type='checkbox' value="+item.id+" checked=true>", item.insuranceCompanyName, "</td>", "<td>", sels, "</td>", "</tr>"].join("");
		            		  break;
		            	  }
		              }
	            	  if(m == insuIds.length)
	            	  html += ["<tr>", "<td><input name='insurances' type='checkbox' value="+item.id+">", item.insuranceCompanyName, "</td>", "<td>", sels, "</td>", "</tr>"].join("");
	              }else{
	            	  html += ["<tr>", "<td><input name='insurances' type='checkbox' value="+item.id+">", item.insuranceCompanyName, "</td>", "<td>", sels, "</td>", "</tr>"].join("");
	              }
	              
	            }
	            
	    	  return $("#insurance tbody").html(html);
	        }
	      });
	  $("#selInsurance").unbind("click").click(function(){
		  var ids = "";
		  var i = 0, _data = {compId:current_node.id};
		  $("#insurance tbody").find("input[name='insurances']:checked").each(function(){
			  _data["insuranceCompanyInfo["+i+"].id"] = $(this).val();
			  var j = 0;
			  $(this).parent().next().find(":input[type='checkbox']:checked").each(function(){
				  _data["insuranceCompanyInfo["+i+"].insuranceTypes["+j+"].id"] = $(this).val();
				  j++;
			  });
			  i++;
		  });
		  comn.ajax({
		        url: interUrl.org["setInsurance"],
		        data: _data,
		        success: function(res) {
		        	openOrg();
		        	$("#insurance").modal("hide");
		        }
		      });
	  });
  });
  
  
  //------------------------

  
  
  
  
  openTree();
});
$("#setExhibition").click(function(){
    return comn.addTab({
        title: "展业区域设置",
        href:"./Modal/orgManage/exhibition/index.html?companyName="+current_node.name +"&companyId="+current_node.id
    });
});
$("#setChannelDealer").click(function(){
	if(!current_node){
		tip({content: "请选择机构!"});
		return;
	}
	$("#channelDealerLIst").modal("show");
	comn.ajax({
		url: interUrl.org.channelDealerList,
		success: function(res) {
			var html = "", ref;
			ref = res.data;
			for (var j = 0, len = ref.length; j < len; j++) {
				var item = ref[j];

				if(channelArr.length > 0){
					var m = 0;
					for(; m < channelArr.length; m++){
						if(channelArr[m] == item.id){
							html += ["<tr>", "<td><input type='checkbox' value="+item.id+" checked=true>", item.name, "</td>", "</tr>"].join("");
							break;
						}
					}
					if(m == channelArr.length)
						html += ["<tr>", "<td><input type='checkbox' value="+item.id+">", item.name, "</td>", "</tr>"].join("");
				}else{
					html += ["<tr>", "<td><input type='checkbox' value="+item.id+">", item.name, "</td>", "</tr>"].join("");
				}
			}

			return $("#channelDealerLIst tbody").html(html);
		}
	});
	$("#channelDealerBtn").unbind("click").click(function(){
		var ids = "";
		$("#channelDealerLIst tbody").find("input[type='checkbox']:checked").each(function(){
			ids += "," + this.value;
		});
		if(ids.length>0){
			ids = ids.substr(1);
		}
		comn.ajax({
			url: interUrl.org.channelDealerUpdate,
			data: {companyId:current_node.id,channelIds:ids},
			success: function(res) {
				//TODO
				openOrg();
				$("#channelDealerLIst").modal("hide");
			}
		});
	});
})
$("#xxxxxx").click(function() {
//	alert("1243");
	  if(!current_node){
		  tip({content: "请选择机构!"}); 
		  return;
	  }
	  $("#bank").modal("show");
	  var bankIds = [];
	  $("#allBank").find("span").each(function(){
		  bankIds.push($(this).attr("bid"));
	  });
	  var bankName=$('#searchBankName').val();
	  comn.ajax({
	        url: interUrl.common["bankList"],
	        data: {
	        	bankName : bankName
	        },
	        success: function(res) {
	        	var html = "";
	        	ref = res.data;
	        	for (j = 0, len = ref.length; j < len; j++) {
		              var item = ref[j];
		              
		              if(bankIds.length > 0){
		            	  var m = 0;
		            	  for(; m < bankIds.length; m++){
			            	  if(bankIds[m] == item.id){
			            		  html += ["<tr>", "<td><input type='checkbox' value="+item.id+" checked=true>", item.bankName, "</td>", "</tr>"].join("");
			            		  break;
			            	  }
			              }
		            	  if(m == bankIds.length)
		            		  html += ["<tr>", "<td><input type='checkbox' value="+item.id+">", item.bankName, "</td>", "</tr>"].join("");
		              }else{
		            	  html += ["<tr>", "<td><input type='checkbox' value="+item.id+">", item.bankName, "</td>", "</tr>"].join("");
		              }
		            }
	    	  return $("#bank tbody").html(html);
	        }
	      });
	  $("#selBank").unbind("click").click(function(){
		  var ids = "";
		  $("#bank tbody").find("input[type='checkbox']:checked").each(function(){
			  ids += "," + this.value;
		  });
		  if(ids.length>0)ids = ids.substr(1);
		  comn.ajax({
		        url: interUrl.org["setBank"],
		        data: {companyId:current_node.id,bankIds:ids},
		        success: function(res) {
		        	//TODO
		        	openOrg();
		        	$("#bank").modal("hide");
		        }
		      });
	  });
});

