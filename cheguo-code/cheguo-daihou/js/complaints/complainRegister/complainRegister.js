var args, complaintGrade, _customerName, _cardNo,_projectId,_customerId, _complaintGradeStatus;
args = comn.getArgs();
//枚举
complaintGrade = function (value, row, index) {
    return ['否', "是"][value] || null;
};
//投诉类型
$("#complaintType").getConfigList();
approvalResult = function(value, row, index){
    switch (value){
        case -1: return '待办';
            break;
        case 0: return '不同意';
            break;
        case 1: return '同意';
            break;
    }
    
};
//修改表格统一配置参数
var tableConfig = {};
$.map(comn.table, function (v, k) {
    tableConfig[k] = v;
});
tableConfig['height'] = "300";
tableConfig['pagination'] = false;
//总经理指派/ 内勤指派 显示处理完成可流转至最后的节点；
if (args["currentNode"] === "COMPLAINT_APPLY_OFFICE" || args["currentNode"] === "COMPLAINT_APPLY_OFFICE_RISK_MANAGER") {
    $(".cancleProcess").removeClass("hide");
}
//处理人员以后的节点显示处理过程
if (args["status"] === "showProcess") {
    $(".processCompliteTextarea").removeClass("hide");
    if (args["currentNode"] !== "COMPLAINT_APPLY_HANDLE") {
        $(".process").prop("readonly", "readonly");
        $("#fieldsetArea2").prop("disabled", "disabled")
    }
}
//不是发起环节
if (args["status"] !== "add") {
    $("#navTab, .notAdd").removeClass("hide");
    //投诉详情
    comn.ajax({
        url: interUrl.complainRegister.get,
        data: {
            id: args["id"]
        },
        success: function (res) {
            $("#keyId").val(res.data.info.id);
            _customerName = res.data.info.customerName;
            _cardNo = res.data.info.cardNo;
            _complaintGradeStatus = res.data.info.complaintGrade;
            if (res.data.info.suggestion  && args["status"] !== "modify") { //如果修改意见为空则不显示
                $(".suggestion").removeClass("hide");
            }
            getDocumentList(res.data.info.id); //获取图片信息
            //贷款详情
            _projectId = res.data.info.projectId;
            _customerId = res.data.info.customerId;
            $("#collectionForm_2").values(res.data.info);
            if (res.data.info.type === "C") {
                $("#complaintGrade").removeClass("hide");
            }
            $("#historyComplain").bootstrapTable('refresh');
        }
    });
    dataLoad_opinion = function (params) {
        var p;
        p = params.data;
        return comn.ajax({
            url: interUrl.complainRegister.get,
            data: {
                id: args["id"]
            },
            success: function (res) {
                params.success({
                    'total': res.data.totalNum,
                    rows: res.data.businessObjectProcessInfos
                });
                return params.complete();
            }
        });
    };
}
//修改节点可显示修改意见；
if (args["status"] === "modify") {
    $("#complaintType, #customerUnitBtn").prop("disabled", "disabled");
    $(".suggestion").removeClass("hide");
    if (args["currentNode"] === "COMPLAINT_APPLY_OFFICE" || args["currentNode"] === "COMPLAINT_APPLY_OFFICE_RISK_MANAGER") {
        $(".overFinishTime, .complaintDetail, .process").prop("readOnly", true);
        $("#btnSubmit").addClass("hide");
    }
}
if (args["status"] === "show") {
    $(".showBtn").addClass("hide");
    $("#regFieldset, #fieldsetArea2").prop("disabled", "disabled");
}
//流程中显示流程意见
if(args["flowName"] === "COMPLAINT_APPLY_FLOW") {
    $("#regFieldset").prop("disabled", "disabled")
    $("#opinionForm, #btn-opinion-save").removeClass("hide");
    $("#btnSubmit").addClass("hide");
    args["currentNode"] === "COMPLAINT_APPLY_ADD" ? $("#btn-save").removeClass("hide") : $("#btn-save").addClass("hide");
}

$(document).on("click", ".opinion", function () {
    //过程信息
    $(".opinion").removeClass("opinion");
    $("#table").bootstrapTable('refresh');
})

//选择客户
dataLoad_6 = function(params) {
    var p;
    p = params.data;
    return comn.ajax({
        url: interUrl.complainRegister.list,
        data: $.extend($("#customerForm").values(), p),
        success: function(res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            return params.complete();
        }
    });
};
tableEvent_6 = {
    "click .choice": function (e, a, item, index) {
        $("#collectionForm_2").values(item);
        $("#customerUnit").modal("hide");
        //历史投诉
        _customerName = item.customerName;
        _cardNo = item.cardNo;
        $("#historyComplain").bootstrapTable('refresh');
        _projectId = item.projectId;
        _customerId = item.customerId;
        setTimeout(function(){
            $("#historyComplain").bootstrapTable('resetView');
        }, 500)
    }
};
handle_6 = function(value, row, index) {
    return "<div class='btn btn-xs btn-primary choice'>选择</div>";
}

historyComplain = function(params){
    tableData(params, {customerName: _customerName, cardNo: _cardNo}, interUrl.complainRegister.hisComplaintInfoList);
};
$("#historyComplain").bootstrapTable(tableConfig);
handle_7 = function(value, row, index) {
    return "<div class='btn btn-xs btn-primary showDetail'>查看详情</div>";
}
tableEvent_7 = {
    "click .showDetail": function (e, a, item, index) {
        return comn.addTab({
            title:'查看详情',
            href:'./Modal/complaints/complainRegister/complainRegisterSee.html?type=3&id=' + item.id +"&status=show&tableName=complaint_info"
        });
    }
};
$(function(){
    $('#datetimepicker').datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd hh:ii:ss'
    });
    //选择客户、客户查询
    $("#customerUnitBtn, #btn-search1").click(function(){
        if($(this).attr("id") === "customerUnitBtn") {
        $("#customerForm input").val("");
        }
        $("#table_6").bootstrapTable("refresh");
    });
    //判断显示提交还是退回:
    $("input[name='conclusion']").on('click',function(){
        var checkedV=$("input[name='conclusion']:checked").val();
        if(checkedV==1 || checkedV == 2){
            $("#btn-opinion-save").removeClass("hide");
            $("#btnBack").addClass("hide");
        }else{
            $("#btn-opinion-save").addClass("hide");
            $("#btnBack").removeClass("hide");
        }
        if (args["type"] === "1") { //type = 1 :: 目前只在登记发起和内勤主管、分公司总经理节点出现；
            checkedV == 2 ? $(".processCompliteTextarea").removeClass("hide") : $(".processCompliteTextarea").addClass("hide").find(".process").val(""); //处理完成
        }
        
    });
    //投诉类型修改： 状态为C时显示投诉升级；
    $(document).on("change", "#complaintType", function(){
        var _v = $(this).find("option:selected");
        $("input[name=complaintTypeName]").val(_v.text());
        $("input[name=type]").val(_v.attr("data-type"));
        $("input[name=complaintType]").val($(this).val());
        if (_v.attr("data-type") === "C") {
            $("#complaintGrade").removeClass("hide");
            $("#complaintGrade input").prop("disabled", false);
        } else {
            $("#complaintGrade").addClass("hide");
            $("#complaintGrade input").prop("disabled", "disabled");
        }
    });
    //撤销
    $(document).on("click", "#btn_cancle", function(){
        comn.ajax({
            url: interUrl.complainRegister.cancle,
            data: {
                id: $("#keyId").val()
            },
            success: function (res) {
                comn.closeTab();
            }
        })
    });
    //退回上一步
    $(document).on("click", "#btnBack", function(){
            comn.ajax({
            url: interUrl.complainRegister.back2pre,
            data: {
                id: $("#keyId").val()
            },
            success: function (res) {
                comn.closeTab();
            }
            })
    })
    //取消
    $(document).on("click", "#cancle", function () {
        comn.closeTab();
    });
    //未进入流程的提交
    $(document).on("click", "#btnSubmit", function(){
        save_btn(2, "是否确认提交");
    });
    $(document).on("click", "#documentDetail", function () {
        if (_projectId &&  _customerId) {
            documentDetail(_projectId, _customerId);
        }
    })
});
function documentDetail(projectId, customerId) {
  return comn.addTab({
    title : '贷款详情',
    href : "./Modal/customManage/customer/loanDetail.html?projectId=" + projectId+"&customerId="+customerId + "&loanApplyId=" + projectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY&loanFlag=1"
  });
}
function save_btn(num, title) {
    var compainV = $("input[name='complaintGrade']:checked").val();
        $("#collectionForm_2").validate();
        if($("#collectionForm_2").valid()){
        if ((compainV != _complaintGradeStatus) && (args["currentNode"] === "COMPLAINT_APPLY_OFFICE" || args["currentNode"] === "COMPLAINT_APPLY_OFFICE_RISK_MANAGER")) {
            oppSureModal("当前投诉流程已指派给"+ args["nodeName"] +"，是否确定修改?");
            $("#sureOption").unbind("click").click(function () {
                numIs (num, title)
            });
        } else {
            numIs (num, title)
        }
        
        }
}
function numIs (num, title) {
    if (num == 2 || num == 3) {
        oppSureModal(title);
        $("#sureOption").unbind("click").click(function () {
            saveAndSubmit(num);
        })
    } else {
        saveAndSubmit(num);
    }
}
function saveAndSubmit(num) {
    var o = $("#collectionForm_2").values();
    if ($("#keyId").val()) {
      o.id = $("#keyId").val();
    }
    comn.ajax({
        url : args["flowName"] === "COMPLAINT_APPLY_FLOW" ? interUrl.complainRegister.addProcess : interUrl.complainRegister.save,
        data: o,
        success : function(res) {
            if (res.data) {
              _complaintGradeStatus = res.data.complaintGrade;
            }
            
            if (res.data && res.data.id){
              $("#keyId").val(res.data.id);
            }
            $("#collectionForm_2").values(res.data)
            var complainRegisterId = {"id" : $("#keyId").val(), endFlowNode: $("input[name='conclusion']:checked").val() === "2" ? "1" : '0'};
            $("#sureModal").modal("hide");
            if (num == 1) {
                return tip({content: "保存成功！"});
            }
            if (num == 2) {
                flowSubmit(interUrl.complainRegister.preSubmit, interUrl.complainRegister.submit2next, './Modal/task/myTask/index.html', complainRegisterId);
            }
            if (num == 3) {
                comn.ajax({
                    url: interUrl.common.opinionOnly,
                    data: $.extend({bopInfoId: args["bopInfoId"]}, $("#opinionForm").values()),
                    success: function (res) {
                        flowSubmit(interUrl.complainRegister.preSubmit, interUrl.complainRegister.submit2next, './Modal/task/myTask/index.html', complainRegisterId);
                    }
                })
            }
        }
    });
}


//保存
$("#btn-save").click(function(){
    save_btn(1);
});
//提交
$("#btn-opinion-save").click(function () {
    save_btn(3, "是否确认提交");
});

