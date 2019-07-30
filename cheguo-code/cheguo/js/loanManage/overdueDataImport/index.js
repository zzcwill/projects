$.fn.editable.defaults.emptytext = "--";  //Empty 初始化为--
/**
 * 数据导入js
 */
var dataLoad_1, args = comn.getArgs(), exportTime, coBankId, templateId, resattr;
exportTime = "";
coBankId = 0;
templateId = 0;


dataLoad_1 = function(params) {
  return tableData(params, $("#searchForm").values(), interUrl.mockList || interUrl.gr.loanOverdueLoadHisList, function(){
    pd();
    if (templateId != 0 || templateId != "" ) {
      pdEdit(templateId);
    }
  });
};

// 判断搜索区是否有值
function pdValue(exportTime,coBankId,templateId){
  if ((exportTime !="" || exportTime != null) && (coBankId !=0) && (templateId !=0)) {

    $("#table").bootstrapTable("refresh");
    $("#importData").removeAttr('disabled');

  }else{
    $("#table").bootstrapTable("removeAll");
    $("#importData").attr('disabled', 'disabled');
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
  pdValue(exportTime,coBankId,templateId);
});
$("#coBankId").on("change",function() {
  coBankId = $(this).val();
  pdValue(exportTime,coBankId,0);
});
$("#templateId").on("change",function() {
  templateId = $(this).val();
  pdValue(exportTime,coBankId,templateId);

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
    $("#finishData").attr('disabled', 'disabled');
    // $("#importData").removeAttr('disabled');
  }else{
    $("#finishData").removeAttr('disabled');
    // $("#importData").attr('disabled', 'disabled');
  }
}

pdValue(exportTime,coBankId,templateId);

// 上传方法
function upload(){
  return $.ajaxFileUpload({
      url: interUrl.basic + interUrl.gr.uploadExcel,
      secureuri: false,
      fileElementId: 'upFileInput',
      data:  {
        exportTime: exportTime,
        coBankId: coBankId,
        templateId: templateId
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
  });

$(function() {

  // 银行模版级联
  $("select[name='coBankId']").getBankAll();
  $(document).on("change", "#coBankId", function() {
      var code = $(this).find("option:selected").attr('value');
      $("#templateId").getTemplateList(code);
      return;
  });
  

  
});
