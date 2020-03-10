<template>
  <div v-loading="listLoading" class="p-10 bg-EFF2F7 flex border-box">
    <SideTree :tree-data="treeData" :list-arr.sync="listArr" :expanded="defaultArr" />
    <div class="w-10" />
    <div class="p-10 bg-white brs-4 def-shadow border-box flex1 overflow-auto">
      <el-breadcrumb separator="/" class="p-t-5">
        <el-breadcrumb-item v-for="(item, index) in listArr" :key="index">{{ item.label }}</el-breadcrumb-item>
        <el-breadcrumb-item>房间管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="flex p-t-10 p-b-10">
        <el-button type="primary" icon="el-icon-plus" class="m-l-20" @click="addItem">新增房间</el-button>
      </div>
      <div>
        <el-table
          :border="true"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="roomCode" label="房间编号" min-width="120">
          </el-table-column>
          <el-table-column prop="roomName" label="房间名称" min-width="120">
          </el-table-column>
          <el-table-column prop="apartmentName" label="户型名称" min-width="120">
          </el-table-column>
          <el-table-column prop="apartmentTypeName" label="户型分类" min-width="120">
          </el-table-column>
          <el-table-column prop="parkName" label="园区" min-width="80">
          </el-table-column>
          <el-table-column prop="buildingName" label="楼栋" min-width="80">
          </el-table-column>
          <el-table-column prop="floorName" label="楼层" min-idth="80">
          </el-table-column>
          <el-table-column prop="unitName" label="单元" min-idth="80">
          </el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <div slot-scope="scope">
              <el-button type="primary" size="mini" @click="editItem(scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" @click="deleteItem(scope.row)">删除</el-button>
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
    
    <Handle
      v-model="handleInfo"
      :list-info="treeData"
      :floor-info="floorMap"
      :unit-info="unitMap"
      @reflash="getList"
    />
  </div>
</template>

<script>
import { getFloorList, getList, del } from '@/api/wygl/fjgl'

export default {
  name: 'WyglFjxx',
  components: {
    Handle: () => import('./Handle.vue'),
    SideTree: () => import('@/components/public/sideTree.vue'),
  },
  data() {
    return {
      title: '',
      listLoading: false,
      total: 1,
      listQuery: {
        pageCurrent: 1,
        pageLimit: 20,
        unitId: '',
        parkId: '',
        buildingId: '',
      },
      handleInfo: {
        visible: false,
        data: null,
      },
      tableData: [],
      // 楼层树
      floorMap: [],
      unitMap: [],
      // 模拟树状图数据
      treeData: [],
      // 选中层级
      listArr: [],
      defaultArr: []
    }
  },
   watch: {
    listArr: {
      handler(val) {
        this.listQuery.parkId = val[0].id
        this.listQuery.buildingId = val[val.length - 2].id
        console.log(val)
        this.listQuery.unitId = val[val.length - 1].id
        this.listQuery.pageCurrent = 1
        this.getList()
        // this.getUnitListItem()
        // this.getFloorListItem()
      }
    }
  },
  created() {
    this.getFloorList()
    // this.getListParkFloor()
  },
  mounted() {
	},
  destoryed() {
  },
  methods: {
   
    // 获取房间
    getFloorList() {
      // this.listLoading = true
      getFloorList().then((data) => {
        // this.listLoading = false
        if (data.code === 0) {
          let result = []
          data.data && data.data.forEach((item) => {
            if (!item.buildingUnitDtos) { return }
            let obj = {
              id: item.parkId,
              label: item.parkName,
              children: []
            }
            item.buildingUnitDtos && item.buildingUnitDtos.forEach((ele) => {
              let opt = {
                id: ele.buildId,
                label: ele.buildName,
                children: []
              }
              ele.unitDBOS && ele.unitDBOS.forEach(par => {
                opt.children.push({
                  id: par.id,
                  label: par.unitName
                })
              })
              opt.children.length === 0 && delete opt.children
              obj.children.push(opt)
            })
            obj.children.length === 0 && delete obj.children
            result.push(obj)
          })
          this.treeData = result
          this.listQuery.parkId = this.treeData[0].id
          this.listQuery.buildingId = this.treeData[0].children[0].id
          this.listQuery.unitId = this.treeData[0].children[0].children[0].id
          this.listArr = [this.treeData[0], this.treeData[0].children[0], this.treeData[0].children[0].children[0]]
          this.defaultArr.push(this.listQuery.unitId)
          this.getList()
        } else {
          throw new Error()
        }
      }).catch(() => {
        this.listLoading = false
        this.treeData = []
      })
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
      this.listLoading = true
      delete this.listQuery.parkId
      delete this.listQuery.buildingId
      getList(this.listQuery).then(data => {
        this.listLoading = false
        if (data.code === 0) {
          // 页面数据
          this.tableData = data.data
          this.total = data.page.resultCount
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    // 新增
    addItem() {
      this.handleInfo = {
        visible: true,
        type: 'add',
        data: { parkId: this.listArr[0].id, parkName: this.listArr[0].label, buildingId: this.listArr[1].id, buildingName: this.listArr[1].label },
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
            console.log(res)
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

