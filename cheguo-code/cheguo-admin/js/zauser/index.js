/**
 * User: Lijunjun
 * Mail: 370984694@qq.com
 * Time: 11/21
 */

$(function () {
	$.fn.getHZOrg = function() {
	  comn.ajax({
	    url: "za/user/thirdCooperation/list",
	    data: {},
	    success: (function(_this) {
	      return function(res) {
	        var j, len, o, ref, str;
	        str = "<option value=''>--请选择--</option>";
	        ref = res.data;
	        for (j = 0, len = ref.length; j < len; j++) {
	          o = ref[j];
	          str += "<option value='" + o.codeId + "'>" + o.codeName + "</option>";
	        }
	        return $(_this).html(str);
	      };
	    })(this)
	  });
	  return this;
	};
	
    //load user list
    $('#btn-search').on('click', function () {
        $("#todo").bootstrapTable('selectPage', 1);
    });
    
    $("#externalAssetsPartnerId").getHZOrg();
    $("#externalAssetsPartnerId").change(function(){
    	var t = $(this).find("option:selected").text();
    	var text = t == "--请选择--" ? "" : t
    	$("input[name='externalAssetsPartnerName']").val(text);
    });
    $("#level").on("change", function(){
    	if(this.value == "50"){
    		$(".externalAssets").removeClass("hide");
    	}else{
    		$(".externalAssets").addClass("hide");
    	}    	
    });

   // $("#orgCompanyId").getOrg();
    //add new user
    $('.add-new-user').on('click', function () {
        //init data
        window.addedRoles = [];
        window.mode = 'add';
        resetDialog();
    });
    //load branch company list
    comn.ajax({
        url: 'organization/brachCompany',
        data: {},
        success: function (res) {
            if (res && res.code == 10000) {
                var htmlArr = ['<option value="">请选择</option>'];
                for (var i = 0; i < res.data.length; i++) {
                    htmlArr.push('<option value="' + res.data[i].id + '">' + res.data[i].name + '</option>');
                }
                $('.branch-company-list').html(htmlArr.join(''));
                $('.branch-company-list1').html(htmlArr.join(''));
            }
            if (res && res.code == 20000) {
                alert('系统繁忙，请稍后重试！');
            }
        }
    });

  //load department list
    $('.branch-company-list').on('change', function () {
        var companyId = $(this).val();
        var self = this;
        if(companyId==''){
        	companyId='-1';
        }
        comn.ajax({
            url: 'organization/department',
            data: {
                companyId: companyId
            },
            success: function (res) {
                if (res && res.code == 10000) {
                    var htmlArr = ['<option value="">请选择</option>'];
                    for (var i = 0; i < res.data.length; i++) {
                        htmlArr.push('<option value="' + res.data[i].id + '">' + res.data[i].name + '</option>');
                    }
                    $(self).closest('form').find('.department-list').html(htmlArr.join(''));
                }
                if (res && res.code == 20000) {
                    alert('系统繁忙，请稍后重试！');
                }
            }
        });
        
    });
    
    //select common event
    $('select').on('change', function () {
        //set hidden input
        $(this).siblings('input[type="hidden"]').val($(this).find("option:selected").text());
    });

    //load bz group list
    $('#orgCompanyId').on('change', function () {
    	$('#orgCompanyName').val($('#orgCompanyId option:checked').text());
        var v = $(this).val();
        if (!v) {
            console.log('no select value found');
            return;
        }
        comn.ajax({
            url: 'organization/group',
            data: {
                companyId: v
            },
            success: function (res) {
                if (res && res.code == 10000) {
                    var htmlArr = ['<option value="">请选择</option><option value="-2">所有业务组</option>'];
                    
                    //当公司为集团时，业务组下拉框只显示所有业务组，具体业务组不显示
                    if(res.message!='HEAD_COMPANY'){
                    	for (var i = 0; i < res.data.length; i++) {
                            htmlArr.push('<option value="' + res.data[i].id + '">' + res.data[i].name + '</option>');
                        }
                    }
                    $('.setauth-form .bz-group-list').html(htmlArr.join(''));
                }
                if (res && res.code == 20000) {
                    alert('系统繁忙，请稍后重试！');
                }
            }
        });
        
    });

    //add new role
    $('#J_add_new_role').on('click', function () {
    	var data = $('#Dialog_about_user .setauth-form').values();
        var businessGroupId =$("#businessGroupId").find("option").length;
        
//        if(data.businessGroupId==-2 && businessGroupId<3){
//    		alert('该机构无业务组！');
//    		return;
//    	}
        if(data.businessGroupId==''){
        	data.businessGroupId=-2;
        	data.businessGroupName='所有业务组';
        }
        for (var prop in data) {
            if (!data[prop]) {
                alert('公司，业务组，角色都是必填项');
//                console.log('wrong role:', data);
                return;
            }
        }
        
        var uuid = data.companyId + data.businessGroupId + data.roleId;
        data.uuid = uuid;
        //check if exist
        for (var i = 0; i < window.addedRoles.length; i++) {
            var item = window.addedRoles[i];
            if (item.uuid == uuid) {
                alert('该角色已添加!');
                return;
            }
            //to do
        }
        
        //if user customerManager  true only one 
        if(data.roleName=='客户经理' || data.roleName=='虚拟客户经理'){
        	if(data.businessGroupId==-2){
        		alert('客户经理或虚拟客户经理只能有一个,不能选所有业务组！');
        		return;
        	}
        	for(var i=0;i<window.addedRoles.length;i++){
        		var item = window.addedRoles[i];
        		if(data.roleId==item.roleId){
        			alert('客户经理只能有一个，已添加！');
        			return;
        		}
        	}
    	    $('#bzGroupId').val(data.businessGroupId)  ;
    	    $('#bzGroupName').val(data.businessGroupName)    ;
        }
        
        //if -2 exist ,delete date with same companyId+roleId
        if(data.businessGroupId == -2){
        	resetAddedRoles(data);
        }else{
        	for(var i=0;i<window.addedRoles.length;i++){
        		var item = window.addedRoles[i];
        		if((item.companyId+''+item.roleId)==(data.companyId+''+data.roleId ) && item.businessGroupId==-2){
        			alert('该公司角色已选择所有业务组，请选择其他角色！');
        			return;
        		}
        	}
        }
        
        //added
        window.addedRoles.push(data);
        console.log('already added roles:', data);

        //render html
        renderAddedRoles();
    });

    //cancel a role
    $('.added-roles').on('click', '.cancel', function () {
        var uuid = $(this).closest('tr').attr('uuid');
        if (!uuid) {
            return;
        }
        var newarr = [];
        for (var i = 0; i < window.addedRoles.length; i++) {
            var item = window.addedRoles[i];
            if (item.uuid != uuid) {
                console.log('not him,good');
                newarr.push(item);
            }
        }
        //reset cached added roles
        window.addedRoles = newarr;
        renderAddedRoles();
    });

    //add user
    $('#Dialog_about_user').on('click', '.save', function () {
        if ($(".basicinfo-form").valid() == false)
            return;
        var data = $('#Dialog_about_user .basicinfo-form').values();
        var  itemTemp=window.addedRoles;
        data.userRoleList = window.addedRoles;
        
        //****************去掉文本框空格
        data.username=data.username.replace(/\s/gi,'');
        data.realname=data.realname.replace(/\s/gi,'');
        data.addrDetail=data.addrDetail.replace(/\s/gi,'');
        data.email=data.email.replace(/\s/gi,'');
        
        var shouij = /^1[3,4,5,6,7,8,9]\d{9}$/; //手机格式
        var zuoji = /^(\d{3,4}\-)?\d{7,8}$/i;   //座机格式
        //if(!data.username){
       	//    alert('登陆账号字段不能为空！');
        //    return;
        //} else if(shouij.test(data.username) || zuoji.test(data.username) ){
        // }
//        else{
//        	alert('登录账号字段为手机号，手机号填写有误！');
//            return;
//        }
        if(!data.realname){
      	   alert('用户姓名字段不能为空！');
           return;
        }else if(data.realname.length>20){
           alert('用户姓名长度5个字符内！');
           return;
        }
        if(!data.companyId){
      	    alert('请选择所属公司！');
           return;
        }
        if(!data.departmentId || data.departmentId=='-1'){
      	    alert('请选择所属部门！');
           return;
        }
        if(data.email){
        	var reyx= /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        	if(!reyx.test(data.email)){
        		alert('邮箱格式不正确！');
        		return;
        	}
        	if(data.email.length>30){
        		alert('邮箱长度少于30位！');
        		return;
        	}
        }
        if(data.addrDetail && data.addrDetail.length>50){
        	alert('详细地址长度少于50位！');
    		return;
        }
        
      //获取用户系统权限
        var systype = "";
        $('input[name="sys_type"]:checked').each(function(i){
        	systype += $(this).attr('sys_value') + "/";
        });
        if(systype.length <= 0){
        	alert("用户系统权限不能为空。");
        	return;
        }
        if(systype.length>0){
        	systype = systype.substr(0, systype.length - 1)	
        }
       
        //if role   costomerManager exist 
        var flagCustomerMag=0;
        var groupIdTemp = data.bzGroupId;
        var bzGroupName = data.bzGroupName;
        for(var i=0;i<data.userRoleList.length;i++){
        	var item = data.userRoleList[i];
        	if(item.roleName=='客户经理' || item.roleName=='虚拟客户经理' || item.roleName=='加盟业务员'){
        		data.bzGroupId = item.businessGroupId;
        		data.bzGroupName = item.businessGroupName;
        		flagCustomerMag=1;
        		break;
        	}else{
        		data.bzGroupId = -1;
        		data.bzGroupName = '暂无';
        	}
        }
        data.sysType = systype;
        
        var flagLevel=data.level;
        if(flagLevel==10){
        	if(flagCustomerMag!=1 || data.userRoleList.length==0){
        		alert('用户级别为【个人级】，必须分配【客户经理】角色');
        		return;
        	}
        }
        
//        console.log('inserting user and userrole:');
//        console.log(data);
        var url='za/user/add';
        if(window.mode == 'modify'){
            url='za/user/update';
        }
        console.log('ajax canceled!!!');
        console.log(data)
//        return;
        data.companyName=$('#companyId option:selected').text();
        comn.ajax({
            url: url,
            data: {
                "data": JSON.stringify(data)
            },
            success: function (res) {
                if (res && res.code == 10000) {
                    alert('操作成功！');
                    $('#Dialog_about_user').modal('hide');
                }
                if (res && res.code == 20000) {
                    alert('操作失败！');
                }
                $('#btn-search').trigger('click');  
                console.log(res);
            }
        });
    });
    
    //common
    $("#province_1").getProvince().change(function () {
        if (this.value) {
            $("#area_1").val("");
            return $("#city_1").getCity(this.value).unbind("change").change(function () {
                if (this.value) {
                    return $("#area_1").getArea(this.value);
                }
            });
        }
    });
});



//tool functions
function resetDialog() {
    if (window.mode == 'add') {
    	document.getElementById("username").readOnly=false;
        $('#Dialog_about_user .modal-header .modal-title').html('创建用户');
    }
    if (window.mode == 'modify') {
        document.getElementById("username").readOnly=true;
        document.getElementById("realname").readOnly=true;
        $('#Dialog_about_user .modal-header .modal-title').html('修改用户');
    }
    
    //load role list if necessary
    var len = $('#Dialog_about_user .role-list option').length;
    if(len < 3){
        comn.ajax({
            url: 'za/role/list',
            data: {
                page: 1,
                pageSize: 500
            },
            success: function (res) {
                if (res && res.code == 10000) {
                    var htmlArr = ['<option value="">请选择</option>'];
                    for (var i = 0; i < res.data.length; i++) {
                        htmlArr.push('<option value="' + res.data[i].id + '">' + res.data[i].name + '</option>');
                    }
                    $('#Dialog_about_user .role-list').html(htmlArr.join(''));
                }
                if (res && res.code == 20000) {
                    alert('系统繁忙，请稍后重试！');
                }
            }
        });
    }
    //reset added roles
    $('#Dialog_about_user .added-roles tbody').html('');

    //reset form values
    $('#Dialog_about_user').find('input,select').val('');

}

function resetAddedRoles(data)	{
	var newAddedRoles = [],key= ''+data.companyId+data.roleId;
	
	for(var i=0;i<window.addedRoles.length;i++){
		var item = window.addedRoles[i];
		if((item.companyId+''+item.roleId) != key){
			newAddedRoles.push(item);
		}
	}
	window.addedRoles = newAddedRoles;
}

function renderAddedRoles() {
    $('#Dialog_about_user .added-roles tbody').html(template('temp-added-role', {list: window.addedRoles}));
}

function table_1(params) {
    var p = params.data;
    comn.ajax({
        url: "za/user/list",
        data: $.extend($("#user-form").values(), p),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            return params.complete();
        }
    });
};

function handle_1(value, row, index) {
    console.log('value:' + value);
    var string = "";
    //modify for OA, 不再停用启用操作 2018-07-24 liuxiongfeng    2018-08-14  open Stop and start
    if(row.status == "NORMAL"){
    	string = "<li><a class='forbid'>停用</a></li>";
    }else if(row.status == "DEAD"){
    	string = "<li><a class='enable'>正常</a></li>";
    }
    return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary'>操作</button>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='modify'>修改</a></li>", "<li><a class='resetpwd'>重置密码</a></li>", string, "</ul>", "</div>"].join("");
};

function handle_status(value, row, index) {
    console.log('value:' + value);
    if(value=="NORMAL"){
    	return "正常";
    }else if(value=="DEAD"){
    	return "停用";
    }
};

tableEvent_1 = {
    "click .modify": function (a, val, item, d) {
       //console.log('modifying user:',item);
        
        //init data
        window.addedRoles = [];
        window.mode = 'modify';
        resetDialog();
        // 清空选中用户系统权限用户系统权限""
        $('input[name="sys_type"]').each(function(){
        	$(this).removeAttr("checked");
        });
        $("#externalAssetsPartnerId").val(item.externalAssetsPartnerId);
        // 初始化"用户系统权限"
        var systype = item.sysType;
        //判断
        if (typeof(systype) != "undefined"){
        	if(systype.length>0){
        		var arr = systype.split("/");
                for(i in arr){
                    $('input[name="sys_type"]').each(function(){
                    	if($(this).attr('sys_value') == arr[i]){
                    		$(this).attr("checked",'true');
                    	}
                    });
                }
        	}
        }
        //load department list
        $('.branch-company-list').unbind("change").on('change', function () {
            var companyId = $(this).val();
            var self = this;
            if(companyId==''){
            	companyId='-1';
            }
           comn.ajax({
                url: 'organization/department',
                data: {
                    companyId: companyId
                },
                success: function (res) {
                    if (res && res.code == 10000) {
                        var htmlArr = ['<option value="-1">请选择</option>'];
                        var jTemp=0;
                        for (var i = 0; i < res.data.length; i++) {
                            htmlArr.push('<option value="' + res.data[i].id + '">' + res.data[i].name + '</option>');
                            if(res.data[i].id == item.departmentId){
	                        	jTemp=1;
	                        }
                        }
                        
                        if(jTemp==1){
                        	$(self).closest('form').find('.department-list').html(htmlArr.join('')).val(item.departmentId);
                        }else{
                        	$(self).closest('form').find('.department-list').html(htmlArr.join('')).val("-1");
                        }
                                            
                    }
                    if (res && res.code == 20000) {
                        alert('系统繁忙，请稍后重试！');
                    }
                }
            });
        });
       
        //common
        $("#area_1").getArea(item.addrCity);  
        //var opt = $("#companyIdTest").find('option');
        //console.log('o size:',opt.length);
        
        //$("#companyIdTest").val();
        //ocument.getElementById("companyIdTest").options[1].selected='selected';

        $('#Dialog_about_user').modal('show');
        $('#Dialog_about_user .basicinfo-form').values(item);
        $("#sex").val(item.sex);
        //load user roles
        comn.ajax({
            url: 'za/user/role/get',
            data: {
                userId: item.uid
            },
            success: function (resp) {
                for(var i=0;i<resp.data.length;i++){
                    var userrole = resp.data[i];
                    var no = {
                        uuid:''+userrole.companyId + userrole.businessGroupId + userrole.roleId,
                        companyId:userrole.companyId,
                        companyName:userrole.companyName,
                        businessGroupId:userrole.businessGroupId,
                        businessGroupName:userrole.businessGroupName,
                        roleId:userrole.roleId,
                        roleName:userrole.roleName
                    }

                    window.addedRoles.push(no);
                }
                console.log('loaded user roles:',window.addedRoles);
                renderAddedRoles();
            }
        });
        
//        window.opener.document.location.reload();
    },
    "click .resetpwd": function (a, val, item, d) {
        if (confirm('确定要重置密码么？')) {
            comn.ajax({
                url: 'za/user/resetPwd',
                data: {
                    uid: item.uid
                },
                success: function (resp) {
                    if (resp && resp.code == 10000) {
                        alert('操作成功！');
                    }
                }
            });
        }
    },
    "click .forbid": function (a, val, item, d) {
        if (confirm('确定要停用该用户么？')) {
            comn.ajax({
                url: 'za/user/stop',
                data: {
                    uid: item.uid
                },
                success: function (resp) {
                    if (resp && resp.code == 10000) {
                        alert('操作成功！');
                    }
                    $('#btn-search').trigger('click');  
                }
            });
        }
    },
    "click .enable": function (a, val, item, d) {
        if (confirm('确定要启用该用户么？')) {
            comn.ajax({
                url: 'za/user/start',
                data: {
                    uid: item.uid
                },
                success: function (resp) {
                    if (resp && resp.code == 10000) {
                        alert('操作成功！');
                    }
                    $('#btn-search').trigger('click');  
                }
            });
        }
    },
    "click .activate": function (a, val, item, d) {
        if (confirm('确定要重用该用户么？')) {
            comn.ajax({
                url: 'za/user/start',
                data: {
                    uid: item.uid
                },
                success: function (resp) {
                    if (resp && resp.code == 10000) {
                        alert('操作成功！');
                    }
                }
            });
        }
    }
}
