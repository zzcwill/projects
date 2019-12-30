<template>
  <el-dialog
    :title="info.type === 'add' ? '添加巡检点' : '编辑巡检点'"
    :visible="info.visible"
    custom-class="default-dialog-style"
    width="600px"
    @update:visible="close"
    @open="open"
  >
    <div>
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="巡检点名称：">
          <el-input v-model.trim="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="硬件编号：">
          <el-input v-model.trim="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="终端型号：">
          <el-input v-model.trim="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="终端类型：">
          <el-radio-group v-model="ruleForm.terminalTypeCode">
            <el-radio label="4" value="4" name="type">巡更硬件</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="区域地址：" prop="areaName">
          <yq-cascader style="width:100%" type="park" :query-data="{type:'area'}" @change="handleChangeAddress">
          </yq-cascader>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" @click="close">取 消</el-button>
      <el-button size="medium" type="primary" @click="sure">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
    import yqCascader from '@/components/cascader'

export default {
  name: 'XjdglHandle',
    components: {
        yqCascader
    },
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
        name: '',
        address: '',
          terminalTypeCode: 4,
          terminalTypeName: '巡更'
      }
    }
  },
  methods: {
    close() {
      let obj = this._.cloneDeep(this.info)
      obj.visible = false
      this.$emit('update', obj)
    },
    sure() {

    },
    open() {
      if (this.info.type === 'edit') {
        this.ruleForm = {
          name: this.info.data.city,
          address: this.info.data.city,
          is: '1'
        }
      } else {
        this.ruleForm = {
          name: '',
          address: '',
          is: '',
        }
      }
    },
      // 级联选择框触发事件
      handleChangeAddress(val) {
          this.ruleForm.parkId = val[0].value
          this.ruleForm.parkName = val[0].label
          this.ruleForm.buildingId = val[1].value
          this.ruleForm.buildingName = val[1].label
          this.ruleForm.floorId = val[2].value
          this.ruleForm.floorName = val[2].label
          this.ruleForm.areaId = val[3].value
          this.ruleForm.areaName = val[3].label
      },
  }
}
</script>
