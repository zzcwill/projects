<template>
  <div class="clgl-page" style="padding:30px;">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="flex-center w-fit-content">
          <span class="w-130">缴费状态：</span>
          <el-select v-model="form.statusCode">
            <el-option
              v-for="item of Object.keys(parkingTypeCodes)"
              :key="item"
              :value="item"
              :label="parkingTypeCodes[item]"
            ></el-option>
          </el-select>
        </div>
        <div class="flex-center w-fit-content">
          <span class="w-130">车牌编号：</span>
          <el-input v-model="form.carNumber" placeholder="请输入车牌编号"></el-input>
        </div>
        <el-button type="primary" icon="el-icon-search" class="m-l-20" @click="query">搜索</el-button>
      </div>

      <div>
        <el-table border :data="list" border tooltip-effect="dark">
          <el-table-column prop="parkingCode" label="停车位编号"></el-table-column>
          <el-table-column prop="parkingTypeName" label="停车位类型"></el-table-column>
          <el-table-column prop="carNumber" label="车牌号"></el-table-column>
          <el-table-column prop="stopStartTime" label="入场日时"></el-table-column>
          <el-table-column prop="stopEndTime" label="离场日时"></el-table-column>
          <el-table-column prop="parkName" label="园区名称"></el-table-column>
          <el-table-column prop="stopPrepareMoney" label="预缴金额"></el-table-column>
          <el-table-column prop="stopNeedMoney" label="计费金额"></el-table-column>
          <el-table-column prop="stopPayMoney" label="实缴金额"></el-table-column>
          <el-table-column prop="stopPayMoney" label="缴费状态">
            <div slot-scope="scope">
              <span v-if="scope.row.statusCode=== '1'" style="color: red">未缴费</span>
              <span v-else-if="scope.row.statusCode=== '2'" style="color: green">全额缴费</span>
              <span v-else-if="scope.row.statusCode=== '3'" style="color: green">部分缴费</span>
              <span v-else-if="scope.row.statusCode=== '4'" style="color: green">免费通行</span>
            </div>
          </el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <div slot-scope="scope" v-if="scope.row.statusCode==='1'">
              <el-button type="text" size="mini" @click="verify(2,scope.row)">缴费收费</el-button>
              <el-button type="text" size="mini" @click="verify(3,scope.row)">免费通行</el-button>
            </div>
            <div v-else>无需缴费</div>
          </el-table-column>
        </el-table>
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
      <div v-if="showParkDetail">
        <el-dialog
          :visible.sync="showParkDetail"
          width="80%"
          :title='dialogTitle'
        >
          <car-distribution :form="item" :id="showId" :type="showType" @save="doSuccess"></car-distribution>
        </el-dialog>
      </div>

    </div>
  </div>
</template>

<script>
  import carDistribution from './component/car-distribution'

  import {
    queryParkingFeeList,
    deleteAppointment,
    doPassAppointment,
    updateParkingData
  } from '@/api/tcgl/tcgl-request'

  export default {
    components: { carDistribution },
    data() {
      return {
        dialogTitle:'',
        form: {
          statusCode: '',
          carNumber: '',
          pageCurrent: 1,
          pageLimit: 10,
          resultCount: 0
        },
        parkingTypeCodes: {
          '': '全部',
          '1': '未缴费',
          '2': '全额缴费',
          '3': '部分缴费',
          '4': '免费通行'
        },
        list: [],
        item: {},
        id: '',
        showDetail: false, // 控制新增窗口弹出
        showParkDetail: false,
        showType: '',
        showId: '',
        options: [
          {
            value: '1',
            label: '申请中'
          },
          {
            value: '2',
            label: '已通过'
          }
        ]
      }
    },
    created() {
      this.query()
    },
    methods: {
      doSuccess() {
        this.showParkDetail = false
        this.actionSuccess()
        this.query()
      },
      doQuery() {
        this.form.pageCurrent = 1
        this.query()
      },
      query() {
        queryParkingFeeList(this.form).then(res => {
          this.list = res.data
          this.form.resultCount = res.page.resultCount
        }).catch(err => {
          this.$message.error(err)
        })
      },
      show(type, id) {
        this.showType = type
        this.showId = id
        this.showDetail = true
      },
      verify(type, item) {
        if (type === 2) {
          this.dialogTitle='收费'
          this.item = item
          this.showParkDetail = true
        } else if (type === 3) {
          this.$confirm('确认免费通行？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            cancelButtonClass: 'btn-custom-cancel',
            type: 'warning'
          }).then(() => {
            item.statusCode = '4'
            item.statusName = '免费通行'
            updateParkingData(item).then(res => {
              this.actionSuccess()
              this.query()
            }).catch(err => {
              this.$message.error(err)
            })
          })
        }
      },
      actionSuccess() {
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
      },
      parkingDis() {
        this.showParkDetail = true
      },
      deleteThis(val) {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'btn-custom-cancel',
          type: 'warning'
        }).then(() => {
          let params = {
            id: val
          }
          deleteAppointment(params).then(res => {
            this.actionSuccess()
            this.query()
          }).catch(err => {
            this.$message.error(err)
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .w-130 {
    width: 110px;
  }

  .flex-center {
    margin-right: 15px;
  }
</style>

