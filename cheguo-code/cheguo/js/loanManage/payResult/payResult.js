var payment,handle,tableEvent,paymentMode,paymentType,transStatus, confirmed;
$(".today").getToday();
//获取机构地址
$("#orgList").getOrg();
//获取付款类型
$("#paymentType").getPaymentType();
//获取付款方式
$("#paymentMode").getPaymentCode();
//获取付款账户
$("#companyAccount").getCompanyAccount();
payment=function(params){
    var p;
    p = params.data;
    tableData(
        params,
        $.extend($("#searchForm").values(), p),
        interUrl.myTask.paymentList
    )
};
paymentMode = function (value, row, index) {
    return ['人工付款', '招行CBS','保融MBS'][value]
};

paymentType = function (value, row, index) {
    return ['', '贷款申请资金部付款', '贷款申请分公司付款','贷款修改分公司确认','贷款修改资金部付款','贷款修改分公司付款','贷款作废分公司确认','车主贷分公司付款','7*24分公司付款','7*24分公司还款'][value]
};

transStatus = function (value, row, index) {
    return ['', '人工付款', '付款中', '付款成功', '付款失败', '付款失败（重新提交)', '付款失败（人工处理)', '付款失败(流程退回)', '人工付款(流程退回)'][value]
};
//付款结果查询-确认状态
confirmed = function (value, row, index) {
    return ["未确认", "已确认"][value] || null;
}
handle=function(value,row,index){
    var result=[];
    if(row.transStatus==4&&row.userName==window.parent.userName.innerHTML){
        result.push('<li><a href="javascript:;" class="reSubmit">重新提交</a></li><li><a href="javascript:;" class="artificial">人工处理</a></li><li><a href="javascript:;" class="returnBranchComp">退回分公司付款</a></li>')
    } else if(row.transStatus==1 && row.confirmed == 0) {
        result.push('<li><a href="javascript:;" class="payed">付款确认</a></li><li><a href="javascript:;" class="returnBranchComp">退回分公司付款</a></li>')
    }
    return ['<div class="dropdown">',
        '<button class="btn btn-primary btn-xs dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">操作',
        '<span class="caret"></span>',
        '</button>',
        '<ul class="dropdown-menu" aria-labelledby="dropdownMenu2">',
        '<li><a href="javascript:;" class="info">查看贷款详情</a></li>',
        result.join(""),
        '</ul>',
        '</div>'].join("")
};
tableEvent={
    "click .info":function(e,a,item,index){
        return comn.addTab({
            title: "贷款详情",
            href: "./Modal/customManage/customer/loanDetail.html?id=" + item.projectId + "&loanApplyId=" + item.relativeApplyId1 + "&businessTypeCode=" + item.flowType + "&projectId=" + item.projectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY" + "&loanFlag=1"
        })
    },
    "click .payed": function (e, a, item, index) {
        $("#artificial .modal-title").html("提示");
        $("#artificial").modal('show');
        $(".message").html("客户名称:&nbsp;"+item.customerName+"&nbsp;,&nbsp;金额:&nbsp;"+item.payeeAmount+"&nbsp;,&nbsp;请确认已人工付款，该操作不可逆！");
        $("#confirm").unbind("click").click(function(){
            comn.ajax({
                url: interUrl.myTask.manualConfirm,
                data: {
                    paymentDetailId: item.id
                },
                success:function(){
                    $("#artificial").modal('hide');
                    tip({content: "付款确认成功！"});
                    $("#table").bootstrapTable("refresh", {url: "..."})
                }
            })

        })
    },
    "click .returnBranchComp": function (e, a, item, index) {
        $("#artificial .modal-title").html("提示");
        $("#artificial").modal('show');
        $(".message").html("客户名称:&nbsp;"+item.customerName+"&nbsp;,&nbsp;金额:&nbsp;"+item.payeeAmount+"&nbsp;,&nbsp;请确认是否需退回，该操作不可逆请谨慎！");
        $("#confirm").unbind("click").click(function(){
            comn.ajax({
                url: interUrl.myTask.backRePayment,
                data: {
                    paymentDetailId: item.id
                },
                success:function(){
                    $("#artificial").modal('hide');
                    tip({content: "退回分公司付款成功！"});
                    $("#table").bootstrapTable("refresh", {url: "..."})
                }
            })

        })
    },
    "click .reSubmit": function (e, a, item, index) {
        var payType = ['','AT','AP','RA','RT','RP','CA','CP','GP','GR'][item.paymentType];
        var payment = ['人工付款', '招行CBS','保融MBS'][item.paymentMode];
        //付款信息
        comn.ajax({
            url: interUrl.myTask.rePayment,
            data: {
                detailId:item.id
            },
            success: function (res) {
                $("#payMode").modal('show');
                $("#payTitle").text(payment +'  |  付款信息');
                $('.time').getPayDate();
                $("#payModeForm").values(res.data);

                $('.mon').val(comn.toThousands(res.data.dealerPaymentAmount));
                if(res.data.cash){
                    $(".overage").html("<p>账户余额:"+comn.toThousands(res.data.cash)+"</p><p>更新时间:"+res.data.cashUpdateTime+"</p>");
                }
                $("input[name=purpose]").val(item.remarks);
                //生成token,校验重复点击
                $("input[name=token]").getPaymentToken();
            }
        });
        $("#payment").unbind('click').click(function () {
            var token = $("input[name=token]").val();
            $("#payModeForm").validate();
            if ($("#payModeForm").valid() == true) {
                comn.ajax({
                    url: interUrl.myTask.preStartPayment,//校验时间
                    data: {
                        //projectId: item.projectId,
                        detailId:item.id,
                        loanApplyId: item.applyId,
                        payType: payType
                    },
                    success: function (res) {
                        if (res.code == 25000) {
                            $("#takeApart").modal('show');
                            $("#agree").unbind('click').click(function () {
                                startPayment(1,item.id,item.applyId,payType,token)
                            });
                            $("#disAgree").unbind('click').click(function () {
                                startPayment(0,item.id,item.applyId,payType,token)
                            })
                        } else {
                            startPayment(0,item.id,item.applyId,payType,token)
                        }
                    }
                })
            }
        })

    },
    "click .artificial": function (e, a, item, index) {
        $("#artificial .modal-title").html("人工处理提示");
        $("#artificial").modal('show');
        $(".message").html("客户名称:&nbsp;"+item.customerName+"&nbsp;,&nbsp;金额:&nbsp;"+item.payeeAmount+"&nbsp;,&nbsp;因系统付款失败,请确认已人工处理!");
        $("#confirm").unbind("click").click(function(){
            comn.ajax({
                url:interUrl.myTask.manualPayment,
                data:{
                    projectId:item.projectId,
                    oldDetailId:item.id
                },
                success:function(){
                    $("#artificial").modal('hide');

                }
            })

        })
    }
};
// 查询
$("#btn-search").on("click",function(){
    if(orgIdJudge()) {
        $("#btn_confirm").removeClass("hide");
    } else {
        $("#btn_confirm").addClass("hide");
    };
    //$("#table").bootstrapTable('refresh',{url:'...'})
})

//发起付款
function startPayment(isSplit,detailId,loanApplyId,payType,token){
    comn.ajax({
        url:interUrl.myTask.startPayment,
        data:{
            token:token,
            isSplit:isSplit,
            detailId:detailId,
            applyId:loanApplyId,
            priorityFlag:$("input[name=priorityFlag]:checked").val(),
            purpose:$("input[name=purpose]").val(),
            payType:payType
        },
        success:function(res){
            $("#takeApart").modal('hide');
            $("#payMode").modal('hide');
            tip({
                content:'付款成功'
            });
            $("#table").bootstrapTable('refresh',{url:'...'});
        }
    })
}
$("#btn_confirm").unbind('click').on("click", function(){
    var ids = [];
    var $table = $("#table");
    $.map($table.bootstrapTable('getSelections'), function (row) {
        ids.push(row.id);
    });
    if (ids.length === 0) {
        tip({content: "请选择要导出的条目"});
    } else {
        var ids = ids.toString();
        comn.ajax({
            url: interUrl.myTask.batchManualConfirm,
            data: {
                ids: ids
            },
            success: function (res) {
                tip({content: "操作成功！"})
            }
        })
    }
});
function orgIdJudge (){
    var paymentType = $("#paymentType").find("option:selected").html();
    var paymentMode = $("#paymentMode").find("option:selected").html();
    var testBolean;
    testBolean = (paymentMode === "人工付款" && paymentType === "贷款申请分公司付款") ? true : false;
    return testBolean;
};
