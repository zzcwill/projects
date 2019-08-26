//云镜报告页过滤器start
//风险类型过滤器
function riskTypeFilter(code) {
  code = code.replace(/\b(0+)/gi,"")*1;

  var arr = [
    '', 
    '网贷逾期120天+', 
    '失信人拒贷', 
    '命中执行提供结案证明', 
    '违法行为拒绝', 
    '网贷逾期90天+',
    '多头借贷查询30次+'
  ];
  return arr[code];
}

//贷款人相关人类型过滤器
function loanPersonFilter(code) {
  var arr = [];
  arr['lender'] = '主贷人';
  arr['spouse'] = '配偶';
  arr['gor1'] = '担保人1';
  arr['gor2'] = '担保人2';
  arr['gor3'] = '担保人3';
  return arr[code];
}

//贷款人相关人类型图标过滤器
function loanPersonIconFilter(code) {
  if(code === null) {
    return 'icoPerson3';
  }
  var arr = [];
  arr['0'] = 'icoPerson';
  arr['1'] = 'icoPerson2';
  arr['-1'] = 'icoPerson3';
  arr['-2'] = 'icoPerson3';
  return arr[code];
}
function loanPersonIconFilter2(code) {
  if(code === null) {
    return 'icoWarn3';
  }
  var arr = [];
  arr['0'] = 'icoWarn3';
  arr['1'] = 'icoWarn4';
  arr['2'] = 'icoWarn5';
  return arr[code];
}
function loanPersonIconFilter3(code) {
  if(code === null) {
    return 'icoWarn3';
  }
  var arr = [];
  arr['0'] = 'icoWarn3';
  arr['1'] = 'icoWarn4';
  arr['2'] = 'icoWarn5';
  return arr[code];
}
function loanPersonIconTxtFilter(code) {
  if(code === null) {
    return '未查询';
  }

  var arr = [];
  arr['0'] = '不通过';
  arr['1'] = '通过';
  arr['-1'] = '未查询';
  arr['-2'] = '未查询';
  return arr[code] || '';
}

//贷款人类型转数字过滤器-判断当前云镜报告的序号
function memberTypeNumberFilter(code) {
  var arr = [];
  arr['lender'] = 0;
  arr['spouse'] = 1;
  arr['gor1'] = 2;
  arr['gor2'] = 3;
  arr['gor3'] = 4;
  return arr[code];
}

//黑名单表格相关过滤器start
//算话欺诈评级过滤器
function stanRiskRateFilter(code) {
  var arr = [];
  arr['A'] = '1';
  arr['B'] = '1';
  arr['C'] = '1';
  arr['D'] = '1';
  arr['E'] = '1';
  arr['F'] = '1';
  arr['G'] = '2';
  arr['H'] = '2';
  arr['I'] = '2';
  arr['J'] = '2';
  arr['K'] = '2';
  arr['L'] = '3';
  arr['M'] = '3';
  arr['N'] = '3';
  arr['O'] = '3';
  arr['P'] = '3';
  arr['Q'] = '3';
  return arr[code];  
}


//是否命中过滤器
function isHitFilter(code) {
  var arr = ['未命中', '命中'];
  return arr[code] || '';
}
//是否命中
function isHitFilter2(code) {
  var arr = [];
  arr['Y'] = '命中';
  arr['N'] = '未命中';
  return arr[code] || '';
}
//是否多期
function isHitFilter4(code) {
  var arr = [];
  arr['S'] = '单期';
  arr['M'] = '多期';
  return arr[code] || '';
}
//是否结清
function isHitFilter5(code) {
  var arr = [];
  arr['Y'] = '结清';
  arr['N'] = '未结清';
  return arr[code] || '';
}
//是否有数据
function isHitFilter6(code) {
  var arr = [];
  arr['1'] = '有数据';
  arr['0'] = '无数据';
  arr['99'] = '查询失败';
  return arr[code] || '';
}
//查询结果
function isHitFilter7(code) {
  var arr = [];
  arr['1'] = '查询成功';
  arr['0'] = '查无结果';
  arr['2'] = '请求超时';
  arr['3'] = '系统异常';
  return arr[code] || '';
}
//判断手机号运营商
function isHitFilter8(code) {
  var arr = [];
  arr['1'] = '电信';
  arr['2'] = '联通';
  arr['3'] = '移动';
  arr['4'] = '其他运营商';
  return arr[code] || '';
}
//区间段
function isHitFilter9(code) {
  var arr = [];
  arr['1'] = '[0,6)';
  arr['2'] = '[6,12)';
  arr['3'] = '[12,24)';
  arr['4'] = '[24,+)';
  return arr[code] || '';
}
//还款状态判断
function isHitFilter10(code) {
  var arr = [];
  arr['COMPLETED'] = '结清';
  arr['OVERDUE'] = '逾期';
  arr['NORMAL'] = '正常';
  return arr[code] || '';
}
//人行征信-客户等级
function isHitFilter11(code) {
  var arr = [];
  arr[0] = '未获取';
  arr[1] = '通过';
  arr[2] = '未通过';
  arr['其他'] = '未通过';
  return arr[code] || '';
}
//综合结论-人行征信结果
function isHitFilter12(code) {
  var arr = [];
  arr[0] = '未获取';
  arr[1] = '通过';
  arr[2] = '拒绝';
  return arr[code];
}
//综合结论-大数据综合结果
function isHitFilter13(code) {
  var arr = [];
  arr[0] = '未调用';
  arr[1] = '通过';
  arr[2] = '拒绝';
  return arr[code];
}

//风险状态过滤器
function riskStateFilter(code) {
  var arr = ['未命中', '资信不佳', '一般风险', '中风险', '高风险', '拒绝'];
  return arr[code] || '';
}

//风险分数和状态过滤器
function riskStateTxtFilter(code) {
  var str = '';
  var arr = ['短期信用风险', '中期信用风险', '长期信用风险', '不良贷款'];

  if(code === '0' || code === '' || code === null) {
    return str;
  }
  code = code * 1;

  if(code >= 10 && code <= 19) {
    str = code + '(' + arr[0] + ')';
  }

  if(code >= 20 && code <= 29) {
    str = code + '(' + arr[1] + ')';
  }

  if(code >= 30 && code <= 39) {
    str = code + '(' + arr[2] + ')';
  }  

  if(code >= 40 && code <= 45) {
    str = code + '(' + arr[3] + ')';
  }

  return str;
}
function riskStateTxtFilter2(code) {
  var str = '';
  var arr = ['低风险', '中风险', '高风险'];

  if(code === '0' || code === '' || code === null) {
    return str;
  }
  code = code * 1;

  if(code <= 80) {
    str = code + '(' + arr[0] + ')';
  }

  if(code >= 80 && code <= 200) {
    str = code + '(' + arr[1] + ')';
  }

  if(code >= 200) {
    str = code + '(' + arr[2] + ')';
  }

  return str;
}

//案件编码过滤器
function caseCodeFilter(code) {
  var arr = [];
  arr['1010000'] = '背叛、分裂国家案';
  arr['1020000'] = '投敌叛变案';
  arr['1030000'] = '非法提供秘密情报案';
  arr['2010000'] = '危害社会公共安全案';
  arr['2020000'] = '破坏交通运输公共设施案';
  arr['2030000'] = '实施恐怖案';
  arr['2040000'] = '非法枪支弹药爆炸案';
  arr['2050000'] = '违反枪支弹药管理案';
  arr['2060000'] = '重大安全责任事故案';
  arr['3010000'] = '生产、销售伪劣商品案';
  arr['3020000'] = '走私案';
  arr['3030000'] = '妨害对公司、企业的管理秩序案';
  arr['3040000'] = '破坏金融管理秩序案';
  arr['3050000'] = '金融诈骗案';
  arr['3060000'] = '危害税收征管案';
  arr['3070000'] = '侵犯知识产权案';
  arr['3080000'] = '扰乱市场秩序案';
  arr['3090000'] = '非法经营案';
  arr['4010000'] = '侵犯人身权利案';
  arr['4020000'] = '破坏民族平等、宗教信仰案';
  arr['4030000'] = '侵犯民主权利案';
  arr['4040000'] = '出售、非法提供公民个人信息案';
  arr['4050000'] = '妨碍婚姻家庭权利案';
  arr['5010000'] = '侵犯财产案';
  arr['6010000'] = '扰乱公共秩序案';
  arr['6020000'] = '妨害司法案';
  arr['6030000'] = '妨害国（边）境管理案';
  arr['6040000'] = '妨害文物管理案';
  arr['6050000'] = '危害公共卫生案';
  arr['6060000'] = '破坏环境资源保护案';
  arr['6070000'] = '涉毒案';
  arr['6100000'] = '卖淫、传播淫秽物品案';
  arr['7010000'] = '危害国防利益案';
  arr['8010000'] = '贪污贿赂案';
  arr['9010000'] = '渎职案';
  arr['10010000'] = '军人违反职责案';
  arr['00000000'] = '其他';
  return arr[code] || '';  
}

//入网时长过滤器
function netTimeFilter(code) {
  var arr = [];
  arr['03'] = '小于3个月';
  arr['06'] = '3~6个月';
  arr['12'] = '6~12个月';
  arr['24'] = '12~24个月';
  arr['99'] = '24个月以上';
  return arr[code] || '';
}

//风险等级过滤器
function riskLevelFilter(code) {
  var arr = [];
  arr['low'] = '低';
  arr['medium'] = '中';
  arr['high'] = '高';
  return arr[code] || '';
}

//是否通过过滤器
function isPassFilter(code) {
  var arr = [];
  arr[1] = '通过';
  arr[2] = '不通过'; 
  
  return arr[code] || '';
}
function isPassFilter2(code) {
  var arr = [];
  arr[0] = '通过';
  arr[1] = '不通过'; 
  
  return arr[code] || '';
}

//是否过滤器
function isOkFilter(code) {
  var arr = [];
  arr[1] = '是';
  arr[0] = '否'; 
  
  return arr[code] || '';   
}

//有无过滤器
function isHasFilter(code) {
  var arr = [];
  arr[1] = '有';
  arr[0] = '无'; 
  
  return arr[code] || '';   
}

//是否结婚过滤器
function isMarriageFilter(code) {
  var arr = [];
  arr[1] = '已婚';
  arr[2] = '未婚'; 
  
  return arr[code] || '';  
}

//是否一致过滤器
function isSameFilter(code) {
  var arr = [];
  arr[0] = '一致';
  arr[1] = '不一致'; 
  
  return arr[code] || '';  
}
function isSameFilter2(code) {
  var arr = [];
  arr['1'] = '一致';
  arr['0'] = '不一致'; 
  return arr[code] || '';  
}

//黑名单过滤器
function blacklistFlagFilter(code) {
  var arr = [];
  arr[0] = '未命中';
  arr[1] = '一级黑名单';
  arr[2] = '二级黑名单'; 
  return arr[code] || '';  
}

//原样返回过滤器
function sameBackFilter(code) {
  if(code === null) {
    return '';
  }

  return code;
}
function sameBackFilter2(code) {
  if(code === null) {
    return '无';
  }

  if(code === '') {
    return '无';
  }  

  return code;
}

//黑名单表格标题过滤器
function blacklistTitleFilter(code) {
  var arr = [ '【人行】征信信息',
              '【百融】特殊名单',
              '【百融】自然人',
              '【百融】法院被执行人',
              '【百融】多头借贷',              
              '【阿福】风险评估',
              '【邦盛】风险名单',
              '【邦盛】逾期详情',
              '【邦盛】贷款申请详情',
              '【邦盛】贷款放款详情',
              '【车贷】内部黑名单',
              '【百融】手机在网时长',
            ];
  return arr[code] || '';
}

//黑名单表格-内部字段中文转换
function blacklistFilter(code,tableType) {
  var dataFilter = [
    //personalCredit
    {
      creditResult: '客户信用等级',
      creditNote: '征信备注',
    },
    //brSpecialList
    {
      sl_id_abnormal: '通过身份证号查询高危行为',
      sl_id_phone_overdue: '通过身份证号查询电信欠费',
      sl_id_court_bad: '通过身份证号查询法院失信人',
      sl_id_court_executed: '通过身份证号查询法院被执行人',
      sl_cell_abnormal: '通过手机号查询高危行为',
      sl_cell_phone_overdue: '通过手机号查询电信欠费',
      sl_lm_cell_abnormal: '通过联系人手机查询高危行为',
      sl_lm_cell_phone_overdue: '通过联系人手机查询电信欠费',
      sl_id_bank: '通过身份证号查询银行(含信用卡)',
      sl_id_p2p: '通过身份证号查询非银(含全部非银类型)',
      sl_id_nbank_p2p: '通过身份证号查询非银-P2P',
      sl_id_nbank_mc: '通过身份证号查询非银-小贷',
      sl_id_nbank_ca: '通过身份证号查询非银-现金类分期',
      sl_id_nbank_com: '通过身份证号查询非银-代偿类分期',
      sl_id_nbank_cf: '通过身份证号查询非银-消费类分期',
      sl_id_nbank_other: '通过身份证号查询非银-其他',
      sl_cell_bank: '通过手机号查询银行(含信用卡)',
      sl_cell_p2p: '通过手机号查询非银(含全部非银类型)',
      sl_cell_nbank_p2p: '通过手机号查询非银-P2P',
      sl_cell_nbank_mc: '通过手机号查询非银-小贷',
      sl_cell_nbank_ca: '通过手机号查询非银-现金类分期',
      sl_cell_nbank_com: '通过手机号查询非银-代偿类分期',
      sl_cell_nbank_cf: '通过手机号查询非银-消费类分期',
      sl_cell_nbank_other: '通过手机号查询非银-其他',
      sl_lm_cell_bank: '通过联系人手机查询银行(含信用卡)',
      sl_lm_cell_nbank_p2p: '通过联系人手机查询非银-P2P',
      sl_lm_cell_nbank_mc: '通过联系人手机查询非银-小贷',
      sl_lm_cell_nbank_ca: '通过联系人手机查询非银-现金类分期',
      sl_lm_cell_nbank_com: '通过联系人手机查询非银-代偿类分期',
      sl_lm_cell_nbank_cf: '通过联系人手机查询非银-消费类分期',
      sl_lm_cell_nbank_other: '通过联系人手机查询非银-其他',
      arbitrarily_hit: '是否命中特殊名单',
    },
    //brBadInfo
    {
      ztCheckresult: '在逃',
      sdCheckresult: '涉毒',
      xdCheckresult: '吸毒',
      wfxwCheckresult: '违法行为',
      checkCount2: '违法行为数量',
      caseTypeCode: '案件类型',
    },
    //brExecut
    {
      ex_execut_num: '执行中案件数量',
      ex_execut_end_num: '已结案数量',
      ex_bad_two_year_num: '两年内失信被执行人数量',
      ex_bad_many_years_num: '两年外失信被执行人数量'
    },
    //brApplyLoan
    {       
      als_d7_id_pdl_orgnum: "近7天申请小额现金贷机构数-身份证",
      als_d7_id_caon_allnum: "近7天申请现金分期次数-身份证",
      als_d7_id_caon_orgnum: "近7天申请现金分期的机构数-身份证",
      als_d7_id_rel_allnum: "近7天申请信用卡次数-身份证",
      als_d7_id_rel_orgnum: "近7天申请信用卡机构数-身份证",
      als_d7_id_cooff_allnum: "近7天申请消费分期次数-身份证",
      als_d7_id_cooff_orgnum: "近7天申请消费分期机构数-身份证",
      als_d7_id_af_allnum: "近7天申请汽车金融次数-身份证",
      als_d7_id_af_orgnum: "近7天申请汽车金融机构数-身份证",
      als_d7_id_oth_allnum: "近7天申请其他次数-身份证",
      als_d7_id_oth_orgnum: "近7天申请其他机构数-身份证",
      als_d7_id_bank_allnum: "近7天银行申请次数-身份证",
      als_d7_id_bank_orgnum: "近7天银行申请机构数-身份证",
      als_d7_id_nbank_allnum: "近7天非银申请次数-身份证",
      als_d7_id_nbank_p2p_allnum: "近7天p2p机构申请次数-身份证",
      als_d7_id_nbank_mc_allnum: "近7天小贷机构申请次数-身份证",
      als_d7_id_nbank_ca_allnum: "近7天现金类分期机构申请次数-身份证",
      als_d7_id_nbank_cf_allnum: "近7天消费类分期机构申请次数-身份证",
      als_d7_id_nbank_com_allnum: "近7天代偿类分期机构申请次数-身份证",
      als_d7_id_nbank_oth_allnum: "近7天其他申请次数-身份证",
      als_d7_id_nbank_nsloan_allnum: "近7天持牌网络小贷机构申请次数-身份证",
      als_d7_id_nbank_autofin_allnum: "近7天持牌汽车金融机构申请次数-身份证",
      als_d7_id_nbank_sloan_allnum: "近7天持牌小贷机构申请次数-身份证",
      als_d7_id_nbank_cons_allnum: "近7天持牌消费金融机构申请次数-身份证",
      als_d7_id_nbank_finlea_allnum: "近7天持牌融资租赁机构申请次数-身份证",
      als_d7_id_nbank_orgnum: "近7天非银申请机构数-身份证",
      als_d7_id_nbank_p2p_orgnum: "近7天p2p申请机构数-身份证",
      als_d7_id_nbank_mc_orgnum: "近7天小贷申请机构数-身份证",
      als_d7_id_nbank_ca_orgnum: "近7天现金类分期申请机构数-身份证",
      als_d7_id_nbank_cf_orgnum: "近7天消费类分期申请机构数-身份证",
      als_d7_id_nbank_com_orgnum: "近7天代偿类分期申请机构数-身份证",
      als_d7_id_nbank_oth_orgnum: "近7天其他申请机构数-身份证",
      als_d7_id_nbank_nsloan_orgnum: "近7天持牌网络小贷机构申请机构数-身份证",
      als_d7_id_nbank_autofin_orgnum: "近7天持牌汽车金融机构申请机构数-身份证",
      als_d7_id_nbank_sloan_orgnum: "近7天持牌小贷机构申请机构数-身份证",
      als_d7_id_nbank_cons_orgnum: "近7天持牌消费金融机构申请机构数-身份证",
      als_d7_id_nbank_finlea_orgnum: "近7天持牌融资租赁机构申请机构数-身份证",
      als_d7_id_nbank_night_allnum: "近7天在非银机构夜间申请次数-身份证",
      als_d7_id_nbank_night_orgnum: "近7天在非银机构夜间申请机构数-身份证",
      als_d7_cell_pdl_allnum: "近7天申请小额现金贷次数-手机",
      als_d7_cell_pdl_orgnum: "近7天申请小额现金贷机构数-手机",
      als_d7_cell_caon_allnum: "近7天申请现金分期次数-手机",
      als_d7_cell_caon_orgnum: "近7天申请现金分期的机构数-手机",
      als_d7_cell_rel_allnum: "近7天申请信用卡次数-手机",
      als_d7_cell_rel_orgnum: "近7天申请信用卡机构数-手机",
      als_d7_cell_cooff_allnum: "近7天申请消费分期次数-手机",
      als_d7_cell_cooff_orgnum: "近7天申请消费分期机构数-手机",
      als_d7_cell_af_allnum: "近7天申请汽车金融次数-手机",
      als_d7_cell_af_orgnum: "近7天申请汽车金融机构数-手机",
      als_d7_cell_oth_allnum: "近7天申请其他次数-手机",
      als_d7_cell_oth_orgnum: "近7天申请其他机构数-手机",
      als_d7_cell_bank_allnum: "近7天银行申请次数-手机",
      als_d7_cell_bank_orgnum: "近7天银行申请机构数-手机",
      als_d7_cell_nbank_allnum: "近7天非银申请次数-手机",
      als_d7_cell_nbank_p2p_allnum: "近7天p2p机构申请次数-手机",
      als_d7_cell_nbank_mc_allnum: "近7天小贷机构申请次数-手机",
      als_d7_cell_nbank_ca_allnum: "近7天现金类分期机构申请次数-手机",
      als_d7_cell_nbank_cf_allnum: "近7天消费类分期机构申请次数-手机",
      als_d7_cell_nbank_com_allnum: "近7天代偿类分期机构申请次数-手机",
      als_d7_cell_nbank_oth_allnum: "近7天其他申请次数-手机",
      als_d7_cell_nbank_nsloan_allnum: "近7天持牌网络小贷机构申请次数-手机",
      als_d7_cell_nbank_autofin_allnum: "近7天持牌汽车金融机构申请次数-手机",
      als_d7_cell_nbank_sloan_allnum: "近7天持牌小贷机构申请次数-手机",
      als_d7_cell_nbank_cons_allnum: "近7天持牌消费金融机构申请次数-手机",
      als_d7_cell_nbank_finlea_allnum: "近7天持牌融资租赁机构申请次数-手机",
      als_d7_cell_nbank_orgnum: "近7天非银申请机构数-手机",
      als_d7_cell_nbank_p2p_orgnum: "近7天p2p申请机构数-手机",
      als_d7_cell_nbank_mc_orgnum: "近7天小贷申请机构数-手机",
      als_d7_cell_nbank_ca_orgnum: "近7天现金类分期申请机构数-手机",
      als_d7_cell_nbank_cf_orgnum: "近7天消费类分期申请机构数-手机",
      als_d7_cell_nbank_com_orgnum: "近7天代偿类分期申请机构数-手机",
      als_d7_cell_nbank_oth_orgnum: "近7天其他申请机构数-手机",
      als_d7_cell_nbank_nsloan_orgnum: "近7天持牌网络小贷机构申请机构数-手机",
      als_d7_cell_nbank_autofin_orgnum: "近7天持牌汽车金融机构申请机构数-手机",
      als_d7_cell_nbank_sloan_orgnum: "近7天持牌小贷机构申请机构数-手机",
      als_d7_cell_nbank_cons_orgnum: "近7天持牌消费金融机构申请机构数-手机",
      als_d7_cell_nbank_finlea_orgnum: "近7天持牌融资租赁机构申请机构数-手机",
      als_d7_cell_nbank_night_allnum: "近7天在非银机构夜间申请次数-手机",
      als_d7_cell_nbank_night_orgnum: "近7天在非银机构夜间申请机构数-手机",
      als_d15_id_pdl_allnum: "近15天申请小额现金贷次数-身份证",
      als_d15_id_pdl_orgnum: "近15天申请小额现金贷机构数-身份证",
      als_d15_id_caon_allnum: "近15天申请现金分期次数-身份证",
      als_d15_id_caon_orgnum: "近15天申请现金分期的机构数-身份证",
      als_d15_id_rel_allnum: "近15天申请信用卡次数-身份证",
      als_d15_id_rel_orgnum: "近15天申请信用卡机构数-身份证",
      als_d15_id_cooff_allnum: "近15天申请消费分期次数-身份证",
      als_d15_id_cooff_orgnum: "近15天申请消费分期机构数-身份证",
      als_d15_id_af_allnum: "近15天申请汽车金融次数-身份证",
      als_d15_id_af_orgnum: "近15天申请汽车金融机构数-身份证",
      als_d15_id_oth_allnum: "近15天申请其他次数-身份证",
      als_d15_id_oth_orgnum: "近15天申请其他机构数-身份证",
      als_d15_id_bank_allnum: "近15天银行申请次数-身份证",
      als_d15_id_bank_orgnum: "近15天银行申请机构数-身份证",
      als_d15_id_nbank_allnum: "近15天非银申请次数-身份证",
      als_d15_id_nbank_p2p_allnum: "近15天p2p机构申请次数-身份证",
      als_d15_id_nbank_mc_allnum: "近15天小贷机构申请次数-身份证",
      als_d15_id_nbank_ca_allnum: "近15天现金类分期机构申请次数-身份证",
      als_d15_id_nbank_cf_allnum: "近15天消费类分期机构申请次数-身份证",
      als_d15_id_nbank_com_allnum: "近15天代偿类分期机构申请次数-身份证",
      als_d15_id_nbank_oth_allnum: "近15天其他申请次数-身份证",
      als_d15_id_nbank_nsloan_allnum: "近15天持牌网络小贷机构申请次数-身份证",
      als_d15_id_nbank_autofin_allnum: "近15天持牌汽车金融机构申请次数-身份证",
      als_d15_id_nbank_sloan_allnum: "近15天持牌小贷机构申请次数-身份证",
      als_d15_id_nbank_cons_allnum: "近15天持牌消费金融机构申请次数-身份证",
      als_d15_id_nbank_finlea_allnum: "近15天持牌融资租赁机构申请次数-身份证",
      als_d15_id_nbank_orgnum: "近15天非银申请机构数-身份证",
      als_d15_id_nbank_p2p_orgnum: "近15天p2p申请机构数-身份证",
      als_d15_id_nbank_mc_orgnum: "近15天小贷申请机构数-身份证",
      als_d15_id_nbank_ca_orgnum: "近15天现金类分期申请机构数-身份证",
      als_d15_id_nbank_cf_orgnum: "近15天消费类分期申请机构数-身份证",
      als_d15_id_nbank_com_orgnum: "近15天代偿类分期申请机构数-身份证",
      als_d15_id_nbank_oth_orgnum: "近15天其他申请机构数-身份证",
      als_d15_id_nbank_nsloan_orgnum: "近15天持牌网络小贷机构申请机构数-身份证",
      als_d15_id_nbank_autofin_orgnum: "近15天持牌汽车金融机构申请机构数-身份证",
      als_d15_id_nbank_sloan_orgnum: "近15天持牌小贷机构申请机构数-身份证",
      als_d15_id_nbank_cons_orgnum: "近15天持牌消费金融机构申请机构数-身份证",
      als_d15_id_nbank_finlea_orgnum: "近15天持牌融资租赁机构申请机构数-身份证",
      als_d15_id_nbank_night_allnum: "近15天在非银机构夜间申请次数-身份证",
      als_d15_id_nbank_night_orgnum: "近15天在非银机构夜间申请机构数-身份证",
      als_d15_cell_pdl_allnum: "近15天申请小额现金贷次数-手机号",
      als_d15_cell_pdl_orgnum: "近15天申请小额现金贷机构数-手机号",
      als_d15_cell_caon_allnum: "近15天申请现金分期次数-手机号",
      als_d15_cell_caon_orgnum: "近15天申请现金分期的机构数-手机号",
      als_d15_cell_rel_allnum: "近15天申请信用卡次数-手机号",
      als_d15_cell_rel_orgnum: "近15天申请信用卡机构数-手机号",
      als_d15_cell_cooff_allnum: "近15天申请消费分期次数-手机号",
      als_d15_cell_cooff_orgnum: "近15天申请消费分期机构数-手机号",
      als_d15_cell_af_allnum: "近15天申请汽车金融次数-手机号",
      als_d15_cell_af_orgnum: "近15天申请汽车金融机构数-手机号",
      als_d15_cell_oth_allnum: "近15天申请其他次数-手机号",
      als_d15_cell_oth_orgnum: "近15天申请其他机构数-手机号",
      als_d15_cell_bank_allnum: "近15天银行申请次数-手机号",
      als_d15_cell_bank_orgnum: "近15天银行申请机构数-手机号",
      als_d15_cell_nbank_allnum: "近15天非银申请次数-手机号",
      als_d15_cell_nbank_p2p_allnum: "近15天p2p机构申请次数-手机号",
      als_d15_cell_nbank_mc_allnum: "近15天小贷机构申请次数-手机号",
      als_d15_cell_nbank_ca_allnum: "近15天现金类分期机构申请次数-手机号",
      als_d15_cell_nbank_cf_allnum: "近15天消费类分期机构申请次数-手机号",
      als_d15_cell_nbank_com_allnum: "近15天代偿类分期机构申请次数-手机号",
      als_d15_cell_nbank_oth_allnum: "近15天其他申请次数-手机号",
      als_d15_cell_nbank_nsloan_allnum: "近15天持牌网络小贷机构申请次数-手机号",
      als_d15_cell_nbank_autofin_allnum: "近15天持牌汽车金融机构申请次数-手机号",
      als_d15_cell_nbank_sloan_allnum: "近15天持牌小贷机构申请次数-手机号",
      als_d15_cell_nbank_cons_allnum: "近15天持牌消费金融机构申请次数-手机号",
      als_d15_cell_nbank_finlea_allnum: "近15天持牌融资租赁机构申请次数-手机号",
      als_d15_cell_nbank_orgnum: "近15天非银申请机构数-手机号",
      als_d15_cell_nbank_p2p_orgnum: "近15天p2p申请机构数-手机号",
      als_d15_cell_nbank_mc_orgnum: "近15天小贷申请机构数-手机号",
      als_d15_cell_nbank_ca_orgnum: "近15天现金类分期申请机构数-手机号",
      als_d15_cell_nbank_cf_orgnum: "近15天消费类分期申请机构数-手机号",
      als_d15_cell_nbank_com_orgnum: "近15天代偿类分期申请机构数-手机号",
      als_d15_cell_nbank_oth_orgnum: "近15天其他申请机构数-手机号",
      als_d15_cell_nbank_nsloan_orgnum: "近15天持牌网络小贷机构申请机构数-手机号",
      als_d15_cell_nbank_autofin_orgnum: "近15天持牌汽车金融机构申请机构数-手机号",
      als_d15_cell_nbank_sloan_orgnum: "近15天持牌小贷机构申请机构数-手机号",
      als_d15_cell_nbank_cons_orgnum: "近15天持牌消费金融机构申请机构数-手机号",
      als_d15_cell_nbank_finlea_orgnum: "近15天持牌融资租赁机构申请机构数-手机号",
      als_m1_id_pdl_allnum: "近1个月申请小额现金贷次数-身份证",
      als_m1_id_pdl_orgnum: "近1个月申请小额现金贷机构数-身份证",
      als_m1_id_caon_allnum: "近1个月申请现金分期次数-身份证",
      als_m1_id_caon_orgnum: "近1个月申请现金分期机构数-身份证",
      als_m1_id_rel_allnum: "近1个月申请信用卡次数-身份证",
      als_m1_id_rel_orgnum: "近1个月申请信用卡机构数-身份证",
      als_m1_id_cooff_allnum: "近1个月申请消费分期次数-身份证",
      als_m1_id_cooff_orgnum: "近1个月申请消费分期机构数-身份证",
      als_m1_id_af_allnum: "近1个月申请汽车金融次数-身份证",
      als_m1_id_af_orgnum: "近1个月申请汽车金融机构数-身份证",
      als_m1_id_oth_allnum: "近1个月申请其他次数-身份证",
      als_m1_id_oth_orgnum: "近1个月申请其他机构数-身份证",
      als_m1_id_bank_allnum: "近1个月银行申请次数-身份证",
      als_m1_id_bank_selfnum: "近1个月在本机构-本机构为银行的申请次数-身份证",
      als_m1_id_bank_tra_allnum: "近1个月在银行机构-传统银行申请次数-身份证",
      als_m1_id_bank_ret_allnum: "近1个月在银行机构-网络零售银行申请次数-身份证",
      als_m1_id_bank_orgnum: "近1个月银行申请机构数-身份证",
      als_m1_id_nbank_allnum: "近1个月非银机构申请次数-身份证",
      als_m1_id_nbank_p2p_allnum: "近1个月p2p机构申请次数-身份证",
      als_m1_id_nbank_mc_allnum: "近1个月小贷机构申请次数-身份证",
      als_m1_id_nbank_ca_allnum: "近1个月现金类分期机构申请次数-身份证",
      als_m1_id_nbank_cf_allnum: "近1个月消费类分期机构申请次数-身份证",
      als_m1_id_nbank_com_allnum: "近1个月代偿类分期机构申请次数-身份证",
      als_m1_id_nbank_oth_allnum: "近1个月其他申请次数-身份证",
      als_m1_id_nbank_nsloan_allnum: "近1个月持牌网络小贷机构申请次数-身份证",
      als_m1_id_nbank_autofin_allnum: "近1个月持牌汽车金融机构申请次数-身份证",
      als_m1_id_nbank_sloan_allnum: "近1个月持牌小贷机构申请次数-身份证",
      als_m1_id_nbank_cons_allnum: "近1个月持牌消费金融机构申请次数-身份证",
      als_m1_id_nbank_finlea_allnum: "近1个月持牌融资租赁机构申请次数-身份证",
      als_m1_id_nbank_orgnum: "近1个月非银申请机构数-身份证",
      als_m1_id_nbank_p2p_orgnum: "近1个月p2p申请机构数-身份证",
      als_m1_id_nbank_mc_orgnum: "近1个月小贷申请机构数-身份证",
      als_m1_id_nbank_ca_orgnum: "近1个月现金类分期申请机构数-身份证",
      als_m1_id_nbank_cf_orgnum: "近1个月消费类分期申请机构数-身份证",
      als_m1_id_nbank_com_orgnum: "近1个月代偿类分期申请机构数-身份证",
      als_m1_id_nbank_oth_orgnum: "近1个月其他申请机构数-身份证",
      als_m1_id_nbank_nsloan_orgnum: "近1个月持牌网络小贷机构申请机构数-身份证",
      als_m1_id_nbank_autofin_orgnum: "近1个月持牌汽车金融机构申请机构数-身份证",
      als_m1_id_nbank_sloan_orgnum: "近1个月持牌小贷机构申请机构数-身份证",
      als_m1_id_nbank_cons_orgnum: "近1个月持牌消费金融机构申请机构数-身份证",
      als_m1_id_nbank_finlea_orgnum: "近1个月持牌融资租赁机构申请机构数-身份证",
      als_m1_id_nbank_night_allnum: "近1个月在非银机构夜间申请次数-身份证",
      als_m1_id_nbank_night_orgnum: "近1个月在非银机构夜间申请机构数-身份证",
      als_m1_cell_pdl_allnum: "近1个月申请小额现金贷次数-手机号",
      als_m1_cell_pdl_orgnum: "近1个月申请小额现金贷机构数-手机号",
      als_m1_cell_caon_allnum: "近1个月申请现金分期次数-手机号",
      als_m1_cell_caon_orgnum: "近1个月申请现金分期机构数-手机号",
      als_m1_cell_rel_allnum: "近1个月申请信用卡次数-手机号",
      als_m1_cell_rel_orgnum: "近1个月申请信用卡机构数-手机号",
      als_m1_cell_cooff_allnum: "近1个月申请消费分期次数-手机号",
      als_m1_cell_cooff_orgnum: "近1个月申请消费分期机构数-手机号",
      als_m1_cell_af_allnum: "近1个月申请汽车金融次数-手机号",
      als_m1_cell_af_orgnum: "近1个月申请汽车金融机构数-手机号",
      als_m1_cell_oth_allnum: "近1个月申请其他次数-手机号",
      als_m1_cell_oth_orgnum: "近1个月申请其他机构数-手机号",
      als_m1_cell_bank_allnum: "近1个月银行申请次数-手机号",
      als_m1_cell_bank_orgnum: "近1个月银行申请机构数-手机号",
      als_m1_cell_nbank_allnum: "近1个月非银机构申请次数-手机号",
      als_m1_cell_nbank_p2p_allnum: "近1个月p2p机构申请次数-手机号",
      als_m1_cell_nbank_mc_allnum: "近1个月小贷机构申请次数-手机号",
      als_m1_cell_nbank_ca_allnum: "近1个月现金类分期机构申请次数-手机号",
      als_m1_cell_nbank_cf_allnum: "近1个月消费类分期机构申请次数-手机号",
      als_m1_cell_nbank_com_allnum: "近1个月代偿类分期机构申请次数-手机号",
      als_m1_cell_nbank_oth_allnum: "近1个月其他申请次数-手机号",
      als_m1_cell_nbank_nsloan_allnum: "近1个月持牌网络小贷机构申请次数-手机号",
      als_m1_cell_nbank_autofin_allnum: "近1个月持牌汽车金融机构申请次数-手机号",
      als_m1_cell_nbank_sloan_allnum: "近1个月持牌小贷机构申请次数-手机号",
      als_m1_cell_nbank_cons_allnum: "近1个月持牌消费金融机构申请次数-手机号",
      als_m1_cell_nbank_finlea_allnum: "近1个月持牌融资租赁机构申请次数-手机号",
      als_m1_cell_nbank_orgnum: "近1个月非银申请机构数-手机号",
      als_m1_cell_nbank_p2p_orgnum: "近1个月p2p申请机构数-手机号",
      als_m1_cell_nbank_mc_orgnum: "近1个月小贷申请机构数-手机号",
      als_m1_cell_nbank_ca_orgnum: "近1个月现金类分期申请机构数-手机号",
      als_m1_cell_nbank_cf_orgnum: "近1个月消费类分期申请机构数-手机号",
      als_m1_cell_nbank_com_orgnum: "近1个月代偿类分期申请机构数-手机号",
      als_m1_cell_nbank_oth_orgnum: "近1个月其他申请机构数-手机号",
      als_m1_cell_nbank_nsloan_orgnum: "近1个月持牌网络小贷机构申请机构数-手机号",
      als_m1_cell_nbank_autofin_orgnum: "近1个月持牌汽车金融机构申请机构数-手机号",
      als_m1_cell_nbank_sloan_orgnum: "近1个月持牌小贷机构申请机构数-手机号",
      als_m1_cell_nbank_cons_orgnum: "近1个月持牌消费金融机构申请机构数-手机号",
      als_m1_cell_nbank_finlea_orgnum: "近1个月持牌融资租赁机构申请机构数-手机号",
      als_m1_cell_nbank_night_allnum: "近1个月在非银机构夜间申请次数-手机号",
      als_m1_cell_nbank_night_orgnum: "近1个月在非银机构夜间申请机构数-手机号",
      als_m3_id_avg_monnum: "近3个月平均每月申请次数-身份证",
      als_m3_id_pdl_allnum: "近3个月申请线上小额现金贷次数-身份证",
      als_m3_id_pdl_orgnum: "近3个月申请线上小额现金贷机构数-身份证",
      als_m3_id_caon_allnum: "近3个月申请现金分期次数-身份证",
      als_m3_id_caon_orgnum: "近3个月申请现金分期机构数-身份证",
      als_m3_id_rel_allnum: "近3个月申请信用卡次数-身份证",
      als_m3_id_rel_orgnum: "近3个月申请信用卡机构数-身份证",
      als_m3_id_cooff_allnum: "近3个月申请消费分期次数-身份证",
      als_m3_id_cooff_orgnum: "近3个月申请消费分期机构数-身份证",
      als_m3_id_af_allnum: "近3个月申请汽车金融次数-身份证",
      als_m3_id_af_orgnum: "近3个月申请汽车金融机构数-身份证",
      als_m3_id_oth_allnum: "近3个月申请其他次数-身份证",
      als_m3_id_oth_orgnum: "近3个月申请其他机构数-身份证",
      als_m3_id_bank_allnum: "近3个月银行申请次数-身份证",
      als_m3_id_bank_orgnum: "近3个月银行申请机构数-身份证",
      als_m3_id_nbank_selfnum: "近3个月本机构申请次数-身份证",
      als_m3_id_nbank_allnum: "近3个月非银机构申请次数-身份证",
      als_m3_id_nbank_p2p_allnum: "近3个月p2p机构申请次数-身份证",
      als_m3_id_nbank_mc_allnum: "近3个月小贷机构申请次数-身份证",
      als_m3_id_nbank_ca_allnum: "近3个月现金类分期机构申请次数-身份证",
      als_m3_id_nbank_cf_allnum: "近3个月消费类分期机构申请次数-身份证",
      als_m3_id_nbank_com_allnum: "近3个月代偿类分期机构申请次数-身份证",
      als_m3_id_nbank_oth_allnum: "近3个月其他申请次数-身份证",
      als_m3_id_nbank_nsloan_allnum: "近3个月持牌网络小贷机构申请次数-身份证",
      als_m3_id_nbank_autofin_allnum: "近3个月持牌汽车金融机构申请次数-身份证",
      als_m3_id_nbank_sloan_allnum: "近3个月持牌小贷机构申请次数-身份证",
      als_m3_id_nbank_cons_allnum: "近3个月持牌消费金融机构申请次数-身份证",
      als_m3_id_nbank_finlea_allnum: "近3个月持牌融资租赁机构申请次数-身份证",
      als_m3_id_nbank_orgnum: "近3个月在非银机构申请机构数-身份证",
      als_m3_id_nbank_p2p_orgnum: "近3个月p2p申请机构数-身份证",
      als_m3_id_nbank_mc_orgnum: "近3个月小贷申请机构数-身份证",
      als_m3_id_nbank_ca_orgnum: "近3个月现金类分期申请机构数-身份证",
      als_m3_id_nbank_cf_orgnum: "近3个月消费类分期申请机构数-身份证",
      als_m3_id_nbank_com_orgnum: "近3个月代偿类分期申请机构数-身份证",
      als_m3_id_nbank_oth_orgnum: "近3个月其他申请机构数-身份证",
      als_m3_id_nbank_nsloan_orgnum: "近3个月持牌网络小贷机构申请机构数-身份证",
      als_m3_id_nbank_autofin_orgnum: "近3个月持牌汽车金融机构申请机构数-身份证",
      als_m3_id_nbank_sloan_orgnum: "近3个月持牌小贷机构申请机构数-身份证",
      als_m3_id_nbank_cons_orgnum: "近3个月持牌消费金融机构申请机构数-身份证",
      als_m3_id_nbank_finlea_orgnum: "近3个月持牌融资租赁机构申请机构数-身份证",
      als_m3_id_nbank_avg_monnum: "近3个月非银机构平均每月申请次数-身份证",
      als_m3_id_nbank_night_allnum: "近3个月在非银机构夜间申请次数-身份证",
      als_m3_id_nbank_night_orgnum: "近3个月在非银机构夜间申请机构数-身份证",
      als_m3_cell_avg_monnum: "近3个月平均每月申请次数-手机号",
      als_m3_cell_pdl_allnum: "近3个月申请线上小额现金贷次数-手机号",
      als_m3_cell_pdl_orgnum: "近3个月申请线上小额现金贷机构数-手机号",
      als_m3_cell_caon_allnum: "近3个月申请现金分期次数-手机号",
      als_m3_cell_caon_orgnum: "近3个月申请现金分期机构数-手机号",
      als_m3_cell_rel_allnum: "近3个月申请信用卡次数-手机号",
      als_m3_cell_rel_orgnum: "近3个月申请信用卡机构数-手机号",
      als_m3_cell_cooff_allnum: "近3个月申请消费分期次数-手机号",
      als_m3_cell_cooff_orgnum: "近3个月申请消费分期机构数-手机号",
      als_m3_cell_af_allnum: "近3个月申请汽车金融次数-手机号",
      als_m3_cell_af_orgnum: "近3个月申请汽车金融机构数-手机号",
      als_m3_cell_oth_allnum: "近3个月申请其他次数-手机号",
      als_m3_cell_oth_orgnum: "近3个月申请其他机构数-手机号",
      als_m3_cell_bank_allnum: "近3个月银行申请次数-手机号",
      als_m3_cell_bank_orgnum: "近3个月银行申请机构数-手机号",
      als_m3_cell_nbank_selfnum: "近3个月本机构申请次数-手机号",
      als_m3_cell_nbank_allnum: "近3个月非银机构申请次数-手机号",
      als_m3_cell_nbank_p2p_allnum: "近3个月p2p机构申请次数-手机号",
      als_m3_cell_nbank_mc_allnum: "近3个月小贷机构申请次数-手机号",
      als_m3_cell_nbank_ca_allnum: "近3个月现金类分期机构申请次数-手机号",
      als_m3_cell_nbank_cf_allnum: "近3个月消费类分期机构申请次数-手机号",
      als_m3_cell_nbank_com_allnum: "近3个月代偿类分期机构申请次数-手机号",
      als_m3_cell_nbank_oth_allnum: "近3个月其他申请次数-手机号",
      als_m3_cell_nbank_nsloan_allnum: "近3个月持牌网络小贷机构申请次数-手机号",
      als_m3_cell_nbank_autofin_allnum: "近3个月持牌汽车金融机构申请次数-手机号",
      als_m3_cell_nbank_sloan_allnum: "近3个月持牌小贷机构申请次数-手机号",
      als_m3_cell_nbank_cons_allnum: "近3个月持牌消费金融机构申请次数-手机号",
      als_m3_cell_nbank_finlea_allnum: "近3个月持牌融资租赁机构申请次数-手机号",
      als_m3_cell_nbank_orgnum: "近3个月在非银机构申请机构数-手机号",
      als_m3_cell_nbank_p2p_orgnum: "近3个月p2p申请机构数-手机号",
      als_m3_cell_nbank_mc_orgnum: "近3个月小贷申请机构数-手机号",
      als_m3_cell_nbank_ca_orgnum: "近3个月现金类分期申请机构数-手机号",
      als_m3_cell_nbank_cf_orgnum: "近3个月消费类分期申请机构数-手机号",
      als_m3_cell_nbank_com_orgnum: "近3个月代偿类分期申请机构数-手机号",
      als_m3_cell_nbank_oth_orgnum: "近3个月其他申请机构数-手机号",
      als_m3_cell_nbank_nsloan_orgnum: "近3个月持牌网络小贷机构申请机构数-手机号",
      als_m3_cell_nbank_autofin_orgnum: "近3个月持牌汽车金融机构申请机构数-手机号",
      als_m3_cell_nbank_sloan_orgnum: "近3个月持牌小贷机构申请机构数-手机号",
      als_m3_cell_nbank_cons_orgnum: "近3个月持牌消费金融机构申请机构数-手机号",
      als_m3_cell_nbank_finlea_orgnum: "近3个月持牌融资租赁机构申请机构数-手机号",
      als_m3_cell_nbank_avg_monnum: "近3个月非银机构平均每月申请次数-手机号",
      als_m3_cell_nbank_night_allnum: "近3个月在非银机构夜间申请次数-手机号",
      als_m3_cell_nbank_night_orgnum: "近3个月在非银机构夜间申请机构数-手机号",
      als_m6_id_pdl_allnum: "近6个月申请小额现金贷次数-身份证",
      als_m6_id_pdl_orgnum: "近6个月申请小额现金贷机构数-身份证",
      als_m6_id_caon_allnum: "近6个月申请现金分期次数-身份证",
      als_m6_id_caon_orgnum: "近6个月申请现金分期机构数-身份证",
      als_m6_id_rel_allnum: "近6个月申请信用卡次数-身份证",
      als_m6_id_rel_orgnum: "近6个月申请信用卡机构数-身份证",
      als_m6_id_cooff_allnum: "近6个月申请消费分期次数-身份证",
      als_m6_id_cooff_orgnum: "近6个月申请消费分期机构数-身份证",
      als_m6_id_af_allnum: "近6个月申请汽车金融次数-身份证",
      als_m6_id_af_orgnum: "近6个月申请汽车金融机构数-身份证",
      als_m6_id_oth_allnum: "近6个月申请其他次数-身份证",
      als_m6_id_oth_orgnum: "近6个月申请其他机构数-身份证",
      als_m6_id_bank_allnum: "近6个月银行申请次数-身份证",
      als_m6_id_bank_orgnum: "近6个月银行申请机构数-身份证",
      als_m6_id_nbank_allnum: "近6个月在非银机构申请次数-身份证",
      als_m6_id_nbank_p2p_allnum: "近6个月p2p机构申请次数-身份证",
      als_m6_id_nbank_mc_allnum: "近6个月小贷机构申请次数-身份证",
      als_m6_id_nbank_ca_allnum: "近6个月现金类分期机构申请次数-身份证",
      als_m6_id_nbank_cf_allnum: "近6个月消费类分期机构申请次数-身份证",
      als_m6_id_nbank_com_allnum: "近6个月代偿类分期机构申请次数-身份证",
      als_m6_id_nbank_oth_allnum: "近6个月其他申请次数-身份证",
      als_m6_id_nbank_nsloan_allnum: "近6个月持牌网络小贷机构申请次数-身份证",
      als_m6_id_nbank_autofin_allnum: "近6个月持牌汽车金融机构申请次数-身份证",
      als_m6_id_nbank_sloan_allnum: "近6个月持牌小贷机构申请次数-身份证",
      als_m6_id_nbank_cons_allnum: "近6个月持牌消费金融机构申请次数-身份证",
      als_m6_id_nbank_finlea_allnum: "近6个月持牌融资租赁机构申请次数-身份证",
      als_m6_id_nbank_orgnum: "近6个月在非银机构申请机构数-身份证",
      als_m6_id_nbank_p2p_orgnum: "近6个月p2p申请机构数-身份证",
      als_m6_id_nbank_mc_orgnum: "近6个月小贷申请机构数-身份证",
      als_m6_id_nbank_ca_orgnum: "近6个月现金类分期申请机构数-身份证",
      als_m6_id_nbank_cf_orgnum: "近6个月消费类分期申请机构数-身份证",
      als_m6_id_nbank_com_orgnum: "近6个月代偿类分期申请机构数-身份证",
      als_m6_id_nbank_oth_orgnum: "近6个月其他申请机构数-身份证",
      als_m6_id_nbank_nsloan_orgnum: "近6个月持牌网络小贷机构申请机构数-身份证",
      als_m6_id_nbank_autofin_orgnum: "近6个月持牌汽车金融机构申请机构数-身份证",
      als_m6_id_nbank_sloan_orgnum: "近6个月持牌小贷机构申请机构数-身份证",
      als_m6_id_nbank_cons_orgnum: "近6个月持牌消费金融机构申请机构数-身份证",
      als_m6_id_nbank_finlea_orgnum: "近6个月持牌融资租赁机构申请机构数-身份证",
      als_m6_id_nbank_avg_monnum: "近6个月在非银机构平均每月申请次数-身份证",
      als_m6_id_nbank_night_allnum: "近6个月在非银机构夜间申请次数-身份证",
      als_m6_id_nbank_night_orgnum: "近6个月在非银机构夜间申请机构数-身份证",
      als_m6_cell_pdl_allnum: "近6个月申请小额现金贷次数-手机号",
      als_m6_cell_pdl_orgnum: "近6个月申请小额现金贷机构数-手机号",
      als_m6_cell_caon_allnum: "近6个月申请现金分期次数-手机号",
      als_m6_cell_caon_orgnum: "近6个月申请现金分期机构数-手机号",
      als_m6_cell_rel_allnum: "近6个月申请信用卡次数-手机号",
      als_m6_cell_rel_orgnum: "近6个月申请信用卡机构数-手机号",
      als_m6_cell_cooff_allnum: "近6个月申请消费分期次数-手机号",
      als_m6_cell_cooff_orgnum: "近6个月申请消费分期机构数-手机号",
      als_m6_cell_af_allnum: "近6个月申请汽车金融次数-手机号",
      als_m6_cell_af_orgnum: "近6个月申请汽车金融机构数-手机号",
      als_m6_cell_oth_allnum: "近6个月申请其他次数-手机号",
      als_m6_cell_oth_orgnum: "近6个月申请其他机构数-手机号",
      als_m6_cell_bank_allnum: "近6个月银行申请次数-手机号",
      als_m6_cell_bank_orgnum: "近6个月银行申请机构数-手机号",
      als_m6_cell_nbank_allnum: "近6个月在非银机构申请次数-手机号",
      als_m6_cell_nbank_p2p_allnum: "近6个月p2p机构申请次数-手机号",
      als_m6_cell_nbank_mc_allnum: "近6个月小贷机构申请次数-手机号",
      als_m6_cell_nbank_ca_allnum: "近6个月现金类分期机构申请次数-手机号",
      als_m6_cell_nbank_cf_allnum: "近6个月消费类分期机构申请次数-手机号",
      als_m6_cell_nbank_com_allnum: "近6个月代偿类分期机构申请次数-手机号",
      als_m6_cell_nbank_oth_allnum: "近6个月其他申请次数-手机号",
      als_m6_cell_nbank_nsloan_allnum: "近6个月持牌网络小贷机构申请次数-手机号",
      als_m6_cell_nbank_autofin_allnum: "近6个月持牌汽车金融机构申请次数-手机号",
      als_m6_cell_nbank_sloan_allnum: "近6个月持牌小贷机构申请次数-手机号",
      als_m6_cell_nbank_cons_allnum: "近6个月持牌消费金融机构申请次数-手机号",
      als_m6_cell_nbank_finlea_allnum: "近6个月持牌融资租赁机构申请次数-手机号",
      als_m6_cell_nbank_orgnum: "近6个月在非银机构申请机构数-手机号",
      als_m6_cell_nbank_p2p_orgnum: "近6个月p2p申请机构数-手机号",
      als_m6_cell_nbank_mc_orgnum: "近6个月小贷申请机构数-手机号",
      als_m6_cell_nbank_ca_orgnum: "近6个月现金类分期申请机构数-手机号",
      als_m6_cell_nbank_cf_orgnum: "近6个月消费类分期申请机构数-手机号",
      als_m6_cell_nbank_com_orgnum: "近6个月代偿类分期申请机构数-手机号",
      als_m6_cell_nbank_oth_orgnum: "近6个月其他申请机构数-手机号",
      als_m6_cell_nbank_nsloan_orgnum: "近6个月持牌网络小贷机构申请机构数-手机号",
      als_m6_cell_nbank_autofin_orgnum: "近6个月持牌汽车金融机构申请机构数-手机号",
      als_m6_cell_nbank_sloan_orgnum: "近6个月持牌小贷机构申请机构数-手机号",
      als_m6_cell_nbank_cons_orgnum: "近6个月持牌消费金融机构申请机构数-手机号",
      als_m6_cell_nbank_finlea_orgnum: "近6个月持牌融资租赁机构申请机构数-手机号",
      als_m6_cell_nbank_avg_monnum: "近6个月在非银机构平均每月申请次数-手机号",
      als_m6_cell_nbank_night_allnum: "近6个月在非银机构夜间申请次数-手机号",
      als_m6_cell_nbank_night_orgnum: "近6个月在非银机构夜间申请机构数-手机号",
      als_m12_id_pdl_allnum: "近12个月申请小额现金贷次数-身份证",
      als_m12_id_pdl_orgnum: "近12个月申请小额现金贷机构数-身份证",
      als_m12_id_caon_allnum: "近12个月申请现金分期次数-身份证",
      als_m12_id_caon_orgnum: "近12个月申请现金分期机构数-身份证",
      als_m12_id_rel_allnum: "近12个月申请信用卡次数-身份证",
      als_m12_id_rel_orgnum: "近12个月申请信用卡机构数-身份证",
      als_m12_id_cooff_allnum: "近12个月申请消费分期次数-身份证",
      als_m12_id_cooff_orgnum: "近12个月申请消费分期机构数-身份证",
      als_m12_id_af_allnum: "近12个月申请汽车金融次数-身份证",
      als_m12_id_af_orgnum: "近12个月申请汽车金融机构数-身份证",
      als_m12_id_oth_allnum: "近12个月申请其他次数-身份证",
      als_m12_id_oth_orgnum: "近12个月申请其他机构数-身份证",
      als_m12_id_bank_allnum: "近12个月银行申请次数-身份证",
      als_m12_id_bank_orgnum: "近12个月银行申请机构数-身份证",
      als_m12_id_nbank_allnum: "近12个月在非银机构申请次数-身份证",
      als_m12_id_nbank_p2p_allnum: "近12个月p2p机构申请次数-身份证",
      als_m12_id_nbank_mc_allnum: "近12个月小贷机构申请次数-身份证",
      als_m12_id_nbank_ca_allnum: "近12个月现金类分期机构申请次数-身份证",
      als_m12_id_nbank_cf_allnum: "近12个月消费类分期机构申请次数-身份证",
      als_m12_id_nbank_com_allnum: "近12个月代偿类分期机构申请次数-身份证",
      als_m12_id_nbank_oth_allnum: "近12个月其他申请次数-身份证",
      als_m12_id_nbank_nsloan_allnum: "近12个月持牌网络小贷机构申请次数-身份证",
      als_m12_id_nbank_autofin_allnum: "近12个月持牌汽车金融机构申请次数-身份证",
      als_m12_id_nbank_sloan_allnum: "近12个月持牌小贷机构申请次数-身份证",
      als_m12_id_nbank_cons_allnum: "近12个月持牌消费金融机构申请次数-身份证",
      als_m12_id_nbank_finlea_allnum: "近12个月持牌融资租赁机构申请次数-身份证",
      als_m12_id_nbank_orgnum: "近12个月在非银机构申请机构数-身份证",
      als_m12_id_nbank_p2p_orgnum: "近12个月p2p申请机构数-身份证",
      als_m12_id_nbank_mc_orgnum: "近12个月小贷申请机构数-身份证",
      als_m12_id_nbank_ca_orgnum: "近12个月现金类分期申请机构数-身份证",
      als_m12_id_nbank_cf_orgnum: "近12个月消费类分期申请机构数-身份证",
      als_m12_id_nbank_com_orgnum: "近12个月代偿类分期申请机构数-身份证",
      als_m12_id_nbank_oth_orgnum: "近12个月其他申请机构数-身份证",
      als_m12_id_nbank_nsloan_orgnum: "近12个月持牌网络小贷机构申请机构数-身份证",
      als_m12_id_nbank_autofin_orgnum: "近12个月持牌汽车金融机构申请机构数-身份证",
      als_m12_id_nbank_sloan_orgnum: "近12个月持牌小贷机构申请机构数-身份证",
      als_m12_id_nbank_cons_orgnum: "近12个月持牌消费金融机构申请机构数-身份证",
      als_m12_id_nbank_finlea_orgnum: "近12个月持牌融资租赁机构申请机构数-身份证",
      als_m12_id_nbank_avg_monnum: "近12个月在非银机构平均每月申请次数-身份证",
      als_m12_id_nbank_night_allnum: "近12个月在非银机构夜间申请次数-身份证",
      als_m12_id_nbank_night_orgnum: "近12个月在非银机构夜间申请机构数-身份证",
      als_m12_cell_pdl_allnum: "近12个月申请小额现金贷次数-手机号",
      als_m12_cell_pdl_orgnum: "近12个月申请小额现金贷机构数-手机号",
      als_m12_cell_caon_allnum: "近12个月申请现金分期次数-手机号",
      als_m12_cell_caon_orgnum: "近12个月申请现金分期机构数-手机号",
      als_m12_cell_rel_allnum: "近12个月申请信用卡次数-手机号",
      als_m12_cell_rel_orgnum: "近12个月申请信用卡机构数-手机号",
      als_m12_cell_cooff_allnum: "近12个月申请消费分期次数-手机号",
      als_m12_cell_cooff_orgnum: "近12个月申请消费分期机构数-手机号",
      als_m12_cell_af_allnum: "近12个月申请汽车金融次数-手机号",
      als_m12_cell_af_orgnum: "近12个月申请汽车金融机构数-手机号",
      als_m12_cell_oth_allnum: "近12个月申请其他次数-手机号",
      als_m12_cell_oth_orgnum: "近12个月申请其他机构数-手机号",
      als_m12_cell_bank_allnum: "近12个月银行申请次数-手机号",
      als_m12_cell_bank_orgnum: "近12个月银行申请机构数-手机号",
      als_m12_cell_nbank_allnum: "近12个月在非银机构申请次数-手机号",
      als_m12_cell_nbank_p2p_allnum: "近12个月p2p机构申请次数-手机号",
      als_m12_cell_nbank_mc_allnum: "近12个月小贷机构申请次数-手机号",
      als_m12_cell_nbank_ca_allnum: "近12个月现金类分期机构申请次数-手机号",
      als_m12_cell_nbank_cf_allnum: "近12个月消费类分期机构申请次数-手机号",
      als_m12_cell_nbank_com_allnum: "近12个月代偿类分期机构申请次数-手机号",
      als_m12_cell_nbank_oth_allnum: "近12个月其他申请次数-手机号",
      als_m12_cell_nbank_nsloan_allnum: "近12个月持牌网络小贷机构申请次数-手机号",
      als_m12_cell_nbank_autofin_allnum: "近12个月持牌汽车金融机构申请次数-手机号",
      als_m12_cell_nbank_sloan_allnum: "近12个月持牌小贷机构申请次数-手机号",
      als_m12_cell_nbank_cons_allnum: "近12个月持牌消费金融机构申请次数-手机号",
      als_m12_cell_nbank_finlea_allnum: "近12个月持牌融资租赁机构申请次数-手机号",
      als_m12_cell_nbank_orgnum: "近12个月在非银机构申请机构数-手机号",
      als_m12_cell_nbank_p2p_orgnum: "近12个月p2p申请机构数-手机号",
      als_m12_cell_nbank_mc_orgnum: "近12个月小贷申请机构数-手机号",
      als_m12_cell_nbank_ca_orgnum: "近12个月现金类分期申请机构数-手机号",
      als_m12_cell_nbank_cf_orgnum: "近12个月消费类分期申请机构数-手机号",
      als_m12_cell_nbank_com_orgnum: "近12个月代偿类分期申请机构数-手机号",
      als_m12_cell_nbank_oth_orgnum: "近12个月其他申请机构数-手机号",
      als_m12_cell_nbank_nsloan_orgnum: "近12个月持牌网络小贷机构申请机构数-手机号",
      als_m12_cell_nbank_autofin_orgnum: "近12个月持牌汽车金融机构申请机构数-手机号",
      als_m12_cell_nbank_sloan_orgnum: "近12个月持牌小贷机构申请机构数-手机号",
      als_m12_cell_nbank_cons_orgnum: "近12个月持牌消费金融机构申请机构数-手机号",
      als_m12_cell_nbank_finlea_orgnum: "近12个月持牌融资租赁机构申请机构数-手机号",
      als_m12_cell_nbank_avg_monnum: "近12个月在非银机构平均每月申请次数-手机号",
      als_m12_cell_nbank_night_allnum: "近12个月在非银机构夜间申请次数-手机号",
      als_m12_cell_nbank_night_orgnum: "近12个月在非银机构夜间申请机构数-手机号",
      
      als_d15_id_nbank_else_allnum: '近15天在非银机构其他申请次数-按身份证',
      als_d15_id_nbank_else_orgnum: '近15天在非银机构其他申请机构数-按身份证',
      als_d15_cell_nbank_else_allnum: '近15天在非银机构其他申请次数-手机号',
      als_d15_cell_nbank_else_orgnum: '近15天在非银机构其他申请机构数-手机号',
      als_m1_id_nbank_else_allnum: '近1个月在非银机构其他申请次数-身份证',
      als_m1_id_nbank_else_orgnum: '近1个月在非银机构其他申请机构数-身份证',
      als_m1_cell_nbank_else_allnum: '近1个月在非银机构其他申请次数-手机号',
      als_m1_cell_nbank_else_orgnum: '近1个月在非银机构其他申请机构数-手机号',
      als_m3_id_max_monnum: '按身份证号查询近3个月最大月申请次数 ',
      als_m3_id_bank_max_monnum: '近3个月在银行机构最大月申请次数-身份证',
      als_m3_id_nbank_else_allnum: '近3个月在非银机构其他申请次数-身份证',
      als_m3_id_nbank_else_orgnum: '近3个月在非银机构其他申请机构数-身份证',
      als_m3_id_nbank_tot_mons: '近3个月非银机构有申请记录月份数-身份证',
      als_m3_id_nbank_max_monnum: '近3个月非银机构最大月申请次数-身份证',
      als_m3_id_nbank_min_monnum: '近3个月非银机构最小月申请次数-身份证',
      als_m3_id_nbank_max_inteday: '近3个月非银机构申请最大间隔天数-身份证',
      als_m3_id_nbank_min_inteday: '近3个月非银机构申请最小间隔天数-身份证',
      als_m3_cell_max_monnum: '近3个月最大月申请次数-手机号',
      als_m3_cell_bank_max_monnum: '近3个月在银行机构最大月申请次数-手机号',
      als_m3_cell_nbank_else_allnum: '近3个月在非银机构其他申请次数-手机号',
      als_m3_cell_nbank_else_orgnum: '近3个月在非银机构其他申请机构数-手机号',
      als_m3_cell_nbank_tot_mons: '近3个月非银机构有申请记录月份数-手机号',
      als_m3_cell_nbank_max_monnum: '近3个月非银机构最大月申请次数-手机号',
      als_m3_cell_nbank_min_monnum: '近3个月非银机构最小月申请次数-手机号',
      als_m3_cell_nbank_max_inteday: '近3个月非银机构申请最大间隔天数-手机号',
      als_m3_cell_nbank_min_inteday: '近3个月非银机构申请最小间隔天数-手机号',
      als_m6_id_max_monnum: '近6个月最大月申请次数-身份证',
      als_m6_id_bank_max_monnum: '近6个月在银行机构最大月申请次数-身份证',
      als_m6_id_nbank_else_allnum: '近6个月在非银机构其他申请次数-身份证',
      als_m6_id_nbank_else_orgnum: '近6个月在非银机构其他申请机构数-身份证',
      als_m6_id_nbank_max_monnum: '近6个月在非银机构最大月申请次数-身份证',
      als_m6_cell_max_monnum: '近6个月最大月申请次数-手机号 ',
      als_m6_cell_bank_max_monnum: '近6个月在银行机构最大月申请次数-手机号',
      als_m6_cell_nbank_else_allnum: '近6个月在非银机构其他申请次数-手机号',
      als_m6_cell_nbank_else_orgnum: '近6个月在非银机构其他申请机构数-手机号',
      als_m6_cell_nbank_max_monnum: '近6个月在非银机构最大月申请次数-手机号',      
    },
    //afRiskEvaluation
    {
      acceptCount: "批贷笔数",
      rejectCount: "拒贷笔数",
      onLoanCount: "在贷笔数",
      paybackStatus: "当前还款状态",
      overdueCount: "当前逾期笔数",
      overdueMaxTerm: "当前逾期最大期数",
      overdueAmount: "当前逾期金额",
      overdueM3Sum: "历史M3+逾期次数",
      overdueM6Sum: "历史M6+逾期次数",
      overdueTotalSum: "所有机构历史逾期总次数",
      overdueTotalCount: "所有机构历史逾期总笔数",
      orgCountTotal: "被查询次数",
      otherOrgCount: "查询机构数",
      riskResults: "命中风险名单"    
    },
    //bsRiskList
    {
      result: "是否命中风险黑名单",
      tag: "是否查得",
      message: "命中原因",
      badPlatformNum: "逾期机构数",
      goodPlatformNum: "履约机构数",
      maxMoney: "最大逾期金额",
      lastTime: "最近逾期时间",
      maxDay: "最长逾期天数",
    },
    //bsOverdueDetail
    {
      tag: "是否查得",
      platformNum: "近6个月逾期机构数",
      counts: "近6个月逾期次数",
      loanMoney: "近6个月逾期金额",
      overdueMoney: "逾期金额区间",
      overdueTime: "逾期时间",
      overdueDay: "逾期时长",
      settlement: "是否结清",
    },
    //bsRequestDetail
    {
      tag: "是否查得",
      platformNum: "近12个月申请机构数",
      cfPlatformNum: "近12个月消费金融类申请机构数",
      nlPlatformNum: "近12个月网络贷款类申请机构数",
      applicationTime: "最近一次申请时间",
      applicationNum1: "近1个月申请次数",
      applicationNum3: "近3个月申请次数",
      applicationNum6: "近6个月申请次数",
      applicationNum: "近12个月申请次数",
    },
    //bsLendDetail
    {
      tag: "是否查得",
      platformNum: "近12个月放款机构数",
      cfPlatformNum: "近12个月消费金融类放款机构数",
      nlPlatformNum: "近12个月网络贷款类放款机构数",
      loanLendersNum1: "近1个月放款次数",
      loanLendersNum3: "近3个月放款次数",
      loanLendersNum6: "近6个月放款次数",
      repaySuccNum: "近12个月成功还款次数",
      repayFailNum: "近12个月失败还款次数",
      repaySuccNum1: "近1个月成功还款次数",
      repayFailNum1: "近1个月失败还款次数",
      loanTime: "贷款时长",
      loanLendersTime: "最近一次放款时间",
    },           
    //insideBlacklistDetail
    {
      arbitrarily_hit: '是否命中',
      phone_black_main: '手机号命中黑名单主贷人',
      phone_black_spouse: '手机号命中黑名单配偶',
      phone_black_guarantee: '手机号命中黑名单担保人',
      phone_black_contacts: '手机号命中黑名单联系人',
      id_black_main: '身份证号命中黑名单主贷人',
      id_black_spouse: '身份证号命中黑名单配偶',
      id_black_guarantee: '身份证号命中黑名单担保人',
      id_black_contacts: '身份证号命中黑名单联系人'
    },
    //brTelPeriod
    {
      flag_telperiod: "手机在网时长—移动联通电信产品计费标识",
      pro_result: "查询结果",
      pro_operation: "运营商类型",
      pro_data_value: "手机在网时长区间—移动联通电信",
      pro_costTime: "返回时间",
    }       
  ]

  return dataFilter[code][tableType] || '';
}

//黑名单表格-内部字段-对应过滤器
function blacklistFilter2(code,tableType,value) {
  var dataFilter = [
    //personalCredit
    {
      creditResult: isHitFilter11,
      creditNote: sameBackFilter2,
    },    
    //brSpecialList
    {
      sl_id_abnormal: isHitFilter,
      sl_id_phone_overdue: isHitFilter,
      sl_id_court_bad: isHitFilter,
      sl_id_court_executed: isHitFilter,
      sl_cell_abnormal: isHitFilter,
      sl_cell_phone_overdue: isHitFilter,
      sl_lm_cell_abnormal: isHitFilter,
      sl_lm_cell_phone_overdue: isHitFilter,
      sl_id_bank: riskStateFilter,
      sl_id_p2p: riskStateFilter,
      sl_id_nbank_p2p: riskStateFilter,
      sl_id_nbank_mc: riskStateFilter,
      sl_id_nbank_ca: riskStateFilter,
      sl_id_nbank_com: riskStateFilter,
      sl_id_nbank_cf: riskStateFilter,
      sl_id_nbank_other: riskStateFilter,
      sl_cell_bank: riskStateFilter,
      sl_cell_p2p: riskStateFilter,
      sl_cell_nbank_p2p: riskStateFilter,
      sl_cell_nbank_mc: riskStateFilter,
      sl_cell_nbank_ca: riskStateFilter,
      sl_cell_nbank_com: riskStateFilter,
      sl_cell_nbank_cf: riskStateFilter,
      sl_cell_nbank_other: riskStateFilter,
      sl_lm_cell_bank: riskStateFilter,
      sl_lm_cell_nbank_p2p: riskStateFilter,
      sl_lm_cell_nbank_mc: riskStateFilter,
      sl_lm_cell_nbank_ca: riskStateFilter,
      sl_lm_cell_nbank_com: riskStateFilter,
      sl_lm_cell_nbank_cf: riskStateFilter,
      sl_lm_cell_nbank_other: riskStateFilter,
      arbitrarily_hit: isHitFilter,
    },
    //brBadInfo
    {
      ztCheckresult: isHitFilter,
      sdCheckresult: isHitFilter,
      xdCheckresult: isHitFilter,
      wfxwCheckresult: isHitFilter,
      checkCount2: sameBackFilter,
      caseTypeCode: caseCodeFilter,
    },
    //brExecut
    {
      ex_execut_num: sameBackFilter,
      ex_execut_end_num: sameBackFilter,
      ex_bad_two_year_num: sameBackFilter,
      ex_bad_many_years_num: sameBackFilter
    },
    //brApplyLoan
    {       
      als_d7_id_pdl_orgnum: sameBackFilter,
      als_d7_id_caon_allnum: sameBackFilter,
      als_d7_id_caon_orgnum: sameBackFilter,
      als_d7_id_rel_allnum: sameBackFilter,
      als_d7_id_rel_orgnum: sameBackFilter,
      als_d7_id_cooff_allnum: sameBackFilter,
      als_d7_id_cooff_orgnum: sameBackFilter,
      als_d7_id_af_allnum: sameBackFilter,
      als_d7_id_af_orgnum: sameBackFilter,
      als_d7_id_oth_allnum: sameBackFilter,
      als_d7_id_oth_orgnum: sameBackFilter,
      als_d7_id_bank_allnum: sameBackFilter,
      als_d7_id_bank_orgnum: sameBackFilter,
      als_d7_id_nbank_allnum: sameBackFilter,
      als_d7_id_nbank_p2p_allnum: sameBackFilter,
      als_d7_id_nbank_mc_allnum: sameBackFilter,
      als_d7_id_nbank_ca_allnum: sameBackFilter,
      als_d7_id_nbank_cf_allnum: sameBackFilter,
      als_d7_id_nbank_com_allnum: sameBackFilter,
      als_d7_id_nbank_oth_allnum: sameBackFilter,
      als_d7_id_nbank_nsloan_allnum: sameBackFilter,
      als_d7_id_nbank_autofin_allnum: sameBackFilter,
      als_d7_id_nbank_sloan_allnum: sameBackFilter,
      als_d7_id_nbank_cons_allnum: sameBackFilter,
      als_d7_id_nbank_finlea_allnum: sameBackFilter,
      als_d7_id_nbank_orgnum: sameBackFilter,
      als_d7_id_nbank_p2p_orgnum: sameBackFilter,
      als_d7_id_nbank_mc_orgnum: sameBackFilter,
      als_d7_id_nbank_ca_orgnum: sameBackFilter,
      als_d7_id_nbank_cf_orgnum: sameBackFilter,
      als_d7_id_nbank_com_orgnum: sameBackFilter,
      als_d7_id_nbank_oth_orgnum: sameBackFilter,
      als_d7_id_nbank_nsloan_orgnum: sameBackFilter,
      als_d7_id_nbank_autofin_orgnum: sameBackFilter,
      als_d7_id_nbank_sloan_orgnum: sameBackFilter,
      als_d7_id_nbank_cons_orgnum: sameBackFilter,
      als_d7_id_nbank_finlea_orgnum: sameBackFilter,
      als_d7_id_nbank_night_allnum: sameBackFilter,
      als_d7_id_nbank_night_orgnum: sameBackFilter,
      als_d7_cell_pdl_allnum: sameBackFilter,
      als_d7_cell_pdl_orgnum: sameBackFilter,
      als_d7_cell_caon_allnum: sameBackFilter,
      als_d7_cell_caon_orgnum: sameBackFilter,
      als_d7_cell_rel_allnum: sameBackFilter,
      als_d7_cell_rel_orgnum: sameBackFilter,
      als_d7_cell_cooff_allnum: sameBackFilter,
      als_d7_cell_cooff_orgnum: sameBackFilter,
      als_d7_cell_af_allnum: sameBackFilter,
      als_d7_cell_af_orgnum: sameBackFilter,
      als_d7_cell_oth_allnum: sameBackFilter,
      als_d7_cell_oth_orgnum: sameBackFilter,
      als_d7_cell_bank_allnum: sameBackFilter,
      als_d7_cell_bank_orgnum: sameBackFilter,
      als_d7_cell_nbank_allnum: sameBackFilter,
      als_d7_cell_nbank_p2p_allnum: sameBackFilter,
      als_d7_cell_nbank_mc_allnum: sameBackFilter,
      als_d7_cell_nbank_ca_allnum: sameBackFilter,
      als_d7_cell_nbank_cf_allnum: sameBackFilter,
      als_d7_cell_nbank_com_allnum: sameBackFilter,
      als_d7_cell_nbank_oth_allnum: sameBackFilter,
      als_d7_cell_nbank_nsloan_allnum: sameBackFilter,
      als_d7_cell_nbank_autofin_allnum: sameBackFilter,
      als_d7_cell_nbank_sloan_allnum: sameBackFilter,
      als_d7_cell_nbank_cons_allnum: sameBackFilter,
      als_d7_cell_nbank_finlea_allnum: sameBackFilter,
      als_d7_cell_nbank_orgnum: sameBackFilter,
      als_d7_cell_nbank_p2p_orgnum: sameBackFilter,
      als_d7_cell_nbank_mc_orgnum: sameBackFilter,
      als_d7_cell_nbank_ca_orgnum: sameBackFilter,
      als_d7_cell_nbank_cf_orgnum: sameBackFilter,
      als_d7_cell_nbank_com_orgnum: sameBackFilter,
      als_d7_cell_nbank_oth_orgnum: sameBackFilter,
      als_d7_cell_nbank_nsloan_orgnum: sameBackFilter,
      als_d7_cell_nbank_autofin_orgnum: sameBackFilter,
      als_d7_cell_nbank_sloan_orgnum: sameBackFilter,
      als_d7_cell_nbank_cons_orgnum: sameBackFilter,
      als_d7_cell_nbank_finlea_orgnum: sameBackFilter,
      als_d7_cell_nbank_night_allnum: sameBackFilter,
      als_d7_cell_nbank_night_orgnum: sameBackFilter,
      als_d15_id_pdl_allnum: sameBackFilter,
      als_d15_id_pdl_orgnum: sameBackFilter,
      als_d15_id_caon_allnum: sameBackFilter,
      als_d15_id_caon_orgnum: sameBackFilter,
      als_d15_id_rel_allnum: sameBackFilter,
      als_d15_id_rel_orgnum: sameBackFilter,
      als_d15_id_cooff_allnum: sameBackFilter,
      als_d15_id_cooff_orgnum: sameBackFilter,
      als_d15_id_af_allnum: sameBackFilter,
      als_d15_id_af_orgnum: sameBackFilter,
      als_d15_id_oth_allnum: sameBackFilter,
      als_d15_id_oth_orgnum: sameBackFilter,
      als_d15_id_bank_allnum: sameBackFilter,
      als_d15_id_bank_orgnum: sameBackFilter,
      als_d15_id_nbank_allnum: sameBackFilter,
      als_d15_id_nbank_p2p_allnum: sameBackFilter,
      als_d15_id_nbank_mc_allnum: sameBackFilter,
      als_d15_id_nbank_ca_allnum: sameBackFilter,
      als_d15_id_nbank_cf_allnum: sameBackFilter,
      als_d15_id_nbank_com_allnum: sameBackFilter,
      als_d15_id_nbank_oth_allnum: sameBackFilter,
      als_d15_id_nbank_nsloan_allnum: sameBackFilter,
      als_d15_id_nbank_autofin_allnum: sameBackFilter,
      als_d15_id_nbank_sloan_allnum: sameBackFilter,
      als_d15_id_nbank_cons_allnum: sameBackFilter,
      als_d15_id_nbank_finlea_allnum: sameBackFilter,
      als_d15_id_nbank_orgnum: sameBackFilter,
      als_d15_id_nbank_p2p_orgnum: sameBackFilter,
      als_d15_id_nbank_mc_orgnum: sameBackFilter,
      als_d15_id_nbank_ca_orgnum: sameBackFilter,
      als_d15_id_nbank_cf_orgnum: sameBackFilter,
      als_d15_id_nbank_com_orgnum: sameBackFilter,
      als_d15_id_nbank_oth_orgnum: sameBackFilter,
      als_d15_id_nbank_nsloan_orgnum: sameBackFilter,
      als_d15_id_nbank_autofin_orgnum: sameBackFilter,
      als_d15_id_nbank_sloan_orgnum: sameBackFilter,
      als_d15_id_nbank_cons_orgnum: sameBackFilter,
      als_d15_id_nbank_finlea_orgnum: sameBackFilter,
      als_d15_id_nbank_night_allnum: sameBackFilter,
      als_d15_id_nbank_night_orgnum: sameBackFilter,
      als_d15_cell_pdl_allnum: sameBackFilter,
      als_d15_cell_pdl_orgnum: sameBackFilter,
      als_d15_cell_caon_allnum: sameBackFilter,
      als_d15_cell_caon_orgnum: sameBackFilter,
      als_d15_cell_rel_allnum: sameBackFilter,
      als_d15_cell_rel_orgnum: sameBackFilter,
      als_d15_cell_cooff_allnum: sameBackFilter,
      als_d15_cell_cooff_orgnum: sameBackFilter,
      als_d15_cell_af_allnum: sameBackFilter,
      als_d15_cell_af_orgnum: sameBackFilter,
      als_d15_cell_oth_allnum: sameBackFilter,
      als_d15_cell_oth_orgnum: sameBackFilter,
      als_d15_cell_bank_allnum: sameBackFilter,
      als_d15_cell_bank_orgnum: sameBackFilter,
      als_d15_cell_nbank_allnum: sameBackFilter,
      als_d15_cell_nbank_p2p_allnum: sameBackFilter,
      als_d15_cell_nbank_mc_allnum: sameBackFilter,
      als_d15_cell_nbank_ca_allnum: sameBackFilter,
      als_d15_cell_nbank_cf_allnum: sameBackFilter,
      als_d15_cell_nbank_com_allnum: sameBackFilter,
      als_d15_cell_nbank_oth_allnum: sameBackFilter,
      als_d15_cell_nbank_nsloan_allnum: sameBackFilter,
      als_d15_cell_nbank_autofin_allnum: sameBackFilter,
      als_d15_cell_nbank_sloan_allnum: sameBackFilter,
      als_d15_cell_nbank_cons_allnum: sameBackFilter,
      als_d15_cell_nbank_finlea_allnum: sameBackFilter,
      als_d15_cell_nbank_orgnum: sameBackFilter,
      als_d15_cell_nbank_p2p_orgnum: sameBackFilter,
      als_d15_cell_nbank_mc_orgnum: sameBackFilter,
      als_d15_cell_nbank_ca_orgnum: sameBackFilter,
      als_d15_cell_nbank_cf_orgnum: sameBackFilter,
      als_d15_cell_nbank_com_orgnum: sameBackFilter,
      als_d15_cell_nbank_oth_orgnum: sameBackFilter,
      als_d15_cell_nbank_nsloan_orgnum: sameBackFilter,
      als_d15_cell_nbank_autofin_orgnum: sameBackFilter,
      als_d15_cell_nbank_sloan_orgnum: sameBackFilter,
      als_d15_cell_nbank_cons_orgnum: sameBackFilter,
      als_d15_cell_nbank_finlea_orgnum: sameBackFilter,
      als_m1_id_pdl_allnum: sameBackFilter,
      als_m1_id_pdl_orgnum: sameBackFilter,
      als_m1_id_caon_allnum: sameBackFilter,
      als_m1_id_caon_orgnum: sameBackFilter,
      als_m1_id_rel_allnum: sameBackFilter,
      als_m1_id_rel_orgnum: sameBackFilter,
      als_m1_id_cooff_allnum: sameBackFilter,
      als_m1_id_cooff_orgnum: sameBackFilter,
      als_m1_id_af_allnum: sameBackFilter,
      als_m1_id_af_orgnum: sameBackFilter,
      als_m1_id_oth_allnum: sameBackFilter,
      als_m1_id_oth_orgnum: sameBackFilter,
      als_m1_id_bank_allnum: sameBackFilter,
      als_m1_id_bank_selfnum: sameBackFilter,
      als_m1_id_bank_tra_allnum: sameBackFilter,
      als_m1_id_bank_ret_allnum: sameBackFilter,
      als_m1_id_bank_orgnum: sameBackFilter,
      als_m1_id_nbank_allnum: sameBackFilter,
      als_m1_id_nbank_p2p_allnum: sameBackFilter,
      als_m1_id_nbank_mc_allnum: sameBackFilter,
      als_m1_id_nbank_ca_allnum: sameBackFilter,
      als_m1_id_nbank_cf_allnum: sameBackFilter,
      als_m1_id_nbank_com_allnum: sameBackFilter,
      als_m1_id_nbank_oth_allnum: sameBackFilter,
      als_m1_id_nbank_nsloan_allnum: sameBackFilter,
      als_m1_id_nbank_autofin_allnum: sameBackFilter,
      als_m1_id_nbank_sloan_allnum: sameBackFilter,
      als_m1_id_nbank_cons_allnum: sameBackFilter,
      als_m1_id_nbank_finlea_allnum: sameBackFilter,
      als_m1_id_nbank_orgnum: sameBackFilter,
      als_m1_id_nbank_p2p_orgnum: sameBackFilter,
      als_m1_id_nbank_mc_orgnum: sameBackFilter,
      als_m1_id_nbank_ca_orgnum: sameBackFilter,
      als_m1_id_nbank_cf_orgnum: sameBackFilter,
      als_m1_id_nbank_com_orgnum: sameBackFilter,
      als_m1_id_nbank_oth_orgnum: sameBackFilter,
      als_m1_id_nbank_nsloan_orgnum: sameBackFilter,
      als_m1_id_nbank_autofin_orgnum: sameBackFilter,
      als_m1_id_nbank_sloan_orgnum: sameBackFilter,
      als_m1_id_nbank_cons_orgnum: sameBackFilter,
      als_m1_id_nbank_finlea_orgnum: sameBackFilter,
      als_m1_id_nbank_night_allnum: sameBackFilter,
      als_m1_id_nbank_night_orgnum: sameBackFilter,
      als_m1_cell_pdl_allnum: sameBackFilter,
      als_m1_cell_pdl_orgnum: sameBackFilter,
      als_m1_cell_caon_allnum: sameBackFilter,
      als_m1_cell_caon_orgnum: sameBackFilter,
      als_m1_cell_rel_allnum: sameBackFilter,
      als_m1_cell_rel_orgnum: sameBackFilter,
      als_m1_cell_cooff_allnum: sameBackFilter,
      als_m1_cell_cooff_orgnum: sameBackFilter,
      als_m1_cell_af_allnum: sameBackFilter,
      als_m1_cell_af_orgnum: sameBackFilter,
      als_m1_cell_oth_allnum: sameBackFilter,
      als_m1_cell_oth_orgnum: sameBackFilter,
      als_m1_cell_bank_allnum: sameBackFilter,
      als_m1_cell_bank_orgnum: sameBackFilter,
      als_m1_cell_nbank_allnum: sameBackFilter,
      als_m1_cell_nbank_p2p_allnum: sameBackFilter,
      als_m1_cell_nbank_mc_allnum: sameBackFilter,
      als_m1_cell_nbank_ca_allnum: sameBackFilter,
      als_m1_cell_nbank_cf_allnum: sameBackFilter,
      als_m1_cell_nbank_com_allnum: sameBackFilter,
      als_m1_cell_nbank_oth_allnum: sameBackFilter,
      als_m1_cell_nbank_nsloan_allnum: sameBackFilter,
      als_m1_cell_nbank_autofin_allnum: sameBackFilter,
      als_m1_cell_nbank_sloan_allnum: sameBackFilter,
      als_m1_cell_nbank_cons_allnum: sameBackFilter,
      als_m1_cell_nbank_finlea_allnum: sameBackFilter,
      als_m1_cell_nbank_orgnum: sameBackFilter,
      als_m1_cell_nbank_p2p_orgnum: sameBackFilter,
      als_m1_cell_nbank_mc_orgnum: sameBackFilter,
      als_m1_cell_nbank_ca_orgnum: sameBackFilter,
      als_m1_cell_nbank_cf_orgnum: sameBackFilter,
      als_m1_cell_nbank_com_orgnum: sameBackFilter,
      als_m1_cell_nbank_oth_orgnum: sameBackFilter,
      als_m1_cell_nbank_nsloan_orgnum: sameBackFilter,
      als_m1_cell_nbank_autofin_orgnum: sameBackFilter,
      als_m1_cell_nbank_sloan_orgnum: sameBackFilter,
      als_m1_cell_nbank_cons_orgnum: sameBackFilter,
      als_m1_cell_nbank_finlea_orgnum: sameBackFilter,
      als_m1_cell_nbank_night_allnum: sameBackFilter,
      als_m1_cell_nbank_night_orgnum: sameBackFilter,
      als_m3_id_avg_monnum: sameBackFilter,
      als_m3_id_pdl_allnum: sameBackFilter,
      als_m3_id_pdl_orgnum: sameBackFilter,
      als_m3_id_caon_allnum: sameBackFilter,
      als_m3_id_caon_orgnum: sameBackFilter,
      als_m3_id_rel_allnum: sameBackFilter,
      als_m3_id_rel_orgnum: sameBackFilter,
      als_m3_id_cooff_allnum: sameBackFilter,
      als_m3_id_cooff_orgnum: sameBackFilter,
      als_m3_id_af_allnum: sameBackFilter,
      als_m3_id_af_orgnum: sameBackFilter,
      als_m3_id_oth_allnum: sameBackFilter,
      als_m3_id_oth_orgnum: sameBackFilter,
      als_m3_id_bank_allnum: sameBackFilter,
      als_m3_id_bank_orgnum: sameBackFilter,
      als_m3_id_nbank_selfnum: sameBackFilter,
      als_m3_id_nbank_allnum: sameBackFilter,
      als_m3_id_nbank_p2p_allnum: sameBackFilter,
      als_m3_id_nbank_mc_allnum: sameBackFilter,
      als_m3_id_nbank_ca_allnum: sameBackFilter,
      als_m3_id_nbank_cf_allnum: sameBackFilter,
      als_m3_id_nbank_com_allnum: sameBackFilter,
      als_m3_id_nbank_oth_allnum: sameBackFilter,
      als_m3_id_nbank_nsloan_allnum: sameBackFilter,
      als_m3_id_nbank_autofin_allnum: sameBackFilter,
      als_m3_id_nbank_sloan_allnum: sameBackFilter,
      als_m3_id_nbank_cons_allnum: sameBackFilter,
      als_m3_id_nbank_finlea_allnum: sameBackFilter,
      als_m3_id_nbank_orgnum: sameBackFilter,
      als_m3_id_nbank_p2p_orgnum: sameBackFilter,
      als_m3_id_nbank_mc_orgnum: sameBackFilter,
      als_m3_id_nbank_ca_orgnum: sameBackFilter,
      als_m3_id_nbank_cf_orgnum: sameBackFilter,
      als_m3_id_nbank_com_orgnum: sameBackFilter,
      als_m3_id_nbank_oth_orgnum: sameBackFilter,
      als_m3_id_nbank_nsloan_orgnum: sameBackFilter,
      als_m3_id_nbank_autofin_orgnum: sameBackFilter,
      als_m3_id_nbank_sloan_orgnum: sameBackFilter,
      als_m3_id_nbank_cons_orgnum: sameBackFilter,
      als_m3_id_nbank_finlea_orgnum: sameBackFilter,
      als_m3_id_nbank_avg_monnum: sameBackFilter,
      als_m3_id_nbank_night_allnum: sameBackFilter,
      als_m3_id_nbank_night_orgnum: sameBackFilter,
      als_m3_cell_avg_monnum: sameBackFilter,
      als_m3_cell_pdl_allnum: sameBackFilter,
      als_m3_cell_pdl_orgnum: sameBackFilter,
      als_m3_cell_caon_allnum: sameBackFilter,
      als_m3_cell_caon_orgnum: sameBackFilter,
      als_m3_cell_rel_allnum: sameBackFilter,
      als_m3_cell_rel_orgnum: sameBackFilter,
      als_m3_cell_cooff_allnum: sameBackFilter,
      als_m3_cell_cooff_orgnum: sameBackFilter,
      als_m3_cell_af_allnum: sameBackFilter,
      als_m3_cell_af_orgnum: sameBackFilter,
      als_m3_cell_oth_allnum: sameBackFilter,
      als_m3_cell_oth_orgnum: sameBackFilter,
      als_m3_cell_bank_allnum: sameBackFilter,
      als_m3_cell_bank_orgnum: sameBackFilter,
      als_m3_cell_nbank_selfnum: sameBackFilter,
      als_m3_cell_nbank_allnum: sameBackFilter,
      als_m3_cell_nbank_p2p_allnum: sameBackFilter,
      als_m3_cell_nbank_mc_allnum: sameBackFilter,
      als_m3_cell_nbank_ca_allnum: sameBackFilter,
      als_m3_cell_nbank_cf_allnum: sameBackFilter,
      als_m3_cell_nbank_com_allnum: sameBackFilter,
      als_m3_cell_nbank_oth_allnum: sameBackFilter,
      als_m3_cell_nbank_nsloan_allnum: sameBackFilter,
      als_m3_cell_nbank_autofin_allnum: sameBackFilter,
      als_m3_cell_nbank_sloan_allnum: sameBackFilter,
      als_m3_cell_nbank_cons_allnum: sameBackFilter,
      als_m3_cell_nbank_finlea_allnum: sameBackFilter,
      als_m3_cell_nbank_orgnum: sameBackFilter,
      als_m3_cell_nbank_p2p_orgnum: sameBackFilter,
      als_m3_cell_nbank_mc_orgnum: sameBackFilter,
      als_m3_cell_nbank_ca_orgnum: sameBackFilter,
      als_m3_cell_nbank_cf_orgnum: sameBackFilter,
      als_m3_cell_nbank_com_orgnum: sameBackFilter,
      als_m3_cell_nbank_oth_orgnum: sameBackFilter,
      als_m3_cell_nbank_nsloan_orgnum: sameBackFilter,
      als_m3_cell_nbank_autofin_orgnum: sameBackFilter,
      als_m3_cell_nbank_sloan_orgnum: sameBackFilter,
      als_m3_cell_nbank_cons_orgnum: sameBackFilter,
      als_m3_cell_nbank_finlea_orgnum: sameBackFilter,
      als_m3_cell_nbank_avg_monnum: sameBackFilter,
      als_m3_cell_nbank_night_allnum: sameBackFilter,
      als_m3_cell_nbank_night_orgnum: sameBackFilter,
      als_m6_id_pdl_allnum: sameBackFilter,
      als_m6_id_pdl_orgnum: sameBackFilter,
      als_m6_id_caon_allnum: sameBackFilter,
      als_m6_id_caon_orgnum: sameBackFilter,
      als_m6_id_rel_allnum: sameBackFilter,
      als_m6_id_rel_orgnum: sameBackFilter,
      als_m6_id_cooff_allnum: sameBackFilter,
      als_m6_id_cooff_orgnum: sameBackFilter,
      als_m6_id_af_allnum: sameBackFilter,
      als_m6_id_af_orgnum: sameBackFilter,
      als_m6_id_oth_allnum: sameBackFilter,
      als_m6_id_oth_orgnum: sameBackFilter,
      als_m6_id_bank_allnum: sameBackFilter,
      als_m6_id_bank_orgnum: sameBackFilter,
      als_m6_id_nbank_allnum: sameBackFilter,
      als_m6_id_nbank_p2p_allnum: sameBackFilter,
      als_m6_id_nbank_mc_allnum: sameBackFilter,
      als_m6_id_nbank_ca_allnum: sameBackFilter,
      als_m6_id_nbank_cf_allnum: sameBackFilter,
      als_m6_id_nbank_com_allnum: sameBackFilter,
      als_m6_id_nbank_oth_allnum: sameBackFilter,
      als_m6_id_nbank_nsloan_allnum: sameBackFilter,
      als_m6_id_nbank_autofin_allnum: sameBackFilter,
      als_m6_id_nbank_sloan_allnum: sameBackFilter,
      als_m6_id_nbank_cons_allnum: sameBackFilter,
      als_m6_id_nbank_finlea_allnum: sameBackFilter,
      als_m6_id_nbank_orgnum: sameBackFilter,
      als_m6_id_nbank_p2p_orgnum: sameBackFilter,
      als_m6_id_nbank_mc_orgnum: sameBackFilter,
      als_m6_id_nbank_ca_orgnum: sameBackFilter,
      als_m6_id_nbank_cf_orgnum: sameBackFilter,
      als_m6_id_nbank_com_orgnum: sameBackFilter,
      als_m6_id_nbank_oth_orgnum: sameBackFilter,
      als_m6_id_nbank_nsloan_orgnum: sameBackFilter,
      als_m6_id_nbank_autofin_orgnum: sameBackFilter,
      als_m6_id_nbank_sloan_orgnum: sameBackFilter,
      als_m6_id_nbank_cons_orgnum: sameBackFilter,
      als_m6_id_nbank_finlea_orgnum: sameBackFilter,
      als_m6_id_nbank_avg_monnum: sameBackFilter,
      als_m6_id_nbank_night_allnum: sameBackFilter,
      als_m6_id_nbank_night_orgnum: sameBackFilter,
      als_m6_cell_pdl_allnum: sameBackFilter,
      als_m6_cell_pdl_orgnum: sameBackFilter,
      als_m6_cell_caon_allnum: sameBackFilter,
      als_m6_cell_caon_orgnum: sameBackFilter,
      als_m6_cell_rel_allnum: sameBackFilter,
      als_m6_cell_rel_orgnum: sameBackFilter,
      als_m6_cell_cooff_allnum: sameBackFilter,
      als_m6_cell_cooff_orgnum: sameBackFilter,
      als_m6_cell_af_allnum: sameBackFilter,
      als_m6_cell_af_orgnum: sameBackFilter,
      als_m6_cell_oth_allnum: sameBackFilter,
      als_m6_cell_oth_orgnum: sameBackFilter,
      als_m6_cell_bank_allnum: sameBackFilter,
      als_m6_cell_bank_orgnum: sameBackFilter,
      als_m6_cell_nbank_allnum: sameBackFilter,
      als_m6_cell_nbank_p2p_allnum: sameBackFilter,
      als_m6_cell_nbank_mc_allnum: sameBackFilter,
      als_m6_cell_nbank_ca_allnum: sameBackFilter,
      als_m6_cell_nbank_cf_allnum: sameBackFilter,
      als_m6_cell_nbank_com_allnum: sameBackFilter,
      als_m6_cell_nbank_oth_allnum: sameBackFilter,
      als_m6_cell_nbank_nsloan_allnum: sameBackFilter,
      als_m6_cell_nbank_autofin_allnum: sameBackFilter,
      als_m6_cell_nbank_sloan_allnum: sameBackFilter,
      als_m6_cell_nbank_cons_allnum: sameBackFilter,
      als_m6_cell_nbank_finlea_allnum: sameBackFilter,
      als_m6_cell_nbank_orgnum: sameBackFilter,
      als_m6_cell_nbank_p2p_orgnum: sameBackFilter,
      als_m6_cell_nbank_mc_orgnum: sameBackFilter,
      als_m6_cell_nbank_ca_orgnum: sameBackFilter,
      als_m6_cell_nbank_cf_orgnum: sameBackFilter,
      als_m6_cell_nbank_com_orgnum: sameBackFilter,
      als_m6_cell_nbank_oth_orgnum: sameBackFilter,
      als_m6_cell_nbank_nsloan_orgnum: sameBackFilter,
      als_m6_cell_nbank_autofin_orgnum: sameBackFilter,
      als_m6_cell_nbank_sloan_orgnum: sameBackFilter,
      als_m6_cell_nbank_cons_orgnum: sameBackFilter,
      als_m6_cell_nbank_finlea_orgnum: sameBackFilter,
      als_m6_cell_nbank_avg_monnum: sameBackFilter,
      als_m6_cell_nbank_night_allnum: sameBackFilter,
      als_m6_cell_nbank_night_orgnum: sameBackFilter,
      als_m12_id_pdl_allnum: sameBackFilter,
      als_m12_id_pdl_orgnum: sameBackFilter,
      als_m12_id_caon_allnum: sameBackFilter,
      als_m12_id_caon_orgnum: sameBackFilter,
      als_m12_id_rel_allnum: sameBackFilter,
      als_m12_id_rel_orgnum: sameBackFilter,
      als_m12_id_cooff_allnum: sameBackFilter,
      als_m12_id_cooff_orgnum: sameBackFilter,
      als_m12_id_af_allnum: sameBackFilter,
      als_m12_id_af_orgnum: sameBackFilter,
      als_m12_id_oth_allnum: sameBackFilter,
      als_m12_id_oth_orgnum: sameBackFilter,
      als_m12_id_bank_allnum: sameBackFilter,
      als_m12_id_bank_orgnum: sameBackFilter,
      als_m12_id_nbank_allnum: sameBackFilter,
      als_m12_id_nbank_p2p_allnum: sameBackFilter,
      als_m12_id_nbank_mc_allnum: sameBackFilter,
      als_m12_id_nbank_ca_allnum: sameBackFilter,
      als_m12_id_nbank_cf_allnum: sameBackFilter,
      als_m12_id_nbank_com_allnum: sameBackFilter,
      als_m12_id_nbank_oth_allnum: sameBackFilter,
      als_m12_id_nbank_nsloan_allnum: sameBackFilter,
      als_m12_id_nbank_autofin_allnum: sameBackFilter,
      als_m12_id_nbank_sloan_allnum: sameBackFilter,
      als_m12_id_nbank_cons_allnum: sameBackFilter,
      als_m12_id_nbank_finlea_allnum: sameBackFilter,
      als_m12_id_nbank_orgnum: sameBackFilter,
      als_m12_id_nbank_p2p_orgnum: sameBackFilter,
      als_m12_id_nbank_mc_orgnum: sameBackFilter,
      als_m12_id_nbank_ca_orgnum: sameBackFilter,
      als_m12_id_nbank_cf_orgnum: sameBackFilter,
      als_m12_id_nbank_com_orgnum: sameBackFilter,
      als_m12_id_nbank_oth_orgnum: sameBackFilter,
      als_m12_id_nbank_nsloan_orgnum: sameBackFilter,
      als_m12_id_nbank_autofin_orgnum: sameBackFilter,
      als_m12_id_nbank_sloan_orgnum: sameBackFilter,
      als_m12_id_nbank_cons_orgnum: sameBackFilter,
      als_m12_id_nbank_finlea_orgnum: sameBackFilter,
      als_m12_id_nbank_avg_monnum: sameBackFilter,
      als_m12_id_nbank_night_allnum: sameBackFilter,
      als_m12_id_nbank_night_orgnum: sameBackFilter,
      als_m12_cell_pdl_allnum: sameBackFilter,
      als_m12_cell_pdl_orgnum: sameBackFilter,
      als_m12_cell_caon_allnum: sameBackFilter,
      als_m12_cell_caon_orgnum: sameBackFilter,
      als_m12_cell_rel_allnum: sameBackFilter,
      als_m12_cell_rel_orgnum: sameBackFilter,
      als_m12_cell_cooff_allnum: sameBackFilter,
      als_m12_cell_cooff_orgnum: sameBackFilter,
      als_m12_cell_af_allnum: sameBackFilter,
      als_m12_cell_af_orgnum: sameBackFilter,
      als_m12_cell_oth_allnum: sameBackFilter,
      als_m12_cell_oth_orgnum: sameBackFilter,
      als_m12_cell_bank_allnum: sameBackFilter,
      als_m12_cell_bank_orgnum: sameBackFilter,
      als_m12_cell_nbank_allnum: sameBackFilter,
      als_m12_cell_nbank_p2p_allnum: sameBackFilter,
      als_m12_cell_nbank_mc_allnum: sameBackFilter,
      als_m12_cell_nbank_ca_allnum: sameBackFilter,
      als_m12_cell_nbank_cf_allnum: sameBackFilter,
      als_m12_cell_nbank_com_allnum: sameBackFilter,
      als_m12_cell_nbank_oth_allnum: sameBackFilter,
      als_m12_cell_nbank_nsloan_allnum: sameBackFilter,
      als_m12_cell_nbank_autofin_allnum: sameBackFilter,
      als_m12_cell_nbank_sloan_allnum: sameBackFilter,
      als_m12_cell_nbank_cons_allnum: sameBackFilter,
      als_m12_cell_nbank_finlea_allnum: sameBackFilter,
      als_m12_cell_nbank_orgnum: sameBackFilter,
      als_m12_cell_nbank_p2p_orgnum: sameBackFilter,
      als_m12_cell_nbank_mc_orgnum: sameBackFilter,
      als_m12_cell_nbank_ca_orgnum: sameBackFilter,
      als_m12_cell_nbank_cf_orgnum: sameBackFilter,
      als_m12_cell_nbank_com_orgnum: sameBackFilter,
      als_m12_cell_nbank_oth_orgnum: sameBackFilter,
      als_m12_cell_nbank_nsloan_orgnum: sameBackFilter,
      als_m12_cell_nbank_autofin_orgnum: sameBackFilter,
      als_m12_cell_nbank_sloan_orgnum: sameBackFilter,
      als_m12_cell_nbank_cons_orgnum: sameBackFilter,
      als_m12_cell_nbank_finlea_orgnum: sameBackFilter,
      als_m12_cell_nbank_avg_monnum: sameBackFilter,
      als_m12_cell_nbank_night_allnum: sameBackFilter,
      als_m12_cell_nbank_night_orgnum: sameBackFilter,
      
      als_d15_id_nbank_else_allnum: sameBackFilter,
      als_d15_id_nbank_else_orgnum: sameBackFilter,
      als_d15_cell_nbank_else_allnum: sameBackFilter,
      als_d15_cell_nbank_else_orgnum: sameBackFilter,
      als_m1_id_nbank_else_allnum: sameBackFilter,
      als_m1_id_nbank_else_orgnum: sameBackFilter,
      als_m1_cell_nbank_else_allnum: sameBackFilter,
      als_m1_cell_nbank_else_orgnum: sameBackFilter,
      als_m3_id_max_monnum: sameBackFilter,
      als_m3_id_bank_max_monnum: sameBackFilter,
      als_m3_id_nbank_else_allnum: sameBackFilter,
      als_m3_id_nbank_else_orgnum: sameBackFilter,
      als_m3_id_nbank_tot_mons: sameBackFilter,
      als_m3_id_nbank_max_monnum: sameBackFilter,
      als_m3_id_nbank_min_monnum: sameBackFilter,
      als_m3_id_nbank_max_inteday: sameBackFilter,
      als_m3_id_nbank_min_inteday: sameBackFilter,
      als_m3_cell_max_monnum: sameBackFilter,
      als_m3_cell_bank_max_monnum: sameBackFilter,
      als_m3_cell_nbank_else_allnum: sameBackFilter,
      als_m3_cell_nbank_else_orgnum: sameBackFilter,
      als_m3_cell_nbank_tot_mons: sameBackFilter,
      als_m3_cell_nbank_max_monnum: sameBackFilter,
      als_m3_cell_nbank_min_monnum: sameBackFilter,
      als_m3_cell_nbank_max_inteday: sameBackFilter,
      als_m3_cell_nbank_min_inteday: sameBackFilter,
      als_m6_id_max_monnum: sameBackFilter,
      als_m6_id_bank_max_monnum: sameBackFilter,
      als_m6_id_nbank_else_allnum: sameBackFilter,
      als_m6_id_nbank_else_orgnum: sameBackFilter,
      als_m6_id_nbank_max_monnum: sameBackFilter,
      als_m6_cell_max_monnum: sameBackFilter,
      als_m6_cell_bank_max_monnum: sameBackFilter,
      als_m6_cell_nbank_else_allnum: sameBackFilter,
      als_m6_cell_nbank_else_orgnum: sameBackFilter,
      als_m6_cell_nbank_max_monnum: sameBackFilter,      
    },
    //afRiskEvaluation
    {
      acceptCount: sameBackFilter,
      rejectCount: sameBackFilter,
      onLoanCount: sameBackFilter,
      paybackStatus: isHitFilter10,
      overdueCount: sameBackFilter,
      overdueMaxTerm: sameBackFilter,
      overdueAmount: sameBackFilter,
      overdueM3Sum: sameBackFilter,
      overdueM6Sum: sameBackFilter,
      overdueTotalSum: sameBackFilter,
      overdueTotalCount: sameBackFilter,
      orgCountTotal: sameBackFilter,
      otherOrgCount: sameBackFilter,
      riskResults: isHitFilter    
    },
    //bsRiskList
    {
      result: isHitFilter2,
      message: sameBackFilter,
      badPlatformNum: sameBackFilter,
      goodPlatformNum: sameBackFilter,
      maxMoney: sameBackFilter,
      lastTime: sameBackFilter,
      maxDay: sameBackFilter,
    },
    //bsOverdueDetail
    {
      platformNum: sameBackFilter,
      counts: sameBackFilter,
      loanMoney: sameBackFilter,
      overdueMoney: sameBackFilter,
      overdueTime: sameBackFilter,
      overdueDay: isHitFilter4,
      settlement: isHitFilter5,
    },
    //bsRequestDetail
    {
      platformNum: sameBackFilter,
      cfPlatformNum: sameBackFilter,
      nlPlatformNum: sameBackFilter,
      applicationTime: sameBackFilter,
      applicationNum1: sameBackFilter,
      applicationNum3: sameBackFilter,
      applicationNum6: sameBackFilter,
      applicationNum: sameBackFilter,
    },
    //bsLendDetail
    {
      platformNum: sameBackFilter,
      cfPlatformNum: sameBackFilter,
      nlPlatformNum: sameBackFilter,
      loanLendersNum1: sameBackFilter,
      loanLendersNum3: sameBackFilter,
      loanLendersNum6: sameBackFilter,
      repaySuccNum: sameBackFilter,
      repayFailNum: sameBackFilter,
      repaySuccNum1: sameBackFilter,
      repayFailNum1: sameBackFilter,
      loanTime: sameBackFilter,
      loanLendersTime: sameBackFilter,
    },     
    //insideBlacklistDetail
    {
      arbitrarily_hit: isHitFilter,
      phone_black_main: isHitFilter,
      phone_black_spouse: isHitFilter,
      phone_black_guarantee: isHitFilter,
      phone_black_contacts: isHitFilter,
      id_black_main: isHitFilter,
      id_black_spouse: isHitFilter,
      id_black_guarantee: isHitFilter,
      id_black_contacts: isHitFilter
    },
    //brTelPeriod
    {
      flag_telperiod: isHitFilter6,
      pro_result: isHitFilter7,
      pro_operation: isHitFilter8,
      pro_data_value: isHitFilter9,
      pro_costTime: sameBackFilter,
    }             
  ]
  return dataFilter[code][tableType](value);
}
//黑名单表格相关过滤器end


//云镜报告页过滤器end