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
            :options="treeData"
            :props="{ expandTrigger: 'hover', value: 'id' }"
            placeholder="请选择所属房间"
            multiple
            class="w-100"
          />
        </el-form-item>
        <el-form-item label="入驻时间" prop="time">
          <!-- <el-input v-model="ruleForm.srartTime"></el-input> -->
          <el-date-picker
            v-model="ruleForm.time"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="入驻结束时间" prop="endTime"> -->
        <!-- <el-input v-model="ruleForm.endTime"></el-input> -->
        <!-- </el-form-item> -->
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
      <el-button size="medium" @click="close">取 消</el-button>
      <el-button size="medium" type="primary" :loading="btnLoading" @click="submitForm('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addOrEdit, getRoomTreeData } from '@/api/wygl/rzgl'
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
      treeData: [],
      roomValue: [],
      btnLoading: false,
      ruleForm: this.formObject(),
        rules: {
          contactName: [
            { required: true, message: '请输入房客名称', trigger: 'blur' }
          ],
          contactTelephone: [
            { required: true, message: '请输入房客电话', trigger: 'blur' },
          ],
          areaIdList: [
            { required: true, message: '请选择所属房间', trigger: 'blur' }
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
    getRoomTreeData() {
      getRoomTreeData().then((data) => {
        if (data.code === 0) {
          let result = []
          data.data && data.data.forEach((item) => {
            let obj = {
              id: item.parkId,
              label: item.parkName,
              children: []
            }
            item.buildingUnitDtos && item.buildingUnitDtos.forEach((ele) => {
              let opt = {
                id: ele.buildId,
                label: ele.buildName,
                children: []
              }
              ele.unitRoomDtos && ele.unitRoomDtos.forEach(par => {
                  let opt1 = {
                    id: par.unitId,
                    label: par.unitName,
                    children: []
                  }
                  par.roomDBOS && par.roomDBOS.forEach(room => {
                    opt1.children.push({
                      id: room.id,
                      label: room.roomName,
                      obj: room
                    })
                  })
                  opt1.children.length === 0 && delete opt1.children
                  opt.children.push(opt1)
              })
              opt.children.length === 0 && delete opt.children
              obj.children.push(opt)
            })
            obj.children.length === 0 && delete obj.children
            result.push(obj)
          })
          this.treeData = result
        } else {
          throw new Error()
        }
      }).catch(() => {
         this.loading = false
        this.treeData = []
      })
    },
    // 关闭按钮
    close() {
      this.roomValue = []
      this.ruleForm = this.formObject()
      this.$refs.ruleForm && this.$refs.ruleForm.resetFields() // 移除校验规则和初始化数据
      let obj = this._.cloneDeep(this.info)
      obj.visible = false
      this.$emit('update', obj)
    },
    // 打开初始化
    open() {
      this.getRoomTreeData()
      if (this.info.type === 'edit') {
        let data = this.info.data
        data.areaIdList = [data.parkId, data.buildingId, data.unitId, data.areaId]
        this.roomValue = [data.parkId, data.buildingId, data.unitId, data.areaId]
        data.time = [data.srartTime, data.endTime]
        this.ruleForm = data
      }
    },
    // 确定保存
    sure() {
      this.close()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          let partObj = this.treeData.find(v => v.id === this.roomValue[0])
          let buildingObj = partObj.children.find(v => v.id === this.roomValue[1])
          let unitObj = buildingObj.children.find(v => v.id === this.roomValue[2])
          let roomObj = unitObj.children.find(v => v.id === this.roomValue[3])
          let stateObj = this.$store.state.reflex.enterState.find(v => v.value === this.ruleForm.stateCode)
          let params = Object.assign({}, this.ruleForm, 
            { parkId: this.roomValue[0] },
            { parkName: partObj.label }, { buildingName: buildingObj.label }, 
            { buildingId: this.roomValue[1] },
            { unitName: unitObj.label }, { unitId: this.roomValue[2] },
            { areaName: roomObj.label }, { areaId: this.roomValue[3] }, 
            { srartTime: this.ruleForm.time[0] }, { endTime: this.ruleForm.time[1] },
            { stateName: stateObj.label }, { floorId: roomObj.obj.floorId },
            { floorName: roomObj.obj.floorName }, { areaPosition: roomObj.obj.roomPosition },
            { areaSpace: roomObj.obj.roomSpace }
            )
          delete params.areaIdList
          delete params.time
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
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 获取每个小区的单元列表
    formObject() {
      return {
          contactName: '',
          contactTelephone: '',
          areaIdList: [],
          // srartTime: '',
          // endTime: '',
          time: [],
          stateCode: '',
        }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
