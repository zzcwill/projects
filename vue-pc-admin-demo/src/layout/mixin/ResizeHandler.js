// import store from '@/store'

// const { body } = document
// const WIDTH = 992

export default {
  // watch: {
  //   $route(route) {
  //     if (this.device === 'mobile' && this.sidebar.opened) {
  //       store.dispatch('app/closeSideBar', { withoutAnimation: false })
  //     }
  //   }
  // },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  mounted() {
    const isMobile = this.judgeMobile()
    if (isMobile) {
      this.$router.push({
        path: '/nopage',
        query: {  
          nopageTip: '不支持手机端，请电脑访问',
          phone: 1
        } 
      })
    }
  },
  methods: {
    judgeMobile() {
      var isMobile = /Android|Windows Phone|iPhone|iPod/i.test(navigator.userAgent)
      return isMobile
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.judgeMobile()
        // store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          this.$router.push({
            path: '/nopage',
            query: { 
              nopageTip: '不支持手机端，请电脑访问',
              phone: 1
            } 
          })
        }
      }
    }
  }
}
