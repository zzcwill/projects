<template>
  <el-cascader
    v-if="isRouterShow"
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
      leaf: {
        type: Number,
        default: 10
      },
      queryData: {
        type: Object
      }
    },
    data() {
      return {
        isRouterShow: true,
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
      async reload() {
        this.isRouterShow = false
        await this.$nextTick()
        this.isRouterShow = true
        console.log(11)
      },
      changeValue(value) {
        let nodes = this.$refs.cascader.getCheckedNodes()
        this.getValue(nodes[0])
        this.$emit('change', this.nodeValue)
        console.log(this.$refs.cascader)
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
          let list = []
          if (res.data && this.leaf === level) {
            res.data.forEach(item => {
              list.push({
                value: item.value,
                label: item.label,
                leaf: true
              })
            })
          } else {
            list = res.data
          }
          resolve(list)
        }).catch(err => {
          this.$message.error(err)
        })
      }
    }
  }
</script>

<style scoped>

</style>
