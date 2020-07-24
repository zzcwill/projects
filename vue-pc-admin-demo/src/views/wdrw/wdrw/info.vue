<template>
  <div class="app-container">
    <el-card shadow="never" class="m-b-10">
      <div class="el-page-header m-b-20">
        <div class="el-page-header__content m-lr-auto">贷款详情</div>
      </div>
      <el-tabs type="card">
        <el-tab-pane label="基本信息">
          <el-tabs type="border-card" v-for="dom in domArr" :key="dom" class="m-b-20">
            <el-tab-pane>
              <span slot="label">
                <i class="el-icon-date"></i>客户信息
              </span>
              <el-form :inline="true" :model="searchForm" :rules="rules" ref="searchForm" label-width="140px" disabled>
                <el-row :gutter="5" v-for="dom2 in domArr2" :key="dom2">
                  <el-col :span="8">
                    <el-form-item label="客户名称：" prop="customerName" >
                      <el-input
                        v-model="searchForm.customerName"
                        placeholder="客户名称"
                        class="same-form-width"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="户籍性质：" prop="domicileType" >
                      <el-select
                        v-model="searchForm.domicileType"
                        placeholder="请选择"
                        class="same-form-width"
                      >
                        <el-option
                          v-for="item in domicileTypeOptions"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="性别：" prop="sex">
                      <el-select
                        v-model="searchForm.sex"
                        placeholder="请选择"
                        clearable
                        filterable
                        class="same-form-width"
                      >
                        <el-option
                          v-for="item in sexOptions"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="过程信息">过程信息</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import { loanApprovalInfoGetApprovalBaseInfo } from '@/api/wdrw/wdrw'

export default {
  name: 'wdrwWdrwInfo',
  filters: {},
  data() {
    return {
      projectId: '',
      searchForm: {
        customerName: '',
        domicileType: '',
        sex: '',
      },
      rules: {
        // customerName: [{ required: true, message: '请输入客户信息', trigger: 'blur' }],
      },
      domicileTypeOptions: [
        {
          name: '农业',
          value: 1,
        },
        {
          name: '非农',
          value: 2,
        },
      ],
      sexOptions: [
        {
          name: '男',
          value: 1,
        },
        {
          name: '女',
          value: 0,
        },
      ],
      domArr: [1,2],
      domArr2: [1,2,3,4],      
    }
  },
  created() {
    this.projectId = this.$route.query.projectId
    this.getLoanInfo()
  },
  methods: {
    async getLoanInfo() {
      //自行改接扣调用
      let params = {
        loanApplyId: this.projectId,
      }
      let apiData = await loanApprovalInfoGetApprovalBaseInfo(params)

      this.searchForm = this._.pick(apiData.data, [
        'customerName',
        'domicileType',
        'sex',
      ])
    },
  },
}
</script>
<style lang="scss" scoped>
</style>