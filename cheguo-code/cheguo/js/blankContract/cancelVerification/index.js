//注册组件
Vue.component('v-input', comp.inputCompoent);
Vue.component('v-select', comp.selectCompoent);
Vue.component('v-table', comp.tableCompoent);
Vue.component('v-button', comp.btnCompoent);

var vm = null, dataLoad, dataLoad_1, tableEvent, handle, bankCheckState;

(function(){
    var vm = new Vue({
        el: "#cancelVerification",
        data: {
            table: [
                {field: 'projectNo', name: "贷款编号"},
                {field: 'contractNo', name: "合同编号"},
                {field: 'customerName', name: "客户名称"},
                {field: 'cardNo', name: "证件号码"},
                {field: 'plateNo', name: "车牌号码"},
                {field: 'wararntNo', name: "抵押权证号"},
                {field: 'pledgeTime', name: "抵押日期"},
                {field: 'pledgeOperatorName', name: "抵押经办人"},
                {field: 'bankCheckState', formatter: 'bankCheckState', name: "核销状态"},
                {field: 'checkOperatorName', name: "核销人"},
                {field: 'bankCheckTime', name: "核销时间"},
                {formatter: 'handle', events: 'tableEvent', name: "操作"}
            ],
            table1: [
                {field: 'projectNo', name: "贷款编号"},
                {field: 'contractNo', name: "合同编号"},
                {field: 'customerName', name: "客户名称"},
                {field: 'cardNo', name: "证件号码"},
                {field: 'plateNo', name: "车牌号码"},
                {field: 'wararntNo', name: "抵押权证号"},
                {field: 'pledgeTime', name: "抵押日期"},
                {field: 'pledgeOperatorName', name: "抵押经办人"},
                {field: 'bankCheckState', formatter: 'bankCheckState', name: "核销状态"},
                {field: 'checkOperatorName', name: "核销人"},
                {field: 'bankCheckTime', name: "核销时间"}
            ]
        },
        methods: {
            btnSearch: function() {
                var activeTab;
                activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
                return $("#" + activeTab).find("table").bootstrapTable("refresh", {url: "..."});
            }
        }
    })
})();



dataLoad = function(params) {
    tableData(params, $.extend($("#searchForm").values(), {bankCheckState: "2"}), interUrl.blankContract.isVerification)
}

dataLoad_1 = function(params) {
    tableData(params, $.extend($("#searchForm").values(), {bankCheckState: "1"}), interUrl.blankContract.isVerification)
}

tableEvent = {
    "click .cancleVerifi": function(e, a, item, index) {
        oppSureModal("确认核销权证号为："+ item.wararntNo+"的记录吗？");
        $("#sureOption").unbind("click").click(function () {
            comn.ajax({
                url: interUrl.blankContract.cancleVerifi,
                data: {
                    contractBankCheckId: item.id,
                    contractNo: item.contractNo
                },
                success: function(res) {
                    $("#sureModal").modal("hide");
                    $("#table, #table_1").bootstrapTable("refresh", {url: "..."});
                    tip({content: "核销成功！"});
                }
            })
        });
    }
};
handle = function(value, row, index) {
    return ['<button type="button" class="btn btn-primary btn-xs cancleVerifi">核销</button>']
};