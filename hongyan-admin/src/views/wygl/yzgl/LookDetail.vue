<template>
  <el-dialog
    title="业主详情"
    :visible="info.visible"
    custom-class="default-dialog-style"
    width="1000px"
    @update:visible="close"
    @open="open"
  >
    <div>
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="业主姓名：">{{ info.data.ownerName }}</el-form-item>
        <el-form-item label="业主手机号：">{{ info.data.ownerPhone }}</el-form-item>
        <el-form-item label="备用手机号：">{{ info.data.ownerOtherPhone }}</el-form-item>
        <el-form-item label="业主身份证：">{{ info.data.ownerIdNumber }}</el-form-item>
        <el-form-item label="所属园区：">{{ info.data.parkName }}</el-form-item>
        <el-form-item label="所属楼栋：">{{ info.data.buildingName }}</el-form-item>
        <el-form-item label="所属楼层：">{{ info.data.floorName }}</el-form-item>
        <el-form-item label="所属单元：">{{ info.data.floorName }}</el-form-item>
        <el-form-item label="所属房间：">{{ info.data.areaName }}</el-form-item>
        <el-form-item label="使用面积：">{{ info.data.roomSpace }}</el-form-item>
        <el-form-item label="物业费单价">{{ info.data.roomPrice }}</el-form-item>
        <el-form-item label="状态："> 
          <!-- -->
          <el-select v-model="ruleForm.isReal" :disabled="ruleForm.isReal ? true : false" placeholder="请选择">
            <el-option v-for="(item, index) in $store.state.reflex.auditState" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="备注：">
          <el-input v-model="ruleForm.anwser" type="textarea" :autosize="{ minRows: 4, maxRows: 5 }"></el-input>
        </el-form-item> -->
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="sure">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addOrEdit } from '@/api/wygl/yzgl'
export default {
  name: 'TsjyLookDetail',
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
        isReal: '',
      }
    }
  },
  methods: {
    close() {
      this.ruleForm.anwser = ''
      let obj = this._.cloneDeep(this.info)
      obj.visible = false
      this.$emit('update', obj)
    },
    open() {
        let data = this.info.data
        this.data = data
        this.ruleForm.isReal = data.isReal
    },
    sure() {
      this.btnLoading = true
      // let stateNameObj = this.$store.state.reflex.auditState.find(v => v.value === this.ruleForm.isReal)
      // stateName: stateNameObj.label,
      let obj = Object.assign({}, this.data, { isReal: this.ruleForm.isReal })
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
