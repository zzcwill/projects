<template>
  <div v-loading="loading" class="p-10 bg-EFF2F7">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-b-10">
        <div class="flex-center w-fit-content">
          <span class="w-120">方案名称：</span>
          <el-input v-model.trim="listQuery.patrolPlanName"></el-input>
        </div>
        <el-button size="medium" type="primary" icon="el-icon-search" class="m-l-20" @click="searchList">搜索</el-button>
        <el-button size="medium" type="primary" icon="el-icon-plus" class="m-l-20" @click="addProject">添加</el-button>
      </div>
      <div>
        <el-table
          :border="true"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="patrolPlanName" label="方案名称" min-width="120" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="days" label="试用日期" min-width="120" show-overflow-tooltip>
            <span slot-scope="scope">{{ scope.row.days.split('').map(item => $store.state.reflex.weeks.find(ele => ele.value == item).label).join('、') }}</span>
          </el-table-column>
          <el-table-column prop="data" label="巡检时间" min-width="240">
            <span slot-scope="scope">{{ `${scope.row.startTime}~${scope.row.endTime}` }}</span>
          </el-table-column>
          <el-table-column prop="numberPosition" label="巡检点个数" min-width="120">
          </el-table-column>
          <el-table-column prop="persons" label="巡检人员" min-width="120" show-overflow-tooltip>
            <span slot-scope="scope">{{ scope.row.persons | JOINELE }}</span>
          </el-table-column>
          <el-table-column prop="isEffect" label="是否生效" min-width="120">
            <span slot-scope="scope">{{ ($store.state.reflex.isEffect.find(ele => ele.value == scope.row.isEffect) || {}).label || '' }}</span>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <div slot-scope="scope">
              <el-button size="mini" type="primary" @click="editProject(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="delProject(scope.row)">删除</el-button>
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
        />
      </div>
    </div>
    <Handle v-model="info" @reflash="searchList" />
  </div>
</template>

<script>
import { apiXJFACus } from '@/api/dzxg/xjfa.js'
import Handle from './Handle.vue'
export default {
  name: 'XtglXtpz',
  components: {
    Handle
  },
  data() {
    return {
      loading: false,
      btnLoading: false,
      total: 0,
      listQuery: {
        patrolPlanName: '',
        pageCurrent: 1,
        pageLimit: 20,
      },
      info: {
        visible: false,
        type: 'add',
        data: null
      },
      tableData: [],
    }
  },
  mounted() {
    this.getList()
	},
  destoryed() {
  },
  methods: {
    // 查询数据
    searchList() {
      this.listQuery.pageCurrent = 1
      this.getList()
    },
    // 获取数据
    getList() {
      this.loading = true
      apiXJFACus(this.listQuery).then((data) => {
        this.loading = false
        if (data.code === 0) {
          this.tableData = data.data || []
          this.total = data.page.resultCount || 0
        } else {
          throw new Error()
        }
      }).catch(() => {
        this.tableData = []
        this.loading = false
        this.$message.error('数据获取失败')
      })
    },
    // 切换每页显示条数
    handleSizeChange(val) {
      this.listQuery.pageLimit = val
      this.listQuery.pageCurrent = 1
      this.getList()
    },
    // 切换当前第几页
    handleCurrentChange(val) {
      this.listQuery.pageCurrent = val
      this.getList()
    },
    addProject() {
      this.info = {
        visible: true,
        type: 'add',
        data: null
      }
    },
    editProject(item) {
      apiXJFACus({ planId: item.planId }, 'detail').then((data) => {
        if (data.code === 0) {
          this.info = {
            visible: true,
            type: 'edit',
            data: data.data,
          }
        }
      })
    },
    // 删除
    delProject(obj) {
      this.$confirm('确认删除？', '提示', { type: 'warning' }).then(_ => {
        apiXJFACus({ planId: obj.planId }, 'delete').then((data) => {
          if (data.code === 0) {
            this.getList()
            this.$message.success('删除成功')
          } else {
            throw new Error('删除失败')
          }
        }).catch(() => {
          this.$message.error('删除失败')
        })
      })
    }
	},
}
</script>

<style lang="scss" scoped>

</style>

