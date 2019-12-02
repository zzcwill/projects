<template>
  <div class="container">
    <img class="top" src="../../assets/images/login/login-top.png">
    <div class="mid-bg">
      <div class="login-title">登录</div>
       <x-input placeholder="请输入您的手机号" ref="phonenumber" class="xinput" :show-clear="false"  v-model="phone"
               keyboard="number" type="tel" :max="11" is-type="china-mobile">
        <img slot="label" style="padding-right:10px;display:block;" src="../../assets/images/login/phone.png" width="40" height="30">
      </x-input>
      <img class="line" src="../../assets/images/login/line.png">
      <x-input class="xinput" type="password" placeholder="请输入密码" v-model="pwdCode">
        <img slot="label" style="padding-right:10px;display:block;" src="../../assets/images/login/code.png" width="40" height="30">
      </x-input>
      <img class="line" src="../../assets/images/login/line.png">
    </div>
    <div class="btn-bg" @click="login()">
      <img class="btn" src="../../assets/images/login/login-btn.png">
    </div>
  </div>
</template>

<script>
import { loginApi } from "@/api/Api";
import { XInput, XButton } from "vux";

export default {
  name: "userLogin",
  data() {
    return {
      phone: "",
      pwdCode: "",
      pwd: ""
    };
  },
  components: {
    XInput,
    XButton
  },
  methods: {
    //登录
    login() {
      //密码加密-初始化start
      var rsa = new RSAKey();
      rsa.setPublic(
        "bb150dad804fbf7f71223ca1a239cf848324bcf52314022b6545372395e7f165854191f5b77f3e90d5d15b618d8c709a06da5174dc890417f710c6aed0c7b9f346b37c39fc65c054067dd1ce6db45b237f859ddb01fc625ad278dc9b61c6126c254d3a3e4f1748f1d60d5cfdf5beea643c3e8b1e631498d0f7836166a3c7af53",
        "10001"
      );
      //密码加密-初始化end
      var that = this;

      if (!this.$refs.phonenumber.valid || this.phone == "") {
        this.$vux.toast.text("请输入正确的电话号码", "middle");
        return;
      }

      this.pwd = rsa.encrypt(this.pwdCode);

      loginApi({
        uname: this.phone,
        pwd: this.pwd
      })
        .then(function(res) {
          sessionStorage.setItem("authId", res.data);

          that.$router.push({
            path: "/home"
          });
          //sessionStorage.setItem("authId", this.$route.query['Auth-Id']);
        })
        .catch(function(err) {
          that.$vux.toast.text(err.message, "middle");
        });
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
.container {
  height: 100%;
  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #dbdada;
    font-size: 13px;
  }

  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #dbdada;
    font-size: 13px;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #dbdada;
    font-size: 13px;
  }
  /deep/ .weui-cell__ft {
    display: flex;
    align-items: center;
  }

  /deep/ .weui-cell:before {
    border-top: none;
  }

  /deep/ .weui-cell__hd .weui-label {
    width: 100px !important;
    font-size: 15px;
    font-weight: 400;
  }
  /deep/ .weui-cell__bd .weui-input {
    font-size: 14px;
  }
  /deep/ .vux-label {
    width: 100px !important;
    font-size: 14px;
    font-weight: 400;
  }
  .weui-btn:after {
    border: none;
  }
  .vux-x-input,
  .vux-cell-box,
  .weui-cell_access {
    height: 50px;
  }
  .weui-btn {
    line-height: 25px;
  }
  .weui-btn_primary:active,
  .weui-btn_primary {
    padding: 0px;
    line-height: 22px;
    padding-left: 5px;
    padding-right: 5px;
    border: 1px solid #ec7f41;
    background-color: #ffffff;
    font-size: 12px;
    color: #ec7f41;
  }

  .top {
    width: 100%;
    height: auto;
  }

  .mid-bg {
    display: flex;
    width: 100%;
    position: relative;
    height: 270px;
    margin-top: -70px;
    background-image: url(../../assets/images/login/login-bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    flex-direction: column;

    .login-title {
      margin-top: 30px;
      margin-left: 40px;
      margin-bottom: 15px;
      color: #333333;
      font-size: 25px;
    }

    .xinput {
      display: flex;
      margin-right: 24px;
      margin-left: 24px;
      margin-top: 5px;
    }
    .line {
      display: flex;
      margin-left: 40px;
      margin-right: 40px;
      height: 1px;
    }
  }

  .btn-bg {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    .btn {
      display: flex;
      align-self: center;
      height: 45px;
      width: auto;
      margin-top: 10px;
    }
  }
}
</style>
