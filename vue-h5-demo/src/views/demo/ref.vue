<template>
  <div>
		<record ref="refRecord" />

    <div class="m-t-10 text-c" @click="getRecord" ref="refRecordTxt" data-id="txt">getRecord</div>
  </div>
</template>

<script>
import record from '@/components/record'

export default {
  name: 'refPage',
  data() {
    return {
			code: 1
    }
  },
	components: {
		record
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
    getRecord() {
      // 获取dom
      console.info(this.$refs.refRecordTxt)
      console.info(this.$refs.refRecordTxt.innerText)
      console.info(this.$refs.refRecordTxt.getAttribute('class'))
      console.info(this.$refs.refRecordTxt.getAttribute('data-id'))
      console.info('----')
      // 获取子组件方法
      this.$refs.refRecord.getData()
      console.info(this.$refs.numData)
    }  
	},
}
</script>

<style lang="less" scoped>

</style>
