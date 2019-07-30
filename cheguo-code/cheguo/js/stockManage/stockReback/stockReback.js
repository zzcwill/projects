//注册组件
Vue.component('v-input',vueComponent.inputComponent);
Vue.component('v-table',vueComponent.tableComp);
Vue.component('v-select',vueComponent.selectComp);
Vue.component('modal-fade',vueComponent.modalFade);

/*
    table: 设备异常处理数据接口
    deviant: 异常类型
    pageType: 操作人 1: 分公司 2: 区域 3: 个人
    refundType: 确认处理的异常类型
    imei: 确认处理的imei
    refundNo: 确认处理的流水号
 */
var vm = new Vue({
    el:'#stockBack',
    data:{
        table:[
            {field:'createTime',text:'提交日期'},
            {field:'orgName',text:'所属机构'},
            {field:'groupName',text:'所属区域'},
            {field:'refundName',text:'提交人'},
            {field:'refundType',text:'异常类型',formater:'typeRefund'},
            {field:'refundReason',text:'异常原因'},
            {field:'supplierName',text:'供应商'},
            {field:'productSpec',text:'规格型号'},
            {field:'productType',text:'产品类型',formater:'gpsType'},
            {field:'imei',text:'IMEI'},
            {field:'sim',text:'SIM'},
            {field:'status',text:'确认状态',formater:'confirmStatus'}
        ],
        deviant: [{value:'1',name:'设备维修'},{value:'2',name:'设备丢失'},{value:'3',name:'设备返库'}],
        pageType: 3,
        refundType: '',
        imei:'',
        refundNo: ''
    },
    methods:{
        btnSearch: function(){
            var table = $('.tab-pane.active').find('table').eq(1).attr('id');
            $("#" + table).bootstrapTable('refresh', {url: '...'});
        },
        //根据机构获取所属区域
        getGroup: function (e) {
            var orgId = $(e.currentTarget).find('option:selected').val();
            $('#areaId').html('<option value="">--请选择--</option>');
            if(orgId){
                $('#areaId').getGroupList(orgId);
            }
        },
        //根据供应商/产品类型获取规格型号
        getSpec: function () {
            var supplierId = $('#supplier').find('option:selected').val();
            var productType = $('#productType').find('option:selected').val();
            $("#productSpec").getSpecCompany(supplierId,productType);
        },
        //清空查询条件
        reset: function(){
            if(vm.pageType == 1){
                $("#areaId").html("<option value=''>--请选择--</option>");
            }
            $("#productSpec").getSpecCompany();
        },
        //确认处理异常
        confirm: function () {
            comn.ajax({
                url:interUrl.purchase.confirmRefund,
                data:{
                    refundNo: vm.refundNo,
                    pageType:args['pageType']
                },
                success: function(){
                    tip({
                        content:'处理成功'
                    });
                    $('#tip').modal('hide');
                    $("#table1").bootstrapTable('refresh',{url:'...'});
                    $("#table2").bootstrapTable('refresh',{url:'...'});
                }
            })
        }
    },
    ready: function(){
        this.pageType = comn.getArgs()['pageType'];
        //if(this.pageType == 1){
        //    this.deviant = [{value: '1', name: '设备维修'}, {value: '2', name: '设备丢失'}, {value: '4', name: '设备返回'}]
        //}
        $("#supplier").getSpecificSupp();
        if(this.pageType == 2){
            $('#orgId').getSingleBranchComp(function(name,id){
                $('#orgId').attr('disabled','disabled');
                $('#areaId').getGroupList1();
                $('input[name=orgId]').val(id);
                $('#table1').bootstrapTable('refresh',{url:'...'})
                $('#table2').bootstrapTable('refresh',{url:'...'})
            });
        }else if(this.pageType == 1){
            $('#orgId').getBranchOrg()
        }
        $("#productSpec").getSpecCompany();
    }
});

var dataLoad1,handle,dataEvent,confirmStatus,dataLoad2,typeRefund;
var args=comn.getArgs();
//未确认
dataLoad1=function(params){
    if((vm.pageType == 2 && $('input[name=orgId]').val()) || vm.pageType == 1){
            var p;
            p = params.data;
            tableData(
              params,
              $.extend($("#searchForm").values(), p,{mark:0,pageType:args['pageType']}),
              interUrl.purchase.confirmRefundData
            )
    }


};
handle = function (value,row,index) {
    if(row.status == 0 || row.status == 2){
        return ['<button type="button" class="btn btn-primary btn-xs confirm">确认</button>']
    }
    return '';
};
dataEvent = {
    'click .confirm': function (e,a,item,index) {
        $('#tip').modal('show');
        vm.refundType = [null,'设备维修','设备丢失','设备返库','设备调拨'][item.refundType];
        vm.imei = item.imei;
        vm.refundNo = item.refundNo;
    }
};
//确认状态
confirmStatus = function(value,row,index){
    if(vm.pageType == 1){
        return ['区域未确认','区域已确认','分公司未确认','分公司已确认','','','','分公司已确认'][value];
    }else{
        return ['区域未确认','区域已确认','分公司未确认','分公司已确认','','','','区域已确认'][value]
    }
};
//异常类型
typeRefund = function(value,row,index){
    return [null,'设备维修','设备丢失','设备返库','设备调拨'][value]
};

//已确认
dataLoad2=function(params){
    if((vm.pageType == 2 && $('input[name=orgId]').val()) || vm.pageType == 1){
        var p;
        p = params.data;
        tableData(
          params,
          $.extend($("#searchForm").values(), p,{mark:1,pageType:args['pageType']}),
          interUrl.purchase.confirmRefundData
        )
    }

};