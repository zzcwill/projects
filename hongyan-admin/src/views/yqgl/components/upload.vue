<template>
  <div>
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
      :disabled="disabled"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    props: {
      id: String,
      type: String,
      value: Array,
      disabled: Boolean
    },
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: []
      }
    },
    computed: {
      baseUrl() {
        return process.env.VUE_APP_BASE_API
      },
      ...mapGetters(['token'])
    },
    created() {
      if (this.value) {
        this.value.forEach(item => {
          this.fileList.push({ url: item })
        })
      }
    },
    methods: {
      removeImg(file, fileList) {
        this.$emit('input', this.imgFileList(fileList))
      },
      uploadImg(res, file, fileList) {
        file.url = res.data
        this.$emit('input', this.imgFileList(fileList))
      },
      imgFileList(fileList) {
        let files = []
        if (fileList) {
          fileList.forEach(item => {
            files.push(item.url)
          })
        }
        return files
      },
      onExceed(file, fileList) {
        this.$message.error('超出上传数量')
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      }
    }
  }
</script>

<style scoped>

</style>
