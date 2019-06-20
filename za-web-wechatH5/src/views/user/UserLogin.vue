<template>
  <div class="UserLogin">
    <div class="loginBox">
      <div class="logo">
        <img src="../../assets/images/userLogin/logo.png">
      </div>
      <div class="bg">
        <img src="../../assets/images/userLogin/1.png">
      </div>
      <div class="login">
        <div class="loginTop">
          <div class="loginInput">
            <div class="loginInputLeft">
              <img src="../../assets/images/userLogin/2.png" class="phoneIcon">
            </div>
            <div class="loginInputLeft2">
              <input
                maxlength="11"
                autocomplete="off"
                autocapitalize="off"
                autocorrect="off"
                spellcheck="false"
                type="tel"
                placeholder="请输入您的手机号"
                class="input"
                v-model="user.phone"
                @blur="judgePone"
              >
            </div>
          </div>
          <div class="loginInput">
            <div class="loginInputLeft">
              <img src="../../assets/images/userLogin/3.png" class="idCardIcon">
            </div>
            <div class="loginInputLeft2">
              <input
                autocomplete="off"
                autocapitalize="off"
                autocorrect="off"
                spellcheck="false"
                type="text"
                placeholder="请输入身份证号码"
                class="input"
                v-model="user.idCard"
                @blur="judgeIdCard"
              >
            </div>
          </div>
          <div class="loginInput">
            <div class="loginInputLeft">
              <img src="../../assets/images/userLogin/4.png" class="codeIcon">
            </div>
            <div class="loginInputLeft4">
              <input
                autocomplete="off"
                autocapitalize="off"
                autocorrect="off"
                spellcheck="false"
                type="text"
                placeholder="请输入验证码"
                class="input"
                v-model="user.smsCode"
                @blur="judgeSmsCode"
              >
            </div>
            <div class="dot"></div>
            <div class="loginInputLeft3">
              <div class="sendCode" @click="sendSmsCode">{{codeInfo.tip}}</div>
            </div>
          </div>
        </div>
        <div class="loginBottom">
          <button class="bind" @click="toBindUser">立即绑定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { wechatLoginApi, wechatBindApi, smsSendMsgApi } from '@/api/user'
import { isEmpty, isPhone, isIdCard, isSixNumberCode, isWechat } from '@/utils/validate.js'

export default {
  name: 'UserLogin',
  metaInfo: {
    title: '用户绑定',
    meta: [
      {
        name: 'keywords',
        content: '振安汇盈（上海）资产管理有限公司'
      }
    ]
  },
  data() {
    return {
			code: this.$route.query.code,
      user: {
        phone: '',
        idCard: '',
        smsCode: ''
      },
      codeInfo: {
        isCan: true,
        num: 60,
        tip: '发送验证码'
      }
    }
  },
  created() {
    this.judgeIsWechatLogin()
  },
  mounted() {
	},
  destoryed() {
    clearTimeout(this.timeout)
  },
  methods: {
    judgeIsWechatLogin() {
      if(!isWechat()) {
        this.$za.tip.open({
          text: '请在微信打开页面'
        })
        return
      }
      if(this.code === null) {
        this.$router.push({
          path: '/wechatindex',
        })
        return
      }

      let sessionId = sessionStorage.getItem('sessionId')
      let isBind = sessionStorage.getItem('isBind')
      if (sessionId !== null) {
        if(isBind === 'true') {
          this.$router.push({
            path: '/bindOk',
          })
        }
        return
      }
      this.judgeUserIsBind()

    },
    async judgeUserIsBind() {
      let data = {
        code: this.code,
      }
      let res = await wechatLoginApi(data)

      if (res.data.isBind) {
        this.$router.push({
          path: '/bindOk',
        })
      }
      sessionStorage.setItem('sessionId', res.data.sessionId)
      sessionStorage.setItem('isBind', res.data.isBind)
    },
    judgePone() {
      if(!isEmpty(this.user.phone)) {
        this.$za.tip.open({
          text: '手机号不能为空'
        })
        return false
      }
      if(!isPhone(this.user.phone)) {
        this.$za.tip.open({
          text: '请输入正确的手机号'
        })
        return false
      }
      return true
    },
    judgeIdCard() {
      if(!isEmpty(this.user.idCard)) {
        this.$za.tip.open({
          text: '身份号不能为空'
        })
        return false
      }
      if(!isIdCard(this.user.idCard)) {
        this.$za.tip.open({
          text: '请输入正确的身份证'
        })
        return false
      }
      return true
    },
    judgeSmsCode() {
      if(!isEmpty(this.user.smsCode)) {
        this.$za.tip.open({
          text: '验证码不能为空'
        })
        return false
      }
      if(!isSixNumberCode(this.user.smsCode)) {
        this.$za.tip.open({
          text: '请输入正确的验证码'
        })
        return false
      }
      return true
    },
    async sendSmsCode() {
      if(!this.judgePone()) {
        return
      }
      if(!this.codeInfo.isCan) {
        return
      }

      let data = {
        phone: this.user.phone,
        smsType: 1
      }
      let res = await smsSendMsgApi(data)

      this.$za.tip.open({
        text: res.message
      })
      this.countdown()
    },
    countdown() {
      let num = this.codeInfo.num
      this.codeInfo.tip = num + 's后重试'
      this.codeInfo.isCan = false
      let that = this

      this.timer = setInterval(() => {
        num = num - 1
        that.codeInfo.tip = num + 's后重试'
        if(num === 0) {
          this.codeInfo.isCan = true
          that.codeInfo.tip = '发送验证码'
          clearTimeout(that.timer)
        }
      }, 1000)
    },
    async toBindUser() {
      if(this.judgePone() && this.judgeIdCard() && this.judgeSmsCode()) {
        let data = this.user
        let res = await wechatBindApi(data)
        sessionStorage.setItem('isBind', res.data.isBind)
        if (!res.data.isBind) {
          this.$za.popup.open({
            title: '绑定失败',
            text: res.message,
            callBack: (popupThis) => {
              popupThis.hide()
            }
          })
          return
        }

        this.$router.push({
          path: '/bindOk',
        })
      }
    }
	},
}
</script>

<style lang="less">
.loginBox {
  position: relative;
  height: 705px;

  .logo {
    position: absolute;
    top: 78px;
    left: 50%;
    margin-left: -102px;
    width: 177px;
    height: 204px;
    img {
      display: block;
      width: 177px;
      height: 204px;
    }
  }

  .bg img {
    display: block;
    width: 750px;
    height: 705px;
  }

  .login {
    position: absolute;
    height: 700px;
    width: 690px;
    top: 360px;
    left: 50%;
    margin-left: -345px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: #ddd 0px 0px 10px;

    .loginTop {
      margin: 0 auto;
      margin-top: 34px;
      width: 600px;
      .loginInput {
        width: 600px;
        height: 110px;
        border-bottom: 1px solid #e5e5e5;
        .loginInputLeft {
          float: left;
          height: 100%;
        }
        .loginInputLeft2 {
          float: left;
          height: 100%;
          width: 350px;
          margin-left: 36px;
        }
        .loginInputLeft4 {
          float: left;
          height: 100%;
          width: 300px;
          margin-left: 36px;
        }
        .dot {
          float: left;
          height: 60px;
          width: 1px;
          margin-top: 25px;
          background-color: #ed1c24;
        }
        .loginInputLeft3 {
          float: left;
          height: 100%;
          width: 160px;
          margin-left: 36px;

          .sendCode {
            margin-top: 40px;
            color: #ed1c24;
            font-size: 26px;
            height: 30px;
            line-height: 30px;
          }
        }

        .input {
          margin-top: 35px;
          display: block;
          width: 100%;
          font-size: 30px;
          height: 40px;
          line-height: 40px;
          color: #000;
        }

        .phoneIcon {
          display: block;
          width: 32px;
          height: 39px;
          margin-top: 35px;
        }
        .idCardIcon {
          display: block;
          width: 36px;
          height: 32px;
          margin-top: 39px;
        }
        .codeIcon {
          display: block;
          width: 34px;
          height: 38px;
          margin-top: 36px;
        }
      }
    }

    .loginBottom {
      margin-top: 130px;
      .bind {
        margin: 0 auto;
        display: block;
        width: 600px;
        height: 88px;
        border-radius: 440px;
        background-color: #ed1c24;
        color: #fff;
        font-size: 30px;
        line-height: 88px;
        text-align: center;
      }
    }
  }
}
</style>
