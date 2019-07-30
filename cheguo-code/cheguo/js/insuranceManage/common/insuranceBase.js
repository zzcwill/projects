var insuracenCompabyId = insuranceType = null;
//拉取table表格数据
	$('.insuranceInfoTable-control').on('change', function () {
		//table 是否替换判断tbody是否为空
		var tableJudgeLength = $('#insuranceInfoTable tbody tr').length;
		if (tableJudgeLength == 0) {
			var text = $(this).find("option:selected").text();
	        if(text === "--请选择--"){
	                text = "";
	        }
	        $("#insuranceTypeName").val(text);
	        insuranceType = $("#insuranceTypeKey").val();
			return;
		} else {
			modalBtnFunc();
		}
	});
	$('.insuranceInfoTable-control-company').on('change', function () {
		//table 是否替换判断tbody是否为空
		var tableJudgeLength = $('#insuranceInfoTable tbody tr').length;
	    if (tableJudgeLength == 0) {
	    	var text = $(this).find("option:selected").text();
	        if(text === "--请选择--"){
	            text = "";
	        }
	        $("#insuranceCompanyName").val(text);
	        insuracenCompabyId = $("#insuranceCompanyId").val();
			return;
		} else {
			modalBtnFunc();
		}
	});
function modalBtnFunc () {

	$("#sureModal").modal("show");
	//点击确定按钮触发事件
	$("#sureBtn").unbind("click").click(function(){
		$('#insuranceInfoTable tbody').html("");
    	$("#sureModal").modal("hide");
    	$("#insuranceFeeTotal").val("");
    	insuranceType = $("#insuranceTypeKey").val();
    	insuracenCompabyId = $("#insuranceCompanyId").val();
		var text = $("#insuranceTypeKey").find("option:selected").text();
		$("#insuranceTypeName").val(text);
    });
    //点击取消按钮触发事件
    $("#cancelBtn").unbind("click").click(function(){
    	backChecked(insuracenCompabyId, insuranceType);
    });
    //点击X按钮触发事件
    $("#closeBtn").unbind("click").click(function(){
    	backChecked(insuracenCompabyId, insuranceType);
    });
}
//弹出窗点击取消时退回原有选中项
function backChecked (companyId, insuranceType) {
	$("#insuranceCompanyId").val(companyId);
	var text = $("#insuranceCompanyId").find("option:selected").text();
        if(text === "--请选择--"){
            text = "";
        }
    $("#insuranceCompanyName").val(text);
    $('.selectpicker').selectpicker('val', companyId);
    $("#insuranceTypeKey").val(insuranceType);
    var text_2 = $("#insuranceTypeKey").find("option:selected").text();
        if(text_2 === "--请选择--"){
            text_2 = "";
        }
    $("#insuranceTypeName").val(text);
}
//保险险种列表全选函数
function checkTableAll_insurance () {
	var insuranceTableLength = $("#insuranceInfoTable tbody tr").length;
	if(insuranceTableLength === "0") {
		$("#checkAll").prop("disabled", true);
	} else {
		$("#checkAll").prop("disabled", false);
	}
	$("#checkAll").change(function() {
		var _this = $(this);
		if(_this.prop("checked") === true) {
			$(".checkBoxS").prop("checked", true);
		} else {
			$(".checkBoxS").prop("checked", false);
		}
	});
}
//保险险种弹窗全选函数
function checkTableAll_insurance_2 () {
	$("#checkAll_2").prop("checked", false);
	var insuranceTableLength = $("#insuranceListTable tbody tr").length;
	if(insuranceTableLength === "0") {
		$("#checkAll_2").prop("disabled", true);
	} else {
		$("#checkAll_2").prop("disabled", false);
	}
	$("#checkAll_2").change(function() {
		var _this = $(this);
		if(_this.prop("checked") === true) {
			$(".checkBoxS_2").prop("checked", true);
		} else {
			$(".checkBoxS_2").prop("checked", false);
		}
	});
}

// $("#insuranceInfoTable").on("change", ".checkBoxS", function () {
// 	var judgeLength = $(".checkBoxS:checked").length;
// 	if(judgeLength === "0") {
// 		$("#delTable").addClass('hide');
// 	} else {
// 		$("#delTable").removeClass('hide');
// 	}
// });
//获取险种列表弹窗
function getNewInsuranceInfoTable(id,key) {
    $('#insuranceListTable tbody').html("");
    var insuranceCompanyId = $('#insuranceCompanyId').val();
    var insuranceTypeKey = $('#insuranceTypeKey').val();
    var insuranceId = $('#id').val();
    if((insuranceCompanyId && insuranceTypeKey) || (id && key)){
        comn.ajax({
            url: interUrl.insurance.loanInsuranceTypeList,
            data: {
                insuranceCompanyId: id || insuranceCompanyId,
                insuranceTypeKey: key || insuranceTypeKey
            },
            success: function (res) {
            	if(res.data.length === 0) {
            		$("#tipText_2").removeClass('hide');
            		$("#insuranceModalTbale").addClass('hide');
					$("#insuranceModal").modal("show");
					$("#sureBtn_2").unbind("click").click(function(){
				    	$("#insuranceModal").modal("hide");
				    });
            	} else {
            		$("#tipText_2").addClass('hide');
            		$("#insuranceModalTbale").removeClass('hide');
            		var htmlTemp0 = "";
            		var lenIndex0 = 1;
	                for (var i = 0; i < res.data.length; i += 1) {
	                    var item = res.data[i];
	                    var flagInsuranceInfoTable = true;
	                    $("#insuranceInfoTable tbody tr").each(function() {
	                    	if ($(this).find(".id").text() == item.id) {
	                    		flagInsuranceInfoTable = false;
	                    	}
	                    });
	                    if (flagInsuranceInfoTable) {
	                    	htmlTemp0 += "<tr>" + 
	                    				"<td>" +
				                   			"<input type='checkBox' class='in-line checkBoxS_2' style='margin: 0, padding:0' />" +
				                   		"</td>" +
	                    				"<td data-name='index'>" + 
	                    					"<span>" + lenIndex0 +
				                    		"</span>" +
				                    	"</td>" +
				                    	"<td class='insuranceListId hidden'>" + item.id + "</td>" +
				                   		"<td class='insuranceListName'>" + item.insuranceName +
				                   		"</td>" +
			                   		"</tr>";
			                lenIndex0 += 1;
	                    }
	                }
	                $('#insuranceListTable tbody').append(htmlTemp0);
	                checkTableAll_insurance_2();
					$("#insuranceModal").modal("show");
					$("#sureBtn_2").unbind("click").click(function(){
						var judgeLength = $(".checkBoxS_2:checked").length;
						if(judgeLength == 0) {
							$("#insuranceModal").modal("hide");
						} else {
							var ids = [];
							var names = [];
							$(".checkBoxS_2:checked").each(function (index) {
								ids.push($(this).parents("tr").find(".insuranceListId").text());
								names.push($(this).parents("tr").find(".insuranceListName").text());
							});
							getInsuranceInfoTable(ids, names);
							checkTableAll_insurance();
							$("#insuranceModal").modal("hide");
						}
				    });
            	}
			}
        });
    }
};
//验证input只输入金额
function moneyTest (value) {
	return value = value.replace(/[^\-?\d.]/g,'');
}

$(document).on("change", "#insuranceStartTime", function() {
	var _value = $(this).val();
	var _valueArr = _value.split("-");
	var newYear = (parseInt(_valueArr[0]) + 1) + "-" + _valueArr[1] + "-" + _valueArr[2];
	$("#insuranceEndTime").val(newYear);
})

$(function () {
  $("#insuranceCompanyId").change(function(){
	$("#insuranceCompanyName").val($(this).find(":selected").text()); 
  });
});
