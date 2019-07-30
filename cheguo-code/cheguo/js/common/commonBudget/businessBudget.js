//注册组件
Vue.component('v-input',vueComponent.inputComponent);
Vue.component('v-select',vueComponent.selectComp);

var vm=new Vue({
    el:'#budget',
    //data:{},
    methods:{
        budgetPrint: function(){
            window.open("../../../Modal/task/myTask/businessPrint.html?loanApplyId=" + args['loanApplyId']);
        }
    },
    ready: function(){
        comn.ajax({
            url: interUrl.myTask.approvalBudgetInfo,
            data: {
                loanApplyId: args['loanApplyId']
            },
            success: function(res){
                $("#budgetForm").values(res.data);
            }
        })
    }
})