<template>
  <div>
    <div>img</div>
		<br />
    <div>
      <img src="@/assets/common/1.jpg" />
    </div>
    <br />
    <div>
      <img :src="imgUrl" />
    </div>
  </div>
</template>

<script>
import img from '@/assets/common/1.jpg'

export default {
  name: 'ajax',
  data() {
    return {
			imgUrl: img 
    }
  },
	filters: {
		codeFilter: function (value) {
			let arr = ['no', 'yes']
			return arr[value] || '-'
		}
	},
  created() {
    this.getData()
  },
  mounted() {
	},
  destoryed() {

  },
  methods: {
    async getData() {
    },    
	},
}
</script>

<style lang="less" scoped>

</style>
