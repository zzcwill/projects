/**
 * Created by hyb on 15/11/27.
 */
//打印预算单
var gpsType = function (value) { return [null, "有线", "无线"][value] || null; };
var date=new Date();
var y=date.getFullYear();
var m=date.getMonth()<10? 0 + date.getMonth() + 1 : date.getMonth()+1;
var d=date.getDate();
var today=y+"年"+m+"月"+d+"日";
$("#printDate").text(today);
args = comn.getArgs();
loanApplyId={loanApplyId:args['loanApplyId']};
//预算单信息
comn.ajax({
  url: interUrl.myTask.printBudgetInfo,
  data: loanApplyId,
  success: function (res) {
    $("#approvalBudgetInfoForm").nameValues(res.data);
    window.print();
  }
});

