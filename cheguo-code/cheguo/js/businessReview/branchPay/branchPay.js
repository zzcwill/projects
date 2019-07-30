//注册组件
Vue.component('v-input',vueComponent.inputComponent);
Vue.component('v-table',vueComponent.tableComp);
Vue.component('v-select',vueComponent.selectComp);
Vue.component('v-radio',vueComponent.radioComp);
Vue.component('modal-fade',vueComponent.modalFade);
Vue.component('flow-opinion',vueComponent.flowOpinion);

var vm=new Vue({
    el:'#loanApproval',
    data:{
        table:[
            {text:'选择',formater:'handle_pay',events:'tableEvent_pay'},
            {field:'accountName',text:'收款人全称'},
            {field:'subBankName',text:'收款人开户支行'},
            {field:'cardNumber',text:'收款人账号'}
        ],
        bankDirect:false,//是否银行直销模式
        title:'',
        loanTerm: [
            {value:'1',name:'12期'},
            {value:'2',name:'18期'},
            {value:'3',name:'24期'},
            {value:'4',name:'36期'},
            {value:'5',name:'48期'},
            {value:'6',name:'60期'}
        ]
    },
    methods:{
        //保存流程意见
        saveBtn: function(){
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
        },
        //提交
        refer: function(){
            var _this=this;
            var date;
            $("#paymentGetForm").validate();
            $("#opinionForm").validate();
            if($("#paymentGetForm").valid() == true && $("#opinionForm").valid() == true){
                if(_this.bankDirect){
                    date=$("#collectedDate").val();
                }else{
                    date=$("input[name=dealerPaymentDate]").val();
                }
                if(diffDate(date)){
                    if(_this.bankDirect){
                        savePayment2();
                    }else{
                        savePayment1()
                    }
                }else{
                    tip({
                        content:'付款日期不能大于当前日期'
                    })
                }
            }
        },
        //返回上一步
        backPre: function(){
            $("#opinionForm").validate();
            if($("#opinionForm").valid() == true){
                oppSureModal("是否确认退回");
                $("#sureOption").unbind("click").click(function () {
                    //保存流程意见
                    var backPre = new Promise(function(resolve,reject){
                        comn.ajax({
                            url: interUrl.common.opinion,
                            data: $.extend($("#opinionForm").values(), argsBopInfoId,{conclusion: 0}),
                            success: function (res) {
                                $("#sureModal").modal("hide");
                                resolve();
                            }
                        });
                    });
                    backPre.then(function(){
                        //退回上一步
                        comn.ajax({
                            url: interUrl.ownersStaging.back2pre,
                            data: loanApplyId,
                            success: function (res1) {
                                tip({content: res1.message});
                                comn.closeTab();
                            }
                        });
                    })
                })
            }
        },
        //付款信息保存
        paymentSave: function(){
            var url,date;
            if(this.bankDirect==false){
                //普通流程
                url=interUrl.ownersStaging.paymentSave;
                date=$("input[name=dealerPaymentDate]").val();
            }else{
                //银行直销
                url=interUrl.myTask.saveLoanCollection;
                date=$("#collectedDate").val();
            }
            $("#paymentGetForm").validate();
            if($("#paymentGetForm").valid() == true){
                if(diffDate(date)){
                    comn.ajax({
                        url: url,
                        data: $.extend($("#paymentGetForm").values(),loanApplyId),
                        success: function (res) {
                            tip({content:res.message || "保存成功!"});
                        }
                    });
                }else{
                    tip({
                        content:'付款日期不能大于当前日期'
                    })
                }

            }
        }
    },
    ready: function () {
        var _this=this;
        $("#flowTitle").text(args['currentNodeName']);
        //项目基本信息
        comn.ajax({
            url: interUrl.myTask.approvalInfo,
            data:{
                loanApplyId:args['loanApplyId']
            },
            success: function(res){
                $("#approvalInfoForm").values(res.data);
                if(res.data.maritalStatus!= 1){
                    $("#isMaritalStatus").removeClass("hide");
                }
                if(res.data.freeDoor == '1'){
                    $("#isFreeDoor").removeClass("hide");
                }
                if(res.data.isDiscount == '1'){
                    $("#isDiscount").removeClass("hide");
                }
                //银行直销逻辑判断  businessTypeId
                if(res.data.businessTypeId==2){
                    _this.bankDirect=true;
                    getLoanCollection(); //获取收款信息
                }else{
                    getCarDealerPayment();
                }
                var dataArr =[["#econtractStatus", "EcontractStatus", res.data.econtractStatus]];
                $.getCommonMethodPort(dataArr);                

            }
        });
        //获取流程意见
        $("#opinionText").getOpinion_s(argsBopInfoId);
    }
});
//获取cbs付款信息
function getCbsPayment(){
    comn.ajax({
        //url: interUrl.myTask.getCarDealerPayment,
        url: interUrl.ownersStaging.getCarDealerPayment,
        data: loanApplyId,
        success: function (res) {
            $("#payForm").values(res.data);
            $('.mon').val(comn.toThousands(res.data.dealerPaymentAmount));
            if(res.data.cash){
                $(".overage").html("<p>账户余额:"+comn.toThousands(res.data.cash)+"</p><p>更新时间:"+res.data.cashUpdateTime+"</p>");
            }
        }
    });
}
//普通流程-获取付款信息
function getCarDealerPayment(){
    comn.ajax({
        //url: interUrl.myTask.getCarDealerPayment,
        url: interUrl.ownersStaging.getCarDealerPayment,
        data: loanApplyId,
        success: function (res) {
            $("#paymentGetForm").values(res.data);
            //获取付款方式
            $("#payType").payTypeMent(args['loanApplyId'],res.data.payType, args["businessTypeCode"], args["currentNodeKey"]);
            if(!res.data.dealerPaymentDate){
                $("[name='dealerPaymentDate']").getToday();
            }
        }
    });
}
//银行直销流程-获取收款信息
function getLoanCollection(){
    comn.ajax({
        url: interUrl.myTask.getLoanCollection,
        data: loanApplyId,
        success: function (res) {
            if(res.data){
                $("#paymentGetForm").values(res.data);
                $("#payForm").values(res.data);
                if(!res.data.collectedDate){
                    $("#collectedDate").getToday();
                }
            }
        }
    });
}
//银行直销流程-保存收付款信息
function savePayment2(){
    oppSureModal("是否确认提交");
    $("#sureOption").unbind("click").click(function () {
        var opinionSave = new Promise(function(resolve,reject){
            //保存流程意见
            comn.ajax({
                url: interUrl.common.opinion,
                data: $.extend($("#opinionForm").values(), argsBopInfoId, {conclusion: 1}),
                success: function () {
                    resolve()
                }
            });
        });
        var saveLoanCollection=new Promise(function(resolve,reject){
            //保存收款信息
            comn.ajax({
                url: interUrl.myTask.saveLoanCollection,
                data: $.extend($("#paymentGetForm").values(), loanApplyId),
                success: function () {
                    $("#sureModal").modal("hide");
                    resolve();
                }
            });
        });
        Promise.all([opinionSave,saveLoanCollection]).then(function(){
            comn.ajax({
                url: interUrl.ownersStaging.preSubmit,
                data: loanApplyId,
                success: function (res1) {
                    var nextNodeUserName = res1.data.userTasks[0].userName;
                    var nextNodeUserId = res1.data.userTasks[0].userId;
                    var nodeCode = {nodeCode: res1.data.nextFlowNodeCode};
                    var p3 = {nextNodeUserName: nextNodeUserName, nextNodeUserId: nextNodeUserId};
                    comn.ajax({
                        url: interUrl.ownersStaging.submit2next,
                        data: $.extend(loanApplyId, p3),
                        success: function (res2) {
                            tip({content: res2.message});
                            comn.closeTab();
                        }
                    })
                }
            });
        })
    })
}
//日期比较
function diffDate(date){
    var newDate=date.replace(/-/g,'/');
    if(new Date()>Date.parse(newDate)){
        return true;
    }else{
        return false;
    }
}

//发起付款
function startPayment(isSplit){
    comn.ajax({
        url:interUrl.myTask.startPayment,
        data:{
            token:$("input[name=token]").val(),
            isSplit:isSplit,
            applyId:args["loanApplyId"],
            priorityFlag:$("input[name=priorityFlag]:checked").val(),
            purpose:$("input[name=purpose]").val(),
            payType:"CP"
        },
        success:function(res){
            $("#takeApart").modal('hide');
            comn.ajax({
                url: interUrl.ownersStaging.preSubmit,
                data: loanApplyId,
                success: function (res1) {
                    var nextNodeUserName = res1.data.userTasks[0].userName;
                    var nextNodeUserId = res1.data.userTasks[0].userId;
                    var nodeCode = {nodeCode: res1.data.nextFlowNodeCode};
                    var p3 = {nextNodeUserName: nextNodeUserName, nextNodeUserId: nextNodeUserId};
                    comn.ajax({
                        url: interUrl.ownersStaging.submit2next,
                        data: $.extend(loanApplyId, p3),
                        success: function (res2) {
                            tip({content: res2.message});
                            comn.closeTab();
                        }
                    })
                }
            });
        }
    })
}

//普通流程保存收付款信息
function savePayment1(){
    oppSureModal("是否确认提交");
    $("#sureOption").unbind("click").click(function () {
        var paymentSave = new Promise(function(resolve,reject){
            comn.ajax({
                url:interUrl.ownersStaging.paymentSave,
                data: $.extend($("#paymentGetForm").values(), loanApplyId),
                success: function(){
                    $("#sureModal").modal("hide");
                    resolve();
                }
            })
        });
        var opinion = new Promise(function(resolve,reject){
            comn.ajax({
                url: interUrl.common.opinion,
                data: $.extend($("#opinionForm").values(), argsBopInfoId, {conclusion: 1}),
                success: function(){
                    resolve()
                }
            })
        });
        Promise.all([paymentSave,opinion]).then(function(){
            //招行CBS
            if($("#payType").val()==1){
                $("#payMode").modal("show");
                vm.title=$("#payType").find("option:selected").html()+" | 付款信息";
                //获取系统时间
                $(".time").getPayDate();
                //付款信息
                getCbsPayment();
                //生成token,校验重复点击
                $("input[name=token]").getPaymentToken();
                $("[name='dealerAccountName1']").val($("[name='dealerAccountName']").val());
                $("[name='dealerAccountNo1']").val($("[name='dealerAccountNo']").val());
                $("[name='dealerBank1']").val($("[name='dealerBank']").val());
                $("input[name=purpose]").val($("input[name=customerName]").val()+"  (车款)");
                $("#payTitle").html($("#payType").find("option:checked").html()+' | 付款信息');
                $("#payment").on("click",function(){
                    $("#payForm").validate();
                    if($("#payForm").valid()==true){
                        //校验时间
                        comn.ajax({
                            url:interUrl.myTask.preStartPayment,
                            data: $.extend(loanApplyId,{payType:'CP'}),
                            success:function(res){
                                if(res.code===25000){
                                    $("#takeApart").modal('show');
                                    $("#agree").unbind('click').click(function(){
                                        startPayment(1)
                                    });
                                    $("#disAgree").unbind('click').click(function(){
                                        startPayment(0)
                                    })
                                }else{
                                    startPayment(0)
                                }
                            }
                        })
                    }
                })
            }else{
                comn.ajax({
                    url: interUrl.myTask.manualPayment,
                    data: {
                        projectId: $("input[name=projectId]").val() || args["projectId"],
                        oldDetailId: ''
                    },
                    success: function(res) {
                        comn.ajax({
                            url: interUrl.ownersStaging.preSubmit,
                            data: loanApplyId,
                            success: function (res1) {
                                var nextNodeUserName = res1.data.userTasks[0].userName;
                                var nextNodeUserId = res1.data.userTasks[0].userId;
                                var nodeCode = {nodeCode: res1.data.nextFlowNodeCode};
                                var p3 = {nextNodeUserName: nextNodeUserName, nextNodeUserId: nextNodeUserId};
                                comn.ajax({
                                    url: interUrl.ownersStaging.submit2next,
                                    data: $.extend(loanApplyId, p3),
                                    success: function (res2) {
                                        tip({content: res2.message});
                                        comn.closeTab();
                                    }
                                })
                            }
                        });
                    }
                })
            }
        });
        /*comn.ajax({
            url: interUrl.myTask.paymentSave,
            data: $.extend($("#paymentGetForm").values(), loanApplyId),
            success: function (res) {
                $("#sureModal").modal("hide");
                //保存流程意见
                comn.ajax({
                    url: interUrl.common.opinion,
                    data: $.extend($("#opinionForm").values(), argsBopInfoId, {conclusion: 1}),
                    success: function (res) {
                        //招行CBS
                        if($("#payType").val()==1){
                            $("#payMode").modal("show");
                            //获取系统时间
                            $(".time").getPayDate();
                            //付款信息
                            getCbsPayment();
                            //生成token,校验重复点击
                            $("input[name=token]").getPaymentToken();
                            $("[name='dealerAccountName1']").val($("[name='dealerAccountName']").val());
                            $("[name='dealerAccountNo1']").val($("[name='dealerAccountNo']").val());
                            $("[name='dealerBank1']").val($("[name='dealerBank']").val());
                            $("input[name=purpose]").val($("input[name=customerName]").val()+"  (车款)");
                            $("#payTitle").html($("#payType").find("option:checked").html()+' | 付款信息');
                            $("#payment").on("click",function(){
                                $("#payForm").validate();
                                if($("#payForm").valid()==true){
                                    //校验时间
                                    comn.ajax({
                                        url:interUrl.myTask.preStartPayment,
                                        data: $.extend(loanApplyId, {projectId:$("input[name=projectId]").val()}),
                                        success:function(res){
                                            if(res.code===25000){
                                                $("#takeApart").modal('show');
                                                $("#agree").unbind('click').click(function(){
                                                    startPayment(1)
                                                });
                                                $("#disAgree").unbind('click').click(function(){
                                                    startPayment(0)
                                                })
                                            }else{
                                                startPayment(0)
                                            }
                                        }
                                    })
                                }
                            })
                        }else{
                            comn.ajax({
                                url: interUrl.myTask.manualPayment,
                                data: {
                                    projectId: $("input[name=projectId]").val() || args["projectId"],
                                    oldDetailId: ''
                                },
                                success: function(res) {
                                    comn.ajax({
                                        url: interUrl.myTask.preSubmit,
                                        data: loanApplyId,
                                        success: function (res1) {
                                            var nextNodeUserName = res1.data.userTasks[0].userName;
                                            var nextNodeUserId = res1.data.userTasks[0].userId;
                                            var nodeCode = {nodeCode: res1.data.nextFlowNodeCode};
                                            var p3 = {nextNodeUserName: nextNodeUserName, nextNodeUserId: nextNodeUserId};
                                            comn.ajax({
                                                url: interUrl.myTask.submit2next,
                                                data: $.extend(loanApplyId, p3),
                                                success: function (res2) {
                                                    tip({content: res2.message});
                                                    comn.closeTab();
                                                }
                                            })
                                        }
                                    });
                                }
                            })
                        }

                    }
                });
            }
        });*/
    })
}
