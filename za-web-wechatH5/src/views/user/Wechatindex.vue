<template>
  <div class="Wechatindex">
  </div>
</template>

<script>
import { getTurnUrl } from '@/utils/env'
export default {
  name: 'Wechatindex',
  created() {
    window.location.href =
      'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx946973537477d273' +
      '&redirect_uri=' +
      getTurnUrl() +
      '&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
  }
}
</script>

<style lang="less">
</style>
