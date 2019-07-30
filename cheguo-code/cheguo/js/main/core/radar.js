var args = comn.getArgs(), fontSize = window.parent.fontSize, uId = window.parent.uId, dataState = window.parent.dataState;
var myPie = echarts.init($("#pie")[0], shine);
var myChart = echarts.init($("#radar")[0], shine); //初始化地图 
pieOption = {
    color: ['rgba(52,140,203,0.5)', 'rgba(241,103,103, 0.5)', 'rgba(0,128,0, 0.5)'],
    legend: {
        orient : 'vertical',
        x : 'left',
        data:['业务能力','风控能力','服务效率'],
        textStyle:{
          color: '#FFF'
        }
    },
    series : [
        {
            name:'三大核心能力',
            type:'pie',
            radius : '70%',
            center: ['50%', '50%'],
            itemStyle : {
              normal : {
                label : {
                  show : false
                },
                labelLine : {
                  show : false
                }
              }
            },
            data:[
                {value:30, name:'业务能力'},
                {value:40, name:'风控能力'},
                {value:30, name:'服务效率'}
            ]
        }
    ]
  };
  myPie.setOption(pieOption,true);
option = {
    title : {
        text: '三大核心能力',
        x: 'center',
        y: 30,
        //subtext: '纯属虚构'
        textStyle:{
            color:'#fff',
            fontSize: fontSize*1.1
        }
    },
    tooltip : {
        trigger: 'axis',
        formatter: function(params) {
        	return params[0].indicator + ' : ' + params[0].value + '%';
        }
    },
    /*legend: {
        orient : 'vertical',
        x : 'left',
        y : 'bottom',
        textStyle:{
        	color:'#fff',
        	fontSize: fontSize
        },
        data:['三大核心能力']
    },*/
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    polar : [
       {
           indicator : [
           		 /*{ text: '新车分期业务量', max: 120},
           		 { text: '二手车分期业务量', max: 120},
           		 { text: '保险代理业务量', max: 120},
           		 { text: '逾期N1金额占比', max: 120},
           		 { text: '逾期N2金额占比', max: 120},
           		 { text: '超期30天未抵押金额占比', max: 120},
           		 { text: '超期60天未抵押金额占比', max: 120},
           		 { text: '业务审核环节效率', max: 120},
           		 { text: '抵押效率', max: 120},
               { text: '垫资周期', max: 120},*/
               { text: '新车分期业务量', max: 120},
               { text: '垫资周期', max: 120},
               { text: '抵押效率', max: 120},
               { text: '业务审核环节效率', max: 120},
               { text: '超期90天未抵押笔数占比', max: 120},
               { text: '超期60天未抵押笔数占比', max: 120},
               { text: '逾期N2金额占比', max: 120},
               { text: '逾期N1金额占比', max: 120},
               { text: '保险代理业务量', max: 120},
               { text: '二手车分期业务量', max: 120}
            ],
            radius : '70%',
            splitNumber : 6,
            name :{
            	show: true,
            	formatter: null,
            	textStyle:{
            		color:'#fff',
            		fontSize: fontSize
            	}
            },
            axisLabel:{
            	show:true,
            	margin: 8,
            	textStyle:{
            		color: '#fff',
            		fontSize: fontSize
            	}
            },
            type:'polygon'
        }
    ],
    calculable : true,
    series : [
        {
            name: '三大核心能力',
            type: 'radar',
            itemStyle: {
                normal: {
                    //color:'#567FB5'
                }
            },
            data : [
                {
                    value : [71, 37, 22, 70, 80, 40, 80, 40, 32, 60],/*[71, 60, 32, 40, 80, 40, 80, 70, 22, 37],*/
                    name : '三大核心能力'
                }
            ]
        }
    ]
};
                    
myChart.setOption(option,true);
