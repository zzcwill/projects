var table_1, table_2, table_pay3, _nodeName = '', _flowName = '';
var args = comn.getArgs();
document.cookie='saveId.bs.table.pageNumber = 1'; //默认显示第一页
if (args["origin"] === "staging") { //来源工作台，读取缓存中的节点名称
    _nodeName = window.parent.cache.nodeName;
    _flowName = window.parent.cache.flowName;
} else {
    window.parent.cache.nodeName = '';
    window.parent.cache.flowName = '';
}
var dataArr =[["#sortField", "MyTasksSortFields", ""]];
$.getCommonMethodPort(dataArr);
//我的任务 节点显示
if (_nodeName != "" || _flowName != "") {
    $("#ftCode").flowGet(_flowName);
    $(document).on("change", "#ftCode", function () {
        $("#flowNode").getFlowNode(_flowName, _nodeName);
    });
}
table_1 = function (params) {
    var o = $("#taskForm").values();
    o.ftCode = $("#ftCode").val() || _flowName || '';
    o.flowNode = $("#flowNode").val() || _nodeName || '';
    tableData(params, $.extend(o, {
        isProcessed: false
    }), interUrl.myTask.searchTaskList);
};

$(".nav-tabs li").click(function () {
    var activeTab = $(this).children().attr("href");
    if ((activeTab == "#done") && ($("#table2").find(".no-records-found td").html() === "没有找到匹配的记录")) {
        table_2 = function (params) {
            tableData(params, $.extend($("#taskForm").values(), {
                isProcessed: true
            }), interUrl.myTask.searchTaskList);
        };
        $("#table2").bootstrapTable("refresh", {url: "..."});
        //$("#table2").bootstrapTable("destroy").bootstrapTable(comn.table);
    }
});
$("#resetBtn").click(function(){
    //清空缓存中的流程名称和节点名称
    window.parent.cache.nodeName = '';
    window.parent.cache.flowName = '';
    _nodeName = "";
    _flowName = "";
});

var handle_1, handle_2, tableEvent_1, tableEvent_2, handle_3, handle_4;
//加盟申请流程、门头申请流程、门头验收流程、快速审批流程、续签合同流程、超抵合同流程等节点只针对app开放
var flowName = ["JOIN_CAR_DEALER_ADD_FLOW", "JOIN_DOOR_HEADER_APPLY_FLOW", "JOIN_DOOR_HEADER_CHECK_FLOW", "JOIN_CAR_DEALER_QUICK_FLOW", "RENEW_CONTRACT_FLOW", "PLEDGE_OVERDUE_FLOW"];
tableEvent_1 = {
    "click .taskType": function (e, a, item, index) {
        //currentNodeKey 节点编码
        var path = "./Modal/task/myTask/";
        var path_2 = "./Modal/loanManage/loanReview/";
        var path_3 = "./Modal/loanManage/creditManage/";
        var path_4 = "./Modal/customManage/cheguoCustomer/";
        var path_5 = "./Modal/loanManage/loanCancel/";
        var path_6 = "./Modal/loanManage/loanModify/";
        var path_7 = "./Modal/distributionInsuranceCo/distributionInsuranceCoList/";
        var search = "bopInfoId=" + item.businessObjectProcessInfoId + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode + "&businessGroupId=" + item.businessGroupId + "&currentNodeKey=" + item.currentNodeKey + "&customerId=" + item.customerId + "&currentNodeName=" + item.currentNodeName + "&projectId=" + (item.loanProjectId || "");
        comn.ajax({
            url: interUrl.myTask.myTasksRead,
            data: {bopId: item.businessObjectProcessInfoId},
            success: function (res) {
                //文档详情参数整理
                var space = "";
                switch (item.businessTypeCode) {
                    case 'LOAN_MODIFY_FLOW':
                    case 'LOAN_APPLY_FLOW':
                    case 'LOAN_CANCEL_FLOW':
                        space = "LOAN";
                        break;
                    case 'INSTANT_APPLY_FLOW':
                        space = "LOAN";
                        break;
                    case 'SECOND_HAND_CAR_ESTIMATE_FLOW':
                    case 'SECOND_HAND_CAR_TRANSFER_FLOW':
                        space = "SECONDHAND_CAR";
                        break;
                    case 'DOCUMENT_TRANSMIT_FLOW':
                        space = "DELIVER";
                        break;
                    case 'CAR_DEALER_ADD_FLOW':
                        space = "CAR_DEALER";
                        break;
                    //新增车信贷流程
                    case 'YNTRUST_APPLY_FLOW':
                        space = "LOAN";
                        break;
                    //新增微车贷流程
                    case 'WEBANK_APPLY_FLOW':
                        space = "LOAN";
                        break;
                    default:
                        space = ""
                }
                space = "&space=" + space + "&releventFlowNode=" + item.currentNodeKey + "&releventFlow=" + item.businessTypeCode;
                switch (a) {
                    //征信流程start
                    case "CREDIT_START":
                        tip({
                            content: '因系统优化，请从APP发起征信！'
                        })
                        // return comn.addTab({
                        //     title: item.currentNodeName,
                        //     href: path_4 + "credit.html?type=1&creditId=" + item.businessId + space
                        // }); //征信开始
                        break;
                    case "CREDIT_ENTER":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path_3 + "creditInfo.html?type=2&customerId=" + item.customerId + "&businessId=" + item.businessId + space
                        }); //征信结果录入
                        break;
                    case "CREDIT_ACCEPT":
                        if (item.loanType == 5) {
                            return tip({
                                content: '此业务电脑端暂未开放，请使用手机APP处理'
                            })
                        }
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path_3 + "creditInfo.html?type=3&customerId=" + item.customerId + "&businessId=" + item.businessId + space
                        }); //征信接受
                        break;
                    //征信流程end

                    case "LOAN_LAUNCH":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path_2 + "loanStart.html?releventFlow=LOAN_APPLY_FLOW&scoreType=edit&type=0&loanApplyId=" + item.businessId + space
                        }); //贷款发起
                        break;
                    case "LOAN_BILL_ASSIGN":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path + "distribution.html?" + search + space
                        }); //签单分配
                        break;
                    case "LOAN_BILL_RESEARCH":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path + "survery.html?" + search + "&sign=main" + space
                        }); //主签单员调查签单
                        break;
                    case "LOAN_VICE_BILL_RESEARCH":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path + "survery.html?" + search + "&sign=vice" + space
                        }); //副签单员调查签单
                        break;
                    case "LOAN_MODIFY_LAUNCH":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path_2 + "loanStart.html?scoreType=edit&type=0&releventFlow=LOAN_MODIFY_FLOW&flow=modify&loanApplyId=" + item.businessId + space
                        }); //贷款修改发起
                        break;
                    case "LOAN_OFFICE_STAFF_BUDGET":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path + "office.html?scoreType=edit&" + search + space
                        }); //业务录入
                        break;
                    case "LOAN_REGIONAL_MANAGER":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path + "areaManager.html?" + search + "&type=1" + space
                        }); //初级审核
                        break;
                    case "LOAN_APPROVE_OFFICE_STAFF":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path + "areaManager.html?" + search + "&type=2" + space
                        }); //中级审核
                        break;
                    case "LOAN_GENERAL_MANAGER":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path + "areaManager.html?" + search + "&type=3" + space
                        }); //分公司总经理
                        break;
                    case "LOAN_CAR_FINANCE":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path + "manageDepartment.html?" + search + "&type=1" + space
                        }); //贷款申请流程-总部审批中心
                        break;
                    case "LOAN_CAR_FINANCE_MANAGER":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path + "manageDepartment.html?" + search + "&type=2" + space
                        }); //经营管理部-汽车金融部经理
                        break;
                    case "LOAN_CAR_FINANCE_MAJORDOMO":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path + "manageDepartment.html?" + search + "&type=3" + space
                        }); //经营管理部-汽车金融部总监
                        break;
                    case "LOAN_GROUP_GENERAL_MANAGER":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path + "manageDepartment.html?" + search + "&type=4" + space
                        }); //经营管理部-集团总经理
                        break;
                    case "LOAN_CASHIER_CHECK":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path + "financial.html?" + search + "&type=1" + space
                        });//付款查验
                    case "LOAN_FINANCE_EXECUTIVE":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path + "financial.html?" + search + "&type=1" + space
                        }); //付款申请
                        break;
                    case "LOAN_FUND_DIRECTOR":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path + "financial.html?" + search + "&type=2" + space
                        }); //贷款申请流程-付款审批
                        break;
                    case "LOAN_GROUP_CASHIER":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path + "financial.html?" + search + "&type=3" + space
                        }); //资金管理部出纳
                        break;
                    case "LOAN_BRANCH_CASHIER":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path + "departmentCashier.html?" + search + "&type=1" + space
                        }); //分公司出纳
                        break;
                    case "LOAN_BRANCH_CASHIER_7_24":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path + "departmentCashier.html?" + search + "&type=2" + space
                        }); //7*24垫款
                        break;
                    case "LOAN_FUND_DIRECTOR_7_24":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path + "financial.html?" + search + "&type=2" + space
                        }); //7*24付款审批
                        break;
                    case "LOAN_GROUP_CASHIER_7_24":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path + "financial.html?" + search + "&type=3" + space
                        }); //7*24资金划拨
                        break;
                    case "LOAN_BRANCH_REPAY_7_24":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path + "departmentCashier.html?" + search + "&type=3" + space
                        }); //7*24分公司还款
                        break;
                    //以下是车商部分的流程节点
                    case "CAR_DEALER_LAUNCH":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/carDealerManage/carDealer/carDealer.html?dealerId=" + item['businessId'] + "&type=4&isManager=" + true + space + "&currentNodeName=" + item.currentNodeName + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode
                        });
                        //发起新增车商
                        break;
                    case "CAR_DEALER_REGIONAL_MANAGER":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/carDealerManage/carDealer/carDealer.html?dealerId=" + item['businessId'] + "&type=1&bopInfoId=" + item['businessObjectProcessInfoId'] + space + "&currentNodeName=" + item.currentNodeName + "&isManager=true&bopInfoId=" + item['businessObjectProcessInfoId'] + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode
                        }); //车商区域经理审核
                        break;
                    case "CAR_DEALER_GENERAL_MANAGER":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/carDealerManage/carDealer/flow.html?dealerId=" + item['businessId'] + "&type=2&bopInfoId=" + item['businessObjectProcessInfoId'] + space + "&currentNodeName=" + item.currentNodeName + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode
                        }); //车商分公司总经理
                        break;
                    case "CAR_DEALER_ACCOUNTING_ASSISTANT":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/carDealerManage/carDealer/flow.html?dealerId=" + item['businessId'] + "&type=3&bopInfoId=" + item['businessObjectProcessInfoId'] + "&currentNode=" + a + space + "&currentNodeName=" + item.currentNodeName + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode
                        }); //车商分公司会计助理
                        break;
                    case "CAR_DEALER_CAR_FINANCE":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/carDealerManage/carDealer/flow.html?dealerId=" + item['businessId'] + "&type=4&bopInfoId=" + item['businessObjectProcessInfoId'] + space + "&currentNodeName=" + item.currentNodeName + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode
                        }); //车商汽车金融部
                        break;
                    case "CAR_DEALER_BRANCH_CASHIER":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/carDealerManage/carDealer/flow.html?dealerId=" + item['businessId'] + "&type=5&bopInfoId=" + item['businessObjectProcessInfoId'] + space + "&currentNodeName=" + item.currentNodeName + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode
                        }); //车商分公司出纳
                        break;
                    case "ESTIMATE_LAUNCH":
                        if (item.loanType == 5) {
                            return tip({
                                content: '此业务电脑端暂未开放，请使用手机APP处理'
                            })
                        }
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/secondHandCar/common/index.html?type=1&id=" + item['businessId'] + space + "&currentNodeName=" + item.currentNodeName + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode
                        }); //二手车评估
                        break;
                    case "FIRST_ESTIMATE":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/secondHandCar/common/index.html?type=4&id=" + item['businessId'] + "&id1=" + item['businessObjectProcessInfoId'] + "&releventFlow=" + item['businessTypeCode'] + "&releventFlowNode=" + item['currentNodeKey'] + "&currentNodeKey=" + item['currentNodeKey'] + space + "&currentNodeName=" + item.currentNodeName + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode
                        }); //二手车初评
                        break;
                    case "SECOND_ESTIMATE":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/secondHandCar/common/index.html?type=5&id=" + item['businessId'] + "&id1=" + item['businessObjectProcessInfoId'] + "&releventFlow=" + item['businessTypeCode'] + "&releventFlowNode=" + item['currentNodeKey'] + "&currentNodeKey=" + item['currentNodeKey'] + space + "&currentNodeName=" + item.currentNodeName + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode
                        }); //二手车复评
                        break;
                    case "TRANSFER_LAUNCH":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/secondHandCar/common/index.html?type=3&id=" + item['businessId'] + "&releventFlow=" + item['businessTypeCode'] + "&releventFlowNode=" + item['currentNodeKey'] + space + "&currentNodeName=" + item.currentNodeName + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode
                        }); //过户办理
                        break;
                    case "TRANSFER_APPROVAL":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/secondHandCar/common/index.html?type=6&id=" + item['businessId'] + "&id1=" + item['businessObjectProcessInfoId'] + "&releventFlow=" + item['businessTypeCode'] + "&releventFlowNode=" + item['currentNodeKey'] + space + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode
                        }); //过户审批
                        break;
                    case "TRANSFER_ESTIMATE_REPORT":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/secondHandCar/common/index.html?type=7&id=" + item['businessId'] + "&id1=" + item['businessObjectProcessInfoId'] + "&releventFlow=" + item['businessTypeCode'] + "&releventFlowNode=" + item['currentNodeKey'] + space + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode
                        }); //评估报告
                        break;
                    case "LOAN_CANCEL_OFFICE_STAFF_BUDGET":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path_5 + "office.html?" + search + "&customerId=" + item.customerId + "&flow=cancel-task" + space
                        }); //内勤录入
                        break;
                    case "LOAN_CANCEL_REGIONAL_MANAGER":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path_5 + "areaManager.html?" + search + "&type=1" + space
                        }); //区域经理
                        break;
                    case "LOAN_CANCEL_APPROVE_OFFICE_STAFF":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path_5 + "areaManager.html?" + search + "&type=2" + space
                        }); //审核内勤
                        break;
                    case "LOAN_CANCEL_GENERAL_MANAGER":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path_5 + "areaManager.html?" + search + "&type=3" + space
                        }); //分公司总经理
                        break;
                    case "LOAN_CANCEL_CAR_FINANCE":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path_5 + "manageDepartment.html?" + search + space
                        }); //汽车金融部
                        break;
                    case "LOAN_CANCEL_FINANCE_EXECUTIVE":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path_5 + "financial.html?" + search + "&type=1" + space
                        }); //分公司财务主管
                        break;
                    case "LOAN_CANCEL_BRANCH_CASHIER":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path_5 + "financial.html?" + search + "&type=2" + space
                        }); //出纳收款确认
                        break;
                    case "LOAN_CANCEL_GROUP_CASHIER":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path_5 + "departmentCashier.html?" + search + space
                        }); //资金管理部出纳
                        break;
                    case "LOAN_MODIFY_OFFICE_STAFF_BUDGET":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path_6 + "office.html?scoreType=edit&" + search + "&flow=modify-task" + space
                        }); //内勤录入
                        break;
                    case "LOAN_MODIFY_REGIONAL_MANAGER":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path_6 + "areaManager.html?" + search + "&flow=modify&type=1" + space
                        }); //区域经理-初审
                        break;
                    case "LOAN_MODIFY_APPROVE_OFFICE_STAFF":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path_6 + "areaManager.html?" + search + "&flow=modify&type=2" + space
                        }); //审核内勤-中审
                        break;
                    case "LOAN_MODIFY_GENERAL_MANAGER":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path_6 + "areaManager.html?" + search + "&flow=modify&type=3" + space
                        }); //分公司总经理
                        break;
                    case "LOAN_MODIFY_CAR_FINANCE":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path_6 + "manageDepartment.html?" + search + "&flow=modify&type=1" + space
                        }); //汽车金融部-总部审批中心
                        break;
                    case "LOAN_MODIFY_FINANCE_EXECUTIVE_1":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path_6 + "financial.html?" + search + "&flow=modify" + space
                        }); //分公司财务主管1
                        break;
                    case "LOAN_MODIFY_BRANCH_CASHIER_1":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path_6 + "financial1.html?" + search + "&flow=modify" + space
                        }); //分公司出纳收款确认
                        break;
                    case "LOAN_MODIFY_GROUP_CASHIER_1":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path_6 + "financial2.html?" + search + "&flow=modify" + space
                        }); //资金管理部出纳收款
                        break;
                    case "LOAN_MODIFY_FINANCE_EXECUTIVE_2":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path_6 + "financial3.html?" + search + "&flow=modify&type=1" + space
                        }); //分公司财务主管付款申请
                        break;
                    case "LOAN_MODIFY_FUND_DIRECTOR":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path_6 + "financial3.html?" + search + "&flow=modify&type=2" + space
                        }); //资金管理部主任审核
                        break;
                    case "LOAN_MODIFY_GROUP_CASHIER_2":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path_6 + "financial3.html?" + search + "&flow=modify&type=3" + space
                        }); //资金管理部出纳放款
                        break;
                    case "LOAN_MODIFY_BRANCH_CASHIER_2":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path_6 + "financial4.html?" + search + "&flow=modify" + space
                        }); //分公司出纳
                        break;

                    //文档传递流程start
                    case "TRANSMIT_LAUNCH":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/documentManagement/documentDelivery/documentDelivery.html?businessId=" + item['businessId'] + space
                        }); //文档传递
                        break;
                    case "DOCUMENT_VERIFY":
                        documentFun(item['businessId'], item['businessObjectProcessInfoId'], 1, 1, item.currentNodeName, item.customerId, item.currentNodeKey, item.operatorNodeKey);
                        break;
                    case "COPY_CONTRACT":
                        documentFun(item['businessId'], item['businessObjectProcessInfoId'], 1, 1, item.currentNodeName, item.customerId, item.currentNodeKey, item.operatorNodeKey);
                        break;
                    case "DOCUMENT_REVIEW":
                        documentFun(item['businessId'], item['businessObjectProcessInfoId'], 3, 1, item.currentNodeName, item.customerId, item.currentNodeKey, item.operatorNodeKey);
                        break;
                    case "DOCUMENT_CLASSIFY":
                        documentFun(item['businessId'], item['businessObjectProcessInfoId'], 4, 1, item.currentNodeName, item.customerId, item.currentNodeKey, item.operatorNodeKey);
                        break;
                    //文档传递流程end

                    // 客户分配
                    case "CHEGUO_CUSTOMER_IMPORT":
                        if (item.loanType == 5) {
                            return tip({
                                content: '此业务电脑端暂未开放，请使用手机APP处理'
                            })
                        }
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/customManage/branchCompany/info.html?type=2&id=" + item['customerId'] + space
                        });
                        break;
                    // 	保险分发发起
                    case "INSURANCE_DISPATCHN_LAUNCH":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path_7 + "distributionInsuranceInfo.html?projectId=" + (item.businessId || "") + "&bopInfoId=" + item.businessObjectProcessInfoId + "&projectNo=" + item.businessNum + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode + "&currentNodeKey=" + item.currentNodeKey + "&space=" + "INSURANCE_DISTRIBUTION" + "&releventFlowNode=" + item.currentNodeKey + "&releventFlow=INSURANCE_DISPATCHN_FLOW"
                        });
                        break;
                    // 保险分发初审
                    case "INSURANCE_DISPATCHN_PRIMARY":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path_7 + "distributionInsuranceInfo.html?projectId=" + (item.businessId || "") + "&bopInfoId=" + item.businessObjectProcessInfoId + "&projectNo=" + item.businessNum + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode + "&currentNodeKey=" + item.currentNodeKey + "&space=" + "INSURANCE_DISTRIBUTION" + "&releventFlowNode=" + item.currentNodeKey + "&releventFlow=INSURANCE_DISPATCHN_FLOW"
                        });
                        break;
                    //复审
                    case "INSURANCE_DISPATCHN_REVIEW":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: path_7 + "distributionInsuranceInfo.html?projectId=" + (item.businessId || "") + "&bopInfoId=" + item.businessObjectProcessInfoId + "&projectNo=" + item.businessNum + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode + "&currentNodeKey=" + item.currentNodeKey + "&space=" + "INSURANCE_DISTRIBUTION" + "&releventFlowNode=" + item.currentNodeKey + "&releventFlow=INSURANCE_DISPATCHN_FLOW"
                        });
                        break;
                    //GPS 发起申请
                    case "GPS_APPLY_LAUNCH":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/stockManage/GPSBatchApply/applyGps.html?" + search + space + "&gpsApplyId=" + item.businessId + "&node=first"
                        });
                        break;
                    //GPS 分公司总经理审批
                    case "GPS_APPLY_PRIMARY":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/stockManage/GPSBatchApply/approveGPS.html?" + search + space + "&gpsApplyId=" + item.businessId
                        });
                        break;

                    //车主贷流程节点start-增加
                    //业务申请
                    case "INSTANT_LOAN_APPLY":
                        return tip({content: "此业务电脑端暂未开放，请使用手机APP处理"});
                        break;
                    //上门家访
                    case "INSTANT_LOAN_HOME_BILL":
                        return tip({content: "此业务电脑端暂未开放，请使用手机APP处理"});
                        break;
                    //分公司审批
                    case "INSTANT_LOAN_BRANCH_APPROVE":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/businessReview/businessReview/index.html?" + space + "&type=ownersStaging&bopInfoId=" + item.businessObjectProcessInfoId + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode + "&businessGroupId=" + item.businessGroupId + "&currentNodeKey=" + item.currentNodeKey + "&customerId=" + item.customerId + "&currentNodeName=" + item.currentNodeName + "&projectId=" + (item.loanProjectId || item.businessId || "")
                        });
                        break;
                    //总部审批
                    case "INSTANT_LOAN_APPROVE":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/businessReview/businessReview/index.html?" + space + "&type=ownersStaging&bopInfoId=" + item.businessObjectProcessInfoId + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode + "&businessGroupId=" + item.businessGroupId + "&currentNodeKey=" + item.currentNodeKey + "&customerId=" + item.customerId + "&currentNodeName=" + item.currentNodeName + "&projectId=" + (item.loanProjectId || item.businessId || "")
                        });
                        break;
                    //GPS安装
                    case "INSTANT_LOAN_GPS_INSTALL":
                        return tip({content: "此业务电脑端暂未开放，请使用手机APP处理"});
                        break;
                    //GPS核验
                    case "INSTANT_LOAN_GPS_VERIFICATION":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/businessReview/gpsCheck/gpsCheck.html?" + space + "&type=ownersStaging&bopInfoId=" + item.businessObjectProcessInfoId + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode + "&businessGroupId=" + item.businessGroupId + "&currentNodeKey=" + item.currentNodeKey + "&customerId=" + item.customerId + "&currentNodeName=" + item.currentNodeName + "&projectId=" + (item.loanProjectId || item.businessId || "")
                        });
                        break;
                    //付款申请
                    case "INSTANT_LOAN_FUND_APPROVE":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/businessReview/loanApproval/loanApproval.html?" + space + "&type=ownersStaging&bopInfoId=" + item.businessObjectProcessInfoId + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode + "&businessGroupId=" + item.businessGroupId + "&currentNodeKey=" + item.currentNodeKey + "&customerId=" + item.customerId + "&currentNodeName=" + item.currentNodeName + "&projectId=" + (item.loanProjectId || item.businessId || "")
                        });
                        break;
                    //付款审批
                    case "INSTANT_LOAN_PAYMENT_APPROVE":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/businessReview/payApproval/payApproval.html?flow=1" + space + "&type=ownersStaging&bopInfoId=" + item.businessObjectProcessInfoId + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode + "&businessGroupId=" + item.businessGroupId + "&currentNodeKey=" + item.currentNodeKey + "&customerId=" + item.customerId + "&currentNodeName=" + item.currentNodeName + "&projectId=" + (item.loanProjectId || item.businessId || "")
                        });
                        break;
                    //资金划拨
                    case "INSTANT_LOAN_FUND_TRANSFER":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/businessReview/payApproval/payApproval.html?flow=2" + space + "&type=ownersStaging&bopInfoId=" + item.businessObjectProcessInfoId + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode + "&businessGroupId=" + item.businessGroupId + "&currentNodeKey=" + item.currentNodeKey + "&customerId=" + item.customerId + "&currentNodeName=" + item.currentNodeName + "&projectId=" + (item.loanProjectId || item.businessId || "")
                        });
                        break;
                    //出纳付款
                    case "INSTANT_LOAN_FUND_CASH":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/businessReview/branchPay/branchPay.html?" + space + "&type=ownersStaging&bopInfoId=" + item.businessObjectProcessInfoId + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode + "&businessGroupId=" + item.businessGroupId + "&currentNodeKey=" + item.currentNodeKey + "&customerId=" + item.customerId + "&currentNodeName=" + item.currentNodeName + "&projectId=" + (item.loanProjectId || item.businessId || "")
                        });
                        break;
                    //车主贷流程节点end-增加

                    //低费率特批-总经理
                    case "LOWFEE_GENERAL_MANAGER":
                        return comn.addTab(
                            lowFeeFun(item['businessId'], item['businessObjectProcessInfoId'], item.currentNodeName, item.customerId, item.currentNodeKey, item.operatorNodeKey)
                        );
                        break;
                    //低费率特批-金融部
                    case "LOWFEE_FINANCE_MANAGER":
                        return comn.addTab(
                            lowFeeFun(item['businessId'], item['businessObjectProcessInfoId'], item.currentNodeName, item.customerId, item.currentNodeKey, item.operatorNodeKey)
                        );
                        break;

                    /*
                        空白合同
                     */
                    //分公司发起空白合同申请
                    case "CONTRACT_APPLY_LAUNCH_BRANCH":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/blankContract/flowApproval/index.html?type=1&contractApplyId=" + item.businessId + space + "&bopInfoId=" + item.businessObjectProcessInfoId + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode + "&businessGroupId=" + item.businessGroupId + "&currentNodeKey=" + item.currentNodeKey + "&customerId=" + item.customerId + "&currentNodeName=" + item.currentNodeName + "&projectId=" + (item.loanProjectId || item.businessId || "")
                        });
                        break;
                    //分公司空白合同集团审批
                    case "CONTRACT_APPLY_GROUP_BRANCH":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/blankContract/flowApproval/index.html?type=2&contractApplyId=" + item.businessId + space + "&bopInfoId=" + item.businessObjectProcessInfoId + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode + "&businessGroupId=" + item.businessGroupId + "&currentNodeKey=" + item.currentNodeKey + "&customerId=" + item.customerId + "&currentNodeName=" + item.currentNodeName + "&projectId=" + (item.loanProjectId || item.businessId || "")
                        });
                        break;
                    //分公司空白合同银行审批
                    case "CONTRACT_APPLY_BANK_BRANCH":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/blankContract/flowApproval/index.html?type=3&contractApplyId=" + item.businessId + space + "&bopInfoId=" + item.businessObjectProcessInfoId + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode + "&businessGroupId=" + item.businessGroupId + "&currentNodeKey=" + item.currentNodeKey + "&customerId=" + item.customerId + "&currentNodeName=" + item.currentNodeName + "&projectId=" + (item.loanProjectId || item.businessId || "")
                        });
                        break;

                    //车信贷流程节点start
                    //车信贷-业务发起
                    case "YNTRUST_LOAN_APPLY":
                        return tip({content: "此业务电脑端暂未开放，请使用手机APP处理"});
                        break;
                    //车信贷-签单调查
                    case "YNTRUST_LOAN_BILL_RESEARCH":
                        return tip({content: "此业务电脑端暂未开放，请使用手机APP处理"});
                        break;
                    //车信贷-总部审批
                    case "YNTRUST_LOAN_HQ_APPROVE":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/carCreditLoan/headquartersApprovalCenter/index.html?" + search + space
                        });
                        break;
                    //车信贷-线上签约
                    case "YNTRUST_LOAN_ONLINE_CONTRACT":
                        return tip({content: "此业务电脑端暂未开放，请使用手机APP处理"});
                        break;
                    //车信贷-放款申请
                    case "YNTRUST_LOAN_PAYMENT_APPLY":
                        return tip({content: "此业务电脑端暂未开放，请使用手机APP处理"});
                        break;
                    //车信贷-放款审批
                    case "YNTRUST_LOAN_PAYMENT_APPROVE":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/carCreditLoan/loanApproval/index.html?" + search + space
                        });
                        break;
                    //车信贷-放款实施
                    case "YNTRUST_LOAN_PAYMENT_IMPLEMENT":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/carCreditLoan/lendingImplement/index.html?" + search + space
                        });
                        break;
                    //车信贷-放款复核
                    case "YNTRUST_LOAN_PAYMENT_REVIEW":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/carCreditLoan/loanReview/index.html?" + search + space
                        });
                        break;
                    //车信贷流程节点end

                    //微车贷流程节点start
                    //微车贷-贷款申请
                    case "WEBANK_LOAN_APPLY":
                        return tip({content: "此业务电脑端暂未开放，请使用手机APP处理"});
                        break;
                    //微车贷-中级审核
                    case "WEBANK_LOAN_APPROVE_OFFICE":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/miniCarLoan/intermediateApproval/index.html?" + search + space
                        });
                        break;
                    //微车贷-总部审批
                    case "WEBANK_LOAN_HQ_APPROVE":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/miniCarLoan/headquartersApprovalCenter/index.html?" + search + space
                        });
                        break;
                    //微车贷-签约
                    case "WEBANK_LOAN_SIGN_CONTRACT":
                        return tip({content: "此业务电脑端暂未开放，请使用手机APP处理"});
                        break;
                    //微车贷-GPS安装
                    case "WEBANK_LOAN_GPS_INSTALL":
                        return tip({content: "此业务电脑端暂未开放，请使用手机APP处理"});
                        break;
                    //微车贷-GPS核验
                    case "WEBANK_LOAN_GPS_VERIFICATION":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/miniCarLoan/gpsCheck/index.html?" + search + space
                        });
                        break;
                    //微车贷-放款申请
                    case "WEBANK_LOAN_PAYMENT_APPLY":
                        return tip({content: "此业务电脑端暂未开放，请使用手机APP处理"});
                        break;
                    //微车贷-放款审批
                    case "WEBANK_LOAN_PAYMENT_APPROVE":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/miniCarLoan/loanApproval/index.html?" + search + space
                        });
                        break;
                    //微车贷-微众放款
                    case "WEBANK_LOAN_PAYMENT_CASH":
                        return tip({content: "此业务电脑端暂未开放，请使用手机APP处理"});
                        break;
                    //微车贷流程节点end

                }
                if (flowName.indexOf(item.businessTypeCode) > -1) {
                    return tip({content: "该业务电脑端暂不支持，请使用手机APP处理！"});
                }
            }
        });
    }
};

tableEvent_2 = {
    "click .info": function (e, a, item, index) {
        //businessTypeCode节点编码
        //征信详情 path_3+creditInfo?businessId="+item.businessId
        //贷款详情 path_2+type=1&loanApplyId=" + item.businessId
        //CREDIT_FLOW(“征信流程"),
        //LOAN_APPLY_FLOW(“贷款申请流程"),
        //LOAN_MODIFY_FLOW(“贷款修改流程")，
        //LOAN_CANCEL_FLOW("贷款作废流程"),
        //SECOND_HAND_CAR_ESTIMATE_FLOW("二手车评估流程"),
        //SECOND_HAND_CAR_TRANSFER_FLOW("二手车过户流程") ,
        //CHEGUO_CUSTOMER_ASSIGN_FLOW("车果客户分配流程"),
        //DOCUMENT_TRANSMIT_FLOW("文档传递流程"),
        //CAR_DEALER_ADD_FLOW(“车商新增流程")
        var path_2 = "./Modal/loanManage/loanReview/";
        var path_3 = "./Modal/loanManage/creditManage/";
        var search = "bopInfoId=" + item.businessObjectProcessInfoId + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode + "&businessGroupId=" + item.businessGroupId + "&currentNodeKey=" + item.currentNodeKey;
        var space = "";
        switch (item.businessTypeCode) {
            case 'LOAN_MODIFY_FLOW':
            case 'LOAN_APPLY_FLOW':
            case 'LOAN_CANCEL_FLOW':
                space = "LOAN";
                break;
            case 'INSTANT_APPLY_FLOW':
                space = "LOAN";
                break;//车主贷
            case 'SECOND_HAND_CAR_ESTIMATE_FLOW':
            case 'SECOND_HAND_CAR_TRANSFER_FLOW':
                space = "SECONDHAND_CAR";
                break;
            case 'DOCUMENT_TRANSMIT_FLOW':
                space = "DELIVER";
                break;
            case 'CAR_DEALER_ADD_FLOW':
                space = "CAR_DEALER";
                break;
            //新增车信贷流程
            case 'YNTRUST_APPLY_FLOW':
                space = "LOAN";
                break;
            //新增微车贷流程
            case 'WEBANK_APPLY_FLOW':
                space = "LOAN";
                break;
            default:
                space = ""
        }
        space = "&space=" + space + "&releventFlowNode=" + item.operatorNodeKey + "&releventFlow=" + item.businessTypeCode;
        switch (a) {
            case "LOAN_APPLY_FLOW":
                return comn.addTab({
                    title: '贷款流程',
                    href: "./Modal/customManage/customer/loanDetail.html?id=" + item.loanProjectId + "&currentNodeKey="+ item.currentNodeKey +"&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode + "&projectId=" + item.loanProjectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY" + "&loanFlag=1&type=taskDoneLoan"
                }); //贷款流程
                break;
            case "CREDIT_FLOW":
                return comn.addTab({
                    title: '征信流程',
                    href: path_3 + "creditInfo.html?type=1&businessId=" + item.businessId + space
                }); //征信流程
                break;
            case "LOAN_MODIFY_FLOW":
                return comn.addTab({
                    title: '贷款修改',
                    href: './Modal/loanManage/loanModify/' + "officeReadonly.html?" + search + "&projectId=" + item.loanProjectId + "&flow=modify-task" + space
                }); //贷款修改
                break;
            case "LOAN_CANCEL_FLOW":
                return comn.addTab({
                    title: '贷款作废',
                    href: './Modal/loanManage/loanCancel/' + "office.html?" + search + "&flow=cancel-task" + "&space=LOAN&readonly=true" + space
                }); //贷款作废
                break;
            case "SECOND_HAND_CAR_ESTIMATE_FLOW":
                return comn.addTab({
                    title: '二手车评估流程',
                    href: "./Modal/secondHandCar/common/index.html?status=done&type=5&hi=2&id=" + item['businessId'] + "&releventFlow=" + item['businessTypeCode'] + "&currentSecondCar=currentSecondCar&releventFlowNode=" + item['currentNodeKey'] + space + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode
                }); //二手车评估流程
                break;
            case "SECOND_HAND_CAR_TRANSFER_FLOW":
                return comn.addTab({
                    title: '发起二手车过户流程',
                    href: "./Modal/secondHandCar/common/index.html?status=done&type=7&hi=2&id=" + item['businessId'] + space + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode
                }); //发起二手车过户流程
                break;
            case "CAR_DEALER_ADD_FLOW":
                return comn.addTab({
                    title: '车商管理',
                    href: "./Modal/carDealerManage/carDealer/carDealer.html?dealerId=" + item['businessId'] + "&type=2&isManager=" + false + space + "&itemFlow=show&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode

                });
                break;
            //文档传递
            case "DOCUMENT_TRANSMIT_FLOW":
                if (item.currentNodeKey == "TRANSMIT_LAUNCH") {
                    comn.addTab({
                        title: "文档传递流程",
                        href: "./Modal/documentManagement/documentDelivery/documentDelivery.html?documentDeliveryType=1&businessId=" + item['businessId'] + space
                    });
                } else if (item.currentNodeKey == "DOCUMENT_VERIFY") {
                    documentFun(item['businessId'], item['businessObjectProcessInfoId'], 4, 2, "文档传递流程", "", item['operatorNodeKey'], "", 1);
                } else if (item.currentNodeKey == "COPY_CONTRACT") {
                    documentFun(item['businessId'], item['businessObjectProcessInfoId'], 4, 2, "文档传递流程", "", item['operatorNodeKey'], "", 1);
                } else if (item.currentNodeKey == "DOCUMENT_REVIEW") {
                    documentFun(item['businessId'], item['businessObjectProcessInfoId'], 4, 2, "文档传递流程", "", item['operatorNodeKey'], "", 1);
                } else if (item.currentNodeKey == "DOCUMENT_CLASSIFY") {
                    documentFun(item['businessId'], item['businessObjectProcessInfoId'], 4, 2, "文档传递流程", "", item['operatorNodeKey'], "", 1);
                } else {
                    documentFun(item['businessId'], item['businessObjectProcessInfoId'], 4, 2, "文档传递流程", "", item['operatorNodeKey'], "", 1);
                }
                break;
            // 	保险分发发起
            case "INSURANCE_DISPATCHN_FLOW":
                console.log(item.currentNodeName);
                return comn.addTab({
                    title: "保险分发流程",
                    href: "./Modal/distributionInsuranceCo/distributionInsuranceCoList/distributionInsuranceInfo.html?projectId=" + (item.businessId || "") + "&bopInfoId=" + item.businessObjectProcessInfoId + "&projectNo=" + item.businessNum + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode + "&space=INSURANCE_DISTRIBUTION" + "&releventFlowNode=INSURANCE_DISPATCHN_LAUNCH" + "&releventFlow=INSURANCE_DISPATCHN_FLOW&view=detail"
                });
                break;
            //GPS
            case "GPS_APPLY_FLOW":
                return comn.addTab({
                    title: "GPS申请",
                    href: "./Modal/stockManage/GPSBatchApply/approveGPS.html?" + search + space + "&gpsApplyId=" + item.businessId + "&readonly=true"
                });
                break;
            //车主贷申请流程
            case "INSTANT_APPLY_FLOW":
                return comn.addTab({
                    title: '车主贷申请流程',
                    href: "./Modal/businessReview/ownersStaging/ownersStaging.html?" + search + space + "&readonly=true&type=ownersStaging&projectId=" + (item.loanProjectId || item.businessId || "")
                });
                break;
            //低费率特批-金融部
            case "LOWFEE_APPROVE_FLOW":
                return comn.addTab(
                    lowFeeFun(item['businessId'], item['businessObjectProcessInfoId'], item.currentNodeName, item.customerId, item.currentNodeKey, item.operatorNodeKey, "readonly")
                );
                break;
            case "CONTRACT_APPLY_BRANCH_FLOW":
                var viewType;
                if (item.operatorNodeKey == 'CONTRACT_APPLY_LAUNCH_BRANCH') {
                    viewType = 1;
                } else if (item.operatorNodeKey == 'CONTRACT_APPLY_GROUP_BRANCH') {
                    viewType = 2;
                } else if (item.operatorNodeKey == "CONTRACT_APPLY_BANK_BRANCH") {
                    viewType = 3;
                }
                return comn.addTab({
                    title: '空白合同申请流程',
                    href: "./Modal/blankContract/flowApproval/index.html?modify=false&viewType=" + viewType + "&contractApplyId=" + item.businessId + space + "&bopInfoId=" + item.businessObjectProcessInfoId + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode + "&businessGroupId=" + item.businessGroupId + "&currentNodeKey=" + item.currentNodeKey + "&customerId=" + item.customerId + "&currentNodeName=" + item.currentNodeName + "&projectId=" + (item.loanProjectId || item.businessId || "")
                });
                break;
            //车信贷流程-已办事项-查看详情
            case "YNTRUST_APPLY_FLOW":
                return comn.addTab({
                    title: '车信贷流程',
                    href: "./Modal/customManage/customer/loanDetail.html?id=" + item.loanProjectId + "&currentNodeKey="+ item.currentNodeKey +"&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode + "&projectId=" + item.loanProjectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY" + "&loanFlag=1&type=taskDoneLoan"
                });
                break;
            //微车贷流程-已办事项-查看详情
            case "WEBANK_APPLY_FLOW":
                return comn.addTab({
                    title: '微车贷流程',
                    href: "./Modal/customManage/customer/loanDetail.html?id=" + item.loanProjectId + "&currentNodeKey="+ item.currentNodeKey +"&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode + "&projectId=" + item.loanProjectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY" + "&loanFlag=1&type=taskDoneLoan"
                });
                break;

        }
       
        if (flowName.indexOf(item.businessTypeCode) > -1) {
            return tip({content: "该业务电脑端暂不支持，请使用手机APP处理！"});
        }
    }
};


handle_1 = function (value, row, index) {
    return ["<a class='taskType' href='javascript:;'>" + row.currentNodeName + "</a>"].join("");
};

handle_2 = function (value, row, index) {
    return ["<a class='info' href='javascript:;'>查看详情</a>"].join("");
};

handle_3 = function (value, row, index) {
    if (value == "" || value == null) {
        return "流程结束";
    } else {
        return value;
    }
};

handle_4 = function (value, row, index) {
    if (value == "" || value == null) {
        return "--";
    } else {
        return value;
    }
};


$("#org").getOrg();
if (_flowName){
    $("#ftCode").flowGet(_flowName).change();
} else {
    $("#ftCode").flowGet();
}
$(document).on("change", "#ftCode", function () {
    var flowValue = $(this).find("option:selected").val();
    $("#flowNode").getFlowNode(flowValue || args["flowNode"]);
    return;
});
//资金划拨环节
function batch(loanApplyIds, orgIds, orgName) {
    comn.ajax({
        url: interUrl.myTask.querySumAmountForBach,
        data: {
            loanApplyIds: loanApplyIds
        },
        success: function (res) {
            $("#batchApprovalTip").modal("show");
            $("#nextNodeUserId").getNextNodeId(loanApplyIds).change();
            //$("#amountSum").val(res.data.amountSum);
            $("#currentDate").val(res.data.currentDate);
            $("#orgNames").val(orgName);
            $("#batchApproval_save").unbind("click").click(function () {
                $("#batchApprovalForm").validate();
                if ($("#batchApprovalForm").valid() == true) {
                    comn.ajax({
                        url: interUrl.myTask.submit2nextForBach,
                        data: $.extend($("#batchApprovalForm").values(), {loanApplyIds: loanApplyIds}),
                        success: function (res) {
                            $("#batchApprovalTip").modal("hide");
                            $("#table1").bootstrapTable('refresh');
                            if (res.code === 10000) {
                                tip({content: res.message})
                            }
                        }
                    })
                }
            })
        }
    })
}

//下一节点
$(document).on("change", "#nextNodeUserId", function () {
    $("#nextNodeUserName").val($(this).find("option:selected").html());
})
//付款审批环节
var nextNodeUserIdSting, nextNodeUserNameString;

function payment(loanApplyIds) {
    $("#paymentTip").modal("show");
    //此处与资金划拨调用同一接口，顾也许提交下一提交人id和name，因为这2参数必传，后端-贤福达成协议；
    $("#forPayHide").getNextNodeId(loanApplyIds, '', function (a, b) {
        nextNodeUserIdSting = a;
        nextNodeUserNameString = b;
    });
    //资金部账户
    table_pay3 = function (params) {
        var p = params.data;
        return comn.ajax({
            url: interUrl.myTask.getCapatilPoolAccountList,
            data: p,
            success: function (res) {
                params.success({
                    'total': res.totalItem,
                    rows: res.data
                });
                if (res.data.length == 1) {
                    var item = res.data[0];
                    $("[name='capitalPoolAccountName']").val(item.accountName);
                    $("[name='capitalPoolAccountNo']").val(item.cardNumber);
                    $("[name='capitalPoolBank']").val(item.subBankName);
                }
                return params.complete();


            }
        });
    };
    tableEvent_pay3 = {
        "click .pay": function (e, a, item, index) {
            $("[name='capitalPoolAccountName']").val(item.accountName);
            $("[name='capitalPoolAccountNo']").val(item.cardNumber);
            $("[name='capitalPoolBank']").val(item.subBankName);
            $("#payModal3").modal("hide");
        }
    };
    handle_pay3 = function (value, row, index) {
        return ["<a class='pay' href='javascript:;'>选择</a>"].join("");
    };
    $("#table_pay3").bootstrapTable("refresh");
    comn.ajax({
        // url: interUrl.myTask.getCapatilPoolAccountList,
        url: interUrl.myTask.queryApproveInfoForBatch,
        data: {
            loanApplyIds: loanApplyIds
        },
        success: function (res) {

            $("[name='capitalPoolAccountName']").val(res.data.capitalPoolAccountName);
            $("[name='capitalPoolAccountNo']").val(res.data.capitalPoolAccountNo);
            $("[name='capitalPoolBank']").val(res.data.capitalPoolBank);
        }

    })
    $("#payment_save").unbind("click").on("click", function () {
	    if ($("#orgId").val() == 2) {
		    let loanApplyIdsArr = [] ;
		    $.map($("#table1").bootstrapTable('getAllSelections'), function (row) {
			    loanApplyIdsArr.push(row.businessId);
		    });
		    $("#forPayHide").getNextNodeId(loanApplyIdsArr.join(','), '', function (a1, b1) {
			    comn.ajax({
				    // url: interUrl.myTask.getCapatilPoolAccountList,
				    url: interUrl.myTask.submit2nextForBatch,
				    data: {
					    loanApplyIds: loanApplyIdsArr.join(','),
					    nextNodeUserId: a1,
					    nextNodeUserName: b1
				    },
				    success: function (res) {
					    $("#paymentTip").modal("hide");
					    $("#table1").bootstrapTable("refresh", {url: "..."});
					    if (res.code == 10000) {
						    tip({
							    content: JSON.parse(res.message).join('，')
						    })
					    }
				    }

			    })
		    });

		    return
	    }
	    if($("#orgId").val() == 1 || $("#orgId").val() == 3){
	        comn.ajax({
	            url: interUrl.myTask.submit2nextForBach,
	            data: {
	                loanApplyIds: loanApplyIds,
	                accountName: $("[name='capitalPoolAccountName']").val(),
	                capitalPoolAccountNo: $("[name='capitalPoolAccountNo']").val(),
	                capitalPoolBank: $("[name='capitalPoolBank']").val(),
                    financeChannel: $("#orgId").val(),
	                nextNodeUserId: nextNodeUserIdSting,
	                nextNodeUserName: nextNodeUserNameString
	            },
	            success: function (res) {
	                $("#paymentTip").modal("hide");
	                $("#table1").bootstrapTable("refresh", {url: "..."});
	                if (res.code == 10000) {
	                    tip({
	                        content: res.message
	                    })
	                }
	            }
	        })
		    return
	    }
	    tip({content:'请选择资金通道'})
    })

}

//选择资金部收款人
$("#accountSelect3").click(function () {
    $("#payModal3").modal("show");
});
// $("#payModal3").on("shown.bs.modal", function () {
//
//     $("#table_pay3").bootstrapTable("refresh");
// });

/*
 checks = function(value, row, index) {
 if (row.operatorNodeKey == 'LOAN_GROUP_CASHIER') {
 return '<input type="checkbox" class="ckBoxS" data-id = "'+ row.businessId+'" data-orgName = "'+ row.launchOrganizationName+'">';
 } else {
 return '<input type="checkbox" disabled>'
 }
 }
 //是否全选
 $(document).on("change", ".checkboxS", function(){
 var _this = $(this);
 if(_this.prop("checked") === true) {
 $(".ckBoxS").prop("checked", true);
 $("#batchApproval").prop("disabled", false);
 } else {
 $(".ckBoxS").prop("checked", false);
 $("#batchApproval").prop("disabled", true);
 }
 })
 //是否单选
 $(document).on("change", ".ckBoxS", function(){
 var _this = $(this);
 if(_this.prop("checked") === false) {
 $(".checkboxS").prop("checked", false);
 } else {
 $("#batchApproval").prop("disabled", false)
 }
 if ($(".ckBoxS:checked").length === 0) $("#batchApproval").prop("disabled", true);
 })*/
function isFlag(objects) {
    var testValue = objects[0];
    var testBolean;
    for (var i = 0; i < objects.length; i += 1) {
        if (testValue !== objects[i]) {
            testBolean = false;
            return testBolean;
        } else {
            testBolean = true;
        }
        // testValue === objects[i] ? testBolean = true : testBolean = false;
    }
    return testBolean;
}

var tipContent;
var nodeArr = ["LOAN_GROUP_CASHIER", "LOAN_FUND_DIRECTOR", "LOAN_FUND_DIRECTOR_7_24", "LOAN_GROUP_CASHIER_7_24"];
$(document).on("change", "#flowNode", function () {
    $("#batchApproval").addClass("hide");
})
//批量审批
$("#batchApproval").click(function () {
    var batchApproval = {
        arrIds: [],
        orgIds: [],
        orgNames: []
    }
    $.map($("#table1").bootstrapTable('getAllSelections'), function (row) {
        batchApproval.arrIds.push(row.businessId);
        batchApproval.orgIds.push(row.launchOrganizationId);
        batchApproval.orgNames.push(row.launchOrganizationName)
    });
    var _loanApplyIds = batchApproval.arrIds.toString();
    if (batchApproval.arrIds.length === 0) {
        tip({content: tipContent})
	    return
    } else {
        var batchApplyFlag = isFlag(batchApproval.orgIds);
        if (batchApplyFlag) {
            if (tipContent == "请选择需要资金划拨条目") {
                batch(_loanApplyIds, batchApproval.orgIds, batchApproval.orgNames[0]);
            } else {
	            // 调用接口,查看是否命中黑名单
	            comn.ajax({
		            // url: interUrl.myTask.getCapatilPoolAccountList,
		            url: interUrl.myTask.dealerBlackListValid,
		            data: {
			            loanApplyIds: batchApproval.arrIds.join(',')
		            },
		            success: function (res) {
		            	console.log(res)
			            if(res.code == 10000){
				            payment(_loanApplyIds);
			            }else{
				            tip({content: res.message})
			            }
		            },
		            error:function (res) {
			            console.log(res)
		            }

	            })
            }
        } else {
            tip({content: '请选择同一机构'})
        }
    }
	// 调用接口 校验该分公司是否可选广金金服
	comn.ajax({
		// url: interUrl.myTask.getCapatilPoolAccountList,
		url: interUrl.common.getCompanyFinanceChannel,
		data: {
			orgId: batchApproval.orgIds[0],
            loanApplyIds: _loanApplyIds
		},
		success: function (res) {
			$("#orgId").html("<option value=''>--请选择--</option>" + ((function () {
					var j, len, ref, results;
					ref = res.data;
					results = [];
					for (j = 0, len = ref.length; j < len; j++) {
						o = ref[j];
						results.push("<option value='" + o.code + "'>" + o.name + "</option>");
					}
					return results;
				})()).join(""));
		}

	})
});
// 选择到广金金服的时候调用接口
$(document).on("change", "#orgId", function () {
	console.log($("#orgId").val())
	var batchApproval = {
		arrIds: [],
		orgIds: [],
		orgNames: []
	}
	$.map($("#table1").bootstrapTable('getAllSelections'), function (row) {
		batchApproval.arrIds.push(row.businessId);
		batchApproval.orgIds.push(row.launchOrganizationId);
		batchApproval.orgNames.push(row.launchOrganizationName)
	});
	console.log()
	return
	if ($("#orgId").val() == 2) {
		comn.ajax({
			// url: interUrl.myTask.getCapatilPoolAccountList,
			url: interUrl.myTask.dealerBlackListValid,
			data: {
				orgId: batchApproval.arrIds.join(',')
			},
			success: function (res) {
				console.log(res)
			}

		})
	}
});

//资料接受批量提交
$("#batchSubmit").click(function(){
    var batchSubmit = {
        arrIds: [],
        orgIds: []
    };
    $.map($("#table1").bootstrapTable('getAllSelections'), function (row) {
        batchSubmit.arrIds.push(row.businessId);
        batchSubmit.orgIds.push(row.launchOrganizationId);
    });
    if (batchSubmit.arrIds.length === 0) {
        tip({content: "请选择批量提交的数据！"})
    } else {
        var _deliverIds = batchSubmit.arrIds.toString();
        var batchApplyFlag = isFlag(batchSubmit.orgIds);
        if (batchApplyFlag) {
            comn.ajax({
                url: interUrl.myTask.deliverSubmit,
                data: {
                    deliverIds: _deliverIds,
                    nextNodeUserId: comn.user.uid,
                    nextNodeUserName: comn.user.username
                },
                success: function(res) {
                    tip({content: "批量提交成功，流程结束！"});
                    $("#table1").bootstrapTable('refresh');
                }
            })
        } else {
            tip({content: '请选择同一机构'});
        }
    }
});

$("#btn-search").click(function () {
    var flowNodeVal = $("#flowNode").val();
    if ($.inArray(flowNodeVal, nodeArr) > -1) {
        $("#batchApproval").removeClass("hide");
    } else {
        $("#batchApproval").addClass("hide");
    }
    tipContent = (($("#flowNode").val() === "LOAN_GROUP_CASHIER") || ($("#flowNode").val() === "LOAN_GROUP_CASHIER_7_24")) ? "请选择需要资金划拨条目" : "请选择要付款审批的条目";
    var activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
    if (activeTab == "todo") {
        $("#table1").bootstrapTable("refresh", {url: "..."});
    } else if (activeTab == "done") {
        $("#table2").bootstrapTable("refresh", {url: "..."});
    }
    //文档传递-资料接受可批量提交
    $("#flowNode").val() === "DOCUMENT_CLASSIFY" ? $("#batchSubmit").removeClass("hide") : $("#batchSubmit").addClass("hide");
});

documentFun = function (businessId, bopInfoId, documentFlowType, documentDeliveryType, currentNodeName, customerId, currentNodeKey, operatorNodeKey, yiban) {
    comn.ajax({
        url: interUrl.documentManagement.deliverGet,
        data: {
            id: businessId
        },
        success: function (res) {
            //文档传递-资料审核-影像管理-发票可修改invoiceVertifyFlag参数判断
            if(currentNodeKey === 'DOCUMENT_VERIFY'){
                var url = ["./Modal/documentManagement/documentDelivery/documentDeliveryInfo.html?",
                    "businessId=" + businessId,
                    //"&id=" + res.data.projectId,
                    "&loanApplyId=" + res.data.loanApplyId,
                    "&customerId=" + customerId,
                    "&bopInfoId=" + bopInfoId,
                    "&projectId=" + res.data.projectId,
                    "&documentDeliveryType=" + documentDeliveryType,
                    "&businessTypeCode=DOCUMENT_TRANSMIT_FLOW",
                    "&documentFlowType=" + documentFlowType,
                    "&space=LOAN",
                    "&releventFlowNode=" + currentNodeKey,
                    "&releventFlow=DOCUMENT_TRANSMIT_FLOW",
                    "&currentNodeKey=" + currentNodeKey,
                    "&operatorNodeKey=" + operatorNodeKey,
                    "&yiban=" + (yiban || "0"),
                    //invoiceVertifyFlag 发票识别是否能修改
                    "&invoiceVertifyFlag=1"
                ].join("")
            }else{
                var url = ["./Modal/documentManagement/documentDelivery/documentDeliveryInfo.html?",
                    "businessId=" + businessId,
                    //"&id=" + res.data.projectId,
                    "&loanApplyId=" + res.data.loanApplyId,
                    "&customerId=" + customerId,
                    "&bopInfoId=" + bopInfoId,
                    "&projectId=" + res.data.projectId,
                    "&documentDeliveryType=" + documentDeliveryType,
                    "&businessTypeCode=DOCUMENT_TRANSMIT_FLOW",
                    "&documentFlowType=" + documentFlowType,
                    "&space=LOAN",
                    "&releventFlowNode=" + currentNodeKey,
                    "&releventFlow=DOCUMENT_TRANSMIT_FLOW",
                    "&currentNodeKey=" + currentNodeKey,
                    "&operatorNodeKey=" + operatorNodeKey,
                    "&yiban=" + (yiban || "0")
                ].join("")
            }
            comn.addTab({
                title: currentNodeName,
                href: url
            });
        }
    });
};
lowFeeFun = function (businessId, bopInfoId, currentNodeName, customerId, currentNodeKey, operatorNodeKey, type) {
    comn.ajax({
        url: interUrl.lowFee.get,
        data: {
            id: businessId
        },
        success: function (res) {
            comn.addTab({
                title: currentNodeName == null ? '低费率特批' : currentNodeName,
                href: ["./Modal/lowFee/lowFeeApprove/index.html?",
                    "businessId=" + businessId,
                    "&loanApplyId=" + res.data.loanApplyId,
                    "&customerId=" + customerId,
                    "&approveFee=" + res.data.handingFee,
                    "&bopInfoId=" + bopInfoId,
                    "&projectId=" + res.data.projectId,
                    "&businessTypeCode=LOWFEE_APPROVE_FLOW",
                    "&space=LOAN",
                    "&releventFlowNode=" + (currentNodeKey ? currentNodeKey : 'LOWFEE_QUERY'),
                    "&releventFlow=LOWFEE_APPROVE_FLOW",
                    "&currentNodeKey=" + currentNodeKey,
                    "&operatorNodeKey=" + operatorNodeKey,
                    type ? "&readonly=true" : ""
                ].join("")
            });
        }
    });
};
