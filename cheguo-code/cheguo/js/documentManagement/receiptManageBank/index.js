var dataLoad_1, dataLoad_2, dataLoad_3, dataLoad_4, handle_1, handle_2, tableEvent,billId ,handleFn;

dataLoad_1 = function(params) {
  return tableData(params, $.extend($("#searchForm").values(), {
    recipientStatus: 1
  }), interUrl.mockList || interUrl.documentManagement.recipientBankList);
};
dataLoad_2 = function(params) {
  tableData(params, $.extend($("#searchForm").values(),{billId:billId}), 
  interUrl.mockList || interUrl.documentManagement.expressList);
};

dataLoad_3 = function(params) {
  return tableData(params, $.extend($("#searchForm").values(), {
    recipientStatus: 3
  }), interUrl.mockList || interUrl.documentManagement.recipientBankList);
};

handle_1 = function(value, row, index) {
  return "<div class='btn btn-xs btn-primary receipt'>收件</div>";
};

handle_2 = function(value, row, index) {
	var hideValue = $("#hideValue").text();
	if(hideValue == '1'){
  	return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>",  "<li><a class='unReceipt'>未收到</a></li>", "<li><a class='missing'>资料缺失</a></li>", "</ul>", "</div>"].join("");
	}
};
handle_3 = function(value, row, index) {
  return "<div class='btn btn-xs btn-primary cancelReceipt'>取消收件</div>";
};

tableEvent = {
  "click .receipt": function(e, a, item, index) {
    $("#dialog").modal("show");
	  $(".addWords").hide();
    handleFn = function(){
    	$("#dialog").modal("hide");
    	return comn.ajax({
    		url: interUrl.documentManagement.recipient,
    		data: {
          billId: item['id']
        },
        success: function(res) {
        	tip({
            content: "收件成功!!"
          });
          return window.parent.toUrl({
						url: "./Modal/documentManagement/receiptManageBank/index.html"
					});
        }
    	});
    };
    /*return $("#ok").click(function() {
      return comn.ajax({
        url: interUrl.documentManagement.receipt,
        data: {
          billId: item['id']
        },
        success: function(res) {
          tip({
            content: "收件成功!!"
          });
          $("#dialog").modal("hide");
          return $("#btn-search").trigger("click");
        }
      });
    });*/
  },
  "click .unReceipt": function(e, a, item, index) {
    $("#addDesc").modal("show");
	  $(".addWords").hide();
    handleFn = function(){
    	if ($("#addDescFrom").valid()) {
        var data;
        data = $("#addDescFrom").values();
        $("#addDesc").modal("hide");
        return comn.ajax({
          url: interUrl.documentManagement.recipientTemp,
          data: $.extend(data, {
        	  billId: billId,
        	  documentDeliverId: item['id'],
              recipientStatus : 1
            }),
          success: function(res) {
            tip({
              content: "添加成功!!"
            });
            return $("#btn-search").trigger("click");
          }
        });
      };
    };
  },
  "click .missing": function(e, a, item, index) {
	  $("#orgName3").getWords('InformationIsMissUsefulExpressions')
    $("#addDesc").modal("show");
    $(".addWords").show();
    handleFn = function(){
    	if ($("#addDescFrom").valid()) {
        var data;
        data = $("#addDescFrom").values();
        $("#addDesc").modal("hide");
        return comn.ajax({
          url: interUrl.documentManagement.recipientTemp,
          data: $.extend(data, {
        	  billId: billId,
        	  documentDeliverId: item['id'],
              recipientStatus : 2
            }),
          success: function(res) {
            tip({
              content: "添加成功!!"
            });
            return $("#btn-search").trigger("click");
          }
        });
      };
    };
    console.log(111)
    $("#orgName3").unbind('change').change(function (e) {
	    console.log($('#inputRemark').getCurPos())
	    var arr = $('#inputRemark').val().split('')
	    arr.splice($('#inputRemark').getCurPos(),0,$("#orgName3 option:selected").text())
	    $('#inputRemark').val(arr.join(''))
    })
  },
  "click .cancelReceipt": function(e, a, item, index) {
    $("#dialogCancel").modal("show");
	  $(".addWords").hide();
    handleFn = function(){
    	$("#dialogCancel").modal("hide");
    	return comn.ajax({
    		url: interUrl.documentManagement.recipientCancel,
    		data: {
          billId: item['id']
        },
        success: function(res) {
        	tip({
            content: "操作成功!!"
          });
         return window.parent.toUrl({
						url: "./Modal/documentManagement/receiptManageBank/index.html"
					});
        }
    	});
    };
 /*   return $("#okCancel").click(function() {
      return comn.ajax({
        url: interUrl.documentManagement.recipientCancel,
        data: {
          id: item['id']
        },
        success: function(res) {
          tip({
            content: "操作成功!!"
          });
          $("#dialogCancel").modal("hide");
          return $("#btn-search").trigger("click");
        }
      });
    });*/
  },
};

$("#orgName").getOrg();
$(function() {
  $("#table1").on('click-row.bs.table', function (e, row) {
  			billId = row.id;
  			$("#divTable1").removeClass("hide");
  			$("#dataTable1").bootstrapTable("destroy").bootstrapTable(comn.table);
  });
  $("#table2").on('click-row.bs.table', function (e, row) {
  			billId = row.id;
  			$("#divTable1").removeClass("hide");
  			$("#dataTable1").bootstrapTable("destroy").bootstrapTable(comn.table);
  });
	$("#save,#ok,#okCancel").click(function() { 
      handleFn();
  });
  $("#tabSign").click(function(){
  	$("#hideValue").text("1");
  	$("#divTable1").addClass("hide");
  });
   $("#tabNoSign").click(function(){
  	$("#hideValue").text("2");
  	$("#divTable1").addClass("hide");
  });
  return $("#btn-search").click(function() {
    var activeTab;
    activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
    $("#divTable1").addClass("hide");
    return $("#" + activeTab).find("table").bootstrapTable("refresh", {url: "..."});
  });
});



(function($){
	$.fn.extend({
		// 鑾峰彇褰撳墠鍏夋爣浣嶇疆鐨勬柟娉�
		getCurPos:function() {
			var curCurPos = '';
			var all_range = '';
			if (navigator.userAgent.indexOf("MSIE") > -1) { //IE

				if( $(this).get(0).tagName == "TEXTAREA" ){
					// 鏍规嵁body鍒涘缓textRange
					all_range = document.body.createTextRange();
					// 璁﹖extRange鑼冨洿鍖呭惈鍏冪礌閲屾墍鏈夊唴瀹�
					all_range.moveToElementText($(this).get(0));
				} else {
					// 鏍规嵁褰撳墠杈撳叆鍏冪礌绫诲瀷鍒涘缓textRange
					all_range = $(this).get(0).createTextRange();
				}

				// 杈撳叆鍏冪礌鑾峰彇鐒︾偣
				$(this).focus();

				// 鑾峰彇褰撳墠鐨則extRange,濡傛灉褰撳墠鐨則extRange鏄竴涓叿浣撲綅缃€屼笉鏄寖鍥�,textRange鐨勮寖鍥翠粠start鍒癳nd.姝ゆ椂start绛変簬end
				var cur_range = document.selection.createRange();

				// 灏嗗綋鍓嶇殑textRange鐨別nd鍚戝墠绉�"閫変腑鐨勬枃鏈�.length"涓崟浣�.淇濊瘉start=end
				cur_range.moveEnd('character',-cur_range.text.length)

				// 灏嗗綋鍓峵extRange鐨剆tart绉诲姩鍒颁箣鍓嶅垱寤虹殑textRange鐨剆tart澶�, 姝ゆ椂褰撳墠textRange鑼冨洿鍙樹负鏁翠釜鍐呭鐨剆tart澶勫埌褰撳墠鑼冨洿end澶�
				cur_range.setEndPoint("StartToStart",all_range);

				// 姝ゆ椂褰撳墠textRange鐨凷tart鍒癊nd鐨勯暱搴�,灏辨槸鍏夋爣鐨勪綅缃�
				curCurPos = cur_range.text.length;
			} else {
				// 鏂囨湰妗嗚幏鍙栫劍鐐�
				$(this).focus();
				// 鑾峰彇褰撳墠鍏冪礌鍏夋爣浣嶇疆
				curCurPos = $(this).get(0).selectionStart;
			}
			// 杩斿洖鍏夋爣浣嶇疆
			return curCurPos;
		},
		// 璁剧疆褰撳墠鍏夋爣浣嶇疆鏂规硶
		setCurPos:function(start,end) {
			if(navigator.userAgent.indexOf("MSIE") > -1){
				var all_range = '';

				if( $(this).get(0).tagName == "TEXTAREA" ){
					// 鏍规嵁body鍒涘缓textRange
					all_range = document.body.createTextRange();
					// 璁﹖extRange鑼冨洿鍖呭惈鍏冪礌閲屾墍鏈夊唴瀹�
					all_range.moveToElementText($(this).get(0));
				} else {
					// 鏍规嵁褰撳墠杈撳叆鍏冪礌绫诲瀷鍒涘缓textRange
					all_range = $(this).get(0).createTextRange();
				}

				$(this).focus();

				// 灏唗extRange鐨剆tart璁剧疆涓烘兂瑕佺殑start
				all_range.moveStart('character',start);

				// 灏唗extRange鐨別nd璁剧疆涓烘兂瑕佺殑end. 姝ゆ椂鎴戜滑闇€瑕佺殑textRange闀垮害=end-start; 鎵€浠ョ敤鎬婚暱搴�-(end-start)灏辨槸鏂癳nd鎵€鍦ㄤ綅缃�
				all_range.moveEnd('character',-(all_range.text.length-(end-start)));

				// 閫変腑浠巗tart鍒癳nd闂寸殑鏂囨湰,鑻tart=end,鍒欏厜鏍囧畾浣嶅埌start澶�
				all_range.select();
			}else{
				// 鏂囨湰妗嗚幏鍙栫劍鐐�
				$(this).focus();

				// 閫変腑浠巗tart鍒癳nd闂寸殑鏂囨湰,鑻tart=end,鍒欏厜鏍囧畾浣嶅埌start澶�
				$(this).get(0).setSelectionRange(start,end);
			}
		},
	});
})(jQuery);