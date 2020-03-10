<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="130px" :rules="rules" :disabled="isView">
      <el-form-item v-if="showSearch || type==='add'" label="企业:" prop="companyId">
        <search
          type="partner"
          show-name="partnerName"
          :value="form.companyId"
          @change="changePartner"
        >
        </search>
      </el-form-item>
      <el-form-item v-if="showSearch || type==='add'" label="入驻园区:" prop="areaId">
        <yq-cascader
          type="park"
          :query-data="{type:'area'}"
          :value="areaValue"
          @change="changeCascader"
        ></yq-cascader>
      </el-form-item>

      <el-form-item label="入驻时间:" prop="time">
        <el-date-picker
          v-model="form.time"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="入驻状态:" prop="stateCode">
        <el-select v-model="form.stateCode">
          <el-option
            v-for="item of Object.keys(stateCodeOption)"
            :key="item"
            :value="item"
            :label="stateCodeOption[item]"
          ></el-option>
        </el-select>
      </el-form-item>

<!--      <el-form-item label="费项：" prop="itemId">-->
<!--        <search-->
<!--          type="chargeItem"-->
<!--          show-name="itemName"-->
<!--          :value="form.itemId"-->
<!--          @change="changeItem"-->
<!--        >-->
<!--        </search>-->
<!--      </el-form-item>-->

    </el-form>

    <div v-if="!isView" style="text-align: right">
      <el-button type="primary" @click="edit">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { infoCmpentry, addCmpentry, editCmpentry } from '@/api/qygl/qyrz'
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
        stateCodeOption: {
          '1': '正常入驻',
          '2': '已经搬迁'
        },
        showSearch: false,
        areaValue: [],
        form: {
          time: [],
          companyId: '',
          areaId: '',
          startTime: '',
          endTime: '',
          stateCode: '',
          itemId: '',
          propertyCode: '1',
          propertyName: '写字楼',
        },
        rules: {
          companyId: [
            { required: true, message: '请选择企业', trigger: 'change' }
          ],
          areaId: [
            { required: true, message: '请选择入驻区域', trigger: 'change' }
          ],
          time: [
            { required: true, message: '请选择入驻时间', trigger: ['blur', 'change'] }
          ],
          stateCode: [
            { required: true, message: '请选择状态', trigger: ['blur', 'change'] }
          ],
          itemName: [
            { required: true, message: '请输入费项名称', trigger: 'blur' }
          ],
          // itemId: [
          //   { required: true, message: '请输入费项名称', trigger: 'change' }
          // ]
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
      changeItem(item) {
        this.form.itemId = item.id
        this.form.itemName = item.itemName

        this.form.itemDetail = item.itemDetail
        this.form.feeTypeCode = item.feeTypeCode
        this.form.feeTypenName = item.feeTypenName
        this.form.minNum = item.minNum
        this.form.maxMun = item.maxMun
        this.form.frequencyCode = item.frequencyCode
        this.form.frequencyName = item.frequencyName

        this.form.propertyCode = item.typeCode === '1' ? '2' : '1'
        this.form.propertyName = item.typeCode === '1' ? '住宅' : '写字楼'
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
      changePartner(item) {
        this.form.companyId = item.id
        this.form.companyName = item.partnerName
        this.form.contactName = item.contactName
        this.form.contactTelephone = item.contactTelephone
      },
      async query() {
        infoCmpentry({ id: this.id }).then(res => {
          this.form = res.data
          this.areaValue = [this.form.parkId, this.form.buildingId, this.form.floorId, this.form.areaId]
          this.form.time = [this.form.startTime, this.form.endTime]
          this.showSearch = true
        })
      },
      edit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.form.stateName = this.stateCodeOption[this.form.stateCode]
            this.form.startTime = this.form.time[0]
            this.form.endTime = this.form.time[1]
            if (this.type === 'add') {
              addCmpentry(this.form).then(res => {
                this.$emit('save')
              })
            } else {
              editCmpentry(this.form).then(res => {
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
    width: 280px;
  }

  .el-autocomplete {
    width: 280px;
  }

  .el-select {
    width: 280px;
  }

  .el-cascader {
    width: 280px;
  }

  .el-date-editor {
    width: 280px;
  }
</style>
