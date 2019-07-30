var args = comn.getArgs(), fontSize = window.parent.fontSize, uId = window.parent.uId, dataState = window.parent.dataState;
var myChart = echarts.init($("#usedbar")[0], "shine"); //初始化地图 
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
			}
  },
  /*legend: {
		y: 'bottom',
	  data:['上期', '当期'],
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
  /*grid: {//配置图形距离边框的距离
  	y2:80,
  	x2: 60
  },*/
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
		name: '(百万元)',
		nameTextStyle: {
			fontSize:fontSize * 0.8
		},
		type : 'value',
		//max: 9000,
		//splitNumber:9,
		axisLabel: {
			textStyle: {
				color: '#fff',
				fontSize: fontSize
			},
			formatter: '{value}'
		}, 
	}],
	series : [{
      name:'贷款额',
      type:'bar',
      data:[2000, 8500, 3000, 4300, 2800, 7400, 3700, 4600, 2900, 5200, 2700, 6300, 3700, 2900, 4700, 3700, 5200, 3900, 4000, 5100, 3900, 2900, 3500, 1900, 6200, 3800, 4200]
  }]
};

var myChart2 = echarts.init($("#usedpie")[0], "shine"); //初始化地图 
option2 = {
  title : {
      text: '分期区域占比',
			x: 'right',
			y:20,
			textStyle: {
				color: '#FFF',
				fontSize: fontSize
			}
  },
  tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {d}%",
      textStyle: {
				fontSize: fontSize
			}
  },
  /*legend: {
		y: 'bottom',
	  data:['上期', '当期'],
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
  /*grid: {//配置图形距离边框的距离
  	y2:80,
  	x2: 60
  },*/
	series : [{
          name:'分期区域占比',
          type:'pie',
          radius : '70%',
          center : ['50%', '50%'],
          itemStyle : {
						normal : {
							label : {
								 formatter : function (params) {                         
									 return params.name+params.percent + '%'
								 },
                 textStyle:{
                  fontSize: fontSize * 0.8
                }
							},
							labelLine : {
								//show : false
							}
						},
					},
          data:[
          		{name:'江苏',value:4},
          		{name:'浙江',value:8},
          		{name:'山东',value:6},
          		{name:'江西',value:5},
          		{name:'黑龙江',value:2},
          		{name:'安徽',value:5},
          		{name:'辽宁',value:2},
          		{name:'湖北',value:2},
          		{name:'吉林',value:4},
          		{name:'湖南',value:5},
          		{name:'四川',value:5},
          		{name:'上海',value:5},
          		{name:'山西',value:2},
          		{name:'重庆',value:2},
          		{name:'贵州',value:5},
          		{name:'陕西',value:5},
          		{name:'云南',value:2},
          		{name:'广西',value:5},
          		{name:'河南',value:2},
          		{name:'内蒙古',value:4},
          		{name:'广东',value:3},
          		{name:'海南',value:5},
          		{name:'青海',value:2},
          		{name:'甘肃',value:4},
              {name:'福建',value:2},
              {name:'河北',value:2},
              {name:'天津',value:2}
          ]
      }
  ]
};
                    
comn.ajax({
   url: interUrl.dataView.creditcardGetAllByType,
   data: {type:2},
   success: function (res) {
      var data = res.data;
      var cityArr=[],barArr=[],piedata=[];
      for(var i=0;i<data.length;i++){
          if(data[i].provinceName){
            cityArr.push(data[i].provinceName);
            var amount = ((data[i].loanAmount ||'0')/100).toFixed(2);
            barArr.push(amount);
            if(i<10){
              piedata.push({name: data[i].provinceName,value: amount});
            }
          }
      }
      option.xAxis[0].data = cityArr;
      option.series[0].data = barArr;
      option2.series[0].data = piedata;
      myChart.setOption(option,true);           
      myChart2.setOption(option2,true);
   }
});

getByStype('1');
$('select[name=usedCardTime]').change(function(){
    var value=$(this).val();
    getByStype(value);
});
function getByStype(stype){
    comn.ajax({
       url: interUrl.dataView.creditcardGetByCategory,
       data: {type:2 ,stype: stype},
       success: function (res) {
        if(res.data){
            $('#amountSum').html(res.data[0].loanAmount);
            if(res.data.yearRate>0){
                $('#sameRatio').parent().find('.glyphicon').attr('class','glyphicon glyphicon-triangle-top').css('color','red');
            }else{
                $('#sameRatio').parent().find('.glyphicon').attr('class','glyphicon glyphicon-triangle-bottom').css('color','green');
            }
            if(res.data.monthRate>0){
                $('#ringRatio').parent().find('.glyphicon').attr('class','glyphicon glyphicon-triangle-top').css('color','red');
            }else{
                $('#ringRatio').parent().find('.glyphicon').attr('class','glyphicon glyphicon-triangle-bottom').css('color','green');
            }
            $('#sameRatio').html(Math.abs(res.data[0].yearRate));
            $('#ringRatio').html(Math.abs(res.data[0].monthRate));
        }
       }
    });
}
