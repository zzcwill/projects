<template>
  <el-select
    v-model="value"
    multiple
    filterable
    remote
    reserve-keyword
    :remote-method="remoteMethod"
    placeholder="请选择巡检点"
    class="w-100"
    @change="change"
  >
    <el-option
      v-for="(item, index) in options"
      :key="index"
      :label="item.terminalName"
      :value="item.terminalNo"
    >
    </el-option>
  </el-select>
</template>
<script>
// 巡检点选择
import { apiGETLIST } from '@/api/dzxg/xjfa.js'
export default {
  name: 'PlantSelect',
  props: {
    result: {
      type: Array,
      default: () => ({})
    }
  },
  data() {
    return {
      options: [],
      value: [],
      timmer: null,
      first: false,
    }
  },
  watch: {
    result: {
      handler(val) {
        let arr = []
        Array.isArray(val) && val.forEach(item => {
          arr.push(item.keepCardNo)
        })
        this.value = arr
      },
      deep: true,
      immediate: true,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 搜索巡检点
    remoteMethod(str) {
      this.getList(str)
    },
    // 获取所有巡检点
    getList(val) {
      let params = {
        terminalName: val,
        pageCurrent: 1,
        pageLimit: 100,
      }
      apiGETLIST(params).then((data) => {
        if (data.code === 0) {
          this.options = data.data || []
        }
      })
    },
    change(val) {
      let arr = this.options.filter(item => val.includes(item.terminalNo))
      // 映射对应数据
      arr.forEach((item, index) => {
        arr[index] = {
          ...item,
          keepCardId: item.id,
          keepCardNo: item.terminalNo,
          keepCardName: item.terminalName,
        }
      })
      this.$emit('update:result', arr)
    }
  }
}
</script>