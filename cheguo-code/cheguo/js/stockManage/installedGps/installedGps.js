//注册组件
Vue.component('v-input',vueComponent.inputComponent);
Vue.component('v-table',vueComponent.tableComp);
Vue.component('v-select',vueComponent.selectComp);
/*
    toInstallTable: 待安装数据列表
    installedTable: 已安装数据列表
 */
var vm=new Vue({
    el:'#gps',
    data:{
        toInstallTable:[
            {field:'projectNo',text:'贷款编号'},
            {field:'customerName',text:'客户名称'},
            {field:'cardNo',text:'身份证号'},
            {field:'carInfo',text:'车辆信息'},
            {field:'billingPrice',text:'开票价'},
            {field:'orgName',text:'所属机构'},
            {field:'groupName',text:'所属区域'},
            {field:'userName',text:'客户经理'},
            {field:'status',text:'安装状态',formater:'installStatus'},
            {formater:'handle1',events:'tableEvent1'}
        ],
        installedTable:[
            {field:'projectNo',text:'贷款编号'},
            {field:'customerName',text:'客户名称'},
            {field:'cardNo',text:'身份证号'},
            {field:'carInfo',text:'车辆信息'},
            {field:'billingPrice',text:'开票价'},
            {field:'orgName',text:'所属机构'},
            {field:'groupName',text:'所属区域'},
            {field:'userName',text:'客户经理'},
            {field:'wiredCount',text: '有线数量'},
            {field:'wirelessCount',text: '无线数量'},
            {field:'status',text:'安装状态',formater:'installStatus'},
            {formater:'handle1',events:'tableEvent1'}
        ]
    },
    methods: {
        btnSearch: function () {
            var table = $('.tab-pane.active').find('table').eq(1).attr('id');
            $("#" + table).bootstrapTable('refresh', {url: '...'});
        }
    },
    ready: function(){
        $("#supplier").getSpecificSupp();
    }
});

var handle1,tableEvent1,dataLoad1,dataLoad2,installStatus;
//待安装数据列表
dataLoad1=function(params){
    var p;
    p = params.data;
    tableData(
      params,
      $.extend($("#searchForm").values(), p , {status: 0}),
      interUrl.purchase.gpsInstallList
    )
};
//已安装数据列表
dataLoad2 = function(params){
    var p;
    p = params.data;
    tableData(
      params,
      $.extend($("#searchForm").values(), p , {status: 1}),
      interUrl.purchase.gpsInstallList
    )
};
//安装操作格式化
handle1=function(value,row,index){
    if(row.status == 0){
        return ['<button class="btn btn-primary btn-xs operate">设备安装</button>'].join("")
    }else{
        return ['<div class="btn-group">' +
        '<button type="button" class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">操作' +
        '<span class="caret"></span>' +
        '</button>' +
        '<ul class="dropdown-menu">' +
        '<li><a href="javascript:;" class="operate">修改安装</a></li>' +
        '<li><a href="javascript:;" class="view">查看详情</a></li>' +
        '</ul>'+
        '</div>'].join('');
    }
};
//操作
tableEvent1={
    'click .operate': function (e,a,item,index) {
        var operateType = ['install','modify'][item.status];
        var title = ['设备安装','修改安装'][item.status];
        comn.addTab({
            title:title,
            href:"./Modal/stockManage/installedGps/install.html?orgId="+item.orgId+"&projectId="+item.projectId + "&projectNo=" + item.projectNo + '&type=' + operateType
        })
    },
    'click .view': function (e,a,item,index) {
        comn.addTab({
            title:"设备安装详情",
            href:"./Modal/stockManage/installedGps/install.html?orgId="+item.orgId+"&projectId="+item.projectId + '&type=view'
        })
    }
};
installStatus= function(value,row,index){
    return ["待安装","已安装"][value];
};
