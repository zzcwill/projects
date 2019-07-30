var table_1, table_2,handle_1, handle_2, handle_3, handle_4, tableEvent_1, tableEvent_2;
var activeTab=$(".tab-content").find(".tab-pane.active").attr("id");
//表单中的日期
$("#startDay").getLastMonthDay1();
$("#now").getToday();
//待登记
table_1 = function(params) {
    tableData(params, $("#form1").values(), interUrl.insurance.getRenewInsuranceList);
};
handle_1 = function(value, row, index) {
    return ["<div class='btn-group btn-group-xs'>", 
    "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", 
    "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", 
    "</button>", "<ul class='dropdown-menu' role='menu'>",
    "<li><a class='edit'>保单管理</a></li>" , 
    "<li><a class='info'>查看贷款详情</a></li>", "</ul>", "</div>"].join("");
};

handle_3 = function(value, row, index) {
    return value + "+" + row.carMakeName + "+" + row.carModelName;
};
handle_4 = function(value, row, index) {
    return [null, "客户已保", "车行已保", "无法接通", "待跟进", "无法沟通", "同意续保"][value] || null;
};
handle_5 = function(value, row, index){
    var myDate = new Date(row.bankPaymentDate);
	if (row.bankPaymentDate == undefined) {
		return "--";
	}
	if (row.loanTerm == undefined) {
		return row.bankPaymentDate;
	}
	var _myDate = "";
	var _myDateDay = "";
	var _loanTerm;
	if (row.loanTerm == 1) {
		_loanTerm = 12;
	}
	else if (row.loanTerm == 2) {
		_loanTerm = 18;
	}
	else if (row.loanTerm == 3) {
		_loanTerm = 24;
	}
	else if (row.loanTerm == 4) {
		_loanTerm = 36;
	} else {
		_loanTerm = 0
	}
	var newMonth = myDate.getMonth() + 1 + _loanTerm;
	var newLoanTerm_y = parseInt(newMonth / 12);
	var newLoanTerm_m = newMonth % 12;
	
	//console.log("data:"+myDate.getMonth()+"--------term:"+row.loanTerm +"-----------newMonth:"+newMonth+"----------newLoanTerm_y:"+newLoanTerm_y+"----------newLoanTerm_m:"+newLoanTerm_m);
    //var endTime = myDate.getFullYear() +"-"+ (myDate.getMonth() + row.loanTerm) < 9 ? ("0" + (myDate.getMonth() + row.loanTerm)) : (myDate.getMonth() + row.loanTerm) +"-"+ myDate.getDate();
	if (newLoanTerm_m < 9) {
		_myDate = "0" + newLoanTerm_m;
	} else {
		_myDate = newLoanTerm_m;
	}
	if (myDate.getDate() < 10) {
		_myDateDay = "0" + myDate.getDate();
	} else {
		_myDateDay = myDate.getDate();
	}
    var endTime = (myDate.getFullYear() + newLoanTerm_y) +"-"+ _myDate +"-"+ _myDateDay;
    return row.bankPaymentDate + "至" + endTime;
}
tableEvent_1 = {
    "click .edit": function(e, a, item, index) {
        //判断家庭住址的省市信息是否一样，然后做拼接
        var city = (function(){
            if(item.homeAddressCname === item.homeAddressPname) {
                return "";
            } else {
                return item.homeAddressCname;
            }
        })(item);
        console.log(item);
        var address = item.homeAddressPname + city + item.homeAddressRname + item.homeAddressDetail;
        comn.cache.insuranceStatus = item.premiumType;
        comn.cache.bankName = item.coBankName;
        return comn.addTab({
            href:'./Modal/insuranceManage/renewInsurance/renewInsuranceManagement.html?projectId=' + item.projectId + '&coupleName=' + item.spouseName + '&couplePhone=' + item.spouseMobilePhone + '&name=' + item.customerName + '&phone=' + item.mobilePhone + '&address=' + address,
            title: '保单信息'
        })
    },
    "click .info": function(e, a, item, index) {
        return comn.addTab({
			href: "./Modal/customManage/customer/loanDetail.html?id="+ item.projectId +"&projectId=" + item.projectId +"&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY",
            //href: "./Modal/customManage/customer/loanDetail.html?id="+item.projectId+"&loanApplyId="+item.relativeApplyId1+"&businessTypeCode=" + item.flowType+"&projectId="+item.projectId+"&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY",
            title: '查看贷款项目'
        })
    }

};

note = function (value) {
	if (value && value.length > 10) {
		return "<span class='valueNowrap' title='" + value + "'>" + value.substr(0, 10) + "...</span>";
	} else {
		return value;
	}
}

$(function(){
	$("#org").getOrg();

	//查询列表
	$("#btn-search").click(function() {
		$("#todo").closest(".ibox").removeClass("hide");
		$("#table1").bootstrapTable(comn.table);
		$("#table1").bootstrapTable("refresh", {url: "..."});
	});
	//导出
	$('#exportBtn').click(function(){
		var search=$("#form1").serialize();
		var downLink = interUrl.basic + interUrl.insurance.renewalProjectListExport + "?" + search ;
		console.log(downLink);
		window.open(downLink, "_blank");
	});
})