/**
 * User: Lijunjun
 * Mail: 370984694@qq.com
 * Time: 11/21
 */
$(function () {
    //load user list
    $('#btn-search').on('click', function () {
        $("#todo").bootstrapTable('selectPage', 1);
    });

    $('#J_add_new_feed_type_name').on('click',function (){
    	var str='';
    	str+='<tr>';
    	str+='<td>费用名称:<input name="codeName" class="form-control" style="width:150px;"></td>';
    	str+='<td>编码:<input name="codeId"  class="form-control" style="width:150px;"></td>';
    	str+='<td>排序:<input name="sortNo"  class="form-control" style="width:150px;"></td>';
    	str+='<td><a  href="javascript:;" class="removeLoanInsuranceType">删除</a></td>';
    	//str+='<td>描述:<textarea rows="10" cols="90" name="note"></textarea></td>';
    	str+='</tr>';
    	$('#table-1').append(str);
    })
    
    $(document).on("click", ".removeLoanInsuranceType", function () {
	    var _this = $(this);
	    var oldTr = _this.parents("tr");
	    oldTr.remove();
    });
    
    //add new role
    $('#addFeeCodeLIbrayFee').on('click', function () {
    	$("#typeTitle").html('新增数据字典类型');
    	$('#Dialog_about_code_library_fee').modal('show');
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
    $('#Dialog_about_code_library_fee').on('click', '.save', function () {
        
    	var data ={};
//    	var codeLibrarySonList=$('#table-1').getList();
    	var codeLibraryFeeType = [];
    	$("#table-1").find("tr").each(function(){
    		var obj={};
    		obj.codeName=$(this).find('input[name="codeName"]').val();
    		obj.codeId=$(this).find('input[name="codeId"]').val();
    		obj.sortNo=$(this).find('input[name="sortNo"]').val();
    		
        	codeLibraryFeeType.push(obj);
    	})
    	
    	var  typeTitle = $("#typeTitle").html();
    	if(typeTitle=='新增数据字典类型'){
    		$('#id').val('');
    	}
    	
    	data = $.extend($('#codeLibraryFee').values(), {codeLibrarySonList:codeLibraryFeeType});
    	
//        var  itemTemp=window.addedRoles;
//        data.userRoleList = window.addedRoles;
//        
//        //****************去掉文本框空格
//        data.username=data.username.replace(/\s/gi,'');
//        data.realname=data.realname.replace(/\s/gi,'');
//        data.addrDetail=data.addrDetail.replace(/\s/gi,'');
//        data.email=data.email.replace(/\s/gi,'');
//        
//        var shouij = /^1[3,5,8]\d{9}$/; //手机格式
//        var zuoji = /^(\d{3,4}\-)?\d{7,8}$/i;   //座机格式
//        if(!data.username){
//       	    alert('登陆账号字段不能为空！');
//            return;
//        }else if(shouij.test(data.username) || zuoji.test(data.username) ){
//            	
//        }
//
//        if(!data.realname){
//      	   alert('用户姓名字段不能为空！');
//           return;
//        }else if(data.realname.length>5){
//           alert('用户姓名长度5个字符内！');
//           return;
//        }
//        if(data.addrDetail && data.addrDetail.length>50){
//        	alert('详细地址长度少于50位！');
//    		return;
//        }
        
        var url='codeLibraryFeedType/add';
        if($("#typeTitle").html() == '修改数据字典类型'){
            url='codeLibraryFeedType/update';
        }
        console.log('ajax canceled!!!');
        console.log(data)
//        return;
        comn.ajax({
            url: url,
            data: {data:JSON.stringify(data)},
            success: function (res) {
                if (res && res.code == 10000) {
                    alert('操作成功！');
                    $('#Dialog_about_code_library_fee').modal('hide');
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
        url: "codeLibraryFeedType/list",
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
    return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary'>操作</button>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='modify'>修改</a></li>",  "<li><a class='delete'>删除</a></li>", "</ul>", "</div>"].join("");
};


tableEvent_1 = {
    "click .modify": function (a, val, item, d) {
         
         $('#Dialog_about_code_library_fee').modal('show');
         $('#Dialog_about_code_library_fee .basicinfo-form').values(item);

         $("#typeTitle").html('修改数据字典类型');
         //load user roles
         comn.ajax({
             url: 'codeLibraryFeedType/feeTypeList',
             data: {
                 id: item.id
             },
             success: function (resp) {
            	 $('#table-1').html('');
            	 
                 for(var i=0;i<resp.data.length;i++){
                	var dataList=resp.data[i];
                	var str='';
                 	str+='<tr>';
                 	str+='<td>费用名称:<input name="codeName" class="form-control" style="width:150px;" value="'+dataList.codeName+'"></td>';
                 	str+='<td>编码:<input name="codeId"  class="form-control" style="width:150px;" value="'+dataList.codeId+'"></td>';
                 	str+='<td>排序:<input name="sortNo"  class="form-control" style="width:150px;" value="'+dataList.sortNo+'"></td>';
                 	str+='<td><a  href="javascript:;" class="removeLoanInsuranceType">删除</a></td>';
                 	//str+='<td>描述:<textarea rows="10" cols="90" name="note"></textarea></td>';
                 	str+='</tr>';
                 	$('#table-1').append(str);
                 }
             }
         });
         
    },
    "click .delete": function (a, val, item, d) {
        if (confirm('确定要删除该用户么？')) {
            comn.ajax({
                url: 'codeLibraryFeedType/deleteCodeLibrary',
                data: {
                    id: item.id
                },
                success: function (resp) {
                    if (resp && resp.code == 10000) {
                        alert('操作成功！');
                    }
                    $('#btn-search').trigger('click');  
                }
            });
        }
    }
}

function delFeeType(tt){
	alert(tt);
	$("#table-1 tr:gt(0):eq("+tt+")").remove();
}
