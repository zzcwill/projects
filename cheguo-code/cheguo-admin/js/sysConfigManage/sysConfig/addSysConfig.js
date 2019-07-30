var args = comn.getArgs();
if (args["type"] == "modify") { //修改
    comn.ajax({
        url: interUrl.sysConfig.get,
        data: {
            id: args["id"]
        },
        success: function(res){
            $("#sysConfigForm").values(res.data);
        }
    })
}
//保存
$(document).on("click", "#savesysConfig", function(){
    var _url = $("#id").val() ? interUrl.sysConfig.update : interUrl.sysConfig.add;
    $("#sysConfigForm").validate();
    if ($("#sysConfigForm").valid() == true) {
        var o = $("#sysConfigForm").values();
        comn.ajax({
            url: _url,
            data: o,
            success: function(){
                tip({content: "保存成功！"});
            }
        })
    };
})