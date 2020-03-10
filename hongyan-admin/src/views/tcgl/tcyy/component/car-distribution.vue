<template>
  <div class="tcwxx-edit-page">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex-center w-fit-content">
        <el-form ref="form" :inline="true" :model="form" size="mini" label-width="130px">
          <el-form-item label="车牌号：">
            <search type="car" show-name="carNumber" :value="form.carId" @change="changeCar"></search>
          </el-form-item>
          <el-form-item label="停车位编号：">
            <search type="parking" show-name="parkingCode" value-name="parkingCode" :value="form.parkingCode"
                    @change="changeParking"></search>
          </el-form-item>
          <el-form-item label="停车位类型：">
            <el-input v-model="form.parkingTypeName" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="车辆型号：">
            <el-input v-model="form.carTypeName" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="所属人员：">
            <el-input v-model="form.userName" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="所属企业：">
            <el-input v-model="form.companyName" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="开始日时：">
            <el-input v-model="form.startTime" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="结束日时：">
            <el-input v-model="form.endTime" :disabled="disabled"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align:right;">
        <el-button v-if="type!=='view'" type="primary" @click="submit">审核通过</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { addParking, queryParkingDetail, updateParking } from '@/api/tcgl/tcgl-request'
  import qyCascader from '@/components/cascader'
  import search from '@/components/search'

  export default {
    components: { qyCascader, search },
    props: {
      type: String,
      id: String
    },
    data() {
      return {
        form: {
          parkingCode: '',
          parkingTypeCode: '',
          carId: '',
          parkingTypeName:'',
          carTypeName:'',
          userName:'',
          companyName:'',
          startTime:'',
          endTime:'',
        },
        disabled: true,
        typeOptions: {
          '1': '固定车位',
          '2': '标准车位',
          '3': '一般车位',
          '4': '访客车位',
        },
        chargeOption: {
          '1': '是',
          '2': '否'
        },
      }
    },
    computed: {},
    created() {
    },
    methods: {
      changeParking(item) {
        this.form.parkingCode = item.parkingCode
        this.form.parkingTypeCode = item.parkingTypeCode
        this.form.parkingTypeName = item.parkingTypeName
        this.form.parkId = item.parkId
        this.form.parkingId = item.id
        this.form.parkName = item.parkName
      },
      changeCar(item) {
        this.form.carTypeName = '轿车'
        this.form.userName = '李晓明'
        this.form.companyName = '鸿雁科技'
        this.form.price = '2020-02-02 15:00:30'
        this.form.endTime = '2020-02-02 17:00:30'
        this.form.startTime = '2020-02-02 17:00:30'
        // this.form.carNumber = item.carNumber
        // this.form.carId = item.id
        //
        // this.form.typeCode = item.typeCode
        // this.form.typeName = item.typeName
        // this.form.carTypeCode = item.carTypeCode
        // this.form.carTypeName = item.carTypeName
        // this.form.color = item.color
        // this.form.carLoad = item.carLoad
        // this.form.userId = item.userId
        // this.form.userName = item.userName
        // this.form.userPhone = item.userPhone
        // this.form.idcardNumber = item.idcardNumber
        // this.form.companyId = item.companyId
        // this.form.companyName = item.companyName
        // this.form.departmentId = item.departmentId
        // this.form.departmentName = item.departmentName
      },
      submit() {
        this.$confirm('确认保存?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'btn-custom-cancel',
          type: 'warning'
        }).then(() => {
          this.$emit('save')
        })
      }
    }
  }
</script>

<style scoped>
  .el-input {
    width: 200px;
  }

  .el-select {
    width: 200px;
  }

  .el-autocomplete {
    width: 200px;
  }

  .el-cascader {
    width: 200px;
  }

  .el-switch {
    width: 200px;
  }
</style>

