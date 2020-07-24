<template>
  <div class="app-container">
    <el-card shadow="never" class="m-b-10">
      <div class="el-page-header m-b-20">
        <div class="el-page-header__content m-lr-auto">多媒体资料-{{ currentNodeName }}</div>
      </div>
      <el-tabs type="card">
        <el-tab-pane label="影像管理">
          <el-row :gutter="20">
            <el-col :span="10">
              <el-card shadow="never">
                <el-tree :data="imgTreeData" :props="imgTreeDataProps" @node-click="getImgList"></el-tree>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card shadow="never">
                <el-button @click="toUloadFile">上传文件</el-button>
              </el-card>
            </el-col>            
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="过程信息">过程信息</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import {
  loanApprovalInfoGetApprovalDocumentDir,
  loanApprovalInfoGetApprovalDocument,
  loanDocumentUploadFileString,
} from '@/api/wdrw/wdrw'

export default {
  name: 'wdrwWdrwImgInfo',
  filters: {},
  data() {
    return {
      projectId: '',
      currentNodeName: '',
      imgTreeData: [
        // {
        //   label: '一级 1',
        //   children: [
        //     {
        //       label: '二级 1-1',
        //       children: [
        //         {
        //           label: '三级 1-1-1',
        //         },
        //       ],
        //     },
        //   ],
        // },
      ],
      imgTreeDataProps: {
        children: 'children',
        label: 'name',
      },
    }
  },
  created() {
    this.projectId = this.$route.query.projectId
    this.currentNodeName = this.$route.query.currentNodeName
    this.getLoanDocumentDirInfo()
  },
  methods: {
    async getLoanDocumentDirInfo() {
      //自行改接扣调用
      let params = {
        loanApplyId: this.projectId,
        fileNamespace: this.$route.query.space,
        releventFlow: this.$route.query.releventFlow,
        releventFlowNode: this.$route.query.releventFlowNode,
      }
      let apiData = await loanApprovalInfoGetApprovalDocumentDir(params)
      let imgArr = []
      imgArr.push(apiData.data)

      this.imgTreeData = imgArr
    },
    async getImgList(data) {
      if(data.children.length === 0) {
        return
      }
      let params = {
        loanApplyId: this.projectId,
        fileNamespace: this.$route.query.space,
        releventFlow: this.$route.query.releventFlow,
        releventFlowNode: this.$route.query.releventFlowNode,
        dirId: data.id,
      }
      let apiData = await loanApprovalInfoGetApprovalDocument(params)
      console.log(apiData.data)
    },
    toUloadFile() {},
  },
}
</script>
<style lang="scss" scoped>
</style>