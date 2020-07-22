<template>
  <div class="app-container">
    <el-card shadow="never" class="m-b-16">
      <div class="el-page-header m-b-30">
        <div class="el-page-header__content m-lr-auto">我的任务</div>
      </div>
      <div class="m-b-16">
        <el-form
          :inline="true"
          :model="searchForm"
          :rules="rules"
          ref="searchForm"
          label-width="140px"
        >
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="客户名称：">
                <el-input v-model="searchForm.cname" placeholder="客户名称" class></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="流程名称：">
                <el-select v-model="searchForm.ftCode" class placeholder="请选择" clearable>
                  <!-- <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>-->
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="流程节点：">
                <el-select v-model="searchForm.flowNode" class placeholder="请选择" clearable>
                  <!-- <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>-->
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="开始提交时间：">
                <el-date-picker
                  v-model="searchForm.createDateTimeOver"
                  class
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="请选择开始提交时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结束提交时间：">
                <el-date-picker
                  v-model="searchForm.createDateTimeStart"
                  class
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="请选择结束提交时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="m-b-16">
        <el-row :gutter="20">
          <el-col :span="4" :offset="10">
            <el-button type="primary" @click="handleSearchList()">查询</el-button>
            <el-button @click="resetSearchForm('searchForm')">重置</el-button>
          </el-col>
          <el-col :span="2" :offset="8">
            <el-button type="primary" @click="exportData()">导出</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-table
      height="400"
      v-loading="listLoading"
      class="m-b-16"
      :data="list"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="60" align="center"></el-table-column>
      <el-table-column label="流程名称" align="center">
        <template slot-scope="{row}">
          <sapn>{{ row.currentNodeName }}</sapn>
        </template>
      </el-table-column>
      <el-table-column label="流程节点" align="center">
        <template slot-scope="{row}">{{ row.currentNodeName}}</template>
      </el-table-column>
      <el-table-column label="业务编号" align="center">
        <template slot-scope="{row}">{{ row.businessNum}}</template>
      </el-table-column>
      <el-table-column label="客户名称" align="center">
        <template slot-scope="{row}">{{ row.customerName}}</template>
      </el-table-column>
      <el-table-column label="二手车业务" align="center">
        <template slot-scope="{row}">{{ row.isSecondHandCar | isSecondHandCarFilter }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-button @click="toOperate(row)" type="text">{{ row.currentNodeName }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row class="m-b-16">
      <el-pagination
        background
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="searchForm.pageNum"
        :page-size="searchForm.pageSize"
        :page-sizes="[10, 20, 50]"
        :total="total"
        :hide-on-single-page="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        class="t-r"
      ></el-pagination>
    </el-row>
  </div>
</template>
<script>
import { mytasksSearch, flowGet, getInfo } from '@/api/wdrw/wdrw'
import Pagination from '@/components/Pagination'

export default {
  name: 'wdrwWdrw',
  filters: {
    isSecondHandCarFilter(value) {
      let arr = ['', '是', '否']
      return arr[value] || '--'
    }
  },
  components: { 
    Pagination 
  },  
  data() {
    return {
      searchForm: {
        page: 1,
        pageSize: 10,
        cname: '',
        ftCode: '',
        flowNode: '',
        createDateTimeStart: '',
        createDateTimeOver: ''
      },
      rules: {
        ftCode: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ]
      },

      listLoading: true,
      list: [],
      total: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    resetSearchForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleSearchList() {
      this.getList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    toOperate(row) {
      console.info(row)
    },
    handleSizeChange(val) {
      this.searchForm.page = 1
      this.searchForm.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.searchForm.page = val
      this.getList()
    },
    async getList() {
      this.listLoading = true

      //自行改接扣调用
      let apiData = await mytasksSearch(this.searchForm)
      this.list = apiData.data
      this.total = apiData.totalItem
      this.listLoading = false
    },
    deleteOrder(ids) {
      this.$confirm('是否要进行该删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {})
    },
    exportData() {
      console.info(this.searchForm)
      let data = ''
      let exportUrl = window.location.origin + data
      console.info(exportUrl)
      // window.location.href = exportUrl
    }
  }
}
</script>
<style lang="scss" scoped>
</style>