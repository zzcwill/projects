<template>
  <div class="clgl-page" style="padding:30px;">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="flex-center w-fit-content">
          <span class="w-130">车位编号:</span>
          <el-input v-model="form.parkingCode" placeholder="请输入车位编号"></el-input>
        </div>
        <el-button type="primary" icon="el-icon-search" class="m-l-20" @click="doQuery">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" class="m-l-20" @click="show('add')">新增</el-button>
      </div>
      <div>
        <el-table
          border
          :data="list"
          tooltip-effect="dark"
        >
          <el-table-column prop="parkingCode" label="停车位编号牌"></el-table-column>
          <el-table-column prop="parkingTypeName" label="车位类型"></el-table-column>
          <el-table-column prop="parkName" label="所在区域"></el-table-column>
          <el-table-column label="状态">
            <div slot-scope="scope">
              <span v-if="scope.row.statusCode=== '1'" style="color: green">使用中</span>
              <span v-else-if="scope.row.statusCode=== '2'" style="color: red">维修中</span>
              <span v-else-if="scope.row.statusCode=== '3'" style="color: blue">计划中</span>
            </div>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <div slot-scope="scope">
              <el-button type="text" size="mini" @click="show('view',scope.row.id)">查看</el-button>
              <el-button type="text" size="mini" @click="show('edit',scope.row.id)">修改</el-button>
              <el-button type="text" size="mini" @click="del(scope.row.id)">删除</el-button>
            </div>
          </el-table-column>
        </el-table>
        <div class="p-t-20 p-b-10 flex flex-j-end">
          <el-pagination
            :current-page.sync="form.pageCurrent"
            :page-sizes="[10,20,30,50]"
            :page-size.sync="form.pageLimit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="form.resultCount"
            @size-change="query"
            @current-change="query"
          >
          </el-pagination>
        </div>
      </div>
      <div v-if="showDetail">
        <el-dialog
          :visible.sync="showDetail"
          width="80%"
        >
          <tcwxx-edit :id="showId" :type="showType" @save="saveSuccess"></tcwxx-edit>
        </el-dialog>
      </div>

    </div>
  </div>
</template>

<script>
  import tcwxxEdit from './tcwxx-edit'
  import { queryParkingList, deleteParkingDetail } from '@/api/tcgl/tcgl-request'

  export default {
    components: { tcwxxEdit },
    data() {
      return {
        form: {
          parkingCode: '',
          pageCurrent: 1,
          pageLimit: 10,
          resultCount: 0
        },
        typeOptions: {
          '1': '小',
          '2': '中',
          '3': '大',
        },
        list: [],
        id: '',
        showDetail: false, // 控制新增窗口弹出
        showType: '',
        showId: ''
      }
    },
    created() {
      this.query()
    },
    methods: {
      doQuery() {
        this.form.pageCurrent = 1
        this.query()
      },
      show(type, id) {
        this.showType = type
        this.showId = id
        this.showDetail = true
      },
      query() {
        queryParkingList(this.form).then(res => {
          this.list = res.data
          this.form.resultCount = res.page.resultCount
        }).catch(err => {
          this.$message.error(err)
        })
      },
      saveSuccess() {
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
        this.showDetail = false
        this.query()
      },
      del(val) {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'btn-custom-cancel',
          type: 'warning'
        }).then(() => {
          let params = {
            id: val
          }
          deleteParkingDetail(params).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.query()
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            this.$message.error(err)
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>

