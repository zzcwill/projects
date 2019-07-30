//注册组件
Vue.component('v-input',vueComponent.inputComponent);
Vue.component('v-select',vueComponent.selectComp);

var vm = new Vue({
    el:'#searchForm',
    data:{
    },
    methods:{
        //导出明细
        btnExport: function () {
            var search=$("#searchForm").serialize();
            var downLink = interUrl.basic + interUrl.interviewManage.export + "?" + search;
            console.log(downLink);
            window.open(downLink, "_blank");
        }
        
    },
    ready: function(){
        $('#bankId').getInterviewBankList();
        var dataArr =[["#interviewType", "InterviewType"]];
        $.getCommonMethodPort(dataArr);
    }
});

var dataLoad, handle_1, tableEvent;

dataLoad = function(params){
    tableData(params, $("#searchForm").values(), interUrl.interviewManage.list)
};

handle_1 = function(value,row,index){
    return ["<button type='button' class='btn btn-primary btn-xs detail'>查看</button>"].join("");
};
tableEvent={
    //查看详情
    "click .detail": function (e, a, item, index) {
        return comn.addTab({
            title: "面签详情",
            href: "./Modal/interviewManagement/interviewManage/detail.html?id=" + item.id
        });
    }
};
