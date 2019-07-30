//在线支持-我的提问
var args,statusDetail;
args=comn.getArgs();
statusDetail=args['stauts'];


$(function () {
	//load branch company list
	comn.ajax({
	    url: 'organization/brachCompany',
	    data: {},
	    success: function (res) {
	        if (res && res.code == 10000) {
	            var htmlArr = ['<option value="">请选择</option>'];
	            for (var i = 0; i < res.data.length; i++) {
	                htmlArr.push('<option value="' + res.data[i].name + '">' + res.data[i].name + '</option>');
	            }
	            $('.branch-company-list').html(htmlArr.join(''));
	            $('.branch-company-list1').html(htmlArr.join(''));
	        }
	        if (res && res.code == 20000) {
	            alert('系统繁忙，请稍后重试！');
	        }
	    }
	});
	
	
	//load message list
	$('#btn-search').on('click', function () {
	    $("#todo").bootstrapTable('selectPage', 1);
	});

});

function table_1(params) {
//	var roleName=$('#roleNameSearch').val().replace(/\s/gi,'');
//	$('#roleNameSearch').val(roleName);
	if(statusDetail == 2){
		$('#status').val(2);
	}
    var p = params.data;
    comn.ajax({
        url: "clsFeedbackAdmin/stayReplyList",
        data: $.extend($("#message-form").values(), p),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            return params.complete();
        }
    });
};

function status(status) {
	$('#status').val(status);
	$('#btn-search').trigger('click');  
};

function handle_status(value, row, index) {
    console.log('value:' + value);
    if(value=="1"){
    	return "数据错误";
    }else if(value=="2"){
    	return "系统需求";
    }else if(value=="3"){
    	return "系统问题";
    }
};

handle_1= function(value, row, index){
	return "<a class='title' href='javascript:;'>"+value+"</a>";
}
tableEvent_1 = {
	    "click .title": function (a, val, item, index) {
	       comn.addTab({href: './Modal/messageBoardManage/messageBoard/myDetail.html?id='+item['id'], title: '查看详情'})
	    }
}
