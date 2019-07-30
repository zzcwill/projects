var args, dataLoad_1, tableEvent, handle, handle1, zTreeOnClick, g_isModify = false, memberLoad, tableMemberEvent, handle2, bankVerifyLoad;

var dataArr =[[".creditTemplate", "CreditTemplate"]]; //征信模板
$.getCommonMethodPort(dataArr);
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
//		return comn.ajax({
//			url : interUrl.mockList || interUrl.bank.rateInfosGet,
//			data : {
//				bankId : _bankId
//			},
//			success : function(res) {
//				params.success({
//					'total' : res.totalItem,
//					rows : res.data
//				});
//				return params.complete();
//			}
//		});
        tableData(params, data, interUrl.mockList || interUrl.bank.rateInfosGet);
    } else {
        return params.complete();
    }
};

memberLoad = function(params) {
    var _bankId = $("#bankId").val();
    var data = {
        bankId: _bankId
    };
    if (_bankId) {
//		return comn.ajax({
//			url : interUrl.mockList || interUrl.bank.memberGets,
//			data : {
//				bankId : _bankId
//			},
//			success : function(res) {
//				params.success({
//					'total' : res.totalItem,
//					rows : res.data
//				});
//				return params.complete();
//			}
//		});
        tableData(params, data, interUrl.mockList || interUrl.bank.memberGets);
    } else {
        return params.complete();
    }
};
tableMemberEvent = {
    "click #delMember" : function(e, a, item, index) {
        $("#sure").modal("show");
        return $("#OK").unbind("click").on("click", function() {
            return comn.ajax({
                url : "cooperation/member/del",
                data : {
                    memberId : item['id']
                },
                success : function(res) {
                    tip({
                        content : "删除成功!"
                    });
                    $("#sure").modal("hide");
                    $("#table_member").bootstrapTable('refresh');
                }
            });
        });
    }
}
tableEvent = {
    "click .stop" : function(e, a, item, index) {
        return comn.ajax({
            url : interUrl.bank["rateInfosSetStatus"],
            data : {
                productNo : item['productNo'],
                status : item["status"] == 1 ? 0 : 1
            },
            success : function(res) {
                tip({
                    content : (item["status"] == 1 ? "停用" : "启用") + "成功!"
                });
                return $("#btn-search").trigger("click");
            }
        });
    },
    "click .delete" : function(e, a, item, index) {
        $("#sure .modal-body").text("确定删除？");
        $("#sure").modal("show");
        return $("#OK").unbind("click").on("click", function() {
            return comn.ajax({
                url : interUrl.bank["rateInfosDel"],
                data : {
                    productNo : item['productNo']
                },
                success : function(res) {
                    tip({
                        content : "删除成功!"
                    });
                    $("#sure").modal("hide");
                    return $("#btn-search").trigger("click");
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
                url: 'cooperation/copyProduct',
                data:{bankId : _bankId,productNo : item.productNo},
                success: function (res) {
                    if (res && res.code == 10000) {

                        $("#copyProduct").modal("hide");
                        $("#sure").modal("hide");
                        $("#btn-search").trigger("click");
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
                        } else {
                            addControllBox("doubleControlBox");
                            $("#doubleControlBox").find(".controlList").eq(j).dataValues1(o[i].bankFinancialConditions[j]);
                        }
                    }
                }

                // for(var i=0;i<resp.data.length;i++){
                // var condition = resp.data[i];
                // var no = {
                // id:condition.id,
                // productId:condition.productId,
                // parameter1:condition.parameter1,
                // symbol:condition.symbol,
                // parameter2:condition.parameter2,
                // conditionExplain:condition.conditionExplain,
                // isEnable:condition.isEnable
                // }
                //
                // window.bankFinancialConditions.push(no);
                // }
                // console.log('loaded user roles:',window.addedRoles);
            }
        });
    }
};
function resetTab(){
    $("#signCardTab").addClass("active").trigger("click").siblings().removeClass("active");
    $("#singleCard").addClass("active");
    $("#doubleCard").removeClass("active");
}
//银行信审
handle2 = function(value, row, index) {
    return [
        "<div class='btn-group btn-group-xs'>",
        "<button type='button' class='btn btn-primary delBankVerify'>删除</button>" + "</div>" ].join("");
}
bankVerifyLoad = function(params) {
    var _bankId = $("#bankId").val();
    var data = {
        bankId: _bankId
    };
    if (_bankId) {
        tableData(params, data, interUrl.mockList || interUrl.bank.userBankList);
    } else {
        return params.complete();
    }
};
tableBankVerifyEvent = {
    "click .delBankVerify" : function(e, a, item, index) {
        $("#sure").modal("show");
        return $("#OK").unbind("click").on("click", function() {
            return comn.ajax({
                url : interUrl.bank.userBankDel,
                data : {
                    userId : item['userId'],
                    bankId: item['bankId']
                },
                success : function(res) {
                    tip({
                        content : "删除成功!"
                    });
                    $("#sure").modal("hide");
                    $("#table_bankVerify").bootstrapTable('refresh');
                }
            });
        });
    }
}
handle1 = function(value, row, index) {
    return [
        "<div class='btn-group btn-group-xs'>",
        "<button type='button' class='btn btn-primary' id='delMember'>删除</button>" + "</div>" ].join("");
};

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

    $("#allMember").html();
    comn.ajax({
        url : "cooperation/member/get",
        data : {
            bankId : current_node.id
        },
        success : function(res1) {
            var _html = '';
            if (res1.data) {
                for(var i=0;i<res1.data.length;i++){
                    _html += "<span mid='"+res1.data[i].memberId +"'>"+res1.data[i].memberName+"</span>" +"&nbsp;&nbsp;";
                }
                $("#allMember").html(_html);
            } else {
                $("#allMember").html("");
            }
        }
    });

    $("#allGuarantee").html();
    comn.ajax({
        url : interUrl.bank.guaranteeGet,
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
    $("#table_member").bootstrapTable('refresh');
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
        url : interUrl.bank.tree,
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

            /*
             * var node = treeObj.getNodes()[0]; if(node){
             * treeObj.selectNode(node); zTreeOnClick(null, null, node); }
             */

            return treeObj.expandAll(true);
        }
    });
}

setButtonStatus = function() {
    var span = $('#modify').find("span:last");
    if (g_isModify == true) {
        span.html("&nbsp;取消&nbsp;");
        $("#orgForm").find(":input").attr("disabled", false);
        $("#orgForm .productTag button, #orgForm .loanType button").removeClass("disabled");
        $("#orgForm").find("#parentOrg").attr("disabled", true);
        $("#orgForm").find("#bankOutlets").attr("disabled", true);
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
    var _url = _data.id ? interUrl.bank.update : interUrl.bank.add;
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
table_2 = function(params) {

    var p = params.data;
    return comn.ajax({
        url: "cooperation/internal/list",
        data: $.extend($("#addMemberForm").values(), p),
        success: function(res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            return params.complete();
        }
    });
};

//$("#creditCardType").click(function() {
//    if ($(this).val() == "2") {
//        $("#doubleCardTab").removeClass("hide");
//
//    } else {
//        $("#doubleCardTab").addClass("hide");
//    }
//});
$(".nav-tabs li").click(function(){
    if ($(this).attr("id") === "doubleCardTab") {
        $("#readOnlyDouble").prop("disabled", "disabled");
        $("#isCardDouble").prop("disabled", false);
        $("#doubleCardForm input[name=productName]").val($("#addProductForm input[name=productName]").val());
        $("#doubleCardForm input[name=businessType], #doubleCardForm select[name=businessType]").val($("#addProductForm select[name=businessType]").val());
        $("#doubleCardForm input[name=nper], #doubleCardForm select[name=nper]").val($("#addProductForm select[name=nper]").val());
    } else {
        $("#readOnlyDouble").prop("disabled", false);
        $("#isCardDouble").prop("disabled", "disabled");
    }
})
$("#copyProductBtn").click(function() {
    var _bankId = $("#bankId").val();
    if (_bankId == "") {
        tip({
            content : "请先选择银行"
        });
        return;
    }
    return $("#copyProduct").modal("show");
});
//TODO
$("#saveCopyProduct").click(function() {
    var _bankId = $("#bankId").val();
    if (_bankId == "") {
        tip({
            content : "请先选择银行"
        });
        return;
    }

    var _productId = $("#proList").val();

    if(_productId == null || _productId == ""){
        tip({
            content : "请先选择需要复制的金融产品"
        });
        return;
    }
    comn.ajax({
        url: 'cooperation/copyProduct',
        data:{bankId : _bankId,productNo : _productId},
        success: function (res) {
            if (res && res.code == 10000) {

                $("#copyProduct").modal("hide");
                $("#btn-search").trigger("click");
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



/*
 * saveProduct = function(_form, _callback){ var _data = _form.values(); var
 * _url = _data.id?interUrl.bank.addProduct:interUrl.bank.productUpdate; return
 * comn.ajax({ url: _url, data: $.extend(_data, {bankId:_bankId,id:_rateId}),
 * success: function(res) { if(res.status==10000){ if(_callback)_callback();
 * openTree(); g_isModify = false; setButtonStatus(); }else{
 * tip({content:res.message}); } } }); }
 */
$(document).on("click", "#defendDir", function(){
    $("#addDirForm input").val("");
    var _bankId = $("#bankId").val();
    if (_bankId == "") {
        tip({
            content: "请先选择银行"
        });
    } else {
        $("#addDefendDir").modal("show");
        $("#table_dir").bootstrapTable(comn.table);
        $("#table_dir").bootstrapTable('refresh',{url:'...'});
    }
});
$("#dirTempletId").getDir().change(function(){
    $("input[name=directoryPath]").val($(this).find('option:selected').text());
    $("input[name=parentDicId]").val($(this).find('option:selected').attr("data-parentId"));
});
$(document).on("click", "#addDirList", function(){
    $("#addDir").modal("show");
    $("#id").val("");
    $("#addDir .modal-title").html("添加目录");
    $(".addDirectory").removeClass("hide").prop("disabled", false);
    $(".modifyDirectory").addClass("hide").prop("disabled", true);
});
$(document).on("click", "#save_Dir", function(){
    var o = $("#addDirForm").values();
    o.bankCode = current_node.bankCode;
    o.bankName = current_node.bankName;
    o.outRefId = current_node.id;
    o.outRefType = "bank";
    $("#addDirForm").validate();
    if($("#addDirForm").valid()){
        comn.ajax({
            url: o.id ? interUrl.bank.modifyDocumentDir : interUrl.bank.addDir,
            data: o,
            success: function(res) {
                tip({content: "保存成功！"});
                $("#table_dir").bootstrapTable('refresh',{url:'...'});
                $("#addDir").modal("hide");
            }
        })
    }
})
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
    
    comn.ajax({
        url: 'cooperation/product/cooperation/list',
        success: function (res) {
            if (res && res.code == 10000) {
                var htmlArr = ['<option value="">请选择</option>'];
                for (var i = 0; i < res.data.length; i++) {
                    htmlArr.push('<option value="' + res.data[i].id + '">' + res.data[i].bankName + '</option>');
                }
                $('#bankList').html(htmlArr.join(''));
            }
            if (res && res.code == 20000) {
                alert('系统繁忙，请稍后重试！');
            }
        }
    });

    $("#bankList").change(function(){
        var bankId = $("#bankList").val();
        if(bankId == "")return;
        comn.ajax({
            url: 'cooperation/product/allList',
            data: {page:1,pageSize:100,bankId:bankId},
            success: function (res) {
                if (res && res.code == 10000) {
                    var htmlArr = ['<option value="">请选择</option>'];
                    for (var i = 0; i < res.data.length; i++) {
                        htmlArr.push('<option value="' + res.data[i].productNo + '">' + res.data[i].productName + '</option>');
                    }
                    $('#proList').html(htmlArr.join(''));
                }
                if (res && res.code == 20000) {
                    alert('系统繁忙，请稍后重试！');
                }
            }
        });
    });

    comn.ajax({
        url: 'za/role/list',
        data: {
            page: 1,
            pageSize: 500
        },
        success: function (res) {
            if (res && res.code == 10000) {
                var htmlArr = ['<option value="">请选择</option>'];
                for (var i = 0; i < res.data.length; i++) {
                    htmlArr.push('<option value="' + res.data[i].id + '">' + res.data[i].name + '</option>');
                }
                $('#roleList').html(htmlArr.join(''));
            }
            if (res && res.code == 20000) {
                alert('系统繁忙，请稍后重试！');
            }
        }
    });
    comn.ajax({
        url: 'za/role/listBank',
        data: {
            page: 1,
            pageSize: 500
        },
        success: function (res) {
            if (res && res.code == 10000) {
                var htmlArr = ['<option value="">请选择</option>'];
                for (var i = 0; i < res.data.length; i++) {
                    htmlArr.push('<option value="' + res.data[i].id + '" data-code="'+ res.data[i].roleCode+'">' + res.data[i].name + '</option>');
                }
                $('#roleBankList').html(htmlArr.join(''));
            }
            if (res && res.code == 20000) {
                alert('系统繁忙，请稍后重试！');
            }
        }
    });
    $("#province_1")
        .getProvince()
        .change(
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
    $(document).on("change", "#roleBankList", function(){
        $("#roleName").val($(this).find('option:selected').text());
        $("#roleCode").val($(this).find('option:selected').attr("data-code"));
        $("#table2").bootstrapTable("destroy").bootstrapTable(comn.table);
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

    var $table=$("#table2");
    $("#saveMemeber").click(function(){
        //JSON.stringify($("#table2").bootstrapTable('getSelections'));
        var _bankId = $("#bankId").val();
        var saveRole = $("#saveMemeber");
        if (_bankId == "") {
            tip({
                content : "请先选择银行"
            });
            return;
        }
        var _data = null;
        var _url = saveRole.attr("data-role") === "bankVerify" ? interUrl.bank.userBankAdd : "cooperation/member/add";
        var bankListData = {};
        if (saveRole.attr("data-role") === "bankVerify") {
            bankListData = $("#addMemberForm").values();
        }
        console.log( $("#table2").bootstrapTable('getSelections').length);

        for(var i=0;i<$("#table2").bootstrapTable('getSelections').length;i++){
            //alert('Selected name: ' + 'Selected name: ' + $("#table2").bootstrapTable('getSelections')[i].companyName+"<br>");
            //var obj = jQuery.parseJSON($("#table2").bootstrapTable('getSelections')[i]); alert( obj.companyName);

            _data = $("#table2").bootstrapTable('getSelections')

        }
        console.log(_data);
        return comn.ajax({
            url : _url,
            data:$.extend({jsonStr:JSON.stringify(_data), bankId: _bankId}, bankListData),
            success : function(res) {
                $("#addMember").modal("hide");
                tip({content: "保存成功！"})
                if (saveRole.attr("data-role") === "bankVerify") {
                    $("#table_bankVerify").bootstrapTable("refresh");
                    saveRole.attr("data-role", "");
                } else {
                    openBank();
                }
            }
        });
    });

    $("#addMemberSearch").click(function(){
        $("#table2").bootstrapTable('selectPage', 1);
    });
    $("#addOrgForm").validate(validate);
    $("#orgForm").validate(validate);
    $("#add").click(function() {
        $('#addOrgForm .selectpicker').selectpicker('val', []);
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
                content : "请选择一个银行!"
            });
        }
        return comn.ajax({
            url : interUrl.bank["setStatus"],
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
                content : "请选择一个银行!"
            });
        }
        $("#sure").modal("show");
        return $("#OK").unbind("click").on("click", function() {
            return comn.ajax({
                url : interUrl.bank["del"],
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
        resetTab();
        $("#addProduct").find(".modal-title").html("金融产品设置");
        $("#productId").val("");
        $("#controlBox").find("input[data-name='id']").val("");
        $("#controlBox, #doubleControlBox").html("");
        $("#addProduct input, #addProduct select").val("");
        if ($(this).attr("id") === "addDoubleCard") {
            $("#doubleCardTab").removeClass("hide");
            $("#creditCardType").val('2');
        } else {
            $("#doubleCardTab").addClass("hide");
            $("#creditCardType").val('1');
        }
        return $("#addProduct").modal("show");
    });

    $("#addMemeberBtn").click(function() {
        $("#addMember").find(".modal-title").html("添加助行内勤");
        $("#saveMemeber").attr("data-role", "");
        $("#roleList").prop({"disabled": false}).removeClass("hide");
        $(".roleBankList").prop({"disabled": "disabled"}).addClass("hide");
        $("#table2").bootstrapTable('refresh');
//		var bankIds = new Array();
//		  $("#allMember").find("span").each(function(){
//			  bankIds.push($(this).attr("mid"));
//		  });
//
//		  $("#addMember").modal("show");
//		var _data = null;
//		  for(var i=0;i<$("#table2").bootstrapTable('getSelections').length;i++){
//  			//alert('Selected name: ' + 'Selected name: ' + $("#table2").bootstrapTable('getSelections')[i].companyName+"<br>");
//  			//var obj = jQuery.parseJSON($("#table2").bootstrapTable('getSelections')[i]); alert( obj.companyName);
//
//  			_data = $("#table2").bootstrapTable('getData');
//
//  		}

        return $("#addMember").modal("show");
    });
    //添加银行信审
    $("#addBankVerifyBtn").click(function() {
        $("#roleList").prop({"disabled": "disabled"}).addClass("hide");
        $(".roleBankList").prop({"disabled": false}).removeClass("hide");
        $("#addMember").find(".modal-title").html("添加银行角色");
        $("#saveMemeber").attr("data-role", "bankVerify");
        $("#addMember").modal("show");
        $("#table2").bootstrapTable('refresh');
    });
    // 添加控制条件
    $(document).on("click", "#addControl", function() {
        addControllBox();
    })

    /*
     * $("#addControl").click(function() { var borrowerNum = $("#controlBox
     * .controlList").length + 1; for (i = borrowerNum; i < 100; i++) { if
     * ($("#controlBox .controlList").length > 5) { borrowerNum = borrowerNum +
     * 1; return } var Borrower = '<div class="panel panel-default
     * controlList">54</div>'; $("#controlBox").append(Borrower); borrowerNum =
     * borrowerNum + 1; return } })
     */

//	Array.prototype.remove = function(dx) {
//		if (isNaN(dx) || dx > this.length) {
//			return false;
//		}
//		for (var i = 0, n = 0; i < this.length; i++) {
//			if (this[i] != this[dx]) {
//				this[n++] = this[i]
//			}
//		}
//		this.length -= 1
//	}

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

    $("#saveProduct").unbind("click").click(
        function() {
            if ($("#addProductForm").valid() == false || $("#addProductForm input[name=benchmarkRate]").val() == "")
                return tip({content: "请检查主卡基本信息是否已填写！"});
            if ($("#creditCardType").val() == "2" && $("#benchmarkRateV").val() == "") {
                return tip({content: "请检查附加卡基本信息是否已填写！"});
            }
            var _bankId = $("#bankId").val();
            if (_bankId == "") {
                tip({
                    content : "请先选择银行"
                });
                return;
            }
            var _productId = $('#productId').val();
            var _url = _productId == '' ? interUrl.bank.productAdd
                : interUrl.bank.productUpdate;
            var signCardData = $("#addProductForm").values();
            var doubleCardData = $("#doubleCardForm").values();
            var signCondition = $("#controlBox").values();
            var doubleCondition = $("#doubleControlBox").values();
            if (JSON.stringify(signCondition) != '{}') {
                signCardData.bankFinancialConditions = conditionArr(signCondition);
            }
            if (JSON.stringify(doubleCondition) != '{}' && $("#creditCardType").val() == "2") {
                doubleCardData.bankFinancialConditions = conditionArr(doubleCondition);
            }
            var dataArr = [];
            dataArr[0] = (Object.assign({}, signCardData, {bankId : _bankId, creditCardType : 1}));
            if ($("#creditCardType").val() == "2"){
                doubleCardData.productName = signCardData.productName;
                doubleCardData.businessType = signCardData.businessType;
                doubleCardData.nper = signCardData.nper;
                dataArr[1] = Object.assign({}, doubleCardData, {bankId : _bankId, creditCardType :2});
            }
            var _isEnable = $("");
            return comn.ajax({
                url : _url,
                contentType: 'application/json',
                data : {productList : JSON.stringify(dataArr)},
                //data : {productList : JSON.stringify($.extend({
                //    bankId: _bankId,
                //    id: _productId
                //},dataArr))},
                success : function(res) {
                    $("#addProduct").modal("hide");
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
    $("#isEnable").click(function() {
        if ($(this).is(':checked')) {
            $("input[name=isEnable]").attr('value', '1');
        } else {
            $("input[name=isEnable]").attr('value', '2');
        }
    })

    $("#addRateBtn").click(function() {
        $("#addRate").find(".modal-title").html("新增利率");
        return $("#addRate").modal("show");
    });
    $("#addRateForm").validate();
    $("#saveRate").click(
        function() {
            if ($("#addRateForm").valid() == false)
                return;
            var _bankId = $("#bankId").val();
            if (_bankId == "") {
                tip({
                    content : "请先选择银行"
                });
                return;
            }
            var _productId = $('#productId').val();
            var _url = _rateId == '' ? interUrl.bank.rateInfosAdd
                : interUrl.bank.rateInfosUpdate;
            var data = $("#addRateForm").values();
            return comn.ajax({
                url : _url,
                data : $.extend(data, {
                    bankId : _bankId,
                    id : _productId
                }),
                success : function(res) {
                    $("#addRate").modal("hide");
                    return $("#btn-search").trigger("click");
                }
            });
        });
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
table_dir = function(params) {
    tableData(params, {outRefId: current_node.id, outRefType: "bank"}, interUrl.mockList || interUrl.bank.dirList);
}

handle_dir = function(value, row, index) {
    if (row.isLeafNode === 1) {
        return [
            "<div class='btn-group btn-group-xs'>",
            "<button type='button' class='btn btn-primary'>操作</button>",
            "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>",
            "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>",
            "</button>", "<ul class='dropdown-menu' role='menu'>",
            "<li><a class='modify'>修改</a></li>",
            "<li><a class='delBankVerify'>删除</a></li></ul>", "</div>" ].join("");
    } else {
        return '--'
    }

}

event_dir = {
    "click .delBankVerify" : function(e, a, item, index) {
        $("#sure").modal("show");
        return $("#OK").unbind("click").on("click", function() {
            comn.ajax({
                url: interUrl.bank.delDir,
                data: {
                    id: item.id
                },
                success: function(res) {
                    tip({content: "删除成功！"});
                    $("#table_dir").bootstrapTable('refresh',{url:'...'});
                    $("#sure").modal("hide");
                }
            })
        })
    },
    "click .modify": function(e, a, item, index) {
        $("#id").val("");
        $("#addDir").modal("show");
        $("#addDir .modal-title").html("修改目录");
        $("#addDirForm").values(item);
        $(".modifyDirectory").removeClass("hide").prop("disabled", false);
        $(".addDirectory").addClass("hide").prop("disabled", true);
    }
}