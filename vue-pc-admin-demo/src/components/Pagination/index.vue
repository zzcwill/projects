<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      :total="total"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"  
      :page-sizes="pageSizes"          
      :layout="layout"
      :background="background"  
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"

      v-bind="$attrs"
      :hide-on-single-page="true"
      class="m-t-10 m-b-10 text-r"
    />
  </div>
</template>

<script>

export default {
  name: 'Pagination',
  props: {
    hidden: {
      type: Boolean,
      default: false
    },    
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination')
    },
    handleCurrentChange(val) {
      this.$emit('pagination')
    }
  }
}
</script>

<style scoped>
.pagination-container.hidden {
  display: none;
}
</style>
