<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="130px" :rules="rules" :disabled="isView">
      <el-form-item label="策略名称:" prop="strategyName">
        <el-input v-model="form.strategyName"></el-input>
      </el-form-item>
      <el-form-item label="策略编号:" prop="strategyCode">
        <el-input v-model="form.strategyCode"></el-input>
      </el-form-item>
      <el-form-item v-if="showSearch || type==='add'" label="策略分组:" prop="groupId">
        <search
          type="dsgroup"
          show-name="groupName"
          :value="form.groupId"
          @change="changeGroup"
        >
        </search>
      </el-form-item>

      <el-form-item label="适用季节:" prop="season">
        <el-radio-group v-model="form.season">
          <el-radio-button label="春">春</el-radio-button>
          <el-radio-button label="夏">夏</el-radio-button>
          <el-radio-button label="秋">秋</el-radio-button>
          <el-radio-button label="冬">冬</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="策略描述:" prop="content">
        <el-input v-model="form.content"></el-input>
      </el-form-item>

      <el-form-item label="温度:" prop="temperature">
        <el-radio-group v-model="form.temperature">
          <el-radio-button label="1">偏凉</el-radio-button>
          <el-radio-button label="2">舒适</el-radio-button>
          <el-radio-button label="3">偏暖</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="湿度:" prop="humidity">
        <el-radio-group v-model="form.humidity">
          <el-radio-button label="1">偏干</el-radio-button>
          <el-radio-button label="2">标准</el-radio-button>
          <el-radio-button label="3">偏湿</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="亮度:" prop="luminance">
        <el-radio-group v-model="form.luminance">
          <el-radio-button label="1">弱光</el-radio-button>
          <el-radio-button label="2">标准</el-radio-button>
          <el-radio-button label="3">强光</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="时间:" prop="startTime">
        <el-radio-group v-model="form.startTime">
          <el-radio-button label="1">上午</el-radio-button>
          <el-radio-button label="2">下午</el-radio-button>
          <el-radio-button label="3">夜间</el-radio-button>
          <el-radio-button label="4">全天</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="状态:" prop="stateCode">
        <el-select v-model="form.stateCode">
          <el-option
            v-for="item of Object.keys(stateOption)"
            :key="item"
            :value="item"
            :label="stateOption[item]"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div v-if="!isView" style="text-align: right">
      <el-button type="primary" @click="edit">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { infoDsAmbient, addDsAmbient, editDsAmbient } from '@/api/sbgl/hkcl'
  import search from '@/components/search'
  export default {
    components: { search },
    props: {
      type: String,
      id: String
    },
    data() {
      return {
        showSearch: false,
        stateOption: {
          '1': '有效',
          '2': '无效'
        },
        form: {
          strategyName: '',
          strategyCode: '',
          groupId: '',
          season: '',
          content: '',
          temperature: '2',
          humidity: '2',
          luminance: '2',
          startTime: '',
          stateCode: '1'
        },
        rules: {
          strategyName: [
            { required: true, message: '请输入策略名称', trigger: 'blur' }
          ],
          strategyCode: [
            { required: true, message: '请输入策略编号', trigger: 'blur' }
          ],
          groupId: [
            { required: true, message: '请选择策略组', trigger: ['blur', 'change'] }
          ],
          season: [
            { required: true, message: '请选择试用季节', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入策略描述', trigger: 'blur' }
          ],
          temperature: [
            { required: true, message: '请选择温度', trigger: ['blur', 'change'] }
          ],
          humidity: [
            { required: true, message: '请选择湿度', trigger: ['blur', 'change'] }
          ],
          luminance: [
            { required: true, message: '请选择亮度', trigger: ['blur', 'change'] }
          ],
          startTime: [
            { required: true, message: '请选择时间', trigger: ['blur', 'change'] }
          ],
          stateCode: [
            { required: true, message: '请选择状态', trigger: ['blur', 'change'] }
          ],
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
      changeGroup(item) {
        this.form.groupId = item.id
        this.form.groupName = item.groupName
        this.form.parkId = item.parkId
        this.form.parkName = item.parkName
      },
      query() {
        infoDsAmbient({ id: this.id }).then(res => {
          this.form = res.data
          this.showSearch = true
        })
      },
      edit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.form.stateName = this.stateOption[this.form.stateCode]
            if (this.type === 'add') {
              addDsAmbient(this.form).then(res => {
                this.$emit('save')
              })
            } else {
              editDsAmbient(this.form).then(res => {
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
    width: 230px;
  }
  .el-autocomplete {
    width: 230px;
  }
  .el-select {
    width: 230px;
  }
  .el-cascader {
    width: 230px;
  }
  .el-radio-group{
    width: 230px;
  }
</style>
