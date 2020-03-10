<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="130px" :rules="rules" :disabled="isView">
      <el-form-item label="楼层名称:" prop="floorName">
        <el-input v-model="form.floorName"></el-input>
      </el-form-item>
      <el-form-item label="楼层编号:" prop="floorCode">
        <el-input v-model="form.floorCode"></el-input>
      </el-form-item>

      <el-form-item v-if="showSearch || type==='add'" label="所属楼栋：" prop="buildingId">
        <yq-cascader :leaf="1" type="park" :value="areaValue" @change="changeCascader"></yq-cascader>
      </el-form-item>
      <br>
      <el-form-item v-if="showSearch || type==='add'" label="平面图上传:" prop="fileList">
        <img-upload v-model="form.fileList"></img-upload>
      </el-form-item>
    </el-form>

    <div v-if="!isView" style="text-align: right">
      <el-button type="primary" @click="edit">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { addFloor, infoFloor, editFloor } from '@/api/yqgl/yqxx'
  import yqCascader from '@/components/cascader'
  import imgUpload from '../components/upload'
  export default {
    components: { yqCascader, imgUpload },
    props: {
      type: String,
      id: String
    },
    data() {
      return {
        inputVisible: false,
        total: 1,
        inputValue: '',
        showSearch: false,
        areaValue: [],
        form: {
          floorName: '',
          floorCode: '',
          buildingId: '',
          floorNum: '',
          floorList: [],
          fileList: []
        },
        rules: {
          floorName: [
            { required: true, message: '请输名称', trigger: 'blur' }
          ],
          floorCode: [
            { required: true, message: '请输入编号', trigger: 'blur' }
          ],
          buildingId: [
            { required: true, message: '请选择楼栋', trigger: ['blur', 'change'] }
          ],
          fileList: [
            { required: false, message: '请上传平面图', trigger: ['blur', 'change'] }
          ]
        }
      }
    },
    computed: {
      isView() {
        return this.type === 'view'
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
      },
      query() {
        infoFloor({ id: this.id }).then(res => {
          this.form = res.data
          this.areaValue = [this.form.parkId, this.form.buildingId]

          this.setImg()

          this.showSearch = true
        })
      },
      setImg() {
        this.form.fileList = []
        for (let key in this.form) {
          if (key.indexOf('floorPlanUrl') !== -1 && this.form[key]) {
            this.form.fileList.push(this.form[key])
          }
        }
      },
      getImg() {
        if (this.form.fileList) {
          let i = 1
          this.form.fileList.forEach(item => {
            this.form['floorPlanUrl' + i] = item
            i++
          })
        }
      },
      edit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.getImg()

            if (this.type === 'add') {
              addFloor(this.form).then(res => {
                this.$emit('save')
              })
            } else {
              editFloor(this.form).then(res => {
                this.$emit('save')
              })
            }
          } else {
            return false
          }
        })
      },
      showInput() {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      delFloor(tag) {
        this.form.floorList.splice(this.form.floorList.indexOf(tag), 1)
      },
      addFloor() {
        let inputValue = this.inputValue
        if (inputValue) {
          this.form.floorList.push({ floorName: inputValue })
        }
        this.inputVisible = false
        this.inputValue = ''
      }
    }
  }
</script>

<style scoped>
  .el-input {
    width: 200px;
  }
  .el-autocomplete {
    width: 200px;
  }
  .el-select {
    width: 200px;
  }
  .el-cascader {
    width: 200px;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .input-new-tag {
    width: 90px;
  }
</style>
