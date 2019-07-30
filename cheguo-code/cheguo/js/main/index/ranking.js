var option_1, option_2, args = comn.getArgs(), timelineBankPay, timelineLoanSign, loanBusinessGroupIds, loanBusinessGroupId,loanBranchCompanyIds, loanBranchCompanyId, unPledgeInterval, moduleType, reportType,yearMonth,t;
//reportType 报表类型
timelineBankPay = args["timelineBankPay"]; 
timelineLoanSign = args["timelineLoanSign"]; 
loanBranchCompanyId = args["loanBranchCompanyId"]; 
loanBusinessGroupId = args["loanBusinessGroupId"]; 
unPledgeInterval = args["unPledgeInterval"]; 
unPledgeRank = args["unPledgeRank"]; 
moduleType = args["moduleType"];
reportType = args["reportType"]; 
yearMonth = args["yearMonth"]; 
var argDate = moment(yearMonth,"YYYY-MM"); //按照指定的年月字符串和格式解析出一个moment的日期对象
var firstDate = argDate.startOf("month").format("YYYY-MM-DD"); //通过startOf函数指定取月份的开始即第一天
var lastDate = argDate.endOf("month").format("YYYY-MM-DD"); //通过startOf函数指定取月份的末尾即最后一天
var uId = args["uId"];

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
  grid:{// 控制图X轴的大小，调整下面这些值就可以，
    y2:y2
  },
  xAxis: [
    {
      type: 'category',
      name: '业务组',
      boundaryGap: true,
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
  yAxis: [
    {
      type: 'value',
      name: '数量',
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
    $("#amountTitle").html("业务组签单量排名")
  }else if(reportType==2){
    $("#amountTitle").html("业务组未抵押状况排名")
  }else if(reportType==3){
    $("#amountTitle").html("业务组银行放款量排名")
  }else if(reportType==4){
    $("#amountTitle").html("业务组资金回转率排名")
  }



$(function() {
  var chart, switchDate_1;
  chart = echarts.init($("#chart")[0],"shine");
  chart.setOption(option_1);
  t=args['t'];
  switchDate_1 = function(date) {
    return comn.ajax({
      url: interUrl.report.loanSignRank,
      data: {
        yearMonth: date,
        type: 1,
        moduleType: moduleType,
        timelineLoanSign: timelineLoanSign,
        uId: uId,
        loanBranchCompanyId: loanBranchCompanyId,
        loanBusinessGroupId: loanBusinessGroupId
      },
      success: function(res) {
        chart.clear();
        option_1.xAxis[0].data = res.data.name;
        option_1.series[0].data = res.data.num;
        var _data=[];
        for(var i=0;i<res.data.name.length;i++){
          var o={};
          o.name=res.data.name[i];
          o.value=res.data.num[i];
          _data.push(o);
        }
        $('#table').bootstrapTable({data: _data});
        $('#table').bootstrapTable('load', _data);
        window.loanBusinessGroupIds = res.data.businessGroupId;
        window.loanBranchCompanyIds = res.data.branchCompanyId;
        return chart.setOption(option_1);
      }
    });
  };
  switchDate_2 = function(unPledgeInterval,moduleType) {
    return comn.ajax({
      url: interUrl.report.unPledgeRank,
      data: {
        unPledgeInterval: unPledgeInterval,
        type: 1,
        moduleType: moduleType,
        uId: uId,
        loanBranchCompanyId: loanBranchCompanyId,
        loanBusinessGroupId: loanBusinessGroupId
      },
      success: function(res) {
        chart.clear();
        option_1.xAxis[0].data = res.data.name;
        option_1.series[0].data = res.data.num;
        var _data=[];
        for(var i=0;i<res.data.name.length;i++){
          var o={};
          o.name=res.data.name[i];
          o.value=res.data.num[i];
          _data.push(o);
        }
        $('#table').bootstrapTable({data: _data});
        $('#table').bootstrapTable('load', _data);
        // option_2.series[1].data = res.data.ammountSum;
        window.loanBusinessGroupIds = res.data.businessGroupId;
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
        type: 1,
        moduleType: moduleType,
        timelineBankPay: timelineBankPay,
        uId: uId,
        loanBranchCompanyId: loanBranchCompanyId,
        loanBusinessGroupId: loanBusinessGroupId
      },
      success: function(res) {
        chart.clear();
        option_1.xAxis[0].data = res.data.name;
        option_1.series[0].data = res.data.num;
        var _data=[];
        for(var i=0;i<res.data.name.length;i++){
          var o={};
          o.name=res.data.name[i];
          o.value=res.data.num[i];
          _data.push(o);
        }
        $('#table').bootstrapTable({data: _data});
        $('#table').bootstrapTable('load', _data);
        // option_1.series[0].data = res.data.ammountSum;
        window.loanBusinessGroupIds = res.data.businessGroupId;
        window.loanBranchCompanyIds = res.data.branchCompanyId;
        return chart.setOption(option_1);
      }
    });
  };
  switchDate_4 = function(date) {
    return comn.ajax({
      url: interUrl.report.loanAmmountRotaryRank,
      data: {
        yearMonth: yearMonth,
        type: 1,
        moduleType: moduleType,
        timelineBankPay: timelineBankPay,
        uId: uId,
        loanBranchCompanyId: loanBranchCompanyId,
        loanBusinessGroupId: loanBusinessGroupId
      },
      success: function(res) {
        chart.clear();
        option_1.xAxis[0].data = res.data.name;
        option_1.series[0].data = res.data.num;
        var _data=[];
        for(var i=0;i<res.data.name.length;i++){
          var o={};
          o.name=res.data.name[i];
          o.value=res.data.num[i];
          _data.push(o);
        }
        $('#table').bootstrapTable({data: _data});
        $('#table').bootstrapTable('load', _data);
        // option_1.series[0].data = res.data.ammountSum;
        window.loanBusinessGroupIds = res.data.businessGroupId;
        window.loanBranchCompanyIds = res.data.branchCompanyId;
        return chart.setOption(option_1);
      }
    });
  };
  if(moduleType==2){
    if (reportType==1) {
      switchDate_1("",moduleType);
      chart.on("click", function(data) {
        loanBusinessGroupId = window.loanBusinessGroupIds[data.dataIndex];
        loanBranchCompanyId = window.loanBranchCompanyIds[data.dataIndex];
        if (t=='mobile') {
          return;
          window.location.href="businessList.html?moduleType=2&loanBusinessGroupId="+loanBusinessGroupId+"&timelineLoanSign="+timelineLoanSign + "&uId="+uId + "&t="+t
        }else{
          return comn.addTab({
            title: "贷款详情",
            href: "./Modal/report/loanCostFlow/index.html?loanBranchCompanyId="+loanBranchCompanyId+"&loanBusinessGroupId="+loanBusinessGroupId+"&timelineLoanSign="+timelineLoanSign + "&uId="+uId + "&t="+t
          });
        }
      });
    }else if(reportType==2){
      switchDate_2(unPledgeInterval,moduleType);
      chart.on("click", function(data) {
        loanBusinessGroupId = window.loanBusinessGroupIds[data.dataIndex];
        loanBranchCompanyId = window.loanBranchCompanyIds[data.dataIndex];
        if (t=='mobile') {
          return;
          window.location.href="businessList.html?moduleType=2&loanBusinessGroupId="+loanBusinessGroupId+"&unPledgeInterval="+unPledgeInterval + "&uId="+uId + "&t="+t
        }else{
          return comn.addTab({
            title: "贷款详情",
            href: "./Modal/report/loanCostFlow/index.html?loanBranchCompanyId="+loanBranchCompanyId+"&loanBusinessGroupId="+loanBusinessGroupId+"&unPledgeInterval="+unPledgeInterval + "&uId="+uId + "&t="+t
          });
        }
      });
    }else if(reportType==3){
      switchDate_3("",moduleType);
      chart.on("click", function(data) {
        var loanBusinessGroupId = window.loanBusinessGroupIds[data.dataIndex];
        var loanBranchCompanyId = window.loanBranchCompanyIds[data.dataIndex];
        if (t=='mobile') {
          return;
          window.location.href="businessList.html?moduleType=2&loanBusinessGroupId="+loanBusinessGroupId+"&timelineBankPay="+timelineBankPay + "&uId="+uId + "&t="+t
        }else{
          return comn.addTab({
            title: "贷款详情",
            href: "./Modal/report/loanCostFlow/index.html?loanBranchCompanyId="+loanBranchCompanyId+"&loanBusinessGroupId="+loanBusinessGroupId+"&timelineBankPay="+timelineBankPay + "&uId="+uId + "&t="+t
          });
        }
      });
    }else if(reportType==4){
      switchDate_4(yearMonth,moduleType);
      chart.on("click", function(data) {
        loanBusinessGroupId = window.loanBusinessGroupIds[data.dataIndex];
        loanBranchCompanyId = window.loanBranchCompanyIds[data.dataIndex];
        if (t=='mobile') {
          return;
          window.location.href="businessList.html?moduleType=2&loanBusinessGroupId="+loanBusinessGroupId+"&timelineBankPayBegin="+firstDate+"&timelineBankPayEnd="+lastDate + "&uId="+uId + "&t="+t
        }else{
          return comn.addTab({
            title: "贷款详情",
            href: "./Modal/report/loanCostFlow/index.html?loanBranchCompanyId="+loanBranchCompanyId+"&loanBusinessGroupId="+loanBusinessGroupId+"&timelineBankPayBegin="+firstDate+"&timelineBankPayEnd="+lastDate + "&uId="+uId + "&t="+t
          });
        }
      });
    }
    
  }else if(moduleType==3){
    if(reportType==1){
      switchDate_1("",moduleType);
      chart.on("click", function(data) {
        loanBusinessGroupId = window.loanBusinessGroupIds[data.dataIndex];
        loanBranchCompanyId = window.loanBranchCompanyIds[data.dataIndex];
        if (t=='mobile') {
          return;
          window.location.href="businessList.html?moduleType=3&loanBusinessGroupId="+loanBusinessGroupId+"&timelineLoanSign="+timelineLoanSign+"&loanBranchCompanyId="+loanBranchCompanyId + "&uId="+uId + "&t="+t
        }else{
          return comn.addTab({
            title: "贷款详情",
            href: "./Modal/report/loanCostFlow/index.html?loanBranchCompanyId="+loanBranchCompanyId+"&loanBusinessGroupId="+loanBusinessGroupId+"&timelineLoanSign="+timelineLoanSign+"&uId="+uId + "&t="+t
          });
        }
      });
    }else if(reportType==2){
      switchDate_2(unPledgeInterval,moduleType);
      chart.on("click", function(data) {
        loanBusinessGroupId = window.loanBusinessGroupIds[data.dataIndex];
        loanBranchCompanyId = window.loanBranchCompanyIds[data.dataIndex];
        if (t=='mobile') {
          return;
          window.location.href="businessList.html?moduleType=3&loanBusinessGroupId="+loanBusinessGroupId+"&unPledgeInterval="+unPledgeInterval+"&loanBranchCompanyId="+loanBranchCompanyId + "&uId="+uId + "&t="+t
        }else{
          return comn.addTab({
            title: "贷款详情",
            href: "./Modal/report/loanCostFlow/index.html?loanBranchCompanyId="+loanBranchCompanyId+"&loanBusinessGroupId="+loanBusinessGroupId+"&unPledgeInterval="+unPledgeInterval+"&uId="+uId + "&t="+t
          });
        }
      });
    }else if(reportType==3){
      switchDate_3("",moduleType);
      chart.on("click", function(data) {
        loanBusinessGroupId = window.loanBusinessGroupIds[data.dataIndex];
        loanBranchCompanyId = window.loanBranchCompanyIds[data.dataIndex];
        if (t=='mobile') {
          return;
          window.location.href="businessList.html?moduleType=3&loanBusinessGroupId="+loanBusinessGroupId+"&timelineBankPay="+timelineBankPay+"&loanBranchCompanyId="+loanBranchCompanyId + "&uId="+uId + "&t="+t
        }else{
          return comn.addTab({
            title: "贷款详情",
            href: "./Modal/main/index/businessList.html?moduleType=3&loanBusinessGroupId="+loanBusinessGroupId+"&timelineBankPay="+timelineBankPay+"&loanBranchCompanyId="+loanBranchCompanyId + "&uId="+uId + "&t="+t
          });
        }
      });
    }else if(reportType==4){
      switchDate_4(yearMonth,moduleType);
      chart.on("click", function(data) {console.log(data);
        loanBusinessGroupId = window.loanBusinessGroupIds[data.dataIndex];
        loanBranchCompanyId = window.loanBranchCompanyIds[data.dataIndex];
        if (t=='mobile') {
          return;
          window.location.href="businessList.html?moduleType=3&loanBusinessGroupId="+loanBusinessGroupId+"&loanBranchCompanyId="+loanBranchCompanyId+"&timelineBankPayBegin="+firstDate+"&timelineBankPayEnd="+lastDate + "&uId="+uId + "&t="+t
        }else{
          return comn.addTab({
            title: "贷款详情",
            href: "./Modal/main/index/businessList.html?moduleType=3&loanBusinessGroupId="+loanBusinessGroupId+"&loanBranchCompanyId="+loanBranchCompanyId+"&timelineBankPayBegin="+firstDate+"&timelineBankPayEnd="+lastDate + "&uId="+uId + "&t="+t
          });
        }
      });
    }
    
  }
  
  $('#fullScreen').click(function(){
    var str=location.search;
    window.open ('ranking.html'+str+'&type=fullScreen','rankingFull','height='+height+',width='+width+',top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
  });
  
});
