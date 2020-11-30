<template>
  <div :id="domId" class="chart"></div>
</template>

<script>
import { topicsApi } from '@/api/user'
import echarts from 'echarts'

export default {
  name: 'chartDemo',
  data() {
    return {
      domId: 'chartDemo',
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
    }
  },
  created() {

  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },  
  destoryed() {

  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.domId));
      this.setOptions();
    },
    setOptions() {
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
          data: this.xAxisData
        }],
        yAxis: [{
          type: 'value',
          name: this.yAxisName,
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
            name: this.seriesName[0],
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
                color: this.colorArr[0],
                borderColor: this.colorArr[0],
              }
            },
            data: this.seriesData[0]
        }, 
          {
          name: this.seriesName[1],
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
              color: this.colorArr[1],
              borderColor: this.colorArr[1],
            }
          },
          data: this.seriesData[1]
        }, {
          name: this.seriesName[2],
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
              color: this.colorArr[2],
              borderColor: this.colorArr[2],
            }
          },
          data: this.seriesData[2]
        }]
      };      
      this.chart.setOption(option)
    }
  }
}
</script>

<style lang="less">
.chart {
  width: 700px;
  height: 450px;
}
</style>
