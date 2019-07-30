/**
 * Created by guo on 17/8/3.
 */
//注册组件
Vue.component('v-input',vueComponent.inputComponent);
Vue.component('v-select',vueComponent.selectComp);
Vue.component('text-area',vueComponent.textArea);
Vue.component('modal-fade',vueComponent.modalFade);
var vm = new Vue({
  el:'#flowApproval',
  /*
    type: 分公司审批流程 1:发起空白合同申请 2:空白合同集团审批 3:空白合同银行审批
    viewType: 查看详情类型
    applyRole: 申请领用单角色 company:分公司 area:区域
    stockType: 空白合同所属角色 1:分公司 2:区域 3:分公司
    contractId: 空白合同id
    contractApplyQuantityList: 合同申请数量列表
    head: 标题
    isModify: 是否是修改 true:是
   */
  data:{
    type:'',
    viewType: '',
    applyRole:'',
    stockType:'',
    contractId:'',
    contractApplyQuantityList: [],
    head:'新增领用单-分公司',
    isModify:''
  },
  methods:{
    //提交下一个流程
    nextApproval: function(){
      var args = comn.getArgs();
      if(checkNumber($('.contractNumber'))){
        $('#contractForm').validate();
        if($('#contractForm').valid()){
          oppSureModal("是否确认提交");
          $("#sureOption").unbind("click").click(function () {
            if(vm.type){
              return comn.ajax({
                url: interUrl.blankContract.contractSave,
                data: {
                  data: JSON.stringify($.extend($("#contractForm").values(),{contractApplyQuantityList: vm.contractApplyQuantityList}))
                },
                success: function (res) {
                  $("#sureModal").modal("hide");
                  //保存流程意见
                  flowSubmit(interUrl.blankContract.preSubmit, interUrl.blankContract.submit2next, './Modal/task/myTask/index.html', {contractApplyId: args['contractApplyId']});
                }
              });
            }
            vm.save('submit').then(function(data){
              if(data.code == 10000){
                $("#sureModal").modal("hide");
                if(vm.applyRole == 'company'){
                  //保存流程意见
                  flowSubmit(interUrl.blankContract.preSubmit, interUrl.blankContract.submit2next, './Modal/task/myTask/index.html', {contractApplyId: $("#id").val() || res.data.businessTypeCode || args['contractApplyId']});
                }else{
                  comn.ajax({
                    url: interUrl.blankContract.areaSubmit,
                    data: {
                      data: JSON.stringify($.extend($("#contractForm").values(),{contractApplyQuantityList: vm.contractApplyQuantityList}))
                    },
                    success: function (res) {
                      $("#sureModal").modal("hide");
                      tip({
                        content: '提交成功'
                      });
                      comn.closeTab();
                    }
                  });
                }
              }
            });
          })
        }
      }else{
        tip({
          content:'合同数量必须为大于0的整数'
        })
      }
    },
    //保存信息
    save: function(submit){
      var url;
      url = (vm.applyRole == 'company') ? interUrl.blankContract.contractAdd : interUrl.blankContract.areaAdd;
      var data = {
            contractApplyQuantityList: vm.contractApplyQuantityList
          };
      if(this.isModify || $('#id').val()){
        url = (vm.applyRole == 'company') ? interUrl.blankContract.contractUpdate : interUrl.blankContract.areaUpdate;
        data = Object.assign(data,{id: $('#id').val()});
      }
      if(checkNumber($('.contractNumber'))){
        $('#contractForm').validate();
        if($('#contractForm').valid()){
          return comn.ajax({
            url:url,
            data: {
              data:JSON.stringify($.extend($('#contractForm').values(),data))
            },
            success: function(res){
              if(!$('#id').val()){
                $('#id').val(res.data.businessTypeCode);
              }
              if(submit != 'submit'){
                tip({
                  content:'保存成功'
                });
              }
            }
          })
        }
      }else{
        tip({
          content:'至少有一类合同数量为大于0的整数且数量只能为数值'
        })
      }

    },
    //取消申请
    cancel: function(){
      comn.closeTab();
    },
    //取消审核
    pass: function(){
      comn.ajax({
        url: interUrl.blankContract.contractSave,
        data: {
          data: JSON.stringify($.extend($("#contractForm").values(), {contractApplyQuantityList: vm.contractApplyQuantityList}))
        },
        success: function(res){
          comn.ajax({
            url: interUrl.blankContract.contractCancel,
            data: {
              contractApplyId: vm.contractId
            },
            success: function(res){
              tip({
                content:res.message
              });
              comn.closeTab();
            }
          })
        }
      });
    },
    //判断操作是否可修改 true: 修改
    isDisabled: function(){
      return comn.getArgs()['modify'] == 'false' || comn.getArgs()['type'];
    },
    //获取机构下的所属区域
    orgChoose: function(id,value){
      var theEvent = window.event || arguments[0];
      var val = $(theEvent.currentTarget).find('option:selected').val();
      console.log(val);
      console.log(typeof id);
      if(val){
        var text = $(theEvent.currentTarget).find('option:selected').html();
        $('input[name=applyOrgName]').val(text);
        $('#areaGet').contractArea(val,vm.stockType,value);
      }else if(typeof id === 'number'){
        $('#areaGet').contractArea(id,vm.stockType,value);
      }
    },
    getContract: function(e){
      var _this = this;
      comn.ajax({
        url: interUrl.blankContract.contractType,
        data: {
          bankId: $(e.currentTarget).find('option:selected').val()
        },
        success: function(res){
          _this.contractApplyQuantityList = [];
          res.data.forEach(function(item){
            var list = {applyQuantity: 0,contractTypeName: item.contractTypeName,contractTypeId: item.contractTypeId};
            _this.contractApplyQuantityList.push(list);
          });
        }
      });
      var text = $(e.currentTarget).find('option:selected').html();
      $('input[name=bankName]').val(text);
    },
    getAreaName: function(e){
      var text = $(e.currentTarget).find('option:selected').html();
      $('input[name=applyAreaName]').val(text);
    }
  },
  ready: function(){
    //获取合作银行
    $('#bankId').contractBankGet($('#bankId').val());
    var args = comn.getArgs();
    //申请时间默认当前时间
    $('.applyTime').getToday();
    //申请人默认当前操作人
    $('input[name=applyUserName]').val(comn.user.realname);
    //第一次生成流水号
    if(!args['contractApplyId']){
      $('.applyNo').getSerial();
    }
    //获取判断是审批流程还是新增,并获取标题
    if(args['type']){
      this.type = args['type'];
      this.stockType = 1;
      this.head = [null,'发起空白合同申请','集团业务审批','合作银行审批'][this.type];
    }
    if(args['viewType']){
      this.viewType = args['viewType'];
      this.head = '空白合同申请流程';
      this.stockType = 1;
    }
    if(args['applyRole']){
      this.applyRole = args['applyRole'];
      this.head = args['head'];
      this.isModify = args['modify'];
      switch (args['applyRole']){
        case 'company':
          this.stockType = 1;
          break;
        case 'area':
          this.stockType = 2;
          break;
        case 'personal':
          this.stockType = 3;
          break;
      }
    }
    $('#orgId').contractOrg(this.stockType,$('orgId').val());
    //获取保存的信息
    if(args['contractApplyId']){
      this.contractId = args['contractApplyId'];
      comn.ajax({
        url: interUrl.blankContract.contractGet,
        data: {
          contractApplyId: args['contractApplyId']
        },
        success: function(res){
          vm.contractApplyQuantityList = res.data.contractApplyQuantityList;
          vm.stockType = res.data.stockType;
          //获取机构
          $('#orgId').contractOrg(vm.stockType,res.data.applyOrgId);
          if(vm.applyRole == 'area'){
            vm.orgChoose(res.data.applyOrgId,res.data.applyAreaId);
          }
          $('#contractForm').values(res.data);
          $('.applyTime').val(res.data.createTime);
        }
      })
    }
  }
});
//检验合同数量是否整数
function checkNumber(params){
  if(params && params.length < 1 ){
    return true;
  }
  var flag = 0;
  for(var i=0;i<params.length;i++){
    if(params[i].value.indexOf('.') != -1 || isNaN(params[i].value)){
      return false
    }
    if(params[i].value > 0){
      flag += 1;
    }
  }
  if(flag > 0){
    return true
  }else{
    return false;
  }
}