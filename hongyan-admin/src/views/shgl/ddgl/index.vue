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
          <!-- <el-table-column prop="id" label="订单编号"></el-table-column> -->
          <el-table-column prop="userNickname" label="用户"></el-table-column>
          <el-table-column prop="userPhone" label="用户手机号"></el-table-column>
          <el-table-column prop="merchantName" label="商户名称"></el-table-column>
          <el-table-column prop="orderTypeName" label="设备类型"></el-table-column>
          <el-table-column prop="orderType" label="订单类型"></el-table-column>
          <el-table-column prop="orderTotalCost" label="订单总额"></el-table-column>
          <el-table-column prop="orderStatusName" label="订单状态"></el-table-column>
          <el-table-column prop="orderDate" label="订单日期"></el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <div slot-scope="scope">
              <el-button type="text" size="mini" @click="refund('all',scope.row.id)">退款</el-button>
              <el-button type="text" size="mini" @click="refund('part',scope.row.id)">部分退款</el-button>
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

    <div v-if="showRefund">
      <el-dialog
        :visible.sync="showRefund"
        width="40%"
      >
        <el-form ref="form" :inline="true" :model="moneyForm" size="mini" label-width="130px" :rules="rules">
          <el-form-item label="退款金额:" prop="money">
            <el-input v-model="moneyForm.money" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align: right;">
          <el-button type="primary" @click="rebates">退款</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { listOrder, delOrder, fullRefund, rebates } from '@/api/shgl/ddgl'
  import edit from './edit'
  export default {
    components: { edit },
    data() {
      return {
        showAdd: false,
        showRefund: false,
        showType: '',
        showId: '',
        list: [],
        moneyForm: {
          money: ''
        },
        form: {
          merchantName: '',
          pageCurrent: 1,
          pageLimit: 10,
          resultCount: 0
        },
        rules: {
          money: [
            { required: true, message: '请输入金额', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.query()
    },
    methods: {
      rebates() {
        fullRefund(this.moneyForm).then(res => {
          this.$message.success('退款成功')
          this.showRefund = false
        }).catch(err => {
          this.$message.error(err)
        })
      },
      refund(type, id) {
        if (type === 'part') {
          this.showRefund = true
          this.moneyForm.id = id
        } else {
          fullRefund({ id: id }).then(res => {
            this.$message.success('退款成功')
          }).catch(err => {
            this.$message.error(err)
          })
        }
      },
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
        listOrder(this.form).then(res => {
          this.list = res.data
          this.form.resultCount = res.page.resultCount
        }).catch(err => {
          this.$message.error(err)
        })
      },
      del(id) {
        delOrder({ id: id }).then(res => {
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

