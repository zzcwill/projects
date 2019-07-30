<template>
  <div class="wrap wrapper-content">
    <div class="ibox float-e-margins">
      <div class="ibox-content">
        <el-row :gutter="20">
          <el-form :model="searchForm" ref="searchForm" label-width="80px" size="small">
            <el-col :span="24">
              <cd-input label="客户姓名:" placeholder="请输入客户姓名" v-model="searchForm.customerName" prop="customerName" :offset="1"></cd-input>
              <cd-input label="理赔编号:" placeholder="请输入理赔编号" v-model="searchForm.claimNo" prop="claimNo"></cd-input>
              <cd-input label="贷款编号:" placeholder="请输入贷款编号" v-model="searchForm.projectNo" prop="projectNo"></cd-input>
            </el-col>
            <el-col :span="24">
              <cd-input label="登记人:" placeholder="请输入登记人" v-model="searchForm.registrantName" :offset="1" prop="registrantName"></cd-input>
              <cd-select label="发起机构:" v-model="searchForm.loanOrgId" prop="loanOrgId" :options="orgList"></cd-select>
              <cd-select label="合作银行:" v-model="searchForm.coBankId" prop="coBankId" :options="coBank"></cd-select>
            </el-col>
            <el-col :span="21" :offset="1">
              <el-form-item label="理赔盖章申请日期:" label-width="140px">
                <el-col :span="6">
                  <el-date-picker type="date" placeholder="选择起始日期" v-model="searchForm.claimSealApplyDateStart" prop="claimSealApplyDateStart" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="6">
                  <el-date-picker type="date" placeholder="选择截止日期" v-model="searchForm.claimSealApplyDateEnd" prop="claimSealApplyDateEnd" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                </el-col>
              </el-form-item>
            </el-col>
            <cd-search-btn @search="btnSearch" @reset="resetForm"></cd-search-btn>
          </el-form>
        </el-row>
      </div>
    </div>
    <div class="ibox float-e-margins">
      <div class="ibox-content">
        <el-row :gutter="20">
          <el-col :sapn="24" style="text-align: right;margin-bottom: 15px">
            <el-button type="primary" @click="exportExcel" size="small">导出</el-button>
            <el-button type="primary" @click="claimsRegister" size="small">理赔登记</el-button>
          </el-col>
        </el-row>
        <cd-table :params="tableParams" url="claim/list" :columns="columns" @operation="operate"></cd-table>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import cdInput from '../../../components/Input.vue';
  import cdSelect from '../../../components/Select.vue';
  import cdSearchBtn from '../../../components/searchButton.vue';
  import cdTable from '../../../components/Table.vue';
  import {Fetch,getSystem,getAllBank,getOrg,addTab} from '../../../common/js/iframe';
  export default{
    name: '',
    components: {
      'cd-input': cdInput,
      'cd-select': cdSelect,
      'cd-table': cdTable,
      'cd-search-btn': cdSearchBtn
    },
    data(){
      return {
        searchForm: {
          customerName: '',
          loanOrgId: '',
          coBankId: '',
          claimSealApplyDateStart: '',
          claimSealApplyDateEnd: '',
          registrantName: '',
          projectNo: '',
          claimNo: ''
        },
        tableParams: {},
        columns: [
          {prop: 'claimNo',label:'理赔编号'},
          {prop: 'customerName',label:'客户姓名'},
          {prop: 'cardNo',label:'证件号'},
          {prop: 'repaymentCardNo',label:'还款卡号'},
          {prop: 'loanAmount',label:'贷款额'},
          {prop: 'claimSealApplyDate',label:'理赔盖章申请日期'},
          {prop: 'claimAmount',label:'理赔金额'},
          {prop: 'carDamageAmount',label:'车损'},
          {prop: 'coBankName',label:'合作银行'},
          {prop: 'loanOrgName',label:'发起机构'},
          {prop: 'registrantName',label:'登记人'},
          {label: '操作',operations: [
            {label:'修改',command:'modify',conditions:[{condition:'showUpdateMenu',value:1}]},
            {label:'查看详情',command:'viewDetail'}
          ]}
        ],
        coBank: [],
        orgList: []
      }
    },
    methods: {
      btnSearch(){
        console.log(this.searchForm.claimSealApplyDateStart);
        this.tableParams = Object.assign({},this.searchForm);
      },
      resetForm(){
        this.$refs['searchForm'].resetFields();
        this.searchForm.claimSealApplyDateStart = '';
        this.searchForm.claimSealApplyDateEnd = '';
      },
      //导出报表
      exportExcel(){
        let search = '';
        for (let keys in this.searchForm){
          search += keys + '=' + this.searchForm[keys] + '&';
        }
        let params = search.substring(0,search.lastIndexOf('&'));
        var downLink = '/api/claim/export?' + params;
        window.open(downLink, "_blank");
      },
      claimsRegister(){
        addTab({
          title:'理赔登记',
          href: './Modal/claims/cliaimsRegister/claimsRegister.html?type=1'
        });
      },
      /*
       列表操作类型
          modify: 修改  (登记用户才有修改的权限)
          viewDetail: 查看详情
       */
      operate(command){
        if(command.type == 'modify'){
          this.modify(command.item,command.index)
        }else if(command.type == 'viewDetail'){
          this.viewDetail(command.item,command.index)
        }
      },
      modify(item,index){
        addTab({
          title:'理赔登记修改',
          href: './Modal/claims/cliaimsRegister/claimsRegister.html?type=2&id=' + item.id
        })
      },
      viewDetail(item,index){
        addTab({
          title: '查看详情',
          href: './Modal/claims/cliaimsRegister/claimsRegister.html?type=3&id=' + item.id
        })
      }
    },
    mounted(){
      getSystem(this);
      getAllBank(this,'coBank');
      getOrg(this,'orgList');
      this.tableParams = Object.assign({},this.searchForm);
    }
  }
</script>
