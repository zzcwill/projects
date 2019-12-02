function accAdd(arg1, arg2) {
  //js精度问题(加法)
  var r1, r2, r3, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  var addval = (arg1 * m + arg2 * m) / m;
  try {
    r3 = addval.toString().split(".")[1].length;
  } catch (e) {
    r3 = 0;
  }
  if (r3 > 2) {
    addval = addval.toFixed(4);
  }
  return addval;
}
function accMul(arg1, arg2) {
  //js精度问题(乘法)
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
}
function accDiv(arg1, arg2) {
  //js精度问题(除法)
  var t1 = 0,
    t2 = 0,
    r1,
    r2;
  try {
    t1 = arg1.toString().split(".")[1].length;
  } catch (e) {}
  try {
    t2 = arg2.toString().split(".")[1].length;
  } catch (e) {}
  //with (Math) {
  r1 = Number(arg1.toString().replace(".", ""));
  r2 = Number(arg2.toString().replace(".", ""));
  return (r1 / r2) * Math.pow(10, t2 - t1);
  //}
}
function accSub(arg1, arg2) {
  //js精度问题(减法)
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  //last modify by deeka
  //动态控制精度长度
  n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}
// 总价: allprice
// 首付: fp
// 利率: rote
// 24: 24期(期数)
var FirstPayments = function(allprice, proportion) {
  return accDiv(accMul(allprice, proportion), 100).toFixed(2);
};

var MonthlyPayments = function(allprice, fp, rote, installment) {
  return accDiv(
    accMul(accMul(accSub(allprice, fp), accAdd(1, accDiv(rote, 100))), 10000),
    installment
  ).toFixed(0);
};

export { MonthlyPayments, FirstPayments };
