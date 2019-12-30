<template>
  <div class="login">
    <div class="login-from">
      <div class="title">登录</div>
      <van-cell-group>
        <van-field
          v-model="account"
          clearable
          border
          label="手机号"
          placeholder="请输入手机号"
          :error-message="accountErr"
        />
        <van-field
          v-model="passWord"
          clearable
          border
          type="password"
          label="密码"
          placeholder="请输入密码"
          :error-message="passWordErr"
        />

        <div class="m-lr-auto m-t-20">
          <van-button type="primary" @click="tologin" :loading="loading" block round>登录</van-button>
        </div>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { isEmpty, isPhone } from '@/utils/validate'
import { login } from '@/api/user'
import { setToken } from '@/utils/auth'

export default {
  name: 'Login',
  metaInfo: {
    title: '用户登录'
  },
  data() {
    return {
      account: '18042434282',
      passWord: '123456',
      accountErr: '',
      passWordErr: '',
      loading: false,
      redirect: this.$route.query.redirect
    }
  },
  mounted() {},
  methods: {
    async tologin() {
      this.accountErr = ''
      this.passWordErr = ''
      this.loading = true
      if (!isEmpty(this.account)) {
        this.accountErr = '手机号码不能为空'
        this.loading = false
        return
      }
      if (!isPhone(this.account)) {
        this.accountErr = '手机号码格式不对'
        this.loading = false
        return
      }

      let data = {
        account: this.account,
        passWord: this.passWord
      }
      let res = await login(data)

      if (res) {
        setToken(res.data.token)
        this.loading = false
        this.$router.push({ path: this.redirect || '/' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url('../../../assets/login/bg.png');
  background-size: cover;
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #707070;
  font-size: 16px;
}
.login-from {
  border-radius: 6px;
  background: #ffffff;
  width: 480px;
  padding: 30px;
}
</style>