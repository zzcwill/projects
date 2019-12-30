<template>
  <div class="p-10 bg-EFF2F7">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="flex-center w-fit-content">
          <span class="w-130">终端名称:</span>
          <el-input v-model="form.terminalName" placeholder="请输入终端名称"></el-input>
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
          <el-table-column prop="terminalNo" label="终端编号"></el-table-column>
          <el-table-column prop="terminalName" label="终端名称"></el-table-column>
          <el-table-column prop="partnerName" label="所属企业"></el-table-column>
          <el-table-column prop="terminalTypeName" label="终端类型"></el-table-column>
          <el-table-column prop="terminalModel" label="终端型号"></el-table-column>
          <el-table-column prop="areaName" label="安装区域">
            <div slot-scope="scope">
              {{`${scope.row.parkName}/${scope.row.buildingName}/${scope.row.floorName}/${scope.row.areaName}`}}
            </div>
          </el-table-column>
          <el-table-column prop="terminalStatesName" label="终端状态"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <div slot-scope="scope">
<!--              <el-button type="text" size="mini" @click="show('edit',scope.row.id)">编辑</el-button>-->
              <el-button type="text" size="mini" @click="del(scope.row.id)">删除</el-button>
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
      >
        <edit :id="showId" :type="showType" @save="save"></edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { listTerminalMachine, delTerminalMachine } from '@/api/shgl/sbdj'
  import edit from './edit'
  export default {
    components: { edit },
    data() {
      return {
        showAdd: false,
        showType: '',
        showId: '',
        list: [],
        form: {
          terminalName: '',
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
        this.showType = type
        this.showId = id
        this.showAdd = true
      },
      query() {
        listTerminalMachine(this.form).then(res => {
          this.list = res.data
          this.form.resultCount = res.page.resultCount
        }).catch(err => {
          this.$message.error(err)
        })
      },
      del(id) {
        delTerminalMachine({ id: id }).then(res => {
          this.query()
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

