//注册组件
Vue.component('v-input',vueComponent.inputComponent);
Vue.component('v-table',vueComponent.tableComp);
Vue.component('v-select',vueComponent.selectComp);
Vue.component('v-radio',vueComponent.radioComp);
Vue.component('modal-fade',vueComponent.modalFade);
Vue.component('flow-opinion',vueComponent.flowOpinion);

var  vm = new Vue({
    el:'#payApproval',
    data:{
        reback:false,
        table:[
            {text:'选择',formater:'handle_pay',events:'tableEvent_pay'},
            {field:'accountName',text:'收款人全称'},
            {field:'subBankName',text:'收款人开户支行'},
            {field:'cardNumber',text:'收款人账号'}
        ],
        table2:[
            {text:'选择',formater:'handle_pay2',events:'tableEvent_pay2'},
            {field:'accountName',text:'收款人全称'},
            {field:'subBankName',text:'收款人开户支行'},
            {field:'cardNumber',text:'收款人账号'}
        ],
        type:1, //1:付款审批 2:资金划拨
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
        //判断显示提交还是返回
        isreback: function(value){
            if(value==0){
                this.reback=true;
            }else{
                this.reback=false;
            }
        },
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
            var saveToGuarantee = new Promise(function(resolve,reject){
                $("#accountInfo").validate();
                if($("#accountInfo").valid() == true){
                    comn.ajax({
                        url: interUrl.ownersStaging.saveToGuarantee,
                        data: $.extend($("#accountInfo").values(),loanApplyId),
                        success: function(res) {
                            resolve()
                        }
                    });
                }
            });
            var opinionSave = new Promise(function(resolve,reject){
                $("#opinionForm").validate();
                if($("#opinionForm").valid() == true){
                    oppSureModal("是否确认提交");
                    $("#sureOption").unbind("click").click(function () {
                        //保存流程意见
                        comn.ajax({
                            url: interUrl.common.opinion,
                            data: $.extend($("#opinionForm").values(), argsBopInfoId),
                            success: function (res) {
                                $("#sureModal").modal("hide");
                                resolve();
                            }
                        });
                    })
                }
            });
            Promise.all([saveToGuarantee,opinionSave]).then(function(){
                flowSubmit(interUrl.ownersStaging.preSubmit, interUrl.ownersStaging.submit2next, './Modal/task/myTask/index.html', loanApplyId);
            })
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
                            data: $.extend($("#opinionForm").values(), argsBopInfoId),
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
        //账户信息保存
        paymentSave: function(){
            $("#accountInfo").validate();
            if($("#accountInfo").valid() == true){
                comn.ajax({
                    url: interUrl.ownersStaging.saveToGuarantee,
                    data: $.extend($("#accountInfo").values(),loanApplyId),
                    success: function(res) {
                        tip({content:res.message || '保存成功!'})
                    }
                });
            }
        },
        //收款人列表获取
        receipt: function(){
            $("#payModal").modal('show');
        },
        //资金池账户
        capitalPool: function(){
            $("#capitalPool").modal('show');
        }
    }
    ,
    ready: function(){
        var args=comn.getArgs();
        $("#flowTitle").text(args['currentNodeName']);
        this.type=args['flow'];
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
                var dataArr =[["#econtractStatus", "EcontractStatus", res.data.econtractStatus]];
                $.getCommonMethodPort(dataArr);                
            }
        });
        //获取账户信息
        getPaymentInfo();
        //获取流程意见
        $("#opinionText").getOpinion_s(argsBopInfoId);
    }
});

function getPaymentInfo(){
    var paymentGet = new Promise(function(resolve,reject){
        comn.ajax({
            url: interUrl.ownersStaging.paymentGetGuarantee,
            data:loanApplyId,
            success: function(res) {
                $("#accountInfo").values(res.data);
                resolve(res);
            }
        });
    });
    paymentGet.then(function(res){
        $("#payModal").on("shown.bs.modal", function() {
            //分公司账户
            table_pay = function (params) {
                var p = params.data;
                p['orgId'] = res.data.orgId;
                return comn.ajax({
                    url: interUrl.myTask.guaranteeList,
                    data: p,
                    success: function (res) {
                        params.success({
                            'total': res.totalItem,
                            rows: res.data
                        });
                        return params.complete();
                    }
                });
            };
            tableEvent_pay = {
                "click .pay": function (e, a, item, index) {
                    $("[name='guaranteeCorporationAccountName']").val(item.accountName);
                    $("[name='guaranteeCorporationAccountNo']").val(item.cardNumber);
                    $("[name='guaranteeCorporationBank']").val(item.subBankName);
                    $("#payModal").modal("hide");
                }
            };
            handle_pay = function (value, row, index) {
                return ["<a class='pay' href='javascript:;'>选择</a>"].join("");
            };
            $("#table_pay").bootstrapTable("refresh");
        });
        $("#capitalPool").on("shown.bs.modal", function() {
            //资金部账户
            table_pay2 = function (params) {
                var p = params.data;
                return comn.ajax({
                    url: interUrl.myTask.getCapatilPoolAccountList,
                    data: p,
                    success: function (res) {
                        params.success({
                            'total': res.totalItem,
                            rows: res.data
                        });
                        return params.complete();
                    }
                });
            };
            tableEvent_pay2 = {
                "click .pay": function (e, a, item, index) {
                    $("[name='capitalPoolAccountName']").val(item.accountName);
                    $("[name='capitalPoolAccountNo']").val(item.cardNumber);
                    $("[name='capitalPoolBank']").val(item.subBankName);
                    $("#capitalPool").modal("hide");
                }
            };
            handle_pay2 = function (value, row, index) {
                return ["<a class='pay' href='javascript:;'>选择</a>"].join("");
            };
            $("#table_pay2").bootstrapTable("refresh");
        })
    });
}