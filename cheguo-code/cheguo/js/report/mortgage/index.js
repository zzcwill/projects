var dataLoad_1;
var uId = comn.user.uid;
var args = comn.getArgs();
dataLoad_1= function(params){
	var p;
	p = params.data;
	var o = $("#searchForm").values();
	o.bankId = $("#bankId").val() ? $("#bankId").val() : '';
	comn.ajax({
		url: interUrl.report.queryLoanPledgeReport,
		data: $.extend(o, p),
		success: function(res) {
			params.success({
				'total': res.totalItem,
				'rows': res.data
			});
			params.complete();
		}
	});
};



$(function() {
	$("#dealerGroupId").getDealerGroup();
	$("#searchForm").values(args);
	if(args['orgId']){
		$("#orgId").off('change').on('change',function(){
			$(this).selectpicker('val', args['orgId']);
			$("#groupId").off('change').on('change',function(){
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
				$("#orgId").off('change').on("change", function() {
					var code = $(this).find("option:selected").attr('value');
					$("#groupId").getGroup(code);
				});
				$("#groupId").off('change');
			});
			$("#groupId").getGroup(args['orgId'], args["groupId"]);
		});
		//$("#orgId").getOrg(args['orgId']);
		$("#orgId").getOrg( function() {
			$('.selectpicker').selectpicker('refresh');
			$(this).selectpicker('val', args['orgId']);
		});
	}else{
		//$("#orgId").getOrg();
		$("#orgId").getOrg( function() {
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

		$("#orgId").off('change').on("change", function() {
			var code = $(this).find("option:selected").attr('value');
			$("#groupId").getGroup(code);
		});
		$("#groupId").off('change');
	}
	$("#bankId").getBranchBankList(function() {
		$('.selectpicker').selectpicker('refresh');
	});
	$("#resetBtn").click(function(){
		$(".filter-option").html("尚未选择");
		$("#bankId").selectpicker('val', []);
	})
	$('.date').datetimepicker({
		minView:'year',
		autoclose:true,
		startView:3,
		format: 'yyyy-mm',
		language:'zh-CN'
	});
	// 导出数据
    $('#exportBtn').click(function(){
        var search=$("#searchForm").serialize();
        var downLink = interUrl.basic + interUrl.report.loanPledgeExport + "?" + search;
        window.open(downLink, "_blank");
    });
});
