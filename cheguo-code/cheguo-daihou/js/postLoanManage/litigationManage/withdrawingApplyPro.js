var args, defendantList, data, dealerId, argsBopInfoId, projectId, opinionForm, isFirstNode, opinionForm_back, opinionForm_saveOnly, table_1, caseProcessInfo;
args = comn.getArgs();
data = {
	lawsuitId : args["lawsuitId"] || args["dealerId"]
	//loanApplyId : args["loanApplyId"]
}
dealerId = args['dealerId'];
argsBopInfoId = {bopInfoId: args['bopInfoId']};

if (args["typeOption"] === "submit") {
	$("#opinionForm").show();
	$("#btn-cancel-loan").removeClass("hide");
	$("#nolPros fieldset").attr("disabled", false);
	$(".page-header h3").html("发起撤诉申请");
} else if (args["typeOption"] === "preBack") {
	$("#opinionForm").show();
	$("#btn-loanReview-back").removeClass("hide").hide();
	$(".page-header h3").html("撤诉申请审核");
} else {
	$("#opinionForm").hide();
	$("#isHide").addClass("hide");
}

$(document).on("change", "#nolProsReason", function() {
	if ($(this).find("option:selected").html() == "其他理由") {
		$("#nolProsOtherReason").show();
		$("#nolProsOtherReason-value").addClass("required");
		$("#nolProsOtherReason .text-danger").html("*")
	} else {
		$("#nolProsOtherReason").hide();
		$("#nolProsOtherReason-value").removeClass("required");
		$("#nolProsOtherReason-value-error").removeClass("required");
	}
});
//基本信息
comn.ajax({
	url: interUrl.postLoan.caseProcessGet,
	data: {
		lawsuitId : data.lawsuitId
	},
	success: function(res) {
		projectId = res.data.projectId;
		$("#caseProcessList").values(res.data);
		//历史案件进程
		caseProcessInfo = function (params) {
			return tableData(params, {
				projectId : projectId
			}, interUrl.postLoan.historyCaseProcessList);
		}
		$("#historyCaseProcess").bootstrapTable('refresh', {url: "..."});
	}
});

//撤诉信息
comn.ajax({
	url: interUrl.postLoan.nolPros,
	data: {
		lawsuitId : data.lawsuitId
	},
	success: function(res) {
		$("#nolProsInput").val(res.data.id);
		if (res.data.nolProsOtherReason) {
			$("#nolProsOtherReason").show()
		}
		$("#nolPros").values(res.data);
	}
});

//添加案件进程记录
table_1 = function (params) {
	return tableData(params, {
		lawsuitId: data.lawsuitId
	}, interUrl.postLoan.caseProcessInfo);
};

tableEvent_caseProcessRecord = {
	"click .caseProcessDetail": function(e, a, item, index) {
		$("#caseProcessRecordDetail").modal("show");
	    $("#modalTitle").text("案件进程");
	    $("#lawsuitDesc").val(item.lawsuitDesc);
	},
	"click .caseProcessImg": function (e, a, item, index) {
		var len = item.processFiles.length;
		var processImg = [];
		for (i = 0; i < len; i++) {
			processImg.push(item.processFiles[i].processFile);
		}
		window.parent.switchImage(processImg, 0, 2);
	}
};

handle_caseProcessRecord = function(value, row, index) {
	var seeProcessImg = "";
	var lawsuitDesc = "";
	var isImg = row.processFiles.length;
	if (isImg) {
		seeProcessImg = "<li><a class='caseProcessImg'>查看附件</a></li>"
	} else {
		seeProcessImg = "<li><a>无案件图片</a></li>"
	}
	if (row.lawsuitDesc) {
		lawsuitDesc = "<li><a class='caseProcessDetail'>查看详情</a></li>"
	} else {
		lawsuitDesc = "<li><a>无详情</a></li>"
	}
    return ["<div class='btn-group btn-group-xs'>",
    		"<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
    		"<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", 
    		"</button>", 
    		"<ul class='dropdown-menu' role='menu'>",
		    lawsuitDesc,
		    seeProcessImg,
		    "</ul>", 
    		"</div>"].join("");
};

//被告人列表
defendantList = function (params) {
    return tableData(params, {
		lawsuitId : data.lawsuitId
	}, interUrl.postLoan.defendantList);
}
//提交

isFirstNode = function (title, params) {
	var o = $("#nolPros").values();
	if (args["typeOption"] === "submit") {
		$("#nolPros").validate();
		if (!$("#nolPros").valid()) {
			return false;
		}
	}
	
    $("#opinionForm").validate();
    if ($("#opinionForm").valid() == true) {
        oppSureModal(title);
		$("#sureOption").unbind("click").click(function () {
			if(args["typeOption"] === "submit"){
				var _id = $("#nolProsInput").val()
				comn.ajax({
					url : interUrl.postLoan.savesNolPros,
					data:$.extend(o, {
			        	lawsuitId: data.lawsuitId,
			        	id : _id
			      	}),
					success : function(res) {
						params();
					}
				});
			} else {
	            params();
			}
        })
    }
}

opinionForm = function () {
	comn.ajax({
        url: interUrl.common.opinion,
        data: $.extend($("#opinionForm").values(), argsBopInfoId),
        success: function (res) {
            $("#sureModal").modal("hide");
            flowSubmit(interUrl.postLoan.preSubmitNolPros, interUrl.postLoan.submit2nextNolPros, './Modal/task/myTask/index.html', {lawsuitCancelId : dealerId});
        }
    });
}

opinionForm_back = function () {
	//保存流程意见
    comn.ajax({
        url: interUrl.common.opinion,
        data: $.extend($("#opinionForm").values(), argsBopInfoId),
        success: function (res) {
          	$("#sureModal").modal("hide");
		    comn.ajax({
		        url:interUrl.postLoan.back2preNolPros,
		        data:{lawsuitCancelId:dealerId},
		        success:function(res){
		            tip({content:res.message || "返回成功"});
		            comn.closeTab();
		        }
		    })
        }
    });
}

opinionForm_saveOnly = function() {
	comn.ajax({
      	url: interUrl.common.opinionOnly,
      	data: $.extend($("#opinionForm").values(), argsBopInfoId),
      	success: function (res) {
        	$("#sureModal").modal("hide");
	        tip({
	              content: "保存成功！"
	        });
	    }
    });
}

opinionForm_canle = function() {
	$("#sureModal").modal("hide");
	comn.ajax({
        url:interUrl.postLoan.cancelNolPros,
        data: {lawsuitCancelId : dealerId},
        success:function(res){
            tip({content:res.message || "取消成功"});
            comn.closeTab();
        }
    })
}

//提交
$("#save").click(function () {
	isFirstNode("是否确认提交", opinionForm);
});

//退回上一步
$("#btn-loanReview-back").click(function () {
	isFirstNode("是否确认退回", opinionForm_back);
});

//取消
$("#btn-close-loan").click(function(){
  	comn.closeTab();
});

//撤销
$("#btn-cancel-loan").click(function () {
    isFirstNode("是否确认撤销", opinionForm_canle);
});

//opinionForm单独保存
$("#saveBtn").click(function(){
  	isFirstNode("是否确认保存", opinionForm_saveOnly);
});

$(function() {	
	//查看贷款详情
	$("#documentDetail").click(function() {
	  	return comn.addTab({
	  		title : '贷款详情',
	  		href : "./Modal/customManage/customer/loanDetail.html?projectId=" + projectId +"&customerId="+args.customerId + "&loanApplyId=" + projectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY"
	  	});
	});
	//隐藏分页
	$("#table_page").bootstrapTable({
		"undefinedText": "--",
	    "classes": "table-striped table-hover table",
	    "pagination": false,
	    "sidePagination": "server",
	    "queryParams": "queryParams",
	    "paginationFirstText": "第一页",
	    "paginationPreText": "上一页",
	    "paginationNextText": "下一页",
	    "paginationLastText": "最后一页",
	    "clickToSelect": true,
	    "height": "300"
	});
});

//判断显示提交还是退回
$("input[name='conclusion']").on('click', function () {
    var checkedV = $("input[name='conclusion']:checked").val();
    if (checkedV == 1) {
        $("#save").show();
        $("#btn-loanReview-back").hide();
    } else {
        $("#save").hide();
        $("#btn-loanReview-back").show();
    }
});