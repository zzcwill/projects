var dataLoad_1, handle, tableEvent;
dataLoad_1 = function(params) {
    var o = $("#searchForm").values();
    o.content = o.title;
    tableData(params, o, interUrl.problem.list)
};
tableEvent = {
    "click .info": function(e, a, item, index) {
        $("#addProblem").modal("show");
        comn.ajax({
            url: interUrl.problem.get,
            data: {
                id: item.id
            },
            success: function(res){
                $("#problemForm").values(res.data);
                $("#ContentTextarea").html(res.data.content)
            }
        })
    }
};
handle = function(value, row, index) {
    return "<div class='btn btn-xs btn-primary info'>查看</div>";
};

$(function(){
    $(".typeList").getProblemList();
})