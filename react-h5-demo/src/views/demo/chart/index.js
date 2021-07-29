import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./index.less";

import * as echarts from 'echarts'

const Chart = (props) => {
  const { userInfo, history } = props;

  const [chartData, setChartData] = useState({
    domId: 'chart',
    chart: null,
    colorArr: ['#86D9E0', '#E086CE', '#8184D6'],
    seriesName: ['发起', '完成', '通过'],
    xAxisData: ['11-01','11-02','11-03','11-04','11-05','11-06','11-07'],
    yAxisName: '笔数',
    seriesData: [
      [0, 20, 15, 40, 50, 70, 100],
      [0, 10, 15, 20, 25, 30, 40],
      [0, 4, 15, 8, 10, 10, 10]
    ]    
  });

  const initChart = () => {
    chartData.chart = echarts.init(document.getElementById(chartData.domId));
    setOptions();
  }
  const setOptions = () => {
    let option = {
      backgroundColor: '#FFF',
      // 表格标题
      title: {
        top: 20,
        text: '',
        textStyle: {
          fontWeight: 'normal',
          fontSize: 12,
          color: '#333'
        },
        left: '1%'
      },
      // 点击-提示信息
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#FFF'
          }
        }
      },
      // 右上角标题
      legend: {
        top: 10,
        icon: 'circle',
        itemWidth: 14,
        itemHeight: 5,
        itemGap: 13,
        right: '4%',
        textStyle: {
          fontSize: 12,
          color: '#333'
        }
      },
      // 折线图形-距离顶部的配置        
      grid: {
        top: 60,
        left: '2%',
        right: '2%',
        bottom: '2%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        boundaryGap: true,
        // x轴刻度线 
        axisTick: {
          show: false
        },                   
        axisLine: {
          show: true,
          lineStyle: {
            color: '#E5E5E5'
          }
        },
        axisLabel: {
          margin: 10,
          textStyle: {
            fontSize: 12,
            color: '#333'
          }
        },              
        data: chartData.xAxisData
      }],
      yAxis: [{
        type: 'value',
        name: chartData.yAxisName,
        // y轴刻度线
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#333'
          }
        },
        axisLabel: {
          margin: 10,
          textStyle: {
            fontSize: 12,
            color: '#333'
          }
        }
      }],
      series: [
        {
          name: chartData.seriesName[0],
          type: 'line',
          symbol: 'circle',
          symbolSize: 4,
          showSymbol: true,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          itemStyle: {
            normal: {
              color: chartData.colorArr[0],
              borderColor: chartData.colorArr[0],
            }
          },
          data: chartData.seriesData[0]
      }, 
        {
        name: chartData.seriesName[1],
        type: 'line',
        symbol: 'circle',
        symbolSize: 4,
        showSymbol: true,
        lineStyle: {
          normal: {
            width: 1
          }
        },
        itemStyle: {
          normal: {
            color: chartData.colorArr[1],
            borderColor: chartData.colorArr[1],
          }
        },
        data: chartData.seriesData[1]
      }, {
        name: chartData.seriesName[2],
        type: 'line',
        symbol: 'circle',
        symbolSize: 4,
        showSymbol: true,
        lineStyle: {
          normal: {
            width: 1
          }
        },
        itemStyle: {
          normal: {
            color: chartData.colorArr[2],
            borderColor: chartData.colorArr[2],
          }
        },
        data: chartData.seriesData[2]
      }]
    };      
    chartData.chart.setOption(option)
  }

  useEffect(()=>{
    initChart()
  })

  return (
    <div id={chartData.domId} className="chart"></div>
  );
};


const mapStateToProps = (state) => {
  return {
    ...state.user
  };
};
export default withRouter(
  connect(mapStateToProps)(Chart)
);