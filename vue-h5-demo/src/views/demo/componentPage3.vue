<template>
  <div>
		<base-layout>
			<template v-slot:header>
				<h1>header</h1>
			</template>

			<template v-slot:default>
			<p>main</p>
			</template>

			<template v-slot:footer>
				<p>footer</p>
			</template>
		</base-layout>
		<br />
		<base-layout>
		</base-layout>		
  </div>
</template>

<script>
import baseLayout from '@/components/baseLayout'

export default {
  name: 'componentPage3',
  data() {
    return {
    }
  },
	components: {
		baseLayout
	},
  created() {
  },
  mounted() {
	},
  destoryed() {

  },
  methods: {
    async change() {
      this.showPie = !this.showPie
      this.$refs.refTablePopup.changeVisible()
    },    
	},
}
</script>

<style lang="less" scoped>
#pieOne2 {
  width: 560px !important;
  height: 300px !important;
}
</style>
