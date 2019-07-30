var args, dataLoad_1, handle_1, handle_2,tableEvent_2, CustomerLoad, loanVal, messageCheck, selectCheck, fileSended1, fileSended2, _data;
args = comn.getArgs();
// 新增
if (window.parent.cache.emailList != "" && window.parent.cache.emailList != null) {
    _data = jQuery.parseJSON(window.parent.cache.emailList);
}
if (args["type"] == "show") {
    $("#checkContract, #checkDatum").remove();
}
$(function () {
    $("select[name='expressCompanyCode']").change(function () {
        if (this.value == "NONE") {
            $("#billNoItem").addClass("hidden").find("input").val("");
        } else {
            $("#billNoItem").removeClass("hidden");
        }

    });
    if (_data != null && _data != "") {
        $("#table1").bootstrapTable("append", _data);
        $(".toalItem").html(_data.length);
        $("input[name='recipient']").val(_data[0].coBankName);
        comn.ajax({
            url: interUrl.common.bankInfo,
            data: {bankId: _data[0].coBankId},
            success: function (res) {
                $("input[name='recipientAddr']").val((res.data.provinceName || "") + (res.data.cityName || "") + (res.data.countyName || "") + res.data.detailedAddress || "");
                $("input[name='sender']").val(comn.user.realname);
                $("input[name='senderMobile']").val(comn.user.username);
            }
        });
    } else {
        var billId = args["billId"];
        var type = args["type"];
        if (type == "show") {
            $("#ok").addClass("hide");
            $("#disable_form").attr("disabled", "true");
            $("#textHtml").html("快递单查看");
        } else {
            $("#textHtml").html("快递单修改");
        }
        comn.ajax({
            url: interUrl.mockList || interUrl.documentManagement.getExpress,
            data: {billId: billId},
            success: function (res) {
                $("input[name='billNo']").val(res.data.billNo);
                $("select[name='expressCompanyCode']").val(res.data.expressCompanyCode);
                $("input[name='recipientAddr']").val(res.data.recipientAddr);
                $("input[name='recipient']").val(res.data.recipient);
                $("input[name='sender']").val(res.data.sender || comn.user.realname);
                if (res.data.sendTime != "" && res.data.sendTime != null) {
                    $("input[name='sendTime']").val(res.data.sendTime.substr(0, 10));
                }
                $("input[name='senderMobile']").val(res.data.senderMobile || comn.user.username);
                $("select[name='expressCompanyCode']").trigger("change");
            }
        });
        comn.ajax({
            url: interUrl.mockList || interUrl.documentManagement.expressList,
            data: {billId: billId},
            success: function (res) {
                $("#table1").bootstrapTable("append", res.data);
                $(".toalItem").html(res.data.length);
            }
        });
    }
});
handle_1 = function (value, row, index) {
    //多传银行编码
    var bankInput = "<div class='hide' id='bankId'>" + row['coBankId'] + "</div>"

    if (row['fileSended'] && (row['fileSended'] & 2) == 2)return "已发"+bankInput;
    var fileList = "";
    if (row['fileList'] && (row['fileList'] & 2) == 2) {
        fileList = " checked='true' ";
    }
    return ["<input type='checkbox' class='check1' data-documentDeliverId='" + row['id'] + "'" + fileList + " value='2'/>",bankInput].join("");
};

handle_2 = function (value, row, index) {
    if (row['fileSended'] && (row['fileSended'] & 1) == 1)return "已发";
    var fileList = "";
    if (row['fileList'] && (row['fileList'] & 1) == 1) {
        fileList = " checked='true' ";
    }   
    return ["<input type='checkbox' class='check2' data-documentDeliverId='" + row['id'] + "'" + fileList + " value='1'/>"].join("");
};
tableEvent_2 = {
    "click .check2":function(e,a,item,index){
        //抵押状态 未抵押-抵押按钮不可选中
        if (item['pledgeStatus'] == 2) {
            $(this).prop("checked",false);
            tip({
                content: '未抵押状态，不能传抵押资料'
            });
        }        
    }
}

$("#expressCompanyCode").getExpressCompanyCode();
$("#ok").click(function () {
    if ($("#editForm").valid()) {
        var data;
        data = $("#editForm").values();
        var expressCompany = $('select[name="expressCompanyCode"] option:selected').text();
        //多传银行接口编码
        data["recipientId"] = $('#bankId').text();

        data["expressCompany"] = expressCompany;
        data["recipientType"] = 2; // recipientType	 收件组织类型(2:公司，1：银行)
        var chks = $("#table1").find("input:checked");
        var trDataList = $("#table1 tr");
        var trData = null;
        var checkedBool = false;
        var checkedInput = false;
        var fileSended = 0;
        var billId = args["billId"];
        var basicUrl = interUrl.documentManagement.addExpress;
        for (var i = 1; i < trDataList.length; i++) {
            trData = trDataList[i];
            $(trData).find("input").each(function () {
                if (this.checked) {
                    checkedBool = true;
                    checkedInput = true;
                    data['list[' + (i - 1) + '].documentDeliverId'] = $(this).data("documentdeliverid");
                    fileSended = fileSended + parseInt(this.value);
                }
            });
            if (checkedInput) {
                checkedInput = false;
                data['list[' + (i - 1) + '].fileList'] = fileSended;
                fileSended = 0;
            }
        }
        if (!checkedBool) {
            $("#dialog").modal('show');
            return;
        }
        if (billId) {
            basicUrl = interUrl.documentManagement.saveExpress;
            data['id'] = billId;
        }
        console.log(data);
        return comn.ajax({
            url: basicUrl,
            data: data,
            success: function (res) {
                tip({
                    content: billId ? "修改成功!" : "发件成功!"
                });
                window.parent.cache.emailList = "";
                return window.parent.toUrl({
                    url: "./Modal/documentManagement/sendManageCompany/index.html"
                });
            }
        });
    }
});
$("#cancel").click(function () {
    return window.parent.toUrl({
        url: "./Modal/documentManagement/sendManageCompany/index.html"
    })
});
$("#table1").bootstrapTable({
    "clickToSelect": false,
    "undefinedText": "--",
    "classes": "table-striped table-hover table",
    "pagination": false,
    "sidePagination": "server",
    "queryParams": "queryParams",
    "paginationFirstText": "第一页",
    "paginationPreText": "上一页",
    "paginationNextText": "下一页",
    "paginationLastText": "最后一页",
    "height": "500"
})
$("#checkContract").change(function() {
    var _this = $(this);
    if(_this.prop("checked") === true) {
        $(".check1").prop("checked", true);
    } else {
        $(".check1").prop("checked", false);
    }
});
$("#checkDatum").change(function() {
    var _this = $(this);
    if(_this.prop("checked") === true) {
        $(".check2").prop("checked", true);
    } else {
        $(".check2").prop("checked", false);
    }
});