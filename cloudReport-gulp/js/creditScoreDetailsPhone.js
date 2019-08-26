$(function () {
  //当前页全局变量
  //获取url相关参数
  var appId = getUrlParam('appId');
  var token = getUrlParam('token');
	
  //第二份报告
  var bizType2 = getUrlParam('bizType2') || '';
  var orderNo2 = getUrlParam('orderNo2') || '';

  //单人报告demo的html
  var reportDemoHtml = '';
  
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

  function getFinalReport2() {  

    //改变demo报告信用评分和欺诈评分内容
    function changeCreditInfo(index) {
      //当前个人报告对象
      var data = resHtmlArr2[index].data;
      //控制信用评分和欺诈与风险显示数组
      var isHaveArr = [true, true, true];
      
      if (data.brCreditScoreDetail && data.brCreditScoreDetail.show) {
        var scoreListAdd = 0 + index * 3;
        var dom1 = $('.scoreBox .scoreColor').eq(scoreListAdd);
        var dom2 = $('.scoreBox .grade').eq(scoreListAdd);
        var scoreTxt = data.brCreditScoreDetail.creditScore;

        if (data.brCreditScoreDetail.level === '1') {
          dom1.addClass('scoreColor3');
          dom2.text(scoreTxt);
          $('.scoreBox .gradeLevel').eq(scoreListAdd).text('信用较差');
        } else if (data.brCreditScoreDetail.level === '2') {
          dom1.addClass('scoreColor2');
          dom2.text(scoreTxt);
          $('.scoreBox .gradeLevel').eq(scoreListAdd).text('信用良好');
        } else if (data.brCreditScoreDetail.level === '3') {
          dom1.addClass('scoreColor1');
          dom2.text(scoreTxt);
          $('.scoreBox .gradeLevel').eq(scoreListAdd).text('信用极佳');
        } else {
          isHaveArr[0] = false;
        }
      } else {
        isHaveArr[0] = false;
      }

      if (data.pinganCreditScoreDetail && data.pinganCreditScoreDetail.show) {
        var scoreListAdd2 = 1 + index * 3;
        var dom3 = $('.scoreBox .scoreColor').eq(scoreListAdd2);
        var dom4 = $('.scoreBox .grade').eq(scoreListAdd2);
        var scoreTxt2 = data.pinganCreditScoreDetail.creditScore;

        if (data.pinganCreditScoreDetail.level === '1') {
          dom3.addClass('scoreColor3');
          dom4.text(scoreTxt2);
          $('.scoreBox .gradeLevel').eq(scoreListAdd2).text('信用较差');
        } else if (data.pinganCreditScoreDetail.level === '2') {
          dom3.addClass('scoreColor2');
          dom4.text(scoreTxt2);
          $('.scoreBox .gradeLevel').eq(scoreListAdd2).text('信用良好');
        } else if (data.pinganCreditScoreDetail.level === '3') {
          dom3.addClass('scoreColor1');
          dom4.text(scoreTxt2);
          $('.scoreBox .gradeLevel').eq(scoreListAdd2).text('信用极佳');
        } else {
          isHaveArr[1] = false;
        }
      } else {
        isHaveArr[1] = false;
      }    
      
      if (data.brCheatScoreDetail && data.brCheatScoreDetail.show) {
        var scoreListAdd3 = 2 + index * 3;
        var dom5 = $('.scoreBox .scoreColor').eq(scoreListAdd3);
        var dom6 = $('.scoreBox .grade').eq(scoreListAdd3);
        var scoreTxt3 = data.brCheatScoreDetail.cheatScore;

        if (data.brCheatScoreDetail.level === '1') {
          dom5.addClass('scoreColor1');
          dom6.text(scoreTxt3);
          $('.scoreBox .gradeLevel').eq(scoreListAdd3).text('无风险');
        } else if (data.brCheatScoreDetail.level === '2') {
          dom5.addClass('scoreColor3');
          dom6.text(scoreTxt3);
          $('.scoreBox .gradeLevel').eq(scoreListAdd3).text('欺诈风险');
        } else {
          isHaveArr[2] = false;
        }
      } else {
        isHaveArr[2] = false;
      }
      
      //信用分和欺诈分模块高度和样式自适应修改
      function anutoChangeScore(isHaveArr,index) {
        if(!isHaveArr[0] && !isHaveArr[1]) {
          $('#creditBox').eq(0).addClass('dn');
        }

        if(!isHaveArr[2]) {
          $('#creditBox').eq(1).addClass('dn');
        }        

        for(var k = 0 ; k < isHaveArr.length ; k++ ) {
          if(isHaveArr[k] === false) {
            $('.scoreBox').eq(k+index*2).addClass('dn');
          }
        }        
      }

      anutoChangeScore(isHaveArr,index);
    }      
    
    // for (var i = 0; i < resHtmlArr2.length; i++) {
    for (var i = 0; i < 1; i++) {
      //改变demo报告名和添加描点-让菜单可以定位到描点
      changeCreditInfo(i);
    }
  }  
  //贷款相关人报告信息全部获取完成后的操作方法(解决ajax异步方法)
  function toShowReportHtml() {
    //第二份报告只显示主贷人
    //if((requestOkNumber2 === reportArrInfo2.length))
    if((requestOkNumber2 === 1)) {

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
      resHtmlArr2 = clearArrUndefined(resHtmlArr2);

      //贷款相关人生成的报告的html最终修改
      getHtml();        
    }
  }
  //获取单人report的html
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
    getFinalReport2();

    //适配去除加载状态
    toShowLoading(0);

  }
  //获取征信报告
  function getCloudMirrorReport() {
    //开始显示页面加载滚动条
    toShowLoading(1);

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

            for (var i = 0; i < reportArrInfo2.length; i++) {
              getOnePersonReport2(reportArrInfo2[i].type);
            }
          }
        });
      }
    });  
  }
  //跟页面逻辑相关end

  //页面首次加载，执行方法(页面逻辑入口)
  autoPc();
  clearCache();
  getCloudMirrorReport();
});