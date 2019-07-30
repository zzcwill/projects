var dataLoad_1,handle_1,tableEvent,payment_Status,applyType,print_Status;
var args = comn.getArgs();
var uId = comn.user.uid;

payment_Status = function (value, row, index) {
    return ['未付款', "已付款-系统", "已付款-人工",'系统付款失败'][value] || null;
};

export_Status = function (value, row, index) {
    return ["未导出", "已导出"][value] || null;
};

print_Status = function (value, row, index) {
    return ["未打印", "已打印", "未打印(重打)"][value] || null;
};

if(args['type']==1){
	$('#tableDiv_2,.branch').show();
	$('#tableDiv_1,.treasury,#exportBtn,#batchsystempay').hide();
	$('.branch input').removeAttr('disabled');
	$('.treasury select').attr('disabled','disabled');
	$('#totalAmountName').html('待付款总金额');
	$('#totalNum').html('总客户数');
	$('#orgName').html('业务机构');
	$('#title').html('分公司待付款列表');
	var $table = $('#table_1');
	applyType=1;
}else{
	$('#tableDiv_2,.branch').hide();
	$('#tableDiv_1,.treasury,#exportBtn,#batchsystempay').show();
	$('.branch input').attr('disabled','disabled');
	$('.treasury select').removeAttr('disabled');
	$('#totalAmountName').html('申请总金额');
	$('#totalNum').html('申请总客户数');
	$('#orgName').html('申请机构');
	$('#title').html('资金部待付款列表');
	var $table = $('#table');
	applyType=0;
}

dataLoad_1 = function(params) {
	var p;
  p = params.data;
  comn.ajax({
      url: interUrl.finance.getList,
      data: $.extend($("#searchForm").values(),{uId:uId, applyType: applyType}, p),
      success: function(res) {
        params.success({
          'total': res.data.dataCount,
          'rows': res.data.datas
        });
        $("#getForm").values(res.data.conditions); 
        params.complete();
      }
    });
};

handle_1 = function(value, row, index){
	return ["<a class='printbudget'>打印</a>"].join('');
	/*if(args['type']==1){
		var arr=["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
	 "<span class='caret'></span>",
	  "<span class='sr-only'>下拉切换</span>", 
	  "</button>", "<ul class='dropdown-menu' role='menu'>"
	   ];
		(row.printStatus == 2)?arr.push("<a class='printbudget'>重新打印</a>"):arr.push("<a class='printbudget'>打印</a>");
		if(row.paymentStatus == 2){
			 arr.push("<a class='cancelpay'>取消付款</a>");
		}else if(row.paymentStatus != 1){
			 arr.push("<a class='returnfund'>退回资金部</a> <a class='systempay'>系统付款</a>  <a class='manpay'>人工付款</a>");
		}
		arr.push("</ul>", "</div>");
		return arr.join(' ');
	}else{
		if(row.paymentStatus == 2){
			return "<a class='cancelpay' href='javascript:;'>取消付款</a>";
		}else if(row.paymentStatus == 1){
			return '';
		}else{
			return "<a class='systempay' href='javascript:;'>系统付款</a>  <a class='manpay' href='javascript:;'>人工付款</a>";
		}
	}*/
};
tableEvent = {
	/*"click .manpay": function(e, a, item, index) {
		var html=(args['type']==1)?'是否将'+item.customerName+'人工付款至'+item.coopCardealerName:'是否【人工付款】？';
		$('#sure .modal-body h3').html(html);
		$('#sure').modal('show');
		$('#OK').off('click').click(function(){
			doAjax(interUrl.finance.manpay,{aid: item.aid},function(){
				tip({content: "【人工付款】成功！"});
			});
		});
	},
	"click .systempay": function(e, a, item, index) {
		var html=(args['type']==1)?'系统付款后系统自动将'+item.customerName+'车款付款至'+item.coopCardealerName+'<br>车商账户：'+item.guaranteeCorporationAccountName+'<br>车商账号：'+item.guaranteeCorporationAccountNo+'<br>开户行：'+item.guaranteeCorporationBank+'<br>此操作不可逆，请仔细核对信息！':'系统付款后，资金系统将自动<br>进行付款，是否【系统付款】操作？';
		$('#sure .modal-body h3').html(html);
		$('#sure').modal('show');
		$('#OK').off('click').click(function(){
			doAjax(interUrl.finance.systempay,{aid: item.aid},function(){
				tip({content: "【系统付款】成功！"});
			});
		});
	},
	"click .cancelpay": function(e, a, item, index) {
		var html=(args['type']==1)?'是否对'+item.customerName+'车款进行【取消付款】操作？':'是否取消【人工付款】操作？';
		$('#sure .modal-body h3').html(html);
		$('#sure').modal('show');
		$('#OK').off('click').click(function(){
			doAjax(interUrl.finance.cancelpay,{aid: item.aid},function(){
				tip({content: "【取消付款】成功！"});
			});
		});
	},
	"click .returnfund": function(e, a, item, index) {
		$('#sure .modal-body h3').html('是否将'+item.customerName+'车款退回至资金部？此操作不可逆<br>请仔细核对信息！');
		$('#sure').modal('show');
		$('#OK').off('click').click(function(){
			doAjax(interUrl.finance.returnfund,{aid: item.aid},function(){
				tip({content: "【退回资金部】成功！"});
			});
		});
	},*/
	"click .printbudget": function(e, a, item, index) {
		//打印逻辑

		doAjax(interUrl.finance.printbudget,{aid: item.id,uId:uId},function(){
			var downLink = '../../../Modal/task/myTask/print.html?loanApplyId='+ item.loanApplyId+"&position=BUDGET";
			window.open(downLink, "_blank");
			tip({content: "打印成功！"});
		});
	}
};

$(function(){
	$table.bootstrapTable({
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
	  "pageSize": 1000,
	  "pageList": [10,25,50,100,500,1000],
      "height": "500" 
	});
	$("#orgList").getOrg();
	$("#bankList").bank_Get();
	//$("#getGuaranteeList").getGuarantee_Get();
	$("#searchBtn").unbind('click').on("click", function(params){
		$table.bootstrapTable("refresh", {url: "..."});
	});
	
	$("#exportBtn").unbind('click').on("click", function(){
		var exportData = {
			ids: [],
			orgNames: [],
			orgIds: []
		}; 
		$.map($table.bootstrapTable('getSelections'), function (row) {
             exportData.ids.push(row.id);
             exportData.orgNames.push(row.applyCompany);
             exportData.orgIds.push(row.applyCompanyId);

        });
		if (exportData.ids.length === 0) {
				tip({content: "请选择要导出的条目"});
		} else {
			var users = exportData.ids.toString();
			var judgement = orgIdJudge(exportData.orgIds);
			if (judgement) {
				var downLink = interUrl.basic + interUrl.finance.batchExportcustomer + "?aids=" + encodeURI(encodeURI(users))+'&fileName='+encodeURI(encodeURI(exportData.orgNames[0]));
				window.open(downLink, "_blank");
			} else {
				tip({content: "请选择相同分公司的条目进行导出！"});
			}
		}
	});

	/*$('#batchmanpay').click(function(){
		$('#sure .modal-body h3').html('是否将选中客户批量进行【人工批量付款】操作？');
		$('#sure').modal('show');
		$('#OK').off('click').click(function(){
			var exportData = {
				ids: [],
				orgNames: [],
				orgIds: []
			}; 
			$.map($table.bootstrapTable('getSelections'), function (row) {
	             exportData.ids.push(row.id);
	             exportData.orgNames.push(row.orgName);
	             exportData.orgIds.push(row.orgId);

	        });
			if (exportData.ids.length === 0) {
					tip({content: "请选择要导出的条目"});
			} else {
				doAjax(interUrl.finance.batchManpay,{aidarr: exportData.ids},function(){
					tip({content: "【人工批量付款】成功！"});
				});
			}
		});
	});
	$('#batchsystempay').click(function(){
		$('#sure .modal-body h3').html('系统付款后，资金系统将自动进行付款，<br>是否将选中客户【批量系统付款】操作？');
		$('#sure').modal('show');
		$('#OK').off('click').click(function(){
			var exportData = {
				ids: [],
				orgNames: [],
				orgIds: []
			}; 
			$.map($table.bootstrapTable('getSelections'), function (row) {
	             exportData.ids.push(row.id);
	             exportData.orgNames.push(row.orgName);
	             exportData.orgIds.push(row.orgId);

	        });
			if (exportData.ids.length === 0) {
					tip({content: "请选择要导出的条目"});
			} else {
				doAjax(interUrl.finance.batchSystempay,{aidarr: exportData.ids},function(){
					tip({content: "【批量系统付款】成功！"});
				});
			}
		});
	});*/
});
function doAjax(url, data,callback) {
	comn.ajax({
		url: url,
		data: data,
		success: function(res) {
			return typeof callback === "function" ? callback(res) : void 0;
        }
	});
}
function orgIdJudge (objects){
	var testValue = objects[0];
	var testBolean;
	for(var i = 0; i < objects.length; i += 1 ){
		testValue === objects[i] ? testBolean = true : testBolean = false;
	}
	return testBolean;
};
