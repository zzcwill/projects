var args, loan, URL;
args = comn.getArgs();   //获取url的方法
URLType = function(_fun){    //URL始化信息处理
	var type = args["type"];
	args['space'] = 'SECONDHAND_CAR';
	if(args['action']=='start'){
		$("#opinionFlowLi").hide();
	}
	if(type == '1'){    //二手车发起评估
		var title = args['currentNodeName'] || '发起二手车评估';
		$("#title").html(title);
		$("#tohref").html('发起评估');
		if(type == '1' && !args["hi"]){
			$("#tab2").attr("href","javascript:;").addClass("tsbtn");
		};
		if(type == '1' && args["id"]){
			$("#tab2").attr("href","#done").removeClass("tsbtn");
		};
		_fun(args);
	}else if(type == '3'){             //二手车过户
		var title = args['currentNodeName'] || '过户信息录入';
		$("#title").html(title);
		$("#tohref").html('过户信息录入');
		_fun(args);
	}else if(type == '4'){
		var title = args['currentNodeName'] || '二手车初评';
		$("#title").html(title);
		$("#tohref").html('初评登记');
		_fun(args);
	}else if(type == '5'){
		var title = args['currentNodeName'] || '二手车复评';
		$("#title").html(title);
		$("#tohref").html('复评登记');
		_fun(args);
	}else if(type == '6'){
		var title = args['currentNodeName'] || '过户审批';
		$("#title").html(title);
		$("#tohref").html('基本信息');
		_fun(args);
	}else if(type == '7'){
		var title = args['currentNodeName'] || '评估报告录入';
		$("#title").html(title);
		$("#tohref").html('基本信息');
		_fun(args);
	} else if (type == 'ownersStaging'){
        $("#tohref").html('基本信息');
        _fun(args);
    }
};
