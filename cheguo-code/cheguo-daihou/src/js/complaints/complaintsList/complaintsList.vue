<template>
  <div class="wrapper wrapper-content">
    <div class="ibox">
      <div class="ibox-content">
        <el-row :gutter="20">
          <el-form :model="searchForm" ref="searchForm" label-width="135px" size="small">
            <el-col :span="24">
              <cd-input label="客户姓名:" placeholder="请输入客户姓名" v-model="searchForm.customerName" prop="customerName"></cd-input>
              <cd-select label="投诉类别:" v-model="searchForm.complaintType" :options="complaintType" prop="complaintType"></cd-select>
              <cd-input label="贷款编号:" placeholder="请输入贷款编号" v-model="searchForm.projectNo" prop="projectNo"></cd-input>
            </el-col>
            <el-col :span="24">
              <cd-input label="登记人:" placeholder="请输入登记人" v-model="searchForm.addUserName" prop="addUserName"></cd-input>
              <cd-select label="发起机构:" v-model="searchForm.launchOrgId" :options="orgList" prop="launchOrgId"></cd-select >
              <cd-select label="合作银行:" :options="coBank" v-model="searchForm.coBankId" prop="coBankId"></cd-select>
            </el-col>
            <el-col :sapn="24">
              <cd-select label="投诉状态:" :options="complaintStatus" v-model="searchForm.status" prop="status"></cd-select>
              <cd-select label="投诉升级:" :options="complaintGrades" v-model="searchForm.complaintGrade" prop="complaintGrade"></cd-select>
            </el-col>
            <el-col :sapn="24">
              <cd-input v-model="searchForm.entryTimeStart" prop="entryTimeStart" class="hide"></cd-input>
              <cd-input v-model="searchForm.entryTimeEnd" prop="entryTimeEnd" class="hide"></cd-input>
              <el-col :md="7" :xs="7" :sm="7" :lg="7">
                <el-form-item label="投诉登记时间:">
                  <el-date-picker placeholder="请选择截止时间"  type="date" v-model="searchForm.entryTimeStart" value-format="yyyy-MM-dd" prop="entryTimeStart"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :md="7" :xs="7" :sm="7" :lg="7">
                <el-form-item label="至:">
                  <el-date-picker placeholder="请选择截止时间"  type="date" v-model="searchForm.entryTimeEnd" value-format="yyyy-MM-dd" prop="entryTimeEnd"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :md="24" :sm="24" :xs="24" style="text-align: center">
              <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
              <el-button size="small" icon="el-icon-error" @click="resetForm">清除查询条件</el-button>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </div>
    <div class="ibox">
      <div class="ibox-content">
        <el-col :sapn="24" style="text-align: right">
          <el-button type="primary" @click="downExport" size="small" style="margin-bottom: 10px;">导出数据</el-button>
          <el-button type="primary" @click="reasonDeploy" size="small" style="margin-bottom: 10px;">投诉原因配置</el-button>
          <el-button type="primary" @click="register" size="small" style="margin-bottom: 10px;">投诉登记</el-button>
        </el-col>
        <cd-table
                  :columns="columns"
                  @operation="operate"
                  url="complaint/complaintInfoList"
                  :params="tableParams"
        ></cd-table>
     </div>
    </div>
    <el-dialog title="投诉原因配置" :visible.sync="dialogFormVisible" width="80%" @close="dialogClose">
      <div slot="footer">
        <el-form :model="reasonForm" ref="reasonForm" label-width="120px" size="small" :rules="reasonRule">
          <el-col :span="24">
            <cd-select label="投诉分类:" prop="complaintType" v-model="reasonForm.complaintType" :options="reasonType"></cd-select>
            <cd-input label="投诉原因:" :col-md="8" placeholder="请输入投诉原因" prop="reason" v-model="reasonForm.reason"></cd-input>
            <cd-input label="处理时间(小时):" :col-md="8" placeholder="请输入处理时间" prop="handlingHour" v-model.number="reasonForm.handlingHour"></cd-input>
            <el-button type="primary" @click="addReason" size="small">新增投诉原因</el-button>
          </el-col>
          <el-col :span="24">
            <cd-table
                      :columns="reasonColumns"
                      url="complaint/configList"
                      :params="complaintTypeParams"
            ></cd-table>
          </el-col>
        </el-form>
        <!--<el-button type="primary" size="small" @click="saveReason">保存</el-button>-->
        <el-button type="default" size="small" @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script type="text/ecmascript-6">
    import MockData from '../../../common/js/mockData';
    import cdInput from '../../../components/Input.vue';
    import cdTable from '../../../components/Table.vue';
    import cdSelect from '../../../components/Select.vue';
    import {addTab,Fetch,getSystem,getOrg,tip,getAllBank,getComplainList}  from '../../../common/js/iframe';
    export default{
      name: 'complaintsList',
      components: {
        'cd-input': cdInput,
        'cd-table': cdTable,
        'cd-select': cdSelect
      },
        data(){
          return {
            tableParams: {},
            complaintTypeParams: {},
            columns: [
              {prop:'customerName',label:'客户姓名'},
              {prop:'cardNo',label:'证件号'},
              {prop:'projectNo',label:'贷款编号'},
              {prop:'complaintTypeName',label:'投诉类别'},
              {prop:'operatorName',label:'登记人'},
              {prop:'createTime',label:'登记时间'},
              {prop:'coBankName',label:'合作银行'},
              {prop:'launchOrgName',label:'发起机构'},
              {prop:'overFinishTime',label:'处理回复截止时间'},
              {prop:'statusString',label:'投诉状态'},
              {prop:'complaintGrade',label:'投诉升级', formatter: function (row,coumn,value) {
                return ['否','是'][value] || "--";
              }},
              {prop:'nodeName',label:'当前流程环节'},
              {prop:'nodeOperatorName',label:'当前处理人'},
              {label: '操作',operations: [
                {label:'修改',command:'modify',conditions: [{condition:'canUpdate',value: 1},{condition: 'status',value: 1}]},
                {label:'查看',command: 'viewDetail'}
              ]}
            ],
            currentPage: 1,
            pageSize: 10,
            orgList: [],
            coBank: [],
            complaintStatus: [
              {label:'全部',value:''},
              {label:'未指派',value:1},
              {label:'处理中',value:2},
              {label:'已处理未确认',value:3},
              {label:'超时',value:4},
              {label:'超时完成',value:5},
              {label:'已处理已确认',value:6}
            ],
            complaintGrades: [
              {label:'全部',value:''},
              {label:"是",value:1},
              {label:"否",value:0}
            ],
            reasonType: [
              {label:'全部',value:''},
              {label:'A',value:'A'},
              {label:'B',value:'B'},
              {label:'C',value:'C'}
            ],
            complaintType: [],
            searchForm: {
              customerName: '',
              complaintType: '',
              complaintGrade: '',
              projectNo: '',
              addUserName: '',
              launchOrgId: '',
              coBankId: '',
              status: '',
              entryTimeStart: '',
              entryTimeEnd: ''
            },
            reasonForm: {
              complaintType: '',
              reason: '' ,
              handlingHour: ''
            },
            dialogFormVisible: false,
            reasonList: [],
            reasonColumns: [
              {prop:'complaintType',label:'投诉分类',align:'center'},
              {prop:'reason',label:'投诉原因',align:'center'},
              {prop:'handlingHour',label:'处理时间(小时)',align:'center'},
              {label: '操作',align:'center',operations: [
                {label:'删除',func: this.reasonCancel}
              ]}
            ],
            reasonRule: {
              complaintType: [{required:true,message:'请选择投诉分类'}],
              reason: [{required:true,message:'请填写投诉原因'}],
              handlingHour: [
                {required:true,message:'请填写处理时间'},
                {type:'number',message:'处理时间必须是数字'}
              ]
            }
          }
        },
        methods: {
          search(){
            let params = Object.assign({},this.searchForm);
            this.tableParams = params;
          },
          resetForm(){
            this.$refs['searchForm'].resetFields();
          },
          reasonDeploy(){
            this.complaintTypeParams = {};
            this.dialogFormVisible = true;
          },
          downExport(){
            let search = '';
            for (let keys in this.searchForm){
              search += keys + '=' + this.searchForm[keys] + '&';
            }
            let params = search.substring(0,search.lastIndexOf('&'));
            let downLink = '/api/complaint/complaintInfoExport?' + params ;
            console.log(downLink);
            window.open(downLink, "_blank");
          },
          register(){
            addTab({
              title:'投诉登记',
              href:'./Modal/complaints/complainRegister/complainRegister.html?type=1&status=add&tableName=complaint_info'
            })
          },
          /*
          * 列表操作
          * */
          operate(command){
            if(command.type === 'modify'){
              this.modify(command.item,command.index);
            }else if(command.type === 'viewDetail'){
              this.viewDetail(command.item,command.index);
            }
          },
          modify(item,index){
            addTab({
              title:'投诉登记修改',
              href:'./Modal/complaints/complainRegister/complainRegister.html?type=2&id=' + item.id +"&status=modify&tableName=complaint_info&typeOption=submit&currentNode="+item.nodeKey +"&nodeName="+item.nodeName+"&nodeOperatorName="+item.nodeOperatorName
            })
          },
          viewDetail(item,index){
            addTab({
              title:'查看详情',
              href:'./Modal/complaints/complainRegister/complainRegisterSee.html?type=3&id=' + item.id +"&status=show&tableName=complaint_info"
            })
          },
          //新增投诉原因
          addReason(){
            let _this = this;
            this.$refs['reasonForm'].validate().then(function (val) {
              Fetch(_this,'complaint/addConfig',Object.assign({},_this.reasonForm)).then(function (res) {
                tip(_this,{
                  message: res.data
                });
                _this.$refs['reasonForm'].resetFields();
                _this.complaintTypeParams = {};
              });
            }).catch(function () {
              console.log('fail')
            });
          },
          reasonCancel(row,index){
            let _this = this;
            if(row.id){
              Fetch(this,'complaint/delConfig',{id: row.id}).then(function (res) {
                tip(_this,{
                  message: res.data
                });
                _this.complaintTypeParams = {};
              }).catch(function () {});
            }
          },
          dialogClose(){
            getComplainList(this,'complaintType');
          }
        },
        mounted(){
          getSystem(this);
          //投诉类别
          getComplainList(this,'complaintType');
          //发起机构
          getOrg(this,'orgList');
          //合作银行
          getAllBank(this,'coBank');
          let tbParams = Object.assign({},this.searchForm);
          this.tableParams = tbParams;
        }
    }
</script>
<style scoped>
  .hide{ display: none}
</style>
