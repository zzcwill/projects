<template>
  <div>
    <el-form ref="form" size="mini" :model="form" label-width="130px" :rules="rules" :disabled="isView" inline>
      <el-form-item v-if="showSearch || type==='add'" label="会议室：" prop="conferenceId">
        <search
          type="conference"
          show-name="conferenceName"
          :value="form.conferenceId"
          @change="changeConference"
        >
        </search>
      </el-form-item>
      <el-form-item label="会议主题：" prop="meetingTitle">
        <el-input v-model="form.meetingTitle" placeholder="请输入" />
      </el-form-item>
      <br>
      <el-form-item label="会议说明:" prop="meetingDescribe">
        <el-input v-model="form.meetingDescribe" type="textarea" placeholder="请输入"></el-input>
      </el-form-item>
      <br>
      <el-form-item prop="startDay" label="申请日期：">
        <el-date-picker
          v-model="form.startDay"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="申请时间段：" prop="startTime">
        <el-time-select
          style="width: 178px;"
          placeholder="起始时间"
          v-model="form.startTime"
          :picker-options="{
            start: '07:00',
            step: '00:30',
            end: '23:00'
          }">
        </el-time-select>
        <el-time-select
          style="width: 178px;"
          placeholder="结束时间"
          v-model="form.endTime"
          :picker-options="{
            start: '07:00',
            step: '00:30',
            end: '23:00',
            minTime: form.startTime
          }">
        </el-time-select>
      </el-form-item>

      <el-form-item label="参会人数：" prop="conferenceNum">
        <el-input v-model="form.conferenceNum" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="具体人员：">
        <div style="width: 360px;">
          <el-tag
            v-for="(tag,index) in form.employeeList"
            :key="index"
            :closable="!isView"
            size="medium"
            :disable-transitions="false"
            style="margin-right: 20px;"
            @close="delName(index)"
          >
            {{ tag.userName }}
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
      <el-button size="mini" type="primary" @click="submit">保存</el-button>
    </div>

  </div>
</template>

<script>
  import {
    addconferenceapply,
    infoConferenceApply,
    changeConferenceApply,
  } from '@/api/hysgl/hysyy'
  import {
    queryConferenceAllModel,
    queryConferenceModelPeopleDetail
  } from '@/api/hysgl/hysyymb'
  import { listConferenceUser, addConferenceUser, delConferenceUser } from '@/api/hysgl/chry'
  import search from '@/components/search'
  import { mapGetters } from 'vuex'

  export default {
    components: { search },
    props: {
      apply: Object,
      type: String,
      id: String
    },
    data() {
      return {
        inputVisible: false,
        inputValue: '',
        showSearch: false,
        modelName: '',
        form: {
          conferenceId: '',
          meetingTitle: '',
          meetingDescribe: '',
          conferenceNum: '',
          startDay: '',
          startHour: '',
          endDay: '',
          endHour: '',
          startTime: '',
          endTime: '',
          employeeList: [],
        },
        userForm: {
          userId: '',
          userName: ''
        },
        rules: {
          conferenceId: [
            { required: true, message: '请选择会议室', trigger: 'charge' }
          ],
          meetingTitle: [
            { required: true, message: '请输入会议主题', trigger: 'blur' }
          ],
          meetingDescribe: [
            { required: true, message: '请输入会议说明', trigger: 'blur' }
          ],
          conferenceNum: [
            { required: true, message: '请输入参会人数', trigger: 'blur' }
          ],
          startDay: [
            { required: true, message: '请输入申请日期', trigger: 'change' }
          ],
          startTime: [
            { required: true, message: '请输入申请时间段', trigger: 'change' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters(['userInfo']),
      isView() {
        return this.type === 'view'
      },
      isEdit() {
        return this.type === 'edit'
      }
    },
    created() {
      if (this.apply) {
        Object.assign(this.form, this.apply)
      }
      if (this.type !== 'add') {
        this.query()
      }
    },
    methods: {
      changeItem(item) {
        this.modelName = item.modelName
        this.form.meetingTitle = item.meetingTitle
        this.form.meetingDescribe = item.meetingDescribe
        this.form.conferenceNum = item.conferenceNum
        queryConferenceModelPeopleDetail({ modelId: item.id }).then(res => {
          if (res.data !== undefined) {
            this.form.employeeList = res.data
          }
        })
      },
      delName(index) {
        if (this.isEdit) {
          let id = this.form.employeeList.splice(index, 1)[0].id
          delConferenceUser({ id: id, meetingId: this.form.id }).then(res => {
          })
        } else {
          this.form.employeeList.splice(index, 1)
        }
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
          if (!this.form.employeeList) {
            this.form.employeeList = []
          }
          this.form.employeeList.push(employee)
          if (this.isEdit) {
            employee.meetingId = this.form.id
            employee.meetingTitle = this.form.meetingTitle
            addConferenceUser(employee).then(res => {
            })
          }
          this.$refs.employeeSearch.delValue()
        }
      },
      changeConference(item) {
        this.form.conferenceId = item.id
        this.form.conferenceName = item.conferenceName
        this.form.parkId = item.parkId
        this.form.parkName = item.parkName
        this.form.buildingId = item.buildingId
        this.form.buildingName = item.buildingName
        this.form.floorId = item.floorId
        this.form.floorName = item.floorName
        this.form.areaId = item.areaId
        this.form.areaName = item.areaName
      },
      query() {
        infoConferenceApply({ id: this.id }).then(res => {
          this.form = res.data
          this.getUsers()
          this.form.startTime = `${this.form.startHour}:${this.form.startMinute}`
          this.form.endTime = `${this.form.endHour}:${this.form.endMinute}`
          this.showSearch = true
        }).catch(err => {
          this.$message.error(err)
        })
      },
      getUsers() {
        listConferenceUser({ meetingId: this.form.id }).then(res => {
          this.$set(this.form, 'employeeList', res.data)
          this.showSearch = true
        }).catch(err => {
          this.$message.error(err)
        })
      },
      submit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.form.endDay = this.form.startDay
            this.form.startHour = this.form.startTime.split(':')[0]
            this.form.startMinute = this.form.startTime.split(':')[1]
            this.form.endHour = this.form.endTime.split(':')[0]
            this.form.endMinute = this.form.endTime.split(':')[1]

            this.form.applyUserId = this.userInfo.userId
            this.form.applyUserName = this.userInfo.userNameCN
            this.form.applyUserPhone = this.userInfo.userPhone

            this.form.peopleList = JSON.stringify(this.form.employeeList)

            if (this.type === 'add') {
              addconferenceapply(this.form).then(res => {
                this.$emit('save')
              }).catch(err => {
                this.$message.error(err)
              })
            } else {
              changeConferenceApply(this.form).then(res => {
                this.$emit('save')
              }).catch(err => {
                this.$message.error(err)
              })
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  .el-input {
    width: 360px;
  }

  .el-date-editor {
    width: 360px;
  }

  .el-textarea {
    width: 360px;
  }

  .el-autocomplete {
    width: 360px;
  }

  .search-employee {
    width: 100px;
  }
</style>
