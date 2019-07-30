var option_3,args = comn.getArgs(), t;
var uId = args["uId"];

var fontSize=14;
var titlefontSize=30;
var backgroundColor='#fff';
var textColor='#000';
var tooltopSize=14;

var width=window.screen.width;
var height=window.screen.height;

if(args['type']=='fullScreen'){
  $('#fullScreenDiv,#tabDiv').addClass('hide');
  $('#loanAudit').css('height',height - 150 + 'px');
  $('.gray-bg,.ibox-content').css('backgroundColor','#1b1b1b');
  $('.wrapper').css('padding',0);
  $('.row').css('margin',0);
  backgroundColor = '#1b1b1b';
  textColor = '#fff';
  fontSize=30;
  titlefontSize=40;
  tooltopSize=24;
}else{
  $('#loanAudit').css('height','700px');
}

option_3 = {
  backgroundColor: backgroundColor,
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)",
    textStyle:{
      fontSize: tooltopSize
    }
  },
  legend: {
    orient: 'vertical',
    x: 'left',
    data: ['办理中', '审批中', '付款中', '未放款'],
    textStyle:{
      color: textColor,
      fontSize: fontSize
    }
  },
  calculable: true,
  series: [
    {
      'name': '数据显示',
      'type': 'pie',
      'itemStyle': {
        'normal': {
          'label': {
            'show': true,
            textStyle: {
              fontSize: fontSize
            }
          },
          'labelLine': {
            'show': true,
            textStyle: {
              fontSize: fontSize
            }
          }
        },
        'emphasis': {
          'label': {
            'formatter': '{c}',
            'show': true,
            'position': 'center',
            'textStyle': {
              'fontSize': fontSize+10,
              'fontWeight': 'bold'
            }
          }
        }
      },
      radius: ['50%', '70%'],
      data: [
        {
          value: 230,
          name: '办理中'
        }, {
          value: 110,
          name: '审批中'
        }, {
          value: 190,
          name: '付款中'
        }, {
          value: 130,
          name: '未放款'
        }
      ]
    }
  ]
};

$(function() {
  var loanAuditChart;
  loanAuditChart = echarts.init($("#loanAudit")[0],"shine");
  loanAuditChart.setOption(option_3);
  t=args['t'];
  switchDate_3 = function(date) {
    return comn.ajax({
      url: interUrl.report.flowStatusStatistic,
      data: {
        uId: uId,
        moduleType: 1
      },
      success: function(res) {
        var arr, index;
        arr = res.data.num;
        var signNum = [];
        index = res.data.index;
        loanAuditChart.clear();
         for (var i = 0; i < index.length; i++) {
          if (index[i] == 0 ) {
            signNum.push({"name":'办理中',"value":arr[i]});
          }else if(index[i] == 1){
            signNum.push({"name":'审批中',"value":arr[i]});
          }else if(index[i] == 2){
            signNum.push({"name":'付款中',"value":arr[i]});
          }else if(index[i] == 3){
            signNum.push({"name":'未放款',"value":arr[i]});
          }
        };
        $('#table').bootstrapTable({data: signNum});
        $('#table').bootstrapTable('load', signNum);
        option_3.series[0].data = signNum;
        // option_3.series[0].data = [
        //   {
        //     value: arr[0],
        //     name: '办理中'
        //   }, {
        //     value: arr[1],
        //     name: '审批中'
        //   }, {
        //     value: arr[2],
        //     name: '付款中'
        //   }, {
        //     value: arr[3],
        //     name: '未放款'
        //   }
        // ];
        return loanAuditChart.setOption(option_3);
      }
    });
  };
  switchDate_3();
  loanAuditChart.on("click", function(data) {
    if (data.data.name=='办理中') {
      flowStatus=0;
    }else if(data.data.name=='审批中'){
      flowStatus=1;
    }else if(data.data.name=='付款中'){
      flowStatus=2;
    }else if(data.data.name=='未放款'){
      flowStatus=3;
    }
    if (t=='mobile') {
      return;
      window.location.href="trackingList.html?type=3&flowStatus="+flowStatus + "&uId="+uId + "&t="+t
    }else{
      return comn.addTab({
        title: "在办贷款跟踪详情",
        href: "./Modal/report/loanCostFlow/index.html?type=3&flowStatus="+flowStatus + "&uId="+uId + "&t="+t
      });
    }
  });

  $('#fullScreen').click(function(){
    var str=location.search;
    window.open ('tracking.html'+str+'&type=fullScreen','trackingFull','height='+height+',width='+width+',top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
  });
});
