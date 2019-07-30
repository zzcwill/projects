var withRelationship = function(value, row, index) {
    return ["", "主贷人", "配偶", "担保人", "反担保人"][value] || "";
}
$(function(){
    var args;
    args = common.getArgs();
    return common.Ajax({
        url: 'loanApproval/getLoanScoreComment',
        /*data: {
         businessId : 2001803854
         },*/
        data : args,
        success: function(data) {
            if (data) {
                var len, o, html = "";
                len = data.length;
                for (i = 0; i < len; i++) {
                    o = data[i];
                    var _flag = true;
                    if (JSON.stringify(o) === '{}') {
                        _flag = false;
                    } else {
                        _flag = true;
                    }
                    html += [(_flag === true ? (
                        '<div class="am-list-body">'+
                        '<div class="am-list-item">'+
                        '<div class="am-list-title notNowrap">'+ (i+1) +'. ['+ withRelationship(o.loanScoreItem ? isFlag(o.loanScoreItem.withRelationship) : '') +' - '+ isFlag(o.loanCustomerName) +'] '+ (o.loanScoreItem ? isFlag(o.loanScoreItem.fileName) : '') +'</div>'+
                        '</div>'+
                        '</div>') : '')
                    ].join("");
                }
                $("#reqCusDet").append(html)
            }
        }
    });
});

function isFlag(obj){
    if (obj) {
        return obj;
    } else {
        return "";
    }
}