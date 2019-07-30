var table_1, table_2;

table_1 = function (params) {
    console.log($("#taskForm").values())
    var p = params.data;
    p['isProcessed'] = false;
    return comn.ajax({
        url: interUrl.myTask.searchTaskList,
        data: $.extend($("#taskForm").values(), p),
        success: function (res) {
            if (res && res.totalItem) {
                $(".tip_num").css("padding","0 3px");
            }
            window.parent.document.getElementById("tipNumElm").innerHTML = res.totalItem;
            params.success({
                'total': res.totalItem,
                 rows: res.data
            });
            return params.complete();
        }
    });
};

table_2 = function (params) {
    var p = params.data;
    p['isProcessed'] = true;
    return comn.ajax({
        url: interUrl.myTask.searchTaskList,
        data: $.extend($("#taskForm").values(), p),
        success: function (res) {
            console.log(res)
            params.success({
                'total': res.totalItem,
                 rows: res.data
            });
            return params.complete();
        }
    });
};

var handle_1, handle_2, tableEvent_1, tableEvent_2, handle_3, handle_4;

tableEvent_1 = {
    "click .taskType": function (e, a, item, index) {
        //currentNodeKey 节点编码
        var path = "./Modal/task/myTask/";
        var path_2 = "./Modal/loanManage/loanReview/";
        var path_3 = "./Modal/loanManage/creditManage/";
        var path_4 = "./Modal/customManage/cheguoCustomer/";
        var path_5 = "./Modal/loanManage/loanCancel/";
        var path_6 = "./Modal/loanManage/loanModify/";
        var path_7 = "./Modal/complaints/complainRegister/complainRegister.html";
        var search = "bopInfoId=" + item.businessObjectProcessInfoId + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode + "&businessGroupId=" + item.businessGroupId + "&currentNodeKey=" + item.currentNodeKey+"&customerId=" + item.customerId+"&currentNodeName="+item.currentNodeName+"&projectId=" + (item.loanProjectId || "");
        comn.ajax({
            url:interUrl.myTask.myTasksRead,
            data:{bopId:item.businessObjectProcessInfoId},
            success:function(res){
				//文档详情参数整理
				var space = "";
				switch (item.businessTypeCode) {
					case 'LAWSUIT_CANCEL_FLOW':
					case 'LAWSUIT_APPLY_FLOW':
					case 'LOAN_MODIFY_FLOW':
					case 'LOAN_APPLY_FLOW':
					case 'LOAN_CANCEL_FLOW': space = "LOAN"; break;
					case 'SECOND_HAND_CAR_ESTIMATE_FLOW':
					case 'SECOND_HAND_CAR_TRANSFER_FLOW': space = "SECONDHAND_CAR"; break;
					case 'DOCUMENT_TRANSMIT_FLOW': space = "DELIVER"; break;
					case 'CAR_DEALER_ADD_FLOW': space = "CAR_DEALER"; break;
					default: space = ""
				}
				space = "&space=" + space + "&releventFlowNode=" + item.currentNodeKey + "&releventFlow=" + item.businessTypeCode;
                switch (a) {
                    case "LAUNCH_FEE_RECYCLE":
                        return comn.addTab({
                            title: '费用回收发起',
                            href: "./Modal/finaceManage/collectionRegistration/collectionInfo.html?type=approve&feeType=tip&feeId=" + item['businessId']+"&customerId="+item['customerId']+"&loanApplyId="+item['businessId']+"&bopInfoId="+item['businessObjectProcessInfoId']+"&businessTypeCode="+item['businessTypeCode'] + space
                        }); //费用回收发起
                        break;
                    case "REVIEW_FEE_RECYCLE":
                        return comn.addTab({
                            title: '收款确认（分公司）',
                            href: "./Modal/finaceManage/collectionRegistration/collectionInfo.html?type=show&feeId=" + item['businessId']+"&customerId="+item['customerId']+"&loanApplyId="+item['businessId']+"&businessTypeCode="+item['businessTypeCode']+"&bopInfoId="+item['businessObjectProcessInfoId'] + space
                        }); //收款确认（分公司）
                        break;
                    case "CONFIRM_INCOME":
                        return comn.addTab({
                            title: '收款确认（集团）',
                            href: "./Modal/finaceManage/collectionRegistration/collectionInfo.html?type=show&feeId=" + item['businessId']+"&customerId="+item['customerId']+"&loanApplyId="+item['businessId']+"&businessTypeCode="+item['businessTypeCode']+"&bopInfoId="+item['businessObjectProcessInfoId'] + space
                        }); //收款确认（集团）
                        break;
                	case "LAUNCH_FEE_APPLY":
		                return comn.addTab({
							title: '费用申请发起',
		                    href: "./Modal/finaceManage/costLaunch/costInfo.html?type=approve&feeType=tip&feeId=" + item['businessId']+"&loanApplyId="+item['businessId']+"&customerId="+item['customerId']+"&bopInfoId="+item['businessObjectProcessInfoId'] + space
		                }); //费用申请发起
		                break;
                	case "PAYMENT":
		                return comn.addTab({
							title: '付款',
		                    href: "./Modal/finaceManage/costLaunch/costInfo.html?type=show&feeId=" + item['businessId']+"&loanApplyId="+item['businessId']+"&customerId="+item['customerId']+"&businessTypeCode="+item['businessTypeCode']+"&bopInfoId="+item['businessObjectProcessInfoId'] + space
		                }); // 费用申请发起
		                break;
                	case "FEE_APPLY_GROUP_RISK_APPROVAL":
		                return comn.addTab({
							title: '集团风险总监审批',
		                    href: "./Modal/finaceManage/costLaunch/costInfo.html?type=show&feeId=" + item['businessId']+"&loanApplyId="+item['businessId']+"&customerId="+item['customerId']+"&businessTypeCode="+item['businessTypeCode']+"&bopInfoId="+item['businessObjectProcessInfoId'] + space
		                }); //费用申请发起
		                break;
                	case "FEE_APPLY_BRANCH_MANAGER_APPROVAL":
		                return comn.addTab({
							title: '分公司经理审批',
		                    href: "./Modal/finaceManage/costLaunch/costInfo.html?type=show&feeId=" + item['businessId']+"&loanApplyId="+item['businessId']+"&customerId="+item['customerId']+"&businessTypeCode="+item['businessTypeCode']+"&bopInfoId="+item['businessObjectProcessInfoId'] + space
		                }); //费用申请发起
		                break;
                	case "FEE_APPLY_PROVINCE_RISK_APPROVAL":
		                return comn.addTab({
							title: '风险部经理审批',
		                    href: "./Modal/finaceManage/costLaunch/costInfo.html?type=show&feeId=" + item['businessId']+"&loanApplyId="+item['businessId']+"&customerId="+item['customerId']+"&businessTypeCode="+item['businessTypeCode']+"&bopInfoId="+item['businessObjectProcessInfoId'] + space
		                }); //费用申请发起
		                break;
                    case "LAUNCH_FRONT_CAPITAL_APPLY":
                        return comn.addTab({
                            title: '垫款费用申请发起',
                            href: "./Modal/finaceManage/advanceFeeLaunch/advanceFeeApply.html?feeType=tip&feeId=" + item['businessId']+"&customerId="+item['customerId']+"&currentNodeName=垫款费用申请发起&loanApplyId="+item['businessId']+"&businessTypeCode="+item['businessTypeCode']+"&bopInfoId="+item['businessObjectProcessInfoId'] + "&currentNodeKey="+item.currentNodeKey +"&typeOption=submit&type=approve"
                        }); //垫款费用申请发起
                        break;
                    case "FRONT_CAPITAL_APPLY_PROVINCE_RISK_APPROVAL":
                        return comn.addTab({
                            title: '分公司风险经理',
                            href: "./Modal/finaceManage/advanceFeeLaunch/advanceFeeApply.html?type=option&feeId=" + item['businessId']+"&customerId="+item['customerId']+"&currentNodeName=分公司风险经理&loanApplyId="+item['businessId']+"&businessTypeCode="+item['businessTypeCode']+"&bopInfoId="+item['businessObjectProcessInfoId'] + "&currentNodeKey="+item.currentNodeKey
                        }); //分公司风险经理
                        break;
                    case "FRONT_CAPITAL_APPLY_BRANCH_MANAGER_APPROVAL":
                        return comn.addTab({
                            title: '分公司总经理',
                            href: "./Modal/finaceManage/advanceFeeLaunch/advanceFeeApply.html?type=option&feeId=" + item['businessId']+"&customerId="+item['customerId']+"&currentNodeName=分公司总经理&loanApplyId="+item['businessId']+"&businessTypeCode="+item['businessTypeCode']+"&bopInfoId="+item['businessObjectProcessInfoId'] + "&currentNodeKey="+item.currentNodeKey
                        }); //分公司总经理
                        break;
                    case "FRONT_CAPITAL_APPLY_GROUP_RISK_MANAGE":
                        return comn.addTab({
                            title: '集团风险经办',
                            href: "./Modal/finaceManage/advanceFeeLaunch/advanceFeeApply.html?type=option&feeId=" + item['businessId']+"&customerId="+item['customerId']+"&currentNodeName=集团风险经办&loanApplyId="+item['businessId']+"&businessTypeCode="+item['businessTypeCode']+"&bopInfoId="+item['businessObjectProcessInfoId'] + "&currentNodeKey="+item.currentNodeKey
                        }); //集团风险经办
                        break;
                    case "FRONT_CAPITAL_APPLY_GROUP_RISK_REVIEW":
                        return comn.addTab({
                            title: '集团风险复核',
                            href: "./Modal/finaceManage/advanceFeeLaunch/advanceFeeApply.html?type=option&feeId=" + item['businessId']+"&customerId="+item['customerId']+"&currentNodeName=集团风险复核&loanApplyId="+item['businessId']+"&businessTypeCode="+item['businessTypeCode']+"&bopInfoId="+item['businessObjectProcessInfoId'] + "&currentNodeKey="+item.currentNodeKey
                        }); //集团风险复核
                        break;
                    case "FRONT_CAPITAL_APPLY_GROUP_RISK_APPROVAL":
                        return comn.addTab({
                            title: '集团风险审批',
                            href: "./Modal/finaceManage/advanceFeeLaunch/advanceFeeApply.html?type=option&feeId=" + item['businessId']+"&customerId="+item['customerId']+"&currentNodeName=集团风险审批&loanApplyId="+item['businessId']+"&businessTypeCode="+item['businessTypeCode']+"&bopInfoId="+item['businessObjectProcessInfoId'] + "&currentNodeKey="+item.currentNodeKey
                        }); //集团风险审批
                        break;
                    case "FRONT_CAPITAL_PAYMENT":
                        return comn.addTab({
                            title: '计划财务部付款',
                            href: "./Modal/finaceManage/advanceFeeLaunch/advanceFeeApply.html?type=option&feeId=" + item['businessId']+"&customerId="+item['customerId']+"&currentNodeName=计划财务部付款&loanApplyId="+item['businessId']+"&businessTypeCode="+item['businessTypeCode']+"&bopInfoId="+item['businessObjectProcessInfoId'] + "&currentNodeKey="+item.currentNodeKey
                        }); //计划财务部付款
                        break;
                	case "LAWSUIT_CANCEL_APPROVAL":
                		return comn.addTab({
							title: '撤诉申请审核',
		                    href: "./Modal/postLoanManage/litigationManage/withdrawingApplyPro.html?dealerId=" + item['businessId']+"&customerId="+item['customerId'] +"&type=1&bopInfoId=" + item['businessObjectProcessInfoId'] + "&typeOption=preBack&loanApplyId=" + item.businessId +"&businessTypeCode="+item['businessTypeCode']
		                }); //诉讼审批
		                break;
		            case "LAUNCH_CANCEL_LAWSUIT":
		            	return comn.addTab({
							title: '发起撤诉申请',
		                    href: "./Modal/postLoanManage/litigationManage/withdrawingApplyPro.html?dealerId=" + item['businessId']+"&customerId="+item['customerId'] +"&type=1&bopInfoId=" + item['businessObjectProcessInfoId'] + "&typeOption=submit&loanApplyId=" + item.businessId + "&businessTypeCode="+item['businessTypeCode']
		                }); //诉讼审批
		                break;

                	case "LAUNCH_LAWSUIT":
		                return comn.addTab({
							title: '发起诉讼申请',
		                    href: "./Modal/postLoanManage/litigationManage/courtApplyPro.html?dealerId=" + item['businessId']+"&customerId="+item['customerId'] +"&tableName=lawsuit_info&type=1&bopInfoId=" + item['businessObjectProcessInfoId'] + "&typeOption=submit&loanApplyId=" + item.businessId+"&businessTypeCode="+item['businessTypeCode']
		                }); //诉讼申请审核
		                break;
	                case "LAWSUIT_APPROVAL":
		                return comn.addTab({
							title: '起诉申请审核',
		                    href: "./Modal/postLoanManage/litigationManage/courtApplyPro.html?dealerId=" + item['businessId']+"&customerId="+item['customerId'] +"&tableName=lawsuit_info&type=1&bopInfoId=" + item['businessObjectProcessInfoId'] + "&typeOption=preBack&loanApplyId=" + item.businessId+"&businessTypeCode="+item['businessTypeCode']
		                }); //诉讼审批
		                break;
                    case "LAUNCH_CAR_CHECKOUT":
                        return comn.addTab({
                            title: '车辆出库申请',
                            href: "./Modal/postLoanManage/collateralManage/shippingApplyPro.html?dealerId=" + item['businessId']+"&customerId="+item['customerId'] +"&tableName=checkout_car_apply&loanApplyId=" + item['businessId'] + "&type=1&bopInfoId=" + item['businessObjectProcessInfoId'] + "&typeOption=submit&loanApplyId=" + item.businessId + "&businessTypeCode=" + item['businessTypeCode']
                        }); //出库申请流程
                        break;
                    case "CAR_CHECKOUT_APPROVAL":
                        return comn.addTab({
                            title: '车辆出库审批',
                            href: "./Modal/postLoanManage/collateralManage/shippingApplyPro.html?dealerId=" + item['businessId']+"&customerId="+item['customerId'] +"&tableName=checkout_car_apply&loanApplyId=" + item['businessId'] + "&type=2&bopInfoId=" + item['businessObjectProcessInfoId'] + "&typeOption=preBack&loanApplyId=" + item.businessId + "&businessTypeCode=" + item['businessTypeCode']
                        }); //出库审批流程
                        break;
                    case "LAUNCH_TOW_CAR":
                        return comn.addTab({
                            title: '拖车申请',
                            href: "./Modal/postLoanManage/trailerManage/trailerApplyPro.html?dealerId=" + item['businessId']+"&customerId="+item['customerId'] +"&tableName=drag_car_apply&loanApplyId=" + item['businessId'] + "&type=1&bopInfoId=" + item['businessObjectProcessInfoId'] + "&typeOption=submit&loanApplyId=" + item.businessId + "&businessTypeCode=" + item['businessTypeCode']
                        }); //拖车申请流程
                        break;
                    case "TOW_CAR_APPROVAL":
                        return comn.addTab({
                            title: '拖车申请审批',
                            href: "./Modal/postLoanManage/trailerManage/trailerApplyPro.html?dealerId=" + item['businessId']+"&customerId="+item['customerId'] +"&tableName=drag_car_apply&loanApplyId=" + item['businessId'] + "&type=2&bopInfoId=" + item['businessObjectProcessInfoId'] + "&typeOption=preBack&loanApplyId=" + item.businessId + "&businessTypeCode=" + item['businessTypeCode']
                        }); //拖车申请审批
                        break;
                    case "CREDIT_START":
                        return comn.addTab({
							title: item.currentNodeName,
                            href: path_4 + "credit.html?type=3&creditId=" + item.businessId + space
                        }); //征信开始
                        break;
                    case "CREDIT_ENTER":
                        return comn.addTab({
							title: item.currentNodeName,
                            href: path_3 + "creditInfo.html?type=2&customerId=" + item.customerId + "&businessId=" + item.businessId + space
                        }); //征信结果录入
                        break;
                    case "CREDIT_ACCEPT":
                        return comn.addTab({
							title: item.currentNodeName,
                            href: path_3 + "creditInfo.html?type=3&customerId=" + item.customerId + "&businessId=" + item.businessId + space
                        }); //征信接受
                        break;
                    case "LOAN_LAUNCH":
                        return comn.addTab({
							title: item.currentNodeName,
                            href: path_2 + "loanStart.html?type=0&loanApplyId=" + item.businessId + space
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
							title:item.currentNodeName,
                            href: path + "survery.html?" + search + "&sign=main" + space
                        }); //主签单员调查签单
                        break;
                    case "LOAN_VICE_BILL_RESEARCH":
                        return comn.addTab({
							title: item.currentNodeName,
                            href: path + "survery.html?" + search + "&sign=vice" + space
                        }); //副签单员调查签单
                        break;

                    case "LOAN_OFFICE_STAFF_BUDGET":
                        return comn.addTab({
							title: item.currentNodeName,
                            href: path + "office.html?" + search + space
                        }); //业务录入
                        break;
                    case "LOAN_REGIONAL_MANAGER":
                        return comn.addTab({
							title:item.currentNodeName,
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
                        }); //经营管理部-汽车金融部
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
                    case "LOAN_FINANCE_EXECUTIVE":
                        return comn.addTab({
							title: item.currentNodeName,
                            href: path + "financial.html?" + search + "&type=1" + space
                        }); //分公司财务主管
                        break;
                    case "LOAN_FUND_DIRECTOR":
                        return comn.addTab({
							title: item.currentNodeName,
                            href: path + "financial.html?" + search + "&type=2" + space
                        }); //资金管理部主任
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
                            href: path + "departmentCashier.html?" + search + space
                        }); //分公司出纳
                        break;
                    //以下是车商部分的流程节点
                    case "CAR_DEALER_LAUNCH":
                        return comn.addTab({
							title: item.currentNodeName,
                            href: "./Modal/carDealerManage/carDealer/carDealer.html?dealerId="+item['businessId']+"&type=4&isManager="+true + space+"&currentNodeName="+item.currentNodeName + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode
						});
						//发起新增车商
                        break;
                    case "CAR_DEALER_REGIONAL_MANAGER":
                        return comn.addTab({
							title: item.currentNodeName,
                            href: "./Modal/carDealerManage/carDealer/carDealer.html?dealerId=" + item['businessId'] + "&type=1&bopInfoId=" + item['businessObjectProcessInfoId'] + space+"&currentNodeName="+item.currentNodeName + "&isManager=true&bopInfoId=" + item['businessObjectProcessInfoId'] + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode
                        }); //车商区域经理审核
                        break;
                    case "CAR_DEALER_GENERAL_MANAGER":
                        return comn.addTab({
							title: item.currentNodeName,
                            href: "./Modal/carDealerManage/carDealer/flow.html?dealerId=" + item['businessId'] + "&type=2&bopInfoId=" + item['businessObjectProcessInfoId'] + space+"&currentNodeName="+item.currentNodeName + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode
                        }); //车商分公司总经理
                        break;
                    case "CAR_DEALER_ACCOUNTING_ASSISTANT":
                        return comn.addTab({
							title:item.currentNodeName,
                            href: "./Modal/carDealerManage/carDealer/flow.html?dealerId=" + item['businessId'] + "&type=3&bopInfoId=" + item['businessObjectProcessInfoId'] + "&currentNode=" + a + space+"&currentNodeName="+item.currentNodeName + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode
                        }); //车商分公司会计助理
                        break;
                    case "CAR_DEALER_CAR_FINANCE":
                        return comn.addTab({
							title:item.currentNodeName,
                            href: "./Modal/carDealerManage/carDealer/flow.html?dealerId=" + item['businessId'] + "&type=4&bopInfoId=" + item['businessObjectProcessInfoId'] + space+"&currentNodeName="+item.currentNodeName + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode
                        }); //车商汽车金融部
                        break;
                    case "CAR_DEALER_BRANCH_CASHIER":
                        return comn.addTab({
							title: item.currentNodeName,
                            href: "./Modal/carDealerManage/carDealer/flow.html?dealerId=" + item['businessId'] + "&type=5&bopInfoId=" + item['businessObjectProcessInfoId'] + space+"&currentNodeName="+item.currentNodeName + "&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode
                        }); //车商分公司出纳
                        break;
                    case "ESTIMATE_LAUNCH":
                        return comn.addTab({
							title: item.currentNodeName,
                            href: "./Modal/secondHandCar/common/index.html?type=1&id=" + item['businessId'] + space+"&currentNodeName="+item.currentNodeName
                        }); //二手车评估
                        break;
                    case "FIRST_ESTIMATE":
                        return comn.addTab({
							title: item.currentNodeName,
                            href: "./Modal/secondHandCar/common/index.html?type=4&id=" + item['businessId'] + "&id1=" + item['businessObjectProcessInfoId'] + "&releventFlow=" + item['businessTypeCode'] + "&releventFlowNode=" + item['currentNodeKey'] + space +"&currentNodeName="+item.currentNodeName
                        }); //二手车初评
                        break;
                    case "SECOND_ESTIMATE":
                        return comn.addTab({
							title: item.currentNodeName,
                            href: "./Modal/secondHandCar/common/index.html?type=5&id=" + item['businessId'] + "&releventFlow=" + item['businessTypeCode'] + "&releventFlowNode=" + item['currentNodeKey'] + space +"&currentNodeName="+item.currentNodeName
                        }); //二手车复评
                        break;
                    case "TRANSFER_LAUNCH":
                        return comn.addTab({
							title:item.currentNodeName,
                            href: "./Modal/secondHandCar/common/index.html?type=3&id=" + item['businessId'] + "&releventFlow=" + item['businessTypeCode'] + "&releventFlowNode=" + item['currentNodeKey'] + space +"&currentNodeName="+item.currentNodeName
                        }); //过户办理
                        break;
                    case "TRANSFER_APPROVAL":
                        return comn.addTab({
							title: item.currentNodeName,
                            href: "./Modal/secondHandCar/common/index.html?type=6&id=" + item['businessId'] + "&id1=" + item['businessObjectProcessInfoId'] + "&releventFlow=" + item['businessTypeCode'] + "&releventFlowNode=" + item['currentNodeKey'] + space
                        }); //过户审批
                        break;
                    case "TRANSFER_ESTIMATE_REPORT":
                        return comn.addTab({
							title: item.currentNodeName,
                            href: "./Modal/secondHandCar/common/index.html?type=7&id=" + item['businessId'] + "&id1=" + item['businessObjectProcessInfoId'] + "&releventFlow=" + item['businessTypeCode'] + "&releventFlowNode=" + item['currentNodeKey'] + space
                        }); //评估报告
                        break;
                    //贷款作废
                    //	LOAN_CANCEL_OFFICE_STAFF_BUDGET(1, "内勤录入", ""),
                    //		LOAN_CANCEL_REGIONAL_MANAGER(2, "区域经理", ""),
                    //		LOAN_CANCEL_APPROVE_OFFICE_STAFF(3, "审核内勤", ""),
                    //		LOAN_CANCEL_GENERAL_MANAGER(4, "分公司总经理", ""),
                    //		LOAN_CANCEL_FINANCE_EXECUTIVE(5, "分公司财务主管", ""),
                    //		LOAN_CANCEL_BRANCH_CASHIER(6, "出纳收款确认", ""),
                    //		LOAN_CANCEL_GROUP_CASHIER(7, "资金管理部出纳", "");
                    case "LOAN_CANCEL_OFFICE_STAFF_BUDGET":
                        return comn.addTab({
							title:item.currentNodeName,
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
							title:item.currentNodeName,
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
							title:item.currentNodeName,
                            href: path_5 + "financial.html?" + search + "&type=2" + space
                        }); //出纳收款确认
                        break;
                    case "LOAN_CANCEL_GROUP_CASHIER":
                        return comn.addTab({
							title: item.currentNodeName,
                            href: path_5 + "departmentCashier.html?" + search + space
                        }); //资金管理部出纳
                        break;
                    //贷款修改
                    //	LOAN_MODIFY_OFFICE_STAFF_BUDGET(1, "内勤录入", ""),
                    //	LOAN_MODIFY_REGIONAL_MANAGER(2, "区域经理", ""),
                    //	LOAN_MODIFY_APPROVE_OFFICE_STAFF(3, "审核内勤", ""),
                    //	LOAN_MODIFY_GENERAL_MANAGER(4, "分公司总经理", ""),
                    //	LOAN_MODIFY_CAR_FINANCE(5, "汽车金融部", ""),
                    //	LOAN_MODIFY_CAR_FINANCE_MANAGER(6, "汽车金融部经理", ""),
                    //	LOAN_MODIFY_CAR_FINANCE_MAJORDOMO(7, "汽车金融部总监", ""),
                    //	LOAN_MODIFY_GROUP_GENERAL_MANAGER(8, "集团总经理", ""),
                    //	LOAN_MODIFY_FINANCE_EXECUTIVE_1(9, "分公司财务主管", ""),
                    //	LOAN_MODIFY_BRANCH_CASHIER_1(10, "分公司出纳收款确认", ""),
                    //	LOAN_MODIFY_GROUP_CASHIER_1(11, "资金管理部出纳收款", ""),
                    //	LOAN_MODIFY_FINANCE_EXECUTIVE_2(12, "分公司财务主管付款申请", ""),
                    //	LOAN_MODIFY_FUND_DIRECTOR(13, "资金管理部主任审核", ""),
                    //	LOAN_MODIFY_GROUP_CASHIER_2(14, "资金管理部出纳放款", ""),
                    //	LOAN_MODIFY_BRANCH_CASHIER_2(15, "分公司出纳", "");
                    case "LOAN_MODIFY_OFFICE_STAFF_BUDGET":
                        return comn.addTab({
							title: item.currentNodeName,
                            href: path_6 + "office.html?" + search + "&flow=modify-task" + space
                        }); //内勤录入
                        break;
                    case "LOAN_MODIFY_REGIONAL_MANAGER":
                        return comn.addTab({
							title: item.currentNodeName,
                            href: path_6 + "areaManager.html?" + search + "&flow=modify&type=1" + space
                        }); //区域经理
                        break;
                    case "LOAN_MODIFY_APPROVE_OFFICE_STAFF":
                        return comn.addTab({
							title: item.currentNodeName,
                            href: path_6 + "areaManager.html?" + search + "&flow=modify&type=2" + space
                        }); //审核内勤
                        break;
                    case "LOAN_MODIFY_GENERAL_MANAGER":
                        return comn.addTab({
							title: item.currentNodeName,
                            href: path_6 + "areaManager.html?" + search + "&flow=modify&type=3" + space
                        }); //分公司总经理
                        break;
                    case "LOAN_MODIFY_CAR_FINANCE":
                        return comn.addTab({
							title:item.currentNodeName,
                            href: path_6 + "manageDepartment.html?" + search + "&flow=modify&type=1" + space
                        }); //汽车金融部
                        break;
                    case "LOAN_MODIFY_FINANCE_EXECUTIVE_1":
                        return comn.addTab({
							title:item.currentNodeName,
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
                    //文档传递
                    case "TRANSMIT_LAUNCH":
                        return comn.addTab({
							title: item.currentNodeName,
                            href: "./Modal/documentManagement/documentDelivery/documentDelivery.html?businessId="+item['businessId'] + space
                        }); //文档传递
                        break;
                    case "DOCUMENT_VERIFY":
                        documentFun(item['businessId'],item['businessObjectProcessInfoId'],1,1,item.currentNodeName);
                        break;
                    case "COPY_CONTRACT":
                    	documentFun(item['businessId'],item['businessObjectProcessInfoId'],2,1,item.currentNodeName);
                        break;
                    case "DOCUMENT_REVIEW":
                    	documentFun(item['businessId'],item['businessObjectProcessInfoId'],3,1,item.currentNodeName);
                        break;
                    case "DOCUMENT_CLASSIFY":
                    	documentFun(item['businessId'],item['businessObjectProcessInfoId'],4,1,item.currentNodeName);
                        break;
                    // 客户分配
                    case "CHEGUO_CUSTOMER_IMPORT":
                        return comn.addTab({
							title: item.currentNodeName,
                            href: "./Modal/customManage/branchCompany/info.html?type=2&id="+item['customerId'] + space
                        });
                        break;

                    //结清流程
                    case "LAUNCH_LOAN_CLEAR":  //"结清申请", "分公司内勤结清审请"),
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/SettlementRegistration/SettlementProcessing/SettlementProcessing.html?type=1&types="+item.currentNodeName +"&currentNodeCode="+ item.currentNodeKey +"&projectId="+item.businessId+"&LIU=1"+"&businessObjectProcessInfoId="+item.businessObjectProcessInfoId+"&businessId="+item.businessId+"&businessTypeCode="+item.businessTypeCode+"&loanApplyId="+ item.businessId+"&str=结清申请"+"&businessId="+item.businessId+"&settlementStyle=tip"
                        });
                    break;

                    case "BANK_OFFICE_CLEAR_HANDLE":    // "银行结清办理", "驻行内勤结清办理")
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/SettlementRegistration/SettlementProcessing/SettlementProcessing.html?type=2&types="+item.currentNodeName  +"&currentNodeCode="+ item.currentNodeKey +"&projectId="+item.businessId+"&LIU=1"+"&businessObjectProcessInfoId="+item.businessObjectProcessInfoId+"&yinhang=1"+"&businessTypeCode="+item.businessTypeCode+"&loanApplyId="+ item.businessId+"&loanApplyId="+ item.businessId+"&str=银行结清办理"+"&businessId="+item.businessId
                        });
                    break;

                    case "CONFIRM_LOAN_CLEAR": //结清确认", "分公司内勤结清确认")
                        /*console.log(item);
                        return;*/
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/SettlementRegistration/SettlementProcessing/SettlementProcessing.html?type=3&types="+item.currentNodeName +"&currentNodeCode="+ item.currentNodeKey +"&projectId="+item.businessId+"&LIU=1"+"&businessObjectProcessInfoId="+item.businessObjectProcessInfoId+"&businessTypeCode="+item.businessTypeCode+"&loanApplyId="+ item.businessId+"&loanApplyId="+ item.businessId+"&str=结清申请"+"&str=结清确认"+"&businessId="+item.businessId
                        });
                    break;

                    // --------履约保证金
                    /*1, "履约保证金清退申请", "续保人员履约保证金清退申请"*/
                    case "LAUNCH_BOND_CLEAR":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/ThePerformance/RepelProcessing/RepelProcessing.html?type=1&types="+item.currentNodeName+"&currentNode="+ item.currentNodeKey +"&depositId="+item.businessId+"&LIU=1"+"&businessObjectProcessInfoId="+item.businessObjectProcessInfoId+"&businessTypeCode="+item.businessTypeCode+"&loanApplyId="+ item.businessId+"&loanApplyId="+ item.businessId+"&renwu=1"+"&projectId="+item.businessId+"&businessId="+item.businessId
                        });
                    break;
                    /*2, "费用审批", "会计助理费用审批"*/
                    case "ACCOUNTING_ASSISTANT_FEE_APPROVAL":

                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/ThePerformance/RepelProcessing/RepelProcessing.html?type=2&types="+item.currentNodeName+"&currentNode="+ item.currentNodeKey+"&depositId="+item.businessId+"&LIU=1"+"&businessObjectProcessInfoId="+item.businessObjectProcessInfoId+"&businessTypeCode="+item.businessTypeCode+"&loanApplyId="+ item.businessId+"&loanApplyId="+ item.businessId+"&renwu=1"+"&projectId="+item.businessId+"&businessId="+item.businessId
                        });
                    break;
                    /*3, "续保主管审批", "续保主管审批"*/
                    case "RENEWAL_DIRECTOR_FEE_APPROVAL":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/ThePerformance/RepelProcessing/RepelProcessing.html?type=3&types="+item.currentNodeName+"&currentNode="+ item.currentNodeKey+"&depositId="+item.businessId+"&LIU=1"+"&businessObjectProcessInfoId="+item.businessObjectProcessInfoId+"&businessTypeCode="+item.businessTypeCode+"&loanApplyId="+ item.businessId+"&loanApplyId="+ item.businessId+"&renwu=1"+"&projectId="+item.businessId+"&businessId="+item.businessId
                        });
                    break;
                    /*4, "业务经理审批", "业务经理审批"*/
                    case "BUSINESS_MANAGER_FEE_APPROVAL":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/ThePerformance/RepelProcessing/RepelProcessing.html?type=4&types="+item.currentNodeName+"&currentNode="+ item.currentNodeKey+"&depositId="+item.businessId+"&LIU=1"+"&businessObjectProcessInfoId="+item.businessObjectProcessInfoId+"&businessTypeCode="+item.businessTypeCode+"&loanApplyId="+ item.businessId+"&loanApplyId="+ item.businessId+"&renwu=1"+"&projectId="+item.businessId+"&businessId="+item.businessId
                        });
                    break;
                    /*5, "风险经理审批", "风险经理审批"*/
                    case "RISK_MANAGER_FEE_APPROVAL":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/ThePerformance/RepelProcessing/RepelProcessing.html?type=5&types="+item.currentNodeName+"&currentNode="+ item.currentNodeKey+"&depositId="+item.businessId+"&LIU=1"+"&businessObjectProcessInfoId="+item.businessObjectProcessInfoId+"&businessTypeCode="+item.businessTypeCode+"&loanApplyId="+ item.businessId+"&loanApplyId="+ item.businessId+"&renwu=1"+"&projectId="+item.businessId+"&businessId="+item.businessId
                        });
                    break;
                    /*6, "分公司总经理审批", "分公司总经理审批"*/
                    case "BRANCH_GENERAL_MANAGER_FEE_APPROVAL":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/ThePerformance/RepelProcessing/RepelProcessing.html?type=6&types="+item.currentNodeName+"&currentNode="+ item.currentNodeKey+"&depositId="+item.businessId+"&LIU=1"+"&businessObjectProcessInfoId="+item.businessObjectProcessInfoId+"&businessTypeCode="+item.businessTypeCode+"&loanApplyId="+ item.businessId+"&loanApplyId="+ item.businessId+"&renwu=1"+"&projectId="+item.businessId+"&businessId="+item.businessId
                        });
                    break;
                    /*7, "出纳放款", "分公司出纳放款"*/
                    case "CASHIER_LEND_MONEY_APPROVAL":
                        return comn.addTab({
                            title: item.currentNodeName,
                            href: "./Modal/ThePerformance/RepelProcessing/RepelProcessing.html?type=7&types="+item.currentNodeName+"&currentNode="+ item.currentNodeKey+"&depositId="+item.businessId+"&LIU=1"+"&businessObjectProcessInfoId="+item.businessObjectProcessInfoId+"&businessTypeCode="+item.businessTypeCode+"&loanApplyId="+ item.businessId+"&loanApplyId="+ item.businessId+"&renwu=1"+"&projectId="+item.businessId+"&businessId="+item.businessId
                        });
                    break;

                    /*
                    投诉管理流程: type:  1: 内勤/总经理 指派 2: 处理人员处理 3: 总经理/内勤 确认 4: 总部风险部确认
                     */
                  //投诉发起
                  //case "COMPLAINT_APPLY_ADD":
                  //  return comn.addTab({
                  //    title: item.currentNodeName,
                  //    href: './Modal/complaints/complainRegister/complainRegister.html?type=2&id=' + item.businessId + '&currentNodeName=' + item.currentNodeName + '&currentNode=' + item.currentNodeKey + '&bopInfoId=' + item.businessObjectProcessInfoId
                  //  });
                  //  break;
                  case "COMPLAINT_APPLY_ADD":
                    return comn.addTab({
                      title: item.currentNodeName,
                      href: path_7 + '?type=0&id=' + item.businessId + '&tableName=complaint_info&currentNodeName=' + item.currentNodeName + '&currentNode=' + item.currentNodeKey + '&bopInfoId=' + item.businessObjectProcessInfoId +'&flowName='+ item.businessTypeCode +"&typeOption=submit"
                    });
                    break;
                    //内勤主管
                    case "COMPLAINT_APPLY_OFFICE":
                      return comn.addTab({
                        title: item.currentNodeName,
                        href: path_7 + '?type=1&id=' + item.businessId + '&tableName=complaint_info&currentNodeName=' + item.currentNodeName + '&currentNode=' + item.currentNodeKey + '&bopInfoId=' + item.businessObjectProcessInfoId +'&flowName='+ item.businessTypeCode
                      });
                      break;
                    //分公司总经理
                  case "COMPLAINT_APPLY_OFFICE_RISK_MANAGER":
                    return comn.addTab({
                      title: item.currentNodeName,
                      href: path_7 + '?type=1&id=' + item.businessId + '&tableName=complaint_info&currentNodeName=' + item.currentNodeName + '&currentNode=' + item.currentNodeKey + '&bopInfoId=' + item.businessObjectProcessInfoId +'&flowName='+ item.businessTypeCode
                    });
                    break;
                  //处理人员处理
                  case "COMPLAINT_APPLY_HANDLE":
                    return comn.addTab({
                      title: item.currentNodeName,
                      href: path_7 + '?type=2&status=showProcess&id=' + item.businessId + '&tableName=complaint_info&currentNodeName=' + item.currentNodeName + '&currentNode=' + item.currentNodeKey + '&bopInfoId=' + item.businessObjectProcessInfoId +'&flowName='+ item.businessTypeCode
                    });
                    break;
                  //内勤主管确认
                  case "COMPLAINT_APPLY_OFFICE_CHECK":
                    return comn.addTab({
                      title: item.currentNodeName,
                      href: path_7 + '?type=3&status=showProcess&id=' + item.businessId + '&tableName=complaint_info&currentNodeName=' + item.currentNodeName + '&currentNode=' + item.currentNodeKey + '&bopInfoId=' + item.businessObjectProcessInfoId +'&flowName='+ item.businessTypeCode
                    });
                    break;
                  //分公司总经理确认
                  case "COMPLAINT_APPLY_OFFICE_RISK_MANAGER_CHECK":
                    return comn.addTab({
                      title: item.currentNodeName,
                      href: path_7 + '?type=3&status=showProcess&id=' + item.businessId + '&tableName=complaint_info&currentNodeName=' + item.currentNodeName + '&currentNode=' + item.currentNodeKey + '&bopInfoId=' + item.businessObjectProcessInfoId +'&flowName='+ item.businessTypeCode
                    });
                    break;
                  //总部风险部处理完成
                  case "COMPLAINT_APPLY_OFFICE_RISK_HEAD":
                    return comn.addTab({
                      title: item.currentNodeName,
                      href: path_7 + '?type=4&status=showProcess&id=' + item.businessId + '&tableName=complaint_info&currentNodeName=' + item.currentNodeName + '&currentNode=' + item.currentNodeKey + '&bopInfoId=' + item.businessObjectProcessInfoId +'&flowName='+ item.businessTypeCode
                    });
                    break;
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
			case 'LAWSUIT_CANCEL_FLOW':
			case 'LAWSUIT_APPLY_FLOW':
			case 'LOAN_MODIFY_FLOW':
			case 'LOAN_APPLY_FLOW':
			case 'LOAN_CANCEL_FLOW': space = "LOAN"; break;
			case 'SECOND_HAND_CAR_ESTIMATE_FLOW':
			case 'SECOND_HAND_CAR_TRANSFER_FLOW': space = "SECONDHAND_CAR"; break;
			case 'DOCUMENT_TRANSMIT_FLOW': space = "DELIVER"; break;
			case 'CAR_DEALER_ADD_FLOW': space = "CAR_DEALER"; break;
			default: space = ""
		}
		space = "&space=" + space + "&releventFlowNode=" + item.operatorNodeKey + "&releventFlow=" + item.businessTypeCode;
        switch (a) {

            case "FEE_RECYCLE_FLOW":
                return comn.addTab({
                    title: '查看费用回收',
                    href: "./Modal/finaceManage/collectionRegistration/collectionInfo.html?type=show&feeId=" + item['businessId']+"&customerId="+item['customerId']+"&loanApplyId="+item['businessId']+"&businessTypeCode="+item['businessTypeCode']+"&bopInfoId="+item['businessObjectProcessInfoId']+"&flowEnd=1"
                }); //费用回收审核
                break;
            case "FEE_APPLY_FLOW":
                return comn.addTab({
                    title: '查看费用申请',
                    href: "./Modal/finaceManage/costLaunch/costInfo.html?type=show&feeId=" + item['businessId']+"&customerId="+item['customerId']+"&loanApplyId="+item['businessId']+"&businessTypeCode="+item['businessTypeCode']+"&bopInfoId="+item['businessObjectProcessInfoId']+"&flowEnd=1&typeOption=none"
                }); //费用申请审核
                break;
            case "FRONT_CAPITAL_APPLY_FLOW":
                return comn.addTab({
                    title: '查看垫款费用',
                    href: "./Modal/finaceManage/advanceFeeLaunch/advanceFeeApply.html?&feeId=" + item['businessId']+"&customerId="+item['customerId']+"&currentNodeName=查看垫款费用&loanApplyId="+item['businessId']+"&businessTypeCode="+item['businessTypeCode']+"&bopInfoId="+item['businessObjectProcessInfoId'] +"&typeOption=none&type=show"
                }); //查看垫款费用
                break;
        	case "LAWSUIT_CANCEL_FLOW":
        		return comn.addTab({
					title: '查看案件进程',
                    href: "./Modal/postLoanManage/litigationManage/withdrawingApplyPro.html?dealerId=" + item['businessId']+"&customerId="+item['customerId'] +"&type=1&bopInfoId=" + item['businessObjectProcessInfoId'] + "&loanApplyId=" + item.businessId + "&typeOption=none&businessTypeCode="+item['businessTypeCode']
                }); //撤诉申请审核
                break;
        	case "LAWSUIT_APPLY_FLOW":
                return comn.addTab({
					title: '查看案件进程',
                    href: "./Modal/postLoanManage/litigationManage/courtApplyPro.html?dealerId=" + item['businessId']+"&customerId="+item['customerId'] +"&tableName=lawsuit_info&type=1&bopInfoId=" + item['businessObjectProcessInfoId'] + "&loanApplyId=" + item.businessId + "&typeOption=none&businessTypeCode="+item['businessTypeCode']
                }); //诉讼申请审核
                break;
            case "CAR_CHECKOUT_FLOW":
                return comn.addTab({
                    title: '查看出库申请',
                    href: "./Modal/postLoanManage/collateralManage/shippingApplyPro.html?dealerId=" + item['businessId']+"&customerId="+item['customerId'] +"&tableName=checkout_car_apply&loanApplyId=" + item['businessId'] + "&type=11&bopInfoId=" + item['businessObjectProcessInfoId'] + "&typeOption=none&loanApplyId=" + item.businessId + "&businessTypeCode=" + item['businessTypeCode']
                }); //车辆出库流程
                break;
            case "TOW_CAR_APPLY_FLOW":
                return comn.addTab({
                    title: '查看拖车申请',
                    href: "./Modal/postLoanManage/trailerManage/trailerApplyPro.html?dealerId=" + item['businessId']+"&customerId="+item['customerId'] +"&tableName=drag_car_apply&loanApplyId=" + item['businessId'] + "&type=11&bopInfoId=" + item['businessObjectProcessInfoId'] + "&typeOption=none&loanApplyId=" + item.businessId + "&businessTypeCode=" + item['businessTypeCode']
                }); //拖车申请流程
                break;
            case "LOAN_APPLY_FLOW":
                return comn.addTab({
					title: '贷款流程',
                    href: path_2 + "loanStart.html?type=2&loanApplyId=" + item.businessId + space
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
                    href: './Modal/loanManage/loanModify/' + "officeReadonly.html?" + search + "&flow=modify-task" + space
                }); //贷款修改
                break;
            case "LOAN_CANCEL_FLOW":
                return comn.addTab({
					title: '贷款作废',
                    href: './Modal/loanManage/loanCancel/' + "office.html?" + search + "&flow=cancel-task"+"&space=LOAN&readonly=true" + space
                }); //贷款作废
                break;
            case "SECOND_HAND_CAR_ESTIMATE_FLOW":
                return comn.addTab({
					title: '二手车评估流程',
                    href: "./Modal/secondHandCar/common/index.html?type=5&hi=2&id=" + item['businessId'] + "&releventFlow=" + item['businessTypeCode'] + "&releventFlowNode=" + item['currentNodeKey'] + space
                }); //二手车评估流程
                break;
            case "SECOND_HAND_CAR_TRANSFER_FLOW":
                return comn.addTab({
					title: '发起二手车过户流程',
                    href: "./Modal/secondHandCar/common/index.html?type=7&hi=2&id="+item['businessId'] + space
                }); //发起二手车过户流程
                break;
            case "CAR_DEALER_ADD_FLOW":
                return comn.addTab({
                    title: '车商管理',
                    href: "./Modal/carDealerManage/carDealer/carDealer.html?dealerId="+item['businessId']+"&type=2&isManager=" + false + space + "&itemFlow=show&loanApplyId=" + item.businessId + "&businessTypeCode=" + item.businessTypeCode

                }); //发起二手车过户流程
                break;
            //文档传递
            case "DOCUMENT_TRANSMIT_FLOW":
	            if(item.currentNodeKey == "TRANSMIT_LAUNCH"){
	                comn.addTab({
						title: item.currentNodeName,
	                    href: "./Modal/documentManagement/documentDelivery/documentDelivery.html?documentDeliveryType=1&businessId="+item['businessId'] + space
	            	});
                    //Modal/documentManagement/documentDelivery/documentDelivery.html?documentDeliveryType=2&businessId=32&id=405&loanApplyId=405&projectId=425&businessTypeCode=DOCUMENT_TRANSMIT_FLOW&documentFlowType=undefined
	            }else if(item.currentNodeKey == "DOCUMENT_VERIFY"){
	            	documentFun(item['businessId'],item['businessObjectProcessInfoId'],1,2,"文档传递流程");
	            }else if(item.currentNodeKey == "COPY_CONTRACT"){
	            	documentFun(item['businessId'],item['businessObjectProcessInfoId'],2,2,"文档传递流程");
	            }else if(item.currentNodeKey == "DOCUMENT_REVIEW"){
	            	documentFun(item['businessId'],item['businessObjectProcessInfoId'],3,2,"文档传递流程");
	            }else if(item.currentNodeKey == "DOCUMENT_CLASSIFY"){
	            	documentFun(item['businessId'],item['businessObjectProcessInfoId'],4,2,"文档传递流程");
	            }else{
	            	documentFun(item['businessId'],item['businessObjectProcessInfoId'],4,2,"文档传递流程");
				}
                break;

            //结清流程
                    case "LOAN_CLEAR_FLOW":  //"结清申请", "分公司内勤结清审请"),
                        /*console.log(item);
                        return;*/
                        return comn.addTab({
                            title: "查看结清详情",
                            href: "./Modal/SettlementRegistration/SettlementProcessing/SettlementProcessing.html?type=11&types="+item.currentNodeName +"&nodeCode="+ item.currentNodeKey +"&businessType="+ item.businessTypeCode +"&projectId="+item.businessId+"&LIU=1"+"&businessObjectProcessInfoId="+item.businessObjectProcessInfoId+"&businessId="+item.businessId+"&businessTypeCode="+item.businessTypeCode+"&loanApplyId="+ item.businessId+"&str=查看结清详情"+"&xiangqing=1"
                        });
                    break;

                    // case "BANK_OFFICE_CLEAR_HANDLE":  // "银行结清办理", "驻行内勤结清办理")
                    //     return comn.addTab({
                    //         title: item.currentNodeName,
                    //         href: "./Modal/SettlementRegistration/SettlementProcessing/SettlementProcessing.html?projectId="+item.businessId+"&disble=0"
                    //     });
                    // break;

                    // case "CONFIRM_LOAN_CLEAR": //结清确认", "分公司内勤结清确认")
                    //     /*console.log(item);
                    //     return;*/
                    //     return comn.addTab({
                    //         title: item.currentNodeName,
                    //         href: "./Modal/SettlementRegistration/SettlementProcessing/SettlementProcessing.html?projectId="+item.businessId+"&disble=0"
                    //     });
                    // break;

                    // --------履约保证金
                    /*1, "履约保证金清退申请", "续保人员履约保证金清退申请"*/
                    case "PERFORM_DUTIES_BOND_CLEAR_FLOW":

                        return comn.addTab({
                            title: "查看清退详情",
                            href: "./Modal/ThePerformance/RepelProcessing/RepelProcessing.html?type=13&types="+item.currentNodeName+"&depositId="+item.businessId+"&LIU=1"+"&businessObjectProcessInfoId="+item.businessObjectProcessInfoId+"&businessTypeCode="+item.businessTypeCode+"&loanApplyId="+ item.businessId+"&loanApplyId="+ item.businessId+"&renwu=1"+"&projectId="+item.businessId+"&xiangqing=1"+"&str=查看清退详情"
                        });
                    break;
                    //投诉流程查看详情
                    case "COMPLAINT_APPLY_FLOW":
                      return comn.addTab({
                        title: item.businessTypeName,
                        href: './Modal/complaints/complainRegister/complainRegister.html?type=5&tableName=complaint_info&status=show&id=' + item.businessId + '&currentNodeName=' + item.currentNodeName + '&currentNode=' + item.currentNodeKey + '&bopInfoId=' + item.businessObjectProcessInfoId +'&flowName='+ item.businessTypeCode
                      });
                      break;
                    // /*2, "费用审批", "会计助理费用审批"*/
                    // case "ACCOUNTING_ASSISTANT_FEE_APPROVAL":

                    //     return comn.addTab({
                    //         title: item.currentNodeName,
                    //         href: "./Modal/ThePerformance/RepelProcessing/RepelProcessing.html?projectId="+item.businessId+"&pbDeposit="+item.businessId+"&disble=0"
                    //     });
                    // break;
                    // /*3, "续保主管审批", "续保主管审批"*/
                    // case "RENEWAL_DIRECTOR_FEE_APPROVAL":
                    //     return comn.addTab({
                    //         title: item.currentNodeName,
                    //         href: "./Modal/ThePerformance/RepelProcessing/RepelProcessing.html?projectId="+item.businessId+"&pbDeposit="+item.businessId+"&disble=0"
                    //     });
                    // break;
                    // /*4, "业务经理审批", "业务经理审批"*/
                    // case "BUSINESS_MANAGER_FEE_APPROVAL":
                    //     return comn.addTab({
                    //         title: item.currentNodeName,
                    //         href: "./Modal/ThePerformance/RepelProcessing/RepelProcessing.html?projectId="+item.businessId+"&pbDeposit="+item.businessId+"&disble=0"
                    //     });
                    // break;
                    // /*5, "风险经理审批", "风险经理审批"*/
                    // case "RISK_MANAGER_FEE_APPROVAL":
                    //     return comn.addTab({
                    //         title: item.currentNodeName,
                    //         href: "./Modal/ThePerformance/RepelProcessing/RepelProcessing.html?projectId="+item.businessId+"&pbDeposit="+item.businessId+"&disble=0"
                    //     });
                    // break;
                    // /*6, "分公司总经理审批", "分公司总经理审批"*/
                    // case "BRANCH_GENERAL_MANAGER_FEE_APPROVAL":
                    //     return comn.addTab({
                    //         title: item.currentNodeName,
                    //         href: "./Modal/ThePerformance/RepelProcessing/RepelProcessing.html?projectId="+item.businessId+"&pbDeposit="+item.businessId+"&disble=0"
                    //     });
                    // break;
                    // /*7, "出纳放款", "分公司出纳放款"*/
                    // case "CASHIER_LEND_MONEY_APPROVAL":
                    //     return comn.addTab({
                    //         title: item.currentNodeName,
                    //         href: "./Modal/ThePerformance/RepelProcessing/RepelProcessing.html?projectId="+item.businessId+"&pbDeposit="+item.businessId+"&disble=0"
                    //     });
                    // break;
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


//$("#org").getOrg();
$("#ftCode").flowGet();
$("#btn-search").click(function () {
    var activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
    if (activeTab == "todo") {
        $("#table1").bootstrapTable("refresh", {url: "..."});
    } else if (activeTab == "done") {
        $("#table2").bootstrapTable("refresh", {url: "..."});
    }
});

documentFun = function(businessId,bopInfoId,documentFlowType,documentDeliveryType,currentNodeName){
	comn.ajax({
    url: interUrl.documentManagement.deliverGet,
    data: {
      id: businessId
    },
    success: function(res) {
      	comn.addTab({
      		title:currentNodeName,
            href :"./Modal/documentManagement/documentDelivery/documentDeliveryInfo.html?businessId="+
            businessId+"&id="+res.data.projectId+"&loanApplyId="+res.data.loanApplyId+
            "&bopInfoId=" + bopInfoId +"&projectId="+ res.data.projectId+"&documentDeliveryType=" +
            documentDeliveryType + "&businessTypeCode=DOCUMENT_TRANSMIT_FLOW&documentFlowType=" + documentFlowType +  "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY"
        });
    }
});
};

