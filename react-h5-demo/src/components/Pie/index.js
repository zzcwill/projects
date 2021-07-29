import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./index.less";

import * as echarts from 'echarts'

const Pie = (props) => {
  const { userInfo, history } = props;

	let chartObj = null;

  const initChart = () => {
    chartObj = echarts.init(document.getElementById(props.domId));
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
        data: props.xAxisData
      }],
      yAxis: [{
        type: 'value',
        name: props.yAxisName,
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
          name: props.seriesName[0],
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
              color: props.colorArr[0],
              borderColor: props.colorArr[0],
            }
          },
          data: props.seriesData[0]
      }, 
        {
        name: props.seriesName[1],
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
            color: props.colorArr[1],
            borderColor: props.colorArr[1],
          }
        },
        data: props.seriesData[1]
      }, {
        name: props.seriesName[2],
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
            color: props.colorArr[2],
            borderColor: props.colorArr[2],
          }
        },
        data: props.seriesData[2]
      }]
    };      
    chartObj.setOption(option)		
  }

  useEffect(()=>{
    // let node = document.getElementById(props.domId)
    initChart()
  })

  const clickOne = () => {
    let { clickItem = () => {} } = props;    
    clickItem('son')
  }

  return (
		<div>
			<div id={props.domId} className="chart"></div>
			<br />
			<div onClick={clickOne}>
				clickItem
			</div>
		</div>
  );
};

Pie.propTypes = {
  domId: PropTypes.string.isRequired,
  // chart: PropTypes.object.isRequired,
  colorArr: PropTypes.array.isRequired,

  seriesName: PropTypes.string.isRequired,
  xAxisData: PropTypes.array.isRequired,
  yAxisName: PropTypes.array.isRequired,
  seriesData: PropTypes.array.isRequired,
  clickItem: PropTypes.func.isRequired
};

export default Pie;