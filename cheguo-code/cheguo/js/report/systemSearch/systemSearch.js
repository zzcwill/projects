Vue.component('v-input',vueComponent.inputComponent);
Vue.component('v-select',vueComponent.selectComp);
Vue.component('v-table',vueComponent.tableComp);

var vm = new Vue({
  el:'#systemSearch',
  data: {
    table:[
      {field:'companyName',text:'归属机构'},
      {field:'departmentName',text:'归属部门'},
      {field:'userName',text:'手机号'},
      {field:'realName',text:'姓名'},
      {field:'orgName',text:'业务机构'},
      {field:'busName',text:'业务组'},
      {field:'roleName',text:'角色权限'},
      {field:'menuName',text:'功能权限'},
      {field:'note',text:'节点权限'},
      {field:'status',text:'用户状态'}
    ]
  },
  methods: {
    //查询
    btnSearch: function(){
      $('#table1').bootstrapTable('refresh',{url:'...'})
    },
    //获取部门
    sectionGet: function(e){
      var value = $(e.currentTarget).find('option:selected').val();
      $('#departmentId').getDepartment(value);
    },
    //获取业务组
    sectionBusGet: function(e){
      var value = $(e.currentTarget).find('option:selected').val();
      $('#busId').getOneGroup(value);
    },
    //导出
    exportTable: function(){
      var search=$("#searchForm").serialize();
      var downLink = interUrl.basic + interUrl.report.sysuserExport + '?' + search + '&uId=' + comn.user.uid;
      console.log(downLink);
      window.open(downLink, "_blank");
    }
  },
  ready: function(){
    $('#companyId').getBranchCompany();
    $('#orgId').getOrg();
    $('#roleId').getRuleList();
  }
});

var dataLoad1,userStatus;
//数据列表
dataLoad1=function(params){
  var p;
  p = params.data;
  tableData(
    params,
    $.extend($("#searchForm").values(), p,{uId:comn.user.uid}),
    interUrl.report.sysuserList
  )
};
//用户状态
//userStatus = function(value,row,index){
//  return ['正常','停用'][value];
//};