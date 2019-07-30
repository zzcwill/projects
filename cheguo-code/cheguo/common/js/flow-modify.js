/**
 * Created by hyb on 16/1/11.
 */
//走流程公用方法

//流程流转人员列表
var tableEvent_sign, handle_sign, p2 = {};

tableEvent_sign = {
    "click .role": function (e, a, item, index) {
        p2 = {nextNodeUserName: item.userName, nextNodeUserId: a}
    }
};

handle_sign = function (value, row, index) {
    return ["<input type='radio' name='userId' class='role' value='" + value + "'/>"].join("");
};
//获取cbs付款信息
function getCbsPayment(){
    comn.ajax({
        url: interUrl.myTask.getCarDealerPayment,
        data: {loanApplyId:args['loanApplyId']},
        success: function (res) {
            $("#payForm").values(res.data);
            $('.mon').val(comn.toThousands($('.mon').val()));
            //$('.mon').val(comn.toThousands(res.data.returnCashPoolAmount));
            $("input[name=purpose]").val($("input[name=customerName]").val()+"  (车款)");
            if(res.data.cash){
                $(".overage").html("<p>账户余额:"+comn.toThousands(res.data.cash)+"</p><p>更新时间:"+res.data.cashUpdateTime+"</p>");
            }
        }
    });
}
//非人工付款
//url:准提交接口,data:提交参数
function cbsPay(url,data,payType){
    //生成token,校验重复点击
    $("input[name=token]").getPaymentToken();
    $("#payForm").validate();
    if($("#payForm").valid()==true){
            comn.ajax({
                url:interUrl.myTask.preStartPayment,//校验时间
                data: $.extend({loanApplyId:args['loanApplyId']}, {payType:payType}),
                success:function(res){
                    if(res.code===25000){
                        $("#takeApart").modal('show');
                        $("#signModal").modal('hide');
                        $("#agree").unbind('click').click(function(){
                            startPayment(1,url,data,payType)
                        });
                        $("#disAgree").unbind('click').click(function(){
                            startPayment(0,url,data,payType)
                        });
                        $("#back").click(function(){
                            $("#signModal").modal('show');
                            getCbsPayment();
                        })
                    }else{
                        startPayment(0,url,data,payType)
                    }
                }
            })
        }
    //})
}
//发起付款
//isSplit:1拆单,0不拆单  url:提交下个流程接口  data:提交参数
function startPayment(isSplit,url,data,payType){
    comn.ajax({
        url:interUrl.myTask.startPayment,
        data:{
            token:$("input[name=token]").val(),
            isSplit:isSplit,
            applyId:args['loanApplyId'],
            priorityFlag:$("input[name=priorityFlag]:checked").val(),
            purpose:$("input[name=purpose]").val(),
            payType:payType
        },
        success:function(res){
            $("#takeApart").modal('hide');
            comn.ajax({
                url: url,
                data: data,
                success: function (res2) {
                    $("#signModal").modal("hide");
                    tip({content:res2.message});
                    comn.closeTab();
                }
            })
        }
    })
}
//提交流程
//参数说明:_url1=预提交接口 _url2=准提交接口 _url3=提交结束跳转页面路径  _data=请求参数
function flowSubmit(_url1,_url2,_url3,_data,payType){
    //判断是不是cbs付款
    var cbs=0;
    if(arguments.length>4){
        cbs=1;
        $("#cbsPay").show();
        $(".time").getPayDate();
        setTimeout(function(){
            //付款信息
            getCbsPayment();
        },500);
        $("#payTitle").html($("#payType").find("option:checked").html()+' | 付款信息');
    }else{
        $("#cbsPay").hide();
    }
    comn.ajax({
        url: _url1,
        data: _data,
        success: function (res0) {
            var nextNodeUserName=res0.data.userTasks[0].userName;
            var nextNodeUserId=res0.data.userTasks[0].userId;
            var nodeCode={nodeCode:res0.data.nextFlowNodeCode};
            var p3={nextNodeUserName:nextNodeUserName,nextNodeUserId:nextNodeUserId};
            if(res0.data.userTasks.length>1){
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
                    if(cbs==1){
                       cbsPay(_url2,$.extend(_data,p2),payType);
                    }else{
                        comn.ajax({
                            url: _url2,
                            data: $.extend(_data,p2),
                            success: function (res2) {
                                $("#signModal").modal("hide");
                                tip({content:res2.message});
                                comn.closeTab();
                            }
                        })
                    }

                })
            }else{
                if(cbs==1){
                    $("#signModal").modal("show");
                    $("#user").hide();
                    $("#select-sign-btn").unbind("click").click(function(){
                        cbsPay(_url2,$.extend(_data,p3),payType);
                    })
                }else{
                    comn.ajax({
                        url: _url2,
                        data: $.extend(_data,p3),
                        success: function (res4) {
                            tip({content:res4.message});
                            comn.closeTab();
                        }
                    })
                }

            }
        }
    })
}

//撤销
function flowCancel(){
    comn.ajax({
        url:interUrl.loanModify.cancel,
        data:loanApplyId,
        success:function(res){
            $("#sureModal").modal("hide");
            tip({content:res.message || "撤销成功!"});
            comn.closeTab();
        }
    })
}



//流程退回
function flowBack2Pre(){
    //退回上一步
    comn.ajax({
        url: interUrl.loanModify.back2pre,
        data: loanApplyId,
        success: function (res1) {
            tip({content: res1.message});
            comn.closeTab();
        }
    });
}

//关闭贷款
function flowCloseLoanApply(){
    $("#sureModal").modal("hide");
    comn.ajax({
        url: interUrl.loanModify.close,
        data: loanApplyId,
        success: function (res) {
            tip({content: res.message});
            comn.closeTab();
        }
    });
}

//退回内勤
function flowBack2BudgetOfficeStaff(){
    comn.ajax({
        url: interUrl.loanModify.back2BudgetOfficeStaff,
        data:loanApplyId,
        success: function (res) {
            tip({content:res.message});
            comn.closeTab();
        }
    });
}

//贷款作废
function loanToBeInvalid(){
    //退回上一步
    comn.ajax({
        url: interUrl.loanModify.loanToBeInvalid,
        data: loanApplyId,
        success: function (res1) {
            tip({content: res1.message});
            comn.closeTab();
        }
    });
}