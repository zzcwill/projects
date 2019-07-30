$(document).ready(function (){
    var pageIndex = 1;
    $("#addBtn").click(function(){
        var tableHtml = "<tr>" + 
	                        "<td>" + pageIndex + "<input type='hidden' name='pageIndex' value='" + pageIndex + "'/>" +
	                        "</td>" +
	                        "<td>" + "<button  type='button' class='btn btn-primary imgItem'> <span>上传背景图片</span></button>" + "</td>" + 
	                        "<td>" + "<button  type='button' class='btn btn-primary printSet'> <span>打印设计</span></button>" + "</td>" + "<input name='printCode' />" + "</td>" +
	                        "<td class='status'>" + "</td>" +
	                    "</tr>";
        $("#table1 tbody").append(tableHtml);
        pageIndex += 1;
    });
});

//图片部分
base64 = function (file, index, callback) {
    return lrz(file).then(function (rst) {
        var imgRst;
        imgRst = rst.base64;
        return typeof callback === "function" ? callback(file, imgRst, index) : void 0;
    });
};