<template>
  <div>
    <div style="margin-left: 10px;padding-bottom: 20px;">
      <el-button type="text" @click="showAdd = true">添加用户</el-button>
    </div>
    <el-tag
      v-for="tag in employees"
      :key="tag.id"
      size="medium"
      closable
      @close="removeEmployee(tag)"
    >
      {{ tag.nickName }}
    </el-tag>

    <div v-if="showAdd">
      <el-dialog
        title="员工"
        :visible.sync="showAdd"
        width="50%"
      >
        <employee
          ref="employee"
          type="employee"
          show-checkbox
        >
        </employee>
        <div style="text-align: right;margin: 10px;">
          <el-button type="primary" @click="selectEmployee">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import employee from '@/components/tree'
  export default {
    components: { employee },
    data() {
      return {
        showAdd: false,
        count: 1,
        props: {
          label: 'name',
          children: 'zones'
        },
        employees: []
      }
    },
    methods: {
      removeEmployee(item) {
        this.employees.splice(this.employees.indexOf(item), 1)
        this.$emit('change', this.employees)
      },
      selectEmployee() {
        let nodes = this.$refs.employee.getCheckedNodes()
        nodes.forEach(item => {
          if (item && item.type === '3') {
            this.employees.push(item.data)
          }
        })
        this.$emit('change', this.employees)
        this.showAdd = false
      }
    }
  }
</script>

<style scoped>
  .el-tag--medium {
    margin-left: 10px;
    height: 38px;
    line-height: 36px;
    padding-top: 0;
    padding-bottom: 0;
  }
</style>
