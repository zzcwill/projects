var args = comn.getArgs(); //getArgs
var uId = comn.user.uid;
var argsBopInfoId={bopInfoId:args['bopInfoId']};
var feeRecycleId={feeApplyId: args['feeId']};

function processChoose(n){
  $("#switch_1").html($("#tpl_" + n).html() || "");
}

if(args['type']==1){
	$('#flowTitle').html('收款确认(分公司)');
}
if(args['type']==2){
	$('#flowTitle').html('收款确认(集团)');
}
//初始化信息
comn.ajax({
  url: interUrl.feeManage.get,
  data: {projectId:args['projectId']},
  success: function (res) {
    processChoose(res.data.feeCategoryCode);
    $('#feeCategoryCode').getFeeCategoryCode(res.data.feeCategoryCode);
    $('#feeCode').getFeeCode(res.data.feeCategoryId, res.data.feeCode);
    if(res.data.lawsuitStatus){
      $("#collectionForm [name='lawsuitStatusName']").val(lawsuitStatus(res.data.lawsuitStatus));
    }
    $("#collectionForm").values(res.data);
    $('#collectionForm input[name=collectedAmount]').val(res.data.receivableAmount);
    getDocumentList(res.data.id);
  }
});

//获取图片
function getDocumentList(id) {
  var result = "";
    comn.ajax({
        url: interUrl.feeManage.getFileList,
        data: {
            feeId: id
        },
        success: function (res) {
            var del=(args['type']!='show')?"<a href='javascript:;' class='upCancle'>删除</a>":"";
            var i, list = res.data;
            for (i = 0; i < list.length; i++) {
                var o = list[i];
                result += "<li class='loaded' data-id='"+ o.id+"'>" +
                    "<img src='"+ o +"' class='hide' />" +
                    "<input name='LoanDocuments[" + i + "].fileName' data-name='fileName' class='hide' value='" + o.fileName + "' />" +
                    "<a href='javascript:;' class='showImg' data-path='"+ o.filePath+"'>" + o.fileName + "</a>&nbsp;"+del+"</li>";
            }
            $("#fileType").html(result);
        }
    });
}

//查看图片
$(document).on("click",".showImg",function(){
    var _this=$(this),imgArr=[];
    var imgA=_this.parents("ul").find(".showImg");
    var _index=imgA.index(_this);
    imgA.each(function(index){
        imgArr.push(($(this).attr("data-path")));
    });
    window.parent.switchImage(imgArr,_index);
});


//判断显示提交还是退回
$("input[name='conclusion']").on('click', function () {
    var checkedV = $("input[name='conclusion']:checked").val();
    if (checkedV == 1) {
        $("#btn-opinion-save").show();
        $("#btn-loanReview-back").hide();
        $('#btn-close-loan').addClass('hide');
    } else {
        $("#btn-opinion-save").hide();
        $("#btn-loanReview-back").show();
        $('#btn-close-loan').removeClass('hide');
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
//流程部分Begin
//流程意见保存和流程提交
$("#btn-opinion-save").click(function () {
    $("#collectionForm").validate();
    if($("#collectionForm").valid() == true) {
   comn.ajax({
       url: interUrl.feeManage.save,
       data: $.extend($("#collectionForm").values(), {uId: uId}),
       success: function (res) {
           //tip({content: res.message || "保存成功!"});
           
           $("#opinionForm").validate();
           if($("#opinionForm").valid() == true){
             oppSureModal("是否确认提交");
             $("#sureOption").unbind("click").click(function () {
               //保存流程意见
               comn.ajax({
                 url: interUrl.common.opinion,
                 data: $.extend($("#opinionForm").values(), argsBopInfoId),
                 success: function (res) {
                   $("#sureModal").modal("hide");
                   flowSubmit(interUrl.feeManage.recyclePreSubmit, interUrl.feeManage.recycleSubmit2next, './Modal/task/myTask/index.html', feeRecycleId);
                 }
               });
             })
           }
         }
    });

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
                url: interUrl.common.opinion,
                data: $.extend($("#opinionForm").values(), argsBopInfoId),
                success: function (res) {
                    $("#sureModal").modal("hide");
                    //退回上一步
                    comn.ajax({
                        url: interUrl.feeManage.recycleBack2pre,
                        data: feeRecycleId,
                        success: function (res1) {
                            tip({content: res1.message});
                            comn.closeTab();
                        }
                    });
                }
            });
        })
    }
});
//关闭费用申请
$('#btn-close-loan').click(function(){
  $("#opinionForm").validate();
  if($("#opinionForm").valid() == true) {
    oppSureModal("是否确认关闭贷款！");
    $("#sureOption").unbind("click").click(function () {
      $("#sureModal").modal("hide");
      comn.ajax({
          url: interUrl.feeManage.recycleCancel,
          data: feeRecycleId,
          success: function (res) {
              tip({content: res.message});
              comn.closeTab();
          }
      });
    });
  }
});