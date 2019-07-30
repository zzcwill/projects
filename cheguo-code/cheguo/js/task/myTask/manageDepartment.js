//汽车金融部type=1
//汽车金融部经理type=2
//汽车金融部总监type=3
//集团总经理type=4
//console.log(args['type']);
//当前type为4的时候，去掉融通
function hideFinance() {
    // 总部审批中心总监 隐藏 融通 按钮
    if(args['type'] === '4' || args['currentNodeKey'] === 'LOAN_CAR_FINANCE_MAJORDOMO'){
		$('#btn-close-finance').hide();
	}
}
hideFinance();

$("#flowTitle").text(args['currentNodeName']);
//总部审批中心显示大数据核验报告

// if (args["currentNodeKey"] == "LOAN_CAR_FINANCE") {
// 	$(".report").removeClass("hide")
// }

//风险预警

if (args["currentNodeKey"] == "LOAN_CAR_FINANCE_MANAGER" || args["currentNodeKey"] == "LOAN_CAR_FINANCE" || args["currentNodeKey"] == "LOAN_CAR_FINANCE_MAJORDOMO") {
	$(".isventureW").removeClass("hide");
}
//审批信息
getApprovalInfo();

//获取流程意见
getApprovalOtherInfo();
function getApprovalOtherInfo(){
    comn.ajax({
        url: interUrl.myTask.getApprovalOtherInfo,
        data: loanApplyId,
        success: function (res) {
            if(res.data){
                $("#opinionForm").values(res.data);
            }
        }
    });
}

function score(a){    //评分展示
	var this_ =  $(".score");
	if(type == 1 || type == 2 || type == 3 || type == 4){
		this_.children('.scoreNum').html(a);
		if(a >= 101){
			this_.attr("fors","03").show();
		}else if(a >= 81 && a <= 100){
			this_.attr("fors","02").show();
		}else if(a < 81){
			this_.attr("fors","01").show();
		}
	}
}

//判断显示提交还是退回
$("input[name='conclusion']").on('click', function () {
    var btnSave, btnBack, btnFinance, btnOffice, agreeShow, noAgreeShow, refShow;
    btnSave = $("#btn-opinion-save");
    btnBack = $("#btn-loanReview-back");
    btnFinance = $("#btn-close-finance");
    btnOffice = $("#btn-back-office");
    agreeShow = $("#agreeShow");
    noAgreeShow = $("#noAgreeShow");
    refShow = $("#refShow");
    var checkedV = $("input[name='conclusion']:checked").val();
    if (checkedV == 1) {
        btnSave.show();
        btnBack.hide();
        btnOffice.hide();

        btnFinance.show();
        if(type==4 || args['currentNodeKey'] === 'LOAN_CAR_FINANCE_MAJORDOMO'){
            btnFinance.hide();
        }

        //原因
        agreeShow.show();
        noAgreeShow.hide();
        refShow.hide();
    } else if (checkedV == 0) {
        btnSave.hide();
        btnBack.show();
        btnOffice.hide();

        btnFinance.hide();

        if(type==1){
            btnOffice.show();
        }
        //原因
        agreeShow.hide();
        noAgreeShow.show();
        refShow.hide();
    } else if (checkedV == 2) {
        btnSave.hide();
        btnBack.show();
        btnFinance.hide();
        btnOffice.show();
        //原因
        agreeShow.hide();
        noAgreeShow.hide();
        refShow.show();
    }
});

//流程意见保存和流程提交
$("#btn-opinion-save").click(function () {
    $("#opinionForm").validate();
    if($("#opinionForm").valid() == true){
        oppSureModal("是否确认提交");
        $("#sureOption").unbind("click").click(function () {
            //保存流程意见
            comn.ajax({
                url: interUrl.common.approveOpinion,
                data: $.extend($("#opinionForm").values(), argsBopInfoId, loanApplyId),
                success: function (res) {
                    $("#sureModal").modal("hide");
                    flowSubmit(interUrl.myTask.preSubmit, interUrl.myTask.submit2next, './Modal/task/myTask/index.html', loanApplyId);
                }
            });
        })
    }
});

//退回上一步
$("#btn-loanReview-back").click(function () {
    $("#opinionForm").validate();
    if($("#opinionForm").valid() == true) {
        oppSureModal("是否确认退回");
        $("#sureOption").unbind("click").click(function () {
            //保存流程意见
            comn.ajax({
                url: interUrl.common.approveOpinion,
                data: $.extend($("#opinionForm").values(), argsBopInfoId, loanApplyId),
                success: function (res) {
                    $("#sureModal").modal("hide");
                    flowBack2Pre();
                }
            });
        })
    }

});


//融通
$("#btn-close-finance").click(function(){
    $("#opinionForm").validate();
    if($("#opinionForm").valid() == true) {
        oppSureModal("是否确认融通");
        $("#sureOption").unbind("click").click(function () {
            //保存流程意见
            comn.ajax({
                url: interUrl.common.approveOpinion,
                data: $.extend($("#opinionForm").values(), argsBopInfoId, loanApplyId),
                success: function (res) {
                    $("#sureModal").modal("hide");
                    flowSubmit(interUrl.myTask.preLongTop, interUrl.myTask.submit2LongTop, './Modal/task/myTask/index.html', loanApplyId);
                }
            });
        })
    }
});


//退回业务录入
$("#btn-back-office").click(function(){
    $("#opinionForm").validate();
    if($("#opinionForm").valid() == true) {
        oppSureModal("是否确认退回内勤");
        $("#sureOption").unbind("click").click(function () {
            //保存流程意见
            comn.ajax({
                url: interUrl.common.approveOpinion,
                data: $.extend($("#opinionForm").values(), argsBopInfoId, id, loanApplyId),
                success: function (res) {
                    $("#sureModal").modal("hide");
                    flowBack2BudgetOfficeStaff();
                }
            });
        })
    }
});

//opinionForm单独保存
    $("#saveBtn").click(function(){
      oppSureModal("是否确认保存");
      $("#sureOption").unbind("click").click(function () {
        //保存流程意见
        comn.ajax({
          url: interUrl.common.opinionOnly,
          data: $.extend($("#opinionForm").values(), argsBopInfoId),
          success: function (res) {
            $("#sureModal").modal("hide");
            tip({
                  content: "保存成功！"
                });
          }
        });
      });
});
    //页面加载获取opinion内容
    $("#opinionText").getOpinion_s(argsBopInfoId);

$('#loadCredit').getLoad();

var table_isReg;

$(function(){
	comn.ajax({
		url: interUrl.myTask.isReg,
		data: {
			loanApplyId: args['loanApplyId']
		},
		success: function(res) {
			var html = "";
			var item = res.data;
			var len = item.length;
			for (i = 0; i < len; i++) {
				var color = item[i].hasError ? "b3b3b3" : (item[i].cheguoRegisterStatus ? "3bc995" : "ff5d5d");
				var icon = (item[i].hasError && "glyphicon-question-sign") || (item[i].cheguoRegisterStatus && "glyphicon-ok-sign") || "glyphicon-remove-sign";
				html += [
					"<tr>",
						"<td>"+ item[i].name +"</td>",
						"<td>"+ item[i].phone +"</td>",
						"<td>"+ item[i].relationship +"</td>",
						"<td id='isUser'>"+ '<span class="glyphicon '+ icon +'" aria-hidden="true" style="color:#'+ color +'; font-size:20px;"></span>' +"</td>",
					"</tr>"
				].join("");
			}
			$("#table_isReg tbody").append(html);
		}
	});
    comn.ajax({
        url: interUrl.myTask.isRegB,
        data: {
            loanApplyId: args['loanApplyId']
        },
        success: function(res) {
            var html = "";
            var o = res.data;
            html = [
                "<tr>",
                "<td>"+ o.dealerName +"</td>",
                "<td>"+ o.contactPhone +"</td>",
                "<td>"+ carDealerType(o.carDealerType) +"</td>",
                "<td>"+ (o.carDealerSttMsg || '未注册') +"</td>",
                "</tr>"
            ].join("");
            $("#table_isRegB tbody").append(html);
        }
    });
    //二手车意见

    //点击云镜报告-获取云镜报告内容
    $(".cloudMirrorReport").on('click', function () {
        var apiNum = 0;
        var creditId = '';
        var token = '';
        var yunServerUrl = '';

        //获取云镜报告征信id
        comn.ajax({
          url: interUrl.credit.loanCreditInfo,
          data: {
            flowType: args['releventFlow'] || "",
            projectId: args["projectId"],
            loanApplyId: args["loanApplyId"]
          },
          success: function (res) {
            creditId = res.data.relavants[0].creditId;
            apiNum++
            showYunReport();
          }
        });

        //获取云镜报告token
        comn.ajax({
          url: interUrl.cloudMirrorReport.decisionTokenGet,
          data: {},
          success: function (res) {
            token = res.data;
            apiNum++
            showYunReport();
          }
        });

        //获取云镜报告相应环境地址
        comn.ajax({
          url: interUrl.common.getSystemName,
          type: "GET",
          success: function (res) {
            yunServerUrl = res.data.yunServerUrl;
            apiNum++
            showYunReport();
          }
        });


        //得到全部所需要的值再去展示云镜报告
        function showYunReport() {
          if (apiNum === 3) {
            //获取反担保人-查询云镜大数据-第三种类型的次数大于等于1时候，改变云镜报告传参
            comn.ajax({
              url: interUrl.cloudMirrorReport.decisionengineLoanQueryTimes,
              data: { loanApplyId: args['loanApplyId'] },
              success: function (res) {
                var value = res.data.userdTimes > 0 ? args["projectId"] : creditId;
                var url = yunServerUrl + '/secondReport.html?token=' + token + '&bizType=1&orderNo=' + value + '&bizType2=2&orderNo2=' + args["projectId"] + '&isMenu=2';

                //获取云镜报告高度
                var orders = [
                  {
                    "bizType": 1,
                    "orderNo": value,
                  },
                  {
                    "bizType": 2,
                    "orderNo": args["projectId"],
                  }
                ];
                orders = JSON.stringify(orders);
                comn.ajax({
                  url: interUrl.cloudMirrorReport.decisionengineQueryInfo,
                  data: {
                    orders: orders,
                  },
                  success: function (res2) {
                    if (res2.data === '0') {
                      setTimeout(function () {
                        comn.ajax({
                          url: interUrl.cloudMirrorReport.decisionengineQueryInfo,
                          data: {
                            orders: orders
                          },
                          success: function (res3) {
                            if (res3.data !== '0') {
                              $('#contentIframe').css('height', res3.data + 'px');
                            }
                          }
                        });
                      }, 8000);
                    } else {
                      $('#contentIframe').css('height', res2.data + 'px');
                    }

                    $('#contentIframe').attr('src', url);
                  }
                });
              }
            });
          }
        }
    });

});

//总部审批中心先校验风险预警,判断是否显示不同等级的页签
if (args["currentNodeKey"] === "LOAN_CAR_FINANCE") {
    comn.ajax({
        url: interUrl.common.getRiskRule,
        data:{
            loanApplyId : args["loanApplyId"],
            currentNodeKey: args["currentNodeKey"]
        },
        success: function(res) {
            if (res.data) {
                $.each(res.data, function(i, v) {
                    if (v.risklevel === "红色预警") {
                        console.log("red:"+ i);
                        $("#isShowWarning").removeClass("hide");
                        return false;
                    } else if (v.risklevel === "黄色预警") {
                        console.log("yellow:"+ i);
                        $("#isShowWarning").css("background-position", "0 -30px").removeClass("hide");
                        return false;
                    }
                    console.log("out:"+i);
                })
            }
        }
    })
}
