import request from "@/assets/js/utils/request";

/* 登录 */
export function loginApi(data) {
  return request({
    url: "user/login",
    method: "post",
    params: data
  });
}

/* 获取合同签署列表 */
export function getEContractList(data) {
  return request({
    url: "eContract/list",
    method: "post",
    params: data
  });
}

/* 签约合同签约路径 */
export function getEContractInstanceH5(data) {
  return request({
    url: "eContract/eInstalment/instance/h5",
    method: "post",
    params: data
  });
}

/* 更新合同签约状态 */
export function getEContractStatusUpdate(data) {
  return request({
    url: "eContract/eInstalment/status/update",
    method: "post",
    params: data
  });
}

/* 规则中心数据 */
export function getRuleCenterData(data) {
  return request({
    url: "loanApply/getRuleCenterData",
    method: "post",
    data: data
  });
}

// 获取待绑定客户列表数据
export function getToBeBindingCustomer(data) {
  return request({
    url: "loanApply/getToBeBindingCustomer",
    method: "post",
    params: data
  });
}
