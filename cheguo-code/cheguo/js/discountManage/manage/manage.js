$.fn.extend({
    getHostFacSelectList:function(isSetVal,keys){  //主机厂列表
        comn.ajax({
            url: interUrl.discountManage.discountHostFacSelectList,
            success: (function (_this) {
                return function (res) {
                    var o;
                    $(_this).html(((function () {
                        var j, len, ref, results;
                        ref = res.data;
                        results = [];
                        for (j = 0, len = ref.length; j < len; j++) {
                            o = ref[j];
                            results.push("<option value='" + o.id + "'>" + o.hostFactoryName + "</option>");
                        }
                        return results;
                    })()).join(""));
                    if(isSetVal){
                        $(_this).selectpicker('val',keys);
                    }else{
                        $(_this).selectpicker({noneSelectedText:"请选择(可多选)"});
                    }

                };
            })(this)
        });
        return this;
    },
    getBankAll: function (isSetVal,keys) {
        comn.ajax({
            url: interUrl.gr.getBankAll,
            success: (function (_this) {
                return function (res) {
                    var o;
                    $(_this).html(((function () {
                        var j, len, ref, results;
                        ref = res.data;
                        results = [];
                        for (j = 0, len = ref.length; j < len; j++) {
                            o = ref[j];
                            results.push("<option value='" + o.id + "'>" + o.bankName + "</option>");
                        }
                        return results;
                    })()).join(""));
                    if(isSetVal){
                        $(_this).selectpicker('val',keys);
                    }else{
                        $(_this).selectpicker({noneSelectedText:"请选择(可多选)"});
                    }

                };
            })(this)
        });
        return this;
    }
});


var args=comn.getArgs(),policyId,option=args['option'],isCarDealerAdd=true;
////获取主机厂列表
$("#hostFactories").getHostFacSelectList(false,[]);
//
////获取合作银行列表
$("#cooBanks").getBankAll(false,[]);
//discountType
var dataArr =[[".discountType", "DiscountType", '', '-1']];
$.getCommonMethodPort(dataArr);
//option参数说明:edit=修改,see=查看,add=新增
if(option!=="add"){
    policyId=args['policyId'];//贴息政策id
    loadBaseInfo();
    if(option==="see"){
        $(".seeFieldset").attr("disabled",true); //禁用表单
        $("#save-baseInfo").hide();
        $(".btnList").hide();
    }
}


$("#startTime").getToday();
//基本信息部分
$("#save-baseInfo").click(function(){
    saveBaseInfo();
});

//加载基本信息
function loadBaseInfo(){
    comn.ajax({
        url: interUrl.discountManage.discountPolicyBaseInfo,
        data: {policyId:policyId},
        success: function (res) {
            $("#baseInfo").values(res.data);
            //获取主机厂列表


            var _hostFactories=$("#hostFactories"),_cooBanks=$("#cooBanks");
            var hostFactories=res.data.hostFactories,cooBanks=res.data.cooBanks;//主机厂,合作银行
            if(hostFactories.length>0){
                var i,names=[],ids=[];
                for(i=0;i<hostFactories.length;i++){
                    var o=hostFactories[i];
                    names.push(o.hostFactoryName);
                    ids.push(o.hostFactoryId);
                }
                //_hostFactories.selectpicker('val',ids);
                $("#hostFactories").getHostFacSelectList(true,ids);
            }
            if(cooBanks.length>0){
                var i,names=[],ids=[];
                for(i=0;i<cooBanks.length;i++){
                    var o=cooBanks[i];
                    names.push(o.coBankName);
                    ids.push(o.coBankId);
                }
                //获取合作银行列表
                $("#cooBanks").getBankAll(true,ids);
                //_cooBanks.selectpicker('val',ids);
            }
        }
    });
}

//保存基本信息
function saveBaseInfo(){
    $("#baseInfo").validate();
    if($("#baseInfo").valid()==true){
        var cooBanks=getCooBanksArr(),hostFactories=getHostFactoriesArr();
        var _data={jsonStr:JSON.stringify($.extend($("#baseInfo").values(),{cooBanks:cooBanks,hostFactories:hostFactories}))};
        comn.ajax({
            url: interUrl.discountManage.discountBaseInfoSave,
            data: _data,
            success: function (res) {
                tip({content:res.message});
                $("#policyId").val(res.data);//政策id赋值
            }
        });
    }
}
//获取主机厂构造数据
function getHostFactoriesArr(){
    //获取主机厂列表
    var hostFactoriesArr=[];
    var hostFactoriesNames=$("#hostFactories").prevAll("button").attr("title").split(",");
    var hostFactoriesIds=$("#hostFactories").val();
    for(var i=0;i<hostFactoriesIds.length;i++){
        hostFactoriesArr.push({hostFactoryId:hostFactoriesIds[i],hostFactoryName:hostFactoriesNames[i].replace(/(^\s*)|(\s*$)/g,'')})
    }
    return hostFactoriesArr;
}
//获取合作银行构造数据
function getCooBanksArr(){
    //获取主机厂列表
    var cooBanksArr=[];
    var cooBanksNames=$("#cooBanks").prevAll("button").attr("title").split(",");
    var cooBanksIds=$("#cooBanks").val();
    for(var i=0;i<cooBanksIds.length;i++){
        cooBanksArr.push({coBankId:cooBanksIds[i],coBankName:cooBanksNames[i].replace(/(^\s*)|(\s*$)/g,'')})
    }
    return cooBanksArr;
}


//适用车行部分
dataLoad_carDealer = function(params) {
    var p;
    p = params.data;
    p["policyId"] = policyId || $("#policyId").val();
    if(p['policyId']){
        return comn.ajax({
            url: interUrl.discountManage.discountCarDealerList,
            data: $.extend(p,$("#searchCarDealer").values()),
            success: function(res) {
                params.success({
                    'total': res.totalItem,
                    rows: res.data
                });
                return params.complete();
            }
        });
    }else {
        return params.complete();
    }

};

$("#btn-searchCarDealer").click(function () {
    $("#carDealerTable").bootstrapTable("refresh", {url: "..."});
});


tableEvent_carDealer = {
    "click .edit": function(e, a, item, index) {
        $("#carDealerModal").modal("show");
        $("#carDealerForm").values(item);
        isCarDealerAdd=false;
    },
    "click .delete": function(e, a, item, index) {
        oppSureModal("确认要删除吗?");
        return $("#sureOption").unbind("click").on("click", function() {
            return comn.ajax({
                url: interUrl.discountManage.discountCarDealerDel,
                data: {
                    carDealerId: item['id']
                },
                success: function(res) {
                    tip({
                        content: "删除成功!!"
                    });
                    $("#sureModal").modal("hide");
                    return $("#carDealerTable").bootstrapTable("refresh", {url: "..."});
                }
            });
        });
    },
    "click .option": function(e, a, item, index) {
        var option=item['status']===0?"确认启用?":"确认停用？";
        oppSureModal(option);
        return $("#sureOption").unbind("click").on("click", function() {
            return comn.ajax({
                url: interUrl.discountManage.discountCarDealerChangeStatus,
                data: {
                    carDealerId: item['id']
                },
                success: function(res) {
                    tip({
                        content: res.message
                    });
                    $("#sureModal").modal("hide");
                    return $("#carDealerTable").bootstrapTable("refresh", {url: "..."});
                }
            });
        });
    }
};

handle_carDealer = function(value, row, index) {
    var status=row.status,option="停用";
    if(typeof status=="string"){
        status=parseInt(status);
    }
    if(status===0){
        option="启用";
    }
    return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='edit'>修改</a></li>","<li><a class='option'>"+option+"</a></li>", "<li><a class='delete'>删除</a></li>", "</ul>", "</div>"].join("");
};

statuss = function(value, row, index) {
    if (typeof value === "string") {
        value = parseInt(value);
    }
    return (value === 1 && "启用") || (value === 0 && "停用");
};

//导入车行
// 上传方法
function upload(){
    var _policyId=policyId || $("#policyId").val();
    return $.ajaxFileUpload({
        url: interUrl.basic+interUrl.discountManage.discountCarDealerImport,
        secureuri: false,
        fileElementId: 'upFileInput',
        data:  {
            discountId: _policyId
        },
        dataType: "json",
        success: function(data, status) {
            if (data.code == 10000) {
                tip({
                    content: "数据导入成功!!"
                });
                $("#carDealerTable").bootstrapTable("refresh", {url: "..."});
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
            // pdValue(exportTime,coBankId,templateId);
            // $("#exportTime").trigger("changeDate");
            // return $("#table").bootstrapTable('selectPage', 1);
        }
    } else {
        layer.msg("请选EXCEL文件");
    }

});

// 数据导入
$("#importCarDealer").click(function() {
    var _policyId=policyId || $("#policyId").val();
    if(_policyId){
        $("#upFileInput").trigger("click");
    }else{
        tip({content:"请先保存贴息基本信息!"})
    }

});

// 下载导入模板
$("#downloadTpl").click(function() {
    var downLink = interUrl.basic + interUrl.discountManage.discountCarDealerDownload;
    window.open(downLink, "_blank");
});

//新增适用车行
$("#addCarDealer").click(function(){
    var _policyId=policyId || $("#policyId").val();
    if(_policyId){
        $("#resetCarDealerForm").trigger("click");
        $("#carDealerModal").modal("show");
    }else{
        tip({content:"请先保存贴息基本信息!"})
    }
});

//保存新增适用车行
$("#save-carDealer").click(function(){
    var form=$("#carDealerForm");
    form.validate();
    if(form.valid()==true){
        var _policyId=policyId || $("#policyId").val();
        var _url=isCarDealerAdd?interUrl.discountManage.discountCarDealerAdd:interUrl.discountManage.discountCarDealerUpdate;
        var _message=isCarDealerAdd?"新增成功!":"修改成功!";
        comn.ajax({
            url:_url ,
            data: $.extend(form.values(),{discountId:_policyId}),
            success: function(res) {
                tip({
                    content: res.message || _message
                });
                $("#carDealerModal").modal("hide");
                return $("#carDealerTable").bootstrapTable("refresh", {url: "..."});
            }
        });
    }
});


//方案部分
dataLoad_scheme = function(params) {
    var p;
    p = params.data;
    p["policyId"] = policyId || $("#policyId").val();
    if(p['policyId']){
        return comn.ajax({
            url: interUrl.mockList || interUrl.discountManage.discountSchemeList,
            data: p,
            success: function(res) {
                params.success({
                    'total': res.totalItem,
                    rows: res.data
                });
                return params.complete();
            }
        });
    }else {
        return params.complete();
    }

};


tableEvent_scheme = {
    "click .edit": function(e, a, item, index) {
        resetSchemeForm();
        $("#schemeModal").modal("show");
        getScheme(item['id'],false);
    },
    "click .see": function(e, a, item, index) {
        resetSchemeForm();
        $("#schemeModal").modal("show");
        getScheme(item['id'],true);
    },
    "click .copy": function(e, a, item, index) {
        return comn.ajax({
            url: interUrl.discountManage.discountSchemeCopy,
            data: {
                schemeId: item['id']
            },
            success: function(res) {
                tip({
                    content: res.message || "复制成功!!"
                });
                $("#sureModal").modal("hide");
                return $("#schemeTable").bootstrapTable("refresh", {url: "..."});
            }
        });
    },
    "click .delete": function(e, a, item, index) {
        if(item['status']===1){
            tip({
                content:"只有停用的贴息方案才能被删除,请先停用方案！"
            });
            return false;
        }
        oppSureModal("确认要删除吗?");
        return $("#sureOption").unbind("click").on("click", function() {
            return comn.ajax({
                url: interUrl.discountManage.discountSchemeDel,
                data: {
                    schemeId: item['id']
                },
                success: function(res) {
                    tip({
                        content: res.message
                    });
                    $("#sureModal").modal("hide");
                    return $("#schemeTable").bootstrapTable("refresh", {url: "..."});
                }
            });
        });
    },
    "click .option": function(e, a, item, index) {
        var option=item['status']===0?"确认启用?":"确认停用？";
        oppSureModal(option);
        return $("#sureOption").unbind("click").on("click", function() {
            return comn.ajax({
                url: interUrl.discountManage.discountSchemeSetStatus,
                data: {
                    schemeId: item['id']
                },
                success: function(res) {
                    tip({
                        content: res.message
                    });
                    $("#sureModal").modal("hide");
                    return $("#schemeTable").bootstrapTable("refresh", {url: "..."});
                }
            });
        });
    }
};

handle_scheme = function(value, row, index) {
    var status=row.status,_option="停用";
    if(typeof status=="string"){
        status=parseInt(status);
    }
    if(status===0){
        _option="启用";
    }
    if(option==="see"){//如果是查看贴息,只显示查看方案按钮
        return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>","<li><a class='see'>查看</a></li>","</ul>", "</div>"].join("");
    }else{
        return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='edit'>修改</a></li>","<li><a class='copy'>复制</a></li>","<li><a class='option'>"+_option+"</a></li>", "<li><a class='delete'>删除</a></li>", "<li><a class='see'>查看</a></li>","</ul>", "</div>"].join("");
    }
};
effectualStatus = function(value, row, index) {
    if (typeof value === "string") {
        value = parseInt(value);
    }
    return (value === 1 && "生效") || (value === 2 && "未生效");
};

cityType = function(value, row, index) {
    if (typeof value === "string") {
        value = parseInt(value);
    }
    return (value === 10 && "全国") || (value === 1 && "一二线城市") || (value === 2 && "三四五线城市");
};

//添加贴息方案
$("#addScheme").click(function(){
    var _policyId=policyId || $("#policyId").val();
    if(_policyId){
        $("#schemeId").val(""); //清空Id
        resetSchemeForm();
        $("#schemeModal").modal("show");
    }else{
        tip({content:"请先保存贴息基本信息!"})
    }
});

function resetSchemeForm(){
    $("input[name=discountRate]").prop("readonly",false);
    $("#schemeFieldset").removeAttr("disabled");
    $("#resetSchemeForm").trigger("click");
    $("#schemeForm [name=discountLimit]").prop("readonly",true);
    $("#selectedCars").empty(); //清空上次存放的车型
}


$("#getBrand").getBrandC( $("#getBrand").is(":disabled"));

//车辆三级级联菜单
$(document).on("change", "#getBrand", function (){
    var code = $(this).attr("data-code");
    $(this).prev().val(code);
    $("#getCarList, #getCarModel").val("--请选择--").next().remove();
    $("#getCarList").getCarList(code);
});

$(document).on("change", ".carSelect", function () { //给车辆赋值
    //var codeName = $(this).find("option:selected").html();
    var code = $(this).attr("data-code");
    $(this).prev().val(code);
    if(this.id == "getCarList"){
        $("#getCarModel").val("--请选择--").next().remove();
        $("#getCarModel").getCarModel($(this).attr("data-code"));
    };
});


$(document).on("change", "#getCarModel", function () { //给车辆赋值
    var selectedCars=$("#selectedCars"),len=selectedCars.find(".item").length,i;
    var carsBox=$("#carsBox"),carBrand,carBrandName,carMake,carMakeName,carModel,carModelName,names,_names,keys,selectedTpl;
    //var codeName = $(this).find("option:selected").html();
    //$(this).prev().val(codeName);
    var code = $(this).attr("data-code");
    $(this).prev().val(code);
    carBrand=carsBox.find("[name='carBrand']").val();
    carBrandName=carsBox.find("[name='carBrandName']").val();
    carMake=carsBox.find("[name='carMake']").val();
    carMakeName=carsBox.find("[name='carMakeName']").val();
    carModel=carsBox.find("[name='carModel']").val();
    carModelName=carsBox.find("[name='carModelName']").val();
    names=carBrandName+","+carMakeName+","+carModelName;
    _names=carBrandName+"-"+carMakeName+"-"+carModelName;
    keys=carBrand+','+carMake+','+carModel;
    for(i=0;i<len;i++){
        var _a=selectedCars.find(".item").eq(i).find("a"),_keys=_a.data("keys");
        if(keys===_keys){
            tip({content:"该车型已选"});
            return false;
        }
    }
    selectedTpl='<span class="item"><a data-keys="'+keys+'" href="javascript:;" title="'+names+'">'+_names+'</a><button class="close" title="删除">&times;</button> </span>';
    selectedCars.append(selectedTpl);
});

//删除已选车型
$(document).on("click",".selectedSection .item .close",function(){
    var _this=$(this),parent=_this.parent(".item");
    parent.remove();
});

//贴息金额是否勾选百分比
$("[name='discountType']").change(function(){
    var _this=$(this),controller1=_this.parents(".form-group").find("[name='discountLimit']"),controller2=_this.parents(".form-group").find("[name='discountRate']");
    if(_this.val() === "1" || _this.val() === "2"){
        controller1.prop("readonly",false);
        controller2.addClass("required");
    }else{
        controller1.val("").removeClass("required").prop("readonly",true);
        controller2.removeClass("required");
    }
    if ( _this.val() === "2") {
        controller1.addClass("required")
        controller2.prop("readonly",true).val(0).removeClass("required");
    } else {
        controller1.removeClass("required").next().remove()
        controller2.prop("readonly",false);
    }
});
//贴息上限
$("input[name=discountLimit], input[name=discountRate], [name='discountType']").change(function(){
    var _this = $(this);
    _this.parent().parent().removeClass("has-error");
});
//获取不同期数贴息金额构造数组
function getDisPolicySchemeNpers(){
    var discountType1={discountType: $("#nper36").find("[name='discountType']").val()};
    var discountType2={discountType: $("#nper24").find("[name='discountType']").val()};
    var discountType3={discountType: $("#nper18").find("[name='discountType']").val()};
    var discountType4={discountType: $("#nper12").find("[name='discountType']").val()};
    var disPolicySchemeNpers=[$.extend($("#nper36").values(),discountType1), $.extend($("#nper24").values(),discountType2), $.extend($("#nper18").values(),discountType3), $.extend($("#nper12").values(),discountType4)];
    return disPolicySchemeNpers;
}

//获取多选的车型
function getDisPolicySchemeCarModels(){
    var disPolicySchemeCarModels=[],selectedCars=$("#selectedCars"),len=selectedCars.find(".item").length,i;
    for(i=0;i<len;i++){
        var _a=selectedCars.find(".item").eq(i).find("a"),keys=_a.data("keys").split(","),names=_a.attr("title").split(","),o={};
        o={
            carBrand:keys[0],
            carBrandName:names[0],
            carMake:keys[1],
            carMakeName:names[1],
            carModel:keys[2],
            carModelName:names[2]
        };
        disPolicySchemeCarModels.push(o);
    }
    return disPolicySchemeCarModels;
}

//保存贴息方案
$("#save-scheme").click(function(){
    //贴息金额按费率计算时， 贴息上限必填
    for (var i = 0; i < $("input[name=discountLimit]").length; i ++) {
        var parent = $("input[name=discountLimit]:eq("+i+")").parent().parent();
        var tipTitle = parent.children(".control-label").html();
        if ($("input[name=discountLimit]:eq("+i+")").hasClass("required") && $("input[name=discountLimit]:eq("+i+")").val() === "") {
            parent.addClass("has-error");
            return tip({content: tipTitle.substr(0, tipTitle.length -1) +"未填!"})
        } else {
            parent.removeClass("has-error");
        }
    }
    for (var i = 0; i < $("input[name=discountRate]").length; i ++) {
        var parent = $("input[name=discountRate]:eq("+i+")").parent().parent();
        var tipTitle = parent.children(".control-label").html();
        if ($("input[name=discountRate]:eq("+i+")").hasClass("required") && $("input[name=discountRate]:eq("+i+")").val() === "") {
            parent.addClass("has-error");
            return tip({content: tipTitle.substr(0, tipTitle.length -1) +"未填!"})
        } else {
            parent.removeClass("has-error");
        }
    }
    var form=$("#schemeForm");
    form.validate();
    if(form.valid()==true){
        var _policyId=policyId || $("#policyId").val();
        var disPolicySchemeNpers=getDisPolicySchemeNpers(),disPolicySchemeCarModels=getDisPolicySchemeCarModels();
        if(disPolicySchemeCarModels.length<=0){
            tip({content:"请先保存车辆信息"});
            return false
        }
        var _url=interUrl.discountManage.discountSchemeSave;
        var _data=JSON.stringify($.extend(form.values(),{discountId:_policyId,disPolicySchemeNpers:disPolicySchemeNpers,disPolicySchemeCarModels:disPolicySchemeCarModels}));
        comn.ajax({
            url:_url ,
            data:{jsonStr:_data} ,
            success: function(res) {
                tip({
                    content: res.message
                });
                $("#schemeModal").modal("hide");
                return $("#schemeTable").bootstrapTable("refresh", {url: "..."});
            }
        });
    }
});

//获取贴息方案详情
function getScheme(schemeId,isSee){
    $(".error").remove(); //展示时去掉必填显示
    $(".has-error").removeClass("has-error"); //展示时去掉必填显示
    comn.ajax({
        url:interUrl.discountManage.discountSchemeGet,
        data:{schemeId:schemeId} ,
        success: function(res) {
            var carModels=res.data.disPolicySchemeCarModels; //车型
            var schemeNpers=res.data.disPolicySchemeNpers; //不同期数金额
            if(carModels.length>0){
                var i,selectedTpl="";
                for(i=0;i<carModels.length;i++){
                    var a=carModels[i];
                    var names=a.carBrandName+","+ a.carMakeName+","+ a.carModelName;
                    var _names=a.carBrandName+"-"+ a.carMakeName+"-"+ a.carModelName;
                    var keys=a.carBrand+","+ a.carMake+","+ a.carModel;
                    selectedTpl+='<span class="item"><a data-keys="'+keys+'" href="javascript:;" title="'+names+'">'+_names+'</a><button class="close" title="删除">&times;</button> </span>';
                }
                $("#selectedCars").html(selectedTpl)
            }
            $("#schemeForm").values(res.data);
            if(schemeNpers.length>0){
                var i,nper12=$("#nper12"),nper18=$("#nper18"),nper24=$("#nper24"),nper36=$("#nper36");
                for(i=0;i<schemeNpers.length;i++){
                    var a=schemeNpers[i],nper= a.nper;
                    switch (nper){
                        case 1:
                            v(nper12, a);
                            // nper12.values(a);
                            // nper12.find('[name="discountType"]').val(a.discountType);
                            // if(a.discountLimit){
                            //     nper12.find('[name="discountLimit"]').prop("readonly",false);
                            // }
                            break;
                        case 2:
                            v(nper18, a);
                            break;
                        case 3:
                            v(nper24, a);
                            break;
                        case 4:
                            v(nper36, a);
                            break;
                        default :
                            console.warn("没有期数数据");
                            break;
                    }
                }
            }
            if(isSee){
                $("#schemeFieldset").attr("disabled",true);
            }

        }
    });
}
function v(id, a){
    var discountLimit = id.find('[name="discountLimit"]');
    var discountRate = id.find('[name="discountRate"]');
    id.values(a);
    id.find('[name="discountType"]').val(a.discountType);
    if(a.discountLimit){
        discountLimit.prop("readonly",false);
    } else {
        discountLimit.removeClass("required");
    }
    if (a.discountType == "2"){
        discountLimit.prop("readonly",false).addClass("required");
        discountRate.prop("readonly",true);
    } else {
        discountLimit.removeClass("required");
        discountRate.prop("readonly",false);
    }
    if (a.discountType == "1") {
        discountRate.addClass("required");
    } else {
        discountRate.removeClass("required");
    }
}