<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="130px" :rules="rules" :disabled="isView">
      <el-form-item label="商户名称:" prop="merchantName">
        <el-input v-model="form.merchantName"></el-input>
      </el-form-item>
      <el-form-item label="商户编号:" prop="merchantCode">
        <el-input v-model="form.merchantCode"></el-input>
      </el-form-item>
      <el-form-item label="商户联系电话:" prop="ownerPhone">
        <el-input v-model="form.ownerPhone"></el-input>
      </el-form-item>
    </el-form>

    <div v-if="!isView" style="text-align: right">
      <el-button type="primary" @click="edit">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { infoMerchant, addMerchant, editMerchant } from '@/api/shgl/shkh'
  export default {
    props: {
      type: String,
      id: String
    },
    data() {
      return {
        showSearch: false,
        areaValue: [],
        form: {
          merchantName: '',
          merchantCode: '',
          ownerPhone: ''
        },
        rules: {
          merchantName: [
            { required: true, message: '请输名称', trigger: 'blur' }
          ],
          merchantCode: [
            { required: true, message: '请输入编号', trigger: 'blur' }
          ],
          ownerPhone: [
            { required: true, message: '请输入电话', trigger: 'blur' }
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
        infoMerchant({ id: this.id }).then(res => {
          this.form = res.data
        }).catch(err => {
          this.$message.error(err)
        })
      },
      edit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (this.type === 'add') {
              addMerchant(this.form).then(res => {
                this.$emit('save')
              }).catch(err => {
                this.$message.error(err)
              })
            } else {
              editMerchant(this.form).then(res => {
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
  .el-cascader {
    width: 200px;
  }
</style>
