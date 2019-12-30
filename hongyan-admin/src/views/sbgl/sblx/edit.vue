<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="130px" :rules="rules">
      <el-form-item label="类型名称:" prop="deviceTypeName">
        <el-input v-model="form.deviceTypeName" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="类型编号:" prop="deviceTypeCode">
        <el-input v-model="form.deviceTypeCode" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="类型说明:" prop="deviceTypeDescribe">
        <el-input v-model="form.deviceTypeDescribe" :disabled="isView"></el-input>
      </el-form-item>
    </el-form>

    <div v-if="!isView" style="text-align: right">
      <el-button type="primary" @click="edit">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { infoDeviceType, editDeviceType, addDeviceType } from '@/api/sbgl/sblx'
  export default {
    props: {
      type: String,
      id: String
    },
    data() {
      return {
        form: {
          deviceTypeName: '',
          deviceTypeCode: '',
          deviceTypeDescribe: ''
        },
        rules: {
          deviceTypeName: [
            { required: true, message: '请输名称', trigger: 'blur' }
          ],
          deviceTypeCode: [
            { required: true, message: '请输入编号', trigger: 'blur' }
          ],
          deviceTypeDescribe: [
            { required: true, message: '请输入说明', trigger: 'blur' }
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
      query() {
        infoDeviceType({ id: this.id }).then(res => {
          this.form = res.data
        }).catch(err => {
          this.$message.error(err)
        })
      },
      edit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (this.type === 'add') {
              addDeviceType(this.form).then(res => {
                this.$emit('save')
              }).catch(err => {
                this.$message.error(err)
              })
            } else {
              editDeviceType(this.form).then(res => {
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
  .el-input {
    width: 200px;
  }
  .el-autocomplete {
    width: 200px;
  }
  .el-select {
    width: 200px;
  }
</style>
