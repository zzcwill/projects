var withRelationship = function(value, row, index) {
    return [null, "主贷人", "配偶", "担保人", "反担保人"][value] || null;
}
$(function(){
    var args;
    args = common.getArgs();
    return common.Ajax({
        url: 'loanApproval/getLoanScoreItem',
        /*data: {
         businessId : 2001803854
         },*/
        data : $.extend(args, {checkResult : 2}),
        success: function(data) {
            if (data) {
                var len, o, html = "";
                len = data.length;
                for (i = 0; i < len; i++) {
                    o = data[i];
                    html += [
                        '<div class="am-list-body">'+
                        '<div class="am-list-item">'+
                        '<div class="am-list-title notNowrap">'+ (i+1) +'. ['+ withRelationship(o.loanScoreItem.withRelationship) +' - '+ o.loanCustomerName +'] '+ o.loanScoreItem.fileName +'</div>'+
                        '</div>'+
                        '</div>'
                    ].join("");
                }
                $("#reqCusDet").append(html)
            } else {
                $("#reqCusDet").append("<div class='am-ft-center'>当前没有拒绝清单</div>")
            }
        }
        //success: function(data) {
        //    if (data) {
        //        var html = "", len, ref, o;
        //        len = data.length;
        //        for (i = 0; i < len; i++) {
        //            o = data[i];
        //            html += [
        //                '<tr>'+
        //                '<td>'+ o.fileName +'</td>'+
        //                '<td>'+ o.itemName +'</td>'+
        //                '<td>'+ o.itemScore +'</td>'+
        //                '<td>'+ o.realScore +'</td></tr>'
        //            ].join("")
        //        }
        //
        //    }
        //}
    });
})