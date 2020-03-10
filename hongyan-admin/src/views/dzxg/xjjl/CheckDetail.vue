<template>
  <el-dialog
    title="打卡明细"
    :visible="info.visible"
    custom-class="default-dialog-style"
    width="1000px"
    @update:visible="close"
    @open="open"
  >
    <div>
      <el-table
        v-loading.body="loading"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column prop="projectPlanName" label="巡更计划" min-width="120">
        </el-table-column>
        <el-table-column prop="keepCardNo" label="智卡编号" min-width="120">
        </el-table-column>
        <el-table-column prop="keepCardName" label="巡更点名称" min-width="120">
        </el-table-column>
        <el-table-column prop="clockTime" label="打卡时间" min-width="120">
        </el-table-column>
        <el-table-column prop="status" label="巡检状态" min-width="120">
        </el-table-column>
        <el-table-column prop="repairPersonnel" label="维修人员" min-width="120">
          <div slot-scope="scope">
            <div>{{ scope.row.repairPersonnel && scope.row.repairPersonnel.join('/') }}</div>
          </div>
        </el-table-column>
        <el-table-column prop="statusName" label="巡检结果" min-width="120">
        </el-table-column>
      </el-table>
      <div class="p-t-20 flex flex-j-end">
        <el-pagination
          :current-page.sync="listQuery.pageCurrent"
          :page-sizes="[10,20,30, 50]"
          :page-size="listQuery.pageLimit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="close">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getListDetail } from '@/api/dzxg/xjjl.js'
export default {
  name: 'XjjlCheckDetail',
  model: {
    prop: 'info',
    event: 'update',
  },
  props: {
    info: {
      type: Object,
      default: () => ({ visible: false })
    }
  },
  data() {
    return {
      loading: false,
      total: 1,
      listQuery: {
        keeyId: '',
        pageCurrent: 1,
        pageLimit: 20,
      },
      tableData: [],
    }
  },
  methods: {
     // 关闭按钮
    close() {
      let obj = this._.cloneDeep(this.info)
      obj.visible = false
      this.$emit('update', obj)
    },
    sure() {
      let obj = this._.cloneDeep(this.info)
      obj.visible = false
    },
    open() {
      let data = this.info.data
      this.listQuery.keeyId = data.keeyId
      this.getList()
    },
    // 切换每页显示条数
    handleSizeChange(val) {
      this.listQuery.pageLimit = val
      this.getList()
    },
    // 切换当前第几页
    handleCurrentChange(val) {
      this.listQuery.pageCurrent = val
      this.getList()
    },
    // 获取列表
    getList() {
      let params
      if (this.listQuery.dateTime && this.listQuery.dateTime.length) {
        params = Object.assign({}, this.listQuery, { startTime: this.listQuery.dateTime[0] }, { endTime: this.listQuery.dateTime[1] })
      } else {
        params = Object.assign({}, this.listQuery)
      }
      delete params.dateTime
      this.loading = true 
      getListDetail(params).then((data) => {
        this.loading = false
        if (data.code === 0) {
          // 页面数据
          this.tableData = data.data
          this.total = data.page.resultCount
        }
      }).catch(() => {
        this.loading = false
        this.total = 0
      })
    },
  }
}
</script>
