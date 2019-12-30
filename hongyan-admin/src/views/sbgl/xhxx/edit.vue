<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="130px" :rules="rules">
      <el-form-item label="型号名称:" prop="modelName">
        <el-input v-model="form.modelName" placeholder="型号名称" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="型号编号:" prop="modelCode">
        <el-input v-model="form.modelCode" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item v-if="showSearch || type==='add'" label="产品:" prop="productId">
        <search
          type="product"
          show-name="productName"
          :value="form.productId"
          :disabled="isView"
          @change="changeSearch"
        >
        </search>
      </el-form-item>
    </el-form>

    <div v-if="!isView" style="text-align: right">
      <el-button type="primary" @click="edit">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { infoDeviceModel, addDeviceModel, editDeviceModel } from '@/api/sbgl/xhxx'
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
        form: {
          modelName: '',
          modelCode: '',
          productId: ''
        },
        rules: {
          modelName: [
            { required: true, message: '请输名称', trigger: 'blur' }
          ],
          modelCode: [
            { required: true, message: '请输入企业编号', trigger: 'blur' }
          ],
          productId: [
            { required: true, message: '请输入联系人姓名', trigger: ['blur', 'change'] }
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
      changeSearch(item) {
        this.form.productId = item.id
        this.form.productName = item.productName

        this.form.producerId = item.producerId
        this.form.producerName = item.producerName
        this.form.productTypeId = item.productTypeId
        this.form.productTypeName = item.productTypeName
        this.form.nodeType = item.nodeType
        this.form.networkMode = item.networkMode
        this.form.msgType = item.msgType
        this.form.safeType = item.safeType
      },
      query() {
        infoDeviceModel({ id: this.id }).then(res => {
          this.form = res.data
          this.showSearch = true
        }).catch(err => {
          this.$message.error(err)
        })
      },
      edit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (this.type === 'add') {
              addDeviceModel(this.form).then(res => {
                this.$emit('save')
              }).catch(err => {
                this.$message.error(err)
              })
            } else {
              editDeviceModel(this.form).then(res => {
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
