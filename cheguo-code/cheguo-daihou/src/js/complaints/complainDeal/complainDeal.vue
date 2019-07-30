<template>
  <div class="wrapper wrapper-content">
    <div class="ibox float-e-margins">
      <div class="ibox-content minHeight">
        <el-tabs v-model="tabName" type="card">
          <el-tab-pane label="投诉详情" name="detail">
            <el-row :gutter="20">
              <el-form :model="dealForm" :rules="dealRule" ref="dealForm" size="small" label-width="80px">
                <el-col :span="24">
                  <cd-select label="合作银行:" v-model="dealForm.coBankId" :offset="1" :disabled="true" :options="coBank"></cd-select>
                  <cd-select label="分公司:" v-model="dealForm.launchOrgId" :disabled="true" :options="orgList"></cd-select>
                </el-col>
                <el-col :span="24">
                  <cd-input label="客户姓名:" placeholder="请输入客户姓名" v-model="dealForm.customerName" :disabled="true" appendSlot="true" :offset="1">
                    <el-button type="primary"  size="small" @click="chooseCustomer" slot="appendSlot" :disabled="true">选择</el-button>
                  </cd-input>
                  <cd-select label="证件类型:" placeholder="请输入证件类型" v-model="dealForm.cardType" :options="cardType" :disabled="true"></cd-select>
                  <cd-input label="证件号码:" placeholder="请输入证件号码" v-model="dealForm.cardNo" :disabled="true"></cd-input>
                </el-col>
                <el-col :span="24">
                  <cd-input label="贷款编号:" v-model="dealForm.projectNo" placeholder="请输入贷款编号" :disabled="true" :offset="1"></cd-input>
                  <cd-input label="投诉类型:" v-model="dealForm.complaintTypeName" :disabled="true"></cd-input>
                  <el-col :md="7" :xs="7" :sm="7" :lg="7" v-if="dealForm.type == 'C'">
                    <el-form-item label="投诉升级">
                      <el-radio-group v-model="dealForm.complaintGrade" disabled>
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="24">
                  <cd-select label="投诉状态:" v-model="dealForm.status" :options="complainStatus" :disabled="true" :offset="1"></cd-select>
                  <el-col :md="8" :xs="8" :sm="8" :lg="8">
                    <el-form-item label="处理回复截止时间:" label-width="120px">
                      <el-date-picker placeholder="请选择截止时间"  type="date" :span="8" v-model="dealForm.overFinishTime" value-format="yyyy-MM-dd" :disabled="true"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-col>
                <cd-input type="textarea" :rows="4" label="投诉详情:" v-model="dealForm.complaintDetail" :col-md="18" :col-xs="18" :col-sm="18" :col-lg="18" :offset="1" :disabled="true"></cd-input>
                <cd-input type="textarea" :rows="4" label="处理过程:" prop="process" v-model="dealForm.process" :col-md="18" :col-xs="18" :col-sm="18" :col-lg="18" :offset="1" :disabled="type != 2" v-if="type >1"></cd-input>
                <el-col :span="21" :offset="1" v-if="type != 5">
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <span class="panel-title">流程意见</span>
                    </div>
                    <div class="panel-body">
                      <el-row>
                        <el-col :span="18" v-if="type == 3 || type == 4 || type == 1" :offset="1">
                          <el-form-item label="意见结论:">
                            <el-radio-group v-model="dealResult">
                              <el-radio :label="1">同意</el-radio>
                              <el-radio :label="2">不同意</el-radio>
                            </el-radio-group>
                          </el-form-item>
                        </el-col>
                        <el-col :span="18" v-if="type == 2" :offset="1">
                          <el-form-item label="处理结果:">
                            <el-radio-group v-model="dealResult">
                              <el-radio :label="1">处理完成</el-radio>
                              <el-radio :label="2">处理失败</el-radio>
                            </el-radio-group>
                          </el-form-item>
                        </el-col>
                        <cd-input type="textarea" label="意见说明:" :rows="4" v-model="opinion" :col-md="18" :col-xs="18" :col-sm="18" :col-lg="18" :offset="1"></cd-input>
                      </el-row>
                    </div>
                  </div>
                </el-col>
                <el-col :span="21" style="text-align: right">
                  <el-button type="primary" size="small" v-if="type != 5 && dealResult == 1" @click="submit">提交</el-button>
                  <el-button type="primary" size="small" v-if="type != 5 && dealResult == 2" @click="backPre">退回上一步</el-button>
                  <!--<el-button type="primary" size="small" v-if="type == 1 && dealResult == 1" @click="submit">指派</el-button>-->
                  <el-button type="primary" size="small" v-if="type == 0" @click="reBack">撤销</el-button>
                  <el-button type="primary" size="small" @click="close">取消</el-button>
                </el-col>
              </el-form>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="过程信息" name="conclusion">
            <el-col :span="16" :offset="4">
              <cd-table :columns="processColumn" :dataLoad="processData"></cd-table>
            </el-col>
          </el-tab-pane>
        </el-tabs>
        <el-dialog title="客户选择" width="80%" :visible.sync="customerDialog">
          <el-row :gutter="20">
            <el-form :model="customerForm" ref="customerForm" label-width="80px" size="small">
              <el-col :span="24">
                <cd-input label="客户名称:" placeholder="请输入客户名称" v-model="customerForm.customerName" prop="customerName" :offset="6"></cd-input>
                <cd-input label="证件号码:" placeholder="请输入证件号码" v-model="customerForm.cardNo" prop="cardNo"></cd-input>
              </el-col>
              <el-col :span="24">
                <cd-input label="手机号码:" placeholder="请输入手机号码" v-model="customerForm.mobilePhone" prop="mobilePhone" :offset="6"></cd-input>
              </el-col>
              <cd-search-button @search="customerSearch" @reset="resetForm"></cd-search-button>
            </el-form>
            <cd-table
                      :columns="columns"
                      url="riskProfile/postLoanCustomerList"
                      :params="customerParams"></cd-table>
          </el-row>
        </el-dialog>
        <flow-user :flowData="flowData" preUrl="complaint/process/preSubmit" nextUrl="complaint/process/submit2next" v-if="flowShow" @dialogClose="closeDialog"></flow-user>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import cdInput from '../../../components/Input.vue';
  import cdSelect from '../../../components/Select.vue';
  import cdTable  from '../../../components/Table.vue';
  import cdSearchButton from '../../../components/searchButton.vue';
  import flowUser from '../../../components/flow.vue';
  import {getSystem,getAllBank,getOrg,closeTab,getArgs,Fetch,tip} from '../../../common/js/iframe';
  export default{
    name: 'complainRegister',
    /*
     type: 0: 投诉发起 1: 内勤/总经理 指派 2: 处理人员处理 3: 总经理/内勤 确认 4: 总部风险部确认 5:查看详情
     */
    data(){
      return {
        type: 1,
        tabName: 'detail',
        processData: [],
        processColumn: [
          {prop:'nodeName',label:'环节名称'},
          {prop:'approvalResult',label:'结论',formatter: function (e,row,cellValue) {
            switch (cellValue){
              case -1: return '待办';
                break;
              case 0: return '不同意';
                break;
              case 1: return '同意';
                break;
            }
          }},
          {prop:'operatorName',label:'处理人'},
          {prop:'approvalDateTime',label:'处理时间'},
          {prop:'approvalNote',label:'处理过程'}
        ],
        customerParams: {},
        coBank:[],
        orgList:[],
        dealResult: 1,
        opinion: '',
        dealForm: {
          projectNo: '',
          complaintTypeName:'',
          projectId:'',
          customerName: '',
          customerId:'',
          launchOrgId: '',
          launchOrgName:'',
          coBankId: '',
          coBankName:'',
          cardType: '',
          cardNo: '',
          complaintType: '',
          type:'',
          complaintGrade: '',
          complaintDetail: '',
          suggestion: '',
          process: '',
          overFinishTime: '',
          complaintStatus: '',
          status: ''
        },
        dealRule: {
          process: [{required: true,message: '处理过程必填'}]
        },
        customerForm: {
          customerName: '',
          cardNo: '',
          mobilePhone: ''
        },
        complainStatus: [
          {label:'全部',value:''},
          {label:'未指派',value:1},
          {label:'处理中',value:2},
          {label:'已处理',value:3},
          {label:'超时',value:4},
          {label:'超时完成',value:5}
        ],
        customerDialog: false,
        customerList:[],
        total: 1,
        page:1,
        pageSize: 10,
        columns: [
          {label: '客户', prop: 'customerName'},
          {label: '身份证', prop: 'cardNo'},
          {label: '证件类型', prop: 'cardType',formatter: function (row,coumn,value) {
            return ['','身份证','军官证','侨胞证','外籍人士'][value];
          }},
          {label: '项目编号', prop: 'projectNo'},
          {label: '客户经理', prop: 'launchUserName'},
          {label: '手机号码', prop: 'mobilePhone'},
          {
            label: '操作', operations: [
            {label: '选择', func: this.addCustomer}
          ]
          }
        ],
        cardType: [
          {label: '身份证', value: 1},
          {label: '军官证', value: 2},
          {label: '侨胞证', value: 3},
          {label: '外籍人士',value: 4},
        ],
        flowData: {},
        flowShow: false
      }
    },
    components: {
      'cd-input': cdInput,
      'cd-select': cdSelect,
      'cd-table': cdTable,
      'cd-search-button': cdSearchButton,
      'flow-user': flowUser
    },
    methods: {
      submit: function () {
        let _this = this;
        this.$refs['dealForm'].validate().then(function () {
          _this.$confirm('是否确认提交', '提示', {
            type: 'warning',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true
          }).then(function () {
            Fetch(_this,'complaint/addProcess',Object.assign({},_this.dealForm,{id: _this.id})).then(function () {
              Fetch(_this,'opinion/only',{bopInfoId: getArgs()['bopInfoId'],conclusion: _this.dealResult,opinion: _this.opinion}).then(function () {
                _this.flowShow = true;
                _this.flowData = {id: _this.id}
              });
            });
          }).catch(function(){});
        });

      },
      closeDialog(){
        this.flowShow = false;
      },
      backPre: function () {
        let _this = this;
        Fetch(_this,'opinion/only',{bopInfoId: getArgs()['bopInfoId'],conclusion: _this.dealResult,opinion: _this.opinion}).then(function () {
          Fetch(_this,'complaint/process/back2pre',{id: _this.id}).then(function (res) {
            tip(_this,{
              message: res.data
            });
            closeTab()
          })
        });
      },
      reBack: function () {
        let _this = this;
        Fetch(this,'complaint/process/cancel',{id: _this.id}).then(function (res) {
          tip(_this,{
            message: '撤销成功'
          });
          closeTab();
        }).catch(function(){})
      },
      //取消
      close: function () {
        closeTab();
      },
      //选择用户
      chooseCustomer: function () {
        let _this = this;
        if(this.dealForm.coBankId && this.dealForm.launchOrgId){
          this.customerDialog = true;
          setTimeout(function () {
            _this.customerParams = Object.assign({},_this.customerForm,
              {
                coBankId: _this.dealForm.coBankId,
                launchOrgId: _this.dealForm.launchOrgId
              });
          },0)
        }
      },
      customerSearch: function () {
        this.customerParams = Object.assign({},this.customerForm,
          {
            coBankId: this.dealForm.coBankId,
            launchOrgId: this.dealForm.launchOrgId
          });
      },
      resetForm: function () {
        this.$refs['customerForm'].resetFields();
      },
      //添加用户
      addCustomer: function (item,index) {
        this.dealForm.customerName = item.customerName;
        this.dealForm.customerId = item.customerId;
        this.dealForm.cardType = item.cardType;
        this.dealForm.cardNo = item.cardNo;
        this.dealForm.projectNo = item.projectNo;
        this.dealForm.projectId = item.projectId;
        this.customerDialog = false;
      }
    },
    mounted(){
      let _this = this;
      getSystem(this);
      getAllBank(this,'coBank');
      getOrg(this,'orgList');
      this.type = getArgs()['type'];
      this.id = getArgs()['id'];
      Fetch(this,'complaint/complaintInfoDetail',{id: this.id}).then(function (res) {
        Object.keys(_this.dealForm).map(function (item) {
          _this.dealForm[item] = res.data.info[item]
        });
//        _this.dealForm = res.data.info;
        _this.processData = res.data.businessObjectProcessInfos
      }).then(function(){})
    }
  }
</script>
