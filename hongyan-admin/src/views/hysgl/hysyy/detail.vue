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
      <el-form-item prop="conferenceapplyTime" label="申请时间段：">
        <el-date-picker
          v-model="form.conferenceapplyTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd HH:mm"
          align="left"
          value-format="yyyy-MM-dd HH:mm"
        >
        </el-date-picker>
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
  import { addconferenceapply, infoConferenceApply, informationMeetingModification } from '@/api/hysgl/hysyy'
  import { listConferenceUser, addConferenceUser, delConferenceUser } from '@/api/hysgl/chry'
  import search from '@/components/search'
  import { mapGetters } from 'vuex'

  export default {
    components: { search },
    props: {
      type: String,
      id: String
    },
    data() {
      return {
        inputVisible: false,
        inputValue: '',
        showSearch: false,
        form: {
          conferenceId: '',
          meetingTitle: '',
          meetingDescribe: '',
          conferenceNum: '',
          startDay: '',
          startHour: '',
          endDay: '',
          endHour: '',
          conferenceapplyTime: [],
          employeeList: []
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
          conferenceapplyTime: [
            { required: true, message: '请输入申请时间段', trigger: 'blur' }
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
      if (this.type !== 'add') {
        this.query()
      }
    },
    methods: {
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
          this.form.conferenceapplyTime = [
            `${this.form.startDay} ${this.form.startHour}:${this.form.startMinute}`,
            `${this.form.endDay} ${this.form.endHour}:${this.form.endMinute}`
          ]
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
            let startDate = this.form.conferenceapplyTime[0]
            let endDate = this.form.conferenceapplyTime[1]
            let start = startDate.split(' ')
            let end = endDate.split(' ')
            this.form.startDay = start[0]
            this.form.startHour = start[1].split(':')[0]
            this.form.startMinute = start[1].split(':')[1]
            this.form.endDay = end[0]
            this.form.endHour = end[1].split(':')[0]
            this.form.endMinute = end[1].split(':')[1]

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
              informationMeetingModification(this.form).then(res => {
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
