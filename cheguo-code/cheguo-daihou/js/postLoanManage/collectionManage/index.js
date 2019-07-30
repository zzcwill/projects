var BasePath1 = "./Modal/postLoanManage/collectionManage/";
var BasePath2 = "./Modal/loanManage/creditManage/";
//分配外勤
var tableEvent_allot, table_allotData, handle_allot;
var itemProjectId = 1;//初次查询随便给个默认值
var itemCurrentPlanNo = '';
//第一次点当前逾期和历史逾期的时候触发boostarp-table
var firstClickMenu = {
    todoMenu: 0,
    doneMenu: 0
}

//boostarp-table相应配置start
//全量业务start
var table_3 = function (params) {
    var o = $("#recentOverdueForm3").values();
    o.launchOrgId = $("#recentOverdueForm3 [name=launchOrgId]").val() ? ($("#recentOverdueForm3 [name=launchOrgId]").val()).join(",") : '';
    var p = params.data;
    p['type'] = 3;
    return comn.ajax({
        url: interUrl.collectionManage.collectionList,
        data: $.extend(o, p),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            params.complete();
        }
    });
};

var tableEvent_3 = {
    "click .riskFile": function (e, a, item, index) {
        var riskStatus = item.riskStatus;
        var projectId = item.projectId

        if (riskStatus === "1") {
            return comn.addTab({
                title: "风险档案登记",
                href: "./Modal/riskFile/riskRegister/riskRegister.html?type=1&projectId=" + projectId
            })
        }

        return comn.addTab({
            title: "风险档案查看详情",
            href: "./Modal/riskFile/riskRegister/riskRegister.html?type=3&projectId=" + projectId
        })


    },
    "click .register": function (e, a, item, index) {
        var projectId = item.projectId;
        var currentPlanNo = item.currentPlanNo;
        return comn.addTab({
            title: '催收登记',
            href: BasePath1 + "collectionRecord.html?projectId=" + projectId + "&currentPlanNo=" + currentPlanNo + "&tableName=loan_overdue_info"
        });
    },
    "click .print": function (e, a, item, index) {
        var projectId = item.projectId;
        window.open("../../../Modal/postLoanManage/collectionManage/print.html?projectId=" + projectId);
    },
    "click .detail1": function (e, a, item, index) {
        var projectId = item.projectId;
        var customerId = item.customerId;
        return comn.addTab({
            title: "贷款详情",
            href: "./Modal/customManage/customer/loanDetail.html?id=" + projectId + "&customerId=" + customerId + "&loanApplyId=" + projectId + "&projectId=" + projectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY" + "&loanFlag=1"
        })
    },
    "click .collectionRecords": function (e, a, item, index) {
        var projectId = item.projectId;
        var currentPlanNo = item.currentPlanNo;
        return comn.addTab({
            title: '催收记录',
            href: BasePath1 + "collectionRecords.html?projectId=" + projectId + "&currentPlanNo=" + currentPlanNo
        });
    },
    "click .cancleAllot": function (e, a, item, index) {
        var projectId = item.projectId;
        oppSureModal("是否确定取消分配？");
        $("#sureBtn").unbind("click").click(function () {
            comn.ajax({
                url: interUrl.collectionManage.allotCancel,
                data: {
                    projectId: projectId
                },
                success: function (res) {
                    $("#sureModal").modal("hide");
                    tip({ content: "取消分配成功！" });
                    $("#table1").bootstrapTable("refresh", { url: "..." });
                }
            })
        })
    }
};

//复选
var checkBox3 = function (value, row, index) {
    return '<input type="checkbox" class="checkbox3" data-id="' + row.projectId + '" data-orgId="' + row.launchOrgId + '" />';
}
var handle_3 = function (value, row, index) {
    var overdueTimes = "";
    if (row.overdueTimes === 'N0') {
        overdueTimes = "<span class='N0 colored'>N0</span>"
    } else if (row.overdueTimes === 'N1') {
        overdueTimes = "<span class='N1 colored'>N1</span>"
    } else if (row.overdueTimes === 'N2') {
        overdueTimes = "<span class='N2 colored'>N2</span>"
    } else if (row.overdueTimes === 'N3') {
        overdueTimes = "<span class='N3 colored'>N3</span>"
    } else {
        overdueTimes = ""
    }
    var cancleAllot = "";
    if (row.openStaffName && row.openStaffId) cancleAllot = "<li><a class='cancleAllot' href='javascript:;'>取消分配</a></li>";
    return ["<div class='btn-group btn-group-xs'>",
        "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
        "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>",
        "</button>",
        "<ul class='dropdown-menu currentDropMenu' role='menu'>",
        "<li><a class='riskFile' href='javascript:;'>风险档案</a></li>",
        "<li><a class='register' href='javascript:;'>催收登记</a></li>",
        "<li><a class='print' href='javascript:;'>打印详情</a></li>",
        "<li><a class='detail1' href='javascript:;'>贷款详情</a></li>",
        //"<li><a class='collectionRecords' href='javascript:;'>催收记录</a></li>",
        cancleAllot,
        "</ul></div>" + overdueTimes].join("");
};

//全量业务end


//当前逾期数据start
var table_1 = function (params) {
    var o = $("#recentOverdueForm1").values();
    o.launchOrgId = $("#recentOverdueForm1 [name=launchOrgId]").val() ? ($("#recentOverdueForm1 [name=launchOrgId]").val()).join(",") : '';
    var p = params.data;
    p['type'] = 1;
    return comn.ajax({
        url: interUrl.collectionManage.collectionList,
        data: $.extend(o, p),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            params.complete();
        }
    });
};

var tableEvent_1 = {
    "click .riskFile": function (e, a, item, index) {
        var riskStatus = item.riskStatus;
        var projectId = item.projectId

        if (riskStatus === "1") {
            return comn.addTab({
                title: "风险档案登记",
                href: "./Modal/riskFile/riskRegister/riskRegister.html?type=1"
            })
        }

        return comn.addTab({
            title: "风险档案查看详情",
            href: "./Modal/riskFile/riskRegister/riskRegister.html?type=3&projectId=" + projectId
        })


    },
    "click .register": function (e, a, item, index) {
        var projectId = item.projectId;
        var currentPlanNo = item.currentPlanNo;
        return comn.addTab({
            title: '催收登记',
            href: BasePath1 + "collectionRecord.html?projectId=" + projectId + "&currentPlanNo=" + currentPlanNo + "&tableName=loan_overdue_info"
        });
    },
    "click .print": function (e, a, item, index) {
        var projectId = item.projectId;
        window.open("../../../Modal/postLoanManage/collectionManage/print.html?projectId=" + projectId);
    },
    "click .detail1": function (e, a, item, index) {
        var projectId = item.projectId;
        var customerId = item.customerId;
        return comn.addTab({
            title: "贷款详情",
            href: "./Modal/customManage/customer/loanDetail.html?id=" + projectId + "&customerId=" + customerId + "&loanApplyId=" + projectId + "&projectId=" + projectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY" + "&loanFlag=1"
        })
    },
    "click .collectionRecords": function (e, a, item, index) {
        var projectId = item.projectId;
        var currentPlanNo = item.currentPlanNo;
        return comn.addTab({
            title: '催收记录',
            href: BasePath1 + "collectionRecords.html?projectId=" + projectId + "&currentPlanNo=" + currentPlanNo
        });
    },
    "click .cancleAllot": function (e, a, item, index) {
        var projectId = item.projectId;
        oppSureModal("是否确定取消分配？");
        $("#sureBtn").unbind("click").click(function () {
            comn.ajax({
                url: interUrl.collectionManage.allotCancel,
                data: {
                    projectId: projectId
                },
                success: function (res) {
                    $("#sureModal").modal("hide");
                    tip({ content: "取消分配成功！" });
                    $("#table1").bootstrapTable("refresh", { url: "..." });
                }
            })
        })
    }
};

//复选
var checkBox = function (value, row, index) {
    return '<input type="checkbox" class="checkbox" data-id="' + row.projectId + '" data-orgId="' + row.launchOrgId + '" />';
}
var handle_1 = function (value, row, index) {
    var overdueTimes = "";
    if (row.overdueTimes === 'N0') {
        overdueTimes = "<span class='N0 colored'>N0</span>"
    } else if (row.overdueTimes === 'N1') {
        overdueTimes = "<span class='N1 colored'>N1</span>"
    } else if (row.overdueTimes === 'N2') {
        overdueTimes = "<span class='N2 colored'>N2</span>"
    } else if (row.overdueTimes === 'N3') {
        overdueTimes = "<span class='N3 colored'>N3</span>"
    } else {
        overdueTimes = ""
    }

    var cancleAllot = "";
    if (row.openStaffName && row.openStaffId) cancleAllot = "<li><a class='cancleAllot' href='javascript:;'>取消分配</a></li>";
    return ["<div class='btn-group btn-group-xs'>",
        "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
        "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>",
        "</button>",
        "<ul class='dropdown-menu currentDropMenu' role='menu'>",
        "<li><a class='riskFile' href='javascript:;'>风险档案</a></li>",
        "<li><a class='register' href='javascript:;'>催收登记</a></li>",
        "<li><a class='print' href='javascript:;'>打印详情</a></li>",
        "<li><a class='detail1' href='javascript:;'>贷款详情</a></li>",
        //"<li><a class='collectionRecords' href='javascript:;'>催收记录</a></li>",
        cancleAllot,
        "</ul></div>" + overdueTimes].join("");
};

//当前逾期数据end

//历史逾期数据start
var table_2 = function (params) {
    var o = $("#recentOverdueForm2").values();
    o.launchOrgId = $("#recentOverdueForm2 [name=launchOrgId]").val() ? ($("#recentOverdueForm2 [name=launchOrgId]").val()).join(",") : '';
    var p = params.data;
    p['type'] = 2;
    return comn.ajax({
        url: interUrl.collectionManage.collectionList,
        data: $.extend(o, p),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            return params.complete();
        }
    });
};

var tableEvent_2 = {
    "click .records": function (e, a, item, index) { //逾期记录
        return comn.addTab({
            title: '逾期记录',
            href: BasePath1 + "overdueRecord.html?projectId=" + a + "&currentPlanNo=" + item.currentPlanNo
        });
    },
    "click .register": function (e, a, item, index) {
        var projectId = item.projectId;
        var currentPlanNo = item.currentPlanNo;
        return comn.addTab({
            title: '催收登记',
            href: BasePath1 + "collectionRecord.html?projectId=" + projectId + "&currentPlanNo=" + currentPlanNo + "&tableName=loan_overdue_info"
        });
    },
    "click .detail1": function (e, a, item, index) {
        var projectId = item.projectId;
        var customerId = item.customerId;
        return comn.addTab({
            title: "贷款详情",
            href: "./Modal/customManage/customer/loanDetail.html?id=" + projectId + "&customerId=" + customerId + "&loanApplyId=" + projectId + "&projectId=" + projectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY" + "&loanFlag=1"
        })
    },
    "click .collectionRecords": function (e, a, item, index) {
        var projectId = item.projectId;
        var currentPlanNo = item.currentPlanNo;
        return comn.addTab({
            title: '催收记录',
            href: BasePath1 + "collectionRecords.html?projectId=" + projectId + "&currentPlanNo=" + currentPlanNo
        });
    },
};

var handle_2 = function (value, row, index) {
    return ["<div class='btn-group btn-group-xs'>",
        "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
        "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>",
        "</button>",
        "<ul class='dropdown-menu currentDropMenu' role='menu'>",
        "<li><a class='register' href='javascript:;'>催收登记</a></li>",
        "<li><a class='records' href='javascript:;'>逾期记录</a></li>",
        "<li><a class='detail1' href='javascript:;'>贷款详情</a></li>",
        //"<li><a class='collectionRecords' href='javascript:;'>催收记录</a></li>",
        "</ul></div>"].join("");
};
//历史逾期数据end

//三个选项卡表格共用操作start
var loanData1 = function (value, row, index) {
    var str = [
        '产品：' + loanProducts(row.loanType) + '<br />',
        '编号：' + row.projectNo,
    ].join('')
    return str;
}
var loanData2 = function (value, row, index) {
    var str = [
        '姓名：' + row.customerName + '<br />',
        '手机：' + row.mobilePhone + '<br />',
        '证件：' + row.cardNo,
    ].join('')
    return str;
}
var loanData3 = function (value, row, index) {
    var str = [
        '总额：' + row.loanAmount + '<br />',
        '余额：' + (row.currentTermInterest || '--') + '<br />',
        '付款时间：' + (row.paymentDate || '--'),
    ].join('')
    return str;
}
var loanData4 = function (value, row, index) {
    var str = [
        '月供：' + row.currentPlanRepayAmount + '<br />',
        '本金：' + row.contractPeriodpaymentCapital + '<br />',
        '利息：' + row.contractPeriodpaymentInterest,
    ].join('')
    return str;
}
var loanData5 = function (value, row, index) {
    var str = [
        '连续：' + row.continuousOverdueTimes + '<br />',
        '累计：' + (row.accumulatedOverdueTimes || '--'),
    ].join('')
    return str;
}
var loanData6 = function (value, row, index) {
    var str = [
        '垫款状态：' + loanDataAdvanceStatus(row.advanceStatus) + '<br />',
        '累计：' + row.accumulatedAdvanceApplyAmount + '<br />',
        '净垫款：' + (row.advanceBalanceAmount || '--'),
    ].join('')
    return str;
}
var loanData7 = function (value, row, index) {
    var str = '<button type="button" class="btn btn-primary lookCollectionRecords" data-toggle="modal" data-target="#lookRecords">查看</button>'
    return str;
}
var loanData8 = function (value, row, index) {
    var str = row.currentPlanNo + '期'
    return str;
}
var tableEvent_loanData7 = {
    "click .lookCollectionRecords": function (e, a, item, index) { //逾期记录
        itemProjectId = item.projectId;
        $("#table_records").bootstrapTable("refresh");
    },
}

//三个选项卡表格共用操作end

//有些过滤器start
var loanDataLoanStaus = function (value, row, index) {
    return ["待放款", "已放款 ", "已作废"][value] || '--';
};
var loanDataRiskType = function (value, row, index) {
    return ["", "高贷", "骗贷 ", "零首付", "未提车", "其他"][value] || '--';
};
var loanDataAdvanceStatus = function (value, row, index) {
    return ["", "NA", "NB"][value] || '--';
};
//有些过滤器end

//查看催收记录相关start
var table_records = function (params) {
    var p = params.data;
    comn.ajax({
        url: interUrl.collectionManage.loanCollectionInfoCollectionList,
        data: $.extend({ projectId: itemProjectId }, p),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            params.complete();
        }
    });
};

//查看催收记录相关end
//boostarp-table相应配置end

$(function () {
    //判断是否正整数正则
    function judgeZhengNumber(str) {	
        var reg = /^[1-9]\d*$/
        return reg.test(str)
    }

    //获取客户信息
    function getCurrentPlanNoInfo() {
        comn.ajax({
            url: interUrl.collectionManage.collectionStat,
            data: {
                type: 1
            },
            success: function (res) {
                function nameValues(obj) {
                    $(".tip_overdue").find("[data-name]").each(function (index, item) {
                        var key = $(this).data("name");
                        $(item).html(obj[key]);
                    });
                }
                nameValues(res.data);
            }
        })
    }

    //获取全量业务的贷款总额
    function getTotalLoanInfo() {
        var data = $("#recentOverdueForm3").values();
        comn.ajax({
            url: interUrl.collectionManage.loanOverdueInfoCollectionTotal,
            data: {
                loanType: data.loanType,
                coBankId: data.coBankId,
                collectStatus: 0
            },
            success: function (res) {
                $('#totalLoanAmount').text(res.data.totalAmount);
            }
        })
    }

    //获取当前逾期的贷款总额和余额
    function getCurrentOverdueLoanAmountInfo() {
        var data = $("#recentOverdueForm1").values();
        comn.ajax({
            url: interUrl.collectionManage.loanOverdueInfoCollectionTotal,
            data: {
                loanType: data.loanType,
                coBankId: data.coBankId,
                collectStatus: 1
            },
            success: function (res) {
                $('#currentOverdueLoanAmount').text(res.data.totalAmount);
                $('#currentOverdueLoanBalance').text(res.data.totalBalance);
            }
        })
    }     

    //导出数据
    $('#exportBtn').click(function () {
        var search = $("#recentOverdueForm1").serialize();
        search += "&type=1";
        var downLink = interUrl.basic + interUrl.collectionManage.collectionListExport + "?" + search;
        window.open(downLink, "_blank");
    });
    $('#exportBtn2').click(function () {
        var search = $("#recentOverdueForm2").serialize();
        search += "&type=2";
        var downLink = interUrl.basic + interUrl.collectionManage.collectionListExport + "?" + search;
        window.open(downLink, "_blank");
    });
    $('#exportBtn3').click(function () {
        var search = $("#recentOverdueForm3").serialize();
        search += "&type=3";
        var downLink = interUrl.basic + interUrl.collectionManage.collectionListExport + "?" + search;
        window.open(downLink, "_blank");
    });

    //分配外勤
    $("#allotBtn").on("click", function () {
        var allotData = {
            ids: [],
            orgIds: []
        };
        $("#table1 .checkbox:checked").each(function (index) {
            allotData.ids.push($(this).attr("data-id"));
            allotData.orgIds.push($(this).attr("data-orgId"));
        });
        if (allotData.ids.length === 0) {
            tip({ content: "请选择要分配的条目" });
            return;
        }
        var _ids = allotData.ids.toString();

        //判断是否同一机构
        function orgIdJudge(objects) {
            var testBolean = true;

            for (var i = 1; i < objects.length; i++) {
                if (objects[0] !== objects[i]) {
                    testBolean = false;
                }
            }
            return testBolean;
        };

        var judgement = orgIdJudge(allotData.orgIds);

        if (!judgement) {
            tip({ content: "请选择相同机构进行分配！" });
            return;
        }

        comn.ajax({
            url: interUrl.collectionManage.collectionNotice,
            data: { projectId: _ids },
            success: function (res) {
                if (res.data.success === 2) {
                    oppSureModal("当前选择的数据中存在已分配的数据是否重新分配！");
                    $("#sureBtn").unbind("click").click(function () {
                        $("#sureModal").modal("hide");
                        allot();
                    })
                }
                allot();

                function allot() {
                    var data = { projectId: allotData.ids[0], isOutsource: 3, collectionType: 2 };
                    comn.ajax({
                        url: interUrl.collectionManage.newCollectionUserList,
                        data: data,
                        success: function (res) {
                            var p2;
                            $("#allotData").modal("show");
                            table_allotData = function (params) {
                                var p = params.data;
                                params.success({ 'total': res.totalItem, rows: res.data.list });
                                params.complete();
                            };
                            tableEvent_allot = {
                                "click .role": function (e, a, item, index) {
                                    p2 = {
                                        projectId: _ids,
                                        openStaffId: item.uid,
                                        openStaffName: item.realname
                                    }
                                }
                            };
                            handle_allot = function (value, row, index) {
                                return ["<input type='radio' name='id' class='role' value='" + value + "'/>"].join("");
                            };
                            $("#table_allotData").bootstrapTable();
                            $("#table_allotData").bootstrapTable('load', res.data.list);
                            setTimeout("$('#table_allotData').find('tr').eq(1).find('[name=\"id\"]').prop('checked','checked').trigger('click')", 500);
                            $("#select-allot-btn").unbind("click").click(function () {
                                if (res.data.list.length === 0) return $("#allotData").modal("hide");
                                comn.ajax({
                                    url: interUrl.collectionManage.allotUpdate,
                                    data: p2,
                                    success: function (res) {
                                        $("#allotData").modal("hide");
                                        tip({ content: "分配成功！" });
                                        $("#table1").bootstrapTable("refresh", { url: "..." });
                                    }
                                })
                            })
                        }
                    });
                }
            }
        })


    });
    $("#allotBtn3").on("click", function () {
        var allotData = {
            ids: [],
            orgIds: []
        };
        $("#table3 .checkbox3:checked").each(function (index) {
            allotData.ids.push($(this).attr("data-id"));
            allotData.orgIds.push($(this).attr("data-orgId"));
        });
        if (allotData.ids.length === 0) {
            tip({ content: "请选择要分配的条目" });
            return;
        }
        var _ids = allotData.ids.toString();

        //判断是否同一机构
        function orgIdJudge(objects) {
            var testBolean = true;

            for (var i = 1; i < objects.length; i++) {
                if (objects[0] !== objects[i]) {
                    testBolean = false;
                }
            }
            return testBolean;
        };

        var judgement = orgIdJudge(allotData.orgIds);

        if (!judgement) {
            tip({ content: "请选择相同机构进行分配！" });
            return;
        }

        comn.ajax({
            url: interUrl.collectionManage.collectionNotice,
            data: { projectId: _ids },
            success: function (res) {
                if (res.data.success === 2) {
                    oppSureModal("当前选择的数据中存在已分配的数据是否重新分配！");
                    $("#sureBtn").unbind("click").click(function () {
                        $("#sureModal").modal("hide");
                        allot();
                    })
                }

                allot();

                function allot() {
                    var data = { projectId: allotData.ids[0], isOutsource: 3, collectionType: 2 };
                    comn.ajax({
                        url: interUrl.collectionManage.newCollectionUserList,
                        data: data,
                        success: function (res) {
                            var p2;
                            $("#allotData").modal("show");
                            table_allotData = function (params) {
                                var p = params.data;
                                params.success({ 'total': res.totalItem, rows: res.data.list });
                                params.complete();
                            };
                            tableEvent_allot = {
                                "click .role": function (e, a, item, index) {
                                    p2 = {
                                        projectId: _ids,
                                        openStaffId: item.uid,
                                        openStaffName: item.realname
                                    }
                                }
                            };
                            handle_allot = function (value, row, index) {
                                return ["<input type='radio' name='id' class='role' value='" + value + "'/>"].join("");
                            };
                            $("#table_allotData").bootstrapTable();
                            $("#table_allotData").bootstrapTable('load', res.data.list);
                            setTimeout("$('#table_allotData').find('tr').eq(1).find('[name=\"id\"]').prop('checked','checked').trigger('click')", 500);
                            $("#select-allot-btn").unbind("click").click(function () {
                                if (res.data.list.length === 0) return $("#allotData").modal("hide");
                                comn.ajax({
                                    url: interUrl.collectionManage.allotUpdate,
                                    data: p2,
                                    success: function (res) {
                                        $("#allotData").modal("hide");
                                        tip({ content: "分配成功！" });
                                        $("#table3").bootstrapTable("refresh", { url: "..." });
                                    }
                                })
                            })
                        }
                    });
                }
            }
        })


    });

    //发送短信按钮
    $('#sendMessage').bind("click",function(){
        var data = {
            ids: [],
        };
        $("#table1 .checkbox:checked").each(function (index) {
            data.ids.push($(this).attr("data-id"));
        });
        if (data.ids.length === 0) {
            tip({ content: "请选择要发送短信的记录" });
            return;
        }
        var _ids = data.ids.toString();

        oppSureModal("确定重新发送吗?");
        $("#sureBtn").unbind("click").click(function () {        
            //保存流程意见
            comn.ajax({
                url: interUrl.collectionManage.loanOverdueInfoSendSms,
                data: { projectIds: _ids },
                success: function (res) {
                    $("#sureModal").modal("hide");
                    tip({ content: "短信发送成功!" });
                    $("#table1").bootstrapTable("refresh", { url: "..." });
                }
            })
        });
    });

    //当前逾期清除查询条件
    $("#reset1").click(function () {
        //清空贷款机构相关信息satrt
        $('#coBankId2').val('');
        $('#coBankIdBox2').text('没有选中任何项');
        $('#treeBankListModal2').addClass('hide');
        if($('#treeBank1-2 li .glyphicon').eq(0).hasClass('glyphicon-ok')){
            $('#treeBank1-2 li').eq(0).trigger('click');
        }else{
            $('#treeBank1-2 li').eq(0).trigger('click');
            $('#treeBank1-2 li').eq(0).trigger('click');
        }
        //清空贷款机构相关信息end        

        $("#recentOverdueForm1 .selectpicker").val("").change();
        $("#recentOverdueForm1 .selectpicker").selectpicker('val', []);
    });
    //历史逾期清除查询条件
    $("#reset2").click(function () {
        //清空贷款机构相关信息satrt
        $('#coBankId3').val('');
        $('#coBankIdBox3').text('没有选中任何项');
        $('#treeBankListModal3').addClass('hide');
        if($('#treeBank1-3 li .glyphicon').eq(0).hasClass('glyphicon-ok')){
            $('#treeBank1-3 li').eq(0).trigger('click');
        }else{
            $('#treeBank1-3 li').eq(0).trigger('click');
            $('#treeBank1-3 li').eq(0).trigger('click');
        }
        //清空贷款机构相关信息end          

        $("#recentOverdueForm2 .selectpicker").val("").change();
        $("#recentOverdueForm2 .selectpicker").selectpicker('val', []);
    })
    //全量业务清除查询条件
    $("#reset3").click(function () {
        //清空贷款机构相关信息satrt
        $('#coBankId').val('');
        $('#coBankIdBox').text('没有选中任何项');
        $('#treeBankListModal').addClass('hide');
        if($('#treeBank1 li .glyphicon').eq(0).hasClass('glyphicon-ok')){
            $('#treeBank1 li').eq(0).trigger('click');
        }else{
            $('#treeBank1 li').eq(0).trigger('click');
            $('#treeBank1 li').eq(0).trigger('click');
        }
        //清空贷款机构相关信息end

        $("#recentOverdueForm3 .selectpicker").val("").change();
        $("#recentOverdueForm3 .selectpicker").selectpicker('val', []);
    })


    //当前逾期-查询
    $("#btn-search1").click(function () {
        getCurrentOverdueLoanAmountInfo();         

        //连续逾期数大于0判断
        var isOkContinuousOverdueTimes = $('#recentOverdueForm1 [name="continuousOverdueTimes"]').val();
        if(isOkContinuousOverdueTimes !== '' && !judgeZhengNumber(isOkContinuousOverdueTimes)) {
           tip({ content: "连续逾期数,请输入大于0的数字"}); 
           return; 
        }
        
        $("#table1").bootstrapTable("refresh", { url: "..." });
    });
    //历史逾期清除-查询
    $("#btn-search2").click(function () {
        //连续逾期数大于0判断
        var isOkContinuousOverdueTimes = $('#recentOverdueForm2 [name="continuousOverdueTimes"]').val();
        if(isOkContinuousOverdueTimes !== '' && !judgeZhengNumber(isOkContinuousOverdueTimes)) {
           tip({ content: "连续逾期数,请输入大于0的数字"}); 
           return; 
        }


        $("#table2").bootstrapTable("refresh", { url: "..." });
    });
    //全量业务-查询
    $("#btn-search3").click(function () {
        getTotalLoanInfo();

        //连续逾期数大于0判断
        var isOkContinuousOverdueTimes = $('#recentOverdueForm3 [name="continuousOverdueTimes"]').val();
        if(isOkContinuousOverdueTimes !== '' && !judgeZhengNumber(isOkContinuousOverdueTimes)) {
           tip({ content: "连续逾期数,请输入大于0的数字"}); 
           return; 
        }

        $("#table3").bootstrapTable("refresh", { url: "..." });
    });

    // 查看催收记录-新增催收登记
    $("#addRegister").bind('click', function () {
        var projectId = itemProjectId;
        var currentPlanNo = itemCurrentPlanNo;
        return comn.addTab({
            title: '催收登记',
            href: BasePath1 + "collectionRecord.html?projectId=" + projectId + "&currentPlanNo=" + currentPlanNo + "&tableName=loan_overdue_info"
        });
    })

    //获取贷款机构三级下拉方法-全量业务
    function getBankList() {
        comn.ajax({
            url: interUrl.common.cooperationBankTree,
            data: {},
            success: function (res) {
                function getBankShow(data) {
                    //数据源
                    var dataArr = data;
                    var dataArr2 = [];
                    var dataArr3 = [];
                    //选中的银行名字数组
                    var nameArr = [];
                    //选中银行的id数组
                    var idArr = [];
                    //第一级机构选中id
                    var treeBank1 = '';
                    //第二级机构选中id
                    var treeBank2 = '';
                    //第三级机构选中ids
                    var treeBank3 = [];

                    //各级机构列表方法
                    function getBankList(id, data) {
                        var html = "";
                        for (i = 0; i < data.length; i++) {
                            html += [
                                '<li>',
                                    '<span class="text">' + data[i].organName + '</span>',
                                    '<span class="glyphicon" data-id="' + data[i].id + '"></span>',
                                '</li>',
                            ].join("");
                        }
                        $("#" + id).html(html);
                    }

                    //根据id找到对象相应数组
                    function idToArr(id, arr) {
                        var data = {};

                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i].id == id) {
                                data = arr[i];
                            }
                        }

                        return data;
                    }

                    //有无三级机构
                    function judgeThreeZero(arr) {
                        var isTrue = true;
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i].organizations.length !== 0) {
                                isTrue = false;
                            }
                        }

                        return isTrue;
                    }

                    //清空三级下拉数据
                    function clearData(type) {
                        $('#coBankId').val('');
                        $('#coBankIdBox').text('没有选中任何项');

                        if (type === 1) {
                            dataArr2 = [];
                            dataArr3 = [];

                            nameArr = [];
                            idArr = [];
                            treeBank2 = '';
                            treeBank3 = [];
                            $('#treeBank2').html('');
                            $('#treeBank3').html('');
                        }

                        if (type === 2) {
                            dataArr3 = [];

                            nameArr = [];
                            idArr = [];
                            treeBank3 = [];
                            $('#treeBank3').html('');                      
                        }

                        if (type === 3) {
                            treeBank3 = [];
                            nameArr = [];
                            idArr = [];
                        }

                    }

                    //根据类型和有无下级支行显示相应几级联动
                    function showChooseList(length, type,arr) {
                        $('#treeBank2').parent().removeClass('hide');
                        $('#treeBank3').parent().removeClass('hide');

                        if (type === 1 && length === 0) {
                            $('#treeBank2').parent().addClass('hide');
                            $('#treeBank3').parent().addClass('hide'); 
                        }

                        if (type === 1 && length !== 0) {
                            var isHaveTree = judgeThreeZero(arr);
                            if(isHaveTree) {
                                $('#treeBank3').parent().addClass('hide');
                            }
                        }                        


                        if (type === 2 && length === 0) {
                            $('#treeBank3').parent().addClass('hide');
                        }

                    }

                    //根据类型和有无下级给选中银行id和名称赋值
                    function getnameArridArr(data, type) {
                        if (type === 1) {
                            if (data.organizations.length === 0) {
                                nameArr.push(data.organName);
                                idArr.push(data.id);
                            }

                            var isHaveTree = judgeThreeZero(data.organizations);
                            if (data.organizations.length !== 0 && isHaveTree) {
                                for (var i = 0; i < data.organizations.length; i++) {
                                    nameArr.push(data.organizations[i].organName);
                                    idArr.push(data.organizations[i].id);
                                }
                            }

                            if (data.organizations.length !== 0 && !isHaveTree) {
                                for (var j = 0; j < data.organizations.length; j++) {
                                    for (var k = 0; k < data.organizations[j].organizations.length; k++) {
                                        nameArr.push(data.organizations[j].organizations[k].organName);
                                        idArr.push(data.organizations[j].organizations[k].id);
                                    }
                                }
                            }
                        }

                        if (type === 2) {
                            if (data.organizations.length === 0) {
                                nameArr.push(data.organName);
                                idArr.push(data.id);
                            }

                            if (data.organizations.length !== 0) {
                                for (var n = 0; n < data.organizations.length; n++) {
                                    nameArr.push(data.organizations[n].organName);
                                    idArr.push(data.organizations[n].id);
                                }
                            }
                        }

                        $('#coBankId').val(idArr.join(','));
                        $('#coBankIdBox').text(nameArr.join(','));
                    }

                    //合作机构一级点击事件
                    $(document).on("click", "#treeBank1 li", function () {
                        clearData(1);
                        if($(this).children('.glyphicon').eq(0).hasClass('glyphicon-ok')) {
                            $(this).children('.glyphicon').eq(0).removeClass('glyphicon-ok');
                            treeBank1 = '';
                            showChooseList(0, 1,[]);
                            return;
                        }

                        $('#treeBank1 li .glyphicon').removeClass('glyphicon-ok');
                        $(this).children('.glyphicon').eq(0).addClass('glyphicon-ok');
                        treeBank1 = $(this).children('.glyphicon').eq(0).attr('data-id');

                        var bank = idToArr(treeBank1, dataArr);

                        showChooseList(bank.organizations.length, 1,bank.organizations);
                        getnameArridArr(bank, 1);

                        //二级菜单遍历
                        if (bank.organizations.length !== 0) {
                            dataArr2 = bank.organizations;
                            getBankList('treeBank2', dataArr2);
                        }
                    });

                    //合作机构二级点击事件
                    $(document).on("click", "#treeBank2 li", function () {
                        clearData(2);
                        if($(this).children('.glyphicon').eq(0).hasClass('glyphicon-ok')) {
                            $(this).children('.glyphicon').eq(0).removeClass('glyphicon-ok');
                            treeBank2 = '';
                            showChooseList(0, 2,[]);
                            return;
                        }

                        $('#treeBank2 li .glyphicon').removeClass('glyphicon-ok');
                        $(this).children('.glyphicon').eq(0).addClass('glyphicon-ok');
                        treeBank2 = $(this).children('.glyphicon').eq(0).attr('data-id');

                        var bank = idToArr(treeBank2, dataArr2);

                        showChooseList(bank.organizations.length, 2,bank.organizations);
                        getnameArridArr(bank, 2);

                        //三级菜单遍历
                        if (bank.organizations.length !== 0) {
                            dataArr3 = bank.organizations;
                            getBankList('treeBank3', dataArr3);
                        }
                    });

                    //合作机构三级点击事件
                    $(document).on("click", "#treeBank3 li", function () {
                        clearData(3);

                        if($(this).children('.glyphicon').eq(0).hasClass('glyphicon-ok')) {
                            $(this).children('.glyphicon').eq(0).removeClass('glyphicon-ok');
                        }else{
                            $(this).children('.glyphicon').eq(0).addClass('glyphicon-ok');
                        }

                        for(var j = 0 ; j < $('#treeBank3 li .glyphicon').length ; j++) {
                            if($('#treeBank3 li .glyphicon').eq(j).hasClass('glyphicon-ok')){
                                treeBank3.push($('#treeBank3 li .glyphicon').eq(j).attr('data-id'))
                            }
                        }

                        for(var i = 0 ; i <  treeBank3.length ; i++) {
                            var bank = idToArr(treeBank3[i], dataArr3);
                            nameArr.push(bank.organName);
                            idArr.push(bank.id);                            
                        }

                        $('#coBankId').val(idArr.join(','));
                        $('#coBankIdBox').text(nameArr.join(','));
                    });

                    //初始化合作机构
                    getBankList('treeBank1', dataArr);
                }
                getBankShow(res.data);

                //贷款机构下拉点击事件
                $('#treeBankClick').bind('click', function () {
                    $('#treeBankListModal').toggleClass('hide');
                });
                
                //贷款机构下拉-确认按钮
                $('#sureBank').bind('click',function(){
                    $('#treeBankListModal').toggleClass('hide');
                })
            }
        });
    }
    //获取贷款机构三级下拉方法-当前逾期
    function getBankList2() {
        comn.ajax({
            url: interUrl.common.cooperationBankTree,
            data: {},
            success: function (res) {
                function getBankShow(data) {
                    //数据源
                    var dataArr = data;
                    var dataArr2 = [];
                    var dataArr3 = [];
                    //选中的银行名字数组
                    var nameArr = [];
                    //选中银行的id数组
                    var idArr = [];
                    //第一级机构选中id
                    var treeBank1 = '';
                    //第二级机构选中id
                    var treeBank2 = '';
                    //第三级机构选中ids
                    var treeBank3 = [];

                    //各级机构列表方法
                    function getBankList(id, data) {
                        var html = "";
                        for (i = 0; i < data.length; i++) {
                            html += [
                                '<li>',
                                    '<span class="text">' + data[i].organName + '</span>',
                                    '<span class="glyphicon" data-id="' + data[i].id + '"></span>',
                                '</li>',
                            ].join("");
                        }
                        $("#" + id).html(html);
                    }

                    //根据id找到对象相应数组
                    function idToArr(id, arr) {
                        var data = {};

                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i].id == id) {
                                data = arr[i];
                            }
                        }

                        return data;
                    }

                    //有无三级机构
                    function judgeThreeZero(arr) {
                        var isTrue = true;
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i].organizations.length !== 0) {
                                isTrue = false;
                            }
                        }

                        return isTrue;
                    }

                    //清空三级下拉数据
                    function clearData(type) {
                        $('#coBankId2').val('');
                        $('#coBankIdBox2').text('没有选中任何项');

                        if (type === 1) {
                            dataArr2 = [];
                            dataArr3 = [];

                            nameArr = [];
                            idArr = [];
                            treeBank2 = '';
                            treeBank3 = [];
                            $('#treeBank2-2').html('');
                            $('#treeBank3-2').html('');
                        }

                        if (type === 2) {
                            dataArr3 = [];

                            nameArr = [];
                            idArr = [];
                            treeBank3 = [];
                            $('#treeBank3-2').html('');                      
                        }

                        if (type === 3) {
                            treeBank3 = [];
                            nameArr = [];
                            idArr = [];
                        }

                    }

                    //根据类型和有无下级支行显示相应几级联动
                    function showChooseList(length, type,arr) {
                        $('#treeBank2-2').parent().removeClass('hide');
                        $('#treeBank3-2').parent().removeClass('hide');

                        if (type === 1 && length === 0) {
                            $('#treeBank2-2').parent().addClass('hide');
                            $('#treeBank3-2').parent().addClass('hide'); 
                        }

                        if (type === 1 && length !== 0) {
                            var isHaveTree = judgeThreeZero(arr);
                            if(isHaveTree) {
                                $('#treeBank3-2').parent().addClass('hide');
                            }
                        }                        


                        if (type === 2 && length === 0) {
                            $('#treeBank3-2').parent().addClass('hide');
                        }

                    }

                    //根据类型和有无下级给选中银行id和名称赋值
                    function getnameArridArr(data, type) {
                        if (type === 1) {
                            if (data.organizations.length === 0) {
                                nameArr.push(data.organName);
                                idArr.push(data.id);
                            }

                            var isHaveTree = judgeThreeZero(data.organizations);
                            if (data.organizations.length !== 0 && isHaveTree) {
                                for (var i = 0; i < data.organizations.length; i++) {
                                    nameArr.push(data.organizations[i].organName);
                                    idArr.push(data.organizations[i].id);
                                }
                            }

                            if (data.organizations.length !== 0 && !isHaveTree) {
                                for (var j = 0; j < data.organizations.length; j++) {
                                    for (var k = 0; k < data.organizations[j].organizations.length; k++) {
                                        nameArr.push(data.organizations[j].organizations[k].organName);
                                        idArr.push(data.organizations[j].organizations[k].id);
                                    }
                                }
                            }
                        }

                        if (type === 2) {
                            if (data.organizations.length === 0) {
                                nameArr.push(data.organName);
                                idArr.push(data.id);
                            }

                            if (data.organizations.length !== 0) {
                                for (var n = 0; n < data.organizations.length; n++) {
                                    nameArr.push(data.organizations[n].organName);
                                    idArr.push(data.organizations[n].id);
                                }
                            }
                        }

                        $('#coBankId2').val(idArr.join(','));
                        $('#coBankIdBox2').text(nameArr.join(','));
                    }

                    //合作机构一级点击事件
                    $(document).on("click", "#treeBank1-2 li", function () {
                        clearData(1);
                        if($(this).children('.glyphicon').eq(0).hasClass('glyphicon-ok')) {
                            $(this).children('.glyphicon').eq(0).removeClass('glyphicon-ok');
                            treeBank1 = '';
                            showChooseList(0, 1,[]);
                            return;
                        }

                        $('#treeBank1-2 li .glyphicon').removeClass('glyphicon-ok');
                        $(this).children('.glyphicon').eq(0).addClass('glyphicon-ok');
                        treeBank1 = $(this).children('.glyphicon').eq(0).attr('data-id');

                        var bank = idToArr(treeBank1, dataArr);

                        showChooseList(bank.organizations.length, 1,bank.organizations);
                        getnameArridArr(bank, 1);

                        //二级菜单遍历
                        if (bank.organizations.length !== 0) {
                            dataArr2 = bank.organizations;
                            getBankList('treeBank2-2', dataArr2);
                        }
                    });

                    //合作机构二级点击事件
                    $(document).on("click", "#treeBank2-2 li", function () {
                        clearData(2);
                        if($(this).children('.glyphicon').eq(0).hasClass('glyphicon-ok')) {
                            $(this).children('.glyphicon').eq(0).removeClass('glyphicon-ok');
                            treeBank2 = '';
                            showChooseList(0, 2,[]);
                            return;
                        }

                        $('#treeBank2-2 li .glyphicon').removeClass('glyphicon-ok');
                        $(this).children('.glyphicon').eq(0).addClass('glyphicon-ok');
                        treeBank2 = $(this).children('.glyphicon').eq(0).attr('data-id');

                        var bank = idToArr(treeBank2, dataArr2);

                        showChooseList(bank.organizations.length, 2,bank.organizations);
                        getnameArridArr(bank, 2);

                        //三级菜单遍历
                        if (bank.organizations.length !== 0) {
                            dataArr3 = bank.organizations;
                            getBankList('treeBank3-2', dataArr3);
                        }
                    });

                    //合作机构三级点击事件
                    $(document).on("click", "#treeBank3-2 li", function () {
                        clearData(3);

                        if($(this).children('.glyphicon').eq(0).hasClass('glyphicon-ok')) {
                            $(this).children('.glyphicon').eq(0).removeClass('glyphicon-ok');
                        }else{
                            $(this).children('.glyphicon').eq(0).addClass('glyphicon-ok');
                        }

                        for(var j = 0 ; j < $('#treeBank3-2 li .glyphicon').length ; j++) {
                            if($('#treeBank3-2 li .glyphicon').eq(j).hasClass('glyphicon-ok')){
                                treeBank3.push($('#treeBank3-2 li .glyphicon').eq(j).attr('data-id'))
                            }
                        }

                        for(var i = 0 ; i <  treeBank3.length ; i++) {
                            var bank = idToArr(treeBank3[i], dataArr3);
                            nameArr.push(bank.organName);
                            idArr.push(bank.id);                            
                        }

                        $('#coBankId2').val(idArr.join(','));
                        $('#coBankIdBox2').text(nameArr.join(','));
                    });

                    //初始化合作机构
                    getBankList('treeBank1-2', dataArr);
                }
                getBankShow(res.data);

                //贷款机构下拉点击事件
                $('#treeBankClick2').bind('click', function () {
                    $('#treeBankListModal2').toggleClass('hide');
                });
                
                //贷款机构下拉-确认按钮
                $('#sureBank2').bind('click',function(){
                    $('#treeBankListModal2').toggleClass('hide');
                })
            }
        });
    }
    
    //获取贷款机构三级下拉方法-历史逾期
    function getBankList3() {
        comn.ajax({
            url: interUrl.common.cooperationBankTree,
            data: {},
            success: function (res) {
                function getBankShow(data) {
                    //数据源
                    var dataArr = data;
                    var dataArr2 = [];
                    var dataArr3 = [];
                    //选中的银行名字数组
                    var nameArr = [];
                    //选中银行的id数组
                    var idArr = [];
                    //第一级机构选中id
                    var treeBank1 = '';
                    //第二级机构选中id
                    var treeBank2 = '';
                    //第三级机构选中ids
                    var treeBank3 = [];

                    //各级机构列表方法
                    function getBankList(id, data) {
                        var html = "";
                        for (i = 0; i < data.length; i++) {
                            html += [
                                '<li>',
                                    '<span class="text">' + data[i].organName + '</span>',
                                    '<span class="glyphicon" data-id="' + data[i].id + '"></span>',
                                '</li>',
                            ].join("");
                        }
                        $("#" + id).html(html);
                    }

                    //根据id找到对象相应数组
                    function idToArr(id, arr) {
                        var data = {};

                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i].id == id) {
                                data = arr[i];
                            }
                        }

                        return data;
                    }

                    //有无三级机构
                    function judgeThreeZero(arr) {
                        var isTrue = true;
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i].organizations.length !== 0) {
                                isTrue = false;
                            }
                        }

                        return isTrue;
                    }

                    //清空三级下拉数据
                    function clearData(type) {
                        $('#coBankId3').val('');
                        $('#coBankIdBox3').text('没有选中任何项');

                        if (type === 1) {
                            dataArr2 = [];
                            dataArr3 = [];

                            nameArr = [];
                            idArr = [];
                            treeBank2 = '';
                            treeBank3 = [];
                            $('#treeBank2-3').html('');
                            $('#treeBank3-3').html('');
                        }

                        if (type === 2) {
                            dataArr3 = [];

                            nameArr = [];
                            idArr = [];
                            treeBank3 = [];
                            $('#treeBank3-3').html('');                      
                        }

                        if (type === 3) {
                            treeBank3 = [];
                            nameArr = [];
                            idArr = [];
                        }

                    }

                    //根据类型和有无下级支行显示相应几级联动
                    function showChooseList(length, type,arr) {
                        $('#treeBank2-3').parent().removeClass('hide');
                        $('#treeBank3-3').parent().removeClass('hide');

                        if (type === 1 && length === 0) {
                            $('#treeBank2-3').parent().addClass('hide');
                            $('#treeBank3-3').parent().addClass('hide'); 
                        }

                        if (type === 1 && length !== 0) {
                            var isHaveTree = judgeThreeZero(arr);
                            if(isHaveTree) {
                                $('#treeBank3-3').parent().addClass('hide');
                            }
                        }                        


                        if (type === 2 && length === 0) {
                            $('#treeBank3-3').parent().addClass('hide');
                        }

                    }

                    //根据类型和有无下级给选中银行id和名称赋值
                    function getnameArridArr(data, type) {
                        if (type === 1) {
                            if (data.organizations.length === 0) {
                                nameArr.push(data.organName);
                                idArr.push(data.id);
                            }

                            var isHaveTree = judgeThreeZero(data.organizations);
                            if (data.organizations.length !== 0 && isHaveTree) {
                                for (var i = 0; i < data.organizations.length; i++) {
                                    nameArr.push(data.organizations[i].organName);
                                    idArr.push(data.organizations[i].id);
                                }
                            }

                            if (data.organizations.length !== 0 && !isHaveTree) {
                                for (var j = 0; j < data.organizations.length; j++) {
                                    for (var k = 0; k < data.organizations[j].organizations.length; k++) {
                                        nameArr.push(data.organizations[j].organizations[k].organName);
                                        idArr.push(data.organizations[j].organizations[k].id);
                                    }
                                }
                            }
                        }

                        if (type === 2) {
                            if (data.organizations.length === 0) {
                                nameArr.push(data.organName);
                                idArr.push(data.id);
                            }

                            if (data.organizations.length !== 0) {
                                for (var n = 0; n < data.organizations.length; n++) {
                                    nameArr.push(data.organizations[n].organName);
                                    idArr.push(data.organizations[n].id);
                                }
                            }
                        }

                        $('#coBankId3').val(idArr.join(','));
                        $('#coBankIdBox3').text(nameArr.join(','));
                    }

                    //合作机构一级点击事件
                    $(document).on("click", "#treeBank1-3 li", function () {
                        clearData(1);
                        if($(this).children('.glyphicon').eq(0).hasClass('glyphicon-ok')) {
                            $(this).children('.glyphicon').eq(0).removeClass('glyphicon-ok');
                            treeBank1 = '';
                            showChooseList(0, 1,[]);
                            return;
                        }

                        $('#treeBank1-3 li .glyphicon').removeClass('glyphicon-ok');
                        $(this).children('.glyphicon').eq(0).addClass('glyphicon-ok');
                        treeBank1 = $(this).children('.glyphicon').eq(0).attr('data-id');

                        var bank = idToArr(treeBank1, dataArr);

                        showChooseList(bank.organizations.length, 1,bank.organizations);
                        getnameArridArr(bank, 1);

                        //二级菜单遍历
                        if (bank.organizations.length !== 0) {
                            dataArr2 = bank.organizations;
                            getBankList('treeBank2-3', dataArr2);
                        }
                    });

                    //合作机构二级点击事件
                    $(document).on("click", "#treeBank2-3 li", function () {
                        clearData(2);
                        if($(this).children('.glyphicon').eq(0).hasClass('glyphicon-ok')) {
                            $(this).children('.glyphicon').eq(0).removeClass('glyphicon-ok');
                            treeBank2 = '';
                            showChooseList(0, 2,[]);
                            return;
                        }

                        $('#treeBank2-3 li .glyphicon').removeClass('glyphicon-ok');
                        $(this).children('.glyphicon').eq(0).addClass('glyphicon-ok');
                        treeBank2 = $(this).children('.glyphicon').eq(0).attr('data-id');

                        var bank = idToArr(treeBank2, dataArr2);

                        showChooseList(bank.organizations.length, 2,bank.organizations);
                        getnameArridArr(bank, 2);

                        //三级菜单遍历
                        if (bank.organizations.length !== 0) {
                            dataArr3 = bank.organizations;
                            getBankList('treeBank3-3', dataArr3);
                        }
                    });

                    //合作机构三级点击事件
                    $(document).on("click", "#treeBank3-3 li", function () {
                        clearData(3);

                        if($(this).children('.glyphicon').eq(0).hasClass('glyphicon-ok')) {
                            $(this).children('.glyphicon').eq(0).removeClass('glyphicon-ok');
                        }else{
                            $(this).children('.glyphicon').eq(0).addClass('glyphicon-ok');
                        }

                        for(var j = 0 ; j < $('#treeBank3-3 li .glyphicon').length ; j++) {
                            if($('#treeBank3-3 li .glyphicon').eq(j).hasClass('glyphicon-ok')){
                                treeBank3.push($('#treeBank3-3 li .glyphicon').eq(j).attr('data-id'))
                            }
                        }

                        for(var i = 0 ; i <  treeBank3.length ; i++) {
                            var bank = idToArr(treeBank3[i], dataArr3);
                            nameArr.push(bank.organName);
                            idArr.push(bank.id);                            
                        }

                        $('#coBankId3').val(idArr.join(','));
                        $('#coBankIdBox3').text(nameArr.join(','));
                    });

                    //初始化合作机构
                    getBankList('treeBank1-3', dataArr);
                }
                getBankShow(res.data);

                //贷款机构下拉点击事件
                $('#treeBankClick3').bind('click', function () {
                    $('#treeBankListModal3').toggleClass('hide');
                });
                
                //贷款机构下拉-确认按钮
                $('#sureBank3').bind('click',function(){
                    $('#treeBankListModal3').toggleClass('hide');
                })
            }
        });
    }
    
    //点选项卡触发boostrap-table
    $('#todoMenu').bind('click',function(){
        if(firstClickMenu.todoMenu === 0) {
            $("#btn-search1").trigger('click');
            firstClickMenu.todoMenu = 1;
        }
    });
    $('#doneMenu').bind('click',function(){
        if(firstClickMenu.doneMenu === 0) {
            $("#btn-search2").trigger('click');
            firstClickMenu.doneMenu = 1;
        }        
    });


    //首次加载执行方法
    //获取分公司列表
    $("[name='launchOrgId']").getOrg('', function () {
        $('.selectpicker').selectpicker('refresh');
    }, '-1');
    $("[name='currentPlanNo']").setPostLoanTerm();
    getCurrentPlanNoInfo();
    getBankList();
    getBankList2();
    getBankList3();
    getTotalLoanInfo();
    getCurrentOverdueLoanAmountInfo();    
})
