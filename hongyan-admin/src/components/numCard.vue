<template>
  <el-card class="num-card">
    <div class="box">
      <div class="box-text">{{text}}</div>
      <div class="box-num">{{num}}</div>
    </div>
  </el-card>
</template>

<script>
  export default {
    props: {
      num: {
        type: Number,
        default: 0
      },
      text: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped>
  .num-card{
    width: 100%;
    height: 100px;
  }
  .box{
    text-align: center;
  }
  .box-num{
    font-size: 30px;
  }
  .box-text{
    line-height: 18px;
    color: rgba(0,0,0,.45);
    font-size: 16px;
    margin-bottom: 12px;
  }
</style>
