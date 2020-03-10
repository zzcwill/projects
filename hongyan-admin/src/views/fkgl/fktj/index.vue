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
            <el-table-column prop="visitorTime" label="月份"></el-table-column>
            <el-table-column prop="totalApplyNum" label="预约次数"></el-table-column>
            <el-table-column prop="totalVisitNum" label="访问次数"></el-table-column>
            <el-table-column prop="totalVisitorNum" label="访问人次"></el-table-column>
            <el-table-column prop="totalVisitorTime" label="总访问时长">
              <div slot-scope="scope">{{parseFloat(scope.row.totalVisitorTime||0)}}分钟</div>
            </el-table-column>
            <el-table-column prop="avgVisitorTime" label="平均访问时间">
              <div slot-scope="scope">{{parseFloat(scope.row.avgVisitorTime||0).toFixed(2)}}分钟</div>
            </el-table-column>
            <el-table-column label="操作" width="100" fixed="right">
              <div slot-scope="scope">
                <el-button type="text" size="mini" @click="show(scope.row.visitorTime)">查看</el-button>
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
  import { listVisitorMonth } from '@/api/fkgl/fktj'
  import detail from './detail'
  import tj from './tj'
  export default {
    components: {
      detail: detail,
      tj: tj
    },
    data() {
      return {
        showDetail: false,
        month: '',
        list: [],
        form: {
          visitorTime: '',
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
        listVisitorMonth(this.form).then(res => {
          this.list = res.data
          this.form.resultCount = res.page.resultCount
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

