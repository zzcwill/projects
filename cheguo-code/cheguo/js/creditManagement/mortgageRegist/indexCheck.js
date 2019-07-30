var dataLoad_1, dataLoad_2, handle_1, handle_2, tableEvent,pledgeReturnStatus;

//修改表格统一配置参数
var tableConfig = {};
$.map(comn.table, function (v, k) {
    tableConfig[k] = v;
});
tableConfig['height'] = "300";
tableConfig['pagination'] = false;
$("#table_data").bootstrapTable(tableConfig);

dataLoad_1 = function(params) {
  return tableData(params, $.extend($("#searchForm").values(), { pledgeStatus: 1,checkStatus: 0}), interUrl.mockList || interUrl.creditManagement.mortageList);
};

dataLoad_2 = function(params) {
  return tableData(params, $.extend($("#searchForm").values(), {pledgeStatus: 1,checkStatus: 1}), interUrl.mockList || interUrl.creditManagement.mortageList);
};

handle_1 = function(value, row, index) {
  return "<div class='btn btn-xs btn-primary edit'>抵押核查</div>";
};

handle_2 = function(value, row, index) {
    return "<div class='btn btn-xs btn-primary show'>查看抵押信息</div>";
};
tableEvent = {
  "click .edit": function(e, a, item, index) {
      comn.addTab({title: '核查录入', href: "./Modal/creditManagement/mortgageRegist/mortgageCheck.html?projectId=" + item.projectId + "&applyId=" + item.applyId + "&type=edit" + "&space=CAR_PLEDGE" + "&releventFlowNode=PLEDGE_REGIST&releventFlow=CAR_PLEDGE_REGIST_FLOW"})
  },
  "click .show": function(e, a, item, index) {
      comn.addTab({title: '抵押录入', href: "./Modal/creditManagement/mortgageRegist/mortgageInfo.html?projectId=" + item.projectId + "&applyId=" + item.applyId + "&type=show" + "&space=CAR_PLEDGE" + "&releventFlowNode=PLEDGE_REGIST&releventFlow=CAR_PLEDGE_REGIST_FLOW"})
  }
};

$(function() {
    $("#coBankId").getBankAll();
  $("#btn-search").click(function() {
    var activeTab;
    activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
    return $("#" + activeTab).find("table").bootstrapTable("refresh", {url: "..."});
  });
// 数据导入
    $("#import").click(function() {
        $("#upFileInput").trigger("click");
    });
// 上传按钮改变时触发upload方法
    $('#upFileInput').on('change', function() {
        if ($('input[type="file"]').val() != "") {
            var extend = $('input[type="file"]').val().substr($('input[type="file"]').val().lastIndexOf(".") + 1);
            if ("xls|xlsx".indexOf(extend) == -1) {
                flagPic = false;
                layer.msg("选择的文件必须是EXCEL文件,请确认！");
            } else {
                upload();
                $("#upFileInput").replaceWith($("#upFileInput").clone(true));
            }
        } else {
            layer.msg("请选EXCEL文件");
        }

    });
});

// 上传方法
function upload() {
    return $.ajaxFileUpload({
        url: interUrl.basic + interUrl.creditManagement.uploadCheckResult,
        secureuri: false,
        fileElementId: 'upFileInput',
        dataType: "json",
        success: function (data, status) {
            console.log(data);
            if (data.code == 10000) {
                $("#btn-search").click()
                tip({
                    content: "导入完成"
                });
            } else {
                tip({
                    content: data.message
                });
            }
        },
        complete: function () {
            console.log("msg");
        },
        error: function (data, status, e) {
            tip({
                content: data.message
            });
        }
    });
}
