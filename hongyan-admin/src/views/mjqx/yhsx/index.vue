<template>
  <div class="p-10 bg-EFF2F7">
    <el-tabs type="border-card">
      <el-tab-pane label="机构人员视角">
        <employee-view></employee-view>
      </el-tab-pane>
      <el-tab-pane label="楼层视角">
        <floor-view></floor-view>
      </el-tab-pane>
      <el-tab-pane label="权限新增">
        <add-view></add-view>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import employeeView from './employeeView'
  import floorView from './floorView'
  import addView from './addView'
  export default {
    components: { employeeView, floorView, addView }
  }
</script>

<style scoped>

</style>
