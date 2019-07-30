var postData = comn.getArgs();
var type = postData.type;
//根据type类型获取表单数据
if(type === "add") {
	$("#insuranceCompanyId").getInsurance();
	$("#projectId").val(postData.projectId);
	save_Values (interUrl.insurance.loanInsuranceInfoAdd);
	//获取当前操作用户
	getUser();
} 
else {
	if(type === "see") {
		$("#noChange").attr("disabled", true);
	}
	comn.ajax({
		url: interUrl.insurance.loanInsuranceInfoToUpdate,
		data: {
			id: postData.id
		},
		success: function (res) {
			$("#loanInsuranceForm").values(res.data);
			$("#insuranceCompanyId").getInsurance(res.data.insuranceCompanyId);
			var htmlTemp = "";
    		$('#insuranceInfoTable tbody').html("");
			for (var i = 0; i < res.data.insuranceInfoDetailList.length; i += 1) {
                    var item = res.data.insuranceInfoDetailList[i];
                    //判断字段是否为空
                    var insuranceFee = item.insuranceFee == null ? '' : item.insuranceFee;
                    var insuranceMoney = item.insuranceMoney == null ? '' : item.insuranceMoney;
					var isDelete = (type === "see" ? "" : "删除");
                    htmlTemp += "<tr>" + 
                    				"<td data-name='index'><span>" + (i + 1) +
			                    		"</span><input type='hidden' class='insuranceTypeId' name='insuranceInfoDetailList[" + i + "].insuranceTypeId' date-rale='"+ item.id +"' value='" + item.insuranceTypeId + "'/>" +
			                    	"</td>" +
			                    	"<td class='id hidden'>" + item.insuranceTypeId + "</td>" +
			                   		"<td>" + item.insuranceTypeName +
			                   			"<input type='hidden' class='insuranceName' name='insuranceInfoDetailList[" + i + "].insuranceTypeName' value='" + item.insuranceTypeName + "'/>" +
			                   		"</td>" +
			                   		"<td>" +
			                   			"<input type='text' class='insuranceFee required' name='insuranceInfoDetailList[" + i + "].insuranceFee' value='" + insuranceFee + "'/>" +
			                   		"</td>" +
			                   		"<td>" +
			                   			"<input type='text' class='insuranceMoney required' name='insuranceInfoDetailList[" + i + "].insuranceMoney' value='" + insuranceMoney + "'/>" +
			                   		"</td>" +
			                   		"<td><a href='javascript:;' data-id='" + item.id + "'class='removeLoanInsuranceType'>" + isDelete + "</a></td>" +
		                   		"</tr>"
                }
            $('#insuranceInfoTable tbody').append(htmlTemp);
            var insuranceFeeTotal = getTotalInsuranceFee();
            $("#insuranceFeeTotal").val(insuranceFeeTotal);
		}
	});
	save_Values (interUrl.insurance.loanInsuranceInfoUpdate);
}

//获取projectId
	$("#projectId").val(postData.projectId);
//保险状态获取
	$("#insuranceStatus").val(comn.cache.insuranceStatus);
	$("#bankName").val(comn.cache.bankName);
/////	
	
//引入并初始化swiper组件
	getInsuranceImgs ();
//获取当前操作时间
    $("#insuranceStartTime").getToday();
    $("#insuranceEndTime").getYear1Day1();
//拉取table表格数据
	$('.insuranceInfoTable-control').on('change', function () {
		//table 是否替换判断tbody是否为空
		var tableJudgeLength = $('#insuranceInfoTable tbody tr').length;
		if (tableJudgeLength == 0) {
			getInsuranceInfoTable();
		} else {
			$("#sureModal").modal("show");
			$("#sureBtn").unbind("click").click(function(){
		    	getInsuranceInfoTable();
		    	$("#sureModal").modal("hide");
		    });
		}
	});
	$('.insuranceInfoTable-control-company').on('change', function () {
		//table 是否替换判断tbody是否为空
		var tableJudgeLength = $('#insuranceInfoTable tbody tr').length;
	    if (tableJudgeLength == 0) {
			getInsuranceInfoTable();
		} else {
			$("#sureModal").modal("show");
			$("#sureBtn").unbind("click").click(function(){
		    	getInsuranceInfoTable();
		    	$("#sureModal").modal("hide");
		    });
		}
	});
//重新获取table表单数据
	$("#reLoadTable").unbind("click").click(function(){
		getNewInsuranceInfoTable();
		var total = 0;
		$("#insuranceInfoTable").find(".insuranceFee").each(function(){
			total += parseInt($(this).val()) || 0;
		});
        $("#insuranceFeeTotal").val(total);
	});
//表单字段有修改时重新获取保费总额
	$("#insuranceInfoTable").on("change", ".insuranceFee", function () {
		var insuranceFeeTotal = getTotalInsuranceFee();
        $("#insuranceFeeTotal").val(insuranceFeeTotal);
	});
//table删除事件
$("#insuranceInfoTable").on("click", ".removeLoanInsuranceType", function () {
    $(this).parents("tr").remove();
    $("#insuranceInfoTable tbody tr").each(function (index) {
        $(this).find("td[data-name='index'] span").html(index + 1);
        $(this).find("input.insuranceTypeId").attr("name", "insuranceInfoDetailList[" + index + "].insuranceTypeId");
        console.log($(this).find("input.insuranceTypeName"));
        $(this).find("input.insuranceName").attr("name", "insuranceInfoDetailList[" + index + "].insuranceTypeName");
        $(this).find("input.insuranceFee").attr("name", "insuranceInfoDetailList[" + index + "].insuranceFee");
        $(this).find("input.insuranceMoney").attr("name", "insuranceInfoDetailList[" + index + "].insuranceMoney");
        var insuranceFeeTotal = getTotalInsuranceFee();
        $("#insuranceFeeTotal").val(insuranceFeeTotal);
    });
});
//select变动时，将获取的值付给隐藏input
    $(document).on("change", "select", function(){
        var text = $(this).find("option:selected").text();
        if(text === "--请选择--"){
                text = "";
        }
        $(this).parent().find("input[type='hidden']").val(text);
    });
//页面数据保存提交
function save_Values (url) {
	$("#btn-save").click(function () {

		var insuranceNo=$('#insuranceNo').val();
		var g =  /^[\da-zA-Z]*$/g;
		var insuranceFee = /^-?\d+\.?\d{0,2}$/;
//		var insuranceMoney = /^-?\d+$/;
		var flag = true;
		$("#insuranceInfoTable").find(".insuranceFee").each(function() {
			if($(this).val() == "") {
				flag = false;
				return false;
			}
			if(!insuranceFee.test($(this).val())) {
				alert("保费最多保留2位小数");
				flag = false;
				return false;
			}
		});
		
		$("#insuranceInfoTable").find(".insuranceMoney").each(function() {
			
			if($(this).val() == "") {
				flag = false;
				return false;
			}
			if(!insuranceFee.test($(this).val())) {
				alert("保额最多保留2位小数");
				flag = false;
				return false;
			}
		});
		
		if(!g.test(insuranceNo)){
			alert('保单号输入错误，请输入数字或字母!');
			return;
		}
		if($('#insuranceNo').val().length > 30) {
			alert('保险单号请保留30位');
			return;
		}
		var insuranceStatus=$("#insuranceStatus").val();
		
	    $("#loanInsuranceForm").validate();
	    if($("#loanInsuranceForm").valid()==true){
	    	if(flag) {
	    		comn.ajax({
		            url: url,
		            data: $("#loanInsuranceForm").values(),
		            success: function (res) {
		                tip({content: res.message || '保存成功!'});
		                comn.closeTab();
		            }
		        })
	    	}
	    }
	});
}

$("#bte-cancel").on("click", function() {
	comn.closeTab();
})
//获取险种列表
function getInsuranceInfoTable(id,key) {
    var htmlTemp = "";
    $('#insuranceInfoTable tbody').html("");
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
            	
                for (var i = 0; i < res.data.length; i += 1) {
                    var item = res.data[i];
                    htmlTemp += "<tr>" + 
                    				"<td data-name='index'><span>" + (i + 1) +
			                    		"</span><input type='hidden' class='insuranceTypeId' name='insuranceInfoDetailList[" + i + "].insuranceTypeId'" +"' value='" + item.id + "'/>" +
			                    	"</td>" +
			                    	"<td class='id hidden'>" + item.id + "</td>" +
			                   		"<td>" + item.insuranceName +
			                   			"<input type='hidden' class='insuranceName' name='insuranceInfoDetailList[" + i + "].insuranceTypeName' value='" + item.insuranceName + "'/>" +
			                   		"</td>" +
			                   		"<td>" +
			                   			"<input type='text' class='insuranceFee freeTotal required' name='insuranceInfoDetailList[" + i + "].insuranceFee' />" +
			                   		"</td>" +
			                   		"<td>" +
			                   			"<input type='text' class='insuranceMoney required' name='insuranceInfoDetailList[" + i + "].insuranceMoney' />" +
			                   		"</td>" +
			                   		"<td><a href='javascript:;' data-id='" + item.id + "'class='removeLoanInsuranceType'>删除</a></td>" +
		                   		"</tr>";
                }
                $('#insuranceInfoTable tbody').append(htmlTemp);
                $("#insuranceFeeTotal").val("");
            }
        });
    }
};

function getNewInsuranceInfoTable(id,key) {
    var htmlTemp = "";
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
            	var len = $("#insuranceInfoTable tbody tr").length;
            	var lenIndex = len + 1;
                for (var i = 0; i < res.data.length; i += 1) {
                    var item = res.data[i];
                    var flagInsuranceInfoTable = true;
                    $("#insuranceInfoTable tbody tr").each(function() {
                    	if ($(this).find(".id").text() == item.id) {
                    		flagInsuranceInfoTable = false;
                    	}
                    });
                    if (flagInsuranceInfoTable) {
                    	htmlTemp += "<tr>" + 
                    				"<td data-name='index'><span>" + lenIndex +
			                    		"</span><input type='hidden' class='insuranceTypeId' name='insuranceInfoDetailList[" + len + "].insuranceTypeId'" + "' value='" + item.id + "'/>" +
			                    	"</td>" +
			                    	"<td class='id hidden'>" + item.id + "</td>" +
			                   		"<td>" + item.insuranceName +
			                   			"<input type='hidden' class='insuranceName' name='insuranceInfoDetailList[" + len + "].insuranceTypeName' value='" + item.insuranceName + "'/>" +
			                   		"</td>" +
			                   		"<td>" +
			                   			"<input type='text' class='insuranceFee required' name='insuranceInfoDetailList[" + len + "].insuranceFee' />" +
			                   		"</td>" +
			                   		"<td>" +
			                   			"<input type='text' class='insuranceMoney required' name='insuranceInfoDetailList[" + len + "].insuranceMoney' />" +
			                   		"</td>" +
			                   		"<td><a href='javascript:;' data-id='" + item.id + "'class='removeLoanInsuranceType'>删除</a></td>" +
		                   		"</tr>";
		                len += 1;
                    }
                }
                $('#insuranceInfoTable tbody').append(htmlTemp);
            }
        });
    }
};

//获取系统当前登录用户
function getUser(){
    comn.ajax({
        url: interUrl.user.getUser,
        success: function (res) {
            $("#recorder").val(res.data.realname);
        }
    })
};
//todo
//获取图片展示列表
function getInsuranceImgs () {
	var data = "";
	 comn.ajax({
		    url: 'loanInsuranceRenewal/getDirId',
		    data:{} ,
		    success: function (res) {
		        $('#dirId').val(res.data);
		        var dirId=$('#dirId').val();
		        data = {
		        	loanApplyId: postData.projectId,
		        	dirId: dirId,
		        	fileNamespace: "LOAN",
		        	releventFlow: "LOAN_QUERY",
		        	releventFlowNode: "LOAN_QUERY"
		        };
		        return comn.ajax({
		            url: interUrl.insurance.getInsuranceRenewImags,
		            data: data,
		            success: function (res) {
		            	var swiperHtml = "";
		                for (var i = 0; i < res.data.length; i += 1 ) {
		                	var item = res.data[i];
		                	swiperHtml += "<div class='swiper-slide'>" +"<img src=" + item.filePath +" alt=" + item.fileName + ">" +"</div>";
		                }
		                $(".swiper-wrapper").append(swiperHtml);
		                var swiper = new Swiper('.swiper-container', {
		    		        pagination: '.swiper-pagination',
		    		        paginationClickable: '.swiper-pagination',
		    		        nextButton: '.swiper-button-next',
		    		        prevButton: '.swiper-button-prev',
		    		        spaceBetween: 30
		    		    });
		            }
		        });
		    }
		})
		
}
//计算保费合计
function getTotalInsuranceFee() {
	var insuranceFeeTotal = 0;
	$('.insuranceFee').each(function(){
         insuranceFeeTotal += parseFloat($(this).val()) ? parseFloat($(this).val()) : 0;
    });
    insuranceFeeTotal = insuranceFeeTotal.toFixed(2);
	return insuranceFeeTotal;
};