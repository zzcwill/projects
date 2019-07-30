var chart, args = comn.getArgs(), option_1, option_2, option_3, option_4, yuan1;
var uId = comn.user.uid;
chart = null;

yuan1 = null;

// 分公司级
option_1 = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['数量', "贷款额"]
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      name: '签单日期',
      boundaryGap: true,
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '签单数量'
    }
  ],
  series: [
    {
      'name': '数量',
      'type': 'line',
      data: [5, 20, 40, 10, 10, 20, 90, 200, 35, 24, 78, 23, 5, 20, 40, 10, 10, 20, 80, 35, 24, 78, 23, 5, 20, 40, 10, 10, 20, 100, 35, 24, 78, 23]
    }, {
      'name': '贷款额',
      'type': 'line',
      data: [1, 2, 3, 9, 34, 87, 1, 2, 3, 9, 34, 87, 1, 2, 3, 9, 34, 87, 1, 2, 3, 9, 34, 87]
    }
  ]
};

option_2 = {
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>放款{b} : {c}单，其中未上牌：{d}-{c}"
  },
  legend: {
    orient: 'vertical',
    x: 'left',
    data: ['0-15天', '15-30天', '30-60天', '60天以上']
  },
  calculable: true,
  series: [
    {
      'name': '数据显示',
      'type': 'pie',
      'itemStyle': {
        'normal': {
          'label': {
            show: true
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
              'fontSize': 30,
              'fontWeight': 'bold'
            }
          }
        }
      },
      radius: ['50%', '70%'],
      data: [
        {
          value: 230,
          value2: 580,
          name: '0-15天'
        }, {
          value: 130,
          value2: 500,
          name: '15-30天'
        }, {
          value: 130,
          value2: 480,
          name: '30-60天'
        }, {
          value: 130,
          value2: 380,
          name: '60天以上'
        }
      ]
    }
  ]
};


option_3 = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['数量', '贷款额']
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      name: '银行放款日期',
      boundaryGap: true,
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '数量'
    }
  ],
  series: [
    {
      'name': '数量',
      'type': 'line',
      data: [5, 20, 40, 10, 10, 20, 90, 200, 35, 24, 78, 23, 5, 20, 40, 10, 10, 20, 80, 35, 24, 78, 23, 5, 20, 40, 10, 10, 20, 100, 35, 24, 78, 23]
    }, {
      'name': '贷款额',
      'type': 'line',
      data: [1, 2, 3, 9, 34, 87, 1, 2, 3, 9, 34, 87, 1, 2, 3, 9, 34, 87, 1, 2, 3, 9, 34, 87]
    }
  ]
};

option_4 = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['公司付款-银行放款', '公司付款-银行收件', '银行收件-银行放款']
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      name: '月份',
      boundaryGap: true,
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '数量'
    }
  ],
  series: [
    {
      'name': '公司付款-银行放款',
      'type': 'line',
      data: [5, 20, 40, 10, 10, 20, 90, 200, 35, 24, 78, 23, 5, 20, 40, 10, 10, 20, 80, 35, 24, 78, 23, 5, 20, 40, 10, 10, 20, 100, 35, 24, 78, 23]
    }, {
      'name': '公司付款-银行收件',
      'type': 'line',
      data: [1, 2, 3, 9, 34, 87, 1, 2, 3, 9, 34, 87, 1, 2, 3, 9, 34, 87, 1, 2, 3, 9, 34, 87]
    }, {
      'name': '银行收件-银行放款',
      'type': 'line',
      data: [1, 100, 3, 9, 34, 87, 1, 10, 3, 90, 34, 87, 1, 2, 3, 9, 52, 87, 1, 2, 3, 9, 34, 87]
    }
  ]
};

$(function() {

  // 集团级
  var chart1, chart2, chart3, chart4, switchDate_1, switchDate_2, switchDate_3, switchDate_4;
  chart1 = echarts.init($("#chart1")[0]).setOption(option_1);
  chart2 = echarts.init($("#chart2")[0]).setOption(option_2);
  chart3 = echarts.init($("#chart3")[0]).setOption(option_3);
  chart4 = echarts.init($("#chart4")[0]).setOption(option_4);
  switchDate_1 = function(date) {
    return comn.ajax({
      url: interUrl.report.loanSignStatistic,
      data: {
        yearMonth: date,
        moduleType: 3,
        uId: uId
      },
      success: function(res) {
        chart1.clear();
        option_1.xAxis[0].data = res.data.day;
        option_1.series[0].data = res.data.num;
        option_1.series[1].data = res.data.ammountSum;
        return chart1.setOption(option_1);
      }
    });
  };
  switchDate_1(nowMonth);
    switchDate_2 = function() {
    return comn.ajax({
      url: interUrl.report.unPledgeStatistic,
      data: {
        moduleType: 3,
        uId: uId
      },
      success: function(res) {
        var totalNum, numArr;
        numArr = res.data.num;
        totalNum = res.data.totalNum;
        chart2.clear();
        option_2.series[0].data = [
          {
            value: numArr[0],
            name: '0-15天'
          }, {
            value: numArr[1],
            name: '15-30天'
          }, {
            value: numArr[2],
            name: '30-60天'
          }, {
            value: numArr[3],
            name: '60天以上'
          }
        ];
        return chart2.setOption(option_2);
      }
    });
  };
  switchDate_2();
  switchDate_3 = function(date) {
    return comn.ajax({
      url: interUrl.report.bankPayStatistic,
      data: {
        yearMonth: date,
        moduleType: 3,
        uId: uId
      },
      success: function(res) {
        chart3.clear();
        option_3.xAxis[0].data = res.data.day;
        option_3.series[0].data = res.data.num;
        option_3.series[1].data = res.data.ammountSum;
        return chart3.setOption(option_3);
      }
    });
  };
  switchDate_3(nowMonth);
  switchDate_4 = function(date) {
    return comn.ajax({
      url: interUrl.report.loanAmmountRotaryStatistic,
      data: {
        year: date,
        moduleType: 3,
        uId: uId
      },
      success: function(res) {
        chart4.clear();
        option_4.xAxis[0].data = res.data.day;
        option_4.series[0].data = res.data.timelineCompanyPayAndBankPaySum;
        option_4.series[1].data = res.data.timelineCompanyPayAndContractReceiveSum;
        option_4.series[2].data = res.data.timelineContractReceiveAndBankPaySum;
        return chart4.setOption(option_4);
      }
    });
  };
  switchDate_4(year);

  $("#curDate").text(nowMonth);
  // $("#num").click(function(e) {
  //   $(this).addClass("btn-primary").removeClass("btn-default").siblings().removeClass("btn-primary").addClass("btn-default");
  //   return yuan1(1);
  // });
  // $("#loanAmounu").click(function(e) {
  //   $(this).addClass("btn-primary").removeClass("btn-default").siblings().removeClass("btn-primary").addClass("btn-default");
  //   return yuan1(2);
  // });
  $("#date .minus").click(function() {
    var _text, date, o, text;
    text = $("#curDate").text().trim();
    o = moment(text, "YYYY年MM月");
    date = o.subtract(1, 'M');
    _text = date.format("YYYY年MM月");
    switchDate_1(date.format("YYYY-MM"));
    return $("#curDate").text(_text);
  });
  return $("#date .plus").click(function() {
    var _text, date, o, text;
    text = $("#curDate").text().trim();
    o = moment(text, "YYYY年MM月");
    date = o.add(1, 'M');
    _text = date.format("YYYY年MM月");
    switchDate_1(date.format("YYYY-MM"));
    return $("#curDate").text(_text);
  });

});
