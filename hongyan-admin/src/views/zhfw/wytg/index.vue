<template>
  <div v-loading.body="loading" class="p-10 bg-EFF2F7">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-b-10">
        <div class="flex-center w-fit-content">
          <span class="w-130 f-s-14">内容标题：</span>
          <el-input v-model.trim="listQuery.title" @keyup.enter.native="handleFilter"></el-input>
        </div>
        <el-button type="primary" size="small" icon="el-icon-search" class="m-l-20" @click="handleFilter">搜索</el-button>
        <el-button type="primary" size="small" icon="el-icon-plus" class="m-l-20" @click="addItem">新增</el-button>
      </div>
      <div>
        <el-table
          :border="true"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="title" label="内容标题" min-width="120" />
          <el-table-column prop="type" label="类别" min-width="120">
            <span slot-scope="scope">
              {{ ($store.state.reflex.typeCode.find(item => item.value == scope.row.categoryId) || {}).label || '' }}
            </span>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" min-width="120" />
          <el-table-column label="操作" width="200" fixed="right">
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
    <!-- 新增、编辑通告 -->
    <Handle
      v-model="handleInfo"
      @reflash="getList"
    />
  </div>
</template>

<script>
import { apiWYTG } from '@/api/zhfw/wytg.js'

export default {
  name: 'XtglXtpz',
  components: {
    Handle: () => import('./Handle.vue'),
  },
  data() {
    return {
      loading: false,
      btnLoading: false,
      searchLoading: false,
      total: 0,
      listQuery: {
        title: '',
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
  mounted() {
    this.getList()
	},
  methods: {
    // 条件搜索
    handleFilter() {
      this.listQuery.pageCurrent = 1
      this.getList()
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
    // 获取列表
    getList() {
      this.loading = true
      apiWYTG(this.listQuery, 'list').then((data) => {
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
      this.handleInfo = {
        visible: true,
        type: 'edit',
        data: this._.cloneDeep(obj),
      }
    },
    // 删除
    deleteItem(obj) {
      this.$confirm('确认删除？', '提示', { type: 'warning' }).then(_ => {
        apiWYTG({ id: obj.id }, 'discard').then((data) => {
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

