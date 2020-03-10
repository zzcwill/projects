<template>
  <div>
    <div class="p-10 bg-white brs-4 def-shadow">
      <br>
      <div class="flex-center w-fit-content">
        <el-form
          ref="form"
          :inline="true"
          :model="form"
          :rules="rules"
          size="mini"
          label-width="130px"
        >
          <el-form-item label="园区名称:" prop="parkName">
            <el-input v-model="form.parkName" :disabled="isView"></el-input>
          </el-form-item>
          <el-form-item label="选择地址:">
            <el-button
              type="text"
              :disabled="false"
              @click="addrDialogVisible = true"
              style="width: 178px; text-align: left;">查看地址
            </el-button>
          </el-form-item>
          <el-form-item label="详细地址:" prop="parkAddrress">
            <el-input v-model="form.parkAddrress" :disabled="isView"></el-input>
          </el-form-item>
          <el-form-item label="园区地址:" prop="addr">
            <el-input v-model="form.addr" disabled></el-input>
          </el-form-item>
          <el-form-item label="园区联系人:" prop="contactName">
            <el-input v-model="form.contactName" :disabled="isView"></el-input>
          </el-form-item>
          <el-form-item label="园区联系人电话:" prop="contactTelephone">
            <el-input v-model="form.contactTelephone" :disabled="isView"></el-input>
          </el-form-item>

          <br>
          <el-form-item v-if="showSearch || type==='add'" label="平面图上传:" prop="fileList">
            <img-upload v-model="form.fileList" :disabled="isView"></img-upload>
          </el-form-item>
        </el-form>
      </div>

      <el-dialog
        title="选择地址"
        :visible.sync="addrDialogVisible"
        width="60%"
        append-to-body
      >
        <div style="width: 100%">
          <baidu-map :value="form.point" @change="changeAddr"></baidu-map>
          <div style="text-align: center;margin-top: 20px;">
            <el-button size="mini" type="primary" @click="addrDialogVisible = false">确定</el-button>
          </div>
        </div>
      </el-dialog>

      <div v-if="!isView" style="text-align:right;padding-top: 20px;">
        <el-button type="primary" @click="submit">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import BaiduMap from '@/components/BaiduMap'
  import { addPark, getPark, editPark } from '@/api/yqgl/yqxx'
  import imgUpload from '../components/upload'
  export default {
    components: { BaiduMap,imgUpload },
    props: {
      type: String,
      id: String
    },
    data() {
      return {
        addrDialogVisible: false,
        showSearch: false,
        form: {
          point: '',
          parkName: '',
          parkProvince: '',
          parkCity: '',
          parkArea: '',
          addr: '',
          parkAddrress: '',
          parkLongitude: '',
          parkLatitude: '',
          contactName: '',
          contactTelephone: '',
          fileList: []
        },
        rules: {
          parkName: [
            { required: true, message: '请输名称', trigger: 'blur' }
          ],
          addr: [
            { required: true, message: '请选择地址', trigger: 'blur' }
          ],
          contactName: [
            { required: true, message: '请输入园区联系人姓名', trigger: 'blur' }
          ],
          parkAddrress: [
            { required: true, message: '请输入详细地址', trigger: 'blur' }
          ],
          contactTelephone: [
            { required: true, message: '请输入联系人电话', trigger: 'blur' }
          ],
          categoryId: [
            { required: true, message: '请选择类目', trigger: 'blur' }
          ],
          fileList: [
            { required: false, message: '请上传平面图', trigger: ['blur', 'change'] }
          ]
        }
      }
    },
    computed: {
      isView() {
        return this.type === 'view'
      },
      isEdit() {
        return this.type === 'edit'
      }
    },
    created() {
      if (this.type !== 'add') {
        this.query()
      }
    },
    methods: {
      setImg() {
        this.form.fileList = []
        for (let key in this.form) {
          if (key.indexOf('parkPlanUrl') !== -1 && this.form[key]) {
            this.form.fileList.push(this.form[key])
          }
        }
      },
      getImg() {
        if (this.form.fileList) {
          let i = 1
          this.form.fileList.forEach(item => {
            this.form['parkPlanUrl' + i] = item
            i++
          })
        }
      },
      query() {
        let param = { id: this.id }
        getPark(param).then(res => {
          this.form = res.data
          this.form.addr = `${this.form.parkProvince}/${this.form.parkCity}/${this.form.parkArea}`
          this.form.point = { lng: this.form.parkLongitude, lat: this.form.parkLatitude }
          this.setImg()
          this.showSearch = true
        })
      },
      changeAddr(addr, point) {
        this.form.parkProvince = addr.province
        this.form.parkCity = addr.city
        this.form.parkArea = addr.district
        this.form.parkAddrress = addr.street + addr.streetNumber
        this.form.addr = `${this.form.parkProvince}/${this.form.parkCity}/${this.form.parkArea}`
        this.form.parkLongitude = point.lng
        this.form.parkLatitude = point.lat
      },
      submit() {
        console.log(this.type)
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.getImg()
            if (this.isEdit) {
              editPark(this.form).then(res => {
                this.$emit('save')
              })
            } else {
              addPark(this.form).then(res => {
                this.$emit('save')
              })
            }
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    height: 30px;
    width: 90px;
  }

</style>
