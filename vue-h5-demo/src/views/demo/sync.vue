<template>
  <div>
		<sync-txt :txt2.sync='txt2' :txt='txt' />

    <div class="m-t-10 text-c" @click="changeTxt" >changeTxt</div>
		<div class="m-t-10 text-c" @click="changeTxt2" >changeTxt</div>
  </div>
</template>

<script>
import syncTxt from '@/components/syncTxt'

export default {
  name: 'sync',
  data() {
    return {
			txt: 'zzc',
			txt2: 'zzc2'
    }
  },
	components: {
		syncTxt
	},	
	filters: {
	},
  created() {
  },
  mounted() {
	},
  destoryed() {

  },
  methods: { 
    changeTxt() {
			console.info(this.txt)

			if(this.txt === 'zzc') {
				this.txt = 'test'
			}else{
				this.txt = 'zzc'
			}	
			
			console.info(this.txt)
    },
    changeTxt2() {
			console.info(this.txt2)

			if(this.txt2 === 'zzc2') {
				this.txt2 = 'test2'
			}else{
				this.txt2 = 'zzc2'
			}			
		
			console.info(this.txt2)
    } 		 
	},
}
</script>

<style lang="less" scoped>

</style>
