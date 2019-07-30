var vm = null;
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
//流程部分Begin
//流程意见保存和流程提交
$("#btn-opinion-save").click(function () {
	saveBaseInfo(function(){ //保存基本信息成功后
        if ($("#isChange").val() == "change"){
            return tip({content : "请先保存预算单"});
        }
		$("#opinionForm").validate(); 
		if($("#opinionForm").valid() == true){
			oppSureModal("是否确认提交");
			$("#sureOption").unbind("click").click(function () {
				//保存流程意见
				comn.ajax({
					url: interUrl.common.opinion,
					data: $.extend($("#opinionForm").values(), argsBopInfoId, {conclusion: 1}),
					success: function (res) {
						$("#sureModal").modal("hide");
						if (args['flow'] == 'modify-task') {
							flowSubmit(interUrl.loanModify.preSubmit, interUrl.loanModify.submit2next, './Modal/task/myTask/index.html', loanApplyId);
						} else if (args['flow'] == 'modify') {
							flowSubmit(interUrl.loanModify.preSubmit, interUrl.loanModify.submit2next, './Modal/loanManage/loanModify/index.html', loanApplyId);
						}
					}
				});
			});
		}
		
	});
});

//撤销
$("#btn-cancel").click(function () {
    oppSureModal("是否确认撤销");
    $("#sureOption").unbind("click").click(function () {
        flowCancel();
    })
});

//退回上一步
$("#btn-loanReview-back").click(function () {
    $("#opinionForm").validate();
    if($("#opinionForm").valid() == true) {
        oppSureModal("是否确认退回");
        $("#sureOption").unbind("click").click(function () {
            //保存流程意见
            comn.ajax({
                url: interUrl.common.opinion,
                data: $.extend($("#opinionForm").values(), argsBopInfoId),
                success: function (res) {
                    $("#sureModal").modal("hide");
                    flowBack2Pre();
                }
            });
        })
    }
});
//判断显示提交还是退回
$("input[name='conclusion']").on('click', function () {
    var checkedV = $("input[name='conclusion']:checked").val();
    if(checkedV == 1){
        $("#btn-opinion-save").show();
        $("#btn-loanReview-back").addClass("hide");
    }else{
        $("#btn-opinion-save").hide();
        $("#btn-loanReview-back").removeClass("hide");
    }
});
