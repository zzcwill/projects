var GlobaData = null, uId, args = comn.getArgs(), fontSize = window.parent.fontSize, uId = window.parent.uId, dataState = window.parent.dataState, myChart = echarts.init($("#pie")[0], "shine"); //初始化地图 
option = {
    /*title : {
	text: '业务营收结构分布(本年)',
        //subtext: '业务分布',
        x:'center',
	y: 0,
	textStyle: {
		color: '#FFF',
		fontSize: fontSize
	}
    },*/
    color: ['#61C0DE', '#FAD75F', '#9BCA62', '#F16767', '#005eaa'],
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {d}%",
    	textStyle: {
    		fontSize: fontSize
    	}
    },
    legend: {
        x : 'center',
	   y: 'top',
        data:['N1  ','N2  ','N3'],
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
            magicType : {
                show: true, 
                type: ['pie', 'funnel']
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    calculableColor : '#fff',
    calculableHolderColor : '#fff',
    series : [{
            name:'逾期分布',
            type:'pie',
            x: '50%',               // for funnel
            max: 40,                // for funnel
            sort : 'ascending',     // for funnel
		itemStyle: {
		normal: {
			label: {
				textStyle:{
					fontSize: fontSize

					} 
				}
			}
		},
            data:[
                {value:60, name:'N1  '},
                {value:30, name:'N2  '},
                {value:10, name:'N3'}
            ]
        }
    ]
};
                    
myChart.setOption(option,true);
