var dataLoad_1, handle, tableEvent;

//合作银行
$("#cooBankId").getBankAll();

dataLoad_1 = function(params) {
    var p;
    p = params.data;
    return comn.ajax({
        url: interUrl.mockList || interUrl.discountManage.discountPolicySearch,
        data: $.extend($("#searchForm").values(), p),
        success: function(res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            return params.complete();
        }
    });
};

$("#btn-search").click(function () {
    $("#table").bootstrapTable("refresh", {url: "..."});
});

$("#addPolicy").click(function(){
    comn.addTab({title:"新增贴息",href:"./Modal/discountManage/manage/manage.html?&option=add"});
});

tableEvent = {
    "click .edit": function(e, a, item, index) {
        comn.addTab({title:"修改贴息",href:"./Modal/discountManage/manage/manage.html?policyId="+item['id']+"&option=edit"});
    },
    "click .see": function(e, a, item, index) {
        comn.addTab({title:"查看贴息",href:"./Modal/discountManage/manage/manage.html?policyId="+item['id']+"&option=see"});
    },
    "click .copy": function(e, a, item, index) {
        return comn.ajax({
            url: interUrl.discountManage.discountPolicyCopy,
            data: {
                policyId: item['id']
            },
            success: function(res) {
                tip({
                    content:res.message || "复制成功!"
                });
                return $("#btn-search").trigger("click");
            }
        });
    },
    "click .delete": function(e, a, item, index) {
        if(item['status']===1){
            tip({
                content:"未停用政策不可以删除,请先停用！"
            });
            return false;
        }
        oppSureModal("确认要删除吗?");
        return $("#sureOption").unbind("click").on("click", function() {
            return comn.ajax({
                url: interUrl.discountManage.discountPolicyDel,
                data: {
                    policyId: item['id']
                },
                success: function(res) {
                    tip({
                        content: res.message || "删除成功!"
                    });
                    $("#sureModal").modal("hide");
                    return $("#btn-search").trigger("click");
                }
            });
        });
    },
    "click .option": function(e, a, item, index) {
        var option=item['status']===0?"确认启用?":"停用后，其下的贴息方案也一起被停用。再次启用时，需重新启用其下的贴息方案，请确认是否停用？";
        oppSureModal(option);
        return $("#sureOption").unbind("click").on("click", function() {
            return comn.ajax({
                url: interUrl.discountManage.discountPolicyChangeStatus,
                data: {
                    policyId: item['id']
                },
                success: function(res) {
                    tip({
                        content: res.message
                    });
                    $("#sureModal").modal("hide");
                    return $("#btn-search").trigger("click");
                }
            });
        });
    }
};

handle = function(value, row, index) {
    var status=row.status,option="停用";
    if(typeof status=="string"){
        status=parseInt(status);
    }
    if(status===0){
        option="启用";
    }
    return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='edit'>修改</a></li>","<li><a class='copy'>复制</a></li>","<li><a class='option'>"+option+"</a></li>", "<li><a class='delete'>删除</a></li>","<li><a class='see'>查看</a></li>", "</ul>", "</div>"].join("");
};


effectualStatus = function(value, row, index) {
    if (typeof value === "string") {
        value = parseInt(value);
    }
    return (value === 1 && "生效") || (value === 2 && "失效");
};

statuss = function(value, row, index) {
    if (typeof value === "string") {
        value = parseInt(value);
    }
    return (value === 1 && "启用") || (value === 0 && "停用");
};