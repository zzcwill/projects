var advanceCountHandle, advanceBalanceAmountHandle, continuousOverdueTimesHandle, accumulatedOverdueTimesHandle, args;
var postDatas = args =  comn.getArgs(), towCarId;
var dealerId = postDatas['dealerId'];
var argsBopInfoId = {bopInfoId: postDatas['bopInfoId']};
var projectId;
if (args["typeOption"] === "submit") {
	$(".upImage").prop("disabled", false);
}
//获取页面信息
	comn.ajax({
		url: interUrl.trailer.getFlowInfo,
		data: {
			id: dealerId
		},
		success: function (res) {
			$("#topInfo").nameValues(res.data);
			getDocumentList(res.data.id);
			$("#collectionForm_2").values(res.data);
			$("#keyId").val(res.data.id);
			projectId = res.data.projectId;
		}
	});
//判断显示提交还是退回
		$("input[name='conclusion']").on('click', function () {
		    var checkedV = $("input[name='conclusion']:checked").val();
		    if (checkedV == 1) {
		        $("#save").show();
		        $("#btn-loanReview-back").addClass('hide');
		    } else {
		        $("#save").hide();
		        $("#btn-loanReview-back").removeClass('hide');
		    }
		});
//页面标题调整
	var type = postDatas.type;
	if(type === "2") {
		$("#btn-close-loan").addClass('hide');
		$("#opinionShow").removeClass('hide');
		$("#insuranceTitleDiv h3").text("拖车申请审批");
		$("#trailerFormSet").attr("disabled", true);
		
	} else if (type === "11") {
		$("#isHide").hide();
		$("#btn-close-loan").addClass('hide');
		$("#insuranceTitleDiv h3").text("查看拖车申请");
		$("#trailerFormSet").attr("disabled", true);
	}
//头部值校验
	advanceCountHandle = function (value) {
		if(value == null) {
			return 0;
		} else {
			return value;
		}
	};
	advanceBalanceAmountHandle = function (value) {
		if(value == null) {
			return 0 + " 元";
		} else {
			return value + " 元";
		}
	};
	continuousOverdueTimesHandle = function (value) {
		return "N" + value;
	}
	accumulatedOverdueTimesHandle = function (value) {
		return value +　" 次";
	}
//查看贷款详情
	$("#documentDetail").click(function() {
	  	return comn.addTab({
	  		title : '贷款详情',
	  		href : "./Modal/customManage/customer/loanDetail.html?projectId=" + projectId +"&customerId="+args.customerId +"&loanApplyId=" + projectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY"
	  	});
	});
//流程提交
	$("#save").click(function () {
		if ($("#collectionForm_2").valid()) {
		    if ($("#opinionForm").valid() == true) {
		        oppSureModal("是否确认提交");
				$("#sureOption").unbind("click").click(function () {
		            //提交时先保存流程意见
		            if ($("#trailerFormSet").attr("disabled") === true) {
		            	comn.ajax({
			                url: interUrl.common.opinion,
			                data: $.extend($("#opinionForm").values(), argsBopInfoId),
			                success: function (res) {
			                    $("#sureModal").modal("hide");
			                    flowSubmit(interUrl.trailer.preSubmit, interUrl.trailer.submit2next, './Modal/task/myTask/index.html', {towCarId: dealerId});
			                }
			            });
		            } else {
	            		comn.ajax({
		            		url: interUrl.trailer.trailerRecord,
		            		data: $.extend($("#collectionForm_2").values(), {id: dealerId}),
		            		success: function (res) {
		            			comn.ajax({
					                url: interUrl.common.opinion,
					                data: $.extend($("#opinionForm").values(), argsBopInfoId),
					                success: function (res) {
					                    $("#sureModal").modal("hide");
					                    flowSubmit(interUrl.trailer.preSubmit, interUrl.trailer.submit2next, './Modal/task/myTask/index.html', {towCarId: dealerId});
					                }
					            });
		            		}
		            	});
		            }
		        })
		    }
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
	        data: $.extend($("#opinionForm").values(), argsBopInfoId),
	        success: function (res) {
	          	$("#sureModal").modal("hide");
			    comn.ajax({
			        url: interUrl.trailer.back2pre,
			        data: {towCarId: dealerId},
			        success:function(res){
			            tip({content: res.message || "返回成功"});
			            comn.closeTab();
			        }
			    })
	        }
	      });
	    })
	  }
	});
	
//撤销
	$("#btn-close-loan").click(function(){
	  	$("#opinionForm").validate();
	  	if($("#opinionForm").valid() == true) {
	    	oppSureModal("是否确认撤销流程");
	    	$("#sureOption").unbind("click").click(function () {
	      		$("#sureModal").modal("hide");
			    comn.ajax({
			        url: interUrl.trailer.cancel,
			        data: {towCarId: dealerId},
			        success: function (res) {
			            tip({content: res.message});
			            comn.closeTab();
			        }
			    });
	    	})
	 	}
	});
//取消
	$("#cancelBtn").click(function() {
		comn.closeTab();
	});
	
//opinionForm单独保存
    $("#saveBtn").click(function(){
    	if ($("#collectionForm_2").valid()) {
    		oppSureModal("是否确认保存");
	      	$("#sureOption").unbind("click").click(function () {
		        //保存流程意见
		        if($("#trailerFormSet").attr("disabled") === true) {
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
		        } else {
	        		comn.ajax({
	            		url: interUrl.trailer.trailerRecord,
	            		data: $.extend($("#collectionForm_2").values(), {id: dealerId}),
	            		success: function (res) {
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
	            	});
		        }
		        
	      	});
    	}
	});