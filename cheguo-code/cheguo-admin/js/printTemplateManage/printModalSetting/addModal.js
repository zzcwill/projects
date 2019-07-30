var handle_1, handle_2, tableEvent_1, dataLoad_1, dataLoad_2, dataLoad_3, pageIndex = 0;
var postData = comn.getArgs();
var type = postData.type;
var loanTemplateOrgList = [];
var loanTemplateBankList = [];
if(type === "add") {
    pageIndex = 1;
    dataLoad_2 = function(params) {
        tableDataNew(params, {},  interUrl.common.orgsList);
    };
    dataLoad_1 = function(params) {
        tableDataNew(params, {},  interUrl.common.bankList);
    };
} else {
    var id = postData.id;
    dataLoad_2 = function(params) {
        tableDataNew(params, {},  interUrl.common.orgsList);
    };
    dataLoad_1 = function(params) {
        tableDataNew(params, {},  interUrl.common.bankList, function(){
            _reload();
        });
    }
}
//设置机构数选择
    $("#sure").click(function(){
        loanTemplateOrgList = [];
        var contents = [], html = "";
        $.map($("#table_2").bootstrapTable('getSelections'), function (row) {
            loanTemplateOrgList.push(row.id);
            contents.push(row.name);
        });
         for(var j = 0; j < contents.length; j += 1){
            html += contents[j] + "  ";
        }
        $("#orgsList").val(html);
        $("#suitOrgs").modal("hide");
    });
//设置银行数选择
    $("#sureBtn").click(function(){
        loanTemplateBankList = []; 
        var contents = [], html = "";
        $.map($("#table_1").bootstrapTable('getSelections'), function (row) {
            loanTemplateBankList.push(row.id);
            contents.push(row.bankName);
        });
        for(var j = 0; j < contents.length; j += 1){
            html += contents[j] + "  ";
        }
        $("#bankList").val(html);
        $("#suitBank").modal("hide");
    });
//设置生成页数   
    $("#addBtn").click(function(){
        var index = pageIndex - 1;
        var tableHtml = "<tr>" +
	                        "<td class='pageIndex'><span class='pageValue'> " + pageIndex + "</span><input type='hidden' name='loanTemplateContentList[" + index +"].pageId' class='pageInputIndex' value='" + pageIndex + "'/>" +
	                        "</td>" +
	                        "<td>" +
                                "<div class='col-md-2 col-sm-2 col-lg-2 col-xs-2'>" +
                                    "<button type='button' class='btn btn-primary btn-sm upImage'><span>选择打印背景</span></button>" +
                                    "<input type='file' name='files[]' accept='image/*' class='hide upImageInput' multiple>" +
                                    "<li class='resImgUrl hidden'><img /></li>" +
                                "</div>" +
                                "<ul class='col-md-2 col-sm-2 col-lg-2 col-xs-2 list-inline files-ul'>" +
                                    "<li class='resImgUrl hidden'><img /></li>" +
                                "</ul>" +
                            "</td>" +
	                        "<td>" + 
                                "<button  type='button' class='btn btn-primary btn-sm printSet'> <span>打印设计</span></button>" +  
                                "<input type='hidden' name='loanTemplateContentList[" + index +"].templateContent' class='printCode'/>" +
                                "<input type='hidden' name='loanTemplateContentList[" + index +"].filePath' class='templateFilePath'/>" +
                            "</td>" +
                            "<td class='status'>" + "未生成" + "</td>" +
	                        "<td class='option'>" +
                                "<div class='btn-group btn-group-xs'>" +
                                    "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作" +
                                    "<span class='caret'></span>" + "<span class='sr-only'>下拉切换</span>" +
                                    "</button>" + "<ul class='dropdown-menu' role='menu'>" +
                                    "<li><a class='upMove'>上移</a></li>" +
                                    "<li><a class='downMove'>下移</a></li>" +
                                    "<li><a class='del'>删除</a></li>" +
                                    "</ul>" +
                                "</div>"
                            "</td>" +
	                    "</tr>";
        $("#table1 tbody").append(tableHtml);
        pageIndex += 1;
    });
//打印设计点击事件
    $("#table1").on("click", ".printSet", function(){
        var bgImg = $(this).parents("tr").find(".resImgUrl").html();
        var contents = $(this).next(".printCode").val();
        if (contents != "") {
            contents = contents.replace(/LODOP\.ADD_PRINT_SETUP_BKIMG\(".+"\);?/, "");
            console.log(contents);
        }
        myPrintDesign(bgImg, contents);
        var recordInput = $(this).next(".printCode")[0];
        var record = $(this).next(".printCode");
        getProgram(recordInput);
        if(record.val() != "") {
            $(this).parents("tr").find(".status").text("已生成");
        } else {
            $(this).parents("tr").find(".status").text("未生成");
        }
    });
//监测代码input是否有值
    $("#table1").on("change", ".printCode", function(){
        if($(this).val() != "") {
            $(this).parents("tr").find(".status").text("已生成");
        } else {
            $(this).parents("tr").find(".status").text("未生成");
        }
    });
//上移下移删除功能
    $("#table1").on("click", ".upMove" ,function(){
       var _index = $(this).parents("tr").index();
       if(_index !== 0) {
            var present = $(this).parents("tr");
            var prevTr = $(this).parents("tr").prev("tr");
            present.remove();
            prevTr.before(present);   
            reSortTable();
       }
    });
    $("#table1").on("click", ".downMove" ,function(){
        var _index = $(this).parents("tr").index();
        var len = $("#table1 tbody tr").length;
       if(_index < len - 1) {
            var present = $(this).parents("tr");
            var nextTr = $(this).parents("tr").next("tr");
            present.remove();
            nextTr.after(present);    
            reSortTable();
       }
    });
    $("#table1").on("click", ".del" ,function(){
        $(this).parents("tr").remove();
        reSortTable();
        pageIndex -= 1;
    });
//表单提交
    $("#btn-search").click(function(){
        var bankList = loanTemplateBankList.toString();
        var orgList = loanTemplateOrgList.toString();
        if($("#user-form").valid()) {
            comn.ajax({
                url:  interUrl.loanModal.saveModalinfo,
                data: $.extend($("#user-form").values(), {bankIds: bankList, orgIds: orgList}),
                success: function (res) {
                    tip({
                        content: "保存成功"
                      });
                    // comn.closeTab();
                }
            });
        }
    });
//图片部分
base64 = function (file, index, callback) {
    return lrz(file).then(function (rst) {
        var imgRst;
        imgRst = rst.base64;
        return typeof callback === "function" ? callback(file, imgRst, index) : void 0;
    });
};
//图片上传
$("#table1").on("click", ".upImage", function(){
    $(this).parent("div").find(".upImageInput").trigger("click");
});

$("#table1").on("change", ".upImageInput", function () {
        var _this = $(this);
        var lengthValue = _this.parents("tr").index();
        var fileArr, html, i, j, results;
        fileArr = this.files;
        results = [];
        for (k = j = 0, len = fileArr.length; j < len; k = ++ j) {
            i = fileArr[j];
            results.push(base64(i, j, function (f, o, index) {
                html = ["<li>", "<img src='" + o + "' class='filePath' style='width: 40px; height:30px; margin-right:10px;'/>", "<input name='loanTemplateContentList[" + lengthValue + "].fileName' data-name='fileName' class='hide fileName' value='" + f.name + "' />", "</li>"].join("");
                _this.parent("div").next(".files-ul").html(html);
               var data = {};
               data.fileName = _this.parent("div").next(".files-ul").find(".fileName").val();
               data.filePath = _this.parent("div").next(".files-ul").find(".filePath").attr("src");
                uploadImg(data, function(res) {
                    _this.next(".resImgUrl").find("img").attr("src", res.data);
                    _this.parents("tr").find(".templateFilePath").val(res.data);
                });
        }));
        return results;
    }
});
//删除图片  delDocument
$(".files-ul").on("click", ".upCancle", function () {
    var _this,_type, ul,fileId;
    _this = $(this);
    _type=_this.parents("ul").attr("data-type");
    ul = _this.parents("ul");
    fileId=_this.parent("li").attr("data-id");
    comn.ajax({
        url: interUrl.gr.delDocument,
        data:{
            fileNamespace:"CAR_DEALER",
            documentIds:fileId,
            dirId:_type,
            releventFlow:"CAR_DEALER_ADD_FLOW",
            releventFlowNode:"CAR_DEALER_LAUNCH"
        },
        success:function(res){
            _this.parents("li").remove();
            _this.parents("ul").prev("div").find(".upImageInput").val("");
            ul.find("li").each(function (index) {
                $(this).find("[data-name='filePath']").attr("name", "LoanDocuments[" + index + "].filePath");
                $(this).find("[data-name='fileName']").attr("name", "LoanDocuments[" + index + "].fileName");
            });
        }
    });

});
//取消按钮
    // $("#cancel").click(function() {
    //     comn.closeTab();
    // })

//获取图片
function getDocumentList(id, _type) {
    var result = "";
    comn.ajax({
        url: interUrl.gr.documentList,
        data: {
            fileNamespace: "CAR_DEALER",
            loanApplyId: id,
            dirId: _type,
            releventFlow:"CAR_DEALER_ADD_FLOW",
            releventFlowNode:"CAR_DEALER_LAUNCH"
        },
        success: function (res) {
            var del=(type!="2")?"<a href='javascript:;' class='upCancle'>删除</a>":"";
            var i, list = res.data;
            for (i = 0; i < list.length; i++) {
                var o = list[i];
                result += "<li class='loaded' data-id='"+ o.id+"'><input name='LoanDocuments[" + i + "].filePath' data-name='filePath' class='hide' value='" + o.filePath + "' /><input name='LoanDocuments[" + i + "].fileName' data-name='fileName' class='hide' value='" + o.fileName + "' /><a href='javascript:;' class='showImg' data-path='"+ o.filePath+"'>" + o.fileName + "</a>&nbsp;"+del+"</li>";
            }
            $("#fileType_" + _type).html(result);
        }
    });
}

//上传图片
function uploadImg(data, callback) {
    comn.ajax({
        url:  interUrl.loanModal.loadModalBg,
        data: $.extend(data, {
            fileNamespace: "LOAN_TEMPLATE",
        }),
        success: function (res) {
            return typeof callback === "function" ? callback(res) : void 0; 
        }
    });
}

//查看图片
$(document).on("click",".showImg",function(){
    var _this=$(this),imgArr=[];
    var imgA=_this.parents("ul").find(".showImg");
    var _index=imgA.index(_this);
    imgA.each(function(index){
        imgArr.push(($(this).attr("data-path")));
    });
    window.parent.switchImage(imgArr,_index);
});
//遍历数组
function reSortTable() {
    $("#table1 tbody").find("tr").each(function (index) {
        $(this).find(".pageValue").text(index + 1);
        $(this).find(".pageInputIndex").val(index + 1);
        $(this).find(".pageInputIndex").attr("name", "loanTemplateContentList[" + index + "].pageId");
        $(this).find(".templateFilePath").attr("name", "loanTemplateContentList[" + index + "].filePath");
        $(this).find(".printCode").attr("name", "loanTemplateContentList[" + index + "].templateContent");
    });
}
//打印相关函数
    function myPrintSetup() {       
        CreatePage();
        LODOP.PRINT_SETUP();        
    };          
    function myPrintDesign(img, contents){
        CreatePage(img, contents);       
        LODOP.PRINT_DESIGN();
    };  
    function myPreview(){
        CreatePage();       
        LODOP.PREVIEW();        
    };  
    function CreatePage(objImg, newStr) {
        LODOP = getLodop();  
        LODOP.SET_PRINT_PAGESIZE (1, 0, 0,"A4");
        LODOP.ADD_PRINT_SETUP_BKIMG(objImg);
        eval(newStr);
    };
    function getProgram(object, callback) {
        if (LODOP.CVERSION) LODOP.On_Return=function(TaskID,Value){object.value=Value;};  
        return typeof callback === "function" ? callback() : void 0;
    };
var tableDataNew = function(params, data, url, callback) {
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
function _reload () {
    comn.ajax({
        url:  interUrl.loanModal.getModalInfo,
        data: {
            templateId: id
        },
        success: function (res) {
            $("#user-form").values(res.data);
            //银行列表拉取
            var html1 = "";
            for (var i in res.data.loanTemplateBankList) {
                html1 += res.data.loanTemplateBankList[i].bankName + "  ";
                loanTemplateBankList.push(res.data.loanTemplateBankList[i].bankId);
                $("#table_1").bootstrapTable('checkBy', {field:'id', values: loanTemplateBankList});
            };
            $("#bankList").val(html1);
            //机构列表拉取
            var html2 = "";
            for (var i in res.data.loanTemplateOrgList) {
                html2 += res.data.loanTemplateOrgList[i].orgName + "  ";
                loanTemplateOrgList.push(res.data.loanTemplateOrgList[i].orgId);
                $("#table_2").bootstrapTable('checkBy', {field:'id', values: loanTemplateOrgList});
            };
            console.log(loanTemplateOrgList);
            $("#orgsList").val(html2);
            //下方table渲染
            var dataArry = res.data.loanTemplateContentList;
            var tableHtml = "";
            for(var i = 0; i < dataArry.length; i += 1) {
                    var status = (function(){
                        if(dataArry[i].status == 1) {
                            return "已生成";
                        } else if( dataArry[i].status == 2) {
                            return "未生成";
                        }
                    })();
                    tableHtml += "<tr>" +
                                    "<td class='pageIndex'><span class='pageValue'> " + dataArry[i].pageId + "</span><input type='hidden' name='loanTemplateContentList[" + i +"].pageId' class='pageInputIndex' value='" + dataArry[i].pageId + "'/>" +
                                    "</td>" +
                                    "<td>" +
                                        "<div class='col-md-2 col-sm-2 col-lg-2 col-xs-2'>" +
                                            "<button type='button' class='btn btn-primary btn-sm upImage'><span>选择打印背景</span></button>" +
                                            "<input type='file' name='files[]' accept='image/*' class='hide upImageInput' multiple>" +
                                            "<li class='resImgUrl hidden'><img /></li>" +
                                        "</div>" +
                                        "<ul class='col-md-2 col-sm-2 col-lg-2 col-xs-2 list-inline files-ul'>" +
                                            "<li>" + "<img src='" + dataArry[i].filePath + "' class='filePath' style='width: 40px; height:30px; margin-right:10px;'/>" + 
                                            "</li>" +
                                        "</ul>" +
                                    "</td>" +
                                    "<td>" + 
                                        "<button  type='button' class='btn btn-primary btn-sm printSet'> <span>打印设计</span></button>" +  
                                        "<input type='hidden' name='loanTemplateContentList[" + i +"].templateContent' class='printCode' value='" + dataArry[i].templateContent + "'/>" +
                                        "<input type='hidden' name='loanTemplateContentList[" + i +"].filePath' class='templateFilePath' value='" + dataArry[i].filePath + "'/>" +
                                    "</td>" +
                                    "<td class='status'>" + status + "</td>" +
                                    "<td class='option'>" +
                                        "<div class='btn-group btn-group-xs'>" +
                                            "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作" +
                                            "<span class='caret'></span>" + "<span class='sr-only'>下拉切换</span>" +
                                            "</button>" + "<ul class='dropdown-menu' role='menu'>" +
                                            "<li><a class='upMove'>上移</a></li>" +
                                            "<li><a class='downMove'>下移</a></li>" +
                                            "<li><a class='del'>删除</a></li>" +
                                            "</ul>" +
                                        "</div>"
                                    "</td>" +
                                "</tr>";
                pageIndex = dataArry[i].pageId + 1;
            };
            $("#table1 tbody").html(tableHtml);
        }
    });
}