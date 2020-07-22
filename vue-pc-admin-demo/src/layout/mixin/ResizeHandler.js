import { judgeMobile } from '@/utils/config'

export default {
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  mounted() {
    const isMobile = judgeMobile()
    if (isMobile) {
      this.$router.push({
        path: '/nopc'
      })
    }
  },
  methods: {
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = judgeMobile()
        if (isMobile) {
          this.$router.push({
            path: '/nopc'
          })
        }
      }
    }
  }
}
