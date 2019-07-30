var table_1, table_2, handle_1, handle_2, match_result, match_result2, tableEvent_1, tableEvent_2


match_result = function (value, row, index){
    if (row.totalMatchFail > 0)
    {
        return "失败"
    }
    else
    {
        return "成功"
    }
}
match_result2 = function (value, row, index) {
    if (row.matchFailureAmount > 0) {
        return "失败"
    }
    else {
        return "成功"
    }
}
handle_1 = function (value, row, index){
    var reg = /^[0-9]*$/
    if (reg.test(row.totalMatchFail) && row.totalMatchFail > 0)
    {
        return `<button type="button" class="btn btn-primary download"  modal="enter"><span>&nbsp;匹配失败下载&nbsp;</span>
                  </button>`
    }
    else
    {
        return ''
    }
}
handle_2 = function (value, row, index) {
    var reg = /^[0-9]*$/
    if (reg.test(row.matchFailureAmount) && row.matchFailureAmount > 0) {
        return `<button type="button" class="btn btn-primary download"  modal="enter"><span>&nbsp;匹配失败下载&nbsp;</span>
                  </button>`
    }
    else {
        return ''
    }
}
table_1 = function (params) {
    return comn.ajax({
        url: interUrl.dataImportManagement.dataTransmissionOfflineImportList,
        data: $.extend($("#loanForm").values(), params.data),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                 rows: res.data
            });
            return params.complete();
        }
    });
}
$("#templateId").getTemplateList();

$(".changeUl li").click(function(e){
    if($(e.target).text() == "线下导入")
    { 
        //导入模板
        $("#templateId").getTemplateList();
    }
    else{
        //获取银行报表
        var dataArr = [["#templateId", "BankStatementReportSource"]];
        $.getCommonMethodPort(dataArr);
    }
})

tableEvent_1 = {
    "click .download":function (e, a, item, index){
        var downLink = interUrl.basic + interUrl.dataImportManagement.dataTransmissionMatchFailListExport + "?templateId=" + item.templetId + "&createTime=" + item.createTime + "&settlementFileName=" + item.settlementFileName;
        location.href = downLink
    }
}

tableEvent_2 = {
    "click .download": function (e, a, item, index) {
        var downLink = interUrl.basic + interUrl.parameterData.dataTransmissionDownloadDetails + "?batchId=" + item.id;
        location.href = downLink
    }
}

$("#btn-search").click(function(){
    if ($(".changeUl li").eq(0).hasClass("active"))
    {
        $("#table1").bootstrapTable('refresh', { url: "..." });
    }
    else
    {
        $("#table2").bootstrapTable('refresh', { url: "..." });
    }
})
table_2 = function (params) {
    return comn.ajax({
        url: interUrl.parameterData.dataTransmissionList,
        data: $.extend({
            bankCode: $("#templateId").val(),
            transmissionStatus:"",
            createTimeStart: $("#createTime1").val(),
            createTimeEnd: $("#createTime2").val(),
            middlewareFinishTimeStart: "",
            middlewareFinishTimeEnd: "",
            carLoanFinishTimeStart: "",
            carLoanFinishTimeEnd: "",
            isSuccess: $("#matchStatus").val()
        }, params.data),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            return params.complete();
        }
    });
}


//获取贷款机构三级下拉方法
function getBankList() {
    comn.ajax({
        url: interUrl.common.cooperationBankTree,
        data: {},
        success: function (res) {
            function getBankShow(data) {
                //数据源
                var dataArr = data;
                var dataArr2 = [];
                var dataArr3 = [];
                //选中的银行名字数组
                var nameArr = [];
                //选中银行的id数组
                var idArr = [];
                //第一级机构选中id
                var treeBank1 = '';
                //第二级机构选中id
                var treeBank2 = '';
                //第三级机构选中ids
                var treeBank3 = [];

                //各级机构列表方法
                function getBankList(id, data) {
                    var html = "";
                    for (i = 0; i < data.length; i++) {
                        html += [
                            '<li>',
                                '<span class="text">' + data[i].organName + '</span>',
                                '<span class="glyphicon" data-id="' + data[i].id + '"></span>',
                            '</li>',
                        ].join("");
                    }
                    $("#" + id).html(html);
                }

                //根据id找到对象相应数组
                function idToArr(id, arr) {
                    var data = {};

                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].id == id) {
                            data = arr[i];
                        }
                    }

                    return data;
                }

                //有无三级机构
                function judgeThreeZero(arr) {
                    var isTrue = true;
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].organizations.length !== 0) {
                            isTrue = false;
                        }
                    }

                    return isTrue;
                }

                //清空三级下拉数据
                function clearData(type) {
                    $('#templateId').val('');
                    $('#coBankIdBox').text('没有选中任何项');

                    if (type === 1) {
                        dataArr2 = [];
                        dataArr3 = [];

                        nameArr = [];
                        idArr = [];
                        treeBank2 = '';
                        treeBank3 = [];
                        $('#treeBank2').html('');
                        $('#treeBank3').html('');
                    }

                    if (type === 2) {
                        dataArr3 = [];

                        nameArr = [];
                        idArr = [];
                        treeBank3 = [];
                        $('#treeBank3').html('');                      
                    }

                    if (type === 3) {
                        treeBank3 = [];
                        nameArr = [];
                        idArr = [];
                    }

                }

                //根据类型和有无下级支行显示相应几级联动
                function showChooseList(length, type,arr) {
                    $('#treeBank2').parent().removeClass('hide');
                    $('#treeBank3').parent().removeClass('hide');

                    if (type === 1 && length === 0) {
                        $('#treeBank2').parent().addClass('hide');
                        $('#treeBank3').parent().addClass('hide'); 
                    }

                    if (type === 1 && length !== 0) {
                        var isHaveTree = judgeThreeZero(arr);
                        if(isHaveTree) {
                            $('#treeBank3').parent().addClass('hide');
                        }
                    }                        


                    if (type === 2 && length === 0) {
                        $('#treeBank3').parent().addClass('hide');
                    }

                }

                //根据类型和有无下级给选中银行id和名称赋值
                function getnameArridArr(data, type) {
                    if (type === 1) {
                        if (data.organizations.length === 0) {
                            nameArr.push(data.organName);
                            idArr.push(data.id);
                        }

                        var isHaveTree = judgeThreeZero(data.organizations);
                        if (data.organizations.length !== 0 && isHaveTree) {
                            for (var i = 0; i < data.organizations.length; i++) {
                                nameArr.push(data.organizations[i].organName);
                                idArr.push(data.organizations[i].id);
                            }
                        }

                        if (data.organizations.length !== 0 && !isHaveTree) {
                            for (var j = 0; j < data.organizations.length; j++) {
                                for (var k = 0; k < data.organizations[j].organizations.length; k++) {
                                    nameArr.push(data.organizations[j].organizations[k].organName);
                                    idArr.push(data.organizations[j].organizations[k].id);
                                }
                            }
                        }
                    }

                    if (type === 2) {
                        if (data.organizations.length === 0) {
                            nameArr.push(data.organName);
                            idArr.push(data.id);
                        }

                        if (data.organizations.length !== 0) {
                            for (var n = 0; n < data.organizations.length; n++) {
                                nameArr.push(data.organizations[n].organName);
                                idArr.push(data.organizations[n].id);
                            }
                        }
                    }

                    $('#templateId').val(idArr.join(','));
                    $('#coBankIdBox').text(nameArr.join(','));
                }

                //合作机构一级点击事件
                $(document).on("click", "#treeBank1 li", function () {
                    clearData(1);
                    if($(this).children('.glyphicon').eq(0).hasClass('glyphicon-ok')) {
                        $(this).children('.glyphicon').eq(0).removeClass('glyphicon-ok');
                        treeBank1 = '';
                        showChooseList(0, 1,[]);
                        return;
                    }

                    $('#treeBank1 li .glyphicon').removeClass('glyphicon-ok');
                    $(this).children('.glyphicon').eq(0).addClass('glyphicon-ok');
                    treeBank1 = $(this).children('.glyphicon').eq(0).attr('data-id');

                    var bank = idToArr(treeBank1, dataArr);

                    showChooseList(bank.organizations.length, 1,bank.organizations);
                    getnameArridArr(bank, 1);

                    //二级菜单遍历
                    if (bank.organizations.length !== 0) {
                        dataArr2 = bank.organizations;
                        getBankList('treeBank2', dataArr2);
                    }
                });

                //合作机构二级点击事件
                $(document).on("click", "#treeBank2 li", function () {
                    clearData(2);
                    if($(this).children('.glyphicon').eq(0).hasClass('glyphicon-ok')) {
                        $(this).children('.glyphicon').eq(0).removeClass('glyphicon-ok');
                        treeBank2 = '';
                        showChooseList(0, 2,[]);
                        return;
                    }

                    $('#treeBank2 li .glyphicon').removeClass('glyphicon-ok');
                    $(this).children('.glyphicon').eq(0).addClass('glyphicon-ok');
                    treeBank2 = $(this).children('.glyphicon').eq(0).attr('data-id');

                    var bank = idToArr(treeBank2, dataArr2);

                    showChooseList(bank.organizations.length, 2,bank.organizations);
                    getnameArridArr(bank, 2);

                    //三级菜单遍历
                    if (bank.organizations.length !== 0) {
                        dataArr3 = bank.organizations;
                        getBankList('treeBank3', dataArr3);
                    }
                });

                //合作机构三级点击事件
                $(document).on("click", "#treeBank3 li", function () {
                    clearData(3);

                    if($(this).children('.glyphicon').eq(0).hasClass('glyphicon-ok')) {
                        $(this).children('.glyphicon').eq(0).removeClass('glyphicon-ok');
                    }else{
                        $(this).children('.glyphicon').eq(0).addClass('glyphicon-ok');
                    }

                    for(var j = 0 ; j < $('#treeBank3 li .glyphicon').length ; j++) {
                        if($('#treeBank3 li .glyphicon').eq(j).hasClass('glyphicon-ok')){
                            treeBank3.push($('#treeBank3 li .glyphicon').eq(j).attr('data-id'))
                        }
                    }

                    for(var i = 0 ; i <  treeBank3.length ; i++) {
                        var bank = idToArr(treeBank3[i], dataArr3);
                        nameArr.push(bank.organName);
                        idArr.push(bank.id);                            
                    }

                    $('#templateId').val(idArr.join(','));
                    $('#coBankIdBox').text(nameArr.join(','));
                });

                //初始化合作机构
                getBankList('treeBank1', dataArr);
            }
            getBankShow(res.data);

            //贷款机构下拉点击事件
            $('#treeBankClick').bind('click', function () {
                $('.treeBankList').toggleClass('hide');
            });
            
            //贷款机构下拉-确认按钮
            $('#sureBank').bind('click',function(){
                $('.treeBankList').toggleClass('hide');
            })
        }
    });
}
$(function(){
    //清除查询条件按钮事件
    $("#btn-reset").click(function () {
        //清空贷款机构相关信息satrt
        $('#templateId').val('');
        $('#coBankIdBox').text('没有选中任何项');
        $('.treeBankList').addClass('hide');
        if($('#treeBank1 li .glyphicon').eq(0).hasClass('glyphicon-ok')){
            $('#treeBank1 li').eq(0).trigger('click');
        }else{
            $('#treeBank1 li').eq(0).trigger('click');
            $('#treeBank1 li').eq(0).trigger('click');
        }
        //清空贷款机构相关信息end
        
    });
    getBankList();
})