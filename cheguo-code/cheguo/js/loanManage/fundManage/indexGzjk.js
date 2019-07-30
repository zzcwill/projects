//注册组件
Vue.component('v-input',vueComponent.inputComponent);
Vue.component('v-table',vueComponent.tableComp);
Vue.component('v-select',vueComponent.selectComp);
Vue.component('modal-fade',vueComponent.modalFade);

var vm = new Vue({
    el:'#fundManage',
    data:{
    },
    methods:{
        btnSearch: function(){
            var table = $('.tab-pane.active').find('table').eq(1).attr('id');
            $("#" + table).bootstrapTable('refresh', {url: '...'});
        },
        //清空查询条件
        reset: function(){
        },
        //批量还款
        btnBatchPay: function () {
            var batchSubmit = {
                applyStatus: [],
                projectIds: []
            };
            $.map($("#table").bootstrapTable('getAllSelections'), function (row) {
                batchSubmit.applyStatus.push(row.applyStatus);
                batchSubmit.projectIds.push(row.projectId);
            });
            if (batchSubmit.applyStatus.length === 0) {
                tip({content: "请选择批量还款的数据！"})
            } else {
                var _projectIds = batchSubmit.projectIds.toString();
                var batchApplyFlag = isFlag(batchSubmit.applyStatus);
                if (batchApplyFlag) {
                    reSubmit("您已选择"+batchSubmit.applyStatus.length+"条数据，是否确认【批量还款】！", interUrl.fundManage.repayList, _projectIds);
                } else {
                    tip({content: '请选择已放款的数据！'});
                }
            }
        }

    },
    ready: function(){
        $('#orgId').getOrg();
        $('#coBankId').getBankAll();
        var dataArr =[["#applyStatus", "GuangJinApplyStatus"],["#imageTransmitStatus", "ImageTransmitStatus"],["#financeChannel", "FinanceChannelType"]];
        $.getCommonMethodPort(dataArr);
        $("input[name='applyTimeStart']").getToday();
        $("input[name='applyTimeEnd']").getToday();
    }
});

var dataLoad, handle_1, tableEvent;

dataLoad = function(params){
    tableData(params, $("#searchForm").values(), interUrl.fundManage.listGzjk)
    // tableData(params, $("#searchForm").values(), interUrl.fundManage.listGzjk)
};

handle_1 = function(value,row,index){
    return ["<div class='btn-group btn-group-xs'>" ,
            "<button type='button' class='btn btn-primary btn-xs dropdown-toggle' data-toggle='dropdown'>操作" ,
            "<span class='caret'></span>",
            "</button>",
            "<ul class='dropdown-menu' role='menu'>" ,
            "<li><a class='loanDetail' href='javascript:;'>查看详情</a></li>",
            "</ul>",
            "</div>"].join("");
};
tableEvent={
    //查看详情
    "click .loanDetail": function (e, a, item, index) {
        return comn.addTab({
            title: "贷款详情",
            href: "./Modal/customManage/customer/loanDetailGzjk.html?id=" + item.projectId + "&loanApplyId=" + item.projectId + "&projectId=" + item.projectId + "&businessTypeCode=LOAN_APPLY_FLOW&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY"
        })
    },
};
function isFlag(objects) {
    var testValue = 4;
    var testBolean;
    for (var i = 0; i < objects.length; i += 1) {
        if (testValue !== objects[i]) {
            testBolean = false;
            return testBolean;
        } else {
            testBolean = true;
        }
    }
    return testBolean;
}

function reSubmit(title, _url, _projectId){
    oppSureModal(title);
    $("#sureOption").unbind("click").click(function () {
        //保存流程意见
        comn.ajax({
            url: _url,
            data: {
                projectId: _projectId
            },
            success: function (res) {
                $("#sureModal").modal("hide");
                tip({
                    content: "操作成功！"
                });
                $(".tipText").html("");
                $("#table").bootstrapTable('refresh');
            }
        });
    });
}