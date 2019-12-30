<template>
  <div>
    home
  </div>
</template>

<script>
// import { topicsApi } from '@/api/user'
import { cacheData } from '@/global'

export default {
  name: 'Home',
  metaInfo: {
    title: '主页'
  },
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
    console.info(cacheData)
	},
  destoryed() {

  },
  methods: {   
	}
}
</script>

<style lang="less">

</style>
