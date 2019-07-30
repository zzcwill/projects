//图片预览
var pictures = document.querySelector('#approvalBaseInfoForm');
var options = {
    url: 'data-src',
    title: true,
    transition: false,
    build: function (e) {
    },
    built: function (e) {
    },
    show: function (e) {
        window.parent.toggleTopNav();
    },
    hide: function (e) {
        window.parent.toggleTopNav();
    }
};
//基本信息-借款人信息和配偶信息
function getApprovalBaseInfo(){
    comn.ajax({
        url: interUrl.myTask.approvalBaseInfo,
        data: loanApplyId,
        success: function (res) {
            var housingStatus = res.data.housingStatus;
            var c = $("#mortgageRepayment");
            var a = "<span class='text-danger'>*</span>";

            $("#getPos").data("callback",function(BMap, map){
                var pictureIcon = new BMap.Icon("./../../../images/picture_icon.png", new BMap.Size(30,30));
                function addMarker(point){
                    var marker = new BMap.Marker(point, {icon: pictureIcon});
                    map.addOverlay(marker);
                }
                $.each(res.data.realVisitAddressItudeList, function(i, o){
                    var pointArr = o.split(",");
                    addMarker(new BMap.Point(pointArr[0], pointArr[1]));
                });
            });

            if (housingStatus == 5) {
                c.show().find("label").html(a + "租金:");
            } else if (housingStatus == 6) {
                c.show().find("label").html(a + "说明:");
            } else {
                c.hide();
            }
            //if (housingStatus == 2) {
            //    c.show().find("label").html(a + "月还款:");
            //} else if (housingStatus == 3) {
            //    c.show().find("label").html(a + "月租:");
            //} else if (housingStatus == 4) {
            //    c.show().find("label").html(a + "说明:");
            //} else if (housingStatus == 1) {
            //    c.hide();
            //}
            if(res.data.maritalStatus==1){
                $("#spousePanel").show();
            }
            window['_mobilePhone_baseInfo']=res.data.mobilePhone;
            $("#approvalBaseInfoForm").values(res.data);
            $("#getPos").data("pos", res.data.visitAddressItude);
            if(res.data.customerScore){
                if(score){
                    score(res.data.customerScore);
                }
            }
            $("#filePath").html(res.data.filePath ? "<img src='"+ res.data.filePath +"' data-src='"+ res.data.filePath +"' height=85 />" : "");
            $("#faceUrl").html(res.data.faceUrl ? "<img src='"+ res.data.faceUrl +"' data-src='"+ res.data.faceUrl +"' height=85 />" : "");
            setTimeout(function () {
                viewer = new Viewer(pictures, options);
            }, 1000);


            //配偶云镜大数据按钮相关判断start
            function spouseReportJudge (data) {
                if(data.decisionStatus === 2) {
                    $('#spouseSearchTip').removeClass('hide');
                    var html = "<span class='glyphicon glyphicon-ok glyphicon-ok-ico'></span>云镜大数据通过";
                    $('#spouseSearchTip').html(html);
                }

                if(data.decisionStatus === 3 || data.decisionStatus === 4) {
                    $('#spouseSearchTip').removeClass('hide');
                    var html = "<span class='glyphicon glyphicon-remove glyphicon-ok-ico'></span>云镜大数据不通过";
                    $('#spouseSearchTip').html(html);
                }

                if(data.maritalStatus === 1) {
                    if(data.spouseDecisionStatus === 2) {
                        $('#spouseSearchTip2').removeClass('hide');
                        var html = "<span class='glyphicon glyphicon-ok glyphicon-ok-ico'></span>云镜大数据通过";
                        $('#spouseSearchTip2').html(html);
                    }

                    if(data.spouseDecisionStatus === 3 || data.spouseDecisionStatus === 4) {
                        $('#spouseSearchTip2').removeClass('hide');
                        var html = "<span class='glyphicon glyphicon-ok glyphicon-ok-ico'></span>云镜大数据通过";
                        $('#spouseSearchTip2').html(html);
                    }                   
                }
            }
            spouseReportJudge(res.data);
            //配偶云镜大数据按钮相关判断end           
        }
    });
}
getApprovalBaseInfo();
//基本信息-紧急联系人
//getContacter();

table_contacter = function (params) {
    var p=params.data;
    return comn.ajax({
        url: interUrl.myTask.customerContacter,
        data: $.extend(loanApplyId,p),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            return params.complete();
        }
    });
};

$("#table_contacter").bootstrapTable(comn.table);

if (args["type"] === "ownersStaging") {
    $(".carOwnerLoan").addClass("hide");
}