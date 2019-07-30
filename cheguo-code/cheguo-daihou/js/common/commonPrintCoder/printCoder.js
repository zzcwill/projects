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
if(args['currentNodeCode'] == "LAUNCH_LOAN_CLEAR") { //针对结清第一步
  $("#printBtn").show();
  dataLoad_print = function(params) {
    tableData(params, {projectId: postDatas.projectId}, interUrl.printContract.getList);
  };
  handle_print = function(value, row, index) {
    return ["<div class='btn-group btn-group-xs'>",
      "<button type='button' class='btn btn-primary printBtn'>打印预览",
      "</button>","</div>"].join("");
    //     return ["<div class='btn-group btn-group-xs'>",
    // 	"<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
    // 		"<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>",
    // 	"</button>",
    // 	"<ul class='dropdown-menu' role='menu'>",
    // 		"<li><a class='printBtn'>打印预览</a></li>",
    // 		"<li><a class='printSetUp'>打印维护</a></li>",
    // 	"</ul>",
    // "</div>"].join("");
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
    }
    //打印维护操作
    // "click .printSetUp": function(e, a, item, index) {
    //     return comn.ajax({
    //     	url: interUrl.printContract.getModalCode,
    //     	data: {
    //     		projectId: postDatas.projectId,
    //     		templateId: item.id
    //     	},
    //     	success: function (res) {
    //     		var template = res.data.loanTemplateContentList;
    //     		var dataSource = res.data.loanTemplateMetaData;
    //     		(function(){
    //     			LODOP=getLodop();
    // 	LODOP.PRINT_INIT("");
    // 	LODOP.SET_PRINT_PAGESIZE(1,0,0,"A4");
    // 	// LODOP.SET_SHOW_MODE("BKIMG_PRINT", true);
    //     			for(var i = 0; i < template.length; i += 1) {
    //      			var temporary = template[i].templateContent;
    //      			for(var j in dataSource) {
    //      				var reg = new RegExp('{' + j + '}', "g");
    //      				if(dataSource[j] == null){
    //      					temporary = temporary.replace(reg, "");
    //      				} else {
    //      					//todo 做一次替换
    //      					temporary = temporary.replace(reg, transformNum(j, dataSource[j]) || dataSource[j]);
    //      				}
    //      			}
    //      			temporary = temporary.replace(/LODOP\.PRINT_INIT\(.+""\);?/, "");
    //      			temporary = temporary.replace(/LODOP\.PRINT_INITA\(.+""\);?/, "");
    //      			temporary = temporary.replace(/LODOP\.SET_PRINT_PAGESIZE\(.+"A4"\);?/, "");
    //      			console.log(temporary);
    //      			CreateOnePage(temporary);
    //      		};
    // 	LODOP.PRINT_SETUP();
    //     		})();
    //     	}
    //     });
    // }
  }
}

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
