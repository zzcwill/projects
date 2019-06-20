<template>
  <div class="Tip" v-show="visible">
    <div class="txt">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'Tip',
  props: {
    text: {
      type: String,
      default: 'tip-error'
    },
    time: {
      type: Number,
      default: 2500
    }
  },
  data() {
    return {
      visible: false
    }
  },
  mounted() {},
  methods: {
    open() {
      this.visible = true
      clearTimeout(this.timeout)
      if (this.time > 0) {
        this.timeout = setTimeout(() => {
          this.hide()
        }, this.time)
      }
    },
    hide() {
      this.visible = false
      clearTimeout(this.timeout)
    }
  }
}
</script>

<style lang="less">
.Tip {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -160px;
  margin-top: -40px;
  width: 320px;
  height: 80px;
  opacity: 0.8;
  background-color: #000;
  border-radius: 5px;
  z-index:9000;
  .txt {
    text-align: center;
    line-height: 80px;
    font-size: 28px;
    color: #fff;
  }
}
</style>
