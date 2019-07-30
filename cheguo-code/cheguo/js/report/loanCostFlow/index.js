var dataLoad_1;
var uId = comn.user.uid;
var args = comn.getArgs();
dataLoad_1= function(params){
  var p;
  p = params.data;
  var o = $("#searchForm").values();
    o.loanInfoCooperationBankId = $("#loanInfoCooperationBankId").val() ? ($("#loanInfoCooperationBankId").val()).join(",") : '';
  comn.ajax({
    url: interUrl.mockList || interUrl.report.businessQuery,
    data: $.extend(o, p, {
      uId : uId
    }),
    success: function(res) {
      params.success({
        'total': res.totalItem,
        'rows': res.data
      });
      params.complete();
    }
  });
};
function total() {
    var o = $("#searchForm").values();
    o.loanInfoCooperationBankId = $("#loanInfoCooperationBankId").val() ? ($("#loanInfoCooperationBankId").val()).join(",") : '';
  comn.ajax({
    url: interUrl.mockList || interUrl.report.queryBusinessStatis,
    data: $.extend(o, {uId: uId}),
    success: function (res) {
      $("#getForm").values(res.data);
    }
  });
};
total();
$("#btn-search").click(function(){
  $('#getForm')[0].reset();
  total();
})
tableEvent = {
	"click .info": function(e, a, item, index) {
		console.log(item)
		return comn.addTab({
			title:"贷款详情",
			href: "./Modal/customManage/customer/loanDetail.html?id="+ item.loanInfoProjectId +"&projectId=" + item.loanInfoProjectId +"&loanApplyId="+ item.loanInfoProjectId +"&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY"
		})
	}
};

handle = function(value, row, index) {
	return ["<button type='button' class='btn btn-primary btn-xs info'>查看详情</button>"].join("");
};

$(function() {
    var dataArr =[["#financeChannel", "FinanceChannelType"]];
    $.getCommonMethodPort(dataArr);
    $("#dealerGroupId").getDealerGroup();
  $("#searchForm").values(args);
  if(args['loanBranchCompanyId']){
    $("#loanBranchCompanyId").off('change').on('change',function(){
        $(this).selectpicker('val', args['loanBranchCompanyId']);
      $("#loanBusinessGroupId").off('change').on('change',function(){
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
        $("#loanBranchCompanyId").off('change').on("change", function() {
          var code = $(this).find("option:selected").attr('value');
          $("#loanBusinessGroupId").getGroup(code);
        });
        $("#loanBusinessGroupId").off('change');
      });
      $("#loanBusinessGroupId").getGroup(args['loanBranchCompanyId'], args["loanBusinessGroupId"]);
    });
    //$("#loanBranchCompanyId").getOrg(args['loanBranchCompanyId']);
      $("#loanBranchCompanyId").getOrg( function() {
          $('.selectpicker').selectpicker('refresh');
          $(this).selectpicker('val', args['loanBranchCompanyId']);
      });
  }else{
    //$("#loanBranchCompanyId").getOrg();
      $("#loanBranchCompanyId").getOrg( function() {
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

    $("#loanBranchCompanyId").off('change').on("change", function() {
      var code = $(this).find("option:selected").attr('value');
      $("#loanBusinessGroupId").getGroup(code);
    });
    $("#loanBusinessGroupId").off('change');
  }
    $("#loanInfoCooperationBankId").getBankAll(function() {
        $('.selectpicker').selectpicker('refresh');
    });
  $('#exportBtn').click(function(){
    var search=$("#searchForm").serialize();
    var downLink = interUrl.basic + interUrl.report.businessExport + "?" + search + '&uId=' + uId +'&exportType=2';
    console.log(downLink);
    window.open(downLink, "_blank");
  });
  $("#resetBtn").click(function(){
      $(".filter-option").html("尚未选择");
      $("#loanInfoCooperationBankId").selectpicker('val', []);
  })
    //渠道来源
    // $(document).on("change","#channelSource",function(){
    //     var v = $(this).val();
    //     if(v === "2") {
    //         var _v = $("input[name='isDealerGroup']:checked").val();
    //         if (_v === undefined){
    //             $("#isDealerGroup").addClass("hide");
    //         } else if ( _v === "0"){
    //             $("#isDealerGroup").addClass("hide");
    //             $("select[name=dealerGroupId], input[name=dealerGroupName]").prop("disabled", "disabled");
    //         } else {
    //             $("#isDealerGroup").removeClass("hide");
    //             $("select[name=dealerGroupId], input[name=dealerGroupName]").prop("disabled", false);
    //         }
    //         $("#isBranchMarketing").removeClass("hide");
    //         //$("input[name='isDealerGroup']:checked").trigger("click");
    //         $("select[name=dealerGroupId], input[name=dealerGroupName]").val("");
    //         $("input[name=isDealerGroup]").prop("disabled", false);
    //     } else if(v === "3") {
    //         $("#isBranchMarketing").addClass("hide");
    //         $("#isDealerGroup").removeClass("hide");
    //         $("select[name=dealerGroupId], input[name=dealerGroupName]").prop("disabled", false);
    //         $("input[name=isDealerGroup]").prop("disabled", "disabled");
    //     } else {
    //         $("#isBranchMarketing, #isDealerGroup").addClass("hide");
    //         $("select[name=dealerGroupId], input[name=dealerGroupName], input[name=isDealerGroup]").prop("disabled", "disabled");
    //
    //     }
    // });
    //有无经销商集团
    // $(document).on("click", "input[name=isDealerGroup]", function(){
    //     var _this = $(this);
    //     if ( _this.val() === "0"){
    //         $("#isDealerGroup").addClass("hide");
    //         $("select[name=dealerGroupId], input[name=dealerGroupName]").prop("disabled", "disabled");
    //     } else {
    //         $("#isDealerGroup").removeClass("hide");
    //         $("select[name=dealerGroupId], input[name=dealerGroupName]").prop("disabled", false);
    //     }
    // });
});