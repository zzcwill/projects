<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="130px" :rules="rules">
      <el-form-item label="企业名称:" prop="partnerName">
        <el-input v-model="form.partnerName" placeholder="园区名称" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="企业编号:" prop="partnerCode">
        <el-input v-model="form.partnerCode" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="企业类型:" prop="partnerType">
        <el-select v-model="form.partnerType" :disabled="isView">
          <el-option
            v-for="item of Object.keys(partnerTypeOption)"
            :key="item"
            :value="item"
            :label="partnerTypeOption[item]"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业地址:" prop="address">
        <el-input v-model="form.address" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="联系人姓名:" prop="contactName">
        <el-input v-model="form.contactName" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="联系人电话:" prop="contactTelephone">
        <el-input v-model="form.contactTelephone" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="上级企业:" prop="superiorId" v-if="showSearch || type==='add'">
        <search
          type="partner"
          show-name="partnerName"
          :value="form.superiorId"
          :disabled="isView"
          @change="changeSuperior"
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
  import { partnerInfo, editPartner, addPartner } from '@/api/qygl/qyxx'
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
          partnerName: '',
          partnerCode: '',
          contactName: '',
          contactTelephone: '',
          address: '',
          partnerType: '',
          superiorId: ''
        },
        partnerTypeOption: {
          '1': '个人',
          '2': '团队',
          '3': '微商',
          '4': '企业',
        },
        rules: {
          partnerName: [
            { required: true, message: '请输名称', trigger: 'blur' }
          ],
          partnerCode: [
            { required: true, message: '请输入企业编号', trigger: 'blur' }
          ],
          contactName: [
            { required: true, message: '请输入联系人姓名', trigger: 'blur' }
          ],
          contactTelephone: [
            { required: true, message: '请输入联系人电话', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
          partnerType: [
            { required: true, message: '请选择类型', trigger: 'blur' }
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
      changeSuperior(item) {
        this.form.superiorId = item.id
        this.form.superiorName = item.partnerName
      },
      query() {
        partnerInfo({ id: this.id }).then(res => {
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
              addPartner(this.form).then(res => {
                this.$emit('save')
              }).catch(err => {
                this.$message.error(err)
              })
            } else {
              editPartner(this.form).then(res => {
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
