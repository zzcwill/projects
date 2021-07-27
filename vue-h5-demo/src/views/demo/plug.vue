<template>
  <div>
    plug
  </div>
</template>

<script>
import { topicsApi } from '@/api/user'

export default {
  name: 'plug',
  data() {
    return {
			txt: 'zzc'
    }
  },
  created() {
    this.plug.tip.open({
      text: this.txt
    })
  },
  mounted() {
	},
  destoryed() {

  },
  methods: {  
	},
}
</script>

<style lang="less" scoped>

</style>
