<template>
  <div
    :id="domId"
    class="pie"
    :style="{ height: height + 'px', width: width + 'px' }"
  ></div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'pie',
  props: {
    height: {
      type: Number,
      default: 450,
    },
    width: {
      type: Number,
      default: 750,
    },
    unit: {
      type: String,
      default: '',
    },
    titleName: {
      type: String,
      default: '饼图',
    },
    clickItem: {
      type: Function,
      default: () => {},
    },
    renderData: {
      type: Array,
      default: function () {
        return [
          {
            name: '图例一',
            value: 40,
          },
          {
            name: '图例二',
            value: 60,
          },
        ]
      },
    },
    legendColor: {
      type: Array,
      default: function () {
        return ['#FFBD1F', '#2BA0FF']
      },
    },
    domId: {
      type: String,
      default: 'pie',
    },
    labelShow: {
      type: Boolean,
      default: true,
    },
    isSoild:{
      type: Boolean,
      default: false,      
    }
  },
  data() {
    return {
      chart: null,
      series: [],
      timer: null,
      chartIndex: 0,
    }
  },
  created() {},
  mounted() {
    this.initChart()
  },
  beforeUnmount() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  unmounted() {},
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.domId))
      this.setOptions()
    },
    setOptions() {
      let arr = []
      this.renderData.map((item, index) => {
        arr.push({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: this.legendColor[index],
          },
        })
      })
      this.series = this.series.concat(arr)

      let option = {
        // backgroundColor: '#FFF',
        type: 'pie',
        title: {
          text: this.titleName,
          textStyle: {
            fontWeight: 'normal',
            fontSize: 12,
            // color: '#fff',
          },
          x: 'center',
          y: 'center',
        },
        tooltip: {
          axisPointer: {
            lineStyle: {
              // color: '#FFF',
            },
          },
          trigger: 'item',
          // formatter: '{c} ({d}%)' + this.unit,
          formatter: '{c}' + this.unit,
        },
        legend: {
          textStyle: {
            fontSize: 12,
            // color: '#fff',
          },
          orient: 'vertical',
          left: 'left',
          top: 30,
        },
        grid: {
          top: 60,
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true,
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: true,
            label: {
              show: this.labelShow,
              // formatter: '{c} ({d}%)' + this.unit,
              formatter: '{d}%',
              // color: '#fff',
            },
            itemStyle: {
              fontWeight: 'normal',
              normal: {
                // color: '#fff',
              },
            },
            labelLine: {
              show: true,
            },
            data: this.series,
          },
        ],
      }

      if(this.isSoild) {
        delete option.series[0].radius
        // option.legend = {
        //   textStyle: {
        //     fontSize: 12,
        //     color: '#fff',
        //   },
        //   top: 'bottom',
        // }
      }

      this.chart.setOption(option)

      let that = this
      this.chart.on('click', function (item) {
        clearInterval(that.timer)  
        console.info(item.dataIndex)
        that.chart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
        })
        that.chart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: item.dataIndex
        })
        that.chart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: item.dataIndex
        })         

        that.$emit('clickItem', item)
      })

      
      this.chart.on('mouseover', function (item) {
        clearInterval(that.timer)
        that.chart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
        })
        that.chart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: item.dataIndex
        })
        that.chart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: item.dataIndex
        })         
      })    
      this.chart.on('mouseout', function (item) {
        that.chart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
        })        
        // this.timer = setInterval(function () {
        //   that.chart.dispatchAction({
        //     type: 'downplay',
        //     seriesIndex: 0,
        //   })   
        //   that.chartIndex = that.chartIndex + 1 == that.series.length ? 0 : that.chartIndex + 1     
        //   that.chart.dispatchAction({
        //     type: 'highlight',
        //     seriesIndex: 0,
        //     dataIndex: that.chartIndex,
        //   })
        //   that.chart.dispatchAction({
        //     type: 'showTip',
        //     seriesIndex: 0,
        //     dataIndex: that.chartIndex,
        //   })        
        // }, 5000)
      })         

      this.timer = setInterval(function () {
        that.chart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
        })   
        that.chartIndex = that.chartIndex + 1 == that.series.length ? 0 : that.chartIndex + 1     
        that.chart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: that.chartIndex,
        })
        that.chart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: that.chartIndex,
        })        
      }, 5000)
    },
  },
}
</script>

<style lang="less">
</style>
