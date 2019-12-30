<template>
  <div class="container">
    <div class="ytj-btn btn" @click="">个人中心</div>
    <div class="ytj-btn btn" @click="">访客管理</div>
    <div class="ytj-btn btn" @click="">会议室申请</div>
    <div class="ytj-btn btn" @click="">停车申请</div>
    <div class="ytj-btn btn" @click="">个人账户</div>
    <div class="ytj-btn btn" @click="">访客预约</div>
    <div class="ytj-btn btn" @click="">食堂后台</div>
    <div class="ytj-btn btn" @click="">商户后台</div>
    <div class="ytj-btn btn" @click="">保安事件</div>
    <div class="ytj-btn btn" @click="handelBtnClick">一体机</div>
  </div>
</template>

<script>
  // import { topicsApi } from '@/api/user'
  import {
    cacheData
  } from '@/global'
  import {
    Dialog
  } from 'vant';

  export default {
    name: 'Home',
    metaInfo: {
      title: '主页'
    },
    data() {
      return {}
    },
    created() {},
    mounted() {
      console.info(cacheData)
    },
    destoryed() {

    },
    methods: {
      handelBtnClick() {
          this.$router.push({
          path: '/ytj'
        })

      },

    }
  }

</script>

<style lang="less">
  .container {
    background-color: #EEF1E9;
    padding: 27px 14px;

    .btn {
      width: 347px;
      height: 52px;
      background-color: #039D80;
      color: white;
      font-size: 17px;
      text-align: center;
      line-height: 52px;
      margin: 10px 0;
      border-radius: 10px;
    }
  }

</style>
