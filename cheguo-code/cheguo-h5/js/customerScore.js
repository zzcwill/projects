var args;
args = common.getArgs();
if (parseInt(args['androidVersion']) < 19) {
    $("#main").hide();
    $("#am-fontScore").show();
}
$(function(){
    $(".contractP").click(function() {
        var url = $(this).attr("data-url");
        //return location.href = "./" + url +"?Auth-Id=80895C8961821412890D0C05AAB1DFB2E67317EB5B3820747D63C00CC593AA1C94C3646EE6364B13";
        return location.href = "./" + url +"?businessId=" + args['businessId'] + "&Auth-Id=" + args['Auth-Id'];
    });
    $(".tipLayer").click(function(){
        $(".am-modal").show();
    });
    $(".am-modal-btn, .layer_black").click(function(){
        $(".am-modal").hide();
    })
    var myChart = echarts.init(document.getElementById('main'));
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
    common.Ajax({
        url: 'loanApproval/getLoanScoreInfo',
        /*data: {
         businessId : 2001803854
         },*/
        data : args,
        success: function(data) {
            if (data) {
                var CustomerScoreA = data.CustomerScoreA;
                if (CustomerScoreA >= 100) {
                    CustomerScoreA = 100;
                }
                if (CustomerScoreA < 0) {
                    CustomerScoreA = 0;
                }
                $("#CustomerScoreA").html(CustomerScoreA);
                var level=getLevel(Number(CustomerScoreA));
                if (parseInt(args['androidVersion']) < 19) {
                    $("#am-fontScore").append("<p>评分结果：<i class='"+ levelClass(Number(CustomerScoreA))+"'>"+level +"</i></p><p>预计得分：<i class='"+ levelClass(Number(CustomerScoreA))+"'>"+ CustomerScoreA +"</i></p>");
                    return;
                }
                option.series[0].detail = {formatter: CustomerScoreA};
                option.series[0].data[0] = {
                    value: CustomerScoreA,
                    name: "客户等级:" + level
                }
                myChart.setOption(option, true);
            }
                /*
                option.series[0].data[0].value = data.CustomerScoreA;
                if (data.CustomerScoreA > 59 && data.CustomerScoreA < 70) {
                    option.series[0].data[0].name = '评分结果:D级';
                } else if (data.CustomerScoreA > 69 && data.CustomerScoreA < 80) {
                    option.series[0].data[0].name = '评分结果:C级';
                } else if (data.CustomerScoreA > 79 && data.CustomerScoreA < 90) {
                    option.series[0].data[0].name = '评分结果:B级';
                } else if (data.CustomerScoreA > 89 && data.CustomerScoreA < 100) {
                    option.series[0].data[0].name = '评分结果:A级';
                }
            }
            myChart.setOption(option, true);
            */
        }
    });
})
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