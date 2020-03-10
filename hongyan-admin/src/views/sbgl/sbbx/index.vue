<template>
  <div v-loading="loading" class="p-10 bg-EFF2F7">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-b-10">
        <div class="flex-center w-fit-content">
          <span class="w-90">提交时间：</span>
          <el-date-picker
            v-model="listQuery.dateTime"
            :picker-options="timeOptions"
            style="width:400px;"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
          <span class="m-l-20">状态：</span>
          <el-select v-model="listQuery.stateCode" clearable placeholder="请选择">
            <el-option
              v-for="(item, index) in $store.state.reflex.repairType"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <el-button type="primary" icon="el-icon-search" class="m-l-20" @click="handleFilter">搜索</el-button>
      </div>
      <div>
        <el-table
          :border="true"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="city" label="故障位置" min-width="120">
            <div slot-scope="scope">{{ scope.row.parkName }} {{ scope.row.buildingName }} {{ scope.row.floorName }} {{ scope.row.areaName }}</div>
          </el-table-column>
          <el-table-column prop="content" label="情况描述" min-width="120">
          </el-table-column>
          <el-table-column prop="deviceCode" label="设备信息" min-width="120">
            <div slot-scope="scope"> 设备编码: {{ scope.row.deviceCode }} </div>
          </el-table-column>
          <el-table-column prop="faultCreateTime" label="报修时间" min-width="120">
          </el-table-column>
          <el-table-column prop="creatorName" label="报修人员" min-width="120">
          </el-table-column>
          <el-table-column prop="contactName" label="维修人员" min-width="120">
          </el-table-column>
          <el-table-column prop="stateName" label="处理结果" min-width="120">
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="120">
            <el-button slot-scope="scope" @click="toDetail(scope.row)">详情</el-button>
          </el-table-column>
        </el-table>
      </div>
      <div class="p-t-20 p-b-10 flex flex-j-end">
        <el-pagination
          :current-page.sync="listQuery.pageCurrent"
          :page-sizes="[10,20,30, 50]"
          :page-size="listQuery.pageLimit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
    <RepairDetail v-model="info" />
  </div>
</template>

<script>
import { getList } from '@/api/sbgl/sbbx'

export default {
  name: 'SbglSbbx',
  components: {
    RepairDetail: () => import('./RepairDetail.vue'),
  },
  data() {
    return {
      state: '0',
      loading: false,
      total: 1,
      listQuery: {
        dateTime: [],
        stateCode: '',
        pageCurrent: 1,
        pageLimit: 20,
      },
      info: {
        visible: false,
        data: {},
      },
      tableData: [],
      timeOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
    }
  },
  created() {
  },
  mounted() {
    this.getList()
	},
  destoryed() {
  },
  methods: {
    // 条件搜索
    handleFilter() {
      this.getList()
    },
    // 切换每页显示条数
    handleSizeChange(val) {
      this.listQuery.pageLimit = val
      this.getList()
    },
    // 切换当前第几页
    handleCurrentChange(val) {
      this.listQuery.pageCurrent = val
      this.getList()
    },
    // 获取列表
    getList() {
      let params
      if (this.listQuery.dateTime && this.listQuery.dateTime.length) {
        params = Object.assign({}, this.listQuery, { startTime: this.listQuery.dateTime[0] }, { endTime: this.listQuery.dateTime[1] })
      } else {
        params = Object.assign({}, this.listQuery)
      }
      delete params.dateTime
      this.loading = true 
      getList(params).then((data) => {
        this.loading = false
        if (data.code === 0) {
          console.log(data.data)
          // 页面数据
          this.tableData = data.data
          this.total = data.page.resultCount
        }
      }).catch(() => {
        this.loading = false
        this.total = 0
      })
    },
    // // 删除
    // deleteItem(obj) {
    //   let that = this
    //   this.$confirm('确认删除？', '提示', { type: 'warning' }).then(_ => {
    //       del({ id: obj.id }).then(res => {
    //         that.$message.success('删除成功')
    //         that.getList()
    //       })
    //   })
    //   .catch(_ => {})
    // },
    toDetail(item) {
      this.info = {
        visible: true,
        data: item,
      }
    }
	},
}
</script>

<style lang="scss" scoped>

</style>

