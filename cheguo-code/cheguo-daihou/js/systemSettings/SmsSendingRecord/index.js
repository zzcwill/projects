//boostrap-table插件定义参数start
var table_1 = function (params) {
    tableData(params, $("#searchForm").values(), interUrl.systemSettings.messageManageSmsLoglist);
};

//复选
var checkBox = function (value, row, index) {
    return '<input type="checkbox" class="checkbox" data-id="' + row.id + '" data-status="' + row.status + '" />';
}
//boostrap-table插件定义参数end

$(function () {
    //重新发送点击事件
    $("#toResend").on("click", function () {
        var data = {
            ids: [],
            isOK: true,
        };

        //获取重新发送短信的id和是否只有失败状态
        $("#table .checkbox:checked").each(function (index) {
            data.ids.push($(this).attr("data-id"));

            //判断是否只有失败的情况
            if($(this).attr("data-status") === '1' || $(this).attr("data-status") === '0') {
                data.isOK = false;
            }

        });
        
        //没有选中短信条数
        if (data.ids.length === 0) {
            tip({ content: "请选择要重新发送的记录" });
            return;
        }

        if (!data.isOK) {
            tip({ content: "只有发送失败的短信才可以重新发送" });
            return;
        }        


        var _ids = data.ids.toString();

        oppSureModal("确定重新发送吗?");
        $("#sureOption").unbind("click").click(function () {        
            //保存流程意见
            comn.ajax({
                url: interUrl.systemSettings.messageManageRepeatSendSms,
                data: { smsLogId: _ids },
                success: function (res) {
                    $("#sureModal").modal("hide");
                    tip({ content: "重新发送成功!" });
                    $("#table").bootstrapTable("refresh", { url: "..." });
                }
            })
        })        
    });
    
    //首次加载执行方法
});