<template>
  <div class="container">
    <el-card>
      <span>用户账号</span>
      <el-input class='sreachBtn' placeholder="请输入用户账号" v-model="userNum" @clear='clearInputCon' clearable>
      </el-input>
      <span>登录日期</span>
      <el-input class='sreachBtn' placeholder="请输入登录日期" v-model="userLogintime" @clear='clearInputCon' clearable>
      </el-input>
      <el-button type="primary" @click='searchList'>搜索</el-button>


      <el-table :data="tableData" border style="width: 100%; margin-top:20px;">
        
        <!-- <el-table-column prop="userId" label="用户id" >
        </el-table-column> -->
        <el-table-column prop="userAccount" label="用户账号" >
        </el-table-column>
        <el-table-column prop="userName" label="用户姓名" >
        </el-table-column>
        <el-table-column prop="loginDate" label="登录日期" >
        </el-table-column>
        <el-table-column prop="loginTime" label="登录时间" >
        </el-table-column>
        <el-table-column prop="loginIp" label="登录ip">
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[ 10, 20,30,40,50]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {
    getListInfo
  } from '@/api/xtgl/rzgl'

  export default {
    name: 'XtglXtpz',
    data() {
      return {
        currentPage: 1, // 分页
        pageSize: 10, // 分页
        total: 0, // 分页
        //用户名称
        userNum: '',
        //登录日期
        userLogintime: '',
        tableData: []
      }
    },
    created() {
      this.getListInfo()
    },
    mounted() {},
    destoryed() {},
    methods: {
      //搜索点击事件
      async searchList() {
        let params = {
          userAccount: this.userNum.trim(),
          loginDate: this.userLogintime.trim()
        }

        if (this.userNum == '' && this.userLogintime == '') {
          this.$message.info('请输入用户账号或者登录日期')
        } else {
          const res = await getListInfo(params)
          console.log(res)
          this.tableData = res.data;
          this.total = res.page.resultCount;
        }
      },
      //进入页面获取数据
      async getListInfo() {
        let params = {
          pageCurrent: this.currentPage, //页码
          pageLimit: this.pageSize //页大小
        }
        const res = await getListInfo(params)
        console.log(res)
        this.tableData = res.data;
        this.total = res.page.resultCount;
      },
      //分页的点击事件
      handleSizeChange(val) {
        this.pageSize = val;
        this.getListInfo()
      },
      handleCurrentChange(val) {
        // console.log(val);
        this.currentPage = val;
        this.getListInfo()
      },
      //输入框清空事件
      clearInputCon() {
        this.getListInfo()
      }
    },


  }

</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    background-color: #EFF2F7;
    padding: 10px;

    .sreachBtn {
      width: 180px;
    }
  }

</style>
