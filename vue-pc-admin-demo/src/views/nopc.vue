<template>
  <div class="nopc">
    <div class="tip">不支持手机端访问，请pc端访问</div>
  </div>
</template>

<script>
import { judgeMobile } from '@/utils/config'

export default {
  name: 'nopc',
  data() {
    return {
    }
  },
  mounted() {
    const isMobile = judgeMobile()
    if(!isMobile) {
      this.$router.push({ path: '/' })
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.nopc{
  padding-top: 50%;
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
