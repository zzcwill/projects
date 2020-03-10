<template>
  <div>
    <div class="radio-item">
      <el-radio v-model="radio" label="1">有</el-radio>
      <el-radio v-model="radio" label="2">无</el-radio>
    </div>
    <div v-if="radio==='1'">
      <search :type="type" :show-name="showName" :value-name="valueName" :value="value"
              @change="changeParking" style="width: 100px"></search>
      <el-input placeholder="设备型号" :disabled="disabled" style="width: 100px" :value="terminalName"></el-input>
    </div>
  </div>
</template>

<script>
  import search from '@/components/search'

  export default {
    components: { search },
    props: {
      type: String,
      showName: String,
      valueName: String,
      value: String,
      id: String,
      radio: {
        type: String,
        default: '1'
      }
    },
    data() {
      return {
        terminalName: '',
        title: '设备编号：',
        disabled: true
      }
    },
    computed: {},
    watch: {
      radio: {
        handler(val) {
          if (this.radio === '1') {
            this.$emit('detail', 'Y')
          } else {
            this.terminalName = ''
            this.$emit('detail', 'N')
          }
        }
      }
    },
    created() {
    },
    methods: {
      changeParking(val) {
        this.terminalName = val.terminalName
        this.$emit('change', val)
      }
    }
  }
</script>

<style scoped>
  .radio-item {
    width: 200px;
  }

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

