$(function () {
    //load bank list
    $('#btn-search').on('click', function () {
        $("#todo").bootstrapTable('selectPage', 1);
    });

    //add new bank
    $('.add-new-bank').on('click', function () {
        //init data
        window.mode = 'add';
        resetDialog();
    });

    //select common event
    $('select').on('change', function () {
        //set hidden input
        $(this).siblings('input[type="hidden"]').val($(this).find("option:selected").text());
    });

    //add bank
    $('#Dialog_about_bank').on('click', '.save', function () {
        var data = $('#Dialog_about_bank .basicinfo-form').values();
        //****************去掉文本框空格
        data.groupName=data.groupName.replace(/\s/gi,'');
        data.groupType=data.groupType.replace(/\s/gi,'');
        if(!data.groupName){
            alert('营销品牌集团名称不能为空！');
            return;
        }
        if(!data.groupType){
            alert('营销品牌集团类型不能为空！');
            return;
        }

        var url=interUrl.mockList || interUrl.dealerGroup.add;
        if(window.mode == 'modify'){
            url=interUrl.mockList || interUrl.dealerGroup.update;
        }

        comn.ajax({
            url: url,
            data: data,
            success: function (res) {
                if (res && res.code == 10000) {
                    alert(res.data);
                    $('#Dialog_about_bank').modal('hide');
                }
                if (res && res.code == 20000) {
                    alert(res.data);
                }
                $('#btn-search').trigger('click');
            }
        });
    });

    // 数据导入
    $("#importData").click(function() {
        $("#upFileInput").trigger("click");
    });

});



//tool functions
function resetDialog() {
    if (window.mode == 'add') {
        document.getElementById("groupName").readOnly=false;
        $('#Dialog_about_bank .modal-header .modal-title').html('创建营销品牌集团');
    }
    if (window.mode == 'modify') {
        document.getElementById("groupName").readOnly=false;
        $('#Dialog_about_bank .modal-header .modal-title').html('修改营销品牌集团');
    }

    //reset form values
    $('#Dialog_about_bank').find('input,select').val('');

}

function table_1(params) {
    var p = params.data;
    comn.ajax({
        url: interUrl.mockList || interUrl.dealerGroup.list,
        data: $.extend($("#bank-form").values(), p),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            return params.complete();
        }
    });
}

function handle_1(value, row, index) {
    var string = "";
   /* if(row.status == 1){
        string = "<li><a class='forbid'>停用</a></li>";
    }else if(row.status == 0){
        string = "<li><a class='enable'>启用</a></li>";
    }*/
    return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary'>操作</button>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='modify'>修改</a></li>", string, "</ul>", "</div>"].join("");
}

function handle_status(value, row, index) {
    console.log('value:' + value);
    if(value==1){
        return "已启用";
    }else if(value==0){
        return "已停用";
    }
}

function handle_type(value, row, index) {
    console.log('value:' + value);
    if(value==1){
        return "主机厂";
    }else if(value==0){
        return "合作平台";
    }else if(value == 2){
        return "二手车市场";
    }
}


tableEvent_1 = {
    "click .modify": function (a, val, item, d) {

        //init data
        window.mode = 'modify';
        resetDialog();
        $('#Dialog_about_bank').modal('show');
        $('#Dialog_about_bank .basicinfo-form').values(item);
        $("#groupType").val(item.groupType);

    },
    "click .forbid": function (a, val, item, d) {
        if (confirm('确定要停用该营销品牌集团么？')) {
            comn.ajax({
                url: 'dealerGroupManage/stop',
                data: {
                    dealerGroupId: item.id
                },
                success: function (resp) {
                    if (resp && resp.code == 10000) {
                        alert(resp.data);
                    }
                    $('#btn-search').trigger('click');
                }
            });
        }
    },
    "click .enable": function (a, val, item, d) {
        if (confirm('确定要启用该营销品牌集团么？')) {
            comn.ajax({
                url: 'dealerGroupManage/start',
                data: {
                    dealerGroupId: item.id
                },
                success: function (resp) {
                    if (resp && resp.code == 10000) {
                        alert(resp.data);
                    }
                    $('#btn-search').trigger('click');
                }
            });
        }
    },
    "click .activate": function (a, val, item, d) {
        if (confirm('确定要启用该营销品牌集团么？')) {
            comn.ajax({
                url: 'dealerGroupManage/start',
                data: {
                    dealerGroupId: item.id
                },
                success: function (resp) {
                    if (resp && resp.code == 10000) {
                        alert(resp.data);
                    }
                    $('#btn-search').trigger('click');
                }
            });
        }
    }
}
