var args = comn.getArgs();
var payTable, payHandle, payEvent, paymentMode, paymentType, transStatus;
var custom = {
    customerName: args['customerName'],
    projectNo: args['projectNo']
};
$("#payForm").values(custom);
payTable = function (params) {
    var p;
    p = params.data;
    tableData(
        params,
        $.extend($("#payForm").values(), p, {projectId: args['projectId']}),
        interUrl.mockList || interUrl.gr.loanPayment
    )
};

payHandle = function (value, row, index) {
    if (row.transStatus == 4 && row.userName == window.parent.userName.innerHTML) {
        return ['<div class="dropdown">',
            '<button class="btn btn-primary btn-xs dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">操作',
            '<span class="caret"></span>',
            '</button>',
            '<ul class="dropdown-menu" aria-labelledby="dropdownMenu2">',
            '<li><a href="javascript:;" class="reSubmit">重新提交</a></li>',
            '<li><a href="javascript:;" class="artificial">人工处理</a></li>',
            '</ul>',
            '</div>'].join("")
    } else {
        return '';
    }
};

paymentMode = function (value, row, index) {
    return ['人工付款', '招行CBS','保融MBS'][value]
};

//paymentType = function (value, row, index) {
//    return ['', '贷款申请资金部付款', '贷款申请分公司付款'][value]
//};
paymentType = function (value, row, index) {
    return ['', '贷款申请资金部付款', '贷款申请分公司付款','贷款修改分公司确认','贷款修改资金部付款','贷款修改分公司付款','贷款作废分公司确认','车主贷分公司付款', '7*24分公司付款', '7*24分公司还款'][value]
};

transStatus = function (value, row, index) {
    return ['', '人工付款', '付款中', '付款成功', '付款失败', '付款失败（重新提交)', '付款失败（人工处理)'][value]
};

payEvent = {
    "click .reSubmit": function (e, a, item, index) {
        var payType = ['','AT','AP','RA','RT','RP','CA','CP','GP','GR'][item.paymentType];
        var payment = ['人工付款', '招行CBS','保融MBS'][item.paymentMode];
        //付款信息获取
        comn.ajax({
            url: interUrl.myTask.rePayment,
            data: {
                detailId:item.id
            },
            success: function (res) {
                $("#payMode").modal('show');
                $("#payTitle").text(payment +'  |  付款信息');
                $("#payModeForm").values(res.data);
                $('.time').getPayDate();
                $('.mon').val(comn.toThousands(res.data.dealerPaymentAmount));
                if(res.data.cash){
                    $(".overage").html("<p>账户余额:"+comn.toThousands(res.data.cash)+"</p><p>更新时间:"+res.data.cashUpdateTime+"</p>");
                }
                $("input[name=purpose]").val($("input[name=customerName]").val()+"  (车款)");
                //生成token,校验重复点击
                $("input[name=token]").getPaymentToken();
            }
        });
        $("#payment").unbind('click').click(function () {
            var token = $("input[name=token]").val();
            $("#payModeForm").validate();
            if ($("#payModeForm").valid() == true) {
                comn.ajax({
                    url: interUrl.myTask.preStartPayment,//校验时间(是否拆单)
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
                                startPayment(1,item.id,payType,token)
                            });
                            $("#disAgree").unbind('click').click(function () {
                                startPayment(0,item.id,payType,token)
                            })
                        } else {
                            startPayment(0,item.id,payType,token)
                        }
                    }
                })
            }
        })

    },
    "click .artificial": function (e, a, item, index) {
        $("#artificial").modal('show');
        $(".message").html("客户名称:&nbsp;"+$("input[name=customerName]").val()+"&nbsp;,&nbsp;金额:&nbsp;"+item.payeeAmount+"&nbsp;,&nbsp;因系统付款失败,请确认已人工处理!");
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
//发起付款
function startPayment(isSplit,detailId,payType,token){
    comn.ajax({
        url:interUrl.myTask.startPayment,
        data:{
            token:token,
            isSplit:isSplit,
            detailId:detailId,
            applyId:args['loanApplyId'],
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
            $("#payTable").bootstrapTable('refresh',{url:'...'});
        }
    })
}
