var chart, option_1, args = comn.getArgs(), moduleType, fullDay, _fullDay, loanBusinessGroupIds, loanBusinessGroupId, loanBranchCompanyIds, loanBranchCompanyId,t;
chart = null;
moduleType = args["moduleType"];
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
  //$('#chart').css('height',height - 150 + 'px');
  $('.gray-bg,.ibox-content').css('backgroundColor','#1b1b1b');
  $('.wrapper').css('padding',0);
  $('.row').css('margin',0);
  backgroundColor = '#1b1b1b';
  textColor = '#fff';
  fontSize=30;
  titlefontSize=40;
  y2=150;
}

t=args["t"];
option_1 = {
  backgroundColor: backgroundColor,
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['数量', "贷款额"],
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
      name: '签单日期',
      boundaryGap: true,
      nameTextStyleL:{
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
      name: '签单数量',
      nameTextStyleL:{
        fontSize: fontSize
      },
      axisLabel: {
        textStyle:{
          color: textColor,
          fontSize: fontSize
        }
      }
    },
    {
      type: 'value',
      name: '贷款额',
      nameTextStyleL:{
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
      'name': '数量',
      'type': 'line',
      data: []
    }, {
      'name': '贷款额',
      'type': 'line',
      yAxisIndex: 1,
      data: []
    }
  ]
};
$("input[name=yearMonth]").val(nowMonth);
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
  switchDate_1 = function(date,moduleType) {
    return comn.ajax({
      url: interUrl.report.loanSignStatistic,
      data: $.extend($("#searchForm").values(),{
        yearMonth: date,
        moduleType: moduleType,
        uId: uId
      }),
      success: function(res) {
        chart.clear();
        option_1.xAxis[0].data = res.data.fullDay;
        option_1.series[0].data = res.data.num;
        option_1.series[1].data = res.data.ammountSum;
        var _data=[];
        for(var i=0;i<res.data.fullDay.length;i++){
          var o={};
          o.fullDay=res.data.fullDay[i];
          o.num=res.data.num[i];
          o.ammountSum=res.data.ammountSum[i];
          _data.push(o);
        }
        $('#table').bootstrapTable({data: _data});
        $('#table').bootstrapTable('load', _data);
        window.fullDay = res.data.fullDay;
        return chart.setOption(option_1);
      }
    });
  };

  if(args['type']=='fullScreen'){
    $("#searchForm").values(args);
    var signDate = $("input[name=yearMonth]").val();
    switchDate_1(signDate.substring(0,7),moduleType);
  }else{
    switchDate_1(nowMonth,moduleType);
  }

  
  $("#btn-search").click(function() {
    var signDate = $("input[name=yearMonth]").val();
    switchDate_1(signDate.substring(0,7),moduleType);
  });

  if(moduleType == 2){
    chart.on("click", function(data) { 
      _fullDay = window.fullDay[data.dataIndex];
      if (t=='mobile') {
        return;
        window.location.href="ranking.html?moduleType=2&reportType=1&timelineLoanSign=" + _fullDay + "&uId="+uId + "&t="+t
      }else{
        return comn.addTab({
          title: "业务组签单排名",
          href: "./Modal/main/index/ranking.html?moduleType=2&reportType=1&timelineLoanSign=" + _fullDay + "&uId="+uId + "&t="+t
        });
      }
    });
    
  }else if(moduleType == 3){
    chart.on("click",function(data){
      _fullDay = window.fullDay[data.dataIndex];
      if (t=='mobile') {
        return;
        window.location.href="branchRanking.html?moduleType=3&reportType=1&timelineLoanSign=" + _fullDay + "&uId="+uId + "&t="+t
      }else{
        return comn.addTab({
          title: "分公司签单排名",
          href: "./Modal/main/index/branchRanking.html?moduleType=3&reportType=1&timelineLoanSign=" + _fullDay + "&uId="+uId + "&t="+t
        });
      }
    })
  }

  $('#fullScreen').click(function(){
    var str=location.search +'&'+ $("#searchForm").serialize();
    window.open ('billAmount.html'+str+'&type=fullScreen','billAmountFull','height='+height+',width='+width+',top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
  });
  
});
