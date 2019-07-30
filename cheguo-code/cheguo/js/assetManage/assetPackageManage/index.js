var dataLoad_1,dataLoad_2,dataLoad_3, handle_1,handle_2, handle_3, tableEvent, coCompanyId, signStatus;

dataLoad_1 = function(params) {
	tableData(params, $("#searchForm").values(), interUrl.mockList || interUrl.asset.loanAssetPackageManage,function(){
    $("#table").off("click-row.bs.table").on('click-row.bs.table', function (e, row, $element) {
      assetsPackageId=row.id;
        coCompanyId = row.coCompanyId;
      //$("#table2, #table3").bootstrapTable("destroy").bootstrapTable(comn.table);
      var activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
      if (activeTab == "home") {
        $("#table2").bootstrapTable("destroy").bootstrapTable(comn.table);
      } else if (activeTab == "tab") {
        $("#table3").bootstrapTable("destroy").bootstrapTable(comn.table);
      }
      $("#tablebox").removeClass('hide');
    });
    $('a[data-toggle="tab"]').off("shown.bs.tab").on('shown.bs.tab', function (e) {
      var activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
      if (activeTab == "home") {
        $("#table2").bootstrapTable("destroy").bootstrapTable(comn.table);
      } else if (activeTab == "tab") {
        $("#table3").bootstrapTable("destroy").bootstrapTable(comn.table);
      }
    });


  });
};

dataLoad_2 = function(params) {
  tableData(params, {assetsPackageStatus: "1",assetsPackageId:assetsPackageId, coCompanyId: coCompanyId}, interUrl.mockList || interUrl.asset.getInAssetsPackage);
};
dataLoad_3 = function(params) {
  tableData(params, {assetsPackageStatus: "2",assetsPackageId:assetsPackageId, coCompanyId: coCompanyId}, interUrl.mockList || interUrl.asset.getInAssetsPackage);
};

tableEvent = {
  "click .info": function(e, a, item, index) {
    return comn.addTab({
      title:"查看详情",
      href: "./Modal/assetManage/assetPackageManage/assetDetail.html?loanApplyId="+item.relativeApplyId1+"&projectId="+item.projectId +"&assetsPackageId="+ assetsPackageId + "&space=LOAN" + "&releventFlowNode=ESTIMATE_LAUNCH&releventFlow=SECOND_HAND_CAR_ESTIMATE_FLOW" + '&showLogoDelete=1'
    });
  },
  "click .add": function(e, a, item, index) {
    return comn.addTab({
      title:"添加资产",
      href: "./Modal/assetManage/assetPackageManage/add.html?id="+item.id +"&coCompanyId="+ item.coCompanyId
    });
  },
  "click .delete": function(e, a, item, index) {
    $("#sure").modal("show");
    return $("#OK").unbind('click').click(function() {
      return comn.ajax({
        url: interUrl.asset.loanAssetDel,
        data: {
          projectId: item['projectId'],
          assetsPackageId: assetsPackageId
        },
        success: function(res) {
          tip({
            content: "删除成功!!"
          });
          $("#sure").modal("hide");
          $("#table2").bootstrapTable('selectPage', 1);
        }
      });
    });
  },
  "click .lockMoney" : function (e, a, item, index) {
    $("#sure_lock").modal("show");
    $("#tipMessage").html("是否将资产余额锁定为【"+ item.assetBalanceAmount +"】，直至资产包变为”融资中“状态才自动解锁更新此资产余额，请确认是否锁定？");
     return $("#btn_lock").unbind('click').click(function() {
        return comn.ajax({
          url: interUrl.asset.lockAssetsPackage,
          data: {
            assetsPackageId: item['id']
          },
          success: function(res) {
            tip({
              content: "锁定成功!!"
            });
            $("#sure_lock").modal("hide");
            $("#table").bootstrapTable('refresh');
          }
      });
    });
  },
  'click .view': function (e,a,item,index) {
    return comn.addTab({
      title: '查看泰融电子签章',
      href: item.filePath
    })
  }
};

switchStatus = function(value, row, index){
	console.log(row.status);
}

orgName = function(value, row, index){
	var val = value;
	if(value.indexOf("中安金控资产管理有限公司") != -1){
		val = value.replace("中安金控资产管理有限公司", "");
	}
	return val;
}

switchColor = function(value, row, index) {
  var str = "";
  if(row['assetBalanceAmount'] < row['assetPackageAmount']){
    str = "<span class='text-danger'>" + row['assetBalanceAmount'] + "</span>";
  }else{
    str = "<span class='text-navy'>" + row['assetBalanceAmount'] + "</span>";
  }
  return str;
};
////泰融签约状态
//signStatus = function (value) {
//  return ['未签约','有效','无效'][value]
//};
handle_1 = function(value, row, index) {
  var add = "<button type='button' class='btn btn-primary btn-xs add'>添加资产</button>";
  if (row.status == 1) {
    if (row.islocked == 1) {
      return [add + "<button type='button' class='btn btn-primary btn-xs lockMoney' style='margin-left: 5px' disabled>锁定资产余额</button>"].join("");
    } else {
      return [add + "<button type='button' class='btn btn-primary btn-xs lockMoney' style='margin-left: 5px'>锁定资产余额</button>"].join("");
    }
  }
  if (row.status==3) {
    return ["<button type='button' class='btn btn-primary btn-xs add' disabled>添加资产</button>"].join("");
  }else {
    return add;
  }
};

handle_2 = function(value, row, index) {
  return ["<div class='btn-group btn-group-xs'>",
    "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作",
    "<span class='caret'></span>",
    "<span class='sr-only'>下拉切换</span>",
    "</button>",
    "<ul class='dropdown-menu' role='menu'>",
    "<li><a class='info'>查看详情</a></li>",
    "<li><a class='delete'>删除资产</a></li>",
    (function (){
      if(row.status == 1 || row.status == 2) {
        return "<li><a class='view'>查看泰融电子签章</a></li>"
      }else {
        return ''
      }
    })(),"</ul>", "</div>"].join("");
};

handle_3 = function(value, row, index) {
  function viewSignature() {
    if(row.status == 1 || row.status == 2) {
      return ['<div class="dropdown">',
        '  <button class="btn btn-primary btn-xs dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">',
        '操作',
        '    <span class="caret"></span>',
        '  </button>',
        '  <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">',
        '    <li><a href="javascript:;" class="info">查看详情</a></li>',
        '    <li><a href="javascript:;" class="view">查看泰融电子签章</a></li>',
        '  </ul>',
        '</div>'].join("");
    }else{
      return ["<button type='button' class='btn btn-primary btn-xs info'>查看详情</button>"].join("");
    }
  }
  return viewSignature();
};

$(function () {
  $(".coCompanyId").getCooperationUnit();
})

//导出
$('#exportBtn').click(function(){
  var downLink = interUrl.basic + interUrl.asset.export + "?assetsPackageId=" + assetsPackageId;
  console.log(downLink);
  window.open(downLink, "_blank");
});
