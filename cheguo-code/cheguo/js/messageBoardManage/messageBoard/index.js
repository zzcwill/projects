var args=comn.getArgs();
if(args['type']=="2"){
    $("#myQuestion,#myQuestion-li").removeClass("active");
    $("#onlineQuestion-li,#onlineQuestion").addClass("active");
}
$("#createTimeStart").getMonthDay1();
$("#createTimeEnd").getToday();

//在线支持-我的提问
var table_1,tableEvent_1,handle_1,handle_status,handle_type;

table_1=function(params) {
    var p = params.data;
    comn.ajax({
        url: interUrl.messageBoardManage.myQuestionList,
        data: $.extend($("#message-form").values(), p),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            return params.complete();
        }
    });
};


handle_1 =function(value, row, index) {
	return ["<a href='javascript:' class='details'>"+value+"</a>"].join("");
};

handle_status=function (value, row, index) {
    if(value=="1"){
    	return "待答复";
    }else if(value=="2"){
    	return "已答复";
    }
};

handle_type=function (value, row, index) {
    if(value=="1"){
        return "数据错误";
    }else if(value=="2"){
        return "系统需求";
    }else if(value=="3"){
        return "系统问题";
    }
};


tableEvent_1 = {
    "click .details": function (a, val, item, d) {
        comn.addTab({href: './Modal/messageBoardManage/messageBoard/myDetail.html?id='+item['id'], title: '查看详情'})
    }
};

//搜索提问列表
$('#btn-search').on('click', function () {
    $("#table_1").bootstrapTable("refresh", {url: "..."});
});
//留言字数
$("#note").on('keyup',function(){
    var _this=$(this);
    var a=$("#alreadyNum");
    var b=$("#leftNum");
    a.text(_this.val().length);
    b.text(1000-_this.val().length);
});

//提交问题
$("#submit-question").click(function(){
    $("#question-form").validate();
    if($("#question-form").valid() == true) {
        comn.ajax({
            url: interUrl.messageBoardManage.clsFeedbackManageAdd,
            data:$("#question-form").values(),
            success: function (res){
                $("#id").val(res.data);
                tip({content:res.message || "提交成功!"});
                $("#toMQ").trigger("click");
            }
        });
    }
});

//我的提问跳转
$("#toMQ").click(function(){
    window.parent.toUrl(
        {
            url:'./Modal/messageBoardManage/messageBoard/index.html'
        }
    )
});

//图片部分
base64 = function (file, index, callback) {
    return lrz(file).then(function (rst) {
        var imgRst;
        imgRst = rst.base64;
        return typeof callback === "function" ? callback(file, imgRst, index) : void 0;
    });
};
var a = null;
//图片上传
$(".upImage").click(function () {
    var _this = $(this);
    var id=$("#id").val();
    $("#question-form").validate();
    if ($("#question-form").valid() == true) {
        if(id){
            _this.parent("div").find(".upImageInput").trigger("click");
            return;
        }else{
            var data = $("#question-form").values();
            comn.ajax({
                url:  interUrl.messageBoardManage.clsFeedbackManageAdd,
                async: true,
                data: data,
                success: function (res) {
                    $("#id").val(res.data);
                }
            });
        }
        _this.parent("div").find(".upImageInput").trigger("click");
    }
});

$(".upImageInput").change(function () {
    var _this = $(this);
    var id=$("#id").val();
    var fileArr, html, i, j, k, len, results;
    fileArr = this.files;
    results = [];
    for (k = j = 0, len = fileArr.length; j < len; k = ++j) {
        i = fileArr[k];
        html = "";
        results.push(base64(i, k, function (f, o, index) {
            var _index = $("#files-ul").find("li").length;
            html = ["<li>",
				"<input name='LoanDocuments[" + _index + "].fileName' data-name='fileName' class='hide' value='" + f.name + "' />",
				"<a href='javascript:;' class='showImg'>" + f.name + "</a>",
				"&nbsp;<a href='javascript:;' class='upCancle'>删除</a>",
			"</li>"].join("");
            $("#files-ul").append(html);
            uploadImg(id, o);

        }));
    }
    return results;
});


//删除图片  delDocument
$(".files-ul").on("click", ".upCancle", function () {
    var _this, ul,fileId;
    _this = $(this);
    ul = _this.parents("ul");
    fileId=_this.parent("li").attr("data-id");
    comn.ajax({
        url:interUrl.gr.delDocument,
        data:{
            fileNamespace:"FEEDBACK",
            documentIds:fileId,
            dirId:901,
            releventFlow:"FEED_BACK",
            releventFlowNode:"FEED_BACK_LAUNCH"
        },
        success:function(res){
            _this.parents("li").remove();
            $(".upImageInput").val("");
            ul.find("li").each(function (index) {
                $(this).find("[data-name='filePath']").attr("name", "LoanDocuments[" + index + "].filePath");
                $(this).find("[data-name='fileName']").attr("name", "LoanDocuments[" + index + "].fileName");
            });
        }
    });

});

//获取图片
function getDocumentList(id) {
    var result = "";
    comn.ajax({
        url: interUrl.gr.documentList,
        data: {
            fileNamespace:"FEEDBACK",
            loanApplyId: id,
            dirId:901,
            releventFlow:"FEED_BACK",
            releventFlowNode:"FEED_BACK_LAUNCH"
        },
        success: function (res) {
            var i, list = res.data;
            for (i = 0; i < list.length; i++) {
                var o = list[i];
                result += "<li class='loaded' data-id='"+ o.id+"'><input name='LoanDocuments[" + i + "].filePath' data-name='filePath' class='hide' value='" + o.filePath + "' /> <input name='LoanDocuments[" + i + "].fileName' data-name='fileName' class='hide' value='" + o.fileName + "' /><a href='javascript:;' class='showImg' data-path='"+ o.filePath+"'>" + o.fileName + "</a>&nbsp;<a href='javascript:;' class='upCancle'>删除</a></li>";
            }
            $("#files-ul").html(result);
        }
    });
}


//查看图片
$(document).on("click",".showImg",function(){
    var _this=$(this),imgArr=[],i;
    var imgA=$("#files-ul").find(".showImg");
    var _index=imgA.index(_this);
    imgA.each(function(index){
        imgArr.push(($(this).attr("data-path")));
    });
    window.parent.switchImage(imgArr,_index);
});

//上传图片
function uploadImg(id, imgBase64) {
    var $tr, $trAll;
    $tr = $("#files-ul").find("li:not('.loaded')");
    $trAll = $("#files-ul").find("li");
    comn.ajax({
        url: interUrl.gr.uploadImage,
        data: $.extend($tr.values(), {
            fileNamespace:"FEEDBACK",
            loanApplyId: id,
            dirId:901,
            releventFlow:"FEED_BACK",
            releventFlowNode:"FEED_BACK_LAUNCH",
			"LoanDocuments[0].filePath": imgBase64
        }),
        success: function (res) {
            $tr.addClass("loaded").attr("data-id",res.data[0]);
        }
    });
}
