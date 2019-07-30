var dataLoad_1,dataLoad_2,handle_1,CustomerLoad, loanVal, messageCheck, selectCheck, args = comn.getArgs(),assetDifferenceAmount, handle, dataEvent, signStatus;
$("#coBankId").getBankAll();
var date1 =new Date();
// date1 = date1.format("yyyy-MM-dd");
$("#orgId").getOrg();
$("input[name=dealerPaymentDateMin]").getMonthDay1();
$("input[name=dealerPaymentDateMax]").getToday();
$(function() {
    var dataArr =[["#financeChannel", "FinanceChannelType"]];
    $.getCommonMethodPort(dataArr);
});
//加载客户数据
dataLoad_1 = function(params) {
  tableData(params,$.extend($("#searchForm").values(), {coCompanyId: args["coCompanyId"], assetsPackageId: args["id"]}), interUrl.mockList || interUrl.asset.loanAssetList,function(){
	  var checkAmmount = 0;
	  var assetValue = 0;
		$("#table").on('check.bs.table', function(e, row) {
			var assetValue = parseFloat(row["assetValue"]);
			checkAmmount= comn.accAdd(checkAmmount, assetValue);
			$('#checkAmmount').val(valLen(checkAmmount));
			changeColor(assetDifferenceAmount,checkAmmount);
		}).on('uncheck.bs.table', function(e, row) {
			var assetValue = parseFloat(row["assetValue"]);
		  	checkAmmount= comn.accSub(checkAmmount, assetValue);
		  	$('#checkAmmount').val(valLen(checkAmmount));
		  	changeColor(assetDifferenceAmount,checkAmmount);
		}).on('uncheck-all.bs.table', function(e, row) {
			assetValue = 0;
			checkAmmount = 0;
		  $('#checkAmmount').val(0);
		  changeColor(assetDifferenceAmount,checkAmmount);
		}).on('check-all.bs.table', function(e, row) {
			for (var i = row.length - 1; i >= 0; i--) {
				//assetValue += parseFloat(row[i].assetValue);
				assetValue = comn.accAdd(assetValue, parseFloat(row[i].assetValue));
			};
		  checkAmmount= comn.accAdd(checkAmmount , assetValue);
		  $('#checkAmmount').val(valLen(checkAmmount));
		  changeColor(assetDifferenceAmount,checkAmmount);
		});

  });
};
$("#table").bootstrapTable({
    "undefinedText": "--",
    "classes": "table-striped table-hover table",
    "pagination": true,
    "sidePagination": "server",
    "queryParams": "queryParams",
    "paginationFirstText": "第一页",
    "paginationPreText": "上一页",
    "paginationNextText": "下一页",
    "paginationLastText": "最后一页",
    "clickToSelect": true,
    "pageNumber":  1,
    "pageSize": 100,
    "pageList": [10,25,50,100,500,1000],
    "height": "500"
});
function valLen(value) {
    if (Number(value) < 0) {
        return 0;
    }
	var vLen = value.toString().split('.');
	if (vLen.length > 1) {
		if (vLen[1].length > 4) {
			return Number(value).toFixed(2);
		} else {
			return value;
		}
	} else {
		return value;
	}
}



$("#ok").click(function() {
	var _data = $("#table").bootstrapTable('getSelections');
	if(_data.length>0){
		var data;
		data = $("#addAssetForm").values();
    data["assetsPackageId"] = parseInt(args["id"]);
    data["coCompanyId"] = args["coCompanyId"];
    data["loanApproveAssetsList"] = _data;
		return comn.ajax({
			url: interUrl.asset.loanAssetAdd,
			data: {
				"data":JSON.stringify(data)
			},
			success: function(res) {
				tip({
					content: "添加成功!!"
				});
				return comn.closeTab();
				// return comn.addTab({
				// 	title: "资产包管理",
	   //      href: "./Modal/assetManage/assetPackageManage/index.html"
	   //    });
			}
		});
	}else{
		$("#dialog").modal('show');
	}
});

$("#cancel").click(function() {
	return comn.addTab({
		title: "资产包管理",
      href: "./Modal/assetManage/assetPackageManage/index.html"
    });
});


orgName = function(value, row, index){
	var val = value;
	if(value.indexOf("中安金控资产管理有限公司") != -1){
		val = value.replace("中安金控资产管理有限公司", "");
	}
	return val;
}

// 差额警告色
function changeColor(a,b){
	if(b>=a){
		$("#checkAmmount").addClass('text-navy').removeClass('text-danger');
	}else{
		$("#checkAmmount").addClass('text-danger').removeClass('text-navy');
	}
}
comn.ajax({
		url: interUrl.asset.loanAssetPackageGet,
		data: {
			assetPackageId : args["id"]
		},
		success: function(res) {
			$("#coCompanyName").text(res["data"].coCompanyName);
			$("#assetPackageNo").text(res["data"].assetPackageNo);
			$("#assetDifferenceAmount").text(res["data"].assetDifferenceAmount);
			assetDifferenceAmount=res["data"].assetDifferenceAmount;

		}
	});

handle = function (value,row,index) {
	if(args['coCompanyId'] == 5) {
		if(row.status == 1 || row.status == 2) {
			return ['<button type="button" class="btn btn-primary btn-xs view">查看电子签章</button>'].join('')
		}
		return ''
	}
	return '';
};
dataEvent = {
	'click .view': function (e,a,item,index) {
		if(item.filePath) {
			PDFObject.embed(item.filePath, "#pdf_box");
			$("#pdf").modal('show');
		}
	}
};
//$.getCommonMethodPort([['#finance','ThirdCooperation','','-1']]);
//签约状态
signStatus = function (value) {
	return ['未签约','有效','无效'][value]
};
