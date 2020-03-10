<template>
  <div class="app-container">
    <el-card shadow="never" class="m-b-16">
      <div class="el-page-header m-b-30">
        <div class="el-page-header__content m-lr-auto">基础表格模板</div>
      </div>
      <div class="m-b-16">
        <el-form :inline="true" :model="listQuery" label-width="140px">
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="订单编号：">
                <el-input v-model="listQuery.orderSn" placeholder="订单编号" class="w-200"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收货人：">
                <el-input
                  v-model="listQuery.receiverKeyword"
                  class="w-200"
                  placeholder="收货人姓名/手机号码"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提交时间：">
                <el-date-picker
                  class="w-200"
                  v-model="listQuery.createTime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="请选择时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="订单状态：">
                <el-select v-model="listQuery.status" class="w-200" placeholder="全部" clearable>
                  <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="m-b-16">
        <el-row :gutter="20">
          <el-col :span="4" :offset="10">
            <el-button type="primary" @click="handleSearchList()">查询</el-button>
            <el-button @click="handleResetSearch()">重置</el-button>
          </el-col>
          <el-col :span="2" :offset="8">
            <el-button type="primary" @click="exportData()">导出</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-table
      class="m-b-16"
      ref="orderTable"
      :data="list"
      @selection-change="handleSelectionChange"
      v-loading="listLoading"
      border
    >
      <el-table-column type="selection" width="60" align="center"></el-table-column>
      <el-table-column label="编号" align="center">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column label="订单状态" align="center">
        <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handleViewOrder(scope.$index, scope.row)">查看订单</el-button>
          <el-button type="danger" v-show="scope.row.status===4">只是看看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row class="m-b-16">
      <el-col :span="8">
        <el-select v-model="operateType" placeholder="批量操作">
          <el-option
            v-for="item in operateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button class="search-button m-l-20" @click="handleBatchOperate()" type="primary">确定</el-button>
      </el-col>
      <el-col :span="9" :offset="7">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes,prev, pager, next,jumper"
          :current-page.sync="listQuery.pageNum"
          :page-size="listQuery.pageSize"
          :page-sizes="[5,10]"
          :total="total"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import { getTable1 } from '@/api/demo/table1'
import { getExport } from '@/utils/index'
const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  orderSn: '',
  receiverKeyword: '',
  status: '',
  createTime: ''
}
export default {
  name: 'Table1',
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: [],
      total: 0,
      operateType: 1,
      multipleSelection: [],
      statusOptions: [
        {
          label: '待发货',
          value: 1
        },
        {
          label: '已发货',
          value: 2
        },
        {
          label: '已完成',
          value: 3
        },
        {
          label: '已关闭',
          value: 4
        }
      ],
      operateOptions: [
        {
          label: '关闭订单',
          value: 1
        },
        {
          label: '删除订单',
          value: 2
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  filters: {
    formatStatus(value) {
      let arr = ['', '待发货', '已发货', '已完成', '已关闭', '无效订单']
      return arr[value]
    }
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery)
    },
    handleSearchList() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleViewOrder(index, row) {
      //  跳转页面
      // this.$router.push({ path: '/demo/table1-2', query: { id: row.id } })
    },
    handleBatchOperate() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择要操作的订单',
          type: 'warning',
          duration: 1000
        })
        return
      }
      if (this.operateType === 1) {

      }

      if (this.operateType === 2) {
        //删除订单
        let ids = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id)
        }
        this.deleteOrder(ids)
      }
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    },
    getList() {
      this.listLoading = true

      //自行改接扣调用
      let apiData = {
        code: '0',
        data: {
          list: [
            {
              id: '1',
              status: 1
            },
            {
              id: '2',
              status: 2
            },
            {
              id: '3',
              status: 3
            },
            {
              id: '4',
              status: 4
            },
            {
              id: '5',
              status: 3
            }            
          ],
          total: 6
        }
      }
      this.list = apiData.data.list
      this.total = apiData.data.total
      this.listLoading = false
    },
    deleteOrder(ids) {
      this.$confirm('是否要进行该删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      })
    },
    exportData() {
      let data = getExport(this.listQuery)
      let exportUrl = window.location.origin + data
      console.info(exportUrl)
      // window.location.href = exportUrl
    }
  }
}
</script>
<style lang="scss" scoped>
</style>