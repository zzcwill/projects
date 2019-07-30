//结清处理基本信息
var settlementId;
var jqQasicInformationUrl=comn.getArgs();//获取url参数并且格式化成对象
var ids = jqQasicInformationUrl.businessId;
var img;
var proId;
var urlId;
var dataId;
var proidsss;
var argsBopInfoId = {bopInfoId: jqQasicInformationUrl.depositId};
// 根据type值设置标题名称 todo 多写了
var type = jqQasicInformationUrl.type;
if (jqQasicInformationUrl["loanApplyId"] != "undefined" && jqQasicInformationUrl["loanApplyId"]){
    $("#ProcessInformation_Li").removeClass("hide");
}
switch (type) {
    case "1":
        $("#flowTitle").text(jqQasicInformationUrl.types);
        $(".nodeDisabled").prop("disabled", false);
    break;
    case "2":
        $("#flowTitle").text(jqQasicInformationUrl.types);
        $(".nodeDisabled").prop("disabled", false);
    break;
    case "3":
        $("#flowTitle").text("续保主管审批");
        $(".nodeDisabled").prop("disabled", true);
    break;
    // todo
    case "4":
        $("#flowTitle").text(jqQasicInformationUrl.types);
        $(".nodeDisabled").prop("disabled", true);
    break;
    case "5":
         $("#flowTitle").text(jqQasicInformationUrl.types);
         $(".nodeDisabled").prop("disabled", true);
    break;
    case "6":
        $("#flowTitle").text(jqQasicInformationUrl.types);
        $(".nodeDisabled").prop("disabled", true);
    break;
    case "7":
        $("#flowTitle").text(jqQasicInformationUrl.types);
        $(".nodeDisabled").prop("disabled", true);
    break;
}
if(jqQasicInformationUrl.disble){
    $("#jqQasicInformation input,#jqQasicInformation textarea,#jqQasicInformation select").attr("disabled",true);
    $("#notTy button").attr("disabled",true);
    $("button.upImage").attr("disabled",true);
    // $("button.upImage,button.lookDang").attr("disabled",true);
}
//如果是从任务流程那里过来的话判断情况
// 查看清退详情
// 如果地址栏有这参数走这里
if(!jqQasicInformationUrl.renwu){
    // $("#ProcessInformation_Li,#FollowingConfirmedCase_Li").hide();
    //$("#FollowingConfirmedCase_Li").hide();
    urlId=interUrl.ThePerformance.getImfor;
    proId=jqQasicInformationUrl.projectId;
    dataId={projectId:proId};
    $("#reture,#closeJq,#liuchengYiJian").hide();
    //$("#ProcessInformation_").hide();
}else{
    // $("#ProcessInformation_Li,#FollowingConfirmedCase_Li").show();
    $("#FollowingConfirmedCase_Li").show();
    $("#ProcessInformation_").show();
    urlId=interUrl.ThePerformance.getImfor;
    proId=jqQasicInformationUrl.projectId;
    dataId={id:proId};
   $("#liuchengYiJian").show();

    var selectIsNotY;
    $("input[name='inlineRadioOptions']").each(function(){
        if($(this).prop("checked")){
            selectIsNotY=$(this).val();
        }
    });
    if(selectIsNotY==0){
        $("#reture,#closeJq").hide();
        $("#cancelJq,#save-submit,#save-baseInfo").show();
    }
    else{
        $("#save-submit,#save-baseInfo").hide();
        $("#reture").show();
        if (type == "2") {
            $("#closeJq").show();
        }
    }
    if(jqQasicInformationUrl.type==1){
        $("#liuchengYiJian").hide();
    }
    $("#fujianUpload .upImage2").hide();
    if(jqQasicInformationUrl.type!=1){
        $(".upImage2").hide();
    }
    if(jqQasicInformationUrl.type==1){
        $("#cancelJq-ce").show();
        $("#cancelJq").hide();
    }

}
$("input[name='inlineRadioOptions']").on("change",function(){
    var ts=$(this);
    if(ts.val()==0){
        $("#reture,#closeJq").hide();
        $("#cancelJq,#save-submit,#save-baseInfo").show();
        if (type == "3") {
            $("#fengXianShengPi,#yewuShengPi").show();
        }
    }
    else{
        $("#save-submit,#save-baseInfo,#fengXianShengPi,#yewuShengPi").hide();
        $("#reture").show();
        if (type == "2") {
            $("#closeJq").show();
        }
    }
});

comn.ajax({
    // 请求地址
    url:urlId,
    // 传个参数
    data:$.extend($("#jqQasicInformation").values(), dataId),
    // 请求成功
    success: function (res) {
        baodan2(res.data.projectId);
        console.log(res);
        // 查看贷款档案
        $(".lookDang").on("click",function(){
            return comn.addTab({
                    title:"贷款详情",
                    href: "./Modal/customManage/customer/loanDetail.html?loanApplyId=" + res.data.projectId + "&businessTypeCode=" + jqQasicInformationUrl.flowType+"&projectId="+res.data.projectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY" + "&loanFlag=1&customerId="+ res.data.customerId
                });
        });
        RepaymentHistoryList(res.data.projectId);
        if(res.data.id){
           $("input[name='id']").val(res.data.id);
            settlementId = res.data.id;
           // 图片获取调用接口
            comn.ajax({
                url:interUrl.ThePerformance.imgGet,
                data:{dragCarId:res.data.id},
                success:function(res){
                    if(res.data){
                      var imgHtml='';
                      $.each(res.data, function(i,obj){
                        imgHtml+=["<li>", "<img src='"+ obj.depositFile +"' class='hide' />", "<input name='LoanDocuments[" + 0 + "].fileName' data-name='fileName' class='hide' value='" + obj.depositFileName + "' />", "<a href='javascript:;' class='clickImg'>" + obj.depositFileName + "</a>", "&nbsp;<a href='javascript:;' dataDeleteId='"+obj.id+"' class='upCancle'>\u5220\u9664</a>", "</li>"].join("");
                        })  
                        $("ul#fileType_").append(imgHtml);
                    }
                    if(jqQasicInformationUrl.LIU){
                         if(jqQasicInformationUrl.type!=1){
                            $(".upCancle").hide();
                        }   
                    }
                    if(jqQasicInformationUrl.xiangqing){
                        $("#fileType_ a.upCancle,.upImage2").hide();
                      //  $("#fujianUpload .upImage2").hide();
                    }
                }
            });
        }
        if(jqQasicInformationUrl.xiangqing){
            $("#jqQasicInformation input,#jqQasicInformation textarea,#yijian input").attr("readonly",true); 
            $(".liuChengYiJian,#cancelJq-ce,#save-submit,#save-baseInfo,#yewuShengPi,#fengXianShengPi,#cancelJq").hide();
        }
        $("#jqQasicInformation").values(res.data);
//默认当前账户名称
        $("#returnAccountName").val(res.data.customerName);
        proidsss=res.data.projectId;
        fyszqk(proidsss);
        $("#getBrand").getBrandC( $("#getBrand").is(":disabled"));
        $("#getCarList").getCarListC(res.data.carBrand, {
            code: res.data.carMake,
            value: res.data.carMakeName
        }, $("#getCarList").is(":disabled"));
        $("#getCarModel").getCarModelC(res.data.carMake, {
            code: res.data.carModel,
            value: res.data.carModelName
        }, $("#getCarModel").is(":disabled"));
        /*comn.linkage({
            type: "car",
            level:[
                {
                    el: $("#getBrand"),
                    key: res.data.carBrand,
                    target:$("input[name='carBrandName']")
                }, {
                    el: $("#getCarList"),
                    key: res.data.carMake,
                    target:$("input[name='carMake']")
                }, {
                    el: $("#getCarModel"),
                    key: res.data.carModel,
                    target:$("input[name='carModelName']")
                }
            ]
        });*/
    }
});

// 履约保证金
$("input[name='pbDeposit']").val(jqQasicInformationUrl.pbDeposit);
// 垫款余额
$("input[name='advanceBalance']").val(jqQasicInformationUrl.renewalDeposit);







// 上传附件|图片
$(".upImage").on("click",function(){
    var depositId;
    if(jqQasicInformationUrl.renwu){
        depositId={depositId:jqQasicInformationUrl.depositId,id:$("#id").val() || ids};
    }else{
        depositId={projectId:jqQasicInformationUrl.projectId};
    }
    if (($("#jqQasicInformation").valid() == true)) {
        if (!settlementId) {
            comn.ajax({
                url: interUrl.ThePerformance.seveXX,
                data: $.extend($("#jqQasicInformation").values(), depositId),
                success: function (res) {
                    //alert(res.data);
                    // 保存返回过来的id
                    settlementId = res.data;
                    $("#id").val(res.data);
                    //uploadImg(o,name,settlementId);
                    return;
                }
            });
        }
        $(".upImageInput").trigger("click");
    }
    //var validate_is=$("#jqQasicInformation").validate({
    //
    //});
    //if(!$("#jqQasicInformation").valid()){
    //    return;
    //}else{
    //    $(".upImageInput").trigger("click");
    //}
    
});
//ajax上传图片
function uploadImg(imgBase64,imgName,settlementId) {
    comn.ajax({
        url: interUrl.ThePerformance.imgSave,
        data:  {
            depositFileName:imgName,
            depositFile:imgBase64,
            id:settlementId,
            depositId:settlementId
        },
        success: function (res) {
            //results.push(base64(i, k, function (f, o, index) {
            //    var _index = $("#fileType_").find("li").length;
            //    //o是处理过的base64图片地址（二进制流） f.name原文件名
            //    html = ["<li>", "<img src='"+ o +"' class='hide' />", "<input name='LoanDocuments[" + 0 + "].fileName' data-name='fileName' class='hide' value='" + f.name + "' />", "<a href='javascript:;' class='clickImg'>" + f.name + "</a>", "&nbsp;<a href='javascript:;' class='upCancle'>\u5220\u9664</a>", "</li>"].join("");
            //    //html = ["<li>", "<input name='LoanDocuments[" + 0 + "].filePath' data-name='filePath' class='hide' value='" + o + "' /> <img src='"+ o +"' />", "<input name='LoanDocuments[" + 0 + "].fileName' data-name='fileName' class='hide' value='" + f.name + "' />", "<a href='javascript:;'>" + f.name + "</a>", "&nbsp;<a href='javascript:;' class='upCancle'>删除</a>", "</li>"].join("");
            //    $("#fileType_").append(html);
            //    save_s(o,f.name,uploadImg,html);
            //    // uploadImg(id,o,f.name);
            //}));
            
            var _index = $("#fileType_").find("li").length;
            html = ["<li>", "<img src='"+ imgBase64 +"' class='hide' />", "<input name='LoanDocuments[" + 0 + "].fileName' data-name='fileName' class='hide' value='" + imgName + "' />", "<a href='javascript:;' class='clickImg'>" + imgName + "</a>", "&nbsp;<a href='javascript:;' class='upCancle' datadeleteid='"+ res.data+"'>\u5220\u9664</a>", "</li>"].join("");
            $("#fileType_").prepend(html);

            //$("#fileType_ li:last-child").find("a.upCancle").attr("dataDeleteId",res.data);
           // console.log(res);
            //$tr.addClass("loaded").attr("data-id",res.data[0]);
        }
    });
}


//图片上传封装函数
base64 = function (file, index, callback) {
    return lrz(file).then(function (rst) {
        //tst返回的是图片处理过的信息
        var imgRst;
        imgRst = rst.base64;//获取到图片base64
        return typeof callback === "function" ? callback(file, imgRst, index) : void 0;
        //file 图片信息
        //index索引
        //imgRst图片base64
    });
};


//图片上传前保存，会返回个id
function save_s(o,name){
    var validate_is=$("#jqQasicInformation").validate({
        submitHandler:function(form){
            return;
        }
    });
    if(!$("#jqQasicInformation").valid()){
        return;
    }
    //var settlementId;

    uploadImg(o,name,settlementId);
    //if (settlementId) {
    //    uploadImg(o,name,settlementId);
    //} else {
    //    comn.ajax({
    //        url: interUrl.ThePerformance.seveXX,
    //        data: $.extend($("#jqQasicInformation").values(), depositId),
    //        success: function (res) {
    //            //alert(res.data);
    //            // 保存返回过来的id
    //            settlementId = res.data;
    //            $("#id").val(res.data);
    //            uploadImg(o,name,settlementId);
    //            return;
    //        }
    //    });
    //}

}

//图片上传域改变时触发
$(".upImageInput").change(function () {
        /*var _this = $(this);
        var _type = _this.attr("data-type");
        var fileArr, html, i, j, k, len, results;
        fileArr = this.files;//图片信息
        console.log(fileArr);
        results = [];
        for (k = j = 0, len = fileArr.length; j < len; k = ++j) {
            i = fileArr[k];//获取到文件信息

            html = "";

            //base64调用图片上传封装方法，接受三个参数，图片信息i 索引k，回调函数
            results.push(base64(i, k, function (f, o, index) {
                var _index = $("#fileType_").find("li").length;
                //o是处理过的base64图片地址（二进制流） f.name原文件名
                html = ["<li>", "<img src='"+ o +"' class='hide' />", "<input name='LoanDocuments[" + 0 + "].fileName' data-name='fileName' class='hide' value='" + f.name + "' />", "<a href='javascript:;' class='clickImg'>" + f.name + "</a>", "&nbsp;<a href='javascript:;' class='upCancle'>\u5220\u9664</a>", "</li>"].join("");
                //html = ["<li>", "<input name='LoanDocuments[" + 0 + "].filePath' data-name='filePath' class='hide' value='" + o + "' /> <img src='"+ o +"' />", "<input name='LoanDocuments[" + 0 + "].fileName' data-name='fileName' class='hide' value='" + f.name + "' />", "<a href='javascript:;'>" + f.name + "</a>", "&nbsp;<a href='javascript:;' class='upCancle'>删除</a>", "</li>"].join("");
                $("#fileType_").append(html);
                save_s(o,f.name,uploadImg,html);
               // uploadImg(id,o,f.name);
            }));
        }
        return results;
        */
    var _this = $(this);
    var _type = _this.attr("data-type");
    var fileArr, i, j, k, len, results;
    fileArr = this.files;
    results = [];
    for (k = j = 0, len = fileArr.length; j < len; k = ++j) {
        i = fileArr[k];
        results.push(base64(i, k, function (f, o, index) {
            //uploadImg(dealerId || $("#dealerId").val(), _type, o, f);
            //uploadImg(id,o,f.name);
            save_s(o,f.name);
        }));
    }
    return results;




});


// 保存
$("#save-baseInfo").on("click",function(){
    var validate_is=$("#jqQasicInformation").validate({
        submitHandler:function(form){
            return;
        }
    });
    if(!$("#jqQasicInformation").valid()){
        return;
    }
   var depositId;
   if(jqQasicInformationUrl.renwu){
      depositId={depositId:jqQasicInformationUrl.depositId,id:$("#id").val() || ids};
   }else{
      depositId={projectId:jqQasicInformationUrl.projectId};
   }
    comn.ajax({
        url: interUrl.ThePerformance.seveXX,
        data: $.extend($("#jqQasicInformation").values(), depositId),
        success: function (res) {
            $("#id").val(res.data);
           tip({
            content: "\u4fdd\u5b58\u6210\u529f\uff01"
          });
        }
    });
});


//删除图片  delDocument
$(".files-ul").on("click", ".upCancle", function () {
    var _this;
    _this = $(this);
    datadeleteid=_this.attr("datadeleteid");
    comn.ajax({
        url:interUrl.ThePerformance.deleteImg,
        data:{
            id:datadeleteid
        },
        success:function(res){
            _this.parents("li").remove();
            _this.parents("ul").prev("div").find(".upImageInput").val("");
            tip({
                content: "\u5220\u9664\u6210\u529f"
            });
        }
    });

});


//查看图片
$(document).on("click",".clickImg",function(){
    var _this=$(this),imgArr=[];
    var imgA=_this.parents("ul#fileType_").find("img.hide");
    var _index=imgA.index(_this.prev().prev());
    imgA.each(function(index){
        imgArr.push($(this).attr("src"));
    });
    window.parent.switchImage(imgArr,_index);
});


if(jqQasicInformationUrl.type==3){
    $("#yewuShengPi,#fengXianShengPi").show();
   // $("#save-submit").hide();
}
if(jqQasicInformationUrl.type==4 || jqQasicInformationUrl.type==5){
    $("#yewuShengPi,#fengXianShengPi").hide();
   // $("#save-submit").hide();
}

// 业务经理审批
$("#yewuShengPi").on("click",function(){
    submitSave();
   var depositId;
   if(jqQasicInformationUrl.renwu){
      depositId={depositId:jqQasicInformationUrl.depositId,id:$("#id").val() || ids};
   }else{
      depositId={projectId:jqQasicInformationUrl.projectId};
   }
    comn.ajax({
        url: interUrl.ThePerformance.seveXX,
        data: $.extend($("#jqQasicInformation").values(), depositId),
        success: function (res) {
            console.dir(res);
            $("#id").val(res.data);
            businessTypeId = res.data;
            oppSureModal("\u662f\u5426\u786e\u8ba4\u63d0\u4ea4");
            $("#sureOption").unbind("click").click(function () {
              //保存流程意见
              flowSubmit(interUrl.ThePerformance.preBusiness, interUrl.ThePerformance.submit2Business, './Modal/task/myTask/index.html', {performBondId:businessTypeId});
              $("#sureModal").modal("hide");
            });
        }
    });  
});

// 风险经理审批
$("#fengXianShengPi").on("click",function(){
    submitSave();
   var depositId;
   if(jqQasicInformationUrl.renwu){
      depositId={depositId:jqQasicInformationUrl.depositId,id:$("#id").val() || ids};
   }else{
      depositId={projectId:jqQasicInformationUrl.projectId};
   }
    comn.ajax({
        url: interUrl.ThePerformance.seveXX,
        data: $.extend($("#jqQasicInformation").values(), depositId),
        success: function (res) {
            console.dir(res);
            $("#id").val(res.data);
            businessTypeId = res.data;
            oppSureModal("\u662f\u5426\u786e\u8ba4\u63d0\u4ea4");
            $("#sureOption").unbind("click").click(function () {
              //保存流程意见
              flowSubmit(interUrl.ThePerformance.preRisk, interUrl.ThePerformance.submit2Risk,'./Modal/task/myTask/index.html', {performBondId:businessTypeId});
              $("#sureModal").modal("hide");
            });
        }
    }); 
})




//提交审批
$("#save-submit").on("click",function(){
        submitSave();
        var depositId_;
           if(jqQasicInformationUrl.renwu){
              depositId_={depositId:jqQasicInformationUrl.depositId,id:$("input[name='id']").val() || ids};
           }else{

              depositId_={projectId:jqQasicInformationUrl.projectId};
           }
           console.log(depositId_);

           var validate_is=$("#jqQasicInformation").validate({
                submitHandler:function(form){
                    return;
                }
            });
            // if(!$("#jqQasicInformation").valid()){
            //     return;
            // }
            comn.ajax({
                url: interUrl.ThePerformance.seveXX,
                data: $.extend($("#jqQasicInformation").values(), depositId_),
                success: function (res) {
                    console.dir(res);
                    $("#id").val(res.data);
                    businessTypeId=res.data;
                    oppSureModal("\u662f\u5426\u786e\u8ba4\u63d0\u4ea4");
                    $("#sureOption").unbind("click").click(function () {
                      //保存流程意见
                      flowSubmit(interUrl.ThePerformance.lvYuepreSubmit, interUrl.ThePerformance.lvYuesubmit2next, './Modal/task/myTask/index.html', {performBondId:businessTypeId});
                      $("#sureModal").modal("hide");
                    });
                }
            }); 
});

function submitSave() {
    if(jqQasicInformationUrl["currentNode"] != "LAUNCH_BOND_CLEAR"){
        var validate_is=$("#jqQasicInformation").validate({
            submitHandler:function(form){
                return;
            }
        });
        if(!$("#jqQasicInformation").valid()){
            return;
        }
        var radio_val;
        $("input[name='inlineRadioOptions']").each(function(){
            if($(this).prop("checked")){
                radio_val=$(this).val();
            }
        });
        comn.ajax({
            url:interUrl.SettlementRegistration.saveYiJian,
            data:{
                conclusion:radio_val,
                opinion:$("textarea[name='ProcessTheOpinion']").val(),
                bopInfoId:jqQasicInformationUrl.businessObjectProcessInfoId
            },
            success:function(res){
                console.log(res);
            }
        });
    }
}

// 取消
$("button#cancelJq").on("click",function(){
    comn.closeTab();
    // comn.ajax({
    //     url: interUrl.ThePerformance.lvYueCancel,
    //     data: $.extend($("#jqQasicInformation").values(), {depositId:jqQasicInformationUrl.projectId,id:ids,performBondId:$("input[name='id']").val()}),
    //     success: function (res) {
    //         comn.closeTab();
    //     }
    // }); 
});

// 撤销
$("#cancelJq-ce").on("click",function(){
    comn.ajax({
        url: interUrl.ThePerformance.lvYueCancel,
        data: $.extend($("#jqQasicInformation").values(), {projectId:jqQasicInformationUrl.projectId,id:ids,performBondId:$("input[name='id']").val(), loanClearId: ids}),
        success: function (res) {
            comn.closeTab();
        }
    });
});

// 返回上一步
$("button#reture").on("click",function(){
     oppSureModal("\u786e\u8ba4\u9000\u56de\u4e0a\u4e00\u6b65\u5417\uff1f");
     $("#sureOption").unbind("click").click(function () {
        comn.ajax({
            url: interUrl.common.opinion,
            data:{
                conclusion:$("input[name='inlineRadioOptions']").val(),
                opinion:$("textarea[name='ProcessTheOpinion']").val(),
                bopInfoId:jqQasicInformationUrl.businessObjectProcessInfoId
            },
            success: function (res) {
                $("#sureModal").modal("hide");
                comn.ajax({
                    url: interUrl.ThePerformance.lvYueback2pre,
                    data: $.extend($("#jqQasicInformation").values(), {depositId:jqQasicInformationUrl.projectId,id:ids,performBondId:ids, loanClearId: ids}),
                    success: function (res){
                        /*tip({
                            content: "\u64a4\u9500\u6210\u529f"
                        });*/
                        comn.closeTab();
                    }
                }); 
            }
          });
     });
    
});
// 关闭履约
$("#closeJq").on("click",function(){
    oppSureModal("确认关闭流程？");
    $("#sureOption").unbind("click").click(function () {
        comn.ajax({
            url: interUrl.ThePerformance.close,
            data: $.extend($("#jqQasicInformation").values(), {depositId:jqQasicInformationUrl.projectId,id:ids, performBondId: ids}),
            success: function (res){
                /*tip({
                    content: "\u64a4\u9500\u6210\u529f"
                });*/
                comn.closeTab();
            }
        }); 
     });
});




var InsurancePolicy_edit, AfterConfirmedPhoneRecords_edit, editTableEvent;
// 保单详情按钮
InsurancePolicy_edit = function(value, row, index) {
    /*console.log(row);
    console.log(index);
    console.log(value);*/
    /*
        index为索引
        row为返回当前一条记录的对象
        value为当前值
    */
    return ["<button type='button' class='btn btn-primary btn-xs InsurancePolicy_edit' style='margin-left:10px;'>查看详情</button>"].join("");
};

//还款记录按钮
AfterConfirmedPhoneRecords_edit=function(){
    return ["<button type='button' class='btn btn-primary btn-xs AfterConfirmedPhoneRecords_edit' style='margin-left:10px;'>查看详情</button>"].join("");
}





// 操作按钮绑定事件
editTableEvent = {
    // 保单详情
    "click .InsurancePolicy_edit": function(e, a, item, index) {
        //addTab方法是打开窗口方法
        return comn.addTab({
            title:"保单详情",
            href: "./Modal/SettlementRegistration/bartenderRecord/policyDetails.html?id="+item.id
        });
    },

    // 继保电话记录
    "click .AfterConfirmedPhoneRecords_edit": function(e, a, item, index) {
        //addTab方法是打开窗口方法
        return comn.addTab({
            title:"还款记录情",
            href: "./Modal/SettlementRegistration/CheckLoanDetails/CheckLoanDetails.html?id="+item.id
        });
    }
};
$(function(){
    $("#table3").bootstrapTable({
        "undefinedText": "--",
        "classes": "table-striped table-hover table",
        "pagination": false,
        "sidePagination": "server",
        "queryParams": "queryParams",
        "paginationFirstText": "第一页",
        "paginationPreText": "上一页",
        "paginationNextText": "下一页",
        "paginationLastText": "最后一页",
        "clickToSelect": true,
        "height": "500"
    });
});
//费用收支情况
var _feeCategoryCodes = [];
$(".feeCategoryCode input:checked").each(function(){
    _feeCategoryCodes.push($(this).val());
});
function fyszqk(projectId) {
    fee(_feeCategoryCodes, projectId);
}
function fee(_feeCategoryCodes, projectId){
    var _arrStr = _feeCategoryCodes.join(",");
    if (_arrStr == "") {
        tip({content: "请选择费用类别"});
        return false;
    }
    table_3 = function(params) {
        var p = params.data;
        return comn.ajax({
            url: interUrl.sz.list,
            data: {
                projectId: projectId,
                feeCategoryCodes : _arrStr
            },
            success: function (res) {
                params.success({
                    'total': res.totalItem,
                    rows: res.data.feeManageList
                });
                $("#TotalSpending").values(res.data);
                return params.complete();
            }
        });
    }
    $("#table3").bootstrapTable("refresh", {url: "..."});
}
$(".feeCategoryCode input").on("change", function(){
    if($(this).is(":checked")){
        _feeCategoryCodes.push($(this).val());
    }else{
        var index = _feeCategoryCodes.indexOf($(this).val());
        _feeCategoryCodes.splice(index,1);
    }
    fee(_feeCategoryCodes, proidsss);
});
/*
// 费用收支情况列表
var fyszqk;
var pages=10;
var szHtml='';
var totalRes;
var cylbCheckbox=[];
var tiaoShuXian=true;
function fyszqk(prID){
            var datas;
            if(arguments.length>0){
                datas={projectId:prID};
            }
            else{
               datas={projectId:prID};
            }
            comn.ajax({
                url:interUrl.sz.list,
                data:datas,
                success:function(res){
                    totalRes=res;
                    console.log(totalRes);
                    console.log(1);
                    szHtml='';
                    $("tbody#shouZhiList").html(szHtml);
                    $.each(res.data.feeManageList,function(i,obj){
                        if(tiaoShuXian){
                             if(i<=10){
                                if(obj.isIncome=="1"){
                                    obj.isIncome="支";
                                }
                                if(obj.isIncome=="2"){
                                    obj.isIncome="收";
                                }
                                szHtml+='<tr><td>'+obj.createTime+'</td> <td>'+obj.feeCategoryName+'</td> <td>'+obj.feeName+'</td> <td>'+obj.isIncome+'</td> <td>'+obj.paymentAmount+'</td> <td>'+obj.collectedAmount+'</td> <td>'+obj.userName+'</td> <td>'+obj.remark+'</td></tr>';
                                $("tbody#shouZhiList").html(szHtml);
                            }else{
                                return false;
                            }   
                        }
                        
                    });
                    
                    $("#hjzc_s").html(res.data.totalPayment);
                    $("#hjhs_s").html(res.data.totalIncome);
                    $("#ce_s").html(res.data.diffTotalAmount);
                    $("#loadMoreSz").show();
                    //alert(szHtml);
                    
                }
            });   
        
        
};


// 费用类别选择查询

$(".cylbCheckbox input").on("change",function(){
    var ts=$(this);
    if(ts.prop("checked")){
       cylbCheckbox.push(ts.val()); 
    }else{
        var index=cylbCheckbox.indexOf(ts.val());
        cylbCheckbox.splice(index,1);
    }

    //fyszqk(cylbCheckbox);
    eachFeiYong(cylbCheckbox);
    $("#loadMoreSz").show();
});

var htmlFei='';
function eachFeiYong(arr){
    htmlFei='';
    /*if(arr.indexOf("其他费用")>=0){
        //fyszqk();
         $.each(totalRes.data.feeManageList,function(i,obj){
            htmlFei+='<tr><td>'+obj.createTime+'</td> <td>'+obj.feeCategoryName+'</td> <td>'+obj.feeName+'</td> <td>'+obj.isIncome+'</td> <td>'+obj.paymentAmount+'</td> <td>'+obj.collectedAmount+'</td> <td>'+obj.userName+'</td> <td>'+obj.remark+'</td></tr>';
        });
        $("tbody#shouZhiList").html(htmlFei); 
    }*//*
    if(arr.length<=0){
        fyszqk(proidsss);
    }
    else{
        for(var j=0;j<arr.length;j++){
            $.each(totalRes.data.feeManageList,function(i,obj){
                if(arr[j]==obj.feeCategoryName+"费用"){
                    htmlFei+='<tr><td>'+obj.createTime+'</td> <td>'+obj.feeCategoryName+'</td> <td>'+obj.feeName+'</td> <td>'+obj.isIncome+'</td> <td>'+obj.paymentAmount+'</td> <td>'+obj.collectedAmount+'</td> <td>'+obj.userName+'</td> <td>'+obj.remark+'</td></tr>';
                }
                if(arr[j]==obj.feeCategoryName){
                    htmlFei+='<tr><td>'+obj.createTime+'</td> <td>'+obj.feeCategoryName+'</td> <td>'+obj.feeName+'</td> <td>'+obj.isIncome+'</td> <td>'+obj.paymentAmount+'</td> <td>'+obj.collectedAmount+'</td> <td>'+obj.userName+'</td> <td>'+obj.remark+'</td></tr>';
                }
            });
        }
        $("tbody#shouZhiList").html(htmlFei);   
        $("#hjzc_s").html(totalRes.data.totalPayment);
        $("#hjhs_s").html(totalRes.data.totalIncome);
        $("#ce_s").html(totalRes.data.diffTotalAmount);
        $("#loadMoreSz").show();
    }
    
}

// 加载更多
var htmlFei2='';
$("#loadMoreSz").on("click",function(){
    htmlFei2='';
      $.each(totalRes.data.feeManageList,function(i,obj){
            htmlFei2+='<tr><td>'+obj.createTime+'</td> <td>'+obj.feeCategoryName+'</td> <td>'+obj.feeName+'</td> <td>'+obj.isIncome+'</td> <td>'+obj.paymentAmount+'</td> <td>'+obj.collectedAmount+'</td> <td>'+obj.userName+'</td> <td>'+obj.remark+'</td></tr>';
        });
    
    $("tbody#shouZhiList").html(htmlFei2);  
    $("#hjzc_s").html(totalRes.data.totalPayment);
    $("#hjhs_s").html(totalRes.data.totalIncome);
    $("#ce_s").html(totalRes.data.diffTotalAmount);
    $(".cylbCheckbox input").attr("checked",false);
    $("#loadMoreSz").hide();
    if(totalRes.data.length>=16){
        $("div.fy_s .fixed-table-container").css("height","auto");
    }
    
});*/


// 还款记录
var totalRes2;
var szHtml22='';
function RepaymentHistoryList(paramsId){
    comn.ajax({
        url:interUrl.RepaymentHistory.RepaymentHistoryList,
        data:{projectId:paramsId},
        success:function(res){
            totalRes2=res;
            szHtml='';
            $("#shouZhiList22").html(szHtml22);
            $.each(res.data,function(i,obj){
                // if(i<=10){
                   
                    szHtml22 += '<tr><td>'+obj.planNo+'</td> <td>'+obj.repayAmount+'</td> <td>'+obj.monthRepaymentAmount+'</td> <td>'+obj.currentBankRepaymentTime+'</td> <td>'+obj.overdueStatusName+'</td> <td>'+obj.overdueDays+'</td> <td>'+obj.overdueTotalAmount+'</td> <td>' + obj.beingAmount+  '</td></tr>';
                    $("#shouZhiList22").html(szHtml22);
               // }else{
                   // return false;
               // } 
            });
            if(res.data.length>0){
                $("#RepaymentHistory .fixed-table-container").css("height","auto");
            }
            $("#loadMoreSz").show();
            //alert(szHtml);
            
        }
    });   
};
// 还款记录加载更多
/*$("button.jlMore").on("click",function(){
    $.each(totalRes2.data,function(i,obj){
        szHtml22+='<tr><td>'+obj.planNo+'</td> <td>'+obj.repayAmount+'</td> <td>'+obj.monthRepaymentAmount+'</td> <td>'+obj.currentBankRepaymentTime+'</td> <td>'+obj.overdueStatusName+'</td> <td>'+obj.overdueDays+'</td> <td>'+obj.overdueTotalAmount+'</td> </tr>';
        $("tbody#shouZhiList22").html(szHtml22);
    });
    $("div.jlMore").hide();
});*/





    var table_1, table_2, handle_1, handle_2, handle_3, tableEvent_1, tableEvent_2, insuranceStatus, insuranceStatus_1, phoneObject;
    var telInfo = [];
    //获取链接携带参数
    var postData = comn.getArgs();
    var data;
    $("#loanInsuranceForm").hide();
        $("#btn-search").hide();
        handle_1 = function(value, row, index) {
            if (row.status == null) {
                return ["<div class='btn-group btn-group-xs'>", 
                "<button type='button' class='btn btn-primary see'>查看", 
                "</button>", "</div>"].join("");
            } else {
                return ["<div class='btn-group btn-group-xs'>", 
                "<button type='button' class='btn btn-primary see_2'>查看", 
                "</button>", "</div>"].join("");
            }
            
        };
        handle_2 = function(value, row, index) {
            return ["<div class='btn-group btn-group-xs'>", 
            "<button type='button' class='btn btn-primary see2'>查看", 
            "</button>", "</div>"].join("");
        };
        $("#loanInsuranceForm").hide();
    function baodan2(proID){
         data= {
            projectId: proID
        }


    //保单信息
        table_1 = function(params) {
            if(jqQasicInformationUrl.LIU){

            tableData(params, $.extend(data, {flag: 0}), interUrl.SettlementRegistration.baoDan);
            }
        };
        $("#table1").bootstrapTable(comn.table);
    // 续保情况
    // 续保电话记录
        table_2 = function(params) {
            if(jqQasicInformationUrl.LIU){

            tableData(params, $.extend(data, {flag: 0}), interUrl.SettlementRegistration.listPhone);
            }
        };
        $("#table2_tel").bootstrapTable(comn.table);
    //电话tab详情表头数据渲染

            comn.ajax({
            url: interUrl.insurance.getCOntact,
            data: data,
            success: function(res) {
                console.log(res);
                console.log("res");
                var item = res.data;
                telInfo = item;
               // console.log()
                if (item.spouseName== null || item.spouseName=="") {
                    $("#hiddenSection").hide();
                }
                //获取省
                var province = (function(){
                    if(item.homeAddressPname == null) {
                        return ""
                    } else {
                        return item.homeAddressPname
                    }
                })(item);
                //判断家庭住址的省市信息是否一样，然后做拼接
                var city = (function(){
                    if(item.homeAddressCname === item.homeAddressPname) {
                        return "";
                    } else if (item.homeAddressCname == null){
                        return "";
                    } {
                        return item.homeAddressCname;
                    }
                })(item);
                //判断区
                var area = (function(){
                    if(item.homeAddressRname == null) {
                        return ""
                    } else {
                        return item.homeAddressRname
                    }
                })(item);
                //判断具体地址
                var detailAddress = (function(){
                    if(item.homeAddressDetail == null) {
                        return ""
                    } else {
                        return item.homeAddressDetail
                    }
                })(item);
                var address = province + city + area + detailAddress;
                item.address = address;
                $("#contactInfo").nameValues(item);
            }
        })

    }

    //tab不同按钮跳转
    $("#btn-search").click(function() {
        var activeTab=$(".tab-content2").find(".tab-pane.active").attr("id");
        if(activeTab == "todo"){
            return comn.addTab({
                href:'./Modal/insuranceManage/renewInsurance/insuranceEntry.html?type=add' + '&projectId=' + postData.projectId,
                title: '保单信息录入'
            });
        }else{
            sessionStorage.flagActive = "2";
            return comn.addTab({
                href:'./Modal/insuranceManage/renewInsurance/addRecord.html?type=add' + '&projectId=' + postData.projectId + "&customerName=" + telInfo.customerName + "&spouseName="+telInfo.spouseName,
                title: '录入联系记录'
            });
        }
    });
    //点击切换头部表单
    $("#nav li").click(function(){
        var index = $(this).index();
        index === 0 ?  $("#spanText").text(" 保单录入 ") :  $("#spanText").text(" 添加电话记录 ");
    });
    tableEvent_1 = {
        "click .modify": function(e, a, item, index) {
            return comn.addTab({
                href:'./Modal/insuranceManage/renewInsurance/insuranceEntry.html?type=modify&id=' + item.id + "&projectId=" + item.projectId,
                title: '保单信息修改'
            })
        },
        "click .del": function(e, a, item, index) {
            getGroup(item, interUrl.insurance.delInsuranceRenew, $("#table1"));
            $("#table1").bootstrapTable("refresh", {url: "..."});
        },
        "click .see": function(e, a, item, index){

            if(item.status){
                 return comn.addTab({
                    href:'./Modal/insuranceManage/firstInsurance/insuranceEntry.html?type=see&id=' + item.id + "&projectId=" + item.projectId+"&flag=1",
                    title: '保单信息'
                }); 
             }else{
                return comn.addTab({
                    href:'./Modal/insuranceManage/renewInsurance/insuranceEntry.html?type=see&id=' + item.id + "&projectId=" + item.projectId+"&flag=0",
                    title: '保单信息'
                }); 
             }
        },
        "click .see_2": function(e, a, item, index){
            if(item.status){
                 return comn.addTab({
                    href:'./Modal/insuranceManage/firstInsurance/insuranceEntry.html?type=see&id=' + item.id + "&projectId=" + item.projectId+"&flag=1",
                    title: '保单信息'
                }); 
             }else{
                return comn.addTab({
                    href:'./Modal/insuranceManage/renewInsurance/insuranceEntry.html?type=see&id=' + item.id + "&projectId=" + item.projectId+"&flag=0",
                    title: '保单信息'
                }); 
             }
         }

    };
    //续保电话
    tableEvent_2 = {
        "click .modify": function(e, a, item, index) {
            return comn.addTab({
                href:'./Modal/insuranceManage/renewInsurance/addRecord.html?type=modify&id=' + item.id + "&projectId=" + item.projectId + "&phoneName=" + item.phoneName + "&spouseName="+"&note="+item.note,
                title: '保单联系人信息修改'
            })
        },
        "click .del": function(e, a, item, index) {
            getGroup(item, interUrl.insurance.delInsuranceRenewPhone, $("#table2_tel"));
            $("#table2_tel").bootstrapTable("refresh", {url: "..."});
        },
        "click .see2": function(e, a, item, index){
            return comn.addTab({
                href:'./Modal/insuranceManage/renewInsurance/addRecord.html?type=see&id=' + item.id + "&projectId=" + item.projectId,
                title: '保单联系人信息修改'
            })
        }
    };
    phoneObject = function (value, row, index) {
        return [null, "本人", "配偶"][value] || null;
    };
    insuranceStatus = function (value, row, index) {
        return ["首保", "首保"][value] || "续保";
    };
    insuranceStatus_1 = function (value, row, index) {
        return ["是", "是"][value] || "否";
    };
    insuranceStatusTemp = function (value, row, index) {
        return [null, "公司", "车行", "客户"][value] || null;
    };

    contactObj = function (value, row, index) {
        return [null, "本人", "配偶"][value] || null;
    };
    resultsTracking = function (value, row, index) {
        return [null, "客户已保", "车行已保", "无法接通", "待跟进", "无法沟通", "同意续保"][value] || null;
    };

    var fn = null;
    function  getGroup(o, url, obj, callback){
                $("#tipText").text("确定要删除吗?");
                $("#sureModal").modal("show");      
                fn = function(){
                 comn.ajax({
                        url: url,
                        data: {
                            id: o['id']
                        },
                        success: function(res) {
                            fn = null;
                            obj.bootstrapTable("refresh", {url: "..."});
                            tip({content: res.message || "删除成功"});
                            $("#sureModal").modal("hide"); 
                            
                        }
                    });
            }

    }
    $(function(){
        if (sessionStorage.flagActive == "2") {
            $(".nav-tabs li").eq(1).addClass("active");
            $(".nav-tabs li").eq(0).removeClass("active");
            $("#todo").removeClass("active");
            $("#done").addClass("active");
            $("#spanText").html(" 添加电话记录 ");
        }
        sessionStorage.flagActive = "1";
        $("#sureBtn").click(function(){
           if(typeof fn == "function"){
            fn();
           } 
        });
        $("#returnDate").getToday();
    });





if(jqQasicInformationUrl.xiangqing){
    $("#jqQasicInformation input,#jqQasicInformation textarea,#yijian input").attr("readonly",true); 
    $(".liuChengYiJian,#cancelJq-ce,#save-submit,#save-baseInfo,#yewuShengPi,#fengXianShengPi,#cancelJq").hide();
}
if( type == "13") {
    $("#flowTitle").text("查看清退详情");
    $("#liuchengYiJian").hide();
}