<template>
  <div style="padding:30px;">
    <el-tabs v-model="activeName" type="card" @tab-click="clickSearch">
      <el-tab-pane label="我的预定" name="first"></el-tab-pane>
      <el-tab-pane label="我的会议" name="second"></el-tab-pane>
    </el-tabs>
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="form-box">
          <label>预约日期：</label>
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            @change="clickSearch"
          >
          </el-date-picker>
          <el-button type="primary" icon="el-icon-search" class="m-l-20" @click="clickSearch">查询</el-button>
        </div>
      </div>
      <div>
        <el-table
          v-loading.body="loading"
          :data="list"
          border
        >
          <el-table-column prop="conferenceId" label="会议室编号"></el-table-column>
          <el-table-column prop="conferenceName" label="会议室名称"></el-table-column>
          <el-table-column prop="parkName" label="所属园区"></el-table-column>
          <el-table-column prop="containNum" label="容纳人数"></el-table-column>
          <el-table-column label="审核方式">自动</el-table-column>
          <el-table-column prop="areaName" label="区域"></el-table-column>
          <el-table-column prop="applyUserName" label="申请员工"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <div v-if="isAppointment">
                <div v-if="scope.row.statusCode === '1'" style="color:blue">● 申请中</div>
                <div v-else-if="scope.row.statusCode === '2'" style="color:green">● 审核通过</div>
                <div v-else-if="scope.row.statusCode === '3'" style="color:red">● 审核拒绝</div>
              </div>
              <div v-else>
                <div v-if="scope.row.statusCode === '1'" style="color:blue">● 进行中</div>
                <div v-else-if="scope.row.statusCode === '2'" style="color:green">● 已结束</div>
                <div v-else-if="scope.row.statusCode === '3'" style="color:red">● 未开始</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="startDay" label="预约开始时间" width="120">
            <div slot-scope="scope">
              {{ scope.row.startDay }} {{ scope.row.startHour|timeTransform }}:{{ scope.row.startMinute|timeTransform }}
            </div>
          </el-table-column>
          <el-table-column prop="endDay" label="预约结束时间" width="120">
            <div slot-scope="scope">
              {{ scope.row.endDay }} {{ scope.row.endHour|timeTransform }}:{{ scope.row.endMinute|timeTransform }}
            </div>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="230">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="show('view',scope.row.id)">查看</el-button>
              <el-button v-if="isAppointment" type="text" size="mini" @click="show('edit',scope.row.id)">修改</el-button>
              <el-button
                v-if="scope.row.statusCode !== '3'&&isAppointment"
                type="text"
                size="mini"
                @click="cancel(scope.row.id)"
              >
                取消预约
              </el-button>
              <el-button type="text" size="mini" @click="setModel(scope.row)">设为模板</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class=" p-b-10 flex flex-j-end">
        <el-pagination
          :current-page.sync="form.pageCurrent"
          :page-sizes="[10,20,30,50]"
          :page-size.sync="form.pageLimit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="form.resultCount"
          @size-change="query"
          @current-change="query"
        >
        </el-pagination>
      </div>
    </div>

    <div v-if="showDetail">
      <el-dialog
        :visible.sync="showDetail"
        width="60%"
      >
        <detail :id="showId" :type="showType" @save="save"></detail>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { listConferenceApply, delConference } from '@/api/hysgl/hysyy'
  import { addConferenceModel } from '@/api/hysgl/hysyymb'
  import { getOrderList, getMyConferenceList } from '@/api/hysgl/wdyd'
  import { listConferenceUser } from '@/api/hysgl/chry'
  import detail from './detail'

  export default {
    components: { detail },
    filters: {
      timeTransform(time) {
        if (time < 10) {
          return '0' + time
        } else {
          return time
        }
      }
    },
    data() {
      return {
        showId: '',
        showDetail: false,
        showType: 'add',
        activeName: 'first',
        form: {
          date: '',
          isPhone: '',
          isTv: '',
          isWhiteboard: '',
          isProjection: '',
          isVideo: '',
          pageCurrent: 1,
          pageLimit: 10
        },
        list: [],
        loading: false
      }
    },
    computed: {
      // 判断是否为我的预定还是我的会议，预定为true
      isAppointment() {
        return this.activeName === 'first'
      }
    },
    created() {
      let day = new Date()
      day.setTime(day.getTime())
      this.form.date = day.getFullYear() + '-' + (this.prefixZero((day.getMonth() + 1), 2)) + '-' + this.prefixZero(day.getDate(), 2)
      this.query()
    },
    methods: {
      // 点击tab标签触发方法
      clickSearch() {
        this.form.pageCurrent = 1
        this.query()
      },
      show(type, id) {
        this.showType = type
        this.showDetail = true
        this.showId = id
      },
      query() {
        this.list = []
        // todo 我的预约与我的会议查询接口
        if (this.activeName === 'first') {
          // 我的预约
          getOrderList(this.form).then(res => {
            this.list = res.data
            this.form.resultCount = res.page.resultCount
          }).catch(err => {
            this.$message.error(err)
          })
        } else if (this.activeName === 'second') {
          // 我的会议
          getMyConferenceList(this.form).then(res => {
            this.list = res.data
            this.form.resultCount = res.page.resultCount
          }).catch(err => {
            this.$message.error(err)
          })
        }
      },
      // 取消预约
      cancel(id) {
        this.$confirm('确认取消?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'btn-custom-cancel',
          type: 'warning'
        }).then(() => {
          let param = { id: id }
          // todo 取消接口
          // delConferenceModel(param).then(res => {
          //   this.query()
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          // }).catch(err => {
          //   this.$message.error(err)
          // })
        })
      },
      // 设置模板
      setModel(data) {
        this.$prompt('请输入模板名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          //查询该条预约记录下人员信息
          listConferenceUser({ meetingId: data.id }).then(res => {
            let modelPeopleDetail = []
            if (res.data !== undefined) {
              modelPeopleDetail = res.data
            }
            let peopleList = []
            for (let i = 0; i < modelPeopleDetail.length; i++) {
              let employee = {
                userId: modelPeopleDetail[i].userId,
                userName: modelPeopleDetail[i].userName,
                userPhone: modelPeopleDetail[i].userPhone,
                userSexCode: modelPeopleDetail[i].userSexCode,
                companyId: modelPeopleDetail[i].companyId,
                companyName: modelPeopleDetail[i].companyName,
                departmentId: modelPeopleDetail[i].departmentId,
                departmentName: modelPeopleDetail[i].departmentName,
                userMail: modelPeopleDetail[i].userMail,
                picUrl: modelPeopleDetail[i].picUrl,
              }
              peopleList.push(employee)
            }
            //将参会人员转换为json字符串
            let peopleListStr = JSON.stringify(peopleList)
            let form = {
              peopleList: peopleListStr,
              modelName: value,
              meetingTitle: data.meetingTitle,
              meetingDescribe: data.meetingDescribe,
              conferenceNum: data.conferenceNum
            }
            addConferenceModel(form).then(res => {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
            }).catch(err => {
              this.$message.error(err)
            })
          }).catch(err => {
            this.$message.error(err)
          })
        })
      },
      save() {
        this.showDetail = false
        this.query()
      },
      del(id) {
        let param = { id: id }
        delConference(param).then(res => {
          this.query()
        }).catch(err => {
          this.$message.error(err)
        })
      },
      //补0
      prefixZero(num, n) {
        num = num + ''
        return (Array(n).join(0) + num).slice(-n)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

