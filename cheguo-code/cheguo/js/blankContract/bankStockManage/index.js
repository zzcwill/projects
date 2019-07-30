//注册组件
Vue.component('v-input', comp.inputCompoent);
Vue.component('v-select', comp.selectCompoent);
Vue.component('v-table', comp.tableCompoent);
Vue.component('v-button', comp.btnCompoent);

var vm = null, dataLoad, dataLoad_1, tableEvent_1, handle_1, dataLoad_2, tableEvent_2, handle_2, showFlag = false;
//修改表格统一配置参数
var tableConfig = {};
$.map(comn.table, function (v, k) {
    tableConfig[k] = v;
});
tableConfig['height'] = "400";
tableConfig['pagination'] = false;
//匿名函数
(function () {
    vm = new Vue({
        el: '#bankStockManage',
        data:{
            table:[
                {field:'contractTypeName', name:"文件类型"},
                {field:'inStockStatus', name:"在库"},
                {field:'onWayStatus', name:"在途"},
                {field:'usingStatus', name:"使用中"},
                {field:'checkedStatus', name:"已核销"}
            ],
            table1:[
                {field:'contractNo', name:"文件编号"},
                {field:'contractTypeName', name:"文件类型"},
                {field:'operatorName', name:"入库人员"},
                {field:'stockStatus', formatter:'stockStatus2', name:"库存状态"},
                {field:'bankName', name:"归属银行"},
                {field:'createTime', name:"入库时间"},
                {formatter:'handle_1', events:'tableEvent_1', name:"操作"}
            ],
            table2: [
                {field:'contractNo', name:"文件编号"},
                {field:'bankName', name:"合作银行"},
                {field:'contractTypeName', name:"文件类型"},
                {formatter:'handle_2', events:'tableEvent_2', name:"操作"}
            ],
            options: [
                {operatorName: "", content: ''}
            ]
        },
        methods: {
            btnSearch: function() {
                getId();
            },
            addStock: function() {
                comn.ajax({
                    url: interUrl.blankContract.verifyRole,
                    success: function (res) {
                        $("#searchForm_1 input, #searchForm_1 select").val("");
                        $("#addStockBank").modal("show");
                        console.log(showFlag);
                        showFlag ? $("#table_2").bootstrapTable("destroy").bootstrapTable(tableConfig) : '';
                        showFlag = true;
                    }
                })

            },
            addStockPre: function() {
                $("#table_2").bootstrapTable("destroy").bootstrapTable(tableConfig);
                var _value = comn.accSub($("#endNo").val(), $("#startNo").val());
                if (_value < 0) {
                    return tip({content: "开始编号大于结束编号，请重新输入"})
                } else if (_value > 200) {
                    return tip({content: "新增记录超过200条，请重新选择！"});
                } else {
                    $("#searchForm_1").validate();
                    if($("#searchForm_1").valid()==true){
                        comn.ajax({
                            url: interUrl.blankContract.contractBankPreAdd,
                            data: $.extend($("#searchForm_1").values(), {
                                bankId: comn.user.bankId,
                                orgId: comn.user.companyId,
                                orgName: comn.user.companyName,
                                operatorId: comn.user.uid,
                                operatorName: comn.user.username
                            }),
                            success: function(res){
                                $("#table_2").bootstrapTable("append", res.data).bootstrapTable(tableConfig);
                            }
                        })
                    }
                }
            },
            addStockSure: function() {
                var _a = $("#table_2").bootstrapTable("getData");
                comn.ajax({
                    url: interUrl.blankContract.contractBankAdd,
                    data: {batchArr:JSON.stringify(_a)},
                    success: function(res){
                        //$("#table_2").bootstrapTable("append", res.data);
                        $("#addStockBank").modal("hide");
                        getId();
                    }
                })
            },
            changeContractType: function(e) {
                $("#contractTypeName").val($(e.target).find('option:selected').text())
            }
        },
        ready: function ready(){
            $("#table_2").bootstrapTable(tableConfig);
            $(".contractTypeId").getContractType();
        }
    });
})();
 dataLoad=function(params){
     var p;
     p = params.data;
     comn.ajax({
         url: interUrl.blankContract.contractBankAllList,
         data: $.extend($("#searchForm").values(),{bankId: comn.user.bankId},  p),
         success: function (res) {
             params.success({
                 'total': res.totalItem,
                 'rows': res.data.datas
             });
             params.complete();
             $("#TotalSpending").values(res.data.conditions);
         }
     });
 };
$("#table").bootstrapTable(tableConfig);
 dataLoad_1=function(params){
     var p;
     p = params.data;
     tableData(
         params,
         $.extend($("#searchForm").values(), {bankId: comn.user.bankId}, p),
         interUrl.blankContract.contractBankDetailList
     )
 };

tableEvent_1 = {
    "click .modify": function(e, a, item, index) {

    },
    "click .delete": function(e, a, item, index) {
        comn.ajax({
            url: interUrl.blankContract.contractBankDel,
            data: {
                id: item.id
            },
            success: function (res) {
                tip({content: "删除银行库存成功！"})
            }
        });
        $("#table_1").bootstrapTable('refresh')
    },
    "click .cancel": function(e, a, item, index) {

    },
    "click .checkRecord": function(e, a, item, index) {
        comn.ajax({
            url: interUrl.blankContract.contractCheckGet,
            data: {
                contractNo : item.contractNo
            },
            success: function (res) {
                (function(){
                    if(res.data.length > 0) {
                        $("#checkRecord").modal("show");
                        vm.$data.options = res.data;
                    } else {
                        return tip({content: '尚无交接记录'})
                    }
                })();


            }
        })
    }
};
handle_1 = function(value, row, index) {
    // var opreater = "";
    if (row.stockStatus === 1) {
        // opreater = "<li><a class='delete'>删除</a></li>";
        return ['<button type="button" class="btn btn-primary btn-xs delete">删除</button>']
    } else if (row.stockStatus === 3) {
        // opreater = "<li><a class='checkRecord'>查看交接记录</a></li>";
        return ['<button type="button" class="btn btn-primary btn-xs checkRecord">查看交接记录</button>']
    } else if (row.stockStatus === 8) {
        // opreater = "<li><a class='checkRecord'>查看交接记录</a></li>"
        return ['<button type="button" class="btn btn-primary btn-xs checkRecord">查看交接记录</button>']
    } else {
        return "--"
    }
    // return ["<div class='btn-group btn-group-xs'>",
    //     "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
    //     "<span class='caret'></span>",
    //     "<span class='sr-only'>下拉切换</span>",
    //     "</button>",
    //     "<ul class='dropdown-menu' role='menu'>",
    //     opreater,
    //     "</ul>", "</div>"].join("");
};

tableEvent_2 = {
    "click .delete": function(e, a, item, index) {
        var data = $("#table_2").bootstrapTable('getData');
        $("#table_2").bootstrapTable('remove', {
            field: 'contractNo',
            values: [data[index].contractNo]
        });
        //$(this).parents("tr").remove();
    }
};
handle_2 = function(value, row, index) {
    return ['<button type="button" class="btn btn-primary btn-xs delete">移除</button>']
};

function getId() {
    var activeTab;
    activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
    return $("#" + activeTab).find("table").bootstrapTable("refresh", {url: "..."});
}

function canRead(val) {
    var reloCode = false;
    $.each(val, function(i, v){
        console.log(typeof (v.roleCode))
        if (v.roleCode === "R41") {
            reloCode = true;
            return false;
        }
    });
    console.log("reloCode:"+reloCode)
    return reloCode;
}
if (canRead(comn.user.roleList)) {
    $("#btn_addStock").removeClass("hide");
}