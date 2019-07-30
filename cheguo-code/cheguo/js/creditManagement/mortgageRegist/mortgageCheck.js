var args, dataLoad_1, curId = null,pledgeDate ,wararntNo,target,applyId;

args = comn.getArgs();
dataLoad_1 = function(params) {
    var p = {
        orgId: comn.user.companyId
    };
    return tableData(params, $.extend($("#searchForm").values(), p), interUrl.gr.userList);
};
var dataArr =[["#VehicleAdminOffice", "VehicleAdminOffice", ""]];$.getCommonMethodPort(dataArr);
$(function() {
    $('#userId').val(comn.user.uid);
    $('#user').val(comn.user.realname);
    $('#userName').val(comn.user.realname);
    comn.ajax({
        url: interUrl.creditManagement.mortageGgt,
        data: {
            projectId: args['projectId']
        },
        success: function(res) {
            $("#mortgageInfo").find("form").values(res.data);
            $('#projectId').val(res.data.projectId);
            $('#pledgeId').val(res.data.id);
            applyId = res.data.id;
            if ($("#registerTarget").val() == "2") {
                $("#registerTargetSelect").html("");
            } else {
                $("#registerTargetSelect").html(target);
            }
            if (args['type'] === "show") {
                return $("#plateInfo").attr("disabled", true);
            }
        }
    });

    $(".tsbtn").click(function() { //文档详情点击
        var $this = $(this);
        args['id'] = applyId;
        $this.tab('show');
        $($this.attr("href")).find("[data-url]").each(function () {
            $(this).getLoad();
        });
        // $(".nav-tabs [href='#documentInfo']").attr("data-toggle", "tab").tab("show");
    });

    $("#btnSave").on("click", function() {
        if ($("#mortageCheck").valid() == false) {
            return;
        }
        $('input[name="checkVehicleOffice"]').val($("#VehicleAdminOffice option:selected").text());
        saveMortage($('#mortageCheck').values());
    });
    $("#btnCancel").on("click", function() {
        comn.closeTab();
    });

    $("#customerChoice").on("show.bs.modal", function() {
        return $("#customerChoice").find("table").bootstrapTable("destroy").bootstrapTable(comn.table);
    });
    $("#btnSure").click(function() {
        var arr;
        arr = $("#customerChoice").find("table").bootstrapTable('getSelections');
        if (arr.length < 1) {
            return tip({
                content: "请先选择一个用户再进行操作！！！"
            });
        }
        $("#userChoice").values({
            userId: arr[0].uid,
            userName: arr[0].realname
        });
        return $("#customerChoice").modal("hide");
    });
});

function saveMortage(o) {
    comn.ajax({
        url: interUrl.creditManagement.mortageCheckEntry,
        data: o,
        success: function(res) {
            tip({
                content: "保存成功！"
            });
            comn.closeTab();
        }
    });
}
