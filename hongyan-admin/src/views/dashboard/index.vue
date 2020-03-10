<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div class="drawer-item">
      <span>change主题</span>
      <theme-picker class="m-t-3 m-r-8 h26" @change="themeChange" />
    </div>    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ThemePicker from '@/components/ThemePicker'

export default {
  name: 'Dashboard',
  components: { 
    ThemePicker 
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    themeChange(val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val
      })
    }
  }  
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
