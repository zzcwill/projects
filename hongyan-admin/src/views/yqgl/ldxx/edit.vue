<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="130px" :rules="rules" :disabled="isView">
      <el-form-item label="楼栋名称:" prop="buildingName">
        <el-input v-model="form.buildingName"></el-input>
      </el-form-item>
      <el-form-item label="楼栋编号:" prop="buildingCode">
        <el-input v-model="form.buildingCode"></el-input>
      </el-form-item>

      <el-form-item v-if="showSearch || type==='add'" label="所属园区：" prop="parkId">
        <yq-cascader :leaf="0" type="park" :value="areaValue" @change="changeCascader"></yq-cascader>
      </el-form-item>

      <el-form-item label="快速添加：">
        <el-switch
          v-model="fast"
          @change="changeFast"
        >
        </el-switch>
      </el-form-item>

      <el-form-item v-show="fast" label="地上层数:">
        <el-input v-model="fastLand" @input="changeCs"></el-input>
      </el-form-item>
      <el-form-item v-show="fast" label="地下层数:">
        <el-input v-model="fastUnder" @input="changeCs"></el-input>
      </el-form-item>

      <el-form-item v-show="!fast" label="楼层编号:">
        <div class="form-lc">
          <el-tag
            v-for="(tag,index) in form.floorList"
            :key="index"
            closable
            size="medium"
            :disable-transitions="false"
            @close="delFloor(tag)"
          >
            {{ tag.floorName }}
          </el-tag>
          <el-input
            v-if="inputVisible"
            ref="saveTagInput"
            v-model="inputValue"
            class="input-new-tag"
            @keyup.enter.native="addFloor"
            @blur="addFloor"
          >
          </el-input>
          <el-button v-else class="input-new-tag" size="mini" @click="showInput">新增楼层</el-button>
        </div>
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
  import { addBuilding, infoBuilding, editBuilding, listFloor } from '@/api/yqgl/yqxx'
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
        fast: false,
        fastUnder: 0,
        fastLand: 0,
        inputVisible: false,
        total: 1,
        inputValue: '',
        showSearch: false,
        areaValue: [],
        form: {
          buildingName: '',
          buildingCode: '',
          parkId: '',
          floorNum: '',
          floorList: [],
          fileList: []
        },
        rules: {
          buildingName: [
            { required: true, message: '请输名称', trigger: 'blur' }
          ],
          buildingCode: [
            { required: true, message: '请输入编号', trigger: 'blur' }
          ],
          parkId: [
            { required: true, message: '请选择园区', trigger: ['blur', 'change'] }
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
      changeFast() {
        this.fastLand = 0
        this.fastUnder = 0
      },
      changeCs() {
        this.fastLand = Number(this.fastLand)
        this.fastUnder = Number(this.fastUnder)
        this.form.floorList = []
        for (let i = 0; i < this.fastLand; i++) {
          this.form.floorList.push({ floorName: `${i + 1}层` })
        }
        for (let i = 0; i < this.fastUnder; i++) {
          this.form.floorList.push({ floorName: `地下${i + 1}层` })
        }
      },
      setImg() {
        this.form.fileList = []
        for (let key in this.form) {
          if (key.indexOf('buildingPlanUrl') !== -1 && this.form[key]) {
            this.form.fileList.push(this.form[key])
          }
        }
      },
      getImg() {
        if (this.form.fileList) {
          let i = 1
          this.form.fileList.forEach(item => {
            this.form['buildingPlanUrl' + i] = item
            i++
          })
        }
      },
      changeCascader(value) {
        this.form.parkId = value[0].value
        this.form.parkName = value[0].label
      },
      query() {
        infoBuilding({ id: this.id }).then(res => {
          this.form = res.data
          this.areaValue = [this.form.parkId]
          this.setImg()
          this.showSearch = true
          this.getFloor()
        })
      },
      getFloor() {
        let param = { buildingId: this.id }
        listFloor(param).then(res => {
          this.$set(this.form, 'floorList', res.data)
        })
      },
      edit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.form.floors = JSON.stringify(this.form.floorList)
            this.form.floorNum = this.form.floorList.length
            this.getImg()
            if (this.type === 'add') {
              addBuilding(this.form).then(res => {
                this.$emit('save')
              })
            } else {
              editBuilding(this.form).then(res => {
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
  .el-switch {
    width: 200px;
  }
  .el-tag + .el-tag {
    margin-bottom: 10px;
    margin-right: 10px;
  }
  .form-lc{
    width: 200px;
  }
  .input-new-tag {
    width: 90px;
  }
</style>
