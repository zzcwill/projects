$(function() {
    var args;
    args = common.getArgs();
    return newCommon.Ajax({
        url: 'loanApproval/getApprovalBudgetInfo',
        data: args,
        success: function(data) {
            $("#page").nameValues(data.data);
        }
    });
});