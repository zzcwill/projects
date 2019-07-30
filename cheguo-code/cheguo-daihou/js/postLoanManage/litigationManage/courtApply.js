var ref, num, arrList, arrDefendantlist, loadDefendant, table_1, handle_1, tableEvent_1, projectId, codeName;
var flag_defendantList = true;
arrList = []; //存放被告人身份证号
arrDefendantlist = []; //存放被告人
loadDefendant = function(a, b, c) {
	comn.ajax({
		url: a,
		data: {
			projectId: c
		},
		success: function(res) {
			var j, len, o, str;
			//arrList.length = 0; //清空数组;
			str = "<option value=''>--请选择--</option>";
			ref = res.data;
			for (j = 0, len = ref.length; j < len; j++) {
				o = ref[j];
				var relationship = (function() {
					if (o.relationship == "1") return "担保人";
						else if (o.relationship == "2") return "反担保人";
						else if (o.relationship == "4") return "配偶";
						else return "本人"
				})();
				if (($("#prosecutionList").find("option:selected").html() == "银行起诉") && (o.relationship == "2")) {
					continue;
				}
				str += "<option value='" + o.defendantName + "' data-role='"+ o.cardNo +"'>" + o.defendantName + "("+ relationship +")</option>";
			}
			var _lawsuitType = $("#prosecutionList").find("option:selected").html();
			if (_lawsuitType === "银行起诉" || _lawsuitType === "银行仲裁") {
				ref.push({defendantType : 2, cardNo : "XXXXX"});
				str += "<option value='" + codeName + "' data-role='XXXXX' defendantType='2'>" + codeName + "</option>";
			}
			return b.html(str);
		}
	});
}

//起诉申请，被告人列表
table_1 = function(params) {
	tableData(params, $("#collectionForm").values(), interUrl.postLoan.courtApplyList);
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
	"pageSize": 5,
	"pageList": [5,10,25,50,100,500,1000],
	"height": "300"
});
handle_1 = function (value, row, index) {
    return ["<input type='radio' name='userId' class='role' value='" + value + "'/>"].join("");
};
//发起起诉申请
tableEvent_1 = {
	"click .role": function(e, a, item, index) {
		projectId = item.projectId;
		codeName = item.launchOrgName;
		num = 0;                     //清空num值
		$("#remark").val("");       //清空备注
		$("#sueApply").show();
		$("#defendantList").html("<option value=''>--请选择--</option>");
		arrDefendantlist.length = 0; //清空被告人数组
		arrList.length = 0; //清空身份证数组
		arrDefendantlist = item;     //插入被告人列表
		flag_defendantList = true;   //重置被告人，添加table头部
		$("#addDefendantList").html("");
		$("#lawsuitAmount input").val(item.inKeepBalanceAmount); //诉讼人金额赋值
		$("#prosecutionList").children().eq(0).prop("selected", true);
		window.location.href="#sueApply";
	}
};

$(function() {
	$("#bankName").getBankAll(); //添加银行
	$("#orgId").getOrg(); //添加所属机构

	$(document).on("blur", "#lawsuitAmount input", function() {
		$(this).parents(".input-tip").removeClass("has-error")
	});
	//删除必填字样所留空间
	$(document).on("change", "#prosecutionList", function() {
		num = 0;
		$("#prosecutionList-error").remove();
		loadDefendant(interUrl.postLoan.defendantSelect, $("#defendantList"), projectId);
		flag_defendantList = true;
		$("#addDefendantList").html("");
		arrDefendantlist.length = 0; //清空被告人数组
		arrList.length = 0; //清空身份证数组
	});
	$(document).on("change", "#defendantList", function() {
		 $("#defendantList-error").remove();
	});

	//关闭提示窗
	$(document).on("click", "#sureOption", function() {
		 $("#sureModal").modal("hide");
	});

	//添加被告人
	$("#addDefendant").click(function(){
	  if ($("#defendantList").val() == "") {
	    return tip({content: "请添加被告人"});
    }
		var defendantSelected = $("#defendantList").find("option:selected"); //查找选中的值
		var _index = defendantSelected.index() - 1;
		var _len = arrList.length;
		var _cardNo = defendantSelected.attr("data-role");
		//遍历是否已存在被告人
		for (i = 0; i < _len; i++) {
			if (_cardNo == arrList[i]) {
				tip({content: "您已添加相同联系人"});
				return;
			}
		}

		//添加被告人身份证号
		arrList.push(_cardNo);
		//如果是第一次进来则把头插入
		if (flag_defendantList) {
			var theadDefendant = [
									"<table class='table table-bordered' style='width: 100%;'>",
							    	"<thead>",
							    	"<tr>",
							        "<th>姓名(关系)</th>",
							        "<th data-formatter='cardType'>证件类型</th>",
							        "<th>证件号</th>",
							        "<th>手机号</th>",
							        "<th>操作</th>",
							        "</tr>",
							        "</thead>",
							        "</table>"].join("");
			$("#addDefendantList").append(theadDefendant);
			flag_defendantList = false;
		}
		if (defendantSelected.attr("defendantType") == "2") { //加入公司

			var company = [
							"<tr>",
							"<td><input type='text' class='hide input1' data-role='XXXXX' name='defendants[" + num + "].cardNo' value='' />"+ defendantSelected.val() +"</td>",
							"<td>",
							"<input type='text' class='hide input2' name='defendants[" + num + "].cardType' value='' />",
							"<input type='text' class='hide input3' name='defendants[" + num + "].defendantId' value='' />",
							"<input type='text' class='hide input4' name='defendants[" + num + "].defendantName' value='"+ defendantSelected.val() +"' />",
							"<input type='text' class='hide input5' name='defendants[" + num + "].defendantType' value='2' />",
							"<input type='text' class='hide input6' name='defendants[" + num + "].mobile' value='' />",
							"<input type='text' class='hide input7' name='defendants[" + num + "].relationship' value='' /></td>",
							"<td></td>",
							"<td></td>",
							"<td><button type='button' class='btn btn-primary btn-xs delThisDefendant'>删除</button></td>",
							"</tr>"].join("");
			$("#addDefendantList table").append(company);
			return num++;
		}
		var cardType = (function(){
			if(ref[_index].cardType === 1) {
				return "身份证";
			} else if (ref[_index].cardType === 2) {
				return "军官证";
			} else if (ref[_index].cardType === 3) {
				return "侨胞证";
			} else if (ref[_index].cardType === 4) {
				return "外籍人士";
			} else {
				return '--'
			}
		})();
		var tbodyDefendant = [
								"<tr>",
								"<td><input type='text' class='hide input1' data-role='"+ ref[_index].cardNo +"' name='defendants[" + num + "].cardNo' value='" + ref[_index].cardNo + "' />"+ ref[_index].defendantName +"</td>",
								"<td>"+ cardType +"</td>",
								"<td>"+ ref[_index].cardNo,
								"<input type='text' class='hide input2' name='defendants[" + num + "].cardType' value='" + ref[_index].cardType + "' />",
								"<input type='text' class='hide input3' name='defendants[" + num + "].defendantId' value='" + ref[_index].defendantId + "' />",
								"<input type='text' class='hide input4' name='defendants[" + num + "].defendantName' value='" + ref[_index].defendantName + "' />",
								"<input type='text' class='hide input5' name='defendants[" + num + "].defendantType' value='" + ref[_index].cardType + "' />",
								"<input type='text' class='hide input6' name='defendants[" + num + "].mobile' value='" + ref[_index].mobile + "' />",
								"<input type='text' class='hide input7' name='defendants[" + num + "].relationship' value='" + ref[_index].relationship + "' /></td>",
								"<td>"+ ref[_index].mobile +"</td>",
								"<td><button type='button' class='btn btn-primary btn-xs delThisDefendant'>删除</button></td>",
								"</tr>"].join("");
		$("#addDefendantList table").append(tbodyDefendant);
		return num++;
	});

	//删除被告人，并重新排列index
	$(document).on("click", ".delThisDefendant", function() {
		num--;
		var cardNo = $(this).parents("tr").children().eq(0).children("input").attr("data-role");
		arrList.splice($.inArray(cardNo,arrList),1);
		$(this).parents("tr").remove();
		trs = $("#addDefendantList").find("tr");
		$.each(trs, function(k, v) {
		    var $el, _index;
		    $el = $(v);
		    _index = $(v).index();
		    $el.find(".input1").attr("name", "defendants[" + _index + "].cardNo");
		    $el.find(".input2").attr("name", "defendants[" + _index + "].cardType");
		    $el.find(".input3").attr("name", "defendants[" + _index + "].defendantId");
		    $el.find(".input4").attr("name", "defendants[" + _index + "].defendantName");
		    $el.find(".input5").attr("name", "defendants[" + _index + "].defendantType");
		    $el.find(".input6").attr("name", "defendants[" + _index + "].mobile");
		    $el.find(".input7").attr("name", "defendants[" + _index + "].relationship");
	    });
		if (num === 0) {
			$("#addDefendantList").html("");
			flag_defendantList = true;
		}
	});
	/* num:1 为保存； 2 为提交*/
	//保存
	$("#btn-save").click(function(){
		save_btn(1);
	});
	//提交保存被告人
	$("#btn-courtApply-save").click(function() {
		save_btn(2, "是否确认提交");
	});
});
function save_btn(num, title) {
	if($("#collectionForm_2").valid()){
		if ($("#addDefendantList").html() == "") {
			tip({content: "请添加被告人"});
			return;
		}
		if (num == 2) {
			oppSureModal(title);
			$("#sureOption").unbind("click").click(function () {
				onlySave(num);
			})
		} else {
			onlySave(num);
		}

	}
}
function onlySave(num) {
	var id = $("#lawsuitIdVal").val();

	var data = {
		projectId : arrDefendantlist.projectId,
		projectNo : arrDefendantlist.projectNo,
		customerId : arrDefendantlist.customerId,
		customerName : arrDefendantlist.customerName,
		customerMobile : arrDefendantlist.mobilePhone,
		cardType : arrDefendantlist.cardType,
		cardNo : arrDefendantlist.cardNo,
		bankId : arrDefendantlist.coBankId,
		bankName : arrDefendantlist.coBankName,
		companyId : arrDefendantlist.launchOrgId,
		companyName : arrDefendantlist.launchOrgName,
		businessGroupId : arrDefendantlist.userGroupId,
		businessGroupName : arrDefendantlist.userGroupName,
		amountAdvanced : arrDefendantlist.advanceBalanceAmount,
		loanBalance : arrDefendantlist.inKeepBalanceAmount,
		managerId : arrDefendantlist.launchUserId,
		managerName : arrDefendantlist.launchUserName
	};
	comn.ajax({
		url : interUrl.postLoan.saveDefendantList,
		data: $.extend($("#collectionForm_2").values(), data,
			{
				id : id
			}),
		success : function(res) {
			$("#lawsuitIdVal, #keyId").val(res.data);
			var lawsuitApplyId = {"lawsuitApplyId" : res.data}
			$("#sureModal").modal("hide");
			if (num == 2) {
				flowSubmit(interUrl.postLoan.preSubmit, interUrl.postLoan.submit2next, './Modal/task/myTask/index.html', lawsuitApplyId);
			}
		}
	});
}

//数据范围更改时，是否显示未抵押天数
$(document).on("change", "#type", function(){
	$(this).val() == "3" ? $("#BeyondDays").removeClass("hide").find("input").val("45") : $("#BeyondDays").addClass("hide").find("input").val("");
});

//清空查询条件
$("#reset_btn").click(function() {
	$("#BeyondDays").addClass("hide").find("input").val("");
})
