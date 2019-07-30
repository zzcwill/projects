//注册组件
Vue.component('v-input',vueComponent.inputComponent);
Vue.component('v-table',vueComponent.tableComp);
Vue.component('v-select',vueComponent.selectComp);
Vue.component('modal-fade',vueComponent.modalFade);

var vm = new Vue({
    el:'#fundManage',
    data:{
    },
    methods:{
        btnSearch: function(){
            var table = $('.tab-pane.active').find('table').eq(1).attr('id');
            $("#" + table).bootstrapTable('refresh', {url: '...'});
        },
        //清空查询条件
        reset: function(){
        },
        //批量还款
        btnBatchPay: function () {
            var batchSubmit = {
                applyStatus: [],
                projectIds: []
            };
            $.map($("#table").bootstrapTable('getAllSelections'), function (row) {
                batchSubmit.applyStatus.push(row.applyStatus);
                batchSubmit.projectIds.push(row.projectId);
            });
            if (batchSubmit.applyStatus.length === 0) {
                tip({content: "请选择批量还款的数据！"})
            } else {
                var _projectIds = batchSubmit.projectIds.toString();
                var batchApplyFlag = isFlag(batchSubmit.applyStatus);
                if (batchApplyFlag) {
                    reSubmit("您已选择"+batchSubmit.applyStatus.length+"条数据，是否确认【批量还款】！", interUrl.fundManage.repayList, _projectIds);
                } else {
                    tip({content: '请选择已放款的数据！'});
                }
            }
        }

    },
    ready: function(){
        $('#orgId').getOrg();
        $('#coBankId').getBankAll();
        var dataArr =[["#applyStatus", "GuangJinApplyStatus"],["#imageTransmitStatus", "ImageTransmitStatus"],["#financeChannel", "FinanceChannelType"]];
        $.getCommonMethodPort(dataArr);
        $("input[name='applyTimeStart']").getToday();
        $("input[name='applyTimeEnd']").getToday();
    }
});

var dataLoad, handle_1, tableEvent;

dataLoad = function(params){
    tableData(params, $("#searchForm").values(), interUrl.fundManage.list)
};

handle_1 = function(value,row,index){
    /*
    ** 申请状态为申请中、申请成功则显示更新进件;
    ** 申请状态为还款中则显示更新还款;
    ** 申请状态为已放款则显示现在还款;
    ** 影像管理为上传失败、部分上传、等待上传则显示提交影像;
    ** 申请状态：0.初始化,1.申请中,2.申请成功,3.申请失败,4.已放款,5.放款失败,6.还款中,7.已还款,8.还款失败'
    ** 影像资料传输状态：1.等待上传,2.部分上传,3.上传成功,4.上传失败
     */
    var applyStatusString = '', imageTransmitStatus = '';
    if (row.applyStatus === 1 || row.applyStatus === 2) {
        applyStatusString = "<li><a class='updateFeed' href='javascript:;'>更新进件</a></li>";
    } else if (row.applyStatus === 6) {
        applyStatusString = "<li><a class='updateRepayment' href='javascript:;'>更新还款</a></li>";
    } else if (row.applyStatus === 4) {
        applyStatusString = "<li><a class='nowRepayment' href='javascript:;'>现在还款</a></li>";
    }
    if (row.imageTransmitStatus === 4 || row.imageTransmitStatus === 2 || row.imageTransmitStatus === 1) {
        imageTransmitStatus = "<li><a class='submitImg' href='javascript:;'>提交影像</a></li>";
    }
    // 下载协议按钮
	if ([4,6,7].includes(row.applyStatus)) {
		applyStatusString += "<li><a class='downloadAgreement' href='javascript:;'>下载协议</a></li>";
	}
    //针对用户级别level=50（资产合作伙伴）的用户， 资产对接管理列表中的操作按钮隐藏。
    return (comn && comn.user && comn.user.level === 50) ? '--' : ["<div class='btn-group btn-group-xs'>" ,
            "<button type='button' class='btn btn-primary btn-xs dropdown-toggle' data-toggle='dropdown'>操作" ,
            "<span class='caret'></span>",
            "</button>",
            "<ul class='dropdown-menu' role='menu'>" ,
            "<li><a class='loanDetail' href='javascript:;'>查看详情</a></li>",
            applyStatusString,imageTransmitStatus,
            "</ul>",
            "</div>"].join("");
};
tableEvent={
    //查看详情
    "click .loanDetail": function (e, a, item, index) {
        return comn.addTab({
            title: "贷款详情",
            href: "./Modal/customManage/customer/loanDetail.html?id=" + item.projectId + "&loanApplyId=" + item.projectId + "&projectId=" + item.projectId + "&businessTypeCode=LOAN_APPLY_FLOW&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY"
        })
    },
    //更新进件
    "click .updateFeed": function(e,a,item,index){
        reSubmit("是否确定【更新进件】", interUrl.fundManage.udpateEntry, item.projectId);
    },
    //更新还款
    "click .updateRepayment": function (e, a, item, index) {
        reSubmit("是否确定【更新还款】", interUrl.fundManage.queryRepayment, item.projectId);
    },
    //现在还款
    "click .nowRepayment": function (e, a, item, index) {
        reSubmit("是否确定【现在还款】", interUrl.fundManage.repayList, item.projectId);
    },
    //提交影像
    "click .submitImg": function (e, a, item, index) {
        reSubmit("是否确定【提交影像】", interUrl.fundManage.subImages, item.projectId);
    },
	//下载协议
	"click .downloadAgreement": function (e, a, item, index) {
		// 下载导入模板
		// console.log(interUrl.fundManage.gjAgreementDownload)
		// console.log(item)
		comn.ajax({
			url: interUrl.fundManage.gjAgreementDownload,
			data: {
				projectId: item.projectId
			},
			success: function (res) {
				tip({content:res.message})
			}
		});

	}
};
function isFlag(objects) {
    var testValue = 4;
    var testBolean;
    for (var i = 0; i < objects.length; i += 1) {
        if (testValue !== objects[i]) {
            testBolean = false;
            return testBolean;
        } else {
            testBolean = true;
        }
    }
    return testBolean;
}

function reSubmit(title, _url, _projectId){
    oppSureModal(title);
    $("#sureOption").unbind("click").click(function () {
        //保存流程意见
        comn.ajax({
            url: _url,
            data: {
                projectId: _projectId
            },
            success: function (res) {
                $("#sureModal").modal("hide");
                tip({
                    content: "操作成功！"
                });
                $(".tipText").html("");
                $("#table").bootstrapTable('refresh');
            }
        });
    });
}