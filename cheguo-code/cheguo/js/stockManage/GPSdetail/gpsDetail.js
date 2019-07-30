Vue.component('v-input',vueComponent.inputComponent);
Vue.component('v-select',vueComponent.selectComp);
Vue.component('v-table',vueComponent.tableComp);

var vm = new Vue({
  el:'#gpsDetail',
  data:{
    detailTable: [
      //{field:'serviceStartTime',text:'激活时间'},
      //{field:'serviceEndTime',text:'用户到期时间'},
      //{field:'statusType',text:'设备状态',formater:'statusOpen'},
      {field:'orgName',text:'所属机构'},
      {field:'areaName',text:'所属区域'},
      {field:'installName',text:'客户经理'},
      {field:'customerName',text:'客户姓名'},
      {field:'customerPhone',text:'手机号码'},
      {field:'cardNo',text:'身份证号码'}
    ],    
    detailTable2: [
      {field:'merchantName',text:'数据源'},
      {field:'supplierName',text:'供应商'},
      {field:'productSpec',text:'规格型号'},
      {field:'productType',text:'产品类型',formater:'gpsType'},
      {field:'imei',text:'IMEI'},
      {field:'sim',text:'SIM'},
      {field:'installTime',text:'安装时间'},
      //{field:'serviceStartTime',text:'激活时间'},
      //{field:'serviceEndTime',text:'用户到期时间'},
      //{field:'statusType',text:'设备状态',formater:'statusOpen'},
      {field:'orgName',text:'所属机构'},
      {field:'areaName',text:'所属区域'},
      {field:'installName',text:'客户经理'},
      {field:'customerName',text:'客户姓名'},
      {field:'customerPhone',text:'手机号码'},
      {field:'cardNo',text:'身份证号码'}
    ],
    installStatus:0
  },
  methods: {
    btnSearch: function () {
      var activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
      if (activeTab == "todo") {    
          $('#detailTable').bootstrapTable('refresh',{url:'...'});
      } else if (activeTab == "done") {
          $('#detailTable2').bootstrapTable('refresh',{url:'...'});
      }      
    },
    showSomeSearch: function() {
      $('select[name=supplierId]').parent().parent().parent().removeClass('hide');
      $('input[name=startTime]').parent().parent().removeClass('hide');
      $('input[name=endTime]').parent().parent().removeClass('hide');
      $('input[name=imei]').parent().parent().parent().removeClass('hide');
      this.installStatus = 8
    },
    hideSomeSearch: function() {
      $('select[name=supplierId]').parent().parent().parent().addClass('hide');
      $('input[name=startTime]').parent().parent().addClass('hide');
      $('input[name=endTime]').parent().parent().addClass('hide');
      $('input[name=imei]').parent().parent().parent().addClass('hide'); 
      this.installStatus = 0
    },
    exportExcel: function() {
        var installStatus =  this.installStatus;
        //json对象转url传参
        var parseParam = function(param, key) {
            var paramStr = "";
            if (param instanceof String || param instanceof Number || param instanceof Boolean) {
                paramStr += "&" + key + "=" + encodeURIComponent(param);
            } else {
                $.each(param, function(i) {
                    var k = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i);
                    paramStr += '&' + parseParam(this, k);
                });
            }
            return paramStr.substr(1);
        };

        var search=parseParam($("#searchForm").values());
        var downLink = interUrl.basic + interUrl.purchase.export + "?" + search + '&installStatus=' + installStatus;
        window.open(downLink, "_blank");      
    },

    //根据供应商/产品类型获取规格型号
    getSpec: function () {
      var supplierId = $('#supplier').find('option:selected').val();
      var productType = $('#productType').find('option:selected').val();
      $("#productSpec").getSpecCompany(supplierId,productType);
    },
    //根据机构获取所属区域
    getGroup: function (e) {
      var orgId = $(e.currentTarget).find('option:selected').val();
      $('input[name=orgId]').val(orgId);
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
    //清空查询条件
    reset: function(){
      $("#areaId").html("<option value=''>--请选择--</option>");
      $("#userId").html("<option value=''>--请选择--</option>");
      $("#productSpec").getSpecCompany();
      $('#orgId').getStockCompany(function (data) {
        if(data.length == 1){
          $('#orgId').attr("disabled", "disabled");
          $('#areaId').getStockGroup(data[0].id);
          $('input[name=orgId]').val(data[0].id);
        }
      });
    }
  },
  ready: function () {
    $("#supplier").getSpecificSupp();
    $("#productSpec").getSpecCompany();
    $('#orgId').getStockCompany(function (data) {
      if(data.length == 1){
        $('#orgId').attr("disabled", "disabled");
        $('#areaId').getStockGroup(data[0].id);
        $('input[name=orgId]').val(data[0].id);
      }
    });
  },
  mounted: function() {

  }

});

var dataLoad,handle,operate,dataLoad2,handle2,operate2,statusOpen;

dataLoad2 = function (params) {
  var p;
  p = params.data;
  tableData(
    params,
    $.extend($("#searchForm").values(), p,{
        installStatus: 8
    }),
    interUrl.purchase.searchGpsDevice
  )
};

handle2 = function (value,row,index) {
  return ['<div class="btn-group">' +
  '<button type="button" class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">操作' +
  '<span class="caret"></span>' +
  '</button>' +
  '<ul class="dropdown-menu">' +
  '<li><a href="javascript:;" class="viewPosition">查看定位</a></li>' +
  '<li><a href="javascript:;" class="trackPlayReback">轨迹回放</a></li>' +
  '<li><a href="javascript:;" class="viewWarn">查看报警</a></li>' +
  (row.merchantId == "2" ? '' : '<li><a href="javascript:;" class="toloanInfo">查看贷款详情</a></li>') +
  '</ul>'+
  '</div>']
};

operate2 = {
  'click .viewPosition': function (e,a,item,index) {
    var detail = JSON.stringify(item);
    comn.addTab({
      href: './Modal/stockManage/GPSdetail/position/position.html?detail=' + detail + '&imei=' + item.imei + '&supplierId=' + item.supplierId,
      title: 'GPS定位'
    })
  },
  'click .trackPlayReback': function (e,a,item,index) {
    var detail = JSON.stringify(item);
    comn.addTab({
      href: './Modal/stockManage/GPSdetail/trackPlayReback/trackPlayReback.html?imei=' + item.imei + '&detail=' + detail,
      title: 'GPS轨迹回放'
    })
  },
  'click .viewWarn': function (e,a,item,index) {
    comn.addTab({
      href: './Modal/stockManage/alarmDeal/alarmDeal.html?imei=' + item.imei,
      title: '报警管理'
    })
  },
  'click .toloanInfo': function (e,a,item,index) {
    var type;
    if(item.loanType == 5){
        type = 'ownersStaging';
    }
    comn.addTab({
            title: "贷款详情",
            href: "./Modal/customManage/customer/loanDetail.html?id=" + item.projectId + "&loanApplyId=" + item.relativeApplyId1 + "&businessTypeCode=" + item.flowType + "&projectId=" + item.projectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY" + "&loanFlag=1&type=" + type
    })
  }  
};
statusOpen = function (value) {
  return ['离线','在线'][value];
};


//未安装查询表格方法
dataLoad = function (params) {
  var p;
  p = params.data;
  tableData(
    params,
    $.extend($("#searchForm").values(), p,{
        installStatus: 0
    }),
    interUrl.purchase.searchGpsDevice
  )
};

handle = function () {
  return ['<div class="btn-group">' +
  '<button type="button" class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">操作' +
  '<span class="caret"></span>' +
  '</button>' +
  '<ul class="dropdown-menu">' +
  '<li><a href="javascript:;" class="toloanInfo">查看贷款详情</a></li>' +
  '</ul>'+
  '</div>']
};

operate = {
  'click .toloanInfo': function (e,a,item,index) {
    var type;
    if(item.loanType == 5){
        type = 'ownersStaging';
    }
    comn.addTab({
            title: "贷款详情",
            href: "./Modal/customManage/customer/loanDetail.html?id=" + item.projectId + "&loanApplyId=" + item.relativeApplyId1 + "&businessTypeCode=" + item.flowType + "&projectId=" + item.projectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY" + "&loanFlag=1&type=" + type
    })
  }
};

