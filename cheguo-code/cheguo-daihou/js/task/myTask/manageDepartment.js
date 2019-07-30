
//汽车金融部type=1
//汽车金融部经理type=2
//汽车金融部总监type=3
//集团总经理type=4
$("#flowTitle").text(args['currentNodeName']);

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
		};
	}
	
};



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
        btnFinance.hide();
        btnOffice.hide();
        //原因
        agreeShow.show();
        noAgreeShow.hide();
        refShow.hide();
    } else if (checkedV == 0) {
        btnSave.hide();
        btnBack.show();
        btnOffice.hide();
        if(type==4){
            btnFinance.hide();
        }else{
            btnFinance.show();
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


//退回内勤
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
	
});
