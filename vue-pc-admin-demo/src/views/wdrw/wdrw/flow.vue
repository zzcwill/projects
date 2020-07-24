<template>
  <div class="app-container">
    <el-card shadow="never" class="m-b-10">
      <div class="el-page-header m-b-20">
        <div class="el-page-header__content m-lr-auto">{{ title }}</div>
      </div>
      <el-tabs type="card">
        <el-tab-pane label="基本信息">
          <el-tabs type="border-card" class="m-b-20">
            <el-tab-pane>
              <span slot="label">
                <i class="el-icon-date"></i> 客户信息
              </span>
              <el-form :inline="true" :model="searchForm" :rules="rules" ref="searchForm" label-width="140px">
                <el-row :gutter="5">
                  <el-col :span="8">
                    <el-form-item label="客户名称：" prop="customerName">
                      <el-input
                        v-model="searchForm.customerName"
                        placeholder="客户名称"
                        class="same-form-width"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="户籍性质：" prop="domicileType">
                      <el-select
                        v-model="searchForm.domicileType"
                        placeholder="请选择"
                        class="same-form-width"
                        disabled
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
                    <el-form-item label="性别：" prop="sex" label-width="140px">
                      <el-select
                        v-model="searchForm.sex"
                        placeholder="请选择"
                        clearable
                        filterable
                        class="same-form-width"
                        disabled
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

                <el-row :gutter="5">
                  <el-col :span="8" >
                    <el-form-item label="意见结论">
                      <el-radio-group v-model="flowOpinion.conclusion">
                        <el-radio :label="1">同意</el-radio>
                        <el-radio :label="0">拒绝</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row> 

                <el-row :gutter="5">
                  <el-col :span="8" >
                    <el-form-item label="意见说明">
                      <el-input type="textarea" v-model="flowOpinion.opinion" class="same-form-width"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="5">
                  <el-col :span="6" :offset="9">
                    <el-form-item>
                      <el-button type="primary" @click="submitSearchTable('searchForm')">提交</el-button>
                      <el-button @click="cancelSearchForm()">取消</el-button>
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
import { loanApprovalInfoGetApprovalBaseInfo, opinionSave, loanReviewPreSubmit, loanReviewSubmit2next } from '@/api/wdrw/wdrw'

export default {
  name: 'wdrwWdrwFlow',
  filters: {},
  data() {
    return {
      title: '',
      projectId: '',
      searchForm: {
        customerName: '',
        domicileType: '',
        sex: '',
      },
      flowOpinion: {
        conclusion: 1,
        opinion: '',
        bopInfoId: ''
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
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    routes() {
      return this.$store.state.permission.routes
    }
  },  
  created() {
    this.title = this.$route.query.currentNodeName
    this.projectId = this.$route.query.projectId
    this.flowOpinion.bopInfoId = this.$route.query.bopInfoId
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
    async submitSearchTable() {
      this.$confirm('贷款流程提交下一步，是否确认？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async () => {
        let isOption = await opinionSave(this.flowOpinion)

        if(isOption) {
          let predata = await loanReviewPreSubmit({
            loanApplyId: this.projectId
          })
          if(predata.data.userTasks.length) {
            let submitData = await loanReviewSubmit2next({
              nextNodeUserName: predata.data.userTasks[0].userName,
              nextNodeUserId: predata.data.userTasks[0].userId,
              loanApplyId: this.projectId 
            })
            if(submitData) {
              this.$message(submitData.message)
              this.cancelSearchForm()         
            }
          }
        }
      }).catch(() => {          
      });
    },
    //关闭当前页start 
    cancelSearchForm() {
      let tags = this.visitedViews
      let selectedTag = {}
      for (let tag of tags) {
        if (tag.path === this.$route.path) {
          selectedTag = tag
        }
      }
      this.closeSelectedTag(selectedTag)     
    },
    isActive(route) {
      return route.path === this.$route.path
    },
    closeSelectedTag(view) {
      this.$store
        .dispatch('tagsView/delView', view)
        .then(({ visitedViews }) => {
          if (this.isActive(view)) {
            this.toLastView(visitedViews, view)
          }
        })
    },        
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView)
      } else {
        if (view.name === 'dashboard') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    }
    //关闭当前页end
  },
}
</script>
<style lang="scss" scoped>
</style>