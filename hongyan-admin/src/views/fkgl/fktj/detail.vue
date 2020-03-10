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
            <el-table-column prop="parkName" label="园区"></el-table-column>
            <el-table-column prop="totalApplyNum" label="预约次数"></el-table-column>
            <el-table-column prop="totalVisitNum" label="访问次数"></el-table-column>
            <el-table-column prop="totalVisitorNum" label="访问人次"></el-table-column>
            <el-table-column prop="totalVisitorTime" label="总访问时长">
              <div slot-scope="scope">{{parseFloat(scope.row.totalVisitorTime||0)}}分钟</div>
            </el-table-column>
            <el-table-column prop="avgVisitorTime" label="平均访问时间">
              <div slot-scope="scope">{{parseFloat(scope.row.avgVisitorTime||0).toFixed(2)}}分钟</div>
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
  import { listVisitor } from '@/api/fkgl/fktj'
  import tj from './tj'
  export default {
    components: {
      echart: echart,
      tj: tj
    },
    props: {
      month: {
        type: String,
        default: ''
      }
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
            text: '园区访问数据',
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
              ['product', '预约次数', '访问次数']
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
      this.query()
    },
    methods: {
      show() {},
      query() {
        this.form.visitorTime = this.month
        listVisitor(this.form).then(res => {
          this.list = res.data
          this.form.resultCount = res.page.resultCount
          this.loadBar()
        })
      },
      loadBar() {
        this.barOption.dataset.source = [['product', '预约次数', '访问次数']]
        if (this.list) {
          for (let item of this.list) {
            this.barOption.dataset.source.push([item.parkName, item.totalApplyNum, item.totalVisitNum])
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

