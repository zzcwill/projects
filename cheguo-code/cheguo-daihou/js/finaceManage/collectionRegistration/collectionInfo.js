var args,argsBopInfoId, handle_1,dataLoad_1,tableEvent_1,handle_2,dataLoad_2,tableEvent_2,dataLoad_3,handle_3,handle_4,dataLoad_4,tableEvent_4,table_pay,tableEvent_pay,handle_pay;
args = comn.getArgs(); //getArgs
argsBopInfoId = {bopInfoId: args['bopInfoId']};
//已保存状态下，撤销按钮一直都在
if (args["releventFlowNode"]) {
	$("#undo").removeClass("hide");
}

dataLoad_1 = function(params) {
	tableData(params,$("#searchForm_1").values(), interUrl.feeManage.collectionList);
};

tableEvent_1 = {
	"click .choose": function(e, a, item, index) {
		//点击选择触发事件
		delete item['id'];
		$("#collectionForm").values(item);
		$("#loanChoice").modal("hide");
		$("#collectionForm [name='managerName']").val(item.launchUserName);
		$("#collectionForm [name='orgName']").val(item.launchOrgName);
		($("#feeCategoryCode").val()==30)?$('#accountNameChoice').removeAttr('disabled'):$('#accountNameChoice').attr('disabled',true);
	}
};

handle_1 = function(value, row, index) {
	return ["<a class='choose' href='javascript:;'>选择</a>"].join("");
};

dataLoad_2 = function(params) {
	tableData(params,$("#searchForm_2").values(), interUrl.postLoan.lawsuitList);
};

tableEvent_2 = {
	"click .choose": function(e, a, item, index) {
		//点击选择触发事件
		$("#collectionForm [name='bussinessId']").val(item.id);
		$("#collectionForm [name='projectId']").val(item.projectId);
		$("#collectionForm [name='customerId']").val(item.customerId);
		$("#collectionForm [name='lawsuitNum']").val(item.lawsuitNum);
		$("#collectionForm [name='projectNo']").val(item.projectNo);
		$("#collectionForm [name='customerName']").val(item.customerName);
		$("#collectionForm [name='launchUserName']").val(item.userName);
		$("#collectionForm [name='managerName']").val(item.managerName);
		$("#collectionForm [name='orgName']").val(item.orgName);
		$("#collectionForm [name='lawsuitStatus']").val(item.lawsuitStatus);
		$("#collectionForm [name='lawsuitStatusName']").val(lawsuitStatus(item.lawsuitStatus));
		$("#mobilePhone").val(item.mobile || item.customerMobile || item.mobilePhone);
		$("#cardNo").val(item.cardNo);
		$("#caseChoice").modal("hide");
	}
};

handle_2 = function(value, row, index) {
	return ["<a class='choose' href='javascript:;'>选择</a>"].join("");
};

dataLoad_4 = function(params) {
	tableData(params,$("#searchForm_4").values(), interUrl.trailer.getList);
};

tableEvent_4 = {
	"click .choose": function(e, a, item, index) {
		//点击选择触发事件
		$("#collectionForm [name='bussinessId']").val(item.id);
		$("#collectionForm [name='projectId']").val(item.projectId);
		$("#collectionForm [name='customerId']").val(item.customerId);
		$("#collectionForm [name='dragCarNum']").val(item.dragCarNum);
		$("#collectionForm [name='launchUserName']").val(item.launchUserName);
		$("#collectionForm [name='projectNo']").val(item.projectNo);
		$("#collectionForm [name='customerName']").val(item.customerName);
		$("#collectionForm [name='managerName']").val(item.managerName);
		$("#collectionForm [name='orgName']").val(item.orgName);
		$("#trailerChoice").modal("hide");
	}
};

handle_4 = function(value, row, index) {
	return ["<a class='choose' href='javascript:;'>选择</a>"].join("");
};

table_pay = function(params) {
	//当前登录用户所在机构的收款人
	tableData(params, {orgId: comn.user.companyId}, interUrl.feeManage.guaranteeAccountList);
};
tableEvent_pay = {
  "click .pay": function(e, a, item, index) {
    $("[name='accountName']").val(item.accountName);
    $("[name='accountNo']").val(item.cardNumber);
    $("[name='bankName']").val(item.subBankName);
    $("#payeeChoice").modal("hide");
  }
};
handle_pay = function(value, row, index) {
  return ["<a class='pay' href='javascript:;'>选择</a>"].join("");
};

$(function(){
  if (args['businessTypeCode'] === "FEE_RECYCLE_FLOW") {
    //页面加载获取opinion内容
    $("#opinionText").getOpinion_s(argsBopInfoId);
  }
	$("#payeeChoice").on("shown.bs.modal", function(){
		$('#table_pay').bootstrapTable(comn.table);
	});

	$("#loanChoice").on("shown.bs.modal", function(){
		$('#table_1').bootstrapTable(comn.table);
	});

	$("#caseChoice").on("shown.bs.modal", function(){
		$('#table_2').bootstrapTable(comn.table);
	});

	$('#trailerChoice').on("shown.bs.modal", function(){
		$('#table_4').bootstrapTable(comn.table);
	});

	$("[name='coBankId'],[name='bankId']").bank_Get();

	$('#btn-search_1').off('click').click(function(){
		$("#table_1").bootstrapTable('refresh', {url: "..."});
	});
	$('#btn-search_2').off('click').click(function(){
		$("#table_2").bootstrapTable('refresh', {url: "..."});
	});
	$('#btn-search_4').off('click').click(function(){
		$("#table_4").bootstrapTable('refresh', {url: "..."});
	});

	var flowTitle = "";
	switch (args['releventFlowNode']) {
		case 'REVIEW_FEE_RECYCLE': flowTitle = "收款确认（分公司）";
			break;
		case 'CONFIRM_INCOME': flowTitle = "收款确认（集团）";
			break;
		default : flowTitle = "收款登记";
			break;
	}
	$("#flowTitle").text(flowTitle);

	var collectedAmountHtml=['<div class="input-tip">',
					              	'<label class="col-xs-3 col-sm-3 col-md-3 control-label"><span class="text-danger">*&nbsp;</span>实收金额：</label>',
						              '<div class="col-xs-5 col-sm-5 col-md-5">',
						              '<input type="text" name="collectedAmount" placeholder="请输入实收金额" class="form-control number required" aria-required="true"/>',
						              '</div></div>'];
	if(args['businessTypeCode']){ //流和中就显示出来流程意见
		if(args['flowEnd']){
			$('#realpay').append(collectedAmountHtml.join(""));
			$("#flowTitle").text('查看费用回收');
		}else{
			$("#opinionForm").removeClass("hide");
			$("#opinionText").getOpinion_s({"bopInfoId": args['bopInfoId']});
			var html=collectedAmountHtml;
			html.unshift('<div class="form-group form-group-sm">');
			html.push('</div>');
			$('#collectionForm').append(html.join(""));
		}
	}

	if(args['status']>2){
		$("#flowTitle").text('查看费用详情');
		$('#realpay').append(collectedAmountHtml.join(""));
	}

//根据url的type区分页面类型，show为查看，approve为提交，无为新申请
	if(args['type']){
		comn.ajax({
		  url: interUrl.feeManage.get,
		  data: {feeId:args['feeId']},
		  success: function (res) {
		  	var o = res.data;
				args['loanApplyId'] = o.id;
				args['businessTypeCode'] = o.businessType;
		  	$("#switch_1").html($("#tpl_" + o.feeCategoryCode).html() || "");
		  	$('#feeCategoryCode').getFeeCategoryCode(o.feeCategoryCode);
				$('#feeCode').getFeeCode(o.feeCategoryId, o.feeCode);
				if(o.lawsuitStatus){
					$("#collectionForm [name='lawsuitStatusName']").val(lawsuitStatus(o.lawsuitStatus));
				}
				getDocumentList(o.id);
		    $("#collectionForm").values(o);
		    if(!o.collectedAmount){
		    	$("input[name=collectedAmount]").val(o.receivableAmount);
		    }
			  if (o.paymentMethod == "1") {
				  $("#isCash").hide();
				  $("input[name=accountName], input[name=accountNo], input[name=bankName]").removeClass("required");
			  }
		  }
		});
		if(args['type']=='show'){
			$('.disabledClass').attr('disabled','true');
			$('.buttonBox').hide();
		}
	}else{
		$("#switch_1").html($("#tpl_10" ).html());
		$('#feeCategoryCode').getFeeCategoryCode('10');
		$('#feeCode').getFeeCode('7');
		$("input[name=operator]").val(comn.user.realname);
	}
	//$("input[name=actualDate]").val() == "" ? $("input[name=actualDate]").getToday() : $("input[name=actualDate]").val(); //如果页面没值，则显示当前日期
	//判断显示提交还是退回
	$("input[name='conclusion']").on('click', function () {
    var checkedV = $("input[name='conclusion']:checked").val();
    if (checkedV == 1) {
	    $("#btn-opinion-save").show();
	    $("#btn-loanReview-back").hide();
	    $('#btn-close-loan').addClass('hide');
    } else {
      	$("#btn-opinion-save").hide();
      	$("#btn-loanReview-back").show();
      	if (args["releventFlowNode"] == "CONFIRM_INCOME") {
			$("#btn-close-loan").addClass("hide");
		} else {
			$('#btn-close-loan').removeClass('hide');
		}
    }
	});

//取消按钮
	$(document).on("click", "#cancel,#btn-cancel", function() {
		comn.closeTab();
	});

	$("#opinionTab").click(function(e){
		e.preventDefault();
		if(!args['businessTypeCode']){
			return tip({content: "请先保存 !"});
		}
		$("#opinion>div").getLoad();
		$(this).tab('show');
	});

	//撤销按钮
	$('#undo').click(function(){
		comn.ajax({
				url: interUrl.feeManage.recycleCancel,
				data: {feeRecycleId: args['feeId']||$('#feeId').val()},
				async: false,
				success: function(res) {
					tip({content: "撤销成功！"});
					comn.closeTab();
				}
			});
	});

//保存按钮
	$('#btn-save').click(function(){
		if (args["feeType"] === "tip") {
			feeSubmitSave("save")
		} else {
			$('#collectionForm').validate();
			if ($("#collectionForm").valid() == true) {
				feeManageNotice("save")
			}
		}
	});
	function feeSubmitSave(status){
		$('#collectionForm').validate();
		if ($("#collectionForm").valid() == true) {
			comn.ajax({
				url : interUrl.feeManage.onlyFeeManageNotice,
				data : $('#collectionForm').values(),
				success : function(res) {
					var o = res.data;
					if (o.count) {
						$("#feeSureModal").modal("show");
						$("#feeTipText").html(o.notice);
						$("#settlementSureOption").unbind("click").on("click", function(){
							feeManageNotice(status);
							$("#feeSureModal").modal("hide");
						})
					} else {
						feeManageNotice(status);
					}
				}
			})
		}
	}
	function feeManageNotice(status){
		comn.ajax({
			url: interUrl.feeManage.save,
			data: $('#collectionForm').values(),
			async: false,
			success: function(res) {
				if (status === "save") {
					var o = res.data;
					$('#collectionForm').values(o);
					$("#feeId").val(o.id);
					args['loanApplyId'] = o.id;
					args['businessTypeCode'] = o.businessType;
					tip({content: "保存成功！"});
					if(!args['releventFlowNode'] || args['releventFlowNode']=='LAUNCH_FEE_RECYCLE'){
						$('#undo').removeClass('hide');
					}
				} else {
					var o = res.data;
					$('#collectionForm').values(o);
					$("#feeId").val(o.id);
					args['loanApplyId'] = o.id;
					args['businessTypeCode'] = o.businessType;
					flowSubmit(interUrl.feeManage.recyclePreSubmit, interUrl.feeManage.recycleSubmit2next, './Modal/task/myTask/index.html', {feeRecycleId: res.data.id});
				}
			}
		});
	}

	$("#btn-save-money").click(function() {
  	if ($("#collectionForm").valid() == true) {
			comn.ajax({
				url: interUrl.feeManage.save,
				data: $('#collectionForm').values(),
				success: function(res) {
					tip({content : "保存成功"})
				}
			});
		}
  })

	//opinionForm单独保存
  $("#saveBtn").click(function(){
      oppSureModal("是否确认保存");
      $("#sureOption").unbind("click").click(function () {
        //保存流程意见
        comn.ajax({
          url: interUrl.common.opinionOnly,
          data: $.extend($("#opinionForm").values(), {"bopInfoId": args['bopInfoId']}),
          success: function (res) {
            $("#sureModal").modal("hide");
            tip({
                  content: "保存成功！"
                });
          }
        });
      });
	});

//提交按钮
	$('#btn-comit').click(function(){
		if (args["feeType"] === "tip") {
			feeSubmitSave("submit")
		} else {
			$('#collectionForm').validate();
			if ($("#collectionForm").valid() == true) {
				feeManageNotice("submit")
			}
		}
	});

	$("#btn-opinion-save").click(function(){
		if ($("#collectionForm").valid() == true) {
			comn.ajax({
				url: interUrl.feeManage.save,
				data: $('#collectionForm').values(),
				async: false,
				success: function(res) {
					comn.ajax({
						url: interUrl.common.opinion,
						data: $.extend($('#opinionForm').values(), {"bopInfoId": args['bopInfoId']}),
						async: false,
						success: function(res) {
							flowSubmit(interUrl.feeManage.recyclePreSubmit, interUrl.feeManage.recycleSubmit2next, './Modal/task/myTask/index.html', {feeRecycleId: args['feeId']});
						}
					});
				}
			});
		}
	});

	//退回上一步
	$("#btn-loanReview-back").click(function () {
	    $("#opinionForm").validate();
	    if($("#opinionForm").valid() == true) {
	        oppSureModal("是否确认退回");
	        $("#sureOption").unbind("click").click(function () {
	            //保存流程意见
	            comn.ajax({
	                url: interUrl.common.opinion,
	                data: $.extend($("#opinionForm").values(), {"bopInfoId": args['bopInfoId']}),
	                success: function (res) {
	                    $("#sureModal").modal("hide");
	                    //退回上一步
	                    comn.ajax({
	                        url: interUrl.feeManage.recycleBack2pre,
	                        data: {feeRecycleId: args['feeId']},
	                        success: function (res1) {
	                            tip({content: res1.message});
	                            comn.closeTab();
	                        }
	                    });
	                }
	            });
	        })
	    }
	});
	//关闭费用回收
	$('#btn-close-loan').click(function(){
	  $("#opinionForm").validate();
	  if($("#opinionForm").valid() == true) {
	    oppSureModal("是否确认关闭贷款！");
	    $("#sureOption").unbind("click").click(function () {
	      $("#sureModal").modal("hide");
	      comn.ajax({
	          url: interUrl.feeManage.recycleClose,
	          data: {feeRecycleId: args['feeId']},
	          success: function (res) {
	              tip({content: res.message});
	              comn.closeTab();
	          }
	      });
	    });
	  }
	});

	$('#feeCategoryCode').on('change',function(){
		var val=this.value;
		var id=$(this).find("option:selected").attr('data-id');
		$("#switch_1").html($("#tpl_" + val).html() || "");
		$('#accountNameChoice').attr('disabled',true);
		$('#feeCode').getFeeCode(id);
		$("#isCash").show();
		$("input[name=accountName], input[name=accountNo], input[name=bankName]").addClass("required");
		//$("input[name=actualDate]").val() == "" ? $("input[name=actualDate]").getToday() : $("input[name=actualDate]").val(); //如果页面没值，则显示当前日期
	});

	//图片部分
	base64 = function (file, index, callback) {
	    return lrz(file).then(function (rst) {
	        var imgRst;
	        imgRst = rst.base64;
	        return typeof callback === "function" ? callback(file, imgRst, index) : void 0;
	    });
	};
	//图片上传
	$(".upImage").click(function () {
		var _this = $(this);
		$("#collectionForm").validate();
    if ($("#collectionForm").valid() == true) {
        var feeId = $("#feeId").val();
        //如果是修改
        if (feeId) {
            _this.parent("div").find(".upImageInput").trigger("click");
            return;
        } else {
            //tip({content:"请先检查并保存费用信息"});
            comn.ajax({
                url: interUrl.feeManage.save,
                data: $('#collectionForm').values(),
                success: function (res) {
                		var o = res.data;
										$('#collectionForm').values(o);
										args['loanApplyId'] = o.id;
										args['businessTypeCode'] = o.businessType;
                }
            });
        }
        _this.parent("div").find(".upImageInput").trigger("click");
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
            var _index = $("#fileType").find("li").length;
            html = ["<li>",
            "<input name='LoanDocuments[" + 0 + "].fileName' data-name='fileName' class='hide' value='" + f.name + "' />",
            "<a href='javascript:;'>" + f.name + "</a>",
            "&nbsp;<a href='javascript:;' class='upCancle'>删除</a>",
            "</li>"].join("");
            $("#fileType").append(html);
            uploadImg($("#feeId").val(), o, f.name);
        }));
    }
    return results;
	});

	//删除图片  delDocument
	$(".files-ul").on("click", ".upCancle", function () {
    var _this,_type, ul,fileId;
    _this = $(this);
    ul = _this.parents("ul");
    fileId=_this.parent("li").attr("data-id");
    comn.ajax({
        url:interUrl.feeManage.delFile,
        data:{
            fileId: fileId
        },
        success:function(res){
            _this.parents("li").remove();
            _this.parents("ul").prev("div").find(".upImageInput").val("");
            ul.find("li").each(function (index) {
                $(this).find("[data-name='fileName']").attr("name", "LoanDocuments[" + index + "].fileName");
            });
        }
    });
	});

	//获取图片
	function getDocumentList(id) {
		var result = "";
    comn.ajax({
        url: interUrl.feeManage.getFileList,
        data: {
            feeId: id
        },
        success: function (res) {
            var del=(args['type']!='show')?"<a href='javascript:;' class='upCancle'>删除</a>":"";
            var i, list = res.data;
            for (i = 0; i < list.length; i++) {
                var o = list[i];
				console.log( o.filePath)
                result += "<li class='loaded' data-id='"+ o.id+"'>" +
                    "<img src='"+ o.filePath +"' class='hide' />" +
                    "<input name='LoanDocuments[" + i + "].fileName' data-name='fileName' class='hide' value='" + o.fileName + "' />" +
                    "<a href='javascript:;' class='showImg' data-path='"+ o.filePath+"'>" + o.fileName + "</a>&nbsp;"+del+"</li>";
            }
            $("#fileType").html(result);
        }
    });
	}

	//上传图片
function uploadImg(id, imgBase64, fileName) {
    var $tr, $trAll;
    $tr = $("#fileType").find("li:not('.loaded')"); //把已经上传过的过滤掉
    $trAll = $("#fileType").find("li");
    comn.ajax({
        url: interUrl.feeManage.uploadFile,
        data: {
        	feeId: id,
        	filePath: imgBase64,
        	fileName: fileName
        },
        success: function (res) {
            $tr.addClass("loaded").attr("data-id",res.data); //标注一下已上传的文件
        }
    });
}

	//查看图片
	$(document).on("click",".showImg",function(){
	    var _this=$(this),imgArr=[];
	    var imgA=_this.parents("ul").find(".showImg");
	    var _index=imgA.index(_this);
	    imgA.each(function(index){
	        imgArr.push(($(this).attr("data-path")));
	    });
	    window.parent.switchImage(imgArr,_index);
	});
});

//选择现金时，不再录入相关银行信息
$(document).on("change", "select[name=paymentMethod]", function() {
	if ($(this).val() == "1") {
		$("#isCash").hide();
		$("input[name=accountName], input[name=accountNo], input[name=bankName]").removeClass("required");
	} else {
		$("#isCash").show();
		$("input[name=accountName], input[name=accountNo], input[name=bankName]").addClass("required");
	}
})
