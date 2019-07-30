var table_1, indexSort, accumulateHandle;
//获取银行列表
	$("#bankId").getBankAll();
//获取机构列表
	$("#orgId").getOrg();
table_1 = function(params) {
        tableData(params, $("#searchForm").values(),  interUrl.postLoan.courtApplyList);
}
// indexSort = function (value, row, index) {
// 	return index + 1;
// };
/* num:1 为保存； 2 为提交*/
//保存
$("#btn-save").click(function(){
	save_btn(1);
});
//表单提交
$("#btn-submit").click(function() {
	save_btn(2);
});
function save_btn(num){
	var arr = $("#table").bootstrapTable('getSelections');
	if(arr.length == 1) {
		var obj = arr[0];
		var data = {
			businessGroupId: obj.userGroupId,
			businessGroupName: obj.userGroupName,
			launchUserId: obj.launchUserId,
			launchUserName: obj.launchUserName,
			customerId: obj.customerId,
			customerName: obj.customerName,
			cardType: obj.cardType,
			cardNo: obj.cardNo,
			mobile: obj.mobilePhone,
			projectId: obj.projectId,
			projectNo: obj.projectNo,
			plateNo: obj.plateNo,
			carFrameNo: obj.carFrameNo,
			plateArea: obj.plateArea,
			carModelName: obj.carInfo,
			bankId: obj.coBankId,
			bankName: obj.coBankName,
			orgId: obj.launchOrgId,
			orgName: obj.launchOrgName
		}
		if ($("#collectionForm_2").valid()) {
			comn.ajax({
				url: interUrl.trailer.trailerApply,
				data: $.extend($("#collectionForm_2").values(), data),
				success: function (res) {
					$("#trailerApplyId, #keyId").val(res.data);
					var towCarId = {towCarId: res.data};
					if (num == 2) {
						flowSubmit(interUrl.trailer.preSubmit, interUrl.trailer.submit2next, './Modal/task/myTask/index.html', towCarId);
					}
				}
			});
		}
	} else {
		oppSureModal("请选择一条贷款记录！");
		$("#sureOption").unbind("click").click(function () {
			$("#sureModal").modal("hide");
		});
	}
}
//取消按钮事件
	$("#btn-cancel").unbind('click').click(function() {
		comn.closeTab();
	});
//数据范围更改时，是否显示未抵押天数
$(document).on("change", "#type", function(){
	$(this).val() == "3" ? $("#BeyondDays").removeClass("hide").find("input").val("45") : $("#BeyondDays").addClass("hide").find("input").val("");
});

//清空查询条件
$("#reset_btn").click(function() {
	$("#BeyondDays").addClass("hide").find("input").val("");
})

$("#table").bootstrapTable({
	"undefinedText": "--",
	"classes": "table-striped table-hover table",
	"pagination": true,
	"sidePagination": "server",
	"queryParams": "queryParams",
	"paginationFirstText": "第一页",
	"paginationPreText": "上一页",
	"paginationNextText": "下一页",
	"paginationLastText": "最后一页",
	"clickToSelect": true,
	"pageNumber":  1,
	"pageSize": 5,
	"pageList": [5,10,25,50,100,500,1000],
	"height": "300"
});