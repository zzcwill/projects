<template>
  <div style="padding:10px;">
    <div class="p-10 bg-white brs-4 def-shadow">
      <conference-room-list
        ref="form"
        @changeList="changeList"
        @ydClick="yd"
        @search="clickSearch"
      ></conference-room-list>

      <div>
        <el-table
          v-loading.body="loading"
          :data="list"
          tooltip-effect="dark"
          border
          style="width: 100%"
        >
          <el-table-column prop="conferenceId" label="会议室编号"></el-table-column>
          <el-table-column prop="conferenceName" label="会议室名称"></el-table-column>
          <el-table-column prop="parkName" label="所属园区"></el-table-column>
          <el-table-column prop="areaName" label="区域"></el-table-column>
          <el-table-column prop="creator" label="申请员工"></el-table-column>
          <el-table-column prop="statusCode" label="状态">
            <div slot-scope="scope">
              {{ statusTxt[scope.row.statusCode] }}
            </div>
          </el-table-column>
          <el-table-column prop="startDay" label="预约开始时间">
            <div slot-scope="scope">
              {{ scope.row.startDay }} {{ scope.row.startHour|timeTransform }}:{{ scope.row.startMinute|timeTransform }}
            </div>
          </el-table-column>
          <el-table-column prop="endDay" label="预约结束时间">
            <div slot-scope="scope">
              {{ scope.row.endDay }} {{ scope.row.endHour|timeTransform }}:{{ scope.row.endMinute|timeTransform }}
            </div>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="showConference(scope.row.id)">查看</el-button>
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
        :title="dialogTitle"
      >
        <detail :id="showId" :type="showType" :apply="apply" @save="save"></detail>
      </el-dialog>
    </div>
    <div v-if="showConferenceDetail">
      <el-dialog
        :visible.sync="showConferenceDetail"
        width="60%"
        title="会议查看"
      >
        <conference-detail
          :id="showId"
          :type="showType"
          :apply="apply"
          :sign-num="signNum"
          :sign-url="signUrl"
          @save="save"
        ></conference-detail>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { listConferenceApply, checkConferenceApply, querySignMessage } from '@/api/hysgl/hysyy'
  import detail from './detail'
  import conferenceDetail from './conference-detail'
  import ConferenceRoomList from '../components/ConferenceRoomList'

  export default {
    components: { detail, ConferenceRoomList, conferenceDetail },
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
        dialogTitle: '',
        apply: {},
        signNum: 0,
        statusTxt: {
          '1': '预约中',
          '2': '通过',
          '3': '不通过'
        },
        showId: '',
        showDetail: false,
        showConferenceDetail: false,
        showType: 'add',
        signUrl: '',
        form: {
          pageCurrent: 1,
          pageLimit: 10,
          resultCount: 0
        },
        list: [],
        loading: false
      }
    },
    methods: {
      // 会议查看按钮
      showConference(id) {
        querySignMessage({ id: id }).then(res => {
          this.signNum = res.data.fb2
          this.signUrl = 'http://h5.yq.ihonyar.cn:8088/#/hysqd/index?id=' + id
          this.showType = 'view'
          this.showConferenceDetail = true
          this.showId = id
        })
      },
      yd(item) {
        this.apply = item
        this.show('add')
      },
      changeList(list) {
        this.list = list
      },
      clickSearch(form) {
        this.form.pageCurrent = 1

        this.form.startDay = form.date
        this.form.isPhone = form.isPhone
        this.form.isTv = form.isTv
        this.form.isWhiteboard = form.isWhiteboard
        this.form.isProjection = form.isProjection
        this.form.isVideo = form.isVideo

        this.query()
      },
      query() {
        if (this.$refs.form) {
          if (this.$refs.form.active) {
            this.$refs.form.reload()
            return
          }
        }

        listConferenceApply(this.form).then(res => {
          this.list = res.data
          this.form.resultCount = res.page.resultCount
        }).catch(err => {
          this.$message.error(err)
        })
      },
      show(type, id) {
        if (type == 'add') {
          this.dialogTitle = '会议室预约'
        } else if (type == 'view') {
          this.dialogTitle = '查看会议室详情'
        } else {
          this.dialogTitle = '修改会议室信息'
        }
        this.showType = type
        this.showDetail = true
        this.showId = id
      },
      edit(id, state, name) {
        let param = {
          id: id,
          statusCode: state,
          statusName: name
        }
        checkConferenceApply(param).then(res => {
          this.query()
        }).catch(err => {
          this.$message.error(err)
        })
      },
      save() {
        this.showDetail = false
        this.showConferenceDetail = false
        this.query()
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

