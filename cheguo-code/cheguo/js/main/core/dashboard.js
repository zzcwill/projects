var args = comn.getArgs(), fontSize = window.parent.fontSize, uId = window.parent.uId, dataState = window.parent.dataState;
var myChart = echarts.init($("#dashboard")[0], "shine"); //初始化地图 
option = {
	/*title: {
		 text: '业务完成率', 
		 x:'center',
		 textStyle: {
			 color: '#FFF',
             fontSize: fontSize
		 }
	},*/
    tooltip : {
        formatter: "{c}天 {b}",
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
            max:20,
            splitNumber:4,
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: [[0.25, 'lime'],[0.75, '#1e90ff'],[1, '#ff4500']],
                    width: 20,
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
                length :15,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: '#EEE',
                    width: 1,
                    type: 'solid',
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
            pointer: {           // 分隔线
                width:5,
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
				formatter:'{value}天',
                /*width: 300,
                height: 60,*/
                backgroundColor: 'rgba(30,144,255,0.8)',
                borderWidth: 1,
                borderColor: '#fff',
                shadowColor : '#fff', //默认透明
                shadowBlur: 2,
                offsetCenter: [0, '75%'],       // x, y，单位px
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
					fontSize: 18,
                    fontWeight: 'bolder',
                    color: '#fff',
                    fontSize: fontSize,
                }
            },
            data:[{value: 4.33, name: '垫资周期'}]
        },
        {
            name:'',
            type:'gauge',
            center : ['25%', '50%'],    // 默认全局居中
            radius : '60%',
            min:0,
            max: 100,
            splitNumber:10,
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: [[0.1, 'lime'],[0.8, '#1e90ff'],[1, '#ff4500']],
                    width: 20,
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
                formatter:'{value}天',
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
            data:[{value: 53.26, name: '抵押周期'}]
        }
    ]
};

myChart.setOption(option,true);
