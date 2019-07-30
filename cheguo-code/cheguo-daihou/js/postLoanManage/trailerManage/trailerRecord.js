var args = comn.getArgs(), pageDatas, trailerStatus;
trailerStatus = function (value) {
	return [null, "待拖车", "已入库", "已撤销", "已撤销", "出库中", "出库"][value] || null;
};
//获取当前时间
	$("#dragTime, #inTime").getToday();
//判断type值做相应校验
	var type = args.type;
	if(type === "trailerRecordSee") {
		$("#isTab").removeClass("hide");
		$("#insuranceTitleDiv h3").text("查看拖车登记");
		comn.ajax({
			url: interUrl.trailer.getTrailerRecord,
			data: {
				id: args.id
			},
			success: function (res) {
				$("#topInfo").nameValues(res.data);
				pageDatas = res.data;
				if (pageDatas.status != "3") {
					pageDatas.status = "2";
				}
				$("#submitForm").values(pageDatas);
				var statusValue = $("#trailerStatus").val();
				$("#submitForm").find(".formDiv").hide();
				if(statusValue != "3") {
					$("#submitForm").find(".formDiv").eq(0).show();
					$("#dragUser").getDragUser(args.launchUserId, pageDatas.dragUserId);
				} else {
					$("#submitForm").find(".formDiv").eq(1).show();
					if($("#remark2").val() !== ""){
						$("#otherReasonCheck").prop("checked", true);
					}
				}

			}
		});
		getDocumentList(args.id);
		$("#formSet").attr("disabled", true);
	} else {
		comn.ajax({
			url: interUrl.trailer.getTrailerRecord,
			data: {
				id: args.id
			},
			success: function (res) {
				$("#topInfo").nameValues(res.data);
				pageDatas = res.data;
			}
		});
		$("#dragUser").getDragUser(args.launchUserId);
	}
//其他勾选框事件
	$("#otherReasonCheck").change(function () {
		$("#undoReason option").eq(0).prop("selected", true);
		if ($("#otherReasonCheck").prop("checked") === true) {
			$("#remark2").prop("disabled", false);
			$("#remark2").addClass("required");
			$("#undoReason").prop("disabled", true);
			$("#undoReason").removeClass('required');
		} else {
			$("#remark2").prop("disabled", true);
			$("#remark2").removeClass("required");
			$("#undoReason").prop("disabled", false);
			$("#undoReason").addClass('required');
		}
	});
//拖回状态对应事件
	$("#trailerStatus").change(function(){
		var statusValue = $(this).val();
		$("#submitForm").find(".formDiv").hide();
		if(statusValue === "2") {		
			$("#submitForm").find(".formDiv").eq(0).show();
		} else {
			$("#submitForm").find(".formDiv").eq(1).show();
		}
	});
//确定按钮点击
	$("#searchBtn").unbind('click').click(function () {
		// var feeId = $("#dealerId").val();
		// if(feeId) {
		// 	comn.closeTab();
		// } else {
			
		// }
		var dragUserName = $("#dragUser").find("option:selected").text();
		$('#dragUserName').val(dragUserName);
		if ($("#submitForm").valid()) {
				comn.ajax({
	                url: interUrl.trailer.trailerRecord,
	                data: $.extend($('#submitForm').values(), {id: args.id, projectId: pageDatas.projectId}),
	                success: function (res) {
	                    $("#dealerId").val(res.data);
	                    comn.closeTab();
	                }
	            });
			}
	});
//图片部分
	var	base64 = function (file, index, callback) {
	    return lrz(file).then(function (rst) {
	        var imgRst;
	        imgRst = rst.base64;
	        return typeof callback === "function" ? callback(file, imgRst, index) : void 0;
	    });
	};
//图片上传
	$(".imgItem").click(function () {
		// $("#submitForm").validate();
		var _this = $(this);
		_this.parent("div").find(".upImageInput").trigger("click");
	    // if ($("#submitForm").valid()) {
	    //     var feeId = $("#dealerId").val();
	        
	    //     //如果是修改
	    //     if (feeId) {
	    //         _this.parent("div").find(".upImageInput").trigger("click");
	    //     } else {
	    //         //tip({content:"请先检查并保存拖车信息"});
	    //         comn.ajax({
	    //             url: interUrl.trailer.trailerRecord,
	    //             data: $.extend($('#submitForm').values(), {id: args.id, projectId: pageDatas.projectId}),
	    //             success: function (res) {
	    //                 $("#dealerId").val(res.data);
	    //             }
	    //         });
	    //         _this.parent("div").find(".upImageInput").trigger("click");
	    //     }
	    // }
	});

	$(".upImageInput").change(function () {
	    var _this = $(this);
	    var fileArr, html, i, j, k, len, results;
	    fileArr = this.files;
	    results = [];
	    for (k = j = 0, len = fileArr.length; j < len; k = ++j) {
	        i = fileArr[k];
	        html = "";
	        results.push(base64(i, k, function (f, o, index) {
	            var _index = $("#fileType").find("li").length;
	            html = ["<li>", 
	            "<input name='LoanDocuments[" + 0 + "].fileName' data-name='fileName' class='hide' value='" + f.name + "' />",
	            "<a href='javascript:;'>" + f.name + "</a>",
	            "&nbsp;<a href='javascript:;' class='upCancle'>删除</a>",
	            "</li>"].join("");
	            $("#fileType").append(html);
	            var id = args.id;
	            uploadImg(id, o, f.name);
	        }));
	    }
	    return results;
	});

//删除图片  delDocument
	$(".files-ul").on("click", ".upCancle", function () {
	    var _this, _type, ul, fileId;
	    _this = $(this);
	    _type=_this.parents("ul").attr("data-type");
	    ul = _this.parents("ul");
	    fileId=_this.parent("li").attr("data-id");
	    comn.ajax({
	        url: interUrl.trailer.picDel,
	        data: {
		            id: fileId
		         },
	        success:function(res){
	            _this.parents("li").remove();
	            _this.parents("ul").prev("div").find(".upImageInput").val("");
	            ul.find("li").each(function (index) {
	                $(this).find("[data-name='fileName']").attr("name", "LoanDocuments[" + index + "].fileName");
	            });
	        }
	    });
	});

//获取图片
	function getDocumentList(id) {
		var result = "";
	    comn.ajax({
	        url: interUrl.trailer.getPic,
	        data: {
	            dragCarId: id
	        },
	        success: function (res) {
	            var del=(args['type']!='trailerRecordSee')?"<a href='javascript:;' class='upCancle'>删除</a>":"";
	            var i, list = res.data;
	            for (i = 0; i < list.length; i++) {
	                var o = list[i];
	                result += "<li class='loaded' data-id='"+ o.id+"'>" +
	                    "<img src='" + o.dragCarFile + "' class='hide' />" +
	                    "<input name='LoanDocuments[" + i + "].fileName' data-name='fileName' class='hide' value='" + o.dragCarFileName + "' />" +
	                    "<a href='javascript:;' class='showImg' data-path='"+ o.dragCarFile+"'>" + o.dragCarFileName + "</a>&nbsp;" + del + "</li>";
	            }
	            $("#fileType").html(result);
	        }
	    });
	}

//上传图片
	function uploadImg(id, imgBase64, name) {
	    var $tr, $trAll;
	    $tr = $("#fileType").find("li:not('.loaded')"); //把已经上传过的过滤掉 
	    $trAll = $("#fileType").find("li");
	    comn.ajax({
	        url: interUrl.trailer.picLoad,
	        data: {
	            dragCarId: id,
				dragCarFile: imgBase64,
				dragCarFileName: name
	        },
	        success: function (res) {
	            $tr.addClass("loaded").attr("data-id",res.data[0]); //标注一下已上传的文件 
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