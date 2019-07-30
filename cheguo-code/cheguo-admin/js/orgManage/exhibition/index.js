var args, handle_1, dataLoad_1, tableEvent_1;
var args = comn.getArgs();
var companyId = args["companyId"];
var companyName = args["companyName"];
handle_1 = function (value, row, index) {
    return ["<button type='button' class='btn btn-primary btn-xs delete'>删除</button>"].join("");
};
//基本信息-账户信息
dataLoad_1 = function(params) {
    if (companyId) {
        comn.ajax({
            url : interUrl.org.organizationList,
            data : {
                companyId : companyId
            },
            success : function(res) {
                params.success({
                    'total' : res.totalItem,
                    rows : res.data
                });
                return params.complete();
            }
        });
    } else {
        return params.complete();
    }
};

tableEvent_1 = {
    "click .delete": function (e, a, item, index) {
        $("#sure").modal("show");
        $("#OK").unbind("click").click(function(){
            return comn.ajax({
                url: interUrl.org["organizationDel"],
                data: {
                    id: item.id
                },
                success: function (res) {
                    $("#sure").modal("hide");
                    tip({
                        content: "删除成功!"
                    });
                    $("#table").bootstrapTable('refresh');
                }
            });
        })
    }
};
$("#branchCompTitle h1").html(companyName);
$("#province_1").getProvince().change(function() {
    var v = this.value || $(this).attr('defaultValue');
    if (v) {
        $("#addrProvinceName_1").val($(this).find('option:selected').text());
        $("#area_1").val("");
        $("#city_1").getCity(v).change(function() {
            if (this.value || $(this).attr('defaultValue')) {
                $("#addrCityName_1").val($(this).find('option:selected').text());
                return $("#area_1").getArea(this.value || $(this).attr('defaultValue'));
            }
        });
    }
});
$("#area_1").change(function(){
    $("#addrAreaName_1").val($(this).find('option:selected').text());
});
$("#addBtn").click(function(){
    $("#exhibitionForm").valid()
    if ($("#exhibitionForm").valid() == true) {
        var data = $("#exhibitionForm").values();
        return comn.ajax({
            url: interUrl.org.organizationAdd,
            data: $.extend(data, {companyId: companyId, companyName: companyName}),
            success: function (res) {
                $("#addAccountModal").modal("hide");
                $("#table").bootstrapTable('refresh');
            }
        });
    }
});