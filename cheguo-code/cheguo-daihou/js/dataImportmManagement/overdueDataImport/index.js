$.fn.editable.defaults.emptytext = "--";  //Empty 初始化为--
/**
 * 数据导入js
 */
var dataLoad_1, args = comn.getArgs(), exportTime, coBankId, templateId, resattr, _arr, arr_projectId;
exportTime = "";
coBankId = 0;
templateId = 0;
arr_projectId = [];
dataLoad_1 = function(params) {
    //当导入时间与导入模板为空时，不做加载。
    if ($("#exportTime").val() == "" || $("#templateId").val() == "") {
        $("#finishData, #deleteData, #leaderOutData").attr('disabled', 'disabled');
        $(".fixed-table-loading").addClass("hide")
        return;
    }
    var p;
    p = params.data;
    comn.ajax({
        url: interUrl.mockList || interUrl.gr.loanOverdueLoadHisList,
        data: $.extend($("#searchForm").values(), p),
        success: function(res) {
            params.success({
                'total': res.totalItem,
                'rows': res.data
            });
            params.complete();
            pd();
            if (templateId != 0 || templateId != "" ) {
                pdEdit(templateId);
            };
            arr_projectId.length = 0;
            _arr = "";
            $("#table").unbind('check.bs.table').on('check.bs.table', function(e, row) {
                arr_projectId.push(row["id"]);
                _arr = arr_projectId.join(",");
            }).unbind('uncheck.bs.table').on('uncheck.bs.table', function(e, row) {
                arr_projectId.splice($.inArray(row["id"],arr_projectId),1);
                _arr = arr_projectId.join(",");
            }).unbind('uncheck-all.bs.table').on('uncheck-all.bs.table', function(e, row) {
                arr_projectId.length = 0;
                _arr = "";
            }).unbind('check-all.bs.table').on('check-all.bs.table', function(e, row) {
                for (var i = row.length - 1; i >= 0; i--) {
                    arr_projectId.push(row[i].id);
                };
                _arr = arr_projectId.join(",");
            });
            var j = 0;
            for (i = 0; i < res.data.length; i++) {
                if (res.data[i].matchStatus == "3") {
                    j++;
                }
            }
            $("#matchNum").val(j);
        }
    });
};
// dataLoad_1 = function(params) {
//   return tableData(params, $("#searchForm").values(), interUrl.mockList || interUrl.gr.loanOverdueLoadHisList, function(){
//       pd();
//       if (templateId != 0 || templateId != "" ) {
//           pdEdit(templateId);
//       };
//       arr_projectId.length = 0;
//       _arr = "";
//       $("#table").unbind('check.bs.table').on('check.bs.table', function(e, row) {
//           arr_projectId.push(row["id"]);
//           _arr = arr_projectId.join(",");
//       }).unbind('uncheck.bs.table').on('uncheck.bs.table', function(e, row) {
//           arr_projectId.splice($.inArray(row["id"],arr_projectId),1);
//           _arr = arr_projectId.join(",");
//       }).unbind('uncheck-all.bs.table').on('uncheck-all.bs.table', function(e, row) {
//           arr_projectId.length = 0;
//           _arr = "";
//       }).unbind('check-all.bs.table').on('check-all.bs.table', function(e, row) {
//           for (var i = row.length - 1; i >= 0; i--) {
//               arr_projectId.push(row[i].id);
//           };
//           _arr = arr_projectId.join(",");
//       });
//       $("#matchNum").val()
//   });
// };

// 判断搜索区是否有值
//function pdValue(exportTime,coBankId,templateId)
function pdValue(exportTime,templateId){
    //if ((exportTime !="" || exportTime != null) && (templateId !=0))
  if ((exportTime !="") && (templateId !=0)) {
    $("#table").bootstrapTable("refresh");
    $("#importData, #finishData").removeAttr('disabled');
  }else{
    $("#table").bootstrapTable("removeAll");
    $("#importData, #finishData").attr('disabled', 'disabled');
    pd(); //当导入时间或导入模板有一个为空时，按钮都不可编辑
  }
}

// 控制列的可编辑状态
function pdEdit(templateId) {
  return comn.ajax({
    url: interUrl.gr.getMatchFieldList,
    data: {
      templateId: templateId
    },
    success: function(res) {
      // console.log(res.data);
      $('#table .editable').editable('option', 'disabled', true);
      for (var i = 0; i < res.data.length; i++) {
        var index_th= $('#table th[data-field='+res.data[i]+']').index();
        var index_td= $('#table a[data-name='+res.data[i]+']').parent().index();
        if(index_th==index_td){
          $('#table a[data-name='+res.data[i]+'].editable').editable('toggleDisabled');
        }
      }

      resattr = res.data;
    },

  });
};

$("#exportTime").on("changeDate",function() {
  exportTime = $(this).val();
  //pdValue(exportTime,coBankId,templateId);
  pdValue(exportTime,templateId);
});
//当导入日期为空时，清空table 并导入按钮不可编辑
$("#exportTime").on("change",function() {
    if ($(this).val() == "") {
        $("#table").bootstrapTable("removeAll");
        $("#importData").attr('disabled', 'disabled');
        pd(); //当导入时间或导入模板有一个为空时，按钮都不可编辑
    }
});
// $("#coBankId").on("change",function() {
//   coBankId = $(this).val();
//   pdValue(exportTime,coBankId,0);
// });
$("#templateId").on("change",function() {

    $("#bankList").val($(this).find("option:selected").attr("data-name"));
    templateId = $(this).val();
    //pdValue(exportTime,coBankId,templateId);
    exportTime = $("#exportTime").val();
    pdValue(exportTime,templateId);

});
$("#beforeMatchStatus").on("change",function() {
    pdValue(exportTime,templateId);
});


tableEvent = {
  "click .reMatch": function(e, a, item, index) {
    var temp;
    var _data = "";
    var reMatchData = "";
    for (var i = 0; i < resattr.length; i++) {
       _data = ",\""+resattr[i]+"\": \""+item[resattr[i]]+"\"";
      reMatchData += _data;
    }
    reMatchData= "{"+ reMatchData.substr(1) +"}";
    temp= JSON.parse(reMatchData);
    return comn.ajax({
      url: interUrl.gr.loanOverdueLoadHisRematch,
      data: $.extend(temp, {exportTime:exportTime},{id: item['id']}),
      success: function(res) {
        // console.log(reMatchData);
        if(res.code == 10000){
          tip({
            content: item['customerName']+"匹配成功!!"
          });
        }else if (res.code == 20000) {
          tip({
            content: data.message
          });
        }
        return $("#table").bootstrapTable('selectPage', 1);
      }
    });
  },
  "click .delete": function(e, a, item, index) {
      $("#sure .modal-body h3").html("确定删除？"); //html文字还原
    $("#sure").modal("show");
    return $("#OK").unbind('click').click(function() {
      return comn.ajax({
        url: interUrl.gr.loanOverdueLoadHisDelete,
        data: {
          id: item['id']
        },
        success: function(res) {
          tip({
            content: "删除成功!!"
          });
          $("#sure").modal("hide");
          return $("#table").bootstrapTable('selectPage', 1);
        }
      });
    });
  }
};

handle = function(value, row, index) {
  return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>",  "<li><a class='reMatch'>重新匹配</a></li>", "<li><a class='delete'>删除</a></li>", "</ul>", "</div>"].join("");
	// return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>",  "<li><a class='reMatch'>重新匹配</a></li>", "<li><a class='update'>修改</a></li>", "<li><a class='delete'>删除</a></li>", "</ul>", "</div>"].join("");
};

//判断表格有无数据，控制数据导入及处理完成按钮
function pd(){
  var data = $("#table").bootstrapTable("getData");
  if (data.length == 0) {
    $("#deleteData, #leaderOutData").attr('disabled', 'disabled');
    // $("#importData").removeAttr('disabled');
  }else{
    $("#deleteData, #leaderOutData").removeAttr('disabled');
    // $("#importData").attr('disabled', 'disabled');
  }
}

//pdValue(exportTime,coBankId,templateId);
pdValue(exportTime,templateId);

// 上传方法
function upload(){
  return $.ajaxFileUpload({
      url: interUrl.basic + interUrl.gr.uploadExcel,
      secureuri: false,
      fileElementId: 'upFileInput',
      data:  {
        exportTime: exportTime,
        coBankId: coBankId,
        templateId: templateId,
        uploadMode: $("#uploadMode").val(),
        calculateLoanBalance: $("#calculateLoanBalance").val()
      },
      dataType: "json",
      success: function(data, status) {
        // eval("data = " + data2);
          if (data.code == 10000) {
              tip({
                content: "逾期数据导入成功!!"
              });
          }else{
               tip({
                    content: data.message
               });
          }
        $('input[type="file"]').val(""); //将上传图片input清空， 方便第二次上传需要；
          console.log(data);
      },
      complete: function() {
          // console.log("msg");
          $("#exportTime").trigger("changeDate");
      },
      error: function(data, status, e) {
          // return console.log(e);
          tip({
            content: data.message
          });
      }
  });


}

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
            // pdValue(exportTime,coBankId,templateId);
            // $("#exportTime").trigger("changeDate");
            // return $("#table").bootstrapTable('selectPage', 1);
       }
   } else {
       layer.msg("请选EXCEL文件");
   }

});

// 数据导入
$("#importData").click(function() {
    $("#upFileInput").trigger("click");
});
//处理完成
$("#finishData").click(function() {
    var data = $("#table").bootstrapTable("getData");
    if (data.length == 0) {
        $("#sure .modal-body h3").html("数据列表中没有任何数据，如继续操作将移除所选模板的当前逾期数据！");
        $("#sure").modal("show");
        return $("#OK").unbind('click').click(function() {
            $("#sure").modal("hide");
            loanOverdueLoadHisFinish();
            $("#sure .modal-body h3").html("");
        });
    }
    if ($("#matchNum").val() > 0) {
        $("#sure .modal-body h3").html("待处理完成的数据中存在"+ $("#matchNum").val() +"条匹配重复的数据，是否继续执行处理完成操作！");
        $("#sure").modal("show");
        return $("#OK").unbind('click').click(function() {
            $("#sure").modal("hide");
            loanOverdueLoadHisFinish()
        })
    } else {
        loanOverdueLoadHisFinish()
    }

});
//处理完成ajax
function loanOverdueLoadHisFinish(){
    return comn.ajax({
        url: interUrl.gr.loanOverdueLoadHisFinish,
        data: $("#searchForm").values(),
        success: function(res) {
            tip({
                content: "处理完成!!"
            });
            $("#table").bootstrapTable('selectPage', 1);
        }
    });
}
$(function() {
  // 银行模版级联
  // $("select[name='coBankId']").getBankAll();
  // $(document).on("change", "#coBankId", function() {
  //     var code = $(this).find("option:selected").attr('value');
  //     $("#templateId").getTemplateList(code);
  //     return;
  // });
   //批量删除
    $("#templateId").getTemplateList();
   $("#deleteData").click(function () {
       if (_arr == "") {
           return tip ({ content : "请选择相关数据！"});
       }
       $("#sure .modal-body h3").html("已选择这"+ arr_projectId.length +"条数据，是否执行删除操作！");
       $("#sure").modal("show");
       return $("#OK").unbind('click').click(function() {
           return comn.ajax({
               url: interUrl.gr.deletes,
               data: {
                   ids: _arr
               },
               success: function(res) {
                   $("#sure").modal("hide");
                   $("input[name=btSelectItem]:checked").each(function (index) {
                       $(this).parents("tr").remove();
                   });
                   tip({
                       content: "删除成功!!"
                   });
                   return $("#table").bootstrapTable('selectPage', 1);
               }
           });
       });
   });
   //数据导出
   $("#leaderOutData").click(function () {
       var search=$("#searchForm").serialize();
       var downLink = interUrl.basic + interUrl.gr.listExport + "?" + search;
       console.log(downLink);
       window.open(downLink, "_blank");
   })
});
