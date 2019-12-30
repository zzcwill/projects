<template>
  <div class="p-10 bg-EFF2F7">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-b-10">
        <div class="flex-center w-fit-content">
          <span class="w-140">巡检点名称：</span>
          <el-input v-model="name"></el-input>
        </div>
        <el-button size="medium" type="primary" icon="el-icon-search" class="m-l-20">搜索</el-button>
        <el-button size="medium" type="primary" icon="el-icon-plus" class="m-l-20" @click="addPoint">添加</el-button>
      </div>
      <div>
        <el-table
          :border="true"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="city" label="巡检点名称" min-width="120">
          </el-table-column>
          <el-table-column prop="date" label="设备编号" min-width="120">
          </el-table-column>
          <el-table-column prop="data" label="设备名称" min-width="120">
          </el-table-column>
          <el-table-column fiexd="right" label="操作" min-width="120">
            <div slot-scope="scope">
              <el-button size="mini" type="primary">详情</el-button>
              <el-button size="mini" type="primary" @click="editPoint(scope.row)">编辑</el-button>
            </div>
          </el-table-column>
        </el-table>
      </div>
      <div class="p-t-20 p-b-10 flex flex-j-end">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000"
        >
        </el-pagination>
      </div>
    </div>
    <Handle v-model="info" />
  </div>
</template>

<script>
// import { getInfo } from '@/api/user'

export default {
  name: 'XtglXtpz',
  components: {
    Handle: () => import('./Handle.vue'),
  },
  data() {
    return {
      name: '',
      tableData: Array.from({ length: 8 }).map( (item, index) => ({
        city: '巡检点' + index,
        date: Math.floor(Math.random() * 10000000000),
        data: '巡更设备' + index
      })),
      info: {
        visible: false,
        type: 'add',
        data: {}
      }
    }
  },
  created() {
  },
  mounted() {
	},
  destoryed() {
  },
  methods: {
    addPoint() {
      this.info = {
        visible: true,
        type: 'add',
        data: {},
      }
    },
    editPoint(item) {
      this.info = {
        visible: true,
        type: 'edit',
        data: item,
      }
    }
	},
}
</script>

<style lang="scss" scoped>

</style>

