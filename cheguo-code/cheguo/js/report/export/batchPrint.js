/**
 * Created by apple on 17/9/14.
 */
var vm = new Vue({
  el:'#approvalBudgetInfoForm',
  /*
    budgetData: 页面数据
    gpsType: GPS类型
    loanTerm: 贷款期限
    isAdvanceDiscount: 是否垫付贴息金额
    getToday: 获取当天打印日期
    domOver: 页面是否加载完成
   */
  data: {
    budgetData: [],
    gpsType: [],
    loanTerm: [],
    isAdvanceDiscount: [],
    getToday:'',
    domOver: false
  },
  watch: {
    //监听页面加载,所有数据渲染完成执行打印操作
    'domOver': function(){
      window.print();
    }
  },
  ready: function(){
    var _this = this;
    var date=new Date();
    var y=date.getFullYear();
    var m=date.getMonth()<9? '0' + (date.getMonth() + 1) : date.getMonth()+1;
    var d=date.getDate()<10 ? "0" + date.getDate() : date.getDate();
    var today=y+"年"+m+"月"+d+"日";
    this.getToday = today;
    var loanApplyId = JSON.parse(comn.getArgs()['loanApplyId']);
    if(!loanApplyId.length) return;
    loanApplyId.forEach(function(item,index){
      getBudgetInfo(item);
    });
    //打印数据获取
    function getBudgetInfo(applyId){
      comn.ajax({
        url: interUrl.myTask.printBudgetInfo,
        data: {
          loanApplyId:applyId,
          position:comn.getArgs()["position"]
        },
        success: function (res) {
          var extra = '';
          if(res.data.isGpsFee == 0 && res.data.isInsuranceFee == 0 && res.data.isPurchaseTaxFee == 0){
            extra = '';
          }else{
            extra = fareAdd(res.data.fusePurchaseTaxFee,res.data.fuseGpsFee,res.data.fuseInsuranceFee);
          }
          var newData = {
            loanTerm: window['loanTerm'](res.data['loanTerm']) || '',
            isAdvanceDiscount: window['isAdvanceDiscount'](res.data['isAdvanceDiscount']) || '',
            gpsType: [null, "有线", "无线", "有线+无线"][res.data.gpsType] || '',
            extraFare: extra
          };
          Object.assign(res.data,newData);
          _this.budgetData.push(res.data);
          if(loanApplyId.length == _this.budgetData.length){
            _this.domOver = true;
          }
        }
      });
    }
  }
});
function fareAdd(){
  function toNum(val){
    return val || 0;
  }
  if(arguments.length < 1) return ;
  var arr,num;
  arr = arguments;
  num = 0;
  for(var i = 0;i < arr.length;i++){
    num += toNum(arr[i]);
  }
  return num;
}


