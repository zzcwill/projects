var dataLoad_1, tableEvent_1, handle_1, statusLoan, loanType;
var dataLoad_2, tableEvent_2, handle_2;

//区分银行和机构字段 1银行，2合作机构
var orgType = 1;
//银行选项卡事件
$('#orgTypeTab li a').bind('click',function(){
   
    var index = $('#orgTypeTab li a').index($(this));
    if(index === 0){
        orgType = 1;
        $('#bankIdName').html('合作银行：');
        $('#bankIdName2').html('<span class="text-danger">*</span>合作银行：'); 
        $('#searchForm select.bankId').getLoanBank($('#searchForm select.orgId').val())      
    }else{
        orgType = 2;
        $('#bankIdName').html('合作机构：');
        $('#bankIdName2').html('<span class="text-danger">*</span>合作机构：');
        $('#searchForm select.bankId').getTrustIdList($('#searchForm select.orgId').val())           
    }
})

//查询点击事件
$("#btn-search2").unbind('click').click(function() {
    if(orgType === 1){
        $("#table").bootstrapTable('refresh', {url: '...'});
    }else{
        $("#table2").bootstrapTable('refresh', {url: '...'});
    }
});


//银行表格查询方法
dataLoad_1 = function(params) {
    tableData(params, $.extend($("#searchForm").values(),{
        orgType: 1
    }), interUrl.loanProduct.list)
}
tableEvent_1 = {
    "click .modify, .seeDetail": function (e, a, item, index) {
        var _className = $(this).attr("class");
        $("#addPay").modal("show");
        if (_className === "seeDetail") {
            $("#modalTitle").html("查看产品配置");
            $("#isSeeDetail").prop("disabled", "disabled");
            $(".btn-info").addClass("hide");
        } else {
            $("#modalTitle").html("修改产品配置");
            $("#isSeeDetail").prop("disabled", false);
            $(".btn-info").removeClass("hide");
        }
        comn.ajax({
            url: interUrl.loanProduct.get,
            data: {
                id: item.id
            },
            success: function(res) {
                $("#addPayForm").values(res.data);
                setTimeout(function(){
                    $("#bankId").getLoanBank(res.data.orgId, res.data.bankId);
                    $("#bankName").val(res.data.bankName);
                    $(".labelCheckbox input").each(function(){
                        if($(this).val() === '1') {
                            $(this).prop("checked", "checked")
                        }
                    });
                    $("#financialProductIds").getProductIds(res.data.bankId, res.data.financialProductIds, function(){
                        $('.selectpicker').selectpicker({noneSelectedText:"请选择(可多选)"});
                        $('.selectpicker').selectpicker('val', res.data.financialProductIds ? res.data.financialProductIds.split(",") : '');
                        $('.selectpicker').selectpicker('refresh');
                    });
                }, 200)
            }
        })
    },
    "click .stop": function(e, a, item, index) {
        comn.ajax({
            url: interUrl.loanProduct.status,
            data: {
                id: item['id'],
                status: item["status"] == 1 ? 2 : 1
            },
            success: function(res) {
                tip({content: (item["status"]==1?"停用":"启用")+"成功!"});
                $("#table").bootstrapTable('refresh');
            }
        });
    }
}

//操作
handle_1 = function(value, row, index){
    var handleString = "";
    if (row.status == 1) {
        handleString = "<li><a class='stop'>停用</a></li><li><a class='seeDetail'>查看详情</a></li>";
    } else if (row.status == 2) {
        handleString = "<li><a class='stop'>启用</a></li><li><a class='modify'>修改</a></li><li><a class='seeDetail'>查看详情</a></li>";
    }
    return '<div class="btn-group">' +
        '<button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        '操作<span class="caret"></span>' +
        '</button>' +
        '<ul class="dropdown-menu">' +
        handleString +
        '</ul>'+
        '</div>'
};


//合作机构表格查询方法start
dataLoad_2 = function(params) {
    tableData(params, $.extend($("#searchForm").values(),{
        orgType: 2
    }), interUrl.loanProduct.list)
}
tableEvent_2 = {
    "click .modify, .seeDetail": function (e, a, item, index) {
        var _className = $(this).attr("class");
        $("#addPay").modal("show");
        if (_className === "seeDetail") {
            $("#modalTitle").html("查看产品配置");
            $("#isSeeDetail").prop("disabled", "disabled");
            $(".btn-info").addClass("hide");
        } else {
            $("#modalTitle").html("修改产品配置");
            $("#isSeeDetail").prop("disabled", false);
            $(".btn-info").removeClass("hide");
        }
        comn.ajax({
            url: interUrl.loanProduct.get,
            data: {
                id: item.id
            },
            success: function(res) {
                $("#addPayForm").values(res.data);
                setTimeout(function(){
                    $("#bankId").getTrustIdList(res.data.orgId, res.data.bankId);
                    $("#bankName").val(res.data.bankName);
                    $(".labelCheckbox input").each(function(){
                        if($(this).val() === '1') {
                            $(this).prop("checked", "checked")
                        }
                    });
                    $("#financialProductIds").getProductIds(res.data.bankId, res.data.financialProductIds, function(){
                        $('.selectpicker').selectpicker({noneSelectedText:"请选择(可多选)"});
                        $('.selectpicker').selectpicker('val', res.data.financialProductIds ? res.data.financialProductIds.split(",") : '');
                        $('.selectpicker').selectpicker('refresh');
                    });
                }, 200)
            }
        })
    },
    "click .stop": function(e, a, item, index) {
        comn.ajax({
            url: interUrl.loanProduct.status,
            data: {
                id: item['id'],
                status: item["status"] == 1 ? 2 : 1
            },
            success: function(res) {
                tip({content: (item["status"]==1?"停用":"启用")+"成功!"});
                $("#table2").bootstrapTable('refresh');
            }
        });
    }
}

handle_2 = function(value, row, index){
    var handleString = "";
    if (row.status == 1) {
        handleString = "<li><a class='stop'>停用</a></li><li><a class='seeDetail'>查看详情</a></li>";
    } else if (row.status == 2) {
        handleString = "<li><a class='stop'>启用</a></li><li><a class='modify'>修改</a></li><li><a class='seeDetail'>查看详情</a></li>";
    }
    return '<div class="btn-group">' +
        '<button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        '操作<span class="caret"></span>' +
        '</button>' +
        '<ul class="dropdown-menu">' +
        handleString +
        '</ul>'+
        '</div>'
};
//合作机构表格查询方法end




loanType = function(value, row, index) {
    switch (value) {
        case 5:
            return '车主贷';
            break;
        case 6:
            return '车价贷';
            break;
        case 7:
            return '易融贷';
            break;
        case 8:
            return '车信贷';
            break;            
        default :
            return '--'
            break
    }
}
carTypeCode = function (value, row, index) {
    return ["", "新车", "二手车", "全部"][value] || null;
}
statusLoan = function(value, row, index){
    return ["", "启用", "停用"][value] || null;
}
$("#btn_addPay").click(function(){
    $("#modalTitle").html("新增产品配置");
    $("#addPay").modal("show");
    $("#isSeeDetail").prop("disabled", false);
    $("#addPayForm input:not(.fuseAmountType)").val("");
    $("#bankId").html("<option value=''>--请选择--</option>");
    $('.selectpicker').selectpicker('val', []);
    $(".dropdown-menu.inner").html("");
    $("#save").removeClass("hide");
});

$("#save").click(function(){
    var _url = $("#id").val() ? interUrl.loanProduct.update : interUrl.loanProduct.add;
    $("#addPayForm").validate();
    if($("#addPayForm").valid() == true){
        var maxLoanAmount = Number($("input[name=maxLoanAmount]").val());
        var minLoanAmount = Number($("input[name=minLoanAmount]").val());
        if (maxLoanAmount < minLoanAmount){
            return tip({content: "贷款的结束金额需大于开始金额"})
        }
        var maxApplyAmount = Number($("input[name=maxApplyAmount]").val());
        var minApplyAmount = Number($("input[name=minApplyAmount]").val());
        if (maxApplyAmount <= minApplyAmount){
            return tip({content: "申请金额的结束金额需大于开始金额"})
        }
        if (accSub($("input[name=maxPrice]").val(), $("input[name=minPrice]").val()) < 0) {
            return tip({content: "请输入有效的限价区间！"});
        }
        var o = $("#addPayForm").values();
        o.isInsuranceFee = $("#isInsuranceFee").val() ? $("#isInsuranceFee").val() : '0';
        o.isPurchaseTaxFee = $("#isPurchaseTaxFee").val() ? $("#isPurchaseTaxFee").val() : '0';
        o.isGpsFee = $("#isGpsFee").val() ? $("#isGpsFee").val() : '0';
        o.financialProductIds = $("#financialProductIds").val().join(",");

        //传入银行还是金融类型
        o.orgType = orgType
        comn.ajax({
            url: _url,
            data: o,
            success: function(res) {
                tip({content: "保存成功！"});

                if(orgType === 1){
                    $('#table').bootstrapTable('refresh',{url:'...'});
                }else{
                    $('#table2').bootstrapTable('refresh',{url:'...'});
                }
                $("#addPay").modal("hide");
            }
        })
    }
});
$(".labelCheckbox input").change(function(){
    $(this).is(':checked') ? $(this).val("1") : $(this).val("0");
});
$(function(){
    var dataArr =[["#loanType", "LoanType"]];
    $.getCommonMethodPort(dataArr);
    $(".orgId").getOrg();
    $(".orgId").change(function(){
        if(orgType === 1){
            $(this).parents("form").find("select.bankId").getLoanBank($(this).val())
        }else{
            $(this).parents("form").find("select.bankId").getTrustIdList($(this).val())
        }
    });
    $("#addPayForm select[name=orgId], #addPayForm select[name=bankId]").change(function(){
        $(this).siblings('input[type="hidden"]').val($(this).find("option:selected").text())
    });
    $("#bankId").change(function(){
        var vBank = $(this).val();
        $("#financialProductIds").getProductIds(vBank,'', function(){
            $('.selectpicker').selectpicker({noneSelectedText:"请选择(可多选)"});
            $('.selectpicker').selectpicker('refresh');
        })
    }); 
    $('.selectpicker').selectpicker({noneSelectedText:"请选择(可多选)"});
});
function accSub(arg1, arg2){ //js精度问题(减法)
    var r1,r2,m,n;
    try{
        r1=arg1.toString().split(".")[1].length
    }catch(e){r1=0}
    try{
        r2=arg2.toString().split(".")[1].length
    }catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    //last modify by deeka
    //动态控制精度长度
    n=(r1>=r2)?r1:r2;
    return ((arg1*m-arg2*m)/m).toFixed(n);
}