/**
 * Created by hyb on 15/11/27.
 */
//打印预算单
var date=new Date();
var y=date.getFullYear();
var m=date.getMonth()<9? 0 + date.getMonth() + 1 : date.getMonth()+1;
var d=date.getDate()<10 ? "0" + date.getDate() : date.getDate();
var today=y+"年"+m+"月"+d+"日";
$("#printDate").text(today);
args = comn.getArgs();
loanApplyId={loanApplyId:args['loanApplyId']};

//预算单信息
comn.ajax({
  url: interUrl.myTask.printBudgetInfo,
  data: {
    loanApplyId:args['loanApplyId'],
    position:args["position"]
  },
  success: function (res) {
    $("#approvalBudgetInfoForm").nameValues(res.data);
    if(res.data.isGpsFee == 0 && res.data.isInsuranceFee == 0 && res.data.isPurchaseTaxFee == 0){
      $('#approvalBudgetInfoForm').find('[data-name=extraFare]').html('');
    }else{
      $('#approvalBudgetInfoForm').find('[data-name=extraFare]').html(fareAdd(res.data.fusePurchaseTaxFee,res.data.fuseGpsFee,res.data.fuseInsuranceFee));
    }

    //判断是不是车信贷,车信贷把合作银行改合作机构
    function isCarCreditLoan() {
      comn.ajax({
        url: interUrl.loanDetail.getLoanFeeInfoInfoQuery,
        data: { 
            projectId: args['loanApplyId'],
        },
        success: function (data) {
            if(data.data.loanType == 8){
              $('#coBankName').html('合作机构');
              window.print();
            }else{
              window.print();
            }
        }
      });      
    }
    isCarCreditLoan();                   
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