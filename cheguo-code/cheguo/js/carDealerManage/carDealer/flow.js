/**
新增车商路程节点
发起新增车商                CAR_DEALER_LAUNCH
区域经理审核                CAR_DEALER_REGIONAL_MANAGER
分公司总经理审核            CAR_DEALER_GENERAL_MANAGER
汽车金融部                  CAR_DEALER_CAR_FINANCE
分公司财务                  CAR_DEALER_ACCOUNTING_ASSISTANT
分公司出纳                  CAR_DEALER_BRANCH_CASHIER
 */
var args, currentNode, table_sign, argsBopInfoId, dealerId, dealerName,dataLoad_1, handle_1, tableEvent_1, dataLoad_fee, handle_fee, tableEvent_fee, dataLoad_user, isManager, gpsNumber;
//获取参数
args = comn.getArgs();
//console.log(args)
//console.log(args.releventFlowNode)


//车商id
dealerId = args["dealerId"];
argsBopInfoId = {bopInfoId: args['bopInfoId']};
currentNode = args['releventFlowNode'];
var pictures = document.querySelector('#carDealerForm');
var options = {
	url: 'data-src',
	title: true,
	transition: false,
	build: function (e) {},
	built: function(e){},
	show:  function (e) { 
		window.parent.toggleTopNav();
	},
	hide: function(e){ 
		window.parent.toggleTopNav();
	}
};
var type = args['type'];
//修改表格统一配置参数
var tableConfig = $.extend(JSON.parse(JSON.stringify(comn.table)), {
	'height': '300',
	'pagination': false
});

$(function () {
	//分公司会计助理节点 type=3  可修改费用信息
	$("#flowTitle").text(args['currentNodeName']);
	if (currentNode == "CAR_DEALER_REGIONAL_MANAGER" || currentNode == "CAR_DEALER_LAUNCH") {  //流程节点功能功能处理 
		$("#carDealerForm fieldset")[0].disabled = false; //发起新增车商,区域经理审核  允许添加 
		$("#addFee-btn").show(); 
	}
});

//获取车商基本信息
comn.ajax({
    url: interUrl.carDealer.get,
    data: {
        dealerId: dealerId
    },
    success: function (res) {
        $("select[name=cannelBankId]").getBank(res.data.cannelBankId);
        $("#dealerGroupId").getDealerGroup(res.data.dealerGroupId);
        //如果车商类型是1 则把经销商名称disable， 否则显示经销商名称
        res.data.carDealerType === 1 ? $("#employDealerName, #employDealerId").prop("disabled", "disabled") : $("#isDealerName").removeClass("hide");
        //res.data.carDealerType === 1 ? $("#isBank").removeClass("hide"):$("#cannelBankName, #cannelBankId").prop("disabled", "disabled") ;
        res.data.isDealerGroup === 1  ? $("#isDealerGroup").removeClass("hide") : "";
        if (res.data.cannelStatus === 1) {
            $("#isBank").removeClass("hide")
        } else if (res.data.cannelStatus === 2) {
            $("#isBranchMarketing").removeClass("hide");
            $("select[name=cannelBankId],input[name=cannelBankName]").prop("disabled", "disabled");
        } else if (res.data.cannelStatus === 3) {
            $("#isDealerGroup").removeClass("hide");
            $("select[name=cannelBankId],input[name=cannelBankName]").prop("disabled", "disabled");
        } else {
            $("select[name=cannelBankId],input[name=cannelBankName]").prop("disabled", "disabled");
        }
        if (res.data.province != "" || res.data.province != null) {
            $("#province_1").getProvinceC({
                code: res.data.province,
                value: res.data.provinceName
            }, $("#province_1").is(":disabled"));
            $("#city_1").getCityC(res.data.province, {
                code: res.data.city,
                value: res.data.cityName
            }, $("#city_1").is(":disabled"));
            $("#area_1").getAreaC(res.data.city, {
                code: res.data.area,
                value: res.data.areaName
            }, $("#area_1").is(":disabled"));
        }
        $("#carDealerForm").values(res.data);
        getDocumentList(dealerId, 801, "see");
        getDocumentList(dealerId, 802, "see");
        getDocumentList(dealerId, 803, "see");
        getDocumentList(dealerId, 804, "see");

        //车商评分部分
        $("#scoreTab").show();
        getCarDealerScore({dealerName: res.data.dealerName});
        getCarDealerScoreLatestSixMonth({dealerName: res.data.dealerName});
        dealerName = res.data.dealerName;
        var dataArr =[["#dealerGrade", "DealerGrade", res.data.dealerGrade]];
        $.getCommonMethodPort(dataArr);
    }
});


//基本信息-账户信息
dataLoad_1 = function (params) {
    var p;
    p = params.data;
    p["dealerId"] = dealerId;
    tableData(params, $.extend($("#searchForm").values(), p), interUrl.carDealer.accountList);
};

//初始化账户表格
$("#table_account").bootstrapTable(tableConfig);

$(function () {
	$("#feeSearch").click(function(){
		$("#feeTable").bootstrapTable('refresh', {url: '...'}); 
	});
});

//费用信息
dataLoad_fee = function (params) {
	tableData(params, $.extend($("#feeFormSearch").values(), {
		'dealerId': dealerId || $("#dealerId").val()
	}), interUrl.carDealer.fee);
};

tableEvent_fee = {
    "click .modify": function (e, a, item, index) {
        $("#feeBox").show();
        getFeeInfo(item['id'], "modify");
        //修改启用表单
        $("#feeFieldset").removeAttr("disabled");
        $("#gpsNumber").trigger('change');
    },
    "click .see": function (e, a, item, index) {
        $("#feeBox").show();
        window.location.href="#feeBox";
        getFeeInfo(item['id'], "see");
        //查看禁用表单
        $("#feeFieldset").attr("disabled", "disabled");
    }
};

handle_fee = function (value, row, index) {
    var modify = (currentNode == "CAR_DEALER_REGIONAL_MANAGER" || currentNode == "CAR_DEALER_LAUNCH") ? "<li><a class='modify'>修改</a></li>" : null;
    var see = "<li><a class='see'>查看</a></li>";
    return ["<div class='btn-group btn-group-xs'>",
			"<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
			"<span class='caret'></span>",
			"<span class='sr-only'>下拉切换</span>",
			"</button>",
			"<ul class='dropdown-menu' role='menu'>", modify, see, "</ul>", "</div>"].join("");
};

//获取车商费用信息
function getFeeInfo(feeId, option) {
    comn.ajax({
        url: interUrl.carDealer.feeGet,
        data: {
            feeId: feeId
        },
        success: function (res) {
            $("#feeForm").values(res.data);
            $("#rebateType").trigger("change");
            res.data.c1 == 0 ? $("input[name=c1]").prop("checked",false) : $("input[name=c1]").prop("checked","checked");
            res.data.c2 == 0 ? $("input[name=c2]").prop("checked",false) : $("input[name=c2]").prop("checked","checked");
            res.data.c3 == 0 ? $("input[name=c3]").prop("checked",false) : $("input[name=c3]").prop("checked","checked");
            res.data.c4 == 0 ? $("input[name=c4]").prop("checked",false) : $("input[name=c4]").prop("checked","checked");
            res.data.c5 == 0 ? $("input[name=c5]").prop("checked",false) : $("input[name=c5]").prop("checked","checked");
            res.data.c6 == 0 ? $("input[name=c6]").prop("checked",false) : $("input[name=c6]").prop("checked","checked");
            res.data.c7 == 0 ? $("input[name=c7]").prop("checked",false) : $("input[name=c7]").prop("checked","checked");
            res.data.c8 == 0 ? $("input[name=c8]").prop("checked",false) : $("input[name=c8]").prop("checked","checked");
            res.data.c9 == 0 ? $("input[name=c9]").prop("checked",false) : $("input[name=c9]").prop("checked","checked");
            // getDocumentList(feeId, 803, option);
            // getDocumentList(feeId, 804, option);
            pdGps(res.data.gpsNumber);
        }
    });
}


//保存车商基本资料
$("#save-baseInfo").on("click", function () {//点击提交
    $("#carDealerForm").validate();
    if ($("#carDealerForm").valid() == true) {
        var data = $("#carDealerForm").values();
        var _url, _message, isManagerC = false;
        if (dealerId || $("#dealerId").val()) {
            _url = interUrl.carDealer.update;
            _message = "修改成功!"
        } else {
            _url = interUrl.carDealer.add;
            _message = "新增成功";
            isManagerC = true;
        }
        comn.ajax({
            url: _url,
            data: $.extend(data, {id: args['dealerId']}),
            success: function (res) {
                if (res.data) {
                    uploadImg(args['dealerId'], 801);
                    uploadImg(args['dealerId'], 802);
                    $("#dealerId").val(res.data);
                }
                if (isManagerC) {
                    isManager = true;
                }
                tip({content: res.message || _message});
            }
        });
    }

});

//费用信息

//获取合作银行
//$("#bankId").getBank();

//添加费用
$("#addFee-btn").click(function () {
    $("#feeBox").show();
    $("#feeId").val("");//hyn
    $("#feeBoxPanel").html("添加费用信息");
    $("#resetFeeForm").trigger("click");
    if ($("#feeFieldset:disabled")) {
        $("#feeFieldset").removeAttr("disabled");
    }
	window.location.href="#feeBox";
    // $("#fileType_803,#fileType_804").html("");
});

//返利方式控制返利名称
$("#rebateType").change(function () {
    var val = $(this).val();
    var flfs = $("#flfs");
    if (val == "1") {
        flfs.html("<span class=\"text-danger\">*</span>营销费(%):");
    } else if (val == "2") {
        flfs.html("<span class=\"text-danger\">*</span>营销费上限(%):");
    }
});

//判断代收费用
function pdFee(a, b) {
    return $("[name='" + a + "']").change(function () {
        var _this = $(this);
        if (_this.val() == 1) {
            $("[name='" + b + "']").attr("readonly", true).val(0);
        } else {
            $("[name='" + b + "']").removeAttr("readonly");
        }
    });
}
pdFee("agencyFee1Type", "agencyFee1");
pdFee("agencyFee2Type", "agencyFee2");
pdFee("otherFeeType", "otherFee");

// 判断gps台数
function pdGps(gpsNumber){console.log(gpsNumber);
    var g = $("#gpsInstallationFee");
    var l = $("#liabilityAmount");
    var gpsType=$("#gpsType");
    var gpsFactory = $("#gpsFactory");
    if (gpsNumber == 0) {
        gpsType.attr({disabled:"disabled","readonly":true}).removeAttr("required").val("0");
        g.attr("readonly", true).val(0).removeAttr('required');
        l.attr("readonly", true).val(0).removeAttr('required');
        gpsFactory.attr("readonly",true).val("").removeAttr('required');
    } else {
        gpsType.removeAttr("disabled readonly").attr('required', 'required');
        g.removeAttr("readonly").attr('required', 'required');
        l.removeAttr("readonly").attr('required', 'required');
        gpsFactory.removeAttr("readonly").attr('required', 'required');
    }
}
//GPS
$("#gpsNumber").change(function () {
    var _this=$(this);
    if (_this.val() == 0) {
        gpsNumber == 0;
        pdGps(_this.val());
    } else {
        gpsNumber = _this.val();
        pdGps(_this.val());
    }
});

$("#bankId").change(function () {
    if (this.value) {
        $("#bankName").val($(this).find('option:selected').text());
    }
});

//新增、修改费用保存
$("#save-fee").click(function () {
    $("#feeForm").validate();
    if ($("#feeForm").valid() == true) {
        var feeId = $("#feeId").val();
        var _url, _message;
        if (!feeId) {
            _url = interUrl.carDealer.feeAdd; //新增
            _message = "添加成功!";
        } else {
            _url = interUrl.carDealer.feeUpdate;  //修改
            _message = "修改成功!";
        }
        comn.ajax({
            url: _url,
            data: $.extend($("#feeForm").values(), {carDealerId: dealerId || $("#dealerId").val()}, {currentNode: currentNode}),
            success: function (res) {
                tip({content: res.message || _message});
                $("#feeBox").hide();
                $("#feeTable").bootstrapTable("refresh");
            }
        });
    }

});

//管理团队

//获取所在机构下拉,用户角色下拉
$("#orgId").getOrg();
$("#roleId").getRuleList();

//团队信息-人员列表
dataLoad_user = function (params) {
    var p;
    p = params.data;
    p["dealerId"] = dealerId;
    tableData(params, p, interUrl.carDealer.manager);
};

$("#userTable").bootstrapTable(tableConfig);

//图片部分
base64 = function (file, index, callback) {
    return lrz(file).then(function (rst) {
        var imgRst;
        imgRst = rst.base64;
        return typeof callback === "function" ? callback(file, imgRst, index) : void 0;
    });
};

//图片上传
$(".upImage").click(function () {
    var _this = $(this);
    var _type = _this.attr("data-type");
    if (_type == 803 || _type == 804) { //费用信息
        $("#feeForm").validate();
        if ($("#feeForm").valid() == true) {
            var feeId = $("#feeId").val();
            //如果是修改
            if (feeId) {
                _this.parent("div").find(".upImageInput").trigger("click");
                return;
            } else {
                //tip({content:"请先检查并保存费用信息"});
                comn.ajax({
                    url: interUrl.carDealer.feeAdd,
                    data: $.extend($("#feeForm").values(), {carDealerId: dealerId || $("#dealerId").val()}, {currentNode: currentNode}),
                    success: function (res) {
                        $("#feeId").val(res.data);
                    }
                });
            }
            _this.parent("div").find(".upImageInput").trigger("click");
        }
    }

});
$(".upImageInput").change(function () {
    var _this = $(this);
    var _type = _this.attr("data-type");
    var fileArr, html, i, j, k, len, results;
    fileArr = this.files;
    results = [];
    for (k = j = 0, len = fileArr.length; j < len; k = ++j) {
        i = fileArr[k];
        html = "";
        results.push(base64(i, k, function (f, o, index) {
            var _index = $("#fileType_" + _type).find("li").length;
            html = ["<li>",
				"<input name='LoanDocuments[" + _index + "].filePath' value="+ o +" />",
				"<input name='LoanDocuments[" + _index + "].fileName' data-name='fileName' class='hide' value='" + f.name + "' />",
				"<a href='javascript:;'>" + f.name + "</a>",
				"&nbsp;<a href='javascript:;' class='upCancle'>删除</a>",
			"</li>"].join("");
            $("#fileType_" + _type).append(html);
            var id;
            if (_type == '803') {
                id = $("#feeId").val();
                uploadImg(id, 803);
            } else if (_type == '804') {
                id = $("#feeId").val();
                uploadImg(id, 804);
            }
        }));
    }
    return results;
});


//删除图片  delDocument
$(".files-ul").on("click", ".upCancle", function () {
    var _this, _type, ul, fileId;
    _this = $(this);
    _type = _this.parents("ul").attr("data-type");
    ul = _this.parents("ul");
    fileId = _this.parent("li").attr("data-id");
    comn.ajax({
        url: interUrl.gr.delDocument,
        data: {
            fileNamespace: "CAR_DEALER",
            documentIds: fileId,
            dirId: _type,
            releventFlow: "CAR_DEALER_ADD_FLOW",
            releventFlowNode: "CAR_DEALER_LAUNCH"
        },
        success: function (res) {
            _this.parents("li").remove();
            _this.parents("ul").prev("div").find(".upImageInput").val("");
            ul.find("li").each(function (index) {
                //$(this).find("[data-name='filePath']").attr("name", "LoanDocuments[" + index + "].filePath");
                $(this).find("[data-name='fileName']").attr("name", "LoanDocuments[" + index + "].fileName");
            });
        }
    });

});
function imgHtml(obj, _type, id) {
    //console.log("length------"+obj.length)
    for (var j = 0; j < obj.length; j++) {
        var o = obj[j];
        var _name= "", _icon = "";
        if (Number(o.fileKey)) {
            if (_type === 801) {
                _name = "营业执照";
                _icon = "busLicence"
            } else {
                switch (Number(o.fileKey)) {
                    case 1:
                        _name = "正面整体";
                        _icon = "busPlace_01";
                        break;
                    case 2:
                        _name = "左前侧面";
                        _icon = "busPlace_02";
                        break;
                    case 3:
                        _name = "右前侧面";
                        _icon = "busPlace_03";
                        break;
                    case 4:
                        _name = "内部正面";
                        _icon = "busPlace_04";
                        break;
                    case 5:
                        _name = "内部正面";
                        _icon = "busPlace_04";
                        break;
                    case 6:
                        _name = "内部正面";
                        _icon = "busPlace_04";
                        break;
                    default:
                        break;
                }
            }
        }
        if (o.filePath && o.fileKey) {
            var html = "";
            html = [
                "<div class='putImg "+ _icon +" loadImg' data-type='"+ _type +"' data-img='"+ _icon +"' data-remark='"+ o.fileKey +"'>",
                "<li data-id='"+ (o.id || '') +"'>",
                "<img src='" + o.filePath + "?x-oss-process=image/resize,h_57' height='57' data-src='" + o.filePath + "' />",
                "</li>",
                "</div>"
            ].join("");
            $("#fileType_" + _type +" [data-remark="+ o.fileKey+"]").replaceWith(html);
        } else {
            console.log("j:"+j)
            var _html = "";
            var del = (['2', '3', '4', '5'].indexOf(type) == -1) ? "<a href='javascript:;' class='upCancle'>删除</a>" : "";
            var _html = "<li class='loaded' data-id='" + o.id + "'>" +
                "<img class='img showImg img-thumbnail' src='" + o.filePath + "?x-oss-process=image/resize,h_57' o.filePath='" + o.filePath + "' height='57' style='height:57px' data-src='" + o.filePath + "' data-toggle='tooltip' title='上传时间(" + o.createTime + ")' alt='上传时间(" + o.createTime + ")' />" +
                "<div class='text-center'>" + del + "</div>" +
                "</li>";
            $("#fileType_" + _type).append(_html);
        }
    }
}

//获取图片
function getDocumentList(id, _type, opttion) {
    var result = "", del = "";
    if (_type == "803" || _type == "804") {
        del = (args['type'] == '3' && opttion == 'modify') ? "<a href='javascript:;' class='upCancle'>删除</a>" : "";
    }
    comn.ajax({
        url: interUrl.gr.documentList,
        data: {
            fileNamespace: "CAR_DEALER",
            loanApplyId: id,
            dirId: _type,
            releventFlow: "CAR_DEALER_ADD_FLOW",
            releventFlowNode: "CAR_DEALER_LAUNCH"
        },
        success: function (res) {
            if (_type === 801 || _type === 802) {
                imgHtml(res.data, _type, id)
            } else {
                var del = (['2', '3', '4', '5'].indexOf(type) == -1) ? "<a href='javascript:;' class='upCancle'>删除</a>" : "";
                var i, list = res.data;
                for (i = 0; i < list.length; i++) {
                    var o = list[i];
                    result += "<li class='loaded' data-id='"+ o.id+"'>" +
                        "<img class='img showImg img-thumbnail' src='" + o.filePath + "' height='57' style='height:57px' data-src='" + o.filePath + "' data-toggle='tooltip' title='上传时间("+ o.createTime +")' alt='上传时间("+ o.createTime +")' />" +
                        "<input name='LoanDocuments[" + i + "].fileName' data-name='fileName' class='hide' value='" + o.fileName + "' />" +
                        "<div class='text-center'>"+ del +"</div>"+
                        "</li>";
                }
                $("#fileType_" + _type).html(result);
            }

            $('[data-toggle="tooltip"]').tooltip();
			setTimeout(function(){
				viewer = new Viewer(pictures, options);
			}, 1000);
        }
    });
}

//上传图片
function uploadImg(id, _type) {
    var $tr, $trAll;
    $tr = $("#fileType_" + _type).find("li:not('.loaded')");
    $trAll = $("#fileType_" + _type).find("li");
    comn.ajax({
        url: interUrl.gr.uploadImage,
        data: $.extend($tr.values(), {
            fileNamespace: "CAR_DEALER",
            loanApplyId: id,
            dirId: _type,
            releventFlow: "CAR_DEALER_ADD_FLOW",
            releventFlowNode: "CAR_DEALER_LAUNCH"
            //"LoanDocuments[0].filePath": $tr.find("img").attr("src")
        }),
        success: function (res) {
            $tr.addClass("loaded").attr("data-id", res.data[0]);
        }
    });
}

//流程部分

//判断显示提交还是退回
$("input[name='conclusion']").on('click', function () {
    var checkedV = $("input[name='conclusion']:checked").val();
    if (checkedV == 1) {
        $("#btn-opinion-save").show();
        $("#btn-loanReview-back").hide();
        if(type=="2" || type=="4"){
            $("#btn-laugh-back").hide();
        }
    } else {
        $("#btn-opinion-save").hide();
        $("#btn-loanReview-back").show();
        if(type=="2" || type=="4"){
            $("#btn-laugh-back").show();
        }
    }
});


//汽车金融部节点才能修改车商等级
function isChangeCarLevel() {
    if(args.releventFlowNode === 'CAR_DEALER_CAR_FINANCE') {
        $("#productLevel").parent().parent('fieldset').prop("disabled", "")
    }    
}
isChangeCarLevel();
//提交下一步
$("#btn-opinion-save").click(function () {
    if(args.releventFlowNode === 'CAR_DEALER_CAR_FINANCE') {
        $("#carDealerForm").validate();
        var isTrue = $("#carDealerForm").valid()
        if(!isTrue){
            return;
        }
    }
    $("#opinionForm").validate();
    if ($("#opinionForm").valid() == true) {
        oppSureModal("是否确认提交");
        $("#sureOption").unbind("click").click(function () {
            //提交时先保存车商等级和流程意见
            comn.ajax({
                url: interUrl.carDealer.updateProductLevel,
                data: {
                    dealerId: dealerId,
                    productLevel: $("#productLevel").val()
                },
                success: function (res) {
                    comn.ajax({
                        url: interUrl.common.opinion,
                        data: $.extend($("#opinionForm").values(), argsBopInfoId),
                        success: function (res) {
                            $("#sureModal").modal("hide");
                            flowSubmit(interUrl.carDealer.preSubmit, interUrl.carDealer.submit2next, './Modal/task/myTask/index.html', {dealerId: dealerId})
                        }
                    });
                }
            })

        })
    }
});


//返回上一步
$("#btn-loanReview-back").click(function () {
    oppSureModal("是否确认退回");
    $("#sureOption").unbind("click").click(function () {
        // flowBack2PreCar();
        //提交时先保存流程意见
        comn.ajax({
            url: interUrl.common.opinion,
            data: $.extend($("#opinionForm").values(), argsBopInfoId),
            success: function (res) {
                $("#sureModal").modal("hide");
                flowBack2PreCar();
            }
        });
    })
});

//退回客户经理
$("#btn-laugh-back").click(function () {
    oppSureModal("是否确认退回客户经理");
    $("#sureOption").unbind("click").click(function () {
        // carDealerBack2launch();
        //提交时先保存流程意见
        comn.ajax({
            url: interUrl.common.opinion,
            data: $.extend($("#opinionForm").values(), argsBopInfoId),
            success: function (res) {
                $("#sureModal").modal("hide");
                carDealerBack2launch();
            }
        });
    })
});


//图表-雷达图
var chart1 = document.getElementById('chart1');
chart1.style.width = "460px";
chart1.style.height = "400px";
var myChart1 = echarts.init(chart1);
myChart1.setOption({
    title: {
        //text: '车商评分是根据以下五个维度综合评估而来',
        //textAlign:'center'
    },
    tooltip: {
        trigger: 'item'
    },
    radar: [
        {
            indicator: [
                {name: '基本信息', max: 100},
                {name: '业务合作', max: 100},
                {name: '风险情况', max: 100},
                {name: '征信状况', max: 100},
                {name: '经营状况', max: 100}
            ],
            splitNumber: 5,
            name: {
                formatter: '{value}',
                textStyle: {
                    fontSize: 16
                }
            },
            axisLabel: {
                show: true
            }
        }
    ],
    series: [{
        name: '车商评分',
        type: 'radar',
        areaStyle: {
            normal: {
                color:'rgba(103,211,212,0.9)'
            }
        },
        lineStyle:{
            normal:{
                color:'#2ec7c9'
            }
        },
        itemStyle:{
            normal:{
                borderColor:"#2ec7c9"
            }
        },
        data: [
            {
                value: [0,0,0,0,0],
                name: '评分'
            }
        ]
    }]
});

function getCarDealerScore(arg) {
    comn.ajax({
        url: interUrl.carDealer.carDealerScore,
        data: arg,
        success: function (res) {
            var data = res.data;
            var entities = data.entities;
            if (entities) {
                //$("#score_tip").html("");
                var baseMap = data.baseMap, baseMap_key = [], baseMap_value = [];
                for (var key in baseMap) {
                    baseMap_key.push(key);
                    baseMap_value.push(baseMap[key])
                }
                if (entities.length >= 0) {
                    $("#itemScore1").nameValues(entities[0]);
                    $("#itemScore2").nameValues(entities[1]);
                    $("#itemScore3").nameValues(entities[2]);
                    var zh_score1=entities[0].grade.slice(0,1);
                    var zh_score2=entities[1].grade.slice(0,1);
                    var zh_score3=entities[2].grade.slice(0,1);
                    if(zh_score1==="A"){
                        $("#itemScore1").addClass('a');
                    }else if(zh_score1==="B"){
                        $("#itemScore1").addClass('b');
                    }else if(zh_score1==="C"){
                        $("#itemScore1").addClass('c');
                    }else{
                        $("#itemScore1").addClass('d');
                    }
                    if(zh_score2==="A"){
                        $("#itemScore2").addClass('a');
                    }else if(zh_score2==="B"){
                        $("#itemScore2").addClass('b');
                    }else if(zh_score2==="C"){
                        $("#itemScore2").addClass('c');
                    }else{
                        $("#itemScore2").addClass('d');
                    }
                    if(zh_score3==="A"){
                        $("#itemScore3").addClass('a');
                    }else if(zh_score3==="B"){
                        $("#itemScore3").addClass('b');
                    }else if(zh_score3==="C"){
                        $("#itemScore3").addClass('c');
                    }else{
                        $("#itemScore3").addClass('d');
                    }
                }
                myChart1.setOption({
                    series: [{
                        name: '车商评分',
                        type: 'radar',
                        data: [
                            {
                                value: baseMap_value,
                                name: '评分'
                            }
                        ]
                    }]
                });
            } else {
                $("#score_tip").html("暂无当月数据");
                $("#itemScore1").nameValues({});
                $("#itemScore2").nameValues({});
                $("#itemScore3").nameValues({});
            }

        }
    });
}

var chart2 = document.getElementById('chart2');
chart2.style.width = "800px";
chart2.style.height = "300px";
var myChart2 = echarts.init(chart2);
//图表-折线图
function getCarDealerScoreLatestSixMonth(arg) {
    comn.ajax({
        url: interUrl.carDealer.carDealerScoreLatestSixMonth,
        data: arg,
        success: function (res) {
            var data = res.data, i;
            var month = [], score = [];
            if (Object.prototype.toString.apply(data) === '[object Array]' && data.length > 0)
                for (i = 5; i >=0; i--) {
                    month.push(data[i].month);
                    score.push(data[i].score);
                }
            myChart2.setOption({
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: month,
                    axisLine:{
                        lineStyle:{
                            color:'#3598db',
                            width:2
                        }
                    },
                    axisLabel:{
                        textStyle:{
                            color:'#333'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    max:100,
                    axisLine:{
                        lineStyle:{
                            color:'#3598db',
                            width:2
                        }
                    },
                    axisLabel:{
                        textStyle:{
                            color:'#333'
                        }
                    }
                },
                series: [
                    {
                        name: '评分',
                        type: 'line',
                        stack: '总量',
                        data: score,
                        lineStyle:{
                            normal:{
                                color:'#2ec7c9'
                            }
                        },
                        itemStyle:{
                            normal:{
                                borderColor:"#2ec7c9",
                                color:'#2ec7c9'
                            }
                        }
                    }
                ]
            });
            myChart2.on('click', function (params) {
                if (params.componentType === 'series') {
                    getCarDealerScore({dealerName: dealerName, month: params.name})
                }
            });
        }
    });
}
