<template>
  <div class="tcwxx-edit-page">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex-center w-fit-content">
        <el-form ref="form" :inline="true" :model="form" size="mini" label-width="130px" :rules="rules"
                 :disabled="isView">
          <div>
            <el-form-item  label="停车场：" prop="depotId">
              <search
                type="depot"
                show-name="depotName"
                :value="form.depotId"
                :disabled="isView"
                @change="changeParkingLot"
              >
              </search>
            </el-form-item>
            <el-form-item  label="区域选择：" prop="areaId">
              <qy-cascader type="parking" :query-data="{type:'area'}" :value="areaValue"
                           @change="changeCascader"></qy-cascader>
            </el-form-item>
            <el-form-item label="停车位编号：" prop="parkingCode">
              <el-input
                v-model="form.parkingCode"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="车位类型：" prop="parkingTypeCode">
              <el-select v-model="form.parkingTypeCode">
                <el-option v-for="item of Object.keys(typeOptions)" :key="item" :value="item"
                           :label="typeOptions[item]"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="停车费价格：" prop="price">
              <el-input v-model="form.price" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="免费时长：" prop="freeTime">
              <el-input v-model.number="form.freeTime" placeholder="请输入（单位：分钟）"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="允许自由停放：" prop="freeStop">
              <div style="width: 200px">
                <el-radio v-model="form.freeStop" label="1">允许</el-radio>
                <el-radio v-model="form.freeStop" label="2">不允许</el-radio>
              </div>
            </el-form-item>
            <el-form-item label="停车导引有无：" :prop="guide" ref="guide">
              <device-cell @detail="haveGuideDetail" type="pilotMachine" showName="terminalNo" valueName="terminalNo"
                           @change="getGuideValue" :value="form.pilotDeviceId" :radio="form.havePilot"></device-cell>
            </el-form-item>
            <el-form-item label="地锁有无：" :prop="lock" ref="lock">
              <device-cell @detail="haveLockDetail" type="lockMachine" showName="terminalNo" valueName="terminalNo"
                           @change="getLockValue" :value="form.lockDeviceId" :radio="form.haveLock"></device-cell>
            </el-form-item>
            <el-form-item label="充电桩有无：" :prop="charging" ref="charging">
              <device-cell @detail="haveChargingDetail" type="chargingMachine" showName="terminalNo"
                           valueName="terminalNo"
                           @change="getChargingValue" :value="form.chargeDeviceId"
                           :radio="form.haveCharge"></device-cell>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div style="text-align:right;" v-if="!isView">
        <el-button type="primary" @click="submit">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { addParking, queryParkingDetail, updateParking } from '@/api/tcgl/tcgl-request'
  import qyCascader from '@/components/cascader'
  import search from '@/components/search'
  import deviceCell from './component/device-cell'

  export default {
    components: { qyCascader, search, deviceCell },
    props: {
      type: String,
      form: Object,
      areaValue: Array
    },
    data() {
      return {
        guide: 'pilotDeviceId',
        lock: 'lockDeviceId',
        charging: 'chargeDeviceId',
        showSearch: false,
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
          chargeDeviceId: [{ required: true, message: '请选择设备编号', trigger: 'change' }],
          lockDeviceId: [{ required: true, message: '请选择设备编号', trigger: 'change' }],
          pilotDeviceId: [{ required: true, message: '请选择设备编号', trigger: 'change' }],
          freeStop: [{
            required: true, trigger: 'blur'
          }],
          parkingCode: [
            { required: true, message: '请输入停车位编号', trigger: 'change' }
          ],
          parkingTypeCode: [
            { required: true, message: '请选择车位类型', trigger: 'change' }
          ],
          depotId: [
            { required: true, message: '请选择所属停车场', trigger: 'change' }
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
          freeTime: [
            { required: true, message: '请输入免费时长', trigger: 'blur' },
            { type: 'number', message: '请输入数字', trigger: 'blur' }
          ],
          areaId: [
            { required: true, message: '请选择区域', trigger: 'change' }
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
      changeParkingLot(item) {
        this.form.depotId = item.id
        this.form.depotName = item.depotName
      },
      getGuideValue(val) {
        this.form.pilotDeviceId = val.terminalNo
        this.form.pilotDeviceModel = val.terminalName
      },
      getLockValue(val) {
        this.form.lockDeviceId = val.terminalNo
        this.form.lockDeviceModel = val.terminalName
      },
      getChargingValue(val) {
        this.form.chargeDeviceId = val.terminalNo
        this.form.chargeDeviceModel = val.terminalName
      },
      haveChargingDetail(val) {
        if (val === 'Y') {
          this.charging = 'chargeDeviceId'
          this.form.haveCharge = '1'
        } else {
          this.form.haveCharge = '2'
          this.charging = val
        }
        this.$refs.charging.clearValidate()
      },
      haveLockDetail(val) {
        if (val === 'Y') {
          this.lock = 'lockDeviceId'
          this.form.haveLock = '1'
        } else {
          this.form.haveLock = '2'
          this.lock = val
        }
        this.$refs.lock.clearValidate()
      },
      haveGuideDetail(val) {
        if (val === 'Y') {
          this.guide = 'pilotDeviceId'
          this.form.havePilot = '1'
        } else {
          this.form.havePilot = '2'
          this.guide = val
        }
        this.$refs.guide.clearValidate()
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

  .el-cascader {
    width: 200px;
  }

  .el-switch {
    width: 200px;
  }
</style>

