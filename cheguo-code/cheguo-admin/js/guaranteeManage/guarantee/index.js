var args, dataLoad_1, tableEvent, handle, statusFormat, zTreeOnClick, g_isModify = false;

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
dataLoad_1 = function(params) {
	var _orgId = $("#orgId").val();
	if (_orgId != "") {
		return comn.ajax({
			url : interUrl.mockList || interUrl.guarantee.accountList,
			data : {
				guaranteeId : _orgId
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

bankFormatter = function(value) {
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
		break;
	case "RCC":
		return "农村信用合作社";
		break;
	case "BCM":
		return "交通银行";
		break;
	case "CCBZX":
		return "中信银行";
		break;
	break;
}
;
};

tableEvent = {
	"click .stop" : function(e, a, item, index) {
		return comn.ajax({
			url : interUrl.guarantee["accountSetStatus"],
			data : {
				accountId : item['id'],
				status : item["status"] == 1 ? 0 : 1
			},
			success : function(res) {
				tip({
					content : (item["status"] == 1 ? "停用" : "启用") + "成功!"
				});
				return $("#btn-search").trigger("click");
			}
		});
	},
	"click .delete" : function(e, a, item, index) {
		$("#sure").modal("show");
		return $("#OK").unbind("click").on("click", function() {
			return comn.ajax({
				url : interUrl.guarantee["accountDel"],
				data : {
					accountId : item['id']
				},
				success : function(res) {
					tip({
						content : "删除成功!"
					});
					$("#sure").modal("hide");
					return $("#btn-search").trigger("click");
				}
			});
		});
	}
};

handle = function(value, row, index) {
	var btnStatus = "<li><a class='stop'>"
			+ (row["status"] == "1" ? "停用" : "启用") + "</a></li>";

	return [
			"<div class='btn-group btn-group-xs'>",
			"<button type='button' class='btn btn-primary'>操作</button>",
			"<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>",
			"<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>",
			"</button>", "<ul class='dropdown-menu' role='menu'>", btnStatus,
			"<li><a class='delete'>删除</a></li>", "</ul>", "</div>" ].join("");
};
statusFormat = function(value, row, index) {
	return value == 0 ? "停用" : "启用";
};

current_node = null;

zTreeOnClick = function(event, treeId, treeNod) {
	current_node = treeNod;
	$("#guaranteeName").html(current_node.organizationName);

	openGuarantee();
};

openGuarantee = function() {
	$("#allBank, #allFinancial").html("");
	$("#orgForm").values(current_node);
	comn.ajax({
		url : interUrl.guarantee.get,
		data : {
			guaranteeId : current_node.id
		},
		success : function(res) {
			$("#orgForm").values(res.data.guaranteeInfo);
			setButtonStatus();
			var _html = "";
			if (res.data.bankInfos) {
				for (j = 0, len = res.data.bankInfos.length; j < len; j++) {
					_html += res.data.bankInfos[j].bankName + "&nbsp;&nbsp;";
				}
				;
				$("#allBank").html(_html);
			}
            var _financial = "";
            if (res.data.orgInfos) {
                var _el = res.data.orgInfos;
                for (var h = 0; h < _el.length; h++) {
                    _financial += "<span vid='"+_el[h].id+"'>"+_el[h].bankName +"</span>&nbsp;&nbsp;";
                }
                $("#allFinancial").html(_financial)
            }
		}
	});

	$("#table").bootstrapTable('refresh', {
		url : interUrl.mockList || interUrl.guarantee.accountList,
		data : {
			guaranteeId : current_node.id
		}
	});

	$("#stop .title").html(current_node['status'] == 0 ? "启用" : "停用");

	if (current_node.getParentNode()) {
		$("#orgForm").find("#parentOrgId").val(current_node.parentOrgId);
		$("#orgForm").find("#parentOrg").val(current_node.getParentNode().name);
	} else {
		$("#orgForm").find("#parentOrgId").val("");
		$("#orgForm").find("#parentOrg").val("");
	}
};

openTree = function() {
	comn.ajax({
		url : interUrl.guarantee.tree,
		success : function(res) {
			var treeObj;
			treeObj = $.fn.zTree.init($("#tree"), {
				showLine : true,
				expand : true,
				callback : {
					onClick : zTreeOnClick
				},
				data : {
					key : {
						name : "organizationName"
					},
					simpleData : {
						enable : true,
						idKey : "id",
						pIdKey : "parentOrgId",
						rootPId : 0
					}
				}
			}, res.data);

			/*
			 * var node = treeObj.getNodes()[0]; if(node){
			 * treeObj.selectNode(node); zTreeOnClick(null, null, node); }
			 */
			return treeObj.expandAll(true);
		}
	});
}

saveOrg = function(_form, _callback) {
	var _data = _form.values();
	var _url = _data.id ? interUrl.guarantee.update : interUrl.guarantee.add;
	return comn.ajax({
		url : _url,
		data : _data,
		success : function(res) {
			if (res.status == 10000) {
				if (_callback)
					_callback();
				openTree();
				g_isModify = false;
				setButtonStatus();
			} else {
				tip({
					content : res.message
				});
			}
		}
	});
}

setButtonStatus = function() {
	var span = $('#modify').find("span:last");
	if (g_isModify == true) {
		span.html("&nbsp;取消&nbsp;");
		$("#orgForm").find(":input").attr("disabled", false);
		$("#orgForm").find("#parentOrg").attr("disabled", true);
		$("#orgForm").find("#save").show();
	} else {
		span.html("&nbsp;修改&nbsp;");
		$("#orgForm").find(":input").not(":button").attr("disabled", true);
		$("#orgForm").find("#save").hide();
	}
}

$(function() {
	openTree();
	$("#table").bootstrapTable('resetView', {
		height : 400
	});
	$("#province_1")
			.getProvince()
			.change(
					function() {
						var v = this.value || $(this).attr('defaultValue');
						if (v) {
							$("#area_1").val("");
							return $("#city_1")
									.getCity(v)
									.unbind("change")
									.change(
											function() {
												if (this.value
														|| $(this).attr(
																'defaultValue')) {
													return $("#area_1")
															.getArea(
																	this.value
																			|| $(
																					this)
																					.attr(
																							'defaultValue'));
												}
											});

						}
					});
	$("#province_2").getProvince().change(
			function() {
				if (this.value) {
					$("#area_2").val("");
					return $("#city_2").getCity(this.value).unbind("change")
							.change(function() {
								if (this.value) {
									return $("#area_2").getArea(this.value);
								}
							});
				}
			});
	var validate = {
		rules : {
			companyPhone : {
				phoneMix : true
			},
			companyFax : {
				telephone : true
			}
		},
		messages : {
			companyPhone : {
				phoneMix : "公司电话格式不正确"
			},
			companyFax : {
				telephone : "传真格式不正确"
			}
		}
	};
	$("#addOrgForm").validate(validate);
	$("#orgForm").validate(validate);
	$("#add").click(function() {
		$("#addOrg").modal("show");
		if (current_node) {
			$("#addOrg").find("#parentOrgId").val(current_node.id);
			$("#addOrg").find("#parentOrg").val(current_node.organizationName);
		}
	});
	$("#saveOrg").click(function() {
		if ($("#addOrgForm").valid() == false)
			return;
		saveOrg($("#addOrgForm"), function() {
			$("#addOrg").modal("hide");
		});
	});
	$("#modify").click(function() {
		g_isModify = g_isModify ? false : true;
		setButtonStatus();
	});
	$("#save").click(function() {
		if ($("#orgForm").valid() == false)
			return;
		saveOrg($("#orgForm"));
	});
	$("#stop").click(function() {
		if (!current_node) {
			tip({
				content : "请选择担保主体!"
			});
			return

		}
		return comn.ajax({
			url : interUrl.guarantee["setStatus"],
			data : {
				guaranteeId : current_node.id,
				status : (current_node['status'] == 0 ? 1 : 0)
			},
			success : function(res) {
				tip({
					content : "操作成功!"
				});
				openTree();
			}
		});
	});
	$("#del").click(function() {
		if (!current_node) {
			tip({
				content : "请选择担保主体!"
			});
			return

		}
		$("#sure").modal("show");
		return $("#OK").unbind("click").on("click", function() {
			return comn.ajax({
				url : interUrl.guarantee["del"],
				data : {
					guaranteeId : current_node.id
				},
				success : function(res) {
					tip({
						content : "删除成功!"
					});
					$("#sure").modal("hide");
					openTree();
				}
			});
		});
	});
	$("#setBank").click(
			function() {
				if (!current_node) {
					tip({
						content : "请选择担保主体!"
					});
					return;
				}
				$("#bank").modal("show");
				comn.ajax({
					url : interUrl.common["bankList"],
					success : function(res) {
						var html = "";
						ref = res.data;
						for (j = 0, len = ref.length; j < len; j++) {
							var item = ref[j];
							if (current_node.id == item.guaranteeId) {
								html += [
										"<tr>",
										"<td><input type='checkbox' value="
												+ item.id + " checked=true>",
										item.bankName, "</td>", "</tr>" ]
										.join("");
							} else if (item.guaranteeId != null) {
								html += [
										"<tr>",
										"<td><input type='checkbox' value="
												+ item.id + " disabled=true>",
										item.bankName, "</td>", "</tr>" ]
										.join("");
							} else {
								html += [
										"<tr>",
										"<td><input type='checkbox' value="
												+ item.id + ">", item.bankName,
										"</td>", "</tr>" ].join("");
							}
						}
						return $("#bank tbody").html(html);
					}
				});
				$("#selBank").unbind("click").click(
						function() {
							var ids = "";
							$("#bank tbody").find(
									"input[type='checkbox']:checked").each(
									function() {
										ids += "," + this.value;
									});
							if (ids.length > 0)
								ids = ids.substr(1);
							comn.ajax({
								url : interUrl.guarantee["setBank"],
								data : {
									guaranteeId : current_node.id,
									bankIds : ids
								},
								success : function(res) {
									// TODO
									openGuarantee();
									$("#bank").modal("hide");
								}
							});
						});
			});
	$("#addAccountForm").validate();
	$("#addAccountBtn").click(function() {
		return $("#addAccount").modal("show");
	});
	$("#saveAccount").click(function() {
		if ($("#addAccountForm").valid() == false)
			return;
		var _orgId = $("#orgId").val();
		if (_orgId == "") {
			tip({
				content : "请先选择担保主体"
			});
			return;
		}
		var data;
		data = $("#addAccount").values();
		return comn.ajax({
			url : interUrl.guarantee.accountAdd,
			data : $.extend(data, {
				guaranteeId : _orgId
			}),
			success : function(res) {
				$("#addAccount").modal("hide");
				return $("#btn-search").trigger("click");
			}
		});
	});

});
$("#searchFinancialBtn, #setFinancial").click(function() {
	if ($(this).attr("id") === "setFinancial") {
        $("#financial input[name=bankName]").val("");
	}
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
            url: interUrl.guarantee["setFinancial"],
            data: {guaranteeId:current_node.id,bankIds:ids},
            success: function(res) {
                openGuarantee();
                $("#financial").modal("hide");
            }
        });
    });
});
$("#bankSearch").click(
		function() {
			if (!current_node) {
				tip({
					content : "请选择担保主体!"
				});
				return;
			}
			$("#bank").modal("show");
			var bankName = $('#searchBankName').val();
			comn.ajax({
				url : interUrl.common["bankList"],
				data : {
					bankName : bankName
				},
				success : function(res) {
					var html = "";
					ref = res.data;
					for (j = 0, len = ref.length; j < len; j++) {
						var item = ref[j];
						if (current_node.id == item.guaranteeId) {
							html += [
									"<tr>",
									"<td><input type='checkbox' value="
											+ item.id + " checked=true>",
									item.bankName, "</td>", "</tr>" ].join("");
						} else if (item.guaranteeId != null) {
							html += [
									"<tr>",
									"<td><input type='checkbox' value="
											+ item.id + " disabled=true>",
									item.bankName, "</td>", "</tr>" ].join("");
						} else {
							html += [
									"<tr>",
									"<td><input type='checkbox' value="
											+ item.id + ">", item.bankName,
									"</td>", "</tr>" ].join("");
						}
					}
					return $("#bank tbody").html(html);
				}
			});
			$("#selBank").unbind("click").click(
					function() {
						var ids = "";
						$("#bank tbody").find("input[type='checkbox']:checked")
								.each(function() {
									ids += "," + this.value;
								});
						if (ids.length > 0)
							ids = ids.substr(1);
						comn.ajax({
							url : interUrl.guarantee["setBank"],
							data : {
								guaranteeId : current_node.id,
								bankIds : ids
							},
							success : function(res) {
								// TODO
								openGuarantee();
								$("#bank").modal("hide");
							}
						});
					});
		});
