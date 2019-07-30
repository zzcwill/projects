//注册组件
Vue.component('v-input',vueComponent.inputComponent);
Vue.component('v-table',vueComponent.tableComp);
Vue.component('v-select',vueComponent.selectComp);
Vue.component('text-area',vueComponent.textArea);
/*
    viewDist: 是否展示分配详情 true展示,默认false
    distribute: 确定按钮显示 (选择数据时展示,完成分配隐藏)
    table1: 分配记录/分配详情 数据列表
    table2: 新增分配数据列表
    signStatus: 分配状态
 */
var vm=new Vue({
    el:'#demo',
    data:{
        viewDetail:false,
        distribute: '',
        table1: [
            {field:'createTime',text:'分配时间'},
            {field:'orgName',text:'所属机构'},
            {field:'groupName',text:'所属区域'},
            {field:'distributeUserName',text:'安装员'},
            {field:'distributeAmount',text:'分配数量'},
            {field:'userName',text:'分配人'},
            {field:'status',text:'签收状态',formater:'disStatus'}
        ],
        table2:[
            {field:"supplierName",text:"供应商"},
            {field:"productSpec",text:"规格型号"},
            {field:"productType",text:"产品类型",formater:'typeProduct'},
            {field:"imei",text:"IMEI"},
            {field:"sim",text:"SIM"},
            {field:"createTime",text:"区域入库时间"}
        ],
        signStatus: [
            {name:'待签收',value:'0'},
            {name:'已签收',value:'1'},
            {name:'已撤销',value:'2'}
        ],
        dataLen: 0
    },
    methods:{
        btnSearch: function(){
            $("#table1").bootstrapTable('refresh',{url:'...'});
        },
        //分配数据列表查询
        modalSearch: function(){
            val = $('#modalImei').val().replace(/\n/g,';');
            $('input[name=imei]').val(val);
            $("#table2").bootstrapTable('refresh',{url:'...'});
        },
        //清除查询条件
        formReset: function () {
            $('#productSpec').getSpecProduct();
            //$('#productSpec').html('<option value="">--请选择--</option>');
        },
        //获取安装员列表
        getUser: function(e){
          var text = $(e.target).find("option:selected").html();
          var value = $(e.target).val();
          var ids = $(e.target).parents('.input-tip').next('.input-tip').find('select').attr('id');
          $("input[name=groupName]").val(text);
          if(value){
              $("#"+ids).getManager1(value,$("input[name=orgId]").val())
                  .on('change',function(){
                      var text=$(this).find("option:selected").text();
                      $("input[name=distributeUserName]").val(text)
                  })
          }else{
              $("#"+ids).html("<option value=''>--请选择--</option>")
          }
        },
        //分配设备
        distribution: function(){
            $("#disMode").modal('show');
            $('#confirmClick').attr('disabled',false);
            $('#getDate').getDateToday();
            $("#table3").bootstrapTable("load",[]);
            document.getElementById("distributionForm").reset();
            vm.distribute = '';
            vm.dataLen = 0;
            $(".disDetail").val(1);
            $("#modalUser").html("<option value=''>--请选择--</option>");
            $(".areaList1").html("<option value=''>--请选择--</option>").getGroupList1();
            //$('#productSpec').html('<option value="">--请选择--</option>');
            $("#table2").bootstrapTable('refresh',{url:'...'});
        },
        //根据产品类型/供应商获取规格型号
        getProductSpec: function () {
            var supplierId = $('#supplierId').find('option:selected').val();
            var productType = $('#productType').find('option:selected').val();
            $('#productSpec').getSpecProduct(supplierId,productType);
        },
        //添加数据到待分配列表
        allocation: function(){
            vm.distribute = '';
            location.hash = '#detail';
            var distrData=$("#table2").bootstrapTable('getSelections');
            ids=distrData.map(function(row){
                return row.imei;
            });
            var newdistrData=distrData.concat($('#table3').bootstrapTable('getData'));
            var obj={},finalData=[];
            for(var i=0;i<newdistrData.length;i++){
                var o=newdistrData[i].imei;
                if(!obj[o]){
                    obj[o]=1;
                    finalData.push(newdistrData[i]);
                }
            }
            $("#table2").bootstrapTable('checkBy',{field:'imei',values:ids});
            $("#table3").bootstrapTable('load',finalData);
            $(".distributed").html(finalData.length);
            vm.dataLen = finalData.length;
        },
        //确认分配
        confirm: function(){
            var confirmData=$("#table3").bootstrapTable('getData');
            var imeis=confirmData.map(function(row){
                return row.imei;
            });
            var sims=confirmData.map(function(row){
                return row.sim;
            });
            if(confirmData.length>0){
                //if(confirmData.length<=$("#approveAmount").html()){
                $("#userForm").validate();
                if($("#userForm").valid()==true){
                    comn.ajax({
                        url:interUrl.purchase.confirmToClerk,
                        data: $.extend($("#userForm").values(),{
                            imeis:imeis.join(","),
                            sims:sims.join(",")
                        }),
                        success:function(res){
                            if(res.code === 40000){
                                tip({
                                    content: '后台正在处理中，请稍后重新刷新页面查看'
                                })
                                $('#confirmClick').attr('disabled','disabled')
                            }else{
                                $("#disMode").modal('hide');
                                tip({
                                    content:'设备分配成功'
                                });
                                $("#table1").bootstrapTable('refresh',{url:'...'})
                                $("#table3").bootstrapTable('load',[]);
                                $(".distributed").html(0);
                            }
                        }
                    });
                }else{
                    tip({
                        content:'请选择所属区域和安装员'
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
        $(".orgId").getSingleBranchComp(function(name,id){
            $(".areaList").getGroupList1();
            $("input[name=orgId]").val(id);
        });
        $(".supplier").getSpecificSupp();
        $('#productSpec').getSpecProduct();
    }
});
var ids,dataLoad1,dataLoad2,dataLoad3,equipment,equipmentAllocate,typeProduct,disStatus,handle,viewDetail;
//分配列表
dataLoad1=function(params){
    var p;
    p = params.data;
    tableData(
        params,
        $.extend($("#searchForm").values(), p,
            {
                orgId:$(".orgId").find("option:selected").val(),
                groupId:$(".areaList").find("option:selected").val()
            }
        ),
        interUrl.purchase.totalGps
    )
};
//产品类型 ： 1: 有线 2: 无线
typeProduct=function(value,row,index){
    return [null,"有线","无线"][value];
};
//签收状态 ： 0：未签收 1: 已签收 2: 已撤销
disStatus=function(value,row,index){
    return ["未签收","已签收",'已撤销'][value];
};

//分配设备
dataLoad2=function(params){
    if($('.disDetail').val()){
        comn.ajax({
            url: interUrl.purchase.showDetail,
            data: $('#distributionForm').values(),
            success: function (res) {
                params.success({
                    'total': res.totalItem,
                    'rows': res.data
                });
                params.complete();
                //库存总数
                $("#total").html(res.totalItem);
                $('#checkItem').html(0);
                //$("#table2").bootstrapTable('checkBy',{field:'imei',values:ids})
            }
        });
    }
};

//分配详情
dataLoad3 = function(params){
    var p;
    p = params.data;
    if(vm.viewDetail){
        tableData(
            params,
            $.extend({distributeNo:$('input[name=distributeNo]').val()},p),
            interUrl.purchase.confirmToClerkDetail
        )
    }

};
//分配记录操作
handle = function(value,row,index){
    if(row.status == 2){
        return '';
    }else{
        return ['<div class="btn-group">' +
        '<button type="button" class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">操作' +
        '<span class="caret"></span>' +
        '</button>' +
        '<ul class="dropdown-menu">' +
        '<li><a href="javascript:;" class="view">查看详情</a></li>' +
        (function(){
            if(row.status == 0){
                return '<li><a href="javascript:;" class="reBack">撤销</a></li>'
            }else{
                return '';
            }
        })()+
        '</ul>'+
        '</div>'].join('');
    }

};
viewDetail = {
    "click .view": function(e,a,item,index){
        $('#disDetail').modal('show');
        vm.viewDetail=true;
        $('input[name=distributeNo]').val(item.distributeNo);
        $("#detailTable").bootstrapTable('refresh',{url:'...'});
    },
    'click .reBack': function (e,a,item,index) {
        comn.ajax({
            url: interUrl.purchase.gpsCancel,
            data: {
                distributeNo: item.distributeNo
            },
            success: function () {
                $('#table1').bootstrapTable('refresh',{url:'...'})
                tip({
                    content:'撤销成功'
                })
            }
        })
    }
};

//新增分配操作
equipment=function(){
    return ['<button class="btn btn-primary btn-xs del">&nbsp;删&nbsp;除&nbsp;</button>'].join("");
};
equipmentAllocate={
    "click .del": function(e,a,item,index){
        var items=[];
        items.push(item.imei);
        ids=ids.filter(function(ele){
            return ele !=item.imei;
        });
        $("#table3").bootstrapTable('remove',{field:'imei',values:items});
        $("#table2").bootstrapTable('uncheckBy',{field:'imei',values:items});
        $(".distributed").html($("#table3").bootstrapTable('getData').length);
        vm.dataLen = $("#table3").bootstrapTable('getData').length;
    }
};

//表格配置更改
var tableConfig,$table2;
$table2 = $('#table2');
tableConfig = {};
$.map(comn.table,function(v,k){
    tableConfig[k] = v;
});
tableConfig['height'] = 340;
tableConfig['pagination'] = false;
$('#table3').bootstrapTable({
    'clickToSelect':false,
    "height":320,
    "classes": "table-striped table-hover table"
});
//新增分配数据列表操作配置
$table2.bootstrapTable(tableConfig);
$table2.on('check.bs.table',function(){
    checkEvent()
}).on('uncheck.bs.table',function(){
    checkEvent()
}).on('check-all.bs.table',function(){
    checkEvent()
}).on('uncheck-all.bs.table',function(){
    checkEvent()
});
function checkEvent(){
    var data = $table2.bootstrapTable('getSelections');
    $('#checkItem').html(data.length);
    if(data.length > 0){
        vm.distribute = 'toDis';
    }else{
        vm.distribute = '';
    }
}