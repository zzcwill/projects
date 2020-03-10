<template>
  <el-row>
    <el-col :span="7">
      <num-card text="总预约次数" :num="num.totalApplyNum"></num-card>
    </el-col>
    <el-col :span="7" :offset="1">
      <num-card text="总使用次数" :num="num.totalUserNum"></num-card>
    </el-col>
    <el-col :span="7" :offset="1">
      <num-card text="总参与人次" :num="num.totalPeopleNum"></num-card>
    </el-col>
  </el-row>
</template>

<script>
  import numCard from '@/components/numCard'
  import { numConference } from '@/api/hysgl/hytj'
  export default {
    props: {
      month: {
        type: String,
        default: ''
      }
    },
    components: { numCard },
    data() {
      return {
        num: {
          totalApplyNum: 0,
          totalUserNum: 0,
          totalPeopleNum: 0
        }
      }
    },
    mounted() {
      this.query()
    },
    methods: {
      query() {
        let param = {
          startDay: this.month
        }
        numConference(param).then(res => {
          this.num = res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
