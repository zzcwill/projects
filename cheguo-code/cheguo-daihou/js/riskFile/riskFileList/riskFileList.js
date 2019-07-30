//boostrap-table插件定义参数start
var table_1 = function (params) {
    tableData(params, $("#searchForm").values(), interUrl.riskProfileManagement.riskProfileList);
};

var handle_1 = function (value, row, index) {
    var str = '';
    var str2 = '';
    if (row.status === 1) {
        str = "<li><a class='feedBack'>反馈登记</a></li>";
        str2 = "<li><a class='modify'>修改</a></li>";
    }
    return ["<div class='btn-group btn-group-xs'>",
                "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
                    "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>",
                "</button>",
                "<ul class='dropdown-menu' role='menu'>",
                    str,
                    str2,
                    "<li><a class='detail'>查看贷款详情</a></li>",
                "</ul>",
            "</div>"].join("");
};

var tableEvent_1 = {
    "click .modify": function (e, a, item, index) {
        comn.addTab({
            title:'风险档案修改',
            href: './Modal/riskFile/riskRegister/riskRegister.html?type=2&id=' + item.id
        })
    },    
    "click .detail": function (e, a, item, index) {
        comn.addTab({
            title:'查看风险档案详情',
            href: './Modal/riskFile/riskRegister/riskRegister.html?type=3&id=' + item.id            
        })
    },
    "click .feedBack": function (e, a, item, index) {
        comn.addTab({
            title:'反馈登记',
            href: './Modal/riskFile/riskRegister/riskRegister.html?type=4&id=' + item.id
        })
    },    
}
//boostrap-table插件定义参数end

$(function () {
    //导出excel-点击事件
    $('#exportBtn').bind('click',function () {
        var search = $("#searchForm").serialize();
        var downLink = interUrl.basic + interUrl.riskProfileManagement.riskProfileExport + "?" + search;
        window.open(downLink, "_blank");
    }); 
    
    //清空查询条件
    $("#btn-reset").click(function () {
        $(".selectpicker").val("").change();
        $(".selectpicker").selectpicker('val', []);
    });    
    
    //风险档案按钮点击事件
    $('#riskRegister').bind('click',function(){
        comn.addTab({
            title:'风险档案登记',
            href: './Modal/riskFile/riskRegister/riskRegister.html?type=1'
        })        
    })

    //首次加载执行方法
    //获取发起机构列表
    $("#orgId").getOrg('', function () {
        $('.selectpicker').selectpicker('refresh');
    }, '');
    //获取银行列表
    $("#coBankId").getBankAll('', function () {
        $('.selectpicker').selectpicker('refresh');
    }, '');  

    //获取名单制类型列表和风险类型列表
    var dataArr =[["#overdueType", "overdueType"],['#riskType','riskType']];
    $.getCommonMethodPort(dataArr);
});