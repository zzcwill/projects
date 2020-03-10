<template>
  <div v-loading="loading" class="p-10 bg-EFF2F7">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-b-10">
        <div class="flex-center w-fit-content">
          <span class="w-90">巡检日期：</span>
          <el-date-picker
            v-model="listQuery.dateTime"
            :picker-options="timeOptions"
            style="width:400px;"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div class="flex-center w-fit-content p-l-20">
          <span class="w-90"> 巡检部位：</span>
          <el-select v-model="listQuery.inspectionSite" placeholder="请选择部位">
            <el-option v-for="(item, index) in $store.state.reflex.xjType" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <el-button size="medium" type="primary" icon="el-icon-search" class="m-l-20" @click="handleFilter">搜索</el-button>
        <el-button size="medium" type="primary" icon="el-icon-plus" class="m-l-20" @click="show('add')">添加</el-button>
      </div>
      <div>
        <el-table
          :border="true"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="projectPlanName" label="项目" min-width="120" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="inspectionSite" label="巡检部位" min-width="120" show-overflow-tooltip>
            <span slot-scope="scope">{{ ($store.state.reflex.xjType.find(ele => ele.value == scope.row.inspectionSite) || {}).label || '' }}</span>
          </el-table-column>
          <el-table-column prop="keeyDay" label="巡检日期" min-width="120" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="incTime" label="巡检事件" min-width="120" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="incPlace" label="位置" min-width="120" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="incResume" label="现象" min-width="120" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="incContent" label="处理" min-width="120" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="principalContent" label="备注" min-width="120" show-overflow-tooltip>
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="120">
            <div slot-scope="scope">
              <el-button size="mini" type="primary" @click="show('view', scope.row)">查看</el-button>
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
    <Handle v-model="info" @reflash="getList" />
  </div>
</template>

<script>
import { apiYJJLLIST } from '@/api/dzxg/yjjl'
import Handle from './Handle.vue'

export default {
  name: 'DzxgSjjl',
    components: {
        Handle
    },
  data() {
    return {
      loading: false,
      total: 1,
      listQuery: {
        dateTime: [this.moment().subtract(7, 'days').format('YYYY-MM-DD'), this.moment().format('YYYY-MM-DD')],
        inspectionSite: '1',
        pageCurrent: 1,
        pageLimit: 20,
      },
      tableData: [],
      timeOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
      info: {
        visible: false,
        data: {},
        type: 'add'
      },
    }
  },
  mounted() {
    this.getList()
	},
  destoryed() {
  },
  methods: {
    // 条件搜索
    handleFilter() {
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
        params = Object.assign({}, this.listQuery, { startDate: this.listQuery.dateTime[0] }, { endDate: this.listQuery.dateTime[1] })
      } else {
        params = Object.assign({}, this.listQuery)
      }
      delete params.dateTime
      this.loading = true
      apiYJJLLIST(params).then((data) => {
        this.loading = false
        if (data.code === 0) {
          // 页面数据
          this.tableData = data.data || []
          this.total = data.page.resultCount
        } else {
          throw new Error()
        }
      }).catch(() => {
        this.loading = false
        this.total = 0
        this.tableData = []
        this.$message.error('获取数据失败')
      })
    },
    show(type, item) {
      this.info = {
        visible: true,
        data: item,
        type: type
      }
    },
	},
}
</script>

<style lang="scss" scoped>

</style>

