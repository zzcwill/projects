<template>
  <div style="padding:30px;">
    <el-form ref="form" size="mini" :model="form" label-width="180px" inline :disabled="isView" :rules="rules">
      <el-form-item label="会议室编号：" style="text-align: left" prop="conferenceCode">
        <el-input v-model="form.conferenceCode" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="会议室名称：" style="text-align: left" prop="conferenceName">
        <el-input v-model="form.conferenceName" placeholder="请输入" />
      </el-form-item>
      <el-form-item v-if="showSearch || type==='add'" label="所在区域：" prop="areaId">
        <yq-cascader type="park" :query-data="{type:'area'}" :value="areaValue" @change="changeCascader"></yq-cascader>
      </el-form-item>

      <el-form-item v-if="showSearch || type==='add'" label="所属公司：" prop="companyId">
        <search type="partner" show-name="partnerName" :value="form.companyId" @change="changeCompany"></search>
      </el-form-item>

      <el-form-item label="会议室面积：" prop="area">
        <el-input v-model="form.area" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="默认容纳人数：" prop="containNum">
        <el-input v-model="form.containNum"></el-input>
      </el-form-item>
      <el-form-item label="是否自动审核：" prop="autoCheck">
        <el-switch v-model="form.autoCheck" active-value="1" inactive-value="2"></el-switch>
      </el-form-item>
      <el-form-item label="设备：" prop="isTv">
        <el-checkbox v-model="form.isTv" true-label="1" false-label="2">电视</el-checkbox>
        <el-checkbox v-model="form.isWhiteboard" true-label="1" false-label="2">白板</el-checkbox>
        <el-checkbox v-model="form.isProjection" true-label="1" false-label="2">投影</el-checkbox>
        <el-checkbox v-model="form.isVideo" true-label="1" false-label="2">视频会议系统</el-checkbox>
        <el-checkbox v-model="form.isAir" true-label="1" false-label="2">空调系统</el-checkbox>
        <el-checkbox v-model="form.isLighting" true-label="1" false-label="2">照明系统</el-checkbox>
        <el-checkbox v-model="form.isWind" true-label="1" false-label="2">新风系统</el-checkbox>
        <el-checkbox v-model="form.isWater" true-label="1" false-label="2">供水系统</el-checkbox>
      </el-form-item>
    </el-form>
    <div v-if="!isView" style="text-align: right;">
      <el-button size="medium" type="primary" @click="edit">提交</el-button>
    </div>
  </div>
</template>

<script>
  import { addConference, infoConference, editConference } from '@/api/hysgl/hysgl'
  import yqCascader from '@/components/cascader'
  import search from '@/components/search'
  export default {
    components: { yqCascader, search },
    props: {
      type: String,
      id: String
    },
    data() {
      return {
        showSearch: false,
        areaValue: [],
        form: {
          conferenceCode: '',
          conferenceName: '',
          companyId: '',
          autoCheck: '1',
          areaId: '',
          area: '',
          containNum: '',
          isTv: '2',
          isWhiteboard: '2',
          isProjection: '2',
          isVideo: '2',
          isAir: '2',
          isLighting: '2',
          isWind: '2',
          isWater: '2'
        },
        rules: {
          conferenceCode: [
            { required: true, message: '请输如会议室编号', trigger: 'blur' }
          ],
          conferenceName: [
            { required: true, message: '请输入会议室名称', trigger: 'blur' }
          ],
          companyId: [
            { required: true, message: '请选择所属公司', trigger: 'change' }
          ],
          areaId: [
            { required: true, message: '请选择所在区域', trigger: 'change' }
          ],
          area: [
            { required: true, message: '请输入会议室面积', trigger: 'blur' }
          ],
          containNum: [
            { required: true, message: '请输入默认容纳人数', trigger: 'blur' }
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
      query() {
        infoConference({ id: this.id }).then(res => {
          this.form = res.data
          this.areaValue = [this.form.parkId, this.form.buildingId, this.form.floorId, this.form.areaId]
          this.showSearch = true
        }).catch(err => {
          this.$message.error(err)
        })
      },
      changeCompany(item) {
        this.form.companyId = item.id
        this.form.companyName = item.companyName
      },
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
      edit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (this.type === 'add') {
              // 初始化设备参数
              this.form.conferenceIntelligence='2'
              this.form.lightingIntelligence='2'
              this.form.lightingAdvance='5'
              this.form.brightness='30'
              this.form.airConditioningIntelligence='2'
              this.form.airConditioningAdvance='10'
              this.form.airConditioningType='智能'
              this.form.airConditioningTemperature='舒适'
              addConference(this.form).then(res => {
                this.$emit('save')
              })
            } else {
              editConference(this.form).then(res => {
                this.$emit('save')
              })
            }
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
  .el-cascader{
    width: 200px;
  }
  .el-switch{
    width: 200px;
  }
</style>
