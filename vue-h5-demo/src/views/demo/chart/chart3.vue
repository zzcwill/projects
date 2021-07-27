<template>
  <div :id="domId" class="chart"></div>
</template>

<script>
import { topicsApi } from '@/api/user'
import echarts from 'echarts'

export default {
  name: 'chart3',
  data() {
    return {
      domId: 'chart3',
      chart: null,
      colorArr: ['#E086CE', '#8184D6'],
      seriesName: ['逾期笔数', '逾期金额'],
      xAxisData: ['N1','N2','N3','N4及以上'],
      yAxisName: '逾期笔数',
      yAxisName2: '逾期金额/元',
      seriesData: [
        [0, 100, 200, 300.8],
        [1000, 3000, 4000, 9000.2],
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#FFF'
            }
          }
        },
        legend: {
          top: 10,
          icon: 'circle',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          right: '30%',
          textStyle: {
            fontSize: 12,
            color: '#333'
          }
        },
        grid: {
          top: 60,
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },        
        xAxis: [{
          type: 'category',
          data: this.xAxisData,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
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
          }                    
        }],
        yAxis: [{
          type: 'value',
          name: this.yAxisName,
          axisTick: {
            show: false
          },
          min: 0,
          // max: Math.ceil(Math.max.apply(null,this.seriesData[0])/5)*5,
          max: this.getNumberMax(this.seriesData[0]),
          position: 'left',
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
          },
          // interval: Math.ceil(Math.max.apply(null,this.seriesData[0])/5)
          interval: this.getNumberInterval(this.seriesData[0])
        },{
          type: 'value',
          name: this.yAxisName2,
          position: 'right',
          min: 0,
          // max: Math.ceil(Math.max.apply(null,this.seriesData[1])/5)*5,
          max: this.getNumberMax(this.seriesData[1]), 
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
          },
          // interval: Math.ceil(Math.max.apply(null,this.seriesData[1])/5)   
          interval: this.getNumberInterval(this.seriesData[1])
        }],
        series: [{
          name: this.seriesName[0],
          type: 'bar',
          yAxisIndex: 0,
          itemStyle: {
            normal: {
              color: this.colorArr[0],
              borderColor: this.colorArr[0],
            }
          },          
          data: this.seriesData[0],
        }, {
          name: this.seriesName[1],
          type: 'bar',
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: this.colorArr[1],
              borderColor: this.colorArr[1],
            }
          },          
          data: this.seriesData[1],
        }]
      };      
      this.chart.setOption(option)
    },
    getNumberMax(arrData) {
      let reurnMax = 0
      let max = Math.max.apply(null,arrData)
      let strMax = parseInt(max) + ''
      let maxHightNumber = parseInt(strMax[0])

      reurnMax = maxHightNumber+1

      for( let key = 0 ; key < strMax.length ; key++) {
        reurnMax = reurnMax*10
      }

      return Math.ceil(reurnMax/5)*5
    },
    getNumberInterval(arrData) {
      let reurnMax = 0
      let max = Math.max.apply(null,arrData)
      let strMax = parseInt(max) + ''

      let maxHightNumber = parseInt(strMax[0])

      reurnMax = maxHightNumber+1

      for( let key = 0 ; key < strMax.length ; key++) {
        reurnMax = reurnMax*10
      }

      return Math.ceil(reurnMax/5)
    } 
  }
}
</script>

<style lang="less">
.chart {
  width: 750px;
  height: 450px;
}
</style>
