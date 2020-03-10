<template>
  <div class="p-10 bg-EFF2F7">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="flex-center w-fit-content">
          <span class="w-130">故障名称:</span>
          <el-input v-model="form.faultName" placeholder="请输入故障名称"></el-input>
        </div>
        <el-button type="primary" icon="el-icon-search" class="m-l-20" @click="doQuery">搜索</el-button>
        <!--        <el-button type="primary" icon="el-icon-plus" class="m-l-20" @click="show('add')">新增</el-button>-->
      </div>
      <div>
        <el-table
          border
          :data="list"
          tooltip-effect="dark"
        >
          <el-table-column prop="faultCode" label="故障编号"></el-table-column>
          <el-table-column prop="faultName" label="故障名称"></el-table-column>
          <el-table-column prop="deviceCode" label="设备编号"></el-table-column>
          <el-table-column label="设备安装区域">
            <div slot-scope="scope">
              {{ `${scope.row.parkName}/${scope.row.buildingName}/${scope.row.floorName}/${scope.row.areaName}` }}
            </div>
          </el-table-column>
          <el-table-column prop="level" label="故障级别"></el-table-column>
          <el-table-column prop="stateName" label="维修状态"></el-table-column>
          <el-table-column prop="createTime" label="报警时间"></el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <div slot-scope="scope">
              <el-button type="text" size="mini" @click="show('view',scope.row.id)">查看</el-button>
              <el-button v-if="scope.row.stateCode==='1'" type="text" size="mini" @click="show('edit',scope.row.id)">维修</el-button>
            </div>
          </el-table-column>
        </el-table>
      </div>
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

    <div v-if="showAdd">
      <el-dialog
        :visible.sync="showAdd"
        width="80%"
        :title="dialogTitle"
      >
        <edit :id="showId" :type="showType" @save="save"></edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { listDeviceFault } from '@/api/sbgl/gzbj'
  import edit from './edit'
  export default {
    components: { edit },
    data() {
      return {
        dialogTitle: '',
        showAdd: false,
        showType: '',
        showId: '',
        list: [],
        form: {
          faultName: '',
          pageCurrent: 1,
          pageLimit: 10,
          resultCount: 0
        }
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
        if (type === 'add') {
          this.dialogTitle = '新增'
        } else if (type === 'view') {
          this.dialogTitle = '查看'
        } else {
          this.dialogTitle = '编辑'
        }
        this.showType = type
        this.showId = id
        this.showAdd = true
      },
      query() {
        listDeviceFault(this.form).then(res => {
          this.list = res.data
          this.form.resultCount = res.page.resultCount
        }).catch(err => {
          this.$message.error(err)
        })
      },
      save() {
        this.showAdd = false
        this.query()
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

