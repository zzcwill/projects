var args, dataLoad_1, tableEvent, handle, zTreeOnClick,g_isModify = false;

jQuery.browser = {};

(function() {
    jQuery.browser.msie = false;
    jQuery.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        jQuery.browser.msie = true;
        return jQuery.browser.version = RegExp.$1;
    }
})();

args = comn.getArgs();
//产品列表
dataLoad_1 = function(params) {
    var suppId = $("#suppId").val();
    if(suppId){
        return comn.ajax({
            url: interUrl.mockList || interUrl.product.list,
            data: {supplierId:suppId},
            success: function(res) {
                params.success({
                    'total': res.totalItem,
                    rows: res.data
                });
                return params.complete();
            }
        });
    }else{
        return params.complete();
    }
};
//0：停用
//1：启用
tableEvent = {
    "click .stop": function(e, a, item, index) {
        comn.ajax({
            url: interUrl.product["typeSetStatus"],
            data: {
                id: item['id'],
                status: item["status"]==1?0:1
            },
            success: function(res) {
                tip({content: (item["status"]==1?"停用":"启用")+"成功!"});
                $("#table").bootstrapTable('refresh');
            }
        });
    },
    "click .delete": function(e, a, item, index) {
        $("#sure").modal("show");
        return $("#OK").unbind("click").on("click", function() {
            comn.ajax({
                url: interUrl.product["typeDel"],
                data: {
                    id: item['id'],
                    status: -1
                },
                success: function(res) {
                    tip({content: "删除成功!"});
                    $("#sure").modal("hide");
                    $("#table").bootstrapTable('refresh');
                    return $("#btn-search").trigger("click");
                }
            });
        });
    },
    "click .modify": function(e, a, item, index){
        $("#addPro").modal("show");
        comn.ajax({
            url: interUrl.product.typeGet,
            data: {
                id: item.id
            },
            success: function(res){
                $("#addProForm").values(res.data);
            }
        })
    }
};

handle = function(value, row, index) {
    var btnStatus = "<li><a class='stop'>"+(row["status"] == "0"?"启用":"停用")+"</a></li>";
    var isStatus = "<li><a class='modify'>修改</a></li>"+ btnStatus +"<li><a class='delete'>删除</a></li>";
    return ["<div class='btn-group btn-group-xs'>",
        "<button type='button' class='btn btn-primary'>操作</button>",
        "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>",
        "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>",
        "<ul class='dropdown-menu' role='menu'>",
        row["status"] == "0" ? isStatus : btnStatus,
        "</ul>", "</div>"].join("");
};
statusNum = function (value, row, index) {
    console.log(value+"----"+typeof(value))
    switch (value){
        //case -1:
        //    return "删除";
        //    break;
        case 0:
            return "停用";
            break;
        case 1:
            return "启用";
            break;
        default :
            return "--";
            break;
    }
};
gpsType = function (value) {
    return [null, "有线", "无线"][value] || null;
};
current_node = null;

zTreeOnClick = function(event, treeId, treeNod) {
    current_node = treeNod;
    openBank();
};

$("#table").bootstrapTable('refresh');
openTree = function(){
    comn.ajax({
        url: interUrl.supplier.tree,
        success: function(res) {
            var treeObj;
            treeObj = $.fn.zTree.init($("#tree"), {
                showLine: true,
                expand: true,
                callback: {
                    onClick: zTreeOnClick
                },
                data: {
                    key: {
                        name: "name"
                    },
                    simpleData: {
                        enable: true,
                        idKey: "id",
                        pIdKey: "parentId",
                        rootPId: 0
                    }
                }
            }, res.data);
            return treeObj.expandAll(true);
        }
    });
}
setButtonStatus = function(){
    var span = $('#modify').find("span:last");
    if(g_isModify==true){
        span.html("&nbsp;取消&nbsp;");
        $("#orgForm").find(":input").attr("disabled",false);
        $("#orgForm").find("#parentOrg").attr("disabled",true);
        $("#orgForm").find("#save").show();
    }else{
        span.html("&nbsp;修改&nbsp;");
        $("#orgForm").find(":input").not(":button").attr("disabled",true);
        $("#orgForm").find("#save").hide();
    }
}
saveOrg = function(_form, _callback){
    var _data = _form.values();
    var _url = _data.id ? interUrl.supplier.update : interUrl.supplier.add;
    comn.ajax({
        url: _url,
        data: _data,
        success: function(res) {
            if(res.status==10000){
                if(_callback)_callback();
                openTree();
                g_isModify = false;
                setButtonStatus();
            }else{
                tip({content: res.message});
            }
        }
    });
}
openBank = function(){
    $("#orgForm").values(current_node);
    setButtonStatus();

    //$("#allGuarantee").html();
    comn.ajax({
        url: interUrl.supplier.get,
        data: {id:current_node.id},
        success: function(res) {
            var _html = "";
            if(res.data){
                //$("#allGuarantee").html(res.data.organizationName);
            }
        }
    });
    $("#table").bootstrapTable('refresh');

    $("#stop .title").html(current_node['status']==0?"启用":"停用");
};
$(function() {
    $("#table").bootstrapTable('resetView', {
        height : 400
    });
    var validate = {
        rules: {
            tel: {phoneMix: true},
            linkMobile: {mobile: true}
        },
        messages: {
            tel: {phoneMix: "公司电话格式不正确"},
            linkMobile: {mobile: "手机号格式不正确"}
        }
    };
    $("#addOrgForm").validate(validate);
    $("#orgForm").validate(validate);
    $("#province_1").getProvince().change(function() {
        var v = this.value || $(this).attr('defaultValue');
        if (v) {
            $("#area_1").val("");
            return $("#city_1").getCity(v).unbind("change").change(function() {
                if (this.value || $(this).attr('defaultValue')) {
                    return $("#area_1").getArea(this.value || $(this).attr('defaultValue'));
                }
            });
        }
    });
    $("#province_2").getProvince().change(function() {
        if (this.value) {
            $("#area_2").val("");
            return $("#city_2").getCity(this.value).unbind("change").change(function() {
                if (this.value) {
                    return $("#area_2").getArea(this.value);
                }
            });
        }
    });
    $("#province_1").change(function(){
        $("#provinceName_1").val($(this).find('option:selected').text());
    });
    $("#city_1").change(function(){
        $("#cityName_1").val($(this).find('option:selected').text());
    });
    $("#area_1").change(function(){
        $("#areaName_1").val($(this).find('option:selected').text());
    });
    $("#province_2").change(function(){
        $("#provinceName_2").val($(this).find('option:selected').text());
    });
    $("#city_2").change(function(){
        $("#cityName_2").val($(this).find('option:selected').text());
    });
    $("#area_2").change(function(){
        $("#areaName_2").val($(this).find('option:selected').text());
    });
    $("#modify").click(function(){
        g_isModify = g_isModify ? false : true;
        setButtonStatus();
    });
    $("#save").click(function(){
        if($("#orgForm").valid()==false)return;
        saveOrg($("#orgForm"));
    });
    $("#stop").click(function() {
        if(!current_node){
            tip({content: "请选择一个供应商!"});
            return;
        }
        return comn.ajax({
            url: interUrl.supplier["setStatus"],
            data: {
                id: current_node['id'],
                status: (current_node['status']==0?1:0)
            },
            success: function(res) {
                tip({content: "操作成功!"});
                openTree();
                console.log(current_node)
            }
        });
    });
    $("#del").click(function() {
        if(!current_node){
            tip({content: "请选择一个供应商!"});
            return;
        }
        $("#sure").modal("show");
        return $("#OK").unbind("click").on("click", function() {
            return comn.ajax({
                url: interUrl.supplier["del"],
                data: {
                    id: current_node.id,
                    status: -1
                },
                success: function(res) {
                    tip({content: "操作成功!"});
                    $("#sure").modal("hide");
                    openTree();
                }
            });
        });
    });
    $("#add").click(function() {
        $("#addOrg").modal("show");
    });
    $("#addProBtn").click(function() {
        $("#addPro").modal("show");
        $("#productId").val("");
        if(current_node){
            $("#supplierName").val($("#suppName").val());
        }
    });
    $("#savePro").click(function() {
        if ($("#addProForm").valid() == false)
            return;
        if ($("#suppId").val() == "") {
            tip({
                content : "请先选择供应商"
            });
            return;
        }
        return comn.ajax({
            url : $("#productId").val() == '' ? interUrl.product.typeAdd : interUrl.product.typeUpdate,
            data : $.extend($("#addProForm").values(), {supplierId: $("#suppId").val()}),
            success : function(res) {
                $("#addPro").modal("hide");
                $("#table").bootstrapTable('refresh');
            }
        });
    });
    $("#saveOrg").click(function() {
        if ($("#addOrgForm").valid() == false)
            return;
        saveOrg($("#addOrgForm"), function() {
            $("#addOrg").modal("hide");
        });
    });
    openTree();
});