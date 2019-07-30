//图片上传封装函数
base64 = function (file, index, callback) {
    return lrz(file).then(function (rst) {
        var imgRst;
        imgRst = rst.base64;//获取到图片base64
        return typeof callback === "function" ? callback(file, imgRst, index) : void 0;
    });
};
//图片上传
$(".upImage").click(function () {
    var _this = $(this);
    $("#advanceFeeFrom").validate();
    if ($("#advanceFeeFrom").valid() == true) {
        var feeId = $("#FeeId").val();
        //如果是修改
        if (feeId) {
            _this.parent("div").find(".upImageInput").trigger("click");
            return;
        } else {
            $("#btn-save").trigger("click");
            upImageInputFlag = true;
        }
    }
});
//ajax上传图片
function uploadImg(imgBase64,imgName,feeId) {
    if(!$("#FeeId").val()){
        return false;
    }
    comn.ajax({
        url: interUrl.feeManage.feeImgUploadFile,
        data: {
            feeAdvanceId: feeId,
            filePath: imgBase64,
            fileName: imgName
        },
        success: function (res) {
            var _index = $("#fileType_").find("li").length;
            html = ["<li>", "<img src='"+ imgBase64 +"' class='hide' />", "<input name='LoanDocuments[" + 0 + "].fileName' data-name='fileName' class='hide' value='" + imgName + "' />", "<a href='javascript:;' class='clickImg'>" + imgName + "</a>", "&nbsp;<a href='javascript:;' class='upCancle' datadeleteid='"+ res.data+"'>\u5220\u9664</a>", "</li>"].join("");
            $("#fileType").prepend(html);
        }
    });
}
//图片上传前保存，会返回个id
function save_s(o,name){
    uploadImg(o,name,$("#FeeId").val());
}
//图片上传域改变时触发
$(".upImageInput").change(function () {
    var _this = $(this);
    var _type = _this.attr("data-type");
    var fileArr, i, j, k, len, results;
    fileArr = this.files;
    results = [];
    for (k = j = 0, len = fileArr.length; j < len; k = ++j) {
        i = fileArr[k];
        results.push(base64(i, k, function (f, o, index) {
            save_s(o,f.name);
        }));
    }
    return results;
});
//删除图片  delDocument
$(".files-ul").on("click", ".upCancle", function () {
    var _this;
    _this = $(this);
    fileId=_this.attr("datadeleteid");
    comn.ajax({
        url:interUrl.feeManage.feeImgDelFile,
        data:{
            fileId: fileId
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
    var imgA=_this.parents("#fileType").find("img.hide");
    var _index=imgA.index(_this.prev().prev());
    imgA.each(function(index){
        imgArr.push($(this).attr("src"));
    });
    console.log(imgArr);
    window.parent.switchImage(imgArr,_index);
});

//获取图片
function getDocumentList(id) {
    var result = "";
    comn.ajax({
        url: interUrl.feeManage.feeImgGetFileList,
        data: {
            feeAdvanceId: id
        },
        success: function (res) {
            var del=((args["currentNodeKey"] && type != "approve") || (type == "show"))?"":"删除";
            var i, list = res.data;
            for (i = 0; i < list.length; i++) {
                //html = ["<li>", "<img src='"+ o +"' class='hide' />",
                //    "<input name='LoanDocuments[" + 0 + "].fileName' data-name='fileName' class='hide' value='" + imgName + "' />",
                //    "<a href='javascript:;' class='clickImg'>" + imgName + "</a>", "&nbsp;<a href='javascript:;' class='upCancle' datadeleteid='"+ res.data+"'>\u5220\u9664</a>",
                //    "</li>"].join("");



                var o = list[i];
                result += "<li class='loaded' data-id='"+ o.id+"'>" +
                    "<img src='"+ o.filePath +"' class='hide' />" +
                    "<input name='LoanDocuments[" + i + "].fileName' data-name='fileName' class='hide' value='" + o.fileName + "' />"+
                "<a href='javascript:;' class='clickImg'>" + o.fileName + "</a><a href='javascript:;' class='upCancle' datadeleteid='"+ o.id+"'>"+del+"</a></li>";
            }
            $("#fileType").html(result);
        }
    });
}