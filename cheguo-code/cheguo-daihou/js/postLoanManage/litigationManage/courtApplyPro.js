var args, data, dealerId, argsBopInfoId, projectId, defendantList, codeName, flag_defendantList, num, arrList;
args = comn.getArgs();
data = {
	lawsuitId : args["dealerId"] || args["lawsuitId"],
	loanApplyId : args["loanApplyId"]
}
dealerId = args['dealerId'];
argsBopInfoId = {bopInfoId: args['bopInfoId']};
//判断处理哪个节点
if (args["typeOption"] === "submit") {
	$(".upImage").prop("disabled", false);
	$("#opinionForm").show();
	$("#btn-cancel-loan, #isFisrtNode_defendant, #isFisrtNode_courtApply, #addDefendant").removeClass("hide");
	$(".page-header h3").html("发起诉讼申请");
	$("#isFirstNode").attr("disabled", false);
	$("#nonFirstNode_defendant").hide();
	$("#opinionForm .panel-default").hide();
	comn.ajax({
		url : interUrl.postLoan.defendantList,
		data : {
			lawsuitId: data.lawsuitId
		},
		success : function(res) {
			flag_defendantList = false;   //重置被告人，添加table头部
			var ref = res.data;
			var len = ref.length;
			var html;
			var _cardNo = "";
			for (i = 0; i < len; i++) {
				var cardType = (function(){
					if(ref[i].cardType == 1) {
						return "身份证";
					} else if (ref[i].cardType == 2) {
						return "军官证";
					} else if (ref[i].cardType == 3) {
						return "侨胞证";
					} else if (ref[i].cardType == 4) {
						return "外籍人士";
					} else {
						return '--'
					}
				})();
				if (ref[i].defendantType == "2") {
					_cardNo = "XXXXX";
					arrList.push("XXXXX");

				} else {
					_cardNo = ref[i].cardNo;
					arrList.push(ref[i].cardNo);
				}
				var defendantId = ref[i].defendantId ? ref[i].defendantId : "";
				var relationship = ref[i].relationship ? ref[i].relationship : "";
				var _cardTypeValue = ref[i].cardType ? ref[i].cardType : "";
				html += [
							"<tr>",
							"<td><input type='text' class='hide input1' data-role='"+ _cardNo +"' name='defendants[" + i + "].cardNo' value='" + ref[i].cardNo + "' />"+ ref[i].defendantName +"</td>",
							"<td>"+ cardType +"</td>",
							"<td>"+ ref[i].cardNo,
							"<input type='text' class='hide input2' name='defendants[" + i + "].cardType' value='" + _cardTypeValue + "' />",
							"<input type='text' class='hide input3' name='defendants[" + i + "].defendantId' value='" + defendantId + "' />",
							"<input type='text' class='hide input4' name='defendants[" + i + "].defendantName' value='" + ref[i].defendantName + "' />",
							"<input type='text' class='hide input5' name='defendants[" + i + "].defendantType' value='" + ref[i].defendantType + "' />",
							"<input type='text' class='hide input6' name='defendants[" + i + "].mobile' value='" + ref[i].mobile + "' />",
							"<input type='text' class='hide input7' name='defendants[" + i + "].relationship' value='" + relationship + "' /></td>",
							"<td>"+ ref[i].mobile +"</td>",
							"<td><button type='button' class='btn btn-primary btn-xs delThisDefendant'>删除</button></td>",
							"</tr>"].join("");
			}
			$("#addDefendantList table").append(html);
			num = $("#addDefendantList table tbody").children().length;
            setTimeout(function(){$("#defendantList option:eq(1)").attr('selected','selected')}, 500)
		}
	})
} else if (args["typeOption"] === "preBack") {
	$("#opinionForm").show();
	$("#btn-loanReview-back").removeClass("hide").hide();
	$(".page-header h3").html("起诉申请审核");
} else {
	$("#opinionForm").hide();
	$("#isHide").addClass("hide");
}

//判断是否显示案件进程记录
if (args["caseProcessRegId"] == "show") {
	$("#caseProcessRegId").removeClass("hide");
	//添加案件进程记录
}

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

//是否第一节点
isFirstNode = function (title, params) {
	var o = $("#collectionForm_2").values();
	if (args["typeOption"] === "submit") {
		$("#collectionForm_2").validate();
		if (!$("#collectionForm_2").valid()) {
			return false;
		}
		if ($("#addDefendantList").html() == "") {
			tip({content: "请添加被告人"});
			return false;
		}
	}

    $("#opinionForm").validate();
    if ($("#opinionForm").valid() == true) {
        oppSureModal(title);
		$("#sureOption").unbind("click").click(function () {
			if(args["typeOption"] === "submit"){
				var _id = $("#lawsuitIdVal").val();
				comn.ajax({
					url : interUrl.postLoan.saveDefendantList,
					data:$.extend(o, {
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
//提交
opinionForm = function () {
	comn.ajax({
        url: interUrl.common.opinion,
        data: $.extend($("#opinionForm").values(), argsBopInfoId),
        success: function (res) {
            $("#sureModal").modal("hide");
            flowSubmit(interUrl.postLoan.preSubmit, interUrl.postLoan.submit2next, './Modal/task/myTask/index.html', {lawsuitApplyId : dealerId});
        }
    });
}
//退回上一步
opinionForm_back = function () {
	//保存流程意见
    comn.ajax({
        url: interUrl.common.opinion,
        data: $.extend($("#opinionForm").values(), argsBopInfoId),
        success: function (res) {
          	$("#sureModal").modal("hide");
		    comn.ajax({
		        url:interUrl.postLoan.back2pre,
		        data:{lawsuitApplyId:dealerId},
		        success:function(res){
		            tip({content:res.message || "返回成功"});
		            comn.closeTab();
		        }
		    })
        }
    });
}
//单保存
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
//撤销
opinionForm_canle = function() {
	$("#sureModal").modal("hide");
	comn.ajax({
        url:interUrl.postLoan.cancel,
        data: {lawsuitApplyId : dealerId},
        success:function(res){
            tip({content:res.message || "取消成功"});
            comn.closeTab();
        }
    })
}
//基本信息
comn.ajax({
	url: interUrl.postLoan.caseProcessGet,
	data: {
		lawsuitId : data.lawsuitId
	},
	success: function(res) {
		projectId = res.data.projectId;
		codeName = res.data.companyName;
		$("#lawsuitIdVal, #keyId").val(res.data.id);
		getDocumentList(res.data.id);
		$("#collectionForm_2").values(res.data);
        if (args["typeOption"] === "submit") {
            loadDefendant(interUrl.postLoan.defendantSelect, $("#defendantList"), projectId);
        }
	}
});

$(function() {
  //页面加载获取opinion内容
  $("#opinionText").getOpinion_s(argsBopInfoId);
	//查看贷款详情
	$("#documentDetail").click(function() {
	  	return comn.addTab({
	  		title : '贷款详情',
	  		href : "./Modal/customManage/customer/loanDetail.html?projectId=" + projectId+"&customerId="+args.customerId + "&loanApplyId=" + projectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY&businessTypeCode="+args['businessTypeCode']
	  	});
	});

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
})

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
