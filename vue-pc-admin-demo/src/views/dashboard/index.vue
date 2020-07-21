<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ userInfo.realname }}</div>  
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {  
  name: 'dashboard',
  filters: {
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },    
  data() {
    return {
    }
  },  
  created() {
  },
  methods: {
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
