<template>
  <div style="padding:30px;">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="form-box">
          <label>过滤：</label>
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            @change="clickSearch"
          >
          </el-date-picker>
          <el-button type="primary" size="mini" @click="clickSearch">搜索</el-button>
        </div>
      </div>
      <div>
        <el-table
          v-loading.body="loading"
          :data="list"
          border
        >
          <el-table-column prop="meetingTitle" label="会议主题"></el-table-column>
          <el-table-column label="开始时间">
            <div slot-scope="scope">
              {{scope.row.startDay}} {{scope.row.startHour|timeTransform}}:{{scope.row.startMinute|timeTransform}}
            </div>
          </el-table-column>
          <el-table-column label="结束时间">
            <div slot-scope="scope">
              {{scope.row.endDay}} {{scope.row.endHour|timeTransform}}:{{scope.row.endMinute|timeTransform}}
            </div>
          </el-table-column>
          <el-table-column prop="conferenceName" label="会议室名称"></el-table-column>
          <el-table-column prop="parkName" label="所属园区"></el-table-column>
          <el-table-column prop="areaName" label="区域"></el-table-column>
          <el-table-column prop="conferenceNum" label="参会人数"></el-table-column>
          <el-table-column prop="applyUserName" label="预定人"></el-table-column>
          <el-table-column prop="statusCode" label="状态">
            <div slot-scope="scope">
              <div v-if="scope.row.statusCode==='1'" style="color: orange">●预约中</div>
              <div v-else-if="scope.row.statusCode==='2'" style="color: green">●通过</div>
              <div v-else-if="scope.row.statusCode==='3'" style="color: red">●不通过</div>
            </div>
          </el-table-column>
          <el-table-column prop="auditDescribe" label="审核意见">
            <div slot-scope="scope">
              <el-tooltip class="item" effect="light" placement="top-start">
                <div slot="content" style="width: 150px;">{{scope.row.auditDescribe}}</div>
                <span>{{scope.row.auditDescribe|ellipsisWords}}</span>
              </el-tooltip>
            </div>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="show('view',scope.row.id)">查看</el-button>
              <el-button
                v-show="scope.row.statusCode === '1'"
                type="text"
                size="mini"
                @click="edit(scope.row.id, '1')"
              >通过
              </el-button>
              <el-button
                v-show="scope.row.statusCode === '1'"
                type="text"
                size="mini"
                @click="edit(scope.row.id, '2')"
              >不通过
              </el-button>
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
        <detail :id="showId" :type="showType" @save="save" :apply="apply"></detail>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { listConferenceApply, checkConferenceApply } from '@/api/hysgl/hysyy'
  import detail from './detail'

  export default {
    components: { detail },
    data() {
      return {
        showId: '',
        showDetail: false,
        showType: 'add',
        apply: {},
        form: {
          date: '',
          isPhone: '',
          isTv: '',
          isWhiteboard: '',
          isProjection: '',
          isVideo: '',
          pageCurrent: 1,
          pageLimit: 10000
        },
        list: [],
        loading: false
      }
    },
    created() {
      let day = new Date()
      day.setTime(day.getTime())
      this.form.date = day.getFullYear() + '-' + (this.prefixZero((day.getMonth() + 1), 2)) + '-' + this.prefixZero(day.getDate(), 2)
      this.query()
    },
    filters: {
      timeTransform(time) {
        if (time < 10) {
          return '0' + time
        } else {
          return time
        }
      },
      ellipsisWords(value) {
        if (!value) return ''
        if (value.length > 15) {
          return value.slice(0, 15) + '...'
        }
        return value
      }
    },
    methods: {
      // 会议室预约通过与不通过
      edit(id, type) {
        let title = ''
        let statusCode = ''
        let statusName = ''
        if (type === '1') {
          title = '通过'
          statusCode = '2'
          statusName = '已通过'
        } else if (type === '2') {
          title = '不通过'
          statusCode = '3'
          statusName = '拒绝'
        }
        this.$prompt('请输入审核意见', title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          checkConferenceApply({
            id: id,
            statusCode: statusCode,
            statusName: statusName,
            auditDescribe: value
          }).then(res => {
            this.query()
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
          })
        })
      },
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
        listConferenceApply(this.form).then(res => {
          this.list = res.data
          this.form.resultCount = res.page.resultCount
        }).catch(err => {
          this.$message.error(err)
        })
      },
      show(type, id) {
        this.showType = type
        this.showDetail = true
        this.showId = id
      },
      save() {
        this.showDetail = false
        this.query()
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

