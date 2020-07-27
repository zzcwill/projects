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
                <el-tree
                  ref="imgTreeDataDom"
                  :data="imgTreeData"
                  :props="imgTreeDataProps"
                  @node-click="getImgList"
                  default-expand-all
                ></el-tree>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="never">
                <el-upload
                  action
                  :before-upload="beforeUpload"
                  :on-change="changeFile"
                  :http-request="uploadFile"
                  :show-file-list="false"
                >
                  <el-button type="primary" :disabled="currentDirId === '' ? true : false">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-card>

              <el-card shadow="never" class="m-t-20">
                <el-upload
                  action
                  :before-upload="beforeUpload"
                  :http-request="uploadFileStream"
                  :show-file-list="false"
                >
                  <el-button>点击上传2</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
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
  uploadNew
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

      //上传图片-base64-start
      currentDirId: '',
      imgCode: 'test',
      //上传图片-base64-end

      //上传图片-文件流上传-start
      streamImg: {
        user: 'zzc',
        file: ''
      }
      //上传图片-文件流上传-end      
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
      this.currentDirId = data.id
      let params = {
        loanApplyId: this.projectId,
        fileNamespace: this.$route.query.space,
        releventFlow: this.$route.query.releventFlow,
        releventFlowNode: this.$route.query.releventFlowNode,
        dirId: this.currentDirId,
      }
      let apiData = await loanApprovalInfoGetApprovalDocument(params)
      // console.log(apiData.data)
    },

    //上传图片-base64-start
    beforeUpload(file) {
      const isPng = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isPng) {
        this.$message.error('上传头像图片只能是 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isPng && isLt2M
    },
    changeFile(file, fileList) {
      let reader = new FileReader()
      reader.onload = () => {  
        this.imgCode = reader.result
      }
      reader.readAsDataURL(file.raw)
    },
    async uploadFile(file) {
      setTimeout(async () => {
        let params = {
          loanApplyId: this.projectId,
          fileNamespace: this.$route.query.space,
          releventFlow: this.$route.query.releventFlow,
          releventFlowNode: this.$route.query.releventFlowNode,
          dirId: this.currentDirId,
          'LoanDocuments[0].fileName': file.file.name,
          'LoanDocuments[0].filePath': this.imgCode
        }
        let apiData = await loanDocumentUploadFileString(params)

        if (apiData) {
          this.$message(apiData.message)
        }        
      },1000)
    },
    //上传图片-base64-end

    //上传图片-文件流上传-start
    async uploadFileStream(file) {
      var formData = new FormData();

      formData.append('file', file.file);
      formData.append('user', 'zzc');
      let apiData = await uploadNew(formData)

      if (apiData) {
        this.$message(apiData.message)
      }
    },
    //上传图片-文件流上传-end  
  },
}
</script>
<style lang="scss" scoped>
</style>