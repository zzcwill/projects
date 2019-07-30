var dataLoad_1, dataLoad_2, handle_1, handle_2, tableEvent;

dataLoad_1 = function(params) {
  return tableData(params, $.extend($("#searchForm").values(), {
    deliverStatus: 1
  }), interUrl.mockList || interUrl.documentManagement.deliverList);
};

dataLoad_2 = function(params) {
  return tableData(params, $.extend($("#searchForm").values(), {
    deliverStatus: 2
  }), interUrl.documentManagement.deliverList);
};

handle_1 = function(value, row, index) {
  return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'> 操作 <span class='caret'></span></button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='startDocumentDelivery'>发起文档传递</a></li>", "<li><a class='loaninfo'>查看贷款详情</a></li>", "</ul>", "</div>"].join("");
};

handle_2 = function(value, row, index) {
    //以下5行是取消归档
    // var canCancleStr = '';
    // if (row.canCancel) {
    //     canCancleStr = "<div class='btn btn-primary btn-xs cancleDeliveryInfo' style='margin-left: 10px'>取消归档</div>"
    // }
  //return ["<div class='btn btn-primary btn-xs documentDeliveryInfo'>查看传递详情</div>"+canCancleStr].join("");
  return ["<div class='btn btn-primary btn-xs documentDeliveryInfo'>查看传递详情</div>"].join("");
};

tableEvent = {
  "click .startDocumentDelivery": function(e, a, item, index) {
    comn.cache['itemJson'] = item;
    return window.parent.toUrl({
      url: "./Modal/documentManagement/documentDelivery/documentDelivery.html"
    });
  },
  "click .documentDeliveryInfo": function(e, a, item, index) {
    var basicUrl = "./Modal/documentManagement/documentDelivery/documentDelivery.html";
    var documentFlowType;
    if(item.currentNodeKey && item.currentNodeKey != "TRANSMIT_LAUNCH"){
    	if(item.currentNodeKey == "DOCUMENT_VERIFY"){
    		documentFlowType = 1;
    	}else if(item.currentNodeKey == "COPY_CONTRACT"){
				documentFlowType = 2;
    	}else if(item.currentNodeKey == "DOCUMENT_REVIEW"){
				documentFlowType = 3;
    	}else if(item.currentNodeKey == "DOCUMENT_CLASSIFY"){
				documentFlowType = 4;
    	}
    	basicUrl = "./Modal/documentManagement/documentDelivery/documentDeliveryInfo.html";
    }
    basicUrl = basicUrl + "?documentDeliveryType=2&businessId=" + item.id + "&id=" + item.loanApplyId + "&loanApplyId=" + item.loanApplyId + "&projectId=" + item.projectId + "&businessTypeCode=DOCUMENT_TRANSMIT_FLOW&documentFlowType=" + documentFlowType + "&space=LOAN&releventFlowNode=DOCUMENT_CLASSIFY&releventFlow=DOCUMENT_TRANSMIT_FLOW";
    return window.parent.toUrl({
      url: basicUrl
    });
  },
    /*"click .cancleDeliveryInfo": function (e, a, item, index) {
        comn.ajax({
            url : interUrl.documentManagement.cancelDeliver,
            data : {
                id : item.id
            },
            success : function (res) {
                tip({ content : "取消归档成功"});
                $("#already table").bootstrapTable("refresh", {url : "..."});
            }
        })
    },//取消归档*/
  "click .loaninfo": function(e, a, item, index){
  	  	return comn.addTab({
  		title : '贷款详情',
  		href : "./Modal/customManage/customer/loanDetail.html?businessTypeCode=LOAN_APPLY_FLOW&projectId="+item.projectId + "&loanApplyId=" + item.loanApplyId + "&id=" + item.projectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY" + "&loanFlag=1"
  	});
  }
};
$(function() {
  return $("#btn-search").click(function() {
    var activeTab;
    activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
    return $("#" + activeTab).find("table").bootstrapTable("refresh", {url: "..."});
  });
});
