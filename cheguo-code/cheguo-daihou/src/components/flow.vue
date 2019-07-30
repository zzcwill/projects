<template>
  <div :flowData="flowData" :preUrl="preUrl" :nextUrl="nextUrl">
    <el-dialog title="任务提交" :visible.sync="dialogFormVisible" width="60%" @close="closeDialog">
      请选择流转人员   后续流程环节:{{nextFlowNodeName}}
      <el-table
                :data="flowList"   stripe="stripe" border="border"
      >

        <el-table-column label="选择" align="center">
          <template slot-scope="scope">
            <!--<input type="radio" v-model="userId" name="userId" @click="getUser(scope.row)"/>-->
            <el-radio v-model="userId" :label="scope.row.userId" @change="getUser(scope.row)">{{''}}</el-radio>
          </template>
        </el-table-column>
        <el-table-column v-for="column in columns"
                         :key="column.prop"
                         :label="column.label"
                         :prop="column.prop"
                         :formatter="column.formatter"
                         :class-name="column.className"
                         :sort-method="column.sortMethod"
                         :align="column.align"
        ></el-table-column>

      </el-table>
      <el-row :gutter="20">
        <el-col :span="21" :offset="3" style="margin-top: 15px;margin-bottom: 15px;text-align: right">
          <el-button type="primary" size="small" @click="submit">确定</el-button>
          <el-button type="primary" size="small" @click="dialogFormVisible = false">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Fetch,closeTab,tip} from '../common/js/iframe';
  export default{
    name: 'flowUser',
    props: {
      flowData: {},
      preUrl: {},
      nextUrl: {}
    },
    components: {

    },
    data(){
      return {
        dialogFormVisible: false,
        columns: [
          {prop: 'organization',label:'机构名称'},
          {prop: 'department',label:'部门'},
          {prop: 'userName',label:'姓名'},
          {prop: 'taskCount',label:'当前代办量'}
        ],
        flowUser: {},
        userId: '',
        nextFlowNodeName: '',
        nextFlowNodeCode: '',
        nextFlowType: '',
        businessGroupId: '',
        businessObjectId: '',
        flowList: []
      }
    },
    methods: {
      submit(){
        let _this = this;
        Fetch(this,this.nextUrl,Object.assign({},this._data.flowUser,this.flowData)).then(function (res) {
          tip(_this,{
            message: res.message
          });
          closeTab();
        })
      },
      getUser(row,event,column){
        this.flowUser.nextNodeUserName = row.userName;
        this.flowUser.nextNodeUserId = row.userId;
      },
      closeDialog(){
        this.$emit('dialogClose');
      }
    },
    mounted(){
      let _this = this;
      Fetch(this,this.preUrl,this.flowData).then(function (res) {
        _this.flowList = res.data.userTasks;
        _this.nextFlowNodeName = res.data.nextFlowNodeName;
        _this.flowUser.nextNodeUserName = res.data.userTasks[0].userName;
        _this.flowUser.nextNodeUserId = res.data.userTasks[0].userId;
        _this.userId = res.data.userTasks[0].userId;
        if(res.data.userTasks.length > 1){
          _this.dialogFormVisible = true;
        }else{
          Fetch(_this,_this.nextUrl,Object.assign({},_this._data.flowUser,_this.flowData)).then(function (res) {
            tip(_this,{
              message: res.message
            });
            closeTab();
          })
        }
      })
    }
  }
</script>
