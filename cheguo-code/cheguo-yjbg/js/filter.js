//云镜报告页过滤器start
//风险类型过滤器
function riskTypeFilter(code) {
  code = code.replace(/\b(0+)/gi,"")*1;

  var arr = ['', '命中外部黑名单', '命中内部黑名单', '百融特殊名单', '疑似风险客户', '法院被执行人', '法院失信被执行人', '有外部历史逾期记录', '存在外部当前逾期', '有外部平台申贷记录', '存在犯罪记录', '有外部贷款记录','存在违法行为','参照银行反馈征信结果','外部信用评分过低','有外部申贷被拒记录'];
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
  return arr[code] || '';
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

//黑名单表格标题过滤器
function blacklistTitleFilter(code) {
  var arr = [ '【车贷】内部黑名单',
              '【数美】黑名单',
              '【百融】特殊名单',
              '【百融】自然人',
              '【百融】法院被执行人',
              '【极兆】手机号入网时长',
              '【极兆】多头借贷黑名单',
              '【极兆】逾期平台详情',
              '【阿福】共享平台',
              '【平安】风险名单',
              '【人行】征信信息',
              '【极兆】居住地核验',
              '【瑞天】预筛选',
              '【同盾】多头借贷',
              '【百融】多头借贷',
            ];
  return arr[code] || '';
}

//黑名单表格-内部字段中文转换
function blacklistFilter(code,tableType) {
  var dataFilter = [
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
    //smBlacklist
    {
      in_black: '黑名单',
      in_grey: '灰名单',
      itfin_loan_overdues: '网贷逾期机构数量',
      itfin_loan_overdue_duration: '逾期级别',
      itfin_loan_overdues_7d: '7天内逾期平台数',
      itfin_loan_overdue_duration_7d: '7天内最大逾期时长',
      itfin_loan_overdues_30d: '30天内逾期平台数',
      itfin_loan_overdue_duration_30d: '30天内最大逾期时长',
      itfin_loan_overdues_60d: '60天内逾期平台数',
      itfin_loan_overdue_duration_60d: '60天内最大逾期时长',
      itfin_loan_overdues_90d: '90天内逾期平台数',
      itfin_loan_overdue_duration_90d: '90天内最大逾期时长',
      itfin_loan_overdues_180d: '180天内逾期平台数',
      itfin_loan_overdue_duration_180d: '180天内最大逾期时长'
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
    //jzWholeInDate
    {
      netWorkTimeResult: '入网时长',

    },
    //jzBlacklist
    {
      count: '命中次数',
      queryCountRecent10: '10天查询次数',
      queryCountRecent30: '30天查询次数',
      queryCountRecent90: '90天查询次数',
      queryCountRecent180: '180天查询次数',
      queryAppCountRecent10: '10天查询机构数',
      queryAppCountRecent30: '30天查询机构数',
      queryAppCountRecent90: '90天查询机构数',
      queryAppCountRecent180: '180天查询机构数',
      riskLevel: '风险水平',
      tenantCount: '命中机构数',
    },
    //jzOverdueDetail
    {
      appCountRecent24: '逾期平台数',
      totalCount: '历史逾期总次数',
      moneyRecent24: '逾期总金额',
      newestDateRecent24: '最近逾期日期'
    },
    //afShare
    {
      zcCreditScore: '致诚信用分',
      contractBreakRate: '违约概率',
      timesByOtherOrg: '一年内累计查询次数',
      otherOrgCount: '一年内累计查询机构数',
      oneMonthTimesByCurrentOrg: '一个月被查询次数',
      threeMonthTimesByCurrentOrg: '三个月被查询次数',
      halfYearTimesByCurrentOrg: '半年被查询次数',
      oneMonthOrgCount: '一个月查询机构数',
      threeMonthOrgCount: '三个月查询机构数',
      halfYearOrgCount: '半年查询机构数',
      approvalCount: '累计贷款笔数',
      deniedApprovalCount: '累计拒绝笔数',
      inApprovalCount: '在贷笔数',
      loanStatusCode: '当前还款状态',
      overdueAmount: '当前逾期金额',
      currOverdueCount: '当前逾期笔数',
      maxoverduePeriods: '当前最大逾期期数',
      overdueCount: '历史逾期总笔数',
      overdueTimes: '历史逾期总次数',
      overdueM3: '历史逾期 M3+次数',
      overdueM6: '历史逾期 M6+次数',
      riskName: '风险名单',
      riskTypeForPhishing: '风险名单(伪冒类)',
      riskTypeForFalseInfo: '风险名单(虚假资料类)',
      riskTypeForInsolvency: '风险名单(丧失还款能力类)',
      riskTypeForUseFalse: '风险名单(用途虚假类)',
      riskTypeForOther: '风险名单(其他)',
      riskTime: '风险名单(发生时间)',
    },
    //pinganRsk
    {
      sourceIdA: '信贷逾期风险',
      rskScore: '风险分',
      rskMarkB1: '失信被执行人',
      rskMarkB2: '被执行人',
      rskMarkB3: '交通严重违章',
      dataBuildTimeA: '信贷逾期时间',
      dataBuildTimeB1: '失信被执行人时间',
      dataBuildTimeB2: '被执行人时间',
      dataBuildTimeB3: '交通违章时间',    
    },
    //personalCredit
    {
      letterCreditConclusion: '征信结果',
      creditBlank: '是否白户',
      hasLoan: '有无贷款',
      overdue: '有无逾期',
      hasCreditCard: '有无信用卡',
      hasGuarantee: '有无担保',
      marriage: '婚姻状况',
      hasCash: '套现嫌疑',
      icbcBlacklist: '工行黑名单',
      creditLine: '信用卡授信额度',
      monthUseAmount: '信用卡月均使用额度',   
      monthUseRatio: '信用卡月均使用额度占比',
      quryNum: '信用卡审批查询次数',
      hasUseAmount: '信用卡已用额度',
      consumerLoan: '消费贷金额',
      consumerMonthPay: '消费贷月还',
      consumerBalance: '消费贷余额',
      farmerLoan: '农户贷金额',
      housingLoan: '住房贷金额',
      houseingLoanMonthPay: '住房贷月还',
      houseingLoanNum: '住房贷期数',
      houseringLoanBalance: '住房贷余额',
      bizLoan: '经营贷金额',
      bizLoanBalance: '经营贷余额',
      carLoan: '汽车贷金额',
      studentLoan: '助学贷金额',
      otherLoanMonthPay: '其他贷款月还',
      otherLoanNum: '其他贷款笔数',
      otherLoanAumout: '其他贷款金额',
      unclearedLoanBalance: '未结清贷款余额',
      unclearedLoanNum: '未结清贷款笔数',
      monthPayRecent6: '近六个月平均月还',
      maxOverdueInMonth: '单月最高逾期金额',
      currentOverdue: '当前逾期总额',
      sumOverdueNum: '累计逾期次数',
      continueOverdueNum: '连续逾期次数',
      sponsionAmount: '对外担保金额',
      sponsionBalance: '对外担保余额',
      sponsionNum: '对外担保笔数',
      realNameAuth: '实名认证结果',
      factorValidate: '四要素验证结果',
      baiRongLevel: '百融评级',
      tongDunLevel: '同盾评级',
      ficoLevel: 'Fico评级',
    },
    //jzResidenceCheck
    {
      homeAddressResult: '居住地核验',
    },
    //ruitianScreen
    {
      blacklistFlag: '黑名单',
    },
    //tdQueryRisk
    {
      final_score: '风险分数',
      idCount_180: '近180天机构个数(身份证)',
      mobileCount_180: '近180天机构个数(手机)',
      idCountNbank_90: '近90天非银申请次数(身份证)',
      mobileCountNbank_90: '近90天非银申请次数(手机)',
      idCount_90: '近90天机构个数(身份证)',
      mobileCount_90: '近90天机构个数(手机)',
      idCountp2p_90: '近90天p2p机构个数(身份证)',
      mobileCountp2p_90: '近90天p2p机构个数(手机)',
      idCountNbank_30: '近30天非银机构个数(身份证)',
      mobileCountNbank_30: '近30天非银机构个数(手机)',
      idCount_30: '近30天机构个数(身份证)',
      mobileCount_30: '近30天机构个数(手机)',
      idCountp2p_30: '近30天p2p机构个数(身份证)',
      mobileCountp2p_30: '近30天p2p机构个数(手机)',
      idCountCons_90: '近90天消费金融机构个数(身份证)',
      mobileCountCons_90: '近90天消费金融机构个数(手机)',
      idCount_7: '近7天机构个数(身份证)',
      mobileCount_7: '近7天机构个数(手机)',
      idCountNbank_7: '近7天非银行类机构个数(身份证)',
      mobileCountNbank_7: '近7天非银行类机构个数(手机)',
      idCountp2p_7: '近7天p2p机构个数(身份证)',
      mobileCountp2p_7: '近7天p2p机构个数(手机)',
      idCountCons_30: '近30天消费金融机构个数(身份证)',
      mobileCountCons_30: '近30天消费金融机构个数(手机)',
      idCountBank_90: '近90天银行类机构个数(身份证)',      
      mobileCountBank_90: '近90天银行类机构个数(手机)',
      idFkCount_90:	'3个月内在多个平台被放款（身份证）',
      mobileFkCount_90:	'3个月内在多个平台被放款（手机）',      
      idCountBank_30: '近30天银行类机构个数(身份证)',
      mobileCountBank_30: '近30天银行类机构个数(手机)',
      idSq_90: '近3个月内身份证关联手机数',
    },
    //brApplyLoan
    {       
      als_d7_id_pdl_orgnum: '近7天现金贷机构个数(身份证)',
      als_d7_id_caon_orgnum: '近7天现金分期机构个数(身份证)',
      als_d7_id_cooff_orgnum: '近7天消费分期机构个数(身份证)',
      als_d7_id_nbank_orgnum: '近7天非银机构个数(身份证)',
      als_d7_id_nbank_p2p_orgnum: '近7天p2p机构个数(身份证)',
      als_d7_id_nbank_mc_orgnum: '近7天小贷机构个数(身份证)',
      als_d7_id_nbank_ca_orgnum: '近7天非银现金分期机构个数(身份证)',
      als_d7_id_nbank_cf_orgnum: '近7天非银消费分期机构个数(身份证)',
      als_d7_cell_pdl_orgnum: '近7天现金贷机构个数(手机)',
      als_d7_cell_caon_orgnum: '近7天现金分期的机构个数(手机)',
      als_d7_cell_cooff_orgnum: '近7天消费分期机构个数(手机)',
      als_d7_cell_nbank_orgnum: '近7天非银机构个数(手机)',
      als_d7_cell_nbank_p2p_orgnum: '近7天p2p机构个数(手机)',
      als_d7_cell_nbank_night_orgnum: '近7天非银夜间机构个数(手机)',
      als_m1_id_pdl_orgnum: '近1个月现金贷机构个数(身份证)',
      als_m1_id_caon_orgnum: '近1个月现金分期机构个数(身份证)',
      als_m1_id_cooff_orgnum: '近1个月消费分期机构个数(身份证)',
      als_m1_id_nbank_orgnum: '近1个月非银机构个数(身份证)',
      als_m1_id_nbank_p2p_orgnum: '近1个月p2p机构个数(身份证)',
      als_m1_id_nbank_mc_orgnum: '近1个月小贷机构个数(身份证)',
      als_m1_id_nbank_ca_orgnum: '近1个月非银现金分期机构个数(身份证)',
      als_m1_id_nbank_cf_orgnum: '近1个月非银消费分期机构个数(身份证)',
      als_m1_id_nbank_night_orgnum: '近1个月非银夜间机构个数(身份证)',
      als_m1_cell_pdl_orgnum: '近1个月现金贷机构个数(手机)',
      als_m1_cell_caon_orgnum: '近1个月现金分期机构个数(手机)',
      als_m1_cell_cooff_orgnum: '近1个月消费分期机构个数(手机)',
      als_m1_cell_nbank_orgnum: '近1个月非银机构个数(手机)',
      als_m1_cell_nbank_p2p_orgnum: '近1个月p2p机构个数(手机)',
      als_m1_cell_nbank_mc_orgnum: '近1个月小贷机构个数(手机)',
      als_m1_cell_nbank_ca_orgnum: '近1个月非银现金分期机构个数(手机)',
      als_m1_cell_nbank_cf_orgnum: '近1个月非银消费分期机构个数(手机)',
      als_m1_cell_nbank_night_orgnum: '近1个月非银夜间机构个数(手机)',
      als_m3_id_pdl_orgnum: '近3个月线上现金贷机构个数(身份证)',
      als_m3_id_caon_orgnum: '近3个月现金分期机构个数(身份证)',
      als_m3_id_cooff_orgnum: '近3个月消费分期机构个数(身份证)',
      als_m3_id_nbank_selfnum: '近3个月本机构次数(身份证)',
      als_m3_id_nbank_orgnum: '近3个月非银机构个数(身份证)',
      als_m3_id_nbank_p2p_orgnum: '近3个月p2p机构个数(身份证)',
      als_m3_id_nbank_mc_orgnum: '近3个月小贷机构个数(身份证)',
      als_m3_id_nbank_ca_orgnum: '近3个月非银现金分期机构个数(身份证)',
      als_m3_id_nbank_cf_orgnum: '近3个月非银消费分期机构个数(身份证)',
      als_m3_id_nbank_night_orgnum: '近3个月非银夜间机构个数(身份证)',
      als_m3_cell_pdl_orgnum: '近3个月线上现金贷机构个数(手机)',
      als_m3_cell_caon_orgnum: '近3个月现金分期机构个数(手机)',
      als_m3_cell_cooff_orgnum: '近3个月消费分期机构个数(手机)',
      als_m3_cell_nbank_orgnum: '近3个月非银机构个数(手机)',
      als_m3_cell_nbank_p2p_orgnum: '近3个月p2p机构个数(手机)',
      als_m3_cell_nbank_mc_orgnum: '近3个月小贷机构个数(手机)',
      als_m3_cell_nbank_ca_orgnum: '近3个月非银现金分期机构个数(手机)',
      als_m3_cell_nbank_cf_orgnum: '近3个月非银消费分期机构个数(手机)',
      als_m3_cell_nbank_night_orgnum: '近3个月非银夜间机构个数(手机)',
      als_m6_id_pdl_orgnum: '近6个月现金贷机构个数(身份证)',
      als_m6_id_caon_orgnum: '近6个月现金分期机构个数(身份证)',
      als_m6_id_cooff_orgnum: '近6个月消费分期机构个数(身份证)',
      als_m6_id_nbank_orgnum: '近6个月非银机构个数(身份证)',
      als_m6_id_nbank_p2p_orgnum: '近6个月p2p机构个数(身份证)',
      als_m6_id_nbank_mc_orgnum: '近6个月小贷机构个数(身份证)',
      als_m6_id_nbank_ca_orgnum: '近6个月非银现金分期机构个数(身份证)',
      als_m6_id_nbank_cf_orgnum: '近6个月非银消费分期机构个数(身份证)',
      als_m6_id_nbank_night_orgnum: '近6个月非银夜间机构个数(身份证)',
      als_m6_cell_pdl_orgnum: '近6个月现金贷机构个数(手机)',
      als_m6_cell_caon_orgnum: '近6个月现金分期机构个数(手机)',
      als_m6_cell_cooff_orgnum: '近6个月消费分期机构个数(手机)',
      als_m6_cell_nbank_orgnum: '近6个月非银机构个数(手机)',
      als_m6_cell_nbank_p2p_orgnum: '近6个月p2p机构个数(手机)',
      als_m6_cell_nbank_mc_orgnum: '近6个月小贷机构个数(手机)',
      als_m6_cell_nbank_ca_orgnum: '近6个月非银现金分期机构个数(手机)',
      als_m6_cell_nbank_cf_orgnum: '近6个月非银消费分期机构个数(手机)',
      als_m6_cell_nbank_night_orgnum: '近6个月非银夜间机构个数(手机)',
      als_lst_id_nbank_consnum: '最近非银连续申请次数(身份证)',
      als_lst_cell_nbank_consnum: '最近非银连续申请次数(手机)',
    },     
  ]

  return dataFilter[code][tableType] || '';
}

//黑名单表格-内部字段-对应过滤器
function blacklistFilter2(code,tableType,value) {
  var dataFilter = [
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
    //smBlacklist
    {
      in_black: isHitFilter,
      in_grey: isHitFilter,
      itfin_loan_overdues: sameBackFilter,
      itfin_loan_overdue_duration: sameBackFilter,
      itfin_loan_overdues_7d: sameBackFilter,
      itfin_loan_overdue_duration_7d: sameBackFilter,
      itfin_loan_overdues_30d: sameBackFilter,
      itfin_loan_overdue_duration_30d: sameBackFilter,
      itfin_loan_overdues_60d: sameBackFilter,
      itfin_loan_overdue_duration_60d: sameBackFilter,
      itfin_loan_overdues_90d: sameBackFilter,
      itfin_loan_overdue_duration_90d: sameBackFilter,
      itfin_loan_overdues_180d: sameBackFilter,
      itfin_loan_overdue_duration_180d: sameBackFilter
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
    //jzWholeInDate
    {
      netWorkTimeResult: netTimeFilter,

    },
    //jzBlacklist
    {
      count: sameBackFilter,
      queryCountRecent10: sameBackFilter,
      queryCountRecent30: sameBackFilter,
      queryCountRecent90: sameBackFilter,
      queryCountRecent180: sameBackFilter,
      queryAppCountRecent10: sameBackFilter,
      queryAppCountRecent30: sameBackFilter,
      queryAppCountRecent90: sameBackFilter,
      queryAppCountRecent180: sameBackFilter,
      riskLevel: riskLevelFilter,
      tenantCount: sameBackFilter,
    },
    //jzOverdueDetail
    {
      appCountRecent24: sameBackFilter,
      totalCount: sameBackFilter,
      moneyRecent24: sameBackFilter,
      newestDateRecent24: sameBackFilter
    },
    //afShare
    {
      zcCreditScore: sameBackFilter,
      contractBreakRate: sameBackFilter,
      timesByOtherOrg: sameBackFilter,
      otherOrgCount: sameBackFilter,
      oneMonthTimesByCurrentOrg: sameBackFilter,
      threeMonthTimesByCurrentOrg: sameBackFilter,
      halfYearTimesByCurrentOrg: sameBackFilter,
      oneMonthOrgCount: sameBackFilter,
      threeMonthOrgCount: sameBackFilter,
      halfYearOrgCount: sameBackFilter,
      approvalCount: sameBackFilter,
      deniedApprovalCount: sameBackFilter,
      inApprovalCount: sameBackFilter,
      loanStatusCode: sameBackFilter,
      overdueAmount: sameBackFilter,
      currOverdueCount: sameBackFilter,
      maxoverduePeriods: sameBackFilter,
      overdueCount: sameBackFilter,
      overdueTimes: sameBackFilter,
      overdueM3: sameBackFilter,
      overdueM6: sameBackFilter,
      riskName: isHitFilter,
      riskTypeForPhishing: isHitFilter,
      riskTypeForFalseInfo: isHitFilter,
      riskTypeForInsolvency: isHitFilter,
      riskTypeForUseFalse: isHitFilter,
      riskTypeForOther: isHitFilter,
      riskTime: sameBackFilter,
    },
    //pinganRsk
    {
      sourceIdA: isHitFilter,
      rskScore: riskStateTxtFilter,
      rskMarkB1: isHitFilter,
      rskMarkB2: isHitFilter,
      rskMarkB3: isHitFilter,
      dataBuildTimeA: sameBackFilter,
      dataBuildTimeB1: sameBackFilter,
      dataBuildTimeB2: sameBackFilter,
      dataBuildTimeB3: sameBackFilter,   
    },
    //personalCredit
    {
      letterCreditConclusion: isPassFilter,
      creditBlank: isOkFilter,
      hasLoan: isHasFilter,
      overdue: isHasFilter,
      hasCreditCard: isHasFilter,
      hasGuarantee: isHasFilter,
      marriage: isMarriageFilter,
      hasCash: isHasFilter,
      icbcBlacklist: isHitFilter,
      creditLine: sameBackFilter,
      monthUseAmount: sameBackFilter,   
      monthUseRatio: sameBackFilter,
      quryNum: sameBackFilter,
      hasUseAmount: sameBackFilter,
      consumerLoan: sameBackFilter,
      consumerMonthPay: sameBackFilter,
      consumerBalance: sameBackFilter,
      farmerLoan: sameBackFilter,
      housingLoan: sameBackFilter,
      houseingLoanMonthPay: sameBackFilter,
      houseingLoanNum: sameBackFilter,
      houseringLoanBalance: sameBackFilter,
      bizLoan: sameBackFilter,
      bizLoanBalance: sameBackFilter,
      carLoan: sameBackFilter,
      studentLoan: sameBackFilter,
      otherLoanMonthPay: sameBackFilter,
      otherLoanNum: sameBackFilter,
      otherLoanAumout: sameBackFilter,
      unclearedLoanBalance: sameBackFilter,
      unclearedLoanNum: sameBackFilter,
      monthPayRecent6: sameBackFilter,
      maxOverdueInMonth: sameBackFilter,
      currentOverdue: sameBackFilter,
      sumOverdueNum: sameBackFilter,
      continueOverdueNum: sameBackFilter,
      sponsionAmount: sameBackFilter,
      sponsionBalance: sameBackFilter,
      sponsionNum: sameBackFilter,
      realNameAuth: isPassFilter2,
      factorValidate: isSameFilter,
      baiRongLevel: sameBackFilter,
      tongDunLevel: sameBackFilter,
      ficoLevel: sameBackFilter,
    },
    //jzResidenceCheck
    {
      homeAddressResult: isSameFilter2,
    },
    //ruitianScreen
    {
      blacklistFlag: blacklistFlagFilter,
    },
    //tdQueryRisk
    {
      final_score: riskStateTxtFilter2,
      idCount_180: sameBackFilter,
      mobileCount_180: sameBackFilter,
      idCountNbank_90: sameBackFilter,
      mobileCountNbank_90: sameBackFilter,
      idCount_90: sameBackFilter,
      mobileCount_90: sameBackFilter,
      idCountp2p_90: sameBackFilter,
      mobileCountp2p_90: sameBackFilter,
      idCountNbank_30: sameBackFilter,
      mobileCountNbank_30: sameBackFilter,
      idCount_30: sameBackFilter,
      mobileCount_30: sameBackFilter,
      idCountp2p_30: sameBackFilter,
      mobileCountp2p_30: sameBackFilter,
      idCountCons_90: sameBackFilter,
      mobileCountCons_90: sameBackFilter,
      idCount_7: sameBackFilter,
      mobileCount_7: sameBackFilter,
      idCountNbank_7: sameBackFilter,
      mobileCountNbank_7: sameBackFilter,
      idCountp2p_7: sameBackFilter,
      mobileCountp2p_7: sameBackFilter,
      idCountCons_30: sameBackFilter,
      mobileCountCons_30: sameBackFilter,
      idCountBank_90: sameBackFilter,
      mobileCountBank_90: sameBackFilter,
      idFkCount_90:	sameBackFilter,
      mobileFkCount_90:	sameBackFilter,       
      idCountBank_30: sameBackFilter,
      mobileCountBank_30: sameBackFilter,
      idSq_90: sameBackFilter,
    },
    //brApplyLoan
    {       
      als_d7_id_pdl_orgnum: sameBackFilter,
      als_d7_id_caon_orgnum: sameBackFilter,
      als_d7_id_cooff_orgnum: sameBackFilter,
      als_d7_id_nbank_orgnum: sameBackFilter,
      als_d7_id_nbank_p2p_orgnum: sameBackFilter,
      als_d7_id_nbank_mc_orgnum: sameBackFilter,
      als_d7_id_nbank_ca_orgnum: sameBackFilter,
      als_d7_id_nbank_cf_orgnum: sameBackFilter,
      als_d7_cell_pdl_orgnum: sameBackFilter,
      als_d7_cell_caon_orgnum: sameBackFilter,
      als_d7_cell_cooff_orgnum: sameBackFilter,
      als_d7_cell_nbank_orgnum: sameBackFilter,
      als_d7_cell_nbank_p2p_orgnum: sameBackFilter,
      als_d7_cell_nbank_night_orgnum: sameBackFilter,
      als_m1_id_pdl_orgnum: sameBackFilter,
      als_m1_id_caon_orgnum: sameBackFilter,
      als_m1_id_cooff_orgnum: sameBackFilter,
      als_m1_id_nbank_orgnum: sameBackFilter,
      als_m1_id_nbank_p2p_orgnum: sameBackFilter,
      als_m1_id_nbank_mc_orgnum: sameBackFilter,
      als_m1_id_nbank_ca_orgnum: sameBackFilter,
      als_m1_id_nbank_cf_orgnum: sameBackFilter,
      als_m1_id_nbank_night_orgnum: sameBackFilter,
      als_m1_cell_pdl_orgnum: sameBackFilter,
      als_m1_cell_caon_orgnum: sameBackFilter,
      als_m1_cell_cooff_orgnum: sameBackFilter,
      als_m1_cell_nbank_orgnum: sameBackFilter,
      als_m1_cell_nbank_p2p_orgnum: sameBackFilter,
      als_m1_cell_nbank_mc_orgnum: sameBackFilter,
      als_m1_cell_nbank_ca_orgnum: sameBackFilter,
      als_m1_cell_nbank_cf_orgnum: sameBackFilter,
      als_m1_cell_nbank_night_orgnum: sameBackFilter,
      als_m3_id_pdl_orgnum: sameBackFilter,
      als_m3_id_caon_orgnum: sameBackFilter,
      als_m3_id_cooff_orgnum: sameBackFilter,
      als_m3_id_nbank_selfnum: sameBackFilter,
      als_m3_id_nbank_orgnum: sameBackFilter,
      als_m3_id_nbank_p2p_orgnum: sameBackFilter,
      als_m3_id_nbank_mc_orgnum: sameBackFilter,
      als_m3_id_nbank_ca_orgnum: sameBackFilter,
      als_m3_id_nbank_cf_orgnum: sameBackFilter,
      als_m3_id_nbank_night_orgnum: sameBackFilter,
      als_m3_cell_pdl_orgnum: sameBackFilter,
      als_m3_cell_caon_orgnum: sameBackFilter,
      als_m3_cell_cooff_orgnum: sameBackFilter,
      als_m3_cell_nbank_orgnum: sameBackFilter,
      als_m3_cell_nbank_p2p_orgnum: sameBackFilter,
      als_m3_cell_nbank_mc_orgnum: sameBackFilter,
      als_m3_cell_nbank_ca_orgnum: sameBackFilter,
      als_m3_cell_nbank_cf_orgnum: sameBackFilter,
      als_m3_cell_nbank_night_orgnum: sameBackFilter,
      als_m6_id_pdl_orgnum: sameBackFilter,
      als_m6_id_caon_orgnum: sameBackFilter,
      als_m6_id_cooff_orgnum: sameBackFilter,
      als_m6_id_nbank_orgnum: sameBackFilter,
      als_m6_id_nbank_p2p_orgnum: sameBackFilter,
      als_m6_id_nbank_mc_orgnum: sameBackFilter,
      als_m6_id_nbank_ca_orgnum: sameBackFilter,
      als_m6_id_nbank_cf_orgnum: sameBackFilter,
      als_m6_id_nbank_night_orgnum: sameBackFilter,
      als_m6_cell_pdl_orgnum: sameBackFilter,
      als_m6_cell_caon_orgnum: sameBackFilter,
      als_m6_cell_cooff_orgnum: sameBackFilter,
      als_m6_cell_nbank_orgnum: sameBackFilter,
      als_m6_cell_nbank_p2p_orgnum: sameBackFilter,
      als_m6_cell_nbank_mc_orgnum: sameBackFilter,
      als_m6_cell_nbank_ca_orgnum: sameBackFilter,
      als_m6_cell_nbank_cf_orgnum: sameBackFilter,
      als_m6_cell_nbank_night_orgnum: sameBackFilter,
      als_lst_id_nbank_consnum: sameBackFilter,
      als_lst_cell_nbank_consnum: sameBackFilter,
    },         
  ]
  return dataFilter[code][tableType](value);
}
//黑名单表格相关过滤器end


//云镜报告页过滤器end