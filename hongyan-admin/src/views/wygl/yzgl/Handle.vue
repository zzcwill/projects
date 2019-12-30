<template>
  <el-dialog
    :title="info.type === 'add' ? '添加入驻房客' : '编辑入驻房客'"
    :visible="info.visible"
    custom-class="default-dialog-style"    
    width="1000px"
    @update:visible="close"
    @open="open"
  >
    <div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="房客名称" prop="contactName">
          <el-input v-model.trim="ruleForm.contactName"></el-input>
        </el-form-item>
        <el-form-item label="房客电话" prop="contactTelephone">
          <el-input v-model.number="ruleForm.contactTelephone"></el-input>
        </el-form-item>
        <el-form-item label="所属房间" prop="areaIdList">
          <el-cascader
            v-model="roomValue"
            :options="listInfo"
            :props="{ expandTrigger: 'hover', value: 'id' }"
            placeholder="请选择所属房间"
            multiple
            class="w-100"
          />
        </el-form-item>
        <el-form-item label="入驻开始时间" prop="srartTime">
          <el-input v-model="ruleForm.srartTime"></el-input>
        </el-form-item>
        <el-form-item label="入驻结束时间" prop="endTime">
          <el-input v-model="ruleForm.endTime"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="stateCode">
          <el-select v-model="ruleForm.stateCode" placeholder="请选择" class="w-100">
            <el-option
              v-for="item in $store.state.reflex.enterState"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="备注" prop="roadWrokContent">
          <el-input v-model="ruleForm.meno" type="textarea"></el-input>
        </el-form-item> -->
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" @click="resetForm('ruleForm')">取 消</el-button>
      <el-button size="medium" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addOrEdit } from '@/api/wygl/dyxx'
export default {
  name: 'RzglHandle',
  model: {
    prop: 'info',
    event: 'update',
  },
  props: {
    info: {
      type: Object,
      default: () => ({ visible: false })
    },
    listInfo: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      roomValue: [],
      ruleForm: {
          contactName: '',
          contactTelephone: '',
          areaIdList: [],
          srartTime: '',
          endTime: '',
          stateCode: '',
        },
        rules: {
          contactName: [
            { required: true, message: '请输入房客名称', trigger: 'blur' }
          ],
          contactTelephone: [
            { required: true, message: '请输入房客电话', trigger: 'blur' },
          ],
          // endFloor: [
          //   { required: true, message: '请输入结束楼层', trigger: 'blur' },
          //   { type: 'number', message: '楼层必须为数字值' }
          // ],
          // coveredArea: [
          //   { required: true, message: '请输入建筑面积', trigger: 'blur' }
          // ],
          stateCode: [
            { required: true, message: '请选择入驻状态', trigger: 'change' }
          ]
        }
    }
  },
  watch: {
    roomValue: {
      handler(val) {
        this.ruleForm.areaIdList = val
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 关闭按钮
    close() {
      this.roomValue = []
      this.$refs.ruleForm && this.$refs.ruleForm.resetFields() // 移除校验规则和初始化数据
      let obj = this._.cloneDeep(this.info)
      obj.visible = false
      this.$emit('update', obj)
    },
    // 打开初始化
    open() {

    },
    // 确定保存
    sure() {
      this.close()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.btnLoading = false
          let partObj = this.listInfo.find(v => v.id === this.roomValue[0])
          let buildingObj = partObj.children.find(v => v.id === this.roomValue[1])
          let unitObj = buildingObj.children.find(v => v.id === this.roomValue[2])
          let roomObj = unitObj.children.find(v => v.id === this.roomValue[3])
          let params = Object.assign({}, this.ruleForm, { parkId: this.roomValue[0] }, { parkName: partObj.label }, { buildingName: buildingObj.label }, { buildingId: this.roomValue[1] },
           { unitName: unitObj.label }, { unitId: this.roomValue[2] }, { areaName: roomObj.label }, { areaId: this.roomValue[3] })
          delete params.floorId
          addOrEdit(params, this.info.type !== 'add').then((data) => {
            this.btnLoading = false
            if (data.code === 0) {
              this.close()
              this.$message.success('添加成功')
              this.$emit('reflash')
            } else {
              this.$message.error(data.msg)
            }
          }).catch(() => {
            this.btnLoading = false
            this.$message.error('添加失败')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
