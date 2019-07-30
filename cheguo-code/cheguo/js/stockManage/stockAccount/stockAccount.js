/**
 * Created by apple on 17/10/16.
 */
//注册组件
Vue.component('v-select',vueComponent.selectComp);
Vue.component('v-input',vueComponent.inputComponent);
Vue.component('v-table',vueComponent.tableComp);

var vm = new Vue({
  el:'#stockAccount',
  data: {
    stockTable: [
      {field:'operatorName',text:'当前责任人'},
      {field:'userName',text:'用户账号'},
      {field:'orgName',text:'所属机构'},
      {field:'areaName',text:'所属区域'},
      {field:'installName',text:'安装员'},
      //{field:'supplierName',text:'供应商'},
      //{field:'productSpec',text:'规格型号'},
      //{field:'productType',text:'产品类型',formater:'gpsType'},
      {field:'inStockCount',text:'在库数'},
      {field:'onTheWayCount',text:'在途数'}
    ],
    detailTable: [
      {field:'operatorName',text:'当前责任人'},
      {field:'userName',text:'用户账号'},
      {field:'orgName',text:'所属机构'},
      {field:'areaName',text:'所属区域'},
      {field:'installName',text:'安装员'},
      {field:'supplierName',text:'供应商'},
      {field:'productSpec',text:'规格型号'},
      {field:'productType',text:'产品类型',formater:'gpsType'},
      {field:'imei',text:'IMEI'},
      {field:'sim',text:'SIM'},
      {field:'stockStatus',text:'终端状态',formater:'stockStatus'}
      //{field:'customerName',text:'客户名称'},
      //{field:'cardNo',text:'身份证号'}
    ],
    terminalStatue: [
      {name:'在库',value:'2'},
      {name:'在途',value:'3'},
      {name:'已丢失',value:'5'},
      {name:'已安装',value:'8'},
      {name:'维修中',value:'4'}
    ],
    detail: false
  },
  methods: {
    btnSearch: function(){
      var table = $('.tab-pane.active').find('table').eq(1).attr('id');
      $('#'+table ).bootstrapTable('refresh',{url:'...'});
    },
    resetForm: function(){
      if($('#orgId').attr('disabled') == 'disabled'){
        var orgId = $('#orgId').find('option:selected').val();
        $('#areaId').getStockGroup(orgId);
      }else{
        $('#areaId').html('<option value="">--请选择--</option>');
      }
      if($('#userId').attr('disabled') == 'disabled'){
        var groupId = $('#userId').find('option:selected').val();
        $('#userId').getStockUser(groupId);
      }else{
        $('#userId').html('<option value="">--请选择--</option>');
      }
      $('#specificPro').getSpecProduct();
    },
    //判断是汇总列表还是明细列表
    isDetail: function(e){
      var toggleName = e.target.innerHTML;
      if(toggleName == '汇总'){
        vm.detail = '';
      }else if(toggleName == '明细'){
        vm.detail = 'detail';
      }
    },
    //根据机构获取所属区域
    getGroup: function (e) {
      var orgId = $(e.currentTarget).find('option:selected').val();
      $('#areaId').html('<option value="">--请选择--</option>');
      $('#userId').html('<option value="">--请选择--</option>');
      if(orgId){
        $('#areaId').getStockGroup(orgId);
      }
    },
    //获取安装员列表
    getUser: function (e){
      var groupId = $(e.currentTarget).find('option:selected').val();
      $('#userId').html('<option value="">--请选择--</option>');
      if(groupId){
        $('#userId').getStockUser(groupId);
      }
    },
    //根据 供应商/产品类型 获取规格型号
    getSpecificPro: function (e){
      var supplierId = $('#specificSupp').find('option:selected').val();
      var productType = $('#speProduct').find('option:selected').val();
      $('#specificPro').getSpecProduct(supplierId,productType);
    }
  },
  ready: function(){
    $('#specificSupp').getSupplier();
    $('#orgId').getStockCompany(function (data) {
      if(data.length == 1){
        $('#orgId').attr('disabled','disabled');
        $('#areaId').getStockGroup(data[0].id, function (data) {
          if(data.length == 1){
            $('#areaId').attr('disabled','disabled');
            $('#userId').getStockUser(data[0].id);
          }
        });
      }
    });
    $('#specificPro').getSpecProduct();
  }
});

var stockAccount,stockDetail,stockStatus;
//修改表格统一配置参数
var tableConfig = {};
$.map(comn.table, function (v, k) {
  tableConfig[k] = v;
});
var height = document.body.clientHeight - $('.ibox').outerHeight() - $('.nav').outerHeight() - 60;
tableConfig['height'] = height;
tableConfig['pagination'] = false;
//汇总数据列表
stockAccount = function(params){
  var p;
  p = params.data;
  comn.ajax({
    url:interUrl.purchase.stockAccount,
    data: $.extend($("#searchForm").values(),p),
    success: function(res){
      params.success({
        'total': res.totalItem,
        'rows': res.data.datas
      });
      params.complete();
      var length = $('#stockTable').bootstrapTable('getData').length;
      if(length > 0){
        var cols = vm.stockTable.length;
        $('#stockTable').bootstrapTable('append',{operatorName:'合计',inStockCount:res.data.conditions.inStockAmount,onTheWayCount: res.data.conditions.onWayAmount});
        $('#stockTable').bootstrapTable('mergeCells',{index: length,field:'operatorName',colspan: cols-2})
      }
    }
  });
};
$('#stockTable').bootstrapTable(tableConfig);

//明细数据列表
stockDetail = function(params){
  var p;
  p = params.data;
  tableData(
    params,
    $.extend($("#searchForm").values(), p),
    interUrl.purchase.stockDetail
  )
};

//终端状态
stockStatus = function(value){
  return ['','','在库','在途','维修中','已丢失','','','已安装'][value]
};