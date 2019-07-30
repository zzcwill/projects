var dataLoad_print, handle_print, tableEvent_print;
var postDatas= comn.getArgs();
var transformJson = ["newCarEstimatedPrice1", "loanAmountAndGuaranteeServiceFee1", "loanAmount1", "guaranteeServiceFee1", "charLoanTerm1", "carPrice1", "handlingFee1", "totalPrice1", "downPaymentAmount1", "repaymentAmount1"];

function convert(data, key){
    for(k in data){
        if(data[k] && data[k].toString().toLowerCase() === key){ return "√"; }
    }
    return "";
}
$(document).on("click", "#printBtn", function () {
    comn.ajax({
        url: interUrl.printContract.isAppScan,
        data: {
            projectId: args["projectId"]
        },
        success: function (res) {
            $("#printTable").modal("show");
        }
    })
});
if(args['currentNodeKey'] == "COPY_CONTRACT") {
    $("#printBtn").show();
    dataLoad_print = function(params) {
        tableData(params, {projectId: postDatas.projectId}, interUrl.printContract.getList);
    };
    handle_print = function(value, row, index) {
        // return ["<div class='btn-group btn-group-xs'>",
        //     "<button type='button' class='btn btn-primary printBtn'>打印预览",
        //     "</button>","</div>"].join("");
            return ["<div class='btn-group btn-group-xs'>",
        	"<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
        		"<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>",
        	"</button>",
        	"<ul class='dropdown-menu' role='menu'>",
        		"<li><a class='printBtn'>打印预览</a></li>",
        		"<li><a class='printSetUp'>打印维护</a>",
                "</li>",
        	"</ul>",
        "</div>"].join("");
    };
    $("#changePort").click(function(){
        if($('#port').val()){
            document.cookie = 'printPort=' + $('#port').val();
            location.reload();
        }
    });
    tableEvent_print = {
        //打印预览操作
        "click .printBtn": function(e, a, item, index) {
            return comn.ajax({
                url: interUrl.printContract.getModalCode,
                data: {
                    projectId: postDatas.projectId,
                    templateId: item.id
                },
                success: function (res) {
                    var template = res.data.loanTemplateContentList;
                    var dataSource = res.data.loanTemplateMetaData;
                    (function(){
                        LODOP=getLodop();
                        LODOP.PRINT_INIT("");
                        //LODOP.SET_PRINT_PAGESIZE(1,0,0,"A4");
                        // LODOP.SET_SHOW_MODE("BKIMG_PRINT", true);
                        for(var i = 0; i < template.length; i += 1) {
                            var temporary = template[i].templateContent;
                            temporary = temporary.replace(/{([\w ]+)}/g, function($1, $2){
                                console.log("value--->" + dataSource[$2]);
                                var _dataSource;
                                if (typeof dataSource[$2] === 'string') {
                                    _dataSource = dataSource[$2].indexOf('"') !== -1 ? dataSource[$2].replace(/\"/g,"'") : dataSource[$2]; //将不必要的双引号替换成单引号
                                } else {
                                    _dataSource = dataSource[$2];
                                }
                                return convert(dataSource, $2) || _dataSource || "";
                            })
                            /*for(var j in dataSource) {
                                var reg = new RegExp('{' + j + '}', "g");
                                if(dataSource[j] == null){
                                    temporary = temporary.replace(reg, "");
                                } else {
                                    //todo 做一次替换
                                    //temporary = temporary.replace(reg, dataSource[j]);
                                    temporary = temporary.replace(reg, function($1, $2){
                                        console.log($2);
                                        return dataSource[$2];
                                    });
                                }
                            }*/
                            temporary = temporary.replace(/LODOP\.PRINT_INIT\(""\);?/, "");
                            temporary = temporary.replace(/LODOP\.PRINT_INIT\(.+""\);?/, "");
                            temporary = temporary.replace(/LODOP\.PRINT_INITA\(""\);?/, "");
                            temporary = temporary.replace(/LODOP\.PRINT_INITA\(.+""\);?/, "");
                            temporary = temporary.replace(/LODOP\.SET_PRINT_PAGESIZE\(.+"A4"\);?/, "");
                            console.log(temporary);
                            CreateOnePage(temporary);
                        };
                        LODOP.PREVIEW();
                    })();
                }
            });
        },
        //打印维护操作
        "click .printSetUp": function(e, a, item, index) {
            return comn.ajax({
                url: interUrl.printContract.getModalCode,
                data: {
                    projectId: postDatas.projectId,
                    templateId: item.id
                },
                success: function (res) {
                    $("#printTableDetail").modal("show");
                    $("#printTableDetail .modal-title").html("打印维护 -- "+ item.templateName);
                    $("#user-form").values(item);
                    loadTemplate(res.data.loanTemplateContentList, res.data.loanTemplateMetaData);
                    
                }
            });
        }
        
    }
}
//打印相关函数

function myPrintDesign(img, contents){
    CreatePage(img, contents);
    //LODOP.PRINT_SETUP();
};

function CreatePage(objImg, newStr) {
    LODOP = getLodop();
    LODOP.PRINT_INIT("");
    LODOP.SET_PRINT_PAGESIZE (1, 0, 0,"A4");
    LODOP.ADD_PRINT_SETUP_BKIMG(objImg);
    eval(newStr);
};
function getProgram(object, callback) {
    LODOP.SET_PRINT_MODE("PRINT_SETUP_PROGRAM",true);
    LODOP.SET_SHOW_MODE("HIDE_ABUTTIN_SETUP",true);
    if (LODOP.CVERSION) LODOP.On_Return=function(TaskID,Value){object.value=Value;};
    LODOP.PRINT_SETUP();
    return typeof callback === "function" ? callback() : void 0;
};

//添加新打印页
function CreateOnePage(str){
    LODOP.NewPage();
    eval(str);
};
//金额转换函数
var transformMoney = function (num) {
    var strOutput = "";
    var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
    num += "00";
    var intPos = num.indexOf('.');
    if (intPos >= 0)
        num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
    strUnit = strUnit.substr(strUnit.length - num.length);
    for (var i=0; i < num.length; i++)
        strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i,1),1) + strUnit.substr(i,1);
    return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");
};
//期数转换函数
var transformLoanTerm = function (num) {
    if (num === "12") {
        return "十二";
    } else if (num === "24") {
        return "二十四";
    } else if (num === "36") {
        return "三十六";
    }
}
//数字转换函数
var transformNum = function (obj, value) {
    if(obj == "loanTerm") {
        return transformLoanTerm(value);
    } else {
        for (var i = 0; i < transformJson.length; i += 1) {
            if(obj === transformJson[i]) {
                return transformMoney(value);
            }
        }
    }
}
function codeToText(template, dataSource) {
    var temporary = template.templateContent;
    temporary = temporary.replace(/{([\w ]+)}/g, function ($1, $2) {
        console.log("value--->" + dataSource[$2]);
        var _dataSource;
        if (typeof dataSource[$2] === 'string') {
            _dataSource = dataSource[$2].indexOf('"') !== -1 ? dataSource[$2].replace(/\"/g, "'") : dataSource[$2]; //将不必要的双引号替换成单引号
        } else {
            _dataSource = dataSource[$2];
        }
        return convert(dataSource, $2) || _dataSource || "";
    })
    temporary = temporary.replace(/LODOP\.PRINT_INIT\(""\);?/, "");
    temporary = temporary.replace(/LODOP\.PRINT_INIT\(.+""\);?/, "");
    temporary = temporary.replace(/LODOP\.PRINT_INITA\(""\);?/, "");
    temporary = temporary.replace(/LODOP\.PRINT_INITA\(.+""\);?/, "");
    temporary = temporary.replace(/LODOP\.SET_PRINT_PAGESIZE\(.+"A4"\);?/, "");
    console.log(temporary);
    return temporary;
}
function loadTemplate (dataArry, dataSource) {
    var tableHtml = '';
    for(var i = 0; i < dataArry.length; i += 1) {
        tableHtml += "<tr>" +
                "<td class='pageIndex'><span class='pageValue'> " + dataArry[i].pageId + "</span><input type='hidden' name='loanTemplateContentList[" + i +"].pageId' class='pageInputIndex' value='" + dataArry[i].pageId + "'/>" +
                "</td>" +
                "<td>" +
                "<button  type='button' class='btn btn-primary btn-sm printMaintenance'><span>打印维护</span></button>" +
                "<input type='hidden' name='loanTemplateContentList[" + i +"].templateContent' class='printCode' value='" + dataArry[i].templateContent + "'/>" +
                "</td>" +

        "</tr>";
    };
    $("#table_printTemplate tbody").html(tableHtml);
};

$("#table_printTemplate").on("click", ".printMaintenance", function(){
    var el = $(this).next(".printCode")[0];
    console.log(el)
    if (!$(el).val()) {
        var bgImg = "<img>";
        var contents = $(el).val();
        if (contents != "") {
            contents = contents.replace(/LODOP\.ADD_PRINT_SETUP_BKIMG\(".+"\);?/, "");
            console.log(contents);
        }
        myPrintDesign(bgImg, contents);
        getProgram(el);
    } else {
        var bgImg = "<img>";
        var contents = $(el).val();
        if (contents != "") {
            contents = contents.replace(/LODOP\.ADD_PRINT_SETUP_BKIMG\(".+"\);?/, "");
            console.log(contents);
        }
        myPrintDesign(bgImg, contents);
        getProgram(el);
    }
});
$("#btn-template-save").click(function () {
    comn.ajax({
        url: interUrl.printContract.saveTemplate,
        data:  $("#user-form").values(),
        success: function (res) {
            $("#printTableDetail").modal("hide");
            $("#table_print").bootstrapTable('refresh');
        }
    })
});