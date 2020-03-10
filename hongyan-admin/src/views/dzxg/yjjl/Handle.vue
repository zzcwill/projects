<template>
  <el-dialog
    :title="(info.type === 'add' ? '添加' : '查看') + '运检记录'"
    :visible="info.visible"
    custom-class="default-dialog-style"
    width="1000px"
    @update:visible="close"
    @open="open"
  >
    <div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm" :disabled="isView">
        <el-form-item label="项目：" prop="projectPlanName">
          <el-input v-model="ruleForm.projectPlanName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="巡检部位：" prop="inspectionSite">
          <el-select v-model="ruleForm.inspectionSite" placeholder="请选择部位" class="w-100-imp">
            <el-option v-for="(item, index) in $store.state.reflex.xjType" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="巡检日期：" prop="keeyDay">
          <el-date-picker v-model="ruleForm.keeyDay" value-format="yyyy-MM-dd" class="w-100-imp" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="巡检时间：" prop="incTime">
          <el-time-picker v-model="ruleForm.incTime" value-format="hh:mm:ss" class="w-100-imp" placeholder="选择时间">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="位置：" prop="incPlace">
          <el-input v-model="ruleForm.incPlace" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="现象：" prop="incResume">
          <el-input v-model="ruleForm.incResume" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="处理：" prop="incContent">
          <el-input v-model="ruleForm.incContent" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="备注：" prop="principalContent">
          <el-input v-model="ruleForm.principalContent" placeholder="请输入" />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button v-if="!isView" type="primary" @click="sure">确 定</el-button>
      <el-button v-else type="primary" @click="$router.push('/sbgl/sbbx')">维修处理</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiYJJL } from '@/api/dzxg/yjjl'
export default {
  name: 'SjjlHandle',
  model: {
    prop: 'info',
    event: 'update',
  },
  props: {
    info: {
      type: Object,
      default: () => ({ visible: false, data: {}, type: 'add' })
    }
  },
  data() {
    return {
      ruleForm: this.$options.objForm(),
      rules: {
        projectPlanName: [{ required: true, message: '请输入项目名称' }]
      }
    }
  },
  computed: {
      isView() {
        return this.info.type === 'view'
      }
    },
  methods: {
    close() {
      this.ruleForm = this.$options.objForm()
      this.$refs.ruleForm && this.$refs.ruleForm.resetFields()
      let obj = this._.cloneDeep(this.info)
      obj.visible = false
      this.$emit('update', obj)
    },
    open() {
      if (this.info.type === 'view') {
        this.ruleForm = this._.cloneDeep(this.info.data)
      }
    },
    sure() {
      this.$refs.ruleForm.validate((result) => {
        if (result) {
          this.btnLoading = true
          let params = {
            ...this.ruleForm
          }
          apiYJJL(params, 'append').then((data) => {
            this.btnLoading = false
            if (data.code === 0) {
              this.$message.success('添加成功')
              this.close()
              this.$emit('reflash')
            } else {
              throw new Error()
            }
          }).catch(() => {
            this.btnLoading = false
            this.$message('添加失败')
          })
        }
      })
    }
  },
  objForm() {
    return {
      projectId: '11111',
      keeyDay: '',
      projectPlanName: '',
      inspectionSite: '1',
      incTime: '',
      incPlace: '',
      incResume: '',
      incContent: '',
      principalContent: '',
    }
  }
}
</script>
