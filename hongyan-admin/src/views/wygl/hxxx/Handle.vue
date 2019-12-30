<template>
  <el-dialog
    :title="info.type === 'add' ? '添加户型' : '编辑户型'"
    :visible="info.visible"
    custom-class="default-dialog-style"
    width="1000px"
    @update:visible="close"
    @open="open"
  >
    <div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">

        <el-form-item label="户型分类" prop="apartmentTypeCode">
          <el-select v-model="ruleForm.apartmentTypeCode" placeholder="请选择户型" @change="changeApartmentType">
            <el-option
              v-for="(item,index) in $store.state.reflex.apartmentType"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="户型名称" prop="apartmentName">
          <el-input v-model.trim="ruleForm.apartmentName"></el-input>
        </el-form-item>
        <el-form-item label="户型面积" prop="apartmentSpace">
          <el-input v-model.number="ruleForm.apartmentSpace"></el-input>
        </el-form-item>
        <el-form-item label="物业费单价" prop="apartmentPrice">
          <el-input v-model.number="ruleForm.apartmentPrice"></el-input>
        </el-form-item>
        <el-form-item label="客厅数量" prop="numLivingRoom">
          <el-input v-model="ruleForm.numLivingRoom"></el-input>
        </el-form-item>
        <el-form-item label="卧室数量" prop="numBedrooms">
          <el-input v-model="ruleForm.numBedrooms"></el-input>
        </el-form-item>
        <el-form-item label="卫生间数量" prop="numToilets">
          <el-input v-model="ruleForm.numToilets"></el-input>
        </el-form-item>
        <el-form-item label="厨房数量" prop="numKitchens">
          <el-input v-model="ruleForm.numKitchens"></el-input>
        </el-form-item>
        <el-form-item label="阳台数量" prop="numBalcony">
          <el-input v-model="ruleForm.numBalcony"></el-input>
        </el-form-item>
        <el-form-item label="花园数量" prop="numGardens">
          <el-input v-model="ruleForm.numGardens"></el-input>
        </el-form-item>
        <el-form-item label="泳池数量" prop="numPools">
          <el-input v-model="ruleForm.numPools"></el-input>
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
  import { addApartment } from '@/api/wygl/hxxx'

  export default {
    name: 'HxxxHandle',
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
        ruleForm: this.formObject(),
        rules: {
          apartmentTypeCode: [
            { required: true, message: '请选择房型类型', trigger: 'blur' }
          ],
          apartmentName: [
            { required: true, message: '请输入户型名称', trigger: 'blur' }
          ],
          apartmentPrice: [
            { required: true, message: '请输入物业单价', trigger: 'blur' },
            { type: 'number', message: '物业单价必须为数字值' }
          ]
        }
      }
    },
    methods: {
      // 关闭按钮
      close() {
          this.ruleForm = this.formObject()
          this.$refs.ruleForm && this.$refs.ruleForm.resetFields()
          let obj = this._.cloneDeep(this.info)
          obj.visible = false
          this.$emit('update', obj)
      },
      // 打开初始化
      open() {
          if (this.info.type === 'edit') {
            this.ruleForm = this.info.data
          } else {
            this.ruleForm = Object.assign({}, this.ruleForm, this.info.data)
          }
      },
       // 确定保存
      sure() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.btnLoading = true
            addApartment(this.ruleForm, this.info.type !== 'add').then((data) => {
              this.btnLoading = false
              if (data.code === 0) {
                this.close()
                this.$message.success(this.info.type !== 'add' ? '修改成功' : '添加成功')
                this.$emit('update')
              } else {
                this.$message.error(data.msg)
              }
            }).catch(() => {
              this.btnLoading = false
              this.$message.error('添加失败')
            })
          }
        })
      },
      // 改变户型类型
      changeApartmentType(val) {
          this.ruleForm.apartmentTypeCode = val
          this.ruleForm.apartmentTypeName = this.$store.state.reflex.apartmentType.find(v => {
              return v.value === val
          }).label
      },
      formObject() {
        return {
          apartmentTypeCode: '',
          apartmentTypeName: '',
          apartmentName: '',
          apartmentSpace: '',
          familyClassification: '',
          apartmentPrice: '',
          numLivingRoom: '',
          numBedrooms: '',
          numToilets: '',
          numKitchens: '',
          numBalcony: '',
          numGardens: '',
          numPools: ''
        }
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
