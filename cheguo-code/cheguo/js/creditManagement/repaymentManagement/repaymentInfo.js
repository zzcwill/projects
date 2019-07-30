$(function() {
  var args;
  args = comn.getArgs();
  $("#basic select[name='deliverType']").change(function() {
    return $("#switch").html($("#tpl_" + this.value).html() || "");
  });

  //是否换卡卡号
  $("#basic input:radio[name='isChangeCard']").on('click',function(){
    var val = $(this).val();
    if(val === '1'){
      $("#changeCardTab").html($("#changeCard").html());
    }else{
      $("#changeCardTab").html($("#changeCard2").html());
    }
  });

  //进入加载还款卡信息
  comn.ajax({
    url: interUrl.creditManagement.repayCardGet,
    data: {
      projectId: args['projectId']
    },
    success: function(res) {
      $("#basic").values(res.data);
      $("#basic select[name='deliverType']").change();

      //新卡卡号是否展示
      if(res.data.changeCardNo) {
        $("#basic input:radio[name='isChangeCard']").eq(0).click();
      }else{
        $("#basic input:radio[name='isChangeCard']").eq(1).click();
      }

      $("#basic").values(res.data);

      if (args['type'] === "show") {
        $("#basic").children("fieldset").attr("disabled", true);
      }
    }
  });


  $("#btnSave").click(function() {
    var data = $("#basic").values();
    delete data.isChangeCard;

    if ($("#basic").find("form").valid()) {
      comn.ajax({
        url: interUrl.creditManagement.repayCardSave,
        data: data,
        success: function(res) {
          window.parent.toUrl({
            url: "./Modal/creditManagement/repaymentManagement/index.html"
          });
        }
      });
    }
  });

	$("#btnBack").click(function(){
		window.parent.toUrl({url: "./Modal/creditManagement/repaymentManagement/index.html"})
	});

});
