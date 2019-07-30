var dataLoad_1, dataLoad_2, handle_1, handle_2, handle_3, tableEvent, fileSended1, fileSended2, billId, okHandleFn,tableEvent3;
var arrPackage = [];
var arrItem = [];
var packgeData=[];
var $table1=$("#table1");
var $table3=$("#table3");
dataLoad_1 = function (params) {
    return tableData(params, $.extend($("#searchForm").values(), {}), interUrl.mockList || interUrl.documentManagement.sendCompanyList,function checkIn(){
        $table1.bootstrapTable('checkBy', {field: "id", values: arrItem});
    });
};
dataLoad_2 = function (params) {
    return tableData(params, $.extend($("#searchForm").values(), {}), interUrl.mockList || interUrl.documentManagement.hasSendCompanyList);
};
dataLoad_3 = function (params) {
    return tableData(params, $.extend($("#searchForm").values(), {
        billId: billId
    }), interUrl.mockList || interUrl.documentManagement.expressList);
};
handle_1 = function (value, row, index) {
    return ["<div class='btn btn-xs btn-primary loaninfo'>查看贷款详情</div>"].join(" ");
};
handle_2 = function (value, row, index) {
    if (row['recipientStatus'] && row['recipientStatus'] == 3)
        return ["<div class='btn btn-primary btn-xs info'>查看</div>"].join("");
    return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='info'>查看</a></li>", "<li><a class='update'>修改</a></li>", "<li><a class='delete'>删除</a></li>", "</ul>", "</div>"].join("");
};
fileSended1 = function (value, row, index) {
    if (row['fileSended'] && (row['fileSended'] & 2) == 2)return "已发";
    return "未发";
}
fileSended2 = function (value, row, index) {
    if (row['fileSended'] && (row['fileSended'] & 1) == 1)return "已发";
    return "未发";
};


handle_3=function(value,row,index){
    return ["<div class='btn btn-primary btn-xs removeParcel'>移除包裹</div>"]
}
$table1.on("check.bs.table",function(e,row){
    //包裹数据
    if(packgeData.length>0){
        arrItem=[];
        arrPackage=[];
        for(var i=0;i<packgeData.length;i++){
            arrPackage.push(packgeData[i]);
            arrItem.push(packgeData[i].id);
        }
    };
    if(arrItem.indexOf(row.id)==-1){
        if(arrPackage.length>0){
            if(arrPackage[0].coBankName==row.coBankName){
                arrPackage.push(row);
                arrItem.push(row.id);
            }else{
                tip({
                    content:"必须相同银行的客户资料才能放入同一包裹，请确认"
                })
            }
        }else{
            arrPackage.push(row);
            arrItem.push(row.id);
        }
    }else{
        //tip({
        //    content:"包裹中已经存在相同客户"
        //})
    }
}).on("uncheck.bs.table",function(e,row){
    var num=arrItem.indexOf(row.id);
    if(num>-1){
        arrItem.splice(num,1);
        arrPackage.splice(num,1);
    }
}).on("check-all.bs.table",function(e,row){
//    if(packgeData.length>0){
//        arrItem=[];
//        arrPackage=[];
//        for(var i=0;i<packgeData.length;i++){
//        arrPackage.push(packgeData[i]);
//        arrItem.push(packgeData[i].id);
//    }
//};
    for(var i=0;i<row.length;i++){
        if(row[0].coBankName==row[i].coBankName){
            arrPackage=row;
        }else{
            tip({
                content:"必须相同银行的客户资料才能放入同一包裹，请确认"
            })
        }
    }
}).on("uncheck-all.bs.table",function(e,row){
    //if(packgeData.length>0){
        arrItem=[];
        arrPackage=[];
    //    for(var i=0;i<packgeData.length;i++){
    //        arrPackage.push(packgeData[i]);
    //        arrItem.push(packgeData[i].id);
    //    }
    //};

});

tableEvent = {
    "click .loaninfo": function (e, a, item, index) {
        return comn.addTab({
            title: '贷款详情',
            href: "./Modal/customManage/customer/loanDetail.html?businessTypeCode=LOAN_APPLY_FLOW&projectId=" + item.projectId + "&loanApplyId=" + item.loanApplyId + "&id=" + item.projectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY"
        });
    },
    "click .info": function (e, a, item, index) {
        window.parent.cache.emailList = "";
        return window.parent.toUrl({
            url: "./Modal/documentManagement/sendManageCompany/editExpress.html?type=show&billId=" + item.id
        });
    },
    "click .update": function (e, a, item, index) {
        window.parent.cache.emailList = "";
        return window.parent.toUrl({
            url: "./Modal/documentManagement/sendManageCompany/editExpress.html?billId=" + item.id
        });
    },
    "click .delete": function (e, a, item, index) {
        $("#sure").modal("show");
        okHandleFn = function () {
            $("#sure").modal("hide");
            return comn.ajax({
                url: interUrl.documentManagement.delExpress,
                data: {
                    billId: item['id'],
                    billNo: item['billId']
                },
                success: function (res) {
                    tip({
                        content: "删除成功!!"
                    });
                    return $("#btn-search").trigger("click");
                }
            });
        }
    }
};
$("#addParcel").on("click",function(){
    var parcel=$table1.bootstrapTable("getSelections");
    var parcelItem=[];
    for(var i=0;i<parcel.length;i++){
        parcelItem.push(parcel[i].id);
    }
    if(packgeData.length>0){
        for(var m=0;m<packgeData.length;m++){
            if(parcelItem.indexOf(packgeData[m].id)==-1){
                parcel.push(packgeData[m]);
                parcelItem.push(packgeData[m].id);
            }

        }
    };
    //判断添加数据是否属于同一个银行
    if(parcel.length>0){
        var flag=0;
        for(var j=0;j<parcel.length;j++){
            if(parcel[0].coBankName==parcel[j].coBankName){
                flag++;
            }
        }
        if(flag==parcel.length){
            packgeData=parcel;
            rebuild();
            $table3.bootstrapTable("append",packgeData);
        }else{
            tip({
                content:"必须相同银行的客户资料才能放入同一包裹，请确认"
            })
        }
    }else{
        rebuild();
        $table3.bootstrapTable("append",packgeData);
    }
    if(packgeData.length>0){
        $("#item").show();
    }else{
        tip({
            content:"请选择加入包裹的客户"
        })
    }
    $(".totalItem").html(packgeData.length);

});
$("#item").hide();

tableEvent3={
    "click .removeParcel":function(e,a,item,index){
        $table1.bootstrapTable("uncheckBy",{field:"id",values:[item.id]});
        var indexN=$(this).parents("tr").index();
        $(this).parents("tr").remove();
        arrItem.splice(indexN,1);
        arrPackage.splice(indexN,1);
        packgeData.splice(indexN,1);
        if(packgeData.length==0){
            rebuild();
            $("#item").hide();
        }
        $(".totalItem").html(packgeData.length);
    }
}
//确认并发件
$("#addExpress").click(function () {
    var _data = packgeData;
    if (_data == null || _data == "" || _data.length == 0) {
        tip({
            content: "包裹里至少存在一个客户相关资料"
        });
        return;
    }
    _data = JSON.stringify(_data);
    window.parent.cache.emailList = _data;
    return window.parent.toUrl({
        url: "./Modal/documentManagement/sendManageCompany/editExpress.html"
    });

});
$("#noSendTab").click(function () {
    $("#divBillNo").addClass("hide");
    $(".waitF").removeClass("hide");
    $('.package').removeClass("hide");
    $('#addExpress').removeClass('hide');
});
$("#sendTab").click(function () {
    $("#divBillNo").removeClass("hide");
    $(".waitF").addClass("hide");
    $('.package').addClass("hide");
    $('#addExpress').addClass("hide");
});

//加载车行,银行信息
function loadMess(a, b, c) {
    comn.ajax({
        url: a,
        async: false,
        data: {
            randomTime: (new Date()).getTime()
        },
        success: function (res) {
            var j, len, o, ref, str;
            str = "<option value=''>--请选择--</option>";
            ref = res.data;
            for (j = 0, len = ref.length; j < len; j++) {
                o = ref[j];
                if (c == 1) {
                    str += "<option value='" + o.id + "'>" + o.dealerName + "</option>";
                } else if (c == 2) {
                    str += "<option value='" + o.id + "'>" + o.bankName + "</option>";
                }
            }
            return b.html(str);
        }
    });
}
$(function () {
    $("#bankDeraler").getBank();
    $("#table2").on('click-row.bs.table', function (e, row) {
        billId = row.id;
        $("#divTable1").removeClass("hide");
        $("#dataTable1").bootstrapTable("destroy").bootstrapTable(comn.table);
    });
    $("#OK").click(function () {
        okHandleFn();
    });
    return $("#btn-search").click(function() {
        var activeTab;
        activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
        if("send" == activeTab){
            $("#divTable1").addClass("hide");
            $("#table2").bootstrapTable("refresh", {url: "..."});
        } else {
            $("#" + activeTab).find("table").bootstrapTable("refresh", {url: "..."});
        }
    });
    //return $("#btn-search").click(function () {
    //    var activeTab;
    //    activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
    //    return $("#" + activeTab).find("table").bootstrapTable("refresh", {url: "..."});
    //});

});
$table1.bootstrapTable({
    "clickToSelect": true,
    "undefinedText": "--",
    "classes": "table-striped table-hover table",
    "pagination": true,
    "sidePagination": "server",
    "queryParams": "queryParams",
    "paginationFirstText": "第一页",
    "paginationPreText": "上一页",
    "paginationNextText": "下一页",
    "paginationLastText": "最后一页",
    "height": "500"
})
//重构表格
function rebuild(){
    $table3.bootstrapTable('destroy');
    $table3.bootstrapTable({
        "clickToSelect": false,
        "undefinedText": "--",
        "classes": "table-striped table-hover table",
        "pagination": false,
        "height": "300"
    });
}


