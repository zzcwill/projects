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
        data: {},
        success: function (res) {
            if (res && res.code == 10000) {
                var htmlArr = ['<option value="">请选择</option>'];
                for (var i = 0; i < res.data.length; i++) {
                    htmlArr.push('<option value="' + res.data[i].sysType + '">' + res.data[i].sysName + '</option>');
                }
                $('.sys-menu-list').html(htmlArr.join(''));
            }
            if (res && res.code == 20000) {
                alert('系统繁忙，请稍后重试！');
            }
        }
    });
    
    
    comn.ajax({
        url: 'za/menu/parentMenuList',
        data: {},
        success: function (res) {
            if (res && res.code == 10000) {
                var htmlArr = ['<option value="">请选择</option>'];
                htmlArr.push('<option value="0">无</option>');
                for (var i = 0; i < res.data.length; i++) {
                    htmlArr.push('<option value="' + res.data[i].id + '">' + res.data[i].menuName + '</option>');
                }
                $('.parent-menu-list').html(htmlArr.join(''));
            }
            if (res && res.code == 20000) {
                alert('系统繁忙，请稍后重试！');
            }
        }
    });
  
})


//load message list
$('#btn-search').on('click', function () {
    $("#todo").bootstrapTable('selectPage', 1);
});

function table_1(params) {

    var p = params.data;
    comn.ajax({
        url: "za/menu/listSysMenu",
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

function handle_1(value, row, index) {
    return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary'>操作</button>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='modify'>修改</a></li>", "<li><a class='resetpwd'>删除</a></li>", "</ul>", "</div>"].join("");
};

//add new menu
$('.add-new-menu').on('click', function () {
    //init data
    window.mode = 'add';
    resetDialog();
});

//tool functions
function resetDialog() {
    if (window.mode == 'add') {
        $('#Dialog_about_menu .modal-header .modal-title').html('创建菜单');
    }
    if (window.mode == 'modify') {
        $('#Dialog_about_menu .modal-header .modal-title').html('修改用户');
    }

    //reset added roles
    $('#Dialog_about_menu .added-roles tbody').html('');

    //reset form values
    $('#Dialog_about_menu').find('input,select').val('');
    
    $('#Dialog_about_menu').modal('show');

}


//add user
$('#Dialog_about_menu').on('click', '.save', function () {
    var data = $('#Dialog_about_menu .basicinfo-form').values();
    
    //****************去掉文本框空格
//    data.username=data.username.replace(/\s/gi,'');
    
    var url='za/menu/addSysMenu';
    if(window.mode == 'modify'){
        url='za/menu/updSysMenu';
    }
    
    comn.ajax({
        url: url,
        data: data,
        success: function (res) {
            if (res && res.code == 10000) {
                alert('操作成功！');
                $('#Dialog_about_menu').modal('hide');
            }
            if (res && res.code == 20000) {
                alert('操作失败！');
            }
            $('#btn-search').trigger('click');  
            console.log(res);
        }
    });
});

tableEvent_1 = {
	    "click .modify": function (a, val, item, d) {
	        
	        //init data
	        window.mode = 'modify';
	        resetDialog();
	        
	        // 初始化"用户系统权限"
	        var systype = item.sysType;
	        
	        $('#Dialog_about_meunu').modal('show');
	        
	        $('#menuName').val(item.menuName);
	        $('#menuType').val(item.menuType);
	        $('#parentId').val(item.parentId);
	        $('#sysType').val(item.sysType);
	        $('#note').val(item.note);
	        $('#id').val(item.id);
//	        $('#Dialog_about_meunu .basicinfo-form').values(item);
	    }
}




