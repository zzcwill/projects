<template>
  <el-dialog
    :title="info.type === 'add' ? '添加公告' : '编辑公告'"
    :visible="info.visible"
    custom-class="default-dialog-style"
    width="1000px"
    :close-on-click-modal="false"
    @update:visible="close"
    @open="open"
  >
    <div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="公告类别：" prop="categoryId">
          <el-select v-model="ruleForm.categoryId" class="w-100" placeholder="请选择" style="width: 200px;">
            <el-option
              v-for="item in $store.state.reflex.typeCode"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="发布状态：" prop="publishedStatesCode">
          <el-radio-group v-model="ruleForm.publishedStatesCode">
            <el-radio
              v-for="(item, index) in $store.state.reflex.publishCode"
              :key="index"
              :label="item.value"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内容分类：" prop="typeCode">
          <div class="w-100">
            <el-select v-model="ruleForm.typeCode" class="w-100" placeholder="请选择内容分类" style="width: 200px;">
              <el-option
                v-for="(item, index) in $store.state.reflex.contentType"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="内容标题：" prop="title">
          <div class="w-100">
            <el-input v-model.trim="ruleForm.title" style="width: 600px;"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="预览图片：">
          <div class="flex flex-a-start">
            <el-upload
              :action="baseUrl + '/api/1.0/common/file/upload/api'"
              :headers="{'token': token}"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="removeImg"
              :on-success="uploadImg"
              name="upfile"
              :limit="1"
              :file-list="fileList"
              :on-exceed="onExceed"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body>
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </el-form-item>
        <el-form-item label="上传附件：">
          <el-upload
            ref="upload"
            class="upload-demo"
            :action="baseUrl + '/api/1.0/common/file/upload/api'"
            :headers="{'token': token}"
            :on-remove="removeAttachmentFile"
            :on-success="uploadAttachmentFile"
            :file-list="attachmentList"
            name="upfile"
            :limit="5"
            :on-exceed="onExceed"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="公告内容：" prop="content">
          <Editor :content.sync="ruleForm.content" />
          <!-- <el-input v-model.trim="ruleForm.content" type="textarea" rows="8" style="width: 600px;"></el-input> -->
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" @click="close">取 消</el-button>
      <el-button size="medium" type="primary" :loading="btnLoading" @click="sure">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiWYTG } from '@/api/zhfw/wytg.js'
import { mapGetters } from 'vuex'
import Editor from './editor.vue'

export default {
  name: 'ZhfwWytgHandle',
  components: {
    Editor
  },
  model: {
    prop: 'info',
    event: 'update',
  },
  props: {
    info: {
      type: Object,
      default: () => ({ visible: false })
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: '',
      btnLoading: false,
      ruleForm: this.$options.formObject(),
      fileList: [], // 文件
      attachmentList: [],
      rules: {
        title: [
          { required: true, message: '请输入内容标题', trigger: 'change' }
        ],
        categoryId: [
          { required: true, message: '请选择公告类别', trigger: 'change' }
        ],
        typeCode: [
          { required: true, message: '请选择内容类别', trigger: 'change' }
        ],
        publishedStatesCode: [
          { required: true, message: '请选择发布状态', trigger: 'change' }
        ],
        linkSrc: [
          { required: true, message: '请输入链接地址', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入公告内容', trigger: 'blur' }
        ]
      },
      imageUrl: '', // 预览图片地址
    }
  },
  computed: {
    baseUrl() {
      return process.env.VUE_APP_BASE_API
    },
    isEdit() {
      return (this.info || {}).type === 'edit'
    },
    ...mapGetters(['token'])
  },
  methods: {
    // 预览图片上传
    removeImg(file, fileList) {
      this.imgFileList(fileList)
    },
    uploadImg(res, file, fileList) {
      file.url = res.data
      this.imgFileList(fileList)
    },
    imgFileList(fileList) {
      if (fileList.length > 0) {
        this.ruleForm['lookPicUrl'] = fileList[0].url
      } else {
        this.ruleForm['lookPicUrl'] = ''
      }
    },
    // 附件上传
    removeAttachmentFile(file, fileList) {
      this.attachmentFileList(fileList)
    },
    uploadAttachmentFile(res, file, fileList) {
      file.url = res.data
      this.attachmentFileList(fileList)
    },
    attachmentFileList(fileList) {
      if (fileList.length > 0) {
        // for (let i = 0; i < fileList.length; i++) {
        //     this.form['attachmentFiles' + (i + 1)] = fileList[i].url
        // }
        this.ruleForm['attachmentFiles'] = fileList[0].url
      } else {
        this.ruleForm['attachmentFiles'] = ''
      }
    },
    // 上传数量超出限制后的统一处理,两个组件共用
    onExceed(file, fileList) {
        this.$message.error('超出上传数量')
    },
    // 关闭按钮
    close() {
      this.fileList = []
      this.attachmentList = []
      this.ruleForm = this.$options.formObject()
      this.$refs.ruleForm && this.$refs.ruleForm.resetFields()
      let obj = this._.cloneDeep(this.info)
      obj.visible = false
      this.$emit('update', obj)
    },
    // 打开初始化
    open() {
      this.$refs.ruleForm && this.$refs.ruleForm.clearValidate()
      if (this.info.type === 'edit') {
        let data = this.info.data
        if (data.lookPicUrl) {
          this.fileList = [{ url: data.lookPicUrl }]
        } else {
          this.fileList = []
        }
        if (data.attachmentFiles) {
          this.attachmentList = [{ url: data.attachmentFiles }]
        } else {
          this.attachmentList = []
        }
        this.ruleForm = {
          ...(this.$options.formObject()),
          ...data,
        }
      }
    },
    // 确定保存
    sure() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.btnLoading = true
          apiWYTG(this.ruleForm, this.isEdit ? 'modify' : 'append').then((data) => {
            this.btnLoading = false
            if (data.code === 0) {
              this.$message.success('操作成功')
              this.$emit('reflash')
              this.close()
            } else {
              throw new Error()
            }
          }).catch(() => {
            this.$message.error('操作失败')
            this.btnLoading = false
          })
        }
      })
    },
    // 预览图片
    handlePictureCardPreview(file) {
      this.imageUrl = file.url
    },
  },
  formObject() {
    return {
      categoryId: '', // 公告类别id
      categoryName: '',
      title: '', // 内容标题
      typeCode: '',
      typeName: '',
      lookPicUrl: '',
      attachmentFiles: '',
      content: '',
      publishedStatesCode: '1',
      publishedStatesName: '',
      isWebHome: '1'
    }
  }
}
</script>
<style>
.avatar-uploader-wytg .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader-wytg .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon-wytg {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar-wytg {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
