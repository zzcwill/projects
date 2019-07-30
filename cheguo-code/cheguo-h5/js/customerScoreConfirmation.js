var withRelationship = function(value, row, index) {
    return [null, "主贷人", "配偶", "担保人", "反担保人"][value] || null;
}
var provideBusinessLicence = function(value, row, index) {
    return [null, "无", "有，成立时间1年以下且有经营场所", "有，成立时间1-3年且有经营场所", "有，成立时间3年以上且有经营场所"][value] || '无';
}
var provideAccountStatement = function(value, row, index) {
    return [null, "无", "有，近半年月均存款余额还贷比高于1:1", "有，近半年月均存款余额还贷比高于2:1"][value] || '无';
}
    $(function(){
    var args;
    args = common.getArgs();
    return common.Ajax({
        url: 'loanApproval/getLoanScoreFile',
        /*data: {
         businessId : 2001803854
         },*/
        data : args,
        success: function(data) {
            if (data) {
                var len, ref, o, html = "";
                ref = data;
                len = ref.length;
                for (i = 0; i < len; i++) {
                    o = ref[i];
                    console.log(o.provideBusinessLicenceItem)
                    var hBody = "";
                    for (j = 0; j < o.loanScoreItemList.length; j++) {
                        var v = o.loanScoreItemList[j];
                        hBody += [
                            '<div class="am-list-item">'+
                            '<div class="am-list-title">'+ v.fileName+'</div>'+
                            '<div class="am-list-extra '+(v.fileValue  == 1 ? 'pass' : 'noPass') +'"></div>'+
                            '</div>'
                        ].join("");
                    }
                    var isProvideBusinessLicenceItem = o.provideBusinessLicenceItem ? ['<div class="am-list-item">'+
                                                            '<div class="am-list-title">'+ o.provideBusinessLicenceItem.fileName +'</div>'+
                                                            '<div class="am-list-extra '+(o.provideBusinessLicenceItem.isProvide  == 1 ? 'pass' : 'noPass') +'"></div>'+
                                                            '</div>'].join("") : '';
                    var isProvideAccountStatementItem = o.provideAccountStatementItem ? ['<div class="am-list-item">'+
                                                            '<div class="am-list-title">'+ o.provideAccountStatementItem.fileName +'</div>'+
                                                            '<div class="am-list-extra '+(o.provideAccountStatementItem.isProvide  == 1 ? 'pass' : 'noPass') +'"></div>'+
                                                            '</div>'].join("") : '';
                    html += [
                        '<div am-mode="flat chip 43px" class="am-list">'+
                        '<div class="am-header-title">'+
                        '<div class="confirmationTitle  am-ft-center">'+ withRelationship(o.withRelationship) +' - '+ o.customerName+'</div>'+
                        '</div>'+
                        '<div class="am-list-body am-list">'+
                        '<div class="am-list-item">'+
                        '<div class="am-list-title">营业执照</div>'+
                        '<div class="am-list-extra">'+ provideBusinessLicence(o.provideBusinessLicence) +'</div>'+
                        '</div>'+
                        isProvideBusinessLicenceItem +
                        '</div>'+
                        '<div class="am-list-body am-list">'+
                        '<div class="am-list-item">'+
                        '<div class="am-list-title">银行流水</div>'+
                        '<div class="am-list-extra">'+ provideAccountStatement(o.provideAccountStatement) +'</div>'+
                        '</div>'+
                        isProvideAccountStatementItem +
                        '</div><div class="am-list-body am-list">'+ hBody + '</div></div>'
                    ].join("");
                }
                $("#page").append(html)
            }
        }
    });
})