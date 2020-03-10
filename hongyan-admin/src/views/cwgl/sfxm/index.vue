<template>
  <div class="p-10 bg-EFF2F7">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="flex-center w-fit-content">
          <span class="w-90">收费方式:</span>
          <el-select v-model="listQuery.feeTypeCode" placeholder="请选择收费方式" clearable>
            <el-option v-for="(item, index) in $store.state.reflex.feeType" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <el-button type="primary" icon="el-icon-search" class="m-l-20" @click="search">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" class="m-l-20" @click="add">新增</el-button>
      </div>
      <div>
        <el-table
          v-loading.body="loading"
          :border="true"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="itemName" label="费项名称" min-width="120">
          </el-table-column>
          <el-table-column label="收费方式" min-width="120">
            <span slot-scope="scope">{{ $store.state.reflex.feeType.find(item => item.value == scope.row.feeTypeCode).label }}</span>
          </el-table-column>
          <el-table-column label="阶梯收费" min-width="120">
            <span slot-scope="scope">{{ $store.state.reflex.is.find(item => item.value == scope.row.stepPrice).label }}</span>
          </el-table-column>
          <el-table-column prop="unitPrice" label="单位单价" min-width="120">
          </el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <div slot-scope="scope">
              <el-button type="primary" size="mini" @click="editItem(scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
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
          @size-change="sizeChange"
          @current-change="currentChange"
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
// import { getInfo } from '@/api/user'
import { apiSFXM } from '@/api/cwgl/sfxm.js'
export default {
  name: 'CwglSfxm',
  components: {
    Handle: () => import('./Handle.vue'),
  },
  data() {
    return {
      loading: false,
      total: 0,
      listQuery: {
        feeTypeCode: '',
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
  destoryed() {
  },
  methods: {
    // 条件搜索
    search() {
      this.listQuery.pageCurrent = 1
      this.getList()
    },
    // 切换每页显示条数
    sizeChange(val) {
      this.listQuery.pageLimit = val
      this.getList()
    },
    // 切换当前第几页
    currentChange(val) {
      this.listQuery.pageCurrent = val
      this.getList()
    },
    // 获取列表
    getList() {
      this.loading = true
      apiSFXM(this.listQuery).then((data) => {
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
    add() {
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
        data: obj,
      }
    },
    // 删除
    del(id) {
      this.$confirm('确认删除？', '提示', { type: 'warning' }).then(_ => {
        apiSFXM({ id }, 'discard').then(data => {
          if (data.code === 0) {
            this.$message.success('删除成功')
            this.getList()
          } else {
            this.$message.error(data.msg)
          }
        }).catch(() => {
          this.$message.error('删除失败')
        })
      })
      .catch(_ => {})
    }
	},
}
</script>

<style lang="scss" scoped>

</style>

