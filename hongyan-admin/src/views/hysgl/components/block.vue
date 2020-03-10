<template>
  <div :class="isApply" class="block-apply">
  </div>
</template>

<script>
  export default {
    props: {
      id: String,
      item: String,
      apply: Object,
      applyData: Array
    },
    computed: {
      //是否有预约
      isApply() {
        let bg = 'table-bg'

        let time = Number(this.item.replace(':', ''))

        // 设置已预约会议室背景色
        if (this.applyData) {
          for (let i = 0; i < this.applyData.length; i++) {
            let applyItem = this.applyData[i]
            let start = Number(applyItem.startTime.replace(':', ''))
            let end = Number(applyItem.endTime.replace(':', ''))
            if (time >= start && time <= end) {
              bg = 'table-bg-color'
              return bg
            }
          }
        }

        // 设置选中会议室背景色
        if (this.id === this.apply.conferenceId) {
          let startTime = Number(this.apply.startTime.replace(':', ''))
          let endTime = Number(this.apply.tendTime.replace(':', ''))
          if (time >= startTime && time <= endTime) {
            bg = 'table-bg-apply'
            return bg
          }
        }

        return bg
      }
    }
  }
</script>

<style scoped>
  .block-apply{
    height: 30px;
    width: 100%;
  }
  .table-bg{
    border-left: 1px solid #ebeef5;
  }
  .table-bg-color {
    padding: 1px 0px;
    background-color: #ffa600;
  }
  .table-bg-apply {
    padding: 1px 0px;
    background-color: #1890ff;
  }
</style>
