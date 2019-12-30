<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="130px" :rules="rules">
      <el-form-item label="员工姓名:" prop="realName">
        <el-input v-model="form.realName" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="员工编号:" prop="userCode">
        <el-input v-model="form.userCode" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="员工性别:" prop="userSex">
        <el-select v-model="form.userSex" :disabled="isView">
          <el-option v-for="item of Object.keys(userSexOption)" :key="item" :value="item" :label="userSexOption[item]"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号码:" prop="userPhone">
        <el-input v-model="form.userPhone" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" prop="userMail">
        <el-input v-model="form.userMail" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="昵称:" prop="nickName">
        <el-input v-model="form.nickName" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码:" prop="superiorOrgId">
        <el-input v-model="form.idcardNumber" :disabled="isView"></el-input>
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
      <el-form-item label="所属部门:" prop="orgId" v-if="showSearch || type==='add'">
        <search
          type="organization"
          show-name="orgName"
          :value="form.orgId"
          :disabled="isView"
          @change="changeOrg"
        >
        </search>
      </el-form-item>
    </el-form>

    <div style="text-align: right" v-if="!isView">
      <el-button type="primary" @click="edit">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { employeeInfo, editEmployee, addEmployee } from '@/api/qygl/ygxx'
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
          realName: '',
          userCode: '',
          userSex: '',
          userPhone: '',
          userMail: '',
          nickName: '',
          idcardNumber: '',
          partnerId: '',
          orgId: ''
        },
        userSexOption: {
          '1': '男',
          '2': '女',
          '3': '不明'
        },
        rules: {
          realName: [
            { required: true, message: '请输姓名', trigger: 'blur' }
          ],
          userCode: [
            { required: true, message: '请输入编号', trigger: 'blur' }
          ],
          userSex: [
            { required: true, message: '请输入性别', trigger: 'blur' }
          ],
          userPhone: [
            { required: true, message: '请输入电话', trigger: 'blur' }
          ],
          userMail: [
            { required: true, message: '请输入邮箱', trigger: 'blur' }
          ],
          idcardNumber: [
            { required: true, message: '请输入身份证号码', trigger: 'blur' }
          ],
          partnerId: [
            { required: true, message: '请输入企业', trigger: ['blur', 'change'] }
          ],
          orgId: [
            { required: true, message: '请输入部门', trigger: ['blur', 'change'] }
          ]
        }
      }
    },
    created() {
      if (this.type !== 'add') {
        this.query()
      }
    },
    computed: {
      isView() {
        return this.type === 'view'
      }
    },
    methods: {
      changeOrg(item) {
        this.form.orgId = item.id
        this.form.orgName = item.orgName
      },
      changePartner(item) {
        this.form.partnerId = item.id
        this.form.partnerName = item.partnerName
      },
      query() {
        employeeInfo({ id: this.id }).then(res => {
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
              addEmployee(this.form).then(res => {
                this.$emit('save')
              }).catch(err => {
                this.$message.error(err)
              })
            } else {
              editEmployee(this.form).then(res => {
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
