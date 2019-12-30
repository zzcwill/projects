<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="130px" :rules="rules">
      <el-form-item label="部门名称:" prop="orgName">
        <el-input v-model="form.orgName" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="部门编号:" prop="orgCode">
        <el-input v-model="form.orgCode" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="所属企业:" prop="partnerId" v-if="showSearch || type==='add'">
        <search
          type="partner"
          show-name="partnerName"
          :value="form.partnerId"
          :disabled="isView"
          @change="changePartner"
        >
        </search>
      </el-form-item>
      <el-form-item label="部门地址:" prop="orgAddress">
        <el-input v-model="form.orgAddress" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="联系人姓名:" prop="contactName">
        <el-input v-model="form.contactName" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="联系人电话:" prop="contactTelephone">
        <el-input v-model="form.contactTelephone" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="上级部门:" prop="superiorOrgId" v-if="showSearch || type==='add'">
        <search
          type="organization"
          show-name="orgName"
          :value="form.superiorOrgId"
          :disabled="isView"
          @change="changeSuperiorOrg"
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
  import { organizationInfo, editOrganization, addOrganization } from '@/api/qygl/jgbm'
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
          orgName: '',
          orgCode: '',
          contactName: '',
          contactTelephone: '',
          orgAddress: '',
          partnerId: '',
          superiorOrgId: ''
        },
        partnerTypeOption: {
          '1': '个人',
          '2': '团队',
          '3': '微商',
          '4': '企业',
        },
        rules: {
          orgName: [
            { required: true, message: '请输名称', trigger: 'blur' }
          ],
          orgCode: [
            { required: true, message: '请输入编号', trigger: 'blur' }
          ],
          contactName: [
            { required: true, message: '请输入联系人姓名', trigger: 'blur' }
          ],
          contactTelephone: [
            { required: true, message: '请输入联系人电话', trigger: 'blur' }
          ],
          orgAddress: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
          partnerId: [
            { required: true, message: '请选择所属企业', trigger: ['blur', 'change'] }
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
      changeSuperiorOrg(item) {
        this.form.superiorOrgId = item.id
        this.form.superiorOrgName = item.orgName
      },
      changePartner(item) {
        this.form.partnerId = item.id
        this.form.partnerName = item.partnerName
      },
      query() {
        organizationInfo({ id: this.id }).then(res => {
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
              addOrganization(this.form).then(res => {
                this.$emit('save')
              }).catch(err => {
                this.$message.error(err)
              })
            } else {
              editOrganization(this.form).then(res => {
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
  .el-select {
    width: 200px;
  }
  .el-autocomplete {
    width: 200px;
  }
</style>
