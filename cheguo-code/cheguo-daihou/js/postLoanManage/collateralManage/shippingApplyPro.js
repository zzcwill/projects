var statusHandle, inKeepHandle, advanceHandle, args;
var postDatas = args = comn.getArgs();
var type = postDatas.type;
var dealerId = postDatas['dealerId'];
var argsBopInfoId = {bopInfoId: postDatas['bopInfoId']};
var dataEmpty = {};
if (args["typeOption"] === "submit") {
	$(".upImage").prop("disabled", false);
}
//页面加载时获取页面数据
	doAjax(interUrl.collateral.collateralRecord, {id: dealerId},
			function (res) {
				$("#topInfo").nameValues(res.data);
				$("#keyId").val(res.data.id);
				getDocumentList(res.data.id);
				//下方表单数据引入
				$("#collectionForm_2").values(res.data);
				if ($("#otherReason").val() !== "") {
					$("#otherReasonCheck").prop("checked", true);
					$("#otherReason").prop("disabled", false);
					$("#checkoutReason").val("");
					$("#checkoutReason").prop("disabled", true);
				}
			}
		);
//获取出库时间
	$("#outTime").getToday();
//数值渲染转换操作
	statusHandle = function (value) {
    	return [null, null, "已入库", null, "出库审批中", "已出库"][value] || null;
	};
	inKeepHandle = function (value) {
		if(value == null) {
			return "0 元";
		} else {
			return value + " 元";
		}
	};
	advanceHandle = function (value) {
		if(value == null) {
			return "0 元";
		} else {
			return value + " 元";
		}
	};
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
	if(type === "2") {
		$("#btn-close-loan").addClass('hide');
		$("#opinionFormHide").removeClass('hide');
		$("#insuranceTitleDiv h3").text("车辆出库审批");
		$("#formDisabled").attr("disabled", true);
	} else if (type === "11") {
		$("#isHide").hide();
		$("#btn-close-loan").addClass('hide');
		$("#insuranceTitleDiv h3").text("查看出库申请");
		$("#formDisabled").attr("disabled", true);
	}
//其他勾选框事件
	$("#otherReasonCheck").change(function () {
		$("#checkoutReason option").eq(0).prop("selected", true);
		if ($("#otherReasonCheck").prop("checked") === true) {
			$("#otherReason").prop("disabled", false);
			$("#otherReason").addClass('required');
			$("#checkoutReason").prop("disabled", true);
			$("#checkoutReason").removeClass('required');
			dataEmpty.checkoutReason = "";
		} else {
			$("#otherReason").prop("disabled", true);
			$("#otherReason").val("");
			$("#otherReason").removeClass('required');
			$("#checkoutReason").prop("disabled", false);
			$("#checkoutReason").addClass('required');
			dataEmpty.otherReason = "";
		}
	});
//提交
	$("#save").click(function () {
		if($("#collectionForm_2").valid() == true) {
			if ($("#opinionForm").valid() == true) {
	        oppSureModal("是否确认提交");
			$("#sureOption").unbind("click").click(function () {
				if ($("#formDisabled").attr("disabled") === true) {
					//提交时先保存流程意见
		            comn.ajax({
		                url: interUrl.common.opinion,
		                data: $.extend($("#opinionForm").values(), argsBopInfoId),
		                success: function (res) {
		                    $("#sureModal").modal("hide");
		                    flowSubmit(interUrl.collateral.preSubmit, interUrl.collateral.submit2next, './Modal/task/myTask/index.html', {carCheckoutId: dealerId});
		                }
		            });
				} else {
					comn.ajax({
		            		url: interUrl.collateral.shippingApplySave,
		            		data: $.extend($("#collectionForm_2").values(), {id: dealerId}, dataEmpty),
		            		success: function (res) {
		            			comn.ajax({
					                url: interUrl.common.opinion,
					                data: $.extend($("#opinionForm").values(), argsBopInfoId),
					                success: function (res) {
					                    $("#sureModal").modal("hide");
					                    flowSubmit(interUrl.collateral.preSubmit, interUrl.collateral.submit2next, './Modal/task/myTask/index.html', {carCheckoutId: dealerId});
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
			        url: interUrl.collateral.back2pre,
			        data: {carCheckoutId: dealerId},
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
	    	oppSureModal("是否确认关闭流程");
	    	$("#sureOption").unbind("click").click(function () {
	      		$("#sureModal").modal("hide");
			    comn.ajax({
			        url: interUrl.collateral.cancel,
			        data: {carCheckoutId: dealerId},
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
    $("#btn-save").click(function(){
    	if($("#collectionForm_2").valid() == true) {
    		oppSureModal("是否确认保存");
	      	$("#sureOption").unbind("click").click(function () {
	      		if ($("#formDisabled").attr("disabled") === true) {
	      			//保存流程意见
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
		            		url: interUrl.collateral.shippingApplySave,
		            		data: $.extend($("#collectionForm_2").values(), {id: dealerId}, dataEmpty),
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
//简单封装ajax函数
function doAjax(url, data, callback) {
	return comn.ajax({
			url: url,
			data: data,
			success: function (res) {
				return typeof callback === "function" ? callback(res) : void 0;
			}
		});
}