$(function () {
  //方便调试的url前缀
  var apiUrl = '/api';
  //获取url相关参数
  var token = getUrlParam('token');
  var bizType = getUrlParam('bizType') || '';
  var orderNo = getUrlParam('orderNo') || '';
  var bizType2 = getUrlParam('bizType2') || '';
  var orderNo2 = getUrlParam('orderNo2') || '';
  var isMenu = getUrlParam('isMenu') || '';

  //方法定义start
  //获取url相应参数值
  function getUrlParam(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    if (r !== null) {
      return unescape(r[2])
    }
    return null
  }
  //去引入文件缓存
  function clearCache() {
    var time = new Date().getTime();
    var cssDom = $('link')
    var jsDom = $('script')
    for (var i = 0; i < cssDom.length; i++) {
      var url = cssDom.eq(i).attr('href') + '?t=' + time;
      cssDom.eq(i).attr('href', url);
    }

    for (var j = 0; j < jsDom.length; j++) {
      var url2 = jsDom.eq(j).attr('src') + '?t=' + time;
      jsDom.eq(j).attr('src', url2);
    }
  }

  //获取对象属性个数
  function attributeCount(obj) {
    var count = 0;
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        count++;
      }
    }
    return count;
  }

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

  //信用评分和欺诈与风险选中框边框自适应
  function creditInfoChooseBorderAuto() {
    var length = $('.scorePart .scoreTip').length;
    var length2 = $('.scorePart .scoreTip2').length;
    var length3 = $('.scorePart .scoreTip3').length;

    for (var i = 0; i < length; i++) {
      var width = $('.scorePart .scoreTip').eq(i).parent('.scorePart').width();
      var scoreTipWidth = (width - 4) + 'px';
      $('.scorePart .scoreTip').eq(i).css('width', scoreTipWidth);
    }

    for (var j = 0; j < length2; j++) {
      var width = $('.scorePart .scoreTip2').eq(j).parent('.scorePart').width();
      var scoreTipWidth = (width - 4) + 'px';
      $('.scorePart .scoreTip2').eq(j).css('width', scoreTipWidth);
    }

    for (var k = 0; k < length3; k++) {
      var width = $('.scorePart .scoreTip3').eq(k).parent('.scorePart').width();
      var scoreTipWidth = (width - 4) + 'px';
      $('.scorePart .scoreTip3').eq(k).css('width', scoreTipWidth);
    }

  }

  //黑名单表格自适应
  function blackTableAuto() {
    var autoMargin = ($('.blacklist').eq(0).width() - $('.blacklist .blacklistPart').eq(0).width() * 3) / 2;
    $('.blacklist .blacklistPart2').css('margin-left', autoMargin + 'px');
  }

  //滚动到某个id指定位置
  function scrollDomToPlace(id) {
    var top = $('#' + id).offset().top + 'px';
    $('body,html').animate({
      scrollTop: top
    }, 1000);
  }

  //根据参数是否显示菜单
  function isShowMenu() {
    if(isMenu === '2') {
      $('#menuIcon').addClass('dn');
      $('#menuIcon').unbind();
      $('#menuFixed').unbind();      
    }
  }  

  //封装ajax方法
  function yjAjax(request) {
    $.ajax({
      type: request.type,
      url: apiUrl + request.url,
      data: request.data,
      dataType: "json",
      success: function (res) {
        request.success(res);
      },
      error: function () {}
    });
  }

  //查无此结果显示
  function noResults(msg) {
    $('#hasReport').addClass('dn');
    $('#noReport').removeClass('dn');
    $('#noReport').text(msg);
  }
  //方法定义end

  //跟页面逻辑相关start
  //获取征信报告
  function getCloudMirrorReport() {
    //生成新云镜报告
    function getNewReport() {
      //获取综合结论信息
      function getAllConclusion() {
        //调用几次综合结论接口
        var getApiTime = 0;
        var detail1 = {};
        var detail2 = {};
        var allDetail = {};


        //综合结论左边图标展示和结论展示
        function showEndResults(conclusion, conclusion2, result) {
          //只有贷前综合结论的结果判断
          function onlyOneResults(conclusion) {
            if (conclusion === 1) {
              $('#resultsTip').text(result);
              if (result.indexOf('人工') === -1) {
                $('#results').addClass('resultsColor');
                $('#resultsImg').attr('src', './img/1.png');
                return;
              }

              if (result.indexOf('人工') !== -1) {
                $('#results').addClass('resultsColor2');
                $('#resultsImg').attr('src', './img/2.png');
                return;
              }
            }

            if (conclusion === 0) {
              $('#results').addClass('resultsColor3');
              $('#resultsImg').attr('src', './img/3.png');
              $('#resultsTip').text('拒绝');
              return;
            }
          }

          //贷后-综合结论的结果判断
          function onlyTwoResults(conclusion2) {
            $('#resultsTip').text(result);

            if (conclusion2 === 1) {
              $('#results').addClass('resultsColor');
              $('#resultsImg').attr('src', './img/1.png');
              return;
            }

            if (conclusion2 === 2) {
              $('#results').addClass('resultsColor2');
              $('#resultsImg').attr('src', './img/2.png');
              return;
            }

            if (conclusion2 === 3) {
              $('#results').addClass('resultsColor2');
              $('#resultsImg').attr('src', './img/2.png');
              return;
            }
          }

          //没有二次综合结论
          if (conclusion2 === 0) {
            onlyOneResults(conclusion);
          } else {
            onlyTwoResults(conclusion2);
          }
        }
        ///综合结论右边列表展示
        function showRiskResults(risks) {
          //获取风险列表
          function showRiskList(arr) {
            //获取一个人风险列表
            function getRisk(arr) {
              var html = '';
              if(arr.length === 0) {
                html = html + [
                  "<div class='warn'>",
                    "<div class='icoWarn2'></div>",
                    "无风险项",
                  "</div>",
                ].join("");                
              }else{
                for (var i = 0; i < arr.length; i++) {
                  html = html + [
                    "<div class='warn'>",
                    "<div class='icoWarn'></div>",
                    riskTypeFilter(arr[i]),
                    "</div>",
                  ].join("");
                }
              }

              return html;
            }

            var html = '';
            var icoType = '';
            var icoTxt = '';
            for (var i = 0; i < arr.length; i++) {
              icoType = loanPersonIconFilter(arr[i].conclusion);
              icoTxt = loanPersonIconTxtFilter(arr[i].conclusion);
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
                  getRisk(arr[i].notes),
                "</li>",
              ].join("");
            }
            $("#personInfoList").html(html);

            //风险列表-征信图标小提示
            $('#personInfoList .icon').unbind('mouseenter').bind('mouseenter', function () {
              if(!$(this).hasClass('icoPerson') && !$(this).hasClass('icoPerson2') && !$(this).hasClass('icoPerson3')) {
                return
              }

              $(this).children('.popup').removeClass('dn');
            });
            $('#personInfoList .icon').unbind('mouseleave').bind('mouseleave', function () {
              if(!$(this).hasClass('icoPerson') && !$(this).hasClass('icoPerson2') && !$(this).hasClass('icoPerson3')) {
                return
              }

              $(this).children('.popup').addClass('dn');
            });
          }

          if (!risks.length) {
            return;
          }

          $('#noRisk').addClass('dn');
          $('#personInfoList').removeClass('dn');

          showRiskList(risks);

          creditIconAuto();
        }

        //贷前-综合结论接口
        function reportV1CollectApi() {
          yjAjax({
            type: "post",
            url: '/report/v1/collect',
            data: {
              token: token,
              bizType: bizType,
              orderNo: orderNo,
            },
            success: function (res) {
              if(res.status !== '00000') {
                noResults(res.msg);
                toShowLoading(0);
                return                
              }               
              if (!res.detail) {
                noResults(res.msg);
                return
              }
              getApiTime = getApiTime + 1;
              showTopResults(res.detail, '');
            }
          });
        }

        //贷后-综合结论接口-这次综合结论不一定有
        function reportV1CollectApi2() {
          yjAjax({
            type: "post",
            url: '/report/v1/collect',
            data: {
              token: token,
              bizType: bizType2,
              orderNo: orderNo2,
            },
            success: function (res) {
              getApiTime = getApiTime + 1;
              //没有传订单号时detailundefined
              showTopResults('', res.detail || null);
            }
          });
        }

        //综合结论数据展示
        function showTopResults(data1, data2) {
          if (data1 !== '') {
            detail1 = data1;
          }
          if (data2 !== '') {
            detail2 = data2;
          }
          if (getApiTime === 2) {
            //判断贷后-综合结论是否存在
            if (detail2 === null) {
              allDetail = detail1;
              if(allDetail.risks === null) {
                allDetail.risks = [];
              }
            } else {
              $.extend(true, allDetail, detail1, detail2);
              //对两次综合结论的风险数组合并
              function mergeArr(risks1, risks2) {
                var arr = ['','','','',''];
                var arrAll = risks1.concat(risks2);
                var arrEnd = [];
  
                for(var i = 0 ; i < arrAll.length ; i++) {
                  if(arrAll[i].memberType === 'lender') {
                    arr[0] = arrAll[i];
                  }
                  if(arrAll[i].memberType === 'spouse') {
                    arr[1] = arrAll[i];
                  }  
                  if(arrAll[i].memberType === 'gor1') {
                    arr[2] = arrAll[i];
                  }
                  if(arrAll[i].memberType === 'gor2') {
                    arr[3] = arrAll[i];
                  } 
                  if(arrAll[i].memberType === 'gor3') {
                    arr[4] = arrAll[i];
                  }                                                
                }

                for(var n = 0 ; n < arr.length ; n++) {
                  if(arr[n] !== '' && arr[n].notes === null) {
                    arr[n].notes = [];
                  }                                              
                } 
                
                for(var k = 0 ; k < arrAll.length ; k++) {
                  if(arrAll[k].memberType === 'lender') {
                    if(arrAll[k].notes !== null && arrAll[k].notes.length) {
                      for(var m = 0 ; m < arrAll[k].notes.length ; m++) {
                        var index = arr[0].notes.indexOf(arrAll[k].notes[m]);
                        if(index === -1) {
                          arr[0].notes.push(arrAll[k].notes[m]);
                        }
                      }
                    }                    
                  }
                  if(arrAll[k].memberType === 'spouse') {
                    if(arrAll[k].notes !== null && arrAll[k].notes.length) {
                      for(var m = 0 ; m < arrAll[k].notes.length ; m++) {
                        var index = arr[1].notes.indexOf(arrAll[k].notes[m]);
                        if(index === -1) {
                          arr[1].notes.push(arrAll[k].notes[m]);
                        }
                      }
                    }
                  }  
                  if(arrAll[k].memberType === 'gor1') {
                    if(arrAll[k].notes !== null && arrAll[k].notes.length) {
                      for(var m = 0 ; m < arrAll[k].notes.length ; m++) {
                        var index = arr[2].notes.indexOf(arrAll[k].notes[m]);
                        if(index === -1) {
                          arr[2].notes.push(arrAll[k].notes[m]);
                        }
                      }
                    }
                  }
                  if(arrAll[k].memberType === 'gor2') {
                    if(arrAll[k].notes !== null && arrAll[k].notes.length) {
                      for(var m = 0 ; m < arrAll[k].notes.length ; m++) {
                        var index = arr[3].notes.indexOf(arrAll[k].notes[m]);
                        if(index === -1) {
                          arr[3].notes.push(arrAll[k].notes[m]);
                        }
                      }
                    }
                  } 
                  if(arrAll[k].memberType === 'gor3') {
                    if(arrAll[k].notes !== null && arrAll[k].notes.length) {
                      for(var m = 0 ; m < arrAll[k].notes.length ; m++) {
                        var index = arr[4].notes.indexOf(arrAll[k].notes[m]);
                        if(index === -1) {
                          arr[4].notes.push(arrAll[k].notes[m]);
                        }
                      }
                    }
                  }                                                
                } 

                //征信以第一次为准的处理
                for(var z = 0 ; z < risks1.length ; z++) {
                  if(risks1[z].memberType === 'lender') {
                    arr[0].conclusion = risks1[z].conclusion;
                  }
                  if(risks1[z].memberType === 'spouse') {
                    arr[1].conclusion = risks1[z].conclusion;
                  }  
                  if(risks1[z].memberType === 'gor1') {
                    arr[2].conclusion = risks1[z].conclusion;
                  }
                  if(risks1[z].memberType === 'gor2') {
                    arr[3].conclusion = risks1[z].conclusion;
                  } 
                  if(risks1[z].memberType === 'gor3') {
                    arr[4].conclusion = risks1[z].conclusion;
                  }                     
                }                
  
                for(var j = 0 ; j < arr.length ; j++) {
                    if(arr[j] !== '') {
                      arrEnd.push(arr[j]);
                    }                       
                }              
  
                return arrEnd;

              }

              if(detail1.risks === null) {
                detail1.risks = [];
              }
              if(detail2.risks === null) {
                detail2.risks = [];
              }
              
              allDetail.risks = mergeArr(detail1.risks, detail2.risks);
            }
            showEndResults(allDetail.typeConclusion1, allDetail.typeConclusion2, allDetail.result);
            showRiskResults(allDetail.risks);
          }
        }

        //综合结论接口调用
        reportV1CollectApi();
        reportV1CollectApi2();
      }

      //获取贷款相关人贷款信息和右边固定导航条列表
      function getAllPersonInfo() {
        //单人报告demo的html
        var reportDemoHtml = '';
        //报告列表人身份证和信息数组合并后数组
        var reportArrInfo = [];

        //右边菜单栏列表对象  members1第一次贷前决策  members2第二次综合决策
        var getApiTime = 0;
        var members1 = [];
        var members2 = [];

        //获取需要的单人报告demo的html
        function getReportDemoHtml() {
          reportDemoHtml = $('#demo').html();
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

        //获取贷款人以及相关人report列表
        function getPersonReportList(arr, arr2) {
          //请求成功数和拼接的html都是getPersonReportList方法内的通用变量 
          var requestOkNumber = 0;
          var resHtmlArr = [];
          var resHtmlArr2 = [];
          //合并后的全部数据
          var allResHtmlArr = [];

          //贷款相关人报告信息全部获取完成后的操作方法(解决ajax异步方法)
          function toShowReportHtml() {
            //贷款相关人生成的报告的html最终修改
            function getFinalReport() {
              //改变demo报告名和添加描点-让菜单可以定位到描点
              function changeTitleAndId(index) {
                $('#reportList .report').eq(index).attr('id', allResHtmlArr[index].type);
                var title = loanPersonFilter(allResHtmlArr[index].type);
                var name =  reportArrInfo[index].name ?  '-' + reportArrInfo[index].name : '';
                var idNo =  reportArrInfo[index].idNo ? '(' + reportArrInfo[index].idNo + ')' : '';
                $('#reportList .report').eq(index).children('.title').eq(0).children('span').eq(0).text(title + name + idNo);
              }

              //改变demo报告信用评分和欺诈与风险内容
              function changeCreditInfo(index) {
                //当前个人报告对象
                var data = allResHtmlArr[index].data;
                //控制信用评分和欺诈与风险显示数组
                var isHaveArr = [true, true, true, true,true];
                
                //个人同盾信用分显示判断
                if (data.tdCreditScore && data.tdCreditScore.show) {
                  var scoreListAdd = 0 + index * 5;
                  var dom = $('.scoreList').eq(scoreListAdd).children('.scorePart');
                  var scoreTxt = data.tdCreditScore.score;
                  if (data.tdCreditScore.level === '1') {
                    dom.eq(0).children('.scoreTip').removeClass('dn');
                    dom.eq(0).children('.scoreTip').eq(0).children('span').text(scoreTxt);
                    dom.eq(0).children('.icoTriangle').removeClass('dn');
                    dom.eq(0).addClass('choose');
                  } else if (data.tdCreditScore.level === '2') {
                    dom.eq(1).children('.scoreTip2').removeClass('dn');
                    dom.eq(1).children('.scoreTip2').eq(0).children('span').text(scoreTxt);
                    dom.eq(1).children('.icoTriangle').removeClass('dn');
                    dom.eq(1).addClass('choose2');
                  } else if (data.tdCreditScore.level === '3') {
                    dom.eq(2).children('.scoreTip3').removeClass('dn');
                    dom.eq(2).children('.scoreTip3').eq(0).children('span').text(scoreTxt);
                    dom.eq(2).children('.icoTriangle').removeClass('dn');
                    dom.eq(2).addClass('choose3');
                  } else {
                    isHaveArr[0] = false;
                  }
                } else {
                  isHaveArr[0] = false;
                }

                //个人致诚信用分显示判断
                if (data.afCreditScore && data.afCreditScore.show) {
                  var scoreListAdd2 = 1 + index * 5;
                  var dom2 = $('.scoreList').eq(scoreListAdd2).children('.scorePart');
                  var scoreTxt2 = data.afCreditScore.score;
                  if (data.afCreditScore.level === '1') {
                    dom2.eq(0).children('.scoreTip').removeClass('dn');
                    dom2.eq(0).children('.scoreTip').eq(0).children('span').text(scoreTxt2);
                    dom2.eq(0).children('.icoTriangle').removeClass('dn');
                    dom2.eq(0).addClass('choose');
                  } else if (data.afCreditScore.level === '2') {
                    dom2.eq(1).children('.scoreTip2').removeClass('dn');
                    dom2.eq(1).children('.scoreTip2').eq(0).children('span').text(scoreTxt2);
                    dom2.eq(1).children('.icoTriangle').removeClass('dn');
                    dom2.eq(1).addClass('choose2');
                  } else if (data.afCreditScore.level === '3') {
                    dom2.eq(2).children('.scoreTip3').removeClass('dn');
                    dom2.eq(2).children('.scoreTip3').eq(0).children('span').text(scoreTxt2);
                    dom2.eq(2).children('.icoTriangle').removeClass('dn');
                    dom2.eq(2).addClass('choose3');
                  } else {
                    isHaveArr[1] = false;
                  }
                } else {
                  isHaveArr[1] = false;
                }    
                
                //个人致诚综合分显示判断
                if (data.afComposite && data.afComposite.show  && data.afComposite.compositeScore !== null) {
                  var scoreListAdd3 = 2 + index * 5;
                  var dom3 = $('.scoreList').eq(scoreListAdd3).children('.scorePart');
                  var scoreTxt3 = data.afComposite.compositeScore;
                  if (data.afComposite.level === '1') {
                    dom3.eq(0).children('.scoreTip').removeClass('dn');
                    dom3.eq(0).children('.scoreTip').eq(0).children('span').text(scoreTxt3);
                    dom3.eq(0).children('.icoTriangle').removeClass('dn');
                    dom3.eq(0).addClass('choose');
                  } else if (data.afComposite.level === '2') {
                    dom3.eq(1).children('.scoreTip2').removeClass('dn');
                    dom3.eq(1).children('.scoreTip2').eq(0).children('span').text(scoreTxt3);
                    dom3.eq(1).children('.icoTriangle').removeClass('dn');
                    dom3.eq(1).addClass('choose2');
                  } else if (data.afComposite.level === '3') {
                    dom3.eq(2).children('.scoreTip3').removeClass('dn');
                    dom3.eq(2).children('.scoreTip3').eq(0).children('span').text(scoreTxt3);
                    dom3.eq(2).children('.icoTriangle').removeClass('dn');
                    dom3.eq(2).addClass('choose3');
                  } else {
                    isHaveArr[2] = false;
                  }
                } else {
                  isHaveArr[2] = false;
                }                 

                //个人同盾欺诈分显示判断
                if (data.tdCheatScore && data.tdCheatScore.show) {
                  var scoreListAdd4 = 3 + index * 5;
                  var dom4 = $('.scoreList').eq(scoreListAdd4).children('.scorePart');
                  var scoreTxt4 = data.tdCheatScore.score;
                  if (data.tdCheatScore.level === '1') {
                    dom4.eq(0).children('.scoreTip').removeClass('dn');
                    dom4.eq(0).children('.scoreTip').eq(0).children('span').text(scoreTxt4);
                    dom4.eq(0).children('.icoTriangle').removeClass('dn');
                    dom4.eq(0).addClass('choose');
                  } else if (data.tdCheatScore.level === '2') {
                    dom4.eq(1).children('.scoreTip2').removeClass('dn');
                    dom4.eq(1).children('.scoreTip2').eq(0).children('span').text(scoreTxt4);
                    dom4.eq(1).children('.icoTriangle').removeClass('dn');
                    dom4.eq(1).addClass('choose2');
                  } else if (data.tdCheatScore.level === '3') {
                    dom4.eq(2).children('.scoreTip3').removeClass('dn');
                    dom4.eq(2).children('.scoreTip3').eq(0).children('span').text(scoreTxt4);
                    dom4.eq(2).children('.icoTriangle').removeClass('dn');
                    dom4.eq(2).addClass('choose3');
                  } else {
                    isHaveArr[3] = false;
                  }
                } else {
                  isHaveArr[3] = false;
                }                

                //个人算话欺诈评级显示判断
                if (data.suanhuaFrdRsk && data.suanhuaFrdRsk.show) {
                  var scoreListAdd5 = 4 + index * 5;
                  var dom5 = $('.scoreList').eq(scoreListAdd5).children('.scorePart');
                  var scoreTxt5 = data.suanhuaFrdRsk.appRst;
                  if (stanRiskRateFilter(data.suanhuaFrdRsk.stanRiskRate) === '1') {
                    dom5.eq(0).children('.scoreTip').removeClass('dn');
                    dom5.eq(0).children('.scoreTip').eq(0).children('span').text(scoreTxt5);
                    dom5.eq(0).children('.icoTriangle').removeClass('dn');
                    dom5.eq(0).addClass('choose');
                  } else if (stanRiskRateFilter(data.suanhuaFrdRsk.stanRiskRate) === '2') {
                    dom5.eq(1).children('.scoreTip2').removeClass('dn');
                    dom5.eq(1).children('.scoreTip2').eq(0).children('span').text(scoreTxt5);
                    dom5.eq(1).children('.icoTriangle').removeClass('dn');
                    dom5.eq(1).addClass('choose2');
                  } else if (stanRiskRateFilter(data.suanhuaFrdRsk.stanRiskRate) === '3') {
                    dom5.eq(2).children('.scoreTip3').removeClass('dn');
                    dom5.eq(2).children('.scoreTip3').eq(0).children('span').text(scoreTxt5);
                    dom5.eq(2).children('.icoTriangle').removeClass('dn');
                    dom5.eq(2).addClass('choose3');
                  } else {
                    isHaveArr[4] = false;
                  }

                } else {
                  isHaveArr[4] = false;
                }
                
                //信用分和欺诈分模块高度和样式自适应修改
                function anutoChangeScore(isHaveArr,index) {
                  var leftNum = 0;
                  var rightNum = 0;

                  for(var i = 0; i < 3 ; i++) {
                    if(isHaveArr[i] === true) {
                      leftNum = leftNum + 1;
                    }
                  }

                  for(var j = 3; j < isHaveArr.length ; j++) {
                    if(isHaveArr[j] === true) {
                      rightNum = rightNum + 1;
                    }
                  }
                  
                  //每个人信用分模块左右两块显示和隐藏start
                  if(leftNum === 0 && rightNum === 0) {
                    $('.creditBox').eq(0+index*2).addClass('dn');
                    $('.creditBox').eq(1+index*2).addClass('dn');
                  }

                  if(leftNum === 0 && rightNum !== 0) {
                    $('.creditBox').eq(0+index*2).addClass('dn');
                    $('.creditBox').eq(1+index*2).removeClass('creditBox2');
                  }   
                  
                  if(leftNum !== 0 && rightNum === 0) {
                    $('.creditBox').eq(1+index*2).addClass('dn');
                  } 
                  //每个人信用分模块左右两块显示和隐藏end

                  //每个人信用分模块左右两块高度start
                  if(leftNum === 1) {
                    $('.creditScore').eq(0+index*2).addClass('creditScore2');
                  }
                  if(leftNum === 3) {
                    $('.creditScore').eq(0+index*2).addClass('creditScore3');
                  }               
                  if(rightNum === 1) {
                    $('.creditScore').eq(1+index*2).addClass('creditScore2');
                  }                      
                  //每个人信用分模块左右两块的高度end                  
                  
                  //每个人信用分模块左右两个信用和欺诈分的显示和隐藏start
                  for(var k = 0 ; k < isHaveArr.length ; k++ ) {
                    if(isHaveArr[k] === false) {
                      $('.score').eq(k+index*5).addClass('dn');
                    }
                  }
                  //每个人信用分模块左右两个信用和欺诈分的显示和隐藏end

                }

                anutoChangeScore(isHaveArr,index);                                                                           
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
                var data = allResHtmlArr[index].data;

                //遍历黑名单表格方法
                function getBlackTable(num, blackData, code) {
                  //判断当前对象属性值是不是全部为null(除show属性)
                  function judgeDataAllNull(obj, code) {
                    var isTrue = true;
                    var length = attributeCount(obj) - 1;
                    var num = 0;
                    for (var name in obj) {
                      if (name !== 'show') {
                        if (obj[name] === null) {
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
                        if ((name !== 'show') && (name !== 'dataBuildTimeA') && (name !== 'dataBuildTimeB1') && (name !== 'dataBuildTimeB2') && (name !== 'dataBuildTimeB3')  && (name !== 'riskName')) {
                          if ((blackData2[name] !== null) && (blacklistFilter2(code, name, value) !== '0') && (blacklistFilter2(code, name, value) !== 0) && (blacklistFilter2(code, name, value) !== '未命中')) {
                            html = html + [
                              "<tr>",
                              "<td class='td1'><p>" + blacklistFilter(code, name) + "</p></td>",
                              "<td class='td2'><p>" + blacklistFilter2(code, name, value) + "</p></td>",
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

                //数据删选显示方法
                function dataToData(data1,data2) {
                  var data = {}
                  for (key in data1) {
                    data[key] = data2[key];
                  }

                  return data;
                }                

                //人行征信信息
                if (data.personalCredit && data.personalCredit.show) {
                  num = num + 1;
                  blackPartAddIndex = num % 3 === 0 ? 2 :
                    num % 3 === 1 ? 0 :
                    1;
                  getBlackTable(num, data.personalCredit, 10);
                }

                //内部黑名单详情
                if (data.insideBlacklistDetail && data.insideBlacklistDetail.show) {
                  num = num + 1;
                  blackPartAddIndex = num % 3 === 0 ? 2 :
                    num % 3 === 1 ? 0 :
                    1;
                  getBlackTable(num, data.insideBlacklistDetail, 0);
                }

                //数美黑名单
                if (data.smBlacklist && data.smBlacklist.show) {
                  num = num + 1;
                  blackPartAddIndex = num % 3 === 0 ? 2 :
                    num % 3 === 1 ? 0 :
                    1;
                  getBlackTable(num, data.smBlacklist, 1);
                }

                //百融特殊名单
                if (data.brSpecialList && data.brSpecialList.show) {
                  num = num + 1;
                  blackPartAddIndex = num % 3 === 0 ? 2 :
                    num % 3 === 1 ? 0 :
                    1;
                  getBlackTable(num, data.brSpecialList, 2);
                }

                //百融自然人
                if (data.brBadInfo && data.brBadInfo.show) {
                  num = num + 1;
                  blackPartAddIndex = num % 3 === 0 ? 2 :
                    num % 3 === 1 ? 0 :
                    1;
                  getBlackTable(num, data.brBadInfo, 3);
                }

                //百融法院执行人
                if (data.brExecut && data.brExecut.show) {
                  num = num + 1;
                  blackPartAddIndex = num % 3 === 0 ? 2 :
                    num % 3 === 1 ? 0 :
                    1;
                  getBlackTable(num, data.brExecut, 4);
                }

                //极兆入网时长
                if (data.jzWholeInDate && data.jzWholeInDate.show) {
                  num = num + 1;
                  blackPartAddIndex = num % 3 === 0 ? 2 :
                    num % 3 === 1 ? 0 :
                    1;
                  getBlackTable(num, data.jzWholeInDate, 5);
                }

                //极兆多头借贷黑名单
                if (data.jzBlacklist && data.jzBlacklist.show) {
                  num = num + 1;
                  blackPartAddIndex = num % 3 === 0 ? 2 :
                    num % 3 === 1 ? 0 :
                    1;
                  getBlackTable(num, data.jzBlacklist, 6);
                }

                //极兆逾期平台详情
                if (data.jzOverdueDetail && data.jzOverdueDetail.show) {
                  num = num + 1;
                  blackPartAddIndex = num % 3 === 0 ? 2 :
                    num % 3 === 1 ? 0 :
                    1;
                  getBlackTable(num, data.jzOverdueDetail, 7);
                }

                //阿福共享平台
                if (data.afShare && data.afShare.show) {
                  num = num + 1;
                  blackPartAddIndex = num % 3 === 0 ? 2 :
                    num % 3 === 1 ? 0 :
                    1;
                  getBlackTable(num, data.afShare, 8);
                }

                //平安风险名单
                if (data.pinganRsk && data.pinganRsk.show) {
                  num = num + 1;
                  blackPartAddIndex = num % 3 === 0 ? 2 :
                    num % 3 === 1 ? 0 :
                    1;
                  getBlackTable(num, data.pinganRsk, 9);
                }

                //极兆居住地核验
                if (data.jzResidenceCheck && data.jzResidenceCheck.show) {
                  num = num + 1;
                  blackPartAddIndex = num % 3 === 0 ? 2 :
                    num % 3 === 1 ? 0 :
                    1;
                  getBlackTable(num, data.jzResidenceCheck, 11);
                }    
                
                //瑞天预筛选
                if (data.ruitianScreen && data.ruitianScreen.show) {
                  num = num + 1;
                  blackPartAddIndex = num % 3 === 0 ? 2 :
                    num % 3 === 1 ? 0 :
                    1;

                  var ruitianScreenData = {
                    show: true,
                    blacklistFlag: '',
                  }
                  //数据删选显示
                  ruitianScreenData = dataToData(ruitianScreenData,data.ruitianScreen);
                  getBlackTable(num, ruitianScreenData, 12);
                } 
                
                //同盾多头借贷
                if (data.tdQueryRisk && data.tdQueryRisk.show) {
                  num = num + 1;
                  blackPartAddIndex = num % 3 === 0 ? 2 :
                    num % 3 === 1 ? 0 :
                    1;

                  var tdQueryRiskData = {
                    show: true,
                    final_score: '',
                    idCount_180: '',
                    mobileCount_180: '',
                    idCountNbank_90: '',
                    mobileCountNbank_90: '',
                    idCount_90: '',
                    mobileCount_90: '',
                    idCountp2p_90: '',
                    mobileCountp2p_90: '',
                    idCountNbank_30: '',
                    mobileCountNbank_30: '',
                    idCount_30: '',
                    mobileCount_30: '',
                    idCountp2p_30: '',
                    mobileCountp2p_30: '',
                    idCountCons_90: '',
                    mobileCountCons_90: '',
                    idCount_7: '',
                    mobileCount_7: '',
                    idCountNbank_7: '',
                    mobileCountNbank_7: '',
                    idCountp2p_7: '',
                    mobileCountp2p_7: '',
                    idCountCons_30: '',
                    mobileCountCons_30: '',
                    idCountBank_90: '',
                    mobileCountBank_90: '',
                    idFkCount_90:	'',
                    mobileFkCount_90:	'',                     
                    idCountBank_30: '',
                    mobileCountBank_30: '',
                    idSq_90: '',
                  }
                  //数据删选显示
                  tdQueryRiskData = dataToData(tdQueryRiskData,data.tdQueryRisk);
                  getBlackTable(num, tdQueryRiskData, 13);
                } 
                
                //百融多头借贷
                if (data.brApplyLoan && data.brApplyLoan.show) {
                  num = num + 1;
                  blackPartAddIndex = num % 3 === 0 ? 2 :
                    num % 3 === 1 ? 0 :
                    1;

                  var brApplyLoanData = {
                    show: true,
                    als_d7_id_pdl_orgnum: '',
                    als_d7_id_caon_orgnum: '',
                    als_d7_id_cooff_orgnum: '',
                    als_d7_id_nbank_orgnum: '',
                    als_d7_id_nbank_p2p_orgnum: '',
                    als_d7_id_nbank_mc_orgnum: '',
                    als_d7_id_nbank_ca_orgnum: '',
                    als_d7_id_nbank_cf_orgnum: '',
                    als_d7_cell_pdl_orgnum: '',
                    als_d7_cell_caon_orgnum: '',
                    als_d7_cell_cooff_orgnum: '',
                    als_d7_cell_nbank_orgnum: '',
                    als_d7_cell_nbank_p2p_orgnum: '',
                    als_d7_cell_nbank_night_orgnum: '',
                    als_m1_id_pdl_orgnum: '',
                    als_m1_id_caon_orgnum: '',
                    als_m1_id_cooff_orgnum: '',
                    als_m1_id_nbank_orgnum: '',
                    als_m1_id_nbank_p2p_orgnum: '',
                    als_m1_id_nbank_mc_orgnum: '',
                    als_m1_id_nbank_ca_orgnum: '',
                    als_m1_id_nbank_cf_orgnum: '',
                    als_m1_id_nbank_night_orgnum: '',
                    als_m1_cell_pdl_orgnum: '',
                    als_m1_cell_caon_orgnum: '',
                    als_m1_cell_cooff_orgnum: '',
                    als_m1_cell_nbank_orgnum: '',
                    als_m1_cell_nbank_p2p_orgnum: '',
                    als_m1_cell_nbank_mc_orgnum: '',
                    als_m1_cell_nbank_ca_orgnum: '',
                    als_m1_cell_nbank_cf_orgnum: '',
                    als_m1_cell_nbank_night_orgnum: '',
                    als_m3_id_pdl_orgnum: '',
                    als_m3_id_caon_orgnum: '',
                    als_m3_id_cooff_orgnum: '',
                    als_m3_id_nbank_selfnum: '',
                    als_m3_id_nbank_orgnum: '',
                    als_m3_id_nbank_p2p_orgnum: '',
                    als_m3_id_nbank_mc_orgnum: '',
                    als_m3_id_nbank_ca_orgnum: '',
                    als_m3_id_nbank_cf_orgnum: '',
                    als_m3_id_nbank_night_orgnum: '',
                    als_m3_cell_pdl_orgnum: '',
                    als_m3_cell_caon_orgnum: '',
                    als_m3_cell_cooff_orgnum: '',
                    als_m3_cell_nbank_orgnum: '',
                    als_m3_cell_nbank_p2p_orgnum: '',
                    als_m3_cell_nbank_mc_orgnum: '',
                    als_m3_cell_nbank_ca_orgnum: '',
                    als_m3_cell_nbank_cf_orgnum: '',
                    als_m3_cell_nbank_night_orgnum: '',
                    als_m6_id_pdl_orgnum: '',
                    als_m6_id_caon_orgnum: '',
                    als_m6_id_cooff_orgnum: '',
                    als_m6_id_nbank_orgnum: '',
                    als_m6_id_nbank_p2p_orgnum: '',
                    als_m6_id_nbank_mc_orgnum: '',
                    als_m6_id_nbank_ca_orgnum: '',
                    als_m6_id_nbank_cf_orgnum: '',
                    als_m6_id_nbank_night_orgnum: '',
                    als_m6_cell_pdl_orgnum: '',
                    als_m6_cell_caon_orgnum: '',
                    als_m6_cell_cooff_orgnum: '',
                    als_m6_cell_nbank_orgnum: '',
                    als_m6_cell_nbank_p2p_orgnum: '',
                    als_m6_cell_nbank_mc_orgnum: '',
                    als_m6_cell_nbank_ca_orgnum: '',
                    als_m6_cell_nbank_cf_orgnum: '',
                    als_m6_cell_nbank_night_orgnum: '',
                    als_lst_id_nbank_consnum: '',
                    als_lst_cell_nbank_consnum: '',
                  }
                  //数据删选显示
                  brApplyLoanData = dataToData(brApplyLoanData,data.brApplyLoan);                    

                  getBlackTable(num, brApplyLoanData, 14);
                }                 

                //生成所有黑名单列表数据
                $('.blacklistPart').eq(0 + index * 3).append(blackPartAddArr[0]);
                $('.blacklistPart').eq(1 + index * 3).append(blackPartAddArr[1]);
                $('.blacklistPart').eq(2 + index * 3).append(blackPartAddArr[2]);
              };

              for (var i = 0; i < allResHtmlArr.length; i++) {
                //改变demo报告名和添加描点-让菜单可以定位到描点
                changeTitleAndId(i);
                //改变demo报告信用评分和欺诈与风险内容
                changeCreditInfo(i);
                //改变demo报告黑名单三列列表数据
                changeBlacklist(i);
              }

              centerResults();
              creditInfoChooseBorderAuto();
              blackTableAuto();

              //开始显示页面加载滚动条end
              toShowLoading(0);
              isShowMenu();

              //保存生成报告的高度
              function reportV1SaveInfoApi() {
                var data = [
                  {
                  "bizType": bizType,
                  "orderNo": orderNo,
                  },
                  {
                    "bizType": bizType2,
                    "orderNo": orderNo2,
                  }                  
                ];
                data = JSON.stringify(data);
                
                //当前生成报告高度
                var height = $(document).height() + 1;

                yjAjax({
                  type: "post",
                  url: '/report/v1/saveInfo',
                  data: {
                    token: token,
                    height: height,
                    orders: data,
                  },
                  success: function (res) {

                  }
                });
              }
              reportV1SaveInfoApi();              
            }

            if (requestOkNumber === (arr.length + arr2.length)) {
              var resHtml = '';
              //贷前和贷后生成数据数组合并
              function mergeResHtmlArr(resHtmlArr, resHtmlArr2) {
                var arr = [{
                    type: "lender",
                    data: '',
                    html: reportDemoHtml,
                  },
                  {
                    type: "spouse",
                    data: '',
                    html: reportDemoHtml,
                  },
                  {
                    type: "gor1",
                    data: '',
                    html: reportDemoHtml,
                  },
                  {
                    type: "gor2",
                    data: '',
                    html: reportDemoHtml,
                  },
                  {
                    type: "gor3",
                    data: '',
                    html: reportDemoHtml,
                  }
                ];
                var length = resHtmlArr.length < resHtmlArr2.length ? resHtmlArr2.length : resHtmlArr.length;
                for (var i = 0; i < length; i++) {
                  if (resHtmlArr[i] !== undefined && resHtmlArr2[i] === undefined) {
                    arr[i].data = resHtmlArr[i].data;
                  }

                  if (resHtmlArr[i] === undefined && resHtmlArr2[i] !== undefined) {
                    arr[i].data = resHtmlArr2[i].data;
                  }

                  if (resHtmlArr[i] !== undefined && resHtmlArr2[i] !== undefined) {
                    var data1 = resHtmlArr[i].data;
                    var data2 = resHtmlArr2[i].data;
                    var data3 = {};
                    $.extend(true, data3, data1, data2);

                    for (var key in data1) {
                      if (data3[key] !== null) {
                        if (data1[key].show && !data2[key].show) {
                          data3[key] = data1[key];
                        }

                        if (data1[key].show && data2[key].show) {
                          data3[key] = data2[key];
                        }
                      }
                    }
                    arr[i].data = data3;
                  }
                }

                for (var j = 4; j >= 0; j--) {
                  if (arr[j].data === '') {
                    arr[j] = undefined;
                  }
                }

                return arr;
              }


              //去掉数组中的undefined
              function clearArrUndefined(allResHtmlArr) {
                var data = [];
                for (var i = 0; i < allResHtmlArr.length; i++) {
                  if (allResHtmlArr[i] !== undefined) {
                    data.push(allResHtmlArr[i]);
                  }
                }
                return data;
              }
              allResHtmlArr = mergeResHtmlArr(resHtmlArr, resHtmlArr2);
              allResHtmlArr = clearArrUndefined(allResHtmlArr);
              for (var i = 0; i < allResHtmlArr.length; i++) {
                resHtml = resHtml + allResHtmlArr[i].html;
              }
              //得到最终报告demo的html
              $('#reportList').append(resHtml);
              //贷款相关人生成的报告的html最终修改
              getFinalReport();
            }
          }

          //贷前-获取单个人report信息
          function getOnePersonReport(memberType) {
            //获取单人report的html
            function getOneReport(memberType, data) {
              var index = memberTypeNumberFilter(memberType);
              resHtmlArr[index] = {
                type: memberType,
                data: data,
                html: reportDemoHtml
              }
              requestOkNumber++
              //获取完所有用户report的操作
              toShowReportHtml();
            }

            //获取相关报告人具体报告信息接口
            function reportV1MemberApi(memberType) {
              yjAjax({
                type: "post",
                url: '/report/v1/memberDetail',
                data: {
                  token: token,
                  bizType: bizType,
                  orderNo: orderNo,
                  memberType: memberType,
                },
                success: function (res) {
                  getOneReport(memberType, res.detail);
                }
              });
            }

            //获取相关报告人具体报告信息接口调用
            reportV1MemberApi(memberType);
          }

          //贷后-获取单个人report信息
          function getOnePersonReport2(memberType) {
            //获取单人report的html
            function getOneReport2(memberType, data) {
              var index = memberTypeNumberFilter(memberType);
              resHtmlArr2[index] = {
                type: memberType,
                data: data,
                html: reportDemoHtml
              }
              requestOkNumber++
              //获取完所有用户report的操作
              toShowReportHtml();
            }

            //获取相关报告人具体报告信息接口
            function reportV1MemberApi2(memberType) {
              yjAjax({
                type: "post",
                url: '/report/v1/memberDetail',
                data: {
                  token: token,
                  bizType: bizType2,
                  orderNo: orderNo2,
                  memberType: memberType,
                },
                success: function (res) {
                  getOneReport2(memberType, res.detail);
                }
              });
            }

            //获取相关报告人具体报告信息接口调用
            reportV1MemberApi2(memberType);
          }

          for (var i = 0; i < arr.length; i++) {
            getOnePersonReport(arr[i].type);
          }

          for (var j = 0; j < arr2.length; j++) {
            getOnePersonReport2(arr2[j].type);
          }
        }

        //贷前-获取贷款人以及相关人列表接口
        function reportV1PersonsApi() {
          yjAjax({
            type: "post",
            url: '/report/v1/persons',
            data: {
              token: token,
              bizType: bizType,
              orderNo: orderNo,
            },
            success: function (res) {
              if(res.status !== '00000') {
                noResults(res.msg);
                toShowLoading(0);
                return                
              }
              if (!res.members || !res.members.length) {
                //开始显示页面加载滚动条end
                noResults(res.msg);
                toShowLoading(0);
                return
              }
              getApiTime = getApiTime + 1;
              toShowPersons(res.members || [], '');
            }
          });
        }

        //贷后-获取贷款人以及相关人列表接口
        function reportV1PersonsApi2() {
          yjAjax({
            type: "post",
            url: '/report/v1/persons',
            data: {
              token: token,
              bizType: bizType2,
              orderNo: orderNo2,
            },
            success: function (res) {
              getApiTime = getApiTime + 1;
              //查无人数的为undefined
              toShowPersons('', res.members || []);
            }
          });
        }

        //展示贷前和贷后-结合后的右边菜单和详情列表
        function toShowPersons(persons1, persons2) {
          if (persons1 !== '') {
            members1 = persons1;
          }
          if (persons2 !== '') {
            members2 = persons2;
          }
          if (getApiTime === 2) {

            getReportDemoHtml();
            //生成右边固定导航条-两次决策菜单栏判断
            function getMenuMembers(members1,members2) {
              var arr = ['','','','',''];
              var arrAll = members1.concat(members2);
              var arrEnd = [];

              for(var i = 0 ; i < arrAll.length ; i++) {
                if(arrAll[i].type === 'lender') {
                  arr[0] = arrAll[i];
                }
                if(arrAll[i].type === 'spouse') {
                  arr[1] = arrAll[i];
                }  
                if(arrAll[i].type === 'gor1') {
                  arr[2] = arrAll[i];
                }
                if(arrAll[i].type === 'gor2') {
                  arr[3] = arrAll[i];
                } 
                if(arrAll[i].type === 'gor3') {
                  arr[4] = arrAll[i];
                }                                                
              }

              for(var j = 0 ; j < arr.length ; j++) {
                  if(arr[j] !== '') {
                    arrEnd.push(arr[j]);
                  }                       
              }              

              return arrEnd;
            }
            var menuMembers = getMenuMembers(members1,members2);

            getMenuList(menuMembers);
            reportArrInfo = menuMembers;
            //生成贷款人以及相关人report列表-两次的决策引擎信息
            getPersonReportList(members1, members2);
          }
        }

        //获取贷款人以及相关人列表接口调用
        reportV1PersonsApi();
        reportV1PersonsApi2();
      }

      //显示有报告
      $('#noReport').addClass('dn');
      $('#hasReport').removeClass('dn');

      //开始显示页面加载滚动条start
      toShowLoading(1);

      //生成综合结论信息展示
      getAllConclusion();
      //生成贷款相关人贷款信息和右上角菜单导航条
      getAllPersonInfo();

    }

    //无老报告生成新报告
    getNewReport();


  }
  //跟页面逻辑相关end



  //jquery监听事件start
  //页面宽度变化监听事件
  $(window).bind('resize', function () {
    creditInfoChooseBorderAuto();
    blackTableAuto();
  });
  //jquery监听事件end 



  //页面首次加载，执行方法(页面逻辑入口)
  clearCache();
  getCloudMirrorReport();
});