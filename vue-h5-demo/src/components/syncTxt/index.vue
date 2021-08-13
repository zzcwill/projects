<template>
  <div class="record">
    <div class="item">
      {{ txt }}
    </div>
    <div class="item">
      {{ txt2 }}
    </div>	
		<div class="item" @click="changeAyncTxt">子组件改变父组件值-changeAyncTxt</div>	
  </div>
</template>
<script>

export default {
	name: 'SyncTxt',
  props: {
    txt: {
      type: String,
      default: '',
    },
    txt2: {
      type: String,
      default: '',
    },				
	},
  data() {
    return {
    }
  },
  computed: {},
  mounted() {
  },
  methods: {
		changeAyncTxt() {
			let txt2 = ''
			if(this.txt2 === 'zzc2') {
				txt2 = 'test2'
			}else{
				txt2 = 'zzc2'
			}	
			this.$emit('update:txt2', txt2);
		}
  },
}
</script>
<style lang="less" scoped>
.record {
  display: flex;
  justify-content: center;
}
.item {
  margin-right: 30px;
  color: #059f87;
}
.item span {
  margin-left: 6px;
  font-size: 13px;
  color: #feab1a;
}
</style>