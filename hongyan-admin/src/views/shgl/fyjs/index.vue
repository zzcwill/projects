<template>
  <div class="p-10 bg-EFF2F7">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="flex-center w-fit-content">
          <span class="w-130">商户名称:</span>
          <el-input v-model="form.merchantName" placeholder="请输入商户名称"></el-input>
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
          <el-table-column prop="statisticsDate" label="统计日期"></el-table-column>
          <el-table-column prop="sourceTypeName" label="业务来源"></el-table-column>
          <el-table-column prop="merchantName" label="商户名称"></el-table-column>
          <el-table-column prop="orderAmount" label="订单总数"></el-table-column>
          <el-table-column prop="payOrderAmount" label="支付订单总数"></el-table-column>
          <el-table-column prop="payOrderMoney" label="订单交易总额"></el-table-column>
          <el-table-column prop="paySuccessMoney" label="支付订单总额"></el-table-column>
          <el-table-column prop="refundMoney" label="实际退款总额"></el-table-column>
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
  import { listOrderTotal, delOrderTotal } from '@/api/shgl/fyjs'
  import edit from './edit'
  export default {
    components: { edit },
    data() {
      return {
        showAdd: false,
        showType: '',
        showId: '',
        list: [ // todo 展示需要暂时写死
          {
            statisticsDate:'2019-12-23',
            sourceTypeName:'销售',
            merchantName:'耐克旗舰店',
            orderAmount:'6787',
            payOrderAmount:'3000',
            payOrderMoney:'789000.23',
            paySuccessMoney:'432343.00',
            refundMoney:'53203.33'
          }
        ],
        form: {
          merchantName: '',
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
        listOrderTotal(this.form).then(res => {
          this.list = res.data
          this.form.resultCount = res.page.resultCount
        }).catch(err => {
          this.$message.error(err)
        })
      },
      del(id) {
        delOrderTotal({ id: id }).then(res => {
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

