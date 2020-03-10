<template>
  <el-row>
    <el-col :span="16">
      <tj-num :month="month"></tj-num>
    </el-col>
    <el-col :span="8">
      <echart ref="chart" class="chart" :option="option" />
    </el-col>
  </el-row>
</template>

<script>
  import tjNum from './tjNum'
  import echart from '@/components/echarts'
  import { numConferencePie } from '@/api/hysgl/hytj'
  export default {
    components: {
      echart: echart,
      tjNum: tjNum
    },
    props: {
      month: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        option: {
          title: {
            text: '会议类型占比',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: []
          },
          series: [
            {
              name: '会议类型类型',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
    },
    created() {
      this.query()
    },
    methods: {
      query() {
        numConferencePie(this.form).then(res => {
          this.option.legend.data = []
          this.option.series[0].data = []
          if (res.data) {
            for (let item of res.data) {
              this.option.legend.data.push(item.name)
              this.option.series[0].data.push({ name: item.name, value: item.num })
            }
          }
          this.$refs.chart.drawLine()
        })
      }
    }
  }
</script>

<style scoped>
  .chart{
    width:300px;
    height:180px;
  }
</style>
