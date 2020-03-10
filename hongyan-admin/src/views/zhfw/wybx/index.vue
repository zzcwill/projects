<template>
  <div v-loading="loading" class="p-10 bg-EFF2F7">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-b-10">
        <div class="flex-center w-fit-content">
          <span class="w-60">状态：</span>
          <el-select v-model="listQuery.statusCode" placeholder="请选择">
            <el-option v-for="(item, index) in $store.state.reflex.tsjyStaus" :key="index" :label="item.label" :value="item.value" />
          </el-select>
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
          <el-table-column prop="proposeContent" label="维修内容" min-width="120">
          </el-table-column>
          <el-table-column prop="proposeName" label="报修人" min-width="120">
          </el-table-column>
          <el-table-column prop="createTime" label="报修时间" min-width="120">
          </el-table-column>
          <el-table-column prop="replyContent" label="处理情况" min-width="120">
          </el-table-column>
          <el-table-column prop="statusName" label="状态" min-width="120">
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="120">
            <el-button slot-scope="scope" size="mini" type="primary" @click="toDetail(scope.row)">
              详情
            </el-button>
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
    <!-- 查看详情 -->
    <LookDetail v-model="info" @reflash="getList" />
  </div>
</template>

<script>
import { getList } from '@/api/zhfw/tsjy'
export default {
  name: 'XtglXtpz',
  components: {
    LookDetail: () => import('./LookDetail.vue'),
  },
  data() {
    return {
      loading: false,
      total: 1,
      listQuery: {
        statusCode: '',
        pageCurrent: 1,
        pageLimit: 20,
      },
      tableData: [],
      info: { visible: false, data: {}},
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
      this.info = {
        visible: true,
        data: { ...item }
      }
    }
	},
}
</script>

<style lang="scss" scoped>

</style>

