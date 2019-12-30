<template>
  <div>
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex-center w-fit-content">
        <el-form ref="form" size="mini" :model="form" label-width="90px" inline>
          <el-form-item v-if="showFloor" label="所属楼层：">
            <yq-cascader type="park" disabled :value="floorValue"></yq-cascader>
          </el-form-item>
          <br>
          <el-form-item label="平面图上传:">
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
                :disabled="isView"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" append-to-body>
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="!isView" style="text-align: right">
        <el-button size="mini" type="primary" @click="submit">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import yqCascader from '@/components/cascader'
  import { editFloor, infoFloor } from '@/api/yqgl/yqxx'
  import { mapGetters } from 'vuex'
  export default {
    components: { yqCascader },
    props: {
      id: String,
      type: String
    },
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        floorValue: [],
        showFloor: false,
        info: {},
        form: {
          id: this.id,
          floorPlanUrl1: '',
          floorPlanUrl2: '',
          floorPlanUrl3: '',
          floorPlanUrl4: '',
          floorPlanUrl5: ''
        },
        fileList: []
      }
    },
    computed: {
      baseUrl() {
        return process.env.VUE_APP_BASE_API
      },
      isView() {
        return this.type === 'view'
      },
      ...mapGetters(['token'])
    },
    created() {
      this.query()
    },
    methods: {
      removeImg(file, fileList) {
        this.imgFileList(fileList)
      },
      uploadImg(res, file, fileList) {
        file.url = res.data
        this.imgFileList(fileList)
      },
      imgFileList(fileList) {
        if (fileList) {
          for (let i = 0; i < fileList.length; i++) {
            this.form['floorPlanUrl' + (i + 1)] = fileList[i].url
          }
        }
      },
      onExceed(file, fileList) {
        this.$message.error('超出上传数量')
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      query() {
        infoFloor({ id: this.id }).then(res => {
          this.info = res.data
          this.floorValue = [this.info.parkId, this.info.buildingId, this.info.id]
          if (this.info.floorPlanUrl1) {
            this.fileList.push({ url: this.info.floorPlanUrl1 })
          }
          if (this.info.floorPlanUrl2) {
            this.fileList.push({ url: this.info.floorPlanUrl2 })
          }
          if (this.info.floorPlanUrl3) {
            this.fileList.push({ url: this.info.floorPlanUrl3 })
          }
          if (this.info.floorPlanUrl4) {
            this.fileList.push({ url: this.info.floorPlanUrl4 })
          }
          if (this.info.floorPlanUrl5) {
            this.fileList.push({ url: this.info.floorPlanUrl5 })
          }
          this.showFloor = true
        }).catch(err => {
          this.$message.error(err)
        })
      },
      submit() {
        editFloor(this.form).then(res => {
          this.$emit('save')
        }).catch(err => {
          this.$message.error(err)
        })
      }
    }
  }
</script>

<style scoped>

</style>
