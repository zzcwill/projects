<template>
  <div>
    <table-popup ref="refTablePopup">
      <pie
        :renderData="pieOption.renderData"
        :legendColor="pieOption.legendColor"
        :domId="pieOption.domId"
        :titleName="pieOption.titleName"
        @clickItem="pieOption.clickItem"
        :unit="pieOption.unit"
        v-if="showPie"
      />
      <div class="no-pie text-c" v-if="!showPie">
        no-pie
      </div>
    </table-popup>

    <div class="m-t-10 text-c" @click="change" >change</div>
  </div>
</template>

<script>
import tablePopup from '@/components/tablePopup'
import pie from '@/components/pie'
import { topicsApi } from '@/api/user'

export default {
  name: 'componentPage2',
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
        domId: 'pieOne2',
        titleName: '2021年',
        clickItem: (item) => {
          console.info(item)
        },
      },
      showPie: false
    }
  },
	components: {
    pie,
		tablePopup
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
