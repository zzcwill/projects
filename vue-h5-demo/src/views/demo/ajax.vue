<template>
  <div>
    ajax
  </div>
</template>

<script>
import { topicsApi } from '@/api/user'

export default {
  name: 'ajax',
  data() {
    return {
			code: this.$route.query.code
    }
  },
  created() {
    console.info(this.code)
    this.getData()
  },
  mounted() {
	},
  destoryed() {

  },
  methods: {
    async getData() {
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

<style lang="less" scoped>

</style>
