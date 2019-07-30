var GlobaData = null, uId, args = comn.getArgs(), fontSize = window.parent.fontSize, uId = window.parent.uId, dataState = window.parent.dataState;
var myChart = echarts.init($("#line9_2")[0], "shine"); //初始化地图 
var paramsData = window.parent.paramsData;
option = {
   /*title: {
       text: "逾期占比率",
     //subtext: '逾期占比率',
       x: "center",
  y:10,
  textStyle: {
    color: '#FFF',
    fontSize: fontSize
  }
   },*/
   tooltip: {
       trigger: "item",
       formatter: "{a} <br/>{b} : {c}‰",
        textStyle:{
          fontSize: fontSize
        }
   },
   legend: {
       x: 'center',
       // y: '30',
       data: ["逾期N1占比", "逾期N2占比", "逾期N3占比"],
     textStyle: {
       color: '#FFF',
       fontSize: fontSize * 0.85
     }
   },
   xAxis: [{
           name: "月份",
           boundaryGap: true,
           nameTextStyle:{
              fontSize: fontSize
           },
           splitLine: {show: false},
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
    name: "‰",
    max: '7',
    nameTextStyle:{
        fontSize: fontSize
    },
    axisLabel: {
      textStyle: {
        fontSize: fontSize,
        color: '#FFF'
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
           name: "逾期N1占比",
           type: "line",
     symbolSize:10,
       itemStyle: {
         normal: {
           color: '#74CF42'
         }
       },
           data: [4.8, 4.6, 4.9, 4.5, 4.3, 4.4, 4.4, 4.4, 4.4, 4.1, 3.9, 3.7] 
       },
       {
           name: "逾期N2占比",
           type: "line",
     symbolSize:10,
       itemStyle: {
         normal: {
           color: '#AD3215'
         }
       },
           data: [2.1, 2.2, 1.9, 1.8, 1.7, 1.5, 1.4, 1.5, 1.5, 1.4, 1.5, 1.6] 
       },
       {
           name: "逾期N3占比",
           type: "line",
     symbolSize:10,
       itemStyle: {
         normal: {
           color: '#00A3A0'
         }
       },
           data: [0.9, 0.8, 0.6, 0.7, 0.7, 0.6, 0.5, 0.6, 0.5, 0.5, 0.5, 0.5] 
       }
   ]
};
                    
myChart.setOption(option,true);
