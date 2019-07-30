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
        data.bankCode=data.bankCode.replace(/\s/gi,'');
        data.bankName=data.bankName.replace(/\s/gi,'');
        if(!data.bankCode){
      	   alert('银行编码不能为空！');
           return;
        }
        if(!data.bankName){
      	    alert('银行名称不能为空！');
           return;
        }
        
        var url='openingBankManage/add';
        if(window.mode == 'modify'){
            url='openingBankManage/update';
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

    // 上传按钮改变时触发upload方法
    $('#upFileInput').on('change', function() {
        if ($('input[type="file"]').val() != "") {
            var extend = $('input[type="file"]').val().substr($('input[type="file"]').val().lastIndexOf(".") + 1);
            if ("xls|xlsx".indexOf(extend) == -1) {
                flagPic = false;
                layer.msg("选择的文件必须是EXCEL文件,请确认！");
            } else {
                upload();
                $("#upFileInput").replaceWith($("#upFileInput").clone(true));
            }
        } else {
            layer.msg("请选EXCEL文件");
        }

    });
});



//tool functions
function resetDialog() {
    if (window.mode == 'add') {
    	document.getElementById("bankCode").readOnly=false;
        $('#Dialog_about_bank .modal-header .modal-title').html('创建银行');
    }
    if (window.mode == 'modify') {
    	document.getElementById("bankCode").readOnly=true;
        $('#Dialog_about_bank .modal-header .modal-title').html('修改银行');
    }

    //reset form values
    $('#Dialog_about_bank').find('input,select').val('');

}

function table_1(params) {
    var p = params.data;
    comn.ajax({
        url: "openingBankManage/list",
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
    if(row.status == 1){
    	string = "<li><a class='forbid'>停用</a></li>";
    }else if(row.status == 0){
    	string = "<li><a class='enable'>启用</a></li>";
    }
    return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary'>操作</button>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='modify'>修改</a></li>", string, "</ul>", "</div>"].join("");
}

function handle_status(value, row, index) {
    console.log('value:' + value);
    if(value==1){
    	return "启用";
    }else if(value==0){
    	return "停用";
    }
}

// 上传方法
function upload(){
    return $.ajaxFileUpload({
        url: "/openingBankManage/uploadExcel",
        secureuri: false,
        fileElementId: 'upFileInput',
        dataType: "json",
        success: function(data, status) {
            if (data.code == 10000) {
                tip({
                    content: data.data
                });
            }else{
                tip({
                    content: data.message
                });
            }
        },
        complete: function() {
        },
        error: function(data, status, e) {
            tip({
                content: data.message
            });
        }
    });
}

tableEvent_1 = {
    "click .modify": function (a, val, item, d) {

        //init data
        window.mode = 'modify';
        resetDialog();

        $('#Dialog_about_bank').modal('show');
        $('#Dialog_about_bank .basicinfo-form').values(item);

    },
    "click .forbid": function (a, val, item, d) {
        if (confirm('确定要停用该银行么？')) {
            comn.ajax({
                url: 'openingBankManage/stop',
                data: {
                    openingBankInfoId: item.id
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
        if (confirm('确定要启用该银行么？')) {
            comn.ajax({
                url: 'openingBankManage/start',
                data: {
                    openingBankInfoId: item.id
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
        if (confirm('确定要重用该银行么？')) {
            comn.ajax({
                url: 'openingBankManage/start',
                data: {
                    openingBankInfoId: item.id
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
