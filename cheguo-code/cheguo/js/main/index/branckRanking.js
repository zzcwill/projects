var option_1, args = comn.getArgs(), moduleType, loanBranchCompanyIds, timelineLoanSign, loanBranchCompanyId, unPledgeInterval, reportType, yearMonth, t;
var uId = args["uId"];
moduleType = args["moduleType"];
reportType = args["reportType"];
timelineBankPay = args ["timelineBankPay"];
timelineLoanSign = args ["timelineLoanSign"];
unPledgeInterval = args ["unPledgeInterval"];
yearMonth = args ["yearMonth"];

var fontSize=14;
var titlefontSize=30;
var backgroundColor='#fff';
var textColor='#000';
var y2=100;
var width=window.screen.width;
var height=window.screen.height;
if(args['type']=='fullScreen'){
  $('#fullScreenDiv,#tabDiv').addClass('hide');
  $('#chart').css('height',height - 150 + 'px');
  $('.gray-bg,.ibox-content').css('backgroundColor','#1b1b1b');
  $('.wrapper').css('padding',0);
  $('.row').css('margin',0);
  backgroundColor = '#1b1b1b';
  textColor = '#fff';
  fontSize=30;
  titlefontSize=40;
  y2=150;
}else{
  $('#chart').css('height','700px');
}

option_1 = {
  backgroundColor: backgroundColor,
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['数量'],
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
      name: '业务组',
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
    }
  ],
  grid: { // 控制图的大小，调整下面这些值就可以，
    bottom: 105
  },
  yAxis: [
    {
      type: 'value',
      name: '数量',
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
      'type': 'bar',
      data: []
    }
  ]
};

if (reportType==1) {
    $("#amountTitle").html("分公司签单量排名")
  }else if(reportType==2){
    $("#amountTitle").html("分公司未抵押状况排名")
  }else if(reportType==3){
    $("#amountTitle").html("分公司银行放款量排名")
  }else if(reportType==4){
    $("#amountTitle").html("分公司资金回转率排名")
  }

$(function() {
  var chart, switchDate_1, switchDate_2;
  chart = echarts.init($("#chart")[0],"shine");
  chart.setOption(option_1);
  t=args['t'];
  switchDate_1 = function(date) {
    return comn.ajax({
      url: interUrl.report.loanSignRank,
      data: {
        yearMonth: date,
        type: 2,
        moduleType: moduleType,
        timelineLoanSign: timelineLoanSign,
        uId: uId
      },
      success: function(res) {
        chart.clear();
        option_1.xAxis[0].data = res.data.name;
        option_1.series[0].data = res.data.num;
        var _data=[];
        for(var i=0;i<res.data.name.length;i++){
          var o={};
          o.name=res.data.name[i];
          o.num=res.data.num[i];
          _data.push(o);
        }
        $('#table').bootstrapTable({data: _data});
        $('#table').bootstrapTable('load', _data);
        // option_1.series[0].data = res.data.ammountSum;
        window.loanBranchCompanyIds = res.data.branchCompanyId;
        return chart.setOption(option_1);
      }
    });
  };
  switchDate_2 = function(unPledgeInterval) {
    return comn.ajax({
      url: interUrl.report.unPledgeRank,
      data: {
        unPledgeInterval: unPledgeInterval,
        type: 2,
        moduleType: 3,
        uId: uId
      },
      success: function(res) {
        chart.clear();
        option_1.xAxis[0].data = res.data.name;
        option_1.series[0].data = res.data.num;
        var _data=[];
        for(var i=0;i<res.data.name.length;i++){
          var o={};
          o.name=res.data.name[i];
          o.num=res.data.num[i];
          _data.push(o);
        }
        $('#table').bootstrapTable({data: _data});
        $('#table').bootstrapTable('load', _data);
        // option_1.series[0].data = res.data.ammountSum;
        window.loanBranchCompanyIds = res.data.branchCompanyId;
        return chart.setOption(option_1);
      }
    });
  };
  switchDate_3 = function(date) {
    return comn.ajax({
      url: interUrl.report.bankPayRank,
      data: {
        yearMonth: date,
        type: 2,
        moduleType: moduleType,
        timelineBankPay: timelineBankPay,
        uId: uId
      },
      success: function(res) {
        chart.clear();
        option_1.xAxis[0].data = res.data.name;
        option_1.series[0].data = res.data.num;
        var _data=[];
        for(var i=0;i<res.data.name.length;i++){
          var o={};
          o.name=res.data.name[i];
          o.num=res.data.num[i];
          _data.push(o);
        }
        $('#table').bootstrapTable({data: _data});
        $('#table').bootstrapTable('load', _data);
        // option_1.series[0].data = res.data.ammountSum;
        window.loanBranchCompanyIds = res.data.branchCompanyId;
        return chart.setOption(option_1);
      }
    });
  };
  switchDate_4 = function(date) {
    return comn.ajax({
      url: interUrl.report.loanAmmountRotaryRank,
      data: {
        yearMonth: date,
        type: 2,
        moduleType: moduleType,
        timelineBankPay: timelineBankPay,
        uId: uId
      },
      success: function(res) {
        chart.clear();
        option_1.xAxis[0].data = res.data.name;
        option_1.series[0].data = res.data.num;
        var _data=[];
        for(var i=0;i<res.data.name.length;i++){
          var o={};
          o.name=res.data.name[i];
          o.num=res.data.num[i];
          _data.push(o);
        }
        $('#table').bootstrapTable({data: _data});
        $('#table').bootstrapTable('load', _data);
        // option_1.series[0].data = res.data.ammountSum;
        window.loanBranchCompanyIds = res.data.branchCompanyId;
        return chart.setOption(option_1);
      }
    });
  };

  // switchDate_1(timelineBankPay);
  // chart.on("click", function(data) {
  //   var loanBranchCompanyId = window.loanBranchCompanyIds[data.dataIndex];
  //   return window.parent.toUrl({
  //     url: "./Modal/main/index/ranking.html?type=1&loanBranchCompanyId="+loanBranchCompanyId+"&timelineLoanSign="+timelineLoanSign
  //   });
  // });
  if(moduleType==3){
    if(reportType==1){
      switchDate_1("");
      chart.on("click", function(data) {
        loanBranchCompanyId = window.loanBranchCompanyIds[data.dataIndex];
        if (t=='mobile') {
          return;
          window.location.href="ranking.html?moduleType=3&reportType=1&timelineLoanSign="+timelineLoanSign+"&loanBranchCompanyId="+loanBranchCompanyId + "&uId="+uId + "&t="+t
        }else{
          return comn.addTab({
            title: "业务组签单排名",
            href: "./Modal/main/index/ranking.html?moduleType=3&reportType=1&timelineLoanSign="+timelineLoanSign+"&loanBranchCompanyId="+loanBranchCompanyId + "&uId="+uId + "&t="+t
          });
        }
      });

    }else if(reportType==2){
      switchDate_2(unPledgeInterval); 
      chart.on("click", function(data) {
        loanBranchCompanyId = window.loanBranchCompanyIds[data.dataIndex];
        if (t=='mobile') {
          return;
          window.location.href="ranking.html?moduleType=3&reportType=2&unPledgeInterval="+unPledgeInterval+"&loanBranchCompanyId="+loanBranchCompanyId + "&uId="+uId + "&t="+t
        }else{
          return comn.addTab({
            title: "业务组未抵押状况排名",
            href: "./Modal/main/index/ranking.html?moduleType=3&reportType=2&unPledgeInterval="+unPledgeInterval+"&loanBranchCompanyId="+loanBranchCompanyId + "&uId="+uId + "&t="+t
          });
        }
      });
    }else if(reportType==3){
      switchDate_3("");
      chart.on("click", function(data) {
        loanBranchCompanyId = window.loanBranchCompanyIds[data.dataIndex];
        if (t=='mobile') {
          return;
          window.location.href="ranking.html?moduleType=3&reportType=3&timelineBankPay="+timelineBankPay+"&loanBranchCompanyId="+loanBranchCompanyId + "&uId="+uId + "&t="+t
        }else{
          return comn.addTab({
            title: "业务组银行放款排名",
            href: "./Modal/main/index/ranking.html?moduleType=3&reportType=3&timelineBankPay="+timelineBankPay+"&loanBranchCompanyId="+loanBranchCompanyId + "&uId="+uId + "&t="+t
          });
        }
      });
    }else if(reportType==4){
      switchDate_4(yearMonth);
      chart.on("click", function(data) {
        loanBranchCompanyId = window.loanBranchCompanyIds[data.dataIndex];
        if (t=='mobile') {
          return;
          window.location.href="ranking.html?moduleType=3&reportType=4&yearMonth="+yearMonth+"&loanBranchCompanyId="+loanBranchCompanyId + "&uId="+uId + "&t="+t
        }else{
          return comn.addTab({
            title: "业务组资金回转率排名",
            href: "./Modal/main/index/ranking.html?moduleType=3&reportType=4&yearMonth="+yearMonth+"&loanBranchCompanyId="+loanBranchCompanyId + "&uId="+uId + "&t="+t
          });
        }
      });
    }
  }

  $('#fullScreen').click(function(){
    var str=location.search;
    window.open ('branchRanking.html'+str+'&type=fullScreen','branchRankingFull','height='+height+',width='+width+',top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
  });

});
