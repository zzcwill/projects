var GlobaData = null, uId, args = comn.getArgs(), fontSize = window.parent.fontSize, uId = window.parent.uId, dataState = window.parent.dataState, myChart = echarts.init($("#bar")[0], "shine"); //初始化地图
var paramsData = window.parent.paramsData;
option = {
    title : {
        text: '贷款额分布',
				x: 'center',
				y: 10,
				textStyle: {
					color: '#FFF',
					fontSize: fontSize
				}
    },
    tooltip : {
        trigger: 'axis',
        textStyle: {
					fontSize: fontSize
				},
				formatter: function(params){
					return params[0].seriesName+'<br/>'+params[0].name+': '+params[0].data+'%';
				}
    },
    legend: {
				x: 'right',
        data:['贷款金额分布(万元)'],
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
	xAxis : [{
		type : 'category',
		axisLabel: {
			interval: 0,
			textStyle: {
				color: '#fff',
				fontSize: fontSize
			}
		}, 
		data: ['0-3','3-7','7-11','11-15','15-50','50以上']
	}],
	yAxis : [{
		name: '%',
		nameTextStyle: {
			fontSize:fontSize * 0.8
		},
		type : 'value',
		axisLabel: {
			textStyle: {
				color: '#fff',
				fontSize: fontSize
			},
			formatter: '{value}'
		}, 
	}],
	series : [{
		name:'贷款金额分布(万元)',
		type:'bar',
		data:[2, 20, 40, 20, 15, 3]
	}]
};
                    
comn.ajax({
   url: interUrl.dataView.distributionAmount,
   data: {province: paramsData.cityName},
   success: function (res) {
    var data = res.data[0];
    var dataArr=[];
    for(var i=1;i<7;i++){
    	dataArr.push(data['perRange'+i])
    }
    option.series[0].data = dataArr;
    myChart.setOption(option,true);
   }
});
