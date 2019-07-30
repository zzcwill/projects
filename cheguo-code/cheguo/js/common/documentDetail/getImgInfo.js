//拉取图片相关数据信息
// comn.ajax({
// 	url: interUrl.common.getImgInfor,
// 	data: {
// 		loanApplyId: ,
// 		dirId: 
// 	},
// 	success: function (res) {
// 		switchType(res.data.loanDocumentList[0].dirId, res.data.photoInfo);
// 	}
// });
var data = {
        "loanDocumentList": [
            {
                "dirId": 10101,
                "fileFormat": "jpg",
                "fileName": "1450145663_GuADcDSc_215x185.jpg",
                "filePath": "http://zacdn.cgw360.com/cgw360/cls/loan/333c198b-47d6-4ba6-af4b-52afb3671a72.jpg"
            }
        ],
        "photoInfo": {
            "Credit_Info": {
                "coBankName": "杭州工行古墩路支行"
            },
            "Spouse_Info": {
                "spouseCardNo": "330682123403065921",
                "spouseCardType": "身份证",
                "spouseAge": 783,
                "spouseVisitAddress": "山西省阳泉市矿区8号大街",
                "spouseName": "李大嘴",
                "spouseNativePlace": "浙江余姚"
            },
            "Customer_Info": {
                "customerCardNo": "330682199103062344",
                "customerAge": 25,
                "customerVisitAddress": "山西省阳泉市矿区8号大街",
                "customerNativePlace": "浙江",
                "customerName": "韩永斌测试01已婚",
                "customerCardType": "身份证"
            },
            "Guarantor_Info": [
                {
                    "guarantorCardNo": "310106198403051199",
                    "guarantorCardType": "身份证",
                    "guarantorAge": 33,
                    "guarantorName": "刘施荣9"
                },
                {
                    "guarantorCardNo": "130525199412276068",
                    "guarantorCardType": "身份证",
                    "guarantorAge": 23,
                    "guarantorName": "刘施荣"
                }
            ]
        }
    }
//匹配文件类型
function switchType(type, data) {
	switch(type) {
		//征信照片
		case 10101:
			return creditCard_info(data);
		break;
		//客户身份信息
		case 10104:
			return customer_info(data);
		break;
		//客户资产住房信息
		case 10105:
			return customerAssets_info(data);
		break;
		//客户签字照片及合影
		case 10106:
			return custormerSign_info(data);
		break;
		//担保人照片
		case 10107:
			return guarantor_Info(data);
		break;
		//信息采集表
		case 10108:
			return get_info(data);
		break;
		//上门调查表
		case 10109:
			return callInvestigation_info(data);
		break;
		//签字照片资料留档
		case 10110:
			return signPhoto_file(data);
		break;
	}
}
//字符串赋值，拼装函数
//征信照片
function creditCard_info(data) {
	var str = "";
	str += "<h5 class='listTitle'>征信照片</h5>";
	str += "<section>" + 
				"<p><span class='p_title'>合作银行：</span>" + data.Credit_Info.coBankName + "</p>" + 
			"</section>";
	str += "<section>" + 
				"<h5 class='s_title'>客户信息</h5>" +
				"<p><span class='p_title'>客户名称：" + data.Customer_Info.customerName + "</span></P>" +
				"<p><span class='p_title'>证件类型：" + data.Customer_Info.customerCardType + "</span></P>" +
				"<p><span class='p_title'>证件号码：" + data.Customer_Info.customerCardNo + "</span></P>" +
				"<p><span class='p_title'>年龄：" + data.Customer_Info.customerAge + "</span></P>" +
			"</section>";
	str += "<section>" + 
				"<h5 class='s_title'>配偶信息</h5>" +
				"<p><span class='p_title'>客户名称：" + data.Spouse_Info.spouseName + "</span></P>" +
				"<p><span class='p_title'>证件类型：" + data.Spouse_Info.spouseCardType + "</span></P>" +
				"<p><span class='p_title'>证件号码：" + data.Spouse_Info.spouseCardNo + "</span></P>" +
				"<p><span class='p_title'>年龄：" + data.Spouse_Info.spouseAge + "</span></P>" +
			"</section>";
	str += "<section>" + 
				"<h5 class='s_title'>担保人信息</h5>";
	for (var i = 0; i < data.Guarantor_Info.length; i += 1) {
		var datas = data.Guarantor_Info[i];
		str +=  "<div>" + 
					"<p><span class='p_title'>客户名称：" + datas.guarantorName + "</span></P>" +
					"<p><span class='p_title'>证件类型：" + datas.guarantorCardType + "</span></P>" +
					"<p><span class='p_title'>证件号码：" + datas.guarantorCardNo + "</span></P>" +
					"<p><span class='p_title'>年龄：" + datas.guarantorAge + "</span></P>" +
				"</div>";
	}
	str += "</section>";
	return str;
}
//客户身份信息
function customer_info(data) {
	var str = "";
	str += "<h5 class='listTitle'>客户身份信息</h5>";
	str += "<section>" + 
				"<h5 class='s_title'>客户信息</h5>" +
				"<p><span class='p_title'>客户名称：" + data.Customer_Info.customerName + "</span></P>" +
				"<p><span class='p_title'>证件类型：" + data.Customer_Info.customerCardType + "</span></P>" +
				"<p><span class='p_title'>证件号码：" + data.Customer_Info.customerCardNo + "</span></P>" +
				"<p><span class='p_title'>年龄：" + data.Customer_Info.customerAge + "</span></P>" +
				"<p><span class='p_title'>工作单位：" + data.Customer_Info.customerCompanyName + "</span></P>" +
				"<p><span class='p_title'>家庭地址：" + data.Customer_Info.customerHomeAddress + "</span></P>" +
				"<p><span class='p_title'>手机号码：" + data.Customer_Info.customerMobilePhone + "</span></P>" +
			"</section>";
	str += "<section>" + 
				"<h5 class='s_title'>配偶信息</h5>" +
				"<p><span class='p_title'>客户名称：" + data.Spouse_Info.spouseName + "</span></P>" +
				"<p><span class='p_title'>证件类型：" + data.Spouse_Info.spouseCardType + "</span></P>" +
				"<p><span class='p_title'>证件号码：" + data.Spouse_Info.spouseCardNo + "</span></P>" +
				"<p><span class='p_title'>年龄：" + data.Spouse_Info.spouseAge + "</span></P>" +
				"<p><span class='p_title'>工作单位：" + data.Spouse_Info.spouseCompanyName + "</span></P>" +
				"<p><span class='p_title'>家庭地址：" + data.Customer_Info.customerHomeAddress + "</span></P>" +
				"<p><span class='p_title'>手机号码：" + data.Spouse_Info.spouseMobilePhone + "</span></P>" +
			"</section>";
	str += "<section>" + 
				"<h5 class='s_title'>担保人信息</h5>";
	for (var i = 0; i < data.Guarantor_Info.length; i += 1) {
		var datas = data.Guarantor_Info[i];
		str +=  "<div>" + 
					"<p><span class='p_title'>客户名称：" + datas.guarantorName + "</span></P>" +
					"<p><span class='p_title'>证件类型：" + datas.guarantorCardType + "</span></P>" +
					"<p><span class='p_title'>证件号码：" + datas.guarantorCardNo + "</span></P>" +
					"<p><span class='p_title'>年龄：" + datas.guarantorAge + "</span></P>" +
				"</div>";
	}
	str += "</section>";
	return str;

}
//客户资产住房信息
function customerAssets_info(data) {
	var str = "";
	str += "<h5 class='listTitle'>客户资产住房信息</h5>";
	str += "<section>" + 
				"<h5 class='s_title'>项目信息</h5>" +
				"<p><span class='p_title'>车辆信息：" + data.Project_Info.carInfo + "</span></P>" +
				"<p><span class='p_title'>开票价：" + data.Project_Info.billingPrice + "</span></P>" +
				"<p><span class='p_title'>贷款金额：" + data.Project_Info.loanAmount + "</span></P>" +
				"<p><span class='p_title'>住宅情况：" + data.Project_Info.housingStatus + "</span></P>" +
				"<p><span class='p_title'>上门地址：" + data.Project_Info.visitAddress + "</span></P>" +
			"</section>";
	str += "<section>" + 
				"<h5 class='s_title'>客户信息</h5>" +
				"<p><span class='p_title'>职业：" + data.Customer_Info.customerProfession + "</span></P>" +
				"<p><span class='p_title'>工作单位：" + data.Customer_Info.customerCompanyName + "</span></P>" +
				"<p><span class='p_title'>单位电话：" + data.Customer_Info.customerCompanyPhone + "</span></P>" +
				"<p><span class='p_title'>单位地址：" + data.Customer_Info.customerCompanyAddress + "</span></P>" +
				"<p><span class='p_title'>月收入：" + data.Customer_Info.customerMonthlyIncome + "</span></P>" +
				"<p><span class='p_title'>公积金：" + "无" + "</span></P>" +
			"</section>";
	str += "<section>" + 
				"<h5 class='s_title'>配偶信息</h5>" +
				"<p><span class='p_title'>职业：" + data.Spouse_Info.spouseProfession + "</span></P>" +
				"<p><span class='p_title'>工作单位：" + data.Spouse_Info.spouseCompanyName + "</span></P>" +
				"<p><span class='p_title'>单位电话：" + data.Spouse_Info.spouseCompanyPhone + "</span></P>" +
				"<p><span class='p_title'>单位地址：" + data.Spouse_Info.spouseCompanyAddress + "</span></P>" +
				"<p><span class='p_title'>月收入：" + data.Spouse_Info.spouseMonthlyIncome + "</span></P>" +
				"<p><span class='p_title'>公积金：" + "无" + "</span></P>" +
			"</section>";
	return str;
}
//客户签字照片及合影
function custormerSign_info(data) {
	var str = "";
	str += "<h5 class='listTitle'>客户资产住房信息</h5>";
	str += "<section>" + 
				"<h5 class='s_title'>借款人身份证-正面</h5>" +
				"<img class='customerPhotos' src='" + data.customerIdPhoto.filePath + "'>";
			"</section>";
	str += "<section>" + 
				"<h5 class='s_title'>配偶身份证-正面</h5>" +
				"<img class='customerPhotos' src='" + data.spouseIdPhoto.filePath + "'>";
			"</section>";
	str += "<section>" + 
				"<p><span class='p_title'>上门地址：" + data.Project_Info.visitAddress + "</span></P>" +
			"</section>";
	return str;
}
//担保人照片
function guarantor_Info(data) {
	var str = "";
	str += "<h5 class='listTitle'>担保人照片</h5>";
	str += "<section>" + 
				"<h5 class='s_title'>担保人信息</h5>";
	for (var i = 0; i < data.Guarantor_Info.length; i += 1) {
		var datas = data.Guarantor_Info[i];
		str +=  "<div>" + 
					"<p><span class='p_title'>客户名称：" + datas.guarantorName + "</span></P>" +
					"<p><span class='p_title'>证件类型：" + datas.guarantorCardType + "</span></P>" +
					"<p><span class='p_title'>证件号码：" + datas.guarantorCardNo + "</span></P>" +
					"<p><span class='p_title'>年龄：" + datas.guarantorAge + "</span></P>" +
					"<p><span class='p_title'>户籍地址：" + datas.guarantorNativePlace + "</span></P>" +
					"<p><span class='p_title'>手机号码：" + datas.guarantorMobileNo + "</span></P>" +
				"</div>";
	}
	str += "</section>";
	return str;
}
//信息采集表
function get_info(data) {
	var str = "";
	str += "<h5 class='listTitle'>信息采集表</h5>";
	str += "<section>" + 
				"<h5 class='s_title'>客户信息</h5>" +
				"<p><span class='p_title'>客户名称：" + data.Project_Info.carInfo + "</span></P>" +
				"<p><span class='p_title'>证件类型：" + data.Project_Info.billingPrice + "</span></P>" +
				"<p><span class='p_title'>证件号码：" + data.Project_Info.loanAmount + "</span></P>" +
				"<p><span class='p_title'>年龄：" + data.Project_Info.housingStatus + "</span></P>" +
				"<p><span class='p_title'>户籍地址：" + data.Project_Info.housingStatus + "</span></P>" +
				"<p><span class='p_title'>上门地址：" + data.Project_Info.visitAddress + "</span></P>" +
			"</section>";
	str += "<section>" + 
				"<h5 class='s_title'>客户信息</h5>" +
				"<p><span class='p_title'>客户名称：" + data.Project_Info.carInfo + "</span></P>" +
				"<p><span class='p_title'>证件类型：" + data.Project_Info.billingPrice + "</span></P>" +
				"<p><span class='p_title'>证件号码：" + data.Project_Info.loanAmount + "</span></P>" +
				"<p><span class='p_title'>年龄：" + data.Project_Info.housingStatus + "</span></P>" +
				"<p><span class='p_title'>户籍地址：" + data.Project_Info.housingStatus + "</span></P>" +
				"<p><span class='p_title'>上门地址：" + data.Project_Info.visitAddress + "</span></P>" +
			"</section>";
	str += "<section>" + 
				"<h5 class='s_title'>担保人信息</h5>";
	for (var i = 0; i < data.Guarantor_Info.length; i += 1) {
		var datas = data.Guarantor_Info[i];
		str +=  "<div>" + 
					"<p><span class='p_title'>客户名称：" + datas.guarantorName + "</span></P>" +
					"<p><span class='p_title'>证件类型：" + datas.guarantorCardType + "</span></P>" +
					"<p><span class='p_title'>证件号码：" + datas.guarantorCardNo + "</span></P>" +
					"<p><span class='p_title'>年龄：" + datas.guarantorAge + "</span></P>" +
					"<p><span class='p_title'>户籍地址：" + datas.guarantorNativePlace + "</span></P>" +
					"<p><span class='p_title'>手机号码：" + datas.guarantorMobileNo + "</span></P>" +
				"</div>";
	}
	str += "</section>";
}
//上门调查表照片
function callInvestigation_info(data) {
	var str = "";
	str += "<h5 class='listTitle'>上门调查表照片</h5>";
	str += "<section>" + 
				"<h5 class='s_title'>客户信息</h5>" +
				"<p><span class='p_title'>职业：" + data.Customer_Info.customerProfession + "</span></P>" +
				"<p><span class='p_title'>工作单位：" + data.Customer_Info.customerCompanyName + "</span></P>" +
				"<p><span class='p_title'>单位电话：" + data.Customer_Info.customerCompanyPhone + "</span></P>" +
				"<p><span class='p_title'>单位地址：" + data.Customer_Info.customerCompanyAddress + "</span></P>" +
				"<p><span class='p_title'>月收入：" + data.Customer_Info.customerMonthlyIncome + "</span></P>" +
				"<p><span class='p_title'>公积金：" + "无" + "</span></P>" +
			"</section>";
	str += "<section>" + 
				"<h5 class='s_title'>配偶信息</h5>" +
				"<p><span class='p_title'>职业：" + data.Spouse_Info.spouseProfession + "</span></P>" +
				"<p><span class='p_title'>工作单位：" + data.Spouse_Info.spouseCompanyName + "</span></P>" +
				"<p><span class='p_title'>单位电话：" + data.Spouse_Info.spouseCompanyPhone + "</span></P>" +
				"<p><span class='p_title'>单位地址：" + data.Spouse_Info.spouseCompanyAddress + "</span></P>" +
				"<p><span class='p_title'>月收入：" + data.Spouse_Info.spouseMonthlyIncome + "</span></P>" +
				"<p><span class='p_title'>公积金：" + "无" + "</span></P>" +
			"</section>";
	return str;
}
//签字照片资料留档
function signPhoto_file(data) {
	var str = "";
	str += "<h5 class='listTitle'>签字照片资料留档</h5>";
	str += "<section>" + 
				"<h5 class='s_title'>客户信息</h5>" +
				"<p><span class='p_title'>客户名称：" + data.Customer_Info.customerName + "</span></P>" +
				"<p><span class='p_title'>证件类型：" + data.Customer_Info.customerCardType + "</span></P>" +
				"<p><span class='p_title'>证件号码：" + data.Customer_Info.customerCardNo + "</span></P>" +
				// "<p><span class='p_title'>年龄：" + data.Customer_Info.customerAge + "</span></P>" +
			"</section>";
	str += "<section>" + 
				"<h5 class='s_title'>配偶信息</h5>" +
				"<p><span class='p_title'>客户名称：" + data.Spouse_Info.spouseName + "</span></P>" +
				"<p><span class='p_title'>证件类型：" + data.Spouse_Info.spouseCardType + "</span></P>" +
				"<p><span class='p_title'>证件号码：" + data.Spouse_Info.spouseCardNo + "</span></P>" +
				// "<p><span class='p_title'>年龄：" + data.Spouse_Info.spouseAge + "</span></P>" +
			"</section>";
	str += "<section>" + 
				"<h5 class='s_title'>担保人信息</h5>";
	for (var i = 0; i < data.Guarantor_Info.length; i += 1) {
		var datas = data.Guarantor_Info[i];
		str +=  "<div>" + 
					"<p><span class='p_title'>客户名称：" + datas.guarantorName + "</span></P>" +
					"<p><span class='p_title'>证件类型：" + datas.guarantorCardType + "</span></P>" +
					"<p><span class='p_title'>证件号码：" + datas.guarantorCardNo + "</span></P>" +
					// "<p><span class='p_title'>年龄：" + datas.guarantorAge + "</span></P>" +
				"</div>";
	}
	str += "</section>";
	return str;
}