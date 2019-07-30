var dataLoad_3, submit2Box; 

dataLoad_3 = function(params) {
	var data = args["businessId"];
	comn.ajax({
		url: interUrl.credit.creditSubmit,
		data: {
			creditId: data
		},
		async: false,
		success: function(res) {
			if (res.data.userTasks.length > 1) {
				comn.ajax({
					async: false,
					url: interUrl.gr.flowUser,
					data: {
						boId: res.data.businessObjectId,
						businessGroupId: res.data.businessGroupId,
						businessType: res.data.nextFlowType,
						nodeCode: res.data.nextFlowNodeCode
					},
					success: function(res1) {
						$("#nextFlowNodeCode").html(res1.data.nextFlowNodeCode);
						params.success({
							'total': res1.data.userTasks.length,
							rows: res1.data.userTasks
						});
						params.complete();
						$("#task").modal("show");
						$("#table_3").bootstrapTable('load', res1.data.userTasks);
						$("#task input[type='radio']").eq(0).attr('checked', true);
						tip({
							content: res1.message
						});
//						return window.parent.toUrl({
//							url: "./Modal/loanManage/creditManage/index.html"
//						});
						comn.closeTab();
					}
				});
			} else {
				var a, b, c, //直接提交
					a = args["businessId"],
					b = res.data.userTasks[0].userId,
					c = res.data.userTasks[0].userName;
				comn.ajax({
					async: false,
					url: interUrl.credit.creditSubmit2,
					data: {
						creditId: a,
						nextNodeUserId: b,
						nextNodeUserName: c
					},
					success: function(res1) {
						tip({
							content: res1.message
						});
//						return window.parent.toUrl({
//							url: "./Modal/loanManage/creditManage/index.html"
//						});
						comn.closeTab();
					}
				});
			}
		}
	});
}


handle_3 = function(value, row, index) {
	return ["<input type='radio' name='userId' class='role' userId='" + row.userId + "' userName='" + row.userName + "'/>"].join("");
};

getValue = function(o, key) { //处理undefine
	return o[key] ? o[key] : "";
}
loanVal = function(a, b) {
	for (var i = 0; i < a.length; i++) {
		if(a[i].borrowerRelationship == 1){    //本人
			var oneself = '<div class="panel panel-default partyList party_List"><div class="panel-heading"><h3 class="panel-title">借款人</h3></div><div class="panel-body panel-default" style="padding-bottom:0;"><fieldset class="disabledClass"><div class="form-group form-group-sm"><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">姓名：</label><div class="col-md-5 cl-sm-5 col-xs-5"><input type="text" name="relavants['+i+'].fullName" value="' + a[i].fullName + '" placeholder="" class="form-control" required="" aria-required="true" minlength="2" /><input type="hidden" name="relavants['+i+'].id" value="' + a[i].id + '" /></div></div><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">证件类型：</label><div class="col-md-5 cl-sm-5 col-xs-5"><select name="relavants['+i+'].cardType" value="' + a[i].cardType + '" class="form-control"><option value="1">身份证</option><option value="2">军官证</option><option value="3">侨胞证</option><option value="4">外籍人士</option></select></div></div><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">证件号码：</label><div class="col-md-5 cl-sm-5 col-xs-5"><input type="text" name="relavants['+i+'].cardId" value="' + a[i].cardId + '" placeholder="请输入证件号码" class="form-control" required="" aria-required="true" /></div></div></div><div class="form-group form-group-sm"><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">手机号码：</label><div class="col-md-5 cl-sm-5 col-xs-5"><input type="text" name="relavants['+i+'].mobile" value="' + getValue(a[i], 'mobile') + '" maxlength="11" placeholder="请输入手机号码" class="form-control" /></div></div><div class="input-tip hide"><label class="col-md-3 col-xs-3 col-sm-3 control-label">借款人关系：</label><div class="col-md-5 cl-sm-5 col-xs-5"><input type="hidden" name="relavants['+i+'].borrowerRelationship" value="1" class="form-control" /></div></div><div class="input-tip hide"><label class="col-md-3 col-xs-3 col-sm-3 control-label">担保关系：</label><div class="col-md-5 cl-sm-5 col-xs-5"><input type="hidden" name="relavants['+i+'].guaranteeRelationship" value="1" class="form-control guaranteeRelationship" /></div></div></div></fieldset><div class="form-group form-group-sm dataUpload" va="001"><div class="col-md-3 fileBox"><button type="button" class="btn btn-primary imgItem" disabled="disabled"><span>资信文件上传</span></button><input type="file" accept="image/*" class="hide" /></div><ul class="col-md-19 list-inline" inde="' + i + '"></ul><div class="col-md-2 text-right hide"><button type="button" class="btn btn-primary deleted"><span>删除关系人</span></button></div></div>' +

				'<div class="panel panel-default collapseFlex">' +
				'<div class="panel-heading">' +
				'<div class="col-md-8">' +
				'<h3 class="panel-title">银行征信信息</h3>' +
				'</div>' +
				'<div class="col-md-16 text-right">' +
				'<a href="javascript:;" class="btn flexBtn" data-status="0"><span class="glyphicon glyphicon-chevron-right"></span></a>' +
				'</div>' +
				'</div>' +
				// '<div class="form-group form-group-sm panel-heading openBox" style="border-top:1px solid #ddd;">' +
				// '<div class="col-md-18"><label><h3 class="panel-title" style="line-height: 34px;">银行征信信息</h3></label></div>' +
				// '<div class="col-md-6 text-right"><button type="button" class="btn btn-primary closeOp"><span>查看详细信息</span></button></div>' +
				// '</div>' +
				'<div class="panel-body">' +
				'<fieldset class="disabled1Class"><div class="form-group form-group-sm"><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">调查方式：</label><div class="col-md-5 cl-sm-5 col-xs-5"><select id="seHan" name="relavants['+i+'].checkType" value="' + a[i].checkType + '" class="form-control" required="" aria-required="true"><option value="">--请选择--</option><option value="1">电话</option><option value="2">网络</option></select></div></div><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">调查结果：</label><div class="col-md-5 cl-sm-5 col-xs-5"><select name="relavants['+i+'].checkResult" value="' + a[i].checkResult + '" class="form-control checkResult" required="" aria-required="true"><option value="">--请选择--</option><option value="1">通过</option><option value="2">不通过</option></select></div></div><div class="input-tip hide"><label class="radio-inline"><input type="radio" fors="radio0" value="1" name="relavants['+i+'].checkResultStatus" required="" aria-required="true" />关注</label><label class="radio-inline"><input type="radio" fors="radio0" value="2" name="relavants['+i+'].checkResultStatus" required="" aria-required="true" />禁入</label><label class="radio-inline"><input type="radio" fors="radio0" value="3" name="relavants['+i+'].checkResultStatus" required="" aria-required="true" />其他</label></div></div><div class="form-group form-group-sm"><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">调查人：</label><div class="col-md-5 cl-sm-5 col-xs-5"><input type="text" maxlength="5" name="relavants['+i+'].staffName" value="' + getValue(a[i], 'staffName') + '" for="staffName" placeholder="请输入调查人姓名" class="form-control" required="" aria-required="true" /><input type="hidden" name="relavants['+i+'].staffId" value="' + getValue(a[i], 'staffId') + '" /></div></div><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">调查日期：</label><div class="col-md-5 cl-sm-5 col-xs-5"><input type="text" name="relavants['+i+'].checkDate" placeholder="请输入调查日期" value="' + getValue(a[i], 'checkDate') + '" class="form-control date required dateISO checkDate" required="" aria-required="true" /></div></div></div><div class="form-group form-group-sm"><label class="col-md-3 control-label">备注：</label><div class="col-md-21"><textarea required="" aria-required="true" class="form-control" rows="3" name="relavants['+i+'].creditRemark">' + getValue(a[i], 'creditRemark') + '</textarea></div></div>' +
				'</fieldset>' +
				'</div>' +
				'</div>' +
				'<div class="panel panel-default collapseFlex">' +
				'<div class="panel-heading">' +
				'<div class="col-md-8">' +
				'<h3 class="panel-title">网络征信信息</h3>' +
				'</div>' +
				'<div class="col-md-16 text-right">' +
				'<a href="javascript:;" class="btn flexBtn" data-status="1"><span class="glyphicon glyphicon-chevron-right"></span></a>' +
				'</div>' +
				'</div>' +
				// '<div class="form-group form-group-sm panel-heading openBox" style="border-top:1px solid #ddd;">' +
				// '<div class="col-md-18"><h3 class="panel-title" style="line-height: 34px;">网络征信信息</h3></div>' +
				// '<div class="col-md-6 text-right"><button type="button" class="btn btn-primary closeOp"><span>查看详细信息</span></button></div>' +
				// '</div>' +
				'<div class="panel-body">' +
				'<fieldset class="disabled1Class"><div class="form-group form-group-sm"><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">报告日期：</label><div class="col-md-5 cl-sm-5 col-xs-5"><input type="hidden" name="relavants['+i+'].netResult" value="1" /><input type="text" name="relavants['+i+'].netReportDate" value="' + getValue(a[i], 'netReportDate') + '" placeholder="请输入报告日期" disabled="disabled" class="form-control date required dateISO" required="" aria-required="true" /></div></div><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">风险等级：</label><div class="col-md-5 cl-sm-5 col-xs-5"><select name="relavants['+i+'].riskStatus" value="' + a[i].riskStatus + '" class="form-control riskStatus" disabled="disabled" required="" aria-required="true"><option value="1">正常</option><option value="2">黑名单</option><option value="3">灰名单</option></select></div></div></div><div class="form-group form-group-sm"><label class="col-md-3 control-label">网络征信：</label><div class="col-md-21"><textarea disabled="disabled" required="" aria-required="true" class="form-control netReportDetailVal netReportDetail' + i + '" rows="3" name="relavants['+i+'].creditRemark"></textarea></div></div>' +
				'</fieldset>' +
				'</div>' +
				'</div>' +

				'</div></div> ';
			$(".partyBox").append(oneself);
		}else if(a[i].borrowerRelationship == 2){    //妻子
			var wife = '<html><head></head><body><div class="panel panel-default partyList"><div class="panel-heading"><h3 class="panel-title">配偶</h3></div><div class="panel-body panel-default" style="padding-bottom:0;"><fieldset class="disabledClass"><div class="form-group form-group-sm"><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">姓名：</label><div class="col-md-5 cl-sm-5 col-xs-5"><input type="text" name="relavants[' + i + '].fullName" value="' + a[i].fullName + '" placeholder="" class="form-control" required="" aria-required="true" minlength="2" /><input type="hidden" name="relavants[' + i + '].id" value="' + a[i].id + '" /></div></div><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">证件类型：</label><div class="col-md-5 cl-sm-5 col-xs-5"><select name="relavants[' + i + '].cardType" value="' + a[i].cardType + '" class="form-control select"><option value="1">身份证</option><option value="2">军官证</option><option value="3">侨胞证</option><option value="4">外籍人士</option></select></div></div><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">证件号码：</label><div class="col-md-5 cl-sm-5 col-xs-5"><input type="text" name="relavants[' + i + '].cardId" value="' + a[i].cardId + '" placeholder="请输入证件号码" class="form-control" required="" aria-required="true" /></div></div></div><div class="form-group form-group-sm"><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">手机号码：</label><div class="col-md-5 cl-sm-5 col-xs-5"><input type="text" maxlength="11" name="relavants[' + i + '].mobile" value="' + getValue(a[i], 'mobile') + '" placeholder="请输入手机号码" class="form-control" /></div></div><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">借款人关系：</label><div class="col-md-5 cl-sm-5 col-xs-5"><select name="relavants[' + i + '].borrowerRelationship" value="' + a[i].borrowerRelationship + '" class="form-control"><option value="2">夫妻</option><option value="3">父亲</option><option value="4">母亲</option><option value="5">姐妹</option><option value="6">兄弟</option><option value="7">儿子</option><option value="8">亲戚</option><option value="9">朋友</option><option value="10">合伙人</option><option value="11">同事</option><option value="12">女儿</option><option value="13">姐夫</option><option value="14">嫂子</option><option value="15">儿媳</option></select></div></div></div></fieldset><div class="form-group form-group-sm dataUpload" va="001"><div class="col-md-3 fileBox"><button type="button" class="btn btn-primary imgItem" disabled="disabled"><span>资信文件上传</span></button><input type="file" accept="image/*" class="hide" /></div><ul class="col-md-19 list-inline" inde="' + i + '"></ul><div class="col-md-2 text-right hide"><button type="button" class="btn btn-primary deleted"><span>删除关系人</span></button></div></div>' +


				'<div class="panel panel-default collapseFlex">' +
				'<div class="panel-heading">' +
				'<div class="col-md-8">' +
				'<h3 class="panel-title">银行征信信息</h3>' +
				'</div>' +
				'<div class="col-md-16 text-right">' +
				'<a href="javascript:;" class="btn flexBtn" data-status="0"><span class="glyphicon glyphicon-chevron-right"></span></a>' +
				'</div>' +
				'</div>' +
				// '<div class="form-group form-group-sm panel-heading openBox" style="border-top:1px solid #ddd;">' +
				// '<div class="col-md-18"><label><h3 class="panel-title" style="line-height: 34px;">银行征信信息</h3></label></div>' +
				// '<div class="col-md-6 text-right"><button type="button" class="btn btn-primary closeOp"><span>查看详细信息</span></button></div>' +
				// '</div>' +
				'<div class="panel-body">' +
				'<fieldset class="disabled1Class"><div class="form-group form-group-sm"><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">调查方式：</label><div class="col-md-5 cl-sm-5 col-xs-5"><select id="seHan" name="relavants[' + i + '].checkType" value="' + a[i].checkType + '" class="form-control select" required="" aria-required="true"><option value="">--请选择--</option><option value="1">电话</option><option value="2">网络</option></select></div></div><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">调查结果：</label><div class="col-md-5 cl-sm-5 col-xs-5"><select name="relavants[' + i + '].checkResult" value="' + a[i].checkResult + '" class="form-control select checkResult" required="" aria-required="true"><option value="">--请选择--</option><option value="1">通过</option><option value="2">不通过</option></select></div></div><div class="input-tip hide"><label class="radio-inline"><input type="radio" fors="radio' + i + '" value="1" name="relavants[' + i + '].checkResultStatus" required="" aria-required="true" />关注</label><label class="radio-inline"><input type="radio" value="2" fors="radio' + i + '" name="relavants[' + i + '].checkResultStatus" required="" aria-required="true" />禁入</label><label class="radio-inline"><input type="radio" fors="radio' + i + '" value="3" name="relavants[' + i + '].checkResultStatus" required="" aria-required="true" />其他</label></div></div><div class="form-group form-group-sm"><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">调查人：</label><div class="col-md-5 cl-sm-5 col-xs-5"><input type="text" for="staffName" name="relavants[' + i + '].staffName" value="' + getValue(a[i], 'staffName') + '" placeholder="请输入调查人姓名" maxlength="5" class="form-control" required="" aria-required="true" /><input type="hidden" name="relavants[' + i + '].staffId" value="' + getValue(a[i], 'staffId') + '" /></div></div><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">调查日期：</label><div class="col-md-5 cl-sm-5 col-xs-5"><input type="text" name="relavants[' + i + '].checkDate" placeholder="请输入调查日期" value="' + getValue(a[i], 'checkDate') + '" class="form-control date required dateISO checkDate" required="" aria-required="true" /></div></div></div><div class="form-group form-group-sm"><label class="col-md-3 control-label">备注：</label><div class="col-md-21"><textarea required="" aria-required="true" class="form-control" rows="3" name="relavants[' + i + '].creditRemark">' + getValue(a[i], 'creditRemark') + '</textarea></div></div>' +
				'</fieldset>' +
				'</div>' +
				'</div>' +
				'<div class="panel panel-default collapseFlex">' +
				'<div class="panel-heading">' +
				'<div class="col-md-8">' +
				'<h3 class="panel-title">网络征信信息</h3>' +
				'</div>' +
				'<div class="col-md-16 text-right">' +
				'<a href="javascript:;" class="btn flexBtn" data-status="1"><span class="glyphicon glyphicon-chevron-right"></span></a>' +
				'</div>' +
				'</div>' +
				// '<div class="form-group form-group-sm panel-heading openBox" style="border-top:1px solid #ddd;">' +
				// '<div class="col-md-18"><h3 class="panel-title" style="line-height: 34px;">网络征信信息</h3></div>' +
				// '<div class="col-md-6 text-right"><button type="button" class="btn btn-primary closeOp"><span>查看详细信息</span></button></div>' +
				// '</div>' +
				'<div class="panel-body">' +
				'<fieldset class="disabled1Class"><div class="form-group form-group-sm"><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">报告日期：</label><div class="col-md-5 cl-sm-5 col-xs-5"><input type="hidden" name="relavants['+i+'].netResult" value="1" /><input type="text" name="relavants[' + i + '].netReportDate" value="' + getValue(a[i], 'netReportDate') + '" placeholder="请输入报告日期" disabled="disabled" class="form-control date required dateISO" required="" aria-required="true" /></div></div><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">风险等级：</label><div class="col-md-5 cl-sm-5 col-xs-5"><select disabled="disabled" name="relavants['+i+'].riskStatus" value="' + a[i].riskStatus + '" class="form-control riskStatus" required="" aria-required="true"><option value="1">正常</option><option value="2">黑名单</option><option value="3">灰名单</option></select></div></div></div><div class="form-group form-group-sm"><label class="col-md-3 control-label">网络征信：</label><div class="col-md-21"><textarea disabled="disabled" required="" aria-required="true" class="form-control netReportDetailVal netReportDetail' + i + '" rows="3" name="relavants['+i+'].creditRemark"></textarea></div></div>' +
				'</fieldset>' +
				'</div>' +
				'</div>' +




				'</div></div></body></html>';
			$("#wife").append(wife);
		}else{
			var Borrower = '<div class="panel panel-default partyList party_mean"><div class="panel-heading"><h3 class="panel-title">借款关系人</h3></div><div class="panel-body panel-default" style="padding-bottom:0;"><fieldset class="disabledClass"><div class="form-group form-group-sm"><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">姓名：</label><div class="col-md-5 cl-sm-5 col-xs-5"><input type="text" name="relavants[' + i + '].fullName" value="' + a[i].fullName + '" placeholder="" class="form-control fullName" required="" aria-required="true" minlength="2" /><input type="hidden" name="relavants[' + i + '].id" value="' + a[i].id + '" /></div></div><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">证件类型：</label><div class="col-md-5 cl-sm-5 col-xs-5"><select name="relavants[' + i + '].cardType" value="' + a[i].cardType + '" class="form-control select"><option value="1">身份证</option><option value="2">军官证</option><option value="3">侨胞证</option><option value="4">外籍人士</option></select></div></div><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">证件号码：</label><div class="col-md-5 cl-sm-5 col-xs-5"><input type="text" name="relavants[' + i + '].cardId" value="' + a[i].cardId + '" placeholder="请输入证件号码" class="form-control" required="" aria-required="true" /></div></div></div><div class="form-group form-group-sm"><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">手机号码：</label><div class="col-md-5 cl-sm-5 col-xs-5"><input type="text" maxlength="11" name="relavants[' + i + '].mobile" value="' + getValue(a[i], 'mobile') + '" placeholder="请输入手机号码" class="form-control" /></div></div><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">借款人关系：</label><div class="col-md-5 cl-sm-5 col-xs-5"><select name="relavants[' + i + '].borrowerRelationship" value="' + a[i].borrowerRelationship + '" class="form-control"><option value="2">夫妻</option><option value="3">父亲</option><option value="4">母亲</option><option value="5">姐妹</option><option value="6">兄弟</option><option value="7">儿子</option><option value="8">亲戚</option><option value="9">朋友</option><option value="10">合伙人</option><option value="11">同事</option><option value="12">女儿</option><option value="13">姐夫</option><option value="14">嫂子</option><option value="15">儿媳</option></select></div></div><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">担保关系：</label><div class="col-md-5 cl-sm-5 col-xs-5"><select name="relavants[' + i + '].guaranteeRelationship" value="' + a[i].guaranteeRelationship + '" class="form-control guaranteeRelationship"><option value="1">担保人</option><option value="2">反担保人</option></select></div></div></div></fieldset><div class="form-group form-group-sm dataUpload" va="001"><div class="col-md-3 fileBox"><button type="button" class="btn btn-primary imgItem" disabled="disabled"><span>资信文件上传</span></button><input type="file" accept="image/*" class="hide" /></div><ul class="col-md-19 list-inline" inde="' + i + '"></ul><div class="col-md-2 text-right hide"><button type="button" class="btn btn-primary deleted"><span>删除关系人</span></button></div></div>' +


				'<div class="panel panel-default collapseFlex">' +
				'<div class="panel-heading">' +
				'<div class="col-md-8">' +
				'<h3 class="panel-title">银行征信信息</h3>' +
				'</div>' +
				'<div class="col-md-16 text-right">' +
				'<a href="javascript:;" class="btn flexBtn" data-status="0"><span class="glyphicon glyphicon-chevron-right"></span></a>' +
				'</div>' +
				'</div>' +
				// '<div class="form-group form-group-sm panel-heading openBox" style="border-top:1px solid #ddd;">' +
				// '<div class="col-md-18"><label><h3 class="panel-title" style="line-height: 34px;">银行征信信息</h3></label></div>' +
				// '<div class="col-md-6 text-right"><button type="button" class="btn btn-primary closeOp"><span>查看详细信息</span></button></div>' +
				// '</div>' +
				'<div class="panel-body">' +
				'<fieldset class="disabled1Class"><div class="form-group form-group-sm"><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">调查方式：</label><div class="col-md-5 cl-sm-5 col-xs-5"><select id="seHan" name="relavants[' + i + '].checkType" value="' + a[i].checkType + '" class="form-control select" required="" aria-required="true"><option value="">--请选择--</option><option value="1">电话</option><option value="2">网络</option></select></div></div><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">调查结果：</label><div class="col-md-5 cl-sm-5 col-xs-5"><select name="relavants[' + i + '].checkResult" value="' + a[i].checkResult + '" class="form-control select checkResult" required="" aria-required="true"><option value="">--请选择--</option><option value="1">通过</option><option value="2">不通过</option></select></div></div><div class="input-tip hide"><label class="radio-inline"><input type="radio" fors="radio' + i + '" value="1" name="relavants[' + i + '].checkResultStatus" required="" aria-required="true" />关注</label><label class="radio-inline"><input type="radio" value="2" fors="radio' + i + '" name="relavants[' + i + '].checkResultStatus" required="" aria-required="true" />禁入</label><label class="radio-inline"><input type="radio" fors="radio' + i + '" value="3" name="relavants[' + i + '].checkResultStatus" required="" aria-required="true" />其他</label></div></div><div class="form-group form-group-sm"><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">调查人：</label><div class="col-md-5 cl-sm-5 col-xs-5"><input type="text" for="staffName" name="relavants[' + i + '].staffName" value="' + getValue(a[i], 'staffName') + '" placeholder="请输入调查人姓名" maxlength="5" class="form-control" required="" aria-required="true" /><input type="hidden" name="relavants[' + i + '].staffId" value="' + getValue(a[i], 'staffId') + '" /></div></div><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">调查日期：</label><div class="col-md-5 cl-sm-5 col-xs-5"><input type="text" name="relavants[' + i + '].checkDate" placeholder="请输入调查日期" value="' + getValue(a[i], 'checkDate') + '" class="form-control date required dateISO checkDate" required="" aria-required="true" /></div></div></div><div class="form-group form-group-sm"><label class="col-md-3 control-label">备注：</label><div class="col-md-21"><textarea required="" aria-required="true" class="form-control" rows="3" name="relavants[' + i + '].creditRemark">' + getValue(a[i], 'creditRemark') + '</textarea></div></div>' +
				'</fieldset>' +
				'</div>' +
				'</div>' +


				'<div class="panel panel-default collapseFlex">' +
				'<div class="panel-heading">' +
				'<div class="col-md-8">' +
				'<h3 class="panel-title">网络征信信息</h3>' +
				'</div>' +
				'<div class="col-md-16 text-right">' +
				'<a href="javascript:;" class="btn flexBtn" data-status="1"><span class="glyphicon glyphicon-chevron-right"></span></a>' +
				'</div>' +
				'</div>' +
				// '<div class="form-group form-group-sm panel-heading openBox" style="border-top:1px solid #ddd;">' +
				// '<div class="col-md-18"><h3 class="panel-title" style="line-height: 34px;">网络征信信息</h3></div>' +
				// '<div class="col-md-6 text-right"><button type="button" class="btn btn-primary closeOp"><span>查看详细信息</span></button></div>' +
				// '</div>' +
				'<div class="panel-body">' +
				'<fieldset class="disabled1Class"><div class="form-group form-group-sm"><div class="form-group form-group-sm"><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">报告日期：</label><div class="col-md-5 cl-sm-5 col-xs-5"><input type="hidden" name="relavants['+i+'].netResult" value="1" /><input type="text" name="relavants[' + i + '].netReportDate" value="' + getValue(a[i], 'netReportDate') + '" placeholder="请输入报告日期" disabled="disabled" class="form-control date required dateISO" required="" aria-required="true" /></div></div><div class="input-tip"><label class="col-md-3 col-xs-3 col-sm-3 control-label">风险等级：</label><div class="col-md-5 cl-sm-5 col-xs-5"><select disabled="disabled" name="relavants[' + i + '].riskStatus" value="' + a[i].riskStatus + '" class="form-control riskStatus" required="" aria-required="true"><option value="1">正常</option><option value="2">黑名单</option><option value="3">灰名单</option></select></div></div></div></div><div class="form-group form-group-sm"><label class="col-md-3 control-label">网络征信：</label><div class="col-md-21"><textarea disabled="disabled" required="" aria-required="true" class="form-control netReportDetailVal netReportDetail' + i + '" rows="3" name="relavants['+i+'].creditRemark"></textarea></div></div>' +
				'</fieldset>' +
				'</div>' +
				'</div>' +




				'</div></div> ';
			$("#partyBox").append(Borrower);
		};
		var imgs = a[i].creditFiles;
		for (var j = 0; j < imgs.length; j++) {
			if(!imgs[j].creditFile) return;
			var imgModel = '<li><img class="img" data-toggle="tooltip" data-placement="top" title="点击删除图片" src="' + imgs[j].creditFile + '" height="57" style="height:57px" data-src="'+ imgs[j].creditFile +'"><input type="text" class="hide" name="relavants[' + i + '].creditFiles[' + j + '].creditFile" value="' + imgs[j].creditFile + '"><input type="hidden" name="relavants[' + i + '].creditFiles[' + j + '].creditFileSize" value="' + getValue(imgs[j], 'creditFileSize')+ '"></li>';
			$("ul[inde=" + i + "]").append(imgModel);
		};
		if(imgs.length < 1){
			$(".list-inline[inde="+ i +"]").siblings(".fileBox").addClass("hide");
		}
		if(a[i].riskDetail){   
			$(".netReportDetail"+ i +"").html(a[i].riskDetail);    
		}else{
			$(".netReportDetail"+ i +"").html('无记录');    
		}
		$("select[name='relavants["+ i +"].checkResult']").attr("value",a[i].checkResult).change();    //调查结果
		$("input[name='relavants["+ i +"].checkResultStatus'][value='"+ a[i].checkResultStatus +"']").attr("checked",true);    //调查结果状态
		//初始化
		$('.flexBtn').each(function(){
			var value = $(this).attr("data-status");
			$(this).flexBtnInit(value);
		})
		//$('.flexBtn').flexBtnInit();
	}

	$('[data-toggle="tooltip"]').tooltip();
	
	if(args["type"] == 1){
		$(".img").attr('data-original-title','');
	}
	
	var fn = null;
	$(document).on('click', 'img', function() {
		var _this = $(this);
		//var src = _this.attr("src");
		var src = _this.attr("data-src");
		$('#imageBox img').attr('src', src);
		$('#imageBox').modal('show');
		if (args["type"] == "1") {
			$(".modal-content>.modal-footer").hide()
		}
		fn = function() {
			if(args["type"] != 1){
			layer.confirm('确定要删除此图片吗？', {
				btn: ['确定', '取消'] //按钮
			}, function() {
				_this.parent('li').remove();
				$('#imageBox').modal('hide');
				fn = null;
				layer.msg('删除成功', {
					icon: 1
				});
			}, function() {
				time: 10
			});
		}
		}; 
	}).on('click', '#del', function(){
		if(typeof fn == "function"){ fn(); }
	});

	selectCheck();
	if (b == 1) {
		$(".disabledClass,.disabled1Class").attr("disabled", true);
		$(".imgItem").html("<span>征信文件下载</span>").addClass('downImg').attr('disabled',false);
	};
	if (b == 2) {
		$(".disabledClass").attr("disabled", true);
		$("input[for='staffName']").val(comn.user.realname);
		$(".imgItem").html("<span>征信文件下载</span>").addClass('downImg').attr('disabled',false);
	};
	if (b == 3) {
		$(".disabledClass,.disabled1Class").attr("disabled", true);
		$(".imgItem").html("<span>征信文件下载</span>").addClass('downImg').attr('disabled',false);
	};
};

CustomerLoad = function(a, b, c) {
	var data = a;
	comn.ajax({
		url: b,
		async: false,
		data: {
			id: data
		},
		success: function(res) {
			$("#creditForm").values(res.data);
			if (res.data.source == 2) $(".Number").addClass('hide');
			loanVal(res.data.relavants, c); //借款人、借款关系人信息处理
			$("#bankDeraler").getBank(res.data.inquryBankId);
		}
	});
};

radioCheck = function(a, b, c) {
	if (a == 2) {
		var d = c - 1;
		$("input[fors=radio" + b + "]").eq(d).attr("checked", true).parents(".input-tip").addClass('show');
	}
}
selectCheck = function() {
	var length = $("select").length;
	for (var i = 0; i < length; i++) {
		var val = $("select:eq(" + i + ")").attr('value');
		$("select:eq(" + i + ") option[value=" + val + "]").attr("selected", true);
	}
};

$(function() {
	$(document).on("change", "#bankDeraler", function() { //给银行赋值
		var inquryBank = $(this).find("option:selected").html();
		$("#inquryBank").val(inquryBank);

	});
	$(document).on("click", ".loanStart3", function() {
		var a, b, c,
			a = args["businessId"],
			b = $("#task input[type='radio']:checked").attr('userId');
		c = $("#task input[type='radio']:checked").attr('userName');
		comn.ajax({
			async: false,
			url: interUrl.credit.creditSubmit2,
			data: {
				creditId: a,
				nextNodeUserId: b,
				nextNodeUserName: c
			},
			success: function(res) {
				$("#task").modal("hide");
				tip({
					content: res.message
				});
			}
		});
	})


	args = comn.getArgs();
	a = args["type"];
	if (a == 1) { // 查看征信详情页面
		CustomerLoad(args["businessId"], interUrl.credit.creditGet, '1');
		$(".buttonBox").html('').append('<button type="button" class="btn btn-primary returnBtn"><span>返回</span></button>');
		$("h3").html('征信详情');
	} else if (a == 2) { //录入征信页面
		CustomerLoad(args["businessId"], interUrl.credit.creditGet, '2');
		$("#addParty").addClass('hide');
		$("h3").html('录入征信');
		//setTimeout(function(){$(".checkDate").getToday()},1000);
	} else if (a == 3) { //接受征信页面
		CustomerLoad(args["businessId"], interUrl.credit.creditGet, '3');
		$("#addParty").addClass('hide');
		$("h3").html('接受征信');
	};


	function submit2Box() {
		var a = $("#businessId").val();
		comn.ajax({
			async: false,
			url: interUrl.credit.creditSubmit2,
			data: {
				creditId: a
			},
			success: function(res) {
				tip({
					content: res.message
				})
			}
		});
	}



	$(document).on("change", ".checkResult", function() {
		var tips = $(this).parent("div").parent("div").next('div');
		var val = $(this).val() || $(this).attr('value');
		if(val == undefined) var val = $(this).attr('value');
		if (val == 2) {
			tips.removeClass('hide').addClass('show');
		} else {
			tips.removeClass('show').addClass('hide');
		};

	});
	$(document).on("click", "#return", function() { //返回上一个节点
		oppSureModal("是否确认退回");
		$("#sureOption").unbind("click").click(function () {
			commit(3);
			comn.ajax({
				async: false,
				url: interUrl.credit.back2pre,
				data: {
					creditId: args["businessId"]
				},
				success: function(res1) {
					tip({
						content: res1.message
					});
//				return window.parent.toUrl({
//					url: "./Modal/task/myTask/index.html"
//				});
					comn.closeTab();
				}
			});
		})

	});
	$(document).on("click", ".returnBtn", function() {
//		return window.parent.toUrl({
//			url: "./Modal/dloanManagescreditanageCindex.html"
//		});
		comn.closeTab();
	});


	//添加借款关系人模板
	$(document).on("click", ".open", function() {
		$(this).removeClass("open").addClass("closeOp").parents(".openBox").next(".openValBox").stop().slideDown(1000);
	})
	$(document).on("click", ".closeOp", function() {
		$(this).removeClass("closeOp").addClass("open").parents(".openBox").next(".openValBox").stop().slideUp(1000);
	});
	
	$(".tipYes").click(function(){
		determined(true);
	});
	
	$(".tipNo").click(function(){
		determined(false);
	});
	
	
	//打包下载图片
	$(document).on("click",".downImg",function(){
		return window.open(interUrl.basic + interUrl.credit.download + "?id=" + args['businessId']);
	})
	

	$("#creditForm").validate();

	return $("#preservation,#save").on("click", function() { //点击保存
		// $(".openValBox").show(); before 2016-06-06
		$(".panel-body").show();
		$(".flexBtn").attr("data-status","0").css("transform", "rotate(90deg)")
		var val = $(this).attr('val');
		$("#creditForm").validate();
        if ($("#creditForm").valid() == true)
		{
			oppSureModal("是否确认"+(val==0?"提交":"保存"));
			$("#sureOption").unbind("click").click(function () {
				commit(val);
			});
		}
	});

	function determined(a){   //转化为反担保人
		comn.ajax({
			async: false,
			url: interUrl.credit.determined,
			data: {
				id: $("#creditId").val(),
				accepted:a
			},
			success: function(res) {
				tip({
					content: '流程结束'
				});
//				return window.parent.toUrl({
//					url: "./Modal/loanManage/creditManage/index.html"
//				});
				comn.closeTab();
			}
		});
	}


	function commit(a) { //保存征信信息
		var data;
		data = $("#creditForm").values();
		return comn.ajax({
			url: interUrl.credit.creditEdit,
			data: data,
			success: function(res) {
				$("#sureModal").modal("hide");
				if (a == 0) save(); //提交接口调用
				if (a == 1) preservation(); //保存提示
			}
		});
	}

	function save() {
		if(args["type"] == '3'){
			var a = $(".partyBox .checkResult[value=" + 1 + "]").length;//本人征信通过
			var b = $("#wife .checkResult[value=" + 1 + "]").length;//配偶征信通过
			var e = $("#wife div").length //配偶是否存在
			var c = $("#partyBox .checkResult[value=" + 1 + "]").length;//关系人征信通过
			var d = a + b + c;
			if(a == '0' || e > 0 && b == '0' || d == '0'){
				determined(false);   //当本人或者配偶征信不通过或者所有人都不通过时
				return
			};
			
        	var length = $(".party_mean .checkResult[value=" + 2 + "]").length;
			var nameHtml = ' ';
			var nameNum = 0;
			if (length > 0) {
				for (var i = 0; i < length; i++) { //验证是否存在不通过的征信记录
					var this_ = $(".party_mean .checkResult[value=" + 2 + "]").eq(i);
					var this_par = this_.parents('.party_mean');
					var name = this_par.find("input.fullName").val();
					var guaranteeRelationship = this_par.find(".guaranteeRelationship").attr('value');
					if(guaranteeRelationship == '1'){
						nameHtml += name+' ';
						nameNum = nameNum + 1;
					}
				};
				if(nameNum > 0){    //当存在不通过且需要显示的人数大于0时
					$("#modelTip").html('关系人【' + nameHtml + '】征信结果为不通过，是否转为反担保人！？');
					$('#myModal11').modal('show');
				}else{
					determined(true);
				}
			} else {
					determined(false);
			}
        }else{
        	$("#table_3").bootstrapTable();
        }
	}




	function preservation() {
		tip({
			content: '保存成功'
		});
//		return window.parent.toUrl({
//			url: "./Modal/loanManage/creditManage/index.html"
//		});
		comn.closeTab();
	}
});




