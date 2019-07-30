/**
 * Created by guo on 17/7/25.
 */
//注册组件
Vue.component('v-input',vueComponent.inputComponent);
Vue.component('v-table',vueComponent.tableComp);
Vue.component('v-select',vueComponent.selectComp);
Vue.component('plan-date',vueComponent.planDate);

var vm = new Vue({
  el:'#stockManage',
   /*
    collarMode 领用方式
    applyStatue 申请状态
    companyApplyStatue: 分公司申请状态
    areaApplyStatue: 区域申请状态
    applyItem 列表详情
    stockType 空白合同状态 1:分公司 2:区域
    title: 操作申请: 分公司/区域/客户经理
    head: 标题
   */
  data:{
    collarMode: [
      {value:'1',name:'快递'},
      {value:'2',name:'自取'}
    ],
    companyApplyStatue: [
      {value:'1',name:'待提交'},
      {value:'2',name:'待集团审批'},
      {value:'3',name:'待银行审批'},
      {value:'4',name:'待寄送'},
      {value:'5',name:'待签收'},
      {value:'6',name:'已签收'},
      {value:'7',name:'已撤销'},
      {value:'8',name:'集团审批不通过'},
      {value:'9',name:'银行审批不通过'}
    ],
    areaApplyStatue: [
      {value:'1',name:'待提交'},
      {value:'2',name:'待寄送'},
      {value:'5',name:'待签收'},
      {value:'6',name:'已签收'},
      {value:'7',name:'已撤销'}
    ],
    applyItem: [
      {field:'applyNo',text:'领用编号'},
      {field:'applyTime',text:'申请时间'},
      {field:'expressType',text:'领用方式',formater:'expressType'},
      {field:'bankName',text:'合作银行'},
      {field:'applyRemark',text:'备注'},
      {field:'status',text:'状态',formater:'statue'}
    ],
    title: "",
    head: "",
    stockType: 1
  },
  methods:{
    btnSearch: function(){
      $("#table").bootstrapTable('refresh',{url:'...'});
    },
    //新增领用单
    newList: function(){
      //debugger;
      comn.addTab({
        href:'./Modal/blankContract/flowApproval/index.html?applyRole=' + args['applyRole'] + '&head=新增领用单-' + this.title,
        title:'新增领用单-' + this.title
      });
    }
  },
  ready: function(){
    var args = comn.getArgs();
    switch (args['applyRole']){
      case 'company':
        this.title = '机构';
        this.head = '领用申请-机构';
        this.stockType = 1;
        break;
      case 'area':
        this.title = '区域';
        this.head = "领用申请-区域";
        this.stockType = 2;
        break;
      case 'personal':
        this.title = '客户经理';
        this.head = "领用申请-个人";
        break;
    }
    $("#bankId").contractBankGet();
  }
});

var dataLoad,handle,operate,statue,expressType;
var args = comn.getArgs();
dataLoad = function(params){
  tableData(params,$('#searchForm').values(),interUrl.blankContract.contractList);
};
handle = function(value,row,index){
  return ["<div class='btn-group btn-group-xs'>",
    "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作",
      "<span class='caret'></span>",
      "<span class='sr-only'>下拉切换</span>",
    "</button>",
    "<ul class='dropdown-menu' role='menu'>",
      (function(){if(row.status == 1){
        return "<li><a class='modify'>修改</a></li>"
      }})(),
      "<li><a class='view'>查看</a></li>",
    (function(){if(row.status == 1 || row.status == 4 ){
      return "<li><a href='javascript:;' class='reback'>撤销</a></li>"
    }})(),
    "</ul>",
    "</div>"].join("");
};

operate = {
  'click .modify': function(e,a,item,index){
    comn.addTab({
      href:'./Modal/blankContract/flowApproval/index.html?modify=true&applyRole=' + args['applyRole'] + '&contractApplyId=' + item.id + '&head=修改领用单-' + vm.title,
      title:'修改领用单-' + vm.title
    });
  },
  'click .view': function(e,a,item,index){
    comn.addTab({
      href:'./Modal/blankContract/flowApproval/index.html?modify=false&viewType=3&applyRole=' + args['applyRole'] + '&contractApplyId=' + item.id + '&head=查看领用单-' + vm.title,
      title:'查看领用单-' + vm.title
    });
  },
  'click .reback': function (e,a,item,index){
    var url;
    url = interUrl.blankContract.contractCancel;
    if(item.status == 4){
      url = interUrl.blankContract.companyCancel;
    }
    if(comn.getArgs()['applyRole'] == 'area'){
      url = interUrl.blankContract.areaClose;
    }
    comn.ajax({
      url: url,
      data: {
        contractApplyId: item.id
      },
      success: function(){
        tip({
          content: '撤销成功'
        });
        $('#table').bootstrapTable('refresh',{url:'...'})
      }
    })
  }
};
//状态
statue = function(value,row,index){
  return [null,'待提交','待集团审批','待银行审批','待寄送','待签收','已签收','已撤销','集团审批不通过','银行审批不通过'][value];
};
//领用状态
expressType = function(value,row,idnex){
  return ['','快递','自取'][value]
};