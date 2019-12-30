<template>
  <div class="p-10 bg-EFF2F7">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="flex-center w-fit-content">
          <span class="w-130">施工时间:</span>
          <el-date-picker
            v-model="date"
            style="width:400px;"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
        <el-button type="primary" icon="el-icon-search" class="m-l-20" @click="search">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" class="m-l-20" @click="addItem">新增</el-button>
      </div>
      <div>
        <el-table
          v-loading.body="loading"
          :border="true"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="areaName" label="施工区域" min-width="120" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="施工时间" min-width="120">
            <span slot-scope="scope">{{ `${scope.row.startTime}~${scope.row.endTime }` }}</span>
          </el-table-column>
          <el-table-column prop="content" label="施工内容" min-width="120">
          </el-table-column>
          <el-table-column prop="unitsName" label="施工单位" min-width="120">
          </el-table-column>
          <el-table-column prop="userName" label="施工负责人" min-width="80">
          </el-table-column>
          <el-table-column prop="author" label="发布公告" min-width="80">
            <span>字段缺失</span>
          </el-table-column>
          <el-table-column prop="userPhone" label="施工负责人联系电话" min-idth="180">
          </el-table-column>
          <el-table-column prop="creatorName" label="录入人员" min-idth="80" />
          <el-table-column label="操作" width="180" fixed="right">
            <div slot-scope="scope">
              <el-button type="primary" size="mini" @click="editItem(scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" @click="deleteItem(scope.row)">删除</el-button>
            </div>
          </el-table-column>
        </el-table>
      </div>
      <div class="p-t-20 p-b-10 flex flex-j-end">
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
    <Handle
      v-model="handleInfo"
      @reflash="search"
    />
  </div>
</template>

<script>
import { getList, del, addOrEdit } from '@/api/wygl/sggl'

export default {
  name: 'WyglSggl',
  components: {
    Handle: () => import('./Handle.vue'),
  },
  data() {
    return {
      loading: false,
      date: [this.moment().subtract(7, 'days').format('YYYY-MM-DD'), this.moment().format('YYYY-MM-DD')],
      total: 0,
      listQuery: {
        startDate: '',
        endDate: '',
        pageCurrent: 1,
        pageLimit: 20,
      },
      handleInfo: {
        visible: false,
        type: 'add',
        data: null,
      },
      tableData: []
    }
  },
  watch: {
    date: {
      handler(val) {
        this.listQuery.startDate = val[0] || ''
        this.listQuery.endDate = val[1] || ''
      },
      deep: true,
      immediate: true,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 条件搜索
    search() {
      this.listQuery.pageCurrent = 1
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
      this.loading = true 
      getList(this.listQuery).then((data) => {
        this.loading = false
        if (data.code === 0) {
          this.tableData = data.data || []
          this.total = data.page.resultCount
        }
      }).catch(() => {
        this.loading = false
        this.total = 0
      })
    },
    // 新增
    addItem() {
      this.handleInfo = {
        visible: true,
        type: 'add',
        data: null,
      }
    },
    // 编辑
    editItem(obj) {
      addOrEdit({ id: obj.id }, 'info').then((data) => {
        if (data.code === 0) {
          this.handleInfo = {
            visible: true,
            type: 'edit',
            data: data.data,
          }
        }
      })
    },
    // 删除
    deleteItem(obj) {
      this.$confirm('确认删除？', '提示', { type: 'warning' }).then(_ => {
          del({ id: obj.id }).then(res => {
            this.$message.success('删除成功')
            this.getList()
          })
      })
      .catch(_ => {})
    }
	},
}
</script>

<style lang="scss" scoped>

</style>

