<template>
  <el-row>
    <el-col :span="7">
      <num-card text="预约次数" :num="num.totalApplyNum"></num-card>
    </el-col>
    <el-col :span="7" :offset="1">
      <num-card text="访问次数" :num="num.totalVisitNum"></num-card>
    </el-col>
    <el-col :span="7" :offset="1">
      <num-card text="访问人次" :num="num.totalVisitorNum"></num-card>
    </el-col>
  </el-row>
</template>

<script>
  import numCard from '@/components/numCard'
  import { numVisitor } from '@/api/fkgl/fktj'
  export default {
    props: {
      month: {
        type: String,
        default: ''
      }
    },
    components: {
      numCard: numCard
    },
    data() {
      return {
        num: {
          totalApplyNum: 0,
          totalVisitNum: 0,
          totalVisitorNum: 0
        }
      }
    },
    mounted() {
      this.query()
    },
    methods: {
      query() {
        let param = {
          visitorTime: this.month
        }
        numVisitor(param).then(res => {
          this.num = res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
