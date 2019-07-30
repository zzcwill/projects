/**
 * User: xuhuan
 * Mail: 2865305193@qq.com
 * Time: 3/3
 */
$(function () {
    //load user list
    $('#btn-search').on('click', function () {
        $("#todo").bootstrapTable('selectPage', 1);
    });

   // $("#orgCompanyId").getOrg();
    //add new user
    $('.add-new-template').on('click', function () {
        //init data
        
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

function renderAddedRoles() {
    $('#Dialog_about_user .added-roles tbody').html(template('temp-added-role', {list: window.addedRoles}));
}

function table_1(params) {
    var p = params.data;
    comn.ajax({
        url: "za/templateSettings/list",
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
    if(row.status == "0"){
    	string = "<li><a class='forbid'>启用</a></li>";
    }else if(row.status == "1"){
    	string = "<li><a class='enable'>停用</a></li>";
    }
    return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary'>操作</button>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>",string, "<li><a class='modify'>修改</a></li>", "<li><a class='delete'>删除</a></li>", "</ul>", "</div>"].join("");
};

function handle_status(value, row, index) {
    if(value=="0"){
    	return "未启用";
    }else if(value=="1"){
    	return "启用";
    }
};
function handle_type(value, row, index){
	if(value=="1"){
    	return "逾期导入";
    }else if(value=="2"){
    	return "合同导入";
    }else if(value=="3"){
    	return "银行放款导入";
    }
}

tableEvent_1 = {
    "click .modify": function (a, val, item, d) {
    	 if (confirm('确定要修改吗？')) {
    		 location.href="addOrEdit.html?id="+item.id+"&type=2";   
         }
        
//        window.opener.document.location.reload();
    },
    "click .delete": function (a, val, item, d) {
        if (confirm('确定要删除吗？')) {
            comn.ajax({
                url: 'za/templateSettings/delete',
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
    },
    "click .forbid": function (a, val, item, d) {
        if (confirm('确定要启用吗？')) {
            comn.ajax({
                url: 'za/templateSettings/updStatus',
                data: {
                	id:item.id,
                    status: 1
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
        if (confirm('确定要停用吗？')) {
            comn.ajax({
                url: 'za/templateSettings/updStatus',
                data: {
                	id:item.id,
                	status: 0
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
