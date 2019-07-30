//结清处理基本信息
var jqQasicInformationUrl=comn.getArgs();//获取url参数并且格式化成对象
console.log(jqQasicInformationUrl);
var ids;
var businessTypeId;
var urlQuery;
var proidsss;
$("button#cancelJq").css("display","none");
// 查看贷款档案
//$.cookie("baodan2",jqQasicInformationUrl.projectId,{expires:70000000000});

if(jqQasicInformationUrl.disble){
    $("#jqQasicInformation input,#jqQasicInformation textarea,#jqQasicInformation select").attr("disabled",true);
    $("#notTy button").attr("disabled",true);
    $("button.upImage,button.lookDang").attr("disabled",true);
}
if(jqQasicInformationUrl.LIU){
    $("#flowTitle").html(jqQasicInformationUrl.str);
    $("#ProcessInformation_Li,#liuFollowingConfirmedCase_Li").show();
    urlQuery=interUrl.SettlementRegistration.settlementQuery;
    $("#save-submit,#save-baseInfo").hide();
    $("#reture,#closeJq").show();
    $("#cancelJq,#yijian,.liuChengYiJian").show();
    if(jqQasicInformationUrl.str=="结清申请"){
        $("#fujianUpload .upImage2").show();
        $("#cancelJq").hide();
        $("#cancelJq-ce").show();
    }else{
        $("#cancelJq-ce").hide();
        $("#fujianUpload .upImage2").hide();
    }
   
}else{
    if(jqQasicInformationUrl.str){
        $("#flowTitle").html(jqQasicInformationUrl.str);
        $("#liuFollowingConfirmedCase_Li,#ProcessInformation_Li").show();
        if(jqQasicInformationUrl.jqList){
            $("#ProcessInformation_Li,#liuFollowingConfirmedCase_Li").hide();

        }
    }
    $("#ProcessInformation_Li,#liuFollowingConfirmedCase_Li").hide();
    urlQuery=interUrl.SettlementRegistration.basicInformation;
    $("#save-submit,#save-baseInfo").show();
    $("#reture,#closeJq").hide();
    $("#cancelJq,.liuChengYiJian").hide();
}
if(jqQasicInformationUrl.yinhang){
    $("#liuFollowingConfirmedCase").show();
}

comn.ajax({
    // 请求地址
    url:urlQuery,
    // 传个参数
    data:$.extend($("#jqQasicInformation").values(),{
        projectId:jqQasicInformationUrl.projectId
    }),
    // 请求成功
    success: function (res) {
        ids=res.data.id;
        proidsss=res.data.projectId;
        $("#jqQasicInformation").values(res.data);

        baoDans(res.data.projectId);
        RepaymentHistoryList(res.data.projectId);
        fyszqk(res.data.projectId);


        // 查看贷款详情
        $(".lookDang").on("click",function(){
            return comn.addTab({
                        title:"贷款详情",
                        href: "./Modal/customManage/customer/loanDetail.html?id="+jqQasicInformationUrl.projectId+"&loanApplyId="+jqQasicInformationUrl.relativeApplyId1+"&businessTypeCode=" + jqQasicInformationUrl.flowType+"&projectId="+res.data.projectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY" + "&loanFlag=1&customerId="+jqQasicInformationUrl.customerId
                    });
        });


        if(res.data.settlementFiles){
          var imgHtml='';
          if (res.data.settlementFiles) {
                 $.each(res.data.settlementFiles, function(i,obj){
                    imgHtml+=["<li>", "<img src='"+ obj.settlementFile +"' class='hide' />", "<input name='LoanDocuments[" + 0 + "].fileName' data-name='fileName' class='hide' value='" + obj.settlementFileName + "' />", "<a href='javascript:;' class='clickImg'>" + obj.settlementFileName + "</a>", "&nbsp;<a href='javascript:;' dataDeleteId='"+obj.id+"' class='upCancle'>\u5220\u9664</a>", "</li>"].join("");
                });
                $("ul#fileType_").append(imgHtml);
          }
            if(jqQasicInformationUrl.types=="结清确认" || jqQasicInformationUrl.types=="分公司内勤结清确认" || jqQasicInformationUrl.type=="3"){
                $("#cancelJq-ce").hide();
            }
            if(jqQasicInformationUrl.types=="银行结清办理" || jqQasicInformationUrl.types=="驻行内勤结清办理" || jqQasicInformationUrl.type=="2"){
                  $("#cancelJq-ce").hide();
                  $(".liuChengYiJian").show();
            }
            if(jqQasicInformationUrl.type=="1"){
                $("#cancelJq,.upCancle").hide();
                  $("#cancelJq-ce").show();
            }
          else{
            $("#cancelJq-ce").hide();
          }

        }
        if(jqQasicInformationUrl.xiangqing){
            $("#jqQasicInformation input,#jqQasicInformation textarea,#yijian input").attr("readonly",true); 
            $(".liuChengYiJian,#cancelJq-ce,#save-submit,#save-baseInfo").hide();
        }
        if(jqQasicInformationUrl.str){
            $("#flowTitle").html(jqQasicInformationUrl.str);
            $("#liuFollowingConfirmedCase_Li,#ProcessInformation_Li").show();
            if(jqQasicInformationUrl.jqList){
                $("#ProcessInformation_Li,#liuFollowingConfirmedCase_Li").hide();
            }
        }
        //console.log(res.data.settlementFiles);
        if(jqQasicInformationUrl.LIU){
           // $("#fileType_ a.upCancle").hide();

            if(jqQasicInformationUrl.type!=1){

                $("#fileType_ a.upCancle").hide();
            }else{
                $("#fileType_ a.upCancle").show();
                if(jqQasicInformationUrl.xiangqing){
                    $("#fileType_ a.upCancle").hide();
                }
            }
        }
        if(jqQasicInformationUrl.xiangqing){
                    $("#fileType_ a.upCancle,.upImage2").hide();
                }
        //$("#RepaymentHistory .fixed-table-container").css("height":"620px","overflow":"hidden");
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
       // $("#RepaymentHistory .fixed-table-container").css("height":"620px","overflow":"hidden");


// 意见是否同意
function yijianIs(){
    if(jqQasicInformationUrl.types=="结清确认" || jqQasicInformationUrl.types=="分公司内勤结清确认" || jqQasicInformationUrl.type=="3"){
        $(".liuChengYiJian").show();
        $("#cancelJq-ce").hide();
    }
    if(jqQasicInformationUrl.types=="银行结清办理" || jqQasicInformationUrl.types=="驻行内勤结清办理" || jqQasicInformationUrl.type=="2"){

        $(".liuChengYiJian").show();
        $("#cancelJq-ce").hide();
    }
    if(jqQasicInformationUrl.types=="结清申请" || jqQasicInformationUrl.type=="1"){
        $("#save-submit,#save-baseInfo,.liuChengYiJian").hide();
        $("#reture,#closeJq").show();
    }
    /*else{
        $(".liuChengYiJian").hide();
    }*/
   // var selectIsNotY=$("select[name='opinion_s']").val();
   var selectIsNotY;
    $("input[name='inlineRadioOptions']").each(function(){
        if($(this).prop("checked")){
            selectIsNotY=$(this).val();
        }
    });
    if(selectIsNotY=="0"){

        $("#save-submit,#save-baseInfo").show();
        $("#reture,#closeJq").hide();
    }
    else if(selectIsNotY=="1"){

        $("#save-submit,#save-baseInfo").hide();
        $("#reture,#closeJq").show();
    } 
    if($("div.liuChengYiJian").css("display")=="block"){
        $("#save-submit,#save-baseInfo").show();
        $("#reture,#closeJq").hide();
        $("#cancelJq").show();
    }
}

yijianIs();
/*$("input[name='inlineRadioOptions']").each(function(){
    $(this).on("change",function(){
        var ts=$(this);
        var val_s=ts.val();
        if(val_s=="0"){
            $("#save-submit,#save-baseInfo").show();
            $("#reture,#closeJq").hide();
        }

        else if(val_s=="1"){
            if(jqQasicInformationUrl.types=="结清确认" || jqQasicInformationUrl.types=="分公司内勤结清确认" || jqQasicInformationUrl.type=="3"){
                alert(1111);
                $("#save-submit,#save-baseInfo").hide();
                 $("#reture,#save-baseInfo,#cancelJq").show();

            }
           
        }
    }) ; 
});*/
$("input[name='inlineRadioOptions']").on("change",function(){
        var ts=$(this);
        var val_s=ts.val();
        if(val_s=="0"){
            $("#save-submit,#save-baseInfo,#cancelJq").show();
            $("#reture,#closeJq,#cancelJq-ce").hide();
        }

        else if(val_s=="1"){
            if(jqQasicInformationUrl.types=="结清确认" || jqQasicInformationUrl.types=="分公司内勤结清确认" || jqQasicInformationUrl.type=="3"){
                $("#save-submit,#save-baseInfo").hide();
                 //$("#reture,#save-baseInfo,#cancelJq").show();
                 $("#reture,#cancelJq").show();

            }
           if(jqQasicInformationUrl.types=="银行结清办理" || jqQasicInformationUrl.types=="驻行内勤结清办理" || jqQasicInformationUrl.type=="2"){
                $("#save-submit,#save-baseInfo").hide();
                $("#reture,#cancelJq").show();
                $(".liuChengYiJian").show();
           }
           if(jqQasicInformationUrl.types=="结清申请" || jqQasicInformationUrl.type=="1"){
                $("#save-submit,#save-baseInfo,.liuChengYiJian").hide();
                $("#reture,#closeJq").show();
           }
        }
    }) ; 


// 上传附件|图片
$(".upImage").on("click",function(){
    var validate_is=$("#jqQasicInformation").validate({
        submitHandler:function(form){
            return;
        }
    });
    if(!$("#jqQasicInformation").valid()){
        return;
    }else{
       $(".upImageInput").trigger("click");
        afterImgSave(); 
    }
	
});


// 点击上传图片按钮就保存
var settlementId;
function afterImgSave(){
    var validate_is=$("#jqQasicInformation").validate({
        submitHandler:function(form){
            return;
        }
    });
    if(!$("#jqQasicInformation").valid()){
        //$("#upImage_s").removeClass("upImage");
       // $("#upImage_s").attr("disabled",true);
        return;
    }
    /*$("#upImage_s").addClass("upImage");
    $("#upImage_s").attr("disabled",false);*/
    var cid_obj;
    if(jqQasicInformationUrl.LIU){
        cid_obj={id:jqQasicInformationUrl.projectId};
    }else{
        cid_obj={projectId:jqQasicInformationUrl.projectId,id:ids};
    }
    comn.ajax({
        url: interUrl.SettlementRegistration.save,
        data: $.extend($("#jqQasicInformation").values(), cid_obj),
        success: function (res) {
            settlementId=res.data;
            ids=res.data;
            $("input[name='id']").val(ids);
        }
    });
}

//ajax上传图片
function uploadImg(imgBase64,imgName,settlementId) {
   // alert(settlementId);
    if(!settlementId){
        return false;
    }
    comn.ajax({
        url: interUrl.SettlementRegistration.imgUpload,
        data:  {
            settlementFileName:imgName,
            settlementFile:imgBase64,
            settlementId:settlementId,
            id:settlementId
        },
        success: function (res) {
           $("#fileType_ li:last-child").find("a.upCancle").attr("dataDeleteId",res.data);
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
function save_s(o,name,uploadImg,html){
    uploadImg(o,name,settlementId);
    /*comn.ajax({
        url: interUrl.SettlementRegistration.save,
        data: $.extend($("#jqQasicInformation").values(), {projectId:jqQasicInformationUrl.projectId,id:$("input[name='id']").val() || ids}),
        success: function (res) {
            settlementId=res.data;
            $("input[name='id']").val(ids);
            
            
        }
    });*/
}

//图片上传域改变时触发
$(".upImageInput").change(function () {
        var _this = $(this);
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
                if(jqQasicInformationUrl.LIU){
                    if(jqQasicInformationUrl.type!=1){
                        $("#fileType_ a.upCancle").hide();
                    }
                }
               // uploadImg(id,o,f.name);
            }));
        }
        return results;
});


//保存
$("#save-baseInfo").on("click",function(){
    var validate_is=$("#jqQasicInformation").validate({
        submitHandler:function(form){
            return;
        }
    });
    if(!$("#jqQasicInformation").valid()){
        return;
    }
    if($("div.liuChengYiJian").css("display")=="block"){
        comn.ajax({
            url:interUrl.SettlementRegistration.saveYiJian2,
            data:{
                conclusion:$("select[name='opinion_s']").val(),
                opinion:$("textarea[name='ProcessTheOpinion']").val(),
                bopInfoId:jqQasicInformationUrl.businessObjectProcessInfoId
            },
            success:function(res){
                console.log(res);
            }
        });
    }
    var cid_obj;
    if(jqQasicInformationUrl.LIU){
        cid_obj={id:jqQasicInformationUrl.projectId};
    }else{
        cid_obj={projectId:jqQasicInformationUrl.projectId,id:ids};
    }
     comn.ajax({
            url: interUrl.SettlementRegistration.save,
            data: $.extend($("form#jqQasicInformation").values(),cid_obj),
            success: function (res) {
                console.log(res.data);
               tip({
                content: "\u4fdd\u5b58\u6210\u529f\uff01"
              });
            }
        });  
});


//提交审批
$("#save-submit").on("click",function(){
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
    if($("div.liuChengYiJian").css("display")=="block"){
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
    console.log($("#jqQasicInformation").values());

    var cid_obj;
    if(jqQasicInformationUrl.LIU){
        cid_obj={id:jqQasicInformationUrl.projectId};
    }else{
        cid_obj={projectId:jqQasicInformationUrl.projectId,id:ids};
    }
    comn.ajax({
        url: interUrl.SettlementRegistration.save,
        data: $.extend($("#jqQasicInformation").values(),cid_obj),
        success: function (res) {
            console.dir(res);
            businessTypeId=res.data;
            ids=res.data;
            oppSureModal("\u662f\u5426\u786e\u8ba4\u63d0\u4ea4");
            $("#sureOption").unbind("click").click(function () {
              //保存流程意见
              flowSubmit(interUrl.SettlementRegistration.yuChu, interUrl.SettlementRegistration.submit2next, './Modal/task/myTask/index.html', {loanClearId:businessTypeId});
              $("#sureModal").modal("hide");
            });
        }
    });  
});
// 取消
$("button#cancelJq").on("click",function(){
    comn.closeTab();
    /*comn.ajax({
        url: interUrl.SettlementRegistration.cancel,
        data: $.extend($("#jqQasicInformation").values(), {projectId:jqQasicInformationUrl.projectId,id:ids,loanClearId:ids}),
        success: function (res) {
            comn.closeTab();
        }
    }); */
});
$("#cancelJq-ce").on("click",function(){
    comn.ajax({
        url: interUrl.SettlementRegistration.cancel,
        data: $.extend($("#jqQasicInformation").values(), {projectId:jqQasicInformationUrl.projectId,id:ids,loanClearId:ids}),
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
            url: interUrl.SettlementRegistration.back2pre,
            data: $.extend($("#jqQasicInformation").values(), {projectId:jqQasicInformationUrl.projectId,id:ids,loanClearId:ids}),
            success: function (res){
                comn.closeTab();
            }
        }); 
     });
});

// 关闭结清
// $("#closeJq").on("click",function(){
//     comn.ajax({
//         url: interUrl.SettlementRegistration.cancel,
//         data: $.extend($("#jqQasicInformation").values(), {projectId:jqQasicInformationUrl.projectId,id:ids,loanClearId:ids}),
//         success: function (res) {
//             comn.closeTab();
//         }
//     });

// });

//删除图片  delDocument
$(".files-ul").on("click", ".upCancle", function () {
    var _this;
    _this = $(this);
    datadeleteid=_this.attr("datadeleteid");
    comn.ajax({
        url:interUrl.SettlementRegistration.imgDelete,
        data:{
            fileId:datadeleteid
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
    console.log(imgArr);
    window.parent.switchImage(imgArr,_index);
});

var InsurancePolicy_edit,AfterConfirmedPhoneRecords_edit,editTableEvent;
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
                                szHtml+='<tr><td>'+obj.createTime+'</td> <td>'+obj.feeCategoryName+'</td> <td>'+obj.feeName+'</td> <td>'+obj.isIncome+'</td> <td>'+obj.paymentAmount+'</td> <td>'+obj.collectedAmount+'</td> <td>'+obj.userName+'</td> <td style="max-height: 20px;">'+obj.remark+'</td></tr>';
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
    }*/
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
});




// 费用收支点击加载更多
/*$("#loadMoreSz").on("click",function(){
    szHtml='';
    var index=layer.load(0, {shade: false});
    $("tbody#shouZhiList").html('');
    $.each(totalRes.data.feeManageList,function(i,obj){

            if(obj.isIncome=="1"){
                obj.isIncome="收";
            }
            if(obj.isIncome=="2"){
                obj.isIncome="支";
            }
            szHtml+='<tr><td>'+obj.createTime+'</td> <td>'+obj.feeCategoryName+'</td> <td>'+obj.feeName+'</td> <td>'+obj.isIncome+'</td> <td>'+obj.paymentAmount+'</td> <td>'+obj.collectedAmount+'</td> <td>'+obj.userName+'</td> <td>'+obj.remark+'</td></tr>';
            setTimeout(function(){
                layer.close(index); 
                $("tbody#shouZhiList").html(szHtml);
            },500);
            
       
    });
});*/



// 还款记录
var totalRes2;
var szHtml22='';
function RepaymentHistoryList(paramsId){
    comn.ajax({
        url:interUrl.RepaymentHistory.RepaymentHistoryList,
        data:{projectId:paramsId},
        success:function(res){
            console.log(res);
            console.log(res);
            totalRes2=res;
            szHtml='';
            $("tbody#shouZhiList22").html(szHtml22);
            $.each(res.data,function(i,obj){
                // if(i<=10){
                   
                    szHtml22+='<tr><td>'+obj.planNo+'</td> <td>'+obj.repayAmount+'</td> <td>'+obj.monthRepaymentAmount+'</td> <td>'+obj.currentBankRepaymentTime+'</td> <td>'+obj.overdueStatusName+'</td> <td>'+obj.overdueDays+'</td> <td>'+obj.overdueTotalAmount+'</td> </tr>';
                    $("tbody#shouZhiList22").html(szHtml22);
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

























var table_1, table_2, handle_1, handle_2, handle_3, tableEvent_1, tableEvent_2, insuranceStatus, insuranceStatus_1, contantObj;
var telInfo = [];
//获取链接携带 参数
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
function baoDans(projId){
data= {
    projectId: projId
}

    

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
            if (item.spouseName) {
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

var tableDataNew = function(params, data, url, callback) {
  var p;
  p = params.data;
  if (url) {
    return comn.ajax({
      url: url,
      data: $.extend(data, p),
      success: function(res) {
        params.success({
          'total': res.data.dataCount,
          'rows': res.data.datas
        });
        params.complete();
        return typeof callback === "function" ? callback(res) : void 0;
      }
    });
  }
};

//保单信息

     table_1 = function(params) {
        if(jqQasicInformationUrl.LIU){

        tableData(params, {businessId:jqQasicInformationUrl.businessId,flag:1}, interUrl.SettlementRegistration.baoDan);
        }
    };   



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
                href:'./Modal/insuranceManage/renewInsurance/insuranceEntry.html?type=see&id=' + item.id + "&projectId=" + item.projectId+"&flag=1",
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
                href:'./Modal/insuranceManage/renewInsurance/insuranceEntry.html?type=see&id=' + item.id + "&projectId=" + item.projectId+"&flag=1",
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

    table_2 = function(params) {
        if(jqQasicInformationUrl.LIU){

        tableData(params, {businessId:jqQasicInformationUrl.businessId,flag:1}, interUrl.SettlementRegistration.listPhone);
        }
    };    

//联系人枚举
    contantObj = function(value, row, index) {
        return [null, "本人", "配偶"][value] || null;
    };
tableEvent_2 = {
    "click .modify": function(e, a, item, index) {
        console.log(item)
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
});  

if(jqQasicInformationUrl.xiangqing){
            $("#jqQasicInformation input,#jqQasicInformation textarea,#yijian input").attr("readonly",true); 
            $(".liuChengYiJian,#cancelJq-ce,#save-submit,#save-baseInfo").hide();
        }