//注册组件
Vue.component('v-input',vueComponent.inputComponent);
Vue.component('v-table',vueComponent.tableComp);
Vue.component('v-select',vueComponent.selectComp);

var vm=new Vue({
   el:'#gpsStock',
   data:{
       table:[
           {field:'orgName',text:"机构"},
           {field:'id',text:"库存数量"},
           {field:'groupName',text:"业务组"},
           {field:'supplierId',text:"库存数量"},
           {field:'distributeUserName',text:"客户经理"},
           {field:'distributeAmount',text:"数量"}
       ]
   },
    methods:{
        btnSearch: function(){
            $("#table").bootstrapTable("refresh",{url:'...'})
        },
        areaChoose: function(e){
            var value = $(e.target).find("option:selected").val();
            $("#userList").html("<option value=''>--请选择--</option>");
            if(value){
                $("#areaList").getGroupList(value);
            }else{
                $("#areaList").html("<option value=''>--请选择--</option>");
            }
        },
        groupGet: function(e){
            var value = $(e.target).find("option:selected").val();
            if(value){
                $("#userList").getManager(value);
            }else{
                $("#userList").html("<option value=''>--请选择--</option>");
            }
        },
        reset: function(){
            $("#areaList").html("<option value=''>--请选择--</option>");
        }
    },
    ready: function(){
        $("#orgId").getOrg();
        $("#supplier").getSpecificSupp();
    }
});
var dataLoad;
dataLoad=function(params){
    var p;
    p = params.data;
    tableData(
        params,
        $.extend($("#searchForm").values(), p),
        //interUrl.purchase.gpsRefund
        interUrl.purchase.totalGps
    )
};