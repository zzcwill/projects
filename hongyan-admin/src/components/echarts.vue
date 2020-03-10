<template>
  <div>
    <div ref="myChart" :style="{width: '100%', height: '100%'}"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: 'Echarts',
    props: {
      option: Object
    },
    data() {
      return {}
    },
    mounted() {
      //初始化要放在mounted方法中
      this.drawLine()
    },
    methods: {
      drawLine() {
        // 初始化echarts实例
        let myChart = echarts.init(this.$refs.myChart)
        // 绘制图表
        myChart.setOption(this.option)
      }
    }
  }
</script>

<style scoped>

</style>
