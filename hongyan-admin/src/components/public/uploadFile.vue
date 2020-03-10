<template>
  <div>
    <el-upload
      v-if="type === 'image'"
      class="AVATAR-uploader"
      action=""
      accept="image/jpeg，image/jpg，/image/png"
      :show-file-list="false"
      :http-request="submitUpload"
      :before-upload="imageUploadBefore"
      :multiple="false"
    >
      <img
        v-if="imageUrl"
        :src="imageUrl"
        class="AVATAR"
      >
      <i
        v-else
        class="el-icon-plus AVATAR-uploader-icon"
      />
    </el-upload>
    <el-upload
      v-if="type === 'file'"
      ref="upload"
      class="upload-demo"
      action="doUpload"
      :limit="1"
      :file-list="fileList"
      :on-remove="removeFile"
      :before-upload="uploadFile"
    >
       <el-button
        slot="trigger"
        size="small"
        type="primary"
        style="margin-right: 20px"
      >上传excel</el-button>
    </el-upload>
  </div>
</template>
<script>
import request from '@/utils/request'
export default {
  name: 'UploadFile',
  props: {
    type: {
      type: String,
      default: "image",
    },
    result: [String, Array],
    defInfo: {
      type: [String, Array],
      default: '',
    },
  },
  data () {
    return {
      imageUrl: '', // 图片地址

      fileList: [], // 文件列表
    };
  },
  watch: {
    defInfo: {
      handler (val) {
        if (this.type === 'image') {
          this.imageUrl = defInfo || '';
        } else if (this.type === 'file') {
          this.fileList = defInfo || [];
        }
      },
      deep: true,
    },
    imageUrl: {
      handler (val) {
        this.$emit('update:result', val);
      },
      deep: true,
      immediate: true,
    },
    fileList: {
      handler (val) {
        this.$emit('update:result', val);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 图片上传校验
    imageUploadBefore (file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    // 手动触发上传图片回调
    submitUpload (val) {
      let file = val.file;
      let param = new FormData();
      param.append('file', file);
      let config = {
        headers:{'Content-Type':'multipart/form-data'},
      }; // 添加请求头
      console.log(param)
      request.post('/api/1.0/common/file/upload/api',{ data: param },config)
        .then(({data})=>{
          if (data.status === 200) {
            this.imageUrl = data.data.filename;
            this.$emit('update:result', this.imageUrl);
          } else {
            throw new Error();
          }
        }).catch(() => {
          this.$message('上传失败');
        });
    },
    // 上传文件
    uploadFile (file) {
      const extension = file.name.split('.')[1] === 'xls';
      const extension2 = file.name.split('.')[1] === 'xlsx';
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!extension && !extension2) {
        this.$message.warning('上传模板只能是 xls、xlsx格式!');
        return;
      }
      if (!isLt5M) {
        this.$message.warning('上传模板大小不能超过 5MB!');
        return;
      }
      setTimeout(() => {
        // 上传逻辑
        if (!file.name) {
          this.$message.warning('请选择要上传的文件！');
          return false;
        }
        let param = new FormData();
        param.append('file', file);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
        this.$axios.post('/api/uploadImg', param, config).then(({data}) => {
          if (data.status != 200) {
            this.$message.error("excel上传失败，请重新上传");
          } else {
            this.fileList = [{ name: file.name, url: data.filename }];
          }
        }).catch((e) => {
          this.$message.error("excel上传失败，请重新上传");
        });

      },500);
      return false; // 返回false不会自动上传
    },

    // 移除文件
    removeFile (file, fileList) {
      this.fileList = this.fileList.filter((item) => item.uid != file.uit);
    },
  },
};
</script>
<style lang="scss">
  .AVATAR-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .AVATAR-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .AVATAR-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .AVATAR {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>