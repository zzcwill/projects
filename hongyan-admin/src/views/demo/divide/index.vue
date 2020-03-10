<template>
  <div style="padding:30px;">
    <el-form ref="form" size="mini" :model="form" label-width="90px" inline>
      <el-form-item label="区域名称：" style="text-align: left">
        <el-input v-model="form.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="区域面积：" style="text-align: left">
        <el-input v-model="form.area" placeholder="请输入" />
      </el-form-item>
      <div>
        <el-form-item label="区域单价：" style="text-align: left">
          <el-input v-model="form.price" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="所属楼层：">
          <div class="block">
            <el-cascader
              v-model="form.value"
              :options="options"
              placeholder="园区/楼栋/楼层"
              @change="handleChange"
            />
          </div>
        </el-form-item>
      </div>
    </el-form>
    <div>
      <el-button size="mini" :type="strokePointFlag?'primary':''" @click="strokePointFlag = true">划定区域</el-button>
      <el-button size="mini" :type="!strokePointFlag?'primary':''" @click="strokePointFlag = false">框选区域</el-button>
      <el-button size="mini" type="primary" plain @click="points = '';tmpPoints = ''">完成</el-button>
    </div><br>
    <div ref="svgImg" class="stroke-point-img">
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
    </div><br>
    <div style="text-align: center">
      <el-button size="mini" type="primary" plain @click="quxiao">取消</el-button>
      <el-button size="mini" type="primary" plain @click="submit">提交</el-button>
    </div>

    <baidu-map
      class="baidu-map-view"
      ak="OXYVLzrcvcbTvYUiR5VRvby3159Iuzha"
      center="北京"
      scroll-wheel-zoom
      @ready="handler"
    >
    </baidu-map>
  </div>

</template>

<script>
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  export default {
    components: { BaiduMap },
    data() {
      return {
        strokePointFlag: true,
        points: '',
        startPointX: '',
        startPointY: '',
        movePointFlag: false,
        clickCancelFlag: true,
        tmpPoints: '',
        tmpPoint: '',
        form: {
          name: '',
          area: '',
          price: '',
          value: ''
        },
        name: '',
        area: '',
        price: '',
        value: [],

        options: [{
          value: 'yuanqu1',
          label: '园区1',
          children: [{
            value: 'loudong1',
            label: '楼栋1',
            children: [{
              value: 'louceng1',
              label: '楼层1'
            }, {
              value: 'louceng2',
              label: '楼层2'
            }, {
              value: 'louceng3',
              label: '楼层3'
            }, {
              value: 'louceng4',
              label: '楼层4'
            }]
          }, {
            value: 'loudong2',
            label: '楼栋2',
            children: [{
              value: 'louceng1',
              label: '楼层1'
            }, {
              value: 'louceng2',
              label: '楼层2'
            }]
          }]
        }, {
          value: 'yuanqu2',
          label: '园区2',
          children: [{
            value: 'loudong1',
            label: '楼栋1',
            children: [{
              value: 'louceng1',
              label: '楼层1'
            }, {
              value: 'louceng2',
              label: '楼层2'
            }, {
              value: 'louceng3',
              label: '楼层3'
            }, {
              value: 'louceng4',
              label: '楼层4'
            }]
          }, {
            value: 'loudong2',
            label: '楼栋2',
            children: [{
              value: 'louceng1',
              label: '楼层1'
            }, {
              value: 'louceng2',
              label: '楼层2'
            }]
          }]
        }]
      }
    },
    methods: {
      handler({ BMap, map }) {
        let geoc = new BMap.Geocoder()
        map.addEventListener('click', function(e) {
          map.clearOverlays()
          let pt = e.point
          let marker = new BMap.Marker(pt) // 创建标注
          map.addOverlay(marker) // 将标注添加到地图中
          geoc.getLocation(pt, function(rs) {
            console.log(rs)
            let addComp = rs.addressComponents
            console.log(addComp)
          })
        })
      },
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
      },
      query() {

      },
      reset() {

      },
      addRegion() {

      },
      handleChange(value) {
        console.log(value)
      },
      quxiao() {
        this.form.name = ''
        this.form.value = ''
        this.form.area = ''
        this.form.price = ''
      },
      add() {
      },
      submit() {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            this.add()
          } else {
            return false
          }
        })
      }

    }
  }
</script>
<style scoped>
  .baidu-map-view{
    width: 500px;
    height: 500px;
  }
  .stroke-point-img{
    height: 500px;
    background-size: 100% 100%;
    background-image: url("../../../assets/demo/test.jpg");
  }
</style>

