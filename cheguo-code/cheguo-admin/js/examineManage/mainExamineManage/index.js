var handle_1, tableEvent, dataLoad_1, orgIdsStr = "";
var date = new Date();
var y = date.getFullYear()
$("#year").val(y);
dataLoad_1 = function(params) {
    $("#searchForm").validate();
    if ($("#searchForm").valid() == true){
        tableData(params,{year : ($("#year").val() ? $("#year").val() : y)}, 'loanEvaluationSubject/list');
    }
};

handle_1= function(value, row, index){
    return ["<div class='btn-group btn-group-xs'>",
            "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'> 操作 <span class='caret'></span></button>",
            "<ul class='dropdown-menu' role='menu'>",
                "<li><a class='edit'>修改</a></li>",
                "<li><a class='delete'>删除</a></li>",
            "</ul>",
            "</div>"].join("");
}
tableEvent = {
    "click .edit": function (a, val, item, index) {
        $("#addMain").modal("show");
        $("#addMain").find("input").val("");
        comn.ajax({
            url : "loanEvaluationSubject/editView",
            data : {
                id : item.id
            },
            success : function(res) {
                orgIdsStr = res.data.orgIds;
                $('.selectpicker').selectpicker('refresh');
                $("#addUserForm").values(res.data);
                brachCompany(orgIdsStr)
            }
        })
    },
    "click .delete" : function (a, val, item, index) {
        batchDelete("-1", item.id);
    }
}
$(document).on("click", "#add", function(){
    $("#addMain").modal("show");
    $("#addMain").find("input").val("");
    $("#addMain input").removeClass("wrongTip");
    brachCompany();
});
$(document).on("click", "#save", function(){
    if ($("#yearLayer").val() == ""){
        $("#yearLayer").addClass("wrongTip");
        alert("年份不能为空");
        return false;
    } else {
        $("#yearLayer").removeClass("wrongTip");
    }
    if ($(".bootstrap-select .filter-option").html() == "--请选择--") {
        $(".bootstrap-select .dropdown-toggle").addClass("wrongTip");
        alert("关联机构不能为空");
        return false;
    } else {
        $(".bootstrap-select .dropdown-toggle").removeClass("wrongTip");
    }
    if ($("input[name=checkTarget]").val() == "") {
        $("input[name=checkTarget]").addClass("wrongTip");
        alert("年度考核指标不能为空");
        return false;
    } else {
        $("input[name=checkTarget]").removeClass("wrongTip");
    }
    if ($("input[name=firstName]").val() == "") {
        $("input[name=firstName]").addClass("wrongTip");
        alert("一级名称不能为空");
        return false;
    } else {
        $("input[name=firstName]").removeClass("wrongTip");
    }
    if ($("input[name=secondName]").val() == "") {
        $("input[name=secondName]").addClass("wrongTip");
        alert("二级名称不能为空");
        return false;
    } else {
        $("input[name=secondName]").removeClass("wrongTip");
    }
    if ($("input[name=thirdName]").val() == "") {
        $("input[name=thirdName]").addClass("wrongTip");
        alert(tipTitle+"三级名称不能为空");
        return false;
    } else {
        $("input[name=thirdName]").removeClass("wrongTip");
    }
    var g = /^\d+$/;
    for (i = 1; i < 13; i++) {
        var value = $("input[name=employeeNum"+i+"]").val();
        var tipT = $("input[name=employeeNum"+i+"]").parent().parent().children("label").children("label").html();
        if (!g.test(value)){
            $("input[name=employeeNum"+i+"]").addClass("wrongTip");
            alert(tipT+"：请输入整数");
            return false;
        } else {
            $("input[name=employeeNum"+i+"]").removeClass("wrongTip");
        }
    }
    var orgIdString = $("#orgIds").val().join(",");
    var orgTextArr = [];

    $("#orgIds").find("option:selected").each(function() {
        orgTextArr.push($(this).text())
    });
    var orgTextString = orgTextArr.join(",");
    var data = $("#addUserForm").values();
    data.orgIds = orgIdString;
    data.orgNames = orgTextString;
    comn.ajax({
        url : "loanEvaluationSubject/save",
        data : data,
        success : function(res) {
            tip({content : "保存成功"})
            $("#addMain").modal("hide");
            $("#table").bootstrapTable("refresh", {url: "..."});
        }
    })
});
$(document).on("click", "#copy", function(){
    $("#betweenYear").modal("show");
    $("#betweenYearForm input").each(function(){
        if ($(this).val() == "") {
            return false;
        }
    })
    $("#btn_submit").unbind("click").click(function () {
        if ($("#srcYear").val() == "") {
            $("#srcYear").addClass("wrongTip");
            alert("年份开始日期不能为空");
            return false;
        } else {
            $("#srcYear").removeClass("wrongTip");
        }
        if ($("#destYear").val() == "") {
            $("#destYear").addClass("wrongTip");
            alert("年份结束日期不能为空");
            return false;
        } else {
            $("#destYear").removeClass("wrongTip");
        }
        comn.ajax({
            url : "loanEvaluationSubject/copy",
            data : $("#betweenYearForm").values(),
            success : function(res) {
                tip({content : "复制成功"});
                $("#betweenYear").modal("hide");
                $("#table").bootstrapTable("refresh", {url: "..."});
            }
        })
    })
});
$(document).on("click", "#batchDelete", function(){
    batchDelete("batchDelete");
});
$(document).on("change", ".inputNumber", function() {
    var g = /^\d+$/;
    if (!g.test($(this).val())){
        $(this).addClass("wrongTip");
        alert("请输入整数");
        return false;
    } else {
        $(this).removeClass("wrongTip")
    }
})
function batchDelete(type, id){
    var arr = $("#table").bootstrapTable('getAllSelections');
    var arrId = [];
    for (i = 0; i < arr.length; i++) {
        arrId.push(arr[i].id);
    }
    if ((type == "batchDelete") && (arrId.length == 0)) {
        alert("请先选择记录");
        return false;
    }
    $("#sure").modal("show");
    $("#OK").unbind("click").click(function () {
        comn.ajax({
            url : "loanEvaluationSubject/delete",
            data : {
                ids : type == "-1" ? id : arrId.join(",")
            },
            success : function(res) {
                $("#sure").modal("hide");
                tip({content : (type == "batchDelete" ? "批量删除成功" : "删除成功")});
                $("#table").bootstrapTable("refresh", {url: "..."});
            }
        })
    })

}
//load branch company list
function brachCompany(arrString) {
    var _orgIdsStr = [];
    comn.ajax({
        url: 'organization/brachCompany',
        async: false,
        success: function (res) {
            if (res && res.code == 10000) {
                var htmlArr = [], bankIdArr = [];
                if (arrString) {
                    _orgIdsStr = arrString.split(",");
                }
                for (var i = 0; i < res.data.length; i++) {
                    var flag = false;
                    for (var j = 0; j < _orgIdsStr.length; j++) {
                        if (res.data[i].id == _orgIdsStr[j]) {
                            flag = true;
                        }
                    }
                    htmlArr.push('<option value="' + res.data[i].id + '" ' + (flag ? "selected" : "") + '>' + res.data[i].name + '</option>');
                }
                $('.selectpicker').html(htmlArr.join(''));
                $('.selectpicker').selectpicker({noneSelectedText: '--请选择--'});
                $('.selectpicker').selectpicker('refresh');
            }
            if (res && res.code == 20000) {
                alert('系统繁忙，请稍后重试！');
            }
        }
    })
}
$('.year').datetimepicker({
    startView: 'decade',
    minView: 'decade',
    language: 'zh-CN',
    format:'yyyy',
    autoclose: true
});