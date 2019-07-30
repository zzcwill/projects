
args = comn.getArgs();
//准入打印
comn.ajax({
    url: interUrl.second.get,
    data: {
        secondHandCarInfoId:args['secondHandCarInfoId']
    },
    success: function (res) {
    		//console.log(res.data)
        $("#approvalBudgetInfoForm").nameValues(res.data);
        $('#bankName').text(res.data.secondCarBankName + '二手车评估确认表');
        window.print();
    }
});