var table_ventureWarning;
var yj = {viewer: null};
(function(){
    yj.pictures = document.querySelector('#loadRoleInfo');
    yj.options = {
        url: 'data-original',
        title: true,
        transition: false,
        build: function (e) {},
        built: function(e){},
        show:  function (e) {
            imgIds = {};
            window.parent.toggleTopNav();
        },
        viewed: function(e){},
        hide: function(e){
            window.parent.toggleTopNav();
        }
    };
})();
//节点在分总司总经理和中级审核时，风险预警无需显示人脸识别
if (args["currentNodeKey"] == "LOAN_APPROVE_OFFICE_STAFF" || args["currentNodeKey"] == "LOAN_GENERAL_MANAGER") {
    $("#isManageDepartment").addClass("hide");
}
table_ventureWarning = function(params){
    tableData(params, {loanApplyId : args["loanApplyId"], currentNodeKey: args["currentNodeKey"]}, interUrl.common.getRiskRule);
};
handleVenture = function(value, row, index) {
    return ["<button type='button' class='btn btn-primary btn-xs associatedData'>查看关联数据</button>"].join("");
};
tableEventVenture = {
    "click .associatedData": function(e, a, item, index) {
        $("#risk").modal("show");
        dataLoad_2 = function(params) {
            tableData(params, {ruleCode:item.rulecode,loanApplyId:item["loanapplyid"]}, interUrl.common.getRiskRuleDetails);
        }
        $("#table_2").bootstrapTable("refresh", {url: "..."});
    }
};
$(function(){
    $("#tableVentureWarning, #table_2").bootstrapTable({
        "undefinedText": "--",
        "classes": "table-striped table-hover table",
        "pagination": false,
        "sidePagination": "server",
        "queryParams": "queryParams",
        "paginationFirstText": "第一页",
        "paginationPreText": "上一页",
        "paginationNextText": "下一页",
        "paginationLastText": "最后一页",
        "clickToSelect": true,
        "height": "500"
    });
});
$("#tableVentureWarning").bootstrapTable(comn.table);
tableEvent_2 = {
    "click .loanStart2": function(e, a, item, index) {
        return comn.addTab({
            title : '贷款详情',
            href: "./Modal/customManage/customer/loanDetail.html?id="+ item.projectId +"&loanApplyId="+ item.relationloanapplyid +"&projectId=" + item.projectId +"&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY"
        });
    }
};
handle_2 = function(value, row, index) {
    return ["<button type='button' class='btn btn-primary btn-xs loanStart2'>查看详情</button>"].join("");
};
$("#table_2").bootstrapTable(comn.table);


comn.ajax({
    url : interUrl.common.faceList,
    data : {
        loanApplyId : args["loanApplyId"]
    },
    success : function(res) {
        var len, o, html = "";
        o = res.data;
        len = o.length;
        for (var i = 0; i < len; i++) {
            var identification = (function(){
                if (o[i].state == 0) {
                    return "没有图片信息";
                } else if (o[i].state == 1) {
                    return "已识别";
                } else if (o[i].state == 2) {
                    return "未识别";
                } else {
                    return "";
                }
            })();
            var resultColr = (function(){
                if (o[i].result == "建议通过") {
                    return "greenColor"
                } else if (o[i].result == "建议拒绝") {
                    return "redColor"
                }
            })();
            var similarityDegree = o[i].similarityDegree ? (o[i].similarityDegree +"%") : '';
            html += ["<div class='form-group form-group-sm paddingBottom20'>",
                "<label class='col-md-2 col-xs-2 col-sm-2 control-label'></label>",
                "<div class='col-md-4 cl-sm-4 col-xs-4 text-center'>",
                "<div>借款人:"+ o[i].guarantorName +"</div>",
                "<span class='img_role'>",
                "<span class='isIdentification'>"+ identification +"</span>",
                "<img src='"+ o[i].filePath +"@150h' height='150' data-original='"+ o[i].filePath +"'>",
                "</span>",
                (o[i].state == 2 ? "<button type='button' class='btn btn-primary btn-sm btn-role' data-cardNo='"+ (o[i].cardNo ? o[i].cardNo : '')+"' data-guarantorName='"+o[i].guarantorName +"'>识别</button>" : ''),
                "</div>",
                "<div class='col-md-16 cl-sm-16 col-xs-16 ventureWarning'>",
                "<fieldset disabled>",
                "<form class='form-horizontal ventureWarningForm'>",
                "<div class='form-group form-group-sm'>",
                "<div class='input-tip'>",
                "<label class='col-md-3 col-xs-3 col-sm-3 control-label'>相似度：</label>",
                "<div class='col-md-8 cl-sm-8 col-xs-8'>",
                "<input type='text' name='similarityDegree' placeholder='请输入相似度' class='form-control' value='"+ (o[i].state == 1 ? similarityDegree : '') +"'>",
                "</div>",
                "</div>",
                "<div class='input-tip'>",
                "<label class='col-md-3 col-xs-3 col-sm-3 control-label'>更新时间：</label>",
                "<div class='col-md-8 cl-sm-8 col-xs-8'>",
                "<input type='text' name='modifyTime' placeholder='请输入更新时间' class='form-control' value='"+ (o[i].state == 1 ? o[i].modifyTime : '') +"'>",
                "</div>",
                "</div>",
                "</div>",
                "<div class='form-group form-group-sm'>",
                "<label class='col-md-3 col-xs-3 col-sm-3 control-label'>对比结论：</label>",
                "<div class='col-md-19 cl-sm-19 col-xs-19'>",
                "<textarea name='result' placeholder='请输入对比结论' class='form-control role-textarea "+ resultColr +"'>"+ (o[i].state == 1 ? o[i].result : '') +"</textarea>",
                "</div>",
                "</div>",
                "</form>",
                "</fieldset>",
                "</div>",
                "</div>",
            ].join("");
        }
        $("#loadRoleInfo").append(html);
        if(yj.viewer){
            yj.viewer.destroy();
        }
        yj.viewer = new Viewer(yj.pictures, yj.options);
    }
})


$(document).on("click", ".btn-role", function(){
    $this = $(this).parent();
    comn.ajax({
        url : interUrl.common.faceComparision,
        data : {
            loanApplyId : args["loanApplyId"],
            cardNo : $(this).attr("data-cardNo"),
            guarantorName : $(this).attr("data-guarantorName")
        },
        success : function(res) {
            $this.children(".btn-role").addClass("hide");
            $this.find(".isIdentification").html("已识别");
            $this.children(".img_role img").attr("src", res.data.filePath);
            $this.next().find("input[name=similarityDegree]").val(res.data.similarityDegree);
            $this.next().find("input[name=modifyTime]").val(res.data.modifyTime);
            $this.next().find("textarea[name=result]").html(res.data.result);
        }
    })
})
