<template>
  <div class="fkyy-visitor-detail-page">
    <div class="p-10 bg-white brs-4 def-shadow">
      <br>
      <div class="flex p-t-10 p-l-10 p-b-10">
        <el-table
          border
          :data="list"
          tooltip-effect="dark"
        >
          <el-table-column prop="visitorName" label="姓名"></el-table-column>
          <el-table-column prop="visitorPhone" label="手机号码"></el-table-column>
          <el-table-column prop="visitorCard" label="身份证号码"></el-table-column>
          <el-table-column prop="visitorNumber" label="登记状态">
            <div slot-scope="scope">
              已通过
              <!--<span v-if="scope.row.statusCode=== '1'" style="color: blue">预约中</span>-->
              <!--<span v-else-if="scope.row.statusCode=== '2'" style="color: green">已通过</span>-->
              <!--<span v-else-if="scope.row.statusCode=== '9'" style="color: red">已拒绝</span>-->
              <!--<span v-else>{{scope.row.statusCode}}</span>-->
            </div>
          </el-table-column>
          <el-table-column prop="visitorReason" label="临时卡编号">15123332222211</el-table-column>
          <el-table-column prop="createTime" label="发卡时间"></el-table-column>
          <el-table-column prop="updateTime" label="还卡时间"></el-table-column>
          <el-table-column label="操作" width="120" fixed="right">
            <div slot-scope="scope">
              <el-button type="text" size="mini" @click="show('view',scope.row)">查看出入记录</el-button>
            </div>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-if="addCardDialog" style="margin-top: 150px">
      <el-dialog
        title="出入记录"
        :visible.sync="addCardDialog"
        width="76%"
        style=" margin-top: 15vh !important;padding-left: 20px;padding-right: 20px;"
        append-to-body
      >
        <div>
          <fkjl-card-detail :view="viewData" :type="type" :list="cardList"></fkjl-card-detail>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import search from '@/components/search'
  import fkjlCardDetail from './fkjl-card-detail'

  export default {
    components: { search, fkjlCardDetail },
    data() {
      return {
        form: {
          visitorName: '',
          visitorPhoen: '',
          visitorCard: '',
          parkId: '',
          parkName: ''
        },
        cardList: [{
          time: '2020-01-01 18:00:00',
          meType: 'AG3324',
          cardType: '门禁卡',
          username: '李明辉',
          location: '创业园西北门'
        }, {
          time: '2019-01-01 18:00:00',
          meType: 'AG332324',
          cardType: '饭卡',
          username: '陈晓健',
          location: '创业园北门'
        }],
        viewData: {},
        addCardDialog: false
      }
    },
    props: {
      view: Object,
      type: String,
      list: Array
    },
    created() {
      if (this.type === 'view') {
        this.form = this.view
      }
    },
    computed: {
      isView() {
        return this.type === 'view'
      },
      isEdit() {
        return this.type !== 'view'
      }
    },
    methods: {
      show() {
        // todo 接口调用
        this.addCardDialog = true
      },
      changePark(val) {
        this.form.parkId = val.id
        this.form.parkName = val.parkName
      },
    }
  }
</script>

<style scoped>

</style>

