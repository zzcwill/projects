<template>
     <div class="SmsContainer pl50 pr50 pb50 pt90">
         <div class="mb30">
            <span class="pl20">手机号:</span>
            <div class="w300 inline-b ml20 mr20">
                <el-input v-model="searchForm.phone" placeholder="请输入内容" ></el-input>
            </div>
            <span class="pl20">验证码:</span>
            <div class="w300 inline-b ml20 mr20">
                <el-input v-model="searchForm.code" placeholder="请输入内容" ></el-input>
            </div>
            <span class="pl20">发送状态:</span>
            <div class="w300 inline-b ml20 mr20">
                <el-select v-model="searchForm.status" clearable placeholder="请选择" @keyup.enter.native="searchUserList()">
                    <el-option
                    v-for="item in searchForm.BusinesStypesOptions"
                    :key="item.state"
                    :label="item.name"
                    :value="item.state">
                    </el-option>
                </el-select>
            </div>
            <span class="pl20">短信通道:</span>
            <div class="w300 inline-b ml20 mr20">
                <el-select v-model="searchForm.channelList" clearable placeholder="请选择" @keyup.enter.native="searchUserList()">
                <el-option
                    v-for="item in searchForm.UsingStatesOptions"
                    :key="item.dictKey"
                    :label="item.dictValue"
                    :value="item.dictKey">
                    </el-option>
                </el-select>
            </div>
            <div class="block mt15">
                <span class="demonstration">发送时间：</span>
                <el-date-picker
                v-model="searchForm.dateTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                >
                </el-date-picker>
                <el-button class="ml20" type="primary" @click="search">查询</el-button>
            </div>
        </div>
        <div>
            <el-table :data="userlist" max-height="660"  style="width: 100%">
            <el-table-column prop="phone" label="手机号码" width="180" align="center"></el-table-column>
            <el-table-column prop="code" label="验证码" width="" align="center"></el-table-column>
            <el-table-column prop="sms" label="短信内容" width="600" align="center"></el-table-column>
            <el-table-column prop="channel" label="短信通道" width="" align="center">

            </el-table-column>
            <el-table-column prop="status" label="发送状态" width="" align="center">
                <template slot-scope="scope">
                <span type="text" size="small" v-if="scope.row.status == '0'">未发送</span>
                <span type="text" size="small" v-else-if="scope.row.status == '1'">发送成功</span>
                <span type="text" size="small" v-else-if="scope.row.status == '-1'">发送失败</span>
                </template>
            </el-table-column>
            <el-table-column prop="sendtime" label="发送时间" width="" align="center"></el-table-column>
            </el-table>
      </div>
      <!-- table分页 -->
      <div class="block mt30 text-center">
        <el-pagination
          background
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30, 50, 80, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.totalCount"
           @size-change="sizeChange"
          @current-change="currentChange"
          >
        </el-pagination>
      </div>
    </div>
</template>
<script>
// import * as searchApi from "../../../api/comprehensive/SMSsearch"
export default {
    data(){
        return{
            page: {
                currentPage: 1,
                totalCount: 100,
                pageSize: 10
            },
             userlist: [
                {
                    phoneNumber:"17826879780",
                    verification:"123",
                    SMScontent:"长的帅",
                    sendTime:"2018.10.12",
                    SMSRoad:"2018.12.1",
                    sendstate:1,
                }
            ], 
            searchForm: {
                BusinesStypesOptions: [
                    {
                        state:null,
                        name:"请选择"
                    },
                    {
                        state:0,
                        name:"未发送"
                    },
                    {
                        state:1,
                        name:"发送成功"
                    },
                    {
                        state:-1,
                        name:"发送失败"
                    }
                ],
                UsingStatesOptions: [],
               channelList:"", //短信通道
               code:"",        //验证码
               phone:"",
               status:"",       
               dateTime: [],
            },
        }
    },
    mounted(){
        this.getType()
        this.getList()
    },
    methods:{
        currentChange(data){
            this.page.currentPage = data;
             this.getList()
        },
        sizeChange(data){
            this.page.pageSize = data;
            this.getList()
        },
        getType(){
            // searchApi.SMSType()
            // .then(res=>{
            //     if(res.success == true)
            //     {
            //         this.searchForm.UsingStatesOptions = res.data
            //     }
            //     else
            //     {
            //         this.$message({
            //             message:"响应失败",
            //             type:"error"
            //         })
            //     }
            // })
        },
        search(){
            this.page.currentPage = 1;
            this.getList()
        },
       getList(){
          //  searchApi.SMSSearchList({
          //      channelList:this.searchForm.channelList,
          //      code:this.searchForm.code,
          //      page:this.page.currentPage,
          //      phone:this.searchForm.phone,
          //      size:this.page.pageSize,
          //      status:this.searchForm.status,
          //      sendtimeBegin:this.searchForm.dateTime[0]?new Date(this.searchForm.dateTime[0]).format("yyyy-MM-dd hh:mm:ss").toString():"",
          //      sendtimeEnd:this.searchForm.dateTime[0]?new Date(this.searchForm.dateTime[1]).format("yyyy-MM-dd hh:mm:ss").toString():"",
          //  })
          //   .then(res=>{
          //       if(res.success === true)
          //       {
          //          this.userlist = res.data
          //          this.page.totalCount = res.totalCount
          //       }
          //       else
          //       {
          //           this.$message({
          //               message:"响应失败",
          //               type:"error"
          //           })
          //       }
          //   })
          //   .catch(res=>{
          //           this.$message({
          //               message:"发送请求失败",
          //               type:"error"
          //           })
          //   })
       }
    }
}
</script>
<style lang="scss" scoped>

</style>


