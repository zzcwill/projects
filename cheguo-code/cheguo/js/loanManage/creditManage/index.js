var dataLoad_1, handle, tableEvent;
//是否有权限查看云镜报告
var cloudMirrorReport = '';

dataLoad_1 = function (params) {
	tableData(params, $("#searchForm").values(), interUrl.credit.creditList);
};

tableEvent = {
	"click .info": function (e, a, item, index) {
		comn.addTab({ title: '征信详情', href: './Modal/loanManage/creditManage/creditInfo.html?type=1&businessId=' + item.id });
	},
	"click .again": function (e, a, item, index) {
		tip({
			content: '因系统优化，请从APP发起征信！'
		})
		//comn.addTab({title: '发起征信',  href: './Modal/customManage/cheguoCustomer/credit.html?type=3&creditSource=2'});
	},
	"click .change": function (e, a, item, index) {
		comn.addTab({ title: '发起征信', href: './Modal/customManage/cheguoCustomer/credit.html?type=1&creditSource=2&creditId=' + item.id });
	},
	//查看云镜报告点击事件
	"click .lookCloudMirrorReport": function (e, a, item, index) {
		var creditId = item.id;
		var apiNum = 0;
		var token = '';
		var yunServerUrl = '';
	  	  
		//获取云镜报告token
		comn.ajax({
		  url: interUrl.cloudMirrorReport.decisionTokenGet,
		  data: {},
		  success: function (res) {
			token = res.data;
			apiNum++
			showYunReport();
		  }
		});
	  
		//获取云镜报告相应环境地址
		comn.ajax({
		  url: interUrl.common.getSystemName,
		  type: "GET",
		  success: function (res) {
			yunServerUrl = res.data.yunServerUrl;
			apiNum++
			showYunReport();
		  }
		});
	  
		//得到全部所需要的值再去展示云镜报告
		function showYunReport() {
		  if (apiNum === 2) {
			var url = yunServerUrl + '/?token=' + token + '&bizType=1&orderNo=' + creditId;
			comn.addTab({
				title: '云镜报告',
				href: url,
			});     
		  }
		}		
	}
};

handle = function (value, row, index) {
	if (row.creditStatus == 0) {
		var modifyMenu = "<li><a class='change'>修改</a></li>";
	} else {
		var modifyMenu = '';
	}

	var reStart = "";

	if (row.creditResult.trim() != "征信中") { reStart = "<li><a class='again'>重新发起征信</a></li>"; }

	return ["<div class='btn-group btn-group-xs'>",
	"<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", "<span class='caret'></span>",
	"<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>",
	"<li><a class='info'>查看详情</a></li>", modifyMenu, reStart, cloudMirrorReport, "</ul>", "</div>"].join("");	
};

$(document).on("click", "#launchedCredit", function () {
	tip({
		content: '因系统优化，请从APP发起征信！'
	})
	//comn.addTab({title: '发起征信',  href: './Modal/customManage/cheguoCustomer/credit.html?type=0&creditSource=2' });
})


//设置初始化时间
function searchTimeNow() {
	$("input[name='submitTimeBegin']").getToday();
	$("input[name='submitTimeEnd']").getToday();	
}
searchTimeNow();

//判断有无查看云镜报告权限
function judgeCarMoneyLoanCanReport() {
	//是否有查看云镜报告权限接口
	comn.ajax({
		url: interUrl.cloudMirrorReport.cloudMirrorPower,
		data: {
		},
		success: function (res) {
			if (res.data.reportPower === 1) {
				cloudMirrorReport = "<li><a class='lookCloudMirrorReport'>查看云镜报告</a></li>";
			}
		}
	});
}
judgeCarMoneyLoanCanReport()