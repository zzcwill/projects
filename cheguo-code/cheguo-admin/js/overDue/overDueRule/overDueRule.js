Vue.component('c-input',vueComponent.inputComponent);
Vue.component('c-select',vueComponent.selectComp);
Vue.component('c-table',vueComponent.tableComp);
Vue.component('modal-fade',vueComponent.modalFade);

var vm = new Vue({
  /*
  * title: 新增/修改 合作银行逾期规则弹出层标题
  * useStatus: 启用状态  1:启用 2:未启用
  * tableList: 逾期规则列表数据详情
  * ruleList: 设置的逾期规则
  * */
  el:'#overdueRule',
  data:{
    title: '新增合作银行逾期规则',
    useStatus: [
      {value:'1',name:'启用'},
      {value:'2',name:'未启用'}
    ],
    tableList: [
      {field:'name',text:'逾期规则名称'},
      {field:'coBankName',text:'合作银行'},
      {field:'createTime',text:'新增时间'},
      {field:'modifyTime',text:'最后修改时间'},
      {field:'operatorName',text:'最后修改人'},
      {field:'status',text:'启用状态',formater:'openStatus'}
    ],
    ruleList: [],
    deleteIds: [],
    cooBank: [
      {value:1,name:'3'}
    ],
    modalBank: [
      {value:1,name:'d'},
      {value:2,name:'de'},
      {value:3,name:'df'},
      {value:4,name:'dg'},
      {value:5,name:'dh'},
    ],
  },
  methods: {
    btnSearch: function () {
      $('#tableList').bootstrapTable('refresh',{url:'...'})
    },
    formReset: function () {
      setTimeout(function () {
        $('#cooBank').multiselect('refresh');
      },0)
    },
    addBank: function () {
      $('#bankModal').modal('show');
      comn.ajax({
        url: interUrl.overDueRule.bankList,
        success: function (res) {
          var j, len, ref, results,o;
          ref = res.data;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            o = ref[j];
            results.push("<option value='" + o.id + "'>" + o.bankName + "</option>");
          }
          $('#multiSelect').html(results);
          $('#multiSelect').multiselect('destroy').multiselect(selectConfig);
        }
      })
      $('#multiSelect').multiselect('refresh');
    },
    //保存合作银行
    saveBank: function () {
      $('#bankForm').validate();
      if($('#bankForm').valid()){
        if(Number($('.digits').val()) <= 28 && Number($('.digits').val()) > 0){
          if($('#multiSelect').val()){
            var bankName = '';
            var bankNames = $('#multiSelect').find('option:selected');
            for(var i = 0;i < bankNames.length;i++){
              bankName +=  bankNames[i].innerHTML + ',';
            }
            comn.ajax({
              url: interUrl.overDueRule.saveBank,
              data: {
                coBankId: $('#multiSelect').val().join(','),
                coBankName: bankName,
                name: $('#bankForm input[name=name]').val(),
                repaymentDay: $('#bankForm input[name=repaymentDay]').val(),
                id: $('#bankForm input[name=id]').val()
              },
              success: function (res) {
                layer.msg(res.data);
                $('#tableList').bootstrapTable('refresh',{url:'...'});
                $('#bankModal').modal('hide');
              }
            })
          }else{
            layer.msg('合作银行必填')
          }
        }else{
          layer.msg('还款日必须在 1-28号之间')
        }

      }
    },
    //添加数据到逾期规则列表
    addDetail: function () {
      var overdueQuantityName,overdueQuantityCondition,overdueAmountValue,length,lastItem;
      length = this.ruleList.length;
      if(length == 3){
        return tip({
          content: '最多可设置三条逾期规则'
        })
      }
      overdueQuantityName = 'N' + (length + 1);
      if(length > 0){
        lastItem = this.ruleList[length-1];
        overdueQuantityCondition = (lastItem.overdueAmountCondition == 1) ? '2' : '1';
        overdueAmountValue = lastItem.overdueAmountValue;
      }else{
        overdueQuantityCondition = '1';
        overdueAmountValue = '';
      }
      this.ruleList.push(
        {
          overdueConfigId: this.item.id,
          overdueConfigName: this.item.name,
          overdueQuantityName:overdueQuantityName,
          overdueQuantityValue: overdueAmountValue,
          overdueQuantityCondition: overdueQuantityCondition,
          overdueAmountProp:'Y',
          overdueAmountCondition:'1',
          overdueAmountValue: ''
        }
      );
    },
    changeValue: function (item,index) {
      if(this.ruleList.length == index+1){
        return;
      }else{
        this.ruleList[index+1].overdueQuantityCondition = ['','2','1'][item.overdueAmountCondition];
      }
    },
    changeInput: function (item,index) {
      if(this.ruleList.length == index+1){
        return;
      }else{
        this.ruleList[index+1].overdueQuantityValue = item.overdueAmountValue;
      }
    },
    //删除规则数据
    deleteDetail: function (item,index) {
      var deleteList = this.ruleList.pop();
      if(deleteList.id){
        this.deleteIds.push(deleteList.id);

      }
    },
    //设置逾期规则
    setRule: function () {
      var _this = this;
      var inputList = $('#ruleForm input:not(:disabled)');
      function formValide () {
        var errorList = [];
        for(var i = 0;i < inputList.length;i++){
          if(isNaN(inputList[i].value) || inputList[i].value == ''){
            (function (i) {
              $(inputList[i]).parents('p').addClass('has-error' + ' error'+ i);
              layer.tips('请输入有效的数字', '.has-error'+'.error' + i,{
                tipsMore: true
              });
            })(i);
            errorList.push(inputList[i]);
          }else{
            $(inputList[i]).parents('p').removeClass('has-error'+' error' + i);
            if(Number(inputList[0].value) > 100 ){
              $(inputList[0]).parents('p').addClass('has-error error0');
              errorList.push(inputList[0]);
              layer.tips('初始值必须在0-100之间','.has-error.error0',{tipsMore: true});
            }else{
              $(inputList[0]).parents('p').removeClass('has-error');
            }
          }
        }
        if(errorList.length > 0){
          return false
        };
        return true;
      };
      function rangeValide () {
        var flag = true;
        vm.ruleList.forEach(function (item,index) {
          if(index > 0 && Number(item.overdueQuantityValue) >= Number(item.overdueAmountValue)){
            flag = false;
            return layer.msg('逾期规则期数N' + (index+1) + '区间设置有误，' + item.overdueQuantityValue + '*M >= ' + item.overdueAmountValue + '*M')
          }
        });
        return flag;
      }
      if(formValide()){
        if(rangeValide()){
          comn.ajax({
            url: interUrl.overDueRule.addOverdueConfigRecord,
            data: {
              data: JSON.stringify(vm.ruleList),
              deleteIds: _this.deleteIds.length > 0 ? _this.deleteIds.join(',') : ''
            },
            success: function (res) {
              layer.msg('设置成功');
              $('#ruleModal').modal('hide');
              $('#tableList').bootstrapTable('refresh',{url:'...'})
            }
          })
        }
      }
    }
  },
  ready: function () {
    var selectConfig = {
      buttonClass: 'btn-default btn-sm',
      buttonWidth: '100%',
      nonSelectedText	: '请选择',
      nSelectedText: '已选择',
      numberDisplayed: 4,
      maxHeight: 200
    };
    $(".date").on('show', function(event) {
      event.preventDefault();
      event.stopPropagation();
    });
    //$('#cooBank').getAllBank().multiselect('destroy');
    //this.cooBank = getBank(interUrl.overDueRule.allBankList);
  }
});

var dataLoad,operation,operate,openStatus;
var selectConfig = {
  buttonClass: 'btn-white btn-sm',
  buttonWidth: '100%',
  nonSelectedText	: '请选择',
  nSelectedText: '已选择',
  numberDisplayed: 4,
  maxHeight: 200,
  enableFiltering: true,
  enableCaseInsensitiveFiltering: true
};
$('#multiSelect').multiselect(selectConfig);
$('#cooBank').multiselect(selectConfig);
//列表数据加载
dataLoad = function(params){
  var coBankId = '';
  if($('#cooBank').val()){
    coBankId = $('#cooBank').val().join(',')
  }
  var p;
  p = params.data;
  tableData(
    params,
    $.extend(p,{
      coBankId: coBankId,
      name: $('#searchForm input[name=name]').val(),
      status: $('#searchForm select[name=status]').val()
    }),
    interUrl.overDueRule.overdueConfigList
    )
};
//操作格式化
operation = function (value,row,index) {
    if(row.status == 1) {
      return '<button type="button" class="btn btn-primary btn-xs changeStatus">停用</button>'
    }
    return ['<div class="btn-group">',
      '<button type="button" class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">',
      '操作 <span class="caret"></span>',
      '</button>',
      '<ul class="dropdown-menu">',
      '<li><a href="javascript:;" class="changeStatus">启用</a></li>',
      '<li><a href="javascript:;" class="modify">修改</a></li>',
      '<li><a href="javascript:;" class="delete">删除</a></li>',
      '<li><a href="javascript:;" class="addRule">逾期规则设置</a></li>',
      '</ul>',
      '</div>'].join("");
};
//操作
operate = {
  //  启用/停用
  'click .changeStatus': function (e,a,item,index) {
    var status = ['',2,1][item.status];
    comn.ajax({
      url: interUrl.overDueRule.setOverdueConfig,
      data: {
        id: item.id,
        status: status
      },
      success: function (res) {
        layer.msg(res.data);
        $('#tableList').bootstrapTable('refresh',{url:'...'})
      }
    })
  },
  'click .modify': function (e,a,item,index) {
    $('#bankModal').modal('show');
    vm.title = '修改合作银行逾期规则';
    $('#bankForm input[name=name]').val(item.name);
    $('#bankForm input[name=repaymentDay]').val(item.repaymentDay);
    $('#bankForm input[name=id]').val(item.id);
    var promise = new Promise (function (resolve,reject) {
      comn.ajax({
        url: interUrl.overDueRule.bankList,
        data: {
          data: item.coBankId
        },
        success: function (res) {
          var j, len, ref, results,o;
          ref = res.data;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            o = ref[j];
            results.push("<option value='" + o.id + "'>" + o.bankName + "</option>");
          }
          $('#multiSelect').html(results);
          $('#multiSelect').multiselect('destroy').multiselect(selectConfig);
          resolve();
        }
      });
    });
    promise.then(function () {
      $('#multiSelect').multiselect('select',item.coBankId.split(','));
    });
  },
  'click .delete': function (e,a,item,index) {
    $('#deleteModal').modal('show');
    $('#delete').unbind('click').on('click', function () {
      comn.ajax({
        url:interUrl.overDueRule.delOverdueConfig,
        data: {
          id: item.id
        },
        success: function (res) {
          layer.msg(res.data);
          $('#deleteModal').modal('hide');
          $('#tableList').bootstrapTable('refresh',{url:'...'})
        }
      })
    })
  },
  'click .addRule': function (e,a,item,index) {
    $('#ruleModal').modal('show');
    comn.ajax({
      url: interUrl.overDueRule.configDetail,
      data: {
        configId: item.id
      },
      success: function (res) {
        vm.ruleList = res.data;
      }
    });
    vm.item = item;
  }
};
openStatus = function (value) {
  return ['','启用','未启用'][value];
};
comn.ajax({
  url: interUrl.overDueRule.allBankList,
  success: function (res) {
    var j, len, ref, results,o;
    ref = res.data;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      o = ref[j];
      results.push("<option value='" + o.id + "'>" + o.bankName + "</option>");
    }
    $('#cooBank').html(results);
    $('#cooBank').multiselect('destroy').multiselect(selectConfig);
  }
})
