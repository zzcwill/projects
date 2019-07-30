var table_1, table_2, handle_1, handle_2, handle_3, tableEvent_1, tableEvent_2, insuranceStatus, insuranceStatus_1;
var telInfo = [];
//获取链接携带 参数
var postData = comn.getArgs();
var data = {
    projectId: postData.projectId
}
if(postData.loanFlag == 1) {
    $("#loanInsuranceForm").hide();
    $("#btn-search").hide();
    handle_1 = function(value, row, index) {
        if (row.status == null) {
            return ["<div class='btn-group btn-group-xs'>", 
            "<button type='button' class='btn btn-primary see'>查看", 
            "</button>", "</div>"].join("");
        } else {
            return ["<div class='btn-group btn-group-xs'>", 
            "<button type='button' class='btn btn-primary see_2'>查看", 
            "</button>", "</div>"].join("");
        }
        
    };
    handle_2 = function(value, row, index) {
        return ["<div class='btn-group btn-group-xs'>", 
        "<button type='button' class='btn btn-primary see2'>查看", 
        "</button>", "</div>"].join("");
    };
    $("#loanInsuranceForm").hide();
} else{
    handle_1 = function(value, row, index) {
        if (row.isSelf === 0) {
            return ["<div class='btn-group btn-group-xs'>",
                "<button type='button' class='btn btn-primary see'>查看",
                "</button>", "</div>"].join("");
        }
        if ( row.cavStatus != 2) {
            return;
        }
        if (row.status == null) {
            return ["<div class='btn-group btn-group-xs'>", 
            "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", 
            "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", 
            "</button>", "<ul class='dropdown-menu' role='menu'>",
            "<li><a class='modify'>修改</a></li>" , 
            "<li><a class='del'>删除</a></li>", "</ul>", "</div>"].join("");
        } else {
            return;
        }
        
    };
    handle_2 = function(value, row, index) {
        return ["<div class='btn-group btn-group-xs'>", 
        "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", 
        "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", 
        "</button>", "<ul class='dropdown-menu' role='menu'>",
        "<li><a class='modify'>修改</a></li>" , 
        "<li><a class='del'>删除</a></li>", "</ul>", "</div>"].join("");
    };
}
//电话tab详情表头数据渲染
    comn.ajax({
        url: interUrl.insurance.getCOntact,
        data: data,
        success: function(res) {
            var item = res.data;
            telInfo = item;
            if (item.spouseName == "") {
                $("#hiddenSection").hide();
            }
            //获取省
            var province = (function(){
                if(item.homeAddressPname == null) {
                    return ""
                } else {
                    return item.homeAddressPname
                }
            })(item);
            //判断家庭住址的省市信息是否一样，然后做拼接
            var city = (function(){
                if(item.homeAddressCname === item.homeAddressPname) {
                    return "";
                } else if (item.homeAddressCname == null){
                    return "";
                } {
                    return item.homeAddressCname;
                }
            })(item);
            //判断区
            var area = (function(){
                if(item.homeAddressRname == null) {
                    return ""
                } else {
                    return item.homeAddressRname
                }
            })(item);
            //判断具体地址
            var detailAddress = (function(){
                if(item.homeAddressDetail == null) {
                    return ""
                } else {
                    return item.homeAddressDetail
                }
            })(item);
            var address = province + city + area + detailAddress;
            item.address = address;
            $("#contactInfo").nameValues(item);
        }
    })
//tab不同按钮跳转
$("#btn-search").click(function() {
	var activeTab=$(".tab-content").find(".tab-pane.active").attr("id");
    if(activeTab == "todo"){
       	return comn.addTab({
            href:'./Modal/insuranceManage/renewInsurance/insuranceEntry.html?type=add' + '&projectId=' + postData.projectId,
            title: '保单信息录入'
        });
    }else{
    	sessionStorage.flagActive = "2";
        return comn.addTab({
            href:'./Modal/insuranceManage/renewInsurance/addRecord.html?type=add' + '&projectId=' + postData.projectId + "&customerName=" + telInfo.customerName + "&spouseName="+telInfo.spouseName,
            title: '录入联系记录'
        });
    }
});
//点击切换头部表单
$("#nav li").click(function(){
    var index = $(this).index();
    index === 0 ?  $("#spanText").text(" 保单录入 ") :  $("#spanText").text(" 添加电话记录 ");
});

//保单信息
table_1 = function(params) {
    tableData(params, data, interUrl.insurance.getRenewInsuranceListInfo);
};

tableEvent_1 = {
    "click .modify": function(e, a, item, index) {
        return comn.addTab({
            href:'./Modal/insuranceManage/renewInsurance/insuranceEntry.html?type=modify&id=' + item.id + "&projectId=" + item.projectId,
            title: '保单信息修改'
        })
    },
    "click .del": function(e, a, item, index) {
        getGroup(item, interUrl.insurance.delInsuranceRenew, $("#table1"));
        $("#table1").bootstrapTable("refresh", {url: "..."});
    },
    "click .see": function(e, a, item, index){
        return comn.addTab({
            href:'./Modal/insuranceManage/renewInsurance/insuranceEntry.html?type=see&id=' + item.id + "&projectId=" + item.projectId,
            title: '保单信息'
        })
    },
    "click .see_2": function(e, a, item, index){
        return comn.addTab({
            href:'./Modal/insuranceManage/firstInsurance/insuranceEntry.html?type=see&id=' + item.id + "&projectId=" + item.projectId,
            title: '保单信息'
        })
    }

};
//续保电话
table_2 = function(params) {
    tableData(params, data, interUrl.insurance.getRenewInsuranceListPhone);
};
tableEvent_2 = {
    "click .modify": function(e, a, item, index) {
    	console.log(item)
        return comn.addTab({
            href:'./Modal/insuranceManage/renewInsurance/addRecord.html?type=modify&id=' + item.id + "&projectId=" + item.projectId + "&phoneName=" + item.phoneName + "&spouseName=",
            title: '保单联系人信息修改'
        })
    },
    "click .del": function(e, a, item, index) {
        getGroup(item, interUrl.insurance.delInsuranceRenewPhone, $("#table2"));
        $("#table2").bootstrapTable("refresh", {url: "..."});
    },
    "click .see2": function(e, a, item, index){
        return comn.addTab({
            href:'./Modal/insuranceManage/renewInsurance/addRecord.html?type=see&id=' + item.id + "&projectId=" + item.projectId,
            title: '保单联系人信息修改'
        })
    }
};
insuranceStatus = function (value, row, index) {
    return ["首保", "首保"][value] || "续保";
};
insuranceStatus_1 = function (value, row, index) {
    return ["是", "是"][value] || "否";
};

insuranceStatusTemp = function (value, row, index) {
	return [null, "公司", "车行", "客户"][value] || null;
};

contactObj = function (value, row, index) {
	return [null, "本人", "配偶"][value] || null;
};
resultsTracking = function (value, row, index) {
	return [null, "客户已保", "车行已保", "无法接通", "待跟进", "无法沟通", "同意续保"][value] || null;
};

var fn = null;
function  getGroup(o, url, obj, callback){
            $("#tipText").text("确定要删除吗?");
            $("#sureModal").modal("show");      
            fn = function(){
             comn.ajax({
                    url: url,
                    data: {
                        id: o['id']
                    },
                    success: function(res) {
                        fn = null;
                        obj.bootstrapTable("refresh", {url: "..."});
                        tip({content: res.message || "删除成功"});
                        $("#sureModal").modal("hide"); 
                        
                    }
                });
        }

}

$(function(){
	if (sessionStorage.flagActive == "2") {
		$(".nav-tabs li").eq(1).addClass("active");
		$(".nav-tabs li").eq(0).removeClass("active");
		$("#todo").removeClass("active");
		$("#done").addClass("active");
		$("#spanText").html(" 添加电话记录 ");
	}
	sessionStorage.flagActive = "1";
	console.log(sessionStorage.flagActive);
    $("#sureBtn").click(function(){
       if(typeof fn == "function"){
        fn();
       } 
    });
});

