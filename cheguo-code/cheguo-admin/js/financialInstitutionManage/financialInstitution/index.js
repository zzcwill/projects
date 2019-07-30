var args, dataLoad_1, tableEvent, handle, zTreeOnClick, g_isModify = false;

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
//ajax提交所需参数
dataLoad_1 = function(params) {
    var _bankId = $("#bankId").val();
    var data = {
        bankId: _bankId
    };
    if (_bankId) {
        tableData(params, data, interUrl.mockList || interUrl.financialInstitution.rateInfosGet);
    } else {
        return params.complete();
    }
};

tableEvent = {
    "click .stop" : function(e, a, item, index) {
        return comn.ajax({
            url : interUrl.financialInstitution["rateInfosSetStatus"],
            data : {
                productNo : item['productNo'],
                status : item["status"] == 1 ? 0 : 1
            },
            success : function(res) {
                tip({
                    content : (item["status"] == 1 ? "停用" : "启用") + "成功!"
                });
                $("#table").bootstrapTable('refresh');
            }
        });
    },
    "click .delete" : function(e, a, item, index) {
        $("#sure .modal-body").text("确定删除？");
        $("#sure").modal("show");
        return $("#OK").unbind("click").on("click", function() {
            return comn.ajax({
                url : interUrl.financialInstitution["rateInfosDel"],
                data : {
                    productNo : item['productNo']
                },
                success : function(res) {
                    tip({
                        content : "删除成功!"
                    });
                    $("#sure").modal("hide");
                    $("#table").bootstrapTable('refresh');
                }
            });
        });
    },
    "click .copy" : function(e, a, item, index) {
        $("#sure .modal-body").text("确定复制？");
        $("#sure").modal("show");
        return $("#OK").unbind("click").on("click", function() {
            var _bankId = $("#bankId").val();
            return comn.ajax({
                url: interUrl.financialInstitution.copy,
                data:{bankId : _bankId,productNo : item.productNo},
                success: function (res) {
                    if (res && res.code == 10000) {
                        
                        $("#copyProduct").modal("hide");
                        $("#sure").modal("hide");
                        $("#table").bootstrapTable('refresh');
                        tip({
                            content : "复制成功"
                        });
                    }
                    
                    if (res && res.code == 20000) {
                        alert('系统繁忙，请稍后重试！');
                    }
                }
            });
        });
    },
    "click .modify" : function(e, a, item, index) {
        resetTab();
        comn.ajax({
            url : 'cooperation/product/getProductDetail',
            data : {
                productNo : item.productNo
            },
            success : function(resp) {
                var o = resp.data;
                $("#doubleCardTab").addClass("hide");
                $("#addProduct").modal("show");
                $("#addProduct").find(".modal-title").html("修改金融产品信息");
                $("#addProductForm, #signleCardForm").values(o[0]);
                $("#creditCardType").val("1");
                if (o.length == 2) {
                    $("#doubleCardTab").removeClass("hide");
                    $("#doubleCardForm").values(o[1]);
                    $("#creditCardType").val("2");
                }
                $("#controlBox, #doubleControlBox").html("");
                var len = resp.data.length;
                for (var i = 0; i < len; i++) {
                    for (var j = 0; j < o[i].bankFinancialConditions.length; j++) {
                        if (i === 0) {
                            addControllBox("controlBox");
                            $("#controlBox").find(".controlList").eq(j).dataValues1(o[i].bankFinancialConditions[j]);
                        }
                    }
                }
            }
        });
    }
};
function resetTab(){
    $("#signCardTab").addClass("active").trigger("click").siblings().removeClass("active");
    $("#singleCard").addClass("active");
    $("#doubleCard").removeClass("active");
}
handle = function(value, row, index) {
    var btnStatus = "<li><a class='stop'>"
            + (row["status"] == "1" ? "停用" : "启用") + "</a></li>";
    return [
        "<div class='btn-group btn-group-xs'>",
        "<button type='button' class='btn btn-primary'>操作</button>",
        "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>",
        "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>",
        "</button>", "<ul class='dropdown-menu' role='menu'>",
        "<li><a class='modify'>修改</a></li>", btnStatus,
        "<li><a class='delete'>删除</a></li>",
        "<li><a class='copy'>复制</a></li>","</ul>", "</div>" ].join("");
};

current_node = null;

zTreeOnClick = function(event, treeId, treeNod) {
    current_node = treeNod;
    console.log(current_node)
    $("#guaranteeName").html(current_node.organizationName);
    
    openBank();
    $("#table_bankVerify").bootstrapTable("refresh");
};

openBank = function() {
    $("#orgForm .businessRange input").prop("checked", false); //将业务范围的值清空
    var businessRange = current_node.businessRange;
    $("#orgForm").values(current_node);
    if (businessRange) {
        var businessRangeArr = businessRange.split(",");
        for (var i = 0; i < businessRangeArr.length; i++) {
            $("#orgForm .businessRange input[data-val='" + businessRangeArr[i] + "']").prop("checked", true);
        }
        
    }
    setTimeout(function(){
        $('.selectpicker').selectpicker();
        $('#orgForm .productTag').selectpicker('val', current_node.productTag ? current_node.productTag.split(",") : '');
        $('#orgForm .loanType').selectpicker('val', current_node.loanType ? current_node.loanType.split(",") : '');
        $('#orgForm .selectpicker').selectpicker('refresh');
    }, 700);
    setButtonStatus();
    $("#allGuarantee").html();
    comn.ajax({
        url : interUrl.financialInstitution.guaranteeGet,
        data : {
            bankId : current_node.id
        },
        success : function(res) {
            var _html = "";
            if (res.data) {
                $("#allGuarantee").html(res.data.organizationName);
            } else {
                $("#allGuarantee").html("");
            }
        }
    });
    
    $("#table").bootstrapTable('refresh');
    $("#stop .title").html(current_node['status'] == 0 ? "启用" : "停用");
    
    if (current_node.getParentNode()) {
        $("#orgForm").find("#parentOrg").val(
                current_node.getParentNode().bankName);
        $("#orgForm").find("#parentOrgId").val(current_node.parentId);
    } else
        $("#orgForm").find("#parentOrg").val("");
};

openTree = function() {
    comn.ajax({
        url : interUrl.financialInstitution.tree,
        success : function(res) {
            var treeObj;
            treeObj = $.fn.zTree.init($("#tree"), {
                showLine : true,
                expand : true,
                callback : {
                    onClick : zTreeOnClick
                },
                data : {
                    key : {
                        name : "bankName"
                    },
                    simpleData : {
                        enable : true,
                        idKey : "id",
                        pIdKey : "parentId",
                        rootPId : 0
                    }
                }
            }, res.data);
            return treeObj.expandAll(true);
        }
    });
}

setButtonStatus = function() {
    var span = $('#modify').find("span:last");
    if (g_isModify == true) {
        span.html("&nbsp;取消&nbsp;");
        $("#orgForm").find(":input").attr("disabled", false);
        $("#orgForm").find("#parentOrg").attr("disabled", true);
        $("#orgForm").find("#bankOutlets").attr("disabled", true);
        $("#orgForm .productTag button, #orgForm .loanType button").removeClass("disabled");
        $("#orgForm").find("#save").show();
    } else {
        span.html("&nbsp;修改&nbsp;");
        $("#orgForm").find(":input").not(":button").attr("disabled", true);
        $("#orgForm .productTag button, #orgForm .loanType button").addClass("disabled");
        $("#orgForm").find("#save").hide();
    }
}

$("#province_1").change(function(){
    $("#provinceName_1").val($(this).find('option:selected').text());
});
$("#city_1").change(function(){
    $("#cityName_1").val($(this).find('option:selected').text());
});
$("#area_1").change(function(){
    $("#countyName_1").val($(this).find('option:selected').text());
});

$("#province_2").change(function(){
    $("#provinceName_2").val($(this).find('option:selected').text());
});
$("#city_2").change(function(){
    $("#cityName_2").val($(this).find('option:selected').text());
});
$("#area_2").change(function(){
    $("#countyName_2").val($(this).find('option:selected').text());
});
$(document).on("click", ".deleted", function(index) {
    $(this).parents(".controlList").remove();
    $("#controlBox").find(".controlList").each(function (index) {
        $(this).find("[data-name='id']").attr("name", "bankFinancialConditions[" + index + "].id");
        $(this).find("[data-name='productId']").attr("name", "bankFinancialConditions[" + index + "].productId");
        $(this).find("[data-name='parameter1']").attr("name", "bankFinancialConditions[" + index + "].parameter1");
        $(this).find("[data-name='symbol']").attr("name", "bankFinancialConditions[" + index + "].symbol");
        $(this).find("[data-name='parameter2']").attr("name", "bankFinancialConditions[" + index + "].parameter2");
        $(this).find("[data-name='conditionExplain']").attr("name", "bankFinancialConditions[" + index + "].conditionExplain");
        $(this).find("[data-name='isEnable']").attr("name", "bankFinancialConditions[" + index + "].isEnable");
    });
})
saveOrg = function(_formEl, _callback) {
    var _form = $("#"+ _formEl);
    var codes = '';
    var _data = _form.values();
    _form.find($('.businessRange input[type=checkbox]:checked')).each(function(i, v){
        codes += "," + $(v).attr("data-val");
    });
    if(codes.length>0)codes = codes.substr(1);
    _data.businessRange =  codes;
    _data.productTag = _formEl === "orgForm" ? $("#productTag").val().join(",") : $("#productTagAdd").val().join(",");
    _data.loanType = _formEl === "orgForm" ? $("#loanType").val().join(",") : $("#loanTypeAdd").val().join(",");
    var _url = _data.id ? interUrl.financialInstitution.update : interUrl.financialInstitution.add;
    return comn.ajax({
        url : _url,
        data : _data,
        success : function(res) {
            if (res.status == 10000) {
                if (_callback)
                    _callback();
                openTree();
                g_isModify = false;
                setButtonStatus();
            } else {
                tip({
                    content : res.message
                });
            }
        }
    });
}

$(function() {
    /**
     *数字字典
     */
    var dataArr =[[".nper", "LoanTerm"],[".orgTypeSelect", "AmountPattern"],[".productTag", "ProductTag",,'-1'],[".loanType", "LoanType",,'-1'],[".creditTemplate", "CreditTemplate"]];
    $.getCommonMethodPort(dataArr, function(){
        $('.selectpicker').selectpicker({noneSelectedText:"请选择(可多选)"});
    }, false);
    setTimeout(function () {
        $('.selectpicker').selectpicker({noneSelectedText:"请选择(可多选)"});
    }, 1000);
    
    $("#province_1").getProvince().change(
        function() {
            var v = this.value || $(this).attr('defaultValue');
            if (v) {
                $("#provinceName_1").val($(this).find('option:selected').text());
                $("#area_1").val("");
                return $("#city_1").getCity(v).unbind("change").change(function() {
                    if (this.value || $(this).attr('defaultValue')) {
                        $("#cityName_1").val($(this).find('option:selected').text());
                        return $("#area_1").getArea(this.value || $(this).attr('defaultValue'));
                    }
                });
        }
    });

    $("#area_1").change(function(){
        $("#countyName_1").val($(this).find('option:selected').text());
    });
    $("#province_2").getProvince().change(
            function() {
                if (this.value) {
                    $("#provinceName_2").val($(this).find('option:selected').text());
                    $("#area_2").val("");
                    return $("#city_2").getCity(this.value).unbind("change").change(function() {
                        if (this.value) {
                            $("#cityName_2").val($(this).find('option:selected').text());
                            return $("#area_2").getArea(this.value);
                        }
                    });
                }
            });
    $("#area_2").change(function(){
        $("#countyName_2").val($(this).find('option:selected').text());
    });
    var validate = {
        rules : {
            companyPhone : {
                phoneMix : true
            },
            companyFax : {
                telephone : true
            }
        },
        messages : {
            companyPhone : {
                phoneMix : "公司电话格式不正确"
            },
            companyFax : {
                telephone : "传真格式不正确"
            }
        }
    };
    $("#addOrgForm").validate(validate);
    $("#orgForm").validate(validate);
    $("#add").click(function() {
        $("#addOrg").modal("show");
        if (current_node) {
            $("#addOrg").find("#parentOrgId").val(current_node.id);
            $("#addOrg").find("#parentOrg").val(current_node.bankName);
        }
    });
    $("#saveOrg").click(function() {
        if ($("#addOrgForm").valid() == false)
            return;
        saveOrg("addOrgForm", function() {
            $("#addOrg").modal("hide");
        });
    });
    $("#modify").click(function() {
        g_isModify = g_isModify ? false : true;
        setButtonStatus();
    });
    $("#save").click(function() {
        if ($("#orgForm").valid() == false)
            return;
        saveOrg("orgForm");
    });
    $("#stop").click(function() {
        if (!current_node) {
            tip({
                content : "请选择一个金融机构!"
            });
        }
        return comn.ajax({
            url : interUrl.financialInstitution["setStatus"],
            data : {
                bankId : current_node['id'],
                status : (current_node['status'] == 0 ? 1 : 0)
            },
            success : function(res) {
                tip({
                    content : "操作成功!"
                });
                openTree();
            }
        });
    });
    $("#del").click(function() {
        if (!current_node) {
            return tip({
                content : "请选择一个金融机构!"
            });
        }
        $("#sure").modal("show");
        return $("#OK").unbind("click").on("click", function() {
            return comn.ajax({
                url : interUrl.financialInstitution["del"],
                data : {
                    bankId : current_node.id
                },
                success : function(res) {
                    tip({
                        content : "操作成功!"
                    });
                    $("#sure").modal("hide");
                    openTree();
                }
            });
        });
    });
    
    $("#addProductBtn, #addDoubleCard").click(function() {
        var _bankId = $("#bankId").val();
        if (_bankId == "") {
            tip({
                content : "请先选择金融机构"
            });
            return;
        }
        resetTab();
        $("#addProduct").find(".modal-title").html("金融产品设置");
        $("#productId").val("");
        $("#controlBox").find("input[data-name='id']").val("");
        // $("#controlBox, #doubleControlBox").html("");
        $("#addProduct input, #addProduct select").val("");
        return $("#addProduct").modal("show");
    });
    
    // 添加控制条件
    $(document).on("click", "#addControl", function() {
        addControllBox();
    })
    $("#saveProduct").unbind("click").click(
            function() {
                var _bankId = $("#bankId").val();
                if (_bankId == "") {
                    tip({
                        content : "请先选择金融机构"
                    });
                    return;
                }
                if($("#addProductForm").valid()==false){
                    return false;
                }
                var _productId = $('#productId').val();
                var _url = _productId == '' ? interUrl.financialInstitution.productAdd
                        : interUrl.financialInstitution.productUpdate;
                var signCardData = $("#addProductForm").values();
                var signCondition = $("#controlBox").values();
                if (JSON.stringify(signCondition) != '{}') {
                    signCardData.bankFinancialConditions = conditionArr(signCondition);
                }
                var dataArr = [];
                dataArr[0] = (Object.assign({}, signCardData, {bankId : _bankId, creditCardType : 1}));
                if ($("#creditCardType").val() == "2"){
                    dataArr[1] = Object.assign({}, {bankId : _bankId, creditCardType :2});
                }
                return comn.ajax({
                    url : _url,
                    contentType: 'application/json',
                    data : {productList : JSON.stringify(dataArr)},
                    success : function(res) {
                        $("#addProduct").modal("hide");
                        $("#table").bootstrapTable('refresh');
                        return $("#btn-search").trigger("click");
                    }
                });
            });
    function conditionArr (arr) {
        var newArray = [];
        var string = "bankFinancialConditions[0]";
        var obj_num = {};
        for (var i in arr) {
            if (string === i.split(".")[0]) {
                obj_num[i.split(".")[1]] = arr[i]
            } else {
                newArray.push(obj_num);
                obj_num = {};
                obj_num[i.split(".")[1]] = arr[i];
            }
            string = i.split(".")[0];
        }
        newArray.push(obj_num);
        return newArray;
    }

    openTree();
});

function addControllBox(getId) {
    if (getId) {
        $box = $("#"+ getId);
    } else {
        var id = $("#configure").find(".active").attr("id");
        var $box = (id === "singleCard") ? $("#controlBox") : $("#doubleControlBox");
    }
    var _index = $box.find(".controlList").length;
    if (_index > 9) {
        return;
    }
    var Borrower = '<div class="controlList panel panel-default"> <div class="panel-body"> <div class="form-group form-group-sm"> <div class="input-tip"> <label class="col-md-2 col-xs-2 col-sm-2 control-label">控制条件：</label> <div class="col-md-3 col-xs-3 col-sm-3"> <input type="hidden" name="bankFinancialConditions['
            + _index
            + '].id" data-name="id" /><input type="hidden" name="bankFinancialConditions['
            + _index
            + '].productId" data-name="productId" /><input name="bankFinancialConditions['
            + _index
            + '].parameter1" data-name="parameter1" class="form-control required" /> </div> </div> <div class="input-tip"> <div class="col-md-3 col-xs-3 col-sm-3"> <select name="bankFinancialConditions['
            + _index
            + '].symbol" data-name="symbol" class="form-control required"> <option value="" selected>--请选择--</option> <option value=">=">大于等于</option> <option value="<=">小于等于</option> <option value=">">大于</option> <option value="<">小于</option> <option value="==">等于</option> </select> </div> </div> <div class="input-tip"> <div class="col-md-3 col-xs-3 col-sm-3"> <input name="bankFinancialConditions['
            + _index
            + '].parameter2" data-name="parameter2" class="form-control required" /> </div> </div> </div> <div class="form-group form-group-sm"> <div class="input-tip"> <label class="col-md-2 col-xs-2 col-sm-2 control-label">控制条件文案：</label> <div class="col-md-3 col-xs-3 col-sm-3"> <input type="text" name="bankFinancialConditions['
            + _index
            + '].conditionExplain" data-name="conditionExplain" placeholder="请输入控制条件文案" class="form-control required" maxlength="99"> </div> </div> <div class="input-tip"> <div class="col-md-3 col-xs-3 col-sm-3"> <select name="bankFinancialConditions['
            + _index
            + '].isEnable" data-name="isEnable" class="form-control required"> <option value="" selected>--请选择--</option><option value="2">未启用</option> <option value="1">启用</option> </select> </div> </div> <div class="input-tip"> <div class="col-md-1 col-xs-1 col-sm-1"> <button class="btn btn-primary deleted">删除</button> </div> </div> </div> </div> </div>';
    
    $box.append(Borrower);
}
//table数据渲染
var tableData = function(params, data, url, callback) {
    var p;
    p = params.data;
    if (url) {
        return comn.ajax({
            url: url,
            data: $.extend(data, p),
            success: function(res) {
                params.success({
                    'total': res.totalItem,
                    'rows': res.data
                });
                params.complete();
                return typeof callback === "function" ? callback(res) : void 0;
            }
        });
    }
};
