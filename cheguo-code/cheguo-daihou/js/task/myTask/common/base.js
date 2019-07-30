/**
* Created by hyb on 15/12/21.
*/

var args,argsBopInfoId,loanApplyId,projectId,flowUserArgs,type,table_contacter,table_guarantor,map;
//获取所需参数
args = comn.getArgs(); //getArgs
argsBopInfoId={bopInfoId:args['bopInfoId']};
args['id']=args['loanApplyId'];
loanApplyId = {loanApplyId: args['loanApplyId']};
id = {id: args['loanApplyId']};
flowUserArgs={boId:args['loanApplyId'],businessType:args['businessTypeCode'],businessGroupId:args['businessGroupId']};
type=args['type'];
projectId={projectId:args['projectId']};

//修改表格统一配置参数
var tableConfig = {};
$.map(comn.table, function (v, k) {
    tableConfig[k] = v;
});
tableConfig['height'] = "340";

//获取今天日期
function getDate(){
    var date, y, m, d,today;
    date=new Date();
    y=date.getFullYear();
    m=date.getMonth()<10?"0"+(date.getMonth()+1):date.getMonth()+1;
    d=date.getDate();
    today=y+"-"+m+"-"+d;
    return today;
}

//审批信息
function getApprovalInfo(){
    comn.ajax({
        url: interUrl.myTask.approvalInfo,
        data: loanApplyId,
        success: function(res) {
            //if(res.data.carType=='2'){
            //    $("#sc-isAdvance").show();
            //}
            if(res.data.maritalStatus!=1){
                $("#singleImg").show();
            }
            //银行直销逻辑判断  businessTypeId
            if(res.data.businessTypeId==2){
                $("#yhzx").show();
                $("#ptlc").remove();
            }
            $("#approvalInfoForm").values(res.data);
            
        }
    });
}

//基本信息-借款人信息和配偶信息
function getApprovalBaseInfo(){
    comn.ajax({
        url: interUrl.myTask.approvalBaseInfo,
        data: loanApplyId,
        success: function (res) {
            var housingStatus = res.data.housingStatus;
            var c = $("#mortgageRepayment");
            var a = "<span class='text-danger'>*</span>";

			$("#getPos").data("callback",function(BMap, map){
				var pictureIcon = new BMap.Icon("./../../../images/picture_icon.png", new BMap.Size(30,30));
				function addMarker(point){
				  var marker = new BMap.Marker(point, {icon: pictureIcon});
				  map.addOverlay(marker);
				}
				$.each(res.data.realVisitAddressItudeList, function(i, o){
					var pointArr = o.split(",");
					addMarker(new BMap.Point(pointArr[0], pointArr[1]));
				});
			});

            if (housingStatus == 2) {
                c.show().find("label").html(a + "月还款:");
            } else if (housingStatus == 3) {
                c.show().find("label").html(a + "月租:");
            } else if (housingStatus == 4) {
                c.show().find("label").html(a + "说明:");
            } else if (housingStatus == 1) {
                c.hide();
            }
            if(res.data.maritalStatus==1){
                $("#spousePanel").show();
            }
            $("#approvalBaseInfoForm").values(res.data);
            $("#getPos").data("pos", res.data.visitAddressItude);
            if(res.data.customerScore){
                if(score){
                    score(res.data.customerScore);
                }
            }
        }
    });
}


//基本信息-紧急联系人
function getContacter(){
    table_contacter = function (params) {
        var p=params.data;
        return comn.ajax({
            url: interUrl.myTask.customerContacter,
            data: $.extend(loanApplyId,p),
            success: function (res) {
                params.success({
                    'total': res.totalItem,
                    rows: res.data
                });
                return params.complete();
            }
        });
    };

    $("#table_contacter").bootstrapTable(tableConfig);
}

//反担保信息-抵/质押信息
function getApprovalAsserts(){
    comn.ajax({
        url: interUrl.myTask.approvalAsserts,
        data: loanApplyId,
        success: function (res) {
            $("#approvalGuarantorForm").values(res.data);
        }
    });
}

//预算单信息
function getBudgetInfo(){
    comn.ajax({
        url: interUrl.myTask.approvalBudgetInfo,
        data: loanApplyId,
        success: function (res) {
            //银行直销逻辑判断  businessTypeId
            if(res.data.businessTypeId==2){
                $("#yhzx-c1").hide();
                $("#yhzx-c").text("应收金额");
                $("#receivableAmount").show();
                $("#payableAmount").hide();
                $("#paymentMethodBox").hide();
            }
            if(res.data.viceSignerName=="" || res.data.viceSignerName==null){
                $("#viceSignerNameC").hide(); //若无副签单员则隐藏
            }
            if(res.data.carType==2){
                //如果是二手车
                $("#isSecondCar").show();
            }
            if(res.data.premiumType!=1){
                $("#insuranceBox").hide();
            }
            $("#approvalBudgetInfoForm").values(res.data);
        }
    });
}

//反担保信息-保证人信息 table
function getGuarantor(){
    table_guarantor = function (params) {
        var p=params.data;
        return comn.ajax({
            url: interUrl.myTask.approvalGuarantor,
            data: $.extend(loanApplyId,p),
            success: function (res) {
                params.success({
                    'total': res.totalItem,
                    rows: res.data
                });
                return params.complete();
            }
        });
    };
}

//打印预算单
$("#btn-print-budget").click(function(){
    window.open("../../../Modal/task/myTask/print.html?loanApplyId="+args['loanApplyId']);
});


//查看地图
$("body").on("click", "#getPos", function(){
    $("#mapModal").modal("show");
    var _this = this;
    setTimeout(function(){
		map = new BMap.Map("map");
		map.clearOverlays();
		var p=$(_this).data("pos").split(",");
		var curIcon = new BMap.Icon("./../../../images/red_icon.png", new BMap.Size(30,30));
		var point = new BMap.Point(p[0], p[1]);
		map.centerAndZoom(point, 15);
		map.enableScrollWheelZoom();
		map.enableContinuousZoom(); 
		var circle = new BMap.Circle(point,1000,{fillColor:"#0b70d6", strokeWeight: 1 ,fillOpacity: 0.25, strokeOpacity: 0.25});
		map.addOverlay(circle);
		var marker = new BMap.Marker(point, {icon: curIcon});        // 创建标注
		map.addOverlay(marker);
		var callback = $(_this).data("callback")
		if(typeof(callback) == "function"){ callback(BMap, map); }
    },500);
});

var table_modify;
table_modify = function (params) {
    var p=params.data;
    return comn.ajax({
        url: interUrl.loanModify.getLoamModifyHistory,
        data: $.extend(loanApplyId,p),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            return params.complete();
        }
    });
};

//修改清单
function getModify(){
    $("#table_modify").bootstrapTable(comn.table);
}

////返回-普通流程
//$("#page-back").click(function(){
//    window.parent.toUrl({
//        url:'./Modal/task/myTask/index.html'
//    })
//});
//
////返回-贷款修改流程
//$("#page-back-modify").click(function(){
//    if(args['flow']=='modify-task'){
//        window.parent.toUrl({
//            url:'./Modal/task/myTask/index.html'
//        })
//    }else if(args['flow']=='modify'){
//        window.parent.toUrl({
//            url:'./Modal/loanManage/loanModify/index.html'
//        })
//    }
//});
//
////返回-贷款作废流程
//$("#page-back-cancel").click(function(){
//    if(args['flow']=='cancel-task'){
//        window.parent.toUrl({
//            url:'./Modal/task/myTask/index.html'
//        })
//    }else if(args['flow']=='cancel'){
//        window.parent.toUrl({
//            url:'./Modal/loanManage/loanCancel/index.html'
//        })
//    }
//
//});
