var dataLoad_contacts, tableEvent_1, handle_1;
var args = comn.getArgs()
var customerId = args["customerId"];
//修改表格统一配置参数
var tableConfig = {};
$.map(comn.table, function (v, k) {
    tableConfig[k] = v;
});
tableConfig['height'] = "";
tableConfig['pagination'] = false;
//逾期记录
dataLoad_contacts=function(params){
    var p = params.data;
    return comn.ajax({
        url: interUrl.loanDetail.customerRelationshipLIst,
        data: {
            projectId : args["projectId"],
            id : args["customerId"]
        },
        success: function (res) {
            if (res.data.length == 0) {
                params.success({
                    rows: []
                });
                return params.complete();
            } else {
                params.success({
                    'total': res.totalItem,
                    rows: res.data
                });
                return params.complete();
            }
        }
    });
};

$("#dataLoad_contacts").bootstrapTable(tableConfig);

tableEvent_1 = {
    "click .update": function(e, a, item, index) {
        $("#addUser").modal("show");
        $(".modal-title").html("修改联系人");
        return comn.ajax({
            url: interUrl.loanDetail.customerRelationshipGet,
            data: {
                id : item.id
            },
            success: function(res) {
                $("#addUserForm").values(res.data)
            }
        });
    },
    "click .delete": function(e, a, item, index) {
        $("#sure").modal("show");
        return $("#OK").unbind("click").on("click", function() {
            return comn.ajax({
                url: interUrl.loanDetail.customerRelationshipDel,
                data: {
                    id : item.id
                },
                success: function(res) {
                    tip({
                        content: "删除成功!!"
                    });
                    $("#sure").modal("hide");
                    return $("#dataLoad_contacts").bootstrapTable("refresh");
                }
            });
        });
    }
};

handle_1 = function(value, row, index) {
    return row.isShow === 1 ? (["<div class='btn-group btn-group-xs'>",
        "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作",
        "<span class='caret'></span>",
        "<span class='sr-only'>下拉切换</span>",
        "</button>",
        "<ul class='dropdown-menu' role='menu'>",
        "<li><a class='update'>修改</a></li>",
        "<li><a class='delete'>删除</a></li>",
        "</ul>",
        "</div>"].join("")) : "--";
};
//添加联系人
$(document).on("click", "#add", function(){
    $("#addUserForm input, #addUserForm select").val("");
    return $("#addUser").modal("show");
})
//保存
$(document).on("click", "#save", function(){
    if($("#addUserForm").valid()){
        if ($("#addUserForm select[name=relationship]").val() === "1") {
            $("#sure_self").modal("show");
            return $("#OK_self").unbind("click").on("click", function() {
                $("#sure_self").modal("hide");
                saveContact();
            })
        } else {
            saveContact();
        }

    }
});
function saveContact(){
    comn.ajax({
        url: interUrl.loanDetail.customerRelationshipAdd,
        data: $.extend({customerId:customerId}, $("#addUserForm").values()),
        success: function(res) {
            $("#addUser").modal("hide");
            $(".modal-title").html("新增联系人");
            return $("#dataLoad_contacts").bootstrapTable("refresh");
            //$("#dataLoad_contacts").bootstrapTable("insertRow", {index: 0, row: res.data});
        }
    });
}
//省市区
$("#homeAddressPid").getProvince().change(function() {
    if (this.value) {
        $("#homeAddressPname").val($(this).find('option:selected').text());
        $("#homeAddressRname").val("");
        return $("#homeAddressCid").getCity(this.value).unbind("change").change(function() {
            if (this.value) {
                $("#homeAddressCname").val($(this).find('option:selected').text());
                return $("#homeAddressRid").getArea(this.value);
            }
        });
    }
});
$("#homeAddressCid").change(function() {
    if (this.value) {
        $("#homeAddressCname").val($(this).find('option:selected').text());
        return $("#homeAddressRid").getArea(this.value);
    }
});
$("#homeAddressRid").change(function(){
    $("#homeAddressRname").val($(this).find('option:selected').text());
});
