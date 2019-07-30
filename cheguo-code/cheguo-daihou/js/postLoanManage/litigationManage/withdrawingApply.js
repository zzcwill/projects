var caseProcessInfo, defendantList, args, data, caseProcessList, tableEvent_caseProcessList, handle_caseProcessList, handle_lawsuitType;
args = comn.getArgs();
data = {
	projectId : args["projectId"],
	lawsuitId : args["lawsuitId"]
}

//基本信息
comn.ajax({
	url: interUrl.postLoan.caseProcessGet,
	data: {
		lawsuitId : data.lawsuitId
	},
	success: function(res) {
		$("#collectionForm_2").values(res.data);
	}
});

//被告人列表
defendantList = function (params) {
    return tableData(params, {
		lawsuitId : data.lawsuitId,
	}, interUrl.postLoan.defendantList);
}

//历史案件进程
caseProcessInfo = function (params) {
	return tableData(params, {
		projectId : data.projectId
	}, interUrl.postLoan.historyCaseProcessList);
}

//本案进程
caseProcessList = function(params) {
	return tableData(params, {
		lawsuitId : data.lawsuitId
	}, interUrl.postLoan.caseProcessInfo)
}

//查看附件
tableEvent_caseProcessList = {
	"click .caseProcessImg": function (e, a, item, index) {
		var len = item.processFiles.length;
		var processImg = [];
		for (i = 0; i < len; i++) {
			processImg.push(item.processFiles[i].processFile);
		}
		window.parent.switchImage(processImg, 0, 2);
	}
};

handle_caseProcessList = function(value, row, index) {
	var seeProcessImg = "";
	var isImg = row.processFiles.length;
	if (isImg) {
		seeProcessImg = "<button type='button' class='btn btn-primary btn-xs caseProcessImg'>查看附件</button>"
	} else {
		seeProcessImg = "<button type='button' class='btn btn-primary btn-xs'>无附件</button>"
	}
    return seeProcessImg;
};

handle_lawsuitType = function(value, row, index) {
	return [null, "公司起诉", "银行起诉", "银行诉讼"][value] || null;
}

$(function() {
	//选其他必填
	$(document).on("change", "#nolProsReason", function() {
		if ($(this).find("option:selected").html() == "其他理由") {
			$("#nolProsOtherReason").show();
			$("#nolProsOtherReason-value").addClass("required");
		} else {
			$("#nolProsOtherReason").hide();
			$("#nolProsOtherReason-value").removeClass("required");
			$("#nolProsOtherReason-value-error").removeClass("required");
		}
	});

	$(document).on("change", "#nolProsOtherReason-value", function(){
		$("#nolProsOtherReason-value-error").remove();
	})
	//提交保存被告人
	$("#btn-courtApply-save").click(function(){
		if($("#nolPros").valid()){
			var o = $("#nolPros").values();
			oppSureModal("是否确认提交");
			$("#sureOption").unbind("click").click(function () {
				var _id = $("#nolProsInput").val();
				comn.ajax({
					url : interUrl.postLoan.savesNolPros,
					data:$.extend(o, {
			        	lawsuitId: data.lawsuitId,
			        	id : _id,
			      	}),
					success : function(res) {
						$("#nolProsInput").val(res.data);
			            $("#sureModal").modal("hide");
			            var lawsuitCancelId = {"lawsuitCancelId" : data.lawsuitId}
			            flowSubmit(interUrl.postLoan.preSubmitNolPros, interUrl.postLoan.submit2nextNolPros, './Modal/task/myTask/index.html', lawsuitCancelId);
					}
				});
			})
		}
	});

	$('#nolProsOtherReason-value').keypress(function(e){
		if((e.keyCode == 13)){
		    $("#nolPros").validate();
		    return false;
		}
	});

	//隐藏分页
	$("#table").bootstrapTable({
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

