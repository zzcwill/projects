var args = comn.getArgs(), fontSize = window.parent.fontSize, uId = window.parent.uId, dataState = window.parent.dataState;
var myChart = echarts.init($("#bar")[0], "shine"); //初始化地图 
option = {
  title : {
      text: '各业务环节耗时',
			x: 'center',
			textStyle: {
				color: '#FFF',
				fontSize: fontSize
			}
  },
  tooltip : {
      trigger: 'axis',
      textStyle: {
				fontSize: fontSize
			}
  },
  /*legend: {
	y: 'bottom',
      data:['贷款笔数'],
	textStyle: {
		color: '#FFF',
		fontSize: fontSize
	}
  },*/
  toolbox: {
      show : false,
      feature : {
          mark : {show: true},
          dataView : {show: true, readOnly: false},
          magicType : {show: true, type: ['line', 'bar']},
          restore : {show: true},
          saveAsImage : {show: true}
      }
  },
  calculable : true,
		xAxis : [{
		type : 'category',
		axisLabel: {
			interval: 0,
			textStyle: {
				color: '#fff',
				fontSize: fontSize
			}
		}, 
		data: ['征信环节','家访环节','文档传递','业务审核','付款审核','提车环节']
	}],
	yAxis : [{
		name: '小时',
		nameTextStyle: {
			fontSize:fontSize * 0.8
		},
		type : 'value',
		max: 150,
		axisLabel: {
			textStyle: {
				color: '#fff',
				fontSize: fontSize
			},
			formatter: '{value}'
		}, 
	}],
	series : [{
		name:'小时',
		type:'bar',
		data:[15, 20, 25, 30, 100, 120]
	}]
};
                    
myChart.setOption(option,true);
