<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="160px" :rules="rules" :disabled="isView">
      <el-form-item label="停车场名称:" prop="depotName">
        <el-input v-model="form.depotName"></el-input>
      </el-form-item>
      <el-form-item label="停车场负责人姓名:" prop="contactName">
        <el-input v-model="form.contactName"></el-input>
      </el-form-item>
      <el-form-item label="负责人手机号:" prop="contactTelephone">
        <el-input v-model="form.contactTelephone"></el-input>
      </el-form-item>
      <el-form-item label="所属园区:" prop="parkId">
        <search type="park" show-name="parkName" :value="form.parkId" @change="changePark"></search>
      </el-form-item>
      <el-form-item label="位置类型:" prop="depotLocationCode">
        <el-select v-model="form.depotLocationCode">
          <el-option
            v-for="item of Object.keys(depotLocationOptions)"
            :key="item"
            :value="item"
            :label="depotLocationOptions[item]"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="停车场类型:" prop="depotTypeCode">
        <el-select v-model="form.depotTypeCode">
          <el-option
            v-for="item of Object.keys(depotTypeOptions)"
            :key="item"
            :value="item"
            :label="depotTypeOptions[item]"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="固定车位数:" prop="parkingNum1">
        <el-input v-model.number="form.parkingNum1"></el-input>
      </el-form-item>
      <el-form-item label="员工车位数:" prop="parkingNum2">
        <el-input v-model.number="form.parkingNum2"></el-input>
      </el-form-item>
      <el-form-item label="临时车位数:" prop="parkingNum3">
        <el-input v-model.number="form.parkingNum3"></el-input>
      </el-form-item>
      <el-form-item label="免费时长:" prop="freeTime">
        <el-input v-model.number="form.freeTime" style="width: 172px"></el-input>
        分钟
      </el-form-item>
      <el-form-item label="免费时长参与计费：" prop="isFreeCharging" style="margin-left: 5px">
        <div style="width: 200px">
          <el-radio v-model="form.isFreeCharging" label="1">参与</el-radio>
          <el-radio v-model="form.isFreeCharging" label="2">不参与</el-radio>
        </div>
      </el-form-item>
      <el-form-item label="是否支持优惠券：" prop="isCoupon" style="margin-left: 5px">
        <div style="width: 200px">
          <el-radio v-model="form.isCoupon" label="1">支持</el-radio>
          <el-radio v-model="form.isCoupon" label="2">不支持</el-radio>
        </div>
      </el-form-item>
      <el-form-item label="计费频次/分钟:" prop="chargingFrequency">
        <el-select v-model="form.chargingFrequency" style="width: 172px">
          <el-option
            v-for="item of Object.keys(frequencyOptions)"
            :key="item"
            :value="item"
            :label="frequencyOptions[item]"
          ></el-option>
        </el-select>
        分钟
      </el-form-item>
      <el-form-item label="计费策略（单价）：" prop="price">
        <el-input v-model="form.price" style="width: 150px"></el-input>
        元<span v-if="form.price!==''&&form.chargingFrequency!=''">{{hourPrice}}</span>
      </el-form-item>
      <br>
      <el-form-item label="超过:" prop="overtimeCharging">
        <el-input v-model.number="form.overtimeCharging" style="width: 100px"></el-input>
        分钟，开始计费
      </el-form-item>
      <el-form-item label="单次封顶价格:" prop="cappingPrice">
        <el-input v-model="form.cappingPrice" style="width: 100px"></el-input>
        元 （0为不限制）
      </el-form-item>
    </el-form>

    <div v-if="!isView" style="text-align: right">
      <el-button type="primary" @click="edit">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { infoDepot, addDepot, editDepot } from '@/api/tcgl/tccgl'
  import search from '@/components/search'
  import yqCascader from '@/components/cascader'

  export default {
    components: { search, yqCascader },
    props: {
      type: String,
      id: String
    },
    data() {
      return {
        // showSearch: false,
        areaValue: [],
        form: {
          depotName: '',
          contactName: '',
          contactTelephone: '',
          depotLocationCode: '',
          depotTypeCode: '',
          parkingNum1: '',
          parkingNum2: '',
          parkingNum3: '',
          priceDown: '',
          priceUp: '',
          priceDuration: '',
          priceDay: '',
          areaId: '',
          parkId: '',
          parkName: '',
          freeTime: '',
          isFreeCharging: '',
          isCoupon: '',
          price: '',
          chargingFrequency: '',
          overtimeCharging: '',
          cappingPrice: ''
        },
        rules: {
          parkId: [
            { required: true, message: '请选择园区', trigger: 'change' }
          ],
          depotName: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          contactName: [
            { required: true, message: '请输入负责人姓名', trigger: 'blur' }
          ],
          contactTelephone: [
            { required: true, message: '请输入负责人手机号', trigger: 'blur' }
          ],
          depotLocationCode: [
            { required: true, message: '请选择位置类型', trigger: 'blur' }
          ],
          depotTypeCode: [
            { required: true, message: '请选择停车场类型', trigger: 'blur' }
          ],
          chargingFrequency: [
            { required: true, message: '请选择计费频次', trigger: 'blur' }
          ],
          parkingNum1: [
            { required: true, message: '请输入固定车位数', trigger: 'blur' },
            { type: 'number', message: '请输入整数', trigger: 'blur' }
          ],
          parkingNum2: [
            { required: true, message: '请输入员工车位数', trigger: 'blur' },
            { type: 'number', message: '请输入整数', trigger: 'blur' }
          ],
          parkingNum3: [
            { required: true, message: '请输入临时车位数', trigger: 'blur' },
            { type: 'number', message: '请输入整数', trigger: 'blur' }
          ],
          overtimeCharging: [
            { required: true, message: '请输入超过计费时间', trigger: 'blur' },
            { type: 'number', message: '请输入整数', trigger: 'blur' }
          ],
          cappingPrice: [
            { required: true, message: '请输入单次封顶价格', trigger: 'blur' },
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
          ],
          isFreeCharging: [{
            required: true, trigger: 'blur', message: '请输入选择是否参与计费'
          }],
          isCoupon: [{
            required: true, trigger: 'blur', message: '请输入选择是否支持优惠券'
          }],
          freeTime: [
            { required: true, message: '请输入免费时长', trigger: 'blur' },
            { type: 'number', message: '请输入整数', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入计费策略', trigger: 'blur' },
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
          ],
          areaId: [
            { required: true, message: '请选择停车场区域', trigger: ['blur', 'change'] }
          ]
        },
        depotLocationOptions: {
          '0': '地面',
          '1': '地下一层',
          '2': '地下二层',
          '3': '地下三层',
        },
        depotTypeOptions: {
          '1': '公共停车场',
          '2': '内部停车场'
        },
        frequencyOptions: {
          '15': '15',
          '30': '30',
          '60': '60'
        }
      }
    },
    computed: {
      isView() {
        return this.type === 'view'
      },
      hourPrice() {
        let reg = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/
        if (reg.test(this.form.price)) {
          let division = 1
          if (this.form.chargingFrequency === '15') {
            division = 4
          } else if (this.form.chargingFrequency === '30') {
            division = 2
          }
          return ' ，每小时' + parseFloat(this.form.price * division).toFixed(2) + '元'
        } else {
          return ''
        }
      }
    },
    created() {
      if (this.type !== 'add') {
        this.query()
      }
    },
    methods: {
      changePark(item) {
        this.form.parkId = item.id
        this.form.parkName = item.parkName
      },
      // changeCascader(value) {
      //   this.form.parkId = value[0].value
      //   this.form.parkName = value[0].label
      //   this.form.buildingId = value[1].value
      //   this.form.buildingName = value[1].label
      //   this.form.floorId = value[2].value
      //   this.form.floorName = value[2].label
      //   this.form.areaId = value[3].value
      //   this.form.areaName = value[3].label
      // },
      query() {
        infoDepot({ id: this.id }).then(res => {
          this.form = res.data
          // this.areaValue = [this.form.parkId, this.form.buildingId, this.form.floorId, this.form.areaId]
          // this.showSearch = true
        }).catch(err => {
          this.$message.error(err)
        })
      },
      edit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$confirm('确认保存?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              cancelButtonClass: 'btn-custom-cancel',
              type: 'warning'
            }).then(() => {
              this.form.depotLocationName = this.depotLocationOptions[this.form.depotLocationCode]
              this.form.depotTypeName = this.depotTypeOptions[this.form.depotTypeCode]
              if (this.type === 'add') {
                addDepot(this.form).then(res => {
                  this.$emit('save')
                })
              } else {
                editDepot(this.form).then(res => {
                  this.$emit('save')
                })
              }
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

  .el-autocomplete {
    width: 200px;
  }

  .el-select {
    width: 200px;
  }

  .el-cascader {
    width: 200px;
  }
</style>
