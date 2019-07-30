var GlobaData = null, uId, args = comn.getArgs(), fontSize = window.parent.fontSize, uId = window.parent.uId, dataState = window.parent.dataState;
var myChart = echarts.init($("#lineBar")[0], "shine"); //初始化地图 
var paramsData = window.parent.paramsData;
option = {
   /*title: {
       text: "贷款额",
       x: "center",
       y:10,
       textStyle: {
        fontSize: fontSize,
        color: '#FFF'
       }
   },*/
    tooltip : {
        trigger: 'axis',
        textStyle:{
            fontSize: fontSize
        }
    },
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    legend: {
        x: 'center',
        //y: '80',
        data:['2015年  ','2016年  ','同比(%)'],
        textStyle: {
            fontSize: fontSize,
            color: '#FFF'
        }
    },
    xAxis : [
        {
            type : 'category',
            nameTextStyle:{
            fontSize: fontSize
            },
            data : ['6月','7月','8月','9月','10月','11月','12月','1月','2月','3月','4月','5月'],
            axisLabel: {
                textStyle: {
                    fontSize: fontSize,
                    color: '#FFF'
                }
            }
        }
    ],
    yAxis : [{
            type : 'value',
            name : '百万元',
            nameTextStyle:{
                fontSize: fontSize * 0.8
            },
            axisLabel: {
                textStyle: {
                fontSize: fontSize,
                  color: '#FFF'
                }
            }
            //axisLabel : {
                //formatter: '{value} ml'
            //}
        },{
            type : 'value',
            name : '同比(%)',
            nameTextStyle: {
            fontSize: fontSize * 0.8
            },
            axisLabel: {
                textStyle: {
                    fontSize: fontSize,
                    color: '#FFF'
                }
            }
        }
    ],
    series : [{
            name:'2015年  ',
            type:'bar',
            data:[3.55, 4.07, 4.44, 4.38, 4.61, 5.41, 6.08, 9.19, 5.17, 5.74, 5.75, 6.15]
        },{
            name:'2016年  ',
            type:'bar',
            data:[6.25, 7.05, 7.67, 8.55, 8.48, 9.04, 12.16, 18.50, 7.56, 11.78, 12.09, 3.33]
        }, {
            name:'同比(%)',
            type:'line',
            yAxisIndex: 1,
            symbolSize:10,
            data:[/*194, 139, 141, 153, 167,*/ 176, 173, 173, 195, 184, 167, 200, 201.3, 146.1, 205, 210.1, 54.1]
        }
    ]
};

comn.ajax({
   url: interUrl.dataView.loaninfoGet,
   data: {province: paramsData.cityName},
   success: function (res) {
    var data = res.data;
    var timeArr=[];
    for(var i=0;i<data.loan2016.length;i++){
        if(data.loan2016[i] != null){
            timeArr.push((i+1)+'月');
            data.loan2016[i] = (data.loan2016[i]/100).toFixed(2);
            data.loan2015[i] = (data.loan2015[i]/100).toFixed(2);
        }else{
            data.loan2016.splice(i,1);
            data.loan2015.splice(i,1);
            data.rate2016.splice(i,1);
            i--;
        }
    }
    option.xAxis[0].data = timeArr;
    option.series[0].data = data.loan2015;
    option.series[1].data = data.loan2016;
    option.series[2].data = data.rate2016;
    myChart.setOption(option,true);
   }
});
getByStype('1');

$('select[name=loanTime]').change(function(){
    var value=$(this).val();
    getByStype(value);
});

function getByStype(stype){
    comn.ajax({
       url: interUrl.dataView.loaninfoGetByStype,
       data: {province: paramsData.cityName, stype: stype},
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
                    
