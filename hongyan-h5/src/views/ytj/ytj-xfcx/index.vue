<template>
  <div id="dv-container">
    <div class="container">
      <div class="total">园区一卡通系统</div>

      

      <van-row class="myVan-row" type="flex" justify="space-between">
        <van-col class="col-btn col-btn-kpfw" span="6" @click="handelClikcKpfw">
          <div class="kpfw img">
            <img src="../../../assets/ytj/xfjl.png" alt="">
          </div>
        </van-col>
        <van-col class="col-btn col-btn-fkdj" span="6">
          <div class="fkdj img">
            <img src="../../../assets/ytj/ckbk.png" alt="">
          </div>
        </van-col>
      </van-row>
      <van-row class="myVan-row" type="flex" justify="space-between">
        <van-col class="col-btn col-btn-xfcs" span="6">
          <div class="xfcx img">
            <img src="../../../assets/ytj/zdlsj.png" alt="">
          </div>
        </van-col>
        <van-col class="col-btn col-btn-gdfw" span="6">
          <div class="gdfw img">
            <img src="../../../assets/ytj/stxf.png" alt="">
          </div>
        </van-col>
      </van-row>
      <van-row class="myVan-row" type="flex" justify="space-between">
        <van-col class="col-btn col-btn-erweima" span="6">
          <div class="erweima img">
           <img src="../../../assets/ytj/stxf.png" alt="">
          </div>
        </van-col>
        <van-col class="col-btn col-btn-erweima" span="6">
          <div class="erweima img">
            <img src="../../../assets/ytj/stxf.png" alt="">
          </div>
        </van-col>

      </van-row>

      <div class="footerTime">{{this.moment().format('YYYY-MM-DD HH:mm:ss')}}</div>
    </div>
  </div>
</template>

<script>
  import {
    logout
  } from '@/api/user'
  import {
    removeToken
  } from '@/utils/auth'

  export default {
    name: 'ytjkpfw',
    metaInfo: {
      title: '一体机卡片服务'
    },
    data() {
      return {}
    },
    created() {},
    mounted() {
      // var height = window.innerHeight + 'px';
      // // this.$refs[container].style.height=height;
      // document.getElementById('dv-container').style.height = height;
    },
    destoryed() {},
    methods: {
      tologout() {
        this.$router.push({
          path: '/home'
        })
      },
      handelClikcKpfw() {
        this.$router.push({
          path: '/ytj/kpfw'
        })
      }
    }
  }

</script>

<style lang="less" scoped>
  .dv-container {
    background-color: #EDF7F6;

  }

  .container {
    height: 100%;
    overflow: hidden;
    background-color: #EDF7F6;
    padding: 27px 15px;

    .footerTime {
      width: 275px;
      height: 28px;
      text-align: center;
      line-height: 28px;
      margin: 0 auto;
      // border: 1px solid red;
      border-radius: 10px;
      background-color: #C7E4ED;

    }

    .col-btn {
      width: 120px;
      height: 120px;
      // border: 1px solid red;
      font-size: 17px;
      border-radius: 5px;
    }

    .total {
      width: 140px;
      height: 27px;
      text-align: center;
      height: 27px;
      color: #006B57;
      font-size: 20px;
      margin: 10px auto;
    }

    .myVan-row {
      margin: 30px;
    }
  }

</style>
