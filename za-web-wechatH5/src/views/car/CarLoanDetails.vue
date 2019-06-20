<template>
  <div class="CarLoanDetails">
    <div class="carLocanBox">
      <div class="carLocanTop">
        <div class="bg">
          <img src="../../assets/images/carLoanDetails/1.png">
        </div>
        <div class="infoBox">
          <div class="infoTop">
            <div class="info">
              <div class="dot"></div>
              <div class="title">车辆信息</div>
            </div>
            <div class="txt">
              <p>{{carInfo}}</p>
            </div>
          </div>
          <div class="infoBottom">
            <div class="info">
              <div class="dot"></div>
              <div class="title">贷款状态</div>
              <div class="titleValue">{{loanData.loanStatusDescribe}}</div>
            </div>
            <div class="info">
              <div class="dot"></div>
              <div class="title">贷款金额</div>
              <div class="titleValue titleValueColor">
                <span>{{loanData.loanAmount}}</span>元
              </div>
            </div>
            <div class="info">
              <div class="dot"></div>
              <div class="title">综合服务费</div>
              <div class="titleValue titleValueColor">
                <span>{{loanData.serviceCharge}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="carLocanBottom">
        <div class="tag">
          <div class="dot"></div>
          <div class="title">相关影像资料</div>
        </div>
        <div class="imgList">
          <div class="imgBox" v-for="(item, index) in loanData.imageData" :key="index">
            <div class="imgShow" v-for="(item2, index2) in item.imageUrlList" :key="index2">
              <img :src="item2" :ref="item.title" @click="showImg(item.title,index2)" />
            </div>
            <p class="tip">{{item.title}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loanDetailsApi } from '@/api/car'
import { mergeObject } from '@/utils/way.js'
// 仿微信图片预览插件
import '@/utils/previewImage.js'

export default {
  name: 'CarLoanDetails',
  metaInfo: {
    title: '贷款状态详情',
    meta: [
      {
        name: 'keywords',
        content: '振安汇盈（上海）资产管理有限公司'
      }
    ]
  },
  data() {
    return {
      loanId: this.$route.query.loanId || '',
      loanData: {
        carBrand: '',
        carSeries: '',
        carType: '',
        loanStatusDescribe: '',
        loanAmount: '',
        serviceCharge: '',
        imageData: []
      },
    }
  },
  computed: {
    carInfo() {
        let carInfo = this.loanData.carBrand + '-' + this.loanData.carSeries + '-' + this.loanData.carType
        return carInfo
    }
  },
  mounted() {
    this.getLoanInfo()
  },
  methods: {
    async getLoanInfo() {
      let data = {
        loanId: this.loanId,
      }
      let res = await loanDetailsApi(data)
      this.loanData = mergeObject(this.loanData, res.data)
    },
    showImg(title, index2) {
      /* eslint-disable */
      let arr = []
      for(var i = 0 ; i < this.$refs[title].length; i++) {
        arr.push(this.$refs[title][i].currentSrc)
      }
      let data = {
        urls: arr,
        current: this.$refs[title][index2].currentSrc
      }
      previewImage.start(data)
      /* eslint-disable */
    }    
  }
}
</script>

<style lang="less">
body {
  background-color: #f4f4f4;
}

.CarLoanDetails {
  .carLocanBox {
    padding-top: 20px;
    margin: 0 auto;
    width: 710px;

    .carLocanTop {
      margin-bottom: 20px;
      width: 100%;
      position: relative;
      .bg img {
        display: block;
        width: 710px;
        height: 420px;
      }
      .infoBox {
        position: absolute;
        top: 20px;
        left: 20px;
        right: 20px;
        bottom: 20px;

        .infoTop {
          margin-bottom: 26px;
        }

        .info {
          margin-bottom: 40px;
          height: 28px;
          .dot {
            float: left;
            margin-right: 18px;
            width: 2px;
            height: 28px;
            background-color: #ed1c24;
          }
          .title {
            float: left;
            font-size: 28px;
            line-height: 28px;
            color: #333;
          }
          .titleValue {
            float: right;
            font-size: 28px;
            line-height: 28px;
            color: #333;
          }
          .titleValueColor {
            color: #999;
          }
        }

        .txt {
          margin: 0 auto;
          width: 630px;
          height: 94px;
          border-bottom: 2px dashed #fedbdb;
          p {
            padding: 10px;
            font-size: 28px;
            color: #999999;
            line-height: 36px;
          }
        }
      }
    }

    .carLocanBottom {
      padding: 20px;
      background-color: #fff;
      .tag {
        margin-bottom: 20px;
        height: 28px;
        .dot {
          float: left;
          margin-right: 18px;
          width: 2px;
          height: 28px;
          background-color: #ed1c24;
        }
        .title {
          float: left;
          font-size: 28px;
          line-height: 28px;
          color: #333;
        }
      }
      .imgShow{
        margin-bottom:20px;
      }
      .imgShow img {
        display: block;
        width: 670px;
        height: 400px;
      }
      .tip {
        margin-bottom:20px;
        line-height: 32px;
        font-size: 26px;
        color: #666666;
        text-indent: 40px;
      }
    }
  }
}
</style>
