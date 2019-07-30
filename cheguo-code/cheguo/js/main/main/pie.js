var GlobaData = null, uId, args = comn.getArgs(), fontSize = window.parent.fontSize, uId = window.parent.uId, dataState = window.parent.dataState;
var myChart = echarts.init($("#pie")[0], "shine"); //初始化地图 
var paramsData = window.parent.paramsData;
option = {
        title : {
        text: '逾期金额按贷款额分布',
        //subtext: '逾期金额按贷款额分布(本年)',
        x:'center',
        y: 10,
        textStyle: {
            fontSize: fontSize,
            color: '#FFF'
        }
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {d}%",
        textStyle:{
            fontSize: fontSize
        }
    },
    //color: ['#01BBBD', '#9F78EE', '#FFA944', '#F16767', '#005eaa'],
    legend: {
        x : 'center',
        y: '50',
        data:['0-7万  ','7-15万  ','15万以上'],
        textStyle:{
            color: '#FFF',
            fontSize: fontSize * 0.8
        }
    },
    calculable : true,
    series : [
        {
            name:'N1',
            type:'pie',
            radius : '25%',
            color: ['#01BBBD', '#9F78EE', '#FFA944', '#F16767', '#005eaa'],
            itemStyle : {
                normal : {
                    label : {
                         formatter : function (params) {                         
                             return params.percent + '%'
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
            center: ['18%', '50%'],
            data:[
                {value:335, name:'0-7万  '},
                {value:310, name:'7-15万  '},
                {value:1548, name:'15万以上'}
            ]
        },{
            name:'N2',
            type:'pie',
            radius : '25%',
            color: ['#01BBBD', '#9F78EE', '#FFA944', '#F16767', '#005eaa'],
            itemStyle : {
                normal : {
                    label : {
                         formatter : function (params) {                         
                             return params.percent + '%'
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
            center: ['50%', '50%'],
            data:[
                {value:335, name:'0-7万  '},
                {value:310, name:'7-15万  '},
                {value:3548, name:'15万以上'}
            ]
        },{
            name:'N3',
            type:'pie',
            radius : '25%',
            color: ['#01BBBD', '#9F78EE', '#FFA944', '#F16767', '#005eaa'],
        itemStyle : {
            normal : {
                label : {
                     formatter : function (params) {                         
                         return params.percent + '%'
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
            center: ['82%', '50%'],
            data:[
                {value:335, name:'0-7万  '},
                {value:310, name:'7-15万  '},
                {value:548, name:'15万以上'}
            ]
        }
    ]
};
                    
                    
myChart.setOption(option,true);
