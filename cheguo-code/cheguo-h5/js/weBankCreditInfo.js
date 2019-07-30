var effectiveDate
$(function() {
    var args = common.getArgs();
    return common.Ajax({
        url: 'customer/credit/get',
        data: args,
        success: function(data) {
            if (data) {
                $("#page").nameValues(data);
                effectiveDate = data.effectiveDate
            }
            if (data.relavants) {
                $.each(data.relavants,function(i,item) {
                    addRelavants(i,item)
                })
            }
        }
    });
});
function addRelavants(i,item) {
    var clone = $('#relavants').clone();
    clone.nameValues(item);
    $("#info2").append(clone)
    $('#info2 #relavants').removeClass('hide');
    $("#info2 #relavants").attr("id", "current" + i).addClass("relavants");
    $("[data-name='effectiveDate']").html(effectiveDate)
}
function checkResult(value) {
    return ["", "通过", "不通过"][value] || "";
}
