var args,dataLoad_1,handle_1,CustomerLoad, loanVal, messageCheck, selectCheck, _data;
args = comn.getArgs();
if(window.parent.cache.emailList != "" && window.parent.cache.emailList != null){
	_data = jQuery.parseJSON(window.parent.cache.emailList);
}
$(function() {
	$("select[name='expressCompanyCode']").change(function(){
		if(this.value == "NONE"){
			$("#billNoItem").addClass("hidden").find("input").val("");
		}else{
			$("#billNoItem").removeClass("hidden");
		}
	
	});
	if(_data != null && _data != ""){
		$("#table1").bootstrapTable("append", _data);
		$("input[name='recipient']").val(_data[0].orgName);
		comn.ajax({
			url: interUrl.common.orgInfo,
		    data: {orgId:_data[0].orgId},
		    success: function(res) {
				$("input[name='recipientAddr']").val((res.data.addrProvinceName || "") + (res.data.addrCityName || "") + (res.data.addrAreaName || "") + res.data.addrDetail || "");
				$("input[name='sender']").val(comn.user.realname);
				$("input[name='senderMobile']").val(comn.user.username);
		    }
		});
	}else {
		var billId = args["billId"];
		var type = args["type"];
		if(type == "show"){
			$("#ok").addClass("hide");
			$("#disable_form").attr("disabled","true");
			$("#textHtml").html("快递单查看");
		}else {
			$("#textHtml").html("快递单修改");
		}
		comn.ajax({
		    url: interUrl.mockList || interUrl.documentManagement.getExpress,
		    data: {billId:billId},
		    success: function(res) {
			  //$("#editForm").values(res.data);
			  $("input[name='billNo']").val(res.data.billNo); 
			  $("select[name='expressCompanyCode']").val(res.data.expressCompanyCode); 
			  $("input[name='recipientAddr']").val(res.data.recipientAddr); 
			  $("input[name='recipient']").val(res.data.recipient); 
			  $("input[name='sender']").val(res.data.sender || comn.user.realname);
		      if(res.data.sendTime != "" && res.data.sendTime != null){
			      $("input[name='sendTime']").val(res.data.sendTime.substr(0,10)); 
		      }
		      $("input[name='senderMobile']").val(res.data.senderMobile || comn.user.username);
			  $("select[name='expressCompanyCode']").trigger("change");
		    }
		});
		comn.ajax({
		    url: interUrl.mockList || interUrl.documentManagement.expressList,
		    data: {billId:billId},
		    success: function(res) {
		      console.log(res);
		      $("#table1").bootstrapTable("append", res.data);
		    }
		});
	}
});

handle_1 = function(value, row, index) {
	if(row['fileSended'] && (row['fileSended'] & 16) == 16)return "已发";
	var fileList = "";
	if(row['fileList'] && (row['fileList'] & 16) == 16){
		fileList = " checked='true' ";
	}
	return ["<input type='checkbox' class='check1' data-documentDeliverId='"+row['id']+"'"+fileList+" value='16'/>"].join("");
};

handle_2 = function(value, row, index) {
	if(row['fileSended'] && (row['fileSended'] & 8) == 8)return "已发";
	var fileList = "";
	if(row['fileList'] && (row['fileList'] & 8) == 8){
		fileList = " checked='true' ";
	}
	return ["<input type='checkbox' class='check2' data-documentDeliverId='"+row['id']+"'"+fileList+" value='8'/>"].join("");
};

handle_3 = function(value, row, index) {
	if(row['fileSended'] && (row['fileSended'] & 4) == 4)return "已发";
	var fileList = "";
	if(row['fileList'] && (row['fileList'] & 4) == 4){
		fileList = " checked='true' ";
	}
	return ["<input type='checkbox' class='check3' data-documentDeliverId='"+row['id']+"'"+fileList+" value='4'/>"].join("");
};
$("#expressCompanyCode").getExpressCompanyCode();
$("#ok").click(function() {
	if($("#editForm").valid()){
		var data;
		data = $("#editForm").values();
		var expressCompany=$('select[name="expressCompanyCode"] option:selected').text();
		data["expressCompany"] = expressCompany;
		data["recipientType"] = 1; // recipientType	 收件组织类型(2:公司，1：银行)
		var chks =$("#table1").find("input:checked");
        var trDataList =$("#table1 tr");
        var trData = null;
        var checkedBool = false;
        var checkedInput = false;
        var fileSended = 0;
        var billId = args["billId"];
        var basicUrl = interUrl.documentManagement.addExpress;
        for(var i = 1; i < trDataList.length; i ++ ){
        	trData = trDataList[i];
        	$(trData).find("input").each(function(){
        		if(this.checked){
        			checkedBool = true;
        			checkedInput = true;
		        	data['list['+(i-1)+'].documentDeliverId'] = $(this).data("documentdeliverid");
				    fileSended = fileSended + parseInt(this.value);
        		}
        	});
        	if(checkedInput){
        		checkedInput = false;
        		data['list['+(i-1)+'].fileList'] = fileSended;
        		fileSended = 0;
        	}
        }
        if(!checkedBool){
        	$("#dialog").modal('show');
        	return;
        }
        if(billId){
        	basicUrl = interUrl.documentManagement.saveExpress;
        	data['id'] = billId;
        }
		return comn.ajax({
			url: basicUrl,
			data: data,
			success: function(res) {
				tip({
					content: billId?"修改成功!":"发件成功!"
				});
				window.parent.cache.emailList="";
				return window.parent.toUrl({
			        url: "./Modal/documentManagement/sendManageBank/index.html"
			    });
			}
		});
	}
});
$("#cancel").click(function() {
	return window.parent.toUrl({
		url: "./Modal/documentManagement/sendManageBank/index.html"
	});
});
