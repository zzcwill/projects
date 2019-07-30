/**
 * Created by yubowen on 2018/10/25.
 */
var dataLoad_1, handle, tableEvent,isManager,flag = false,args = comn.getArgs(),durationStatus,durationCollectionMethod;

dataLoad_1 = function(params) {
	var p;
	p = params.data;
	return comn.ajax({
		url: interUrl.loanDetail.pledgeConfigList,
		data: $.extend($("#searchForm").values(), p),
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
	return ["停用","启用", ""][value] || null;
}
durationCollectionMethod = function (value, row, index) {
	return ["","按登记", "按收件"][value] || null;
}

tableEvent = {
	"click .changeStats": function(e, a, item, index) {
		comn.ajax({
			url:interUrl.loanDetail.pledgeUpdateStatus,
			data:{
				id:item.id,
				status: item.status == 1?0:1
			},
			success: function (res) {
				tip({
					content: item.status == 1?"停用成功!":"启用成功!"
				});
				$("#table").bootstrapTable("refresh");
			}
		})
	},
	"click .change": function(e, a, item, index) {
		// var configdata = {orgId : item.orgId,orgName:item.orgName,businessGroupId:item.businessGroupId,businessGroupName:item.businessGroupName,days:item.days,remark:item.remark};
		// $("#addUserForm").values(configdata)

		$($("#changeUser .filter-option")[0]).html(item.orgName)
		$($("#changeUser .filter-option")[1]).html(item.coBankName)
		$("#companyId22").attr('value',item.orgId)
		console.log(item)
		$("#orgName2").attr('value',item.orgName)
		$("#coBankId22").attr('value',item.coBankId)
		$("#coBankName2").attr('value',item.coBankName)
		$("#collectionMethod2").attr('value',item.collectionMethod)
		$('#collectionMethod2').selectpicker('refresh');
		$("#fuseRate").attr('value',item.fuseRate)
		$("#startYearMonth2").attr('value',item.startYearMonth)
		$('#startYearMonth2').selectpicker('refresh');

		$("#pledgeOverdueQuantity").attr('value',item.pledgeOverdueQuantity);
		$("#managementid").attr('value',item.id);
		flag = true;
		$("#changeUser").modal("show");

	},

};



handle = function(value, row, index) {
	var str;
	row.status ==1?str = "<button type='button' class='btn btn-primary changeStats'>停用</button>":str = "<button" +
		" type='button'" +
		" class='btn btn-primary changeStats'>启用</button>"+"<button type='button' class='btn btn-primary change' style='margin-left: 10px'>修改</button>"

	// return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>",row.status ==1?sdisabled:senable, "</ul>", "</div>"].join("");
	return ["<div class='btn-group btn-group-xs'>",str, , "</div>"].join("");

};

var refresh=function () {
	$("#companyId2").getCompany( function() {
		$('#companyId2').selectpicker('refresh');
	});
	$("#coBankId2").getBranchBankList( function() {
		$('#coBankId2').selectpicker('refresh');
	});
	$("#managementremark").attr('value','');
	$("#managementremark").text('');
	$("#managementstatus").attr('value',1);
	$("#managementid").attr('value','');
	$("#managementdays").attr('value','')
}
var chargeValues = function (arr1,arr2,method) {
	$("#"+method).find("input[name="+arr1[1]+"]").siblings('label').remove();
	$("#"+method).find("input[name="+arr1[1]+"]").parent().removeClass('has-error');
	$("#"+method).find("input[name="+arr2[1]+"]").siblings('label').remove();
	$("#"+method).find("input[name="+arr2[1]+"]").parent().removeClass('has-error');
	var flag = true
	// 判断熔断值
	if (isNaN($("#"+arr1[0]).val()) || +$("#"+arr1[0]).val()>100 || +$("#"+arr1[0]).val()<=0) {
		$("#"+method).find("input[name="+arr1[1]+"]").parent().addClass('has-error').append('<label' +
			' id="assetPackageAmount-error" class="error" for="orgId"><i class="glyphicon' +
			' glyphicon-remove-sign"></i>&nbsp;熔断值需大于0,小于等于100</label>');
		flag = false
	}
	// 判断允许超期笔数
	if (isNaN($("#"+arr2[0]).val()) ||  Math.ceil(+$("#"+arr2[0]).val()) != (+$("#"+arr2[0]).val()) || +$("#"+arr2[0]).val() <= 0) {
		$("#"+method).find("input[name="+arr2[1]+"]").parent().addClass('has-error').append('<label' +
			' id="assetPackageAmount-error" class="error" for="orgId"><i class="glyphicon' +
			' glyphicon-remove-sign"></i>&nbsp;请输入正整数</label>');
		flag = false
	}
	return flag
}
$(function(){
	$("#companyId").getCompany().change(function() {
		if(this.value=="") return $("#groupId").html('<option value="" selected>--请选择--</option>');
		return $("#groupId").getGroup(this.value);
	});
	$("#add").click(function() {
		refresh()
		$('#title').text('超抵风险设置')
		$("#addUser").modal("show");
	});
	$("#save").unbind('click').click(function() {
		var arr = ["companyId2","coBankId2",]
		var names = ['orgId','coBankId']
		var arr2 = ["请选择业务机构","请选择合作分行"]
		var flag = true;
		for (var i = 0; i < arr.length; i++) {
			$("#addUser").find("select[name="+names[i]+"]").siblings('label').remove();
			$("#addUser").find("select[name="+names[i]+"]").parent().removeClass('has-error');
			if (!$("#"+arr[i]).val()) {
				$("#addUser").find("select[name="+names[i]+"]").parent().addClass('has-error').append('<label' +
					' id="assetPackageAmount-error" class="error" for="orgId"><i class="glyphicon' +
					' glyphicon-remove-sign"></i>&nbsp;' + arr2[i] +
					'</label>');
				flag = false
			}else{
				$("#addUser").find("select[name="+names[i]+"]").siblings('label').remove();
				$("#addUser").find("select[name="+names[i]+"]").parent().removeClass('has-error');
				// return true;
			}
		}
		var arr1 = ["managementdays","fuseRate"]
		var arr2 = ["managementdays3","pledgeOverdueQuantity"]
		chargeValues(arr1,arr2,'addUser')


		if(flag && chargeValues(arr1,arr2)){
			var data,url;
			data = $("#addUserForm").values();
			data.coBankId = +data.coBankId
			data.fuseRate = +data.fuseRate
			// data.orgId = +data.orgId
			data.pledgeOverdueQuantity = +data.pledgeOverdueQuantity
			console.log(data)
			url = interUrl.loanDetail.pledgeAddConfig
			comn.ajax({
				url: url,
				data: data,
				success: function(res) {
					tip({
						content: "新增成功!!"
					});
					flag = false;
					$("#addUser").modal("hide");
					$("#table").bootstrapTable("refresh");
				}
			});
		}
	});
	$("#save2").unbind('click').click(function() {
		var arr1 = ["fuseRate","fuseRate"]
		var arr2 = ["pledgeOverdueQuantity","pledgeOverdueQuantity"]

		if(chargeValues(arr1,arr2,"changeUser")){
			var data,url;
			data = $("#addUserForm2").values();
			data.coBankId = +data.coBankId
			data.fuseRate = +data.fuseRate
			data.id = +data.id
			data.orgId = +data.orgId
			data.pledgeOverdueQuantity = +data.pledgeOverdueQuantity
			console.log(data)

			url = interUrl.loanDetail.pledgeUpdateConfig
			comn.ajax({
				url: url,
				data: data,
				success: function(res) {
					tip({
						content: "保存成功!!"
					});
					flag = false;
					$("#changeUser").modal("hide");
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
			});
		});
		$("#companyId2").getCompany( function() {
			$('#companyId2').selectpicker('refresh');
			$(this).selectpicker('val', args['orgId']);
		});
	}else{
		$("#companyId2").getCompany( function() {
			$('#companyId2').selectpicker('refresh');
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

		});
		$("#coBankId2").off('change').on("change", function() {
			var code = $(this).find("option:selected").attr('value');
			console.log(code)
			if (code !== '') {
				$("#coBankId2-error").remove();
				$(this).parents(".has-error").removeClass("has-error");
			}
			$('#coBankName').attr('value',$('#coBankId2 option:selected').text())

		});
		$("#groupId2").change(function () {
			$('#coBankName').attr('value',$('#groupId2 option:selected').text())
		})
		// $("#groupId2").off('change');
	}

	$("#orgId").getOrg( function() {
		$('#orgId').selectpicker('refresh');
	});
	$("#coBankId").getBranchBankList(function() {
		$('#coBankId').selectpicker('refresh');
	});
	$("#coBankId2").getBranchBankList(function() {
		$('#coBankId2').selectpicker('refresh');
	});
	console.log(123)
	$("#resetBtn").click(function () {
		$(".filter-option").html('--请选择--')
	})
	$('.date').datetimepicker({
		minView:'year',
		autoclose:true,
		startView:3,
		format: 'yyyy-mm',
		language:'zh-CN'
	});

});

