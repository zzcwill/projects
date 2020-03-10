<template>
  <div style="padding:10px;">
    <el-card>
      <div>
        <tj></tj>
      </div>
      <div>
        <div>
          <el-table
            border
            :data="list"
            tooltip-effect="dark"
          >
            <el-table-column prop="startDay" label="月份"></el-table-column>
            <el-table-column prop="totalApplyNum" label="预约次数"></el-table-column>
            <el-table-column prop="totalUserNum" label="使用次数"></el-table-column>
            <el-table-column prop="totalPeopleNum" label="参与人次"></el-table-column>
            <el-table-column prop="totalHours" label="总时长">
              <div slot-scope="scope">{{parseFloat(scope.row.totalHours||0)}}分钟</div>
            </el-table-column>
            <el-table-column prop="avgUserTime" label="平均用时">
              <div slot-scope="scope">{{parseFloat(scope.row.avgUserTime||0).toFixed(2)}}分钟</div>
            </el-table-column>
            <el-table-column prop="meetingRate" label="到会率">
              <div slot-scope="scope">{{parseFloat(scope.row.meetingRate||0).toFixed(2)}}%</div>
            </el-table-column>
            <el-table-column prop="avgApplyTime" label="预约平均耗时">
              <div slot-scope="scope">{{parseFloat(scope.row.avgApplyTime||0).toFixed(2)}}分钟</div>
            </el-table-column>
            <el-table-column prop="avgApplyAheadTime" label="预约平均提前时间">
              <div slot-scope="scope">{{parseFloat(scope.row.avgApplyAheadTime||0).toFixed(2)}}分钟</div>
            </el-table-column>
            <el-table-column label="操作" width="100" fixed="right">
              <div slot-scope="scope">
                <el-button type="text" size="mini" @click="show(scope.row.startDay)">查看</el-button>
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
    </el-card>

    <div v-if="showDetail">
      <el-dialog
        :visible.sync="showDetail"
        width="80%"
        :title="month"
      >
        <detail :month="month"></detail>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { listConferenceMonth } from '@/api/hysgl/hytj'
  import tj from './tj'
  import detail from './detail'
  export default {
    components: {
      tj: tj,
      detail: detail
    },
    data() {
      return {
        showDetail: false,
        month: '',
        list: [],
        form: {
          startDay: '',
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
      show(month) {
        this.month = month
        this.showDetail = true
      },
      query() {
        listConferenceMonth(this.form).then(res => {
          this.list = res.data
          this.form.resultCount = res.page.resultCount
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .chart{
    width:300px;
    height:180px;
  }
</style>

