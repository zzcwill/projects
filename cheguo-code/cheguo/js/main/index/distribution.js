var chart, option_1, moduleType, args = comn.getArgs(),t;
moduleType = args["moduleType"];
chart = null;
var uId = args["uId"];

var fontSize=14;
var titlefontSize=30;
var backgroundColor='#fff';
var textColor='#000';
var y2=100;
var width=window.screen.width;
var height=window.screen.height;

if(args['type']=='fullScreen'){
  $('#searchDiv').addClass('hide');
  $('#fullScreenDiv,#tabDiv').addClass('hide');
  $('#chart').css('height',768 + 'px');
  $('.gray-bg,.ibox-content').css('backgroundColor','#1b1b1b');
  $('.wrapper').css('padding',0);
  $('.row').css('margin',0);
  backgroundColor = '#1b1b1b';
  textColor = '#fff';
  fontSize=30;
  titlefontSize=40;
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
    data: ['数量', '贷款额(元)'],
    textStyle:{
      color: textColor,
      fontSize: fontSize*0.8 
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
        fontSize: fontSize*0.8
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
  grid: { // 控制图的大小，调整下面这些值就可以，
    bottom: 105
  },
  yAxis: [{
    type: 'value',
    name: '数量',
    nameTextStyle:{
        fontSize: fontSize*0.8

      },
      axisLabel: {
        textStyle:{
          color: textColor,
          fontSize: fontSize*0.8

        }
      }
  }, {
    type: 'value',
    name: '贷款额(元)',
    nameTextStyle:{
        fontSize: fontSize*0.8

      },
      axisLabel: {
        textStyle:{
          color: textColor,
          fontSize: fontSize*0.8

        }
      }
  }],
  series: [{
    'name': '数量',
    'type': 'bar',
    data: []
  }, {
    'name': '贷款额(元)',
    'type': 'bar',
    yAxisIndex: 1,
    data: []
  }]
};
$("input[name=timelineLoanLaunchBegin]").getMonthDayFirst();
$("input[name=timelineLoanLaunchEnd]").getMonthDayLast();

$(function() {
  var dealerChart, switchDate_1;
  dealerChart = echarts.init($("#chart")[0], "shine");
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
		// var data_name = ['温州东区汽车服务有限公司',
		// '宁波汉津汽车服务有限公司', 
		// '杭州菲悦汽车服务有限公司', 
		// '吉林丽波二手车交易有限公司',
		// '宁波宇恒汽车服务有限公司',
		// '玉环宇财汽车贸易有限公司',
		// '英山县合兴汽车销售有限公司',
		// '玉环和谐二手车信息咨询服务部',
		// '重庆鼎典汽车贸易有限公司',
		// '丽水市剑卫汽车销售有限公司'
		// ];
		// var data_num = [108, 90, 41, 37, 34, 32, 32, 28, 28, 28];
		// var data_ammountSum = [998, 632.19, 377.8, 281.3, 301.4, 256, 255.54, 403.2 , 181.4, 179];
		// option_1.xAxis[0].data = data_name;
		// option_1.series[0].data = data_num;
  //       option_1.series[1].data = data_ammountSum;
        option_1.xAxis[0].data = res.data.name;
        option_1.series[0].data = res.data.num;
        option_1.series[1].data = res.data.ammountSum;
        var _data=[];
        for(var i=0;i<res.data.name.length;i++){
          var o={};
          o.name=res.data.name[i];
          o.num=res.data.num[i];
          o.ammountSum=res.data.ammountSum[i];
          _data.push(o);
        }
        $('#table').bootstrapTable({data: _data});
        $('#table').bootstrapTable('load', _data);
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
