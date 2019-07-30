var uId = comn.user.uid;
var args = comn.getArgs();

//预警记录列表接口
var dataLoad_1= function(params){
    var p;
    p = params.data;
    comn.ajax({
        url: interUrl.invoice.invoiceInvoiceWarnList,
        data: $.extend($("#searchForm").values(), p),
        success: function(res) {
            params.success({
                'total': res.totalItem,
                'rows': res.data
            });
            params.complete();
        }
    });
};

var tableEvent = {
    "click .info": function(e, a, item, index) {
        return comn.addTab({
            title:"贷款详情",
            href: "./Modal/customManage/customer/loanDetail.html?id="+ item.projectId +"&projectId=" + item.projectId +"&loanApplyId="+ item.projectId +"&space=LOAN&releventFlowNode="+ item.releventFlowNode +"&releventFlow=" + item.releventFlow + "&loanFlag=3"+"&invoiceVertifyFlag=2"
        })
    }
};

var handle = function(value, row, index) {
    return ["<button type='button' class='btn btn-primary btn-xs info'>查看贷款详情</button>"].join("");
};

//报警日期初始化
function warnDayInit() {
    //根据毫秒转日期
    function msToTime() {
        var t = new Date()
        var y = t.getFullYear()
        var m = t.getMonth() + 1
        var d = t.getDate()
        m = m < 10 ? '0' + m : m
        d = d < 10 ? '0' + d : d
        var str = y + '-' + m + '-' + d
        return str
    }

    $('#warnTimeBegin').val(msToTime());
    $('#warnTimeEnd').val(msToTime());

}
warnDayInit();


$(function() {


    $("#resetValue").click(function(){
        $("#orgId").val("").change();
        //清空合作有银行
        $("#loanInfoCooperationBankId").selectpicker('val', '');
    });
    $("#dealerGroupId").getDealerGroup();

    $("#orgId").getOrg( function() {
        $('.selectpicker').selectpicker('refresh');
    });
    $("#orgId").off('change').on("change", function() {
        var code = $(this).find("option:selected").attr('value');
        $("#loanBusinessGroupId").getGroup(code);
    });
    $("#loanBusinessGroupId").off('change');
    /** 合作银行 **/
    $("#loanInfoCooperationBankId").getBankAll(function() {
        $('.selectpicker').selectpicker('refresh');
    });
    $('#exportBtn').click(function(){
        var search=$("#searchForm").serialize();

        //获取table中文和英文表头
        function getTableListName() {
            var titlesCh = [];

            var titlesEn = [];

            var dom = $('#table thead tr th');

            for(var i = 0 ; i < dom.length ; i++){
                if(dom.eq(i).children('div.th-inner').text() !== '操作'){
                    titlesEn.push(dom.eq(i).attr('data-field'));
                    titlesCh.push(dom.eq(i).children('div.th-inner').text().replace(/\s/g,''));
                }
            }
            var data = "&titlesEn=" + titlesEn.join(',') + "&titlesCh=" +  titlesCh.join(',');
            return data
        }
        var thead = getTableListName();
        var downLink = interUrl.basic + interUrl.invoice.invoiceExport + "?" + search + thead;
        //console.log(downLink)
        window.open(downLink, "_blank");
    });
});
