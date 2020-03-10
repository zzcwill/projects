<template>
  <div style="padding:30px;">
    <el-form ref="form" size="mini" :model="form" label-width="180px" inline>
      <el-form-item label="开启智能会议室：" style="text-align: left" prop="conferenceCode">
        <el-radio-group v-model="form.conferenceIntelligence" size="small">
          <el-radio label="1" border>是</el-radio>
          <el-radio label="2" border>否</el-radio>
        </el-radio-group>
      </el-form-item>
      <br/>
      <div v-if="isSmartMeeting">
        <el-form-item label="关联硬件设备：" style="text-align: left">
          <div style="width: 360px;">
            <el-tag
              v-for="(tag,index) in equipmentList"
              size="medium"
              style="margin-right: 20px;margin-top: 5px;padding-bottom: 5px"
              closable
              :disable-transitions="false"
              @close="delName(index)"
            >
              {{ tag.deviceName }}
            </el-tag>

            <search
              ref="equipmentSearch"
              type="device"
              show-name="deviceName"
              class="search-employee"
              @change="changeEmployee"
            >
            </search>
          </div>
        </el-form-item>
        <br/>
        <el-form-item label="智能开启照明：" style="text-align: left">
          <el-radio-group v-model="form.lightingIntelligence" size="small">
            <el-radio label="1" border>是</el-radio>
            <el-radio label="2" border>否</el-radio>
          </el-radio-group>
        </el-form-item>
        <br/>
        <el-form-item style="text-align: left;margin-left: 150px" prop="conferenceCode" v-if="isLightOpen">
       <span style="margin-top: 10px">提前
          <el-radio-group v-model="form.lightingAdvance" size="small">
            <el-radio-button label="5"></el-radio-button>
            <el-radio-button label="10"></el-radio-button>
            <el-radio-button label="15"></el-radio-button>
          </el-radio-group>
          分钟开启
        </span>
        </el-form-item>
        <br/>
        <el-form-item style="text-align: left;margin-left: 150px" prop="conferenceCode" v-if="isLightOpen">
       <span style="margin-top: 10px">亮度
          <el-radio-group v-model="form.brightness" size="small">
            <el-radio-button label="30"></el-radio-button>
            <el-radio-button label="50"></el-radio-button>
            <el-radio-button label="100"></el-radio-button>
          </el-radio-group>
        </span>
        </el-form-item>
        <br/>
        <!---->
        <el-form-item label="智能开启空调：" style="text-align: left">
          <el-radio-group v-model="form.airConditioningIntelligence" size="small">
            <el-radio label="1" border>是</el-radio>
            <el-radio label="2" border>否</el-radio>
          </el-radio-group>
        </el-form-item>
        <br/>
        <el-form-item style="text-align: left;margin-left: 150px" prop="conferenceCode" v-if="isacOpen">
       <span style="margin-top: 10px">提前
          <el-radio-group v-model="form.airConditioningAdvance" size="small">
            <el-radio-button label="10"></el-radio-button>
            <el-radio-button label="15"></el-radio-button>
            <el-radio-button label="20"></el-radio-button>
          </el-radio-group>
          分钟开启
        </span>
        </el-form-item>
        <br/>
        <el-form-item style="text-align: left;margin-left: 150px" prop="conferenceCode" v-if="isacOpen">
       <span style="margin-top: 10px">空调模式
          <el-radio-group v-model="form.airConditioningType" size="small">
            <el-radio-button label="智能"></el-radio-button>
            <el-radio-button label="制冷"></el-radio-button>
            <el-radio-button label="制热"></el-radio-button>
          </el-radio-group>
        </span>
        </el-form-item>
        <br/>
        <el-form-item style="text-align: left;margin-left: 150px" prop="conferenceCode" v-if="isacOpen">
       <span style="margin-top: 10px">空调温度
          <el-radio-group v-model="form.airConditioningTemperature" size="small">
            <el-radio-button label="偏凉"></el-radio-button>
            <el-radio-button label="舒适"></el-radio-button>
            <el-radio-button label="偏暖"></el-radio-button>
          </el-radio-group>
        </span>
        </el-form-item>
      </div>
    </el-form>
    <div style="text-align: right;">
      <el-button size="medium" type="primary" @click="edit">提交</el-button>
    </div>
  </div>
</template>

<script>
  import { addConference, infoConference, editConference, updateConferenceList } from '@/api/hysgl/hysgl'
  import yqCascader from '@/components/cascader'
  import search from '@/components/search'

  export default {
    components: { yqCascader, search },
    props: {
      form: Object,
      equipmentList:Array
    },
    data() {
      return {}
    },
    computed: {
      //判断是否开启智能会议室
      isSmartMeeting() {
        return this.form.conferenceIntelligence === '1'
      },
      //判断是否选中开启照明
      isLightOpen() {
        return this.form.lightingIntelligence === '1'
      },
      //判断是否选中开启空调
      isacOpen() {
        return this.form.airConditioningIntelligence === '1'
      }
    },
    created() {
    },
    methods: {
      // 提交按钮
      edit() {
        this.$confirm('确认提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'btn-custom-cancel',
          type: 'warning'
        }).then(() => {
          // 转换设备列表为json字符串
          this.form.seviceList = JSON.stringify(this.equipmentList)
          console.log(this.form)
          updateConferenceList(this.form).then(res => {
            this.$emit('save')
          })
        })
      },
      // tag组件X删除操作
      delName(index) {
        this.equipmentList.splice(index, 1)
      },
      changeEmployee(item) {
        if (item.id) {
          let equipment = {
            deivceId: item.id,
            deviceCode: item.deviceCode,
            deviceName: item.deviceName,
            modelId: item.modelId,
            modelCode: item.modelCode,
            modelName: item.modelName,
            productId: item.productId,
            productName: item.productName,
            producerId: item.producerId,
            producerName: item.producerName,
            productTypeId: item.productTypeId,
            productTypeName: item.productTypeName
          }
          if (!this.equipmentList) {
            this.equipmentList = []
          }
          this.equipmentList.push(equipment)
          this.$refs.equipmentSearch.delValue()
        }
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

  .el-switch {
    width: 200px;
  }

  .search-employee {
    width: 162px;
  }
</style>
