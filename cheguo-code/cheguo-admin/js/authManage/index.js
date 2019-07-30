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
        url: 'za/menu/sysList',
        success: function (res) {
        	var data=res.data,i,j,k;            
            var menuList='',result="<ul class='menuList'>";
            	for(i=0;i<data.length;i++){   
            		menuList+="<li><p class='menu-li' style='cursor:pointer'>"+data[i].sysName+"</p><dl style='display:none'>";
            		var o=data[i];
            		for(j=0;j<o.parentSysMenuList.length;j++){
            			var o1=o.parentSysMenuList[j];
            			menuList+="<dd><input name='menu' class='ff' type='checkbox' value='"+o1.id+"'>"+o1.menuName;
            			for(k=0;k<o1.sysMenuList.length;k++){
            				menuList+="<p><input name='menu' class='meun-p' type='checkbox' value='"+o1.sysMenuList[k].id+"'>"+o1.sysMenuList[k].menuName+"</p>";
            			}
            			menuList+="</dd>";
            		}
            		menuList+="</dl></li>"
            	}
            	result+=menuList+'</ul>';
            	$("#menu").html(result);
            	$(".menu-li").click(function(){
            		$(this).next("dl").toggle();
            	})
            	
            	$(".meun-p").click(function(){
            		$(this).parents("dd").find("input.ff").prop("checked","checked");
            	})
            }
    });
  
})

    //add new role
    $('.add-new-role').on('click', function () {
        $('#Dialog_add_role').modal('show');
    });
    $('#Dialog_add_role').on('click', '.save', function () {
        var data = $('#Dialog_add_role').values();
        //console.log(data);
        data.name=data.name.replace(/\s/gi,'');
        data.note=data.note.replace(/\s/gi,'');
        if (!data.name) {
            alert('角色名称不能为空');
            return;
        }else if(data.name.length>15){
        	alert('角色名称在15个字符内');
            return;
        }
        if(data.note.length>50){
        	alert('角色描述在50个字符内');
            return;
        }
        comn.ajax({
            url: 'za/role/add',
            data: data,
            success: function (res) {
                if (res && res.code == 10000) {
                    alert('增加成功！');
                    $('#Dialog_add_role').modal('hide');
                    $('#btn-search').trigger('click');
                }else{
                    if(res.message){
                        alert(res.message);
                    }
                }
            }
        });
    });
    //menus-wrapper
    $('#Dialog_set_auth').on('click', '.save', function () {
        var roleId =  $('#Dialog_set_auth #role_name').attr('roleid');
        if(roleId == undefined){
            alert('no roleid found!');
            return;
        }
        var menus = [], nodes = [];
        $('#Dialog_set_auth .menus-wrapper input[type="checkbox"]:checked').each(function () {
            menus.push($(this).val());
        });
        $('#Dialog_set_auth .nodes-wrapper input[type="checkbox"]:checked').each(function () {
            nodes.push($(this).val()+":"+$(this).siblings('span').text());
        });

        if (menus.length == 0 || nodes.length == 0) {
            //alert('菜单权限和节点权限都要至少选一个');
        	tip({content: "菜单权限和节点权限都要至少选一个!"});
        }
        //console.log(nodes);
        comn.ajax({
            url: 'za/role/setauth',
            data: {
                roleId:roleId,
                menuStr: menus.join(','),
                nodeStr: nodes.join(',')
            },
            success: function (resp) {
                //console.log(resp);
                if (resp && resp.code == 10000) {
                    //alert('设置成功！');
                    $('#Dialog_set_auth').modal('hide');
                    $('#btn-search').trigger('click');  
                    tip({content: "设置成功!"});

                } else {
                    alert('系统繁忙，请重试。');
                }
            }
        });
    });
    
    //modify role
    $('#Dialog_modify_role').on('click', '.save', function () {
        var data = $('#Dialog_modify_role').values();
        //console.log(data);
        data.name=data.name.replace(/\s/gi,'');
        data.note=data.note.replace(/\s/gi,'');
        if (!data.name) {
            alert('角色名称不能为空');
            return;
        }else if(data.name.length>15){
        	alert('角色名称在15个字符内');
            return;
        }
        if(data.note.length>50){
        	alert('角色名称描述在50个字符内');
            return;
        }
        comn.ajax({
            url: 'za/role/update',
            data: data,
            success: function (res) {
                if (res && res.code == 10000) {
                    alert('修改成功！');
                    $('#Dialog_modify_role').modal('hide');
                    $('#btn-search').trigger('click');  
                }
                if (res && res.code == 20000) {
                    alert('修改失败！');
                }
                //console.log(res);
            }
        });
    });

//   $(document).on("click",".sysTypeMeunu", function () {
//    	var systype=$(this).val();
//    	var _this=$(this);
//    	var result="",i;
//    	// 催收系统的菜单全部取出来，分前后台系统，已经具有的权限钩钩上
//    	comn.ajax({
//            url: 'za/menu/getMenuListBySysType',
//            data: { 
//	            	sysType : systype
//            	},
//            success: function (res) {
//               console.log(res);
//               for(i=0;i<res.data.length;i++){
//            	   var o=res.data[i];
//            	   result+="<p><input type='hidden' name='sysType' value='"+o.id+"'/>"+o.menuName+"</p>";
//               }
//               _this.parents(".checkbox").append(result);
//              
//            }
//        });
//        //$('#Dialog_set_auth_cuishou').modal('show');
//        //$('#Dialog_set_auth_cuishou #role_name').html(item.name).attr('roleid', item.id);
//   	})
    
    
function table_1(params) {
	var roleName=$('#roleNameSearch').val().replace(/\s/gi,'');
	$('#roleNameSearch').val(roleName);
    var p = params.data;
    comn.ajax({
        url: "za/role/list",
        data: $.extend($("#role-form").values(), p),
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
    return ["<div class='btn-group btn-group-xs' style='width:80px;'>", 
            "<button type='button' class='btn btn-primary'>操作</button>", 
            "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>", 
            "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", 
            "</button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='modify'>修改</a></li>", 
            "<li><a class='setauth'>车贷系统权限</a></li>", "<li><a class='setauth_cuishou'>催收系统权限</a></li>", "</ul>", "</div>"].join("");
};

tableEvent_1 = {
    //modify role
    "click .modify": function (a, val, item, d) {
        $('#Dialog_modify_role').modal('show');
        $('#Dialog_modify_role').values(item);
    },
    //set authority
    "click .setauth": function (a, val, item, d) {
        $("input[name='menu']").removeAttr("checked");
        $("input[name='node']").removeAttr("checked");

        var menuIds=[],nodeIds=[];
        if(item['menuIds']!=null&&item['menuIds']!=''){
            menuIds = item['menuIds'].split(',');
        }
        if(item['nodeIds']!=null&&item['nodeIds']!=''){
            nodeIds = item['nodeIds'].split(',');
        }

        for(var i=0;i<menuIds.length;i++){
            $("input[name='menu'][value='"+menuIds[i]+"']").attr("checked","checked");
        }

        for(var i=0;i<nodeIds.length;i++){
            $("input[name='node'][value='"+nodeIds[i]+"']").attr("checked","checked");
        }
        $('#Dialog_set_auth').modal('show');
        $('#Dialog_set_auth #role_name').html(item.name).attr('roleid', item.id);
    },
    "click .setauth_cuishou": function (a, val, item, d) {
    	// 催收系统的菜单全部取出来，分前后台系统，已经具有的权限钩钩上
    	comn.ajax({
            url: 'authority/role/getmenus',
            data: { 
	            	roleid : item.id,
	            	systype : "CS"
            	},
            success: function (res) {
               if (res && res.code == 10000) {
            	   $("#backDiv").html(res.data.module.backDiv);
            	   $("#frontDiv").html(res.data.module.frontDiv);
                }
                if (res && res.code == 20000) {
                    alert('获取菜单失败！');
                }
            }
        });
        $('#Dialog_set_auth_cuishou').modal('show');
        $('#Dialog_set_auth_cuishou #role_name').html(item.name).attr('roleid', item.id);
    }
    
}

//menus-wrapper
$('#Dialog_set_auth_cuishou').on('click', '.save', function () {
    var roleId =  $('#Dialog_set_auth_cuishou #role_name').attr('roleid');
    if(roleId == undefined){
        alert('no roleid found!');
        return;
    }
    var menus = [];
    $('#Dialog_set_auth_cuishou .menus-wrapper_back input[type="checkbox"]:checked').each(function () {
        menus.push($(this).val());
    });
    $('#Dialog_set_auth_cuishou .menus-wrapper_front input[type="checkbox"]:checked').each(function () {
    	 menus.push($(this).val());
    });
    comn.ajax({
        url: 'za/role/setcuishouauth',
        data: {
            roleId:roleId,
            menuStr: menus.join(',')
        },
        success: function (resp) {
            //console.log(resp);
            if (resp && resp.code == 10000) {
                //alert('设置成功！');
                $('#Dialog_set_auth_cuishou').modal('hide');
                $('#btn-search').trigger('click');  
                tip({content: "设置成功!"});

            } else {
               // alert('系统繁忙，请重试。');
            	tip({content: "系统繁忙，请重试。"});
            }
        }
    });
});
