// alert(comn.user.uid);
function commonTodoList(){
    comn.ajax({
        url: interUrl.common.flowNodesNumber,
        success: function(res) {
            var html = "", _html = "";
            if (res.data.length == 0) {
                $("#flowNodeBox").addClass("hide");
                return false;
            }
            for (var i = 0; i < res.data.length; i++) {
                if (i < 10) {
                    html += ((i+1) % 5 == 0 ? "<div class='col-md-4  text-center text-relative'>" : "<div class='col-md-5 text-center text-relative'>")+"<a class='nodeCont' data-node='"+ res.data[i].nodeCode +"' data-flow='"+ res.data[i].flowType +"' data-href='./Modal/task/myTask/index.html?origin=staging'><div class='nodeIndex'>"+ res.data[i].nodeIndex +"</div><div class='nodeName'>"+ res.data[i].nodeName +"</div>"+ (res.data[i].duplicate === '1' ? "<div class='flowName'>"+ res.data[i].nodeDesc +"</div>" : '')+"</div></a>";
                } else {
                    _html += ((i+1) % 5 == 0 ? "<div class='col-md-4  text-center text-relative'>" : "<div class='col-md-5 text-center text-relative'>")+"<a class='nodeCont' data-node='"+ res.data[i].nodeCode +"' data-flow='"+ res.data[i].flowType +"' data-href='./Modal/task/myTask/index.html?origin=staging'><div class='nodeIndex'>"+ res.data[i].nodeIndex +"</div><div class='nodeName'>"+ res.data[i].nodeName +"</div>"+ (res.data[i].duplicate === '1' ? "<div class='flowName'>"+ res.data[i].nodeDesc +"</div>" : '')+"</div></a>";
                }
            };
            $("#flowNodes").html(html+"<div class='clearfix'></div>");
            $("#collapseExample").html(_html+"<div class='clearfix'></div>");
            if (0 < res.data.length < 11) {
                $("#flowNodeBox").removeClass("hide");
                $(".upDownBtn").addClass("hide");
            }
            if (res.data.length > 10) {
                $(".upDownBtn").removeClass("hide");
            }
        }
    });
}
commonTodoList();
function getNode(){
    comn.ajax({
        url: interUrl.common.flowGetNodes,
        success: function(res) {
            var html = "";
            var _o = res.data;
            for (var i = 0; i < _o.length; i++) {
                var o = _o[i].data;
                html += "<div class='flowNameLine'>"+ _o[i].flowName+"</div>";
                for (var j = 0; j < o.length; j++) {
                    html += "<div class='col-md-6 checkboxLabel'><label><input class='nodeCheckbox' type='checkbox' value='"+ o[j].nodeCode +"' "+(o[j].nodeDesc ==='1' ? 'checked' : '') +"/>"+ o[j].nodeName +"</label></div>";

                }
            }
            $("#shortcutSets_cont").html(html+"<div class='clearfix'></div>");
            if (res.data.length === 0) {
                $(".flowNodes_article").addClass("hide")
            } else {
                $(".flowNodes_article").removeClass("hide")
            }
        }
    })
};
getNode();
$(document).on("click", "#flowNodes a, #collapseExample a", function(){
    window.parent.cache.nodeName = $(this).attr("data-node");
    window.parent.cache.flowName = $(this).attr("data-flow");
    return comn.addTab({
        href: $(this).attr("data-href"),
        title: '我的任务'
    })
});
$(document).on("click", ".shortcutSets", function(){
    $("#shortcutSets").modal("show");
    getNode();
});
$(document).on("click", "#shortcutBtn", function(){
    var codes = "";
    $("#shortcutSets_cont").find($('input[type=checkbox]').not("input:checked")).each(function(){
        codes += "," + this.value;
    });
    if(codes.length>0)codes = codes.substr(1);
    comn.ajax({
        url: interUrl.common.flowSetNodes,
        data: {
            nodeCode: codes
        },
        success: function(res) {
            tip({content: '提交成功！'});
            $("#shortcutSets").modal("hide");
            commonTodoList(); //常用待办事项刷新
        }
    })
});
$(document).on("click", ".selectAll", function () {
    var el = ".nodeCheckbox";
    $(el).each(function(i, v){
        $(v).prop("checked", true)
    });
});
$(document).on("click", ".unSelect", function () {
    var el = ".nodeCheckbox";
    $(el).each(function(i, v){
        $(v).prop("checked", false)
    });
});
var option_1, option_2, option_3, option_4, option_sign, option_bankPay, option_rotary, yuan1, method, args = comn.getArgs(), moduleType, t, level, uId;
// method = args["method"]; console.log(method);

yuan1 = null;


option_1 = {
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        // orient: 'vertical',
        // x: 'right',
        // icon: "bar",
        data: ['客户数量', '贷款额']
    },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            name: '发起日期',
            boundaryGap: true,
            axisLabel: {
                interval: 0,
                rotate: 45
            },
            data: []
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '客户数量'
        },
        {
            type: 'value',
            name: '贷款额'
        }
    ],
    series: [
        {
            'name': '客户数量',
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

option_2 = {
    color: ["#58BE4E", "#8FD02A", "#EBD21D", "#ED860E", "#E63627"],
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            var myseries = option_2.series;
            var res = '';
            //for (var i = 0; i < myseries.length; i++) {
            res += '放款' + params.name + "未抵押：" + params.value[0] + '单，其中未上牌：' + params.value[1] + '单';
            //};
            return res;
        }
    },
    title: {
        text: '总数量:',
        subtext: '0',
        'subtextStyle': {
            'fontSize': 30,
            'fontWeight': 'bold',
            'color': "#FD6D6D"
        },
        x: 'center',
        y: 'center'
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data: ['0-15天', '15-30天', '30-45天', "45-60天", '60天以上']
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
                            'fontSize': 30,
                            'fontWeight': 'bold',
                            'color': "#FD6D6D"
                        }
                    }
                }
            },
            radius: ['50%', '70%'],
            data: []
        }
    ]
};

option_3 = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data: ['办理中', '审批中', '付款中', '未放款']
    },
    calculable: true,
    series: [
        {
            'name': '数据显示',
            'type': 'pie',
            'itemStyle': {
                'normal': {
                    'label': {
                        'show': true
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
            data: []
        }
    ]
};

option_4 = {
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        // orient: 'vertical',
        // x: 'right',
        data: ['数量', '贷款额(元)']
    },
    calculable: true,
    xAxis: [{
        type: 'category',
        name: '车商',
        boundaryGap: true,
        axisLabel: {
            interval: 0,
            rotate: 45,
            formatter: function (value, index) {
                if (value != undefined) {
                    var str = value.split(" ");
                    if (str[0].length > 10) {
                        return str[0].substring(0, 10) + "...";
                    } else {
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
    yAxis: [
        {
            type: 'value',
            name: '数量'
        },
        {
            type: 'value',
            name: '贷款额'
        }
    ],
    series: [
        {
            'name': '数量',
            'type': 'bar',
            data: []
        }, {
            'name': '贷款额(元)',
            'type': 'bar',
            yAxisIndex: 1,
            data: []
        }
    ]
};

option_sign = {
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
            axisLabel: {
                interval: 0,
                rotate: 45
            },
            data: []
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '签单数量'
        },
        {
            type: 'value',
            name: '贷款额'
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

option_bankPay = {
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
            name: '放款日期',
            boundaryGap: true,
            axisLabel: {
                interval: 0,
                rotate: 45
            },
            data: []
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '数量'
        },
        {
            type: 'value',
            name: '贷款额'
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

option_rotary = {
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['公司付款-银行付款', '公司付款-银行收件', '银行收件-银行放款']
    },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            name: '月份',
            boundaryGap: true,
            axisLabel: {
                interval: 0,
                rotate: 45
            },
            data: []
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
// var hrefs = $("#side-menu").find("li ul li");
// for (var i = hrefs.length - 1; i >= 0; i--) {
//   var href= hrefs[i].children('a').attr('href');
//   console.log(href);
// };
var chart1, chart2, chart3, chart4, switchDate_1, switchDate_2, switchDate_3, switchDate_4, switchDate_sign, switchDate_un, switchDate_bankPay, switchDate_rotary, switchDate_sign2, switchDate_un2, switchDate_bankPay2, switchDate_rotary2;
function levelReport() {
    if(level == '10' || level == '20'){    //个人级 默认主级
    $("#branchCompany,#groupCompany").hide();
    $("#personal").show();
    // 首页报表全部显示
    switchDate_1(interUrl.report.statisticByMonth, nowMonth, 1);
    switchDate_2(interUrl.report.unPledgeStatistic, 1);
    switchDate_3(interUrl.report.flowStatusStatistic, 1);
    switchDate_4(interUrl.report.dealerCompanystatistic, nowMonth, 1);
    }else if(level == '30'){    //分公司级
    $("#personal,#groupCompany").hide();
    $("#branchCompany").show();
    switchDate_sign(interUrl.report.loanSignStatistic, nowMonth, 2);
    switchDate_un(interUrl.report.unPledgeStatistic, 2);
    switchDate_bankPay(interUrl.report.bankPayStatistic, nowMonth, 2);
    switchDate_rotary(interUrl.report.loanAmmountRotaryStatistic, year, 2);
    }else if(level == '40'){   //集团级
      $("#personal,#branchCompany").hide();
    $("#groupCompany").show();
    switchDate_sign2(interUrl.report.loanSignStatistic, nowMonth, 3);
    switchDate_un2(interUrl.report.unPledgeStatistic, 3);
    switchDate_bankPay2(interUrl.report.bankPayStatistic, nowMonth, 3);
    switchDate_rotary2(interUrl.report.loanAmmountRotaryStatistic, year, 3);
    }else if(level == '50'){
      $("#branchCompany,#groupCompany, #personal").hide();
    }
}
function loadReport() {
    $.ajax({
        url: interUrl.basic + interUrl.user.getUser,
        type: "POST",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (typeof data === "string") {
                data = JSON.parse(data);
            }
            if (data.code === 30000) {
                //return location.href = "/loan/index.html";
            } else if (data.code === 20000) {
                /*$("#dialogTip").nameValues({
                 content: data.message
                 });*/
                //return $("#dialogTip").modal("show");
            } else {
                user = data.data;
                uId = user.uid;
                level = user.level;
                levelReport();
            }
        }
    });
}
switchDate_1 = function (url, date, moduleType) {
    return comn.ajax({
        url: url,
        data: {
            yearMonth: date,
            moduleType: moduleType,
            uId: uId
        },
        success: function (res) {
            chart1.clear();
            option_1.xAxis[0].data = res.data.fullDay;
            option_1.series[0].data = res.data.num;
            option_1.series[1].data = res.data.ammountSum;
            return chart1.setOption(option_1);
        }
    });
};
//switchDate_1(interUrl.report.statisticByMonth,nowMonth,1);
switchDate_2 = function (url, moduleType) {
    return comn.ajax({
        url: url,
        data: {
            moduleType: moduleType,
            uId: uId
        },
        success: function (res) {
            var totalNum, numArr, index;
            numArr = res.data.num;
            totalNum = res.data.totalNum;
            var signNum = [];
            var total = 0;
            index = res.data.index;
            chart2.clear();
            for (var i = 0; i < index.length; i++) {
                if (index[i] == 0) {
                    signNum.push({"name": '0-15天', "value": [totalNum[i], numArr[i]]});
                } else if (index[i] == 1) {
                    signNum.push({"name": '15-30天', "value": [totalNum[i], numArr[i]]});
                } else if (index[i] == 2) {
                    signNum.push({"name": '30-45天', "value": [totalNum[i], numArr[i]]});
                } else if (index[i] == 3) {
                    signNum.push({"name": '45-60天', "value": [totalNum[i], numArr[i]]});
                } else if (index[i] == 4) {
                    signNum.push({"name": '60天以上', "value": [totalNum[i], numArr[i]]});
                }
                total += totalNum[i];
            }
            ;
            option_2.series[0].data = signNum;
            option_2.title.subtext = total;
            return chart2.setOption(option_2);
        }
    });
};
//switchDate_2(interUrl.report.unPledgeStatistic,1);
switchDate_3 = function (url, moduleType) {
    return comn.ajax({
        url: url,
        data: {
            moduleType: moduleType,
            uId: uId
        },
        success: function (res) {
            var arr, index;
            arr = res.data.num;
            var signNum = [];
            index = res.data.index;
            chart3.clear();
            for (var i = 0; i < index.length; i++) {
                if (index[i] == 0) {
                    signNum.push({"name": '办理中', "value": arr[i]});
                } else if (index[i] == 1) {
                    signNum.push({"name": '审批中', "value": arr[i]});
                } else if (index[i] == 2) {
                    signNum.push({"name": '付款中', "value": arr[i]});
                } else if (index[i] == 3) {
                    signNum.push({"name": '未放款', "value": arr[i]});
                }
            }
            ;
            option_3.series[0].data = signNum;
            return chart3.setOption(option_3);
        }
    });
};
//switchDate_3(interUrl.report.flowStatusStatistic,1);
switchDate_4 = function (url, date, moduleType) {
    return comn.ajax({
        url: url,
        data: {
            yearMonth: date,
            moduleType: moduleType,
            uId: uId
        },
        success: function (res) {
            chart4.clear();
            option_4.xAxis[0].data = res.data.name;
            option_4.series[0].data = res.data.num;
            option_4.series[1].data = res.data.ammountSum;
            return chart4.setOption(option_4);
        }
    });
};
//switchDate_4(interUrl.report.dealerCompanystatistic,nowMonth,1);

switchDate_sign = function (url, date, moduleType) {
    return comn.ajax({
        url: url,
        data: {
            yearMonth: date,
            moduleType: moduleType,
            uId: uId
        },
        success: function (res) {
            chartB1.clear();
            option_sign.xAxis[0].data = res.data.fullDay;
            option_sign.series[0].data = res.data.num;
            option_sign.series[1].data = res.data.ammountSum;
            window.fullDay = res.data.fullDay;
            return chartB1.setOption(option_sign);
        }
    });
};
switchDate_un = function (url, moduleType) {
    return comn.ajax({
        url: url,
        data: {
            moduleType: moduleType,
            uId: uId
        },
        success: function (res) {
            var totalNum, numArr, index;
            numArr = res.data.num;
            totalNum = res.data.totalNum;
            var signNum = [];
            index = res.data.index;
            var total = 0;
            chartB2.clear();
            for (var i = 0; i < index.length; i++) {
                if (index[i] == 0) {
                    signNum.push({"name": '0-15天', "value": [totalNum[i], numArr[i]]});
                } else if (index[i] == 1) {
                    signNum.push({"name": '15-30天', "value": [totalNum[i], numArr[i]]});
                } else if (index[i] == 2) {
                    signNum.push({"name": '30-45天', "value": [totalNum[i], numArr[i]]});
                } else if (index[i] == 3) {
                    signNum.push({"name": '45-60天', "value": [totalNum[i], numArr[i]]});
                } else if (index[i] == 4) {
                    signNum.push({"name": '60天以上', "value": [totalNum[i], numArr[i]]});
                }
                total += totalNum[i];
            }
            ;
            option_2.series[0].data = signNum;
            option_2.title.subtext = total;
            return chartB2.setOption(option_2);
        }
    });
};
switchDate_bankPay = function (url, date, moduleType) {
    return comn.ajax({
        url: url,
        data: {
            yearMonth: date,
            moduleType: moduleType,
            uId: uId
        },
        success: function (res) {
            chartB3.clear();
            option_bankPay.xAxis[0].data = res.data.fullDay;
            option_bankPay.series[0].data = res.data.num;
            option_bankPay.series[1].data = res.data.ammountSum;
            window.fullDay = res.data.fullDay;
            return chartB3.setOption(option_bankPay);
        }
    });
};

switchDate_rotary = function (url, date, moduleType) {
    return comn.ajax({
        url: url,
        data: {
            year: date,
            moduleType: moduleType,
            uId: uId
        },
        success: function (res) {
            chartB4.clear();
            option_rotary.xAxis[0].data = res.data.day;
            option_rotary.series[0].data = res.data.timelineCompanyPayAndBankPaySum;
            option_rotary.series[1].data = res.data.timelineCompanyPayAndContractReceiveSum;
            option_rotary.series[2].data = res.data.timelineContractReceiveAndBankPaySum;
            window.fullDay = res.data.day;
            return chartB4.setOption(option_rotary);
        }
    });
};
switchDate_sign2 = function (url, date, moduleType) {
    return comn.ajax({
        url: url,
        data: {
            yearMonth: date,
            moduleType: moduleType,
            uId: uId
        },
        success: function (res) {
            chartG1.clear();
            option_sign.xAxis[0].data = res.data.fullDay;
            option_sign.series[0].data = res.data.num;
            option_sign.series[1].data = res.data.ammountSum;
            window.fullDay = res.data.fullDay;
            return chartG1.setOption(option_sign);
        }
    });
};
switchDate_un2 = function (url, moduleType) {
    return comn.ajax({
        url: url,
        data: {
            moduleType: moduleType,
            uId: uId
        },
        success: function (res) {
            var totalNum, numArr, index;
            numArr = res.data.num;
            totalNum = res.data.totalNum;
            var signNum = [];
            var total = 0;
            index = res.data.index;
            chartG2.clear();
            for (var i = 0; i < index.length; i++) {
                if (index[i] == 0) {
                    signNum.push({"name": '0-15天', "value": [totalNum[i], numArr[i]]});
                } else if (index[i] == 1) {
                    signNum.push({"name": '15-30天', "value": [totalNum[i], numArr[i]]});
                } else if (index[i] == 2) {
                    signNum.push({"name": '30-45天', "value": [totalNum[i], numArr[i]]});
                } else if (index[i] == 3) {
                    signNum.push({"name": '45-60天', "value": [totalNum[i], numArr[i]]});
                } else if (index[i] == 4) {
                    signNum.push({"name": '60天以上', "value": [totalNum[i], numArr[i]]});
                }
                total += totalNum[i];
            }
            ;
            option_2.series[0].data = signNum;
            option_2.title.subtext = total;
            return chartG2.setOption(option_2);
        }
    });
};
switchDate_bankPay2 = function (url, date, moduleType) {
    return comn.ajax({
        url: url,
        data: {
            yearMonth: date,
            moduleType: moduleType,
            uId: uId
        },
        success: function (res) {
            chartG3.clear();
            option_bankPay.xAxis[0].data = res.data.fullDay;
            option_bankPay.series[0].data = res.data.num;
            option_bankPay.series[1].data = res.data.ammountSum;
            window.fullDay = res.data.fullDay;
            return chartG3.setOption(option_bankPay);
        }
    });
};

switchDate_rotary2 = function (url, date, moduleType) {
    return comn.ajax({
        url: url,
        data: {
            year: date,
            moduleType: moduleType,
            uId: uId
        },
        success: function (res) {
            chartG4.clear();
            option_rotary.xAxis[0].data = res.data.day;
            option_rotary.series[0].data = res.data.timelineCompanyPayAndBankPaySum;
            option_rotary.series[1].data = res.data.timelineCompanyPayAndContractReceiveSum;
            option_rotary.series[2].data = res.data.timelineContractReceiveAndBankPaySum;
            window.fullDay = res.data.day;
            return chartG4.setOption(option_rotary);
        }
    });
};

$(function () {
    t = args['t'];

    if (t == "mobile") {
        uId = args["uId"];
        level = args["level"];
        levelReport();
    } else {
        loadReport();
    }

    chart1 = echarts.init($("#chart1")[0], "shine");
    chart1.setOption(option_1);
    chart2 = echarts.init($("#chart2")[0], "shine");
    chart2.setOption(option_2);
    chart3 = echarts.init($("#chart3")[0], "shine");
    chart3.setOption(option_3);
    chart4 = echarts.init($("#chart4")[0], "shine");
    chart4.setOption(option_4);
    chartB1 = echarts.init($("#chartB1")[0], "shine");
    chartB1.setOption(option_1);
    chartB2 = echarts.init($("#chartB2")[0], "shine");
    chartB2.setOption(option_2);
    chartB3 = echarts.init($("#chartB3")[0], "shine");
    chartB3.setOption(option_3);
    chartB4 = echarts.init($("#chartB4")[0], "shine");
    chartB4.setOption(option_4);
    chartG1 = echarts.init($("#chartG1")[0], "shine");
    chartG1.setOption(option_1);
    chartG2 = echarts.init($("#chartG2")[0], "shine");
    chartG2.setOption(option_2);
    chartG3 = echarts.init($("#chartG3")[0], "shine");
    chartG3.setOption(option_3);
    chartG4 = echarts.init($("#chartG4")[0], "shine");
    chartG4.setOption(option_4);


    // $("#num").click(function(e) {
    //   $(this).addClass("btn-primary").removeClass("btn-default").siblings().removeClass("btn-primary").addClass("btn-default");
    //   return yuan1(1);
    // });
    // $("#loanAmounu").click(function(e) {
    //   $(this).addClass("btn-primary").removeClass("btn-default").siblings().removeClass("btn-primary").addClass("btn-default");
    //   return yuan1(2);
    // });

    $("#curDate0").text(nowMonth);
    $("#curDate0").prev(".minus").click(function () {
        var _text, date, o, text;
        text = $("#curDate0").text().trim();
        o = moment(text, "YYYY年MM月");
        date = o.subtract(1, 'M');
        _text = date.format("YYYY-MM");
        // switchDate_1(date.format("YYYY-MM"));
        switchDate_1(interUrl.report.statisticByMonth, _text, 1);
        return $("#curDate0").text(_text);

    });
    $("#curDate0").next(".plus").click(function () {
        var _text, date, o, text;
        text = $("#curDate0").text().trim();
        o = moment(text, "YYYY年MM月");
        date = o.add(1, 'M');
        _text = date.format("YYYY-MM");
        switchDate_1(interUrl.report.statisticByMonth, _text, 1);
        return $("#curDate0").text(_text);
    });
    // return $("#btnR0").click(function() {
    //   switchDate_1(interUrl.report.statisticByMonth,$("#curDate0").text(),1);
    // });

    $("#curDate1").text(nowMonth);
    $("#curDate1").prev(".minus").click(function () {
        var _text, date, o, text;
        text = $("#curDate1").text().trim();
        o = moment(text, "YYYY年MM月");
        date = o.subtract(1, 'M');
        _text = date.format("YYYY-MM");
        switchDate_sign(interUrl.report.loanSignStatistic, _text, 2);
        return $("#curDate1").text(_text);
    });
    $("#curDate1").next(".plus").click(function () {
        var _text, date, o, text;
        text = $("#curDate1").text().trim();
        o = moment(text, "YYYY年MM月");
        date = o.add(1, 'M');
        _text = date.format("YYYY-MM");
        switchDate_sign(interUrl.report.loanSignStatistic, _text, 2);
        return $("#curDate1").text(_text);
    });
    // return $("#btnR1").click(function() {
    //   switchDate_sign(interUrl.report.loanSignStatistic,$("#curDate1").text(),2);
    // });

    $("#curDate2").text(nowMonth);
    $("#curDate2").prev(".minus").click(function () {
        var _text, date, o, text;
        text = $("#curDate2").text().trim();
        o = moment(text, "YYYY年MM月");
        date = o.subtract(1, 'M');
        _text = date.format("YYYY-MM");
        switchDate_bankPay(interUrl.report.bankPayStatistic, _text, 2);
        return $("#curDate2").text(_text);
    });
    $("#curDate2").next(".plus").click(function () {
        var _text, date, o, text;
        text = $("#curDate2").text().trim();
        o = moment(text, "YYYY年MM月");
        date = o.add(1, 'M');
        _text = date.format("YYYY-MM");
        switchDate_bankPay(interUrl.report.bankPayStatistic, _text, 2);
        return $("#curDate2").text(_text);
    });
    // return $("#btnR2").click(function() {
    //   switchDate_bankPay(interUrl.report.bankPayStatistic,$("#curDate2").text(),2);
    // });

    $("#curDate3").text(year);
    $("#curDate3").prev(".minus").click(function () {
        var _text, date, o, text;
        text = $("#curDate3").text().trim();
        o = moment(text, "YYYY年");
        date = o.subtract(1, 'y');
        _text = date.format("YYYY");
        switchDate_rotary(interUrl.report.loanAmmountRotaryStatistic, _text, 2);
        return $("#curDate3").text(_text);
    });
    $("#curDate3").next(".plus").click(function () {
        var _text, date, o, text;
        text = $("#curDate3").text().trim();
        o = moment(text, "YYYY年");
        date = o.add(1, 'y');
        _text = date.format("YYYY");
        switchDate_rotary(interUrl.report.loanAmmountRotaryStatistic, _text, 2);
        return $("#curDate3").text(_text);
    });
    // return $("#btnR3").click(function() {
    //   switchDate_rotary(interUrl.report.loanAmmountRotaryStatistic,$("#curDate3").text(),2);
    // });

    $("#curDate4").text(nowMonth);
    $("#curDate4").prev(".minus").click(function () {
        var _text, date, o, text;
        text = $("#curDate4").text().trim();
        o = moment(text, "YYYY年MM月");
        date = o.subtract(1, 'M');
        _text = date.format("YYYY-MM");
        switchDate_sign2(interUrl.report.loanSignStatistic, _text, 3);
        return $("#curDate4").text(_text);
    });
    $("#curDate4").next(".plus").click(function () {
        var _text, date, o, text;
        text = $("#curDate4").text().trim();
        o = moment(text, "YYYY年MM月");
        date = o.add(1, 'M');
        _text = date.format("YYYY-MM");
        switchDate_sign2(interUrl.report.loanSignStatistic, _text, 3);
        return $("#curDate4").text(_text);
    });
    // return $("#btnR4").click(function() {
    //   switchDate_sign2(interUrl.report.loanSignStatistic,$("#curDate4").text(),3);
    // });

    $("#curDate5").text(nowMonth);
    $("#curDate5").prev(".minus").click(function () {
        var _text, date, o, text;
        text = $("#curDate5").text().trim();
        o = moment(text, "YYYY年MM月");
        date = o.subtract(1, 'M');
        _text = date.format("YYYY-MM");
        switchDate_bankPay2(interUrl.report.bankPayStatistic, _text, 3);
        return $("#curDate5").text(_text);
    });
    $("#curDate5").next(".plus").click(function () {
        var _text, date, o, text;
        text = $("#curDate5").text().trim();
        o = moment(text, "YYYY年MM月");
        date = o.add(1, 'M');
        _text = date.format("YYYY-MM");
        switchDate_bankPay2(interUrl.report.bankPayStatistic, _text, 3);
        return $("#curDate5").text(_text);
    });
    // return $("#btnR5").click(function() {
    //   switchDate_bankPay2(interUrl.report.bankPayStatistic,$("#curDate5").text(),3);
    // });

    $("#curDate6").text(year);
    $("#curDate6").prev(".minus").click(function () {
        var _text, date, o, text;
        text = $("#curDate6").text().trim();
        o = moment(text, "YYYY年");
        date = o.subtract(1, 'y');
        _text = date.format("YYYY");
        switchDate_rotary2(interUrl.report.loanAmmountRotaryStatistic, _text, 3);
        return $("#curDate6").text(_text);
    });
    $("#curDate6").next(".plus").click(function () {
        var _text, date, o, text;
        text = $("#curDate6").text().trim();
        o = moment(text, "YYYY年");
        date = o.add(1, 'y');
        _text = date.format("YYYY");
        switchDate_rotary2(interUrl.report.loanAmmountRotaryStatistic, _text, 3);
        return $("#curDate6").text(_text);
    });
    // return $("#btnR6").click(function() {
    //   switchDate_rotary2(interUrl.report.loanAmmountRotaryStatistic,$("#curDate6").text(),3);
    // });
    $("#curDate7").text(nowMonth);
    $("#curDate7").prev(".minus").click(function () {
        var _text, date, o, text;
        text = $("#curDate7").text().trim();
        o = moment(text, "YYYY年MM月");
        date = o.subtract(1, 'M');
        _text = date.format("YYYY-MM");
        switchDate_4(interUrl.report.dealerCompanystatistic, _text, 1);
        return $("#curDate7").text(_text);
    });
    $("#curDate7").next(".plus").click(function () {
        var _text, date, o, text;
        text = $("#curDate7").text().trim();
        o = moment(text, "YYYY年MM月");
        date = o.add(1, 'M');
        _text = date.format("YYYY-MM");
        switchDate_4(interUrl.report.dealerCompanystatistic, _text, 1);
        return $("#curDate7").text(_text);
    });
    // 报表单击事件
    chart1.on("click", function (data) {
        if (t == 'mobile') {
            return;
            window.location.href = "business.html?moduleType=1&uId=" + uId + "&t=" + t
        } else {
            return comn.addTab({
                title: "业务量分析",
                href: "./Modal/main/index/business.html?moduleType=1&uId=" + uId + "&t=" + t
            });
        }

    });
    chart2.on("click", function (data) {
        if (t == 'mobile') {
            return;
            window.location.href = "unMortgage.html?moduleType=1&uId=" + uId + "&t=" + t
        } else {
            return comn.addTab({
                title: "未抵押情况",
                href: "./Modal/main/index/unMortgage.html?moduleType=1&uId=" + uId + "&t=" + t
            });
        }

    });
    chart3.on("click", function (data) {
        if (t == 'mobile') {
            return;
            window.location.href = "tracking.html?moduleType=1&uId=" + uId + "&t=" + t
        } else {
            return comn.addTab({
                title: "贷款审批跟踪",
                href: "./Modal/main/index/tracking.html?moduleType=1&uId=" + uId + "&t=" + t
            });
        }
    });
    chart4.on("click", function (data) {
        if (t == 'mobile') {
            return;
            window.location.href = "distribution.html?moduleType=1&uId=" + uId + "&t=" + t
        } else {
            return comn.addTab({
                title: "车商客户分布情况",
                href: "./Modal/main/index/distribution.html?moduleType=1&uId=" + uId + "&t=" + t
            });
        }
    });
    chartB1.on("click", function (data) {
        if (t == 'mobile') {
            return;
            window.location.href = "billAmount.html?moduleType=2&uId=" + uId + "&t=" + t
        } else {
            return comn.addTab({
                title: "签单分析",
                href: "./Modal/main/index/billAmount.html?moduleType=2&uId=" + uId + "&t=" + t
            });
        }
    });
    chartB2.on("click", function (data) {
        if (t == 'mobile') {
            return;
            window.location.href = "unMortgage.html?moduleType=2&uId=" + uId + "&t=" + t
        } else {
            return comn.addTab({
                title: "未抵押情况",
                href: "./Modal/main/index/unMortgage.html?moduleType=2&uId=" + uId + "&t=" + t
            });
        }
    });
    chartB3.on("click", function (data) {
        if (t == 'mobile') {
            return;
            window.location.href = "bankPay.html?moduleType=2&uId=" + uId + "&t=" + t
        } else {
            return comn.addTab({
                title: "银行放款分析（本月）",
                href: "./Modal/main/index/bankPay.html?moduleType=2&uId=" + uId + "&t=" + t
            });
        }
    });
    chartB4.on("click", function (data) {
        if (t == 'mobile') {
            return;
            window.location.href = "fundAnalysis.html?moduleType=2&uId=" + uId + "&t=" + t
        } else {
            return comn.addTab({
                title: "资金回转率分析",
                href: "./Modal/main/index/fundAnalysis.html?moduleType=2&uId=" + uId + "&t=" + t
            });
        }
    });
    chartG1.on("click", function (data) {
        if (t == 'mobile') {
            return;
            window.location.href = "billAmount.html?moduleType=3&uId=" + uId + "&t=" + t
        } else {
            return comn.addTab({
                title: "签单分析",
                href: "./Modal/main/index/billAmount.html?moduleType=3&uId=" + uId + "&t=" + t
            });
        }
    });
    chartG2.on("click", function (data) {
        if (t == 'mobile') {
            return;
            window.location.href = "unMortgage.html?moduleType=3&uId=" + uId + "&t=" + t
        } else {
            return comn.addTab({
                title: "未抵押情况",
                href: "./Modal/main/index/unMortgage.html?moduleType=3&uId=" + uId + "&t=" + t
            });
        }
    });
    chartG3.on("click", function (data) {
        if (t == 'mobile') {
            return;
            window.location.href = "bankPay.html?moduleType=3&uId=" + uId + "&t=" + t
        } else {
            return comn.addTab({
                title: "银行放款分析（本月）",
                href: "./Modal/main/index/bankPay.html?moduleType=3&uId=" + uId + "&t=" + t
            });
        }
    });
    chartG4.on("click", function (data) {
        if (t == 'mobile') {
            return;
            window.location.href = "fundAnalysis.html?moduleType=3&uId=" + uId + "&t=" + t
        } else {
            return comn.addTab({
                title: "资金回转率分析",
                href: "./Modal/main/index/fundAnalysis.html?moduleType=3&uId=" + uId + "&t=" + t
            });
        }
    });
    // 链接跳转事件
    $("#show1").on("click", function (data) {
        if (t == 'mobile') {
            return;
            window.location.href = "business.html?moduleType=1&uId=" + uId + "&t=" + t;
        } else {
            return comn.addTab({
                title: "业务量分析",
                href: "./Modal/main/index/business.html?moduleType=1&uId=" + uId + "&t=" + t
            });
        }

    });
    $("#show2").on("click", function (data) {
        if (t == 'mobile') {
            return;
            window.location.href = "unMortgage.html?moduleType=1&uId=" + uId + "&t=" + t
        } else {
            return comn.addTab({
                title: "未抵押情况",
                href: "./Modal/main/index/unMortgage.html?moduleType=1&uId=" + uId + "&t=" + t
            });
        }

    });
    $("#show3").on("click", function (data) {
        if (t == 'mobile') {
            return;
            window.location.href = "tracking.html?moduleType=1&uId=" + uId + "&t=" + t
        } else {
            return comn.addTab({
                title: "贷款审批跟踪",
                href: "./Modal/main/index/tracking.html?moduleType=1&uId=" + uId + "&t=" + t
            });
        }
    });
    $("#show4").on("click", function (data) {
        if (t == 'mobile') {
            return;
            window.location.href = "distribution.html?moduleType=1&uId=" + uId + "&t=" + t
        } else {
            return comn.addTab({
                title: "车商客户分布情况",
                href: "./Modal/main/index/distribution.html?moduleType=1&uId=" + uId + "&t=" + t
            });
        }
    });
    $("#showB1").on("click", function (data) {
        if (t == 'mobile') {
            return;
            window.location.href = "billAmount.html?moduleType=2&uId=" + uId + "&t=" + t
        } else {
            return comn.addTab({
                title: "签单分析",
                href: "./Modal/main/index/billAmount.html?moduleType=2&uId=" + uId + "&t=" + t
            });
        }
    });
    $("#showB2").on("click", function (data) {
        if (t == 'mobile') {
            return;
            window.location.href = "unMortgage.html?moduleType=2&uId=" + uId + "&t=" + t
        } else {
            return comn.addTab({
                title: "未抵押情况",
                href: "./Modal/main/index/unMortgage.html?moduleType=2&uId=" + uId + "&t=" + t
            });
        }
    });
    $("#showB3").on("click", function (data) {
        if (t == 'mobile') {
            return;
            window.location.href = "bankPay.html?moduleType=2&uId=" + uId + "&t=" + t
        } else {
            return comn.addTab({
                title: "银行放款分析（本月）",
                href: "./Modal/main/index/bankPay.html?moduleType=2&uId=" + uId + "&t=" + t
            });
        }
    });
    $("#showB4").on("click", function (data) {
        if (t == 'mobile') {
            return;
            window.location.href = "fundAnalysis.html?moduleType=2&uId=" + uId + "&t=" + t
        } else {
            return comn.addTab({
                title: "资金回转率分析",
                href: "./Modal/main/index/fundAnalysis.html?moduleType=2&uId=" + uId + "&t=" + t
            });
        }
    });
    $("#showG1").on("click", function (data) {
        if (t == 'mobile') {
            return;
            window.location.href = "billAmount.html?moduleType=3&uId=" + uId + "&t=" + t
        } else {
            return comn.addTab({
                title: "签单分析",
                href: "./Modal/main/index/billAmount.html?moduleType=3&uId=" + uId + "&t=" + t
            });
        }
    });
    $("#showG2").on("click", function (data) {
        if (t == 'mobile') {
            return;
            window.location.href = "unMortgage.html?moduleType=3&uId=" + uId + "&t=" + t
        } else {
            return comn.addTab({
                title: "未抵押情况",
                href: "./Modal/main/index/unMortgage.html?moduleType=3&uId=" + uId + "&t=" + t
            });
        }
    });
    $("#showG3").on("click", function (data) {
        if (t == 'mobile') {
            return;
            window.location.href = "bankPay.html?moduleType=3&uId=" + uId + "&t=" + t
        } else {
            return comn.addTab({
                title: "银行放款分析（本月）",
                href: "./Modal/main/index/bankPay.html?moduleType=3&uId=" + uId + "&t=" + t
            });
        }
    });
    $("#showG4").on("click", function (data) {
        if (t == 'mobile') {
            return;
            window.location.href = "fundAnalysis.html?moduleType=3&uId=" + uId + "&t=" + t
        } else {
            return comn.addTab({
                title: "资金回转率分析",
                href: "./Modal/main/index/fundAnalysis.html?moduleType=3&uId=" + uId + "&t=" + t
            });
        }
    });


});
