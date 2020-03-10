<template>
  <div class="tcwxx-edit-page">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex-center w-fit-content">
        <el-form ref="form" :inline="true" :model="form" size="mini" label-width="130px" :rules="rules">
          <el-form-item label="停车位编号：">
            <div class="info-detail">{{form.parkingCode}}</div>
          </el-form-item>
          <el-form-item label="停车位类型：">
            <div class="info-detail">{{form.parkingTypeName}}</div>
          </el-form-item>
          <el-form-item label="车牌号：">
            <div class="info-detail">{{form.carNumber}}</div>
          </el-form-item>
          <el-form-item label="车辆型号：">
            <div class="info-detail">{{form.carTypeName}}</div>
          </el-form-item>
          <el-form-item label="入场时日：">
            <div class="info-detail">{{form.stopStartTime}}</div>
          </el-form-item>
          <el-form-item label="离场时日：">
            <div class="info-detail">{{form.stopEndTime}}</div>
          </el-form-item>
          <el-form-item label="预缴费金额：">
            <div class="info-detail">{{form.stopPrepareMoney}}</div>
          </el-form-item>
          <el-form-item label="停车计费金额：">
            <div class="info-detail">{{form.stopNeedMoney}}</div>
          </el-form-item>
          <el-form-item label="缴费金额：" prop="money">
            <el-input v-model="form.money" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align:right;">
        <el-button v-if="type!=='view'" type="primary" @click="submit">收费通行</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { updateParkingData } from '@/api/tcgl/tcgl-request'
  import qyCascader from '@/components/cascader'
  import search from '@/components/search'

  export default {
    components: { qyCascader, search },
    props: {
      type: String,
      id: String,
      form: Object
    },
    data() {
      return {
        disabled: true,
        typeOptions: {
          '1': '固定车位',
          '2': '标准车位',
          '3': '一般车位',
          '4': '访客车位',
        },
        chargeOption: {
          '1': '是',
          '2': '否'
        },
        rules: {
          money: [
            { required: true, message: '请输入缴费金额', trigger: 'blur' },
            {
              validator(rule, value, callback) {
                let reg = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入正确的金额'))
                }
              }, trigger: 'blur'
            }
          ]
        }
      }
    },
    computed: {},
    created() {
    },
    methods: {
      validateMoney(val) {
        let reg = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/
        if (reg.test(val)) {
          return true
        } else {
          return false
        }
      },
      submit() {
        if (this.validateMoney(this.form.money)) {
          if (this.form.money === 0) {
            this.$message.error('请输入缴费金额')
            return
          } else if (this.form.money > this.form.stopNeedMoney) {
            this.$message.error('缴费金额不得大于计费金额')
            return
          } else {
            this.$refs.form.validate((valid) => {
              if (valid) {
                this.$confirm('确认缴费?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  cancelButtonClass: 'btn-custom-cancel',
                  type: 'warning'
                }).then(() => {
                  this.form.stopPayMoney = this.form.money
                  if (this.form.stopPayMoney < this.form.stopNeedMoney) {
                    this.form.statusCode = '3'
                    this.form.statusName = '部分缴费'
                  } else if (this.form.stopPayMoney = this.form.stopNeedMoney) {
                    this.form.statusCode = '2'
                    this.form.statusName = '全额缴费'
                  }
                  updateParkingData(this.form).then(res => {
                    this.$emit('save')
                  }).catch(err => {
                    this.$message.error(err)
                  })

                })
              }
            })
          }
        }
      }
    }
  }
</script>

<style scoped>
  .info-detail {
    width: 200px;
  }

  .el-input {
    width: 200px;
  }

  .el-select {
    width: 200px;
  }

  .el-autocomplete {
    width: 200px;
  }

  .el-cascader {
    width: 200px;
  }

  .el-switch {
    width: 200px;
  }
</style>

