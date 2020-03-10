<template>
  <div>
    <el-table
      border
      :data="list"
      tooltip-effect="dark"
    >
      <el-table-column prop="parkName" label="所属园区"></el-table-column>
      <el-table-column prop="buildingName" label="所属楼栋"></el-table-column>
      <el-table-column prop="floorName" label="所属楼层"></el-table-column>
      <el-table-column prop="areaName" label="区域"></el-table-column>
      <el-table-column prop="terminalName" label="终端名称"></el-table-column>
      <el-table-column prop="terminalStatesName" label="终端状态"></el-table-column>
      <el-table-column prop="playerRealName" label="员工姓名"></el-table-column>
      <el-table-column label="操作" width="100" fixed="right">
        <div slot-scope="scope">
          <el-button type="text" size="mini" @click="del(scope.row)">删除</el-button>
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
</template>

<script>
  import { listQx, delQx } from '@/api/mjqx/yhsx'
  export default {
    data() {
      return {
        form: {
          pageCurrent: 1,
          pageLimit: 10,
          resultCount: 0
        },
        list: []
      }
    },
    created() {
      // this.query(this.form)
    },
    methods: {
      reload(queryData) {
        this.form = Object.assign({}, this.form, queryData)
        this.query()
      },
      query() {
        listQx(this.form).then(res => {
          this.list = res.data
          this.form.resultCount = res.page.resultCount
          console.log(this.list)
        }).catch(err => {
          this.$message.error(err)
        })
      },
      del(item) {
        let param = {
          id: item.id
        }
        delQx(param).then(res => {
          this.query()
        })
      }
    }
  }
</script>

<style scoped>

</style>
