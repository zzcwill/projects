<template>
  <div class="record">
    <div class="item">
      累计访问量<span>{{ numData.num1 }}</span>
    </div>
    <div class="item">
      月访问量<span>{{ numData.num2 }}</span>
    </div>
    <div class="item">
      活跃度<span>{{ numData.num3 }}</span
      >℃
    </div>
  </div>
</template>
<script>

export default {
	name: 'Record',
  props: {},
  data() {
    return {
      numData: {
        num1: 1,
        num2: 1,
        num3: 96,
      },
    }
  },
  computed: {},
  mounted() {
    this.judgeHasData()
    this.addData()
  },
  methods: {
    judgeHasData() {
      let numData = window.localStorage.getItem('numData')
      if (!numData) {
        let numData = {
          num1: 100,
          num2: 100,
          num3: 96,
        }
        window.localStorage.setItem('numData', JSON.stringify(numData))
      }
      if (numData) {
        numData = JSON.parse(numData)
        this.numData = numData
      }
    },
    async addData() {
      // let res = await weatherApi()
      // let data = res.lives[0]
      this.numData = {
        ...this.numData,
        num1: this.numData.num1 + 1,
        num2: this.numData.num2 + 1,
      }
			let { num1, num2, num3 } = this.numData
			let numData = {
				num1,
				num2,
				num3 
			}
      window.localStorage.setItem('numData', JSON.stringify(numData))
    },

		getData() {
			console.info(this.numData)
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