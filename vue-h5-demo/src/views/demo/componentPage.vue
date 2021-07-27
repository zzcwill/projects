<template>
  <div>
		<pie
			:renderData="pieOption.renderData"
			:legendColor="pieOption.legendColor"
			:domId="pieOption.domId"
			:titleName="pieOption.titleName"
			@clickItem="pieOption.clickItem"
			:unit="pieOption.unit"
		/>
  </div>
</template>

<script>
import pie from '@/components/pie'
import { topicsApi } from '@/api/user'

export default {
  name: 'componentPage',
  data() {
    return {
      // 饼图
      pieOption: {
        unit: '株',
        renderData: [
          {
            name: '一级',
            value: 415,
          },
          {
            name: '二级',
            value: 1538,
          },
          {
            name: '三级',
            value: 3499,
          },
        ],
        legendColor: ['#34d85f', '#FFBE2E', '#30A2FA'],
        domId: 'pieOne',
        titleName: '2021年',
        clickItem: (item) => {
          console.info(item)
          this.openPopup(2)
        },
      },
    }
  },
	components: {
		pie
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
#pieOne {
  width: 750px !important;
  height: 450px !important;
}
</style>
