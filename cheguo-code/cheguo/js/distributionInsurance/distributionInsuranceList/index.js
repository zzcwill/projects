var dataLoad_1, dataLoad_2, _arr, handle, tableEvent,handle_1,tableEvent_1,reBack;
dataLoad_1 = function (params) {
    tableData(params, $("#searchForm").values(), interUrl.distributionInsurance.insureList, function () {
        var checkAmmount = 0;
        var assetValue = 0;
        var arr_projectId = [];
        arr_projectId.length = 0;
        _arr = "";
        $("#table1").on('check.bs.table', function (e, row) {
            var assetValue = parseFloat(row["contractAmount"]);
            if (isNaN(assetValue)) {
                assetValue = 0;
            }
            checkAmmount = comn.accAdd(checkAmmount, assetValue);
            $('#checkAmmount').val(checkAmmount);
            arr_projectId.push(row["projectId"]);
            _arr = arr_projectId.join(",");
        }).on('uncheck.bs.table', function (e, row) {
            var assetValue = parseFloat(row["contractAmount"]) || 0;
            checkAmmount = comn.accSub(checkAmmount, assetValue);
            $('#checkAmmount').val(checkAmmount);
            arr_projectId.splice($.inArray(row["projectId"], arr_projectId), 1);
            _arr = arr_projectId.join(",");
        }).on('uncheck-all.bs.table', function (e, row) {
            assetValue = 0;
            checkAmmount = 0;
            $('#checkAmmount').val(0);
            arr_projectId.length = 0;
            _arr = "";
        }).on('check-all.bs.table', function (e, row) {
            checkAmmount = 0;
            arr_projectId.length = 0;
            for (var i = row.length - 1; i >= 0; i--) {
                assetValue += parseFloat(row[i].contractAmount || 0);
                arr_projectId.push(row[i].projectId);
            }
            ;
            _arr = arr_projectId.join(",");
            checkAmmount = comn.accAdd(checkAmmount, assetValue);
            $('#checkAmmount').val(checkAmmount);
        });

    });
};
handle = function(value, row, index){
    return ['<div class="btn btn-primary btn-xs seeDetails">查看详情</div>'].join("");
}
handle_1 = function(value,row,index){
    if(row.insuranceState==4){//退回状态显示查看详情按钮
        return ["<div class='btn btn-primary btn-xs seeOption'>查看详情</div>"].join("");
    }else{
        return ["<div></div>"].join("");
    }

};
tableEvent_1 = {
    "click .seeOption":function(e,a,item,index){
        reBack=1;
        console.log(reBack);
        comn.addTab({
            title:"查看详情",
            href: './Modal/distributionInsuranceCo/distributionInsuranceCoList/distributionInsuranceInfo.html?projectId='+item.projectId +"&projectNo="+item.projectNo+"&loanApplyId="+item.relativeApplyId1 + "&businessTypeCode=LOAN_APPLY_FLOW&space=INSURANCE_DISTRIBUTION&releventFlowNode=INSURANCE_DISPATCHN_LAUNCH&releventFlow=INSURANCE_DISPATCHN_FLOW&reBack="+reBack
        })
    }
};
tableEvent = {
    "click .seeDetails": function (e, a, item, index) {
        comn.addTab({
            title: '查看详情',
            href: './Modal/distributionInsuranceCo/distributionInsuranceCoList/distributionInsuranceInfo.html?projectId='+item.projectId +"&projectNo="+item.projectNo+"&loanApplyId="+item.relativeApplyId1 + "&businessTypeCode=LOAN_APPLY_FLOW&space=INSURANCE_DISTRIBUTION&releventFlowNode=INSURANCE_DISPATCHN_LAUNCH&releventFlow=INSURANCE_DISPATCHN_FLOW"
        });
    }
}

insuranceDistribution = function (value, row, index) {
    switch (value) {
        case 0:
            return "待分发";
            break;
        case 1:
            return "待审核";
            break;
        case 2:
            return "已登记";
            break;
        case 3:
            return "无效";
            break;
        case 4:
            return "退回";
            break;
        case 12:
            return "审核中";
            break;
        case 13:
            return "审核中";
            break;
        case 14:
            return "审核中";
            break;
        case 10:
            return "审核中";
            break;
        case 15:
            return "审核通过";
            break;
    }
    //return ["待审核", "审核通过", "已登记","","","","","","","","","","初审","中审","复审","审核通过"][value] || null;
}
dataLoad_2 = function (params) {
    var p;
    p = params.data;
    comn.ajax({
        url: interUrl.distributionInsurance.insuranceList,
        data: $.extend($("#searchForm").values(), p),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                'rows': res.data.list
            });

            params.complete();
            $("#totalfee").val(res.data.fee);
        }
    });
};
$("#sendExport").click(function(){
    var search=$("#searchForm").serialize();
    var downLink;
    downLink = interUrl.basic + interUrl.distributionInsuranceCo.sendExport + "?" + search;
    window.open(downLink,"_blank");
})
$(function () {
    $(".defaultData").getToday();
    //所属机构
    $("#orgId").getOrg();
    //获取保险公司列表
    $("#coInstitution, #insuranceInfoId").getCooperationUnit();
    //待分发 与分发时，搜索条件的甄别
    $(".nav-tabs li").click(function () {
        if ($(this).children().attr("id") == "sendTab") {
            $(".SendCondition").removeClass("hide");
            $(".noSendCondition").addClass("hide");
        } else {
            $(".SendCondition").addClass("hide");
            $(".noSendCondition").removeClass("hide");
        }
    });
    $("#btn_ok").click(function () {
        if (_arr == "") {
            tip({content: "请选择投保信息"});
            return;
        }
        $("#sureModal").modal("show");
        $("#saveInsuranceInfo").unbind("click").click(function () {
            comn.ajax({
                url: interUrl.distributionInsurance.isSue,
                data: $.extend($("#distributingOrgForm").values(), {
                    projectIds: _arr
                }),
                success: function (res) {
                    $("#sureModal").modal("hide");
                    tip({content: '分发成功'});
                    $("#table2, #table1").bootstrapTable('refresh', {url: "..."});
                }
            })
        })
    });
    $(document).on("change", "#insuranceInfoId", function () {
        $("#insuranceInfoName").val($(this).find("option:selected").html());
    })
    return $("#btn-search").click(function () {
        var activeTab;
        activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
        return $("#" + activeTab).find("table").bootstrapTable("refresh", {url: "..."});
    });
});


$("ul.nav-tabs li>a").click(function(){
    var $el = $("select[name='insuranceState']"), html = "";
    if(this.id == "noSendTab"){
        html = [
            '<option value="">--请选择--</option>',
            '<option value="4">退回</option>',
            '<option value="0">待分发</option>'
        ].join("");
    }else{
        html = [
            '<option value="">--请选择--</option>',
            '<option value="1">待审核</option>',
            '<option value="10">审核中</option>',
            '<option value="15">审核通过</option>',
            '<option value="2">已保</option>'
        ].join("");

    }
    $el.html(html);
})
// 差额警告色
function changeColor(a, b) {
    if (b >= a) {
        $("#checkAmmount").addClass('text-navy').removeClass('text-danger');
    } else {
        $("#checkAmmount").addClass('text-danger').removeClass('text-navy');
    }
}