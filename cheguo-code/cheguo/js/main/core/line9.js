var args = comn.getArgs(), fontSize = window.parent.fontSize, uId = window.parent.uId, dataState = window.parent.dataState;
var myChart = echarts.init($("#line9")[0], "shine"); //初始化地图 
option = {
   title: {
	   text: "超期未抵押笔数",
	   //subtext: '超期末抵押占比率',
     x: "center",
	   y: 10,
	   textStyle: {
		   fontSize: fontSize,
		   color: '#FFF'
	   }
   },
   tooltip: {
       trigger: "item",
       formatter: "{a} <br/>{b} : {c}‰",
			 textStyle:{
				 fontSize: fontSize
			 }
   },
   legend: {
			 x:'center',
			 y: '80',
       data: ["30-45天", "45-60天", "60天以上"],
		   textStyle: {
			   fontSize: fontSize * 0.85,
			   color: '#FFF'
		   }
   },
   xAxis: [{
       name: "月份",
       //splitLine: {show: false},
	     nameTextStyle:{
				fontSize: fontSize
	   	 },
		   axisLabel: {
			   interval: 0,
			   textStyle: {
				   color: '#fff',
				   fontSize: fontSize
			   }
		   }, 
       data: ["6月", "7月", "8月", "9月", "10月", "11月", "12月", "1月", "2月", "3月", "4月", "5月"]
   }],
	yAxis: [{
		name: "笔",
		//max: 60,
		nameTextStyle:{
		    fontSize: fontSize
		},
		axisLabel: {
			textStyle: {
				color: '#FFF',
				fontSize: fontSize
			}
		}
	}],
    toolbox: {
       show: false,
       feature: {
           mark: {
               show: true
           },
           dataView: {
               show: true,
               readOnly: true
           },
           restore: {
               show: true
           },
           saveAsImage: {
               show: true
           }
       }
   },
   calculable: true,
   series: [
       {
         name: "30-45天",
         type: "line",
   			 symbolSize: 10,
	   		 itemStyle: {
		   	 normal: {
			   	color: '#74CF42'
		   	 }
		   },
         data: [41.1, 41.2, 41.5, 42.1, 42.3, 42.1, 42.3, 41, 40, 38, 36, 35] 
       },
       {
         name: "45-60天",
         type: "line",
	   		 symbolSize:10,
		   	 itemStyle: {
			   normal: {
				   color: '#AD3215'
			   }
		   },
         data: [13.4, 13.5, 12.8, 12, 11.8, 11.5, 11.3, 11.2, 11.1, 11.1, 11.1, 10.8] 
       },
       {
         name: "60天以上",
         type: "line",
   			 symbolSize:10,
		   	 itemStyle: {
			   normal: {
				   color: '#00A3A0'
			   }
		   },
         data: [6.3, 6, 5.9, 6.3, 6.2, 6, 5.9, 5.8, 5.6, 5.2, 5, 4.9] 
       }
   ]
};
comn.ajax({
   url: interUrl.dataView.overduepledgeGet,
   data: {province: 'all'},
   success: function (res) {
    var data = res.data;
    var timeArr=[];
    for(var i=0;i<data.list3060.length;i++){
        if(data.list3060[i] != null){
            timeArr.push((i+1)+'月');
        }else{
            data.list3060.splice(i,1);
            data.list6090.splice(i,1);
            data.list90up.splice(i,1);
            i--;
        }
    }
    option.xAxis[0].data = timeArr;
    option.series[0].data = data.list3060;
    option.series[1].data = data.list6090;
    option.series[2].data = data.list90up;
    myChart.setOption(option,true);
   }
});
