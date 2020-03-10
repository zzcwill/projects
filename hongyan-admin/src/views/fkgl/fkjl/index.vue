<template>
  <div class="clgl-page" style="padding:30px;">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="flex-center w-fit-content">
          <span style="width: 200px;">来访人员电话:</span>
          <el-input v-model="form.visitorPhone" placeholder="请输入电话"></el-input>
        </div>
        <el-button type="primary" icon="el-icon-search" class="m-l-20" @click="doQuery">搜索</el-button>
      </div>
      <div>
        <el-table
          border
          :data="list"
          tooltip-effect="dark"
        >
          <el-table-column prop="visitorName" label="访客姓名"></el-table-column>
          <el-table-column prop="visitorPhone" label="访客电话"></el-table-column>
          <el-table-column prop="visitorTime" label="预约来访时间"></el-table-column>
          <el-table-column prop="visitorNumber" label="来访人数"></el-table-column>
          <el-table-column prop="visitorReason" label="来访事由"></el-table-column>
          <el-table-column prop="parkName" label="访问园区"></el-table-column>
          <el-table-column prop="visitorCompanyName" label="来访人公司名称"></el-table-column>
          <el-table-column label="状态">
            <div slot-scope="scope">
              <span v-if="scope.row.statusCode=== '1'" style="color: blue">预约中</span>
              <span v-else-if="scope.row.statusCode=== '2'" style="color: green">已通过</span>
              <span v-else-if="scope.row.statusCode=== '9'" style="color: red">已拒绝</span>
              <span v-else>{{scope.row.statusCode}}</span>
            </div>
          </el-table-column>
          <el-table-column label="操作" width="120" fixed="right">
            <div slot-scope="scope">
              <el-button type="text" size="mini" @click="show('view',scope.row)">查看详情</el-button>
            </div>
          </el-table-column>
        </el-table>
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
      <div v-if="showDetail">
        <el-dialog
          :title="dialogTitle"
          :visible.sync="showDetail"
          width="80%"
        >
          <div style="width: 100%">
            <fkjl-info :item="item" :type="showType" @save="saveSuccess"></fkjl-info>
          </div>
        </el-dialog>
      </div>

    </div>
  </div>
</template>

<script>
  import fkjlInfo from './fkjl-info'
  import { queryVisitorAppointmentList, passVisitorAppointment, refuseVisitorAppointment } from '@/api/fkgl/fkgl'

  export default {
    components: { fkjlInfo },
    data() {
      return {
        showDetail: false,
        showType: '',
        item: {},
        list: [],
        form: {
          visitorPhone: '',
          pageCurrent: 1,
          pageLimit: 10,
          resultCount: 0
        },
        dialogTitle: ''
      }
    },
    created() {
      this.query()
    },
    methods: {
      doQuery() {
        this.form.pageCurrent = 1
        this.query()
      },
      query() {
        queryVisitorAppointmentList(this.form).then(res => {
          this.list = res.data
          this.form.resultCount = res.page.resultCount
        }).catch(err => {
          this.$message.error(err)
        })
      },
      show(type, item) {
        this.showType = type
        this.item = item
        this.dialogTitle = type === 'add' ? '访客预约新增' : '访客预约详情'
        this.showDetail = true
      },
      saveSuccess() {
        this.showDetail = false
        this.query()
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

