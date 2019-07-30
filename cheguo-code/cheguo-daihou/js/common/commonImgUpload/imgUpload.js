var args = comn.getArgs();
var tableName = args["tableName"];
//图片上传封装函数
base64 = function (file, index, callback) {
    return lrz(file).then(function (rst) {
        var imgRst;
        imgRst = rst.base64;//获取到图片base64
        return typeof callback === "function" ? callback(file, imgRst, index) : void 0;
    });
};
//图片上传
$(".upImage").unbind("click").click(function () {
    var _this = $(this);
    $("#collectionForm_2").validate();
    if ($("#collectionForm_2").valid() == true) {
        var keyId = $("#keyId").val();
        //如果是修改
        if (keyId) {
            _this.parent("div").find(".upImageInput").trigger("click");
            return false;
        } else {
            $("#btn-save").trigger("click");
        }
        _this.parent("div").find(".upImageInput").trigger("click");
    }
});
//ajax上传图片
function uploadImg(imgBase64, imgName, tableKeyValue) {
    if(!$("#keyId").val()){
        return false;
    }
    console.log(333)
    comn.ajax({
        url: interUrl.common.commonImgUploadFile,
        data: {
            tableName:tableName,
            tableKeyValue:tableKeyValue,
            filePath: imgBase64,
            fileName: imgName
        },
        success: function (res) {
            var _index = $("#fileType_").find("li").length;
            //html = ["<li>", "<img src='"+ imgBase64 +"' class='hide' />",
            //    "<input name='LoanDocuments[" + 0 + "].fileName' data-name='fileName' class='hide' value='" + imgName + "' />",
            //    "<a href='javascript:;' class='clickImg'>" + imgName + "</a>", "&nbsp;<a href='javascript:;' class='upCancle' datadeleteid='"+ res.data+"'>\u5220\u9664</a>",
            //    "</li>"].join("");


            html = ["<li data-id='"+ res.data +"'>",
                "<img class='img showImg' src='" + imgBase64 + "' data-src='" + imgBase64 + "' height='57' />",
                "<div class='text-center'><a href='javascript:;' class='upCancle'>删除</a></div>",
                "</li>"].join("");

            $("#fileType").prepend(html);
        }
    });
}
//图片上传前保存，会返回个id
function save_s(o,name){
    uploadImg(o,name,$("#keyId").val());
}
//图片上传域改变时触发
$(".upImageInput").change(function () {
    var _this = $(this);
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
    fileId = _this.parents("li").attr("data-id");
    comn.ajax({
        url:interUrl.common.commonImgDelFile,
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
$(document).on("click",".showImg",function(){
    var _this = $(this),imgArr=[];
    var imgA = _this.parents("#fileType").find("img.showImg");
    var _index = _this.parent().index();
    console.log(_index)
    imgA.each(function(index){
        imgArr.push($(this).attr("data-src"));
    });
    console.log(imgArr);
    window.parent.switchImage(imgArr,_index);
});

//获取图片
function getDocumentList(id) {
    var result = "";
    comn.ajax({
        url: interUrl.common.commonImgGetFileList,
        data: {
            tableName: tableName,
            tableKeyValue: id
        },
        success: function (res) {
            var del=((args["typeOption"] === "submit"))?"<a href='javascript:;' class='upCancle'>删除</a>":"";
            var i, list = res.data;
            for (i = 0; i < list.length; i++) {
                var o = list[i];
                result += "<li class='loaded' data-id='" + o.id + "'>" +
                    "<img class='img showImg img-thumbnail' src='" + o.filePath + "' height='57' style='height:57px' data-src='" + o.filePath + "' />" +
                    "<div class='text-center'>" + del + "</div>" +
                    "</li>";
            }
            $("#fileType").html(result);
        }
    });
}