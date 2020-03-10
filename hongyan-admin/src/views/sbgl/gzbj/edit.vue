<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="130px" :rules="rules">
      <el-form-item label="故障编号:">
        <el-input v-model="form.faultCode" disabled></el-input>
      </el-form-item>
      <el-form-item label="故障名称:">
        <el-input v-model="form.faultName" disabled></el-input>
      </el-form-item>
      <el-form-item label="故障详细信息:">
        <el-input v-model="form.faultContent" disabled></el-input>
      </el-form-item>

      <el-form-item label="设备名称:">
        <el-input v-model="form.deviceName" disabled></el-input>
      </el-form-item>
      <el-form-item label="设备编号:">
        <el-input v-model="form.deviceCode" disabled></el-input>
      </el-form-item>

      <el-form-item label="故障上报时间:">
        <el-input v-model="form.faultCreateTime" disabled></el-input>
      </el-form-item>

      <el-form-item v-if="showSearch || type==='add'" label="安装区域：">
        <yq-cascader
          disabled
          type="park"
          :query-data="{type:'area'}"
          :value="areaValue"
          @change="changeCascader"
        ></yq-cascader>
      </el-form-item>

      <el-form-item label="故障级别:">
        <el-input v-model="form.level" disabled></el-input>
      </el-form-item>

      <el-form-item label="故障维修开始时间:">
        <el-input v-model="form.startTime" disabled></el-input>
      </el-form-item>
      <el-form-item label="故障维修结束时间:">
        <el-input v-model="form.endTime" disabled></el-input>
      </el-form-item>
      <el-form-item label="维修状态:">
        <el-input v-model="form.stateName" disabled></el-input>
      </el-form-item>

      <el-form-item label="维修负责人:" prop="contactName">
        <el-input v-model="form.contactName" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="维修负责人电话:" prop="contactTelephone">
        <el-input v-model="form.contactTelephone" :disabled="isView"></el-input>
      </el-form-item>
    </el-form>

    <div v-if="!isView" style="text-align: right">
      <el-button type="primary" @click="edit">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { infoDeviceFault, deviceFault } from '@/api/sbgl/gzbj'
  import search from '@/components/search'
  import yqCascader from '@/components/cascader'

  export default {
    components: { search, yqCascader },
    props: {
      type: String,
      id: String
    },
    data() {
      return {
        showSearch: false,
        areaValue: [],
        form: {
          contactName: '',
          contactTelephone: '',
          deviceName: '',
          deviceCode: '',
          modelId: '',
          groupId: '',
          areaId: ''
        },
        rules: {
          deviceName: [
            { required: true, message: '请输名称', trigger: 'blur' }
          ],
          deviceCode: [
            { required: true, message: '请输入编号', trigger: 'blur' }
          ],
          contactName: [
            { required: true, message: '请输入负责人', trigger: 'blur' }
          ],
          contactTelephone: [
            { required: true, message: '请输入负责人电话', trigger: 'blur' }
          ],
          modelId: [
            { required: true, message: '请选择设备型号', trigger: ['blur', 'change'] }
          ],
          groupId: [
            { required: true, message: '请选择设备分组', trigger: ['blur', 'change'] }
          ],
          areaId: [
            { required: true, message: '请选择安装区域', trigger: ['blur', 'change'] }
          ]
        }
      }
    },
    computed: {
      isView() {
        return this.type === 'view'
      }
    },
    created() {
      if (this.type !== 'add') {
        this.query()
      }
    },
    methods: {
      changeCascader(value) {
        this.form.parkId = value[0].value
        this.form.parkName = value[0].label
        this.form.buildingId = value[1].value
        this.form.buildingName = value[1].label
        this.form.floorId = value[2].value
        this.form.floorName = value[2].label
        this.form.areaId = value[3].value
        this.form.areaName = value[3].label
      },
      query() {
        infoDeviceFault({ id: this.id }).then(res => {
          this.form = res.data
          this.areaValue = [this.form.parkId, this.form.buildingId, this.form.floorId, this.form.areaId]
          this.showSearch = true
        }).catch(err => {
          this.$message.error(err)
        })
      },
      edit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            deviceFault(this.form).then(res => {
              this.$emit('save')
            }).catch(err => {
              this.$message.error(err)
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .el-input {
    width: 200px;
  }

  .el-autocomplete {
    width: 200px;
  }

  .el-select {
    width: 200px;
  }

  .el-cascader {
    width: 200px;
  }
</style>
