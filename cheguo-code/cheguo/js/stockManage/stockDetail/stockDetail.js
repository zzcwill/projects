//注册组件
Vue.component('v-input',vueComponent.inputComponent);
Vue.component('v-table',vueComponent.tableComp);
Vue.component('v-select',vueComponent.selectComp);
Vue.component('modal-fade',vueComponent.modalFade);
/*
    table: 设备处理详情列表
    deviant: 异常类型选择
    deviantDeal: 异常处理方式 normal: 填写异常原因 transfer: 分公司调拨
    pageType: 设备异常处理角色 1:分公司 2:区域 3:个人
    deviceForm: 暂存设备处理数据
 */
var vm = new Vue({
    el:"#stockDetail",
    data:{
        table:[
            {field:'orgName',text:'所属机构'},
            {field:'groupName',text:'所属区域'},
            {field:'supplierName',text:'供应商'},
            {field:'productSpec',text:'规格型号'},
            {field:'productType',text:'产品类型',formater:'typeProduct'},
            {field:'imei',text:'IMEI'},
            {field:'sim',text:'SIM'},
            {field:'createTime',text:'入库时间'},
            {field:'status',text:'设备状态',formater:"deviceStatus"}
        ],
        deviant: [{value:'1',name:'设备维修'},{value:'2',name:'设备丢失'},{value:'3',name:'设备返库'}],
        deviceStatus: [{value:'2',name:'在库'},{value:'3',name:'在途'},{value:'5',name:'已丢失'}],
        deviantDeal: 'normal',
        pageType:3,
        deviceForm: {},
        title:'设备丢失',
        url:''
    },
    methods:{
        btnSearch: function(){
            $("#table1").bootstrapTable('refresh',{url:'...'})
        },
        //根据供应商/产品类型获取规格型号
        getSpec: function () {
            var supplierId = $('#supplier').find('option:selected').val();
            var productType = $('#productType').find('option:selected').val();
            if(supplierId || productType){
                $("#productSpec").getSpecCompany(supplierId,productType);
            }else{
                $("#productSpec").html("<option value=''>--请选择--</option>");
            }
        },
        //获取异常类型
        getDeviant: function (e) {
            var type = $(e.target).find("option:selected").val();
            if(type == 4){
               vm.deviantDeal = 'transfer';
                Vue.nextTick(function () {
                    //获取调拨分公司
                    $('#transferCompany').getBranchOrg();
                })
            }else{
                vm.deviantDeal = 'normal';
            }
        },
        //获取调拨对象名称
        getTranserName: function (e) {
            var text = $(e.target).find('option:selected').html();
            $('input[name=allotOrgName]').val(text);
        },
        reset: function(){
            $("#productSpec").html("<option value=''>--请选择--</option>");
        },
        //设备处理
        deviceProcess: function () {
            comn.ajax({
                url:interUrl.purchase.deviceProcess,
                data: $.extend({pageType:args['pageType']},$("#deviceForm").values()),
                success: function(){
                    $("#dealMode").modal('hide');
                    $('#deviantModal').modal('hide');
                    tip({
                        content: '操作成功'
                    });
                    $("#table1").bootstrapTable('refresh',{url:'...'})
                }
            })
        },
        //设备处理确认
        confirm: function(){
            $("#deviceForm").validate();
            if($("#deviceForm").valid()==true){
                if(vm.deviantDeal == 'transfer'){
                    $('#dealMode').modal('hide');
                    $('#deviantModal').modal('show');
                    var item = $("#deviceForm").values();
                    $('#transferTitle').html('确定将IMEI号为:' + item.imei + '的GPS由&nbsp;' + '<span style="color: red;">' + item.orgName +'</span>' + '&nbsp;调拨至&nbsp;' + '<span style="color: red">' + item.allotOrgName + '</span>' + '?');
                }else{
                    vm.deviceProcess();
                }
            }
        },
        //取消分拨
        cancelTransfer: function () {
            $('#dealMode').modal('show');
            $('#deviantModal').modal('hide');
            $('#deviceForm').values(vm.deviceForm);
        },
        //确认分拨
        confirmTransfer: function () {
            vm.deviceProcess();
        }
    },
    ready: function(){
        var args=comn.getArgs();
        this.pageType=args['pageType'];
        if(this.pageType == 1) {
            this.table.splice(8,1,{field:'stockStatusCompany',text:'设备状态',formater:"deviceStatus"});
            this.deviant = [{value: '1', name: '设备维修'}, {value: '2', name: '设备丢失'}, {value: '4', name: '设备调拨'}];
            this.deviceStatus = [{value:'2',name:'在库'},{value:'3',name:'在途'},{value:'4',name:'维修中'},{value:'5',name:'已丢失'}]
        }else if(this.pageType == 3){
            this.table.splice(7,1,{field:'stockTimeClerk',text:'入库时间'});
        }
        $("#supplier").getSupplier();
    }
});
var dataLoad,handle,events,typeProduct,deviceStatus;
var args=comn.getArgs();
dataLoad=function(params){
    var p;
    p = params.data;
    tableData(
        params,
        $.extend($("#searchForm").values(), p,{pageType:args['pageType']}),
        interUrl.purchase.gpsRefund
    )
};
handle = function(value,row,index){
    if(row.status==7 || row.stockStatusCompany == 7){
        return ['<button class="btn btn-success btn-xs" disabled="disabled">设备处理中...</button>']
    }else if(row.status == 5 || row.stockStatusCompany == 5){
        return ['<button class="btn btn-primary btn-xs deviceFound">设备找回</button>']
    }else if(row.status == 2 || row.stockStatusCompany == 2){
        return ['<button class="btn btn-primary btn-xs deal">设备处理</button>']
    }else if(row.stockStatusCompany ==4){
        return ['<button class="btn btn-primary btn-xs maintain">维修返库</button>']
    }else{
        return '';
    }

};
tableEvent={
  "click .deal": function(e,a,item,index){
      $("#dealMode").modal('show');
      vm.deviantDeal = 'normal';
      $("#deviceForm").values(item);
      vm.deviceForm = item;
  },
  'click .deviceFound': function (e,a,item,index) {
      $('#deviceFound').modal('show');
      vm.title = '设备丢失找回';
      vm.url = interUrl.purchase.deviceBack;
      vm.deviceForm = item;
      $('#deviceTitle').html('确定已找回IMEI为' + item.imei + '的终端?');
  },
  'click .maintain': function (e,a,item,index){
      $('#deviceFound').modal('show');
      vm.title = '设备维修返库';
      vm.url = interUrl.purchase.repair;
      vm.deviceForm = item;
      $('#deviceTitle').html('是否确定维修返库 IMEI 为' + '<sapn class="text-danger">'+ item.imei +'</sapn>的设备?')
  }
};
$('#btn-confirm').unbind('click').on('click',function () {
    comn.ajax({
        url:vm.url,
        data:{
            imei:vm.deviceForm.imei,
            sim:vm.deviceForm.sim,
            pageType:args['pageType']
        },
        success: function(){
            $('#deviceFound').modal('hide');
            tip({
                content: vm.title + '成功'
            });
            $('#table1').bootstrapTable('refresh',{url:'...'});
        }
    })
});
//产品类型
typeProduct = function(value,row,index){
   return [null,"有线","无线"][value];
};
deviceStatus = function (value,row,index) {
    return ['出库','','在库','在途','维修中','丢失','返库','','已安装'][value]
};