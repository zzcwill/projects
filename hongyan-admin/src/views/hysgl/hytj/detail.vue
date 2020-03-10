<template>
  <div style="padding:10px;">
    <el-card>
      <div>
        <tj :month="month"></tj>
        <el-row>
          <echart ref="barChart" class="barChart" :option="barOption" />
        </el-row>
      </div>
      <div>
        <div>
          <el-table
            border
            :data="list"
            tooltip-effect="dark"
          >
            <el-table-column prop="conferenceName" label="会议室名称"></el-table-column>
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
  </div>
</template>

<script>
  import echart from '@/components/echarts'
  import { listConference } from '@/api/hysgl/hytj'
  import tj from './tj'
  export default {
    props: {
      month: {
        type: String,
        default: ''
      }
    },
    components: {
      echart: echart,
      tj: tj
    },
    data() {
      return {
        list: [],
        form: {
          pageCurrent: 1,
          pageLimit: 10,
          resultCount: 0
        },
        barOption: {
          title: {
            text: '会议室预约数据',
            padding: [
              10, // 上
              0, // 右
              0, // 下
              100, // 左
            ]
          },
          legend: {},
          tooltip: {},
          dataset: {
            source: [
              ['product', '预约次数', '使用次数']
            ]
          },
          xAxis: { type: 'category' },
          yAxis: {},
          series: [
            { type: 'bar', barGap: 0, barMaxWidth: 100, barMinHeight: 1 },
            { type: 'bar', barGap: 0, barMaxWidth: 100, barMinHeight: 1 }
          ]
        }
      }
    },
    created() {
      console.log(this.month)
      this.query()
    },
    methods: {
      show() {},
      query() {
        this.form.startDay = this.month
        listConference(this.form).then(res => {
          this.list = res.data
          this.form.resultCount = res.page.resultCount
          this.loadBar()
        })
      },
      loadBar() {
        this.barOption.dataset.source = [['product', '预约次数', '使用次数']]
        if (this.list) {
          for (let item of this.list) {
            this.barOption.dataset.source.push([item.conferenceName, item.totalApplyNum, item.totalUserNum])
          }
        }
        this.$refs.barChart.drawLine()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .chart{
    width:300px;
    height:180px;
  }
  .barChart{
    width: 100%;
    height: 300px;
  }
</style>

