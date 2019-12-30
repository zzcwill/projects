<template>
  <div class="tcwxx-edit-page">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex-center w-fit-content">
        <el-form ref="form" :inline="true" :model="form" size="mini" label-width="130px" :rules="rules" :disabled="isView">
          <el-form-item label="停车位编号：" prop="parkingCode">
            <el-input
              v-model="form.parkingCode"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="车位类型：" prop="parkingTypeCode">
            <el-select v-model="form.parkingTypeCode">
              <el-option v-for="item of Object.keys(typeOptions)" :key="item" :value="item" :label="typeOptions[item]"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否支持充电：" prop="isCharge">
            <el-switch v-model="form.isCharge" active-value="1" inactive-value="2"></el-switch>
          </el-form-item>
          <el-form-item v-if="showSearch || type==='add'" label="所在区域：" prop="areaId">
            <qy-cascader
              type="parking"
              :query-data="{type:'area'}"
              :value="areaValue"
              @change="changeCascader"
            ></qy-cascader>
          </el-form-item>
          <el-form-item label="停车费价格：" prop="price">
            <el-input v-model="form.price" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="最小计算时长：" prop="priceDuration">
            <el-input v-model.number="form.priceDuration" placeholder="请输入（单位：分钟）"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align:right;">
        <el-button v-if="type!=='view'" type="primary" @click="submit">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { addParking, queryParkingDetail, updateParking } from '@/api/tcgl/tcgl-request'
  import qyCascader from '@/components/cascader'

  export default {
    components: { qyCascader },
    props: {
      type: String,
      id: String
    },
    data() {
      return {
        form: {
          isCharge: '2',
          parkingCode: '',
          parkingTypeCode: '',
          parkingTypeName: '',
          areaId: '',
          price: '',
          priceDuration: ''
        },
        areaValue: [],
        showSearch: false,
        typeOptions: {
          '1': '小',
          '2': '中',
          '3': '大',
        },
        chargeOption: {
          '1': '是',
          '2': '否'
        },
        rules: {
          parkingCode: [
            { required: true, message: '请输入停车位编号', trigger: 'blur' }
          ],
          parkingTypeCode: [
            { required: true, message: '请选择车位类型', trigger: 'blur' }
          ],
          areaId: [
            { required: true, message: '请输入所在区域', trigger: 'charge' }
          ],
          isCharge: [
            { required: true, message: '请选择是否支持充电', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入停车费价格', trigger: 'blur' },
            {
              validator(rule, value, callback) {
                let reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入正确的金额'))
                }
              }, trigger: 'blur'
            }
          ],
          priceDuration: [
            { required: true, message: '请输入最小计算时长', trigger: 'blur' },
            { type: 'number', message: '请输入数字', trigger: 'blur' }
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
      changeCascader(value) {
        this.form.parkId = value[0].value
        this.form.parkName = value[0].label
        this.form.floorId = value[1].value
        this.form.floorName = value[1].label
        this.form.areaId = value[2].value
        this.form.areaName = value[2].label
      },
      query() {
        let form = { id: this.id }
        queryParkingDetail(form).then(res => {
          this.form = res.data
          this.areaValue = [this.form.parkId, this.form.floorId, this.form.areaId]
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
              this.form.parkingTypeName = this.typeOptions[this.form.parkingTypeCode]
              console.log(this.form)
              if (this.isEdit) {
                updateParking(this.form).then(res => {
                  this.$emit('save')
                }).catch(err => {
                  this.$message.error(err)
                })
              } else {
                addParking(this.form).then(res => {
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
  .el-cascader{
    width: 200px;
  }
  .el-switch{
    width: 200px;
  }
</style>

