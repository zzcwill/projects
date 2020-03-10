<template>
  <div>
    <el-container style="height: 100%;">
      <el-aside width="180px">
        <floor type="park" style="height: 100%;" @change="changePark"></floor>
      </el-aside>
      <el-main>
        <el-container style="height: 100%;">
          <el-aside width="20px">
            <el-divider direction="vertical"></el-divider>
          </el-aside>
          <el-main>
            <qx-list ref="qxList"></qx-list>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import floor from '@/components/tree'
  import qxList from './qxList'
  export default {
    components: { floor, qxList },
    methods: {
      changePark(item) {
        if (item.leaf) {
          let param = { floorId: item.value }
          this.$refs.qxList.reload(param)
        }
      }
    }
  }
</script>

<style scoped>
  .el-divider--vertical {
    height: 100%;
  }
  .el-main{
    padding: 0;
  }
</style>
