var args = comn.getArgs(), fontSize = window.parent.fontSize, uId = window.parent.uId, dataState = window.parent.dataState;
var myChart = echarts.init($("#lineBar2")[0], "shine"); //初始化地图 
option = {
   /*title: {
       text: "贷款笔数(近12个月)",
       x: "center",
		textStyle: {
			color: '#FFF',
            fontSize: fontSize
		}
   },*/
    tooltip : {
        trigger: 'axis',
        textStyle: {
            fontSize: fontSize
        },
        formatter: function(params){
            return params[0].name + '<br>' 
                 + params[0].seriesName + ' : ' + params[0].value + '万笔' + '<br>' 
                 + params[1].seriesName + ' : ' + params[1].value + '万笔' + '<br>' 
                 + params[2].seriesName + ' : ' + params[2].value*100;
        }
    },
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    legend: {
		x: 'center',
        //y: '80',
        data:['2016年','2015年','同比(%)'],
		textStyle: {
			color: '#FFF',
            fontSize: fontSize
		}
    },
    xAxis : [
        {
            type : 'category',
            nameTextStyle:{
                fontSize: fontSize
            },
            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
			axisLabel: {
				textStyle: {
                    fontSize: fontSize,
					color: '#FFF'
				}
			}
        }
    ],
    yAxis : [{
            type : 'value',
            name : '万笔',
            nameTextStyle:{
                fontSize: fontSize * 0.8
            }, 
			axisLabel: {
				textStyle: {
                    fontSize: fontSize,
					color: '#FFF'
				}
			}
            //axisLabel : {
                //formatter: '{value} ml'
            //}
        },{
            type : 'value',
            name : '同比(%)',
            nameTextStyle: {
            fontSize: fontSize * 0.8
            },
            axisLabel: {
                textStyle: {
                    fontSize: fontSize,
                    color: '#FFF'
                }
            }
        }
    ],
    series : [{
            name:'2015年',
            type:'bar',
            data:[4, 4, 5, 4]
        }, {
            name:'2016年',
            type:'bar',
            data:[10, 8, 9, 8]
        }, {
            name:'同比(%)',
            type:'line',
            yAxisIndex: 1,
            symbolSize:10,
            data:[2.5, 2, 1.8, 2]
        }
    ]
};
myChart.setOption(option,true);
                    
