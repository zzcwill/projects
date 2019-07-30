var args, dataLoad_1, curId = null,pledgeDate ,wararntNo,target;

args = comn.getArgs();

dataLoad_1 = function(params) {
    var p = {
        orgId: comn.user.companyId
    }
    return tableData(params, $.extend($("#searchForm").values(), p), interUrl.gr.userList);
};
//修改表格统一配置参数
var tableConfig = {};
$.map(comn.table, function(v, k) {
    tableConfig[k] = v;
});
tableConfig['height'] = "240";

//未抵押原因记录
dataLoad_2 = function(params) {
    return tableData(params, {
        projectId: args['projectId']
    }, interUrl.creditManagement.pledgeInfoFailRecordList);
};
$("#table_2").bootstrapTable(tableConfig);

//未抵押核查记录
dataLoad_3 = function(params) {
    return tableData(params, {
        projectId: args['projectId']
    }, interUrl.creditManagement.checkList);
};
$("#table_3").bootstrapTable(tableConfig);

$(function() {
    $(".tsbtn").click(function() { //文档详情点击
        $('input[name="failType"]').val($("#FailType option:selected").text());
        var $this = $(this)
        if (args["type"] === "show") { // 查看
            $this.tab('show');
            $($this.attr("href")).find("[data-url]").each(function () {
                $(this).getLoad();
            });
            return
        }
        $(".nav-tabs [href='#documentInfo']").attr("data-toggle", "")
        layer.confirm('是否保存数据？', {
            btn: ['是', '否'] //按钮
        }, function() {
            $(".nav-tabs [href='#documentInfo']").attr("data-toggle", "tab");
            layer.msg('',{ time: 10 });
            var o;
            o = $("#mortgageInfo").find("form").values();
            if (o['pledgeStatus'] === "1" && !o['operatorUid']) {
                return tip({
                    content: "请先选择抵押经办人后再操作！"
                });
            }
            if(!$("#plateInfo").parent("form").valid()) {
                return;
            }
            $("#reAddImage").removeClass("hide");
            if($('#btnSave span').text() === '下一步') {
                $this.tab('show').addClass('fromMortgage');
                $($this.attr("href")).find("[data-url]").each(function () {
                    $(this).getLoad();
                });
            }else {
                saveMortage(o)
            }
        }, function() {
            return;
        });
    });

    $("#customerChoice").on("show.bs.modal", function() {
        return $("#customerChoice").find("table").bootstrapTable("destroy").bootstrapTable(comn.table);
    });
    $("#switch").html($("#tpl_1").html());
    $("#mortgageInfo select[name='pledgeStatus']").change(function() {
        //选中已抵押
        if (this.value == 1) {
            $('#btnSave span').text('下一步')
        } else {
            $('#btnSave span').text('保存')
        }

        var flag = this.value == 1 ? true : false;
        var o = {
            operatorUid: flag ? comn.user.uid : "",
            operatorRealname: flag ? comn.user.realname : "",
            pledgeDate: flag ? pledgeDate : "",
            wararntNo: flag ? wararntNo : ""
        };
        $("#switch").html($("#tpl_" + this.value).html()).values(o);

        var dataArr =[["#FailType", "FailType", ""]];$.getCommonMethodPort(dataArr);
    });
    comn.ajax({
        url: interUrl.creditManagement.mortageGgt,
        data: {
            projectId: args['projectId']
        },
        success: function(res) {
            curId = res.data.id;
            args['id'] = res.data.id;
            res.data.operatorUid = res.data.operatorUid || comn.user.uid;
            res.data.operatorRealname = res.data.operatorRealname || comn.user.realname
            target = $("#registerTargetSelect").html()
            $("#mortgageInfo").find("form").values(res.data);
            pledgeDate = res.data.pledgeDate
            wararntNo = res.data.wararntNo
            $("#mortgageInfo select[name='pledgeStatus']").change();
            $("#registerTarget").change(function() {
                if (this.value == "2") {
                    $("#registerTargetSelect").html("");
                } else {
                    $("#registerTargetSelect").html(target);
                }
            }).trigger("change");
            if (args['type'] === "show") {
                return $("#plateInfo").attr("disabled", true);
            }
        }
    });
    $("#btnSave").click(function() {
        $('input[name="failType"]').val($("#FailType option:selected").text());
        var o;
        o = $("#mortgageInfo").find("form").values();
        if (o['pledgeStatus'] === "1" && !o['operatorUid']) {
            return tip({
                content: "请先选择抵押经办人后再操作！"
            });
        }
        if ($("#plateInfo").parent("form").valid()) {
            if ($('#btnSave span').text() === '下一步') {
                if(curId) {
                    $('.tsbtn').trigger('click');
                }else {// 未抵押状态id可能不存在，此时即使页面选了已抵押也要先调未抵押保存接口以生成id，跳转至影像管理页面再点保存时以已抵押保存。
                    o.pledgeStatus = 2;
                    o.pledgeDate = '';
                    o.wararntNo = '';
                    o.operatorUid = '';
                    o.operatorRealname = '';
                    o.failReason = '抵押暂存';
                    args['type'] !== "show" && $(".tsbtn").addClass('fromMortgage');
                    saveMortage(o)
                }
            }else {
                saveMortage(o)
            }
        }
    });
    $(".mortgageInfo").click(function(){
        $("#reAddImage").addClass("hide");
    });
    $("#reAddImage").click(function () {
        comn.ajax({
            url: interUrl.creditManagement.retrans,
            data: {
                projectId: args["projectId"]
            },
            success: function () {
                tip({content: '影像补件成功！'})
            }
        })
    })
    return $("#btnSure").click(function() {
        var arr;
        arr = $("#customerChoice").find("table").bootstrapTable('getSelections');
        if (arr.length < 1) {
            return tip({
                content: "请先选择一个用户再进行操作！！！"
            });
        }
        $("#userChoice").values({
            operatorUid: arr[0].uid,
            operatorRealname: arr[0].realname
        });
        return $("#customerChoice").modal("hide");
    });
});

//未抵押时，可直接点击保存
function saveMortage(o) {
    comn.ajax({
        url: interUrl.creditManagement.mortageSave,
        data: o,
        success: function(res) {
            //选择已抵押，点击下一步,跳到影像管理
            comn.ajax({
                url: interUrl.creditManagement.mortageGgt,
                data: {
                    projectId: args['projectId']
                },
                success: function(res) {
                    curId = res.data.id;
                    //数据第一次保存会返回id赋值
                    if(curId) {
                        $("input[name=id]").val(curId);
                        args['id'] = curId;
                    }
                    tip({
                        content: "保存成功！"
                    });
                    $(".nav-tabs [href='#documentInfo']").attr("data-toggle", "tab").tab("show");
                }
            });
        }
    });
}
