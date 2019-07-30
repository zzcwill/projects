var args = comn.getArgs(), fontSize = window.parent.fontSize, uId = window.parent.uId, dataState = window.parent.dataState;
var myChart = echarts.init($("#GPSInstallBar")[0], "shine"); //初始化地图 
option = {
  /*title : {
      text: '服务效率',
			x: 'center',
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
			formatter: '{b} <br/>{a0} : {c0}个<br/>{a1} : {c1}个'
  },
  legend: {
		y: 'bottom',
	  data:['上期', '当期'],
		textStyle: {
			color: '#FFF',
			fontSize: fontSize
		}
  },
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
  grid: {//配置图形距离边框的距离
  	y2:80,
  	x2: 60
  },
	xAxis : [{
		type : 'category',
		axisLabel: {
			interval: 0,
			rotate:45,
			textStyle: {
				color: '#fff',
				fontSize: fontSize
			}
		}, 
		data: ['江苏','浙江','山东','江西','黑龙江','安徽','辽宁','湖北','吉林','湖南','四川','上海','山西','重庆','贵州','陕西','云南','广西','河南','内蒙古','广东','海南','青海','甘肃','福建','河北','天津']
	}],
	yAxis : [{
		name: '个',
		nameTextStyle: {
			fontSize:fontSize * 0.8
		},
		type : 'value',
		max: 10000,
		splitNumber:10,
		axisLabel: {
			textStyle: {
				color: '#fff',
				fontSize: fontSize
			},
			formatter: '{value}'
		}, 
	}],
	series : [{
      name:'上期',
      type:'bar',
      data:[1800, 8800, 2800, 3800, 3000, 7000, 3900, 5000, 2700, 5000, 2700, 6000, 3500, 2800, 4000, 3000, 5000, 4200, 3500, 4200, 3500, 2500, 3300, 1800, 6000, 3500, 4000]
  }, {
      name:'当期',
      type:'bar',
      data:[2000, 8500, 3000, 4300, 2800, 7400, 3700, 4600, 2900, 5200, 2700, 6300, 3700, 2900, 4700, 3700, 5200, 3900, 4000, 5100, 3900, 2900, 3500, 1900, 6200, 3800, 4200]
  }]
};
                    
myChart.setOption(option,true);
