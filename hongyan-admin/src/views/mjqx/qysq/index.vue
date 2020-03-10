<template>
  <div class="p-10 bg-EFF2F7">
    <el-tabs type="border-card" v-model="activeName">
<!--      <el-tab-pane label="机构人员视角" name="jg">-->
<!--        <employee-view></employee-view>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="楼层视角" name="lc">-->
<!--        <floor-view></floor-view>-->
<!--      </el-tab-pane>-->
      <el-tab-pane label="权限新增" name="add">
        <add-view v-if="show" @reload="reload"></add-view>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import employeeView from './employeeView'
  import floorView from './floorView'
  import addView from './addView'
  export default {
    components: { employeeView, floorView, addView },
    data() {
      return {
        show: true,
        activeName: 'add'
      }
    },
    methods: {
      async reload() {
        this.activeName = 'jg'
        this.show = false
        await this.$nextTick()
        this.show = true
      }
    }
  }
</script>

<style scoped>

</style>
