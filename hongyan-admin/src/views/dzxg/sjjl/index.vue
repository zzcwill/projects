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
        <el-button size="medium" type="primary" icon="el-icon-search" class="m-l-20" @click="handleFilter">搜索</el-button>
      </div>
      <div>
        <el-table
          :border="true"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="parkName" label="所属园区" min-width="120">
          </el-table-column>
          <el-table-column prop="incTime" label="事件时间" min-width="120">
          </el-table-column>
          <el-table-column prop="incResume" label="事件描述" min-width="120">
          </el-table-column>
          <el-table-column prop="stepName" label="处理状态" min-width="120">
          </el-table-column>
          <el-table-column prop="principalTime" label="处理时间" min-width="120">
          </el-table-column>
          <el-table-column prop="principalContent" label="处理内容" min-width="120">
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="120">
            <div slot-scope="scope">
              <el-button size="mini" type="primary" @click="toDetail(scope.row)">处理/查看</el-button>
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
import { getList } from '@/api/dzxg/sjjl'
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
        dateTime: [],
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
          data: {}
      },
      personInfo: {
          visible: false,
          data: {}
      },
    }
  },
  created() {
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
      console.log(this.listQuery)
      let params
      if (this.listQuery.dateTime && this.listQuery.dateTime.length) {
        params = Object.assign({}, this.listQuery, { startTime: this.listQuery.dateTime[0] }, { endTime: this.listQuery.dateTime[1] })
      } else {
        params = Object.assign({}, this.listQuery)
      }
      delete params.dateTime
      this.loading = true 
      console.log(params)
      getList(params).then((data) => {
        this.loading = false
        if (data.code === 0) {
          console.log(data.data)
          // 页面数据
          this.tableData = data.data
          this.total = data.page.resultCount
        }
      }).catch(() => {
        this.loading = false
        this.total = 0
      })
    },
    toDetail(item) {
        console.log('item', item)
      this.info = {
        visible: true,
        data: item
      }
    },
      toPersonDetail(item) {
        this.personInfo = {
            visible: true,
            data: { ...item }
        }
      }
	},
}
</script>

<style lang="scss" scoped>

</style>

