<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="130px" :rules="rules">
      <el-form-item label="厂商名称:" prop="producerName">
        <el-input v-model="form.producerName" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="厂商编号:" prop="producerCode">
        <el-input v-model="form.producerCode" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="联系人姓名:" prop="contactName">
        <el-input v-model="form.contactName" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="联系人电话:" prop="contactTelephone">
        <el-input v-model="form.contactTelephone" :disabled="isView"></el-input>
      </el-form-item>

      <el-form-item v-if="showSearch || type==='add'" label="厂商省市区：" prop="officeArea">
        <area-cascader type="city" :value="areaValue" :disabled="isView" @change="changeCascader"></area-cascader>
      </el-form-item>
      <el-form-item label="厂商地址：" prop="officeAddrress">
        <el-input v-model="form.officeAddrress" :disabled="isView"></el-input>
      </el-form-item>
    </el-form>

    <div v-if="!isView" style="text-align: right">
      <el-button type="primary" @click="edit">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { infoDeviceProducer, editDeviceProducer, addDeviceProducer } from '@/api/sbgl/sccs'
  import areaCascader from '@/components/cascader'
  export default {
    components: { areaCascader },
    props: {
      type: String,
      id: String
    },
    data() {
      return {
        showSearch: false,
        form: {
          producerCode: '',
          producerName: '',
          contactName: '',
          contactTelephone: '',
          officeProvince: '',
          officeCity: '',
          officeArea: '',
          officeAddrress: ''
        },
        areaValue: [],
        rules: {
          producerName: [
            { required: true, message: '请输名称', trigger: 'blur' }
          ],
          producerCode: [
            { required: true, message: '请输入编号', trigger: 'blur' }
          ],
          contactName: [
            { required: true, message: '请输入联系人姓名', trigger: 'blur' }
          ],
          contactTelephone: [
            { required: true, message: '请输入联系人电话', trigger: 'blur' }
          ],
          officeArea: [
            { required: true, message: '请输入厂商地区', trigger: ['blur', 'change'] }
          ],
          officeAddrress: [
            { required: true, message: '请输入厂商地址', trigger: 'blur' }
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
      changeCascader(item) {
        this.form.officeProvince = item[0].value
        this.form.officeCity = item[1].value
        this.form.officeArea = item[2].value
      },
      query() {
        infoDeviceProducer({ id: this.id }).then(res => {
          this.form = res.data
          this.areaValue[0] = res.data.officeProvince
          this.areaValue[1] = res.data.officeCity
          this.areaValue[2] = res.data.officeArea
          console.log(this.areaValue)
          this.showSearch = true
        }).catch(err => {
          this.$message.error(err)
        })
      },
      edit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (this.type === 'add') {
              addDeviceProducer(this.form).then(res => {
                this.$emit('save')
              }).catch(err => {
                this.$message.error(err)
              })
            } else {
              editDeviceProducer(this.form).then(res => {
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
