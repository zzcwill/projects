var args, handle_1, dataLoad_1, dataLoad_2, tableEvent_1, handle_2, arrList = [], _index, dataArr = [], dataLoad_3, flag = false, number = 0, type, feeManageAdvanceFormId, argsBopInfoId, upImageInputFlag, closeFee, businessAreaFlag, bankIds = [], newApplyAmount = 0, addId = 0, reselectionId = "", reselectionId3 = "", guaranteeIdArray=[];
upImageInputFlag = false;
businessAreaFlag = false;
args = comn.getArgs();
type = args['type'];
feeManageAdvanceFormId = args['feeId'];
argsBopInfoId = {bopInfoId: args['bopInfoId']};
//修改表格统一配置参数
var tableConfig = {};
$.map(comn.table, function (v, k) {
    tableConfig[k] = v;
});
tableConfig['height'] = "300";
tableConfig['pagination'] = false;
$("#table_data").bootstrapTable(tableConfig);
if(type){
    var url;
    if (type == "show" || type == "approve" || type == "option"){
        url = interUrl.feeManage.feeView;
    }
    $(".disabledClass, #isShow_btn").prop("disabled", "disabled");
    if (type == "show") {
        $("#isShow_btn .input-tip, #btn_all, .upImage").addClass("hide");
        $(".disabledClass").prop("disabled", false);
        $(".disShow").prop("disabled", "disabled");
        $("#flowTitle").html("查看垫款费用申请");
        $(".tip_overdue").addClass("hide")
    }
    if (type == "approve") {
        $("#businessArea").prop("disabled", "disabled");
        $(".disabledClass, #isShow_btn").prop("disabled", false);
    }
    if (type == "approve" && !args["currentNodeKey"]) {
        $(".disabledClass, #isShow_btn").prop("disabled", false);
        $("#btn-comit").removeClass("hide");
    }
    comn.ajax({
        url: url,
        data: {
            id : args['feeId']
        },
        success: function (res) {
            var o = res.data;
            $("#advanceFeeFrom").values(o);
            $("#FeeId").val(o.id);
            getDocumentList(o.id);
            args['loanApplyId'] = o.id;
            args['businessTypeCode'] = "FRONT_CAPITAL_APPLY_FLOW";
            appendDate(res.data.feeManageAdvanceAndProrjectViewList, "", "", "fillData");
            $("#PaymentMethod").trigger("change");
            $("#orgId").getOrg(o.orgId, function() {
                $('.selectpicker').selectpicker('refresh');
                $(this).selectpicker('val', o.orgId);
            });
            $("#coBankId").getBankAll(o.coBankId, function() {
                $('.selectpicker').selectpicker('refresh');
                $(this).selectpicker('val', o.coBankId);
            });
            if (type == "show") {
                $("#coBankIdBox1").text(res.data.feeName || "")
                $("#guaranteeId").html(`<option selected="selected">${res.data.guaranteeName}</option>`)
            }
        }
    })
} else {
    $("#orgId").getOrg( function() {
        $('.selectpicker').selectpicker('refresh');
    });
    $("#coBankId").getBankAll(function() {
        $('.selectpicker').selectpicker('refresh');
    });
    $("input[name=operator]").val(comn.user.realname);
}
if (args["currentNodeKey"] && type != "approve") {
    $("#btn-comit").addClass("hide");
    $("#opinionFormBox, #btn-comit-option").removeClass("hide");
    $(".isdisabledClass, .upImage").prop("disabled", "disabled");
    $("#isShow_btn .input-tip").addClass("hide");
}
if (args["typeOption"] == "submit") {
    $("#btn-comit, #opinionFormBox").hide();
    $("#opinionFormBox, #btn-comit-option, #btn-cancel-loan").removeClass("hide");
}
if (args["businessTypeCode"] == "FRONT_CAPITAL_APPLY_FLOW") {
    $("#exportBtn").removeClass("hide")
}
if (args["currentNodeKey"] == "FRONT_CAPITAL_APPLY_PROVINCE_RISK_APPROVAL" || args["currentNodeKey"] == "FRONT_CAPITAL_APPLY_BRANCH_MANAGER_APPROVAL" || args["currentNodeKey"] == "FRONT_CAPITAL_APPLY_GROUP_RISK_MANAGE" || args["currentNodeKey"] =="FRONT_CAPITAL_APPLY_GROUP_RISK_REVIEW" || args["currentNodeKey"] == "FRONT_CAPITAL_APPLY_GROUP_RISK_APPROVAL" || args["currentNodeKey"] == "FRONT_CAPITAL_PAYMENT") {
    $(".disabledClass").prop("disabled", false);
}
if (args["currentNodeKey"] == "FRONT_CAPITAL_APPLY_GROUP_RISK_MANAGE" || args["currentNodeKey"] =="FRONT_CAPITAL_APPLY_GROUP_RISK_REVIEW" || args["currentNodeKey"] == "FRONT_CAPITAL_APPLY_GROUP_RISK_APPROVAL" || args["currentNodeKey"] == "FRONT_CAPITAL_PAYMENT") {
    $("#nowDate").attr("readonly", true);
}
//流程标题
if (args["currentNodeName"]) $("#flowTitle").html(args['currentNodeName']);
dataLoad_3 = function(params) {
    tableData(params, $.extend($("#searchForm_3").values(),{status : 0}), url);
}

//table
handle_4  = function(value, row, index) {
    var operate = "";
    operate = ["<div class='btn-group btn-group-xs'>",
        "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作",
        "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>",
        "</button>",
        "<ul class='dropdown-menu' role='menu'  data-projectId='"+ row.projectId +"' data-id='"+ row.loanFrontCapitalRecordId +"' data-role='"+ row.role +"'>",
        args["currentNodeKey"] == "FRONT_CAPITAL_APPLY_GROUP_RISK_MANAGE" ? "" : "<li><a class='reselection' data-toggle='modal' data-target='"+ row.dataTarget +"' data-name='"+ row.customerName+"' data-addId='"+ row.addId +"'>重新选择</a></li>",
        //"<li><a class='modify'>修改</a></li>",
        "<li><a class='deleteThisDate' data-addId='"+ row.addId +"'>删除</a></li>",
        (row.dealResult == 2) ? "" : "<li><a class='seeDetail' data-customerId='"+ row.customerId +"' data-projectId='"+ row.projectId +"'>查看贷款档案</a></li>",
        "</ul>",
        "</div>"].join("");
    if (args["currentNodeKey"] == "FRONT_CAPITAL_APPLY_PROVINCE_RISK_APPROVAL" || args["currentNodeKey"] == "FRONT_CAPITAL_APPLY_BRANCH_MANAGER_APPROVAL" || args["currentNodeKey"] =="FRONT_CAPITAL_APPLY_GROUP_RISK_REVIEW" || args["currentNodeKey"] == "FRONT_CAPITAL_APPLY_GROUP_RISK_APPROVAL" || args["currentNodeKey"] == "FRONT_CAPITAL_PAYMENT" || type == "show") {
        operate = "<button type='button' class='btn btn-primary btn-xs seeDetail' data-customerId='"+ row.customerId +"' data-projectId='"+ row.projectId +"'>查看贷款档案</button>"
    }
    return operate;
};
tableEvent_4 = {
    "click .seeDetail": function(e, a, item, index) {
        var projectId = $(this).attr("data-projectId");
        var customerId = $(this).attr("data-customerId");
        comn.addTab({
            title:"贷款详情",
            href: "./Modal/customManage/customer/loanDetail.html?loanApplyId="+ projectId+"&customerId="+customerId +"&projectId="+ projectId +"&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY"
        });
    },
    "click .reselection": function(e, a, item, index) {
        customerName = "";
        if ($(this).parents(".dropdown-menu").attr("data-role") === "2") {
            reselectionId = $(this).parents(".dropdown-menu").attr("data-projectId");
            customerName = $(this).attr("data-name");
        }
        if ($(this).parents(".dropdown-menu").attr("data-role") === "3") {
            reselectionId3 = $(this).parents(".dropdown-menu").attr("data-id");
            customerName = $(this).attr("data-name");
        }
        $("#index").val(index);
        $("#val").val($(this).attr("data-addId"));
        flag = true;
    },
    "click .deleteThisDate": function(e, a, item, index) {
        var id, role;
        if ($(this).parents(".dropdown-menu").attr("data-role") == 2) {
            role = 2;
            id = $(this).parents(".dropdown-menu").attr("data-projectid");
        }
        if ($(this).parents(".dropdown-menu").attr("data-role") == 3) {
            role = 3;
            id = $(this).parents(".dropdown-menu").attr("data-id");
        }
        deleteArr(role, id);
        var data = $("#table_data").bootstrapTable('getData');
        $("#table_data").bootstrapTable('remove', {
            field: 'addId',
            values: [data[index].addId]
        });
        var _addId = $(this).attr("data-addId");
        $.each(dataArr, function(i, v){
            if (v.addId === Number(_addId)){
                dataArr.splice(i, 1);
                return false;
            }
        });
        account(); //计算申请金额
        
        countFun();
        $("#table_data").bootstrapTable("destroy").bootstrapTable(tableConfig);
        $("#table_data").bootstrapTable("append", dataArr);

        //$("#table_data").bootstrapTable('refresh', {silent: true});
    }
}
function deleteArr(role, id){
    console.log("role:"+role+" id:"+id)
    if (role == 2 && id != "undefined") {
        arrList.splice($.inArray(parseInt(id),arrList),1);//删除已在数组中的标记
        console.log(arrList)
    }
    if (role == 3 && id != "undefined") {
        console.log(bankIds)
        bankIds.splice($.inArray(parseInt(id),bankIds),1);//删除已在数组中的标记
        console.log(bankIds)
    }
}
//添加数据--重新选择
dataLoad_1 = function(params) {
    tableData(params,$("#searchForm_1").values(), interUrl.feeManage.collectionList);
};
//添加数据--添加数据
dataLoad_5 = function(params) {
    tableData(params,$("#searchForm_5").values(), interUrl.feeManage.collectionList);
};
handle_1 = function(value, row, index) {
    return ["<a class='choose' href='javascript:;'>选择</a>"].join("");
};
//重新选择数据
tableEvent_1 = {
    "click .choose": function(e, a, item, index) {
        var _len = arrList.length;
        //遍历是否已存在数据
        for (i = 0; i < _len; i++) {
            if (item.projectId == arrList[i]) {
                $("#loanChoice").modal("hide");
                return tip({content: "您已添加相同数据"});
            }
        }
        comn.ajax({
            url : interUrl.feeManage.feeMatchByProjectIds,
            data : {
                projectIds : item.projectId
            },
            success : function(res) {
                appendDate(res.data, "loanChoice", 2);
                $("#loanChoice").modal("hide");
                arrList.push(item.projectId);
                countFun();
                console.log(arrList);
            }
        })
    }
};
tableEvent_5 = {
    "click .choose": function(e, a, item, index) {
        var _len = arrList.length;
        //遍历是否已存在数据
        for (i = 0; i < _len; i++) {
            if (item.projectId == arrList[i]) {
                tip({content: "您已添加相同数据"});
                $("#loanChoice5").modal("hide");
                return;
            }
        }
        comn.ajax({
            url : interUrl.feeManage.feeMatchByProjectIds,
            data : {
                projectIds : item.projectId
            },
            success : function(res) {
                res.data.forEach(function(item){
                    if (item.remark === undefined) {
                        $.extend(item, { remark: "---" })
                    }
                })
                appendDate(res.data, "loanChoice", 2);
                $("#loanChoice5").modal("hide");
                arrList.push(item.projectId);
                countFun();
                console.log(arrList);
            }
        })
    }
};
//获取银行垫款复选
dataLoad_2 = function(params) {
    tableData(params, $.extend($("#searchForm_2").values(),{status : 0}), interUrl.feeManage.feeBankFeeList);
}
//获取银行垫款单选
tableEvent_3 = {
    "click .chooseBank": function(e, a, item, index) {
        if (bankIds.indexOf(item.id) != -1) {
            $("#reAdvanceListBank").modal("hide");
            return tip({content: "您已添加相同数据"});
        }
        feeBankList (interUrl.feeManage.feeMatchByBankIds, item.id);
        bankIds.push(item.id);
        console.log(bankIds);
    }
};
handle_3 = function(value, row, index) {
    return ["<a class='chooseBank' href='javascript:;'>选择</a>"].join("");
};

//收款人
table_pay = function(params) {
    //当前登录用户所在机构的收款人
    tableData(params, {orgId: comn.user.companyId, accountPurpose : 2}, interUrl.feeManage.guaranteeAccountList);
};
tableEvent_pay = {
    "click .pay": function(e, a, item, index) {
        $("[name='accountName']").val(item.accountName);
        $("[name='accountNo']").val(item.cardNumber);
        $("[name='bankName']").val(item.subBankName);
        $("#payeeChoice").modal("hide");
    }
};
handle_pay = function(value, row, index) { return ["<a class='pay' href='javascript:;'>选择</a>"].join(""); };

$(function(){
  if (args["businessTypeCode"] === "FRONT_CAPITAL_APPLY_FLOW") {
    //页面加载获取opinion内容
    $("#opinionText").getOpinion_s(argsBopInfoId);
  }
    $("#payeeChoice").on("shown.bs.modal", function(){
        $('#table_pay').bootstrapTable(comn.table);
    });
    $("#opinionTab").click(function(e){
        e.preventDefault();
        if(!args['businessTypeCode']){
            return tip({content: "请先保存 !"});
        }
        $("#opinion>div").getLoad();
        $(this).tab('show');
    });
    //三级联动
    getBankList()
    // 数据导入
    $("#importData").click(function() {
        arrList.length = 0; //存放数据id
        bankIds.length = 0; //存放银行id
        dataArr.length = 0; //存放展示数据id
        $("#upFileInput").trigger("click");
    });
    //导出
    $('#exportBtn').click(function(){
        var downLink = interUrl.basic + interUrl.feeManage.feeDetailExport + "?id=" + args["feeId"] ;
        console.log(downLink);
        window.open(downLink, "_blank");
    });
    //提交
    $("#btn-comit").click(function () {
        var data = $("#table_data").bootstrapTable('getData');
        $('#advanceFeeFrom').validate();
        if ($("#advanceFeeFrom").valid() == true) {
            checkData(data, function(){
                if(args["feeType"] === "tip") {
                    feeSubmitSave("submit")
                } else {
                    submit();
                }
            })
        }
    });
    //提交-流程中
    $("#btn-comit-option").click(function () {
        isFirstNode("是否确认提交", opinionForm);
    });
    //退回上一步
    $("#btn-loanReview-back").click(function () {
        isFirstNode("是否确认退回", opinionForm_back);
    });
    //取消
    $("#btn-close-loan").click(function(){
        comn.closeTab();
    });
    //撤销
    $("#btn-cancel-loan").click(function () {
        isFirstNode("是否确认撤销", opinionForm_canle);
    });
    //关闭费用申请
    $("#btn-closeFee-loan").click(function(){
        closeFee();
    })
    //opinionForm单独保存
    $("#saveBtn").click(function(){
        isFirstNode("是否确认保存", opinionForm_saveOnly);
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
    //保存按钮
    $('#btn-save').click(function(){
        var data = $("#table_data").bootstrapTable('getData');
        $('#advanceFeeFrom').validate();
        if ($("#advanceFeeFrom").valid() == true) {
            checkData(data, function(){
                if (args["feeType"] === "tip") {
                    feeSubmitSave("save");
                } else {
                    feeManageNotice();
                }
            })
        }
    });
    isBtnClick($("#coBankId").val(), $("#orgId").val());

    $('#advanceListBank').on('shown.bs.modal', function (e) {
        resetTable(2, "advanceListBank");
    });
    $('#loanChoice').on('shown.bs.modal', function (e) {
        resetTable(1, "loanChoice");
    });
    $('#reAdvanceListBank').on('shown.bs.modal', function (e) {
        resetTable(3, "reAdvanceListBank");
    });
    $('#loanChoice5').on('shown.bs.modal', function (e) {
        resetTable(5, "loanChoice5");
    });
    $("#advanceListBank, #loanChoice, #loanChoice5, #reAdvanceListBank").on("hidden.bs.modal", function(){
        flag = false;
        console.log("flag:false===="+flag)
    });
});
$(document).on("click", ".editable-submit", function(){
    setTimeout(function(){
        account();
        countFun();
    }, 500);
});

//表格上边的统计数据更改
function countFun(){
    var sum = 0;
    var length = $("#table_data tbody tr").length;
    if (length == 1 && $("#table_data tbody tr").eq(0).hasClass("no-records-found"))
    {
        $(".NumberOfBar").text(0);
        $(".moneyNumber").text(0);
        return;
    }
    $("#table_data tbody tr").each(function(index,item){
        sum += Number($(item).find("td").eq(3).text());
    })
    $(".NumberOfBar").text(length);
    $(".moneyNumber").text(sum);
}
function account(){
    var editValue = $('#table_data .editable').editable('option', 'getValues', true);
    var sum = 0;
    $.each(editValue, function(i, v){
        if($(v).attr("data-name") =="applyAmount")
        {
            sum = comn.accAdd(sum, Number(v.innerText));
        }
        //sum += Number(v.innerText);
        
    })
    $("#applyAmount").val(sum.toFixed(2));
}
function appendDate(arr, name, num, status) {
    if(arr) {
        var _data = arr;
        if(_data.constructor === Array) {
            $.each(_data, function(i, v){
                addId++;
                v.dataTarget = v.dataTarget ? v.dataTarget : ("#"+ name);
                v.applyAmount = v.applyAmount ? v.applyAmount : "0";
                v.role = v.dataTarget ? (v.dataTarget === "#reAdvanceListBank" ? 3 : 2) : num;
                v.addId = addId;
                if (status === "fillData") {
                    if (v.dataTarget === "#loanChoice") {
                        arrList.push(v.projectId);
                    } else if (v.dataTarget === "#reAdvanceListBank") {
                        bankIds.push(v.loanFrontCapitalRecordId);
                    }
                }
            })
        }
        if (flag) {
            console.log("val:"+ $("#val").val()+" index:"+$("#index").val()+" flag_data:"+flag+" type:"+ typeof(Number($("#index").val())));
            deleteArr(name === "loanChoice" ? 2 : 3, name === "loanChoice" ? reselectionId : reselectionId3);
            $.each(dataArr, function(i, v){
                if (v.addId === Number($("#val").val())){
                    dataArr[i] = _data[0]; //替换掉被选中的值
                    return false;
                }
            });
            $("#table_data").bootstrapTable('updateRow', {
                index: Number($("#index").val()),
                row: _data[0]
            });
            reselectionId = "", reselectionId3 = "";
        } else {
            $("#table_data").bootstrapTable("append", _data)
            $.each(_data, function(i, v){
                dataArr.push(v);
            });
        }
        if (status != "fillData") { //页面刷新则不去执行自动计算
            account(); //计算申请金额
        }
        //account(); //计算申请金额
        //分公司风险经理审批、分公司总经理、集团风险复核、集团风险审批、计划财务部等垫款金额不可修改
        if (args["currentNodeKey"] == "FRONT_CAPITAL_APPLY_PROVINCE_RISK_APPROVAL" || args["currentNodeKey"] == "FRONT_CAPITAL_APPLY_BRANCH_MANAGER_APPROVAL" || args["currentNodeKey"] =="FRONT_CAPITAL_APPLY_GROUP_RISK_REVIEW" || args["currentNodeKey"] == "FRONT_CAPITAL_APPLY_GROUP_RISK_APPROVAL" || args["currentNodeKey"] == "FRONT_CAPITAL_PAYMENT" || type == "show") {
            $('#table_data .editable').editable('option', 'disabled', true); //不可修改申请金额时把edit屏蔽
        }
        console.log(dataArr)
    }
}
function submit(){
    if ($("#applyAmount").val() === "NaN") return tip({content: "列表中垫款金额存在非数字金额"});
    var _b = {loanItems: $("#table_data").bootstrapTable('getData')};
    var _a = {feeManageAdvance: $.extend($('#advanceFeeFrom').values(), {id: $("#FeeId").val() ? $("#FeeId").val() : ''})};
    url = type ? interUrl.feeManage.feeManageAdvanceSave : interUrl.feeManage.feeInitFlowSave;
    comn.ajax({
        url: url,
        //data: $.extend($('#advanceFeeFrom').values(), {id : $("#FeeId").val()}),
        data : {loanItemString: JSON.stringify($.extend(_a, _b))},
        success: function(res) {
            var _feeManageAdvanceFormId = type ? feeManageAdvanceFormId : res.data;
            var o = res.data;
            $('#advanceFeeFrom').values(o);
            $("#FeeId").val(o.id);
            args['loanApplyId'] = o.id;
            args['businessTypeCode'] = o.businessType;
            flowSubmit(interUrl.feeManage.preSubmit, interUrl.feeManage.submit2next, './Modal/task/myTask/index.html', {feeManageAdvanceFormId : _feeManageAdvanceFormId});
        }
    });
}
function feeSubmitSave(status){
    if ($("#applyAmount").val() === "NaN") return tip({content: "列表中垫款金额存在非数字金额"});
    var _b = {loanItems: $("#table_data").bootstrapTable('getData')};
    var _a = {feeManageAdvance: $.extend($('#advanceFeeFrom').values(), {id: $("#FeeId").val() ? $("#FeeId").val() : ''})};
    comn.ajax({
        url : interUrl.feeManage.feeManageNotice,
        data : {loanItemString: JSON.stringify($.extend(_a, _b))},
        success : function(res) {
            var o = res.data;
            if (o.count) {
                $("#feeSureModal").modal("show");
                $("#feeTipText").html(o.notice);
                $("#settlementSureOption").unbind("click").on("click", function(){
                    if (status === "save") {
                        feeManageNotice();
                    } else {
                        submit()
                    }

                    $("#feeSureModal").modal("hide");
                })
            } else {
                if (status === "save") {
                    feeManageNotice();
                } else {
                    submit()
                }
            }
        }
    })
}
function checkData(data, callback) {
    var eachFlag = true;
    if (data.length === 0) {
        return tip({content: '请添加相应数据'})
    }
     $.each(data, function(i, v){
         if (v.dealResult === 2) {
             tip({content: '存在失败的数据，请先处理!'});
             return eachFlag = false;
         }
         if (Number(v.applyAmount) === 0 || !Number(v.applyAmount)) {
             tip({content: '列表中的垫款金额不能为0或存在非法数字'});
             return eachFlag = false;
         }
     });
    if (typeof(callback) == "function" && eachFlag){callback()};
}
function feeManageNotice(){
    if (!type && businessAreaFlag) {
        businessAreaFlag = false;
        if ($("#businessArea").val() == "1") var _title = "浙江省内";
        if ($("#businessArea").val() == "2") var _title = "浙江省外";
        $("#tipText").text("您该笔垫款申请所选择的业务区域为："+ _title +"，请确认是否正确。");
        $("#sure").modal("show");
        $("#sureBtn").unbind("click").click(function () {
            $("#sure").modal("hide");
            saveData();
        })
    } else {
        saveData();
    }
}
function resetTable(num, name){
    console.log(num+" flag:"+flag);
    $(".coBankName").val($("#coBankName").val());
    $(".launchOrgName").val($("#orgName").val());
    if (flag && (num == "1" || num == "3")) {
        $("#searchForm_"+ num +" input[name=customerName]").val(customerName ? customerName : "");
        if (num == 3) {
            dataLoad_3 = function(params) {
                tableData(params, $.extend($("#searchForm_3").values(),{status : 0}), interUrl.feeManage.feeBankFeeList);
            }
        }
    }
    $("#table_"+num).bootstrapTable(comn.table);
    flag ? $("#table_"+num).bootstrapTable('refresh') : '';
    //flag = false;
}
function saveData (){
    if ($("#applyAmount").val() === "NaN") return tip({content: "列表中垫款金额存在非数字金额"});
    var _b = {loanItems: $("#table_data").bootstrapTable('getData')};
    var _a = {feeManageAdvance: $.extend($('#advanceFeeFrom').values(), {id: $("#FeeId").val() ? $("#FeeId").val() : ''})};
    console.log(_b, _a)
    var url = type ? interUrl.feeManage.feeManageAdvanceSave : interUrl.feeManage.feeInitFlowSave;
    comn.ajax({
        url: url,
        //data: $.extend($('#advanceFeeFrom').values(), {id : $("#FeeId").val()}),
        data: {loanItemString: JSON.stringify($.extend(_a, _b))},
        success: function(res) {
            var o = res.data;
            if (!type) {
                $("#FeeId").val(o);
            }
            $("#advanceFeeId").val(o);
            args['loanApplyId'] = o;
            args['businessTypeCode'] = "FRONT_CAPITAL_APPLY_FLOW";
            tip({content: "保存成功！"});
            if(!args['releventFlowNode'] || args['releventFlowNode']=='LAUNCH_FEE_APPLY'){
                $('#undo').removeClass('hide');
            }
        }
    });
    if (upImageInputFlag) {
        $(".upImageInput").trigger("click");
        upImageInputFlag = false;
    }
}
//判断按钮是否可点击
function isBtnClick(cooperativeBank, org) {
    if ((cooperativeBank != "" || cooperativeBank != 0) && (org != 0 || org != "")) {
        $("#isShow_btn").prop("disabled", false)
    } else {
        if (type == "approve") {
            return false;
        }
        $("#isShow_btn").prop("disabled", "disabled");
    }
}

//取消
$(document).on("click", "#cancel", function() {
    comn.closeTab();
});
//机构更换
$(document).on("change", "#orgId", function(){
    $("#orgName, .launchOrgName").val($(this).find(":selected").html());
    $(".launchOrgId, #org_Id").val($(this).val());
    isBtnClick($(this).val(), $("#coBankId").val())//是否显示按钮（银行垫款，导入数据，添加数据）；如果业务机构和合作银行有一个没选则按钮制灰。

})
//合作银行更换
$(document).on("change", "#coBankId", function(){
    $("#coBankName, .coBankName").val($(this).find(":selected").html());
    $(".coBankId, #coBank_Id").val($(this).val());
    isBtnClick($(this).val(), $("#orgId").val());//是否显示按钮（银行垫款，导入数据，添加数据）；如果业务机构和合作银行有一个没选则按钮制灰。
})
//清空查询条件
$(document).on("click", "#reset_btn_1, #reset_btn_2, #reset_btn_3, #reset_btn_5", function(){
    resetTable();
});
//是否显示提交按钮（1：省内-不提交；2：省外-提交)。
$(document).on("change", "#businessArea", function(){
    businessAreaFlag = true;
    $("input[name=businessArea]").val($(this).val());
    if ($(this).val() == "2") {
        $("#btn-comit").removeClass("hide");
    } else {
        $("#btn-comit").addClass("hide");
    }
})
//付款方式选择（1：现金； 2：银行转账）
$(document).on("change", "#PaymentMethod", function() {
    if ($(this).val() == "1") {
        $("#isCashPaymentMethod").hide();
        $("input[name=accountName], input[name=accountNo], input[name=bankName]").removeClass("required");
    } else {
        $("#isCashPaymentMethod").show();
        $("input[name=accountName], input[name=accountNo], input[name=bankName]").addClass("required");
    }
})
function modifyCompareValue(obj){
    $this = $(obj);
    var value = Number(comn.accDiv($this.val(), $("input[name=currentPlanRepayAmount]").val())).toFixed(2);
    $("input[name=modifyTime_value]").val(value);
}

// 上传方法
function upload() {
    return $.ajaxFileUpload({
        url: interUrl.basic + interUrl.feeManage.feeUpload,
        data: {
            orgId : $("#orgId").val(),
            coBankId : $("#coBankId").val()
        },
        secureuri: false,
        fileElementId: 'upFileInput',
        dataType: "json",
        success: function (res, status) {
            //flag = false;
            if (res.code == 10000) {
                tip({ content: "数据导入成功!!"});
                $("#table_data").bootstrapTable('destroy').bootstrapTable(tableConfig);
                appendDate(res.data, "loanChoice", 2)
            } else {
                tip({content: res.message });
            }
        },
        complete: function () {
            // console.log("msg");
            $("#exportTime").trigger("changeDate");
        },
        error: function (data, status, e) {
            tip({content: data.message});
        }
    });
}

//获取银行垫款
$(document).on("click", "#selected", function(){
    $("#advanceListBank").modal("hide");
    var arr = $("#table_2").bootstrapTable('getAllSelections');
    var  loanFrontCapitalRecordIds, ids = [];
    for (var i = 0; i < arr.length; i++) {
        if (bankIds.indexOf(arr[i].id) == -1) {
            bankIds.push(arr[i].id);
            ids.push(arr[i].id);
        } else {
            tip({ content : arr[i].projectNo + "已存在"});
        }
    }
    console.log(bankIds)
    if (ids.length == 0) {
        return;
    }
    loanFrontCapitalRecordIds = ids.join(",");
    feeBankList(interUrl.feeManage.feeMatchByBankIds, loanFrontCapitalRecordIds)
});
$(document).on("change", "#selectIs", function(){
    if ($(this).val() == "2"){ //失败
        getElementsByClassName("2")
    } else if ($(this).val() == "3"){ //成功
        getElementsByClassName("1");
    } else {
        getElementsByClassName("0");
    }
    account(); //计算申请金额
});
//筛选弹出层列表
$(document).on("click", "#btn-search_1", function(){
    $("#table_1").bootstrapTable("refresh", {url: "..."});
})
$(document).on("click", "#btn-search_5", function(){
    $("#table_5").bootstrapTable("refresh", {url: "..."});
})
$(document).on("click", "#btn-search_2", function(){
    $("#table_2").bootstrapTable("refresh", {url: "..."});
})
$(document).on("click", "#btn-search_3", function(){
    $("#table_3").bootstrapTable(comn.table);
    $("#table_3").bootstrapTable("refresh", {url: "..."});
})
$(document).on("click", "#btn-search_5", function(){
    $("#table_5").bootstrapTable("refresh", {url: "..."});
});

function getElementsByClassName(num, callback) {
    var ClassElements = [];
    if (num === '0'){
        ClassElements = dataArr;
    } else {
        $.each(dataArr, function(i, v){
            if (v.dealResult === parseInt(num)) {
                ClassElements.push(v);
            }
        });
    }
    $("#table_data").bootstrapTable('destroy');
    $("#table_data").bootstrapTable(tableConfig).bootstrapTable('append', ClassElements);
    if (typeof(callback) == "function"){callback()};
}
function feeBankList (url, loanFrontCapitalRecordIds, num) {
    comn.ajax({
        url : url,
        data : {
            loanFrontCapitalRecordIds : loanFrontCapitalRecordIds
        },
        success : function(res) {
            appendDate(res.data, "reAdvanceListBank", 3);
            $("#reAdvanceListBank").modal("hide")
        }
    })
}

//是否第一节点
isFirstNode = function (title, params) {
    var o = $("#advanceFeeFrom").values();
    $("#advanceFeeFrom").validate();
    if (!$("#advanceFeeFrom").valid()) {
        return false;
    }
    var data = $("#table_data").bootstrapTable('getData');
    $('#opinionForm').validate();
    if ($("#opinionForm").valid() == true) {
        checkData(data, function(){
            if (args["feeType"] === "tip") {
                notice();
            } else {
                firstSubmit();
            }
        })
    }
    function notice(){
        if ($("#applyAmount").val() === "NaN") return tip({content: "列表中垫款金额存在非数字金额"});
        var _b = {loanItems: $("#table_data").bootstrapTable('getData')};
        var _a = {feeManageAdvance: $.extend($('#advanceFeeFrom').values(), {id: $("#FeeId").val() ? $("#FeeId").val() : ''})};
        comn.ajax({
            url : interUrl.feeManage.feeManageNotice,
            //data : $('#advanceFeeFrom').values(),
            data: {loanItemString: JSON.stringify($.extend(_a, _b))},
            success : function(res) {
                var o = res.data;
                if (o.count) {
                    $("#feeSureModal").modal("show");
                    $("#feeTipText").html(o.notice);
                    $("#settlementSureOption").unbind("click").on("click", function(){
                        $("#feeSureModal").modal("hide");
                        firstSubmit();
                    })
                } else {
                    firstSubmit();
                }
            }
        })
    }
    function firstSubmit(){
        oppSureModal(title);
        $("#sureOption").unbind("click").click(function () {
            if ($("#applyAmount").val() === "NaN") return tip({content: "列表中垫款金额存在非数字金额"});
            var _b = {loanItems: $("#table_data").bootstrapTable('getData')};
            var _a = {feeManageAdvance: $.extend($('#advanceFeeFrom').values(), {id: $("#FeeId").val() ? $("#FeeId").val() : ''})};
            comn.ajax({
                url : interUrl.feeManage.feeManageAdvanceSave,
                //data:$.extend(o, {
                //    id : _id
                //}),
                data: {loanItemString: JSON.stringify($.extend(_a, _b))},
                success : function(res) {
                    params();
                }
            });
        })
    }
}

//提交
opinionForm = function () {
    comn.ajax({
        url: interUrl.common.opinion,
        data: $.extend($("#opinionForm").values(), argsBopInfoId),
        success: function (res) {
            $("#sureModal").modal("hide");
            flowSubmit(interUrl.feeManage.preSubmit, interUrl.feeManage.submit2next, './Modal/task/myTask/index.html', {feeManageAdvanceFormId : feeManageAdvanceFormId});
        }
    });
}
//退回上一步
opinionForm_back = function () {
    //保存流程意见
    comn.ajax({
        url: interUrl.common.opinion,
        data: $.extend($("#opinionForm").values(), argsBopInfoId),
        success: function (res) {
            $("#sureModal").modal("hide");
            comn.ajax({
                url:interUrl.feeManage.back2pre,
                data:{feeManageAdvanceFormId:feeManageAdvanceFormId},
                success:function(res){
                    tip({content:res.message || "返回成功"});
                    comn.closeTab();
                }
            })
        }
    });
}
//单保存
opinionForm_saveOnly = function() {
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
}
//撤销
opinionForm_canle = function() {
    $("#sureModal").modal("hide");
    comn.ajax({
        url:interUrl.feeManage.cancel,
        data: {feeManageAdvanceFormId : feeManageAdvanceFormId},
        success:function(res){
            tip({content:res.message || "取消成功"});
            comn.closeTab();
        }
    })
}
//关闭费用申请
closeFee = function() {
    $("#opinionForm").validate();
    if($("#opinionForm").valid() == true) {
        oppSureModal("是否确认关闭费用！");
        $("#sureOption").unbind("click").click(function () {
            $("#sureModal").modal("hide");
            comn.ajax({
                url: interUrl.feeManage.close,
                data: {feeManageAdvanceFormId: args['feeId']},
                success: function (res) {
                    tip({content: res.message});
                    comn.closeTab();
                }
            });
        });
    }
}

//判断显示提交还是退回
$("input[name='conclusion']").on('click', function () {
    var checkedV = $("input[name='conclusion']:checked").val();
    if (checkedV == 1) {
        if (args["currentNodeKey"] == "FRONT_CAPITAL_APPLY_PROVINCE_RISK_APPROVAL" || args["currentNodeKey"] == "FRONT_CAPITAL_APPLY_BRANCH_MANAGER_APPROVAL") {
            $("#btn-closeFee-loan").addClass("hide");
        }
        $("#btn-comit-option, #btn-save").removeClass("hide");
        $("#btn-loanReview-back").hide();
    } else {
        if (args["currentNodeKey"] == "FRONT_CAPITAL_APPLY_PROVINCE_RISK_APPROVAL" || args["currentNodeKey"] == "FRONT_CAPITAL_APPLY_BRANCH_MANAGER_APPROVAL") {
            $("#btn-closeFee-loan").removeClass("hide");
        }
        $("#btn-comit-option, #btn-save").addClass("hide");
        $("#btn-loanReview-back").show();
    }
});

//获取贷款机构三级下拉方法
function getBankList() {
    comn.ajax({
        url: interUrl.advanceFeeApply.apiFeeManageTypeUseTree,
        data: {},
        success: function (res) {
            function getBankShow(data) {
                //数据源
                var dataArr = data;
                var dataArr2 = [];
                var dataArr3 = [];
                //选中的银行名字数组
                var nameArr = [];
                //选中银行的id数组
                var idArr = [];
                //第一级机构选中id
                var treeBank1 = '';
                //第二级机构选中id
                var treeBank2 = '';
                //第三级机构选中ids
                var treeBank3 = [];

                //各级机构列表方法
                function getBankList(id, data) {
                    var html = "";
                    for (i = 0; i < data.length; i++) {
                        html += [
                            '<li>',
                            '<span class="text">' + data[i].feeName + '</span>',
                            '<span class="glyphicon" data-id="' + data[i].id + '"></span>',
                            '</li>',
                        ].join("");
                    }
                    $("#" + id).html(html);
                }

                //根据id找到对象相应数组
                function idToArr(id, arr) {
                    var data = {};

                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].id == id) {
                            data = arr[i];
                        }
                    }

                    return data;
                }

                //有无三级机构
                function judgeThreeZero(arr) {
                    var isTrue = true;
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].feeManageTypeResults.length !== 0) {
                            isTrue = false;
                        }
                    }

                    return isTrue;
                }

                //清空三级下拉数据
                function clearData(type) {
                    $('#feeCode').val('');
                    $('#coBankIdBox1').text('没有选中任何项');

                    if (type === 1) {
                        dataArr2 = [];
                        dataArr3 = [];

                        nameArr = [];
                        idArr = [];
                        treeBank2 = '';
                        treeBank3 = [];
                        $('#treeBank2').html('');
                        $('#treeBank3').html('');
                    }

                    if (type === 2) {
                        dataArr3 = [];

                        nameArr = [];
                        idArr = [];
                        treeBank3 = [];
                        $('#treeBank3').html('');
                    }

                    if (type === 3) {
                        treeBank3 = [];
                        nameArr = [];
                        idArr = [];
                    }

                }

                //根据类型和有无下级支行显示相应几级联动
                function showChooseList(length, type, arr) {
                    $('#treeBank2').parent().removeClass('hide');
                    $('#treeBank3').parent().removeClass('hide');

                    if (type === 1 && length === 0) {
                        $('#treeBank2').parent().addClass('hide');
                        $('#treeBank3').parent().addClass('hide');
                    }

                    if (type === 1 && length !== 0) {
                        var isHaveTree = judgeThreeZero(arr);
                        if (isHaveTree) {
                            $('#treeBank3').parent().addClass('hide');
                        }
                    }


                    if (type === 2 && length === 0) {
                        $('#treeBank3').parent().addClass('hide');
                    }

                }

                //根据类型和有无下级给选中银行id和名称赋值
                function getnameArridArr(data, type) {
                    if (type === 1) {
                        if (data.feeManageTypeResults.length === 0) {
                            nameArr.push(data.feeName);
                            idArr.push(data.id);
                        }

                        var isHaveTree = judgeThreeZero(data.feeManageTypeResults);
                        if (data.feeManageTypeResults.length !== 0 && isHaveTree) {
                            for (var i = 0; i < data.feeManageTypeResults.length; i++) {
                                nameArr.push(data.feeManageTypeResults[i].feeName);
                                idArr.push(data.feeManageTypeResults[i].id);
                            }
                        }

                        if (data.feeManageTypeResults.length !== 0 && !isHaveTree) {
                            for (var j = 0; j < data.feeManageTypeResults.length; j++) {
                                for (var k = 0; k < data.feeManageTypeResults[j].feeManageTypeResults.length; k++) {
                                    nameArr.push(data.feeManageTypeResults[j].feeManageTypeResults[k].feeName);
                                    idArr.push(data.feeManageTypeResults[j].feeManageTypeResults[k].id);
                                }
                            }
                        }
                    }

                    if (type === 2) {
                        if (data.feeManageTypeResults.length === 0) {
                            nameArr.push(data.feeName);
                            idArr.push(data.id);
                        }

                        if (data.feeManageTypeResults.length !== 0) {
                            for (var n = 0; n < data.feeManageTypeResults.length; n++) {
                                nameArr.push(data.feeManageTypeResults[n].feeName);
                                idArr.push(data.feeManageTypeResults[n].id);
                            }
                        }
                    }

                    //$('#feeCode').val(idArr.join(','));
                    $('#coBankIdBox1').text(nameArr.join(','));
                }

                //合作机构一级点击事件
                $(document).on("click", "#treeBank1 li", function () {
                    clearData(1);
                    if ($(this).children('.glyphicon').eq(0).hasClass('glyphicon-ok')) {
                        $(this).children('.glyphicon').eq(0).removeClass('glyphicon-ok');
                        treeBank1 = '';
                        showChooseList(0, 1, []);
                        return;
                    }

                    $('#treeBank1 li .glyphicon').removeClass('glyphicon-ok');
                    $(this).children('.glyphicon').eq(0).addClass('glyphicon-ok');
                    treeBank1 = $(this).children('.glyphicon').eq(0).attr('data-id');
                    $("#feeTypeCode").val(treeBank1)
                    var bank = idToArr(treeBank1, dataArr);

                    showChooseList(bank.feeManageTypeResults.length, 1, bank.feeManageTypeResults);
                    getnameArridArr(bank, 1);

                    //二级菜单遍历
                    if (bank.feeManageTypeResults.length !== 0) {
                        dataArr2 = bank.feeManageTypeResults;
                        getBankList('treeBank2', dataArr2);
                    }
                    else
                    {
                        $("#feeCategoryCode").val('')
                        $('.treeBankList').toggleClass('hide');
                    }
                });

                //合作机构二级点击事件
                $(document).on("click", "#treeBank2 li", function () {
                    clearData(2);
                    if ($(this).children('.glyphicon').eq(0).hasClass('glyphicon-ok')) {
                        $(this).children('.glyphicon').eq(0).removeClass('glyphicon-ok');
                        treeBank2 = '';
                        showChooseList(0, 2, []);
                        return;
                    }

                    $('#treeBank2 li .glyphicon').removeClass('glyphicon-ok');
                    $(this).children('.glyphicon').eq(0).addClass('glyphicon-ok');
                    treeBank2 = $(this).children('.glyphicon').eq(0).attr('data-id');
                    $("#feeCategoryCode").val(treeBank2)
                    var bank = idToArr(treeBank2, dataArr2);

                    showChooseList(bank.feeManageTypeResults.length, 2, bank.feeManageTypeResults);
                    getnameArridArr(bank, 2);

                    //三级菜单遍历
                    if (bank.feeManageTypeResults.length !== 0) {
                        dataArr3 = bank.feeManageTypeResults;
                        getBankList('treeBank3', dataArr3);
                    }
                    else
                    {
                        $('.treeBankList').toggleClass('hide');
                    }
                });

                //合作机构三级点击事件
                $(document).on("click", "#treeBank3 li", function () {
                    clearData(3);

                    if ($(this).children('.glyphicon').eq(0).hasClass('glyphicon-ok')) {
                        $('.treeBankList').toggleClass('hide');
                    } else {
                        $(this).children('.glyphicon').eq(0).addClass('glyphicon-ok');
                        $(this).siblings("li").children('.glyphicon').removeClass('glyphicon-ok');
                    }

                    for (var j = 0; j < $('#treeBank3 li .glyphicon').length; j++) {
                        if ($('#treeBank3 li .glyphicon').eq(j).hasClass('glyphicon-ok')) {
                            treeBank3.push($('#treeBank3 li .glyphicon').eq(j).attr('data-id'))
                        }
                    }
                    for (var i = 0; i < treeBank3.length; i++) {
                        var bank = idToArr(treeBank3[i], dataArr3);
                        nameArr.push(bank.feeName);
                        idArr.push(bank.id);
                    }
                   
                    $('#feeCode').val(idArr.join(',')); 
                    $('#coBankIdBox1').text(nameArr.join(','));
                    $('.treeBankList').toggleClass('hide');
                });

                //初始化合作机构
                getBankList('treeBank1', dataArr);
            }
            getBankShow(res.data);

            //贷款机构下拉点击事件
            $('#treeBankClick1').bind('click', function () {
                $('.treeBankList').toggleClass('hide');
            });
        }
    });
}
$("#guaranteeId").bind('change', function () {
    guaranteeIdArray.forEach(function (item) {
        if (item[0].guaranteeId == $("#guaranteeId").val()) {
            $("#accountName").val(item[0].accountName)
            $("#accountNo").val(item[0].cardNumber)
            $("#bankName").val(item[0].openingBank)
            return;
        }
    })
})
$("#coBankId").bind("change",function(){
        guaranteeIdArray = []
        $("#accountName").val('')
        $("#accountNo").val('')
        $("#bankName").val('')
        comn.ajax({
        url: interUrl.advanceFeeApply.cooperationGuaranteeGetByCoBankId,
        data: {
            bankId: $("#coBankId").val()
        },
        success: function (res) {
            var html = '<option value="">--请选择--</option>';
            if (res.code === 10000) {
                if (res.data.length > 0) {
                    res.data.forEach(function (item) {
                        html += "<option value=" + item.id + ">" + item.organizationName + "</option>"
                        guaranteeIdArray.push(item.accounts)
                    })
                }
                $("#guaranteeId").html(html)
            }
            else {
                $("#guaranteeId").html(html)
            }
        }
    })
})