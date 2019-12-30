<template>
  <div class="tree-container bg-white brs-4 def-shadow border-box overflow-auto p-t-10 p-b-10">
    <div class="w-fit-content" style="min-width: 100%;">
      <el-tree 
        :data="treeData" 
        :props="defaultProps" 
        @node-click="handleNodeClick" 
        node-key="id"
        :indent="5"
        highlight-current
        :default-expanded-keys="expanded"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'PublicSideTree',
  props: {
    treeData: {
      type: Array,
      default: () => ({})
    },
    listArr: {
      type: Array,
      dfault: () => ([])
    },
    expanded: {
      type: Array,
      dfault: () => ([])
    }
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      if (!data.children || !data.children.length) {
        let list = this.parseList(this._.cloneDeep(this.treeData), data.id)
        this.$emit('update:listArr', list)
      }
    },
    parseList (arr, id) {
      let list = [];
      let resolve = false;
      // 循环暂时只写三层
      for (let i = 0; i < arr.length; i++) {
        if (resolve) break;
        let item = arr[i];
        list[0] = item;
        if (item.id === id) {
          resolve = true;
          list = [list[0]];
          break;
        } else if (item.children && item.children.length) {
          for (let j = 0; j < item.children.length; j++) {
            if (resolve) break;
            let ele = item.children[j];
            list[1] = ele;
            if (ele.id === id) {
              resolve = true;
              list = [list[0], list[1]];
              break;
            } else if (ele.children && ele.children.length) {
              if (resolve) break;
              for (let k = 0; k < ele.children.length; k++) {
                let opt = ele.children[k];
                list[2] = opt;
                if (opt.id === id) {
                  resolve = true;
                  break;
                }
              }
            }
          }
        }
      }
      if (!resolve) {
        list = [];
      }
      console.log(list)
      return list;
    },
  }
}
</script>
<style lang="scss" scoped>
.tree-container {
  width: 200px;
}
</style>
