//组册组件
Vue.component('v-input', vueComponent.inputComponent);
Vue.component('v-select', vueComponent.selectComp);
Vue.component('v-table', vueComponent.tableComp);
Vue.component('v-area', vueComponent.areaChoose);
Vue.component('plan-date', vueComponent.planDate);
Vue.component('fee-select', vueComponent.feeselectComp);
var vm = new Vue({
    el: '#areaPrice',
    /*
    *初始化数据
    * table 列表字段
    * modal 展业区显示   true:展示
    * isModify 修改状态: true:修改
    * isView  查看:true  新增/修改: false
    * isDisabled 展业地区 不可选:true 可选:false
    * fee  费用方案
    * feeScheme  地区下的费用方案列表 默认为空(本地展示)
    * deleteItem 删除的费用方案
    * local 最终上传的费用方案列表
    */
    data: {
        table: [
            {field: 'areaName', text: '地区'},
            {field: 'schemeFeeName', text: '费用方案名称'},
            {field: 'startEndTime', text: '当前费用方案起止时间'},
            {field: 'lastTime', text: '方案最迟截止时间'},
            {field: 'useState', text: '状态', formater: 'statueUse'}
        ],
        modal: false,
        isModify: false,
        isDisabled: false,
        fee:[],
        feeScheme: [],
        areaName:"",
        local:[],
        time:{
            startTime:'',
            endTime:''
        },
        deleteItem:[]
    },
    methods: {
        //搜索
        btnSearch: function(){
            $("#table1").bootstrapTable('refresh','{url:"..."}');
        },
        //清除查询条件
        resetForm: function(){
            $("#searchCity").html("")
                .selectpicker('refresh');
        },
        //获取市
        searchProvince: function(value,text){
            $("input[name=provinceName]").val(text);
            this.cityGet(value,'#searchCity');
        },
        cityGet: function(value,element){
            var promise=new Promise(function(resolve,reject){
                comn.ajax({
                    url: interUrl.common.getCity,
                    data: {
                        areacode: value
                    },
                    success: function(res){
                        var html = "";
                        for (var i = 0, len = res.data.length; i < len; i++) {
                            var item = res.data[i];
                            html += "<option value='"+item.areacode+"'>" + item.city +  "</option>";
                        }
                        $(element).html(html);
                        resolve();
                    }
                });
            });
            promise.then(function(){
                $(element).selectpicker('refresh');
            })
        },
        //新增展业区
        newPlan: function () {
            this.modal = true;
            this.isModify = false;
            this.isDisabled=false;
            $('#addForm')[0].reset();
            this.feeScheme = [];
            this.local = [];
            this.deleteItem = [];
            Vue.nextTick(function () {
                window.scrollTo(47, 800);
            });
            $(".view").attr('disabled', false);
        },
        //新增获取市
        provinceChange: function(value,text){
            $("#provinceName").val(text);
            $("#provinceCode").val(value);
            this.cityGet(value,'#city');
        },
        //取消
        cancel: function () {
            this.modal = false;
            $('#addForm')[0].reset();
            this.feeScheme = [];
            this.local = [];
            this.deleteItem = [];
        },
        //获取费用方案名
        feeName: function(e){
           var text= $(e.currentTarget).find("option:selected").html();
            $("input[name=schemeFeeName]").val(text);
        },
        //保存费用方案
        savePlan: function () {
            var _this=this;
            _this.feeScheme.map(function(item){
                return Object.assign(item,{deleteFlg:''})
            });
            _this.local = _this.feeScheme.concat(_this.deleteItem);
            if(_this.feeScheme.length>0){
                var url='';
                var actionFlag,cityCodes,cityNames;
                if(_this.isModify){
                    url=interUrl.ownersStaging.regionSchemeModify;
                    actionFlag=0;
                    cityCodes=cityCode;
                    cityNames=cityName;
                }else{
                    url=interUrl.ownersStaging.regionScheme;
                    actionFlag=1;
                    cityCodes = $("#city").selectpicker('val');
                    cityCodes = cityCodes.join(",");
                    cityNames = $("[data-id=city]").attr('title');
                }
                var data = {
                    provinceCode:$("#provinceCode").val(),
                    provinceName:$("#provinceName").val(),
                    cityCodes:cityCodes,
                    cityNames:cityNames,
                    data: JSON.stringify(_this.local,null,'\t')
                };
                var checkDate = new Promise(function(resolve,reject){
                    var flag = 0;
                    for(var i=0;i<_this.local.length;i++){
                        var item = _this.local[i];
                        if(item.startDisabled && item.startDisabled==true){
                            if(item.endDisabled==false){
                                if(diffDate(item.endTime)){
                                    flag+=1;
                                    break;
                                }
                            }
                        }else{
                            if(!diffDate(item.endTime) && !diffDate(item.startTime)){
                            }else{
                                flag+=1;
                                break;
                            }
                        }
                    }
                    if(flag == 1){
                        reject();
                    }else{
                        resolve();
                    }
                });
                checkDate.then(function(){
                    var prechcek=new Promise(function(resolve,reject){
                        comn.ajax({
                            url:interUrl.ownersStaging.preCheck,
                            data: $.extend(data,{actionFlag:actionFlag}),
                            success: function(){
                                resolve();
                            }
                        })
                    });
                    prechcek.then(function(){
                        comn.ajax({
                            url:url,
                            data: data,
                            success: function(){
                                $('#addForm')[0].reset();
                                _this.feeScheme = [];
                                _this.local = [];
                                _this.deleteItem = [];
                                _this.modal=false;
                                window.scrollTo(0,0);
                                $("#table1").bootstrapTable('refresh',{url:'...'})
                            }
                        });
                    });
                }).catch(function(){
                    tip({
                        content:"新增的方案时间必须大于当前时间"
                    });
                });
            }else{
                tip({
                    content:'请添加费用方案'
                })
            }
        },
        //新增费用方案
        addScheme: function () {
            var _this = this;
            $("#addForm").validate();
            if ($("#addForm").valid()) {
                var newData= $.extend($("#addForm").values(),{regionSchemeId:'',deleteFlg:''});
                _this.feeScheme.push(newData);
                Vue.nextTick(function(){
                    if (_this.feeScheme.length > 0) {
                        _this.isDisabled = true;
                    }
                });
            };
        },
        //费用方案修改名称
        changeFee: function(id){
            var feeSchemeName = $(event.currentTarget).find("option:selected").html();
            this.feeScheme[id].schemeFeeName = feeSchemeName;
        },
        //取消方案
        cancelScheme: function (id) {
            this.feeScheme = this.feeScheme.filter(function (item) {
                return item.startTime != id;
            });
            if (this.feeScheme.length == 0) {
                this.isDisabled=false;
            }
        },
        //删除方案
        deleteScheme: function (id) {
            var deletefl = this.feeScheme.filter(function(item){
                if(item.id){
                    if(item.startTime==id){
                        return Object.assign(item,{deleteFlg:'1'})
                    }
                }
            });
            this.feeScheme = this.feeScheme.filter(function (item) {
                return item.startTime != id;
            });
            this.deleteItem = this.deleteItem.concat(deletefl);
            if (this.feeScheme.length == 0) {
                this.isDisabled=false;
            }
        },
        //获取费用方案
        feeGet: function(){
            var _this=this;
            comn.ajax({
                url:interUrl.ownersStaging.queryList,
                success:function(res){
                    _this.fee = res.data.filter(function(ele){
                        return Object.assign(ele,{value:ele.id})
                    });
                }
            });
        }
    },
    ready: function () {
        /*
        * 初始化
        * getProvince  获取省
        * selectpicker 获取市
        * fee 费用方案列表
        */
        $("#province").getProvince();
        $("#searchPro").getProvince();
        $("#city").selectpicker('refresh');
        var _this=this;
        comn.ajax({
            url:interUrl.ownersStaging.queryList,
            success:function(res){
                _this.fee = res.data.filter(function(ele){
                    return Object.assign(ele,{value:ele.id})
                });
            }
        });
    }
});

var dataLoad, handle, dataEvent, openStatus, statueUse,cityCode,cityName,provinceCode,provinceName;

//区域费用方案列表
dataLoad = function (params) {
    var p;
    p = params.data;
    var cityCode=$("#searchCity").selectpicker('val');
    if(cityCode){
        cityCode=cityCode.join(",");
    }
    tableData(
        params,
        $.extend($("#searchForm").values(),{cityCodes:cityCode}, p
        ),
        interUrl.ownersStaging.regionSchemeQuery
    )
};

//判断查看还是修改
handle = function (value, row, index) {
    return ['<button type="button" class="btn btn-primary btn-xs operate">修改' +
    //(row.useState == 3 ? '&nbsp;查&nbsp;看&nbsp;' : '&nbsp;修&nbsp;改&nbsp;') +
    '</button>'];
};

dataEvent = {
    "click .operate": function (e, a, item, index) {
        vm.modal = true;
        var feeScheme;
        cityCode = item.cityCode;
        cityName = item.cityName;
        $("#provinceCode").val(item.provinceCode);
        $("#provinceName").val(item.provinceName);
        $("#areaName").val(item.areaName);
        Vue.nextTick(function () {
            window.scrollTo(47, 800);
            $("#area").val(item.areaName);
        });
        var feeGet=new Promise(function(resolve,reject){
            comn.ajax({
                url:interUrl.ownersStaging.queryDetail,
                data:{provinceCode:item.provinceCode,cityCode:item.cityCode},
                success: function(res){
                    resolve(res.data);
                }
            });
        });
        feeGet.then(function(value){
            feeScheme=value;
                vm.isModify = true;
                vm.isDisabled=true;
                feeScheme = feeScheme.filter(function (ele) {
                    var startDate = ele.startTime;
                    var endDate = ele.endTime;
                    if (modifyDiffDate(startDate)) {
                        if (modifyDiffDate(endDate)) {
                            return Object.assign(ele, {startDisabled: true, endDisabled: true})
                        } else {
                            return Object.assign(ele, {startDisabled: true, endDisabled: false})
                        }
                    } else {
                        return Object.assign(ele, {startDisabled: false, endDisabled: false})
                    }
                });
                vm.feeScheme=feeScheme;
        })
    }
};

//使用状态
statueUse = function (value) {
    return [null,'未使用','使用中','已使用'][value]
};
//新增,保存判断时间
function diffDate(date) {
    var newDate = date.replace(/-/g, '/');
    var today = new Date().toLocaleDateString();
    if (Date.parse(today) > Date.parse(newDate)) {
        return true;
    } else {
        return false;
    }
}
//修改判断时间
function modifyDiffDate(date) {
    var newDate = date.replace(/-/g, '/');
    var today = new Date().toLocaleDateString();
    if (Date.parse(today) < Date.parse(newDate)) {
        return false;
    } else {
        return true;
    }
}