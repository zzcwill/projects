var table_1, args, data, processId, caseProcessList, tableEvent_caseProcessRecord, handle_caseProcessRecord, caseProcessInfo;
args = comn.getArgs();
data = {
	lawsuitId : args["lawsuitId"],
	projectId : args["projectId"]
}
if (args["lawsuitStatus"] == "6" || args["lawsuitStatus"] == "14"){
	$("#caseStatus").html("<option value=''>--请选择--</option><option value='14'>已撤诉</option>")
}
//添加基本信息
caseProcessList = function(b, c) {
	comn.ajax({
		url: b,
		data: {
			lawsuitId: c
		},
		success: function(res) {
			$("#caseProcessList").values(res.data);
		}
	});
};

//添加案件进程记录
table_1 = function (params) {
	return tableData(params, {
		lawsuitId: data.lawsuitId
	}, interUrl.postLoan.caseProcessInfo);
};

//历史案件进程
caseProcessInfo = function (params) {
	return tableData(params, {
		projectId : data.projectId
	}, interUrl.postLoan.historyCaseProcessList);
}
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

$(function() {
	$("#caseProcessTime").getToday();
	caseProcessList(interUrl.postLoan.caseProcessGet, data.lawsuitId);

	//选择立案显示立案编号
	$(document).on("change", "#caseStatus", function() {
		if ($(this).val() == 7) {
			$("#caseNumber").show();
		} else {
			$("#checkLawCaseNo").val("");
			$("#caseNumber").hide();
			$("#checkLawCaseNo").siblings('label').remove();
			$("#caseStatus-error").remove();
		}
	});

	//选择已立案，案件编号必填
	$(document).on("change", "#caseStatus", function() {
		if ($(this).find("option:selected").html() == "已立案") {
			$("#lawCaseNo").show();
			$("#checkLawCaseNo").addClass("required");
		} else {
			$("#lawCaseNo").hide();
			$("#checkLawCaseNo").removeClass("required");
			$("#checkLawCaseNo-error").removeClass("required");

		}
	});

	//如输入案件号则隐藏提示
	$(document).on("change", "#checkLawCaseNo", function() {
		$("#checkLawCaseNo-error").remove();
	});

	//金额未填取消提示
	// $(document).on("blur", "#receivableAmount input", function() {
	// 	if ($(this).val() == "") {
	// 		$(this).parents(".input-tip").removeClass("has-error")
	// 	}
	// });

	//提交进程登记
	$("#btn-courtApply-save").click(function(){
		if ($("#caseProcessReg").valid()) {
			oppSureModal("是否确认提交");
			$("#sureOption").unbind("click").click(function () {
				var processId = $("#dealerId").val();
				if (processId == "" || processId == "undefined") {
					url = interUrl.postLoan.saveCaseProcessLIst
				} else {
					url = interUrl.postLoan.updateCaseProcessLIst
				}
				comn.ajax({
					url : url,
					data : $.extend($("#caseProcessReg").values(), {
						projectId : data.projectId,
			        	lawsuitId: data.lawsuitId,
			        	id : processId
			      	}),
					success : function(res) {
						if (res.data) {
							$("#dealerId").val(res.data)
						}
						$("#sureModal").modal("hide");
						tip({content:"保存成功"});
						$("#table").bootstrapTable('refresh', {url: "..."});
					}
				});
			})
		}
	});
});

//图片部分
var base64 = function (file, index, callback) {
    return lrz(file).then(function (rst) {
        var imgRst;
        imgRst = rst.base64;
        return typeof callback === "function" ? callback(file, imgRst, index) : void 0;
    });
};
//图片上传
$(".upImage").click(function () {
	if (($("#caseProcessReg").valid() == true)){
		if ($("#dealerId").val() == "") {
			comn.ajax({
				url : interUrl.postLoan.saveCaseProcessLIst,
				data : $.extend($("#caseProcessReg").values(), {
					projectId : data.projectId,
		        	lawsuitId: data.lawsuitId
		      	}),
				success : function(res) {
					if (res.data) {
						$("#dealerId").val(res.data);
					}
				}
			});
		}
		var _this = $(this);
		_this.parent("label").find(".upImageInput").trigger("click");
	}
});

$(".upImageInput").change(function () {
        var _this = $(this);
        var fileArr, html, i, j, k, len, results;
        fileArr = this.files;
        results = [];
        for (k = j = 0, len = fileArr.length; j < len; k = ++j) {
            i = fileArr[k];
            html = "";
            results.push(base64(i, k, function (f, o, index) {
                var _index = $("#fileType_801").find("li").length;
                html = ["<li>",
					"<input name='processFileName' data-name='fileName' class='hide' value='" + f.name + "' />",
					"<a href='javascript:;' data-path="+ o +" class='showImg'>" + f.name + "</a>",
					"&nbsp;<a href='javascript:;' class='upCancle'>删除</a>",
				"</li>"].join("");
                $("#fileType_801").append(html);
                var id = $("#dealerId").val();
                uploadImg(id, o);
            }));
        }
        return results;
});

//删除图片  delDocument
$(".files-ul").on("click", ".upCancle", function () {
    var _this, ul, fileId;
    _this = $(this);
    ul = _this.parents("ul");
    fileId = _this.parent("li").attr("data-id");
    comn.ajax({
        url:interUrl.postLoan.delImg,
        data:{
            fileId : fileId
        },
        success:function(res){
            _this.parents("li").remove();
            _this.parents("ul").prev("div").find(".upImageInput").val("");
            ul.find("li").each(function (index) {
                $(this).find("[data-name='fileName']").attr("name", "processFiles[" + index + "].processFile");
            });
        }
    });
});

//上传图片
function uploadImg(id, imgBase64) {
    var $tr, $trAll;
    $tr = $("#fileType_801").find("li:not('.loaded')"); //把已经上传过的过滤掉
    $trAll = $("#fileType_801").find("li");
    comn.ajax({
        url: interUrl.postLoan.saveImg,
        data: $.extend($tr.values(), {
			processId : id,
			processFile: imgBase64
        }),
        success: function (res) {
            $tr.addClass("loaded").attr("data-id", res.data); //标注一下已上传的文件
        }
    });
}

//查看图片
$(document).on("click", ".showImg", function(){
    var _this = $(this), imgArr = [];
    var imgA = _this.parents("ul").find(".showImg");
    var _index = imgA.index(_this);

    imgA.each(function(index) {
        imgArr.push(($(this).attr("data-path")));
    });
    window.parent.switchImage(imgArr, _index);
});

$(document).on("keyup", "#monitorInput input", function(){
    var bankSettleAmount = $("#monitorInput input[name=bankSettleAmount]").val() || 0;
    var returnCompanyAmount = $("#monitorInput input[name=returnCompanyAmount]").val() || 0;
    var otherUseAmount = $("#monitorInput input[name=otherUseAmount]").val() || 0;
    $("#receivableAmount input[name=receivableAmount]").val(comn.accAdd(bankSettleAmount, comn.accAdd(returnCompanyAmount, otherUseAmount)))
});
