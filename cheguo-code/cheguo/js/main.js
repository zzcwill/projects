var angle, cache, cardType,  imgArrString, initMenu, swp, swpImage, user, recordDocQuery, allImg, imgIds, toVal;
systemName = null;
recordDocQuery = null;

imgIds = [];

swp = null;

user = null;

imgArrString = "";

angle = 0;

allImg = [];

retprotUrl = [];

cache = {};
var comn1 = {};
comn1 = {
    user: window.parent.user,
    cache: window.parent.cache,
    addTab: function(o) {
        if (o.href) {
            return window.parent.menuItemClick.call(o);
        }
    },
    getArgs: function() {
        var args, i, item, items, name, qs, value;
        qs = (location.search.length > 0 ? location.search.substring(1) : "");
        items = (qs.length ? qs.split("&") : []);
        args = {};
        i = 0;
        while (i < items.length) {
            item = items[i].split("=");
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            if (name.length) {
                args[name] = value;
            }
            i++;
        }
        return args;
    }
};
var args1 = comn1.getArgs();
if (args1["type"] == "modifyPWD") {
    comn1.addTab({
        title: '修改个人信息 ',
        href: './Modal/personalCenter/modifyPassword/modifyPassword.html?type=modifyPWD'
    })
}


cardType = function(v) {
    return ['', '身份证', '军官证', '侨胞证', '外籍人士'][v] || "";
};

$.fn.nameValues = function() {
    var arg;
    arg = arguments[0];
    return $(this).find("[data-name]").each(function(index, item) {
        var key, keySwitch, value;
        key = $(this).data("name");
        keySwitch = $(this).data("formatter");
        if (keySwitch) {
            value = window[keySwitch](arg[key]) || "";
        }
        if (key) {
            return $(item).html(value || arg[key] || "");
        }
    });
};

var a = function toggle() {
    var flag = true;
    function get() {
        return flag = !flag;
    }
    return get;
}();

toggleTopNav = function(){
    $("#topNav").toggleClass("hide")
    var o = {};
    if(a()){
        o['height'] = "calc(100% - 110px)";
    }else{
        o['height'] = "calc(100% - 0px)";
    }
    $("#content-main").css(o);
}

swpImage = function(o) {
    if(o.title){ $("#dirTitle").text(o.title); }
    return $.ajax({
        url: interUrl.basic + interUrl.gr.getPhoto,
        type: 'POST',
        data: {
            loanApplyId: o.loanApplyId,
            dirId: o.dirId,
            fileNamespace: o.fileNamespace,
            releventFlow: o['releventFlow'],
            releventFlowNode: o['releventFlowNode']
        },
        success: function(res) {
            var arr = [], _index = 0, ref = res.data.loanDocumentList, results = [];
            for (k = j = 0, len = ref.length; j < len; k = ++j) {
                i = ref[k];
                arr.push(i.filePath);
                if (i.id === o.id) {
                    results.push(_index = k);
                } else {
                    results.push(void 0);
                }
            }
            allImg = res.data.loanDocumentList;
            switchImage(arr, _index, 1);
            recordDocQuery = function(ids) {
                var obj = {}, ids = ids.split(",");
                for(var i=0; i< allImg.length; i++){
                    for(var j=0; j< ids.length; j++){
                        if(allImg[i].id == ids[j]){
                            if(!obj[allImg[i].dirId]){obj[allImg[i].dirId] = []};
                            obj[allImg[i].dirId].push(ids[j]);
                        }
                    }
                }
                for(item in obj){
                    $.ajax({
                        url: interUrl.basic + interUrl.gr.recordDocQueryHistory,
                        type: "post",
                        data: {
                            loanApplyId: o.loanApplyId,
                            dirId: item,
                            fileNamespace: o.fileNamespace,
                            releventFlow: o['releventFlow'],
                            releventFlowNode: o['releventFlowNode'],
                            docIds: obj[item].join(",")
                        },
                        success: function(res){
                            if(res.code == 20000){return comn.tip({content: res.message || "<code>" + o.url + "</code><br /> 接口异常！！！"})};
                            if(typeof(o.callback == "function")){
                                imgIds = [];
                                o.callback(ids.join(","));
                            }
                        }
                    });


                }

            }
            if(res.data.loanDocumentList[_index].hasRead == 1){ imgIds.push(res.data.loanDocumentList[_index].id); }
            toVal = function(dirId){
                var dirId = dirId || allImg[_index].dirId;
                $("#guarantor")[0].innerHTML = "暂无数据!";
                if(res.data && res.data.photoInfo && res.data.photoInfo[dirId].Guarantor_Info){
                    $.each(res.data.photoInfo[dirId].Guarantor_Info, function(i, item){
                        $("#guarantor").append($("#guarantorTPL").html()).children().eq(i).nameValues(item);
                    });
                }
                if (res.data.photoInfo && res.data.photoInfo[dirId].Customer_Info) {
                    $(".customer").show().nameValues(res.data.photoInfo[dirId].Customer_Info);
                }else{
                    $(".customer").hide();
                }
                if (res.data.photoInfo && res.data.photoInfo[dirId].Spouse_Info) {
                    $(".spouse").show().nameValues(res.data.photoInfo[dirId].Spouse_Info);
                }else{
                    $(".spouse").hide();
                }
                if ((ref2 = res.data.photoInfo) != null ? ref2.Credit_Info : void 0) {
                    $(".coBank").show().nameValues(res.data.photoInfo[dirId].Credit_Info);
                } else {
                    $(".coBank").hide();
                }
            }
            toVal();

			/*
			 *   参数1：图片列表
			 *   参数2：显示图片下标
			 *   参数3：是否显示图片信息(1显示、2不显示)
			 */
			/*
			 switchImage(['http://zacdn.cgw360.com/cgw360/cls/loan/2cf1539f-a554-4085-acb2-aac5ad6a08e4.png','http://zacdn.cgw360.com/cgw360/cls/loan/6eaec911-ba58-4992-88c6-45a75d58e2f1.png','http://zacdn.cgw360.com/cgw360/cls/loan/a661304c-753b-4a4d-a058-77d7fbacee83.png','http://zacdn.cgw360.com/cgw360/cls/loan/f432845b-3706-4712-8179-2db073658153.png'], 2, 1);
			 */
        }
    });
};

function switchImage(arr, _index, type){
    if(type == 1){
        $("#picInfo")[0].className = "col-md-8";
        $("#picImage")[0].className = "col-md-16"
    }else{
        $("#picInfo")[0].className = "hide";
        $("#picImage")[0].className = "col-md-24"
    }
    $("#imageSwitch").modal("show")
    $.openPhotoGallery(arr, _index);
}

function curImg(index) {
    if(index){
        $("#curImg").text(index)
    }else{
        return parseInt($("#curImg").text());
    }
}
function totalImg(total) { $("#totalImg").text(total); }

initMenu = function(data) {
    var itemLi, menu, ulNav;
    ulNav = ['second', 'third'];
    itemLi = function(o, level, k) {
        var ref;
        if (! ((ref = o.sysMenuList) != null ? ref.length: void 0) > 0) {
            return ["<li><a class='J_menuItem' href='" + o.url + "' data-index='" + o.id + "'>" + o.menuName + "</a>"].join("");
        } else {
            return ["<li>" + "<a>" + ("<i class='fa iconfont " + o.logoTag + "'></i>") + ("<span class='nav-label'>" + o.menuName + "</span>") + "<span class='fa arrow'></span>" + "</a>" + menu(o.sysMenuList, level + 1, k) + "</li>"].join("");
        }
    };
    menu = function(arr, level) {
        var a, i, k, len, o;
        a = [];

        if(arr[arr.length-1]['sysMenuList']){
            $.each(arr[arr.length-1]['sysMenuList'], function(i, item){
                if(item.url.indexOf("?") != -1){
                    url = item.url.split("?")[0];
                }else{
                    url = item.url;
                }
                retprotUrl.push(url);
            });
        }
        if (level !== 0) {
            a.push("<ul class='nav nav-" + ulNav[level - 1] + "-level collapse'>");
        }
        if (arr.length > 0) {
            for (k = i = 0, len = arr.length; i < len; k = ++i) {
                o = arr[k];
                a.push(itemLi(o, level, k));
            }
        }
        if (level !== 0) {
            a.push("</ul>");
        }
        return a.join("");
    };
    $("#side-menu").append(menu(data, 0));
    $("#side-menu").metisMenu();
    return $(".sidebar-collapse").slimScroll({
        height: "100%",
        railOpacity: .9,
        alwaysVisible: ! 1
    });
};

$(function() {
	/*initMenu([{
	 "menuName": "我的任务",
	 "sysMenuList": [{
	 "menuName": "我的任务",
	 "url": "./Modal/task/myTask/index.html"
	 }]
	 },
	 {
	 "menuName": "车果客户",
	 "sysMenuList": [{
	 "menuName": "车果客户",
	 "url": "./Modal/customManage/cheguoCustomer/index.html"
	 },
	 {
	 "menuName": "客户管理",
	 "url": "./Modal/customManage/customer/index.html"
	 },
	 {
	 "menuName": "线上客户分配(分公司)",
	 "url": "./Modal/customManage/branchCompany/index.html"
	 },
	 {
	 "menuName": "线上客户分配(集团)",
	 "url": "./Modal/customManage/groupCompany/index.html"
	 }]
	 },
	 {
	 "menuName": "贷前管理",
	 "sysMenuList": [{
	 "menuName": "资信管理",
	 "url": "./Modal/loanManage/creditManage/index.html"
	 },
	 {
	 "menuName": "贷款评审",
	 "url": "./Modal/loanManage/loanReview/index.html"
	 },
	 {
	 "menuName": "贷款查询",
	 "url": "./Modal/loanManage/loanQuery/index.html"
	 },
	 {
	 "menuName": "贷款修改",
	 "url": "./Modal/loanManage/loanModify/index.html"
	 },
	 {
	 "menuName": "贷款作废",
	 "url": "./Modal/loanManage/loanCancel/index.html"
	 },
	 {
	 "menuName": "补件管理",
	 "url": "./Modal/loanManage/loanPatch/index.html"
	 },
	 {
	 "menuName": "逾期数据导入",
	 "url": "./Modal/loanManage/overdueDataImport/index.html"
	 },
	 {
	 "menuName": "付款结果查询",
	 "url": "./Modal/loanManage/payResult/payResult.html"
	 }
	 ]
	 },
	 {
	 "menuName": "车商管理",
	 "sysMenuList": [{
	 "menuName": "车商管理",
	 "url": "./Modal/carDealerManage/carDealer/index.html"
	 }]
	 },
	 {
	 "menuName": "保险管理",
	 "sysMenuList": [{
	 "menuName": "首保登记",
	 "url": "./Modal/insuranceManage/firstInsurance/index.html"
	 }]
	 },
	 {
	 "menuName": "文档传递管理",
	 "sysMenuList": [{
	 "menuName": "文档传递",
	 "url": "./Modal/documentManagement/documentDelivery/index.html"
	 },
	 {
	 "menuName": "发件管理(公司)",
	 "url": "./Modal/documentManagement/sendManageCompany/index.html"
	 },
	 {
	 "menuName": "发件管理(银行)",
	 "url": "./Modal/documentManagement/sendManageBank/index.html"
	 },
	 {
	 "menuName": "收件管理(公司)",
	 "url": "./Modal/documentManagement/receiptManageCompany/index.html"
	 },
	 {
	 "menuName": "收件管理(银行)",
	 "url": "./Modal/documentManagement/receiptManageBank/index.html"
	 }]
	 },
	 {
	 "menuName": "贷中管理",
	 "sysMenuList": [{
	 "menuName": "上牌登记",
	 "url": "./Modal/creditManagement/licenseRegist/index.html"
	 },
	 {
	 "menuName": "抵押登记",
	 "url": "./Modal/creditManagement/mortgageRegist/index.html"
	 },
	 {
	 "menuName": "抵押核查",
	 "url": "./Modal/creditManagement/mortgageRegist/indexCheck.html"
	 },
	 {
	 "menuName": "合同登记",
	 "url": "./Modal/creditManagement/compactRegist/index.html"
	 },
	 {
	 "menuName": "银行放款登记",
	 "url": "./Modal/creditManagement/loanRegist/index.html"
	 },
	 {
	 "menuName": "贷款数据导入",
	 "url": "./Modal/creditManagement/loanDataImport/index.html"
	 },
	 {
	 "menuName": "客户还款卡管理",
	 "url": "./Modal/creditManagement/repaymentManagement/index.html"
	 }, {
	 "menuName": "资料检查核对",
	 "url": "./Modal/creditManagement/dataCheck/index.html"
	 }]
	 },
	 {
	 "menuName": "资产包管理",
	 "sysMenuList": [{
	 "menuName": "资产包维护",
	 "url": "./Modal/assetManage/assetPackageMaintain/index.html"
	 },
	 {
	 "menuName": "资产包管理",
	 "url": "./Modal/assetManage/assetPackageManage/index.html"
	 },
	 {
	 "menuName": "资产包查询",
	 "url": "./Modal/assetManage/assetPackageQuery/index.html"
	 }]
	 },
	 {
	 "menuName": "二手车管理",
	 "sysMenuList": [{
	 "menuName": "二手车评估",
	 "url": "./Modal/secondHandCar/assessment/index.html"
	 },
	 {
	 "menuName": "二手车过户",
	 "url": "./Modal/secondHandCar/transfer/index.html"
	 }]
	 },
	 {
	 "menuName": "在线支持",
	 "sysMenuList": [{
	 "menuName": "我的提问",
	 "url": "./Modal/messageBoardManage/messageBoard/index.html"
	 },{
	 "menuName": "在线提问",
	 "url": "./Modal/messageBoardManage/messageBoard/index.html?type=2"
	 }]
	 },
	 {
	 "menuName": "报表查询",
	 "sysMenuList": [{
	 "menuName": "系统用户查询",
	 "url": "./Modal/report/systemSearch/systemSearch.html"
	 },
	 {
	 "menuName": "贷款费用统计报表",
	 "url": "./Modal/report/loanCostFlow/index.html"
	 },
	 {
	 "menuName": "贷款费用统计报表",
	 "url": "./Modal/report/loanCostFlow/index.html"
	 },
	 {
	 "menuName": "大屏展示",
	 "url": "./Modal/main/index/signMap.html"
	 },
	 {
	 "menuName": "个人-业务量分析",
	 "url": "./Modal/main/index/business.html?method=statisticByMonth&moduleType=1"
	 },
	 {
	 "menuName": "个人-未抵押情况",
	 "url": "./Modal/main/index/unMortgage.html?method=unPledgeStatistic&moduleType=1"
	 },
	 {
	 "menuName": "个人-贷款审批跟踪",
	 "url": "./Modal/main/index/tracking.html?method=flowStatusStatistic&moduleType=1"
	 },
	 {
	 "menuName": "个人-车商客户分布情况",
	 "url": "./Modal/main/index/distribution.html?method=dealerCompanystatistic&moduleType=1"
	 },
	 {
	 "menuName": "分公司-签单分析",
	 "url": "./Modal/main/index/billAmount.html?method=loanSignStatistic&moduleType=2"
	 },
	 {
	 "menuName": "分公司-未抵押情况",
	 "url": "./Modal/main/index/unMortgage.html?method=unPledgeStatistic&moduleType=2"
	 },
	 {
	 "menuName": "分公司-银行放款分析",
	 "url": "./Modal/main/index/bankPay.html?method=bankPayStatistic&moduleType=2"
	 },
	 {
	 "menuName": "分公司-资金回转率分析",
	 "url": "./Modal/main/index/fundAnalysis.html?method=loanAmmountRotaryStatistic&moduleType=2"
	 },
	 {
	 "menuName": "集团-签单分析",
	 "url": "./Modal/main/index/billAmount.html?method=loanSignStatistic&moduleType=3"
	 },
	 {
	 "menuName": "集团-未抵押情况",
	 "url": "./Modal/main/index/unMortgage.html?method=unPledgeStatistic&moduleType=3"
	 },
	 {
	 "menuName": "集团-银行放款分析",
	 "url": "./Modal/main/index/bankPay.html?method=bankPayStatistic&moduleType=3"
	 },
	 {
	 "menuName": "集团-资金回转率分析",
	 "url": "./Modal/main/index/fundAnalysis.html?method=loanAmmountRotaryStatistic&moduleType=3"
	 }]
	 },
	 {
	 "menuName": "财务管理",
	 "sysMenuList": [{
	 "menuName": "分公司待收款列表",
	 "url": "./Modal/report/export/waitReceivables.html"
	 },
	 {
	 "menuName": "待打印预算单列表",
	 "url": "./Modal/report/export/printBudget.html"
	 },
	 {
	 "menuName": "资金监控查询",
	 "url": "./Modal/loanManage/fundManage/indexGzjk.html"
	 }
	 ]
	 },
	 {
	 "menuName": "GPS管理",
	 "sysMenuList": [{
	 "menuName": "批量申请分配",
	 "url": "./Modal/stockManage/distributionGps/distributionGps.html"
	 },
	 {
	 "menuName": "Gps安装",
	 "url": "./Modal/stockManage/distributionGps/distributionGps.html"
	 },
	 {
	 "menuName": "总库存查询",
	 "url": "./Modal/stockManage/gpsStock/gpsStock.html"
	 },
	 {
	 "menuName": "库存详情",
	 "url": "./Modal/stockManage/stockDetail/stockDetail.html"
	 },
	 {
	 "menuName": "库存退回确认",
	 "url": "./Modal/stockManage/stockReback/stockReback.html"
	 }

	 ]
	 },
	 {
	 "menuName":'车主再分期定价管理',
	 "sysMenuList": [{
	 "menuName": "费用方案管理",
	 "url": "./Modal/priceManagement/costPlan/costPlan.html"
	 },
	 {
	 "menuName": "区域定价管理",
	 "url": "./Modal/priceManagement/areaPrice/areaPrice.html"
	 }
	 ]
	 },
	 {
	 "menuName":'空白合同管理',
	 "sysMenuList": [
	 {
	 "menuName": "银行库存管理",
	 "url": "./Modal/blankContract/bankStockManage/index.html"
	 },
	 {
	 "menuName": "分公司库存管理",
	 "url": "./Modal/blankContract/stockManage/stockManage.html?applyRole=company"
	 },
	 {
	 "menuName": "区域库存管理",
	 "url": "./Modal/blankContract/stockManage/stockManage.html?applyRole=area"
	 },
	 {
	 "menuName": "个人库存管理",
	 "url": "./Modal/blankContract/stockManage/stockManage.html?applyRole=personal"
	 },
	 {
	 "menuName": "空白合同管理",
	 "url": "./Modal/blankContract/accountingManage/index.html"
	 }

	 ]
	 }

	 ]);*/
    if(document.location.href == "http://ht-cd.cheguo.com/view/main.html") document.title = '非资管贷前';
    $("#imageSwitch").on("hide.bs.modal", function(){
        if(imgIds && imgIds.length > 0){
            recordDocQuery(imgIds.join(","));
        }
    });
    //shengan
    $.ajax({
        url: interUrl.basic + interUrl.common.getSystemName,
        type: "GET",
        dataType: "json",
        success: function(data, textStatus, jqXHR) {
            if (typeof data === "string") {
                data = JSON.parse(data);
			}
            systemName = data.data;
            //$(".nav-header img").attr("src", data.data.systemName === "shengan" ? 'images/logo_shengan.png' : 'images/logo.png');
            //$("#icon_title img").attr("src", data.data.systemName === "shengan" ? 'images/icon_title_shengan.png' : 'images/icon_title.png');
            if (data.data.systemName === "shengan") {
                $("head").append([
                    '<link rel="stylesheet" href="./common/css/theme.css">',
                ].join(""));
                $(".nav-header img").attr("src", 'images/logo_shengan.png');
                $("#icon_title img").attr("src", 'images/icon_title_shengan.png');
                $("#content-main").addClass("styleCR");
                $("li[for=02]").remove();
                $(".nav-header img").attr("width","100%");
                document.title = '晟安贷前'
            } else if(data.data.systemName === "cherong"){
                $("head").append([
                    '<link rel="stylesheet" href="./common/css/theme_cherong.css">',
                ].join(""));
                $(".nav-header img").attr("src", 'images/logo_cherong.png');
                $("#icon_title img").attr("src", 'images/icon_title_cherong.png');
                $("#content-main").addClass("styleCRW");
                $("li[for=02]").remove();
                $(".nav-header img").attr("width","100%");
                document.title = '车融贷前'
            } else {
                $(".nav-header img").attr("src", 'images/logo.png');
                $("#icon_title img").attr("src", 'images/icon_title.png');
                $("#content-main").removeClass("styleCR styleCRW");
			}
        }
    });
    $.ajax({
        url: interUrl.basic + interUrl.user.getUser,
        type: "POST",
        dataType: "json",
        success: function(data, textStatus, jqXHR) {
            if (typeof data === "string") {
                data = JSON.parse(data);
            }
            if (data.code === 30000) {
                return location.href = "./index.html";
            } else if (data.code === 20000) {
                $("#dialogTip").nameValues({
                    content: data.message
                });
                return $("#dialogTip").modal("show");
            } else {
                user = data.data;
                return $("#userName").text(data.data.realname);
            }
        }
    });
    $.ajax({
        url: interUrl.basic + interUrl.user.menu,
        data: {
            st: "CLS_WEB_BEFORE"
        },
        type: "POST",
        data: {
            st: 'CLS_WEB_BEFORE'
        },
        dataType: "json",
        success: function(data, textStatus, jqXHR) {
            if (typeof data === "string") {
                data = JSON.parse(data);
            }
            if (data.code === 30000) {
                return location.href = "./index.html";
            } else if (data.code === 20000) {
                $("#dialogTip").nameValues({
                    content: data.message
                });
                return $("#dialogTip").modal("show");
            } else {
                initMenu(data.data);
            }
        }
    });

    $(".J_tabExit").click(function() {
        return $("#logOut").modal("show");
    });
    //菜单选中时颜色加载
    // $(document).on("click", ".J_menuItem", function(){
    //     $(".J_menuItem").removeClass("J_active");
    //     $(this).addClass("J_active");
    // });
    $("#exitSure").click(function() {
        location.href = systemName.logoutUrl;
	});

	//修改个人信息跳转oa地址
    $("#changePersonInfo").click(function() {
        menuItemClick.call({title : '修改个人信息', href: systemName.ucServerUrl});
	});

    // 报表菜单加载
    var hrefs = $("#side-menu").find("li"); console.log(hrefs);
    // for (var i = hrefs.length - 1; i >= 0; i--) {
    // 	var href= hrefs[i].sysMenuList('a').attr('href');
    // 	console.log(href+"<br>");
    // };
    // $("#side-menu .nav-header").attr('href', './Modal/main/index/index.html?methods='+href);
});

