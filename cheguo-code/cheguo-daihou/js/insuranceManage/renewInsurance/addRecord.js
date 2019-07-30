var postData = comn.getArgs();
var data = {
    projectId: postData.projectId,
    id: postData.id,
    spouseName: postData.spouseName,
    customerName: postData.customerName,
    phoneName : postData.phoneName
}
var type = postData.type;
var content, url;
if (type === "add") {
	content = "添加成功";
	$("#tipText").text("确认添加？");
	url = interUrl.insurance.addInsuranceRenewPhone;
	
} else {

	if(type === "see") {
		$("#noChange").attr("disabled", true);
	}
	content = "修改成功";
	$("#tipText").text("确认修改？");
	url = interUrl.insurance.modifyInsuranceRenewPhone;
	comn.ajax({
		url: interUrl.insurance.getInsuranceRenewPhone,
		data: data,
		success: function(res){
			$("#formData").values(res.data);
		}
	});
}
$("#btn-save").unbind('click').on("click", function(){
	if ($("#formData").valid()) {
		//alert(2222222222);
		$("#sureModal").modal("show");
		$("#sureBtn").click(function(){
			doAjax(url, content);
			//comn.closeTab();
		});
	}
});
$("#bte-cancel").on("click", function(){
	comn.closeTab();
});
/*$(document).on("change", "#phoneObject", function() {
	if ($(this).find("option:selected").html() == "本人") {
		$("#phoneName").val(data.customerName || data.phoneName);
	} else if ($(this).find("option:selected").html() == "配偶" && !data.spouseName == "undefined") {
		$("#phoneName").val(data.spouseName);
	} else {
		$("#phoneName").val("");
	}
})*/
$(function() {
	getUser();
	$("#now").getToday();
})
//获取系统当前登录用户
function getUser(){
    comn.ajax({
        url: interUrl.user.getUser,
        success: function (res) {
            $("#creator").val(res.data.realname);
        }
    })
}
function doAjax (url, content, callback){
	comn.ajax({
			url: url,
			data: $.extend($("#formData").values(), data),
			success: function (res) {
				alert("成功！");
				$("#sureModal").modal("hide");
				tip({content: content});
				return typeof callback === "function" ? callback(res) : void 0;	
			}
		});
}