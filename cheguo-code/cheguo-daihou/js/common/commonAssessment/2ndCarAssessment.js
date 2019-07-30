comn.ajax({
    url: interUrl.common.secondCarAssessment,
    data: {
        applyId: args["loanApplyId"]
    },
    success: function (res) {
        $("#2ndCarAssessment").values(res.data);
    }
})