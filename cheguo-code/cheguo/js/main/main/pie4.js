var GlobaData = null, uId, args = comn.getArgs(), fontSize = window.parent.fontSize, uId = window.parent.uId, dataState = window.parent.dataState, myChart = echarts.init($("#pie4")[0], "shine"); //初始化地图 
var paramsData = window.parent.paramsData;
option = {
    title : {
    text: '业务分布',
        //subtext: '业务分布',
        x:'center',
    y: 0,
    textStyle: {
        color: '#FFF',
        fontSize: fontSize
    }
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
    textStyle: {
        fontSize: fontSize
    }
    },
    legend: {
        x : 'center',
    y: 'bottom',
        data:['保险代理  ','二手车信用卡分期  ','新车信用卡分期'],
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
            name:'业务分布',
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
                {value:83, name:'新车信用卡分期'},
                {value:6, name:'二手车信用卡分期  '},
                {value:11, name:'保险代理  '}
            ]
        }
    ]
};

comn.ajax({
   url: interUrl.dataView.distributionBusiness,
   data: {province: paramsData.cityName},
   success: function (res) {
    var data = res.data;
    var dataArr=[];
    for(var i=0;i<data.length;i++){
        option.series[0].data[i].value = data[i].loanCount;
    }
    myChart.setOption(option,true);
   }
});
