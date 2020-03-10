<template>
  <div class="p-10 bg-EFF2F7">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="flex-center w-fit-content">
          <span class="w-130">预约日期:</span>
          <el-date-picker
            v-model="form.startDay"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择预约日期"
          >
          </el-date-picker>
        </div>
        <el-button type="primary" icon="el-icon-search" class="m-l-20" @click="doQuery">搜索</el-button>
        <el-button type="primary" icon="el-icon-download" class="m-l-20" @click="exportExcel">导出</el-button>
      </div>
      <div>
        <el-table
          border
          :data="list"
          tooltip-effect="dark"
        >
          <!-- <el-table-column prop="conferenceId" label="会议室编号"></el-table-column> -->
          <el-table-column prop="conferenceName" label="会议室名称"></el-table-column>
          <el-table-column prop="groupName" label="所属园区"></el-table-column>
          <el-table-column prop="areaName" label="区域"></el-table-column>
          <el-table-column prop="conferenceNum" label="参会人数"></el-table-column>
          <el-table-column prop="meetingTitle" label="会议主题"></el-table-column>
          <el-table-column prop="applyUserName" label="预定人"></el-table-column>
          <el-table-column prop="statusName" label="状态">已经结束</el-table-column>
          <el-table-column prop="startDay" label="开始时间">
            <div slot-scope="scope">{{scope.row.startDay}} {{scope.row.startHour|timeTransform}}:{{scope.row.startMinute|timeTransform}}</div>
          </el-table-column>
          <el-table-column prop="endDay" label="结束时间">
            <div slot-scope="scope">{{scope.row.endDay}} {{scope.row.endHour|timeTransform}}:{{scope.row.endMinute|timeTransform}}</div>
          </el-table-column>
          <!--          <el-table-column label="操作" width="180" fixed="right">-->
          <!--            <div slot-scope="scope">-->
          <!--              <el-button type="text" size="mini" @click="show('view',scope.row.id)">查看</el-button>-->
          <!--            </div>-->
          <!--          </el-table-column>-->
        </el-table>
      </div>
      <div class="p-t-20 p-b-10 flex flex-j-end">
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
  </div>
</template>

<script>
  import { listConferenceApply, exportExcel } from '@/api/hysgl/hyjl'

  export default {
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
        showAdd: false,
        showType: '',
        showId: '',
        list: [],
        form: {
          startDay: '',
          pageCurrent: 1,
          pageLimit: 10,
          resultCount: 0
        }
      }
    },
    created() {
      this.query()
    },
    methods: {
      exportExcel() {
        exportExcel(this.form).then(res => {
          const link = document.createElement('a')
          const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          link.setAttribute('download', '会议记录.xls')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        })
      },
      doQuery() {
        this.form.pageCurrent = 1
        this.query()
      },
      show(type, id) {
        if (type === 'add') {
          this.dialogTitle = '新增'
        } else if (type === 'view') {
          this.dialogTitle = '查看'
        } else {
          this.dialogTitle = '编辑'
        }
        this.showType = type
        this.showId = id
        this.showAdd = true
      },
      query() {
        listConferenceApply(this.form).then(res => {
          this.list = res.data
          this.form.resultCount = res.page.resultCount
        }).catch(err => {
          this.$message.error(err)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

