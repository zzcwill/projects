<template>
  <el-dialog
    :title="info.type === 'add' ? '添加日程计划' : '编辑日程计划'"
    :visible="info.visible"
    custom-class="default-dialog-style"
    width="1000px"
    @update:visible="close"
    @open="open"
  >
    <div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="日期" prop="date">
          <el-date-picker
            v-model="ruleForm.date"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="任务标题" prop="title">
          <el-input v-model.trim="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="author">
          <el-input v-model="ruleForm.author"></el-input>
        </el-form-item>
        <el-form-item label="优先级" prop="priority">
          <el-select v-model="ruleForm.priority" placeholder="请选择优先级">
            <el-option v-for="(item, index) in $store.state.reflex.schedulePriorityType" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" @click="resetForm('ruleForm')">取 消</el-button>
      <el-button size="medium" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
const roomFunctionMap = [
  { key: 1, value: '店面' },
  { key: 2, value: '商铺' },
  { key: 3, value: '居住' },
  { key: 4, value: '库房' },
  { key: 5, value: '商住综合' },
]
export default {
  name: 'FjxxHandle',
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
      roomFunctionMap,
      ruleForm: {
          date: '',
          title: '',
          priority: '',
          author: ''
        },
        rules: {
          name: [
            // { required: true, message: '请输入单元名称', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          // beiginFloor: [
          //   { required: true, message: '请输入开始楼层', trigger: 'blur' },
          //   { type: 'number', message: '楼层必须为数字值' }
          // ],
          // endFloor: [
          //   { required: true, message: '请输入结束楼层', trigger: 'blur' },
          //   { type: 'number', message: '楼层必须为数字值' }
          // ],
          // coveredArea: [
          //   { required: true, message: '请输入建筑面积', trigger: 'blur' }
          // ],
          // useArea: [
          //   { required: true, message: '请输入使用面积', trigger: 'blur' }
          // ]
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

    },
    // 确定保存
    sure() {
      this.close()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

  }
}
</script>
<style lang="scss" scoped>

</style>
