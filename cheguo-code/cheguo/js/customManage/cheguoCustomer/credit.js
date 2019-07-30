//@ sourceURL=credit.js;
var args = comn.getArgs(), tableConfig, creditId, dataLoad_4, handle_4, tableEvent_4, creditFourEl_flag = false;
//加载客户数据
dataLoad_1 = function(params) { tableData(params, $("#userInfo").values(), interUrl.credit.creditUser); };

handle_1 = function(value, row, index) { return ["<button type='button' class='btn btn-primary btn-xs loanStart1'>选择</button>"].join(""); };

tableEvent_1 = {
	"click .loanStart1": function(e, a, item, index) {
		delete item['id'];
		creditId = null;
		$("#id").val("");
		$("#bcardNo,#reserveMobile").val("");//重新选择借款人时，将预留手机号和银行卡号清空
		$("#creditForm").find(".panel[data-for='po'], .panel[data-for='db']").remove();
		$("#creditForm").find(".panel").eq(0).values(item);
		$("#creditForm").find(".panel").eq(1).find("ul").html("").end().find(":input[data-for]").each(function(){
			var forName = $(this).data("for");
			return this.value = item[forName] || "";
		}).end().find(".list-inline").append(imgHtml([]));
		if (item.cardType == "1") {
			$("#cardNo").addClass("idCard");
		} else {
            $("#cardNo").removeClass("idCard");
		}
		if(item.maritalStatus == 1){
			build({
				name: item.spouseName,
				cardType: item.spouseCardType,
				cardNo: item.spouseCardNo,
				mobile: item.spouseMobile,
				maritalStatus: item.maritalStatus
			})
		}
		$("#customerChoice").modal("hide");
	}
};
//主贷人关联
dataLoad_4 = function(params) {
	tableData(params, $.extend($("#mainCredit").values(), {
		creditResult : 2,
		creditType : 1,
		creditStatus:1
	}), interUrl.credit.creditList);
}

handle_4 = function(value, row, index) {
	return ["<button type='button' class='btn btn-primary btn-xs choise'>选择</button>"].join("");
};

tableEvent_4 = {
	"click .choise": function(e, a, item, index) {
		$("input[name=mainCreditId]").val(item.id);
		$("input[name=mainCreditName]").val(item.customerName);
		loadBank(item.inquryBankId);
		$("#inquryBank").val(item.inquryBank);
		$("#isInquryBankIdShow").remove();
		$("#isInquryBank").append('<input type="hidden" name="inquryBankId" id="isInquryBankIdShow" value="'+ item.inquryBankId +'">')
		$("#mainCreditId").modal("hide");
		$("#bankDeraler").prop("disabled", "disabled");
	}
};
//排序
function indexSort() {
	$(".panel[data-for='db'], .panel[data-for='po']").each(function(k){
		_index = $(this).index();
		$(this).find(":input").attr("name", function(index, attr){
			if(attr){
				return attr.replace(/\[(\d)\]/, '['+ _index +']');
			}
		}); 
	}); 
}

function imgHtml(obj, _index, i) {

	//if(typeof(obj) == "undefined") {return; }
	var html = "";
	//if(obj && !(obj.length > 0)) return "";
	//for (var j = 0, len = obj.length; j < len; j++) {
	for (var j = 0; j < 4; j++) {
		var _name= "", _icon = "";
        switch (j) {
			case 0:
				_name = "身份证人像面照片";
				_icon = "card01";
				break;
			case 1:
				_name = "身份证国徽面照片";
				_icon = "card02";
				break;
			case 2:
				_name = "征信授权书";
				_icon = "card03";
				break;
			case 3:
				_name = "征信授权书签字照";
				_icon = "card04";
				break;
			default:
				break;
		}
		var o = obj[j];
        console.log(o);
		//if(o.creditFile){
        var img = (o && o.creditFile) ? ["<li>",
                "<img src='" + o.creditFile + "?x-oss-process=image/resize,h_85' height='85' />",
                "<input type='text' class='hide' name='relavants["+ (_index || 0) +"].creditFiles["+ (i || j) +"].creditFile' value='"+ o.creditFile +"'>",
				"<input type='text' class='hide' name='relavants["+ (_index || 0) +"].creditFiles["+ (i || j) +"].id' value='"+ (o.id || '') +"'>",
				"<input type='text' class='hide' name='relavants["+ (_index || 0) +"].creditFiles["+ (i || j) +"].remark' value='"+ (o.remark || '') +"'>",
				"<p class='text-center'>",
				"<a javascript='javascript:void();' data-id='" + (o.id || '') + "'>删除</a>",
				"</p>",
				"</li>"].join("") : '<span class="addImg"></span>';
		  	html += ["<div class='uploadFile'>",
                  "<div class='putImg "+ _icon +(((o && o.remark != undefined) || (o && o.creditFile)) ? ' loadImg' : ' imgItem') +"' data-img='"+ _icon +"' data-remark='"+ j +"'>", //((o && o.remark != undefined) || o.creditFile 第一段针对车贷征信 第二段车国未给remark标识
				  img,
				  "</div>",
				  "<span>"+ _name +"</span>",
				  "</div>"
		  	].join("");
		//}
	}
	return html;
}

function replaceImgHtml(obj, _index, i) {
    if(typeof(obj) == "undefined") {return; }
    var html = "";
    if(obj && !(obj.length > 0)) return "";
    var o = obj[0];
    html += ["<li>",
        "<img src='" + o.creditFile + "?x-oss-process=image/resize,h_85' height='85' />",
        '<input type="text" class="hide" name="relavants['+ (_index || 0) +'].creditFiles['+ (i) +'].creditFile" value="'+ o.creditFile +'">',
        '<input type="text" class="hide" name="relavants['+ (_index || 0) +'].creditFiles['+ (i) +'].id" value="'+ (o.id || "") +'">',
        '<input type="text" class="hide" name="relavants['+ (_index || 0) +'].creditFiles['+ (i) +'].remark" value="'+ (o.remark || "") +'">',
		"<p class='text-center'>",
        "<a javascript='javascript:void();' data-id='" + (o.id || '') + "'>删除</a>",
		"</p>",
		"</li>"
    ].join("");
    $(".currentImg").addClass("loadImg");
    return html;
}

//构造担保人/反担保人模板
function build(o) {
	if(!o) o = {};
	var html = [
		'<div class="panel panel-default creditFourEl" data-for="'+ (o['maritalStatus'] == 1 ? "po" : "db") +'" data-id="' + (o.id || "") + '">',
			'<div class="panel-heading">',
				'<h3 class="panel-title">'+ (o['maritalStatus'] == 1 ? "配偶" : (o.guaranteeRelationship == 2 ? "反担保人" : "担保人")) +'</h3>',
			'</div>',
			'<div class="panel-body panel-default">',
				'<input type="hidden" name="relavants[1].reserveMobile" data-for="reserveMobile" />',
				'<input type="hidden" name="relavants[1].bcardNo" data-for="bcardNo" />',
				'<input type="hidden" name="relavants[1].id" data-for="id" />',
				'<div class="form-group form-group-sm">',
					'<div class="input-tip">',
						'<label class="col-md-3 col-xs-3 col-sm-3 control-label">姓名：</label>',
						'<div class="col-md-5 cl-sm-5 col-xs-5">',
						'<input type="text" name="relavants[1].fullName" data-for="name" placeholder="请输入姓名" class="form-control required" />',
						'</div>',
					'</div>',
					'<div class="input-tip">',
						'<label class="col-md-3 col-xs-3 col-sm-3 control-label">证件类型：</label>',
						'<div class="col-md-5 cl-sm-5 col-xs-5">',
							'<select name="relavants[1].cardType" data-for="cardType" class="form-control cardType required">',
								'<option value="">--请选择--</option>',
								'<option value="1">身份证</option>',
								'<option value="2">军官证</option>',
								'<option value="3">侨胞证</option>',
								'<option value="4">外籍人士</option>',
							'</select>',
						'</div>',
					'</div>',
					'<div class="input-tip">',
						'<label class="col-md-3 col-xs-3 col-sm-3 control-label">证件号码：</label>',
						'<div class="col-md-5 cl-sm-5 col-xs-5">',
						'<input type="text" name="relavants[1].cardId" data-for="cardNo" placeholder="请输入证件号码" class="form-control required" />',
						'</div>',
					'</div>',
				'</div>',
			'<div class="form-group form-group-sm">',
				'<div class="input-tip">',
					'<label class="col-md-3 col-xs-3 col-sm-3 control-label">手机号码：</label>',
					'<div class="col-md-5 cl-sm-5 col-xs-5">',
					'<input type="text" name="relavants[1].mobile" data-for="mobile" placeholder="请输入手机号码" maxlength="11" class="form-control mobile required" />',
					'</div>',
				'</div>',
				'<div class="input-tip">',
					'<label class="col-md-3 col-xs-3 col-sm-3 control-label">借款人关系：</label>',
					'<div class="col-md-5 cl-sm-5 col-xs-5">',
						o['maritalStatus'] == 1 ?
							['<input type="text" class="form-control" value="夫妻" disabled />',
							'<input type="hidden" name="relavants[1].borrowerRelationship" value="2" />'].join("") :
							['<select name="relavants[1].borrowerRelationship" data-for="reloationShip" class="form-control required">',
								'<option value="">--请选择--</option>',
								'<option value="3">父亲</option>',
								'<option value="4">母亲</option>',
								'<option value="5">姐妹</option>',
								'<option value="6">兄弟</option>',
								'<option value="7">儿子</option>',
								'<option value="8">亲戚</option>',
								'<option value="9">朋友</option>',
								'<option value="10">合伙人</option>',
								'<option value="11">同事</option>',
								'<option value="12">女儿</option>',
								'<option value="13">姐夫</option>',
								'<option value="14">嫂子</option>',
								'<option value="15">儿媳</option>',
							'</select>'].join(""),
					'</div>',
				'</div>',
				o['maritalStatus'] != 1 ? [
					'<div class="input-tip">',
						'<label class="col-md-3 col-xs-3 col-sm-3 control-label">担保关系：</label>',
						'<div class="col-md-5 cl-sm-5 col-xs-5">',
							'<select name="relavants[1].guaranteeRelationship" data-for="guaranteeRelationship" class="form-control required">',
								'<option value="">--请选择--</option>',
								'<option value="1">担保人</option>',
								'<option value="2">反担保人</option>',
							'<select/>',
						'</div>',
					'</div>',
				].join("") : "",
			'</div>',
			'<div class="form-group form-group-sm dataUpload" va="001">',
				'<div class="col-md-3 fileBox">',
				'</div>',
				'<ul class="col-md-19 list-inline" data-for="file"></ul><input type="file" accept="image/*" class="hide" />',
				'<div class="col-md-2 text-right '+ (o['maritalStatus'] == 1 ? "hide" : "") +'">',
					'<button type="button" class="btn btn-primary deleted"><span>删除关系人</span></button>',
				'</div>',
			'</div>',
			'</div>',
		'</div>', 
	].join("");
	if(o.maritalStatus == 1){
		//增加配偶
		var $el = $("#creditForm").find(".panel[data-for='po']");

		if(!$el.length){ //如果没有配偶则增加 
			$el = $("#creditForm").find(".panel").eq(1).after($(html)).next(); 
		}

		$el.find(":input[data-for]").each(function(){
			var forName = $(this).data("for");
			return this.value = o[forName] || "";
		}).end().find("[data-for='file']").html("").append(imgHtml(o['file'] || ""));
	}else{
		//增加担保人
		$("#creditForm").find(".panel").last().after(html).next().find(":input[data-for]").each(function(){
			var forName = $(this).data("for");
			return this.value = o[forName] || "";
		}).end().find("[data-for='file']").html("").append(imgHtml(o['file'] || ""));

	}
    if(!o.cardType){
		if(o.maritalStatus == 1) {
            $("#creditForm").find(".panel[data-for='po']").find("select[data-for=cardType]").val(1).end().find("input[data-for=cardNo]").addClass("idCard")
		} else {
            $("#creditForm").find(".panel").last().find("select[data-for=cardType]").val(1).end().find("input[data-for=cardNo]").addClass("idCard");
		}
    } else {
        if(o.cardType == "1") {
            $("#creditForm").find(".panel").last().find("input[data-for=cardNo]").addClass("idCard");
        }
    }
    // if(!o.cardType){
    //     $("select[data-for=cardType]").val("1");
    // }
    indexSort();
}

handle_2 = function() { return ["<button type='button' class='btn btn-primary btn-xs loanStart2'>查看</button>"].join(""); };

dataLoad_2 = function(params) {
	var datas = $("input[name=cardNo]").val();
	tableData(params, {
		cardNo: datas,
		filterId: creditId,
		filterType: 1 
	}, interUrl.credit.creditRisk, function(res){
		if(res.data && res.data.length > 0){
			$("#table_2").bootstrapTable('load', res.data);
			$("#risk").modal("show"); 
		}
	})
};
tableEvent_2 = {
	"click .loanStart2": function(e, a, item, index) {
		var url = "";
		if (item.type == '历史项目') {
			url =  "./Modal/loanManage/loanReview/loanStart.html?type=2&loanApplyId=" + item.creditId; //地址待定
		} else if (item.type == '历史担保') {
			url =  "./Modal/loanManage/loanReview/loanStart.html?type=2&loanApplyId=" + item.creditId; //地址待定
		} else if (item.type == '历史征信') {
			url =  "./Modal/loanManage/creditManage/creditInfo.html?type=1&businessId=" + item.creditId; //地址待定
		} 
		return window.parent.toUrl({ url: url });
	}
};

dataLoad_3 = function(params) {
	if (!params.data.businessObjectId || !params.data.businessGroupId) return;
	tableData(params, {
		boId: params.data.businessObjectId,
		businessGroupId: params.data.businessGroupId,
		businessType: params.data.nextFlowType,
		nodeCode: params.data.nextFlowNodeCode 
	},interUrl.gr.flowUser, function(res){
		$("#task").modal("show");
		$("#nextFlowNodeName").html(res.data.nextFlowNodeName);
		$("#table_3").bootstrapTable('load', res.data.userTasks); 
		$("#table_3").bootstrapTable('check', 0);
	})
}


//图片部分
function base64(file, index, callback) {
    return lrz(file).then(function (rst) {
        var imgRst;
		console.log(rst);
        imgRst = rst.base64;
        return typeof callback === "function" ? callback(file, imgRst, index) : void 0;
    });
};
var aFlag;
function commit(a) { //保存征信信息
    aFlag = "";
	var data;
	if (args["type"] == 2){
	   data = {
		 importId: args['importId']
	   }
	}
	if(args['type'] == 4){
		data= {
			//source:3,
            source: $("input[name=source]").val(),
			serialNumber: args['dealerOrder'],
			id: creditId
		}
	}
	if ($("#cardType").val() == "1") {
        comn.ajax({
            async: false,
            url: interUrl.credit.creditAdd, //发起征信保存接口（已有征信的判断）
            data: $.extend($("#creditForm").values(), data, {source: args["type"] == "4" ? $("input[name=source]").val() : args["creditSource"], neglect: ''}),
            success: function (res) {
				$("#sureModal").modal("hide");
                if (res.code == '20001') {
                    $("#fourCreditElement").modal("hide");
                    var messArr = res.message.split("|");
                    $("#tipMessage").modal("show");
                    $(".tipCardMessage").html(messArr[0]);
                    $("#addBtn").unbind("click").on("click", function(){
                        addCredit(messArr[1]);
                    })
                } else if (res.code == '20002' || res.code == '20003') {
                	aFlag = a;
                    fourElements(res.message);
				}  else {
                    $("#fourCreditElement").modal("hide");
                    creditFourEl_flag = false;
                    source(res.data);
                    if (a == 0) {
                        //在征信校验和保存之后，预提交之前做四要素校验；
                    	save();
                    }
                    if (a == 1) {
                        tip({content: "保存成功! "});
                        $("#table_2").bootstrapTable();
                    }
				}
            }
        })
	} else {
        addCredit();
	}
	function addCredit(v) {
        comn.ajax({
            async: false,
            url: interUrl.credit.creditAdd,
            data: $.extend($("#creditForm").values(), data,{source: args["type"] == "4" ? $("input[name=source]").val() : args["creditSource"], neglect: v || ''}),
            success: function(res) {
                v ?  $("#tipMessage").modal("hide") : $("#sureModal").modal("hide");
                if (res.code == '20002' || res.code == '20003') {
                    fourElements(res.message);
                } else {
                    $("#fourCreditElement").modal("hide");
                    creditFourEl_flag = false;
                    source(res.data);
                    if (a == 0) {
                        save();
                    }
                    if (a == 1) {
                        tip({content: "保存成功! "});
                        $("#table_2").bootstrapTable();
                    }
				}
            }
        });
	}
}
var _cardFlag;
//在征信保存之后，预提交之前做四要素校验；
function fourElements(data){
	var messageArr = data.split("|");
	var _message = messageArr[0];
    _cardFlag = messageArr[1];
	var o = messageArr[2];
    if (creditFourEl_flag) {
        $("#return_btn").html("返回");
        $("#returnModify_btn").html("修改");
    } else {
        $("#return_btn").html("返回修改");
        $("#returnModify_btn").html("补充资料");
    }
    $(".tipMessage_credit").html(_message);
    $("#tipMessage_credit").modal("show");
    $("#returnModify_btn").unbind("click").on("click", function(){ //补充资料 或修改按钮
        if ($(this).html() === "补充资料") {
            $("#fourCreditElement").modal("show");
            $("#tipMessage_credit").modal("hide");
            $("#fourCreditForm").html(creditHtml(JSON.parse(o)));
        } else {
            $("#tipMessage_credit").modal("hide");
        }
        creditFourEl_flag = false;
    });
    $("#return_btn").unbind("click").on("click", function () { //返回或返回修改
        creditFourEl_flag = false;
        $("#fourCreditElement").modal("hide");
    })
}
function creditHtml(arr){
	var html = "";
	for (var i = 0; i < arr.length; i++) {
		html += ["<div class='panel panel-default partyList'>",
            "<div class='panel-heading'>",
            "<h3 class='panel-title'>"+ (arr[i].borrowerRelationship == 1 ? ('借款人') : (arr[i].borrowerRelationship == 2 ? ('配偶') : ('担保人'))) +"</h3>",
            "</div>",
            "<div class='panel-body panel-default creditFourEl'>",
            "<div class='form-group form-group-sm'>",
            "<div class='input-tip'>",
            "<label class='control-label col-md-4 col-xs-4 col-sm-4'>姓名：</label>",
            "<div class='col-md-8 col-xs-8 xol-sm-8'>",
            "<input type='text' class='form-control' placeholder='请输入姓名' name='fullName_"+ i +"' readonly value='"+ arr[i].fullName +"'>",
            "</div>",
            "</div>",
            "<div class='input-tip'>",
            "<label class='control-label col-md-4 col-xs-4 col-sm-4'>证件号码：</label>",
            "<div class='col-md-8 col-xs-8 xol-sm-8'>",
            "<input type='text' class='form-control' placeholder='请输入证件号码' name='cardId_"+ i +"' readonly value='"+ arr[i].cardId +"'>",
            "</div>",
            "</div>",
            "</div>",
            "<div class='form-group form-group-sm'>",
            "<div class='input-tip'>",
            "<label class='control-label col-md-4 col-xs-4 col-sm-4'>银行卡号：</label>",
            "<div class='col-md-8 col-xs-8 xol-sm-8'>",
            "<input type='text' class='form-control required bankCardNo' placeholder='请输入银行卡号' name='bcardNo_"+ i +"' value='"+ arr[i].bcardNo +"'>",
            "</div>",
            "</div>",
            "<div class='input-tip'>",
            "<label class='control-label col-md-4 col-xs-4 col-sm-4'>预留手机号：</label>",
            "<div class='col-md-8 col-xs-8 xol-sm-8'>",
            "<input type='text' class='form-control required mobile' placeholder='请输入预留手机号' name='reserveMobile_"+ i +"' value='"+ (arr[i].reserveMobile || arr[i].mobile) +"'>",
            "</div>",
            "</div>",
            "</div>",
            "</div>",
            "</div>"].join("");
	};
	return html;
}
$(document).on("click", "#btn_reSubmit", function () { //补充资料确认提交再一次进行四要素校验
	if($("#fourCreditForm").valid()){
        creditFourEl_flag = true;
        $("#cardFlag").val(_cardFlag); //此值作为三要素不通过调取四要素；如在提交保存无需上传
        var len = $("#fourCreditForm").children().length;
        for (var i = 0; i < len; i++) {
            var _val = $("input[name=cardId_"+ i +"]").val();
            $("#creditForm input").each(function(h, v) {
                var _el = $(v).parents(".creditFourEl");
                if (($(v).val() === _val) && _el.html() !== undefined) {
                    var _name = $(_el).find("input[data-for=cardNo]").attr("name").split(".")[0];
                    $(_el).find("input[name='"+_name+".bcardNo']").val($("input[name=bcardNo_"+ i +"]").val());
                    $(_el).find("input[name='"+_name+".reserveMobile']").val($("input[name=reserveMobile_"+ i +"]").val());
                }
            })
        }
        commit(aFlag);
	};
});
//征信预提交
function save() {
	comn.ajax({
		url: interUrl.credit.creditSubmit,
		data: {
			creditId: creditId
		},
		success: function(res) {
			if (res.data.userTasks.length > 1) {
				$("#table_3").bootstrapTable({ "clickToSelect": true });
				$("#table_3").bootstrapTable('refresh', { query: res.data });
			} else {
				//直接提交
				comn.ajax({
					url: interUrl.credit.creditSubmit2,
					data: $.extend({
						nextNodeUserId: res.data.userTasks[0].userId,
						nextNodeUserName: res.data.userTasks[0].userName
					},{ creditId: creditId }),
					success: function(res1) {
						tip({ content: res1.message });
						window.parent.cache.credit = null;
						comn.closeTab();
					}
				});
			}
		}
	});
}

//加载车行,银行信息
function loadBank(val){
	comn.ajax({
		url: interUrl.gr.bankList,
		success: function(res){
			var j, len, o, ref, str;
			str = "<option value=''>--请选择--</option>";
			ref = res.data;
			for (j = 0, len = ref.length; j < len; j++) {
				o = ref[j];
				str += "<option value='" + o.id + "'>" + o.bankName + "</option>";
			}
			return $("#bankDeraler").html(str).val(val);
		} 
	})
} 

function source(o) {
	if(!creditId){
		$("#id").val(o.id); //征信ID 
		creditId = o.id;  //征信ID 
	}
	$("#creditForm").find(".panel").eq(0).values(o); 
	$("#creditForm").find(".panel[data-for='db'], .panel[data-for='po']").remove();
	if(o.relavants && o.relavants.length > 0){
		for (var i = 0, len = o.relavants.length; i < len; i++) {
			//borrowerRelationship:  1,本人,  2,配偶,   3,担保人
			var item = o.relavants[i];
			var obj = {
                bcardNo: item.bcardNo,
                reserveMobile: item.reserveMobile,
				name: item.fullName,
				cardType: item.cardType,
				cardNo: item.cardId,
				mobile: item.mobile || "", 
				reloationShip: item.borrowerRelationship,
				guaranteeRelationship: item.guaranteeRelationship,
				id: item.id,
				maritalStatus: 1,
				file: item.creditFiles
			};
			if(item.borrowerRelationship == 1){
				$("#creditForm").find(".panel").eq(1).data("id", item.id).find(".list-inline")
				.html(imgHtml(item['creditFiles'] || "")).end().values({
					"relavants[0].fullName": item.fullName || "",
					"cardType2": item.cardType || "",
					"relavants[0].cardType": item.cardType || "",
					"relavants[0].cardId": item.cardId || "",
					"relavants[0].mobile": item.mobile || "",
					"relavants[0].id": item.id || "",
					"relavants[0].bcardNo": item.bcardNo || "",
					"relavants[0].reserveMobile": item.reserveMobile || "",
					"file": item.creditFiles || ""
				}); 
			}else if(item.borrowerRelationship == 2){
				obj['maritalStatus'] = 1;
				build(obj); 
			}else{ //担保人/反担保人 
				obj['maritalStatus'] = null;
				build(obj); 
			}
		} 
	}
	$("#cardType").change();
}

$(function () {
	tableConfig = JSON.parse(JSON.stringify(comn.table));
	tableConfig["height"] = "auto";
	try {
		$("input[name=bzGroupName]").val(comn.user.bzGroupName); //赋值业务小组
		$("input[name=realname]").val(comn.user.realname); //赋值客户经理 
	} catch (e) {
		/* handle error */
	}

	if(args['releventFlowNode']){ $("#revoke").removeClass("hide"); }

	if(args['type'] == '4'){ //车果推送过来的客户; 2017-11-15开始不再执行type=4时的接口数据，因为车国C端无法提供订单编号（dealerOrder），B端能提供，故作废type=4
		var o = window.parent.cache.credit;
		comn.ajax({
		  url: interUrl.gr.orderCredit,
		  data: {
			orderNo: o.dealerOrder
		  },
		  success: function(res){
			var obj = res.data;
			source(obj);
			$("#creditForm").values(obj);
			if(obj.cardType == "1") {
                $("#cardNo").addClass("idCard");
			} else {
                $("#cardNo").removeClass("idCard");
			}
			$("#creditForm").find(".panel").eq(1).find(":input[data-for]").each(function(){
				var forName = $(this).data("for");
				return this.value = obj[forName] || "";
			});
		  } 
		}) 
		loadBank(); 
	}else if(args['type'] == '2'){ //客户导入进来的 
		comn.ajax({
		  url: interUrl.customer.get,
		  data: {
			id: args['importId'] || args["id"]     //如果页面不存在importId 则取id（id为车果客户过来数据，2017-11-15开始实施）
		  },
		  success: function(res) {
			var cus = res.data; 
			delete cus.id;
			$(".panel").find(":input[data-for]").each(function(){
				var forName = $(this).data("for");
				return this.value = cus[forName] || "";
			});
		   $("#creditForm").values(res.data);
              if(cus.cardType == "1") {
                  $("#cardNo").addClass("idCard");
              } else {
                  $("#cardNo").removeClass("idCard");
              }
		  }
		});
		loadBank(); 
	}else{
		var caCreditId = null;
		try {
			caCreditId = window.parent.cache.creditId; 
		} catch (e) {
			/* handle error */
		}
		if(args['creditId'] || caCreditId){
			creditId = args['creditId'];
			if(creditId){ $("#id").val(creditId); }
			comn.ajax({
				url: interUrl.credit.creditInfo,
				data: {
					id: args['creditId'] || caCreditId
				},
				success: function(res){
					var o = res.data;
					if(caCreditId){ 
						delete o.id;
						$.each(o.relavants, function(i, item){
							delete item.id;
							delete item.creditId
								$.each(item.creditFiles, function(i, o){
									delete o.id;
									delete o.creditRelavantId; 
								});

						})
						window.parent.cache.creditId = null;
					}
					source(o);
					//获取征信发起的位置:creditSource=3车商订单管理 ||creditSource=2 资信管理
					var creditSource=args["creditSource"];
					// console.log(creditSource);
					if(creditSource==2){
						$("select[name=source]").val(2)
					}else if(creditSource==3){
						$("select[name=source]").val(3)
					}
					// $("input[name=source]").val(creditSource);
					loadBank(o.inquryBankId);
					$("#creditType").trigger("change");
				}
			})
		}else{ loadBank(); }
	}


	// $(":input[name='customerName'], :input[name='cardNo']", $("#creditForm")[0]).keyup(function(){
	// 	$(":input[data-for='" + this.name + "']", $("#creditForm .panel")[1]).val(this.value);
	// })
	$(":input[name='customerName'], :input[name='cardNo']", $("#creditForm")[0]).bind("input propertychange",function(){
		$(":input[data-for='" + this.name + "']", $("#creditForm .panel")[1]).val(this.value);
	})

	$(":input[name='cardType']").change(function(){
    	$("#creditForm").find(".panel").eq(1).find(":input[data-for='" + this.name + "']").val(this.value);
    });
    $(document).on("change", ":input[data-for='cardType']", function(){
    	if($(this).val() == "1") {
    		$(this).parents(".panel").find(":input[data-for='cardNo']").addClass("idCard");
    	} else {
            $(this).parents(".panel").find(":input[data-for='cardNo']").removeClass("idCard").next().remove();
            $(this).parents(".panel").find(":input[data-for='cardNo']").parent().parent().removeClass("has-error");
            //$(this).parents(".panel").find(":input[data-for='cardNo']").next().hasClass("error").remove();
    	}
    });
    if($("#cardType").val()==1){
        $("input[data-for=cardType]").val(1);
    }
	$(document).on("click", ".loanStart3", function() {
		var o = $("#table_3").bootstrapTable('getSelections')[0];
		comn.ajax({
			async: false,
			url: interUrl.credit.creditSubmit2,
			data: {
				creditId: creditId,
				nextNodeUserId: o.userId,
				nextNodeUserName: o.userName
			},
			success: function(res) {
				$("#task").modal("hide");
				tip({ content: res.message });
				window.parent.cache.credit = null;
				comn.closeTab();
			}
		});
	}).on('click', '#creditForm .deleted', function (e) {
		//删除担保人 
		var $el = $(this).closest(".panel");
		if($el.data("id")){
			$("#delGuarantee").modal("show"); 
			$("#delGuarantee").find(".delBtn").unbind("click").click(function(){
					comn.ajax({
						url: interUrl.credit.delRelavant,
						data: {
							id: $el.data("id")
						},
						success: function(res){
							$("#delGuarantee").modal("hide");
							$el.remove(); 
							indexSort(); 
						} 
					}); 
			});
		}else{
			$el.remove(); 
			indexSort(); 
		}
	}).on('click', '.imgItem', function (e) {
		$(".currentImg").removeClass("currentImg");
        $(this).addClass("currentImg");
		//触发上传图片
		$(this).parent().parent().parent().find("input[type='file']").trigger("click");

	}).on('change', 'select[data-for="guaranteeRelationship"]', function (e) {
		//担保关系人
		$(this).closest(".panel[data-for='db']").find(".panel-title").text(this.value == '2' ? "反担保人" : "担保人")
	});

	//客户列表选择
	$("#customerBtn").click(function(){
		$tableBT = $("#table").bootstrapTable(tableConfig);
		$(this).unbind("click");
	});

	//主贷人关联选择
	var mainCreditFlag = false;
	$("#mainCreditIdBtn").click(function(){
		$("#mainCredit input").val("");
		if (mainCreditFlag){
			$("#table2").bootstrapTable('refresh', {});
		} else {
			$("#table2").bootstrapTable(tableConfig);
			mainCreditFlag = true;
		}
	});

	//增加反担保人
	$("#addParty").click(function(){
		var dbCount = $(".panel[data-for='db']").length;
		if(dbCount < 5) {
			build();  //默认为担保人
		}else{
			tip({content: "最多只能添加5个担保人!"});
		}
	});

	//已婚/未婚选择
	$("#maritalStatus").change(function(){
        var $el = $("#creditForm").find(".panel[data-for='po']"),
            length = $el.length, $id = $el.data("id");
        if (this.value == "1" && $id) {
        	$el.show();
		} else if ($id) {
            $el.hide();
		} else if( this.value == "1" ) {
            build({ maritalStatus: 1 });
        } else {
            $el.remove();
		}

		// if(this.value == "1"){
		// 	build({ maritalStatus: 1 });
		// }else{
		// 	var $el = $("#creditForm").find(".panel[data-for='po']"),
		// 		length = $el.length, $id = $el.data("id");
		// 	if(length && $id){
		// 		comn.ajax({
		// 			url: interUrl.credit.delRelavant,
		// 			data: { id: $id },
		// 			success: function(res){
		// 				$el.remove();
		// 				var o = $("#creditForm").find(".panel").eq(0).values();
		// 				if(args['type'] == 2){
		// 				  o['importId'] = args['importId'];
		// 				}
		// 				o['id'] = creditId;
		// 				comn.ajax({
		// 					url: interUrl.credit.creditAdd,
		//					data: $.extend(o,{source:args['creditSource']}),
		// 					success: function(res){ }
		// 				})
		// 			}
		// 		});
		// 	}else{
		// 		$el.remove();
		// 	}
		// }
	});

	//调查银行
	$("#bankDeraler").change(function (e) {
		var text = $(this).find("option:selected").text();
		$("#inquryBank").val(text);
	});

	//征信主体
	$("#creditType").change(function (e) {
		if ($(this).val() == "1") {
			$("#relationship").addClass("hide").find(".mainCreditId").prop("disabled", "disabled");
		} else {
			$("#relationship").removeClass("hide").find(".mainCreditId").prop("disabled", "");
		}
	});

	//关闭
	$("#cancel").click(function () {
        comn.closeTab();
    });

	//上传文件
	$(document).on('change', 'input:file', function () {
		var _this = this;
        handelIMG();
		// function saveItem() {
		// 	var o = $(_this).closest(".panel").values(), data = {};
		// 	for (k in o) {
		// 	  var key = k.substring(k.indexOf(".") + 1, k.length)
		// 	  data[key] = o[k];
		// 	}
		// 	data['creditId'] = creditId;
        //
		// 	if(!data.cardType){ return tip({content: "证件类型不能为空! "}) }
		// 	if(!data.borrowerRelationship){ return tip({content: "借款人关系不能为空! "}) }
        //
		// 	comn.ajax({
		// 		url: interUrl.credit.addRelavant,
		// 		data: data,
		// 		async: false,
		// 		success: function(res){
		// 			var _index = $(_this).closest(".panel").index(), o = res.data[0];
		// 			$(_this).closest(".panel").data("id", o.id)
		// 			.find("input[name='relavants[" + _index + "].id']").val(o.id).closest(".panel");
		// 			//.find("ul ").html("").append(imgHtml(o.creditFiles, _index));
         //            //$(".currentImg").html(replaceImgHtml(o.creditFiles, _index));
		// 			handelIMG(o.id);
		// 		}
		// 	})
		// }
		function handelIMG(dbID) {
			var _index = $(_this).closest(".panel").index();
			var fileArr = _this.files, file, results = [];
			for (var i = 0, len = fileArr.length; i < len; i++) {
				file = fileArr[i];
				base64(file, i, function(f, o, index){
					upIMG({
                        //"creditRelavantId": dbID,
						"remark": $(".currentImg").attr("data-remark"),
						"creditFile": f.name,
						"fileContent": o
					}, function(obj, i){
						$(_this).parent().children(".list-inline").find(".currentImg").removeClass("imgItem").html("").append(replaceImgHtml([{
							creditFile: obj.creditFile,
							id: obj.id,
							remark: obj.remark
						}], _index, $(".currentImg").attr("data-remark")));
					}, i);
				}) 
			} 
		}

		function upIMG(o, callback, i) {
			comn.ajax({
				url: interUrl.credit.addCreditFile,
				data: o,
				success: function(res){
					if(typeof(callback) == "function"){ callback(res.data, i); }
				}
			})
		}
        //
		// function handle() {
		// 	var dbID = $(_this).closest(".panel").data("id");
		// 	if(!dbID){
		// 		saveItem(); //单个保存然后批量上传文件
		// 	}else{ handelIMG(dbID); }
		// }
        //
		// if(!creditId){
		// 	var o = $("#creditForm").find(".panel").eq(0).values();
		// 	if(!o.inquryBankId) {
		// 		$(this).val("");
		// 		return tip({content: "请先选择调查银行!"});
		// 	}
		// 	if(args['type'] == 2){
		// 	  o['importId'] = args['importId'];
		// 	}
		// 	comn.ajax({
		// 		url: interUrl.credit.creditAdd,
		// 		async: false,
		// 		data: $.extend(o,{source:args["creditSource"]}),
		// 		success: function(res){
		// 			creditId = res.data.id;
		// 			$("#id").val(creditId);
         //    handle();
		// 		}
		// 	})
		// }else{ handle(); }
	}); 

	//删除征信文件
	$(document).on('click', '.list-inline a', function (e) {
		var _this = this, imgId = $(this).data("id");
		if(imgId){
		  comn.ajax({
			  url: interUrl.credit.delCreditFile,
			  data: {
				  id: imgId
			  }, 
			  success: function(res){
                  $(_this).closest("li").parent().addClass("imgItem").removeClass("loadImg currentImg").html("").append("<span class='addImg'></span>");
				  //$(_this).closest("li").remove();
				  tip({content: "删除成功! "});
			  }
		  })
		}else{
            $(_this).closest("li").parent().addClass("imgItem").removeClass("loadImg currentImg").html("").append("<span class='addImg'></span>");
            //$(_this).closest("li").remove();
            tip({content: "删除成功! "});
		}
	});
	//获取征信发起的位置:creditSource=3车商订单管理 ||creditSource=2 资信管理
	var creditSource=args["creditSource"];
	if(creditSource==2){
		$("select[name=source]").val(2)
	}else if(creditSource==3){
		$("select[name=source]").val(3)
	}
	// $("input[name=source]").val(creditSource);
    //获取订单编号
    $("input[name=serialNumber]").val(args["serialNumber"]);
	//提交，保存
    /**
	 * 保存之前先校验是否已婚，如已婚到未婚则需删除配偶关系再做保存
     */
	$("#preservation, #save").click(function(){
        var val = $(this).attr('val');
        var $el = $("#creditForm").find(".panel[data-for='po']"),
            length = $el.length, $id = $el.data("id");
        if($("#maritalStatus").val() !== "1" && length && $id) {
        	$el.remove();
            indexSort();
            comn.ajax({
                url: interUrl.credit.delRelavant,
                data: {id: $id},
                success: function (res) {
                    saveCredit(val);
                }
            });
        } else {
            saveCredit(val);
		}
	});
	function saveCredit(val) {
        $("#cardFlag").val(""); //只在三要素不通过时插入值调取四要素
        var flag = creditId;
        for (var i = 0; i < $(".list-inline").length; i++) {
            if($(".list-inline:eq("+ i+")").find(".uploadFile:eq(0)").children(".putImg").children().html() == "") {
                return tip({content: "请先上传"+ $(".list-inline:eq("+ i+")").parents(".panel").find(".panel-title").html() +"身份证人像面照片！"});
            }
        }
        if($("#creditForm").valid() && $("input[name=estimateLoanAmount]").val()>0){
            if(flag){
                comn.ajax({
                    url: interUrl.credit.creditPreAdd, //征信发起校验接口
                    data: $.extend($("#creditForm").values(),{source: args['type'] == "4" ? $("input[name=source]").val() : args["creditSource"]}),
                    success: function(res){
                        if(res.code === 10000) {
                            oppSureModal("是否确认" + (val == 0 ? "提交" : "保存"));
                            $("#sureOption").unbind("click").click(function () { commit(val); });
                        }else if(res.code === 20000) {
                            oppSureModal(res.message);
                            $("#sureOption").unbind("click").click(function () {
                                $("#sureModal").modal("hide");
                            });

                        } else if(res.code === 20001) {
                            oppSureModal(res.message);
                            $("#sureOption").unbind("click").click(function () {
                                commit(val);
                            });
                        }
                    }
                })
            }else{
                oppSureModal("是否确认"+(val == 0 ? "提交" : "保存"));
                $("#sureOption").unbind("click").click(function () { commit(val); });
            }
        }else if($("input[name=estimateLoanAmount]").val()<=0){
            tip({
                content:"预估金额必须大于0"
            })
        }
	}

	$(document).on("change", "#cardType, [data-for='cardType']", function (e) {
		if(this.value == "1"){
			$(this).closest(".panel").find("#cardNo,[data-for='cardNo']").addClass("idCard"); 
		}else{
			$(this).closest(".panel").find("#cardNo").removeClass("idCard"); 
		}
	});
	$(document).on("click", "#btn-search2", function(){
		$("#table2").bootstrapTable('refresh', {});
	});
	$("#revoke").click(function() { //撤销征信申请
		oppSureModal("是否确认撤销");
		$("#sureOption").unbind("click").click(function () {
			$("#sureModal").modal("hide");
			comn.ajax({
				async: false,
				url: interUrl.credit.cancel,
				data: {creditId : args['creditId']},
				success: function(res) {
					tip({ content: res.message });
					window.parent.cache.credit = null;
					comn.closeTab();
				}
			});
		});

	});

});
