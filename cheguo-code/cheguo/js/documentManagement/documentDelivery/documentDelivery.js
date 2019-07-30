var arrList, id, num, remove, projectId,loanApplyId;

arrList = [];

num = 0;

id = null;

var tableConfig = {};
$.map(comn.table, function (v, k) {
    tableConfig[k] = v;
});


remove = function(arr, val) {
  var index;
  index = arr.indexOf(val);
  if (index > -1) {
    return arr.splice(index, 1);
  }
};

$(function() {
  var args;
  args = comn.getArgs();
  if(args['documentFlowType'] != "" && args['documentFlowType'] != null){
  	$("#btnGroup").addClass("hide");
  }
  $("#btnSave").click(function() {
    oppSureModal("是否确认保存");
    $("#sureOption").unbind("click").click(function () {
      $("#sureModal").modal("hide");
      var url;
      url = interUrl.documentManagement.deliverStart;
      if (args['businessId']) {
        url = interUrl.documentManagement.deliverSave;
      }
      if(!$("#addDocument").values()['list[0].documentName']){
        $("#dialogDelete").modal("show");
        return;
      }
      return comn.ajax({
        url: url,
        data: $.extend($("#documentList").values(), {
          id: id
        }),
        success: function(res) {
          if (!args['businessId']) {
            return window.parent.toUrl({
              url: "./Modal/task/myTask/index.html"
            });
          } else {
            return tip({
              content: "保存成功！！"
            });
          }
        }
      });
    })

  });
  $("#sub").click(function() {
    oppSureModal("是否确认提交");
    $("#sureOption").unbind("click").click(function () {
      $("#sureModal").modal("hide");
      var url, urlAction;
      url = interUrl.documentManagement.deliverStart;
      urlAction = 1;
      if (args['businessId']) {
        url = interUrl.documentManagement.deliverSave;
        urlAction = 2;
      }
      if(!$("#addDocument").values()['list[0].documentName']){
        $("#dialogDelete").modal("show");
        return;
      }
      // 启动起来
      if(urlAction == 2){
        subFu(url);
      }else {
        comn.ajax({
          url : url,
          data : $.extend($("#documentList").values(), {
            id: id
          }),
          success : function(res){
            url = interUrl.documentManagement.deliverSave;
            args['businessId'] = id;
            $("#btnClose").removeClass("hide");
            subFu(url);
          }
        });
      }
    });
  });
subFu =  function(url){
  	comn.ajax({
      url: url,
      data: $.extend($("#documentList").values(), {
        id: id
      }),
      success: function(res) {
        comn.ajax({
          url: interUrl.documentManagement.preSubmit,
          data: {deliverId: args['businessId']},
          success: function (res0) {
            var nextNodeUserName=res0.data.userTasks[0].userName;
            var nextNodeUserId=res0.data.userTasks[0].userId;
            var nodeCode={nodeCode:res0.data.nextFlowNodeCode};
            var p3={nextNodeUserName:nextNodeUserName,nextNodeUserId:nextNodeUserId};
            if (res0.data.userTasks.length == 0) {
              $("#userDialogBlank").modal("show");
            }else if(res0.data.userTasks.length>1){
              table_sign = function (params) {
                var p=params.data;
                params.success({'total':res0.data.userTasks.length, rows: res0.data.userTasks});
                params.complete();
              };
              tableEvent_sign = {
                "click .role": function (e, a, item, index) {
                  p2 = {nextNodeUserName: item.userName, nextNodeUserId: a}
                }
              };

              handle_sign = function (value, row, index) {
                return ["<input type='radio' name='userId' class='role' value='" + value + "'/>"].join("");
              };
              $("#nextNode").html(res0.data.nextFlowNodeName);
              $("#table_sign").bootstrapTable();
              $("#table_sign").bootstrapTable('load', res0.data.userTasks);
              $("#signModal").modal("show");
              setTimeout("$('#table_sign').find('tr').eq(1).find('[name=\"userId\"]').prop('checked','checked')",500);
              p2=p3;
              $("#select-sign-btn").unbind("click").click(function(){
                comn.ajax({
                  url: interUrl.documentManagement.submit2next,
                  data: $.extend({deliverId: args['businessId']},p2),
                  success: function (res2) {
                    $("#signModal").modal("hide");
                    tip({content:res2.message});
                    comn.closeTab();
                  }
                })
              })
            }else{
              comn.ajax({
                url: interUrl.documentManagement.submit2next,
                data: $.extend({deliverId: args['businessId']},p3),
                success: function (res4) {
                  tip({content:res4.message});
                  comn.closeTab();
                }
              })
            }
          }
        })
      }
    });
  };
  $("#documentDetail").click(function() {
  	return comn.addTab({
  		title : '贷款详情',
  		href : "./Modal/customManage/customer/loanDetail.html?businessTypeCode=LOAN_APPLY_FLOW&id=" + projectId + "&projectId=" + projectId + "&loanApplyId=" + loanApplyId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY"
  	});
  });
  $("#accordion").on("click", ".list-group-item", function() {
    var o;
    o = $(this).data("json");
    if (num === 0) {
      $("#addDocument").html("");
    }
    if (arrList.indexOf(o.title) > -1 || $(this).hasClass("disabled")) {
      return;
    }
    arrList.push(o.title);
    $(this).addClass("disabled");
    $("#addDocument").append(["<tr class='form-group-sm' data-target='" + o.title + "'>", "<td class='serial'>" + (num + 1) + "</td>", "<td>" + o.title + " </td>", "<td>", "<div class='input-group' style='width: 130px;'>", "<input type='text' class='hide input2' name='list[" + num + "].documentName' value='" + o.title + "' />", "<input type='text' class='hide input4' name='list[" + num + "].sort' value='" + num + "' />", "<div class='input-group-addon btn minus'>-</div>", "<input type='text' name='list[" + num + "].originalCount' class='form-control input1' value='" + o.dirNum1 + "' /> ", "<div class='input-group-addon btn plus'>+</div>", "</div>", "</td>", "<td>", "<div class='input-group' style='width: 130px;'>", "<div class='input-group-addon btn minus'>-</div>", "<input type='text' name='list[" + num + "].duplicateCount' class='form-control input3' value='" + o.dirNum2 + "' />", "<div class='input-group-addon btn plus'>+</div>", "</div>", "</td>", "<td><button type='button' class='btn btn-xs btn-primary btn-remove'>移除</button></td>", "</tr>"].join(""));
    return num++;
  });

  $("body").on("keyup", ".input1, .input3", function(){ this.value = this.value.replace(/\D/g,''); });

  $("#addDocument").on("click", "button.btn-remove", function() {
    var $dList, $tr, delNum, dels, serials, trs, input4;
    $dList = $("#addDocument");
    $tr = $(this).parents("tr");
    $("#" + $tr.data("target"));
    $(".list-group-item[data-title='" + ($tr.data("target")) + "']").removeClass("disabled");
    dels = $dList.find("button.btn-remove");
    trs = $dList.find("tr");
    delNum = dels.index($(this));
    trs.eq(delNum).detach();
    serials = $dList.find(".serial");
	input4 = $dList.find(".input4");
    $.each(trs, function(k, v) {
      var $el, _index;
      $el = $(v);
      _index = $(v).index();
      $el.find(".input1").attr("name", "list[" + _index + "].originalCount");
      $el.find(".input2").attr("name", "list[" + _index + "].documentName");
      $el.find(".input3").attr("name", "list[" + _index + "].duplicateCount");
      $el.find(".input4").attr("name", "list[" + _index + "].sort");
	  input4.eq(k).val(k);
      return serials.eq(k).html(k + 1);
    });
    remove(arrList, $tr.data("target"));
    num--;
    if (num === 0) {
      return $("#addDocument").html("<tr><td class='text-center' colspan='5'>暂无内容!!</td></tr>");
    }
  }).on("click", "div.plus", function() {
    var $num;
    $num = $(this).prev("input");
    return $num.val(parseInt($num.val()) + 1);
  }).on("click", "div.minus", function() {
    var $num;
    $num = $(this).next("input");
    num = parseInt($num.val());
    return $num.val(num > 0 ? num - 1 : 0);
  });

  $("#btnClose").click(function() {
    oppSureModal("是否确认撤销");
    $("#sureOption").unbind("click").click(function () {
      $("#sureModal").modal("hide");
      return comn.ajax({
        url: interUrl.documentManagement.cancel,
        data: {
          deliverId: id
        },
        success: function(res) {
          tip({
            content: "撤销成功！"
          });
          comn.closeTab();
        }
      });
    });

  });
  return comn.ajax({
    url: interUrl.gr.documentDir,
    data: {
      "fileNamespace": "DELIVER",
      loanApplyId: 0,
	  "releventFlowNode": "TRANSMIT_LAUNCH",
	  "releventFlow": "DOCUMENT_TRANSMIT_FLOW"
    },
    success: function(res) {
      var i, json, k, o;
      $("#accordion").append(((function() {
        var j, len, ref, results;
        ref = res.data.children;
        results = [];
        for (k = j = 0, len = ref.length; j < len; k = ++j) {
          i = ref[k];
          results.push([
            "<div class='panel panel-default'>", "<div class='panel-heading'>", "<h4 class='panel-title'>", "<a data-toggle='collapse' data-parent='#accordion_" + k + "' href='#collapse_" + k + "'>" + i.title + "</a>", "</h4>", "</div>", "<div id='collapse_" + k + "' class='panel-collapse collapse in'>", "<div class='panel-body'>", "<div class='list-group'>", i.children.length > 0 ? ((function() {
              var l, len1, ref1, results1;
              ref1 = i.children;
              results1 = [];
              for (l = 0, len1 = ref1.length; l < len1; l++) {
                o = ref1[l];
                results1.push("<div class='list-group-item' data-title='" + o.title + "' data-json='" + (JSON.stringify(o)) + "'> <span class='badge'>添加</span>" + o.title + " </div>");
              }
              return results1;
            })()).join("") : "<h5>暂无内容!!</h5>", "</div>", "</div>", "</div>", "</div>"
          ].join(""));
        }
        return results;
      })()).join(""));
      if (!args['businessId']) {
        json = comn.cache['itemJson'];
        id = json['id'];
        projectId = json['projectId'];
        loanApplyId = json['loanApplyId'];
        $("#btnClose").addClass("hide");
        return $("#documentInfo").values(json);
      } else {
        return comn.ajax({
          url: interUrl.documentManagement.deliverGet,
          data: {
            id: args['businessId']
          },
          success: function(res) {
            var arr, data, j, len, ref;
            data = res.data;
            id = data['id'];
            projectId = data['projectId'];
            loanApplyId = data['loanApplyId'];
            $("#documentInfo").values(data);
            num = data.list.length;
            arr = [];
            ref = data.list;
            for (k = j = 0, len = ref.length; j < len; k = ++j) {
              o = ref[k];
              $(".list-group-item[data-title='" + o['documentName'] + "']").addClass("disabled");
              arr.push(["<tr class='form-group-sm' data-target='" + o.documentName + "'>", "<td class='serial'>" + (k + 1) + "</td>", "<td>" + o.documentName + " </td>", "<td>", "<div class='input-group' style='width: 130px;'>", "<input type='text' class='hide input2' name='list[" + k + "].documentName' value='" + o.documentName + "' />", "<input type='text' class='hide input4' name='list[" + k + "].sort' value='" + k + "' />", "<div class='input-group-addon btn minus'>-</div>", "<input type='text' name='list[" + k + "].originalCount' class='form-control input1' value='" + o.originalCount + "' /> ", "<div class='input-group-addon btn plus'>+</div>", "</div>", "</td>", "<td>", "<div class='input-group' style='width: 130px;'>", "<div class='input-group-addon btn minus'>-</div>", "<input type='text' name='list[" + k + "].duplicateCount' class='form-control input3' value='" + o.duplicateCount + "' />", "<div class='input-group-addon btn plus'>+</div>", "</div>", "</td>", "<td><button type='button' class='btn btn-xs btn-primary btn-remove'>移除</button></td>", "</tr>"].join(""));
            }
            return $("#addDocument").html(arr.join(""));
          }
        });
      }
    }
  });
});
