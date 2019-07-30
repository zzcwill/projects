$(function () {
    $("#export").click(function(){
        var downLink = interUrl.basic + interUrl.gr.downloadTemplate;
        window.open(downLink, "_blank");
    });
});
var documentCheckStatus,documentKeepAddr;
var dataLoad = function(params){
    tableData(params, $("#searchForm").values(), interUrl.fundManage.paymentDataList);
}

// 数据导入
$("#import").click(function() {
    $("#upFileInput").trigger("click");
});
// 上传按钮改变时触发upload方法
$('#upFileInput').on('change', function() {
    if ($('input[type="file"]').val() != "") {
        var extend = $('input[type="file"]').val().substr($('input[type="file"]').val().lastIndexOf(".") + 1);
        if ("xls|xlsx".indexOf(extend) == -1) {
            flagPic = false;
            layer.msg("选择的文件必须是EXCEL文件,请确认！");
        } else {
            upload();
            $("#upFileInput").replaceWith($("#upFileInput").clone(true));
        }
    } else {
        layer.msg("请选EXCEL文件");
    }

});
// 上传方法
function upload() {
    return $.ajaxFileUpload({
        url: interUrl.basic + interUrl.fundManage.paymentDataImport,
        secureuri: false,
        fileElementId: 'upFileInput',
        dataType: "json",
        success: function (data, status) {
            if (data.code == 10000) {
                $("#btn-search").click()
                tip({
                    content: "放款数据导入完成"
                });
            } else {
                tip({
                    content: data.message
                });
            }
        },
        complete: function () {
            console.log("msg");
        },
        error: function (data, status, e) {
            tip({
                content: data.message
            });
        }
    });
}
