$(function () {
  //当前页全局变量
  //获取url相关参数
  var appId = getUrlParam('appId');
  var token = getUrlParam('token');
  var bizType = getUrlParam('bizType') || '';
  var orderNo = getUrlParam('orderNo') || '';
  var role = getUrlParam('role') || '';
  var relationship = getUrlParam('relationship') || '';

  //单人报告demo的html
  var reportDemoHtml = $('#demo').html();

  //接口返回数据相关start
  //综合结论通过不通过
  var conclusionData = {
    typeConclusion1: 0,
		result: '',
		decisionDate: '',
  };
  //综合结论-每个人风险项数组
  var personsRisks = [];
  //报告列表人身份证和信息数组
  var reportArrInfo = [];
  //几个人就调几次数据详情接口
  var requestOkNumber = 0;
  var resHtmlArr = [];//数组字段:type,data,html
	//接口返回数据相关end
	

  //方法定义start
  //获取对象属性个数
  //显示或隐藏页面加载状态
  function toShowLoading(type) {
    //显示页面加载状态图标
    if (type === 1) {
      $('#loadMask').removeClass('dn');
      $('#load').removeClass('dn');
    }
    //隐藏页面加载状态图标
    if (type === 0) {
      $('#loadMask').addClass('dn');
      $('#load').addClass('dn');
    }
  }

  //方法定义end

  //跟页面逻辑相关start
  //贷款相关人的报告列表
  function getFinalReport() {
    //改变demo报告名和添加描点-让菜单可以定位到描点
    function changeTitleAndId(index) {
      $('.riskListDetailsReport .riskTitle').eq(index).attr('id', resHtmlArr[index].type);
      var title = loanPersonFilter(resHtmlArr[index].type);
      $('.riskListDetailsReport .riskTitle').eq(index).text(title);
    }    

    //改变demo报告黑名单三列列表数据
    function changeBlacklist(index) {
      //当前黑名单三列表每列要加的html
      var blackPartAddArr = [''];
      //当前个人报告对象
      var data = resHtmlArr[index].data;
      //遍历黑名单表格方法
      function getBlackTable(blackData, code) {
        //判断当前对象属性值是不是全部为null(除show属性)
        function judgeDataAllNull(obj, codeJudgeDataAllNull) {
          var isTrue = true;
          var length = attributeCount(obj) - 1;
          var numJudgeDataAllNull = 0;
          for (var name in obj) {
            if (name !== 'show') {

              if (blacklistFilter2(codeJudgeDataAllNull, name, obj[name]) === '') {
                numJudgeDataAllNull = numJudgeDataAllNull + 1;
              }              

              if (blacklistFilter2(codeJudgeDataAllNull, name, obj[name]) === '未命中') {
                numJudgeDataAllNull = numJudgeDataAllNull + 1;
              }

              if (blacklistFilter2(codeJudgeDataAllNull, name, obj[name]) === '0') {
                numJudgeDataAllNull = numJudgeDataAllNull + 1;
              }

              if (blacklistFilter2(codeJudgeDataAllNull, name, obj[name]) === 0) {
                numJudgeDataAllNull = numJudgeDataAllNull + 1;
              }
            }
          }
          if (numJudgeDataAllNull !== length) {
            isTrue = false;
          }
          return isTrue;
        }
        //当前黑名单的html
        var html = '';
        //获取对象属性个数
        var count = judgeDataAllNull(blackData, code);
        //是否有black2样式
        var black2 = code > 0 ? 'black2' : '';
        //如果只有一个属性，返回无结果  或者属性都是未命中
        if (count) {
          html = html + [
            "<div class='black " + black2 + "'>",
              "<div class='headline clearfloat'>",
                "<div class='dot'></div>",
                "<div class='titleTxt'>" + blacklistTitleFilter(code) + "</div>", 
              "</div>",
              "<div class='noblack'>查无结果</div>",
            "</div>",
          ].join("");
          blackPartAddArr[0] = blackPartAddArr[0] + html;
        } else {
          //黑名单table的td遍历
          function getBlackTd(blackData2) {
            var htmlGetBlackTd = '';
            for (var name in blackData2) {
              var value = blackData2[name];
              //人行征信做特殊处理
              var td3 = code === 0 ? 'td3' : '';
              var td4 = code === 0 ? 'td4' : '';              
              if (name !== 'show') {
                if ((blacklistFilter2(code, name, value) !== '') && (blacklistFilter2(code, name, value) !== '0') && (blacklistFilter2(code, name, value) !== 0) && (blacklistFilter2(code, name, value) !== '未命中')) {
                  htmlGetBlackTd = htmlGetBlackTd + [
                    "<div class='tr clearfloat'>",
                      "<div class='td1 " + td3 + "'><p>" + blacklistFilter(code, name) + "</p></div>",
                      "<div class='td2 " + td4 + "'><p>" + blacklistFilter2(code, name, value) + "</p></div>",
                      "<div class='line'></div>",
                    "</div>"
                  ].join("");
                }
              }
            }
            return htmlGetBlackTd;
          }
          html = html + [
            "<div class='black " + black2 + "'>",
              "<div class='headline clearfloat'>",
                "<div class='dot'></div>",
                "<div class='titleTxt'>" + blacklistTitleFilter(code) + "</div>",             
              "</div>",
              "<div class='table'>",
                getBlackTd(blackData),
              "</div>",
            "</div>",
          ].join("");
          blackPartAddArr[0] = blackPartAddArr[0] + html;
        }
      }       

      //人行征信信息
      if (data.personalCredit && data.personalCredit.show) {
        var personalCreditData = {
          show: true,
          creditResult: '',
          creditNote: '',                    
        }
        //数据删选显示
        personalCreditData = dataToData2(personalCreditData, data.personalCredit);

        getBlackTable(personalCreditData, 0);
      }

      if(role === '1') {
        $('.blacklistPart').eq(index).append(blackPartAddArr[0]);
        return;     
      }      

      //百融特殊名单
      if (data.brSpecialList && data.brSpecialList.show) {
        getBlackTable(data.brSpecialList, 1);
      }

      //百融自然人
      if (data.brBadInfo && data.brBadInfo.show) {
        getBlackTable(data.brBadInfo, 2);
      }

      //百融法院执行人
      if (data.brExecut && data.brExecut.show) {
        getBlackTable(data.brExecut, 3);
      }

      //百融多头借贷
      if (data.brApplyLoan && data.brApplyLoan.show) {
        var brApplyLoanData = {
          show: true,
          als_d7_id_pdl_orgnum: 0,
          als_d7_id_caon_allnum: 0,
          als_d7_id_caon_orgnum: 0,
          als_d7_id_rel_allnum: 0,
          als_d7_id_rel_orgnum: 0,
          als_d7_id_cooff_allnum: 0,
          als_d7_id_cooff_orgnum: 0,
          als_d7_id_af_allnum: 0,
          als_d7_id_af_orgnum: 0,
          als_d7_id_oth_allnum: 0,
          als_d7_id_oth_orgnum: 0,
          als_d7_id_bank_allnum: 0,
          als_d7_id_bank_orgnum: 0,
          als_d7_id_nbank_allnum: 0,
          als_d7_id_nbank_p2p_allnum: 0,
          als_d7_id_nbank_mc_allnum: 0,
          als_d7_id_nbank_ca_allnum: 0,
          als_d7_id_nbank_cf_allnum: 0,
          als_d7_id_nbank_com_allnum: 0,
          als_d7_id_nbank_oth_allnum: 0,
          als_d7_id_nbank_nsloan_allnum: 0,
          als_d7_id_nbank_autofin_allnum: 0,
          als_d7_id_nbank_sloan_allnum: 0,
          als_d7_id_nbank_cons_allnum: 0,
          als_d7_id_nbank_finlea_allnum: 0,
          als_d7_id_nbank_orgnum: 0,
          als_d7_id_nbank_p2p_orgnum: 0,
          als_d7_id_nbank_mc_orgnum: 0,
          als_d7_id_nbank_ca_orgnum: 0,
          als_d7_id_nbank_cf_orgnum: 0,
          als_d7_id_nbank_com_orgnum: 0,
          als_d7_id_nbank_oth_orgnum: 0,
          als_d7_id_nbank_nsloan_orgnum: 0,
          als_d7_id_nbank_autofin_orgnum: 0,
          als_d7_id_nbank_sloan_orgnum: 0,
          als_d7_id_nbank_cons_orgnum: 0,
          als_d7_id_nbank_finlea_orgnum: 0,
          als_d7_id_nbank_night_allnum: 0,
          als_d7_id_nbank_night_orgnum: 0,
          als_d7_cell_pdl_allnum: 0,
          als_d7_cell_pdl_orgnum: 0,
          als_d7_cell_caon_allnum: 0,
          als_d7_cell_caon_orgnum: 0,
          als_d7_cell_rel_allnum: 0,
          als_d7_cell_rel_orgnum: 0,
          als_d7_cell_cooff_allnum: 0,
          als_d7_cell_cooff_orgnum: 0,
          als_d7_cell_af_allnum: 0,
          als_d7_cell_af_orgnum: 0,
          als_d7_cell_oth_allnum: 0,
          als_d7_cell_oth_orgnum: 0,
          als_d7_cell_bank_allnum: 0,
          als_d7_cell_bank_orgnum: 0,
          als_d7_cell_nbank_allnum: 0,
          als_d7_cell_nbank_p2p_allnum: 0,
          als_d7_cell_nbank_mc_allnum: 0,
          als_d7_cell_nbank_ca_allnum: 0,
          als_d7_cell_nbank_cf_allnum: 0,
          als_d7_cell_nbank_com_allnum: 0,
          als_d7_cell_nbank_oth_allnum: 0,
          als_d7_cell_nbank_nsloan_allnum: 0,
          als_d7_cell_nbank_autofin_allnum: 0,
          als_d7_cell_nbank_sloan_allnum: 0,
          als_d7_cell_nbank_cons_allnum: 0,
          als_d7_cell_nbank_finlea_allnum: 0,
          als_d7_cell_nbank_orgnum: 0,
          als_d7_cell_nbank_p2p_orgnum: 0,
          als_d7_cell_nbank_mc_orgnum: 0,
          als_d7_cell_nbank_ca_orgnum: 0,
          als_d7_cell_nbank_cf_orgnum: 0,
          als_d7_cell_nbank_com_orgnum: 0,
          als_d7_cell_nbank_oth_orgnum: 0,
          als_d7_cell_nbank_nsloan_orgnum: 0,
          als_d7_cell_nbank_autofin_orgnum: 0,
          als_d7_cell_nbank_sloan_orgnum: 0,
          als_d7_cell_nbank_cons_orgnum: 0,
          als_d7_cell_nbank_finlea_orgnum: 0,
          als_d7_cell_nbank_night_allnum: 0,
          als_d7_cell_nbank_night_orgnum: 0,
          als_d15_id_pdl_allnum: 0,
          als_d15_id_pdl_orgnum: 0,
          als_d15_id_caon_allnum: 0,
          als_d15_id_caon_orgnum: 0,
          als_d15_id_rel_allnum: 0,
          als_d15_id_rel_orgnum: 0,
          als_d15_id_cooff_allnum: 0,
          als_d15_id_cooff_orgnum: 0,
          als_d15_id_af_allnum: 0,
          als_d15_id_af_orgnum: 0,
          als_d15_id_oth_allnum: 0,
          als_d15_id_oth_orgnum: 0,
          als_d15_id_bank_allnum: 0,
          als_d15_id_bank_orgnum: 0,
          als_d15_id_nbank_allnum: 0,
          als_d15_id_nbank_p2p_allnum: 0,
          als_d15_id_nbank_mc_allnum: 0,
          als_d15_id_nbank_ca_allnum: 0,
          als_d15_id_nbank_cf_allnum: 0,
          als_d15_id_nbank_com_allnum: 0,
          als_d15_id_nbank_oth_allnum: 0,
          als_d15_id_nbank_nsloan_allnum: 0,
          als_d15_id_nbank_autofin_allnum: 0,
          als_d15_id_nbank_sloan_allnum: 0,
          als_d15_id_nbank_cons_allnum: 0,
          als_d15_id_nbank_finlea_allnum: 0,
          als_d15_id_nbank_orgnum: 0,
          als_d15_id_nbank_p2p_orgnum: 0,
          als_d15_id_nbank_mc_orgnum: 0,
          als_d15_id_nbank_ca_orgnum: 0,
          als_d15_id_nbank_cf_orgnum: 0,
          als_d15_id_nbank_com_orgnum: 0,
          als_d15_id_nbank_oth_orgnum: 0,
          als_d15_id_nbank_nsloan_orgnum: 0,
          als_d15_id_nbank_autofin_orgnum: 0,
          als_d15_id_nbank_sloan_orgnum: 0,
          als_d15_id_nbank_cons_orgnum: 0,
          als_d15_id_nbank_finlea_orgnum: 0,
          als_d15_id_nbank_night_allnum: 0,
          als_d15_id_nbank_night_orgnum: 0,
          als_d15_cell_pdl_allnum: 0,
          als_d15_cell_pdl_orgnum: 0,
          als_d15_cell_caon_allnum: 0,
          als_d15_cell_caon_orgnum: 0,
          als_d15_cell_rel_allnum: 0,
          als_d15_cell_rel_orgnum: 0,
          als_d15_cell_cooff_allnum: 0,
          als_d15_cell_cooff_orgnum: 0,
          als_d15_cell_af_allnum: 0,
          als_d15_cell_af_orgnum: 0,
          als_d15_cell_oth_allnum: 0,
          als_d15_cell_oth_orgnum: 0,
          als_d15_cell_bank_allnum: 0,
          als_d15_cell_bank_orgnum: 0,
          als_d15_cell_nbank_allnum: 0,
          als_d15_cell_nbank_p2p_allnum: 0,
          als_d15_cell_nbank_mc_allnum: 0,
          als_d15_cell_nbank_ca_allnum: 0,
          als_d15_cell_nbank_cf_allnum: 0,
          als_d15_cell_nbank_com_allnum: 0,
          als_d15_cell_nbank_oth_allnum: 0,
          als_d15_cell_nbank_nsloan_allnum: 0,
          als_d15_cell_nbank_autofin_allnum: 0,
          als_d15_cell_nbank_sloan_allnum: 0,
          als_d15_cell_nbank_cons_allnum: 0,
          als_d15_cell_nbank_finlea_allnum: 0,
          als_d15_cell_nbank_orgnum: 0,
          als_d15_cell_nbank_p2p_orgnum: 0,
          als_d15_cell_nbank_mc_orgnum: 0,
          als_d15_cell_nbank_ca_orgnum: 0,
          als_d15_cell_nbank_cf_orgnum: 0,
          als_d15_cell_nbank_com_orgnum: 0,
          als_d15_cell_nbank_oth_orgnum: 0,
          als_d15_cell_nbank_nsloan_orgnum: 0,
          als_d15_cell_nbank_autofin_orgnum: 0,
          als_d15_cell_nbank_sloan_orgnum: 0,
          als_d15_cell_nbank_cons_orgnum: 0,
          als_d15_cell_nbank_finlea_orgnum: 0,
          als_m1_id_pdl_allnum: 0,
          als_m1_id_pdl_orgnum: 0,
          als_m1_id_caon_allnum: 0,
          als_m1_id_caon_orgnum: 0,
          als_m1_id_rel_allnum: 0,
          als_m1_id_rel_orgnum: 0,
          als_m1_id_cooff_allnum: 0,
          als_m1_id_cooff_orgnum: 0,
          als_m1_id_af_allnum: 0,
          als_m1_id_af_orgnum: 0,
          als_m1_id_oth_allnum: 0,
          als_m1_id_oth_orgnum: 0,
          als_m1_id_bank_allnum: 0,
          als_m1_id_bank_selfnum: 0,
          als_m1_id_bank_tra_allnum: 0,
          als_m1_id_bank_ret_allnum: 0,
          als_m1_id_bank_orgnum: 0,
          als_m1_id_nbank_allnum: 0,
          als_m1_id_nbank_p2p_allnum: 0,
          als_m1_id_nbank_mc_allnum: 0,
          als_m1_id_nbank_ca_allnum: 0,
          als_m1_id_nbank_cf_allnum: 0,
          als_m1_id_nbank_com_allnum: 0,
          als_m1_id_nbank_oth_allnum: 0,
          als_m1_id_nbank_nsloan_allnum: 0,
          als_m1_id_nbank_autofin_allnum: 0,
          als_m1_id_nbank_sloan_allnum: 0,
          als_m1_id_nbank_cons_allnum: 0,
          als_m1_id_nbank_finlea_allnum: 0,
          als_m1_id_nbank_orgnum: 0,
          als_m1_id_nbank_p2p_orgnum: 0,
          als_m1_id_nbank_mc_orgnum: 0,
          als_m1_id_nbank_ca_orgnum: 0,
          als_m1_id_nbank_cf_orgnum: 0,
          als_m1_id_nbank_com_orgnum: 0,
          als_m1_id_nbank_oth_orgnum: 0,
          als_m1_id_nbank_nsloan_orgnum: 0,
          als_m1_id_nbank_autofin_orgnum: 0,
          als_m1_id_nbank_sloan_orgnum: 0,
          als_m1_id_nbank_cons_orgnum: 0,
          als_m1_id_nbank_finlea_orgnum: 0,
          als_m1_id_nbank_night_allnum: 0,
          als_m1_id_nbank_night_orgnum: 0,
          als_m1_cell_pdl_allnum: 0,
          als_m1_cell_pdl_orgnum: 0,
          als_m1_cell_caon_allnum: 0,
          als_m1_cell_caon_orgnum: 0,
          als_m1_cell_rel_allnum: 0,
          als_m1_cell_rel_orgnum: 0,
          als_m1_cell_cooff_allnum: 0,
          als_m1_cell_cooff_orgnum: 0,
          als_m1_cell_af_allnum: 0,
          als_m1_cell_af_orgnum: 0,
          als_m1_cell_oth_allnum: 0,
          als_m1_cell_oth_orgnum: 0,
          als_m1_cell_bank_allnum: 0,
          als_m1_cell_bank_orgnum: 0,
          als_m1_cell_nbank_allnum: 0,
          als_m1_cell_nbank_p2p_allnum: 0,
          als_m1_cell_nbank_mc_allnum: 0,
          als_m1_cell_nbank_ca_allnum: 0,
          als_m1_cell_nbank_cf_allnum: 0,
          als_m1_cell_nbank_com_allnum: 0,
          als_m1_cell_nbank_oth_allnum: 0,
          als_m1_cell_nbank_nsloan_allnum: 0,
          als_m1_cell_nbank_autofin_allnum: 0,
          als_m1_cell_nbank_sloan_allnum: 0,
          als_m1_cell_nbank_cons_allnum: 0,
          als_m1_cell_nbank_finlea_allnum: 0,
          als_m1_cell_nbank_orgnum: 0,
          als_m1_cell_nbank_p2p_orgnum: 0,
          als_m1_cell_nbank_mc_orgnum: 0,
          als_m1_cell_nbank_ca_orgnum: 0,
          als_m1_cell_nbank_cf_orgnum: 0,
          als_m1_cell_nbank_com_orgnum: 0,
          als_m1_cell_nbank_oth_orgnum: 0,
          als_m1_cell_nbank_nsloan_orgnum: 0,
          als_m1_cell_nbank_autofin_orgnum: 0,
          als_m1_cell_nbank_sloan_orgnum: 0,
          als_m1_cell_nbank_cons_orgnum: 0,
          als_m1_cell_nbank_finlea_orgnum: 0,
          als_m1_cell_nbank_night_allnum: 0,
          als_m1_cell_nbank_night_orgnum: 0,
          als_m3_id_avg_monnum: 0,
          als_m3_id_pdl_allnum: 0,
          als_m3_id_pdl_orgnum: 0,
          als_m3_id_caon_allnum: 0,
          als_m3_id_caon_orgnum: 0,
          als_m3_id_rel_allnum: 0,
          als_m3_id_rel_orgnum: 0,
          als_m3_id_cooff_allnum: 0,
          als_m3_id_cooff_orgnum: 0,
          als_m3_id_af_allnum: 0,
          als_m3_id_af_orgnum: 0,
          als_m3_id_oth_allnum: 0,
          als_m3_id_oth_orgnum: 0,
          als_m3_id_bank_allnum: 0,
          als_m3_id_bank_orgnum: 0,
          als_m3_id_nbank_selfnum: 0,
          als_m3_id_nbank_allnum: 0,
          als_m3_id_nbank_p2p_allnum: 0,
          als_m3_id_nbank_mc_allnum: 0,
          als_m3_id_nbank_ca_allnum: 0,
          als_m3_id_nbank_cf_allnum: 0,
          als_m3_id_nbank_com_allnum: 0,
          als_m3_id_nbank_oth_allnum: 0,
          als_m3_id_nbank_nsloan_allnum: 0,
          als_m3_id_nbank_autofin_allnum: 0,
          als_m3_id_nbank_sloan_allnum: 0,
          als_m3_id_nbank_cons_allnum: 0,
          als_m3_id_nbank_finlea_allnum: 0,
          als_m3_id_nbank_orgnum: 0,
          als_m3_id_nbank_p2p_orgnum: 0,
          als_m3_id_nbank_mc_orgnum: 0,
          als_m3_id_nbank_ca_orgnum: 0,
          als_m3_id_nbank_cf_orgnum: 0,
          als_m3_id_nbank_com_orgnum: 0,
          als_m3_id_nbank_oth_orgnum: 0,
          als_m3_id_nbank_nsloan_orgnum: 0,
          als_m3_id_nbank_autofin_orgnum: 0,
          als_m3_id_nbank_sloan_orgnum: 0,
          als_m3_id_nbank_cons_orgnum: 0,
          als_m3_id_nbank_finlea_orgnum: 0,
          als_m3_id_nbank_avg_monnum: 0,
          als_m3_id_nbank_night_allnum: 0,
          als_m3_id_nbank_night_orgnum: 0,
          als_m3_cell_avg_monnum: 0,
          als_m3_cell_pdl_allnum: 0,
          als_m3_cell_pdl_orgnum: 0,
          als_m3_cell_caon_allnum: 0,
          als_m3_cell_caon_orgnum: 0,
          als_m3_cell_rel_allnum: 0,
          als_m3_cell_rel_orgnum: 0,
          als_m3_cell_cooff_allnum: 0,
          als_m3_cell_cooff_orgnum: 0,
          als_m3_cell_af_allnum: 0,
          als_m3_cell_af_orgnum: 0,
          als_m3_cell_oth_allnum: 0,
          als_m3_cell_oth_orgnum: 0,
          als_m3_cell_bank_allnum: 0,
          als_m3_cell_bank_orgnum: 0,
          als_m3_cell_nbank_selfnum: 0,
          als_m3_cell_nbank_allnum: 0,
          als_m3_cell_nbank_p2p_allnum: 0,
          als_m3_cell_nbank_mc_allnum: 0,
          als_m3_cell_nbank_ca_allnum: 0,
          als_m3_cell_nbank_cf_allnum: 0,
          als_m3_cell_nbank_com_allnum: 0,
          als_m3_cell_nbank_oth_allnum: 0,
          als_m3_cell_nbank_nsloan_allnum: 0,
          als_m3_cell_nbank_autofin_allnum: 0,
          als_m3_cell_nbank_sloan_allnum: 0,
          als_m3_cell_nbank_cons_allnum: 0,
          als_m3_cell_nbank_finlea_allnum: 0,
          als_m3_cell_nbank_orgnum: 0,
          als_m3_cell_nbank_p2p_orgnum: 0,
          als_m3_cell_nbank_mc_orgnum: 0,
          als_m3_cell_nbank_ca_orgnum: 0,
          als_m3_cell_nbank_cf_orgnum: 0,
          als_m3_cell_nbank_com_orgnum: 0,
          als_m3_cell_nbank_oth_orgnum: 0,
          als_m3_cell_nbank_nsloan_orgnum: 0,
          als_m3_cell_nbank_autofin_orgnum: 0,
          als_m3_cell_nbank_sloan_orgnum: 0,
          als_m3_cell_nbank_cons_orgnum: 0,
          als_m3_cell_nbank_finlea_orgnum: 0,
          als_m3_cell_nbank_avg_monnum: 0,
          als_m3_cell_nbank_night_allnum: 0,
          als_m3_cell_nbank_night_orgnum: 0,
          als_m6_id_pdl_allnum: 0,
          als_m6_id_pdl_orgnum: 0,
          als_m6_id_caon_allnum: 0,
          als_m6_id_caon_orgnum: 0,
          als_m6_id_rel_allnum: 0,
          als_m6_id_rel_orgnum: 0,
          als_m6_id_cooff_allnum: 0,
          als_m6_id_cooff_orgnum: 0,
          als_m6_id_af_allnum: 0,
          als_m6_id_af_orgnum: 0,
          als_m6_id_oth_allnum: 0,
          als_m6_id_oth_orgnum: 0,
          als_m6_id_bank_allnum: 0,
          als_m6_id_bank_orgnum: 0,
          als_m6_id_nbank_allnum: 0,
          als_m6_id_nbank_p2p_allnum: 0,
          als_m6_id_nbank_mc_allnum: 0,
          als_m6_id_nbank_ca_allnum: 0,
          als_m6_id_nbank_cf_allnum: 0,
          als_m6_id_nbank_com_allnum: 0,
          als_m6_id_nbank_oth_allnum: 0,
          als_m6_id_nbank_nsloan_allnum: 0,
          als_m6_id_nbank_autofin_allnum: 0,
          als_m6_id_nbank_sloan_allnum: 0,
          als_m6_id_nbank_cons_allnum: 0,
          als_m6_id_nbank_finlea_allnum: 0,
          als_m6_id_nbank_orgnum: 0,
          als_m6_id_nbank_p2p_orgnum: 0,
          als_m6_id_nbank_mc_orgnum: 0,
          als_m6_id_nbank_ca_orgnum: 0,
          als_m6_id_nbank_cf_orgnum: 0,
          als_m6_id_nbank_com_orgnum: 0,
          als_m6_id_nbank_oth_orgnum: 0,
          als_m6_id_nbank_nsloan_orgnum: 0,
          als_m6_id_nbank_autofin_orgnum: 0,
          als_m6_id_nbank_sloan_orgnum: 0,
          als_m6_id_nbank_cons_orgnum: 0,
          als_m6_id_nbank_finlea_orgnum: 0,
          als_m6_id_nbank_avg_monnum: 0,
          als_m6_id_nbank_night_allnum: 0,
          als_m6_id_nbank_night_orgnum: 0,
          als_m6_cell_pdl_allnum: 0,
          als_m6_cell_pdl_orgnum: 0,
          als_m6_cell_caon_allnum: 0,
          als_m6_cell_caon_orgnum: 0,
          als_m6_cell_rel_allnum: 0,
          als_m6_cell_rel_orgnum: 0,
          als_m6_cell_cooff_allnum: 0,
          als_m6_cell_cooff_orgnum: 0,
          als_m6_cell_af_allnum: 0,
          als_m6_cell_af_orgnum: 0,
          als_m6_cell_oth_allnum: 0,
          als_m6_cell_oth_orgnum: 0,
          als_m6_cell_bank_allnum: 0,
          als_m6_cell_bank_orgnum: 0,
          als_m6_cell_nbank_allnum: 0,
          als_m6_cell_nbank_p2p_allnum: 0,
          als_m6_cell_nbank_mc_allnum: 0,
          als_m6_cell_nbank_ca_allnum: 0,
          als_m6_cell_nbank_cf_allnum: 0,
          als_m6_cell_nbank_com_allnum: 0,
          als_m6_cell_nbank_oth_allnum: 0,
          als_m6_cell_nbank_nsloan_allnum: 0,
          als_m6_cell_nbank_autofin_allnum: 0,
          als_m6_cell_nbank_sloan_allnum: 0,
          als_m6_cell_nbank_cons_allnum: 0,
          als_m6_cell_nbank_finlea_allnum: 0,
          als_m6_cell_nbank_orgnum: 0,
          als_m6_cell_nbank_p2p_orgnum: 0,
          als_m6_cell_nbank_mc_orgnum: 0,
          als_m6_cell_nbank_ca_orgnum: 0,
          als_m6_cell_nbank_cf_orgnum: 0,
          als_m6_cell_nbank_com_orgnum: 0,
          als_m6_cell_nbank_oth_orgnum: 0,
          als_m6_cell_nbank_nsloan_orgnum: 0,
          als_m6_cell_nbank_autofin_orgnum: 0,
          als_m6_cell_nbank_sloan_orgnum: 0,
          als_m6_cell_nbank_cons_orgnum: 0,
          als_m6_cell_nbank_finlea_orgnum: 0,
          als_m6_cell_nbank_avg_monnum: 0,
          als_m6_cell_nbank_night_allnum: 0,
          als_m6_cell_nbank_night_orgnum: 0,
          als_m12_id_pdl_allnum: 0,
          als_m12_id_pdl_orgnum: 0,
          als_m12_id_caon_allnum: 0,
          als_m12_id_caon_orgnum: 0,
          als_m12_id_rel_allnum: 0,
          als_m12_id_rel_orgnum: 0,
          als_m12_id_cooff_allnum: 0,
          als_m12_id_cooff_orgnum: 0,
          als_m12_id_af_allnum: 0,
          als_m12_id_af_orgnum: 0,
          als_m12_id_oth_allnum: 0,
          als_m12_id_oth_orgnum: 0,
          als_m12_id_bank_allnum: 0,
          als_m12_id_bank_orgnum: 0,
          als_m12_id_nbank_allnum: 0,
          als_m12_id_nbank_p2p_allnum: 0,
          als_m12_id_nbank_mc_allnum: 0,
          als_m12_id_nbank_ca_allnum: 0,
          als_m12_id_nbank_cf_allnum: 0,
          als_m12_id_nbank_com_allnum: 0,
          als_m12_id_nbank_oth_allnum: 0,
          als_m12_id_nbank_nsloan_allnum: 0,
          als_m12_id_nbank_autofin_allnum: 0,
          als_m12_id_nbank_sloan_allnum: 0,
          als_m12_id_nbank_cons_allnum: 0,
          als_m12_id_nbank_finlea_allnum: 0,
          als_m12_id_nbank_orgnum: 0,
          als_m12_id_nbank_p2p_orgnum: 0,
          als_m12_id_nbank_mc_orgnum: 0,
          als_m12_id_nbank_ca_orgnum: 0,
          als_m12_id_nbank_cf_orgnum: 0,
          als_m12_id_nbank_com_orgnum: 0,
          als_m12_id_nbank_oth_orgnum: 0,
          als_m12_id_nbank_nsloan_orgnum: 0,
          als_m12_id_nbank_autofin_orgnum: 0,
          als_m12_id_nbank_sloan_orgnum: 0,
          als_m12_id_nbank_cons_orgnum: 0,
          als_m12_id_nbank_finlea_orgnum: 0,
          als_m12_id_nbank_avg_monnum: 0,
          als_m12_id_nbank_night_allnum: 0,
          als_m12_id_nbank_night_orgnum: 0,
          als_m12_cell_pdl_allnum: 0,
          als_m12_cell_pdl_orgnum: 0,
          als_m12_cell_caon_allnum: 0,
          als_m12_cell_caon_orgnum: 0,
          als_m12_cell_rel_allnum: 0,
          als_m12_cell_rel_orgnum: 0,
          als_m12_cell_cooff_allnum: 0,
          als_m12_cell_cooff_orgnum: 0,
          als_m12_cell_af_allnum: 0,
          als_m12_cell_af_orgnum: 0,
          als_m12_cell_oth_allnum: 0,
          als_m12_cell_oth_orgnum: 0,
          als_m12_cell_bank_allnum: 0,
          als_m12_cell_bank_orgnum: 0,
          als_m12_cell_nbank_allnum: 0,
          als_m12_cell_nbank_p2p_allnum: 0,
          als_m12_cell_nbank_mc_allnum: 0,
          als_m12_cell_nbank_ca_allnum: 0,
          als_m12_cell_nbank_cf_allnum: 0,
          als_m12_cell_nbank_com_allnum: 0,
          als_m12_cell_nbank_oth_allnum: 0,
          als_m12_cell_nbank_nsloan_allnum: 0,
          als_m12_cell_nbank_autofin_allnum: 0,
          als_m12_cell_nbank_sloan_allnum: 0,
          als_m12_cell_nbank_cons_allnum: 0,
          als_m12_cell_nbank_finlea_allnum: 0,
          als_m12_cell_nbank_orgnum: 0,
          als_m12_cell_nbank_p2p_orgnum: 0,
          als_m12_cell_nbank_mc_orgnum: 0,
          als_m12_cell_nbank_ca_orgnum: 0,
          als_m12_cell_nbank_cf_orgnum: 0,
          als_m12_cell_nbank_com_orgnum: 0,
          als_m12_cell_nbank_oth_orgnum: 0,
          als_m12_cell_nbank_nsloan_orgnum: 0,
          als_m12_cell_nbank_autofin_orgnum: 0,
          als_m12_cell_nbank_sloan_orgnum: 0,
          als_m12_cell_nbank_cons_orgnum: 0,
          als_m12_cell_nbank_finlea_orgnum: 0,
          als_m12_cell_nbank_avg_monnum: 0,
          als_m12_cell_nbank_night_allnum: 0,
          als_m12_cell_nbank_night_orgnum: 0,

          als_d15_id_nbank_else_allnum: 0,
          als_d15_id_nbank_else_orgnum: 0,
          als_d15_cell_nbank_else_allnum: 0,
          als_d15_cell_nbank_else_orgnum: 0,
          als_m1_id_nbank_else_allnum: 0,
          als_m1_id_nbank_else_orgnum: 0,
          als_m1_cell_nbank_else_allnum: 0,
          als_m1_cell_nbank_else_orgnum: 0,
          als_m3_id_max_monnum: 0,
          als_m3_id_bank_max_monnum: 0,
          als_m3_id_nbank_else_allnum: 0,
          als_m3_id_nbank_else_orgnum: 0,
          als_m3_id_nbank_tot_mons: 0,
          als_m3_id_nbank_max_monnum: 0,
          als_m3_id_nbank_min_monnum: 0,
          als_m3_id_nbank_max_inteday: 0,
          als_m3_id_nbank_min_inteday: 0,
          als_m3_cell_max_monnum: 0,
          als_m3_cell_bank_max_monnum: 0,
          als_m3_cell_nbank_else_allnum: 0,
          als_m3_cell_nbank_else_orgnum: 0,
          als_m3_cell_nbank_tot_mons: 0,
          als_m3_cell_nbank_max_monnum: 0,
          als_m3_cell_nbank_min_monnum: 0,
          als_m3_cell_nbank_max_inteday: 0,
          als_m3_cell_nbank_min_inteday: 0,
          als_m6_id_max_monnum: 0,
          als_m6_id_bank_max_monnum: 0,
          als_m6_id_nbank_else_allnum: 0,
          als_m6_id_nbank_else_orgnum: 0,
          als_m6_id_nbank_max_monnum: 0,
          als_m6_cell_max_monnum: 0,
          als_m6_cell_bank_max_monnum: 0,
          als_m6_cell_nbank_else_allnum: 0,
          als_m6_cell_nbank_else_orgnum: 0,
          als_m6_cell_nbank_max_monnum: 0,          
        }
        //数据删选显示
        brApplyLoanData = dataToData(brApplyLoanData, data.brApplyLoan);

        getBlackTable(brApplyLoanData, 4);
      }    

      //阿福风险评估
      if (data.afRiskEvaluation && data.afRiskEvaluation.show) {
        getBlackTable(data.afRiskEvaluation, 5);
      }

      //邦盛风险名单
      if (data.bsRiskList && data.bsRiskList.show) {
        getBlackTable(data.bsRiskList, 6);
      }
      
      //邦盛逾期详情
      if (data.bsOverdueDetail && data.bsOverdueDetail.show) {
        
        var bsOverdueDetailData = {
          show: true,
          platformNum: '',
          counts: '',
          loanMoney: '',
          overdueMoney: '',
          overdueTime: '',
          overdueDay: '',
          settlement: '',
        }
        //数据删选显示
        bsOverdueDetailData = dataToData(bsOverdueDetailData, data.bsOverdueDetail);        

        getBlackTable(bsOverdueDetailData, 7);
      }
      
      //邦盛贷款申请详情
      if (data.bsRequestDetail && data.bsRequestDetail.show) {
        getBlackTable(data.bsRequestDetail, 8);
      }
      
      //邦盛贷款放款详情
      if (data.bsLendDetail && data.bsLendDetail.show) {
        getBlackTable(data.bsLendDetail, 9);
      }

      //内部黑名单
      if (data.insideBlacklistDetail && data.insideBlacklistDetail.show) {
        getBlackTable(data.insideBlacklistDetail, 10);
      }
      
      //百融手机在网时长
      if (data.brTelPeriod && data.brTelPeriod.show) {
        getBlackTable(data.brTelPeriod, 11);
      }

      //生成所有黑名单列表数据
      $('.blacklistPart').eq(index).append(blackPartAddArr[0]);
    }		
		
    for (var i = 0; i < resHtmlArr.length; i++) {
      changeTitleAndId(i)
			//改变demo报告名和添加描点-让菜单可以定位到描点
			changeBlacklist(i)
    }
  }
 
  //贷款相关人报告信息全部获取完成后的操作方法(解决ajax异步方法)
  function toShowReportHtml() {
    //每个人的数据都调好的时候，去遍历dom
    if (requestOkNumber === reportArrInfo.length) {
				var resHtml = '';

        //去掉数组中的undefined
        function clearArrUndefined(dataClearArrUndefined) {
          var data = [];
          for (var k = 0; k < dataClearArrUndefined.length; k++) {
            if (dataClearArrUndefined[k] !== undefined) {
              data.push(dataClearArrUndefined[k]);
            }
          }
          return data;
        }
        resHtmlArr = clearArrUndefined(resHtmlArr);
        for (var i = 0; i < resHtmlArr.length; i++) {
          resHtml = resHtml + resHtmlArr[i].html;
        }
        
        //最终黑名单每个人的报告demo-第一份报告demo
        $('#riskListDetailsPage').append(resHtml);

        //贷款相关人生成的报告的html最终修改
        getHtml();        
    }
  }
  //获取单人report的html
  function getOneReport(memberType, data) {
    var index = memberTypeNumberFilter(memberType);
    resHtmlArr[index] = {
      type: memberType,
      data: data,
      html: reportDemoHtml
    }
    requestOkNumber = requestOkNumber + 1;
    toShowReportHtml();
  }
  //加载所有数据和点击事件
  function getHtml() {
    //第一份报告
    //生成每个人数据html
    getFinalReport();

    //适配去除加载状态
    toShowLoading(0);

    //滚动到相应人
    if(relationship !== '') {
      scrollDomToPlace3(relationship);
    }

  }
  //获取征信报告
  function getCloudMirrorReport() {
    //开始显示页面加载滚动条
    toShowLoading(1);

    //获取第一份报告
    yjAjax({
      type: "post",
      url: '/report/v1/collect',
      data: {
        token: token,
        bizType: bizType,
        orderNo: orderNo,
        appId: appId,
      },
      success: function (res) {
        if (res.status !== '00000') {
          jumpErrorH5(res.msg);
          toShowLoading(0);
          return
        }
        if (!res.detail) {
          jumpErrorH5(res.msg);
          return
        }

        conclusionData.typeConclusion1 = res.detail.conclusion;
        conclusionData.result = res.detail.result;
        conclusionData.decisionDate = res.detail.decisionDate || '';

        if (res.detail.risks !== null) {
          personsRisks = res.detail.risks;
        }

        //获取贷款相关人贷款信息和右边固定导航条列表
        yjAjax({
          type: "post",
          url: '/report/v1/persons',
          data: {
            token: token,
            bizType: bizType,
            orderNo: orderNo,
            appId: appId,
          },
          success: function (res2) {
            if (res2.status !== '00000') {
              jumpErrorH5(res2.msg);
              toShowLoading(0);
              return
            }
            if (!res2.members || !res2.members.length) {
              jumpErrorH5(res2.msg);
              toShowLoading(0);
              return
            }

            //保存相关贷款人信息
            reportArrInfo = res2.members;

            //获取单个人report信息
            function getOnePersonReport(memberType) {
              //获取相关报告人具体报告信息接口
              yjAjax({
                type: "post",
                url: '/report/v1/memberDetail',
                data: {
                  token: token,
                  bizType: bizType,
                  orderNo: orderNo,
                  memberType: memberType,
                  appId: appId,
                },
                success: function (res3) {
                  getOneReport(memberType, res3.detail);
                }
              });
            }

            for (var i = 0; i < reportArrInfo.length; i++) {
              getOnePersonReport(reportArrInfo[i].type);
            }
          }
        });
      }
    });  
  }
  //跟页面逻辑相关end

  //页面dom绑定事件start
  //定时1.5秒,页面跳到指定人在绑定滚动事件
  setTimeout(function(){
    var dataReportArrInfo = reportArrInfo;
    $(window).bind('scroll',function() {
      var distance = $(window).scrollTop();
      var arr = [];
  
      if(dataReportArrInfo.length === 0) {
        return;
      }
  
      if(dataReportArrInfo.length === 1) {
        $('#navTitle').text('主贷人');
      }
  
      for(var i = 0 ; i < dataReportArrInfo.length ; i++) {
        arr[i] = {
          title: loanPersonFilter(dataReportArrInfo[i].type),
          height: $('#' + dataReportArrInfo[i].type).offset().top
        };
      }
  
      for(var j = 1 ; j < arr.length ; j++) {
        if(distance < arr[j].height) {
          $('#navTitle').text(arr[j-1].title);
          return;
        }
      }
    });
  },1500);
  //页面dom绑定事件end

  //页面首次加载，执行方法(页面逻辑入口)
  autoPc();
  clearCache();
  getCloudMirrorReport();
});