//注册组件
Vue.component('v-input',vueComponent.inputComponent);
Vue.component('v-table',vueComponent.tableComp);
Vue.component('v-select',vueComponent.selectComp);
Vue.component('v-radio',vueComponent.radioComp);
Vue.component('flow-opinion',vueComponent.flowOpinion);
Vue.component('modal-fade',vueComponent.modalFade);

var vm=new Vue({
    el:'#gpsCheck',
    data:{
        table:[
            {field:'userId',text:'选择',formater:'handle_sign',events:'tableEvent_sign'},
            {field:'organization',text:'机构名称'},
            {field:'department',text:'部门'},
            {field:'userName',text:'姓名'},
            {field:'taskCount',text:'当前代办量'}
        ],
        gps:[],
        reback:false,
        color:{
            color:'#3bc995'
        }
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
                            flowSubmit(interUrl.ownersStaging.preSubmit, interUrl.ownersStaging.submit2next, './Modal/task/myTask/index.html', loanApplyId);
                        }
                    });
                })
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
        }
    },
    ready: function(){
        var args=comn.getArgs();
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
                var dataArr =[["#econtractStatus", "EcontractStatus", res.data.econtractStatus]];
                $.getCommonMethodPort(dataArr);                  
            }
            });
        //GPS信息
        comn.ajax({
            url: interUrl.myTask.gpsProduct,
            data:{
                projectId:args['projectId']
            },
            success: function(res){
                _this.gps=res.data;
            }
        });
        $("#opinionText").getOpinion_s(argsBopInfoId);
    }
});
