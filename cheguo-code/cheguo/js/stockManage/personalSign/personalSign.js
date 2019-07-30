//组册组件
Vue.component('v-input',vueComponent.inputComponent);
Vue.component('v-select',vueComponent.selectComp);
Vue.component('v-table',vueComponent.tableComp);
/*
  table1: 个人认领记录列表
  signStatus: 签收状态
  type: 判断是否查看详情还是签收 sign: 签收 view: 查看
  distributeId: 签收id
  distributeNo: 签收编号
 */
var vm = new Vue({
  el:'#sign',
  data: {
    table1: [
      {field:'createTime',text:'分配日期'},
      {field:'orgName',text:'所属机构'},
      {field:'groupName',text:'所属区域'},
      {field:'userName',text:'分配人'},
      {field:'distributeAmount',text:'分配数量'},
      {field:'status',text:'签收状态',formater:'disStatus'},
      {field:'stockTimeClerk',text:'签收时间'}
    ],
    table2:[
      {field:'supplierName',text:'供应商'},
      {field:'productSpec',text:'规格型号'},
      {field:'productType',text:'产品类型',formater:'gpsType'},
      {field:'price',text:'入库价格'},
      {field:'imei',text:'IMEI'},
      {field:'sim',text:'SIM'}
    ],
    signStatus: [
      {value:'0',name:'未签收'},
      {value:'1',name:'已签收'},
      {value:'2',name:'已撤销'}
    ],
    type: 'sign',
    distributeId: '',
    distributeNo: ''
  },
  methods: {
    btnSearch: function () {
      $("#table1").bootstrapTable('refresh', {url: '...'});
    },
    //确认签收
    confirm: function () {
      comn.ajax({
        url:interUrl.purchase.distributeDetailUpdate,
        data:{
          distributeId: vm.distributeId,
          distributeNo: vm.distributeNo
        },
        success:function(res){
          if(res.code == 40000){
            $('#confirmClick').attr('disabled','disabled')
          }else{
              tip({
                  content:'签收成功'
              });
              $('#detailModal').modal('hide');
              $("#table1").bootstrapTable('refresh',{url:'...'});
          }

        }
      })
    }
  },
  ready: function () {

  }
});

var handle,tableEvent1,dataLoad1,dataLoad2,disStatus;
//设备签收列表
dataLoad1=function(params){
  var p;
  p = params.data;
  tableData(
    params,
    $.extend($("#searchForm").values(), p),
    interUrl.purchase.distributeList
  )
};
handle=function(value,row,index){
  if(row.status == 2){
    return ''
  }
  return ['<button class="btn btn-primary btn-xs operate">'+
  (function (status) {
    return status == 0 ? '确认签收' : '查看详情';
  })(row.status)
  +'</button>'].join("");
};
tableEvent1={
  'click .operate': function (e,a,item,index) {
    vm.type = item.status == 0 ? 'sign' : 'view';
    vm.distributeId = item.id;
    vm.distributeNo = item.distributeNo
    console.log(vm.type);
    $('#detailModal').modal('show');
    $('#confirmClick').attr('disabled',false);
    $(".viewList").val(item.distributeNo);
    $('#detailForm').values(item);
    $("#table2").bootstrapTable("refresh",{url:'...'});
  }
};
disStatus = function(value,row,index){
  return ['未签收','已签收','已撤销'][value]
};

//GPS详情列表
dataLoad2=function(params){
  var p;
  p = params.data;
  if($(".viewList").val()){
    tableData(
      params,
      $.extend({distributeNo:$(".viewList").val()}, p),
      interUrl.purchase.distributeDetail
    )
  }

};