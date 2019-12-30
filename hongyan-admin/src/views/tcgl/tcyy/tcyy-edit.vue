<template>
  <div class="tcyy-edit-page">
    <div class="p-10 bg-white brs-4 def-shadow">
      <br>
      <div class="flex-center w-fit-content">

        <el-form ref="form" inline :model="form" size="mini" label-width="130px" :rules="rules" :disabled="isView">
          <div class="form-line">
            <el-form-item v-if="showSearch || type==='add'" label="停车位：" prop="parkingCode">
              <search type="parking" show-name="parkingCode" value-name="parkingCode" :value="form.parkingCode"
                      @change="changeParking"></search>
            </el-form-item>
            <el-form-item v-if="showSearch || type==='add'" label="车牌：" prop="carNumber">
              <search type="car" show-name="carNumber" :value="form.carId" @change="changeCar"></search>
            </el-form-item>
            <el-form-item prop="dateTimeArea" label="预约时间段：">
              <el-date-picker
                v-model="form.dateTimeArea"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                format="yyyy-MM-dd HH:mm:ss"
                align="left"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div v-if="!isView" style="text-align:right">
        <el-button type="primary" @click="submit">保存</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  import { addCarAppointment, queryAppointmentDetail, updateAppointment } from '@/api/tcgl/tcgl-request'
  import search from '@/components/search'

  export default {
    components: { search },
    props: {
      id: String,
      type: String
    },
    data() {
      return {
        form: {
          parkingCode: '',
          carNumber: '',
          orderStartTime: '',
          orderEndTime: '',
          dateTimeArea: []
        },
        showSearch: false,
        rules: { // 必填字段校验
          carNumber: [
            { required: true, message: '请选择车辆', trigger: 'change' }
          ],
          parkingCode: [
            { required: true, message: '请选择车位', trigger: 'change' }
          ],
          dateTimeArea: [
            { required: true, message: '请选择预约时间段', trigger: 'blur' }
          ]
        },
        pickerOptions: {
          disabledDate: (time) => {
            return time.getTime() < new Date(new Date().toLocaleDateString()).getTime()
          }
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
      changeParking(item) {
        this.form.parkingCode = item.parkingCode
        this.form.parkingTypeCode = item.parkingTypeCode
        this.form.parkingTypeName = item.parkingTypeName
        this.form.parkId = item.parkId
        this.form.parkingId = item.id
        this.form.parkName = item.parkName
      },
      changeCar(item) {
        this.form.carNumber = item.carNumber
        this.form.carId = item.id

        this.form.typeCode = item.typeCode
        this.form.typeName = item.typeName
        this.form.carTypeCode = item.carTypeCode
        this.form.carTypeName = item.carTypeName
        this.form.color = item.color
        this.form.carLoad = item.carLoad
        this.form.userId = item.userId
        this.form.userName = item.userName
        this.form.userPhone = item.userPhone
        this.form.idcardNumber = item.idcardNumber
        this.form.companyId = item.companyId
        this.form.companyName = item.companyName
        this.form.departmentId = item.departmentId
        this.form.departmentName = item.departmentName
      },
      query() {
        let form = { id: this.id }
        queryAppointmentDetail(form).then(res => {
          this.form = res.data
          this.form.dateTimeArea = [this.form.orderStartTime, this.form.orderEndTime]
          this.showSearch = true
        }).catch(err => {
          this.$message.error(err)
        })
      },
      submit() {
        // 数据完整性校验
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$confirm('确认保存?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              cancelButtonClass: 'btn-custom-cancel',
              type: 'warning'
            }).then(() => {
              // 将时间段分开
              this.form.orderStartTime = this.form.dateTimeArea[0]
              this.form.orderEndTime = this.form.dateTimeArea[1]
              if (this.isEdit) {
                updateAppointment(this.form).then(res => {
                  this.$emit('save')
                }).catch(err => {
                  this.$message.error(err)
                })
              } else {
                addCarAppointment(this.form).then(res => {
                  this.$emit('save')
                }).catch(err => {
                  this.$message.error(err)
                })
              }
            }).catch(() => {
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .el-input {
    width: 360px;
  }

  .el-date-editor {
    width: 360px;
  }

  .el-textarea {
    width: 360px;
  }

  .el-autocomplete {
    width: 360px;
  }
</style>

