<template>
  <div class="fkyy-visitor-detail-page">
    <div class="p-10 bg-white brs-4 def-shadow">
      <br>
      <div class="flex-center w-fit-content">
        <el-form ref="form" :inline="true" :model="form" size="mini" label-width="130px" :rules="rules"
                 :disabled="isView">
          <el-form-item label="姓名：" prop="visitorName">
            <el-input v-model="form.visitorName" class="input-class"></el-input>
          </el-form-item>
          <el-form-item label="手机号码：" prop="visitorPhone">
            <el-input v-model.number="form.visitorPhone" class="input-class"></el-input>
          </el-form-item>
          <el-form-item label="身份证号码：" prop="visitorCard">
            <el-input v-model="form.visitorCard" class="input-class"></el-input>
          </el-form-item>
          <el-form-item label="访问园区：" prop="parkId">
            <search type="park" show-name="parkName" :value="form.parkId" @change="changePark"></search>
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
          visitorName: '',
          visitorPhone: '',
          visitorCard: '',
          parkId: '',
          parkName: ''
        },
        rules: { // 必填字段校验
          parkId: [
            { required: true, message: '请输入访问园区', trigger: 'change' }
          ],
          visitorName: [
            { required: true, message: '请输入名字', trigger: 'blur' }
          ],
          visitorPhone: [
            { required: true, message: '请输入电话号码', trigger: 'blur' },
            { type: 'number', message: '请输入数字', trigger: 'blur' }
          ],
          visitorCard: [
            { required: true, message: '请输入身份证号码', trigger: 'blur' },
            {
              validator(rule, value, callback) {
                let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入正确的身份证号码'))
                }
              }, trigger: 'blur'
            }

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

</style>

