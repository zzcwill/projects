$.getCommonMethodPort([['#estimateOrgCode','EstimateOrgCode']]);//获取评估机构列表
comn.ajax({
    url: interUrl.common.secondCarAssessment,
    data: {
        applyId: args["loanApplyId"] || args["projectId"]
    },
    success: function (res) {
        $("#2ndCarAssessment").values(res.data);
        //获取第三方评估数据
        if (res.data.canThirdEstimate) {
            $('#thirdPart').removeClass('hide');
            var thirdResponse = {};
            comn.ajax({
                url: interUrl.second.thirdResult,
                data: {
                    estimateId: res.data.id,
                    coCompanyId: res.data.secondCarBankId,
                    estimateOrgCode: 'JIE_GAO'
                },
                success: function (response) {
                    replace('#thirdPart',response.data);
                    thirdResponse = response.data;
                }
            });
            //查看评估报告
            $('#viewReport').unbind("click").click(function () {
                if(!thirdResponse.reportUrl) {
                    return tip({
                        content: '评估报告生成中，请稍后!'
                    });
                }
                comn.addTab({
                    href: thirdResponse.reportUrl,
                    title: '第三方评估报告'
                });
            });
        }
        //贷款详情中显示维保记录报告
        $("#maintenanceRecordReport").removeClass("hide");
        comn.ajax({
            url: interUrl.second.getMaintenanceRecordReport,
            data: {
                id: args["loanApplyId"] || args["projectId"],
                secondCarBankId: res.data.secondCarBankId
            },
            success: function (res) {
                if (res && res.data) {
                    replace('#maintenanceRecordReport',res.data);
                    if (res.data.maintenanceReportStatus !== undefined && res.data.maintenanceReportStatus === 1) {
                        $("#btn_maintenanceRecord").removeClass("hide")
                    }
                }
            }
        })
    }
});
if(args['type'] == 'ownersStaging'){
    $(".ownersStaging").removeClass('hide');
    $('.secondCarAssessment').addClass('hide');
}else{
    $('.ownersStaging input,.ownersStaging select,.ownersStaging textarea').attr('disabled',true);
}
//第三方数据填充
function replace (target,values) {
    Object.keys(values).map(function (key) {
        if($(target +' [name='+ key +']')) {
            $(target +' [name='+ key +']').val(values[key])
        }
    })
}

//查看维保记录报告
$("#btn_maintenanceRecord").click(function () {
    comn.ajax({
        url: interUrl.second.getMaintenanceReportDetails,
        data: {
            id: args["loanApplyId"] || args["projectId"]
        },
        success: function (res) {
            comn.addTab({
                href: res.data.pcUrl,
                title: '维保记录报告'
            });
        }
    });
})