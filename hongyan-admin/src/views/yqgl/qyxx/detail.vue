<template>
  <div style="padding:30px;">
    <el-form ref="form" size="mini" :model="form" label-width="130px" inline :rules="rules" :disabled="isView">
      <el-form-item label="区域名称：" prop="areaName">
        <el-input v-model="form.areaName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="区域面积：" prop="areaSpace">
        <el-input v-model="form.areaSpace" laceholder="请输入" />
      </el-form-item>
      <el-form-item label="区域单价：" prop="areaPrice">
        <el-input v-model="form.areaPrice" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="所属楼层：" prop="floorId" v-if="showFloor||isAdd">
        <yq-cascader type="park" @change="changeCascader" :value="floorValue"></yq-cascader>
      </el-form-item>
    </el-form>
    <div>
      <el-button size="mini" :type="strokePointFlag?'primary':''" @click="strokePointFlag = true">划定区域</el-button>
      <el-button size="mini" :type="!strokePointFlag?'primary':''" @click="strokePointFlag = false">框选区域</el-button>
      <el-button size="mini" type="primary" plain @click="points = '' ; tmpPoints = ''">清除</el-button>
    </div>
    <br>
    <div ref="svgImg" class="stroke-point-img" :style="'background-image: url(' + floor.floorPlanUrl1 + ')'">
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
    <br>
    <div style="text-align: right">
      <el-button size="mini" type="primary" @click="submit">保存</el-button>
    </div>

  </div>

</template>

<script>
  import { addArea, getArea, editArea } from '@/api/yqgl/qyxx'
  import { infoFloor } from '@/api/yqgl/yqxx'
  import yqCascader from '@/components/cascader'

  export default {
    components: { yqCascader },
    props: {
      id: String,
      type: String
    },
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
          areaName: '',
          areaSpace: '',
          areaPrice: '',
          areaPosition: '',
          floorId: ''
        },
        floor: {},
        floorValue: [],
        showFloor: false,
        rules: {
          areaName: [
            { required: true, message: '请输区域名称', trigger: 'blur' }
          ],
          areaSpace: [
            { required: true, message: '请输入区域面积', trigger: 'blur' }
          ],
          areaPrice: [
            { required: true, message: '请输入区域单价', trigger: 'blur' }
          ],
          floorId: [
            { required: true, message: '请选择楼层', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      isView() {
        return this.type === 'view'
      },
      isEdit() {
        return this.type === 'edit'
      },
      isAdd() {
        return this.type === 'add'
      }
    },
    created() {
      if (this.type !== 'add') {
        this.query()
      }
    },
    methods: {
      changeCascader(value) {
        this.form.parkId = value[0].value
        this.form.parkName = value[0].label
        this.form.buildingId = value[1].value
        this.form.buildingName = value[1].label
        this.form.floorId = value[2].value
        this.form.floorName = value[2].label

        this.getFloor()
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
        getArea({ id: this.id }).then(res => {
          this.form = res.data
          this.points = res.data.areaPosition
          this.floorValue = [this.form.parkId, this.form.buildingId, this.form.floorId]
          this.showFloor = true
          this.getFloor()
        }).catch(err => {
          this.$message.error(err)
        })
      },
      getFloor() {
        infoFloor({ id: this.form.floorId }).then(res => {
          this.floor = res.data
        }).catch(err => {
          this.$message.error(err)
        })
      },
      submit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.form.areaPosition = this.points
            if (this.isEdit) {
              editArea(this.form).then(res => {
                this.$emit('save')
              }).catch(err => {
                this.$message.error(err)
              })
            } else {
              addArea(this.form).then(res => {
                this.$emit('save')
              }).catch(err => {
                this.$message.error(err)
              })
            }
          } else {
            return false
          }
        })
      }

    }
  }
</script>
<style scoped>
  .baidu-map-view {
    width: 500px;
    height: 500px;
  }

  .stroke-point-img {
    height: 500px;
    background-size: 100% 100%;
  }

  .el-input {
    width: 200px;
  }
  .el-select {
    width: 200px;
  }
  .el-autocomplete {
    width: 200px;
  }
  .el-cascader{
    width: 200px;
  }
</style>

