<template>
  <div v-loading="loading" class="p-10 bg-EFF2F7 flex border-box">
    <SideTree :tree-data="treeData" :list-arr.sync="listArr" :expanded="defaultArr" />
    <div class="w-10" />
    <div class="p-10 bg-white brs-4 def-shadow border-box flex1 overflow-auto">
      <el-breadcrumb separator="/" class="p-t-5">
        <el-breadcrumb-item v-for="(item, index) in listArr" :key="index">{{ item.label }}</el-breadcrumb-item>
        <el-breadcrumb-item>单元管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="flex p-t-10 p-b-10">
        <el-button type="primary" size="small" icon="el-icon-plus" class="m-l-0" @click="addItem">新增单元</el-button>
      </div>
      <div>
        <el-table
          :border="true"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="unitCode" label="单元名称" min-width="80">
          </el-table-column>
          <el-table-column prop="unitName" label="单元名称" min-width="60">
          </el-table-column>
          <el-table-column prop="parkName" label="所属园区" min-width="60">
          </el-table-column>
          <el-table-column prop="buildingName" label="所属楼栋" min-width="60">
          </el-table-column>
          <el-table-column label="操作" width="160" fixed="right">
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
      @reflash="getUnitList"
    />
  </div>
</template>

<script>
import { getFloorList, getUnitListApi, delFloorList } from '@/api/wygl/dyxx'
export default {
  name: 'WyglDyxx',
  components: {
    Handle: () => import('./Handle.vue'),
    SideTree: () => import('@/components/public/sideTree.vue'),
  },
  data() {
    return {
      loading: false,
      total: 0,
      listQuery: {
        pageCurrent: 1,
        pageLimit: 20,
        buildingId: '',
      },
      handleInfo: {
        visible: false,
        data: null,
      },
      tableData: [],
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
        this.listQuery.buildingId = val[val.length - 1].id
        this.getUnitList()
      }
    }
  },
  created() {
    this.getFloorList()
    // this.getUnitList()
  },
  mounted() {
	},
  destoryed() {
  },
  methods: {
    // 获取每个小区的单元列表
    getFloorList() {
       this.loading = true
      getFloorList().then((data) => {
         this.loading = false
        if (data.code === 0) {
          let result = []
          data.data && data.data.forEach((item) => {
            let obj = {
              id: item.parkId,
              label: item.parkName,
              children: []
            }
            item.buildingList && item.buildingList.forEach((ele) => {
              let opt = {
                id: ele.id,
                label: ele.buildingName,
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
          this.listQuery.buildingId = this.treeData[0].children[0].id
          this.listArr = [this.treeData[0], this.treeData[0].children[0]]
          this.defaultArr.push(this.listQuery.buildingId)
          this.getUnitList()
        } else {
          throw new Error()
        }
      }).catch(() => {
         this.loading = false
        this.treeData = []
      })
    },
    // 获取楼栋信息
    getUnitList() {
      this.loading = true
      getUnitListApi(this.listQuery).then((data) => {
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
    // 条件搜索
    handleFilter() {
      this.getUnitList()
    },
    // 切换每页显示条数
    handleSizeChange(val) {
      this.listQuery.pageLimit = val
      this.getUnitList()
    },
    // 切换当前第几页
    handleCurrentChange(val) {
      this.listQuery.pageCurrent = val
      this.getUnitList()
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
          delFloorList({ id: obj.id }).then(res => {
            console.log(res)
            that.$message.success('删除成功')
            that.getUnitList()
          })
      })
      .catch(_ => {})
    },
    // 树形组件节点点击事件
    treeClick(val) {
      console.log(val)
    }
	},
}
</script>

<style lang="scss" scoped>

</style>

