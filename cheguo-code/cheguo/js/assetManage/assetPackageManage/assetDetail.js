var G_FIELD_DICT, dataLoad_3,handle_1, args = comn.getArgs(), _argsType, _assetsPackageId, _coCompanyId;
if (_argsType !== '' || args["type"]) {
    if (_argsType) {
        args["type"] = _argsType;
        args["assetsPackageId"] = _assetsPackageId;
        args["coCompanyId"] = _coCompanyId;
    }
    if (args["type"] === "assetAdd") {
        args["projectId"] = _projectId;
        args["loanApplyId"] = _loanApplyId;
    }
}
//加载客户数据
dataLoad_3 = function(params) {
  tableData(params, $("#searchForm").values(), interUrl.mockList || interUrl.asset.loanAssetPackageManageList);
};

comn.ajax({
  url: interUrl.asset.getLoanApproveProject,
  data: {
      projectId: args['projectId'],
      assetsPackageId: args["assetsPackageId"]
  },
  success: function(res) {
   return $("#projectInfo").find("form").values(res.data);

  }
});
comn.ajax({
  url: interUrl.asset.getLoanApproveCustomer,
  data: {
    projectId: args['projectId']
  },
  success: function(res) {
   return $("#customerInfo").find("form").values(res.data);
   
   
  }
});

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  var activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
  if (activeTab == "customerInfo") {
    if ($("select[name='maritalStatus']").val()==2) {
      $("#spouseInfo").addClass('hide').removeClass('show');
    }else{
      $("#spouseInfo").addClass('show').removeClass('hide');
    }
  }
});



$(function() {
  args['isFlow'] = "yes";
  args['id'] = args['loanApplyId'];
  args['releventFlow'] = "LOAN_ASSETS_PACKAGE";
  args['releventFlowNode'] = "LOAN_ASSETS_PACKAGE_VIEW_DETAILS";  
  args['space'] = "ASSET_PACKAGE";
  if (args["type"] === "assetAdd") {
      args["space"] = "ASSET_MANAGE_PACKAGE";
      args['releventFlow'] = "ASSET_MANAGE_PACKAGE";
      args['releventFlowNode'] = "ASSET_MANAGE_PACKAGE_ADD_DETAILS";
  };
    if (args["type"] === "assetView") {
        args["space"] = "ASSET_MANAGE_PACKAGE";
        args['releventFlow'] = "ASSET_MANAGE_PACKAGE";
        args['releventFlowNode'] = "ASSET_MANAGE_PACKAGE_VIEW_DETAILS";
    };
});
