//获取所需参数
var args = comn.getArgs();
var argsBopInfoId = {
  bopInfoId: args['bopInfoId']
};
var loanApplyId = {
  loanApplyId: args['loanApplyId']
};


var newDealerId, discountCaseId;


//收款人信息
function getGpsInfo() {
  comn.ajax({
    url: interUrl.miniCarLoan.gpsInstallGetGpsProduct,
    data: {
      projectId: args["projectId"],
    },
    success: function (res) {
      //获取GPS安装信息-html代码块
      function getGpsInfoHtml(arr) {
        var html = '';
        var demoHtml = $('#dealerAccount').html();
        $('#dealerAccount').html('');

        if (arr.length === 0) {
          return;
        }

        for (var index = 0; index < arr.length; index++) {
          html = html + demoHtml;
        }

        $('#dealerAccount').html(html);
      }
      getGpsInfoHtml(res.data);

      //GPS安装信息-设备信息赋值
      function getGpsInfoHtml2(arr) {
        if (arr.length === 0) {
          return;
        }

        for (var index = 0; index < arr.length; index++) {
          $('.gpsName').eq(index).text('设备' + (index+1));
          $('.gpsImei').eq(index).val(arr[index].imei);
          $('.gpsSupplierName').eq(index).val(arr[index].supplierName);
          $('.gpsProductSpec').eq(index).val(arr[index].productSpec);
          var productType = arr[index].productType === 1 ? '有线' : '无线';
          $('.gpsProductType').eq(index).val(productType);
          $('.gpsSim').eq(index).val(arr[index].sim);
          $('.gpsStockTimeClerk').eq(index).val(arr[index].stockTimeClerk);

          //每个设备的图片和视频遍历
          function getImgMvList(item) {
            var html = "";
            for (i = 0; i < item.length; i++) {
              if(item[i].type === '1') {
                html += [
                  '<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 gpsItem">',
                    '<img src="' +  item[i].imagePath +  '">',
                  '</div>',  
                ].join("");
              }else if(item[i].type === '2'){
                html += [
                  '<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 gpsItem">',
                    '<video controls="controls" src="' + item[i].imagePath + '"></video>',
                    '<div class="gpsmvMask"></div>',
                  '</div>', 
                ].join("");              
              }else {

              }
            }
            return html;
          }
          var imgMVList = getImgMvList(arr[index].fileList);
          $('.gpsImgMv').eq(index).html(imgMVList);
        }
      }
      getGpsInfoHtml2(res.data);

      //安装gps信息图片添加点击查看大图
      function imgBigShow() {
        var pictures = document.querySelector('#gpsProductForm');
        var options = {
          url: 'src',
          title: true,
          transition: false,
          build: function (e) {},
          built: function(e){},
          show:  function (e) {
            window.parent.toggleTopNav();
          },
          view:  function (e) {
      
          },
          viewed: function(e){},
          hide: function(e){
            window.parent.toggleTopNav();
          },
          hidden: function(e){
          }
        };        
        viewer2 = new Viewer(pictures, options);
      }
      imgBigShow();

      //点击mv查看大图视频播放
      $('.gpsmvMask').bind('click',function(){
        var url = $(this).prev().attr("src");
        $('#mvPopupMask').removeClass('hidden');
        $('#mvPopup').removeClass('hidden');
        $('#mvPopup video').attr("src",url);
        window.parent.toggleTopNav();

        $('#mvPopup video').get(0).play();
      });

      //关闭mv弹窗
      $('#closeMvPopup').bind('click',function(){
        $('#mvPopupMask').addClass('hidden');
        $('#mvPopup').addClass('hidden');
        $('#mvPopup video').attr("src",'');        
        window.parent.toggleTopNav();
      });
    }
  });
}

//获取意见流程-意见说明
function getOpinionText() {
  $("#opinionText").getOpinion_s(argsBopInfoId);
}


//改变页面主标题
function changeFlowTitle() {
  $("#flowTitle").text(args['currentNodeName']);
}

//校验风险预警,有风险提示预警
function showisShowWarning() {
  comn.ajax({
    url: interUrl.common.getRiskRule,
    data: {
      loanApplyId: args["loanApplyId"],
      currentNodeKey: args["currentNodeKey"]
    },
    success: function (res) {
      if (res.data) {
        $.each(res.data, function (i, v) {
          if (v.risklevel === "红色预警") {
            $("#isShowWarning").removeClass("hide");
          } else if (v.risklevel === "黄色预警") {
            $("#isShowWarning").css("background-position", "0 -30px").removeClass("hide");
          }
        })
      }
    }
  })
}

//获取审批信息接口
function getApprovalInfo() {
  comn.ajax({
    url: interUrl.myTask.approvalInfo,
    data: loanApplyId,
    success: function (res) {
      var financial = [];
      var template = function (name, label) {
        return '<div class="input-tip">' +
          '<label class="control-label col-md-3 col-xs-3 col-sm-3">' + label + '</label>' +
          '<div class="col-md-5 col-xs-5 col-sm-5">' +
          '<input type="text" name="' + name + '" class="form-control">' +
          '</div>' +
          '</div>';
      };
      if (res.data.loanType == 7) {
        if (res.data.isPurchaseTaxFee == 1) {
          financial.push(template('fusePurchaseTaxFee', '车辆购置税（融贷):'));
        }
        if (res.data.isInsuranceFee == 1) {
          financial.push(template('fuseInsuranceFee', '保费 (融贷)'));
        }
        if (res.data.isGpsFee == 1) {
          financial.push(template('fuseGpsFee', '服务费'));
        }
        $('#financialLoan').html(financial.join(''));
      }

      if (res.data.carType == 2) {
        $("#sc-isAdvance").show();
      }
      discountCaseId = res.data.discountCaseId ? res.data.discountCaseId : '';

      if (res.data.maritalStatus != 1) {
        $("#isMaritalStatus").removeClass("hide");
      }
      if (res.data.freeDoor == '1') {
        $("#isFreeDoor").removeClass("hide");
      }

      newDealerId = res.data.dealerId;
      $("#approvalInfoForm").values(res.data);

      //获取渠道商ID和遍历      
      if (res.data.channelDealerId) {
        $("input[name='channelDealerId']").val(res.data.channelDealerId);
        $("input[name='channelDealerName']").val(res.data.channelDealerName);
        $('#channelDealerId').channelDealer(res.data.orgId, res.data.channelDealerId);
      } else {
        $('#channelDealerId').channelDealer(res.data.orgId);
      }
      $('#channelDealerId').bind('change', function () {
        $("input[name='channelDealerId']").val($(this).val());
        $("input[name='channelDealerName']").val($("#channelDealerId option:selected").text());
      });

      if (args['currentNodeKey'] !== 'LOAN_FINANCE_EXECUTIVE') {
        $('#channelDealerId').attr("disabled", true)
      }

      var dataArr = [
        ["#econtractStatus", "EcontractStatus", res.data.econtractStatus],
        ["#customerSource", "CustomerSource", res.data.customerSource],
        ["#loanTerm", "LoanTerm", res.data.loanTerm]
      ];
      $.getCommonMethodPort(dataArr);
    }
  });
}

$(function () {
  //流程意见-同意不同意单选按钮点击事件
  $("input[name='conclusion']").on('click', function () {
    var checkedV = $("input[name='conclusion']:checked").val();
    if (checkedV == 1) {
      $("#btn-opinion-save").show();
      $("#btn-loanReview-back").hide();
    } else {
      $("#btn-opinion-save").hide();
      $("#btn-loanReview-back").show();
    }
  });

  //流程意见-提交
  $("#btn-opinion-save").click(function () {
    if ($('#isChange').val() != 'saved') {
      return tip({
        content: '请先保存预算单'
      })
    }

    $("#opinionForm").validate();
    if ($("#opinionForm").valid() == true) {
      oppSureModal("是否确认提交");
      $("#sureOption").unbind("click").click(function () {
        //保存流程意见
        comn.ajax({
          url: interUrl.common.opinion,
          data: $.extend($("#opinionForm").values(), argsBopInfoId),
          success: function (res) {
            $("#sureModal").modal("hide");
            flowSubmit(interUrl.miniCarLoan.preSubmit, interUrl.miniCarLoan.submit2next, './Modal/task/myTask/index.html', loanApplyId);
          }
        });
      })
    }
  });

  //退回上一步
  $("#btn-loanReview-back").click(function () {
    $("#opinionForm").validate();
    if ($("#opinionForm").valid() == true) {
      oppSureModal("是否确认退回");
      $("#sureOption").unbind("click").click(function () {
        //保存流程意见
        comn.ajax({
          url: interUrl.common.opinion,
          data: $.extend($("#opinionForm").values(), argsBopInfoId),
          success: function (res) {
            $("#sureModal").modal("hide");
            flowBack4Pre();
          }
        });
      })
    }
  });

  //流程意见保存按钮
  $("#saveBtn").click(function () {
    oppSureModal("是否确认保存");
    $("#sureOption").unbind("click").click(function () {
      comn.ajax({
        url: interUrl.common.opinionOnly,
        data: $.extend($("#opinionForm").values(), argsBopInfoId),
        success: function (res) {
          $("#sureModal").modal("hide");
          tip({
            content: "保存成功！"
          });
        }
      });
    });
  });

  //首次加载执行方法
  changeFlowTitle();
  showisShowWarning();
  getOpinionText();
  getApprovalInfo();
  getGpsInfo();
})