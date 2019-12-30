<template>
  <div style="padding:30px;">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="flex-center w-fit-content">
          <label style="width: 160px;">会议室名称：</label>
          <el-input v-model="form.conferenceName" placeholder="请输入会议室名称"></el-input>
        </div>
        <el-button type="primary" icon="el-icon-search" class="m-l-20" @click="clickSearch">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" class="m-l-20" @click="show('add')">新增</el-button>
      </div>
      <div>
        <el-table
          v-loading.body="loading"
          :data="list"
          tooltip-effect="dark"
          border
          style="width: 100%"
        >
          <el-table-column prop="conferenceId" label="会议室编号"></el-table-column>
          <el-table-column prop="conferenceName" label="会议室名称"></el-table-column>
          <el-table-column prop="parkName" label="所属园区"></el-table-column>
          <el-table-column prop="areaName" label="区域"></el-table-column>
          <el-table-column prop="creator" label="申请员工"></el-table-column>
          <el-table-column prop="statusCode" label="状态">
            <template slot-scope="scope">
              <div>{{ statusTxt[scope.row.statusCode] }}</div>
            </template>
          </el-table-column>

          <el-table-column prop="startDay" label="预约开始时间"></el-table-column>
          <el-table-column prop="endDay" label="预约结束时间"></el-table-column>
          <el-table-column label="操作" fixed="right" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="show('view',scope.row.id)">查看</el-button>
              <el-button type="text" size="mini" @click="show('edit',scope.row.id)">编辑</el-button>
              <el-button type="text" size="mini" @click="edit(scope.row.id, '2')">通过</el-button>
              <el-button type="text" size="mini" @click="edit(scope.row.id, '3')">不通过</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class=" p-b-10 flex flex-j-end">
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
        width="60%"
      >
        <detail :id="showId" :type="showType" @save="save"></detail>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { listConferenceApply, editConferenceApply } from '@/api/hysgl/hysyy'
  import detail from './detail'

  export default {
    components: { detail },
    data() {
      return {
        statusTxt: {
          '1': '预约中',
          '2': '通过',
          '3': '不通过'
        },
        showId: '',
        showDetail: false,
        showType: 'add',
        form: {
          conferenceName: '',
          pageCurrent: 1,
          pageLimit: 10,
          resultCount: 0
        },
        list: [],
        loading: false

      }
    },
    created() {
      this.query()
    },
    methods: {
      clickSearch() {
        this.form.pageCurrent = 1
        this.query()
      },
      query() {
        listConferenceApply(this.form).then(res => {
          this.list = res.data
          this.form.resultCount = res.page.resultCount
        }).catch(err => {
          this.$message.error(err)
        })
      },
      show(type, id) {
        this.showType = type
        this.showDetail = true
        this.showId = id
      },
      edit(id, state) {
        let param = {
          id: id,
          statusCode: state
        }
        editConferenceApply(param).then(res => {
          this.query()
        }).catch(err => {
          this.$message.error(err)
        })
      },
      save() {
        this.showDetail = false
        this.query()
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

