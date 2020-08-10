<template>
  <div class="app-container">
    <el-card shadow="never" class="m-b-10">
      <div class="el-page-header m-b-20">
        <div class="el-page-header__content m-lr-auto">我的任务</div>
      </div>
      <el-form :inline="true" :model="searchForm" :rules="rules" ref="searchForm" label-width="140px">
        <el-row :gutter="5">
          <el-col :span="8">
            <el-form-item label="客户名称：" prop="cname">
              <el-input v-model="searchForm.cname" placeholder="客户名称" class="same-form-width"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="流程名称：" prop="ftCode">
              <el-select
                v-model="searchForm.ftCode"
                placeholder="请选择"
                class="same-form-width"
                @change="changeFtCode"
              >
                <el-option
                  v-for="item in ftCodeOptions"
                  :key="item.flowType"
                  :label="item.flowName"
                  :value="item.flowType"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="流程节点：" prop="flowNode">
              <el-select
                v-model="searchForm.flowNode"
                placeholder="请选择"
                clearable
                filterable
                class="same-form-width"
              >
                <el-option
                  v-for="item in flowNodeOptions"
                  :key="item.nodeCode"
                  :label="item.nodeName"
                  :value="item.nodeCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="8">
            <el-form-item label="开始提交时间：" prop="createDateTimeOver">
              <el-date-picker
                v-model="searchForm.createDateTimeOver"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择"
                class="same-form-width"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束提交时间：" prop="createDateTimeStart">
              <el-date-picker
                v-model="searchForm.createDateTimeStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择"
                class="same-form-width"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="6" :offset="9">
            <el-form-item>
              <el-button type="primary" @click="searchTable('searchForm')">查询</el-button>
              <el-button @click="resetSearchForm('searchForm')">重置</el-button>
              <el-button type="primary" @click="exportData()">导出</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-tabs v-model="activeTabName" type="card" @tab-click="tabClick">
      <el-tab-pane label="待办任务" name="todo">
        <el-table
          max-height="380"
          v-loading="tableData.tableLoading"
          :data="tableData.tableList"
          border
          fit
          highlight-current-row
          @selection-change="tableSelectionChange"
        >
          <el-table-column type="selection" width="60" align="center"></el-table-column>
          <el-table-column label="流程名称" align="center">
            <template slot-scope="{row}">
              <span>{{ row.businessTypeName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="流程节点" align="center">
            <template slot-scope="{row}">
              <span>{{ row.currentNodeName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="业务编号" align="center">
            <template slot-scope="{row}">
              <span>{{ row.businessNum}}</span>
            </template>
          </el-table-column>
          <el-table-column label="客户名称" align="center">
            <template slot-scope="{row}">
              <span>{{ row.customerName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="二手车业务" align="center">
            <template slot-scope="{row}">
              <span>{{ row.isSecondHandCar | isSecondHandCarFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{row}">
              <el-button @click="toOperate(row)" type="text">{{ row.currentNodeName }}</el-button>
              <el-button @click="toOperate2(row)" type="text" v-if="row.businessTypeCode === 'LOAN_APPLY_FLOW'">多媒体资料</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="tableData.tableTotal>0"
          :total="tableData.tableTotal"
          :page.sync="searchForm.page"
          :limit.sync="searchForm.pageSize"
          @pagination="getTableList"
        ></pagination>
      </el-tab-pane>
      <el-tab-pane label="已办任务" name="done">
        <el-table
          max-height="380"
          v-loading="tableData.tableLoading"
          :data="tableData.tableList"
          border
          fit
          highlight-current-row
        >
          <el-table-column label="流程名称" align="center">
            <template slot-scope="{row}">
              <span>{{ row.businessTypeName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="流程节点" align="center">
            <template slot-scope="{row}">
              <span>{{ row.currentNodeName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="业务编号" align="center">
            <template slot-scope="{row}">
              <span>{{ row.businessNum}}</span>
            </template>
          </el-table-column>
          <el-table-column label="客户名称" align="center">
            <template slot-scope="{row}">
              <span>{{ row.customerName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="二手车业务" align="center">
            <template slot-scope="{row}">
              <span>{{ row.isSecondHandCar | isSecondHandCarFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{row}">
              <el-button @click="toOperate3(row)" type="text">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="tableData.tableTotal>0"
          :total="tableData.tableTotal"
          :page.sync="searchForm.page"
          :limit.sync="searchForm.pageSize"
          @pagination="getTableList"
        ></pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {
  mytasksSearch,
  flowGet,
  flowNodes,
  customerCreditInfoDownload,
} from '@/api/wdrw/wdrw'
import Pagination from '@/components/Pagination'

export default {
  name: 'wdrwWdrw',
  filters: {
    isSecondHandCarFilter(value) {
      let arr = ['', '是', '否']
      return arr[value] || '--'
    },
  },
  components: {
    Pagination,
  },
  data() {
    return {
      searchForm: {
        page: 1,
        pageSize: 10,
        cname: '',
        ftCode: 'LOAN_APPLY_FLOW',
        flowNode: '',
        createDateTimeStart: '',
        createDateTimeOver: '',
        isProcessed: false,
      },
      rules: {
        // cname: [{ required: true, message: '请输入客户信息', trigger: 'blur' }],
        // ftCode: [
        //   { required: true, message: '请选择活动资源', trigger: 'change' }
        // ]
      },
      tableData: {
        tableLoading: true,
        tableList: [],
        tableTotal: 0,
      },
      ftCodeOptions: [],
      flowNodeOptions: [],
      activeTabName: 'todo',
    }
  },
  created() {
    this.getFtCodeOptions()
    this.changeFtCode(this.searchForm.ftCode)
    this.getTableList()
  },
  methods: {
    resetSearchForm(formName) {
      this.$refs[formName].resetFields()
    },
    searchTable(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getTableList()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    tableSelectionChange(val) {
      console.info(val)
    },
    toOperate(row) {
      //传参query 最好不要用Boolean
      this.$router.push({
        path: '/wdrw/wdrw/page/flow',
        query: {
          projectId: row.businessId,
          bopInfoId: row.businessObjectProcessInfoId,
          currentNodeName: row.currentNodeName
        },
      })
    },
    toOperate2(row) {
      this.$router.push({
        path: '/wdrw/wdrw/page/imgInfo',
        query: {
          projectId: row.businessId,
          currentNodeName: row.currentNodeName,
          space: 'LOAN',
          releventFlow: row.businessTypeCode,
          releventFlowNode: row.currentNodeKey
        },
      })
    },
    toOperate3(row) {
      this.$router.push({
        path: '/wdrw/wdrw/page/info',
        query: {
          projectId: row.businessId
        },
      })
    },    
    async getTableList() {
      this.tableData.tableLoading = true

      //自行改接扣调用
      let apiData = await mytasksSearch(this.searchForm)
      this.tableData.tableList = apiData.data
      this.tableData.tableTotal = apiData.totalItem
      this.tableData.tableLoading = false
    },
    async getFtCodeOptions() {
      let apiData = await flowGet()
      this.ftCodeOptions = apiData.data
    },
    async changeFtCode(val) {
      this.searchForm.flowNode = ''

      let data = {
        businessTypeCode: val,
      }
      let apiData = await flowNodes(data)
      this.flowNodeOptions = apiData.data
    },
    tabClick(tab) {
      if (tab.name === 'todo') {
        this.searchForm.isProcessed = false
      }
      if (tab.name === 'done') {
        this.searchForm.isProcessed = true
      }
      this.getTableList()
    },
    exportData() {
      let data = '?customerName=老大哥'
      let exportUrl = customerCreditInfoDownload() + data
      window.location.href = exportUrl
    },
  },
}
</script>
<style lang="scss" scoped>
</style>