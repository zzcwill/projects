<template>
  <div class="clgl-editpage">
    <div class="p-10 bg-white brs-4 def-shadow">
      <br>
      <div class="flex-center w-fit-content">

        <el-form ref="form" :inline="true" :model="form" size="mini" label-width="130px" :rules="rules"
                 :disabled="isView">
          <div class="form-line">
            <el-form-item label="车牌号：" prop="carNumber">
              <el-input v-model="form.carNumber" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="业主类型：" prop="ownerTypeCode">
              <el-select v-model="form.ownerTypeCode">
                <el-option v-for="item of Object.keys(typeOptions)" :key="item" :value="item"
                           :label="typeOptions[item]"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="车辆类型：" v-if="!(isView&&form.carTypeCode===undefined)">
              <el-select v-model="form.carTypeCode">
                <el-option v-for="item of Object.keys(carTypeOptions)" :key="item" :value="item"
                           :label="carTypeOptions[item]"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="车辆颜色：" v-if="!(isView&&form.color===undefined)">
              <el-input v-model="form.color" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="车辆载重：" prop="carLoad">
              <el-input v-model="form.carLoad" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div v-if="!isView" style="text-align:right;">
        <el-button type="primary" @click="submit">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { addCarInfo, queryCarInfoDetail, updateCarInfo } from '@/api/tcgl/tcgl-request'
  import { mapGetters } from 'vuex'

  export default {
    props: {
      type: String,
      id: String
    },
    data() {
      return {
        form: {
          carNumber: '',
          ownerTypeCode: '',
          carTypeCode: '',
          color: '',
          carLoad: '',
          idcardNumber: '',
          companyId: '',
          departmentId: ''
        },
        showSearch: false,
        typeOptions: {
          '0': '个人',
          '1': '企业',
          '2': '部门'
        },
        carTypeOptions: {
          '10': '轿车',
          '11': '电动汽车',
          '20': '货车',
          '30': '客车',
          '40': '挂车',
          '50': '三轮车',
          '60': '电动车',
          '90': '其他车辆'
        },
        rules: { // 必填字段校验
          carNumber: [
            { required: true, message: '请输入车牌号', trigger: 'blur' }
          ],
          ownerTypeCode: [
            { required: true, message: '请选择业主类型', trigger: 'change' }
          ],
          carLoad: [
            { required: true, message: '请输入车辆载重', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters(['userInfo']),
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
      query() {
        let form = { id: this.id }
        queryCarInfoDetail(form).then(res => {
          this.form = res.data
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
              this.form.userId = this.userInfo.userId
              this.form.userName = this.userInfo.userNameCN
              this.form.userPhone = this.userInfo.userPhone
              this.form.idcardNumber = this.userInfo.userId
              this.form.companyId = this.userInfo.companyId
              this.form.companyName = this.userInfo.companyNameCN
              this.form.departmentId = this.userInfo.companyId
              this.form.departmentName = this.userInfo.companyNameCN
              if (this.isEdit) {
                updateCarInfo(this.form).then(res => {
                  this.$emit('save')
                }).catch(err => {
                  this.$message.error(err)
                })
              } else {
                addCarInfo(this.form).then(res => {
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
</style>

