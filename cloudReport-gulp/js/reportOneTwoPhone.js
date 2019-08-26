$(function () {
  //当前页全局变量
  //获取url相关参数
  var appId = getUrlParam('appId');
  var token = getUrlParam('token');
  var bizType = getUrlParam('bizType') || '';
  var orderNo = getUrlParam('orderNo') || '';
	var role = getUrlParam('role') || '';
	
  //第二份报告
  var bizType2 = getUrlParam('bizType2') || '';
  var orderNo2 = getUrlParam('orderNo2') || '';

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
	
  //第二份报告返回接口数据start
  var conclusionData2 = {
    typeConclusion1: 0,
    result: '',
    yunTuScore: '',
    decisionDate: ''
  };
  var personsRisks2 = [];  
  var reportArrInfo2 = [];
  var requestOkNumber2 = 0;
  var resHtmlArr2 = [];
  //第二份报告返回接口数据end	

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
  //综合结论左边图标展示和结论展示
  function showEndResults() {
    if (conclusionData.typeConclusion1 === 1) {
      $('#reportShowEndTip').addClass('colorGreen');
      $('#reportIsPass').attr('src', './img/reportOneTwoPhone/icon1.png');
      $('#reportShowEndTip').text(conclusionData.result);
    }

    if (conclusionData.typeConclusion1 === 0) {
      $('#reportShowEndTip').addClass('colorRed');
      $('#reportIsPass').attr('src', './img/reportOneTwoPhone/icon2.png');
      $('#reportShowEndTip').text('拒绝');
    }
    $('#reportTime').html('生成时间：' + conclusionData.decisionDate);
    
  }
  function showEndResults2() {
    if (conclusionData.typeConclusion1 === 1) {
      $('#reportShowEndTip2').addClass('colorGreen');
    }

    if (conclusionData.typeConclusion1 === 0) {
      $('#reportShowEndTip2').addClass('colorRed');
    }

    $('#reportShowEndTip2').text(conclusionData2.result);
    $('#reportScore').text(conclusionData2.yunTuScore);
    $('#reportTime2').html('生成时间：' + conclusionData2.decisionDate);
    
  }

  //贷款相关人的报告列表
  function getFinalReport() {
    //改变demo报告名和添加描点-让菜单可以定位到描点
    function changeTitleAndId(index) {
      $('#reportPersonsCredit .personInfo .baseInfo').eq(index).attr('id', resHtmlArr[index].type);
      var title = loanPersonFilter(resHtmlArr[index].type) + ': ';
      var name = reportArrInfo[index].name ? reportArrInfo[index].name : '';
      var idNo = reportArrInfo[index].idNo ? '-' + reportArrInfo[index].idNo : '';
      $('#reportPersonsCredit .personInfo .baseInfo').eq(index).text(title + name + idNo);
    }

    function showConclusionList(index) {
      var title = loanPersonFilter(resHtmlArr[index].type) + ': ';
      var title2 = loanPersonFilter(resHtmlArr[index].type);
      var name = reportArrInfo[index].name ? reportArrInfo[index].name : '';
      var idNo = reportArrInfo[index].idNo ? '-' + reportArrInfo[index].idNo : '';

      $('#reportPersonsCredit .personInfo .baseInfo').eq(index).text(title + name + idNo);
      $('#reportPersonsCredit .personInfo .listInfo').eq(index).children('.info').eq(0).children('.txt').text(name);
      $('#reportPersonsCredit .personInfo .listInfo').eq(index).children('.info').eq(1).children('.txt').text(title2);
      $('#reportPersonsCredit .personInfo .listInfo').eq(index).children('.info').eq(2).children('.txt').text(isHitFilter12(personsRisks[index].rhCreditResult));
      $('#reportPersonsCredit .personInfo .listInfo').eq(index).children('.info').eq(3).children('.txt').text(isHitFilter13(personsRisks[index].riskControlResult));
      $('#reportPersonsCredit .personInfo .listInfo').eq(index).children('.info').eq(4).addClass('dn');
           

      //获取一个人风险列表
      function getRisk(arrGetRisk,type) {
        var htmlGetRisk = '';

        if(type === 1) {
          for (var j = 0; j < arrGetRisk.length; j++) {
            htmlGetRisk = htmlGetRisk + [
              "<div class='risk clearfloat'>",
                "<div class='icon3'></div>",
                "<div class='riskTitle'>",
                  riskTypeFilter(arrGetRisk[j]),
                "</div>",
              "</div>",
            ].join("");
          }          
        }

        if(type === 2 && arrGetRisk.length > 3) {
          for (var j = 3; j < arrGetRisk.length; j++) {
            htmlGetRisk = htmlGetRisk + [
              "<div class='risk clearfloat'>",
                "<div class='icon3'></div>",
                "<div class='riskTitle'>",
                  riskTypeFilter(arrGetRisk[j]),
                "</div>",
              "</div>",
            ].join("");
          }
        }
        return htmlGetRisk;
      }

      if(personsRisks[index].notes.length === 0) {
        $('#reportPersonsCredit .personInfo .riskInfo').eq(index).addClass('dn');   
      }else{
        $('#reportPersonsCredit .personInfo .riskInfo .riskList').eq(index).html(getRisk(personsRisks[index].notes,1));
        $('#reportPersonsCredit .personInfo .riskInfo .riskList2').eq(index).html(getRisk(personsRisks[index].notes,2));
      }
    }
    
    for (var i = 0; i < resHtmlArr.length; i++) {
      //改变demo报告名和添加描点-让菜单可以定位到描点
      changeTitleAndId(i);
      showConclusionList(i);
    }
  }
  function getFinalReport2() {
    //改变demo报告名和添加描点-让菜单可以定位到描点
    function changeTitleAndId2(index) {
      //$('#reportPersonsAuto .personInfo .baseInfo').eq(index).attr('id', resHtmlArr2[index].type);
      var title = loanPersonFilter(resHtmlArr2[index].type) + ': ';
      var name = reportArrInfo2[index].name ? reportArrInfo2[index].name : '';
      var idNo = reportArrInfo2[index].idNo ? '-' + reportArrInfo2[index].idNo : '';
      $('#reportPersonsAuto .personInfo .baseInfo').eq(index).text(title + name + idNo);
    }

    function showConclusionList2(index) {
      var title = loanPersonFilter(resHtmlArr2[index].type) + ': ';
      var title2 = loanPersonFilter(resHtmlArr2[index].type);
      var name = reportArrInfo2[index].name ? reportArrInfo2[index].name : '';
      var idNo = reportArrInfo2[index].idNo ? '-' + reportArrInfo2[index].idNo : '';

      $('#reportPersonsAuto .personInfo .baseInfo').eq(index).text(title + name + idNo);
      $('#reportPersonsAuto .personInfo .listInfo').eq(index).children('.info').eq(0).children('.txt').text(name);
      $('#reportPersonsAuto .personInfo .listInfo').eq(index).children('.info').eq(1).children('.txt').text(title2);

      $('#reportPersonsAuto .personInfo .listInfo').eq(index).children('.info').eq(2).addClass('dn');
      $('#reportPersonsAuto .personInfo .listInfo').eq(index).children('.info').eq(3).addClass('dn');
      $('#reportPersonsAuto .personInfo .listInfo').eq(index).children('.info').eq(5).addClass('dn');

      $('#reportPersonsAuto .personInfo .riskInfo').eq(index).addClass('dn'); 
         
      if(role === '1') {
        $('#reportPersonsAuto .personInfo .listInfo').eq(index).children('.info').eq(4).children('.jump').children('.jumpTitle').addClass('jumpTitleNo');
        $('#reportPersonsAuto .personInfo .listInfo').eq(index).children('.info').eq(4).children('.jump').children('.icon4').addClass('icon5');
      }
    }    
    
    // for (var i = 0; i < resHtmlArr2.length; i++) {
    for (var i = 0; i < 1; i++) {
      //改变demo报告名和添加描点-让菜单可以定位到描点
      changeTitleAndId2(i);
      showConclusionList2(i);
    }
  }  
  //贷款相关人报告信息全部获取完成后的操作方法(解决ajax异步方法)
  function toShowReportHtml() {
    //每个人的数据都调好的时候，去遍历dom
    if (requestOkNumber === reportArrInfo.length) {

      //第二份报告只显示主贷人
      //if((requestOkNumber2 === reportArrInfo2.length))
      if((requestOkNumber2 === 1)) {
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
        $('#reportPersonsCredit').append(resHtml);
        //第二份报告demo
        $('#reportPersonsAuto').append(resHtmlArr2[0].html);

        //贷款相关人生成的报告的html最终修改
        getHtml();        
      }
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
  function getOneReport2(memberType, data) {
    var index = memberTypeNumberFilter(memberType);
    resHtmlArr2[index] = {
      type: memberType,
      data: data,
      html: reportDemoHtml
    }
    requestOkNumber2 = requestOkNumber2 + 1;
    toShowReportHtml();
  }  
  //加载所有数据和点击事件
  function getHtml() {
    //第一份报告
    showEndResults();

    //生成每个人数据html
    getFinalReport();

    //第二份报告展示
    showEndResults2();
    getFinalReport2();

    //适配去除加载状态
    toShowLoading(0);

    //展示两份报告
    $('#reportOneTwoPhone').removeClass('dn');

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

    //获取第二份报告
    yjAjax({
      type: "post",
      url: '/report/v1/collect',
      data: {
        token: token,
        bizType: bizType2,
        orderNo: orderNo2,
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

        conclusionData2.typeConclusion1 = res.detail.conclusion;
        conclusionData2.result = res.detail.result;
        conclusionData2.yunTuScore = res.detail.yunTuScore || 0;
        conclusionData2.decisionDate = res.detail.decisionDate || '';

        if (res.detail.risks !== null) {
          personsRisks2 = res.detail.risks;
        }

        //获取贷款相关人贷款信息和右边固定导航条列表
        yjAjax({
          type: "post",
          url: '/report/v1/persons',
          data: {
            token: token,
            bizType: bizType2,
            orderNo: orderNo2,
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
            reportArrInfo2 = res2.members;

            //获取单个人report信息
            function getOnePersonReport2(memberType) {
              //获取相关报告人具体报告信息接口
              yjAjax({
                type: "post",
                url: '/report/v1/memberDetail',
                data: {
                  token: token,
                  bizType: bizType2,
                  orderNo: orderNo2,
                  memberType: memberType,
                  appId: appId,
                },
                success: function (res3) {
                  getOneReport2(memberType, res3.detail);
                }
              });
            }

            //for (var i = 0; i < reportArrInfo2.length; i++) {
            for (var i = 0; i < 1; i++) {
              getOnePersonReport2(reportArrInfo2[i].type);
            }
          }
        });
      }
    });  
  }
  //跟页面逻辑相关end

  //页面dom绑定事件start
  $(document).on("click", "#reportPersonsAuto .jumpPage1", function(){
    if(role === '1') {
      return
    }

		var origin = window.location.origin;
    var search = window.location.search; 
    
    window.location.href = origin + '/creditScoreDetailsPhone.html' + search;
  }); 
  $(document).on("click", "#reportPersonsCredit .jumpPage2", function(){
		var origin = window.location.origin;
    var search = window.location.search; 
    var index = $('#reportPersonsCredit .jumpPage2').index($(this));
    var relationship =  '&relationship=' + $('#reportPersonsCredit .personInfo .baseInfo').eq(index).attr('id');
    window.location.href = origin + '/riskListDetailsPhone.html' + search + relationship;
  });  
  //页面dom绑定事件end

  //页面首次加载，执行方法(页面逻辑入口)
  autoPc();
  clearCache();
  getCloudMirrorReport();
});