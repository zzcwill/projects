<template>
  <el-select
    v-model="value" 
    filterable
    remote
    reserve-keyword
    :remote-method="getList"
    :placeholder="placeholder"
    class="w-100"
    @change="change"
  >
    <el-option
      v-for="item in options"
      :key="item.userCode"
      :label="item.nickName"
      :value="item.userCode"
    >
    </el-option>
  </el-select>
</template>
<script>
/**
 * 全员中选择成员
 */
import { apiGETEMPLOY } from '@/api/dzxg/xjfa.js'
export default {
  name: 'SelectPeopleAll',
  props: {
    placeholder: {
      type: String,
      default: '请选择巡更人'
    },
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      value: '',
      options: [],
    }
  },
  watch: {
    id: {
      handler(val) {
        this.value = val
      },
      deep: true,
      immediate: true,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(val = '') {
      let params = {
        nickName: val,
        pageCurrent: 1,
        pageLimit: 100,
      }
      apiGETEMPLOY(params).then((data) => {
        if (data.code === 0) {
          this.options = data.data
        }
      })
    },
    change(val) {
      let obj = this.options.find(item => item.userCode === val) || {}
      this.$emit('update:id', val)
      this.$emit('update:name', obj.nickName)
    }
  }
}
</script>
