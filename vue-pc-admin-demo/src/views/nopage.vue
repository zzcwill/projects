<template>
  <div class="nopage">
    <div class="tip">当前访问页面不存在，你输入正确页面</div>
  </div>
</template>

<script>

export default {
  name: 'nopage',
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.nopage{
  padding: 300px;
  margin: 0 auto;
  width: 80%;
  .tip{
    text-align: center;
    font-size: 13px;
    line-height: 21px;
    color: grey;
  }
}
</style>
