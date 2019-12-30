<template>
  <div class="container">
    <el-card>

      <span style="margin-left:20px">类型:</span>
      <el-select v-model="value" @clear="clearList(0)" clearable placeholder="请选择">
        <el-option v-for="item in optionsType" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <span>设备编号:</span>
      <el-input @change="clearList" style="width:15%" v-model="input" placeholder="请输入设备编号"></el-input>
      <el-button type="primary" @click="searchInfoList(1)">搜索</el-button>
    </el-card>
    <el-card class="box-card">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="warningCreateTime" label="刷卡时间" width="160">
        </el-table-column>
        <el-table-column prop="terminalNo" label="读卡器编号" width="160">
        </el-table-column>
        <el-table-column prop="" label="读卡器类型" width="160">
          <template slot-scope="scope">
            <span v-if="scope.row.terminalTypeCode=='1'">通道闸</span>
            <span v-if="scope.row.terminalTypeCode=='2'">电梯</span>
            <span v-if="scope.row.terminalTypeCode=='3'">门禁</span>
            <span v-if="scope.row.terminalTypeCode=='4'">巡更</span>
            <span v-if="scope.row.terminalTypeCode=='5'">商超</span>
            <span v-if="scope.row.terminalTypeCode=='6'">食堂</span>
            <span v-if="scope.row.terminalTypeCode=='9'">其他</span>
          </template>
        </el-table-column>
        <el-table-column prop="cardNo" label="卡片编号" width="160">
        </el-table-column>
        <el-table-column prop="playerUserName" label="用户名称" width="160">
        </el-table-column>
        <el-table-column prop="playerUserPhone" label="手机号码" width="160">
        </el-table-column>
        <el-table-column  label="推送结果" width="160">
          <template slot-scope="scope">
            <span v-if="scope.row.statusCode==1">成功</span>
            <span v-if="scope.row.statusCode==2">失败</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="位置">
          <tempalte slot-scope="scope">
            {{scope.row.parkName}}/{{scope.row.buildingName}}/{{scope.row.floorName}}/{{scope.row.areaName}}
          </tempalte>
        </el-table-column>
      </el-table>

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[5, 10, 20]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
   import { InfoList } from '@/api/zkgl/qxbjts'

  export default {
    name: 'zkglskrzjl',
    data() {
      return {
        input:'',
        value:'',
        currentPage: 1, // 分页
        pageSize: 5, // 分页
        total: 0, // 分页
        //   下拉框模拟数据
         optionsType: [{
            value: '1',
            label: '通道闸'
          }, {
            value: '2',
            label: '电梯'
          }, {
            value: '3',
            label: '门禁'
          }, {
            value: '4',
            label: '巡更'
          }, {
            value: '5',
            label: '商超'
          },
          {
            value: '6',
            label: '食堂'
          },
          {
            value: '9',
            label: '其他'
          }
        ],
        // 下拉框选中的值
        value: '',
        // 表格模拟数据
        tableData: [],
      }
    },
    watch: {},
    created() {
      this.InfoList()
    },
    mounted() {},
    destoryed() {},
    methods: {
      // 分页
      handleSizeChange(val) {
        // console.log(val);
        this.pageSize = val;
        this.InfoList()
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        // console.log(val);
        this.InfoList()
      },
      async InfoList(){
        let params={
          pageCurrent: this.currentPage, //页码
            pageLimit: this.pageSize
        }
        const res=await InfoList(params)
        if(res.code==0){
          this.tableData = res.data
          this.total = res.page.resultCount;
        }
      },
      // 检索
     async searchInfoList(){
        if(this.value==''&&this.input==''){
          this.$message.info('请选择设备类型或者填写设备编号')
        }else{
          const params={
            pageCurrent: this.currentPage, //页码
            pageLimit: this.pageSize,
            deviceCode:this.input.trim(),
            terminalTypeCode:this.value.trim()
          }
          const res= await InfoList(params)
          if(res.code==0){
            this.tableData = res.data
          this.total = res.page.resultCount;
          }else{
            this.$message.info('查询数据失败')
          }
        }
      },
      clearList(flag){
       if(flag==1){
          if(this.input==''){
          this.InfoList()
        }
       }else{
         this.InfoList() 
       }
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

    .box-card {
      margin-top: 10px;
    }
  }

</style>
