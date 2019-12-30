<template>
  <div id="dv-container" ref="container">
    <div class="container">
      <div class="total">园区一卡通系统</div>

      <van-row class="myVan-row" type="flex" justify="space-around">
        <van-col class="col-btn col-btn-kpfw" span="6" @click="handelClickKpfw">
          <div class="kpfw img">
            <div>卡片服务</div>
          </div>
        </van-col>
        <van-col class="col-btn col-btn-fkdj" span="6" @click="handelClickfkdj">
          <div class="fkdj img">
            <div>访客登记</div>
          </div>
        </van-col>
      </van-row>
      <van-row class="myVan-row" type="flex" justify="space-around">
        <van-col class="col-btn col-btn-xfcs" span="6" @click="handelClickxfcx">
          <div class="xfcx img">
            <div>消费查询</div>
          </div>
        </van-col>
        <van-col class="col-btn col-btn-gdfw" span="6">
          <div class="gdfw img">
            <div>更多服务</div>
          </div>
        </van-col>
      </van-row>
      <van-row class="myVan-row" type="flex" justify="space-around">
        <van-col class="col-btn col-btn-erweima" span="6">
          <div class="erweima img">
            <div>微信扫码了解更多</div>
          </div>
        </van-col>
        <van-col class="col-btn col-btn-sybz" span="6">
          <div class="sybz img">
            <div>使用帮助</div>
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
    name: 'ytj',
    metaInfo: {
      title: '一体机'
    },
    data() {
      return {}
    },
    created() {},
    mounted() {
        // var height=window.innerHeight+'px';
        // // this.$refs[container].style.height=height;
				// document.getElementById('dv-container').style.height=height;
		},
    destoryed() {},
    methods: {
      tologout() {
        this.$router.push({
          path: '/home'
        })
      },
      handelClickKpfw(){
        this.$router.push({path:'/ytj/kpfw'})
      },
      handelClickfkdj(){
         this.$router.push({path:'/ytj/fkdj'})
      },
      handelClickxfcx(){
        this.$router.push({path:'/ytj/xfcx'})
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
      width: 130px;
      height: 130px;
      // border: 1px solid red;
      font-size: 17px;
      border-radius: 5px;
    }

    .col-btn-xfcs {
      background-color: #F18D31;

      .xfcx {
        margin: 5px auto;
        background: url('../../assets/ytj/xfcx.png') no-repeat;
      }
    }

    .col-btn-kpfw {
      background-color: #039D37;

      .kpfw {
        margin: 5px auto;
        background: url('../../assets/ytj/kpfw.png') no-repeat;
      }
    }

    .col-btn-fkdj {
      background-color: #06A4BD;

      .fkdj {
        margin: 5px auto;
        background: url('../../assets/ytj/fkdj.png') no-repeat;
      }
    }

    .col-btn-gdfw {
      background-color: #7F58D9;

      .gdfw {
        margin: 5px auto;
        background: url('../../assets/ytj/gdfw.png') no-repeat;
      }
    }

    .col-btn-erweima {
      background-color: #F3F3F3;

      .erweima {
        margin: 5px auto;
        background: url('../../assets/ytj/erweima.png') no-repeat;

        div {
          color: black !important;
          margin: 85px auto !important;
        }
      }
    }

    .col-btn-sybz {
      background-color: #8FA4B4;

      .sybz {
        margin: 5px auto;
        background: url('../../assets/ytj/sybz.png') no-repeat;

        div {
          margin: 85px auto !important;
        }
      }
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

      .img {
        width: 120px;
        height: 120px;
        background-size: cover;
        // background-position: 5px 5px;
        border: 1px solid white;
        border-radius: 5px;

        div {
          width: 110px;
          height: 50px;
          font-size: 13px;
          color: white;
          margin: 75px auto;
          text-align: center;
        }
      }
    }
  }

</style>
