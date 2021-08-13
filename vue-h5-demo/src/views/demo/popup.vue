<template>
  <div class="PopupPage">
    <popup :title="title" :text="text" :callBack="callBack" ref="refPopup" />

    <div class="m-t-10 text-c" @click="changePopup">changePopup</div>
		<div class="m-t-10 text-c" @click="changePlugPopup">changePlugPopup</div>
  </div>
</template>

<script>
import popup from '@/components/popup'

export default {
  name: 'PopupPage',
  data() {
    return {
      title: 'title',
      text: 'text',
			txt: 'father'
    }
  },
  components: {
    popup,
  },
  filters: {},
  created() {},
  mounted() {
		console.info(this)
	},
  destoryed() {},
  methods: {
    callBack() {
      console.info(this)
			console.info(this.txt)
    },
    changePopup() {
      this.$refs.refPopup.changeVisible()
    },
    changePlugPopup() {
			let that = this
      this.plug.popup.open({
        title: 'title2',
        text: 'text2',
        callBack() {
					// 页面组件
					console.info(that)
					// 插件组件
          console.info(this)
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
</style>