<template>
  <div>
    store
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
// import { topicsApi } from '@/api/user'

export default {
  name: 'store',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'sysname',
      'userInfo'
    ]),
    sysname2() {
      return this.$store.state.app.sysname
    },
    userInfo2() {
      let userInfo = this.$store.state.user.userInfo
      if(userInfo === '') {
        return {}
      }else{
        return JSON.parse(userInfo)
      }
    }  
  }, 
  created() {
    console.info(this.sysname)
    console.info(this.sysname2)
    this.getUserInfo()
  },
  mounted() {
	},
  destoryed() {

  },
  methods: {
    async getUserInfo() {
      let data = {
        page: 1,
        tab: 'good',
        limit: 10,  
      }
      let res = await this.$store.dispatch('user_info', data)
      console.info('-----')
      console.info(res)
      console.info(this.userInfo)
      console.info(this.userInfo2)
      console.info(this.$store.state.user.userInfo)
    },
	},
}
</script>

<style lang="less" scoped>

</style>
