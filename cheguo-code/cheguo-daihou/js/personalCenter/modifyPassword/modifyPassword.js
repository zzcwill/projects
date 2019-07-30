var args = comn.getArgs();
if (args["type"] == "modifyPWD") {
	parent.$("#layer_disabled").removeClass("hide")

}
$(function(){
	//$("input[name=uid]").val(comn.user.uid);
	$.ajax({
		url: interUrl.basic + interUrl.user.getUser,
		type: "POST",
		dataType: "json",
		success: function(data, textStatus, jqXHR) {
      // $("input[name=uid]").val(comn.user.uid || data.data.uid);
      $("#uid").val(data.data.uid)
		}
	});
	$("#submit").click(function(){
		console.log($("#modifyPWD").values());
		//$("#modifyPWD").validate();
	    $("#modifyPWD").validate({
		  rules: {
		    password: "required",
		    password_again: {
		      equalTo: "#password"
		    }
		  }
		});
	    if($("#modifyPWD").valid() == true){
	    	comn.ajax({
				url: interUrl.personal.modifyPWD,
				data: $("#modifyPWD").values(),
				success: function(res) {
					if (res.code === 20001) {
						return tip({
							content: res.message
						});
					}
					tip({
						content: '密码修改成功'
					});
					if (args["type"] == "modifyPWD") {
						window.parent.location.href = "../../../main.html";
					}
					comn.closeTab();
				}
			});
	    }
	})
})
