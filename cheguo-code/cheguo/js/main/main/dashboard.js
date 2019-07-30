var GlobaData = null, uId, args = comn.getArgs(), fontSize = window.parent.fontSize, uId = window.parent.uId, dataState = window.parent.dataState, myChart = echarts.init($("#dashboard")[0], "shine"); //初始化地图 
var paramsData = window.parent.paramsData;
option = {
    title: {
         text: '业务完成率', 
         x:'center',
        y: 10,
         textStyle: {
             color: '#FFF',
            fontSize: fontSize
         }
    },
    tooltip : {
        formatter: "{c} {b}",
     textStyle: {
        fontSize: fontSize
     }
    },
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    series: [{
            name:'',
            type:'gauge',
            center : ['75%', '50%'],    // 默认全局居中
            radius : '60%',
            min:0,
            max:120,
            splitNumber:12,
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: [[0.08, 'lime'],[0.83, '#1e90ff'],[1, '#ff4500']],
                    width: 2,
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            axisLabel: {            // 坐标轴小标记
                textStyle: {       // 属性lineStyle控制线条样式
                    fontWeight: 'bolder',
                    color: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10,
            fontSize: fontSize
                }
            },
            axisTick: {            // 坐标轴小标记
                length :15,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            splitLine: {           // 分隔线
                length :25,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    width:3,
                    color: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            pointer: {           // 分隔线
                shadowColor : '#fff', //默认透明
                shadowBlur: 5
            },
            title : {
                offsetCenter: [0, '110%'],
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    //fontStyle: 'italic',
                    color: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10,
            fontSize: fontSize
                }
            },
            detail : {
        formatter:'{value}%',
                backgroundColor: 'rgba(30,144,255,0.8)',
                /*width: 300,
                height: 60,*/
                borderWidth: 1,
                borderColor: '#fff',
                shadowColor : '#fff', //默认透明
                shadowBlur: 2,
                offsetCenter: [0, '75%'],       // x, y，单位px
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontSize: fontSize,
                    fontWeight: 'bolder',
                    color: '#fff'
                }
            },
            data:[{value: 24.33, name: '贷款笔数'}]
        },
        {
            name:'',
            type:'gauge',
            center : ['25%', '50%'],    // 默认全局居中
            radius : '60%',
            min:0,
            max: 220,
            splitNumber:10,
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: [[0.1, 'lime'],[0.8, '#1e90ff'],[1, '#ff4500']],
                    width: 20,//图像仪表宽度
                    //shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            axisLabel: {            // 坐标轴小标记
                textStyle: {       // 属性lineStyle控制线条样式
                    fontWeight: 'bolder',
                    color: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10,
            fontSize: fontSize 
                }
            },
            axisTick: {            // 坐标轴小标记
                length :8,        // 属性length控制线长
                show: true,        // 属性show控制显示与否，默认不显示
                splitNumber: 5,  
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: '#EEE',
                    width: 1,
                    type: 'solid'
                    //shadowColor : '#fff', //默认透明
                    //shadowBlur: 10
                }
            },
            splitLine: {           // 分隔线
                length :20,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    width:3,
                    color: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            pointer: {
                width:5,
                shadowColor : '#fff', //默认透明
                shadowBlur: 5
            },
            title : {
                offsetCenter: [0, '110%'],      // x, y，单位px
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    //fontStyle: 'italic',
                    color: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10,
            fontSize: fontSize
                }
            },
            detail : {
                backgroundColor: 'rgba(30,144,255,0.8)',
                /*width: 300,
                height: 60,*/
                borderWidth: 1,
                borderColor: '#fff',
                shadowColor : '#fff', //默认透明
                shadowBlur: 2,
                offsetCenter: [0, '75%'],       // x, y，单位px
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontSize:fontSize,
                    fontWeight: 'bolder',
                    color: '#fff'
                }
            },
            data:[{value: 53.26, name: '贷款额(百万元)'}]
        }
    ]
};

var countRandom = ((Math.random()*20)+50).toFixed(2);
option.series[0].data[0].value = countRandom;
var amountRandom = (Math.random()*0.5)+1.5;
if(!paramsData.passData){
    comn.ajax({
       url: interUrl.dataView.companyinfoGet,
       data: {province: 'all'},
       success: function (res) {
        var amount=Math.ceil((res.data[0].loanAmount * amountRandom)/100);
        option.series[1].data[0].value = (res.data[0].loanAmount/100).toFixed(2);
        option.series[1].max = amount;
       }
    });
}else{
  var amount=Math.ceil((paramsData.passData.loanAmount * amountRandom)/100);
  option.series[1].data[0].value = (paramsData.passData.loanAmount/100).toFixed(2);
  option.series[1].max = amount;
}



myChart.setOption(option,true);
