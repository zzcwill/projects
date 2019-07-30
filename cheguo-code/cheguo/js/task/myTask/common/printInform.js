args = comn.getArgs();
//准入打印
comn.ajax({
    url: interUrl.myTask.printApprovalInfo,
    data: {
        loanApplyId:args['loanApplyId']
    },
    success: function (res) {
        $("#approvalBudgetInfoForm").nameValues(res);
        $(".coChapter img").attr("src", res.sealPath);
        setTimeout(function(){
            window.print();
        }, 1000);
    }
});