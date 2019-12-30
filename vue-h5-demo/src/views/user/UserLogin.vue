<template>
  <div class="UserLogin">
    demo
  </div>
</template>

<script>
import { topicsApi } from '@/api/user'

export default {
  name: 'UserLogin',
  metaInfo: {
    title: '用户绑定',
    meta: [
      {
        name: 'keywords',
        content: '公司'
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

      // if (res.data.isBind) {
      //   this.$router.push({
      //     path: '/bindOk',
      //   })
      // }
    },    
	},
}
</script>

<style lang="less">

</style>
