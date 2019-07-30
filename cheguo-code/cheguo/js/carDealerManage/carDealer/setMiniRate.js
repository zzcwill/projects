var dataLoad_rate, args, handle_miniRate, tableEvent_miniRate, roleCode = isR(comn.user.roleList);
args = comn.getArgs();
//修改表格统一配置参数
var tableConfig = {};
$.map(comn.table, function (v, k) {
    tableConfig[k] = v;
});
tableConfig['height'] = "300";
tableConfig['pagination'] = false;
function isR(val) {
    var reloCode = false;
    $.each(val, function(i, v){
        if (v.roleCode === "R99") {
            reloCode = true;
            return false;
        }
    });
    return reloCode;
}
//如果roleCode存在R99或者车商流程节点为汽车金融部时 则可编辑
if (roleCode || args["currentNodeKey"] === "LOAN_CAR_FINANCE") {
    $("#addNewMiniRate-btn").removeClass("hide");
} else {
    $("#addNewMiniRate-btn").addClass("hide");
}



//设置最低手续费率
dataLoad_rate = function(params) {   
    tableData(params, {dealerId: args["dealerId"] }, interUrl.carDealer.getLowestFeeList)
}
$("#miniRateTable").bootstrapTable(comn.table);
//营销品牌集团
$(".dealerGroupId").getDealerGroup();
//新增最低利率
$(document).on("click", "#addNewMiniRate-btn", function() {
    $("#addMiniRate").modal("show");
    $("#addMiniRateForm input, #addMiniRateForm select").val("");
    $("#addMiniRateTable").bootstrapTable("destroy").bootstrapTable(tableConfig);
});
handle_miniRate = function (value, row, index) {
    return "<button type='button' class='btn btn-xs btn-primary cancle' data-id="+ row.id +">取消</button>";
};
tableEvent_miniRate = {
    "click .cancle": function (e, a, item, index) {
        comn.ajax({
            url: interUrl.carDealer.removeLowestFee,
            data: {
                lowestFeeId: $(this).attr("data-id")
            },
            success: function(data) {
                var data = $("#addMiniRateTable").bootstrapTable('getData');
                $("#addMiniRateTable").bootstrapTable('remove', {
                    field: 'id',
                    values: [data[index].id]
                }).bootstrapTable(comn.table);
                tip({content: "取消成功!"})
            }
        })
     },
    "click .delete": function (e, a, item, index) {
        comn.ajax({
            url: interUrl.carDealer.removeLowestFee,
            data: {
                lowestFeeId: item.id
            },
            success: function(data) {
                $("#miniRateTable").bootstrapTable("refresh");
                tip({content: "删除成功!"})
            }
        })
    },
    "click .update": function(e, a, item, index) {
        $("#updataMiniRateForm").values(item);
        $("#updataMiniRate").modal("show");
    }
}
handle_miniRate1 = function (value, row, index){
    return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'><li><a class='delete'>删除</a></li><li><a class='update'>编辑</a></li></ul>", "</div>"].join("");
}
//修改时保存
$(document).on("click", "#saveUpdat", function(){
    $("#updataMiniRateForm").validate();
    if ($("#updataMiniRateForm").valid() == true) {
        comn.ajax({
            url: interUrl.carDealer.updateLowestFee,
            data: $.extend($("#updataMiniRateForm").values(), {carDealerId : args["dealerId"]}),
            success: function(res) {
                $("#miniRateTable").bootstrapTable("refresh");
                $("#updataMiniRate").modal("hide");
                tip({content: "修改成功!"})
            }
        })
    }
})
//营销品牌集团更改时
$(document).on("change", ".dealerGroupId", function(){
    $(this).prev().val($(this).find('option:selected').text() === "--请选择--" ? "" : $(this).find('option:selected').text());
})
//确定
$(document).on("click", ".refreshTable, .tipClick", function(){
    $("#miniRateTable").bootstrapTable("refresh");
    $("#addMiniRate").modal("hide");
})
//新增
$(document).on("click", "#btn_addNew", function(){
    var o = $("#addMiniRateForm").values();
    o.carDealerId = args["dealerId"];
    if (o.dealerGroupId) {
        o.dealerGroupId = o.dealerGroupId.toString();
    }
    $("#addMiniRateForm").validate();
    if ($("#addMiniRateForm").valid() == true) {
        comn.ajax({
                url: interUrl.carDealer.addLowestFee,
                data: o,
                success: function(res) {
                    //var data = $("#addMiniRateTable").bootstrapTable('getData');
                    //var _index = 0;
                    if (res.data) {
                        //if (isId()){
                        //    $("#addMiniRateTable").bootstrapTable('updateRow', {index: _index, row: res.data});
                        //} else {
                        //    $("#addMiniRateTable").bootstrapTable('append', res.data);
                        //}
                        $("#addMiniRateTable").bootstrapTable('append', res.data);
                    }
                    tip({content: "新增成功!"});
                    //function isId() {
                    //    var flag = false;
                    //    $.each(data, function(i, v) {
                    //        if (v.id === res.data.id) {
                    //            flag = true;
                    //            _index = i;
                    //            return false;
                    //        }
                    //    });
                    //    return flag;
                    //}
                }
            }
        )
    }
});
$(".handingFee").on('keyup', function () {
    var val = $(this).val();
    if (val && !isNaN(val)) {
        if (val >= 100) {
            val = "";
        } else {
            var len = val.length;
            var dot = val.indexOf('.');
            var _int = parseInt(val);
            var dotCount = val.substring(dot + 1, len);
            if (dotCount.length > 4) {
                dotCount = dotCount.substr(0, 4);
                val = _int + '.' + dotCount;
            } else {
                val = val;
            }
        }
    } else {
        val = "";
    }

    $(this).val(val);
});