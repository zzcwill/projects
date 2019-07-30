var args = comn.getArgs();
$(function(){
    $(".typeList").getProblemList();
    $(document).on("change", "#typeId", function(){
        $("#typeName").val($(this).find('option:selected').text())
    })
})
if (args["type"] == "modify") { //修改
    comn.ajax({
        url: interUrl.problem.get,
        data: {
            id: args["id"]
        },
        success: function(res){
            $("#problemForm").values(res.data);
            setTimeout(function(){
                $(".typeList").val(res.data.typeId);
                $("#typeName").val(res.data.typeName);
                UE.getEditor('editor').setContent(res.data.content);
            }, 1000)
        }
    })
}
//保存
$(document).on("click", "#saveProblem", function(){
    var _url = $("#id").val() ? interUrl.problem.update : interUrl.problem.add;
    var content = UE.getEditor('editor').getContent();
    if (!content) {
        tip({content: "内容信息未填写，不允许保存！"});
        return false;
    }
    $("#problemForm").validate();
    if ($("#problemForm").valid() == true) {
        var o = $("#problemForm").values();
        o.content = content;
        comn.ajax({
            url: _url,
            data: o,
            success: function(){
                tip({content: "保存成功！"});
            }
        })
    };
})