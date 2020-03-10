<template>
  <div>
    <baidu-map
      class="baidu-map-view"
      ak="OXYVLzrcvcbTvYUiR5VRvby3159Iuzha"
      center="杭州市"
      scroll-wheel-zoom
      @ready="handler"
    >
    </baidu-map>
  </div>
</template>

<script>
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  export default {
    name: 'CommonBaiduMap',
    components: { BaiduMap },
    props: {
      value: Object,
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        point: {}
      }
    },
    created() {
      this.point = this.value
    },
    methods: {
      handler({ BMap, map }) {
        let _this = this
        let geoc = new BMap.Geocoder()
        if (_this.value) {
          let marker = new BMap.Marker(_this.value) // 创建标注
          map.addOverlay(marker) // 将标注添加到地图中
        }

        if (!_this.disabled) {
          map.addEventListener('click', function(e) {
            map.clearOverlays()
            let pt = e.point
            let marker = new BMap.Marker(pt) // 创建标注
            map.addOverlay(marker) // 将标注添加到地图中
            geoc.getLocation(pt, function(rs) {
              let addComp = rs.addressComponents
              _this.$emit('change', addComp, pt)
            })
          })
        }
      }
    }
  }
</script>

<style scoped>
  .baidu-map-view{
    width: 100%;
    height: 500px;
  }
</style>
