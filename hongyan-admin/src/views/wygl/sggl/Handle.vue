<template>
  <el-dialog
    :title="info.type === 'add' ? '添加施工记录' : '编辑施工记录'"
    :visible="info.visible"
    custom-class="default-dialog-style"    
    width="1000px"
    @update:visible="close"
    @open="open"
  >
    <div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="施工区域：" prop="area">
          <el-cascader
            v-model="ruleForm.area"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            class="w-100"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="施工时间：" prop="date">
          <el-date-picker
            v-model="ruleForm.date"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="w-100-imp"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="施工单位：" prop="unitsName">
          <el-input v-model.trim="ruleForm.unitsName"></el-input>
        </el-form-item>
        <el-form-item label="施工负责人：" prop="userId">
          <SelectPeople :id.sync="ruleForm.userId" :name.sync="ruleForm.userName" placeholder="请选择施工负责人" />
        </el-form-item>
        <el-form-item label="负责人电话：" prop="userPhone">
          <el-input v-model.trim="ruleForm.userPhone"></el-input>
        </el-form-item>
        <el-form-item label="施工内容：" prop="content">
          <el-input v-model.trim="ruleForm.content" type="textarea"></el-input>
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
import { selectList, addOrEdit } from '@/api/wygl/sggl.js'
import SelectPeople from '@/components/public/selectPeople.vue'
export default {
  name: 'FjxxHandle',
  components: {
    SelectPeople
  },
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
      options: [],
      btnLoading: false,
      ruleForm: this.$options.formObject(),
      rules: {
        area: [{ required: true, message: '请选择施工区域' }],
        date: [{ required: true, message: '请选择施工时间' }],
        unitsName: [{ required: true, message: '请输入施工单位' }],
        userId: [{ required: true, message: '请选择施工负责人' }],
        userPhone: [{ required: true }],
      }
    }
  },
  created() {
    this.selectList() // 获取联动数据
  },
  methods: {
    // 获取施工区域枚举
    selectList() {
      selectList().then((data) => {
        if (data.code === 0) {
          let arr = []
          data.data && data.data.forEach(item => {
            let obj = {
              label: item.parkName,
              value: [item.parkId, item.parkName].join('/'),
              children: [],
            }
            item.buildingFloorDtos && item.buildingFloorDtos.forEach(ele => {
              let e = {
                label: ele.buildName,
                value: [ele.buildId, ele.buildName].join('/'),
                children: []
              }
              ele.floorDBOS && ele.floorDBOS.forEach(opt => {
                let o = {
                  label: opt.floorName,
                  value: [opt.floorId, opt.floorName].join('/'),
                  children: [],
                }
                opt.areaDBOS && opt.areaDBOS.forEach(dia => {
                  o.children.push({
                    label: dia.areaName,
                    value: [dia.id, dia.areaName].join('/')
                  })
                })
                o.children.length === 0 && (delete o.children)
                e.children.push(o)
              })
              e.children.length === 0 && (delete e.children)
              obj.children.push(e)
            })
            obj.children.length === 0 && (delete obj.children)
            arr.push(obj)
          })
          this.options = arr
        }
      })
    },
    // 关闭按钮
    close() {
      this.ruleForm = this.$options.formObject()
      this.$refs.ruleForm && this.$refs.ruleForm.resetFields()
      let obj = this._.cloneDeep(this.info)
      obj.visible = false
      this.$emit('update', obj)
    },
    // 打开初始化
    open() {
      this.$refs.ruleForm && this.$refs.ruleForm.clearValidate()
      if (this.info.type === 'edit') {
        let data = this.info.data
        this.ruleForm = {
          ...(this.$options.formObject()),
          ...data,
          date: [data.startTime || '', data.endTime || ''],
          area: [
            [data.parkId, data.parkName].join('/'), 
            [data.buildingId, data.buildingName].join('/'), 
            [data.floorId, data.floorName].join('/'), 
            [data.areaId, data.areaName].join('/')
          ]
        }
      }
    },
    // 确定保存
    sure() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let area = this.ruleForm.area
          let params = {
            ...(this._.cloneDeep(this.ruleForm)),
            parkId: area[0].split('/')[0],
            parkName: area[0].split('/')[1],
            buildingId: area[1].split('/')[0],
            buildingName: area[1].split('/')[1],
            floorId: area[2].split('/')[0],
            floorName: area[2].split('/')[1],
            areaId: area[3].split('/')[0],
            areaName: area[3].split('/')[1],
            startTime: this.ruleForm.date[0],
            endTime: this.ruleForm.date[1],
          }
          delete params.area
          delete params.date
          this.btnLoading = true
          addOrEdit(params, this.info.type === 'edit' ? 'modify' : 'append').then((data) => {
            this.btnLoading = false
            if (data.code === 0) {
              this.$message.success('操作成功')
              this.close()
              this.$emit('reflash')
            } else {
              throw new Error()
            }
          }).catch(() => {
            this.btnLoading = false
            this.$message.error('操作失败')
          })
        }
      })
    },
  },
  formObject() {
    return {
      area: [],
      date: [], // 施工时间
      unitsName: '', // 施工单位
      userId: '', // 施工负责人id
      userName: '', // 施工负责人姓名
      userPhone: '', // 施工负责人电话
      content: '',
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
