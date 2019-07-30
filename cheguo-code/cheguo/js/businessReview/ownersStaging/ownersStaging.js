//注册组件
Vue.component('v-input',vueComponent.inputComponent);
Vue.component('v-table',vueComponent.tableComp);
Vue.component('v-select',vueComponent.selectComp);
Vue.component('v-radio',vueComponent.radioComp);
Vue.component('modal-fade',vueComponent.modalFade);

var vm = new Vue({
  el:'#ownersStaging',
  data:{
    housingStatus:[
      {value:'1',name:'自有商品住房（1套）'},
      {value:'7',name:'自有商品住房（2套及以上）'},
      {value:'2',name:'自有厂房或者商铺'},
      {value:'3',name:'自建房'},
      {value:'4',name:'父母住房'},
      {value:'5',name:'租借房'},
      {value:'6',name:'父母住房'}
    ],
    education:[
      {value:'1',name:'初中及以下'},
      {value:'2',name:'高中'},
      {value:'3',name:'大专'},
      {value:'4',name:'本科'},
      {value:'5',name:'硕士及以上'}
    ],
    industry:[
      {value:'1',name:'邮电通讯行业'},
      {value:'2',name:'房地产行业'},
      {value:'3',name:'交通运输行业'},
      {value:'4',name:'法律/司法行业'},
      {value:'5',name:'文化/娱乐/体育行业'},
      {value:'6',name:'医疗行业'},
      {value:'7',name:'计算机/网络行业'},
      {value:'8',name:'商业贸易行业'},
      {value:'9',name:'财政行业'},
      {value:'10',name:'税务行业'},
      {value:'11',name:'咨询行业'},
      {value:'12',name:'社会服务行业'},
      {value:'13',name:'旅游/饭店行业'},
      {value:'14',name:'部队系统'},
      {value:'15',name:'证券行业'},
      {value:'16',name:'银行业'},
      {value:'17',name:'保险业'},
      {value:'18',name:'其他金融行业'},
      {value:'19',name:'采矿业'},
      {value:'20',name:'建筑业'},
      {value:'21',name:'工业'},
      {value:'22',name:'制造业'},
      {value:'23',name:'水电气供应'},
      {value:'24',name:'机关团体'},
      {value:'25',name:'农林牧渔'},
      {value:'26',name:'其它'},
      {value:'27',name:'汽修'}
    ],
    monthlyIncome:[
      {value:'1',name:'1-4999'},
      {value:'2',name:'5000-9999'},
      {value:'3',name:'10000-14999'},
      {value:'4',name:'15000-19999'},
      {value:'5',name:'2万以上'}
    ],
    reservedFundsYear:[
      {value:'1',name:'无'},
      {value:'2',name:'1年以内'},
      {value:'3',name:'1年-3年'},
      {value:'4',name:'3年以上'}
    ],
    reservedFunds:[
      {value:'1',name:'无'},
      {value:'2',name:'1-500'},
      {value:'3',name:'501-1000'},
      {value:'4',name:'1001-1500'},
      {value:'5',name:'1501-2000'},
      {value:'6',name:'2001-2500'},
      {value:'7',name:'2501-3000'},
      {value:'8',name:'3000以上'}
    ],
    socialYear:[
      {value:'1',name:'无'},
      {value:'2',name:'1年以内'},
      {value:'3',name:'1年-3年'},
      {value:'4',name:'3年以上'},
    ],
    driverLicence:[
      {value:'2',name:'主贷人有驾照'},
      {value:'3',name:'配偶有驾照'},
      {value:'4',name:'父母/子女有驾照'},
      {value:'5',name:'非直系担保人有驾照'},
      {value:'6',name:'主贷人通过科目一及以上考试'},
      {value:'7',name:'主贷人通过科目二及以上考试'},
      {value:'8',name:'主贷人通过科目三及以上考试'},
      {value:'1',name:'主贷人或担保人科目一以下或无驾照'}
    ],
    table:[
      {field:'emergencyContact',text:'紧急联系人'},
      {field:'mobilePhone',text:'紧急联系电话'},
      {field:'relationship',text:'关系'},
      {field:'contactAddress',text:'地址'},
      {field:'isCarUser',text:'是否实际用车'}
      ]
  },
  ready: function(){
    //基本信息-借款人信息和配偶信息
    getApprovalBaseInfo();
    table_contacter = function (params) {
      var p=params.data;
      return comn.ajax({
        url: interUrl.myTask.customerContacter,
        data: $.extend(loanApplyId,p),
        success: function (res) {
          params.success({
            'total': res.totalItem,
            rows: res.data
          });
          return params.complete();
        }
      });
    };

    $("#table_contacter").bootstrapTable(comn.table);
  }
})