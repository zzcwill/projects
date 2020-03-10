<template>
  <el-dialog
    :title="info.type === 'add' ? '添加单元' : '编辑单元'"
    :visible="info.visible"
    custom-class="default-dialog-style"    
    width="1000px"
    @update:visible="close"
    @open="open"
  >
    <div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="单元编号" prop="unitCode">
          <el-input v-model="ruleForm.unitCode"></el-input>
        </el-form-item>
        <el-form-item label="单元名称" prop="unitName">
          <el-input v-model="ruleForm.unitName"></el-input>
        </el-form-item>
        <el-form-item label="所属楼栋" prop="floorId">
          <el-cascader
            v-model="floorValue"
            :options="listInfo"
            :props="{ expandTrigger: 'hover', value: 'id' }"
            placeholder="请选择所属楼栋"
            multiple
            class="w-100"
          />
        </el-form-item>
        <el-form-item label="单元位置" prop="unitPosition">
          <el-input v-model="ruleForm.unitPosition"></el-input>
        </el-form-item>
        <el-form-item label="单元状态" prop="unitStateCode">
          <el-select v-model="ruleForm.unitStateCode" placeholder="请选择" class="w-100">
            <el-option
              v-for="item in $store.state.reflex.floorStateList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="meno">
          <el-input v-model="ruleForm.meno" type="textarea"></el-input>
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
import { addFloorList } from '@/api/wygl/dyxx'
export default {
  name: 'DyxxHandle',
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
      btnLoading: false,
      floorValue: [], // 所属楼栋
      ruleForm: this.formObject(),
      rules: {
        unitCode: [
          { required: true, message: '请输入单元编号', trigger: 'blur' },
        ],
        unitName: [
          { required: true, message: '请输入单元名称', trigger: 'blur' }
        ],
        floorId: [
          { required: true, message: '请选择楼栋', trigger: 'blur' }
        ],
        unitStateCode: [
          { required: true, message: '请选择单元状态', trigger: 'change' }
        ]
      },
    }
  },
  watch: {
    floorValue: {
      handler(val) {
        this.ruleForm.floorId = val
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 关闭按钮
    close() {
      this.floorValue = []
      this.ruleForm = this.formObject()
      this.$refs.ruleForm && this.$refs.ruleForm.resetFields() // 移除校验规则和初始化数据
      let obj = this._.cloneDeep(this.info)
      obj.visible = false
      this.$emit('update', obj)
    },
    // 打开初始化
    open() {
      if (this.info.type === 'edit') {
        let data = this.info.data
        data.floorId = [data.parkId, data.buildingId]
        this.floorValue = [data.parkId, data.buildingId]
        this.ruleForm = data
      }
    },
    // 确定保存
    sure() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.btnLoading = true
          let partObj = this.listInfo.find(v => v.id === this.floorValue[0])
          let buildingObj = partObj.children.find(v => v.id === this.floorValue[1])
          let params = Object.assign({}, this.ruleForm, { parkId: this.floorValue[0] }, { parkName: partObj.label }, { buildingName: buildingObj.label }, { buildingId: this.floorValue[1] })
          delete params.floorId
          addFloorList(params, this.info.type !== 'add').then((data) => {
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
      })
    },
    // 表单初始化
    formObject() {
      return {
        unitCode: '', // 单元编号
        unitName: '',
        floorId: [],
        unitPosition: '', // 单元位置
        unitStateCode: '', // 单元状态
        meno: ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
