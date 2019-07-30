/**
 * Created by oia on 2017/12/26.
 */
var dataLoad_1, handle, tableEvent,isManager,flag = false,args = comn.getArgs();;

dataLoad_1 = function(params) {
    var p;
    p = params.data;
    return comn.ajax({
        url: interUrl.second.durationList,
        data: $.extend($("#searchForm").values(), p),
        success: function(res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            return params.complete();
        }
    });
};

tableEvent = {
    "click .sdisabled": function(e, a, item, index) {
        comn.ajax({
            url:interUrl.second.durationReset,
            data:{
                id:item.id,
                status: 2
            },
            success: function (res) {
                tip({
                    content: "停用成功!!"
                });
                $("#table").bootstrapTable("refresh");
            }
        })
    },
    "click .senable": function(e, a, item, index) {
        comn.ajax({
            url:interUrl.second.durationReset,
            data:{
                id:item.id,
                status: 1
            },
            success: function (res) {
                tip({
                    content: "启用成功!!"
                });
                $("#table").bootstrapTable("refresh");
            }
        })
    },
    "click .sconfig": function(e, a, item, index) {
        // var configdata = {orgId : item.orgId,orgName:item.orgName,businessGroupId:item.businessGroupId,businessGroupName:item.businessGroupName,days:item.days,remark:item.remark};
        // $("#addUserForm").values(configdata)
        $('#title').text('修改')
        $("#companyId2").getCompanyC({
            code: item.orgId,
            value: item.orgName
        });
        $("#groupId2").getGroupC(item.orgId, {
            code: item.businessGroupId,
            value: item.businessGroupName
        });
        $(".filter-option").html(item.orgName)
        $("#orgName").attr('value',item.orgName)
        $("#businessGroupName").attr('value',item.businessGroupName)
        $("#managementdays").attr('value',item.days)
        $("#managementremark").attr('value',item.remark);
        $("#managementstatus").attr('value',item.status);
        $("#managementid").attr('value',item.id);
        $("#managementremark").text(item.remark);
        flag = true;
        $("#addUser").modal("show");

    },
    "click .sdelete": function(e, a, item, index) {
        comn.ajax({
            url:interUrl.second.durationDel,
            data:{
                id:item.id
            },
            success: function (res) {
                tip({
                    content: "删除成功!!"
                });
                $("#table").bootstrapTable("refresh");
            }
        })
    }
};



handle = function(value, row, index) {
        var sdisabled,senable,sdelete,sconfig;
            sdisabled = "<li><a class='sdisabled'>停用</a></li>";
            senable = "<li><a class='senable'>启用</a></li>"
            + "<li><a class='sdelete'>删除</a></li>"
            +"<li><a class='sconfig'>修改</a></li>";

        return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>",row.status ==1?sdisabled:senable, "</ul>", "</div>"].join("");

};

var refresh=function () {
    $("#companyId2").getCompany( function() {
        $('.selectpicker').selectpicker('refresh');
    });
    $("#managementremark").attr('value','');
    $("#managementremark").text('');
    $("#managementstatus").attr('value',1);
    $("#managementid").attr('value','');
    $("#managementdays").attr('value','')
}

$(function(){
    $("#companyId").getCompany().change(function() {
        if(this.value=="") return $("#groupId").html('<option value="" selected>--请选择--</option>');
        return $("#groupId").getGroup(this.value);
    });
    $("#add").click(function() {
        refresh()
        $('#title').text('新增')
        $("#addUser").modal("show");
    });
    $("#save").unbind('click').click(function() {
        if($("#addUserForm").valid()){
            var data,url;
            data = $("#addUserForm").values();
            url = flag?interUrl.second.durationUpdate:interUrl.second.durationSave
            comn.ajax({
                url: url,
                data: data,
                success: function(res) {
                    if(flag){
                        tip({
                            content: "保存成功!!"
                        });
                    }else {
                        tip({
                            content: "新增成功!!"
                        });
                    }
                    flag = false;
                    $("#addUser").modal("hide");
                    $("#table").bootstrapTable("refresh");
                }
            });
        }
    });
    if(args['orgId']){
        $("#companyId2").off('change').on('change',function(){
            $(this).selectpicker('val', args['orgId']);
            $("#companyId2").off('change').on('change',function(){
                $('#table').bootstrapTable({
                    classes: "table-striped table-hover table",
                    clickToSelect: true,
                    pagination: true,
                    paginationFirstText: "第一页",
                    paginationLastText: "最后一页",
                    paginationNextText: "下一页",
                    paginationPreText: "上一页",
                    queryParams: "queryParams",
                    sidePagination: "server",
                    undefinedText: "--"
                });
                $("#companyId2").off('change').on("change", function() {
                    var code = $(this).find("option:selected").attr('value');
                    $("#groupId2").getGroup(code);
                });
                $("#groupId2").off('change');
            });
            $("#groupId2").getGroup(args['orgId'], args["businessGroupId"]);
        });
        $("#companyId2").getCompany( function() {
            $('.selectpicker').selectpicker('refresh');
            $(this).selectpicker('val', args['orgId']);
        });
    }else{
        $("#companyId2").getCompany( function() {
            $('.selectpicker').selectpicker('refresh');
        });
        $('#table').bootstrapTable({
            classes: "table-striped table-hover table",
            clickToSelect: true,
            pagination: true,
            paginationFirstText: "第一页",
            paginationLastText: "最后一页",
            paginationNextText: "下一页",
            paginationPreText: "上一页",
            queryParams: "queryParams",
            sidePagination: "server",
            undefinedText: "--"
        });

        $("#companyId2").off('change').on("change", function() {
            var code = $(this).find("option:selected").attr('value');
            console.log(code)
            if (code !== '') {
                $("#companyId2-error").remove();
                $(this).parents(".has-error").removeClass("has-error");
            }
            $('#orgName').attr('value',$('#companyId2 option:selected').text())
            $("#groupId2").getGroup(code);
            if ($('#orgName').val()=="--请选择--"){
                $("#groupId2").html('<option value="" selected>--请选择--</option>')
            }
        });
        $("#groupId2").change(function () {
            $('#businessGroupName').attr('value',$('#groupId2 option:selected').text())
        })
        // $("#groupId2").off('change');
    }
});