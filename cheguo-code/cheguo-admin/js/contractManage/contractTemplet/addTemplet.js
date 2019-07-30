var paramType, signParamsString, fillParamsString, handle_isVerify, eventHandle_isVerify, handle, eventHandle;
var args = comn.getArgs();

//修改表格统一配置参数
var tableConfig = {};
$.map(comn.table, function (v, k) {
    tableConfig[k] = v;
});
tableConfig['height'] = "500";
tableConfig['pagination'] = false;
function ParamsString(stringName, key) {
    comn.ajax({
        url: interUrl.eContract.getParam,
        data: {
            paramType: key
        },
        success: function (res) {
            var j, len, o, ref, str;
            o = res.data;
            str = [];
            ref = res.data;
            for (j = 0, len = ref.length; j < len; j++) {
                o = ref[j];
                str.push("<option value='" + o.paramValue + "'>" + o.paramName + "</option>");
            }
            if (key === "1") {
                fillParamsString = str.join("");
            } else if (key === "2") {
                signParamsString = str.join("");
            }
        }
    })
}
ParamsString("fillParamsString", "1"); //填充域
ParamsString("signParamsString", "2"); //签字域
$("#table1").bootstrapTable("destroy").bootstrapTable(tableConfig);

//是银行还是合作机构
if(args["orgType"] === '1'){
    $("#bankId").eContractBank('', function () {
        $('.selectpicker').selectpicker({noneSelectedText: '--请选择--'});
        $('.selectpicker').selectpicker('refresh');
    })
}else{
    $("#bankId").getTrustIdList2('', function () {
        $('.selectpicker').selectpicker({noneSelectedText: '--请选择--'});
        $('.selectpicker').selectpicker('refresh');
    })
    $('#submitBankBox').addClass('hide');
    $('#bankNameListName').html('合作机构:')
}



if(!args["type"]) {
    $("#bankId1").eContractBank();
}
$("#bankId1").change(function () {
    $("#bankName").val($(this).find("option:selected").html());
});
paramType = function (value, row, index) {
    return ["", "填充域", '签名域'][value] || null;
}
if (args["type"] === "modify") {
    comn.ajax({
        url: interUrl.eContract.econtractSelect,
        data: {
            id: args["id"]
        },
        success: function (res) {
            $("#templetForm").values(res.data);
            $("#table1").bootstrapTable("append", res.data.paramsJson);
            $("#bankId1").eContractBank(res.data.submitBankId);
            setTimeout(function () {
                $('.selectpicker').selectpicker('render')
                if (res.data.bankIdList) {
                    $('.selectpicker').selectpicker('val', res.data.bankIdList.split(","));
                }
                $(".paramValue").each(function(){
                    $(this).val($(this).prev("input").val())
                });
                $(".checkSms").each(function(){
                    $(this).val($(this).prev("input").val())
                })
            }, 500)
        }
    })
}

handle = function (value, row, index) {
    if (row.paramType === 1) {
        return ["<form>"+ (args['type'] === "modify" ? "<input class='hiddenValue' type='hidden' value='"+ row.paramValue+"'>" : '')+"<select  name='paramValue' class='form-control paramValue'><option value=''>--请选择--</option>"+ fillParamsString +"</select></form>"]
    } else if (row.paramType === 2) {
        return ["<form>"+ (args['type'] === "modify" ? "<input class='hiddenValue' type='hidden' value='"+ row.paramValue+"'>" : '')+"<select  name='paramValue' class='form-control paramValue'><option value=''>--请选择--</option>"+ signParamsString +"</select></form>"]
    }
}
eventHandle = {
    "change .paramValue": function (e, value, row, index) {
        row.paramValue = $(this).val();
    }
}

handle_isVerify = function (value, row, index) {
    if (row.paramType === 2) {
        return ["<form>"+ (args['type'] === "modify" ? "<input class='hiddenValue' type='hidden' value='"+ row.checkSms+"'>" : '')+"<select  name='checkSms' class='form-control checkSms'><option value='true'>是</option><option value='false' selected>否</option></select></form>"]
    }
}
eventHandle_isVerify = {
    "change .checkSms": function (e, value, row, index) {
        row.checkSms = $(this).val();
    }
}

$("#btn-save").click(function () {
    if ($("#templetForm").valid() == false)
        return;
    var _a = $("#templetForm").values();
    _a.bankNameList = $(".filter-option").html();
    _a.bankIdList = $("#bankId").val() ? $("#bankId").val().join(",") : '';
    _a.orgType = args["orgType"];

    var _data = $("#table1").bootstrapTable('getData');
    var fillParamsArr = [], signParamsArr = [];
    $.each(_data, function (i, v) {
        if (v.paramType === 1) {
            fillParamsArr.push(v);
        } else if (v.paramType === 2) {
            signParamsArr.push(v);
        }
    });

    var _c = {fillParamsJson: fillParamsArr};
    var _d = {signParamsJson: signParamsArr};
    console.log(fillParamsArr);
    var _url = $("#id").val() ? interUrl.eContract.econtractModify : interUrl.eContract.eContractAdd;
    comn.ajax({
        url: _url,
        data: {data: JSON.stringify($.extend(_a, _c, _d))},
        success: function (res) {
            if (res && res.code == 10000) {
                tip({content: '保存成功!'});
                window.location.href = 'index.html';
            } else {
                tip({content: res.message});
            }
            return $("#btn-search").trigger("click");
        }
    });
})
$("#addBtn").click(function () {
    comn.ajax({
        url: interUrl.eContract.econtractModel,
        data: {
            templateNo: $("#templateNo").val(),
            templateName: $("#templateName").val(),
            templateId: args["id"]
        },
        success: function (res) {
            if (res.data && res.data.paramsList) {
                $("#table1").bootstrapTable("destroy").bootstrapTable(tableConfig);
                $("#paramsMd5").val(res.data.paramsMd5);
                $("#table1").bootstrapTable("append", res.data.paramsList);
            }
        }
    })
});