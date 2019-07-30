var option_1, args = comn.getArgs(), moduleType, fullDay, _fullDay,t;
moduleType = args["moduleType"];
var uId = args["uId"];

var fontSize=14;
var backgroundColor='#fff';
var textColor='#000';
var y2=100;
var width=window.screen.width;
var height=window.screen.height;

if(args['type']=='fullScreen'){
  $('#fullScreenDiv,#tabDiv,#searchDiv').addClass('hide');
  $('#chart').css('height',height - 150 + 'px');
  $('.gray-bg,.ibox-content').css('backgroundColor','#1b1b1b');
  $('.wrapper').css('padding',0);
  $('.row').css('margin',0);
  backgroundColor = '#1b1b1b';
  textColor = '#fff';
  fontSize=24;
  y2=150;
}

option_1 = {
  backgroundColor: backgroundColor,
  tooltip: {
    trigger: 'axis',
    textStyle:{
      color: textColor,
      fontSize: 24
    }
  },
  legend: {
    data: ['公司付款-银行付款', '公司付款-银行收件', '银行收件-银行放款'],
    textStyle:{
      color: textColor,
      fontSize: fontSize
    }
  },
  calculable: true,
  grid:{
    y2:y2
  },
  xAxis: [
    {
      type: 'category',
      name: '月份',
      boundaryGap: true,
      nameTextStyle:{
        fontSize: fontSize
      },
      axisLabel: {
        interval: 0,
        rotate:45,
        textStyle:{
          color: textColor,
          fontSize: fontSize
        }
      },
      data: []
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '天数',
      nameTextStyle:{
        fontSize: fontSize
      },
      axisLabel: {
        textStyle:{
          color: textColor,
          fontSize: fontSize
        }
      }
    }
  ],
  series: [
    {
      'name': '公司付款-银行付款',
      'type': 'line',
      data: []
    }, {
      'name': '公司付款-银行收件',
      'type': 'line',
      data: []
    }, {
      'name': '银行收件-银行放款',
      'type': 'line',
      data: []
    }
  ]
};
 $("input[name=timelineBankPayMonthBegin]").getMonthFirst();
$("input[name=timelineBankPayMonthEnd]").getMonthCur();
//选择年月的       startView: 3,   minView: 3, format: 'yyyymm',
$('.dateMonth').datetimepicker({
  format: 'yyyy-mm',
  weekStart: 1,
  autoclose: true,
  startView: 3,
  minView: 3,
  forceParse: false,
  language: 'zh-CN'
});

//选择年的       startView: 4,   minView: 4, format: 'yyyy',
$('.dateYear').datetimepicker({
  format: 'yyyy',
  weekStart: 1,
  autoclose: true,
  startView: 4,
  minView: 4,
  forceParse: false,
  language: 'zh-CN'
});

$(function() {
  var chart, switchDate_1;
  chart = echarts.init($("#chart")[0],"shine");
  chart.setOption(option_1);
  t=args['t'];
  switchDate_1 = function(date,moduleType,timelineBankPayMonthBegin,timelineBankPayMonthEnd) {
    return comn.ajax({
      url: interUrl.report.loanAmmountRotaryStatistic,
      data: $.extend($("#searchForm").values(),{
        year: date,
        moduleType: moduleType,
        timelineBankPayMonthBegin: timelineBankPayMonthBegin,
        timelineBankPayMonthEnd: timelineBankPayMonthEnd,
        uId: uId
      }),
      success: function(res) {
        chart.clear();
        // var _data={
        //   day:['2015-05', '2015-06', '2015-07', '2015-08', '2015-09', '2015-10', '2015-11', '2015-12', '2016-01', '2016-02', '2016-03', '2016-04'],
        //   timelineCompanyPayAndBankPaySum:[6.70,6.33,6.11,6.37,5.31,5.36,6.70,7.90,7.29,7.65,5.66,5.62],
        //   timelineCompanyPayAndContractReceiveSum:[3.32,3.32,3.32,3.32,2.35,2.68,3.12,3.32,3.45,3.86,2.83,2.57],
        //   timelineContractReceiveAndBankPaySum:[3.38,3.01,2.79,3.05,2.96,2.68,3.58,4.58,3.84,3.79,2.83,3.05]
        // }
        // option_1.xAxis[0].data = _data.day;
        // option_1.series[0].data = _data.timelineCompanyPayAndBankPaySum;
        // option_1.series[1].data = _data.timelineCompanyPayAndContractReceiveSum;
        // option_1.series[2].data = _data.timelineContractReceiveAndBankPaySum;
        // window.fullDay = _data.day;
        option_1.xAxis[0].data = res.data.day;
        option_1.series[0].data = res.data.timelineCompanyPayAndBankPaySum;
        option_1.series[1].data = res.data.timelineCompanyPayAndContractReceiveSum;
        option_1.series[2].data = res.data.timelineContractReceiveAndBankPaySum;
        var _data=[];
        for(var i=0;i<res.data.day.length;i++){
          var o={};
          o.day=res.data.day[i];
          o.timelineCompanyPayAndBankPaySum=res.data.timelineCompanyPayAndBankPaySum[i];
          o.timelineCompanyPayAndContractReceiveSum=res.data.timelineCompanyPayAndContractReceiveSum[i];
          o.timelineContractReceiveAndBankPaySum=res.data.timelineContractReceiveAndBankPaySum[i];
          _data.push(o);
        }
        $('#table').bootstrapTable({data: _data});
        $('#table').bootstrapTable('load', _data);
        window.fullDay = res.data.day;
        return chart.setOption(option_1);
      }
    });
  };

  if(args['type']=='fullScreen'){
    $("#searchForm").values(args);
    var timelineBankPayMonthBegin = $("input[name=timelineBankPayMonthBegin]").val();
    var timelineBankPayMonthEnd = $("input[name=timelineBankPayMonthEnd]").val();
    switchDate_1("",moduleType,timelineBankPayMonthBegin.substring(0,7),timelineBankPayMonthEnd.substring(0,7));
  }else{
    switchDate_1(year,moduleType);
  }
  
  
  if(moduleType == 2){
    chart.on("click", function(data) {
      _fullDay = window.fullDay[data.dataIndex];
      if (t=='mobile') {
        return;
        window.location.href="ranking.html?moduleType=2&reportType=4&yearMonth=" + _fullDay + "&uId="+uId + "&t="+t
      }else{
        return comn.addTab({
          title: "业务组资金回转率排名",
          href: "./Modal/main/index/ranking.html?moduleType=2&reportType=4&yearMonth=" + _fullDay + "&uId="+uId + "&t="+t
        });
      }
    });
  }else if(moduleType == 3){
    chart.on("click",function(data){
      _fullDay = window.fullDay[data.dataIndex];
      if (t=='mobile') {
        return;
        window.location.href="branchRanking.html?moduleType=3&reportType=4&yearMonth=" + _fullDay + "&uId="+uId + "&t="+t
      }else{
        return comn.addTab({
          title: "分公司资金回转率排名",
          href: "./Modal/main/index/branchRanking.html?moduleType=3&reportType=4&yearMonth=" + _fullDay + "&uId="+uId + "&t="+t
        });
      }
    })
  }
  $("#btn-search").click(function() {
    var timelineBankPayMonthBegin = $("input[name=timelineBankPayMonthBegin]").val();
    var timelineBankPayMonthEnd = $("input[name=timelineBankPayMonthEnd]").val();
    switchDate_1("",moduleType,timelineBankPayMonthBegin.substring(0,7),timelineBankPayMonthEnd.substring(0,7));
  });

  $('#fullScreen').click(function(){
    var str=location.search +'&'+ $("#searchForm").serialize();
    window.open ('fundAnalysis.html'+str+'&type=fullScreen','fundAnalysisFull','height='+height+',width='+width+',top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
  });
});
