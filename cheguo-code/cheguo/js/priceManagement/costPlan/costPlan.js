//注册组件
Vue.component('v-input', vueComponent.inputComponent);
Vue.component('v-select', vueComponent.selectComp);
Vue.component('v-table', vueComponent.tableComp);
Vue.component('v-radio',vueComponent.radioComp);

var vm = new Vue({
    el: '#costPlan',
    data: {
        table: [
            {field: 'name', text: '方案名称'},
            {field: 'useStatue', text: '使用状态',formater:'statusUse'},
            {field: 'statue', text: '启用状态',formater:'openStatus'}
            //{field:'',text:'操作',formater:'handle',events:'dataEvent'}
        ],
        view:false
    },
    methods: {
        btnSearch: function () {
            $("#table1").bootstrapTable('refresh', {url: '...'})
        },
        newPlan: function () {
            $("#addMode").modal('show');
            $(".view").attr('disabled',false);
            this.view=false;
            saveUrl=interUrl.ownersStaging.save;
        },
        savePlan: function(){
            $("#planForm").validate();
            if($("#planForm").valid()){
                comn.ajax({
                    //url:interUrl.ownersStaging.save,
                    //url:interUrl.ownersStaging.modify,
                    url:saveUrl,
                    data: $.extend({},$('#planForm').values()),
                    success: function(){
                        $("#addMode").modal("hide");
                        $("#table1").bootstrapTable("refresh",{url:'...'})
                    }
                })
            }

        }
    },
    ready: function(){
        //var saveUrl= interUrl.ownersStaging.save;
        var saveUrl= '';
    }

});

var dataLoad, handle, dataEvent,openStatus,statusUse;

//费用方案列表
dataLoad = function (params) {
    var p;
    p = params.data;
    tableData(
        params,
        $.extend($("#searchForm").values(), p
        ),
        interUrl.ownersStaging.query
    )
};

handle = function (value, row, index) {
    var html = [
        '<li><a href="javascript:;" class="modify">修改</a></li>',
        '<li><a href="javascript:;" class="delete">删除</a></li>'
    ];
    return ['<div class="btn-group btn-group-xs">' +
    '<button type="button" class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown">操作' +
    '<span class="caret"></span>' +
    '</button>' +
    '<ul class="dropdown-menu" role="menu">' +
    '<li><a href="javascript:;" class="changeStatus">' + (row.statue == 2 ? '启用' : '停用') + '</a></li>' +
    '<li><a href="javascript:;" class="view">查看</a></li>' +
    (function (status) {
        if (status == 0) {
            return html.join("")
        } else {
            return "";
        }
    })(row.useStatue) +
    '</ul>' +
    '</div>']
};

dataEvent = {
    "click .changeStatus": function (e, a, item, index) {
        var statue;
        if(item.statue == 1){
            statue=2
        }else if(item.statue == 2){
            statue=1
        }
        comn.ajax({
           url:interUrl.ownersStaging.updateStatus,
            data:{
                id:item.id,
                statue:statue,
                useStatue: item.useStatue
            },
            success: function(){
                $("#table1").bootstrapTable('refresh',{url:'...'})
            }
        });
    },
    "click .modify": function (e, a, item, index) {
        saveUrl=interUrl.ownersStaging.modify;
        $("#addMode").modal("show");
        $("#planForm").values(item);
        $(".view").attr('disabled',false);
        vm.view=false;
    },
    "click .view": function(e,a,item,index){
        $("#addMode").modal("show");
        $("#planForm").values(item);
        $(".view").attr('disabled','disabled');
        vm.view=true;
    },
    "click .delete": function (e, a, item, index) {
        comn.ajax({
            url:interUrl.ownersStaging.delete,
            data:{
                id: item.id
            },
            success: function(){
                $("#table1").bootstrapTable('refresh',{url:'...'});
                tip({
                    content:'删除成功'
                })
            }
        })
    }
};

//启用状态
openStatus = function(value){
    return ['删除','启用','停用'][value];
};

//使用状态
statusUse = function(value){
    return ['未使用','已使用'][value];
};

