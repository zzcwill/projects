var table, handle_1, handle_2, sort_table = "desc";

handle_1 = function (value, row, index) {
    if (row.busiType == 0)
    {
        return "常规提醒";
    }
    if (row.busiType == 1) {
        return "还款提醒";
    }
    if (row.busiType == 2) {
        return "逾期提醒";
    }
    if (row.busiType == 3) {
        return "待办提醒";
    }
    return "--"
};
table = function (params){
    var p = params.data;
    $.extend(p, { orders: sort_table})
    return comn.ajax({
        url: interUrl.messageRecord.messageWarningList,
        data: $.extend($("#recordForm").values(), p),
        success: function (res) {
            if (res && res.totalItem) {
                $(".tip_num").css("padding", "0 3px");
            }
            window.parent.document.getElementById("tipNumElm").innerHTML = res.totalItem;
            params.success({
                'total': res.totalItem,
                 rows: res.data
            });
            return params.complete();
        }
    });
}

handle_flag = function (value, row, index){
    if (row.status == 1)
    {
        return `
        <div class="removeRed" index="${row.id}" style="text-align:center;width:10px;height:10px;border-radius:50%;background:#FF4040;margin:0 auto;"></div>
        `
    }
    return `
        <div index="${row.id}" style="text-align:center;width:10px;height:10px;border-radius:50%;background:#FF4040;margin:0 auto;"></div>
    `
}

$("#table").on("click-row.bs.table", function (e, row, $element){
    if (row.status == 0)
    {
        comn.ajax({
            url: interUrl.messageRecord.messageWarningRead,
            data:{
                ids:row.id
            },
            success: function (res) {
                if (res.code == 10000){
                    $($element.context.parentElement).find("td").eq(0).find("div").addClass("removeRed")
                    comn.ajax({
                        url: interUrl.messageRecord.messageWarningCount,
                        data: {
                            status: 0
                        },
                        success: function (res) {
                            if(res.data == 0)
                            {
                                $(window.parent.document).find(".icon-xiaoxi").html("");
                            }
                            else {
                                $(window.parent.document).find(".icon-xiaoxi").html(`<span id='messageRemain' class='xiaoxiStyle'>${res.data}</span>`);
                            }
                        }
                    });
                }
            }
        });
    }
})

$("#table").on("sort.bs.table", function (name,order) {
    if (sort_table == "asc")
    {
        sort_table = "desc"
        return;
    }
    if (sort_table == "desc")
    {
        sort_table = "asc"
    }
})


//全部标记已读事件
$("#allRead").click(function(){
    var ids = []
    for (var i = 0; i < $("#table tbody tr").length; i++)
    {
        ids.push($("#table tbody tr").eq(i).find("td").eq(0).find("div").attr("index"))
    }
    ids = ids.join(",")

    comn.ajax({
        url: interUrl.messageRecord.messageWarningRead,
        data: {
            ids: ids
        },
        success: function (res) {
            if (res.code == 10000) {
                for (var i = 0; i < ids.split(",").length; i++)
                {
                    $("#table tbody tr").eq(i).find("td").eq(0).find("div").addClass("removeRed")
                }
                comn.ajax({
                    url: interUrl.messageRecord.messageWarningCount,
                    data: {
                        status: 0
                    },
                    success: function (res) {
                        if (res.data == 0) {
                            $(window.parent.document).find(".icon-xiaoxi").html("");
                        }
                        else
                        {
                            $(window.parent.document).find(".icon-xiaoxi").html(`<span id='messageRemain' class='xiaoxiStyle'>${res.data}</span>`);
                        }
                    }
                });
            }
        }
    });
})

$(function(){
    
})