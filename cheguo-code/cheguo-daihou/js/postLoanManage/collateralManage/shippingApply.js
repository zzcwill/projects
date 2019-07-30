var statusHandle, inKeepHandle, advanceHandle;
var args = comn.getArgs();
var type = args.type;
var ajaxDatas;
var dataEmpty = {};
//数值渲染转换操作
if (type == "see") {
	$("#isTab").removeClass("hide");
}
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
//判断页面跳入状态，引入相应数据和效果
	if (type === "outApply") {
		$("#now").getToday();
		doAjax(interUrl.collateral.collateralRecord, {dragCarId: args.id},
			function (res) {
				$("#topInfo").nameValues(res.data);
				ajaxDatas = res.data;
			}
		);
	} else {
		$("#insuranceTitleDiv h3").text("查看占管记录")
		$("#formDisabled").attr("disabled", true);
		doAjax(interUrl.collateral.collateralRecord, {dragCarId: args.id},
			function (res) {
				$("#topInfo").nameValues(res.data);
				ajaxDatas = res.data;
				$("#collectionForm_2").values(ajaxDatas);
				args["loanApplyId"] = res.data.id;
				getDocumentList(res.data.id);
				if ($("#otherReason").val() !== "") {
					$("#otherReasonCheck").prop("checked", true);
					$("#otherReason").prop("disabled", false);
					$("#checkoutReason").val("");
					$("#checkoutReason").prop("disabled", true);
				}
			}
		);
	}
//保存
$("#btn-save").click(function(){
	save_btn(1);
});
//表单提交
$("#btn-submit").click(function() {
	save_btn(2);
});

function save_btn(num){
	if($("#collectionForm_2").valid()) {
		var data = {
			projectId: args.projectId,
			dragCarId: args.id
		};
		if ($("#responData").val() !== "") {
			doAjax(interUrl.collateral.shippingApplySave, $.extend(data, $("#collectionForm_2").values(), dataEmpty),
				function (res) {
					var carCheckOutId = {carCheckoutId: $("#responData").val()}
					if (num == 2) {
						flowSubmit(interUrl.collateral.preSubmit, interUrl.collateral.submit2next, './Modal/task/myTask/index.html', carCheckOutId);
					}
				});
		} else {
			doAjax(interUrl.collateral.shippingApply, $.extend(data, $("#collectionForm_2").values(), dataEmpty),
				function (res) {
					$("#responData, #keyId").val(res.data);
					var carCheckOutId = {carCheckoutId: res.data}
					if (num == 2) {
						flowSubmit(interUrl.collateral.preSubmit, interUrl.collateral.submit2next, './Modal/task/myTask/index.html', carCheckOutId);
					}
				});
		}
	}
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