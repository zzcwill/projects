<template>
  <el-dialog
    title="事件详情"
    :visible="info.visible"
    custom-class="default-dialog-style"
    width="1000px"
    @update:visible="close"
    @open="open"
  >
    <div>
      <el-form ref="ruleForm" :model="ruleForm" label-width="150px" class="demo-ruleForm">
        <el-form-item label="所属园区名称：">{{ info.data.parkName }}</el-form-item>
        <el-form-item label="巡更日志日期：">{{ info.data.keeyDay }}</el-form-item>
        <el-form-item label="巡更日志主题：">{{ info.data.keepTitle }}</el-form-item>
        <el-form-item label="巡更计划名称：">{{ info.data.projectPlanName }}</el-form-item>
        <el-form-item label="记录人姓名：">{{ info.data.finderName }}</el-form-item>
        <el-form-item label="记录人联系电话：">{{ info.data.finderMobile }}</el-form-item>
        <el-form-item label="事件时间：">{{ info.data.incTime }}</el-form-item>
        <el-form-item label="发生地点：">{{ info.data.incPlace }}</el-form-item>
        <el-form-item label="事件描述：">{{ info.data.incResume }}</el-form-item>
        <el-form-item label="事件内容：">{{ info.data.incContent }}</el-form-item>
        <el-form-item label="处理状态：">
          <el-select v-model="ruleForm.typeCode" :disabled="ruleForm.typeCode ? true : false" class="w-100" placeholder="选择状态" style="width: 200px;">
            <el-option
              v-for="(item, index) in $store.state.reflex.incidentStatus"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="处理内容：">
          <el-input v-model="ruleForm.principalContent" :disabled="ruleForm.typeCode ? true : false" type="textarea" :autosize="{ minRows: 4, maxRows: 5 }"></el-input>
        </el-form-item>
        <el-form-item label="处理时间：">{{ info.data.principalTime }}</el-form-item>
        <el-form-item label="处理人姓名：">{{ info.data.principalName }}</el-form-item>
        <el-form-item label="处理人联系电话：">{{ info.data.principalMobile }}</el-form-item>

      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <!-- <el-button @click="close">取 消</el-button> -->
      <el-button type="primary" @click="sure">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addOrEdit } from '@/api/dzxg/sjjl'
export default {
  name: 'SjjlHandle',
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
      ruleForm: {
        typeCode: '',
        principalContent: '',
      }
    }
  },
  methods: {
    close() {
      this.ruleForm.typeCode = ''
      this.ruleForm.typeCode = ''
      let obj = this._.cloneDeep(this.info)
      obj.visible = false
      this.$emit('update', obj)
    },
    open() {
      let data = this.info.data
        this.data = data
        this.ruleForm.typeCode = data.stepCode
        this.ruleForm.principalContent = data.principalContent
    },
    sure() {
      this.btnLoading = true
      let typeObj = this.$store.state.reflex.incidentStatus.find(v => v.value === this.ruleForm.typeCode)
      let obj = Object.assign({}, this.data, { stepCode: this.ruleForm.typeCode, stepName: typeObj.label, principalContent: this.ruleForm.principalContent })
      addOrEdit(obj).then((data) => {
        this.btnLoading = false
        if (data.code === 0) {
          this.close()
          this.$message.success('操作成功')
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
