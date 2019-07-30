var option_1, yuan1, args = comn.getArgs(), moduleType, t;
var uId = args["uId"];
moduleType=args["moduleType"];

var fontSize=14;
var titlefontSize=30;
var backgroundColor='#fff';
var textColor='#000';

var width=window.screen.width;
var height=window.screen.height;
if(args['type']=='fullScreen'){
  $('#fullScreenDiv,#tabDiv').addClass('hide');
  $('#diya').css('height',768  + 'px');
  $('.gray-bg,.ibox-content').css('backgroundColor','#1b1b1b');
  $('.wrapper').css('padding',0);
  $('.row').css('margin',0);
  backgroundColor = '#1b1b1b';
  textColor = '#fff';
  fontSize=30;
  titlefontSize=40;
}else{
  $('#diya').css('height','700px');
}

option_2 = {
  backgroundColor: backgroundColor,
  tooltip: {
    trigger: 'item',
    formatter: function(params){
      var myseries = option_2.series;
      var res =  '';
      res +='放款' + params.name + "未抵押：" + params.value[0] + '单';
      return res;
    },
    textStyle:{
      fontSize: 24
    }
  },
  title: {
    text: '总数量:',
    subtext: '0',
    textStyle:{
      color: textColor,
      fontSize: titlefontSize
    },
    'subtextStyle': {
      'fontSize': titlefontSize,
      'fontWeight': 'bold',
      'color': "#FD6D6D"
    },
    x: 'center',
    y: 'center'
  },
  legend: {
    orient: 'vertical',
    x: 'left',
    data: ['0-15天', '15-30天', '30-45天','45-60天','60天以上'],
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
          color: function (params) {
            var colorArr = [];
            if (params.name == "0-15天") {
              colorArr.push("#58BE4E");
            } else if (params.name == "15-30天") {
              colorArr.push("#8FD02A")
            } else if (params.name == "30-45天") {
              colorArr.push("#EBD21D")
            } else if (params.name == "45-60天") {
              colorArr.push("#ED860E")
            } else if (params.name == "60天以上") {
              colorArr.push("#E63627")
            }
            return colorArr;
          },
          'label': {
            show: true,
            // position: 'center'
          },
          'labelLine': {
            'show': true
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
          name: '30-45天'
        },
        {
          value: 130,
          name: '45-60天'
        },
        {
          value: 130,
          name: '60天以上'
        }
      ]
    }
  ]
};

$(function() {
  var diyaChart, switchDate_2;
  diyaChart = echarts.init($("#diya")[0],"shine");
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
        var _data=[];
        // signNum.push({"name":'0-15天',"value": [4096]});
        // signNum.push({"name":'15-30天',"value":[652]});
        // signNum.push({"name":'30-60天',"value":[79]});
        for (var i = 0; i < index.length; i++) {
          if (index[i] == 0) {
            signNum.push({"name": '0-15天', "value": [totalNum[i], numArr[i]]});
            _data.push({"name":'0-15天','num': totalNum[i]});
          } else if (index[i] == 1) {
            signNum.push({"name": '15-30天', "value": [totalNum[i], numArr[i]]});
            _data.push({"name":'15-30天','num': totalNum[i]});
          } else if (index[i] == 2) {
            signNum.push({"name": '30-45天', "value": [totalNum[i], numArr[i]]});
            _data.push({"name":'30-45天','num': totalNum[i]});
          } else if (index[i] == 3) {
            signNum.push({"name": '45-60天', "value": [totalNum[i], numArr[i]]});
            _data.push({"name":'45-60天','num': totalNum[i]});
          } else if (index[i] == 4) {
            signNum.push({"name": '60天以上', "value": [totalNum[i], numArr[i]]});
            _data.push({"name":'60天以上','num': totalNum[i]});
          }
          total += totalNum[i];
        }
        option_2.series[0].data = signNum;
        option_2.title.subtext = total;
        $('#table').bootstrapTable({data: _data});
        $('#table').bootstrapTable('load', _data);
        //option_2.title.subtext = 4827;
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
      }else if(data.data.name=='30-45天'){
        unPledgeStatistic=2;
      }else if(data.data.name=='45-60天'){
        unPledgeStatistic=3;
      }else if(data.data.name=='60天以上'){
        unPledgeStatistic=4;
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
      }else if(data.data.name=='15-30天') {
        unPledgeStatistic = 1;
      }else if(data.data.name=='30-45天'){
        unPledgeStatistic=2;
      }else if(data.data.name=='45-60天'){
        unPledgeStatistic=3;
      }else if(data.data.name=='60天以上'){
        unPledgeStatistic=4;
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
      }else if(data.data.name=='30-45天'){
        unPledgeStatistic=2;
      }else if(data.data.name=='45-60天'){
        unPledgeStatistic=3;
      }else if(data.data.name=='60天以上'){
        unPledgeStatistic=4;
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
