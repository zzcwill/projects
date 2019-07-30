var table_sign_main, handle_sign_main, tableEvent_sign_main, table_sign_vice, handle_sign_vice, tableEvent_sign_vice,dataLoad_4, tableEvent_4, handle_4;
var getSign = null;
//$.extend($.validator.defaults,{ignore:""}); //隐藏表单也验证
//贷款发起征信记录
dataLoad_4 = function(params) {
    var p;
    data = {
        loanApplyId: args["loanApplyId"],
        creditId: args["creditApplyId"],
        customerId : args["customerId"],
        projectId: args["projectId"]
    }
    p = params.data;
    return comn.ajax({
        async: false,
        url: interUrl.credit.CustomerCreditList,
        data: data,
        success: function(res) {
            console.log(res);
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            $("#table_4").bootstrapTable('load', res.data);
            return params.complete();
        }
    });
};

tableEvent_4 = {
    "click .loanStart1": function(e, a, item, index) {
//      return window.parent.toUrl({
//      url: "./Modal/loanManage/creditManage/creditInfo.html?type=1&businessId="+item.creditId //地址待定
//      });
         comn.addTab({title: '征信详情',  href: './Modal/loanManage/creditManage/creditInfo.html?type=1&businessId='+item.creditId });
    }
};

handle_4 = function(value, row, index) {
    return ["<button type='button' class='btn btn-primary btn-xs loanStart1'>查看详情</button>"].join("");
};
$("#table_4").bootstrapTable();

$("#roleId").getRuleList(); //获取角色列表
$("#flowTitle").text(args['currentNodeName']);
//get baseInfo
comn.ajax({
    url: interUrl.myTask.getAssign,
    data: args,
    success: function (res) {
        $("#signSaveForm").values(res.data);
        if (res.data.loanAmount >= 200000) {
            $("#viceSignBox").show();
            $(document).on("keyup", "#mainSignerWeight", countWeight);
            $(document).on("keyup", "#viceSignerWeight", countWeight);
        } else {
            $("#viceSignBox").hide();
            $("#mainSignerWeight").val(100).attr("readonly", true);
        }
        $("#assignForm").values(res.data);
        $("#getPos").data("pos", res.data.visitAddressLongitude + "," + res.data.visitAddressLatitude);
    }
});

tableEvent_sign_main = {
    "click .role": function (e, a, item, index) {
        var signUserId = item.userId;
        var signUserName = item.userName;
        getSign(signUserName, signUserId);
        $("#signModalMain").modal("hide");
    }
};

handle_sign_main = function (value, row, index) {
    return ["<a class='role' href='javascript:;'>选择</a>"].join("");
};

tableEvent_sign_vice = {
    "click .role": function (e, a, item, index) {
        var signUserId = item.userId;
        var signUserName = item.userName;
        getSign(signUserName, signUserId);
        $("#signModalVice").modal("hide");
    }
};

handle_sign_vice = function (value, row, index) {
    return ["<a class='role' href='javascript:;'>选择</a>"].join("");
};
//get sign lists主签单员
table_sign_main = function (params) {
    var p=params.data;
    return comn.ajax({
        url: interUrl.myTask.listsAssignMain,
        data: $.extend(loanApplyId,p),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            return params.complete();
        }
    });
};
$("#signModalMain").on("shown.bs.modal", function(){
    $("#table_sign_main").bootstrapTable(comn.table);
    $("#table_sign_main").bootstrapTable('refresh');
});

$("#mainSignSelect").click(function () {
    $("#signModalMain").modal("show");
    getSign = function (a, b) {
        $("input[name='mainSignerName']").val(a);
        $("input[name='mainSignerId']").val(b);
    }
});
//get sign lists次签单员
table_sign_vice = function (params) {
    var mainSignerId=$("input[name='mainSignerId']").val();
    var p = params.data;
    p['mainSignerId'] = mainSignerId;
    return comn.ajax({
        url: interUrl.myTask.listsAssignVice,
        data: $.extend($("#signForm").values(), loanApplyId, p),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            return params.complete();
        }
    });
};
$("#viceSignSelect").click(function () {
    $("#signModalVice").modal("show");
    getSign = function (a, b) {
        $("input[name='viceSignerName']").val(a);
        $("input[name='viceSignerId']").val(b);
    }
});
$("#signModalVice").on("shown.bs.modal", function(){
    $("#table_sign_vice").bootstrapTable(comn.table);
    $("#table_sign_vice").bootstrapTable('refresh');
});
$("#btn-search-qd").click(function () {
    $("#table_sign_vice").bootstrapTable(comn.table);
    $("#table_sign_vice").bootstrapTable('selectPage',1);
});

//双向监听权重
function countWeight() {
    var _this = $(this);
    var name = _this.attr("name"),
        value = _this.val();
    var viceWeight, mainWeight;
    viceWeight = $("#viceSignerWeight");
    mainWeight = $("#mainSignerWeight");
    if (name == "mainSignerWeight") {
        viceWeight.val((parseFloat(100) - (parseFloat(value) || 0).toFixed(2)).toFixed(2));
    } else {
        mainWeight.val((parseFloat(100) - (parseFloat(value) || 0).toFixed(2)).toFixed(2));
    }
}

//签单分配保存
$("#btn-save").click(function () {
    $("#signSaveForm").validate();
    if ($("#signSaveForm").valid() == true) {
        comn.ajax({
            url: interUrl.myTask.editAssign,
            data: $.extend($("#signSaveForm").values(), loanApplyId),
            success: function (res) {
                tip({content: res.message || "保存成功!"})
            }
        })
    }
});

//判断显示提交还是退回
$("input[name='conclusion']").on('click', function () {
    var checkedV = $("input[name='conclusion']:checked").val();
    if (checkedV == 1) {
        $("#btn-opinion-save").show();
        $("#btn-loanReview-back").hide();
    } else {
        $("#btn-opinion-save").hide();
        $("#btn-loanReview-back").show();
    }
});

//流程意见保存和流程提交,退回上一步

$("#btn-opinion-save").click(function(){
    $("#signSaveForm").validate();
    $("#opinionForm").validate();
    if($("#signSaveForm").valid() == true && $("#opinionForm").valid() == true) {
        oppSureModal("是否确认提交");
        $("#sureOption").unbind("click").click(function () {
            comn.ajax({
                url: interUrl.myTask.editAssign,
                data: $.extend($("#signSaveForm").values(), loanApplyId),
                success: function (res) {
                    $("#sureModal").modal("hide");
                    //保存流程意见
                    comn.ajax({
                        url: interUrl.common.opinion,
                        data: $.extend($("#opinionForm").values(), argsBopInfoId),
                        success: function (res) {
                            var p3 = {
                                nextNodeUserName: $("[name='mainSignerName']").val(),
                                nextNodeUserId: $("[name='mainSignerId']").val()
                            };
                            //提交
                            comn.ajax({
                                url: interUrl.myTask.submit2next,
                                data: $.extend(loanApplyId, p3),
                                success: function (res1) {
                                    tip({content: res1.message});
                                    comn.closeTab();
                                }
                            });
                        }
                    });
                }
            })
        })
    }

});

//退回上一步
$("#btn-loanReview-back").click(function(){
    $("#opinionForm").validate();
    if($("#opinionForm").valid() == true) {
        oppSureModal("是否确认退回");
        $("#sureOption").unbind("click").click(function () {
            //保存流程意见
            comn.ajax({
                url: interUrl.common.opinion,
                data: $.extend($("#opinionForm").values(), argsBopInfoId),
                success: function (res) {
                    $("#sureModal").modal("hide");
                    //退回上一步
                    comn.ajax({
                        url: interUrl.myTask.back2pre,
                        data: loanApplyId,
                        success: function (res1) {
                            tip({content: res1.message});
                            comn.closeTab();
                        }
                    });
                }
            });
        })
    }
});

//opinionForm单独保存
    $("#saveBtn").click(function(){
      oppSureModal("是否确认保存");
      $("#sureOption").unbind("click").click(function () {
        //保存流程意见
        comn.ajax({
          url: interUrl.common.opinionOnly,
          data: $.extend($("#opinionForm").values(), argsBopInfoId),
          success: function (res) {
            $("#sureModal").modal("hide");
            tip({
                  content: "保存成功！"
                });
          }
        });
      });
});
    //页面加载获取opinion内容
    $("#opinionText").getOpinion_s(argsBopInfoId);
