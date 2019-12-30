<template>
  <el-cascader
    v-model="showValue"
    ref="cascader"
    :props="props"
    :disabled="disabled"
    @change="changeValue">
  </el-cascader>
</template>

<script>
  import { cascader } from '@/api/commonApi'
  export default {
    props: {
      type: String,
      value: Array,
      disabled: Boolean,
      queryData: {
        type: Object
      }
    },
    data() {
      return {
        showValue: [],
        props: {
          lazy: true,
          lazyLoad: this.lazyLoad
        },
        nodeValue: []
      }
    },
    created() {
      if (this.value) {
        this.showValue = this.value
      }
    },
    methods: {
      changeValue(value) {
        let nodes = this.$refs.cascader.getCheckedNodes()
        this.getValue(nodes[0])
        this.$emit('change', this.nodeValue)
      },
      getValue(nodes) {
        this.nodeValue[nodes.level - 1] = nodes
        if (nodes.parent) {
          this.getValue(nodes.parent)
        }
      },
      lazyLoad(node, resolve) {
        const { level, value } = node
        let queryData = Object.assign({ level: level, value: value }, this.queryData)
        cascader(this.type, queryData).then(res => {
          resolve(res.data)
        }).catch(err => {
          this.$message.error(err)
        })
      }
    }
  }
</script>

<style scoped>

</style>
