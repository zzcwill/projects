<template>
  <div>
    <div>
      <el-button size="mini" :type="strokePointFlag?'primary':''" @click="strokePointFlag = true">划定区域</el-button>
      <el-button size="mini" :type="!strokePointFlag?'primary':''" @click="strokePointFlag = false">框选区域</el-button>
      <el-button size="mini" type="primary" plain @click="points = '' ; tmpPoints = ''">清除</el-button>
    </div>
    <br>
    <div ref="svgImg" class="stroke-point-img" :style="'background-image: url(' + imgUrl + ')'">
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        style="height: 100%;width: 100%;"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        @mouseup="clickPointUp"
        @mousemove="clickPointMove"
        @mousedown="clickPoint"
        @contextmenu.prevent="clickCancel"
      >
        <polygon :points="points" style="fill:rgba(0,0,0,0.8);stroke:red;stroke-width:1;opacity: 0.3;" />
      </svg>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      imgUrl: String,
      value: String
    },
    data() {
      return {
        strokePointFlag: true,
        points: '',
        tmpPoints: '',
        startPointX: '',
        startPointY: '',
        movePointFlag: false,
        clickCancelFlag: true,
        tmpPoint: '',
      }
    },
    created() {
      this.points = this.value
    },
    watch: {
      points: function() {
        this.$emit('input', this.points)
      }
    },
    methods: {
      getX(x) {
        return (x * 1000) / this.$refs.svgImg.offsetWidth
      },
      getY(y) {
        return (y * 1000) / this.$refs.svgImg.offsetHeight
      },
      clickPoint(event) {
        this.clickCancelFlag = true
        let point = this.getX(event.offsetX) + ',' + this.getY(event.offsetY)
        if (!this.strokePointFlag) {
          this.points = ''
          this.startPointX = this.getX(event.offsetX)
          this.startPointY = this.getY(event.offsetY)
        } else {
          point = this.tmpPoint
        }
        if (this.points) {
          point = ' ' + point
        }
        this.movePointFlag = true
        this.points = this.points + point
        this.tmpPoints = this.points + ''
      },
      clickPointMove(event) {
        if (this.strokePointFlag && this.clickCancelFlag) {
          this.tmpPoint = this.getX(event.offsetX) + ',' + this.getY(event.offsetY)
          if (this.points) {
            this.tmpPoint = ' ' + this.tmpPoint
          }
          this.points = this.tmpPoints + this.tmpPoint
        }
        if (!this.strokePointFlag && this.movePointFlag) {
          this.points = this.startPointX + ',' + this.startPointY
          let point2 = ' ' + this.startPointX + ',' + this.getY(event.offsetY)
          let point3 = ' ' + this.getX(event.offsetX) + ',' + this.getY(event.offsetY)
          let point4 = ' ' + this.getX(event.offsetX) + ',' + this.startPointY

          this.points = this.points + point2
          this.points = this.points + point3
          this.points = this.points + point4
        }
      },
      clickPointUp(event) {
        this.movePointFlag = false
      },
      clickCancel() {
        this.clickCancelFlag = false
        return false
      }
    }
  }
</script>

<style scoped>

</style>
