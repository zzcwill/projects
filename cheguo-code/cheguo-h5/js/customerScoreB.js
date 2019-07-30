var args;
args = common.getArgs();
if (parseInt(args['androidVersion']) < 19) {
    $("#main").hide();
    $("#am-fontScore, #am-fontScoreB").show();
}
$(function(){
    var myChart = echarts.init(document.getElementById('main'));
    var myChartB = echarts.init(document.getElementById('mainB'));
    option = {
        series : [
            {
                name: '客户评分卡',
                type: 'gauge',
                radius: '100%',
                center: ['50%', '55%'],
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 5,
                        color : [[0.2, '#2fc6c4'], [0.8, '#51b2f4'], [1, '#d7767e']]
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length: 8,        // 属性length控制线长
                    splitNumber:10,
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                splitLine: {           // 分隔线
                    length: 12,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                title : {
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontSize: 14
                    }
                },
                pointer : {
                    width : 4     //指针宽度
                },
                detail: {formatter: '{value}'},
                data:[]
            }
        ]
    };
    optionB = {
        series : [
            {
                name: '客户评分卡',
                type: 'gauge',
                radius: '100%',
                center: ['50%', '55%'],
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 5,
                        color : [[0.2, '#2fc6c4'], [0.8, '#51b2f4'], [1, '#d7767e']]
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length: 8,        // 属性length控制线长
                    splitNumber:10,
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                splitLine: {           // 分隔线
                    length: 12,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                title : {
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontSize: 14
                    }
                },
                pointer : {
                    width : 4     //指针宽度
                },
                detail: {formatter: '{value}'},
                data:[]
            }
        ]
    };
    common.Ajax({
        url: 'loanApproval/getLoanScoreInfo',
        /*data: {
         businessId : 2001803854
         },*/
        data : args,
        success: function(data) {
            if (data) {
                var CustomerScoreA = data.CustomerScoreA;
                var level=getLevel(Number(CustomerScoreA));
                commonScore(CustomerScoreA, "#CustomerScoreA");
                var CustomerScoreB = data.CustomerScoreB;
                var levelB = getLevel(Number(CustomerScoreB));
                commonScore(CustomerScoreB, "#CustomerScoreB");
                if (parseInt(args['androidVersion']) < 19) {
                    lowLevel(CustomerScoreA, level, "#am-fontScore");
                    lowLevel(CustomerScoreB, levelB, "#am-fontScoreB");
                    return false;
                }
                option.series[0].detail = {formatter: CustomerScoreA};
                option.series[0].data[0] = {
                    value: CustomerScoreA,
                    name: "评分结果:" + level
                }
                myChart.setOption(option, true);

                optionB.series[0].detail = {formatter: CustomerScoreB};
                optionB.series[0].data[0] = {
                    value: CustomerScoreB,
                    name: "评分结果:" + levelB
                }
                myChartB.setOption(optionB, true);
            }
        }
    });
});
function commonScore(score, id) {
    var _score = score;
    if (_score >= 100) {
        _score = 100;
    }
    if (_score < 0) {
        _score = 0;
    }
    $(id).html(_score);
}
function lowLevel(_score, level, isLowLevel){
    $(isLowLevel).append("<p>评分结果：<i class='"+ levelClass(Number(_score))+"'>"+level +"</i></p><p>实际得分：<i class='"+ levelClass(Number(_score))+"'>"+ _score +"</i></p>");
}
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
function levelClass(score) {
    if(score >= 70){
        return 'AClass';
    }else if(score >= 60 && score <= 69){
        return 'BClass';
    }else{
        return 'CClass';
    }
}