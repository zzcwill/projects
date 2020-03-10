<template>
  <div class="fkyy-visitor-detail-page">
    <div class="p-10 bg-white brs-4 def-shadow">
      <br>
      <div class="flex-center w-fit-content">
        <el-form ref="form" :inline="true" :model="form" size="mini" label-width="130px" :rules="rules"
                 :disabled="isView">
          <el-form-item label="车牌号：" prop="carNumber">
            <el-input v-model="form.carNumber" class="input-class"></el-input>
          </el-form-item>
          <el-form-item label="车辆类型：" prop="carTypeCode">
            <el-select v-model="form.carTypeCode">
              <el-option v-for="item of Object.keys(carTypeOptions)" :key="item" :value="item"
                         :label="carTypeOptions[item]"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车辆颜色：" prop="carColor">
            <el-input v-model="form.carColor" class="input-class"></el-input>
          </el-form-item>
          <el-form-item label="车辆载重：" prop="carLoad">
            <el-input v-model="form.carLoad" class="input-class"></el-input>
          </el-form-item>
          <el-form-item label="访问园区：" prop="parkId">
            <search type="park" show-name="parkName" :value="form.parkId" @change="changePark"
                    style="width: 200px"></search>
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align:right;">
        <el-button type="primary" @click="save" v-if="isEdit">保存并返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import search from '@/components/search'

  export default {
    components: { search },
    data() {
      return {
        form: {
          carNumber: '',
          carTypeCode: '',
          carTypeName: '',
          carColor: '',
          carLoad: '',
          parkId: '',
          parkName: ''
        },
        carTypeOptions: {
          '10': '轿车',
          '11': '电动汽车',
          '20': '货车',
          '30': '客车',
          '40': '挂车',
          '50': '三轮车',
          '60': '电动车',
          '90': '其他车辆'
        },
        rules: { // 必填字段校验
          parkId: [
            { required: true, message: '请输入访问园区', trigger: 'change' }
          ],
          carNumber: [
            { required: true, message: '请输入车牌号', trigger: 'blur' }
          ],
          carTypeCode: [
            { required: true, message: '请选择车辆类型', trigger: 'change' }
          ],
          carColor: [
            { required: true, message: '请输入车辆颜色', trigger: 'blur' }
          ],
          carLoad: [
            { required: true, message: '请输入车辆载重', trigger: 'blur' }
          ]
        }
      }
    },
    props: {
      view: Object,
      type: String
    },
    created() {
      if (this.type === 'view') {
        this.form = this.view
      }
    },
    computed: {
      isView() {
        return this.type === 'view'
      },
      isEdit() {
        return this.type !== 'view'
      }
    },
    methods: {
      save() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$emit('save', this.form)
          }
        })
      },
      changePark(val) {
        this.form.parkId = val.id
        this.form.parkName = val.parkName
      },
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
</style>

