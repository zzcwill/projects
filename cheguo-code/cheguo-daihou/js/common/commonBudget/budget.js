/**
 * Created by hyb on 16/1/6.
 */
//预算单信息
getBudgetInfo();


//打印预算单
$("#btn-print-budget").click(function(){
    window.open("../../../Modal/task/myTask/print.html?loanApplyId="+args['loanApplyId']);
});