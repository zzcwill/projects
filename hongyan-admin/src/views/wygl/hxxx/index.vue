<template>
  <div v-loading="loading" class="p-10 bg-EFF2F7">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="flex-center w-fit-content">
          <span class="w-130">户型名称:</span>
          <el-input v-model.trim="listQuery.apartmentName" placeholder="请输入户型名称"></el-input>
        </div>
        <el-button type="primary" icon="el-icon-search" class="m-l-20" @click="handleFilter">搜索</el-button>
        <el-button type="primary" size="medium" icon="el-icon-plus" class="m-l-20" @click="addItem">新增户型</el-button>
      </div>
      <div>
        <el-table
          :border="true"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="apartmentTypeName" label="户型分类" min-width="120">
          </el-table-column>
          <el-table-column prop="apartmentName" label="户型名称" min-width="120">
          </el-table-column>
          <el-table-column prop="apartmentSpace" label="户型面积" min-width="120">
          </el-table-column>
          <el-table-column prop="apartmentPrice" label="物业费单价" min-width="120">
          </el-table-column>
          <el-table-column prop="numLivingRoom" label="客厅数" min-width="80">
          </el-table-column>
          <el-table-column prop="numBedrooms" label="卧室数" min-width="80">
          </el-table-column>
          <el-table-column prop="numToilets" label="卫生间数" min-idth="80">
          </el-table-column>
          <el-table-column prop="numKitchens" label="厨房数" min-idth="80">
          </el-table-column>
          <el-table-column prop="numBalcony" label="阳台数" min-idth="80">
          </el-table-column>
          <el-table-column prop="numGardens" label="花园数" min-idth="80">
          </el-table-column>
          <el-table-column prop="numPools" label="泳池数" min-idth="80">
          </el-table-column>
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
      @update="getList"
    />
  </div>
</template>

<script>
import { getApartmentList, del } from '@/api/wygl/hxxx'

export default {
  components: {
    Handle: () => import('./Handle.vue'),
  },
  data() {
    return {
      title: '',
      loading: false,
      total: 1,
      listQuery: {
        apartmentName: '',
        pageCurrent: 1,
        pageLimit: 20,
      },
      handleInfo: {
          type: 'add',
        visible: false,
        data: null,
      },
      tableData: []
    }
  },
  created() {
      this.getList()
  },
  mounted() {
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
    async getList() {
      this.loading = true
      const response = await getApartmentList(this.listQuery)
      this.loading = false
      this.tableData = response.data
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
        console.log(obj)
      this.handleInfo = {
        visible: true,
        type: 'edit',
        data: obj,
      }
    },
    // 删除
    deleteItem(obj) {
      this.$confirm('确认删除？', '提示', { type: 'warning' }).then(_ => {
        del({ id: obj.id }).then(res => {
            console.log(res)
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

