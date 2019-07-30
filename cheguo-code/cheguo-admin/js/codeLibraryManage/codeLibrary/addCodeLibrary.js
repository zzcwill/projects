var args = comn.getArgs();
console.log(args["codeType"]+args["codeType"]!=null);
if(args["codeType"]!=null){
    var codeType = $("#codeLibraryForm [name='codeType']");
    codeType.attr("value",args["codeType"]);
    codeType.attr("readonly","readonly");
    $("#codeLibraryForm [name='describe']").attr("value",args["describe"]==null?"":args["describe"]);
}
if (args["type"] == "modify") { //修改
    comn.ajax({
        url: interUrl.codeLibrary.get,
        data: {
            id: args["id"]
        },
        success: function(res){
            var data = res.data;
            data.isInuse = data.isInuse.toString();
            data.sortNo = data.sortNo.toString();
            $("#codeLibraryForm").values(res.data);
        }
    })
}
//保存
$(document).on("click", "#saveCodeLibrary", function(){
    var _url = $("#id").val() ? interUrl.codeLibrary.update : interUrl.codeLibrary.add;
    $("#codeLibraryForm").validate();
    if ($("#codeLibraryForm").valid() == true) {
        var o = $("#codeLibraryForm").values();
        comn.ajax({
            url: _url,
            data: o,
            success: function(){
                tip({content: "保存成功！"});
            }
        })
    };
})