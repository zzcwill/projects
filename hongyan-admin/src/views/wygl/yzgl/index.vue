<template>
  <div v-loading="loading" class="p-10 bg-EFF2F7">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="flex-center w-fit-content">
          <span class="w-130">业主名称:</span>
          <el-input v-model.trim="listQuery.ownerName" placeholder="请输入业主名称"></el-input>
        </div>
        <div class="flex-center w-fit-content m-l-10">
          <span class="w-130">业主电话:</span>
          <el-input v-model.trim="listQuery.ownerPhone" placeholder="请输入业主电话"></el-input>
        </div>
        <el-button type="primary" icon="el-icon-search" class="m-l-20" @click="handleFilter">搜索</el-button>
        <!-- <el-button type="primary" icon="el-icon-plus" class="m-l-20" @click="addItem">新增</el-button> -->
      </div>
      <div>
        <el-table
          :border="true"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="ownerName" label="业主姓名" min-width="120">
          </el-table-column>
          <el-table-column prop="ownerPhone" label="手机号" min-width="120">
          </el-table-column>
          <el-table-column prop="parkName" label="园区" min-width="120">
          </el-table-column>
          <el-table-column prop="buildingName" label="楼栋" min-width="80">
          </el-table-column>
          <el-table-column prop="floorName" label="楼层" min-width="80">
          </el-table-column>
          <!-- <el-table-column prop="unitName" label="单元" min-idth="180">
          </el-table-column> -->
          <el-table-column prop="areaName" label="房间" min-idth="80">
          </el-table-column>
          <el-table-column prop="roomSpace" label="使用面积" min-idth="80">
          </el-table-column>
          <el-table-column prop="stateName" label="状态" min-idth="80">
            <template>

            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <div slot-scope="scope">
              <el-button type="primary" size="mini" @click="toDetail(scope.row)">查看</el-button>
              <!-- <el-button type="danger" size="mini" @click="deleteItem(scope.row)">删除</el-button> -->
            </div>
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
    <!-- <Handle
      v-model="handleInfo"
      :list-info="treeData"
    /> -->
    <LookDetail v-model="info" @reflash="getList" />
  </div>
</template>

<script>
import { getList, del } from '@/api/wygl/yzgl'

export default {
  name: 'WyglYzgl',
  components: {
    // Handle: () => import('./Handle.vue'),
    LookDetail: () => import('./LookDetail.vue'),
  },
  data() {
    return {
      title: '',
      loading: false,
      total: 1,
      listQuery: {
        pageCurrent: 1,
        pageLimit: 20,
        ownerName: '',
        ownerPhone: '',
      },
      handleInfo: {
        visible: false,
        data: null,
      },
      info: { visible: false, data: {}},
      treeData: [],
      tableData: []
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
    toDetail(item) {
      this.info = {
        visible: true,
        data: { ...item }
        // data: {
        //   ownerName: '六级柱',
        //   ownerPhone: '18137802303',
        //   ownerOtherPhone: '18137802303',
        //   ownerIdNumber: '411524199305245136',
        //   companyId: '1',
        //   companyName: '米奥兰特',
        //   parkId: '2',
        //   parkName: '滨江嘉园',
        //   buildingId: '3',
        //   buildingName: '2撞',
        //   floorId: '4',
        //   floorName: '3楼',
        //   propertyCode: '1',
        //   propertyName: '住宅',
        //   areaId: '5',
        //   areaName: '办公区',
        //   isReal: '1',
        //   roomSpace: '33m',
        //   roomPrice: '33/ping',
        //   rentalMonth: 33,
        //   rentalYear: '33',
        //   startTime: '2019-02-33',
        //   endTime: '2013-33-33',
        //   stateCode: '3333',
        //   stateName: '33'
        // }
      }
    },
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
      this.loading = true
      getList(this.listQuery).then((data) => {
        this.loading = false
        if (data.code === 0) {
          // 页面数据
          this.tableData = data.data
          this.total = data.page.resultCount
        }
      }).catch(() => {
        this.loading = false
        this.total = 0
      })
    },
    // 新增
    addItem() {
      this.handleInfo = {
        visible: true,
        type: 'add',
        data: null,
      }
    },
    // 编辑
    editItem(obj) {
      this.handleInfo = {
        visible: true,
        type: 'edit',
        data: obj,
      }
    },
    // 删除
    deleteItem(obj) {
      let that = this
      this.$confirm('确认删除？', '提示', { type: 'warning' }).then(_ => {
          del({ id: obj.id }).then(res => {
            that.$message.success('删除成功')
            that.getList()
          })
      })
      .catch(_ => {})
    }
	},
}
</script>

<style lang="scss" scoped>

</style>

