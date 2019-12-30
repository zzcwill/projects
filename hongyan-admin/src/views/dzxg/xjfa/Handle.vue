<template>
  <el-dialog
    :title="info.type === 'add' ? '添加巡检方案' : '编辑巡检方案'"
    :visible="info.visible"
    custom-class="default-dialog-style"
    width="1000px"
    :close-on-click-modal="false"
    @update:visible="close"
    @open="open"
  >
    <div class="dialog-container">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="方案名称：" prop="patrolPlanName">
          <el-input v-model.trim="ruleForm.patrolPlanName"></el-input>
        </el-form-item>
        <el-form-item label="是否生效：" prop="isEffect">
          <el-radio-group v-model="ruleForm.isEffect">
            <el-radio v-for="(item, index) in $store.state.reflex.isEffect" :key="index" :label="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="试用日期：" prop="days">
          <el-checkbox-group v-model="ruleForm.days">
            <el-checkbox v-for="(item, index) in $store.state.reflex.weeks" :key="index + 10000" :label="item.value">{{ item.label }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="巡检时间：" prop="date">
          <el-date-picker
            v-model="ruleForm.date"
            type="datetimerange"
            class="w-100-imp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="巡检周期：" prop="patrolCycle">
          <el-input v-model="ruleForm.patrolCycle" type="number" placeholder="请输入">
            <el-select slot="append" v-model="ruleForm.patrolCycleUnitCode" placeholder="请选择周期单位">
              <el-option v-for="(item, index) in $store.state.reflex.timeUnit" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="单次巡检时长：" prop="patrolDuration">
          <el-input v-model="ruleForm.patrolDuration" type="number" placeholder="请输入">
            <span slot="append">分钟</span>
          </el-input>
        </el-form-item>
        <el-form-item label="巡检点：" prop="planDetailJson">
          <PlantSelect :result.sync="ruleForm.planDetailJson" />
        </el-form-item>
        <el-form-item label="巡检负责人：" prop="principalId">
          <ProtalPeople :id.sync="ruleForm.principalId" :name.sync="ruleForm.principalName" placeholder="请选择巡检负责人" />
        </el-form-item>
        <el-form-item label="巡检人员：" prop="personalJson">
          <div>
            <div v-for="(item, index) in ruleForm.personalJson" :key="index" class="flex p-b-10">
              <el-select slot="append" v-model="item.typeCode" placeholder="请选择周期单位">
                <el-option v-for="(ele, eq) in $store.state.reflex.patrolCycleType" :key="eq + '1000'" :label="ele.label" :value="ele.value" />
              </el-select>
              <ProtalPeople :id.sync="item.principalId" class="m-l-10 m-r-10" :name.sync="item.principalName" />
              <el-input v-model="item.typeName" size="small" placeholder="请输入人员说明" />
              <el-button v-if="ruleForm.personalJson.length != 1" class="m-l-10" type="danger" @click="delPatrol(index)">删除巡检人员</el-button>
            </div>
            <el-button size="small" type="primary" icon="el-icon-plus" class="m-l-0" @click="addPatrol">添加巡检人员</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" @click="close">取 消</el-button>
      <el-button size="medium" type="primary" @click="sure">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import ProtalPeople from './protalPeople.vue'
import PlantSelect from './plantSelect.vue'
import { apiXJFACus } from '@/api/dzxg/xjfa.js'
export default {
  name: 'XjfaHandle',
  components: {
    ProtalPeople, PlantSelect,
  },
  model: {
    prop: 'info',
    event: 'update',
  },
  props: {
    info: {
      type: Object,
      default: () => ({ visible: false, data: {}})
    }
  },
  data() {
    return {
      ruleForm: this.$options.formObject(),
      rules: {
        patrolPlanName: [{ required: true, message: '请输入方案名称' }],
        isEffect: [{ required: true }],
        days: [{ required: true, message: '请选择试用日期' }],
        date: [{ required: true, message: '请选择巡检时间' }],
        patrolCycle: [{ required: true, validator: (rule, value, cb) => {
          !this.ruleForm.patrolCycle && cb(new Error('请输入巡检周期'))
          !this.ruleForm.patrolCycleUnitCode && cb(new Error('请选择巡检周期单位'))
          this.ruleForm.patrolCycle && this.ruleForm.patrolCycleUnitCode && cb()
        } }],
        patrolDuration: [{ required: true, message: '请输入单次巡检时长' }],
        planDetailJson: [{ required: true, message: '请选择巡检点' }],
        principalId: [{ required: true, message: '请选择巡检负责人' }],
        personalJson: [{ required: true, validator: (rule, value, cb) => {
          let is = value.every(item => {
            return !!item.typeCode && !!item.principalId && !!item.principalName
          })
          if (!is) {
            cb(new Error('请选择巡检人员信息'))
          }
          cb()
        } }]
      },
      btnLoading: false,
    }
  },
  computed: {
    isEdit() {
      return (this.info || {}).type === 'edit'
    },
  },
  mounted() {
  },
  methods: {
    close() {
      this.ruleForm = this.$options.formObject()
      this.$refs.ruleForm && this.$refs.ruleForm.resetFields()
      let obj = this._.cloneDeep(this.info)
      obj.visible = false
      this.$emit('update', obj)
    },
    sure() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.btnLoading = true
          let obj = this._.cloneDeep(this.ruleForm)
          let params = {
            ...obj,
            startTime: this.moment(obj.date[0]).format('YYYY-MM-DD HH:mm'),
            endTime: this.moment(obj.date[1]).format('YYYY-MM-DD HH:mm'),
            days: obj.days.join(''),
            planDetailJson: JSON.stringify(obj.planDetailJson),
            personalJson: JSON.stringify(obj.personalJson),
          }
          delete params.date
          delete params.planDetailDtos
          delete params.personalDtos
          apiXJFACus(params, this.isEdit ? 'update' : 'save').then((data) => {
            this.btnLoading = false
            if (data.code === 0) {
              this.$message.success('操作成功')
              this.$emit('reflash')
              this.close()
            } else {
              throw new Error()
            }
          }).catch(() => {
            this.$message.error('操作失败')
            this.btnLoading = false
          })
        }
      })
    },
    open() {
      this.$refs.ruleForm && this.$refs.ruleForm.clearValidate()
      if (this.info.type === 'edit') {
        let data = this.info.data
        this.ruleForm = {
          ...(this.$options.formObject()),
          ...data,
          date: [data.startTime, data.endTime],
          days: data.days.split(''),
          planDetailJson: data.planDetailDtos,
          personalJson: data.personalDtos,
        }
      }
    },
    // 添加巡检点
    addPatrol() {
      this.ruleForm.personalJson.push({
        typeCode: '',
        principalId: '',
        principalName: '',
        typeName: ''
      })
    },
    // 删除巡检点
    delPatrol(eq) {
      this.ruleForm.personalJson = this.ruleForm.personalJson.filter((_, index) => index !== eq)
    }
  },
  // 表单数据
  formObject() {
    return {
      patrolPlanName: '',
      isEffect: '1',
      days: ['1'],
      startTime: '', // 巡检开始时间
      endTime: '', // 巡检结束时间
      date: [],
      patrolCycle: '', // 巡检周期数值
      patrolCycleUnitCode: '', // 巡检周期单位编码
      patrolDuration: '', // 单次巡检时长
      planDetailJson: [], // 巡检点选择
      principalName: '', // 巡检人姓名
      principalId: '', // 巡检人id
      personalJson: [{
        typeCode: '',
        principalId: '',
        principalName: '',
        typeName: ''
      }], // 巡检人员
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog-container {
  & /deep/ .el-input-group__append {
    width: 140px !important;
  }
}
</style>
