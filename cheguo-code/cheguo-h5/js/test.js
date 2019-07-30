var g_auth_id = "YBQ+1meBQ/046giLfA2/kkVmWiK/nFYVnc9WDgXHlbTH3cbdJR1HOQ==";
$(function() {
	//	登陆
	$("#login").click(function(){
		//var MattsRSAkey = "131373616571520094845254466361397303345781936455890783427136319554431241160443855979710560755859359421700606979274750033884647345446937468267736165664040853622207217214110254795257760534517064122958973618437189472071402213068500185242329857603778904835640534830864360841505853004031084332104752212643706023763"; 
		//var key   = new RSAKeyPair("10001", '', rsa_n, 64);
		var rsa = new RSAKey();
		rsa.setPublic("bb150dad804fbf7f71223ca1a239cf848324bcf52314022b6545372395e7f165854191f5b77f3e90d5d15b618d8c709a06da5174dc890417f710c6aed0c7b9f346b37c39fc65c054067dd1ce6db45b237f859ddb01fc625ad278dc9b61c6126c254d3a3e4f1748f1d60d5cfdf5beea643c3e8b1e631498d0f7836166a3c7af53", "10001");
		var pwd = rsa.encrypt($("#pwd").val());
		$.ajax({
			url: "/user/login",
			type: "POST",
			data: {
				"uname":$("#uname").val(),
				"pwd":pwd
			},//15957120196
			success: function(res) {
				if(res.code==10000){
					alert("登陆成功.");
					g_auth_id = res.data;
				}else{
					alert(res.message);
				}
				//test1();
			}
		});
	});
	
	$("#test").click(function(){
		$.ajax({
			url: $("#url").val(),
			type: "POST",
			data: $("#params").val(),
			headers:{
	              "Auth-Id": g_auth_id
	        },
			success: function(res) {
				$("#result").html(JSON.stringify(res));
			}
		});
		//test5();
	});

	$("#upload").click(function(){
		test5();
	});
});

//$.extend()
//测试贷款发起：
//	1、loan_apply	贷款申请信息
//	2、loan_project_info		贷款项目信息
//	3、loan_customer_info	贷款客户信息
//	4、business_object_process_info		流程初始化
function test1(){
	var data = {};
	//data["loanApplyId"] = 217;
	data["creditId"] = 396;
	data["mobilePhone"] = "15158110387";
	data["businessTypeId"] = 1;
	data["carBrand"] = "002";
	data["carBrandName"] = "阿斯顿·马丁";
	data["carMake"] = "002001002";
	data["carMakeName"] = "V12 Vantage";
	data["carModel"] = "002001002";
	data["carModelName"] = "2015款 6.0L S";
	data["dealerId"] = 70;
	data["dealerName"] = "听启用车行";
	data["billingPrice"] = 90000;
	data["loanAmount"] = 40000;
	data["loanTerm"] = 2;
	data["handingFee"] = 13;
	data["repaymentAmount"] = 4500;
	data["visitAddressPid"] = "130000";
	data["visitAddressPname"] = "河北省";
	data["visitAddressCid"] = "130100";
	data["visitAddressCname"] = "石家庄市";
	data["visitAddressRid"] = "130128";
	data["visitAddressRname"] = "深泽县";
	data["visitAddressDetail"] = "河北省石家庄市深泽县钟楼路";
	data["visitAddressLongitude"] = 115.206288;
	data["visitAddressLatitude"] = 38.191365;
	data["realAddressPid"] = "130000";
	data["realAddressPname"] = "河北省";
	data["realAddressCid"] = "130100";
	data["realAddressCname"] = "石家庄市";
	data["realAddressRid"] = "130128";
	data["realAddressRname"] = "深泽县";
	data["realAddressDetail"] = "河北省石家庄市深泽县钟楼路";
	data["realAddressLongitude"] = 115.206288;
	data["realAddressLatitude"] = 38.191365;

	$.ajax({
		url: "/loanApply/save",
		type: "POST",
		data: data,
		success: function(res) {
			if(res.code = "10000"){
				alert($.parseJSON(res.data));
			}else{
				alert(res.message);
			}
		}
	});
}

//	测试贷款详情
function test2(){
	$.ajax({
		url: "/mytasks/get",
		type: "POST",
		data: {
			"businessId":218,
			"businessTypeCode":"LOAN_APPLY_FLOW"
		},
		success: function(res) {
			if(res.code = "10000"){
				alert($.parseJSON(res.data));
			}else{
				alert(res.message);
			}
		}
	});
}

//	测试获取文档目录
function test3(){
	$.ajax({
		url: "/loanDocument/getTreeApprovalDocumentDir",
		type: "POST",
		data: {
			"releventFlow":"LOAN_APPLY_FLOW",
			"releventFlowNode":"LOAN_LAUNCH",
			"loanApplyId":220,
			"docType":"1"
		},
		success: function(res) {
			if(res.code = "10000"){
				alert($.parseJSON(res.data));
			}else{
				alert(res.message);
			}
		}
	});
}

//	测试上传文件
function test5(){
	var data = {};
	data["loanApplyId"] = 406;
	data["dirId"] = 10102;

	var array = new Array();
	for(var i = 0;i < 5;i++){
		var file = {};
		file["fileName"] = "1.jpg";
		file["filePath"] = "/hx/dq/zj/hz/xhq/1.jpg";
		file["fileType"] = "1";
		file["fileSize"] = 100;
		array.push(file);
	}

	eval("data.loanDocuments = array");
	//var docs = $.parseFromString(data);

	$.ajax({
		url: "/loanDocument/uploadFile",
		type: "POST",
		data: {
			"data":JSON.stringify(data),
			"fileNamespaceStr":"LOAN",
			"releventFlow":"LOAN_APPLY_FLOW",
			"releventFlowNode":"LOAN_BILL_RESEARCH"
		},
		headers:{
			"Auth-Id": g_auth_id
		},
		success: function(res) {
			alert(0);
			if(res.code == "10000"){
				alert($.parseJSON(res.data));
			}else{
				alert(res.message);
			}
		}
	});
}

//  测试删除文件
function test6(){
	$.ajax({
		url: "/loanDocument/deleteFile",
		type: "POST",
		data: {
			"documentIds":"591,592"
		},
		success: function(res) {
			if(res.code = "10000"){
				alert(res);
			}else{
				alert(res.message);
			}
		}
	});
}

//  测试获取文件列表
function test7() {
	$.ajax({
		url: "/loanDocument/getDocuments",
		type: "POST",
		data: {
			"loanApplyId": 220,
			"dirId": 7
		},
		success: function (res) {
			if (res.code = "10000") {
				alert(res);
			} else {
				alert(res.message);
			}
		}
	});
}
