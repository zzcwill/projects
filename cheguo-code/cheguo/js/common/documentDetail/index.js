var args, base64, cureent_dir, freeObj, getDocumentList, getSelectImage, loadTree,treeObj, targetDir, treeTarget, zTreeOnClick, allImg,reviewLen, imgIds = {};

  //有标识为银行文件按钮的缩略图-查看大图所选中的index
var bankMarkIndex = '';


jQuery.browser = {};
var m = {}, args = args || comn.getArgs();
if (args["type"] === "assetAdd") {
  args["projectId"] = _projectId;
  args["loanApplyId"] = _loanApplyId;
}
if (args["type"] === "assetView") {
    $("#addContract, #cancleContract").addClass("hide");
}

m.loanApplyId = args['id'] || args['loanApplyId'];
(function() {
  jQuery.browser.msie = false;
  jQuery.browser.version = 0;
  if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
    jQuery.browser.msie = true;
    return jQuery.browser.version = RegExp.$1;
  }


  freeObj = null;

  treeTarget = null;

  cureent_dir = null;

  getDocumentList = null;

  targetDir = null;

  imgType = null;

  //发票识别业务逻辑方法
  invoiceIdentifyWay = null
  //发票识别的图片查看
  var pictures2 = document.querySelector('#myCarousel');
  var viewer2
  var options2 = {
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
  //发票识别的图片查看

  var pictures = document.querySelector('#documentList');
  var viewer;
  var options = {
    url: 'data-original',
    title: true,
    transition: false,
    build: function (e) {},
    built: function(e){},
    show:  function (e) {
      imgIds = {};
      window.parent.toggleTopNav();
    },
    view:  function (e) {
      var _index = e.detail.index, item = $(viewer.images[_index]).parents(".file").data("file");
      if(item.hasRead == 1){
        if(!imgIds[item.dirId]){
          imgIds[item.dirId] = [];
        }
        if(imgIds[item.dirId].indexOf(item.id) == -1){
          imgIds[item.dirId].push(item.id);
        }
      }

      //缩略图切换-银行标识也跟着切换
      bankMarkIndex = _index;
      if($('#documentList .file .image').eq(bankMarkIndex).children('.bankTag').length){
        $('#sendBankDone').removeClass('hidden');
      }else{
        $('#sendBankDone').addClass('hidden');
      }

    },
    viewed: function(e){},
    hide: function(e){
      window.parent.toggleTopNav();
      $('#sendBankBox').addClass('hidden');
    },
    hidden: function(e){
      for(item in imgIds){
        $.each(imgIds[item], function(index, item){
          $($("#documentList")).find(".file[data-id='"+ item +"']").find(".glyphicon").css("color", "#1ab394");
        });
        comn.ajax({
          url: interUrl.gr.recordDocQueryHistory,
          type: "post",
          data: {
            loanApplyId: m.loanApplyId,
            dirId: item,
            fileNamespace: args['space'] || "",
            releventFlow: args['releventFlow'] || "",
            releventFlowNode: args['releventFlowNode'] || "",
            docIds: imgIds[item].join(",")
          },
          success: function(res){ }
        });
      }
    }
  };

  base64 = function(file, index, callback) {
    return lrz(file).then(function(rst) {
      var imgRst;
      imgRst = rst.base64;
      return typeof callback === "function" ? callback(file, imgRst, index) : void 0;
    });
  };

  imgListHtml = function(o, list){
    $("#addressCompare").addClass('disabled');
    if(o.id==10205 || o.id==10203 || o.id==10201 || o.id==10307 || o.id==10304 || o.id==10305){
      $("#addressCompare").removeClass("hidden");
      if(list.length>0){
        $("#savePlace").removeClass('hidden');
          if(list[0].keepAddr && list[0].keepUserName){
              $('#savePlace').html("<p>保管地:&nbsp;"+list[0].keepAddr+"&nbsp;&nbsp;&nbsp;保管员:&nbsp;"+list[0].keepUserName+"</p>")
          }
      }else{
        $("#savePlace").addClass('hidden');
      }
    }else{
      $("#addressCompare").addClass("hidden");
      $("#savePlace").addClass('hidden');
    }
    //pdf 暂不做批量打印，根据第一条的fileType判断是否是pdf
      if(list[0] && list[0].fileType && list[0].fileType == "4") {
          $("#btnPrint").addClass("hide");
      }
    results = [];
    for (j = 0, len = list.length; j < len; j++) {
      item = list[j];
      //console.log(item);
      results.push([
        item.fileType== "1" ? "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6'>" : "<div class='col-xs-8 col-sm-8 col-md-8 col-lg-8'>",
        "<div class='file' data-file='" + (JSON.stringify(item)) + "' data-id='"+ item.id +"'>",
        "<div class='image text-center' data-id='" + item.id + "' style='position: relative; height: auto;'>",
        item.fileType == "1" ?
        "<img data-original='"+ item.filePath +"' alt='"+ item.fileName +"' src='" + item.filePath + "?x-oss-process=image/resize,h_100' height='100' />" : ( item.fileType == "2" ? [
          "<video class='video-js vjs-default-skin' controls preload='none' data-setup='{}'>",
          "<source src='" + item.filePath + "' type='video/mp4' />",
          "</video>"
        ].join("") : (item.fileType == "4" ? "<div class='pdfImg' data-original='"+ item.filePath +"' alt='"+ item.fileName +"'></div>" : "")),
        imgType == "deleted" ?
            ["<div style='position: absolute; top:0; left:0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.3); color: red;'> ",
              "<h5 class='text-center'>【" + item.modifyRealname + "】</h5>",
              "<h5 class='text-center'>" + item.modifyTime + "</h5>",
              "<h5 class='text-center'>已删除</h5>",
              "</div>"].join("") : "",
        item.bankDocSign  == "1" ?
        ["<div class='bankTag' style='width: 40px;height: 20px;position: absolute; top: 5px;right: 5px;color: red;'> ",
          "已标识",
          "</div>"].join("") : "",
        "</div>",
        "<div class='file-name' style='text-overflow: ellipsis; overflow: hidden;'>",
        "<p style='text-overflow: ellipsis; overflow: hidden; white-space: nowrap;' title='"+ item.fileName +"'>" + item.fileName + "</p>",
          // item.userName ? "<p>上传人："+ item.userName +"</p>" : "",
        "<div>",
        "<i class='glyphicon glyphicon-eye-open' style='color: " + (item.hasRead === 1 ? "#CCD5D3" : "#1ab394") + ";'></i>",
        cureent_dir.canDelete === 1 || cureent_dir.canMove === 1 ? "<input type='checkbox' name='pic' class='pull-right' value='" + item.id + "' style='margin: 0;' />" : "<input type='checkbox' name='pic' class='pull-right' value='" + item.id + "' style='margin: 0;' />",
        "</div>",
        "</div>",
        "</div>",
        "</div>"
      ].join(""));
    }

    //资产包管理-资产包管理-查看详情-文档详情-要加图片全选按钮
    var picTitleButton = '';
    if(args["showLogoDelete"] === '1') {
      var picTitleButton = "<input type='checkbox' class='pic-all' />";
    }

    return [
      "<h4 class='section-title'>",
        o.title,
        picTitleButton,
      "</h4>",
      "<div class='row'>",
      (results.join("") || "<div class='col-xs-24 col-sm-24 col-md-24 col-lg-24 text-center'><h2>暂无图片!</h2></div>"),
      "</div>"
    ].join("");
  }

  //获得车类型新车还是二手车和车信息
  function getCarInfo() {
    //发票识别选项卡需要用的信息，如果是二手车评估流程不调用
    if(args['releventFlow'] !== 'SECOND_HAND_CAR_ESTIMATE_FLOW'){
      // 贷款基本信息
      $.ajax({
        url: interUrl.basic + interUrl.loanDetail.loanGet,
        type: "POST",
        dataType: "json",
        data: {
          loanApplyId: args['id'] || args['loanApplyId']
        },
        async: false,
        success: function(res) {
          if(res.code === 20000){
            return
          }
          args['carType'] = res.data.carType;
          args['provinceCode'] = res.data.provinceCode;
          args['provinceName'] = res.data.provinceName;
          args['cityCode'] = res.data.cityCode;
          args['cityName'] = res.data.cityName;
          args['carModelName'] = res.data.carModelName;

          args['projectId']= res.data.projectId;

          //获得车开票价格
          function getWarnBillingPrice() {
            comn.ajax({
              url: interUrl.loanDetail.getLoanFeeInfoInfoQuery,
              data: {projectId:args['projectId']},
              success: function (res) {
                args['warnBillingPrice'] = res.data.billingPrice;
              }
            });
          }
          getWarnBillingPrice();

        }
      });
    }
  }
  getCarInfo();

  //获取当前用户名接口
  function getUserName() {
    comn.ajax({
      url: interUrl.user.getUser,
      data: {
      },
      async: false,
      success: function(res) {
        args['userName'] = res.data.realname;
        //console.log(args)
      }
    });
  }
  getUserName();

  //判断是否显示发票识别选项卡目录
  function judgeInvoiceTab() {
    var carType = args['carType'];
    //新车原件目录和 新车复印件目录显示发票按钮选项卡
    if((carType == '1') && (cureent_dir.id === 10401)){
      $('#invoiceIdentifyTab').removeClass('hide');
      //有发票识别，默认点击发票识别
      $("#invoiceIdentifyTab a").trigger("click");
      return;
    }

    if((carType == '1') && (cureent_dir.id === 10304)){
        if((args['releventFlow'] !== 'DOCUMENT_TRANSMIT_FLOW') && (args['releventFlowNode'] !== 'DOCUMENT_VERIFY')){
          $('#invoiceIdentifyTab').removeClass('hide');
          //有发票识别，默认点击发票识别
          $("#invoiceIdentifyTab a").trigger("click");
          return;
        }
    }

    $('#invoiceIdentifyTab').addClass('hide');
    $("#thumbnailTab").trigger("click");
  }

  //文件上传删除，发票识别默认展示方法
  invoiceIdentifyWay = function() {

      //发票图片列表缩略图显示
      function showInvoiceImgList(arr){
          if(arr.length === 0){
            return
          }

          var str = '';
          var dom = $('.invoice-img-inner');
          $('.invoice-img-inner').html('');

          for(var i = 0 ; i < arr.length ; i++){
            var zindex = i === 0 ? '' : 'hide';
            str =  str +
    '            <div class="invoice-img ' + zindex + '">'+
    '                <img src="' + arr[i].filePath + '" data-id="' + arr[i].id + '">'+
    '                <span class=""></span>'+
    '            </div>'
          }

          //图片列表有多张显示切换按钮
          if(arr.length > 1) {
            $('.invoice-img-left').removeClass('hide');
            $('.invoice-img-right').removeClass('hide');
          }else{
            $('.invoice-img-left').addClass('hide');
            $('.invoice-img-right').addClass('hide');
          }

          dom.append(str);

          //点击图片查看插件
          if(viewer2){
            viewer2.destroy();
          }
          viewer2 = new Viewer(pictures2, options2);

          searchInvoiceImgInfo();


          //发票识别-图片相关方法
          //发票信息展示方法和发票信息展示保存预警记录方法  data数据;showType  1查询 2验真显示
          function showInvoiceImgInfoList(data,showType) {
            //console.log(data);
            //列表信息初始化
            $('#btn-know').removeClass('hide');
            $('#invoiceInfobase').removeClass('hide');

            $('#invoiceInfo').addClass('hide');
            $('#invoiceInfo2').addClass('hide');
            $('#invoiceInfo3').addClass('hide');
            $('#invoiceInfo4').addClass('hide');
            $('#invoiceInfo5').addClass('hide');
            $('#invoiceInfo6').addClass('hide');
            $('#invoiceInfo2 span').eq(0).removeClass('glyphicon-ok').removeClass('glyphicon-remove');
            $('#invoiceInfo3 span').eq(0).removeClass('glyphicon-ok').removeClass('glyphicon-remove');
            $('#invoiceInfo4 span').eq(0).removeClass('glyphicon-ok').removeClass('glyphicon-remove');
            $('#invoiceInfo6 span').eq(0).removeClass('glyphicon-ok').removeClass('glyphicon-remove');
            $('#myCarousel .invoice-img-inner .invoice-img span').removeClass('pass').removeClass('no-pass');
            $('#redPrice').removeClass('text-danger');
            $('#redBuyer').removeClass('text-danger');

            //showType=1查询的时候 清空识别四要素
            if(showType === 1) {
              $("#invoiceForm input[name='billDate']").val('');
              $("#invoiceForm input[name='invoiceCode']").val('');
              $("#invoiceForm input[name='invoiceNo']").val('');
              $("#invoiceForm input[name='invoiceAmount']").val('');
            }

            //获取当前图片index
            var index = getInvoiceIndex();

            //如果没有invoiceVertifyFlag参数 禁止修改
            if(!args['invoiceVertifyFlag']){
              $('#btn-know').addClass('hide');
              $('#invoiceInfobase').addClass('hide');
            }

            //没有发票验证过
            if(!data){
              return
            }

            //发票识别四要素显示
            if(data.identifyInfo){
              //发票识别四要素显示
              $("#invoiceForm").values(data.identifyInfo);
              $("#invoiceForm input[name='invoiceAmount']").val(data.identifyInfo.invoiceAmountStr);
            }

            //发票信息是否真实
            if(data.realStatusType === 1){
              $('#invoiceInfo2').removeClass('hide');
              $('#invoiceInfo2 span').eq(0).addClass('glyphicon-ok');
              $('#invoiceForm2').values(data.invoiceInfo);
            }else{
              $('#invoiceInfo').removeClass('hide');
              $('#invoiceInfo span').eq(1).text(data.realHint);
              $('#myCarousel .invoice-img-inner .invoice-img span').eq(index).addClass('no-pass');
              return;
            }

            //车价合计和车贷系统内信息是否一致
            if(data.priceStatusType !== undefined){
              $('#invoiceInfo3').removeClass('hide');
              $('#invoiceInfo3 span').eq(1).text(data.priceHint);
              if(data.redPrice == 1){
                $('#redPrice').addClass('text-danger');
              }
              if(data.priceStatusType === 1){
                $('#invoiceInfo3 span').eq(0).addClass('glyphicon-ok');
                //资料核对-发票金额是否与系统开票价一致打勾
                //先判断有没核对权限，在根据有返回的车价信息做判断
                if(byNameBackDom('发票金额是否与系统开票价一致')){
                  byNameBackDom('发票金额是否与系统开票价一致').eq(0).children('input').trigger("click");
                }
              }else{
                $('#invoiceInfo3 span').eq(0).addClass('glyphicon-remove');
                if(byNameBackDom('发票金额是否与系统开票价一致')){
                  byNameBackDom('发票金额是否与系统开票价一致').eq(1).children('input').trigger("click");
                }
              }
            }


            //资料核对自动选择核对信息需要方法
            //根据核对名称，返回dom
            function byNameBackDom(str) {
              var domArr = $('#documentCheckResultTable tbody tr');
              if(!domArr.length) {
                return
              }
              for(var i = 0 ; i < domArr.length ; i++) {
                if(domArr.eq(i).children('td').eq(0).text() === str){
                  return domArr.eq(i).children('td').eq(1).children('form').children('label');
                }
              }

              return ''
            }

            //购车人和车贷系统内信息是否一致
            if(data.buyerStatusType !== undefined) {
              $('#invoiceInfo4').removeClass('hide');
              $('#invoiceInfo4 span').eq(1).text(data.buyerHint);
              if(data.redBuyer == 1){
                $('#redBuyer').addClass('text-danger');
              }
              if(data.buyerStatusType === 1){
                $('#invoiceInfo4 span').eq(0).addClass('glyphicon-ok');
              }else{
                $('#invoiceInfo4 span').eq(0).addClass('glyphicon-remove');
              }
            }

            //发票原件和复印件信息是否一致
            if(data.invoiceStatusType !== undefined){
                $('#invoiceInfo6 span').eq(1).text(data.invoiceHint);
                if(data.invoiceStatusType === 1){
                  $('#invoiceInfo6 span').eq(0).addClass('glyphicon-ok');
                  //资料核对-发票原件与提交银行复印件信息是否一致
                  //资料核对-发票复印件是否与发票原件信息一致
                  if(byNameBackDom('发票原件与提交银行复印件信息是否一致')){
                    byNameBackDom('发票原件与提交银行复印件信息是否一致').eq(0).children('input').trigger("click");
                  }
                  if(byNameBackDom('发票复印件是否与发票原件信息一致')){
                    byNameBackDom('发票复印件是否与发票原件信息一致').eq(0).children('input').trigger("click");
                  }
                }else{
                  $('#invoiceInfo6').removeClass('hide');
                  $('#invoiceInfo6 span').eq(0).addClass('glyphicon-remove');
                  if(byNameBackDom('发票原件与提交银行复印件信息是否一致')){
                    byNameBackDom('发票原件与提交银行复印件信息是否一致').eq(1).children('input').trigger("click");
                  }
                  if(byNameBackDom('发票复印件是否与发票原件信息一致')){
                    byNameBackDom('发票复印件是否与发票原件信息一致').eq(1).children('input').trigger("click");
                  }
                }
            }

            //车价预警展示
            if(data.isPass === undefined){
              return
            }
            if((data.invoiceStatusType !== undefined) && (data.invoiceStatusType === 2)){
              return
            }
            getRecordWarnStatus(showType,data.isPass);

          }
          //计算报警记录方法    type  1查询展示; 2发票验真展示并保存记录   isPass 1发票后端校验通过 和  0不通过
          function getRecordWarnStatus(type,isPass) {
            $.ajax({
              url: interUrl.basic + interUrl.loanDetail.getVinInfo,
              type: "POST",
              dataType: "json",
              data: {
                vin: $('#invoiceForm2 input[name=vin]').val(),
                applyId: args["loanApplyId"],
                provinceCode: args['provinceCode'],
                provinceName: args['provinceName'],
                cityCode: args['cityCode'],
                cityName: args['cityName']
              },
              success: function(res) {
                  if(res.code === 10000) {
                    $("input[name=newPrice]").val(res.data.vinCarInfoList[0].newPrice || '');//新车优惠价
                  }

                  $("#warnBillingPrice").val(args['warnBillingPrice']);//开票价

                  var status = warnLevel();

                  //是否显示报警
                  if(status === 3){
                    $('#invoiceInfo5').addClass('hide')
                  }else{
                    $('#invoiceInfo5').removeClass('hide')
                  }

                  //发票验真状态图标是否显示
                  //获取当前图片index
                  var index = getInvoiceIndex();
                  if((isPass === 1) && ((status === 0) || (status === 3))){
                      $('#myCarousel .invoice-img-inner .invoice-img span').eq(index).addClass('pass');
                  }else{
                      $('#myCarousel .invoice-img-inner .invoice-img span').eq(index).addClass('no-pass');
                  }

                  if((type === 2) && (status !== 0)){
                    saveInvoiceRecordWarnStatusApi(status)
                  }
              }
            });
          }

          //显示预警结果并且返回预警类型
          function warnLevel(){
              $("#invoiceForm3 input[name=carModelName]").val(args['carModelName']);
              $("#invoiceForm3 input[name=userName]").val(args['userName']);

              //预警类型
              var warnLevel = 0;

              var billingPrice= $("#invoiceForm3 #warnBillingPrice").val();
              var newPrice=$("#invoiceForm3 input[name=newPrice]").val();
              if(newPrice === ''){
                warnLevel = 3
                return warnLevel
              }
              if(newPrice && newPrice > 0){
                var level=(billingPrice-newPrice)/newPrice*100;
                if(level<20 &&level>5){
                  $("input[name=warnLevel]").val("黄色预警");
                  $("input[name=warnResult]").val("系统预算单开票价高于第一车网新车优惠价5%，请审批员核实!");
                  warnLevel = 2;
                  return warnLevel
                }
                if(level>20){
                  $("input[name=warnLevel]").val("红色预警");
                  $("input[name=warnResult]").val("系统预算单开票价高于第一车网市场成交价20%，请审批员核实!");
                  warnLevel = 1
                  return warnLevel
                }

                $("input[name=warnLevel]").val("正常");
                $("input[name=warnResult]").val("正常");
                return warnLevel

              }
          }



          //保存报警记录
          function saveInvoiceRecordWarnStatusApi(warnStatusType) {
            //获取当前图片
            var index = getInvoiceIndex();
            var pictureId = $('#myCarousel .invoice-img-inner .invoice-img img').eq(index).attr('data-id');

            comn.ajax({
              url: interUrl.invoice.invoiceRecordWarnStatus,
              data: {
                invoiceDir:cureent_dir.id,
                projectId: args['projectId'],
                pictureId: pictureId,
                warnStatusType:warnStatusType,
              },
              //async: false,
              success: function(res) {
                  //console.log(res)
              }
            });
          }

          //发票图片查询
          function searchInvoiceImgInfo() {
            //获取当前图片
            var index = getInvoiceIndex();
            var pictureId = $('#myCarousel .invoice-img-inner .invoice-img img').eq(index).attr('data-id');

            var invoiceVertifyFlag =  args['invoiceVertifyFlag'] ? args['invoiceVertifyFlag'] : '0';
            comn.ajax({
              url: interUrl.invoice.invoiceGet,
              data: {
                projectId: args['projectId'],
                pictureId: pictureId,
                invoiceVertifyFlag: invoiceVertifyFlag,
              },
              async: false,
              success: function(res) {
                  showInvoiceImgInfoList(res.data,1);
              }
            });
          }

          //发票图片识别方法
          function invoiceIdentifyApi() {
            //获取当前图片id
            var index = getInvoiceIndex();
            var pictureId = $('#myCarousel .invoice-img-inner .invoice-img img').eq(index).attr('data-id');

            comn.ajax({
              url: interUrl.invoice.invoiceIdentify,
              data: {
                projectId: args['projectId'],
                pictureId: pictureId
              },
              //async: false,
              success: function(res) {
                if(res.data){
                  if(res.data.identifyStatus === 1){
                    $("#invoiceForm input[name='billDate']").val(res.data.billDateStr);
                    $("#invoiceForm input[name='invoiceCode']").val(res.data.invoiceCode);
                    $("#invoiceForm input[name='invoiceNo']").val(res.data.invoiceNo);
                    $("#invoiceForm input[name='invoiceAmount']").val(res.data.invoiceAmountStr);
                  }else{
                    $("#invoiceForm input[name='billDate']").val('');
                    $("#invoiceForm input[name='invoiceCode']").val('');
                    $("#invoiceForm input[name='invoiceNo']").val('');
                    $("#invoiceForm input[name='invoiceAmount']").val('');
                      tip({
                          content:"发票无法正常识别"
                      })
                  }
                }
              },
              error: function(textStatus) {
                if(textStatus === 'timeout'){
                    tip({
                        content:"网络异常，请稍后再试"
                    })
                }
              }
            });
          }

          //发票识别验真方法
          function invoiceVertifyApi() {
            //获取当前图片id
            var index = getInvoiceIndex();
            var pictureId = $('#myCarousel .invoice-img-inner .invoice-img img').eq(index).attr('data-id');

            $("#invoiceForm").validate();
            if ($("#invoiceForm").valid() == true) {
              //正则校验四要素
              function regInvoiceFour() {
                function judgeInvoiceCode(str) {
                    var reg = /^\d{12}$/
                    return reg.test(str)
                }

                function judgeInvoiceNo(str) {
                    var reg = /^\d{8}$/
                    return reg.test(str)
                }

                function judgeIvoiceAmount(str) {
                    var reg = /(?!0\.00)(\d+\.\d{2}$)/
                    return reg.test(str)
                }
                var invoiceCode = $("#invoiceForm input[name='invoiceCode']").val();
                var invoiceNo = $("#invoiceForm input[name='invoiceNo']").val();
                var invoiceAmount = $("#invoiceForm input[name='invoiceAmount']").val();

                if (!judgeInvoiceCode(invoiceCode)) {
                    tip({
                        content: '请输入12位数字发票代码'
                    });
                    return false;
                }

                if (!judgeInvoiceNo(invoiceNo)) {
                    tip({
                        content: '请输入8位数字发票号码'
                    });
                    return false;
                }

                if (!judgeIvoiceAmount(invoiceAmount)) {
                    tip({
                        content: '请输入不含税金额(两位小数点)'
                    });
                    return false;
                }

                return true;
              }

              //发票票面信息检验
              if(!regInvoiceFour()){
                return;
              }

              comn.ajax({
                url: interUrl.invoice.invoiceVertify,
                data: $.extend($("#invoiceForm").values(), {
                  invoiceDir:cureent_dir.id,
                  projectId: args['projectId'],
                  invoiceVertifyFlag: args['invoiceVertifyFlag'],
                  pictureId:pictureId,
                }),
                //async: false,
                success: function(res) {
                  if(res.data){
                     showInvoiceImgInfoList(res.data,2);
                  }
                }
              });
            }

          }

          //获取当前轮播值
          function getInvoiceIndex() {
            var imgDom = $('#myCarousel .invoice-img-inner .invoice-img');
            for(var j=0 ; j< imgDom.length ; j++) {
              if(!imgDom.eq(j).hasClass('hide')) {
                var index = j
              }
            }
            return index
          }

          //轮播向左按钮
          $("#myCarousel .invoice-img-left").unbind("click").on("click", function() {
            //轮播dom操作
            var imgDom = $('#myCarousel .invoice-img-inner .invoice-img');
            var index = getInvoiceIndex();

            if(index === 0){
              index = imgDom.length -1
            }else{
              index = index -1
            }
            $('#myCarousel .invoice-img-inner .invoice-img').addClass('hide');
            $('#myCarousel .invoice-img-inner .invoice-img').eq(index).removeClass('hide').fadeIn();

            searchInvoiceImgInfo();
          });

          //轮播向右按钮
          $("#myCarousel .invoice-img-right").unbind("click").on("click", function() {
            //轮播dom操作
            var imgDom = $('#myCarousel .invoice-img-inner .invoice-img');
            var index = getInvoiceIndex();

            if(index === (imgDom.length-1)){
              index = 0
            }else{
              index = index + 1
            }
            $('#myCarousel .invoice-img-inner .invoice-img').addClass('hide');
            $('#myCarousel .invoice-img-inner .invoice-img').eq(index).removeClass('hide').fadeIn();


            searchInvoiceImgInfo();
          });

          $('#btn-know').unbind("click").on("click",function(){
            invoiceIdentifyApi();
          });
          $('#btn-true').unbind("click").on("click",function(){
            invoiceVertifyApi();
          });
      }

      //获取发票识别缩略图列表api
      function getInvoiceImg() {
          var url = interUrl.gr.documentList;
          var data = {
              loanApplyId: m.loanApplyId,
              outRefType: cureent_dir.outRefType || '',
              dirId: cureent_dir['id'],
              fileNamespace: args['space'] || "",
              releventFlow: args['releventFlow'] || "",
              releventFlowNode: args['releventFlowNode'] || "",
              type: '',
              assetsPackageId: args["assetsPackageId"] || "",
              coCompanyId: args["coCompanyId"] || "",
              page: 1,
              pageSize: 1000000
          }
          comn.ajax({
            url: url,
            data: data,
            async: false,
            success: function(res) {
              if(!res.data.length){
                $('#haveInvoiceImg').addClass('hide');
                $('#noInvoiceImg').removeClass('hide');
              }else{
                $('#noInvoiceImg').addClass('hide');
                $('#haveInvoiceImg').removeClass('hide');
                showInvoiceImgList(res.data);
              }
            }
          });
      }

      //上面定义方法，下面逻辑执行
      //新车和新车发票原件和新车复印件才调发票图片列表接口
      if((args['carType'] == '1') && ((cureent_dir.id === 10304) || (cureent_dir.id === 10401))){
        getInvoiceImg();
      }
  }


  zTreeOnClick = function(event, treeId, treeNod) {
    var page;
    $("#fileList tbody").html("");
    cureent_dir = treeNod;

    //选项卡是否显示
    judgeInvoiceTab();
    //发票识别逻辑判断
    invoiceIdentifyWay();



    //if (!treeNod.isParent) {
    if (true) {
      if (treeNod.docType === "1" || treeNod.outRefType === "bank") { //银行状态时，不可上传视频
        $("#upMovie").addClass("hide");
      } else if (treeNod.docType === "2") {
        $("#upMovie").removeClass("hide");
      }
      $("#upImage, #removed").removeClass("disabled");
      $("#copyImage, #moveImage, #delImage").addClass("disabled");
      $("#removed").html("<span>查看已删除影像</span>");
      //console.log(cureent_dir);
      if (args['space'] === 'ASSET_MANAGE_PACKAGE' && cureent_dir.ifAssetManageCatalog !== 'undefined') {
          if (cureent_dir.ifAssetManageCatalog === false) {
              $("#addContract").removeClass("hidden");
              $("#cancleContract").addClass("hidden");
          } else {
              $("#addContract").addClass("hidden");
              $("#cancleContract").removeClass("hidden");
          }
      }

      page = 0;
      imgType = null;
      $("#documentList").html("");
      getDocumentList = function(o) {
        page = (o && o.curPage) || ++page;
        if (page === 1) {
          $("#documentList").html("");
        }
        var _url, _data = {};
        //如果是资产对接进入并存在ifAssetManageCatalog
        if (args['space'] === 'ASSET_MANAGE_PACKAGE' && cureent_dir.ifAssetManageCatalog !== 'undefined' && cureent_dir.ifAssetManageCatalog === true) {
            _url = interUrl.gr.getLoanDocumentAssetListByDirId;
            _data = {
                fileNamespace: args["space"],
                dirId: cureent_dir['id'],
                coCompanyId: args["coCompanyId"],
                isInuse: "1",
                objectNo: args["projectId"]
            }
        } else {
            _url = (o && o.url) || interUrl.gr.documentList;
            _data = {
                loanApplyId: m.loanApplyId,
                outRefType: cureent_dir.outRefType || '',
                dirId: cureent_dir['id'],
                fileNamespace: args['space'] || "",
                releventFlow: args['releventFlow'] || "",
                releventFlowNode: args['releventFlowNode'] || "",
                type: imgType,
                assetsPackageId: args["assetsPackageId"] || "",
                coCompanyId: args["coCompanyId"] || "",
                page: page || 1,
                pageSize: 1000000
            }
        }
        return comn.ajax({
          url: _url,
          data: _data,
          success: function(res) {
            var item;
              if (cureent_dir.pid === 40) { //资产对接不显示删除按钮
                  $("#copyImage, #moveImage, #delImage, #removed").addClass("hide");
              } else {
                  $("#copyImage, #moveImage, #delImage, #removed").removeClass("hide");
              }
            if (cureent_dir.canUpload === 2) {
              $("#upImage, #upload, #upMovie").addClass("hide");
            } else {
              if(cureent_dir.docType == "1"){
                $("#upImage, #upload").removeClass("hide");
              }else if(cureent_dir.docType == "2"){
                $("#upImage, #upload").addClass("hide");
                $("#upMovie").removeClass("hide");
              }
            }
            if (cureent_dir.canDelete === 2) {
              $("#delImage, #removed").addClass("hidden");
            } else {
              $("#delImage, #removed").removeClass("hidden");
            }
            if (cureent_dir.canMove === 2) {
              $("#copyImage, #moveImage").hide();
            } else {
              $("#copyImage, #moveImage").show();
            }
            if (page === 1) {
              $("#copyImage, #moveImage, #delImage, #btnPrint, #sendContract").addClass("disabled");
            }
            if([301, 30, 105, 40101].indexOf(cureent_dir.id) != -1 || cureent_dir.outRefType == 'bank'){
              $("#sendBanck, #sendContract, #signDatum").addClass("hidden");
              $("#delImage").html("<span>取消标识文件</span>");
              $("#delDocument").find(".modal-body h4").text("确定取消文件标识?");
              if(imgType != "deleted"){
                if(($.inArray(args['releventFlowNode'], ["LOAN_CAR_FINANCE"]) != -1) && args['releventFlow'] == "LOAN_APPLY_FLOW"){
                  $("#removed").html("<span>查看已取消资产方可见文件</span>");
                  $("#delImage").html("<span>取消资产分发可见</span>")
                  $("#delDocument").find(".modal-body h4").text("确定取消资产分发可见?");
                }else{
                  $("#removed").html("<span>查看已取消标识文件</span>");
                }
              }
            }else{
              if((args['releventFlowNode'] === "DOCUMENT_VERIFY" || args['releventFlowNode'] === "COPY_CONTRACT" || args['releventFlowNode'] === "DOCUMENT_REVIEW") && args['releventFlow'] === "DOCUMENT_TRANSMIT_FLOW" || (args["releventFlow"] === "CAR_PLEDGE_REGIST_FLOW" && args["type"] !== "show")){
                $("#sendBanck").removeClass("hidden");
              }else if(args['releventFlow'] == "INSURANCE_DISPATCHN_FLOW" && args['releventFlowNode'] == "INSURANCE_DISPATCHN_LAUNCH"){ //保险分发流程第一个节点(保险发起)
                $("#signDatum").removeClass("hidden");
              }else if(($.inArray(args['releventFlowNode'], ["LOAN_CAR_FINANCE"]) != -1) && args['releventFlow'] == "LOAN_APPLY_FLOW"){
                $("#sendContract").removeClass("hidden");
              }

              $("#delImage").html("<span>删除文件</span>");
              $("#delDocument").find(".modal-body h4").text("确定删除当前文件？");
            }


            allImg = res.data;
            $("#documentList").html(function(){
              var html = "", list = res.data;
              if (!treeNod.isParent) {
                html += imgListHtml({title: cureent_dir.title,id:cureent_dir.id}, list);
              }else{
                for (var i = 0, len = list.length; i < len; i++) {
                  html += imgListHtml({title: list[i].directoryPath }, list[i].loanDocumentVoList);
                }
              }
              return html;
            });
            if(viewer){
              viewer.destroy();
            }
            viewer = new Viewer(pictures, options);

            //资产包管理-资产包管理-查看详情-文档详情-图片标题旁边的按钮全选功能点击事件start
            $('.pic-all').on('click',function(){
              var index = $('.pic-all').index($(this));
              var isAllChoose = $('.pic-all').eq(index).prop('checked');
              var length = $('#documentList .row').eq(index).children('.col-xs-6').children('.file').children('.file-name').children('div').children('input').length;

              if(isAllChoose) {
                for(var i = 0 ; i < length ; i++) {
                  if(!$('#documentList .row').eq(index).children('.col-xs-6').children('.file').children('.file-name').children('div').children('input').eq(i).prop('checked')) {
                    $('#documentList .row').eq(index).children('.col-xs-6').children('.file').children('.file-name').children('div').children('input').eq(i).trigger("click");
                  }
                }
              }

              if(!isAllChoose) {
                for(var i = 0 ; i < length ; i++) {
                  if($('#documentList .row').eq(index).children('.col-xs-6').children('.file').children('.file-name').children('div').children('input').eq(i).prop('checked')) {
                    $('#documentList .row').eq(index).children('.col-xs-6').children('.file').children('.file-name').children('div').children('input').eq(i).trigger("click");
                  }
                }
              }
            });
            //资产包管理-资产包管理-查看详情-文档详情-图片标题旁边的按钮全选功能点击事件end

            //文档传递流程-有标识为银行的按钮的-查看缩略图大图 增加标识为银行文件按钮
            $('#documentList .file .image img').bind('click',function(){
              //满足下面条件，显示查看大图的银行文件标识按钮
              if((args['releventFlowNode'] == "DOCUMENT_VERIFY" || args['releventFlowNode'] == "COPY_CONTRACT" || args['releventFlowNode'] == "DOCUMENT_REVIEW") && args['releventFlow'] == "DOCUMENT_TRANSMIT_FLOW"){
                $('#sendBankBox').removeClass('hidden');
              }

              //查看大图-显示银行已标识
              if($(this).parent().children('.bankTag').length) {
                $('#sendBankDone').removeClass('hidden');
              }else{
                $('#sendBankDone').addClass('hidden');
              }

              //判断点击第几张缩略图
              bankMarkIndex = $('#documentList .file .image img').index(this);
              $('#sendBank').unbind('click').bind('click',function(){
                //查看大图-点击标识为银行文件时去掉其他图选中状态
                for(var i = 0 ; i < $('#documentList .file-name input').length ; i++){
                  if(bankMarkIndex !== i) {
                    var isCheck = $('#documentList .file-name input').eq(i).is(':checked');
                    if(isCheck){
                      $('#documentList .file-name input').eq(i).trigger('click');
                    }
                  }
                }

                //查看大图-控制当前图选中
                var isCheck = $('#documentList .file-name input').eq(bankMarkIndex).is(':checked');
                if(!isCheck){
                  $('#documentList .file-name input').eq(bankMarkIndex).trigger('click');
                }
                $('#sendBanck').trigger('click');
              });


            })
          }
        });
      };
      return getDocumentList();
    } else {
      return $("#upImage").addClass("disabled");
    }
  };

  getSelectImage = function() {
    var arr;
    arr = {
      id: [],
      item: []
    };
    $("#documentList .file-name").find("input[name='pic']:checked").each(function() {
      arr.id.push($(this).val());
      var src;
      if($(this).parents(".col-md-6").length){
        src = $(this).parents(".col-md-6");
      }else{
        src = $(this).parents(".col-md-8")
      }
      return arr.item.push(src);
    });
    return arr;
  };
  //$(document).on('click','.checkResult',function(){
  //  var val=$(this).find('input').val();
  //  if(val==3){
  //      $("#check").removeClass('hidden');
  //  }else{
  //    $("#check").addClass('hidden');
  //  }
  //});
  loadTree = function() {
    var url;
    $.fn.zTree.destroy();
    url = args['isFlow'] === "yes" ? interUrl.gr.documentDir : interUrl.gr.documentAllDir;
    return comn.ajax({
      url: url,
      data: {
        loanApplyId: m.loanApplyId,
        fileNamespace: args['space'] || "",
        releventFlow: args['releventFlow'] || "",
        releventFlowNode: args['releventFlowNode'] || "",
          assetsPackageId: args["assetsPackageId"] || "",
          coCompanyId: args["coCompanyId"] || ""
      },
      success: function(res) {
        if(args['loanFlag'] != '2'){
          $(".checkData").addClass("hidden");
        }else{
          comn.ajax({
            url: interUrl.gr.documentGetCheckStatus,
            data: {
              projectId: args['projectId']
            },
            success: function(res){
              //if(res.data.documentCheckStatus==3){
              //  $("#check").removeClass('hidden');
              //}

              $("input[name=documentCheckUserName]").val(window.parent.userName.innerHTML);
              //console.log(res.data)
              $("#checkForm, #checkForm1").values(res.data);
              if(!res.data.documentCheckDate) {
                  $("#documentCheckDate").getToday()
              }
              //$("#checkForm").values({
              //  documentCheckStatus: res.data.documentCheckStatus
              //  //documentKeepAddr:res.data.documentKeepAddr,
              //  //documentRmk:res.data.documentRmk,
              //  //documentCheckUserName:res.data.documentCheckUserName
              //});
            }
          })
        }
        treeObj = $.fn.zTree.init($("#tree"), {
          check: {
            enable: args['loanFlag']=='2',
            chkDisabledInherit: true,
            chkStyle: "checkbox"
          },
          data: {
            key: {
              checked: 'canTick'
            }
          },
          showLine: true,
          expand: true,
          callback: {
            onClick: zTreeOnClick
          }
        }, res.data);
        treeTarget = $.fn.zTree.init($("#targetTree"), {
          showLine: true,
          expand: true,
          callback: {
            onClick: function(event, treeId, treeNod) {
              if (!treeNod.isParent) {
                targetDir = treeNod;
                return $("#targetSure, #targetCopySure").removeClass("disabled");
              } else {
                return $("#targetSure, #targetCopySure").addClass("disabled");
              }
            }
          }
        }, res.data);

        treeTarget.expandAll(true);
        treeObj.expandAll(true);
        /*
        * 折叠目录
        * nodes: 所有目录
        * foldId: 折叠目录id  array/number
        * */
        function foldDir (nodes,foldId) {
          for(var i=0;i<nodes.length;i++){
            var o= nodes[i];
            var condition = Array.isArray(foldId) ? (foldId.indexOf(o.id) != -1) : (o.id === foldId);
            if(condition) {
              treeObj.expandNode(o,false,false,true)
            }else{
              foldDir(o.children,foldId);
            }
          }
        }
        if(args['releventFlowNode'] === 'ESTIMATE_LAUNCH') {
          return;
        }
        foldDir(treeObj.getNodes(),10111);
      }
    });
  };

  handle = function(o) {
    //针对补件-发票验证通过的发票无法删除
    function isDataCheck() {
      if((args['space'] === 'LOAN_PATCH') && (args['releventFlow'] === 'LOAN_PATCH') && (args['carType'] == '1') && ((cureent_dir.id === 10401) || (cureent_dir.id === 10304))){
        return  true
      }
      return false
    }
    //公用方法
    function commonFn() {
        comn.ajax({
            url: o.url || "",
            data: {
                loanApplyId: m.loanApplyId,
                dirId: o.dirId,
                destDirId: o.destDirId, //针对图片复制
                outRefType: o.outRefType || '',
                documentIds: getSelectImage()['id'].join(","),
                fileNamespace: args['space'] || "",
                releventFlow: args['releventFlow'] || "",
                releventFlowNode: args['releventFlowNode'] || ""
            },
            success: function(res) {
                var i, j, len, ref;

                //发票识别逻辑判断
                invoiceIdentifyWay();

                loadTree();
                ref = getSelectImage()['item'];
                //console.log(ref);
                for (j = 0, len = ref.length; j < len; j++) {
                    i = ref[j];
                    o.url === interUrl.gr.copyDocument ? '' : $(i).remove(); //图片复制不做移除操作；
                }
                $("#copyImage, #moveImage, #delImage").addClass("disabled");
                return typeof o.callback === "function" ? o.callback(res) : void 0;
            }
        });
    }
    function invoiceIsCanDelete() {
      return comn.ajax({
        url: interUrl.invoice.invoiceCanDelete,
        data: {
          projectId: args['projectId'],
          pictureIds: getSelectImage()['id'].join(",")
        },
        async: false,
        success: function(res) {
          //图片能否删除操作
           function showCanNotDelete(data) {
            var str = '';
            for (var j = 0 ; j < data.length; j++) {
              if(data[j].canDelete === 0) {
                str = str +  '图片名为' + data[j].pictureName + '，验证通过不能删除;<br>';
              }
            }

            if(str){
                tip({
                    content: str
                })
            }else{
                commonFn();

            }
            if(str){
                tip({
                    content: str
                })
            }else{
                commonFn();
            }
          }

          showCanNotDelete(res.data)
        }
      });
    }

    //console.log(isDataCheck())
    //不是补件下
    if(!isDataCheck()){
        commonFn();
    }else{
        invoiceIsCanDelete();//发票识别后再调用公用方法
    }
  };
})();
$(function() {
  loadTree();
  fromMortgage()
  $('#importCls').click(function() {
      layer.confirm('客户的贷前影像资料即将重新上传给银行，是否确认？', {
          width:600,
          btn: ['确 认', '取 消'] //按钮
      },function() {

      },function() {
        return
      })
  })
  $('#importDiya').click(function() {
      layer.confirm('客户的抵押影像资料即将重新上传给银行，是否确认？', {
          btn: ['确 认', '取 消'] //按钮
      },function() {

      },function() {
        return
      })
  })
  $(".checkbox-inline").click(function(){
    $(this).children("input").prop("checked", true);
  });
  $("#subTree").click(function(){
      $("#result1 form").map(function(){
          $(this).next("#result-error").remove();
      });
      var nodes = treeObj.getCheckedNodes(true), nodeArr = [];
      for (var i = 0, len = nodes.length; i < len; i++) {
       if(!nodes[i].isParent){
         nodeArr.push(nodes[i].id);
       }
      }
      var documentCheckStatus = $("input[name='documentCheckStatus']:checked").val();
      //var documentKeepAddr = $("input[name='documentKeepAddr']:checked").val();
      // var documentRmk = $("#documentRmk").val();
      // var documentCheckUserName = $("input[name='documentCheckUserName']").val();
      var documentValues = $("#checkForm1").values();
      var _a = {projectId: args['projectId'], documentCheckStatus: documentCheckStatus};
      var _b = {DocumentCheckItem: $("#documentCheckResultTable").bootstrapTable('getData')};
      var num = 0;
      $("#checkForm").validate();
      $("#result1 form").map(function(){
          $(this).validate();
          if($(this).valid() == true){
              num++
          }
      });
      var _data = JSON.stringify(_b);
      var _dataObj = JSON.parse(_data);
      var _len = _dataObj.DocumentCheckItem.length;
      if (num == _len){
          $("#documentCheckStatus1").prop("disabled", "disabled");
          if(documentCheckStatus == 2) return tip({content: '核实内容项已经勾选，核对结果不能选择“未核对”'})
          if($(".checkResultY:checked").length != _len && documentCheckStatus == 3) {
              return tip({content: "核实内容需全部选【是】才能勾选核对无误，请确认！"})
          } else {
              if($("#checkForm").valid()==true){
                  comn.ajax({
                      url: interUrl.gr.updateDocumentCheckItem,
                      data: {documentCheckItemString: JSON.stringify($.extend(_a, _b))},
                      success: function(res){
                          comn.ajax({
                              url: interUrl.gr.documentUpdateResult,
                              data: $.extend(documentValues, {
                                  documentCheckResult: nodeArr.join(","),
                                  projectId: args['projectId'],
                                  documentCheckStatus: documentCheckStatus,
                              }),
                              success: function(res){
                                  tip({content: '保存成功! '});
                              }
                          })
                      }
                  })
              }
          }
      }

      //if(nodeArr.length != 0){
      //
      //}else{
      //    tip({content: '请选中后再进行提交! '});
      //}
  });
  //取消资产可见
    $("#cancleContract").click(function(){
        if (!$(this).hasClass("disabled")) {
            return handle({
                url: interUrl.gr.recoveryAssetManageFile,
                outRefType: cureent_dir.outRefType,
                dirId: cureent_dir.id,
                callback: function(res) {
                    $("#cancleContract").addClass("disabled");
                    return $("#assetList").modal("hide");
                }
            });
        }
    });
  //添加资产可见
  $("#addContract").click(function(){
      var assetNodeId;
      comn.ajax({
          url: interUrl.gr.assetDistributionDir,
          data: {
              coCompanyId: args['coCompanyId']
          },
          success: function(res){
              if(res.data){
                  $('#assetList').modal('show');
                  var assetTree = $.fn.zTree.init($('#assetTree'),{
                      callback: {
                          onClick: function(event,treeId,treeNode){
                              assetNodeId = treeNode.id;
                          }
                      },
                      data: {
                          key: {
                              name:'directoryPath',
                              children: 'childrenDir'
                          }
                      }
                  },res.data);
                  return assetTree.expandAll(true);
              }
          }
      });
      $('#addAsset').unbind('click').on('click',function(){
          if(!assetNodeId) {
              return tip({
                  content:'请选中后再进行提交'
              })
          }
          if (!$(this).hasClass("disabled")) {
              comn.ajax({
                  url: interUrl.gr.assetLoanDocument,
                  data: {
                      fileNamespace: args["space"],
                      loanApplyId: args['loanApplyId'],
                      destDirId: assetNodeId,
                      coCompanyId: args["coCompanyId"],
                      documentIds: getSelectImage()['id'].join(",")
                  },
                  success: function (res) {
                      var i, j, len, ref;
                      loadTree();
                      ref = getSelectImage()['item'];
                      //console.log(ref);
                      for (j = 0, len = ref.length; j < len; j++) {
                          i = ref[j];
                          $(i).remove();
                      }
                      $("#addContract").addClass("disabled");
                      return $("#assetList").modal("hide");
                  }
              });
          }
      });
  });
  $("#sendBanck").click(function(){
    //标记为银行文件，查看大图和缩略图-已标识提示-显示
    function showHasBankMarkFile() {
      $('#sendBankDone').removeClass('hidden');

      var str = ["<div class='bankTag' style='width: 40px;height: 20px;position: absolute; top: 5px;right: 5px;color: red;'> ",
      "已标识",
      "</div>"].join("")

      //已经有标识的，不需要在给缩略图列表添加标识
      for(var i = 0 ; i < $('#documentList .file-name input').length ; i++){
        var isCheck = $('#documentList .file-name input').eq(i).is(':checked');
        var ishasBankTag = $('#documentList .file .image').eq(i).children('.bankTag').length ? true : false;
        if( isCheck && (!ishasBankTag) ){
          $('#documentList .file .image').eq(i).append(str);
        }
      }

    }

    var nodeId;
    comn.ajax({
      url: interUrl.gr.bankDirectory,
      data: {
        projectId: args['projectId'],
        outRefType: 'bank',
          releventFlow: args['releventFlow'] || "",
          releventFlowNode: args['releventFlowNode'] || ""
      },
      success: function(res){
        if(res.data){
          $('#bankList').modal('show');
          var bankTree = $.fn.zTree.init($('#bankTree'),{
            callback: {
              onClick: function(event,treeId,treeNode){
                nodeId = treeNode.id;
              }
            },
            data: {
              key: {
                  name:'directoryPathVo',
                  children: 'childrenDir'
              }
            }
          },res.data);
          return bankTree.expandAll(true);
        }
        if (!$(this).hasClass("disabled")) {
          comn.ajax({
            url: interUrl.gr.documentCopy,
            data: {
              destDirId: '301',
              documentIds: getSelectImage()['id'].join(",")
            },
            success: function(res){
              loadTree();
              tip({content: "文件标识成功！"});
              showHasBankMarkFile();


            }
          });
        }
      }
    });
    $('#addBank').unbind('click').on('click',function(){
      if(!nodeId) {
        return tip({
          content:'请选中后再进行提交'
        })
      }
      comn.ajax({
        url: interUrl.gr.addDocument,
        data: {
          documentIds: getSelectImage()['id'].join(","),
          dirId: nodeId,
            projectId: args['projectId']
        },
        success: function(){
          tip({content: "文件标识成功！"});
          loadTree();
          $('#bankList').modal('hide');
          showHasBankMarkFile();
        }
      })
    })
  });

  $("#sendContract, #signDatum").click(function(){
    var _this = this;
    if (!$(this).hasClass("disabled")) {
      comn.ajax({
        url: interUrl.gr.assetDistribution,
        data: {
          loanApplyId: m.loanApplyId,
          fileNamespace: _this.id == "sendContract" ? "ASSET_PACKAGE" : "INSURANCE_DISTRIBUTION",
          documentIds: getSelectImage()['id'].join(","),
          destDirId: _this.id == "signDatum" ? "40101" : null
        },
        success: function(res){
          loadTree();
          tip({content: _this.id == "signDatum" ?  "标识文件成功! " :  "资产分发可见成功！"});
        }
      });
    }
  });

  $("#removed").click(function() {
    if (imgType === "deleted") {
      if (!$(this).hasClass("disabled")) {
        return $("#replayFile").modal("show");
      }
    } else {
      imgType = "deleted";
      $(this).addClass("disabled").html("<span>恢复文件</span>");
      return getDocumentList({
        curPage: 1
      });
    }
  });

  //加载更多
  //$("#imgLoadMore").click(function() {
  //if (!$(this).hasClass("disabled")) {
  //return getDocumentList();
  //}
  //});
  $("#delImage").click(function() {
    if (!$(this).hasClass("disabled")) {
      return $("#delDocument").modal("show");
    }
  });
  $("#copyImage").click(function() {
    if (!$(this).hasClass("disabled")) {
        $("#targetDir .modal-title").html('复制到');
        $('#targetSure').addClass('hide');
        $('#targetCopySure').removeClass('hide');
      return $("#targetDir").modal("show");
    }
  });
  $("#moveImage").click(function() {
    if (!$(this).hasClass("disabled")) {
        $("#targetDir .modal-title").html('移动到');
        $('#targetCopySure').addClass('hide');
        $('#targetSure').removeClass('hide');
      return $("#targetDir").modal("show");
    }
  });
  $("#upMovie").click(function() {
    return $("#upMovieInput").trigger("click");
  });
  $("#upImage").click(function() {
    if (!$(this).hasClass("disabled")) {
      return $("#upImageInput").trigger("click");
    }
  });
  $("#replay").click(function() {
    return handle({
      url: interUrl.gr.recoveryFile,
      dirId: cureent_dir['id'],
      outRefType: cureent_dir.outRefType,
      callback: function(res) {
        return $("#replayFile").modal("hide");
      }
    });
  });
  $("#delSure").click(function() {
    if (!$(this).hasClass("disabled")) {
      return handle({
        url: interUrl.gr.delDocument,
        dirId: cureent_dir['id'],
        outRefType: cureent_dir.outRefType,
        callback: function(res) {
          return $("#delDocument").modal("hide");
        }
      });
    }
  });
  $("#targetCopySure").click(function() {
    if (!$(this).hasClass("disabled")) {
      return handle({
        url: interUrl.gr.copyDocument,
        destDirId: targetDir['id'],
        callback: function(res) {
          return $("#targetDir").modal("hide");
        }
      });
    }
  });
  $("#targetSure").click(function() {
    if (!$(this).hasClass("disabled")) {
      return handle({
        url: interUrl.gr.moveDocument,
        dirId: targetDir['id'],
        callback: function(res) {
          return $("#targetDir").modal("hide");
        }
      });
    }
  });
  $("#btnPrint").click(function() {
    var picArr;
    if (!$(this).hasClass("disabled")) {
      picArr = [];
      $.each(getSelectImage()['item'], function(index, item) {
        var url;
        url = item.find(".file").data("file")['filePath'];
        return picArr.push(url);
      });
      return window.open("../../../Modal/common/documentDetail/imagePrint.html?imgUrl=" + picArr.join(","));
    }
  });
  $("#documentList").on("click", ".file-name", function(e) {
    var $checkbox, $els;
    $els = $("#copyImage, #moveImage, #delImage, #btnPrint, #sendContract, #sendBanck, #signDatum");
    if (!$(e.target).is(":input")) {
      $checkbox = $(this).find("input:checkbox")[0];
      $checkbox.checked = !$checkbox.checked;
    }
    if(getSelectImage()['id'].length == 1){
      $("#addressCompare").removeClass('disabled');
    }else{
      $("#addressCompare").addClass('disabled');
    }

    //选中图片时候，标识删除可以点击
    if(getSelectImage()['id'].length > 0){
      $("#logoDelete").removeClass('disabled');
    }else{
      $("#logoDelete").addClass('disabled');
    }

      if (getSelectImage()['id'].length > 0 && args['space'] === "ASSET_MANAGE_PACKAGE" && cureent_dir["ifAssetManageCatalog"] === false) {
          $("#addContract").removeClass("disabled");
      } else {
          $("#addContract").addClass("disabled");
      }
      if (getSelectImage()['id'].length > 0 && args['space'] === "ASSET_MANAGE_PACKAGE" && cureent_dir["ifAssetManageCatalog"] === true) {
          $("#cancleContract").removeClass("disabled");
      } else {
          $("#cancleContract").addClass("disabled");
      }
    if (getSelectImage()['item'].length > 0) {
      if (imgType === "deleted") {
        return $("#removed, #btnPrint").removeClass("disabled");
      } else {
        return $els.removeClass("disabled");
      }
    } else {
      if (imgType === "deleted") {
        return $("#copyImage, #moveImage, #delImage, #removed, #btnPrint").addClass("disabled");
      } else {
        return $els.addClass("disabled");
      }
    }
  }).on("click", ".pdfImg", function(){
      var pdfFilePath = $(this).attr("data-original");
      PDFObject.embed(pdfFilePath, "#pdf_box");
      $("#pdf").modal('show');
  });
  $("#upImageInput").change(function() {
    var fileArr, html, i, j, k, len, results;
    fileArr = this.files;
    results = [];
    for (k = j = 0, len = fileArr.length; j < len; k = ++j) {
      i = fileArr[k];
      html = "";
      results.push(base64(i, k, function(f, o, index) {
        html = ["<tr>",
          "<td>",
          "<img src='" + o + "' width='80' />",
          "<input name='LoanDocuments[0].fileName' class='hide' value='" + f.name + "' />",
          "</td>",
          "<td>" + f.name + "</td>",
          "<td>" + (((f.size * 0.5) / 1048576).toFixed(2)) + "M</td>",
          "<td data-name='imgHandle'>",
          "<button type='button' class='btn btn-danger btn-sm upCancle'><span>取消上传</span></button>",
          "</td>",
          "</tr>"].join("");
        return $("#fileList tbody").prepend(html);
      }));
    }
    return results;
  });

  $("#upMovieInput").change(function() {
    var file;
    file = this.files[0];
    return $.ajaxFileUpload({
      url: interUrl.basic + interUrl.gr.upFile,
      secureuri: false,
      fileElementId: 'upMovieInput',
      data: {
        loanApplyId: m.loanApplyId,
        dirId: cureent_dir['id'],
        fileName: file.name,
        fileNamespace: args['space'] || "",
        releventFlow: args['releventFlow'] || "",
        releventFlowNode: args['releventFlowNode'] || "",
        outRefType: cureent_dir.outRefType || '',
      },
      dataType: "json",
      success: function(data, status) {
        tip({content: '上传视频成功！'});
        getDocumentList({
          curPage: 1
        })
        loadTree();
      },
      complete: function() {
      },
      error: function(data, status, e) {
        return console.log(e);
      }
    });
  });

  $("#downLoad").click(function() {
    //打包下载获取coBankId
    comn.ajax({
      url: interUrl.documentManagement.deliverGetApprovalProjectInfo,
      data: {
        projectId: args['projectId']
      },
      success: function(res) {
        window.open(interUrl.basic + interUrl.gr.downLoad + ("?loanApplyId=" + m.loanApplyId + "&fileNamespace=" + (args['space'] || '') + "&releventFlow=" + (args['releventFlow'] || '') + "&releventFlowNode=" + (args['releventFlowNode'] || '') +"&assetsPackageId=" + (args['assetsPackageId'] || '')+"&coBankId=" + (res.data.coBankId || '')));
      }
    });
  });
  $("#fileList tbody").on("click", ".upCancle", function() {
    return $(this).parents("tr").remove();
  });
  return $("#upload").click(function() {
    var $tr, $trAll, maxImg, num, upImg;
    $tr = $("#fileList tbody").find("tr:not('.loaded')");
    $trAll = $("#fileList tbody").find("tr");
    num = $tr.index();
    if (num === -1) {
      return;
    }
    maxImg = $tr.length;

    //重写开始上传图片是否成功遍历方法
    function upImg() {
      for(var i=0 ; i<$trAll.length ; i++){
          if (!$trAll.eq(i).hasClass("loaded")) {

            var imgData = $.extend($trAll.eq(i).values(), {
              loanApplyId: m.loanApplyId,
              dirId: cureent_dir['id'],
              fileNamespace: args['space'] || "",
              releventFlow: args['releventFlow'] || "",
              releventFlowNode: args['releventFlowNode'] || "",
              "LoanDocuments[0].filePath": $trAll.eq(i).find("img").eq(0).attr("src"),
              outRefType : cureent_dir.outRefType || ''
            })

            //资产包管理-查看资产详情-文档详情-上传图片多加参数限制
            if(args["showLogoDelete"] === '1') {
              imgData.specialFlag = 'tailong';
            }

            comn.ajax({
              url: interUrl.gr.uploadImage,
              data: imgData,
              success: function(res) {

                $trAll.eq(num).addClass("loaded").nameValues({
                  imgHandle: "<span class='text-success'>上传成功！</span>"
                });
                num = num + 1;
                maxImg = maxImg -1;


                //补件-上传做-发票识别功能判断
                function invoiceIdentifyApiloaded(pictureId) {
                  if(args['space'] !== 'LOAN_PATCH'){
                    return
                  }
                  if(args['releventFlow'] !== 'LOAN_PATCH'){
                    return
                  }
                  if(args['carType'] !== '1'){
                    return
                  }
                  if((cureent_dir.id !== 10401) && (cureent_dir.id !== 10304)){
                    return
                  }

                  comn.ajax({
                    url: interUrl.invoice.invoiceIdentify,
                    data: {
                      projectId: args['projectId'],
                      pictureId: pictureId
                    },
                    async: false,
                    success: function(res) {
                      if(res.data){
                        if(res.data.identifyStatus !== 1){
                            tip({
                                content: "上传的第" + num + "张发票无法正常识别,请删除后重传"
                            })
                        }
                      }
                    }
                  });
                }

                invoiceIdentifyApiloaded(res.data[0])

                if (maxImg === 0) {
                  getDocumentList({ curPage: 1 });
                  //发票识别逻辑判断
                  invoiceIdentifyWay();
                  return loadTree();
                }


              }
            });
          }
      }
    }
    //开始上传图片显示方法
    upImg();
  });
});
$("#addressCompare").click(function(){
  if(getSelectImage()['id'].length==1){
    comn.ajax({
      url:interUrl.gr.getDocumentCoordinate,
      data:{
        docId:getSelectImage()['id'][0]
      },
      success:function(res){
        comn.addTab({
          title:'上传地和保管地对比',
          href:'./Modal/common/documentDetail/compareAddress.html?' +
          'keepAddrLatitude='+res.data.keepAddrLatitude+'&keepAddrLongitude='+res.data.keepAddrLongitude+
          '&photographLatitude='+res.data.photographLatitude+'&photographLongitude='+res.data.photographLongitude
        })
      }
    })
  }
});

var tableConfig = $.extend(JSON.parse(JSON.stringify(comn.table)), {
    'pagination': false,
    'height': 'auto'
});
if(args["releventFlowNode"] === "LOAN_DOCUMENT_CHECK") {
    documentCheckResult = function(params) {
      tableData(params, {projectId: args["projectId"]}, interUrl.mockList || interUrl.gr.getDocumentCheckItem);
    };
}
if(args["projectId"]) {
    $("#documentCheckResultTable").bootstrapTable(tableConfig);
}
checkResult = function (value, item) {
    var value_0 = "<form><label><input type='radio' value='1' class='checkResult checkResultY required' name='result'/>是</label>&nbsp;&nbsp;&nbsp;&nbsp;<label><input type='radio' class='checkResult checkResultNo required' value='0' name='result' checked/>否</label></form>"
    var value_1 = "<form><label><input type='radio' value='1' class='checkResult checkResultY required' name='result' checked/>是</label>&nbsp;&nbsp;&nbsp;&nbsp;<label><input type='radio' class='checkResult checkResultNo required' value='0' name='result'/>否</label></form>";
    var value_2 = "<form><label><input type='radio' value='1' class='checkResult checkResultY required' name='result'/>是</label>&nbsp;&nbsp;&nbsp;&nbsp;<label><input type='radio' class='checkResult checkResultNo required' value='0' name='result'/>否</label></form>";
    return [value_0, value_1, value_2][value] || value_2;
};

checkResultEvent = {
    "change .checkResult": function (e, value, row, index) {
        row.result = $(this).val();
        $(this).parents("form").next("#result-error").remove();
    }
}

var _type;
if (args["currentNodeKey"] === "COPY_CONTRACT") {
    _type = 1;
    $("#isFieldset").prop("disabled", "disabled");
    $("#reviewName").html("复核内勤复核线上发送银行文件的结果");
}
if (args["currentNodeKey"] === "DOCUMENT_REVIEW") {
    _type = 2;
    $("#saveReview").show();
    $("#reviewName").html("待复核线上发送银行影像文件内容项");
}
if (args["currentNodeKey"] === "COPY_CONTRACT" || args["currentNodeKey"] === "DOCUMENT_REVIEW"){
    comn.ajax({
        url: interUrl.common.getReviewItem,
        data: {
            deliverId : args['businessId'],
            type: _type
        },
        success: function(res){
            if (res.data && (args["currentNodeKey"] === "COPY_CONTRACT" || args["currentNodeKey"] === "DOCUMENT_REVIEW")) {
                $("#getReviewContForm").removeClass("hide");
                $("#isClick").val("wzBank"); //此val代表是温州银行
                getReviewContent(res.data);
                reviewLen = res.data.length;
            }
        }
    })
}

$(document).on('click', 'input[name=check]', function(){
    $(this).parents("form").next(".error").remove();
})
$(document).on('change', '.isCheckAll', function(){
    if($(this).prop("checked") === false){
        $(this).val("0").addClass("noCheck")
    } else {
        $(this).removeClass("noCheck").val("1")
    }
})
$(document).on("change", "#getReviewContForm input", function(){
    $("#isSave").val("firstSaveReview")
});
$(document).on("click", ".reviewContentForm input", function(){
    $("#isSave").val("firstSaveReview")
});
//保存复核内容
$("#saveReview").click(function (e) {
    $(".isClear").val("");
    $(".error").remove();
    var num = 0;
    isApprove();
    onlySaveReview()
});
function isApprove(){
    $(".reviewContentForm").map(function(){
        $(this).validate();
        if($(this).find("input[name='check']:checked").val() == '0'){
            $("#isCheck0").val("hasZeroCheck")
        }
    });
    if ($(".noCheck").length > 0) {
        $("#isCheckNo").val("hasCheckNo")
    }
}
function onlySaveReview(){
    var _a = {
        deliverId : args['businessId']
    }
    var _b=getReviewList();
    comn.ajax({
        url: interUrl.common.saveReviewItem,
        data: {reviewItemString:JSON.stringify($.extend(_a, _b))},
        success: function(res) {
            tip({content:'保存成功!'});
        }
    });
}
function  getReviewList() {
    var loanReviewFileVos=[],i,j;
    var list1=$(".review_temp").not('.hide');
    var len=list1.length;
    for(i=0;i<len;i++){
        var loanReviewItemList=[];
        var _a=list1.eq(i).find(".reviewContentForm").values();
        var list2=list1.eq(i).find('.otherReviewFiles .checkbox-inline');
        for(j=0;j<list2.length;j++){
            var _b=list2.eq(j).values();
            loanReviewItemList.push(_b);
        }
        loanReviewFileVos.push($.extend(_a,{subItems:loanReviewItemList}));
    }
    return {reviewItem:loanReviewFileVos};
}
//复核内容
function getReviewContent(list) {
    $("#putContent").html("");
    var temp=$(".review_temp");
    if(list.length){
        $.each(list,function (i,v) {
            var a=temp.clone(true);
            a.removeClass('hide').find('.reviewContentTitle').text(v.itemName);
            a.values(v);
            a.find('.otherReviewFiles').html(getCheckReviewList(v.subItems));
            $('#putContent').append(a);
        })
    }

    function getCheckReviewList(checkList) {  //isProvide
        var arr=[];
        if(checkList && checkList.length>0){
            $.each(checkList,function (i,v) {
                var t = '<label class="checkbox-inline"><input type="hidden" name="id" value="'+ v.id +'"><input type="hidden" name="itemName" value="'+ v.itemName +'"><input type="checkbox" class="isCheckAll '+ (v.check === '1' ? '' : 'noCheck')+'" name="check" '+ (v.check === '1' ? 'checked' : '')+' value="'+ (v.check === '1' ? '1' : '0') +'">'+v.itemName+'</label>'
                arr.push(t);
            })
            return arr.join("");
        }
    }
}

// 从抵押登记跳转至影像管理
function fromMortgage() {
  if($(".tsbtn").hasClass('fromMortgage')) {
      $('.fromMortgageDiv').removeClass('hide');
      var o = $("#mortgageInfo").find("form").values();
      $(document).on('click','#saveMortgage',function() {
          comn.ajax({
              url: interUrl.creditManagement.mortageSave,
              data: o,
              success: function(res) {
                res.code == 10000 && tip({
                  content: "保存成功！"
                });
              }
          });
      })
  }
}

$(document).on("click", ".closeAsset", function(){
    $(".layerUp").modal("hide");
})

//资产包管理-资产包详情-文档详情-进入影像管理-显示标识删除按钮start
function isAssetPackageManageEnter() {
  if(args["showLogoDelete"] === '1') {
    $('#logoDelete').removeClass('hidden');
  }

  //标识删除按钮-点击事件
  $('#logoDelete').bind('click',function(){
    if (!$(this).hasClass("disabled")) {
      $("#logoDelete2").modal("show");
    }
  })

  $("#logoDelete3").click(function() {
    if (!$(this).hasClass("disabled")) {
      comn.ajax({
        url: interUrl.gr.loanApprovalInfoSetDocumentTailongStatus,
        data: {
          documentIds:getSelectImage()['id'].join(","),
          tailongStatus:0,
        },
        success: function(res) {
          $("#logoDelete2").modal("hide");

          var i, j, len, ref;
          //发票识别逻辑判断
          invoiceIdentifyWay();
          loadTree();
          ref = getSelectImage()['item'];
          for (j = 0, len = ref.length; j < len; j++) {
            i = ref[j];
            $(i).remove();
          }
          $("#logoDelete").addClass("disabled");
        }
      });
    }
  });
}
isAssetPackageManageEnter();
//资产包管理-资产包详情-文档详情-进入影像管理-显示标识删除按钮end

//资产包查询-资产包详情-文档详情-进入影像管理-隐藏上传文件按钮start
function hideUploadButton() {
  if(args["hideUploadButton"] === '1') {
    $('#upImage').addClass('hidden');
    $('#upload').addClass('hidden');
  }
}
hideUploadButton();
//资产包查询-资产包详情-文档详情-进入影像管理-隐藏上传文件按钮end
