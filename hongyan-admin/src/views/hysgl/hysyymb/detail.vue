<template>
  <div style="padding:30px;">
    <el-form ref="form" size="mini" :model="form" label-width="180px" inline :disabled="isView" :rules="rules">
      <el-form-item label="模板名称：" style="text-align: left" prop="modelName">
        <el-input v-model="form.modelName" style="width: 350px;" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="会议主题：" style="text-align: left" prop="meetingTitle">
        <el-input v-model="form.meetingTitle" style="width: 350px;" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="会议类型：" prop="meetingTypeCode">
        <el-select v-model="form.meetingTypeCode" style="width: 350px;" placeholder="请选择">
          <el-option
            v-for="item of Object.keys(meetingTypeTxt)"
            :key="item"
            :value="item"
            :label="meetingTypeTxt[item]"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="会议说明：" style="text-align: left" prop="meetingDescribe">
        <el-input v-model="form.meetingDescribe" style="width: 350px;" type="textarea" :rows="3" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="会议人数：" style="text-align: left">
        <el-input v-model="form.conferenceNum" style="width: 350px;" />
      </el-form-item>
      <el-form-item label="具体人员：">
        <div style="width: 350px;">
          <el-tag
            v-for="(tag,index) in peopleListTag"
            :key="index"
            :closable="!isView"
            size="medium"
            :disable-transitions="false"
            style="margin-right: 10px;margin-bottom: 5px"
            @close="handleClose(index)"
          >
            {{ tag }}
          </el-tag>

          <search
            v-if="!isView"
            ref="employeeSearch"
            type="employee"
            show-name="nickName"
            class="search-employee"
            @change="changeEmployee"
          >
          </search>
        </div>
      </el-form-item>
    </el-form>
    <div v-if="!isView" style="text-align: right;">
      <el-button size="medium" type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
  import { addConferenceModel, updateConferenceModel } from '@/api/hysgl/hysyymb'
  import search from '@/components/search'

  export default {
    components: { search },
    props: {
      type: String,
      id: String,
      form: Object,
      peopleList: Array,
      peopleListTag: Array
    },
    data() {
      return {
        showSearch: false,
        areaValue: [],
        meetingTypeTxt: {
          '1': '早会',
          '2': '午会',
          '3': '晚会',
          '4': '周例会',
          '5': '临时会议',
          '6': '其他'
        },
        rules: {
          meetingTypeCode: [
            { required: true, message: '请选择会议类型', trigger: 'change' }
          ],
          modelName: [
            { required: true, message: '请输入模板名称', trigger: 'blur' }
          ],
          meetingTitle: [
            { required: true, message: '请输入会议主题', trigger: 'blur' }
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
    },
    methods: {
      submit() {
        let that = this
        // 数据完整性校验
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$confirm('确认保存?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              cancelButtonClass: 'btn-custom-cancel',
              type: 'warning'
            }).then(() => {
              // 将peopleList转换为Json字符串
              that.form.peopleList = JSON.stringify(this.peopleList)
              that.form.meetingTypeName = that.meetingTypeTxt[that.form.meetingTypeCode]
              if (this.type === 'add') {
                addConferenceModel(that.form).then(res => {
                  if (res.code === 0) {
                    this.$emit('save', 1)
                  } else {
                    this.$message.error(res.msg)
                  }
                })
              } else if (this.type === 'edit') {
                updateConferenceModel(that.form).then(res => {
                  if (res.code === 0) {
                    this.$emit('save', 1)
                  } else {
                    this.$message.error(res.msg)
                  }
                })
              }
            })
          }
        })
      },
      changeEmployee(item) {
        if (item.id) {
          let employee = {
            userId: item.id,
            userName: item.nickName,
            userPhone: item.userPhone,
            userSexCode: item.userSex,
            companyId: item.partnerId,
            companyName: item.partnerName,
            departmentId: item.orgId,
            departmentName: item.orgName,
            userMail: item.userMail,
            picUrl: item.picUrl
          }
          this.peopleListTag.push(employee.userName)
          this.peopleList.push(employee)
          // this.form.conferenceNum = this.form.conferenceNum + 1
          this.$refs.employeeSearch.delValue()
        }
      },
      handleClose(index) {
        this.peopleListTag.splice(index, 1)
        this.peopleList.splice(index, 1)
        // this.form.conferenceNum = this.form.conferenceNum - 1
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

  .search-employee {
    width: 100px;
  }
</style>
