/**
 * Created by hyb on 15/12/25.
 */
var dataLoad_1, handle, tableEvent,isManager;

dataLoad_1 = function(params) {
    var p;
    p = params.data;
    return comn.ajax({
        url: interUrl.carDealer.list,
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

tableEvent = {
    "click .modify": function(e, a, item, index) {
        return comn.addTab({
            title:"车商修改",
            href:"./Modal/carDealerManage/carDealer/carDealer.html?dealerId="+item['id']+"&type=1&isManager="+a +"&businessTypeCode=CAR_DEALER_ADD_FLOW&loanApplyId=" + item['id']
        });
    },
    "click .see": function(e, a, item, index) {
        return comn.addTab({
            title:"查看车商",
            href:"./Modal/carDealerManage/carDealer/carDealer.html?dealerId="+item['id']+"&type=2&isManager="+a +"&businessTypeCode=CAR_DEALER_ADD_FLOW&loanApplyId=" + item['id']
        });
    },
    "click .enable": function(e, a, item, index) {
        $("#sureModal").modal("show");
        $("#tipText").text("车商停用后，其下的费用方案也将被全部停用;若要再次启用需要重新添加费用方案并重新提交审批，是否确定停用？");
        $("#sureBtn").unbind("click").click(function(){
            return comn.ajax({
                url: interUrl.carDealer.setStatus,
                data: {
                    dealerId: item['id'],
                    status: 0
                },
                success: function(res) {
                    $("#sureModal").modal("hide");
                    tip({content: "停用成功"});
                    return $("#btn-search").trigger("click");
                }
            });
        })
    },
    "click .able":function(e,a,item,index){
        $("#sureModal").modal("show");
        $("#tipText").text("确定启用?");
        $("#sureBtn").unbind("click").click(function(){
            return comn.ajax({
                url: interUrl.carDealer.setStatus,
                data: {
                    dealerId: item['id'],
                    status: 1
                },
                success: function(res) {
                    $("#sureModal").modal("hide");
                    tip({content: "启用成功"});
                    return $("#btn-search").trigger("click");
                }
            });
        })
    },
    "click .del": function(e, a, item, index) {
        $("#sureModal").modal("show");
        $("#tipText").text("确定要删除吗?");
        $("#sureBtn").unbind("click").click(function(){
            return comn.ajax({
                url: interUrl.carDealer.delete,
                data: {
                    dealerId: item['id']
                },
                success: function(res) {
                    $("#sureModal").modal("hide");
                    tip({
                        content: "删除成功!"
                    });
                    return $("#btn-search").trigger("click");
                }
            });
        })
    },
    "click .approve": function(e, a, item, index) {
        comn.ajax({
            url:interUrl.carDealer.carDealerInit,
            data:{
                dealerId: item['id']
            },
            success:function(res){
                if (res.data.neededSync !== null && res.data.neededSync == "1") {
                    $("#sureModal").modal("show");
                    $("#tipText").text("客户经理业务组发生调整，是否确认提交变更后业务组的区域经理审批?");
                    $("#sureBtn").unbind("click").click(function(){
                        return comn.ajax({
                            url: interUrl.carDealer.carDealerInfoCorrect,
                            data: {
                                dealerId: item['id']
                            },
                            success: function(res) {
                                $("#sureModal").modal("hide");
                                tip({
                                    content: "信息变更成功!"
                                });
                                // return $("#btn-search").trigger("click");
                                return;
                            }
                        });
                    })
                } else {
                   return comn.addTab({
                        title:"车商审批",
                        href: "./Modal/carDealerManage/carDealer/carDealer.html?dealerId="+item['id']+"&type=4&isManager="+a
                    }) 
                }
                
            }
        });
    }
};


//审批状态: 0,未审批，1，审批中，2已审批，3审批拒绝
handle = function(value, row, index) {
    var btnStatus = ((row["approveStatus"]=="0" || row["approveStatus"]=="2" || row["approveStatus"]=="4") && value)?((row['status'] == '1')?"<li><a class='enable'>停用</a></li>":"<li><a class='able'>启用</a></li>"):null;
    var btnSee="<li><a class='see'>查看</a></li>";
    if(row['status'] == '1'){//启用
    	var btnApprove = "";
    	if(row["approveStatus"]=="0" && flag && row['isManager']){
    		btnApprove = "<li><a class='approve'>发起审批</a></li>"; 
    	}
    	var modify=(((row["approveStatus"]=="0" || row["approveStatus"]=="2") && value) || (isFinanceRole(comn.user.roleList)))?"<li><a class='modify'>修改</a></li>":null;
    	return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>",btnApprove,modify, btnStatus,del,btnSee, "</ul>", "</div>"].join("");
    	
    }else{
    	var del=((row["approveStatus"]=="0" || row["approveStatus"]=="4") && value)?"<li><a class='del'>删除</a></li>":null;
    	return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>",btnApprove,modify, btnStatus,del,btnSee, "</ul>", "</div>"].join("");
    }
    
};

function isFinanceRole(val) {
    var reloCode = false;
    $.each(val, function(i, v){
        if (v.roleCode === "R99") {
            reloCode = true;
            return false;
        }
    });
    return reloCode;
}

var flag = false;
$(function(){
    //数字字典： 期数
    var dataArr =[["#loanTerm", "LoanTerm"]];
    $.getCommonMethodPort(dataArr);
    
    $("#dealerGroupId").getDealerGroup().change(function () {
        var name = $(this).find("option:selected").text();
        $("#dealerGroupName").val(name === "--请选择--" ? "" : name)
    }); //营销品牌集团
    $("#orgId").getOrg('', function() { //机构
        $('.selectpicker').selectpicker('refresh');
    }, "-1");
    
	$.each(comn.user.roleList, function(index, item){
		if(item.roleCode == "R01" || item.roleCode == "R35"){
			flag = true;
			$("#addCarDealer").removeClass("hide");
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
    //新增车商
    $("#addCarDealer").click(function() {
        return comn.addTab({
            title:"添加车商",
            href: "./Modal/carDealerManage/carDealer/carDealer.html?type=3"
        });
    });
    $("#companyId").getCompany().change(function() {
        if(this.value=="") return $("#groupId").html('<option value="" selected>--请选择--</option>');
        return $("#groupId").getGroup(this.value);
    });
    $("#carDealerAdd").click(function() {
        var o, url;
        o = $("#carDealer").find("form").values();
        if (o.id) {
            url = interUrl.carDealer.update;
        } else {
            url = interUrl.carDealer.add;
        }
        return comn.ajax({
            url: url,
            data: o,
            success: function(res) {
                $("#table_4").bootstrapTable('selectPage', 1);
                tip({
                    content: "添加成功"
                });
                return $("#addRelationUser").modal("hide");
            }
        });
    });
    $("#orgId").change(function () {
        if($(this).val() && $(this).val().length > 0) {
            $(this).parents(".has-error").removeClass("has-error");
            $("#orgId-error").addClass("hide");
        } else {
            $(this).parents(".input-tip").addClass("has-error");
            $("#orgId-error").removeClass("hide");
        }
        //获取选中的name值
        var orgName = [];
        for (var i = 0; i < $("li.selected").length; i++) {
            orgName.push($("li.selected").eq(i).find(".text").text())
        }
        $("#orgIds").html(orgName.join("，"))
    })
    $("#addLowFeeManage").click(function () {
        //清空弹窗
        $(".input-tip").removeClass("has-error");
        $(".error").remove();
        $('.selectpicker').selectpicker('val', []);
        $("#orgIds").html("");
        
        $("#addLowFeeModal").modal("show");
    });
    $("#saveLowFee").click(function () {
        $("#addLowFeeForm").validate();
        if ($("#addLowFeeForm").valid() == true) {
            var o = $("#addLowFeeForm").values();
            o.orgIds = ($("#orgId").val()).join(",");
            comn.ajax({
                url: interUrl.carDealer.batchModifyLowestFee,
                data: o,
                success: function (res) {
                    tip({content: '新增成功！'})
                    $("#addLowFeeModal").modal("hide");
                }
            })
        }
    })
});

//最低利率是否显示
function isShowMiniRate() {
    if (canRead(comn.user.roleList)) {
        $("#addLowFeeManage").removeClass("hide");
    }
}
function canRead(val, isManagerFlag) {
    var reloCode = false;
    $.each(val, function(i, v){
        if (v.roleCode === "R99" && isManagerFlag === "true") {
            reloCode = true;
            return false;
        }
        if (v.roleCode === "R99" || v.roleCode === "R98" || v.roleCode === "R08") {
            reloCode = true;
            return false;
        }
    });
    return reloCode;
}
isShowMiniRate();

// 上传方法
function upload(){
    return $.ajaxFileUpload({
        url: interUrl.basic + interUrl.gr.carUploadExcel,
        secureuri: false,
        fileElementId: 'upFileInput',
         //data:  {
         //    exportTime: '2017-04-17',
         //    coBankId: '24',
         //    templateId: '23'
         //},
        dataType: "json",
        success: function(data, status) {
            //$("#tipUpdate").hide();
            if (data.code == 10000) {
                tip({
                    content: "excel导入执行完成"
                });
            }else{
                tip({
                    content: data.message
                });
            }
            console.log(data);
        },
        complete: function() {
            //$("#tipUpdate").hide();
            $("#exportTime").trigger("changeDate");
        },
        error: function(data, status, e) {
            //$("#tipUpdate").hide();
            tip({
                content: data.message
            });
        }
    });


}

// 上传按钮改变时触发upload方法
$('#upFileInput').on('change', function() {
    if ($('input[type="file"]').val() != "") {
        var extend = $('input[type="file"]').val().substr($('input[type="file"]').val().lastIndexOf(".") + 1);
        if ("xls|xlsx".indexOf(extend) == -1) {
            flagPic = false;
            layer.msg("选择的文件必须是EXCEL文件,请确认！");
        } else {
            //$("#tipUpdate").show();
            upload();
            $("#upFileInput").replaceWith($("#upFileInput").clone(true));
        }
    } else {
        layer.msg("请选EXCEL文件");
    }
});

// 数据导入
$("#importCarDealer").click(function() {
    $("#upFileInput").trigger("click");
});

$("#exportCarDealer").click(function(){
    var downLink = interUrl.basic + interUrl.gr.carExport;
    window.open(downLink, "_blank");
})