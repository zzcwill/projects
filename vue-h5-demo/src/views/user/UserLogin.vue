<template>
  <div class="UserLogin">
    demo
  </div>
</template>

<script>
import { topicsApi } from '@/api/user'

export default {
  name: 'userLogin',
  data() {
    return {
			code: this.$route.query.code,
      user: {
        phone: '',
        idCard: '',
        smsCode: ''
      }
    }
  },
  created() {
    this.judgeUserIsBind()
  },
  mounted() {
	},
  destoryed() {

  },
  methods: {
    async judgeUserIsBind() {
      let data = {
        page: 1,
        tab: 'good',
        limit: 10,  
      }
      let res = await topicsApi(data)
      console.info(res)
    },    
	},
}
</script>

<style lang="less">

</style>
