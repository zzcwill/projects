var option_1, _data, fullDay, args = comn.getArgs(), moduleType,t;
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
  $('#zhexian').css('height',height - 150 + 'px');
  $('.gray-bg,.ibox-content').css('backgroundColor','#1b1b1b');
  $('.wrapper').css('padding',0);
  $('.row').css('margin',0);
  backgroundColor = '#1b1b1b';
  textColor = '#fff';
  fontSize= 24;
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
    data: ['客户数量', '贷款额(元)'],
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
      name: ' 发起时间',
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
    },
    {
      type: 'value',
      name: '贷款额(元)',
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
      'name': '客户数量',
      'type': 'line',
      data: []
    }, {
      'name': '贷款额(元)',
      'type': 'line',
      yAxisIndex: 1,
      data: []
    }
  ]
};


$("input.checkDate").getMonthCur();

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
var chart, switchDate_1;  
$(function() {

  chart = echarts.init($("#zhexian")[0],"shine");
  chart.setOption(option_1);
  t=args['t'];
  switchDate_1 = function(date,moduleType,businessType,businessName) {
    return comn.ajax({
      url: interUrl.report.statisticByMonth,
      data: $.extend($("#searchForm").values(),{
        yearMonth: date,
        moduleType: moduleType,
        businessType: businessType,
        uId: uId
      }),
      success: function(res) {
        chart.clear();
		//设置X轴时间
		option_1.xAxis[0].data = res.data.fullDay;
		/*option_1.xAxis[0].data = [
			'2016-04-01',
			'2016-04-02',
			'2016-04-03',
			'2016-04-04',
			'2016-04-05',
			'2016-04-06',
			'2016-04-07',
			'2016-04-08',
			'2016-04-09',
			'2016-04-10',
			'2016-04-11',
			'2016-04-12',
			'2016-04-13',
			'2016-04-14'
		];*/
    option_1.xAxis[0].name = businessName;
		// 设置客户量
		option_1.series[0].data = res.data.num;
		//option_1.series[0].data = [510, 280, 284, 319, 684, 680, 684, 599, 385, 349, 430, 606, 520, 320];
		// 设置贷款金额
		option_1.series[1].data = res.data.ammountSum;
		//option_1.series[1].data = [4346.11, 2499.10, 2564.76, 2872.22, 5903.21, 5775.30, 5637.10, 4963.06, 3227.08, 3186.69, 3577.26, 7899.13, 4634.28, 2662.15];
        window.fullDay = res.data.fullDay; 
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
        // chart.refresh();
        return chart.setOption(option_1);
      }

    });
  };
  
  if(args['type']=='fullScreen'){
    $("#searchForm").values(args);
    var businessType = $("select[name=businessType]").val();
    var businessName = $("select[name=businessType] option:selected").text();
    var yue = $("input.checkDate").val();
    switchDate_1(yue.substring(0,7),moduleType,businessType,businessName);
  }else{
    switchDate_1(nowMonth,moduleType,1,"发起日期");
  }
  
  $("select[name=businessType]").change(function(event) {
    // $(".checkDate").eq($(this).val()).show().siblings().hide();
    if($(this).val()==1){
      $(".checkDate").attr("name","timelineLoanLaunch");
    }else if($(this).val()==2){
      $(".checkDate").attr("name","timelineLoanSign");
    }else if($(this).val()==3){
      $(".checkDate").attr("name","timelineCompanyPay");
    }else if($(this).val()==4){
      $(".checkDate").attr("name","timelineBankPay");
    }
  });

  $("#btn-search").click(function() {
    // chart.dispos
    var businessType = $("select[name=businessType]").val();
    var businessName = $("select[name=businessType] option:selected").text();
    var yue = $("input.checkDate").val();
    if( yue == ""){
      switchDate_1(nowMonth,moduleType,businessType,businessName);
    }
    else{
      switchDate_1(yue.substring(0,7),moduleType,businessType,businessName);
    }
  });

  chart.on("click",function(data){
    // _data = JSON.stringify($("#searchForm").values());
    // window.parent.cache.emailList = _data;
    var businessType = $("select[name=businessType]").val();
    var _fullDay = window.fullDay[data.dataIndex];
    if(businessType==1){
      if (t=='mobile') {
        return;
        window.location.href="businessList.html?type=1&timelineLoanLaunch=" + _fullDay + "&uId="+uId + "&t="+t
      }else{
        return comn.addTab({
          title: "贷款详情",
          href: "./Modal/report/loanCostFlow/index.html?type=1&timelineLoanLaunch=" + _fullDay + "&uId="+uId + "&t="+t
        });
      }
    }else if(businessType==2){
      if (t=='mobile') {
        return;
        window.location.href="businessList.html?type=1&timelineLoanSign=" + _fullDay + "&uId="+uId + "&t="+t
      }else{
        return comn.addTab({
          title: "贷款详情",
          href: "./Modal/report/loanCostFlow/index.html?type=1&timelineLoanSign=" + _fullDay + "&uId="+uId + "&t="+t
        });
      }
    }else if(businessType==3){
      if (t=='mobile') {
        return;
        window.location.href="businessList.html?type=1&timelineCompanyPay=" + _fullDay + "&uId="+uId + "&t="+t
      }else{
        return comn.addTab({
          title: "贷款详情",
          href: "./Modal/report/loanCostFlow/index.html?type=1&timelineCompanyPay=" + _fullDay + "&uId="+uId + "&t="+t
        });
      }
    }else if(businessType==4){
      if (t=='mobile') {
        return;
        window.location.href="businessList.html?type=1&timelineBankPay=" + _fullDay + "&uId="+uId + "&t="+t
      }else{
        return comn.addTab({
          title: "贷款详情",
          href: "./Modal/report/loanCostFlow/index.html?type=1&timelineBankPay=" + _fullDay + "&uId="+uId + "&t="+t
        });
      }
    }
    
  });
  
  $('#fullScreen').click(function(){
    var str=location.search +'&'+ $("#searchForm").serialize();
    window.open ('business.html'+str+'&type=fullScreen','businessFull','height='+height+',width='+width+',top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
  });
  
});
