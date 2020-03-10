<template>
  <div class="container">
    <el-card>
      <span>网站名称</span>
      <el-input class="inputWidth" placeholder="请输入网站名称" v-model="siteName" clearable></el-input>
      <span>三级域名前缀</span>
      <el-input class="inputWidth" placeholder="请输入三级域名前缀" v-model="netName" clearable></el-input>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
      <div class="templateLogp">
        <div class="template">
          <span>模板选择</span>
          <span class="img">
            <img src="../../../assets/login/login-background.jpg" alt="">
          </span>
          <span class="button">
            <el-button class="preview" type="primary">预览</el-button>
            <el-button class="select" type="primary" @click="modelList()">选择</el-button>
          </span>
        </div>
        <div class="logo template">
          <span>企业logo</span>
          <span class="img">
            <img src="../../../assets/login/login-background.jpg" alt="">
          </span>
        </div>
      </div>


      <!-- 点击选择弹框 -->
      <el-dialog title="选择模板" :visible.sync="dialogTableVisible">
        <el-card class="CardModel" v-for="item in tableData" :key="item.id">
          <div class="top">
            <div class="left">{{item.modelName}}&nbsp;&nbsp;&nbsp;&nbsp; {{item.modelCode}}</div>
            <div class="right">
              <el-button type="info" v-if="item.currentStateCode=='2'">已使用</el-button>
              <el-button type="primary" v-if="item.currentStateCode=='9'"  @click="getModel()">使用</el-button>
            </div>
          </div>

          <div class="bottom">
              <span class="img">
                <img :src="[item.viewPicUrl1]" alt="">
              </span>
              <span class="img">
                <img :src="[item.viewPicUrl1]" alt="">
              </span>
              <span class="img">
                <img :src="[item.viewPicUrl1]" alt="">
              </span>
              <span class="img">
                <img :src="[item.viewPicUrl1]" alt="">
              </span>
              <span class="img">
                <img :src="[item.viewPicUrl1]" alt="">
              </span>
              
          </div>
        </el-card>
      </el-dialog>
    </el-card>

    <el-card style="margin-top:10px;">
      <span class="AboutUs">关于我们</span>
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
      </el-input>
      <span class="AboutUs">联系方式</span><br />
      <div>
        <el-input class="address" v-model="address.province" placeholder="省"></el-input>
        <el-input class="address" v-model="address.city" placeholder="市"></el-input>
        <el-input class="address" v-model="address.district" placeholder="区"></el-input>
        <el-input class="address" v-model="address.detailAddress" placeholder="地址"></el-input>
      </div>
      <div style="margin-top:10px;">
        <el-input class="address" v-model="concantPer.contactPerson" placeholder="联系人"></el-input>
        <el-input class="address" v-model="concantPer.cpntantPhone" placeholder="联系电话"></el-input>
        <el-input class="address" v-model="concantPer.servicePhone" placeholder="客服电话"></el-input>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { modelList,enterpriseInfo,companyDetails } from '@/api/mhwz/index'

  export default {
    name: 'XtglXtpz',
    data() {
      return {
        partnerId:'',
        // 模板列表数据
        tableData:[],
        name: '我的模板',
        producer: '001',
        dialogTableVisible: false,
        siteName: '',
        // 三级域名前缀
        netName: '',
        // 文本输入域绑定数据
        textarea: '',
        address: {
          province: '',
          city: '',
          district: '',
          detailAddress: ''
        },
        // 联系人
        concantPer: {
          contactPerson: '',
          cpntantPhone: '',
          servicePhone: ''
        }
      }
    },
    created() {
       this.enterpriseInfo()
    },
    mounted() {},
    watch:{
      partnerId(newVal,oldVal){
        if(newVal){
          this.companyDetails()
        }
      }
    },
    destoryed() {},
    methods: {
      getModel(){
        this.dialogTableVisible=false;
      },
      async modelList(){
        this.dialogTableVisible=true;
        const res=await modelList()
        console.log(res);
        this.tableData=res.data;
      },
       async enterpriseInfo(){
         let params={
           partnerId:'1',
           modelId:'1'
         }
         const res=await enterpriseInfo(params)
         console.log(res);
        this.partnerId=res.data.partnerId
       },
      //  查询企业信息
      async companyDetails(){
        let params={
          id:this.partnerId
        }
        const res=await companyDetails(params)
        console.log(res);
        this.address.province=res.data.addrPriv
        this.address.city=res.data.addrCity
        this.address.district=res.data.addrArea
        this.address.detailAddress=res.data.address
        this.concantPer.contactPerson=res.data.contactName
        this.concantPer.cpntantPhone=res.data.contactTelephone
        this.concantPer.servicePhone=res.data.contactName
      }
    },
  }

</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    background-color: #EFF2F7;
    padding: 10px;

    .CardModel {
      margin-top: 20px;

      .top {
        width: 100%;
        height: 60px;

        .left {
          float: left;
        }

        .right {
          float: right;
        }
      }

      .bottom {
        width: 100%;
        height: 100%;
        .img {
          display: inline-block;
          width: 100px;
          height: 100px;
          img {
            width: 100px;
            height: 100px;
          }
        }
      }
    }

    .address {
      width: 180px;
    }

    .AboutUs {
      display: inline-block;
      font-size: 20px;
      margin: 20px 0 20px 20px;
    }

    .inputWidth {
      width: 220px;
    }

    .templateLogp {
      margin-top: 20px;
      width: 100%;

      span:nth-child(1) {
        display: inline-block;
        vertical-align: top;
      }

      .button {
        display: inline-block;
        width: 100px;
        height: 100%;

        .preview {
          margin-left: 10px;
        }

        .select {
          margin-top: 20px;
        }
      }

      .template,
      .logo {
        width: 385px;
        height: 183px;
        // border: 1px solid red;
        float: left;
      }

      .template {
        .img {
          display: inline-block;
          width: 210px;
          height: 140px;
          vertical-align: top;

          img {
            width: 210px;
            height: 140px;
          }
        }
      }

      .logo {
        margin-left: 100px;
        float: left;
      }
    }
  }

</style>
