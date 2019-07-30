var GlobaData = null, uId, fontSize = window.parent.fontSize, uId = window.parent.uId, textColor = window.parent.textColor, y2 = 100, args = comn.getArgs(), moduleType = 1, dataState = window.parent.dataState;

option_1 = {
  tooltip: {
    trigger: 'axis',
    textStyle:{
      color: textColor,
      fontSize: fontSize
    }
  },
  legend: {
    data: ['数量', '贷款额(万元)'],
    textStyle:{
      color: textColor,
      fontSize: fontSize
    }
  },
  calculable: true,
  grid:{
    y2:y2
  },
  xAxis: [{
    type: 'category',
    name: '  车商',
    boundaryGap: true,
    nameTextStyle:{
        fontSize: fontSize
      },
    axisLabel: {
      interval: 0,
      rotate:30,
      textStyle:{
        color: textColor,
        fontSize: fontSize*0.5

      },
      formatter: function(value,index){
        if (value!=undefined) {
          var str = value.split(" ");
          if (str[0].length>10) {
            return str[0].substring(0,10)+"...";
          }else{
            return str[0];
          }
          
        }
      }
    },
    data: []
  }],
  yAxis: [{
    type: 'value',
    name: '数量',
    nameTextStyle:{
        fontSize: fontSize

      },
      axisLabel: {
        textStyle:{
          color: textColor,
          fontSize: fontSize

        }
      }
  }, {
    type: 'value',
    name: '贷款额(万元)',
    nameTextStyle:{
        fontSize: fontSize

      },
      axisLabel: {
        textStyle:{
          color: textColor,
          fontSize: fontSize

        }
      }
  }],
  series: [{
    'name': '数量',
    'type': 'bar',
    data: []
  }, {
    'name': '贷款额(万元)',
    'type': 'bar',
    yAxisIndex: 1,
    data: []
  }]
};
$("input[name=timelineLoanLaunchBegin]").getMonthDayFirst();
$("input[name=timelineLoanLaunchEnd]").getMonthDayLast();

$(function() {
  var dealerChart, switchDate_1;
  dealerChart = echarts.init($("#distribution")[0], "shine");
  dealerChart.setOption(option_1);
  t=args['t'];
  switchDate_1 = function(date, moduleType) {
    return comn.ajax({
      url: interUrl.report.dealerCompanystatistic,
      data: $.extend($("#searchForm").values(), {
        yearMonth: date,
        moduleType: 1,
        uId: uId
      }),
      success: function(res) {
        dealerChart.clear();
        if(dataState == 0){
          var data_name = ['温州东区汽车...',
            '宁波汉津汽车...', 
            '杭州菲悦汽车...', 
            '吉林丽波二手车交易...',
            '宁波宇恒汽车...',
            '玉环宇财汽车贸易...',
            '英山县合兴汽车销售...',
            '玉环和谐二手车信息咨询服务部',
            '重庆鼎典汽车贸易...',
            '丽水市剑卫汽车销售...'
          ];
          var data_num = [108, 90, 41, 37, 34, 32, 32, 28, 28, 28];
          var data_ammountSum = [998, 632.19, 377.8, 281.3, 301.4, 256, 255.54, 403.2 , 181.4, 179];
          option_1.xAxis[0].data = data_name;
          option_1.series[0].data = data_num;
          option_1.series[1].data = data_ammountSum;
        }else{
          option_1.xAxis[0].data = res.data.name;
          option_1.series[0].data = res.data.num;
          option_1.series[1].data = res.data.ammountSum;
        }
        return dealerChart.setOption(option_1);
      }
    });
  };

  if(args['type']=='fullScreen'){
    $("#searchForm").values(args);
    switchDate_1("");
  }else{
    switchDate_1(nowMonth);
  }
  

  $("#btn-search").click(function() {
    switchDate_1("");
  });

  dealerChart.on("click", function(data) {
    //var _data = JSON.stringify($("#searchForm").values());console.log(_data);
    // window.parent.cache.emailList = _data;
    var t1 = $("#searchForm").values().timelineLoanLaunchBegin;
    var t2 = $("#searchForm").values().timelineLoanLaunchEnd;
    var t3 = $("#searchForm").values().timelineLoanSignBegin;
    var t4 = $("#searchForm").values().timelineLoanSignEnd;
    var t5 = $("#searchForm").values().timelineCompanyPayBegin;
    var t6 = $("#searchForm").values().timelineCompanyPayEnd;
    var t7 = $("#searchForm").values().timelineBankPayBegin;
    var t8 = $("#searchForm").values().timelineBankPayEnd;
    if (t=='mobile') {
      return;
      window.location.href="distributionList.html?type=4&carDealerCompany=" + data.name + "&timelineLoanLaunchBegin=" + t1 + "&timelineLoanLaunchEnd=" + t2 + "&timelineLoanSignBegin=" + t3 + "&timelineLoanSignEnd=" + t4 + "&timelineCompanyPayBegin=" + t5 + "&timelineCompanyPayEnd=" + t6 + "&timelineBankPayBegin=" + t7 + "&timelineBankPayEnd=" + t8 + "&uId="+uId + "&t="+t
    }else{
      return comn.addTab({
        title: "车商客户贷款详情",
        href: "./Modal/report/loanCostFlow/index.html?type=4&carDealerCompany=" + data.name + "&timelineLoanLaunchBegin=" + t1 + "&timelineLoanLaunchEnd=" + t2 + "&timelineLoanSignBegin=" + t3 + "&timelineLoanSignEnd=" + t4 + "&timelineCompanyPayBegin=" + t5 + "&timelineCompanyPayEnd=" + t6 + "&timelineBankPayBegin=" + t7 + "&timelineBankPayEnd=" + t8 + "&uId="+uId + "&t="+t
      });
    }
  });

  $('#fullScreen').click(function(){
    var str=location.search +'&'+ $("#searchForm").serialize();
    window.open ('distribution.html'+str+'&type=fullScreen','distributionFull','height='+height+',width='+width+',top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
  });
});
