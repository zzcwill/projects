<template>
  <div class="wrapper wrapper-content">
    <div class="ibox float-e-margins">
      <div class="ibox-content">
        <el-row :gutter="20">
          <el-form :model="registerForm" ref="registerForm" :rules="registerRule" label-width="130px" size="small">
            <el-col :span="24">
              <cd-select label="合作银行:" v-model="registerForm.coBankId" @selectChange="getBankName" prop="coBankId" :disabled="type != 1"  :options="coBank" :offset="1"></cd-select>
              <cd-select label="分公司:" v-model="registerForm.loanOrgId" @selectChange="getOrgName" prop="loanOrgId"  :disabled="type != 1" :options="orgList"></cd-select>
            </el-col>
            <el-col :span="24">
              <cd-input label="客户姓名:" placeholder="请输入客户姓名" v-model="registerForm.customerName" prop="customerName" :disabled="true"
              appendSlot="true" :offset="1" :col-md="7" :col-xs="7" :col-sm="7" :col-lg="7">
              <el-button type="primary" size="small" @click="chooseCustomer" slot="appendSlot" :disabled="type != 1">
                选择客户
              </el-button>
              </cd-input>
              <cd-select label="证件类型:" :options="cardType" v-model="registerForm.cardType" prop="cardType" :disabled="true"></cd-select>
              <cd-input label="证件号码:" placeholder="请输入证件号码" v-model="registerForm.cardNo" prop="cardNo" :disabled="true"></cd-input>
            </el-col>
            <el-col :span="24">
              <cd-input label="贷款编号:" placeholder="请输入贷款编号" v-model="registerForm.projectNo" prop="projectNo" :disabled="true" :offset="1"></cd-input>
              <cd-input label="贷款额:" placeholder="请输入贷款额" v-model.number="registerForm.loanAmount" prop="loanAmount" :disabled="true"></cd-input>
              <cd-input label="车牌:" placeholder="请输入车牌" v-model="registerForm.plateNo" prop="plateNo" :disabled="true"></cd-input>
            </el-col>
            <el-col :span="24">
              <cd-input label="还款卡号:" placeholder="请输入还款卡号" v-model="registerForm.repaymentCardNo" prop="repaymentCardNo" :disabled="type == 3 || repaymentCardNo" :offset="1"></cd-input>
              <el-col :span="7">
                <el-form-item label="理赔盖章申请日期:" prop="claimSealApplyDate">
                  <el-date-picker v-model="registerForm.claimSealApplyDate" type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" :disabled="type == 3"></el-date-picker>
                </el-form-item>
              </el-col>
              <cd-input label="理赔金额" placeholder="请输入理赔金额" v-model="registerForm.claimAmount" prop="claimAmount" :disabled="type == 3"></cd-input>
            </el-col>
            <el-col :span="24">
              <cd-input label="盖章前存入:"  placeholder="请输入盖章前存入" v-model.number="registerForm.sealBeforeAmount" prop="sealBeforeAmount" :disabled="type == 3" :offset="1"></cd-input>
              <cd-input label="理赔款存入:"  placeholder="请输入理赔款存入" v-model.number="registerForm.claimSavings" prop="claimSavings" :disabled="type == 3"></cd-input>
            </el-col>
            <el-col :span="24">
              <cd-input label="车损:" placeholder="请输入车损" v-model.number="registerForm.carDamageAmount" prop="carDamageAmount" :disabled="type == 3" :offset="1"></cd-input>
              <cd-input label="车损占贷款额比例(%)" placeholder="请输入车损占贷款额比例" v-model="carDamageAmountPercent" :disabled="true"></cd-input>
              <cd-select label="事故类型:" :options="accidentType" v-model="registerForm.accidentType" prop="accidentType" :disabled="type == 3"></cd-select>
            </el-col>

            <el-col :span="24" style="margin-top: 30px">
              <el-form :model="gpsForm" :rules="gpsRule" ref="gpsForm" label-width="130px" size="small">
                <cd-input label="IMEI:" placeholder="请输入IMEI" v-model="gpsForm.imei" prop="imei" :disabled="type == 3" :offset="1"></cd-input>
                <cd-select label="品牌:" @selectChange="getSupplierName" :options="supplierList" v-model="gpsForm.gpsSupplierId" prop="gpsSupplierId" :disabled="type == 3"></cd-select>
                <el-col :md="3" :xs="3" :sm="3" :lg="3">
                  <el-button type="primary" size="mini" @click="addGps" :disabled="type == 3">添加</el-button>
                </el-col>
              </el-form>
            </el-col>
            <el-col :span="18" :offset="3">
              <cd-table :params="gpsParams" :columns="gpsColumns" :dataLoad="gpsList"></cd-table>
              <!--<cd-table :params="gpsParams" :columns="gpsColumns" url="" v-else></cd-table>-->
            </el-col>
            <el-col :span="18" :offset="1" style="text-align: right">
              <el-button type="primary" @click="save" v-if="type != 3" size="small">保存</el-button>
              <el-button type="primary" @click="close" size="small">关闭</el-button>
            </el-col>
          </el-form>
        </el-row>
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
              :params="customerParams"
              url="riskProfile/postLoanCustomerList"
            ></cd-table>
          </el-row>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import cdInput from '../../../components/Input.vue';
  import cdSelect from '../../../components/Select.vue';
  import cdTable from '../../../components/Table.vue';
  import cdSearchButton from '../../../components/searchButton.vue';
  import {Fetch,closeTab,getAllBank,getOrg,getArgs,getSystem,tip,getSupplierList} from '../../../common/js/iframe';
  export default{
    /*
    type: 1: 登记 2:修改 3:查看详情
    registerForm.id: 确定是新增还是修改 为空是新增
     */
    name: '',
    components: {
      'cd-input': cdInput,
      'cd-select': cdSelect,
      'cd-table': cdTable,
      'cd-search-button': cdSearchButton
    },
    data(){
      let checkNumber = function (rule,value,callback) {
        if(isNaN(value)) {
          callback(new Error('请输入正确的金额'));
        }
        if(value.toString().split('.').length > 1 && value.split('.')[1].length > 2){
          callback(new Error('最多只能输入两位小数'))
        }else{
          callback();
        }
      };
      let checkImei = function (rule,value,callback) {
        if(isNaN(value)) {
          callback(new Error('请输入正确的数字'));
        }
//        if(value.length != 15) {
//          callback(new Error('imei的长度必须是15位'));
//        }
        callback();
      }
      return {
        type: '',
        repaymentCardNo: '',
        registerForm: {
          id: '',
          coBankId:'',
          coBankName:'',
          loanOrgId: '',
          loanOrgName:'',
          customerId: '',
          customerName: '',
          cardType: '',
          cardNo: '',
          projectId: '',
          projectNo: '',
          loanAmount: '',
          plateNo: '',
          repaymentCardNo: '',
          claimSealApplyDate: '',
          claimAmount: '',
          sealBeforeAmount: '',
          claimSavings: '',
          carDamageAmount: '',
          accidentType: ''
        },
        gpsForm: {
          imei: '',
          gpsSupplierId: '',
          gpsSupplierName: ''
        },
        gpsRule: {
          imei: [
            {required: true,message:'imei号必填',trigger:'blur'},
            {validator: checkImei,trigger: 'blur'}
          ],
          gpsSupplierId: [{required: true,message:'gps类型必选'}]
        },
        supplierList: [],
        gpsParams: {},
        gpsList: [],
        registerRule: {
          coBankId: [{required: true,message:'合作银行必填'}],
          loanOrgId: [{required: true,message:'分公司必选'}],
          customerName: [{required: true,message:'客户姓名必填'}],
          claimSealApplyDate: [{required: true,message:'理赔盖章申请日期必填'}],
          claimAmount: [{required: true,message:'理赔金额必填'},{validator: checkNumber}],
          carDamageAmount: [{required: true,message:'车损价格必填'}],
          accidentType: [{required: true,message:'事故类型必选'}]
        },
        customerForm: {
          customerName: '',
          cardNo: '',
          mobilePhone: ''
        },
        customerParams: {},
        coBank: [],
        orgList: [],
        cardType: [
          {label: '身份证',value: 1},
          {label: '军官证',value: 2},
          {label: '侨胞证',value: 3},
          {label: '外籍人士',value: 4}
        ],
        accidentType: [
          {label:'单方',value: 1},
          {label:'双方',value: 2}
        ],
        gpsSupplierList: [],
        gpsColumns: [
          {prop: 'imei',label:'IMEI'},
          {prop: 'gpsSupplierName',label:'品牌'},
          {label:'操作',operations: [
            {label:'取消',func: this.deleteGps,conditions: [{condition:'gpsIsRegister',judge: '!=',value: 1}]}
          ]}
        ],
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
        customerDialog: false
      }
    },
    methods: {
      getBankName(val){
        this.clearCustomer();
        let obj = this.coBank.filter(function (item) {
          return item.value === val;
        });
        this.registerForm.coBankName = obj[0].label;
      },
      getOrgName(val){
        this.clearCustomer();
        let obj = this.orgList.filter(function (item) {
          return item.value === val;
        });
        this.registerForm.loanOrgName = obj[0].label;
      },
      getSupplierName(val){
        let obj = this.supplierList.filter(function (item) {
          return item.value == val;
        });
        this.gpsForm.gpsSupplierName = obj[0].label;
      },
      clearCustomer: function () {
        this.setValue(this.registerForm,'','customerName','customerId','cardType','cardNo','projectNo','projectId','loanAmount','plateNo','repaymentCardNo');
      },
      //选择用户
      chooseCustomer: function () {
        let _this = this;
        if(this.registerForm.coBankId && this.registerForm.loanOrgId){
          this.customerDialog = true;
          setTimeout(function () {
            _this.customerParams = Object.assign({},_this.customerForm,
              {
                coBankId: _this.registerForm.coBankId,
                launchOrgId: _this.registerForm.loanOrgId
              });
          },0);

        }else{
          tip(this,{
            type:'warning',
            message: '请先选择合作银行和分公司'
          })
        }
      },
      customerSearch: function () {
        this.customerParams = Object.assign({},this.customerForm,
          {
            coBankId: this.registerForm.coBankId,
            launchOrgId: this.registerForm.loanOrgId
          });
      },
      resetForm: function () {
        this.$refs['customerForm'].resetFields();
      },
      //添加用户
      addCustomer: function (item, index) {
        let _this = this;
        this.setValue(this.registerForm,item,'customerName','customerId','cardType','cardNo','projectNo','projectId','loanAmount','plateNo','repaymentCardNo');
        this.repaymentCardNo = item.repaymentCardNo ? true : false;
        this.customerDialog = false;
        if(this.registerForm.projectId){
          Fetch(this,'gps/get/installList',{projectId: this.registerForm.projectId}).then(function (res) {
            let gpsArray = res.data;
            _this.gpsList = gpsArray.map(function (item) {
              return {
                imei: item.imei,
                gpsSupplierId: item.supplierId,
                gpsSupplierName: item.supplierName,
                gpsIsRegister: 1
              }
            })
          })
        }
      },
      /*
      添加/删除  (修改时 后台执行操作,新增时 本地执行)
      addGps: 添加gps数据
      deleteGps 删除gps数据
       */
      addGps(){
        let _this = this;
        this.$refs['gpsForm'].validate().then(function () {
          if(_this.registerForm.id){
            Fetch(_this,'claim/addClaimGps',Object.assign(_this.gpsForm,{claimSettlementId: _this.registerForm.id,gpsIsRegister: 0})).then(function (res) {
              tip(_this,{
                message: res.data
              });
              _this.gpsList.push(_this.gpsForm);
              _this.gpsForm = {
                imei: '',
                gpsSupplierId: '',
                gpsSupplierName: ''
              }
            }).catch(function(){})
          }else{
            _this.gpsList.push(Object.assign(_this.gpsForm,{gpsIsRegister: 0}));
            _this.gpsForm = {
              imei: '',
              gpsSupplierId: '',
              gpsSupplierName: ''
            }
          }
        })
      },
      deleteGps(item,index){
        let _this = this;
        if(this.type == 3){
          return tip(this,{
            type: 'warning',
            message: '查看状态不允许删除'
          })
        }else{
          if(this.registerForm.id){
            Fetch(this,'claim/delClaimGps',{imei: item.imei,claimSettlementId: this.registerForm.id}).then(function (res) {
              _this.gpsList.splice(index,1);
              tip(_this,{
                message: res.data
              })
            }).catch(function(){})
          }else{
            this.gpsList.splice(index,1)
          }
        }

      },
      //保存
      save: function () {
        let _this = this;
        this.registerForm.gpsListJson = JSON.stringify(this.gpsList);
        if(this.registerForm.id){
          delete this.registerForm.gpsList;
        }
        this.$refs['registerForm'].validate().then(function () {
          Fetch(_this,'claim/addOrUpdate',_this.registerForm).then(function (res) {
            tip(_this,{
              message: res.message
            });
            closeTab();
          }).catch(function(){})
        }).catch(function(){console.log('fail')})
      },
      close(){
        closeTab();
      },
      /*
      设置对象值:
        target: 目标对象
        source: 源对象
        entries: key组
       */
      setValue: function (target,source,...entries) {
        if(typeof source !== 'object'){
          source = {}
        }
        entries.forEach(function (key) {
          target[key] = source[key] || ''
        })
      }
    },
    computed: {
      carDamageAmountPercent(){
       if(this.registerForm.loanAmount) {
         return ((this.registerForm.carDamageAmount/this.registerForm.loanAmount)*100).toFixed(2)
       }else{
         return '';
       }

      }
    },
    mounted(){
      let _this = this;
      getSystem(this);
      getAllBank(this,'coBank');
      getOrg(this,'orgList');
      getSupplierList(this,'supplierList');
      this.type = getArgs()['type'];
      this.registerForm.id = getArgs()['id'] || '';
      //获取数据
      if(this.type == 2 || this.type == 3){
        Fetch(this,'claim/get',{claimId: _this.registerForm.id}).then(function (res) {
          _this.registerForm = res.data;
          _this.gpsList = res.data.gpsList;
        })
      }
    }
  }
</script>
