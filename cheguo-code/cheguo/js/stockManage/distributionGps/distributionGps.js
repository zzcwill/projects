//注册组件
Vue.component('v-input',vueComponent.inputComponent);
Vue.component('v-table',vueComponent.tableComp);
Vue.component('v-select',vueComponent.selectComp);
Vue.component('text-area',vueComponent.textArea);
/*
    status: 状态值判定是待出库还是已出库  toDis: 待出库 dised: 已出库
    distribution: 是否显示确认按钮  默认不显示 显示: toDis
    dataLen: 待分配数量
    toDisStatus: 待分配查询分配状态
    disStatus: 已分配查询签收状态
    table1: 待分配数据列表
    disedTable: 已分配数据列表
    table2: 分配数据列表
    table3: 分配详情数据列表
 */
var vm=new Vue({
    el:'#demo',
    data:{
        viewDist:false,
        distribution:'',
        dataLen: 0,
        status: 'toDis',
        disStatus: [
            {name:'已签收',value:'0'},
            {name:'待签收',value:'4'}
        ],
        toDisStatus: [
            {name:'待分配',value:'2'},
            {name:'已撤销',value:'6'}
        ],
        table1:[
            {field:"applyDate",text:"申请日期"},
            {field:"applyOrgName",text:"所属机构"},
            {field:"groupName",text:"业务组"},
            {field:"applyUserName",text:"申领人"},
            {field:"supplierName",text:"供应商"},
            {field:"productType",text:"产品类型",formater:'typeProduct'},
            {field:"applyAmount",text:"申请数量"},
            {field:"distributeAmount",text:"已分配数量"},
            {field:"status",text:"分配状态",formater:"disStatus"},
            {field:"remark",text:"申请备注"}
        ],
        disedTable: [
            {field:"distributeDate",text:"分配日期"},
            {field:"applyOrgName",text:"所属机构"},
            {field:"groupName",text:"业务组"},
            {field:"applyUserName",text:"申领人"},
            {field:"supplierName",text:"供应商"},
            {field:"productType",text:"产品类型",formater:'typeProduct'},
            {field:"applyAmount",text:"申请数量"},
            {field:"distributeAmount",text:"已分配数量"},
            {field:"status",text:"签收状态",formater:"disStatus"}
            //{field:"",text:"签收日期"}
        ],
        table2:[
            {field:"supplierName",text:"供应商"},
            {field:"productSpec",text:"规格型号"},
            {field:"productType",text:"产品类型",formater:'typeProduct'},
            {field:"imei",text:"IMEI"},
            {field:"sim",text:"SIM"},
            {field:"orgName",text:"所属机构"},
            {field:"createTime",text:"分公司入库时间"}
        ],
        table3:[
            {field:"supplierName",text:"供应商"},
            {field:"productSpec",text:"规格型号"},
            {field:"productType",text:"产品类型",formater:'typeProduct'},
            {field:"imei",text:"IMEI"},
            {field:"sim",text:"SIM"},
            {field:"createTime",text:"分公司入库时间"}
        ]
    },
    methods:{
        //库存数据查询
        btnSearch: function(){
            var table=$('.tab-pane.active').find('table').eq(1).attr('id');
            $("#"+table).bootstrapTable('refresh',{url:'...'});
        },
        resetForm: function () {
            $('#areaList').html('<option value="">--请选择--</option>');
        },
        //根据所属机构获取所属区域
        getArea: function(e){
            $('#areaList').html('<option value="">--请选择--</option>');
            var val = $(e.currentTarget).find('option:selected').val();
            if(val){
                $("#areaList").getGroupList(val);
            }
        },
        //分配出库数据列表查询
        modalSearch: function(){
            var val;
            val = $('#modalImei').val().replace(/\n/g,';');
            $('input[name=imei]').val(val);
            $("#table4").bootstrapTable('refresh',{url:'...'})
        },
        //分配出库查询条件清空
        modalReset: function(){
            $("#modalImei").val('');
            $('#modalOrgId').val($('#disCompanyId').val());
            $('#productSpec').getSpecCompany($('input[name=supplierId]').val(),$('input[name=productType]').val());
        },
        //添加数据到待分配列表
        allocation: function(){
            var distrData=$("#table4").bootstrapTable('getSelections');
            ids=distrData.map(function(row){
                return row.id;
            });
            var newdistrData=distrData.concat($('#table5').bootstrapTable('getData'));
            var obj={},finalData=[];
            for(var i=0;i<newdistrData.length;i++){
                var o=newdistrData[i].id;
                if(!obj[o]){
                    obj[o]=1;
                    finalData.push(newdistrData[i]);
                }
            }
            $("#table4").bootstrapTable('checkBy',{field:'id',values:ids});
            $("#table5").bootstrapTable('load',finalData);
            $(".distributed").html(finalData.length);
            vm.distribution = '';
            vm.dataLen = finalData.length;
            Vue.nextTick(function(){
                var finalTop = $('#table5').offset().top;
                $('#disMode').scrollTop(finalTop);
            });
        },
        toDis: function(){
            this.status = 'toDis';
        },
        dised: function(){
            this.status = 'dised';
        },
        //确认分配
        confirm: function(){
            var confirmData=$("#table5").bootstrapTable('getData');
            var imeis=confirmData.map(function(row){
                return row.imei;
            });
            var sims=confirmData.map(function(row){
                return row.sim;
            });
            if(confirmData.length>0){
                if(confirmData.length <= $("input[name=applyAmount]").val()){
                    $.ajax({
                        url:interUrl.basic + interUrl.purchase.distribute,
                        type: "POST",
                        dataType: "json",
                        async:  true,
                        data:  {
                            imeis:imeis.join(","),
                            sims:sims.join(","),
                            applyNo:$("input[name=applyNo]").val(),
                            orgId:$("input[name=orgId]").val()
                        },
                        success: function (res) {
                            if (res.code === 20000) {
                                return tip({
                                    content: res.message || "<code>" + o.url + "</code><br /> 接口异常！！！"
                                });
                            } else if (res.code === 30000) {
                                return window.parent.location.href = "../../../index.html";
                            } else if (res.code === 40000){
                                tip({
                                    content: "后台正在处理中，请稍后重新刷新页面查看"
                                });
                                $('#confirmApply').attr('disabled','disabled');
                            } else {
                                $("#disMode").modal('hide');
                                tip({
                                    content:'分配成功'
                                });
                                $("#table1, #table2").bootstrapTable('refresh',{url:'...'});
                            }
                        }
                    });
                }else{
                    tip({
                        content:'分配数量必须小于或等于申请数量'
                    })
                }
            }else{
                tip({
                    content:'请选择要分配的设备'
                })
            }



        }
    },
    ready:function(){
        comn.ajax({
            url:interUrl.purchase.getBranchComp,
            success:function(res){
                var results = ['<option value="">--请选择--</option>'];
                for(var i = 0;i < res.data.length;i++){
                    results.push("<option value='" + res.data[i].id + "'>" + res.data[i].name + "</option>");
                }
                $('#orgId').html(results.join(''));
                $('#modalOrgId').html(results.join(''));
                //$("#orgId").html(((function() {
                //    var results = ['<option value="">--请选择--</option>'];
                //    for(var i = 0;i < res.data.length;i++){
                //        results.push("<option value='" + res.data[i].id + "'>" + res.data[i].name + "</option>");
                //    }
                //    return results;
                //})()).join(""));
            }
        });
        $("#supplier").getSpecificSupp();
    }
});
var ids,handle1,disStatus,tableEvent1,handle2,tableEvent2,dataLoad1,dataLoad2,dataLoad3,dataLoad4,handle5,tableEvent5,typeProduct;
//待分配
dataLoad1=function(params){
    var p;
    p = params.data;
    tableData(
        params,
        $.extend($("#searchForm").values(), p,{flag: 0}),
        interUrl.purchase.finishApplyStock
    )
};
handle1=function(value,row,index){
    if(row.status == 2){
        return ['<button class="btn btn-primary btn-xs apply">申请单分配</button>'].join("")
    }
    return '';
};
//分配状态
disStatus = function(value){
  return ['已签收','','待分配','','待签收','','已撤销'][value];
};
tableEvent1={
    "click .apply":function(e,a,item,index){
        //$('#confirmClick').data('status','init');
        $('#confirmApply').attr('disabled',false);
        $('#getToday').getDateToday();
        $("#disMode").modal('show');
        vm.dataLen = 0;
        $("#table5").bootstrapTable("load",[]);
        $("#approveAmount").html(item.approveAmount);
        $("#useAble").html(item.count);
        $("#distributionForm").values(item);
        $('#listForm').values(item);
        $("input[name=orgName]").val(item.applyOrgName);
        $("input[name=orgId]").val(item.applyOrgId);
        $("#modalOrgId").val(item.applyOrgId);
        $('#modalImei').val('');
        $('#searchImei').val('');
        $('#productSpec').getSpecCompany(item.supplierId,item.productType);

        $("#table4").bootstrapTable('removeAll');
        $("#table4").bootstrapTable('refresh',{url:'...'});
    }
};
//产品类型 ： 1：有限 2 无线
typeProduct=function(value,row,index){
    return [null,"有线","无线"][value];
};
//已分配
dataLoad2=function(params){
    var p;
    p = params.data;
    tableData(
        params,
        $.extend($("#searchForm").values(), p,{flag: 1}),
        interUrl.purchase.finishApplyStock
    )
};
handle2=function(){
    return ['<button class="btn btn-primary btn-xs viewDetail">查看详情</button>'].join("")
};
tableEvent2={
    'click .viewDetail':function(e,a,item,index){
        $('#disDetail').modal('show');
        $(".viewList").val(item.applyOrgId);
        $(".applyNo").val(item.applyNo);
        $("#table3").bootstrapTable("refresh",{url:'...'});
    }
};
//分配详情
dataLoad3=function(params){
    var p;
    p = params.data;
    if($(".applyNo").val()){
        tableData(
            params,
            $.extend({orgId:$('.viewList').val(),applyNo:$(".applyNo").val()}, p),
            interUrl.purchase.detail
        )
    }

};

//分配设备
dataLoad4 = function(params){
    if($("input[name=applyNo]").val()){
        comn.ajax({
            url:interUrl.purchase.applyDanStock,
            data: $("#distributionForm").values(),
            success: function(res){
                params.success({
                    'total': res.totalItem,
                    'rows': res.data
                });
                params.complete();
                //$("#table4").bootstrapTable('checkBy',{field:'id',values:ids});
                $('#searchItem').html(res.data.length);
                $('#checkItem').html(0);
                vm.distribution = '';

            }
        })
    }
};

//待分配结果
handle5=function(){
    return ['<a href="javascript:;" class="del">删除</a>'].join("");
};
tableEvent5={
    "click .del": function(e,a,item,index){
        var items=[];
        items.push(item.id);
        ids=ids.filter(function(ele){
            return ele !=item.id;
        });
        $("#table5").bootstrapTable('remove',{field:'id',values:items});
        $("#table4").bootstrapTable('uncheckBy',{field:'id',values:items});
        var len = $("#table5").bootstrapTable('getData').length;
        vm.dataLen = len;
        checkEvent();
        //$(".distributed").html();
    }
};
$("#table5").bootstrapTable({
    'clickToSelect':false,
    "height":320,
    "classes": "table-striped table-hover table"
});

//表格配置
var tableConfig,$table4;
$table4 = $('#table4');
tableConfig = {};
$.map(comn.table,function(v,k){
    tableConfig[k] = v;
});
tableConfig['height'] = 340;
tableConfig['pagination'] = false;
$table4.bootstrapTable(tableConfig);
$table4.on('check.bs.table',function(e,row){
    checkEvent();
    if (row.orgId != $('#disCompanyId').val()) {
        $('#table4').bootstrapTable('uncheckBy',{field:'id',values:[row.id]});
        tip({
            content: '选中设备号的"所属机构"与分配人的"所属机构"不一致，需要进行调拨操作!'
        });
    }
}).on('uncheck.bs.table',function(){
    checkEvent();
}).on('check-all.bs.table',function(e,row){
    checkEvent();
    checkFormatter(row);
}).on('uncheck-all.bs.table',function(){
    checkEvent();
});
function checkEvent(){
    var data = $table4.bootstrapTable('getSelections');
    $('#checkItem').html(data.length);
    if(data.length > 0){
        vm.distribution = 'toDis';
    }else{
        vm.distribution = '';
    }
}
function checkFormatter(item){
    for(var i = 0;i < item.length;i++) {
        if (item[i].orgId != $('#disCompanyId').val()) {
            tip({
                content: '选中设备号的"所属机构"与分配人的"所属机构"不一致，需要进行调拨操作!'
            });
            $('#table4').bootstrapTable('uncheckBy',{field:'id',values:[item[i].id]});
        }
    }
}