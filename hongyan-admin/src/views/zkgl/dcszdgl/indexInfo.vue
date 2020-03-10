<template>
  <div class="p-10">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="flex-center w-fit-content">
          <span class="w-130">员工姓名:</span>
          <el-input v-model="form.realName" placeholder="请输入员工姓名"></el-input>
        </div>
        <el-button type="primary" icon="el-icon-search" class="m-l-20" @click="doQuery">搜索</el-button>
      </div>
      <div>
        <el-table ref="multipleTable"  @selection-change="selectionChange" border :data="list"
          tooltip-effect="dark">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="realName" label="员工姓名"></el-table-column>
          <el-table-column prop="userSex" label="性别">
            <template slot-scope="scope">
              <span>{{userSexOption[scope.row.userSex]}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="partnerName" label="所属企业"></el-table-column>
          <el-table-column prop="orgName" label="所属部门"></el-table-column>
          <el-table-column prop="userPhone" label="电话"></el-table-column>
          <el-table-column prop="userMail" label="邮箱"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
        </el-table>
      </div>
      <div class="p-t-20 p-b-10 flex flex-j-end">
        <el-pagination :current-page.sync="form.pageCurrent" :page-sizes="[5,10,20,30]"
          :page-size.sync="form.pageLimit" layout="total, sizes, prev, pager, next, jumper" :total="form.resultCount"
          @size-change="query" @current-change="query">
        </el-pagination>
      </div>
    </div>

    <div v-if="showAdd">
      <el-dialog :visible.sync="showAdd" width="80%">
        <edit @save="save" :type="showType" :id="showId"></edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {
    employeeList,
    delEmployee
  } from '@/api/qygl/ygxx'
  export default {
    data() {
      return {
        showAdd: false,
        showType: '',
        showId: '',
        list: [],
        form: {
          realName: '',
          pageCurrent: 1,
          pageLimit: 5,
          resultCount: 0
        },
        userSexOption: {
          '1': '男',
          '2': '女',
          '3': '不明'
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

      selectionChange(val){
        this.$emit('selectionChange',val)
      },

      query() {
        employeeList(this.form).then(res => {
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
