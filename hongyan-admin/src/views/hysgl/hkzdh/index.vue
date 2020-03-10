<template>
  <div class="p-10 bg-EFF2F7">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="flex-center w-fit-content">
          <label style="width: 160px;">会议室名称：</label>
          <el-input v-model="form.conferenceName" placeholder="请输入会议室名称"></el-input>
        </div>
        <div class="flex-center w-fit-content" style="margin-left: 20px;">
          <label style="width: 80px;">状态：</label>
          <el-select v-model="form.fb1" placeholder="请选择状态">
            <el-option
              v-for="item of Object.keys(statusTxt)"
              :key="item"
              :value="item"
              :label="statusTxt[item]"
            ></el-option>
          </el-select>
        </div>
        <el-button type="primary" icon="el-icon-search" class="m-l-20" @click="doQuery">搜索</el-button>
      </div>
      <div>
        <el-table
          border
          :data="list"
          tooltip-effect="dark"
        >
          <el-table-column prop="conferenceCode" label="会议室编号"></el-table-column>
          <el-table-column prop="conferenceName" label="会议室名称"></el-table-column>
          <el-table-column prop="parkName" label="所属园区"></el-table-column>
          <el-table-column prop="areaName" label="区域"></el-table-column>
          <el-table-column prop="fb1" label="状态">
            <div slot-scope="scope">{{ statusTxt[scope.row.fb1] }}</div>
          </el-table-column>
          <el-table-column prop="lightingIntelligence" label="灯具状态">
            <div slot-scope="scope">
              {{ offTxt[scope.row.lightingIntelligence] }}
              <span v-show="scope.row.lightingIntelligence ==='1'">亮度{{scope.row.brightness}}%</span>
            </div>
          </el-table-column>
          <el-table-column prop="airConditioningIntelligence" label="空调状态">
            <div slot-scope="scope">
              {{ offTxt[scope.row.lightingIntelligence] }}
              <span v-show="scope.row.lightingIntelligence ==='1'">温度:{{scope.row.airConditioningTemperature}}</span>
            </div>
          </el-table-column>
          <el-table-column prop="updateTime" label="上报时间"></el-table-column>
          <el-table-column label="会议信息" width="180" fixed="right">
            <div slot-scope="scope">
              <el-button v-show="scope.row.fb1==='1'" type="text" size="mini" @click="show('view',scope.row.fb2)">查看</el-button>
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
  import { list } from '@/api/hysgl/hkzdh'
  import detail from '../wdyd/detail'
  export default {
    components: { detail },
    data() {
      return {
        showId: '',
        showDetail: false,
        showType: 'view',
        list: [],
        statusTxt: {
          '0': '空闲中',
          '1': '使用中',
        },
        offTxt: {
          '0': '关闭',
          '1': '开启',
        },
        form: {
          fb1: '',
          conferenceName: '',
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
      save() {
        this.showDetail = false
        this.query()
      },
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
        this.showDetail = true
      },
      query() {
        list(this.form).then(res => {
          this.list = res.data
          this.form.resultCount = res.page.resultCount
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

