<template>
  <div class="clgl-page" style="padding:30px;">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="车辆入场日志" name="in">车辆入场日志</el-tab-pane>
      <el-tab-pane label="车辆出场日志" name="out">车辆出场日志</el-tab-pane>
    </el-tabs>
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="flex-center w-fit-content">
          <span class="w-130">车辆类型：</span>
          <el-select v-model="form.carTypeCode">
            <el-option
              v-for="item of Object.keys(carTypeOptions)"
              :key="item"
              :value="item"
              :label="carTypeOptions[item]"
            ></el-option>
          </el-select>
        </div>
        <div class="flex-center w-fit-content">
          <span class="w-130">设备编号：</span>
          <el-input v-model="form.deviceId" placeholder="请输入设备编号"></el-input>
        </div>
        <div class="flex-center w-fit-content">
          <span class="w-130">车牌号：</span>
          <el-input v-model="form.carNumber" placeholder="请输入车牌号"></el-input>
        </div>
        <el-button type="primary" icon="el-icon-search" class="m-l-20" @click="query">搜索</el-button>
      </div>

      <div>
        <el-table border :data="list" border tooltip-effect="dark">
          <el-table-column prop="inTime" label="入场时间" v-if="activeName==='in'"></el-table-column>
          <el-table-column prop="outTime" label="离场时间" v-else></el-table-column>
          <el-table-column prop="deviceId" label="设备编号"></el-table-column>
          <el-table-column prop="carNumber" label="车牌号"></el-table-column>
          <el-table-column prop="cardNo" label="卡片编号"></el-table-column>
          <el-table-column prop="playerUserName" label="用户名称"></el-table-column>
          <el-table-column prop="playerUserPhone" label="手机号码"></el-table-column>
          <el-table-column prop="isGuest" label="是否访客">
            <div slot-scope="scope">
              <span v-if="scope.row.isGuest=== '1'">不是</span>
              <span v-else="scope.row.isGuest=== '2'">是</span>
            </div>
          </el-table-column>
          <el-table-column prop="parkName" label="园区名称"></el-table-column>
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
    </div>
  </div>
</template>

<script>

  import {
    queryCarInLogList,
    queryCarOutLogList
  } from '@/api/tcgl/tcgl-request'

  export default {
    data() {
      return {
        form: {
          carTypeCode: '',
          deviceId: '',
          carNumber: '',
          pageCurrent: 1,
          pageLimit: 10,
          resultCount: 0
        },
        activeName: 'in',
        carTypeOptions: {
          '10': '轿车',
          '11': '电动汽车',
          '20': '货车',
          '30': '客车',
          '40': '挂车',
          '50': '三轮车',
          '60': '电动车',
          '90': '其他车辆'
        },
        list: [],
        id: '',
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
      handleClick() {
        this.form.pageCurrent = 1
        this.query()
      },
      query() {
        if (this.activeName === 'in') {
          queryCarInLogList(this.form).then(res => {
            this.list = res.data
            this.form.resultCount = res.page.resultCount
          }).catch(err => {
            this.$message.error(err)
          })
        } else if (this.activeName === 'out') {
          queryCarOutLogList(this.form).then(res => {
            this.list = res.data
            this.form.resultCount = res.page.resultCount
          }).catch(err => {
            this.$message.error(err)
          })
        }
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
