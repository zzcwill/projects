<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="130px" :rules="rules" :disabled="isView">
      <el-form-item label="策略组编号:" prop="groupCode">
        <el-input v-model="form.groupCode"></el-input>
      </el-form-item>
      <el-form-item label="策略组名称:" prop="groupName">
        <el-input v-model="form.groupName"></el-input>
      </el-form-item>
      <el-form-item v-if="showSearch || type==='add'" label="所属园区:" prop="parkId">
        <search
          type="park"
          show-name="parkName"
          :value="form.parkId"
          @change="changePark"
        >
        </search>
      </el-form-item>
      <el-form-item label="策略组类型:" prop="typeId">
        <el-select v-model="form.typeId">
          <el-option
            v-for="item of Object.keys(typeOption)"
            :key="item"
            :value="item"
            :label="typeOption[item]"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态:" prop="stateCode">
        <el-select v-model="form.stateCode">
          <el-option
            v-for="item of Object.keys(stateOption)"
            :key="item"
            :value="item"
            :label="stateOption[item]"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div v-if="!isView" style="text-align: right">
      <el-button type="primary" @click="edit">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { infoDsGroup, addDsGroup, editDsGroup } from '@/api/sbgl/clfz'
  import search from '@/components/search'
  export default {
    components: { search },
    props: {
      type: String,
      id: String
    },
    data() {
      return {
        showSearch: false,
        typeOption: {
          '1': '设备',
          '2': '环控',
          '3': '监控',
          '4': '定时器'
        },
        stateOption: {
          '1': '有效',
          '2': '无效'
        },
        form: {
          parkId: '',
          groupCode: '',
          groupName: '',
          typeId: '',
          stateCode: ''
        },
        rules: {
          parkId: [
            { required: true, message: '请选择园区', trigger: 'change' }
          ],
          groupCode: [
            { required: true, message: '请输入编号', trigger: 'blur' }
          ],
          groupName: [
            { required: true, message: '请输入策略组名称', trigger: 'blur' }
          ],
          typeId: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ],
          stateCode: [
            { required: true, message: '请选择状态', trigger: ['blur', 'change'] }
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
      changePark(item) {
        this.form.parkId = item.id
        this.form.parkName = item.parkName
      },
      query() {
        infoDsGroup({ id: this.id }).then(res => {
          this.form = res.data
          this.showSearch = true
        })
      },
      edit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.form.stateName = this.stateOption[this.form.stateCode]
            this.form.typeName = this.typeOption[this.form.typeId]
            if (this.type === 'add') {
              addDsGroup(this.form).then(res => {
                this.$emit('save')
              })
            } else {
              editDsGroup(this.form).then(res => {
                this.$emit('save')
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
</style>
