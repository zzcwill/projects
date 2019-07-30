/**
 * Created by hyb on 16/4/6.
 */
var table_1, table_2,table_3, handle_1, handle_2,handle_3, tableEvent_1, tableEvent_2,tableEvent_3, roleCode = isR01(comn.user.roleList);

function isR01(roleList){
    var roleCode=false;
    $.each(roleList,function(i,v){
        if(v.roleCode=="R01"){
            roleCode=true;
            return false;
        }
    });
    return roleCode;
}

//未接单
table_1 = function (params) {
    var p = params.data;
    p['orderStatus'] = 1;
    return comn.ajax({
        url: interUrl.carDealer.carOrderList,
        data: $.extend($("#searchForm").values(), p),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            return params.complete();
        }
    });
};

//已接单
table_2 = function (params) {
    var p = params.data;
    p['orderStatus'] = 2;
    return comn.ajax({
        url: interUrl.carDealer.carOrderList,
        data: $.extend($("#searchForm").values(), p),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            return params.complete();
        }
    });
};

carInfo = function (value, row, index) {
    return value?value + "+" + row.vehicleType + "+" + row.carGroup:"--";
};

handle_1 = function (value, row, index) {
    return roleCode ? ["<a class='takeOrder' href='javascript:;'>接受订单</a>"].join("") : "--";
};

tableEvent_1 = {
    "click .takeOrder": function (e, a, item, index) {
        return comn.ajax({
            url: interUrl.carDealer.carOrderGrabOrder,
            data: {orderId:a},
            success: function (res) {
                tip({
                    content:"接单成功"
                });
                $("#table1,#table2").bootstrapTable("refresh", {url: "..."});
            }
        });
    }
};


handle_2 = function (value, row, index) {
    //var creditStatus=row.creditStatus=="1"?"<li><a class='loanApply' href='javascript:;'>发起贷款评审</a></li>":"";
    return roleCode ? ["<div class='btn-group btn-group-xs'>",
        "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
        "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>",
        "</button>",
        "<ul class='dropdown-menu' role='menu'>",
        row.creditStatus=='1' ? '' : "<li><a class='backOrder' href='javascript:;'>退回订单</a></li>",
        "<li><a class='creditApply' href='javascript:;'>"+ (row.creditStatus=='1'? '重新发起征信' : '发起征信') +"</a></li>",
        "</ul>",
        "</div>"
    ].join("") : "--";
};

tableEvent_2 = {
    "click .backOrder": function (e, a, item, index) { //退回订单
        return comn.ajax({
            url: interUrl.carDealer.carOrderBackOrder,
            data: {orderId:a},
            success: function (res) {
                tip({
                    content:"取消订单成功"
                });
                $("#table1,#table2").bootstrapTable("refresh", {url: "..."});
            }
        });
    },
    "click .loanApply": function (e, a, item, index) { //发起贷款
        $("#table_3").bootstrapTable('refresh', {query:{cardNo:item.cardNo,filterId:item.id,filterType:1}});

    },
    "click .creditApply": function (e, a, item, index) { //发起征信
	    tip({
		    content:'此业务电脑端暂未开放，请使用手机APP处理'
	    });
		// window.parent.cache.credit = item;
		// comn.addTab({title: '发起征信',  href: './Modal/customManage/cheguoCustomer/credit.html?type=4&creditSource=3&serialNumber='+item.dealerOrder });
    }

};

$("#btn-search").click(function () {
    var activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
    if (activeTab == "tab1") {
        $("#table1").bootstrapTable("refresh", {url: "..."});
    } else if (activeTab == "tab2") {
        $("#table2").bootstrapTable("refresh", {url: "..."});
    }
});


function arrayRemove(arr,a){
    for(var i =0;i <arr.length;i++){
        var temp = arr[i];
        if(!isNaN(a)){
            temp=i;
        }
        if(temp == a){
            for(var j = i;j <arr.length;j++){
                arr[j]=arr[j+1];
            }
            arr.length = arr.length-1;
        }
    }
    return arr;
}

dataLoad_3 = function(params) {
    if(!params.data.cardNo)return;
    comn.ajax({
        url: interUrl.credit.creditRisk,
        data: params.data,
        success: function(res) {
            if(res.data.length==0){
                tip({
                    content:'请先发起征信'
                });
                return;
            }else if(res.data.length==1){
                if((res.data[0].status=="征信中" || res.data[0].status=="征信通过") && res.data[0].type=="历史征信"){
                    comn.addTab({title: '贷款发起',  href: './Modal/loanManage/loanReview/loanStart.html?type=1&creditApplyId='+ res.data[0].creditId + '&releventFlow=LOAN_APPLY_FLOW&currentNodeKey=LOAN_LAUNCH' });
                }else{
                    tip({
                        content:'请先发起征信'
                    });
                    return;
                }
            }else if(res.data.length>1){
                res.data=arrayRemove(res.data,0);
                params.success({
                    'total': 10,
                    rows: res.data
                });
                params.complete();
                $("#risk").modal("show");
            }

            $("#sure").unbind('click').on('click',function(){
                if((res.data[0].status=="征信中" || res.data[0].status=="征信通过") && res.data[0].type=="历史征信") {
                    comn.addTab({title: '贷款发起',  href: './Modal/loanManage/loanReview/loanStart.html?type=1&creditApplyId=' + res.data[0].creditId + '&releventFlow=LOAN_APPLY_FLOW&currentNodeKey=LOAN_LAUNCH' });
                }else{
                    tip({
                        content:'请先发起征信'
                    });
                    return;
                }
                $("#risk").modal("hide");
            });

        }
    });
};

//$("#table_3").bootstrapTable();

tableEvent_3 = {
    "click .loanStart2": function(e, a, item, index) {
        if(item.type == '历史项目'){
            comn.addTab({title: '贷款详情',  href: './Modal/loanManage/loanReview/loanStart.html?type=2&loanApplyId='+item.creditId + '&releventFlow=LOAN_APPLY_FLOW&currentNodeKey=LOAN_LAUNCH' });
        }else if(item.type == '历史担保'){
            comn.addTab({title: '贷款详情',  href: './Modal/loanManage/loanReview/loanStart.html?type=2&loanApplyId='+item.creditId + '&releventFlow=LOAN_APPLY_FLOW&currentNodeKey=LOAN_LAUNCH' });
        }else if(item.type == '历史征信'){
            comn.addTab({title: '征信详情',  href: './Modal/loanManage/creditManage/creditInfo.html?type=1&businessId='+item.creditId });
        }

    }
};

handle_3 = function(value, row, index) {
    return ["<button type='button' class='btn btn-primary btn-xs loanStart2'>查看</button>"].join("");
};

$(function(){
	$("#table_3").bootstrapTable({
      "undefinedText": "--",
      "classes": "table-striped table-hover table",
      "sidePagination": "server",
      "queryParams": "queryParams",
      "paginationFirstText": "第一页",
      "paginationPreText": "上一页",
      "paginationNextText": "下一页",
      "paginationLastText": "最后一页",
      "clickToSelect": true
	});
});
