<template>
  <div class="clgl-page" style="padding:30px;">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="flex-center w-fit-content">
          <span class="w-130">停车位类型：</span>
          <el-select v-model="form.parkingTypeCode">
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
        <el-button type="primary" icon="el-icon-plus" class="m-l-20" @click="show('add')">新增</el-button>
        <el-button type="primary" class="m-l-20" @click="parkingDis">停车位分配</el-button>
      </div>

      <div>
        <el-table border :data="list" border tooltip-effect="dark">
          <el-table-column prop="parkingCode" label="停车位编号"></el-table-column>
          <el-table-column prop="parkingTypeName" label="停车位类型"></el-table-column>
          <el-table-column prop="carNumber" label="车牌号"></el-table-column>
          <el-table-column prop="orderStartTime" label="开始日时"></el-table-column>
          <el-table-column prop="orderEndTime" label="结束日时"></el-table-column>
          <el-table-column prop="parkName" label="园区名称"></el-table-column>
          <el-table-column prop="userName" label="所属人员"></el-table-column>
          <el-table-column prop="statusCode" label="当前状态">
            <div slot-scope="scope">
              <span v-if="scope.row.statusCode=== '2'" style="color: green">已通过</span>
              <span v-else-if="scope.row.statusCode=== '1'" style="color: blue">申请中</span>
              <span v-else-if="scope.row.statusCode=== '3'" style="color: red">拒绝</span>
              <span v-else-if="scope.row.statusCode=== '4'" style="color: #6E6E6E">已取消</span>
            </div>
          </el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <div slot-scope="scope">
              <!--<el-button type="text" size="mini" @click="show('view',scope.row.id)">查看</el-button>-->
              <el-button type="text" size="mini" @click="verify(2,scope.row)">通过</el-button>
              <el-button type="text" size="mini" @click="verify(3,scope.row)">不通过</el-button>

              <el-dropdown>
                <span>
                  &nbsp;&nbsp;<el-button type="text" size="mini">更多</el-button><i
                  class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="show('edit',scope.row.id)">修改</el-dropdown-item>
                  <el-dropdown-item @click.native="deleteThis(scope.row.id)">删除</el-dropdown-item>
                  <el-dropdown-item @click.native="show('view',scope.row.id)">查看</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <!--              <el-button type="text" size="mini" @click="show('edit',scope.row.id)">修改</el-button>-->
              <!--              <el-button type="text" size="mini" @click="deleteThis(scope.row.id)">删除</el-button>-->
            </div>
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
        >
          <car-distribution :id="showId" :type="showType" @save="saveParkSuccess"></car-distribution>
        </el-dialog>
      </div>
      <div v-if="showDetail">
        <el-dialog
          :visible.sync="showDetail"
          width="80%"
          :title='dialogTitle'
        >
          <tcyy-edit :id="showId" :type="showType" @save="saveSuccess"></tcyy-edit>
        </el-dialog>
      </div>

    </div>
  </div>
</template>

<script>
  import tcyyEdit from './tcyy-edit'
  import carDistribution from './component/car-distribution'

  import {
    queryCarAppointmentList,
    deleteAppointment,
    doPassAppointment
  } from '@/api/tcgl/tcgl-request'

  export default {
    components: { tcyyEdit, carDistribution },
    data() {
      return {
        dialogTitle:'',
        form: {
          parkingTypeCode: '',
          carNumber: '',
          pageCurrent: 1,
          pageLimit: 10,
          resultCount: 0
        },
        parkingTypeCodes: {
          '': '全部',
          '1': '固定车位',
          '2': '标准车位',
          '3': '一般车位',
          '4': '访客车位',
        },
        list: [],
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
      saveParkSuccess() {
        this.showParkDetail = false
      },
      doQuery() {
        this.form.pageCurrent = 1
        this.query()
      },
      query() {
        queryCarAppointmentList(this.form).then(res => {
          this.list = res.data
          this.form.resultCount = res.page.resultCount
        }).catch(err => {
          this.$message.error(err)
        })
      },
      show(type, id) {
         if(type=='add'){
          this.dialogTitle='新增'
        }else if(type=='view'){
          this.dialogTitle='查看详情'
        }else{
          this.dialogTitle='修改'
        }
        this.showType = type
        this.showId = id
        this.showDetail = true
      },
      saveSuccess() {
        this.showDetail = false
        this.actionSuccess()
        this.query()
      },
      verify(type, item) {
        let message = type === 2 ? '通过' : '不通过'
        this.$confirm('确认' + message + '该条预约记录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'btn-custom-cancel',
          type: 'warning'
        }).then(() => {
          let params = {
            id: item.id,
            parkingId: item.parkingId,
            orderStartTime: item.orderStartTime,
            orderEndTime: item.orderEndTime,
            statusCode: type
          }
          doPassAppointment(params).then(res => {
            this.actionSuccess()
            this.query()
          }).catch(err => {
            this.$message.error(err)
          })
        })
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

