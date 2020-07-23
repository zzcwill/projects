<template>
  <div class="app-container">
    <el-card shadow="never" class="m-b-10">
      <div class="el-page-header m-b-20">
        <div class="el-page-header__content m-lr-auto">贷款详情</div>
      </div>
      <el-form :inline="true" :model="searchForm" :rules="rules" ref="searchForm">
        <el-row :gutter="5">
          <el-col :span="8">
            <el-form-item label="客户名称：" prop="cname" label-width="140px">
              <el-input v-model="searchForm.cname" placeholder="客户名称" class="same-form-width"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="流程名称：" prop="ftCode" label-width="140px">
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
            <el-form-item label="流程节点：" prop="flowNode" label-width="140px">
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
            <el-form-item label="开始提交时间：" prop="createDateTimeOver" label-width="140px">
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
            <el-form-item label="结束提交时间：" prop="createDateTimeStart" label-width="140px">
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
  </div>
</template>
<script>
import {
  pledgeInfoDetail
} from '@/api/wdrw/wdrw'
import Pagination from '@/components/Pagination'

export default {
  name: 'wdrwWdrwInfo',
  filters: {
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
        createDateTimeOver: '',
        isProcessed: false,
      },
      rules: {
        cname: [{ required: true, message: '请输入客户信息', trigger: 'blur' }],
        // ftCode: [
        //   { required: true, message: '请选择活动资源', trigger: 'change' }
        // ]
      },
      ftCodeOptions: [],
      flowNodeOptions: []
    }
  },
  created() {
    this.getFtCodeOptions()
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
  },
}
</script>
<style lang="scss" scoped>
</style>