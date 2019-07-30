/**
 * Created by hyb on 16/1/6.
 */
//反担保信息-抵/质押信息
//getApprovalAsserts();

//反担保信息-保证人信息 table
//getGuarantor();

/*table_guarantor = function (params) {
    var p=params.data;
    return comn.ajax({
        url: interUrl.myTask.approvalGuarantor,
        data: $.extend(loanApplyId,p),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            return params.complete();
        }
    });
}; 
$("#table_guarantor").bootstrapTable(comn.table);*/

function proBind(_index, arr) {
	$("#provinceCode_" + _index).unbind("change").getProvince().change(function() {
		$("#provinceCode_name_" + _index).val($(this).find("option:selected").text());
		if (this.value) {
			$("#areaCode_" + _index).val("");
			$("#cityCode_" + _index).getCity(this.value).unbind("change").change(function() {
				$("#cityCode_name_" + _index).val($(this).find("option:selected").text());
				if (this.value) {
					$("#areaCode_" + _index).getArea(this.value).unbind("change").change(function(){
						$("#areaCode_name_" + _index).val($(this).find("option:selected").text()); 
					});
				}
			});
		}
	}); 
	if(arr && arr.length > 0){
		$("#provinceCode_" + _index).getProvince(arr[0]);
		$("#cityCode_" + _index).getCity(arr[0], arr[1]);
		$("#areaCode_" + _index).getArea(arr[1], arr[2]); 
	}
}

tableEvent_rGuarantor = {
    "click .xz": function (e, a, item, index) {
		if(_current == 4){
			tip({content: "已添加至最大担保人！！"});
			$("#guarantorModal").modal("hide"); 
			return;
		}
		comn.ajax({
			url: interUrl.gr.lauchLoanGuarantorInfo,
			data: {
				loanApplyId: args['loanApplyId'],
				guarantyRelationship: guarantyRelationship,
				creditApplyId: item.id 
			},
			success: function(res){
				_current++;
				var item = res.data;
				addGuarrantor($.extend(res.data, {guarantyRelationship: guarantyRelationship}), _current);
				$("#getLoanGuarantorInfo").prepend(addGuarrantor(res.data, _current)).children().eq(0).values($.extend(res.data, {loanApplyId: args['loanApplyId']}));
				
				//循环绑定省市区下拉选择事件
				proBind(_current, [item['companyAddressPid'], item['companyAddressCid'], item['companyAddressRid']]);
				proBind("1_" + _current, [item['homeAddressPid'], item['homeAddressCid'], item['homeAddressRid']]);
				//|| args['documentFlowType'] == "2" || args['documentFlowType'] == "3" 文档流程可修改
				if(args['currentNodeKey'] == "LOAN_OFFICE_STAFF_BUDGET" || args['currentNodeKey'] == "LOAN_MODIFY_OFFICE_STAFF_BUDGET"){
					$("#getLoanGuarantorInfo").find("fieldset").attr("disabled",false); 
				}

				$("#guarantorModal").modal("hide"); 
				$("#getLoanGuarantorInfo").find(".guarranRecord").attr("readonly", true); 
			} 
		})

    }
};

handle_rGuarantor = function (value, row, index) {
    return ["<a href='javascript:;' class='xz'>选择</a>"].join("");
};

function addGuarrantor(item, i) {
	var tpl = "";
	var o = {
		title: ["", "担保人-" + item.guarantorName, "反担保人-" + (item.guarantorName || "")][item.guarantyRelationship] || "",
		index: i,
		sign: ["", "guarranRecord", ""][item.guarantyRelationship]
	};

	tpl = $("#tpl").html().replace(/{([\w \d]+)}/g, function(k0, k1){ return o[k1]; }); 
	return tpl;
}

var _current = 0, guarantyRelationship = 1, delteLoanGuarantor = null;

var oData = {};
if(location.href.indexOf("loanDetail.html") > 0){
	oData['projectId'] = args["projectId"]; 
	oData['callType'] = 1;
}else{
	oData['loanApplyId'] = args['loanApplyId']; 

	table_rGuarantor = function (params) {
		var p=params.data;
		comn.ajax({
			url: interUrl.myTask.relateLoanGuarantor,
			data: $.extend($("#searchGuarantor").values(), {loanApplyId: args['loanApplyId']},p),
			success: function (res) {
				params.success({
					'total': res.totalItem,
					rows: res.data
				});
				return params.complete();
			}
		});
	};
}

$(function () {
	//判断流程节点
	if(args['currentNodeKey'] == "LOAN_OFFICE_STAFF_BUDGET" || args['currentNodeKey'] == "LOAN_MODIFY_OFFICE_STAFF_BUDGET"){
		$("#btnGuarantor").removeClass("hide");
	}

	//搜索担保人信息
	$("#btn-guarantor-search2").click(function(){
		$("#table_rGuarantor").bootstrapTable('selectPage', 1);
	});
	$("#table_rGuarantor").bootstrapTable(tableConfig);

	comn.ajax({
		url: interUrl.gr.getLoanGuarantorInfo,
		data: oData,
		success: function(res){
			var data = res.data;
			for (var i = 0, len = data.length; i < len; i++) {
				_current++;
				var item = data[i];
				$("#getLoanGuarantorInfo").append(addGuarrantor(item, i)).children().eq(i).values($.extend(item, {loanApplyId: args['loanApplyId']})); 
				$("#getLoanGuarantorInfo").find(".guarranRecord").attr("readonly", true);
				
				//循环绑定省市区下拉选择事件
				proBind(i, [item['companyAddressPid'], item['companyAddressCid'], item['companyAddressRid']]);
				proBind("1_" + i, [item['homeAddressPid'], item['homeAddressCid'], item['homeAddressRid']]);

				//判断流程节点
				if(args['currentNodeKey'] == "LOAN_OFFICE_STAFF_BUDGET" || args['currentNodeKey'] == "LOAN_MODIFY_OFFICE_STAFF_BUDGET"){
					$("#getLoanGuarantorInfo").find("fieldset").attr("disabled",false); 
				}
			}
		}
	});

	//关联担保人
	$("#relationGuarantor").click(function(){
		guarantyRelationship = 1;
		$("#guarantorModal").modal("show"); 
	});

	//添加反担保人
	$("#addGuarantor").click(function(){
		guarantyRelationship = 2;

		comn.ajax({
			url: interUrl.gr.lauchLoanGuarantorInfo,
			data: {
				guarantyRelationship: guarantyRelationship,
				loanApplyId: args['loanApplyId']
			},
			success: function(res){
				_current++;
				var html = addGuarrantor({
					guarantyRelationship: guarantyRelationship,
					guarantorName: "添加",
					sign: ["", "guarranRecord", ""][guarantyRelationship]
				}, _current);

				$("#getLoanGuarantorInfo").prepend(html).children().eq(0).values($.extend(res.data, {guarantyRelationship: guarantyRelationship}));

				//循环绑定省市区下拉选择事件
				proBind(_current);
				proBind("1_" + _current);
			
				if(args['currentNodeKey'] == "LOAN_OFFICE_STAFF_BUDGET" || args['currentNodeKey'] == "LOAN_MODIFY_OFFICE_STAFF_BUDGET"){
					$("#getLoanGuarantorInfo").find("fieldset").attr("disabled",false); 
				} 
			}
		})


	});

	//保存
	$("#getLoanGuarantorInfo").on("click", ".btnSave", function(){
		var $form = $(this).parents("form");
		if($form.valid()){
			comn.ajax({
				url: interUrl.myTask.saveLoanGuarantorInfo,
				data: $.extend($form.values(),{
					guarantyRelationship: guarantyRelationship,
					loanApplyId: args['loanApplyId'],
					projectId: args['projectId'] || ""
				}),
				success: function(res){
					$form.values(res.data);
					tip({content: "保存成功！！"}); 
				}
			});
		}
	}).on("click", ".btnDelete", function(){
		//删除
		var $form = $(this).parents("form"), values = $form.values();
		if(values['id']){
			$("#deleteLoanGuarantor").modal("show");
			delteLoanGuarantor = function(){
				comn.ajax({
					url: interUrl.myTask.deleteLoanGuarantorInfo,
					data: values,
					success: function(res){
						_current--;
						$form.remove();
						$("#deleteLoanGuarantor").modal("hide");
						tip({content: "删除成功！！"}); 
					} 
				});
			};
		}else{
			$form.remove();
		}

	}).on("change", ".housingStatus", function(){
		var $el = $(this);
		var a = "<span class='text-danger'>*</span>";
		var c = $el.parents("form").find(".mortgageRepayment").eq(0);

		if($el.val()==1 || $el.val()==""){
			c.hide();
		}else if($el.val()==2){
			c.show().find("label").html(a+"月还款:");
		}else if($el.val()==3){
			c.show().find("label").html(a+"月租:");
		}else if($el.val()==4){
			c.show().find("label").html(a+"说明:");
		} 
	});

	$("#deleteBtnSure").click(function(){
		if(typeof delteLoanGuarantor == "function"){
			delteLoanGuarantor(); 
		} 
	});

});

