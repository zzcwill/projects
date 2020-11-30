<template>
  <div :id="domId" class="chart"></div>
</template>

<script>
import { topicsApi } from '@/api/user'
import echarts from 'echarts'

export default {
  name: 'chartDemo4',
  data() {
    return {
      domId: 'chartDemo4',
      chart: null,
      colorArr: ['#E086CE', '#8184D6'],
      seriesName: ['新车', '二手车'],
      seriesData: [40,60]
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
        type: 'pie',
        title: {
          text: '公司放款笔数',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 12,
            color: '#333'
          },
          x: 'center',
          y: 'center'
        },
        tooltip: {
          axisPointer: {
            lineStyle: {
              color: '#FFF'
            }
          },
          trigger: 'item',
          formatter: '{d}%'          
        },
        legend: {
          orient: 'vertical',
          top: 100,
          right: 0,
          icon: 'circle',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
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
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '12',
                        color:'#FFF'
                    }
                },
                itemStyle: {
                  normal: {
                    color: '#333',
                  }
                },                 
                labelLine: {
                    show: false
                },
                data: [
                    {value: this.seriesData[0], name: this.seriesName[0], itemStyle:{color: this.colorArr[0]}},
                    {value: this.seriesData[1], name: this.seriesName[1], itemStyle:{color: this.colorArr[1]}}
                ]
            }
        ]
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
