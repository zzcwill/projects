var cardType, education, housingStatus, industry, isAgency, maritalStatus,hasChildren,householdType, monthlyIncome, reservedFunds, sex, decisionStatus;

cardType = function(value, row, index) {
  return [null, "身份证", "军官证", "侨胞证", "外籍人士", ""][value] || null;
};

sex = function(value, row, index) {
  return ["女", "男"][value] || null;
};

maritalStatus = function(value, row, index) {
  return ["", "已婚", "未婚", "离异", "丧偶"][value] || null;
};

hasChildren = function(value, row, index) {
    return ["无子女", "有子女"][value] || null;
};
householdType = function(value, row, index) {
    return ["","本市农业", "本市非农业","非本市农业","非本市非农业"][value] || null;
};

industry = function(value, row, index) {
  return ["", "邮电通讯行业", "房地产行业", "交通运输行业", "法律/司法行业", "文化/娱乐/体育行业", "医疗行业", "计算机/网络行业", "商业贸易行业", "财政行业", "税务行业", "咨询行业", "社会服务行业", "旅游/饭店行业", "部队系统", "证券行业", "银行业", "保险业", "其它金融行业", "采矿业", "建筑业", "工业", "制造业", "水电气供应", "机关团体", "农林牧渔", "其它"][value] || null;
};

monthlyIncome = function(value, row, index) {
  return ["", "1-4999", "5000-9999", "10000-14999", "15000-19999", "2万以上"][value] || null;
};

isAgency = function(value, row, index) {
  return ["", "是", "否"][value] || null;
};

housingStatus = function(value, row, index) {
  return ["", "自有住房", "贷款购房", "租房", "其他"][value] || null;
};

education = function(value, row, index) {
  return ["", "初中及以下", "高中", "大专", "本科", "硕士及以上"][value] || null;
};

reservedFunds = function(value, row, index) {
  return ["", "无", "1-500", "501-1000", "1001-1500", "1501-2000", "2001-2500", "2501-3000", "3000以上"][value] || null;
};
decisionStatus = function(value, row, index) {
    if (value === 2) {
        return '通过'
    } else if (value === 3 || value === 4) {
        return '拒绝'
    } else {
        return [];
    }
};
$(function() {
  var args;
  args = common.getArgs();
  common.Ajax({
    url: 'loanApproval/getLoanCustomerInfo',
    data: args,
    success: function(data) {
		if(data.maritalStatus == 1){
			$("#maritalStatus").show();
		}
		data['homeAddress'] = data['homeAddressPname'] + data['homeAddressCname'] + data['homeAddressRname'] + data['homeAddressDetail'];
		$("#page").nameValues(data);
    }
  });
  return $("#spouseInfo").click(function(e) {
    return location.href = "./spouseInfo.html?businessId=" + args['businessId'] + "&Auth-Id=" + args['Auth-Id'];
  });
});
