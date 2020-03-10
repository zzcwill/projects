<template>
  <div style="padding:30px;">
    <el-form ref="form" size="mini" :model="form" label-width="130px" inline :rules="rules" :disabled="isView">
      <el-form-item label="区域类型：" prop="fb1">
        <el-select v-model="form.fb1" placeholder="请选择" @change="changeType">
          <el-option
            v-for="item in Object.keys(typeOptions)"
            :key="item"
            :label="typeOptions[item]"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="区域名称：" prop="areaName">
        <el-input v-model="form.areaName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="区域面积：" prop="areaSpace">
        <el-input v-model="form.areaSpace" laceholder="请输入" />
      </el-form-item>
      <el-form-item label="区域单价：" prop="areaPrice">
        <el-input v-model="form.areaPrice" placeholder="请输入" />
      </el-form-item>
      <el-form-item v-if="showFloor||isAdd" label="所属园区或楼层：" prop="parkId">
        <yq-cascader ref="yqCascader" :leaf="leaf" type="park" :value="floorValue" @change="changeCascader"></yq-cascader>
      </el-form-item>
      <el-form-item v-if="showFloor||isAdd" label="区域位置：" prop="areaPosition">

      </el-form-item>
    </el-form>

    <img-area v-if="imgUrl" v-model="form.areaPosition" :img-url="imgUrl"></img-area>
    <br>
    <div style="text-align: right">
      <el-button size="mini" type="primary" @click="submit">保存</el-button>
    </div>

  </div>

</template>

<script>
  import { addArea, getArea, editArea } from '@/api/yqgl/qyxx'
  import { infoFloor, getPark } from '@/api/yqgl/yqxx'
  import yqCascader from '@/components/cascader'
  import imgArea from '../components/imgArea'
  export default {
    components: { yqCascader, imgArea },
    props: {
      id: String,
      type: String
    },
    data() {
      return {
        typeOptions: {
          '1': '室外',
          '2': '室内'
        },
        leaf: 0,
        imgUrl: '',
        form: {
          fb1: '1',
          areaName: '',
          areaSpace: '',
          areaPrice: '',
          areaPosition: '',
          parkId: ''
        },
        floor: {},
        floorValue: [],
        showFloor: false,
        rules: {
          fb1: [
            { required: true, message: '请选中区域类型', trigger: 'blur' }
          ],
          areaName: [
            { required: true, message: '请输入区域名称', trigger: 'blur' }
          ],
          areaSpace: [
            { required: true, message: '请输入区域面积', trigger: 'blur' }
          ],
          areaPrice: [
            { required: true, message: '请输入区域单价', trigger: 'blur' }
          ],
          areaPosition: [
            { required: true, message: '请选择区域位置', trigger: ['blur', 'change'] }
          ],
          parkId: [
            { required: true, message: '请选择园区', trigger: 'blur' }
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
      },
      isYq() {
        return this.form.fb1 === '1'
      }
    },
    created() {
      if (this.type !== 'add') {
        this.query()
      }
    },
    methods: {
      changeType() {
        if (this.isYq) {
          this.leaf = 0
        } else {
          this.leaf = 10
        }
        this.$refs.yqCascader.reload()
      },
      changeCascader(value) {
        this.form.parkId = value[0].value
        this.form.parkName = value[0].label
        if (!this.isYq) {
          this.form.buildingId = value[1].value
          this.form.buildingName = value[1].label
          this.form.floorId = value[2].value
          this.form.floorName = value[2].label
        } else {
          this.form.buildingId = ''
          this.form.buildingName = ''
          this.form.floorId = ''
          this.form.floorName = ''
        }

        this.getImg()
      },
      query() {
        getArea({ id: this.id }).then(res => {
          this.form = res.data
          if (this.isYq) {
            this.floorValue = [this.form.parkId]
            this.leaf = 0
          } else {
            this.floorValue = [this.form.parkId, this.form.buildingId, this.form.floorId]
            this.leaf = 10
          }

          this.showFloor = true
          this.getImg()
        })
      },
      getImg() {
        if (!this.isYq) {
          this.getFloor()
        } else {
          this.getPark()
        }
      },
      getPark() {
        getPark({ id: this.form.parkId }).then(res => {
          this.imgUrl = res.data.parkPlanUrl1
        }).catch(err => {
          this.$message.error(err)
        })
      },
      getFloor() {
        infoFloor({ id: this.form.floorId }).then(res => {
          this.imgUrl = res.data.floorPlanUrl1
        }).catch(err => {
          this.$message.error(err)
        })
      },
      submit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
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

