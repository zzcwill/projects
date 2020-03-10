<template>
  <div>
    <el-container style="height: 100%;">
      <el-aside width="180px">
        <employee type="card" style="height: 100%;" :query-data="{type:'partner'}" @change="changeOrg"></employee>
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
  import employee from '@/components/tree'
  import qxList from './qxList'
  export default {
    components: { employee, qxList },
    methods: {
      changeOrg(item) {
        let data = item.data
        let param = {}
        if (data.orgId) {
          param = { playerId: item.value }
        } else if (data.partnerId) {
          param = { orgId: item.value }
        } else {
          param = { partnerId: item.value }
        }

        this.$refs.qxList.reload(param)
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
