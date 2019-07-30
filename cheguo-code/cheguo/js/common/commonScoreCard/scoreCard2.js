/**
 * Created by hyb on 16/10/20.
 */
var scoreTable;
(function () {
    if (args["currentNodeKey"] == "LOAN_CANCEL_CAR_FINANCE") {
        $("#saveScore").remove();
    }
    var tableConfig = $.extend(JSON.parse(JSON.stringify(comn.table)), {
        'pagination': false
    });
//LOAN_CAR_FINANCE，LOAN_CAR_FINANCE_MANAGER，LOAN_CAR_FINANCE_MAJORDOMO，LOAN_GROUP_GENERAL_MANAGER,LOAN_MODIFY_CAR_FINANCE
    if (args['releventFlow'] == 'LOAN_QUERY') {
        $("#saveScore").hide();
    }

    var myChart1 = echarts.init(document.getElementById('myChart1'));
    var myChart2 = echarts.init(document.getElementById('myChart2'));
    optionA = {
        tooltip: {
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
                detail: {formatter: '{value}'},
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.6, '#ff0000'], [0.7, '#FF8000'], [1, 'green']]
                    }
                },
                data: []
            }
        ]
    };

optionB = {
    tooltip: {
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
            detail: {formatter: '{value}'},
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: [[0.6, '#ff0000'], [0.7, '#FF8000'], [1, 'green']]
                }
            },
            data: []
        }
    ]
};


    function render() {
        comn.ajax({
            url: interUrl.common.getLoanScoreInfo,
            data: {loanApplyId: args['loanApplyId']},
            success: function (res) {
                var CustomerScoreA = res.data.CustomerScoreA, CustomerScoreB = res.data.CustomerScoreB;
                //if(CustomerScoreA){
                //    var level=getLevel(Number(CustomerScoreA));
                //    option.series[0].data[0]={value:CustomerScoreA,name:"评分结果:"+level}
                //}else{
                //    option.series[0].data[0]={value:0,name:"评分结果:无"};
                //}
                if (CustomerScoreA >= 100) {
                    CustomerScoreA = 100;
                }
                if (CustomerScoreA < 0) {
                    CustomerScoreA = 0;
                }
                if (CustomerScoreB >= 100) {
                    CustomerScoreB = 100;
                }
                if (CustomerScoreB < 0) {
                    CustomerScoreB = 0;
                }
                var levelA = getLevel(Number(CustomerScoreA)), levelB = getLevel(Number(CustomerScoreB));
                optionA.series[0].detail = {formatter: CustomerScoreA};
                optionA.series[0].data[0] = {
                    value: CustomerScoreA,
                    name: "评分结果:" + levelA
                };
                optionB.series[0].detail = {formatter: CustomerScoreB};
                optionB.series[0].data[0] = {
                    value: CustomerScoreB,
                    name: "评分结果:" + levelB
                };
                /*
                if (CustomerScoreA && CustomerScoreA >= 0) {
                    optionA.series[0].detail = {formatter: CustomerScoreA};
                    optionA.series[0].data[0] = {value: CustomerScoreA, name: "评分结果:" + levelA}
                } else if (CustomerScoreA && CustomerScoreA < 0) {
                    optionA.series[0].detail = {formatter: CustomerScoreA.toString()};
                    optionA.series[0].data[0] = {value: 0, name: "评分结果:" + levelA}
                } else {
                    optionA.series[0].data[0] = {value: 0, name: "评分结果:无"};
                }*/
                myChart1.setOption(optionA, true);
                //if(CustomerScoreB){
                //    var level=getLevel(Number(CustomerScoreB));
                //    option.series[0].data[0]={value:CustomerScoreB,name:"评分结果:"+level}
                //}else{
                //    option.series[0].data[0]={value:0,name:"评分结果:无"};
                //}
                /*
                if (CustomerScoreB && CustomerScoreB >= 0) {
                    optionB.series[0].detail = {formatter: CustomerScoreB};
                    optionB.series[0].data[0] = {value: CustomerScoreB, name: "评分结果:" + levelB}
                } else if (CustomerScoreB && CustomerScoreB < 0) {
                    optionB.series[0].detail = {formatter: CustomerScoreB.toString()};
                    optionB.series[0].data[0] = {value: 0, name: "评分结果:" + levelB}
                } else {
                    optionB.series[0].data[0] = {value: 0, name: "评分结果:无"};
                }*/
                myChart2.setOption(optionB, true);
            }
        });
    }

    if (args['loanApplyId']) {
        //评分图标
        render();

        scoreTable = function (params) {
            var p;
            p = params.data;
            return comn.ajax({
                url: interUrl.common.getLoanScoreItem,
                data: $.extend({loanApplyId: args['loanApplyId']}, p),
                success: function (res) {
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

    isCheck = function (value) {
        return [null, "是", "否"][value] || null;
    };

    //checkResult = function (value, item) {
    //    if (item.isCheck == 2) {
    //        return '--'
    //    }
    //    var value_0 = "<form><input type='radio' value='1' class='checkResult' name='checkResult'/>通过&nbsp;<input type='radio' class='checkResult' value='2' name='checkResult'/>拒绝</form>";
    //    var value_1 = "<form><input type='radio' value='1' class='checkResult' name='checkResult' checked/>通过&nbsp;<input type='radio' class='checkResult' value='2' name='checkResult'/>拒绝</form>";
    //    var value_2 = "<form><input type='radio' value='1' class='checkResult' name='checkResult'/>通过&nbsp;<input type='radio' class='checkResult' value='2' name='checkResult' checked/>拒绝</form>";
    //    return [value_0, value_1, value_2][value] || value_0;
    //};
    realScore = function(value, item) {
        if (item.isCheck == 2) {
            return item.realScore
        } else {
            return "<form><input type='text' value='"+ (value ? value : 0) +"' class='form-control changeRealScore' name='realScore'/></form>";
        }
    };
    realScoreEvent = {
        "change .changeRealScore": function (e, value, row, index) {
            row.realScore = Number($(this).val());
        }
    }

    $("#saveScore").click(function () {
        var _a = {flowType: args['releventFlow'], loanApplyId: args['loanApplyId']};
        var _b = {LoanScoreItems: $("#scoreTable").bootstrapTable('getData')};
        comn.ajax({
            url: interUrl.common.loanScoreItemSave,
            data: {loanScoreItemString: JSON.stringify($.extend(_a, _b))},
            success: function (res) {
                tip({content: '保存成功!'});
                render();
                $("#scoreTable").bootstrapTable('refresh');
            }
        });
    });

//刷新评分表
    $("#refreshScoreCard").click(function (e) {
        $("#scoreCard").children().remove();
        $("#scoreCard").load("../../../Modal/common/commonScoreCard/scoreCard2.html");
    })

    //checkResultEvent = {
    //    "click .checkResult": function (e, value, row, index) {
    //        if ($(this).is(':checked')) {
    //            row.checkResult = $(this).val();
    //        }
    //    }
    //};

//A级  90—99 ：15万以下（含）免家访

// B级  80—89 ：10万以下（含）免家访
//
// C级  70—79 ：7万以下（含）免家访
//
// D级  60—69 ：符合准入，需要家访
//设置评分结果
    function getLevel(score) {
        if (score >= 90) {
            return 'A';
        } else if (score >= 80 && score <= 89) {
            return 'B';
        } else if (score >= 70 && score <= 79) {
            return 'C';
        } else if (score >= 60 && score <= 69) {
            return 'D';
        } else {
            return 'E';
        }
    }
})();


