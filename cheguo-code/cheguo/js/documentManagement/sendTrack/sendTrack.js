/**
 * Created by yubowen on 2018/10/29.
 */
var dataLoad_1, handle, tableEvent,isManager,flag = false,args = comn.getArgs(),durationStatus,durationCollectionMethod,dateLimit,fileListFilter,filterTime;
dataLoad_1 = function(params) {
	var p;
	p = params.data;
	var sum = 0;
	var data = $("#searchForm").values()
	data.fileLists && data.fileLists.map(item => sum+=+item)
	sum == 0? sum = null:'';
	return comn.ajax({
		url: interUrl.report.sendTailAfter,
		data: $.extend($("#searchForm").values(), {fileLists:sum,recipientStatusList:data.recipientStatusList && data.recipientStatusList.join(',')},p),
		success: function(res) {
			params.success({
				'total': res.totalItem,
				rows: res.data
			});
			return params.complete();
		}
	});
};

durationStatus = function (value, row, index) {
	return ["","未收到", "资料缺失","已收件"][value] || null;
}
fileListFilter = function (value, row, index) {
	return {
		"1":'抵押资料',
		"2":'合同资料',
		"3":'抵押资料,合同资料',
		"4":'抵押委托书',
		"8":'还款卡',
		"16":'抵押合同',
		}[value] || null;
}
dateLimit = function (value, row, index) {
	return ["","12期","18期", "24期","36期"][value] || null;
}
filterTime = function (value, row, index) {
	return value?value.slice(0,10) : null;
}
durationCollectionMethod = function (value, row, index) {
	return ["","按登记", "按收件"][value] || null;
}

tableEvent = {
	"click .handleRegister": function(e, a, item, index) {
		console.log(item)

		$("#addUser").find("select[name=processMethod]").siblings('label').remove();
		$("#addUser").find("input[name=processFinishTime]").siblings('label').remove();
		$("#addUser").find("select[name=processMethod]").parent().removeClass('has-error');
		$("#addUser").find("input[name=processFinishTime]").parent().removeClass('has-error');


		$("#codeName").val(item.processMethod || '')
		$("#billListId").val(item.billListId);
		$("#processFinishTime").val(item.processFinishTime || '');

		$("#addUser").modal("show");

		$("#codeName").unbind('change').change(function () {
			$("#codeName2").val($("#codeName").val())
			// $('#addUserForm .handle-style').selectpicker('refresh');
		})

	},

};



handle = function(value, row, index) {
	if (row.recipientStatus == 1 || row.recipientStatus ==2) {
		return ["<div class='btn-group btn-group-xs'>",'<button type="button" class="btn btn-primary btn-xs' +
		' handleRegister">处理登记</button>' , "</div>"].join('');
	}
};

var refresh=function () {
	$("#companyId2").getCompany( function() {
		$('.selectpicker').selectpicker('refresh');
	});
	$("#managementremark").attr('value','');
	$("#managementremark").text('');
	$("#managementstatus").attr('value',1);
	$("#billListId").attr('value','');
	$("#managementdays").attr('value','')
}


$(function(){
	$("#companyId").getCompany().change(function() {
		if(this.value=="") return $("#groupId").html('<option value="" selected>--请选择--</option>');
		return $("#groupId").getGroup(this.value);
	});

	$("#save").unbind('click').click(function() {
		var flag = true

		if (!$("#codeName").val()) {
			$("#addUser").find("select[name=processMethod]").parent().addClass('has-error').append('<label' +
				' id="assetPackageAmount-error" class="error" for="orgId"><i class="glyphicon' +
				' glyphicon-remove-sign"></i>&nbsp;请选择处理方式</label>');
			flag = false
		}else{
			$("#addUser").find("select[name=processMethod]").siblings('label').remove();
			$("#addUser").find("select[name=processMethod]").parent().removeClass('has-error');
			// return true;
		}
		if (!$("#processFinishTime").val()) {
			$("#addUser").find("input[name=processFinishTime]").parent().addClass('has-error').append('<label' +
				' id="assetPackageAmount-error" class="error" for="orgId"><i class="glyphicon' +
				' glyphicon-remove-sign"></i>&nbsp;请选择时间</label>');
			flag = false
		}else{
			$("#addUser").find("input[name=processFinishTime]").siblings('label').remove();
			$("#addUser").find("input[name=processFinishTime]").parent().removeClass('has-error');
			// return true;
		}
		if(flag){
			var data,url;
			data = $("#addUserForm").values();
			// data.processMethod = ''
			url = interUrl.report.handleRegistration
			comn.ajax({
				url: url,
				data: data,
				success: function(res) {
					tip({
						content: "保存成功!!"
					});
					flag = false;
					$("#addUser").modal("hide");
					$("#table").bootstrapTable("refresh");
				}
			});
		}
	});
	if(args['orgId']){
		$("#companyId2").off('change').on('change',function(){
			$(this).selectpicker('val', args['orgId']);
			$("#companyId2").off('change').on('change',function(){
				$('#table').bootstrapTable({
					classes: "table-striped table-hover table",
					clickToSelect: true,
					pagination: true,
					paginationFirstText: "第一页",
					paginationLastText: "最后一页",
					paginationNextText: "下一页",
					paginationPreText: "上一页",
					queryParams: "queryParams",
					sidePagination: "server",
					undefinedText: "--"
				});
				$("#companyId2").off('change').on("change", function() {
					var code = $(this).find("option:selected").attr('value');
					$("#groupId2").getGroup(code);
				});
				$("#groupId2").off('change');
			});
			$("#groupId2").getGroup(args['orgId'], args["businessGroupId"]);
		});
		$("#companyId2").getCompany( function() {
			$('.selectpicker').selectpicker('refresh');
			$(this).selectpicker('val', args['orgId']);
		});
	}else{
		$("#companyId2").getCompany( function() {
			$('.selectpicker').selectpicker('refresh');
		});
		$('#table').bootstrapTable({
			classes: "table-striped table-hover table",
			clickToSelect: true,
			pagination: true,
			paginationFirstText: "第一页",
			paginationLastText: "最后一页",
			paginationNextText: "下一页",
			paginationPreText: "上一页",
			queryParams: "queryParams",
			sidePagination: "server",
			undefinedText: "--"
		});

		$("#companyId2").off('change').on("change", function() {
			var code = $(this).find("option:selected").attr('value');
			console.log(code)
			if (code !== '') {
				$("#companyId2-error").remove();
				$(this).parents(".has-error").removeClass("has-error");
			}
			$('#orgName').attr('value',$('#companyId2 option:selected').text())
			$("#groupId2").getGroup(code);
			if ($('#orgName').val()=="--请选择--"){
				$("#groupId2").html('<option value="" selected>--请选择--</option>')
			}
		});
		$("#groupId2").change(function () {
			$('#businessGroupName').attr('value',$('#groupId2 option:selected').text())
		})
		// $("#groupId2").off('change');
	}

	$("#resetBtn").click(function () {
		$("#recipientStatusList").selectpicker('val', []);
		$("#fileLists").selectpicker('val', []);
		$(".filter-option").html('--请选择--')
	})
	$("#orgId").getOrg( function() {
		$('.selectpicker').selectpicker('refresh');
	});
	$("#bankId").getBankAll(function() {
		$('.selectpicker').selectpicker('refresh');
	});
	setTimeout(()=>{
		$(".filter-option").html('--请选择--')
	},0)
	$("#codeName").getWords2('SendTailAfterProcessMethod',function () {
		// $('#addUserForm .handle-style').selectpicker('refresh');
	})
});