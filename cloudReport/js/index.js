$(function () {
  //当前页全局变量
  //获取url相关参数
  var appId = getUrlParam('appId');
  var token = getUrlParam('token');
  var bizType = getUrlParam('bizType') || '';
  var orderNo = getUrlParam('orderNo') || '';
  var role = getUrlParam('role') || '';
  //单人报告demo的html
  var reportDemoHtml = $('#demo').html();

  //接口返回数据相关start
  //综合结论通过不通过
  var conclusionData = {
    typeConclusion1: 0,
    result: ''
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
	function autoPhone() {
    var isPhone = /Android|Windows Phone|iPhone|iPod/i.test(navigator.userAgent);
		var origin = window.location.origin;
		var search = window.location.search;
		var url = origin + '/indexPhone.html' + search;

		if (isPhone){
      window.location.href = url;
		}
	}

  //获取对象属性个数
  //显示或隐藏页面加载状态
  function toShowLoading(type) {
    //显示页面加载状态图标
    if (type === 1) {
      $('#loadMask').removeClass('dn');
      $('#load').removeClass('dn');
      $('.cloudMirrorReport').addClass('transparent');
    }
    //隐藏页面加载状态图标
    if (type === 0) {
      $('#loadMask').addClass('dn');
      $('#load').addClass('dn');
      $('.cloudMirrorReport').removeClass('transparent');
      if ($('#menuFixed .nav li').length > 1) {
        $('#menuIcon').removeClass('dn');
      }
    }
  }
  //综合结论定位图居中定位
  function centerResults() {
    var length = $('.conclusionContent .results').length;
    for (var i = 0; i < length; i++) {
      var height = $('.conclusionContent .results').eq(i).parent('.conclusionContent').height();
      var marginTop = ((height - 124) / 2) + 'px';
      $('.conclusionContent .results').eq(i).css('margin-top', marginTop);
    }
  }
  //综合结论-个人征信图标自适应
  function creditIconAuto() {
    var length = $('#personInfoList .person').length;
    for (var i = 0; i < length; i++) {
      var width = $('#personInfoList .person').eq(i).children('.name').width();
      var needLeft = (width + 10) + 'px';
      $('#personInfoList .person').eq(i).children('.icon').css('left', needLeft);
    }
  }
  //黑名单表格自适应
  function blackTableAuto() {
    var autoMargin = ($('.blacklist').eq(0).width() - $('.blacklist .blacklistPart').eq(0).width() * 3) / 2;
    $('.blacklist .blacklistPart2').css('margin-left', autoMargin + 'px');
  }
  //查无此结果显示
  function noResults(msg) {
    $('#hasReport').addClass('dn');
    $('#noReport').removeClass('dn');
    $('#noReport').text(msg);
  }
  //静态页面默认无报告，显示报告
  function hasResults() {
    //显示有报告
    $('#noReport').addClass('dn');
    $('#hasReport').removeClass('dn');
  }
  //综合结论-有风险项
  function hasRisks() {
    $('#noRisk').addClass('dn');
    $('#personInfoList').removeClass('dn');
  }

  //方法定义end

  //跟页面逻辑相关start
  //综合结论左边图标展示和结论展示
  function showEndResults(conclusion, result) {
    //一次综合决策
    function onlyOneResults(conclusion) {
      if (conclusion === 1) {
        $('#resultsTip').text(result);
        $('#results').addClass('resultsColor');
        $('#resultsImg').attr('src', './img/index/1.png');
        return;
      }

      if (conclusion === 0) {
        $('#results').addClass('resultsColor3');
        $('#resultsImg').attr('src', './img/index/3.png');
        $('#resultsTip').text('拒绝');
        return;
      }
    }
    onlyOneResults(conclusion);
  }
  ///综合结论右边列表展示
  function showRiskResults(risks) {
    //获取风险列表
    function showRiskList(arr) {
      //获取一个人风险列表
      function getRisk(arr) {
        var html = '';

        if(role === '1') {
          return html;    
        }        

        // if (arr.length === 0) {
        //   html = html + [
        //     "<div class='warn'>",
        //     "<div class='icoWarn2'></div>",
        //     "无风险项",
        //     "</div>",
        //   ].join("");
        // } else {
          for (var i = 0; i < arr.length; i++) {
            html = html + [
              "<div class='warn'>",
              "<div class='icoWarn'></div>",
              riskTypeFilter(arr[i]),
              "</div>",
            ].join("");
          }
        // }
        return html;
      }
      var html = '';
      var icoType = '';
      var icoTxt = '';
      var warnClass = '';
      var warnClass2 = '';
      for (var i = 0; i < arr.length; i++) {
        icoType = loanPersonIconFilter(arr[i].conclusion);
        icoTxt = loanPersonIconTxtFilter(arr[i].conclusion);
        warnClass = loanPersonIconFilter2(arr[i].rhCreditResult);
        warnClass2 = loanPersonIconFilter3(arr[i].riskControlResult);
        html = html + [
          "<li>",
          "<div class='person'>",
          "<div class='icon " + icoType + "'>",
          "<div class='popup dn'>",
          "<p>" + icoTxt + "</p>",
          "</div>",
          "</div>",
          "<div class='name'>" + arr[i].name + "</div>",
          "</div>",
          "<div class='person2'>",
          loanPersonFilter(arr[i].memberType),
          "</div>",
          "<div class='warn'>",
            "<div class='"+ warnClass + "'></div>",
            "人行征信：",
            "<span>" + isHitFilter12(arr[i].rhCreditResult) + "</span>",
          "</div>",
          "<div class='warn'>",
            "<div class='"+ warnClass2 + "'></div>",
            "大数据征信：",
            "<span>" + isHitFilter13(arr[i].riskControlResult) + "</span>",
          "</div>",                            
          getRisk(arr[i].notes),
          "</li>",
        ].join("");
      }
      $("#personInfoList").html(html);

      //风险列表-征信图标小提示
      $('#personInfoList .icon').unbind('mouseenter').bind('mouseenter', function () {
        if (!$(this).hasClass('icoPerson') && !$(this).hasClass('icoPerson2') && !$(this).hasClass('icoPerson3')) {
          return
        }

        $(this).children('.popup').removeClass('dn');
      });
      $('#personInfoList .icon').unbind('mouseleave').bind('mouseleave', function () {
        if (!$(this).hasClass('icoPerson') && !$(this).hasClass('icoPerson2') && !$(this).hasClass('icoPerson3')) {
          return
        }

        $(this).children('.popup').addClass('dn');
      });
    }
    if (risks.length === 0) {
      return;
    }
    hasRisks();
    showRiskList(risks);
    creditIconAuto();
  }
  //获取右边固定导航条列表
  function getMenuList(arr) {
    if (arr.length === 1) {
      $('#menuFixed').addClass('dn');
      return
    }
    var html = '';
    var isActive = '';
    for (var i = 0; i < arr.length; i++) {
      isActive = i === 0 ? 'active' : '';
      html = html + [
        "<li class='" + isActive + "' data-type='" + arr[i].type + "'>",
        loanPersonFilter(arr[i].type),
        "</li> "
      ].join("");
    }
    $("#menuFixed .nav").eq(0).append(html);
    //右边固定导航条点击选中事件
    $('#menuFixed .nav li').bind('click', function () {
      $('#menuFixed .nav li').removeClass('active');
      $(this).addClass('active');
      var id = $(this).attr('data-type');
      scrollDomToPlace(id);
    });
    //右边菜单按钮-鼠标移入事件
    $('#menuIcon').bind('mouseenter', function () {
      $(this).addClass('dn');
      $('#menuFixed').animate({
        opacity: '1',
        filter: 'Alpha(opacity=100)'
      }, 100);
    });
    //右边菜单按钮-鼠标移出事件
    $('#menuFixed').bind('mouseleave', function () {
      $(this).animate({
        opacity: '0',
        filter: 'Alpha(opacity=0)'
      });
      $('#menuIcon').removeClass('dn');
    });
  }
  //贷款相关人的报告列表
  function getFinalReport() {
    //改变demo报告名和添加描点-让菜单可以定位到描点
    function changeTitleAndId(index) {
      $('#reportList .report').eq(index).attr('id', resHtmlArr[index].type);
      var title = loanPersonFilter(resHtmlArr[index].type);
      var name = reportArrInfo[index].name ? '-' + reportArrInfo[index].name : '';
      var idNo = reportArrInfo[index].idNo ? '(' + reportArrInfo[index].idNo + ')' : '';
      $('#reportList .report').eq(index).children('.title').eq(0).children('span').eq(0).text(title + name + idNo);
    }
    //改变demo报告黑名单三列列表数据
    function changeBlacklist(index) {
      //当前黑名单表格个数
      var num = 0;
      //当前黑名单表格加在哪一列
      var blackPartAddIndex = 0;
      //当前黑名单三列表每列要加的html
      var blackPartAddArr = ['', '', ''];
      //当前个人报告对象
      var data = resHtmlArr[index].data;
      //遍历黑名单表格方法
      function getBlackTable(num, blackData, code) {
        //判断当前对象属性值是不是全部为null(除show属性)
        function judgeDataAllNull(obj, code) {
          var isTrue = true;
          var length = attributeCount(obj) - 1;
          var num = 0;
          for (var name in obj) {
            if (name !== 'show') {

              if (blacklistFilter2(code, name, obj[name]) === '') {
                num = num + 1;
              }              

              if (blacklistFilter2(code, name, obj[name]) === '未命中') {
                num = num + 1;
              }

              if (blacklistFilter2(code, name, obj[name]) === '0') {
                num = num + 1;
              }

              if (blacklistFilter2(code, name, obj[name]) === 0) {
                num = num + 1;
              }
            }
          }
          if (num !== length) {
            isTrue = false;
          }
          return isTrue;
        }
        //当前黑名单的html
        var html = '';
        //获取对象属性个数
        var count = judgeDataAllNull(blackData, code);
        //是否有black2样式
        var black2 = num > 3 ? 'black2' : '';
        //如果只有一个属性，返回无结果  或者属性都是未命中
        if (count) {
          html = html + [
            "<div class='black " + black2 + "'>",
            "<div class='headline2'>" + blacklistTitleFilter(code) + "</div>",
            "<div class='noblack'>查无结果</div>",
            "</div>",
          ].join("");
          blackPartAddArr[blackPartAddIndex] = blackPartAddArr[blackPartAddIndex] + html;
        } else {
          //黑名单table的td遍历
          function getBlackTd(blackData2) {
            var html = '';
            for (var name in blackData2) {
              var value = blackData2[name];
              //人行征信做特殊处理
              var td3 = code === 0 ? 'td3' : '';
              var td4 = code === 0 ? 'td4' : '';              
              if (name !== 'show') {
                if ((blacklistFilter2(code, name, value) !== '') && (blacklistFilter2(code, name, value) !== '0') && (blacklistFilter2(code, name, value) !== 0) && (blacklistFilter2(code, name, value) !== '未命中')) {
                  html = html + [
                    "<tr>",
                    "<td class='td1 " + td3 + "'><p>" + blacklistFilter(code, name) + "</p></td>",
                    "<td class='td2 " + td4 + "'><p>" + blacklistFilter2(code, name, value) + "</p></td>",
                    "</tr>"
                  ].join("");
                }
              }
            }
            return html;
          }
          html = html + [
            "<div class='black " + black2 + "'>",
            "<div class='headline'>" + blacklistTitleFilter(code) + "</div>",
            "<table>",
            "<tbody>",
            getBlackTd(blackData),
            "</tbody>",
            "</table>",
            "</div>",
          ].join("");
          blackPartAddArr[blackPartAddIndex] = blackPartAddArr[blackPartAddIndex] + html;
        }
      }

      //人行征信信息
      if (data.personalCredit && data.personalCredit.show) {
        num = num + 1;
        blackPartAddIndex = num % 3 === 0 ? 2 :
          num % 3 === 1 ? 0 :
            1;
 
        var personalCreditData = {
          show: true,
          creditResult: '',
          creditNote: '',                    
        }
        //数据删选显示
        personalCreditData = dataToData2(personalCreditData, data.personalCredit);

        getBlackTable(num, personalCreditData, 0);
      }

      if(role === '1') {
        $('.blacklistPart').eq(0 + index * 3).append(blackPartAddArr[0]);
        $('.blacklistPart').eq(1 + index * 3).append(blackPartAddArr[1]);
        $('.blacklistPart').eq(2 + index * 3).append(blackPartAddArr[2]);
        return;     
      }      

      //百融特殊名单
      if (data.brSpecialList && data.brSpecialList.show) {
        num = num + 1;
        blackPartAddIndex = num % 3 === 0 ? 2 :
          num % 3 === 1 ? 0 :
            1;
        getBlackTable(num, data.brSpecialList, 1);
      }

      //百融自然人
      if (data.brBadInfo && data.brBadInfo.show) {
        num = num + 1;
        blackPartAddIndex = num % 3 === 0 ? 2 :
          num % 3 === 1 ? 0 :
            1;
        getBlackTable(num, data.brBadInfo, 2);
      }

      //百融法院执行人
      if (data.brExecut && data.brExecut.show) {
        num = num + 1;
        blackPartAddIndex = num % 3 === 0 ? 2 :
          num % 3 === 1 ? 0 :
            1;
        getBlackTable(num, data.brExecut, 3);
      }

      //百融多头借贷
      if (data.brApplyLoan && data.brApplyLoan.show) {
        num = num + 1;
        blackPartAddIndex = num % 3 === 0 ? 2 :
          num % 3 === 1 ? 0 :
            1;

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
          als_d7_id_nbank_oth_allnum: 0,
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
          als_d7_id_nbank_oth_orgnum: 0,
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
          als_d7_cell_nbank_oth_allnum: 0,
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
          als_d7_cell_nbank_oth_orgnum: 0,
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
          als_d15_id_nbank_oth_allnum: 0,
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
          als_d15_id_nbank_oth_orgnum: 0,
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
          als_d15_cell_nbank_oth_allnum: 0,
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
          als_d15_cell_nbank_oth_orgnum: 0,
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
          als_m1_id_nbank_oth_allnum: 0,
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
          als_m1_id_nbank_oth_orgnum: 0,
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
          als_m1_cell_nbank_oth_allnum: 0,
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
          als_m1_cell_nbank_oth_orgnum: 0,
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
          als_m3_id_nbank_oth_allnum: 0,
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
          als_m3_id_nbank_oth_orgnum: 0,
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
          als_m3_cell_nbank_oth_allnum: 0,
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
          als_m3_cell_nbank_oth_orgnum: 0,
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
          als_m6_id_nbank_oth_allnum: 0,
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
          als_m6_id_nbank_oth_orgnum: 0,
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
          als_m6_cell_nbank_oth_allnum: 0,
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
          als_m6_cell_nbank_oth_orgnum: 0,
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
          als_m12_id_nbank_oth_allnum: 0,
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
          als_m12_id_nbank_oth_orgnum: 0,
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
          als_m12_cell_nbank_oth_allnum: 0,
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
          als_m12_cell_nbank_oth_orgnum: 0,
          als_m12_cell_nbank_avg_monnum: 0,
          als_m12_cell_nbank_night_allnum: 0,
          als_m12_cell_nbank_night_orgnum: 0,
        }
        //数据删选显示
        brApplyLoanData = dataToData(brApplyLoanData, data.brApplyLoan);

        getBlackTable(num, brApplyLoanData, 4);
      }

      //阿福风险评估
      if (data.afRiskEvaluation && data.afRiskEvaluation.show) {
        num = num + 1;
        blackPartAddIndex = num % 3 === 0 ? 2 :
          num % 3 === 1 ? 0 :
          1;
        getBlackTable(num, data.afRiskEvaluation, 5);
      }

      //邦盛风险名单
      if (data.bsRiskList && data.bsRiskList.show) {
        num = num + 1;
        blackPartAddIndex = num % 3 === 0 ? 2 :
          num % 3 === 1 ? 0 :
          1;
        getBlackTable(num, data.bsRiskList, 6);
      }
      
      //邦盛逾期详情
      if (data.bsOverdueDetail && data.bsOverdueDetail.show) {
        num = num + 1;
        blackPartAddIndex = num % 3 === 0 ? 2 :
          num % 3 === 1 ? 0 :
          1;
        
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

        getBlackTable(num, bsOverdueDetailData, 7);
      }
      
      //邦盛贷款申请详情
      if (data.bsRequestDetail && data.bsRequestDetail.show) {
        num = num + 1;
        blackPartAddIndex = num % 3 === 0 ? 2 :
          num % 3 === 1 ? 0 :
          1;
        getBlackTable(num, data.bsRequestDetail, 8);
      }
      
      //邦盛贷款放款详情
      if (data.bsLendDetail && data.bsLendDetail.show) {
        num = num + 1;
        blackPartAddIndex = num % 3 === 0 ? 2 :
          num % 3 === 1 ? 0 :
          1;
        getBlackTable(num, data.bsLendDetail, 9);
      }

      //内部黑名单
      if (data.insideBlacklistDetail && data.insideBlacklistDetail.show) {
        num = num + 1;
        blackPartAddIndex = num % 3 === 0 ? 2 :
          num % 3 === 1 ? 0 :
          1;
        getBlackTable(num, data.insideBlacklistDetail, 10);
      }
      
      //百融手机在网时长
      if (data.brTelPeriod && data.brTelPeriod.show) {
        num = num + 1;
        blackPartAddIndex = num % 3 === 0 ? 2 :
          num % 3 === 1 ? 0 :
          1;
        getBlackTable(num, data.brTelPeriod, 11);
      }

      //生成所有黑名单列表数据
      $('.blacklistPart').eq(0 + index * 3).append(blackPartAddArr[0]);
      $('.blacklistPart').eq(1 + index * 3).append(blackPartAddArr[1]);
      $('.blacklistPart').eq(2 + index * 3).append(blackPartAddArr[2]);
    };
    for (var i = 0; i < resHtmlArr.length; i++) {
      //改变demo报告名和添加描点-让菜单可以定位到描点
      changeTitleAndId(i);
      //改变demo报告黑名单三列列表数据
      changeBlacklist(i);
    }
  }
  //贷款相关人报告信息全部获取完成后的操作方法(解决ajax异步方法)
  function toShowReportHtml() {
    //每个人的数据都调好的时候，去遍历dom
    if (requestOkNumber === reportArrInfo.length) {
      var resHtml = '';

      //去掉数组中的undefined
      function clearArrUndefined(resHtmlArr) {
        var data = [];
        for (var i = 0; i < resHtmlArr.length; i++) {
          if (resHtmlArr[i] !== undefined) {
            data.push(resHtmlArr[i]);
          }
        }
        return data;
      }
      resHtmlArr = clearArrUndefined(resHtmlArr);
      for (var i = 0; i < resHtmlArr.length; i++) {
        resHtml = resHtml + resHtmlArr[i].html;
      }
      //最终黑名单每个人的报告demo
      $('#reportList').append(resHtml);
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
    //综合结论相关
    showEndResults(conclusionData.typeConclusion1, conclusionData.result);
    showRiskResults(personsRisks);

    //生成右边固定导航条
    getMenuList(reportArrInfo);

    //生成每个人数据html
    getFinalReport(resHtmlArr);

    //适配去除加载状态
    centerResults();
    blackTableAuto();
    toShowLoading(0);
  }
  //获取征信报告
  function getCloudMirrorReport() {
    //显示有报告
    hasResults();
    //开始显示页面加载滚动条
    toShowLoading(1);

    //获取综合结论信息
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
          noResults(res.msg);
          toShowLoading(0);
          return
        }
        if (!res.detail) {
          noResults(res.msg);
          return
        }

        conclusionData.typeConclusion1 = res.detail.typeConclusion1;
        conclusionData.result = res.detail.result;

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
              noResults(res2.msg);
              toShowLoading(0);
              return
            }
            if (!res2.members || !res2.members.length) {
              noResults(res2.msg);
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
                success: function (res) {
                  getOneReport(memberType, res.detail);
                }
              });
            }

            for (var i = 0; i < res2.members.length; i++) {
              getOnePersonReport(res2.members[i].type);
            }
          }
        });
      }
    });
  }
  //跟页面逻辑相关end

  //jquery监听事件start
  //页面宽度变化监听事件
  $(window).bind('resize', function () {
    blackTableAuto();
  });
  //jquery监听事件end 

  //页面首次加载，执行方法(页面逻辑入口)
  autoPhone();
  clearCache();
  getCloudMirrorReport();
});