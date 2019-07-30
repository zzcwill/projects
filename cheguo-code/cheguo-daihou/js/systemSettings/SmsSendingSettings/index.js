$(function () {
    //获取发送短信设置默认信息
    function getInfo() {
        comn.ajax({
            url: interUrl.systemSettings.messageSendSettingsView,
            data: {},
            success: function (res) {
                $("#saveForm").values(res.data.repaymentSendSettings);
                $("#saveForm2").values(res.data.overdueSendSettings);
                $("#saveForm3").values(res.data.pendingSendSettings);
            }
        });        
    }

    //刷新按钮点击事件
    $('#refresh').bind('click', function () {
        location.reload();
    })

    //保存按钮点击事件
    $('#btnSave').bind('click', function () {
        var data = {
            repaymentSendSettings: $("#saveForm").values(),
            overdueSendSettings: $("#saveForm2").values(),
            pendingSendSettings: $("#saveForm3").values(),
        }

        comn.ajax({
            url: interUrl.systemSettings.messageSendSettingsSave,
            data: { 
                messageInfo: JSON.stringify(data),
            },
            success: function (res) {
                tip({ content: '保存成功' });
            }
        });
    })

    //首次加载,执行方法
    getInfo();
    //日期插件初始化
    $('.date1').datetimepicker({
        format: 'hh:ii',
        autoclose: true,
        pickerPosition: "bottom-right",
        language: "zh-CN",
        autoclose: true,
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 1,
        minView: 0,
        maxView: 1,
        forceParse: 0
    });
})