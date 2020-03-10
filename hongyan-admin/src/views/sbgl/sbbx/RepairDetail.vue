<template>
  <el-dialog
    title="报修明细"
    :visible="info.visible"
    custom-class="default-dialog-style"
    width="1000px"
    @update:visible="close"
    @open="open"
  >
    <div>
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
        <el-form-item label="报修人员：" prop="name">
          <span>{{ info.data.creatorName }}</span>
        </el-form-item>
        <el-form-item label="报修时间：" prop="name">
          <span>{{ info.data.faultCreateTime }}</span>
        </el-form-item>
        <el-form-item label="故障位置：" prop="name">
          <span>{{ info.data.parkName }} {{ info.data.buildingName }} {{ info.data.floorName }} {{ info.data.areaName }}</span>
        </el-form-item>
        <el-form-item label="设备编号：" prop="name">
          <span>{{ info.data.deviceCode }}</span>
        </el-form-item>
        <el-form-item label="设备名称：" prop="name">
          <span>{{ info.data.deviceName }}</span>
        </el-form-item>
        <el-form-item label="情况描述：" prop="name">
          <span>{{ info.data.content }}</span>
        </el-form-item>
        <el-form-item label="处理结果：" prop="result">
          <el-select v-model="ruleForm.result" :disabled="ruleForm.result != 1 ? true : false" placeholder="请选择">
            <el-option
              v-for="(item, index) in $store.state.reflex.repairType"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="维修人员：" prop="contactName">
          <el-input v-model="ruleForm.contactName" :disabled="ruleForm.contactName ? true : false" type="text">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">返 回</el-button>
      <el-button type="primary" :loading="btnLoading" @click="sure">保 存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addOrEdit } from '@/api/sbgl/sbbx'
export default {
  name: 'SbbxRepairDetail',
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
      btnLoading: false,
      data: {},
      ruleForm: {
        result: '',
        contactName: '',
      }
    }
  },
  methods: {
    close() {
      this.$refs.ruleForm && this.$refs.ruleForm.resetFields()
      let obj = this._.cloneDeep(this.info)
      obj.visible = false
      this.$emit('update', obj)
    },
    // 打开初始化
    open() {
        let data = this.info.data
        this.data = data
        this.ruleForm.result = data.stateCode
        this.ruleForm.contactName = data.contactName
    },
    sure() {
      this.btnLoading = true
      let obj = Object.assign({}, this.data, { stateCode: this.ruleForm.result }, { contactName: this.ruleForm.contactName })
      addOrEdit(obj).then((data) => {
          this.btnLoading = false
          if (data.code === 0) {
            this.close()
            this.$message.success(this.info.type !== 'add' ? '修改成功' : '添加成功')
            this.$emit('reflash')
          } else {
            this.$message.error(data.msg)
          }
        }).catch(() => {
          this.btnLoading = false
          this.$message.error('添加失败')
        })
     }
  }
}
</script>
