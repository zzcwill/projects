<template>
  <div>
    <el-tree
      ref="tree"
      :props="props"
      :load="loadNode"
      lazy
      accordion
      :show-checkbox="showCheckbox"
      @node-click="handleCheckChange"
    >
    </el-tree>
  </div>
</template>

<script>
  import { cascader } from '@/api/commonApi'
  export default {
    props: {
      type: String,
      showCheckbox: {
        type: Boolean,
        default: false
      },
      queryData: Object
    },
    data() {
      return {
        nodeData: {},
        props: {
          label: 'label',
          children: 'zones',
          isLeaf: 'leaf'
        }
      }
    },
    methods: {
      getCheckedNodes() {
        let value = this.$refs.tree.getCheckedNodes()
        let result = []
        if (value) {
          value.forEach(item => {
            result.push(this.nodeData[item.value])
          })
        }
        return result
      },
      handleCheckChange(item) {
        this.$emit('change', item)
      },
      loadNode(node, resolve) {
        let param = { level: node.level }
        if (node.data) {
          param.value = node.data.value
        }

        Object.assign(param, this.queryData)
        cascader(this.type, param).then(res => {
          if (res.data) {
            res.data.forEach(item => {
              this.nodeData[item.value] = item
            })
            resolve(res.data)
          } else {
            resolve([])
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
