/**
 * Created by hyb on 16/10/20.
 */
var scoreTable;
(function(){
    //贷款申请：贷款发起、业务录入；贷款修改：贷款修改发起、业务录入；贷款评审发起 等显示评分卡A可录入信息；
    if (args["releventFlowNode"] == "LOAN_LAUNCH" || args["releventFlowNode"] == "LOAN_OFFICE_STAFF_BUDGET" || args["releventFlowNode"] == "LOAN_MODIFY_LAUNCH" || args["currentNodeKey"] == "LOAN_MODIFY_OFFICE_STAFF_BUDGET" || args["startCredit"] == "1") {
        $("#formCustomerScore").removeClass("hide")
    }
    //职业
    $("#profession_Code").getOccupationList();
    //获取评分卡基本信息
    comn.ajax({
        url : interUrl.carDealer.getLoanApprovalInfo,
        data : {
            loanApplyId : args["loanApplyId"]
        },
        success : function(res){
            res.data.maritalStatus == "1" ? $("#spouseDriverLicence,#maritalHasChildren").removeClass("hide") : '';
            $("#formCustomerScore").values(res.data);
        }
    })
var tableConfig = $.extend(JSON.parse(JSON.stringify(comn.table)), {
    'pagination': false
});
if(args['scoreType'] || args['scoreType']=='edit'){
    $("#saveScore").show();
    $("#scoreForm fieldset").removeAttr('disabled');
}
var myChart = echarts.init(document.getElementById('myChart'));
var option = {
    tooltip : {
        formatter: "{a} <br/>{b} : {c}"
    },
    toolbox: {
        feature: {
            restore: {},
            saveAsImage: {}
        }
    },
    series: [
        {
            name: '业务指标',
            type: 'gauge',
            detail: {formatter:'{value}'},
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: [[0.6, '#ff0000'], [0.7, '#FF8000'], [1, 'green']]
                }
            },
            data: []
        }
    ]
};

$(document).on("click", ".hasChildren", function(){
    var v = $(this).val();
    $("#hasChildren").val(v);
})

function render() {
    //评分图标
    comn.ajax({
        url:interUrl.common.getLoanScoreInfo,
        data:{loanApplyId:args['loanApplyId']},
        success:function(res){
            var CustomerScoreA = res.data.CustomerScoreA;
            if (CustomerScoreA >= 100) {
                CustomerScoreA = 100;
            }
            if (CustomerScoreA < 0) {
                CustomerScoreA = 0;
            }
            $("#CustomerScoreA").html(CustomerScoreA);
            var level=getLevel(Number(CustomerScoreA));
            option.series[0].detail = {formatter: CustomerScoreA};
            option.series[0].data[0] = {
                value: CustomerScoreA,
                name: "客户等级:" + level
            }
            /*
            if(CustomerScoreA && CustomerScoreA >= 0){
                option.series[0].detail={formatter : CustomerScoreA};
                option.series[0].data[0]={value:CustomerScoreA,name:"评分结果:"+level}
            } else if (CustomerScoreA && CustomerScoreA < 0) {
                option.series[0].detail={formatter : CustomerScoreA.toString()};
                option.series[0].data[0]={value:0, name:"评分结果:"+level}
            } else {
                option.series[0].data[0]={value:0,name:"评分结果:无"};
            }*/
            myChart.setOption(option, true);
            //提高评分方法
            comn.ajax({
                url:interUrl.common.getLoanScoreFile,
                data:{loanApplyId:args['loanApplyId']},
                success:function(res){
                    var data=res.data;
                    getRelativeShipFile(data);
                    //评分材料收集清单
                    comn.ajax({
                        url:interUrl.common.getLoanScoreComment,
                        data:{loanApplyId:args['loanApplyId']},
                        success:function(res){
                            var data=res.data;
                            if(data.length>0){
                                var arr=[];
                                $.each(data,function (i,v) {
                                    i=i+1;
                                    arr.push('<p>'+i+'、'+v+'</p>');
                                });
                                $("#scoreComment").html(arr.join(''));
                            }

                            scoreTable = function(params) {
                                var p;
                                p = params.data;
                                return comn.ajax({
                                    url: interUrl.common.getLoanScoreItem,
                                    data: $.extend({loanApplyId:args['loanApplyId'],checkResult:2}, p),
                                    success: function(res) {
                                        params.success({
                                            'total': res.totalItem,
                                            rows: res.data
                                        });
                                        return params.complete();
                                    }
                                });
                            };
                            $("#scoreTable").bootstrapTable(tableConfig);
                        }
                    });

                }
            });
        }
    });
}




if(args['loanApplyId']){

    render();

}

isCheck = function (value) {
    return [null, "是", "否"][value] || null;
};

checkResult = function (value) {
    return [null, "通过", "拒绝"][value] || null;
};



//保存评分内容
$("#saveScore").click(function (e) {
    var _a={flowType:args['releventFlow'],loanApplyId:args['loanApplyId']};
    var _b=getScoreList();
    comn.ajax({
        url: interUrl.common.loanScoreFileSave,
        data: {loanScoreFileString:JSON.stringify($.extend(_a,_b))},
        //data: $.extend(_a,{loanScoreFileVos:typeof JSON.stringify(_b)}),
        success: function(res) {
            tip({content:'保存成功!'});
            render();
        }
    });
});
    //刷新评分表
    $("#refreshScoreCard").click(function(e) {
        $("#scoreCard").children().remove();
        $("#scoreCard").load("../../../Modal/common/commonScoreCard/scoreCard1.html");
    })
    //保存评分
    $("#btn_saveScoreCard").click(function() {
        $("#formCustomerScore").validate();
        if($("#formCustomerScore").valid() == true){
            comn.ajax({
                url : interUrl.carDealer.saveLoanScoreInfo,
                data : $.extend($("#formCustomerScore").values(),{
                    loanApplyId : args["loanApplyId"]
                }),
                success : function(res){
                    render();
                    getBaseInfo();
                    $("#needDoorPanel select[name=housingStatus]").val($("#formCustomerScore select[name=housingStatus]").val())
                    $("#needDoorPanel select[name=reservedFundsYear]").val($("#formCustomerScore select[name=reservedFundsYear]").val())
                    $("#needDoorPanel select[name=socialYear]").val($("#formCustomerScore select[name=socialYear]").val())
                }
            })
        }
    });
    //职业更变
    $(document).on("change", "#profession_Code", function () {
        $("#professionName").val($(this).find("option:selected").text());
    });
//勾选提供材料
$(document).on('click','[name="_fileValue"]',function () {
    var _this=$(this);
    if(_this.is(':checked')){
        _this.prev("input").val(1);
    }else{
        _this.prev("input").val(2);
    }
});

//A级  90—99 ：15万以下（含）免家访

// B级  80—89 ：10万以下（含）免家访
//
// C级  70—79 ：7万以下（含）免家访
//
// D级  60—69 ：符合准入，需要家访
//设置评分结果
function getLevel(score) {
    if(score>=90){
        return 'A';
    }else if(score>=80 && score<=89){
        return 'B';
    }else if(score>=70 && score<=79){
        return 'C';
    }else if(score>=60 && score<=69){
        return 'D';
    }else{
        return 'E';
    }
}

//渲染提高评分方法
function getRelativeShipFile(list) {
    $("#relativeShipFile").html("");
    var temp=$(".relativeShip_temp");

    if(list.length>0){
        $.each(list,function (i,v) {
            var a=temp.clone(true);
            if(v.withRelationship=='1'){
                a.removeClass('hide').find('h3').text('主贷人-'+v.customerName);
            }else if(v.withRelationship=='2'){
                a.removeClass('hide').find('h3').text('配偶-'+v.customerName);
            }else if(v.withRelationship=='3'){
                a.removeClass('hide').find('h3').text('担保人'+v.customerName);
            }
            a.values(v);
            a.find('.otherFiles').html(getCheckList(v.loanScoreItemList));
            $('#relativeShipFile').append(a);
        })
    }

    function getCheckList(checkList) {  //isProvide
        var arr=[];
        if(checkList && checkList.length>0){
            $.each(checkList,function (i,v) {
                var temp='<input type="hidden" name="isProvide" value="'+v.isProvide+'"><input type="hidden" name="itemId" value="'+v.itemId+'"><input type="hidden" name="fileValue" value="'+v.fileValue+'">';
                var t=v.fileValue=='1'?'<label class="checkbox-inline">'+temp+'<input type="checkbox" name="_fileValue" checked>'+v.fileName+'</label>':'<label class="checkbox-inline">'+temp+'<input type="checkbox" name="_fileValue">'+v.fileName+'</label>';
                arr.push(t);
            });
            return arr.join("");
        }else{
            return '无材料';
        }
    }
}


function  getScoreList() {
    var loanScoreFileVos=[],i,j;
    var list1=$(".relativeShip_temp").not('.hide');
    var len=list1.length;
    for(i=0;i<len;i++){
    var loanScoreItemList=[];
        var _a=list1.eq(i).values();
        var list2=list1.eq(i).find('.otherFiles .checkbox-inline');
        for(j=0;j<list2.length;j++){
            var _b=list2.eq(j).values();
            loanScoreItemList.push(_b);
        }
        loanScoreFileVos.push($.extend(_a,{loanScoreItemList:loanScoreItemList}));
    }
    return {loanScoreFileVos:loanScoreFileVos};
}



})();