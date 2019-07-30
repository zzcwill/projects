//注册组件
Vue.component('v-input', comp.inputCompoent);
Vue.component('v-select', comp.selectCompoent);
Vue.component('v-table', comp.tableCompoent);
Vue.component('v-button', comp.btnCompoent);

var vm = null, dataLoad, dataLoad1, tableEvent_1, handle_1;
//修改表格统一配置参数
var tableConfig = {};
$.map(comn.table, function (v, k) {
    tableConfig[k] = v;
});
tableConfig['height'] = "400";
tableConfig['pagination'] = false;
// var tableConfig1 = {};
// $.map(comn.table, function (v, k) {
//     tableConfig1[k] = v;
// });
// tableConfig1['height'] = "500";

//匿名函数
(function () {
    vm = new Vue({
        el: '#bankStockManage',
        data:{
            table:[
                {field:'operatorRealname',name:"当前责任人"},
                {field:'bankName',name:"合作银行"},
                {field:'orgName',name:"所属分公司"},
                {field:'areaName',name:"所属区域"},
                {field:'customerManager',name:"签单员"},
                {field:'contractTypeName',name:"合同类型"},
                {field:'inStockCount',name:"在库数"},
                {field:'onTheWayCount',name:"在途数"},
                {field:'totalCount',name:"合计"}
            ],
            table1:[
                {field:'operatorRealname',name:"当前责任人"},
                {field:'orgName',name:"所属公司　　　　　"},
                {field:'areaName',name:"所属区域　　　　　"},
                {field:'customerManager',name:"签单员"},
                {field:'stockStatus', formatter:'stockStatus1', name:"文件状态"},
                {field:'contractNo',name:"文件编号　　　　"},
                {field:'contractTypeName',name:"文件类型"},
                {field:'shippingNo',name:"原始快递单号　"},
                {field:'bankName',name:"所属银行　　　　　"},
                {field:'sendTime',name:"发件时间　"},
                {field:'customerName',name:"客户姓名"},
                {field:'projectNo',name:"贷款编号　　　　　　　　"},
                {field:'signedState', formatter:'signedState', name:"签单状态　"},
                {field:'signedTime',name:"签单时间　"},
                {field:'contractWriteState', formatter: 'contractWriteState', name:"合同抄写状态"},
                {field:'contractWriteTime',name:"抄写时间　"},
                {field:'guarantyState', formatter: 'guarantyState', name:"抵押状态"},
                {field:'guarantyTime',name:"抵押时间　"},
                {field:'bankCheckState', formatter: 'bankCheckState', name:"银行核销状态"},
                {field:'bankCheckTime',name:"核销时间　"},
                {formatter:'handle_1', events:'tableEvent_1', name:"操作"}
            ],
            options: [
                {operatorName: "", content: ''}
            ]
        },
        methods: {
            btnSearch: function() {
                return $("#table").bootstrapTable('refresh', {url: "..."});
            },
            btnSearch1: function() {
                return $("#table_1").bootstrapTable('refresh', {url: "..."});
            }
        },
        ready: function ready(){
            $(".contractTypeId").getContractType('', interUrl.blankContract.getAllContractType);
            $(".bankId").contractBankGet();
            $("#orgId, #orgId1").getContractOrg();
        }
    });
})();

 dataLoad = function(params){
     var p;
     p = params.data;
     comn.ajax({
         url: interUrl.blankContract.accountList,
         data: $.extend($("#searchForm").values(), p),
         success: function (res) {
             params.success({
                 'total': res.data.conditions.totalItem,
                 'rows': res.data.datas
             });
             params.complete();
             $("#TotalSpending").values(res.data.queryMap);
         }
     });
 };
$("#table").bootstrapTable(tableConfig);
 dataLoad1 = function(params){
     var p;
     p = params.data;
     tableData(
         params,
         $.extend($("#searchForm1").values(), p),
         interUrl.blankContract.contractAccount
     )
 };
tableEvent_1 = {
    "click .checkRecord": function (e, a, item, index) {
        comn.ajax({
            url: interUrl.blankContract.contractCheckGet,
            data: {
                contractNo : item.contractNo
            },
            success: function (res) {
                if(res.data.length > 0) {
                    $("#checkRecord").modal("show");
                    vm.$data.options = res.data;
                } else {
                    return tip({content: '尚无交接记录'})
                }
            }
        })
    }
};
handle_1 = function(value, row, index) {
    return ['<button type="button" class="btn btn-primary btn-xs checkRecord">查看交接记录</button>'].join("");
};
var isFirstDetail = 0;
$(".nav-tabs a").click(function(){
    var activeTab = $(this).attr("href");
    if (activeTab === "#allSheet") {
        $("#searchForm").removeClass("hide");
        $("#searchForm1").addClass("hide");
    } else {
        if (isFirstDetail === 0) {
            $("#table_1").bootstrapTable('refresh', {url: "..."});
            isFirstDetail++;
        }
        $("#searchForm").addClass("hide");
        $("#searchForm1").removeClass("hide");
    }
});
$(document).on("change", ".org", function(){
    var area = $(this).parents('form').find("select.area");
    var manage = $(this).parents('form').find("select.manager");
    if ($(this).val()) {
        area.getContractArea($(this).val());
        manage.html("<option value=''>--请选择--</option>");
    } else {
        area.html("<option value=''>--请选择--</option>");
        manage.html("<option value=''>--请选择--</option>");
    }
});
$(document).on("change", ".area", function(){
    var manager = $(this).parents('form').find("select.manager");
    if ($(this).val()) {
        manager.getareaManager($(this).val());
    } else {
        manager.html("<option value=''>--请选择--</option>");
    }
})