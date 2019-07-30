var handle, dataLoad_1, tableEvent, loanSection, args = comn.getArgs(),
linkType = args["type"];
handle = function(value, row, index) {
	var modifyMenu = row.creditStatus == 0 ? "<li><a class='change'>查看</a></li>": "";
	return ["<div class='btn-group btn-group-xs' text-center>", "<button type='button' class='btn btn-primary' id='del'>移除", "</button>", "</div>"].join("");
};

loanSection = function(value, row, index) {
	return (parseFloat(row.loanQuotaLow) / 10000).toFixed(4) + "-" + (parseFloat(row.loanQuotaHigh) / 10000).toFixed(4);
}

tableEvent = {
	"click #del": function(e, a, item, index) {
		var ids = item['id'];
		$("#tipText").text("确定要删除吗?");
		$("#sureModal").modal("show");
		$("#sureBtn").unbind("click").on("click", function() {
			return comn.ajax({
				url: interUrl.flowControl.flowDel,
				data: {
					ruleId: item['id']
				},
				success: function(res) {
					tip({
						content: "删除成功!!"
					}); 
					$("#sureModal").modal("hide");
					$("#table1").bootstrapTable("removeByUniqueId", ids);
				}
			});
		});
	}
};

var operationList = null;
$(function() {
	$(document).on("change", "#flowList", function() {
		$("#nodeList").getFlowNode(this.value);
		operationList();
	});

	$(document).on("change", "#company", function() {
		$("#operatorId").html("<option value=''>--请选择--</option>");
		var code = $(this).find("option:selected").data("code");
		$("#coBankId").getBankCompany(this.value, function(){
            $('.selectpicker').selectpicker('refresh');
		});
		if(code != "ZADB"){
			$("#group").getGroup_comp(this.value, "-2", function(){
                $('.selectpicker').selectpicker('refresh');
			});
		} else{
			var code = $("#company").find("option:selected").data("code");
			//var o = $("#searchForm").values();
			$("#group").html("<option value='-2'>--所有业务组--</option>");
            $("#group").selectpicker('refresh');
            $("#group").selectpicker('val', '-2');
			$("input[name=businessGroupName]").val("--所有业务组--");
            var o = returnDate();
            o.flag = code == "ZADB" ? 1 : 0;
            $("#operatorId").getFlowOperator_new(o);
        }
	});

	$(document).on("change", "#nodeList, #group", function() {
		operationList();
	});

	//select变动时，将获取的值付给隐藏input
	$(document).on("change", "select", function() {
		var text = $(this).find("option:selected").text();
		if (text === "--请选择--") {
			text = "";
		}
		$(this).parent().find("input[type='hidden']").val(text);
	});
	url = interUrl.flowControl.flowAdd;

	if (args['id']){
		$("#add").text("修改");
		url = interUrl.flowControl.flowModify;
		get_data(args['id'], function(res){  // 获取详情 
			var resouce = res.data;
            $("#searchForm").values(res.data);
			$("#flowList").flowGet(resouce.businessTypeCode);
			$("#nodeList").getFlowNode(resouce.businessTypeCode, resouce.nodeCode);
			$("#company").getBranchAndGroup_comp('', resouce.companyId);
			$("#coBankId").getBankCompany(resouce.companyId, resouce.coBankId ? resouce.coBankId.split(",") : '', function(){
                $('.selectpicker').selectpicker('refresh');
			});
			if(resouce['companyId']){
				var code = $("#company").find("option:selected").data("code");
				resouce.flag = code == "ZADB" ? 1 : 0;
				$("#operatorId").getFlowOperator_new(resouce, resouce.operatorId);
				setTimeout(function(){
					$("#group").getGroup_comp(resouce.companyId, resouce.businessGroupId ? resouce.businessGroupId.split(",") : '', function(){
                        $('.selectpicker').selectpicker('refresh');
					});
                    $("#loanType").selectpicker('val', resouce.loanType ? resouce.loanType.split(",") : '');
                    $("#cars").selectpicker('val', resouce.carTypeKey ? resouce.carTypeKey.split(",") : '');
				},250);
			}
			operationList = function(type) {
				var code = $("#company").find("option:selected").data("code");
				//var o = $("#searchForm").values();
                var o = returnDate();
				o.flag = code == "ZADB" ? 1 : 0;
				if(o['companyId']){
					o.businessGroupId = o.businessGroupId || "-2";
					o.businessGroupName = o.businessGroupName || ""; 
					$("#operatorId").getFlowOperator_new(o, resouce.operatorId); 
				} 
			}
		}); 
	}else{
		//获取流程节点下拉列表
		$("#flowList").flowGet();
		//获取公司业务组下拉列表
		$("#company").getBranchAndGroup_comp(); 
		operationList = function(){
			var code = $("#company").find("option:selected").data("code");
			var o = returnDate();
            // var o = $("#searchForm").values();
            // o.businessGroupId = o.businessGroupId || "-2";
            // o.businessGroupName = o.businessGroupName || "";
			o.flag = code == "ZADB" ? 1 : 0;
			if(o['companyId']){
				$("#operatorId").getFlowOperator_new(o); 
			}
		}
	}

	$("#add").click(function(){ //修改和添加时调用
		var priority = $("#priority").val(); //优先级
		var toDoCount = $("#toDoCount").val(); //待办量
		if (priority === "" && toDoCount) {
			return tip({content: '请输入优先级!'});
		}
        if (toDoCount === "" && priority) {
            return tip({content: '请输入待办量!'});
        }
		if($("#searchForm").valid()){
            var o = returnDate();
			comn.ajax({
				url: url,
				data: o,
				success: function(res) {
					tip({ content: args['id'] ? "修改成功!" : "添加成功!" });
					if(!args['id']){ //添加 
						o['id'] = res.data;
						url = interUrl.flowControl.flowModify;
						$("#add").text("修改");
						$("#tableShell").removeClass("hidden");
						$("#table1").bootstrapTable("insertRow", {
							index: 0,
							row: o
						}); 
						args['id'] = res.data;
						$("#id").val(res.data);
						return;
					}
					$("#table1").bootstrapTable("updateRow", {
						index: 0,
						row: o
					});
					//window.parent.toUrl( { url:'./Modal/task/flowControl/nodeControlChange.html?type=modify' });
				}
			});
		}
	});

	if(linkType === "show"){
		$("#add").hide();
		$("fieldset").attr("disabled", "true"); 
	}
});
function returnDate(){
    var businessGroupNames = [], carTypeNames = [], coBankNames = [];
    $("#group").find("option:selected").each(function() {
        businessGroupNames.push($(this).text())
    });
    $("#cars").find("option:selected").each(function() {
        carTypeNames.push($(this).text())
    });
    $("#coBankId").find("option:selected").each(function() {
        coBankNames.push($(this).text())
    });
    var o = $("#searchForm").values();

    o.businessGroupId = $("#group").val() ? ($("#group").val()).join(",") : "-2";
    o.businessGroupName = businessGroupNames ? businessGroupNames.join(",") : "--所有业务组--";

    o.carTypeKey = $("#cars").val() ? ($("#cars").val()).join(",") : '';
    o.carTypeName = carTypeNames ? carTypeNames.join(",") : "";

    o.coBankId = $("#coBankId").val() ? ($("#coBankId").val()).join(",") : '';
    o.coBankName = coBankNames ? coBankNames.join(",") : "";

    o.loanType = $("#loanType").val() ? ($("#loanType").val()).join(",") : "";
    return o;
}
function get_data(data, callback) { //获取数据 
	comn.ajax({
		url: interUrl.flowControl.flowSee,
		data: {
			ruleId: data
		},
		success: function(res) {
			callback(res);
			$("#table1").bootstrapTable("insertRow", {
				index: 0,
				row: res.data
			});
		}
	})
}

$.getCommonMethodPort([['#loanType','LoanType','','-1']]);