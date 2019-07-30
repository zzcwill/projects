var GlobaData = null, uId, fontSize = window.parent.fontSize, uId = window.parent.uId, textColor = window.parent.textColor, y2 = 100, args = comn.getArgs(), moduleType = 1, dataState = window.parent.dataState;

option_2 = {
  //backgroundColor: backgroundColor,
  tooltip: {
    trigger: 'item',
	formatter: function(params){
      var myseries = option_2.series;
      var res =  '';
      res +='付款' + params.name + "未抵押：" + params.value[0] + '单';
      return res;
    },
    textStyle:{
      fontSize: fontSize
    }
  },
  title: {
    text: '总数量:',
    subtext: '0',
    textStyle:{
      color: textColor,
      //fontSize: titlefontSize,
      fontSize:fontSize 
    },
    'subtextStyle': {
      //'fontSize': titlefontSize,
      fontSize:fontSize,
      'fontWeight': 'bold',
      'color': "#FD6D6D"
    },
    x: 'center',
    y: 'center'
  },
  legend: {
    orient: 'vertical',
    x: 'left',
    data: ['0-15天', '15-30天', '30-60天', '60天以上'],
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
            show: true,
            textStyle: {
              fontSize: fontSize
            }
          },
          'labelLine': {
            'show': true,
            textStyle:{
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
          name: '0-15天'
        }, {
          value: 130,
          name: '15-30天'
        }, {
          value: 130,
          name: '30-60天'
        }, {
          value: 130,
          name: '60天以上'
        }
      ]
    }
  ]
};

$(function() {
  var diyaChart, switchDate_2;
  diyaChart = echarts.init($("#unMortgage")[0],"shine");
  diyaChart.setOption(option_2);

  t=args['t'];
  switchDate_2 = function(moduleType) {
    return comn.ajax({
      url: interUrl.report.unPledgeStatistic,
      data: {
        moduleType: moduleType,
        uId: uId
      },
      success: function(res) {
        var totalNum, numArr, index;
        numArr = res.data.num;
        totalNum = res.data.totalNum;
        index = res.data.index;
        diyaChart.clear();
        var signNum = [];
        var total = 0;
        if(dataState == 0){
          signNum.push({"name":'0-15天',"value": [4096]});
          signNum.push({"name":'15-30天',"value":[652]});
          signNum.push({"name":'30-60天',"value":[79]});
          option_2.title.subtext = 4827;
        }else{
          for (var i = 0; i < index.length; i++) {
            if (index[i] == 0 ) {
              signNum.push({"name":'0-15天',"value":[totalNum[i]/*,numArr[i]*/]});
            }else if(index[i] == 1){
              signNum.push({"name":'15-30天',"value":[totalNum[i]/*,numArr[i]*/]});
            }else if(index[i] == 2){
              signNum.push({"name":'30-60天',"value":[totalNum[i]/*,numArr[i]*/]});
            }else if(index[i] == 3){
              signNum.push({"name":'60天以上',"value":[totalNum[i]/*,numArr[i]*/]});
            }
            total += totalNum[i]
          };
          option_2.title.subtext = total;
        }
        option_2.series[0].data = signNum;
        return diyaChart.setOption(option_2);

      }
    });
  };

  switchDate_2(moduleType);
  var unPledgeStatistic = [];
  if (moduleType == 1) {
    
    diyaChart.on("click", function(data) {
      if (data.data.name=='0-15天') {
        unPledgeStatistic=0;
      }else if(data.data.name=='15-30天'){
        unPledgeStatistic=1;
      }else if(data.data.name=='30-60天'){
        unPledgeStatistic=2;
      }else if(data.data.name=='60天以上'){
        unPledgeStatistic=3;
      }
      if (t=='mobile') {
        return;
        window.location.href="unMortgageList.html?moduleType=1&unPledgeInterval="+unPledgeStatistic + "&uId="+uId + "&t="+t
      }else{
        return comn.addTab({
          title: "贷款详情",
          href: "./Modal/report/loanCostFlow/index.html?moduleType=1&unPledgeInterval="+unPledgeStatistic + "&uId="+uId + "&t="+t
        });
      }
    });
  }else if(moduleType == 2){
    diyaChart.on("click", function(data) {
      if (data.data.name=='0-15天') {
        unPledgeStatistic=0;
      }else if(data.data.name=='15-30天'){
        unPledgeStatistic=1;
      }else if(data.data.name=='30-60天'){
        unPledgeStatistic=2;
      }else if(data.data.name=='60天以上'){
        unPledgeStatistic=3;
      }
      if (t=='mobile') {
        return;
        window.location.href="ranking.html?moduleType=2&reportType=2&unPledgeInterval="+unPledgeStatistic + "&uId="+uId + "&t="+t
      }else{
        return comn.addTab({
          title: "业务组未抵押状况排名",
          href: "./Modal/main/index/ranking.html?moduleType=2&reportType=2&unPledgeInterval="+unPledgeStatistic + "&uId="+uId + "&t="+t
        });
      }
    });
  }else if(moduleType == 3){
    
    diyaChart.on("click", function(data) {
      if (data.data.name=='0-15天') {
        unPledgeStatistic=0;
      }else if(data.data.name=='15-30天'){
        unPledgeStatistic=1;
      }else if(data.data.name=='30-60天'){
        unPledgeStatistic=2;
      }else if(data.data.name=='60天以上'){
        unPledgeStatistic=3;
      }
      if (t=='mobile') {
        return;
        window.location.href="branchRanking.html?moduleType=3&reportType=2&unPledgeInterval="+unPledgeStatistic + "&uId="+uId + "&t="+t
      }else{
        return comn.addTab({
          title: "分公司未抵押状况排名",
          href: "./Modal/main/index/branchRanking.html?moduleType=3&reportType=2&unPledgeInterval="+unPledgeStatistic + "&uId="+uId + "&t="+t
        });
      }
    });
  }

  $('#fullScreen').click(function(){
    var str=location.search;
    window.open ('unMortgage.html'+str+'&type=fullScreen','unMortgageFull','height='+height+',width='+width+',top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
  });
  
});
