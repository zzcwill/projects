<template>
  <div>
    store2
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
// import { topicsApi } from '@/api/user'

export default {
  name: 'store2',
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      sysname: state => state.app.sysname,
      userInfo: state => {
          if (state.user.userInfo === '') {
              return {}
          } else {
              return JSON.parse(state.user.userInfo)
          }
      }
    })  
  }, 
  created() {
    console.info(this.sysname)
    this.getUserInfo()
  },
  mounted() {
	},
  destoryed() {

  },
  methods: {
    // ...mapActions([
    //   'user_info'
    // ]),   
    ...mapActions({
      user_info: 'user_info'
    }),     
    async getUserInfo() {
      let data = {
        page: 1,
        tab: 'good',
        limit: 10,  
      }
      let res = await this.user_info(data)
      console.info('-----')
      console.info(res)
      console.info(this.userInfo)
      console.info(this.$store.state.user.userInfo)
    },
	},
}
</script>

<style lang="less" scoped>

</style>
