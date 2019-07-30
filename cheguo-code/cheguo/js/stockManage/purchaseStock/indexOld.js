var dataLoad_1, dataLoad_2, applyStatus, not_handle, handle, tableEvent, selectStr;

// 查询未入库
dataLoad_1 = function(params) {
    tableData(params, $.extend($("#searchForm").values(), {
    }), interUrl.mockList || interUrl.purchase.notStocklist);
};

// 查询入库中
dataLoad_2 = function(params) {
    tableData(params, $.extend($("#searchForm").values(), {
    }), interUrl.mockList || interUrl.purchase.stockList);
};

$("select[name='orgId']").getOrg();

applyStatus = function(value, row, index) {
    var arrayValue = "";
    if (value == 2) {
        arrayValue = "已签合同";
    } else if (value == 3) {
        arrayValue = "入库中";
    } else if (value == 4) {
        arrayValue = "已入库";
    }
    return arrayValue;
};

not_handle = function(value, row, index) {
    return [
        "<div class='btn-group btn-group-xs'>",
        "<button type='button' class='btn btn-primary dropdown-toggle show' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>入库处理",
        "</button>", "</div>" ].join("");
};

handle = function(value, row, index) {
    return [
        "<div class='btn-group btn-group-xs'>",
        "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作",
        "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>",
        "</button>", "<ul class='dropdown-menu' role='menu'>",
        "<li><a class='update'>修改</a></li>",
        "<li><a class='delete'>删除</a></li>",
        "<li><a class='info'>查看详情</a></li>", "</ul>", "</div>" ].join("");
};

del_handle = function(value,row, index){
    if(row['stockStatus'] == 2){
        return "";
    }
    return ["<div class='btn-group btn-group-xs'>",
        "<button type='button' class='btn btn-primary dropdown-toggle del' ",
        "data-toggle='dropdown'aria-haspopup='true' aria-expanded='false' ",
        ">删除</button></div>"].join("");
}

handle_1 = function(value, row, index) {
    var stockGroupIdStr = "<select name='stockGroupId" + index +
        "' onchange = 'this.nextSibling.value = this.options[this.options.selectedIndex].text' >";
    var selectArray = [];
    for(var i=0; i< selectStr.length; i++){
        selectArray[i] = selectStr[i];
    }
    if(row['stockGroupId']){
        for(var i=0; i< selectArray.length; i++){
            if(selectArray[i].indexOf("value='" + row['stockGroupId'] + "'") > -1){
                selectArray[i] = selectArray[i].replace("optStr","selected");
            }
        }
    }
    for(var i=0; i< selectArray.length; i++){
        selectArray[i] = selectArray[i].replace("optStr","");
        stockGroupIdStr = stockGroupIdStr + selectArray[i];
    }
    stockGroupIdStr = stockGroupIdStr + "</select>";
    stockGroupIdStr = stockGroupIdStr + "<input type='hidden' name = 'stockGroupName" + index;
    if(row['stockGroupName']){
        stockGroupIdStr = stockGroupIdStr + " value = '" + row['stockGroupName'] + "'";
    }
    stockGroupIdStr = stockGroupIdStr + "'/>";
    return [stockGroupIdStr].join("");
};

tableEvent = {
    "click .show" : function(e, a, item, index) {
        $("#table_2").bootstrapTable('removeAll');
        $("#addTableId").val("0");
        $("#save").removeClass("hide");
        $("#addUser").modal("show");
        $("#adds").removeClass("hide");
        $("#notStock").html("未入库数");
        $("#modalTitle").html("新增采购入库");
        $("#table_2").bootstrapTable('hideColumn', 'id');
        $("#table_2").bootstrapTable('hideColumn', 'stockGroupName');
        selectStr = [];
        comn .ajax({
            url : interUrl.purchase.stockaddGet,
            data : {
                id : item['id']
            },
            success : function(res) {
                console.log(res);
                $("input[name='purchaseApplyId']").val(res.data.id);
                $("input[name='purchaseContractId']").val(res.data.purchaseContractId);
                $("input[name='applyOrgId']").val(res.data.applyOrgId);
                $("input[name='applyOrgName']").val(res.data.applyOrgName);
                $("input[name='contractNum']").val(res.data.contractNum);
                $("input[name='applyNum']").val(res.data.applyNum);
                $("input[name='otherRequest']").val( res.data.otherRequest);
                $("input[name='modelType']").val(res.data.modelType);
                $("input[name='itemName']").val(res.data.itemName);
                $("input[name='supplier']").val(res.data.supplier);
                $("input[name='purchaseStockNum']").val(res.data.purchaseStockNum);
                $("input[name='stock']").val(res.data.notStock);
                comn .ajax({
                    url : interUrl.common.getGroup,
                    data : {
                        companyId : res.data.applyOrgId
                    },
                    success : function(res1) {
                        var j, len, o, ref, str;
                        //selectStr = "<select name='stockGroupId' onchange = 'this.nextSibling.value = this.options[this.options.selectedIndex].text' >";
                        selectStr[0] = "<option value=''>--请选择--</option>";
                        ref = res1.data;
                        for (j = 0, len = ref.length; j < len; j++) {
                            o = ref[j];
                            selectStr[j+1] = "<option value='" + o.id + "' optStr>" + o.name + "</option>";
                        }
                    }
                });
            }
        });
        return $("#table2").bootstrapTable("selectPage", 1);
    },
    "click .delete" : function(e, a, item, index) {
        $("#sure").modal("show");
        $("#deleteId").val(item['id']);
    },
    "click .update" : function(e, a, item, index){
        $("#modalTitle").html("修改采购入库");
        getDetail(item['id']);
    },
    "click .info" : function(e, a, item, index){
        $("#modalTitle").html("查看采购入库");
        getDetail(item['id'], 1);
    },
    "click .del" : function(e, a, item, index){
        var data = $("#table_2").bootstrapTable('getData');
        $("#table_2").bootstrapTable('remove', {
            field: 'id',
            values: [data[index].id]
        });
    }
};

getDetail = function(id,type){
    $("#table_2").bootstrapTable('removeAll');
    $("#addUser").modal("show");
    $("#notStock").html("已入库数");
    $("#adds").addClass("hide");
    $("#table_2").bootstrapTable('hideColumn', 'id');
    $("#table_2").bootstrapTable('hideColumn', 'stockGroupName');
    selectStr = [];
    if(type == 1){
        $("#save").addClass("hide");
    }else {
        $("#save").removeClass("hide");
    }
    comn .ajax({
        url : interUrl.purchase.stockaddGet,
        data : {
            id : id,
            flag : 1
        },
        success : function(res) {
            $("input[name='id']").val(res.data.id);
            $("input[name='purchaseApplyId']").val(res.data.purchaseApplyId);
            $("input[name='purchaseContractId']").val(res.data.purchaseContractId);
            $("input[name='applyOrgId']").val(res.data.applyOrgId);
            $("input[name='applyOrgName']").val(res.data.applyOrgName);
            $("input[name='contractNum']").val(res.data.contractNum);
            $("input[name='applyNum']").val(res.data.applyNum);
            $("input[name='otherRequest']").val( res.data.otherRequest);
            $("input[name='modelType']").val(res.data.modelType);
            $("input[name='itemName']").val(res.data.itemName);
            $("input[name='supplier']").val(res.data.supplier);
            $("input[name='purchaseStockNum']").val(res.data.purchaseStockNum);
            $("textarea[name='remarks']").val(res.data.remarks);
            $("input[name='stockTime']").val(dateFormTen(res.data.stockTime));
            $("input[name='stock']").val(res.data.stock);
            comn .ajax({
                url : interUrl.common.getGroup,
                data : {
                    companyId : res.data.applyOrgId
                },
                success : function(res1) {
                    var j, len, o, ref, str;
                    //selectStr = "<select name='select0' onchange = 'this.nextSibling.value = this.options[this.options.selectedIndex].text'>";
                    selectStr[0] = "<option value=''>--请选择--</option>";
                    ref = res1.data;
                    for (j = 0, len = ref.length; j < len; j++) {
                        o = ref[j];
                        selectStr[j+1] = "<option value='" + o.id + "' optStr>" + o.name + "</option>";
                    }
                    //selectStr = selectStr + "</select>";
                    comn.ajax({
                        url : interUrl.purchase.getDetail,
                        data : {id : id},
                        success : function(res2){
                            $("#addTableId").val(res2.data.length + 1);
                            $("#table_2").bootstrapTable("append", res2.data);
//							var tr = ""
//							var treckSelect = "";
//							for(var i=0; i< res2.data.length;i++ ){
//								treckSelect = selectStr.replace("select0", "stockGroupId" + i);
//								tr = "<tr class='list'>" +
//								"<td width='85'> " + res.data.applyOrgName;
//								if(res2.data[i].stockStatus == 2){
//									tr = tr + "<input type='hidden' name = 'id" + i + "' value ='" + res2.data[i].id + "'/>";
//								}
//								tr = tr + "</td>"
//								+ "<td width='90'>1</td> "
//								+ "<td width='85'>" + res.data.itemName + "</td>"
//								+ "<td width='50'>" + res.data.modelType + "</td>"
//								+ "<td width='80'>" + res.data.otherRequest + "</td>"
//								+ "<td width='70'><input type='text' size='7' name = 'gpsNum" + i + "' value='"+res2.data[i].gpsNum+"' ";
//								if(res2.data[i].stockStatus == 2){
//									tr = tr + " disabled ";
//								}
//								tr = tr +
//								"/></td>"
//								+ "<td width='70'><input type='text' size='7' name = 'otherAttribute"
//								+ i + "' value='"+res2.data[i].otherAttribute+"'";
//								if(res2.data[i].stockStatus == 2){
//									tr = tr + " disabled ";
//								}
//								tr = tr +
//								"/></td>"
//								+ "<td width='80'>" + treckSelect + "<input type='hidden' name = 'stockGroupName"
//								+ i + "' value='" + res2.data[i].stockGroupName+ "' ";
//								if(res2.data[i].stockStatus == 2){
//									tr = tr + " disabled ";
//								}
//								tr = tr + "/></td>" + "<td width='50'>"
//								if(res2.data[i].stockStatus == 1){
//									tr = tr  + "<div class='btn-group btn-group-xs'>"
//									+ "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' "
//									+ "aria-haspopup='true' aria-expanded='false' onclick='this.parentNode.parentNode.parentNode.remove();'>"
//									+ "删除</button></div>";
//								}
//								tr = tr + "</td>" + "</tr>";
//								$("#table_2").append(tr);
//								$("select[name=stockGroupId"+i+"]").val(res2.data[i].stockGroupId);
//							}
                        }
                    });
                }
            });

        }
    });
}

$(function() {
    $('#adds').click(
        function() {
            var addTableId = $("#addTableId").val();
            var data = {};
            data['id'] = parseInt(addTableId) + 1;
            data['applyOrgName'] = $("#applyOrgName").val();
            data['stockNumber'] = 1;
            data['itemName'] = $("#itemName").val();
            data['modelType'] = $("#modelType").val();
            data['otherRequest'] = $("#otherRequest").val();
            data['gpsNum'] = "--";
            data['otherAttribute'] = "--";
            $("#table_2").bootstrapTable("append", data);
            addTableId = parseInt(addTableId) + 1;
            $("#addTableId").val(addTableId);
//						var addTableId = $("#addTableId").val();
//						var treckSelect = selectStr.replace("select0",
//								"stockGroupId" + addTableId);
//						var tr = "<tr class='list'>" +
//								"<td width='85'> " + $("#applyOrgName").val() + "</td>"
//								+ "<td width='90'>1</td> "
//								+ "<td width='85'>" + $("#itemName").val() + "</td>"
//								+ "<td width='50'>" + $("#modelType").val() + "</td>"
//								+ "<td width='80'>" + $("#otherRequest").val() + "</td>"
//								+ "<td width='70'><input type='text' size='7' name = 'gpsNum" + addTableId + "'/></td>"
//								+ "<td width='70'><input type='text' size='7' name = 'otherAttribute"
//								+ addTableId + "'/></td>"
//								+ "<td width='80'>" + treckSelect + "<input type='hidden' name = 'stockGroupName"
//								+ addTableId + "'/></td>"
//								+ "<td width='50'><div class='btn-group btn-group-xs'>"
//								+ "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' "
//								+ "aria-haspopup='true' aria-expanded='false' onclick='this.parentNode.parentNode.parentNode.remove();'>"
//								+ "删除</button></div></td>" + "</tr>";
//						addTableId = parseInt(addTableId) + 1;
//						$("#table_2").append(tr);
//						$("#addTableId").val(addTableId);
        });
});

$("#save").click(function() {
    var _data = {};
    _data['id'] = $("#id").val();
    _data['purchaseApplyId'] = $("#purchaseApplyId").val();
    _data['purchaseContractId'] = $("#purchaseContractId").val();
    _data['stockTime'] = $("#stockTime").val();
    _data['remarks'] = $("#remarks").val();
    _data['purchaseStockNum'] = $("#purchaseStockNum").val();
    _data['applyOrgId'] = $("#applyOrgId").val();
    _data['applyOrgName'] = $("#applyOrgName").val();
    _data['contractNum'] = $("#contractNum").val();
    _data['applyNum'] = $("#applyNum").val();
    _data['otherRequest'] = $("#otherRequest").val();
    _data['modelType'] = $("#modelType").val();
    _data['itemName'] = $("#itemName").val();
    _data['supplier'] = $("#supplier").val();
    _data['stockTime'] = $("#stockTime").val();
    _data['purchaseStockNum'] = $("#purchaseStockNum").val();
    _data['stock'] = $("#stock").val();
    var _table = $("#table_2").bootstrapTable('getData');
    if(_table.length == 0){
        tip({
            content : "明细不能为空!"
        });
        return;
    }
    var i = 0;
    for(i=0; i<_table.length;i++){
        if(_table[i]['stockStatus'] == '2'){
            _data["purchaseStockList[" + i + "].id"] = _table[i]['id'];
        }
        _data["purchaseStockList[" + i + "].gpsNum"] = _table[i]['gpsNum'];
        _data["purchaseStockList[" + i + "].otherAttribute"] = _table[i]['otherAttribute'];
        _data["purchaseStockList[" + i + "].stockGroupName"] = _table[i]['stockGroupName'];
    }
    i = 0;
    jQuery.each($("#table_2").values(), function(key, val) {
        if (key.indexOf("stockGroupId") > -1) {
            _data["purchaseStockList[" + i + "].stockGroupId"] = val;
        }
        if (key.indexOf("stockGroupName") > -1) {
            if(val.indexOf("--") > - 1){
                _data["purchaseStockList[" + i + "].stockGroupName"] = "";
            }else {
                _data["purchaseStockList[" + i + "].stockGroupName"] = val;
            }
            i++;
        }
    });
    console.log(_data);
    comn.ajax({
        url : interUrl.purchase.stockadd,
        data : _data,
        success : function(res) {
            tip({
                content : "保存成功!"
            });
            $("#useNotList").find("table").bootstrapTable("selectPage", 1);
            $("#useList").find("table").bootstrapTable("selectPage", 1);
            $("#addUser").modal("hide");
        }
    });
})

$("#OK").click(function(){
    comn.ajax({
        url : interUrl.purchase.stockDel,
        data : {id : $("#deleteId").val()},
        success : function(res){
            tip({
                content : "删除成功!"
            });
            $("#useNotList").find("table").bootstrapTable("selectPage", 1);
            $("#useList").find("table").bootstrapTable("selectPage", 1);
            $("#sure").modal("hide");
        }
    });

});

$("#useNotListTab").click(function(){
    $("#contractStatus").removeClass("hide");
});

$("#useListTab").click(function(){
    $("#contractStatus").addClass("hide");
});

$("#btn-search-test").click(function() {
    var activeTab;
    activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
    return $("#" + activeTab).find("table").bootstrapTable("refresh", {url: '...'});
});

$(function(){
    $("#table_2").bootstrapTable({
        "undefinedText": "--",
        "classes": "table-striped table-hover table",
        "pagination": false,
        "sidePagination": "server",
        "clickToSelect": true,
        "height": "500"
    })
});