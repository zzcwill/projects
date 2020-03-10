<template>
  <div class="clgl-page" style="padding:30px;">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="flex-center w-fit-content">
          <span style="width: 200px;">来访人员电话:</span>
          <el-input v-model="form.visitorPhone" placeholder="请输入电话"></el-input>
        </div>
        <el-button type="primary" icon="el-icon-search" class="m-l-20" @click="doQuery">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" class="m-l-20" @click="show('add')">新增</el-button>
      </div>
      <div>
        <el-table
          border
          :data="list"
          tooltip-effect="dark"
        >
          <!-- <el-table-column prop="id" label="访客码"></el-table-column> -->
          <el-table-column prop="visitorSourceName" label="访客来源"></el-table-column>
          <el-table-column prop="visitorName" label="访客姓名"></el-table-column>
          <el-table-column prop="visitorPhone" label="访客电话"></el-table-column>
          <el-table-column prop="visitorTime" label="预约来访日期"></el-table-column>
          <el-table-column prop="visitorNumber" label="来访人人数"></el-table-column>
          <el-table-column prop="visitorReason" label="来访事由"></el-table-column>
          <el-table-column prop="parkName" label="访问园区"></el-table-column>
          <el-table-column prop="visitorCompanyName" label="访客公司名称"></el-table-column>
          <el-table-column label="状态">
            <div slot-scope="scope">
              <span v-if="scope.row.statusCode=== '1'&& compareDate(scope.row.visitorTime)"
                    style="color: #909399">超时未处理</span>
              <span v-else-if="scope.row.statusCode=== '1'" style="color: blue">预约中</span>
              <span v-else-if="scope.row.statusCode=== '2'" style="color: green">已通过</span>
              <span v-else-if="scope.row.statusCode=== '9'" style="color: red">已拒绝</span>
              <span v-else>{{scope.row.statusCode}}</span>
            </div>
          </el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <div slot-scope="scope">
              <el-button type="text" size="mini" @click="show('view',scope.row)">查看</el-button>
              <el-button v-if="scope.row.statusCode=== '1'&& !compareDate(scope.row.visitorTime)" type="text"
                         size="mini" @click="passThis(scope.row.id)">通过
              </el-button>
              <el-button v-if="scope.row.statusCode=== '1'&& !compareDate(scope.row.visitorTime)" type="text"
                         size="mini" @click="refuseThis(scope.row.id)">不通过
              </el-button>
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
            <fkyy-edit :item="item" :type="showType" @save="saveSuccess"></fkyy-edit>
          </div>
        </el-dialog>
      </div>

    </div>
  </div>
</template>

<script>
  import fkyyEdit from './fkyy-edit'
  import { queryVisitorAppointmentList, passVisitorAppointment, refuseVisitorAppointment } from '@/api/fkgl/fkgl'

  export default {
    components: { fkyyEdit },
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
      timeTransform(time) {
        if (time < 10) {
          return '0' + time
        } else {
          return time
        }
      },
      compareDate(date) {
        let dateStr = date.replace(/-/g, '')
        let nowDate = new Date()
        let nowDateStr = '' + nowDate.getFullYear() + (this.timeTransform(nowDate.getMonth() + 1)) + this.timeTransform(nowDate.getDate())
        return dateStr < nowDateStr
      },
      doQuery() {
        this.form.pageCurrent = 1
        this.query()
      },
      query() {
        this.list = []
        queryVisitorAppointmentList(this.form).then(res => {
          if (res.data === undefined) {
            if (this.form.visitorPhone !== '') {
              this.$message({
                message: '未查询到该号码的访客预约记录',
                type: 'warning'
              })
            }
          } else {
            this.list = res.data
            this.form.resultCount = res.page.resultCount
          }
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
      },
      passThis(val) {
        this.$confirm('确认通过?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'btn-custom-cancel',
          type: 'warning'
        }).then(() => {
          let params = {
            id: val
          }
          passVisitorAppointment(params).then(res => {
            if (res.code === 0) {
              this.query()
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            this.$message.error(err)
          })

        })
      },
      refuseThis(val) {
        this.$confirm('确认不通过?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'btn-custom-cancel',
          type: 'warning'
        }).then(() => {
          let params = {
            id: val
          }
          refuseVisitorAppointment(params).then(res => {
            if (res.code === 0) {
              this.query()
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            this.$message.error(err)
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

