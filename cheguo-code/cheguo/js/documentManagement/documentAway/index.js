var dataLoad_1, dataLoad_2, handle_1, handle_2, tableEvent;

dataLoad_1 = function(params) {
    return tableData(params, $.extend($("#searchForm").values(), {
        deliverStatus: 4
    }), interUrl.mockList || interUrl.documentManagement.pigeonholeList);
};

dataLoad_2 = function(params) {
    return tableData(params, $.extend($("#searchForm").values(), {
        deliverStatus: 5
    }), interUrl.documentManagement.pigeonholeList);
};

handle_1 = function(value, row, index) {
    return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'> 操作 <span class='caret'></span></button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='confirmArchive'>确认归档</a></li>", "<li><a class='backReception'>退回资料接收</a></li>", "</ul>", "</div>"].join("");
};

handle_2 = function(value, row, index) {
    return ["<div class='btn btn-primary btn-xs info'>查看详情</div>"].join("");
};

tableEvent = {
    "click .confirmArchive": function(e, a, item, index) {
        comn.ajax({
            url : interUrl.documentManagement.prePigeonhole,
            data: {
                projectId : item.projectId
            },
            success: function (res) {
                $("#sureModal").modal("show");
                $("#sureModal").find(".tipText").text("资料归档后，不能再进行贷款修改操作，是否确认归档？");
                $("#sureOption").unbind("click").click(function () {
                    $("#sureModal").modal("hide");
                    comn.ajax({
                        url: interUrl.documentManagement.pigeonhole,
                        data: {
                            id : item.id,
                            projectId : item.projectId
                        },
                        success: function (res) {
                            $("#sureModal").modal("hide");
                            tip({ content : "归档成功"});
                            $("#wait table").bootstrapTable("refresh", {url : "..."});
                        }
                    })
                })
            }
        })
    },
    "click .backReception": function(e, a, item, index) {
        comn.ajax({
            url : interUrl.documentManagement.cancelDeliver,
            data : {
                id : item.id
            },
            success : function (res) {
                tip({ content : "文档传递流程已成功退回至资料接收环节,请确认!"});
                $("#wait table").bootstrapTable("refresh", {url : "..."});
            }
        })
    },
    "click .info": function(e, a, item, index) {
        //影像管理传 id的值（即projectId, 已和文林确认）
        return comn.addTab({
            title:"贷款详情",
            href: "./Modal/customManage/customer/loanDetail.html?id="+item.projectId+"&loanApplyId="+item.loanApplyId+"&businessTypeCode=" + item.flowType+"&projectId="+item.projectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY" + "&loanFlag=1"
        })
    }
};
$(function() {
	$("#bankDeraler").getBank(); //银行加载
    $("#btn-search").click(function() {
        var activeTab;
        activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
        return $("#" + activeTab).find("table").bootstrapTable("refresh", {url: "..."});
    });
    $(".nav-tabs li").click(function () {
        if ($(this).children().attr("href") == "#wait") {
            $("#documentReception").removeClass("hide").children("input").prop("disabled", "");
            $("#documentAway").addClass("hide").children("input").prop("disabled", "disabled");
        } else {
            $("#documentAway").removeClass("hide").children("input").prop("disabled", "");
            $("#documentReception").addClass("hide").children("input").prop("disabled", "disabled");
        }
    });
});
