<template>
  <el-dialog
    :title="info.type === 'add' ? '添加房间' : '编辑房间'"
    :visible="info.visible"
    custom-class="default-dialog-style"    
    width="1000px"
    @update:visible="close"
    @open="open"
  >
    <div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="房间编号" prop="roomCode">
          <el-input v-model.trim="ruleForm.roomCode"></el-input>
        </el-form-item>
        <el-form-item label="房间名称" prop="roomName">
          <el-input v-model.trim="ruleForm.roomName"></el-input>
        </el-form-item>
        <el-form-item label="房间户型" prop="apartmentId">
          <el-select v-model="ruleForm.apartmentId" class="w-100" placeholder="请选择房间户型">
            <el-option v-for="(item,index) in apartmentList" :key="index" :label="item.apartmentName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属单元" prop="unitId">
          <el-select v-model="ruleForm.unitId" placeholder="请选择" class="w-100">
            <el-option
              v-for="item in unitMap"
              :key="item.id"
              :label="item.unitName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属楼层" prop="floorId">
          <el-select v-model="ruleForm.floorId" placeholder="请选择" class="w-100">
            <el-option
              v-for="item in floorMap"
              :key="item.id"
              :label="item.floorName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="房间位置" prop="roomPosition">
          <el-input v-model.number="ruleForm.roomPosition"></el-input>
        </el-form-item>
        <el-form-item label="房间面积" prop="roomSpace">
          <el-input v-model="ruleForm.roomSpace"></el-input>
        </el-form-item>
        <el-form-item label="房间单价" prop="roomPrice">
          <el-input v-model="ruleForm.roomPrice"></el-input>
        </el-form-item>
        <el-form-item label="房间状态" prop="roomStateCode">
          <el-select v-model="ruleForm.roomStateCode" placeholder="请选择" class="w-100">
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
import { addOrEdit, getFloorListItem, getUnitListItem } from '@/api/wygl/fjgl'
import { getApartmentList } from '@/api/wygl/hxxx'
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
    },
    listInfo: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      // 所属单元
      btnLoading: false,
      unitMap: [],
      floorMap: [],
      apartmentList: [],
      ruleForm: this.formObject(),
      rules: {
        roomCode: [
          { required: true, message: '请输入房间编号', trigger: 'blur' },
        ],
        roomName: [
          { required: true, message: '请输入房间名称', trigger: 'blur' },
        ],
        apartmentId: [
          { required: true, message: '选择房间户型', trigger: 'change' },
        ],
        unitId: [
          { required: true, message: '请选择所属单元', trigger: 'blur' }
        ],
        floorId: [
          { required: true, message: '请选择所属楼层', trigger: 'change' },
        ],
        roomStateCode: [
          { required: true, message: '请选择房间状态', trigger: 'change' }
        ],
      }
    }
  },

  methods: {
    // 获取单元
    getUnitListItem(params) {
      let obj = Object.assign({}, params, { pageLimit: 100 })
      getUnitListItem(obj).then(data => {
        if (data.code === 0) {
          this.unitMap = data.data
        }
      })
    },
    // 获取楼层
    getFloorListItem(params) {
      let obj = Object.assign({}, params, { pageLimit: 500 })
      getFloorListItem(obj).then(data => {
        if (data.code === 0) {
          this.floorMap = data.data
        }
      })
    },
    // 获取户型信息
    partmentTypeInfo() {
      getApartmentList({ pageCurrent: 1, pageLimit: 20 }).then(res => {
          console.log(res)
          if (res.data && !!res.data.length) {
            this.apartmentList = res.data
          } else {
            this.apartmentList = []
          }
      })
    },
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
        this.ruleForm = this._.cloneDeep(data)
      } else {
        console.log(this.info.data)
        console.log(this.ruleForm, '333')
        this.ruleForm = Object.assign({}, this.ruleForm, this.info.data)
      }
      this.getUnitListItem({ parkId: this.ruleForm.parkId, buildingId: this.ruleForm.buildingId })
      this.getFloorListItem({ parkId: this.ruleForm.parkId, buildingId: this.ruleForm.buildingId })
      // 获取户型信息
      this.partmentTypeInfo()
    },
   // 确定保存
    sure() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
           this.btnLoading = true
          let floorObj = this.floorMap.find(v => v.id === this.ruleForm.floorId)
          let unitObj = this.unitMap.find(v => v.id === this.ruleForm.unitId)
          let apartmentTypeObj = this.apartmentList.find(v => v.id === this.ruleForm.apartmentId)
          let roomStateObj = this.$store.state.reflex.floorStateList.find(v => v.value === this.ruleForm.roomStateCode)
          let params = Object.assign({}, this.ruleForm, { floorName: floorObj.floorName }, { roomStateName: roomStateObj.label }, { apartmentName: apartmentTypeObj.apartmentName }, { apartmentTypeName: apartmentTypeObj.apartmentTypeName }, { unitName: unitObj.unitName })
          addOrEdit(params, this.info.type !== 'add').then((data) => {
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
    formObject() {
      return {
        roomCode: '',
        roomName: '',
        apartmentId: '',
        unitId: '',
        floorId: '',
        fitment: '',
        houseType: '',
        roomPosition: '',
        roomSpace: '',
        roomPrice: '',
        roomStateCode: '',
        meno: ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
