var table_1, handle_1, tableEvent_1;

//续保核验列表
$("#now").getToday(); //获取当前时间
//续保日期为当前日期的前一天
var date = new Date();
var y = date.getFullYear();
var m = date.getMonth() < 10 ? ("0" + date.getMonth()) : date.getMonth();
var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
if (m == 0) {
    y = y - 1;
    m = 12;
}
var today = y + "-" + m + "-" + d;
$("#aMonthAgo").val(today);
table_1 = function(params) {
    tableData(params, $("#searchForm").values(), interUrl.insurance.loanInsuranceRenewalInfoCavList);
};

handle_1 = function(value, row, index) {
    var cavStatus = "";
    if (row.cavStatus == 2)
    {
        cavStatus = "<li><a class='verification'>核销</a></li><li><a class='back'>退单</a></li>";
    } else {
        cavStatus = "<li><a class='cancel'>取消</a></li>";
    }
    return ["<div class='btn-group btn-group-xs'>",
        "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
        "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>",
        "</button>",
        "<ul class='dropdown-menu' role='menu'>", cavStatus ,
        "</ul>",
        "</div>"].join("");
};
tableEvent_1 = {
    "click .cancel": function (e, a, item, index) {
        updateCavStatus("确定取消？", "取消成功！", 2, item.id)
    },
    "click .verification": function (e, a, item, index) {
        updateCavStatus("确定核销？", "核销成功！", 1, item.id)
    },
    "click .back": function (e, a, item, index) {
        updateCavStatus("确定退单？", "退单成功！", 3, item.id)
    }
}

// function updateCavStatus(title, tipTitle, value, id) {
//     $("#sureModal").modal("show");
//     $("#sureModal").find(".tipText").text(title);
//     $("#sureOption").unbind("click").click(function () {
//         $("#sureModal").modal("hide");
//         comn.ajax({
//             url : interUrl.insurance.updateCavStatus,
//             data : {
//                 id : id,
//                 cavStatus: value
//             },
//             success : function (res) {
//                 tip({ content : tipTitle});
//                 $("#table").bootstrapTable("refresh", {url: "..."});
//             }
//         })
//     })
// }
function updateCavStatus(title, tipTitle, value, id) {
    $("#sureModal").modal("show");
    $("#sureModal").find(".tipText").text(title);
    $("#sureOption").unbind("click").click(function () {
        $("#sureModal").modal("hide");
        comn.ajax({
            url : interUrl.insurance.updateCavStatus2,
            data : {
                id : id,
                cavStatus: value
            },
            success : function (res) {
                tip({ content : tipTitle});
                $("#table").bootstrapTable("refresh", {url: "..."});
            }
        })
    })
}

//导出
$('#exportBtn').click(function(){
    var search = $("#searchForm").serialize();
    var downLink = interUrl.basic + interUrl.insurance.loanInsuranceRenewalInfoCavListExport + "?" + search ;
    console.log(downLink);
    window.open(downLink, "_blank");
});

$(function(){
    $("#orgId").getOrg();
    $("#insuranceCompanyId").getInsurance("", function() {
        $('.selectpicker').selectpicker('refresh');
    });
    $("#btn-reset").click(function(){
        $("#insuranceCompanyName, #insuranceCompanyId").val("").change();
    })
})