<template>
  <div>
    <div>filter</div>
		<br />
		<div>filter</div>
		<div>{{ code }}</div>
		<div> {{ code | codeFilter }} </div>
		<!-- 全局过滤器直接使用 -->
		<div> {{ code | buyfilter }} </div>
  </div>
</template>

<script>

export default {
  name: 'ajax',
  data() {
    return {
			code: 1
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
