<template>
  <el-dialog
    :title="info.type === 'add' ? '添加费项' : '编辑费项'"
    :visible="info.visible"
    custom-class="default-dialog-style"    
    width="1000px"
    @update:visible="close"
    @open="open"
  >
    <div class="dialog-container">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="费项名称：" prop="itemName">
          <el-input v-model.trim="ruleForm.itemName"></el-input>
        </el-form-item>
        <el-form-item label="收费方式：" prop="feeTypeCode">
          <el-select v-model="ruleForm.feeTypeCode" placeholder="请选择收费方式" class="w-100">
            <el-option v-for="(item,index) in $store.state.reflex.feeType" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="ruleForm.stepPrice">
            <el-radio v-for="(item, index) in $store.state.reflex.is" :key="index" :label="item.value">{{ item.value == '1' ? '按单价计费' : '按阶梯计费' }}</el-radio>
          </el-radio-group>
        </el-form-item>
       
        <el-form-item v-show="ruleForm.stepPrice == 1" label="单位单价：" prop="unitPrice">
          <el-input v-model.number="ruleForm.unitPrice"></el-input>
        </el-form-item>

        <el-form-item v-show="ruleForm.stepPrice != 1" label="阶梯价格：" prop="stepPriceDesc">
          <div class="price-item">
            <div v-for="(item, index) in ruleForm.stepPriceDesc" :key="index" :class="[(index != 0 || (index + 1) != ruleForm.stepPriceDesc.length) ? 'm-b-10' : '', item.active ? 'err-input' : '']">
              <el-input-number v-model="item.minNum" controls-position="right" :min="0" />
              <span>~</span>
              <el-input-number v-model="item.maxNum" controls-position="right" :min="0" />
              <el-input-number v-model="item.unitPrice" controls-position="right" :min="0" />
              <span>元</span>
              <el-button v-if="index === 0" type="primary" @click="addPrice">添加阶梯</el-button>
              <el-button v-else type="danger" @click="removeStepPrice(index)">删除</el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" @click="close">取 消</el-button>
      <el-button size="medium" type="primary" :loading="btnLoading" @click="sure">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiSFXM } from '@/api/cwgl/sfxm.js'
export default {
  name: 'SfxmHandle',
  model: {
    prop: 'info',
    event: 'update',
  },
  props: {
    info: {
      type: Object,
      default: () => ({ visible: false })
    }
  },
  data() {
    return {
      btnLoading: false,
      ruleForm: this.$options.formObject(),
      rules: {
        itemName: [
          { required: true, message: '请输入费项名称', trigger: 'blur' },
        ],
        feeTypeCode: [
          { required: true, message: '请选择收费方式', trigger: 'change' },
        ],
        unitPrice: [{
          validator: this.validateUnitPrice, trigger: 'blur'
        }],
        stepPriceDesc: [{
          validator: this.validateStepPrice, trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    // 关闭按钮
    close() {
      this.$refs.ruleForm && this.$refs.ruleForm.resetFields()
      let obj = this._.cloneDeep(this.info)
      obj.visible = false
      this.$emit('update', obj)
    },
    // 打开初始化
    open() {
      this.$refs.ruleForm && this.$refs.ruleForm.clearValidate()
      if (this.info.type === 'edit') {
        let data = this.info.data
        this.ruleForm = {
          ...(this.$options.formObject()),
          ...data,
          stepPriceDesc: JSON.parse(data.stepPriceDesc),
        }
      }
    },
    // 确定保存
    sure(formName) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let obj = this._.cloneDeep(this.ruleForm)
          let params = {
            ...obj,
            stepPriceDesc: JSON.stringify(obj.stepPriceDesc)
          }
          this.btnLoading = true
          apiSFXM(params, this.info.type === 'edit' ? 'modify' : 'append').then((data) => {
            this.btnLoading = false
            if (data.code === 0) {
              this.close()
              this.$message.success('操作成功')
              this.$emit('reflash')
            } else {
              throw new Error()
            }
          }).catch(() => {
            this.btnLoading = false
            this.$message.success('操作失败')
          })
        }
      })
    },
    // 校验单位价格
    validateUnitPrice(rule, value, cb) {
      if (this.ruleForm.stepPrice === '1' && !this.ruleForm.unitPrice) {
        cb(new Error('请输入单位单价'))
      } else {
        cb()
      }
    },
    // 校验阶梯加个
    validateStepPrice(rule, value, cb) {
      if (this.ruleForm.stepPrice === '2') {
        // 阶梯加个的逻辑校验在这里
        let arr = this._.cloneDeep(value)
        let obj = this._.cloneDeep(this.ruleForm)
        let success = true
        arr.map((item, index) => {
          if (!item.minNum || !item.maxNum || !item.unitPrice) {
            item.active = true
            success = false
          } else {
            item.active = false
          }
          return item
        })
        obj.stepPriceDesc = arr
        this.ruleForm = obj
        if (success) {
          cb()
        } else {
          cb(new Error('请输入正确的数值'))
        }
      } else {
        cb()
      }
    },
    // 添加阶梯
    addPrice() {
      let obj = this._.cloneDeep(this.ruleForm)
      obj.stepPriceDesc.push({
        start: '',
        end: '',
        price: '',
        active: false
      })
      this.ruleForm = obj
    },
    // 删除
    removeStepPrice(index) {
      this.ruleForm.stepPriceDesc = this.ruleForm.stepPriceDesc.filter((_, eq) => eq !== index)
    }
  },
  formObject() {
    return {
      itemName: '',
      feeTypeCode: '',
      stepPrice: '2',
      unitPrice: '',
      stepPriceDesc: [{
        minNum: '',
        maxMun: '',
        unitPrice: ''
      }]
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog-container{
  & /deep/ .el-form-item.is-error .price-item .el-input__inner{
    border-color: #DCDFF6;
  }
  .err-input /deep/ .el-input__inner{
    border-color: #F56C6C !important;
  }
}
</style>
