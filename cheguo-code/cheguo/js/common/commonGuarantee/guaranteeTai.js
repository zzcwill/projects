//@ sourceURL=guarantee.js;
var documnetFlag, oData = {}, _current = 0, guarantyRelationship = 1, delteLoanGuarantor = null;
//反担保信息查询云镜大数据的总次数和已用次数
var searchReportTimes = {
    userdTimes:0,
    totalTimes:0
}
//反担保信息-抵/质押信息
//getApprovalAsserts();

//反担保信息-保证人信息 table
//getGuarantor();

/*table_guarantor = function (params) {
    var p=params.data;
    return comn.ajax({
        url: interUrl.myTask.approvalGuarantor,
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
$("#table_guarantor").bootstrapTable(comn.table);*/
$("body").on("change", "input[name='cardNo'], select[name='cardType']", function () {
    var $form = $(this).parents("form");
    var o = $form.values();
    if (o.cardType == 1 && o.cardNo.length == 18) {
        var resut = getInfo($("input[name='cardNo']").val());
        $form.find("[name='birthday']").val(resut.birth);
        $form.find("[name='age']").val(resut.age);
        $form.find("[name='sex']").val(resut.sex);
    }
});

tableEvent_rGuarantor = {
    "click .xz": function (e, a, item, index) {
        if (_current == 4) {
            tip({ content: "已添加至最大担保人！！" });
            $("#guarantorModal").modal("hide");
            return;
        }
        comn.ajax({
            url: interUrl.gr.lauchLoanGuarantorInfo,
            data: {
                loanApplyId: args['loanApplyId'],
                guarantyRelationship: guarantyRelationship,
                creditApplyId: item.id
            },
            success: function (res) {
                _current++;
                var item = res.data;
                addGuarrantor($.extend(res.data, { guarantyRelationship: guarantyRelationship }), _current);
                $("#getLoanGuarantorInfo").prepend(addGuarrantor(res.data, _current));
                var _form = $("#getLoanGuarantorInfo").children().eq(0);
                _form.values($.extend(res.data, { loanApplyId: args['loanApplyId'] }));

                //循环绑定省市区下拉选择事件
                _form.find("select[name='companyAddressPid']", $("#guarantee")[0]).getProvince(item['companyAddressPid']);
                _form.find("select[name='homeAddressPid']", $("#guarantee")[0]).getProvince(item['homeAddressPid']);

                _form.find("select[name='companyAddressCid']", $("#guarantee")[0]).getCity(item['companyAddressPid'], item['companyAddressCid']);
                _form.find("select[name='homeAddressCid']", $("#guarantee")[0]).getCity(item['homeAddressPid'], item['homeAddressCid']);

                _form.find("select[name='companyAddressRid']", $("#guarantee")[0]).getArea(item['companyAddressCid'], item['companyAddressRid']);
                _form.find("select[name='homeAddressRid']", $("#guarantee")[0]).getArea(item['homeAddressCid'], item['homeAddressRid']);
                //|| args['documentFlowType'] == "2" || args['documentFlowType'] == "3" 文档流程可修改
                if (documnetFlag) {
                    $("#getLoanGuarantorInfo").find("fieldset").attr("disabled", false);
                }
                $("#getLoanGuarantorInfo form:eq(0) .professionCode").getOccupationList();//职业

                $("#guarantorModal").modal("hide");
                $("#getLoanGuarantorInfo").find(".guarranRecord").attr("readonly", true);
            }
        })

    }
};

//根据身份证取 省份,生日，性别
function getInfo(ic) {
    //获取输入身份证号码
    var ic = String(ic);
    //获取出生日期
    var birth = ic.substring(6, 10) + "-" + ic.substring(10, 12) + "-" + ic.substring(12, 14);
    //获取性别
    var gender = ic.slice(14, 17) % 2 ? "1" : "0"; // 1代表男性，0代表女性
    //获取年龄
    var myDate = new Date();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    var age = myDate.getFullYear() - ic.substring(6, 10) - 1;
    if (ic.substring(10, 12) < month || ic.substring(10, 12) == month && ic.substring(12, 14) <= day) {
        age++;
    }
    return {
        "birth": birth,
        "sex": gender,
        "age": age
    }
}

handle_rGuarantor = function (value, row, index) {
    return ["<a href='javascript:;' class='xz'>选择</a>"].join("");
};

function addGuarrantor(item, i) {
    var tpl = "";
    var o = {
        title: ["", "担保人-" + item.guarantorName, "反担保人-" + (item.guarantorName || "")][item.guarantyRelationship] || "",
        index: i
    };

    tpl = $("#tpl").html().replace(/{([\w \d]+)}/g, function (k0, k1) { return o[k1]; });
    return tpl;
}


if (location.href.indexOf("loanDetailTai.html") > 0) {
    oData['projectId'] = args["projectId"];
    oData['callType'] = 1;
} else {
    oData['loanApplyId'] = args['loanApplyId'];
    table_rGuarantor = function (params) {
        tableData(params,
            $.extend($("#searchGuarantor").values(), {
                loanApplyId: args['loanApplyId'],
                guarantyRelationship: guarantyRelationship
            })
            , interUrl.myTask.relateLoanGuarantor)
    };
}
$(function () {
    //发起文档、 资料审核、抄写可编辑
    documnetFlag = [
        'LOAN_OFFICE_STAFF_BUDGET',
        'LOAN_MODIFY_OFFICE_STAFF_BUDGET',
        'DOCUMENT_VERIFY',
        'LOAN_LAUNCH',
        'LOAN_MODIFY_LAUNCH',
        'COPY_CONTRACT'
    ].indexOf(args['currentNodeKey'] || args['releventFlowNode']) != -1;;

    //判断流程节点
    var isBtnGuarantor = ['LOAN_OFFICE_STAFF_BUDGET',
        'LOAN_MODIFY_OFFICE_STAFF_BUDGET',
        'LOAN_LAUNCH',
        'LOAN_MODIFY_LAUNCH'].indexOf(args['currentNodeKey'] || args['releventFlowNode']) != -1;
    if (isBtnGuarantor) {
        $("#btnGuarantor").removeClass("hide");
    }

    //搜索担保人信息
    $("#btn-guarantor-search2").click(function () {
        $("#table_rGuarantor").bootstrapTable("refresh", { url: '...' })
    });
    $("#table_rGuarantor").bootstrapTable(comn.table);
    var getLoanGua, gData;
    if (args['businessTypeCode'] == "DOCUMENT_TRANSMIT_FLOW") {
        getLoanGua = interUrl.gr.dGetLoanGuarantorInfo;
        gData = { projectId: args['projectId'] }
    } else {
        getLoanGua = interUrl.tempLoanQuery.getLoanGuarantorInfo;
        gData = oData;
    }

    $("body").on("change", "select[name='companyAddressPid'], select[name='homeAddressPid']", function () {
        var name = $(this).find("option:selected").text();
        $(this).prev("input", $(this).parents(".input-tip")[0]).val(name);
        $(this).parents(".form-group").find("select[name='companyAddressCid'], select[name='homeAddressCid']").getCity(this.value);
    }).on("change", "select[name='companyAddressCid'], select[name='homeAddressCid']", function () {
        var name = $(this).find("option:selected").text();
        $(this).prev("input", $(this).parents(".input-tip")[0]).val(name);
        $(this).parents(".form-group").find("select[name='companyAddressRid'], select[name='homeAddressRid']").getArea(this.value);
    }).on("change", "select[name='companyAddressRid'], select[name='homeAddressRid']", function () {
        var name = $(this).find("option:selected").text();
        $(this).prev("input", $(this).parents(".input-tip")[0]).val(name);
    })

    comn.ajax({
        url: getLoanGua,
        data: gData,
        success: function (res) {
            var data = res.data;
            if (data.length == 0) {
                var html = [
                    "<div class='row'>",
                    "<div class='col-xs-24 col-sm-24 col-md-24 col-lg-24 text-center'>",
                    "<h2>没有关联反担保人信息</h2>",
                    "</div>",
                    "</div>"
                ].join("");

                //无担保人也显示查询云镜大数据按钮
                $('#cloudMirrorSearch').removeClass('hide');
                getSearchReportTimes();
                return $("#getLoanGuarantorInfo").append(html);
            }
            for (var i = 0, len = data.length; i < len; i++) {
                _current++;
                var item = data[i];
                window['_mobilePhone_guarantee_' + i] = item.mobilePhone;
                $("#getLoanGuarantorInfo").append(addGuarrantor(item, i));


                $("#getLoanGuarantorInfo").find("input[name='mobilePhone']").attr("data-check", "_mobilePhone_guarantee_" + i + ";手机号有变动");
                $("#getLoanGuarantorInfo").find(".guarranRecord").attr("readonly", true);
            }

            //担保人云镜报告结果显示
            function showReport(data) {
                if(data.length === 0) {
                    return
                }

                if(data[0].decisionStatus === 1) {
                    $('#cloudMirrorSearchTip').removeClass('hide');
                    $('#cloudMirrorSearchTip').text('请稍后再刷新查看');
                }else{
                    $('#cloudMirrorSearch').removeClass('hide');
                    $('#cloudMirrorSearchTip').addClass('hide');
                }

                for(var i = 0 ; i < data.length ; i++) {
                    if(data[i].decisionStatus === 2) {
                        $('#getLoanGuarantorInfo .guarantorCloudMirror').eq(i).removeClass('hide');
                        var html = "<span class='glyphicon glyphicon-ok glyphicon-ok-ico'></span>云镜大数据通过";
                        $('#getLoanGuarantorInfo .guarantorCloudMirror .guarantorCloudMirrorTip').eq(i).html(html);
                    }

                    if(data[i].decisionStatus === 3 || data[i].decisionStatus === 4) {
                        $('#getLoanGuarantorInfo .guarantorCloudMirror').eq(i).removeClass('hide');
                        var html = "<span class='glyphicon glyphicon-remove glyphicon-ok-ico'></span>云镜大数据不通过";
                        $('#getLoanGuarantorInfo .guarantorCloudMirror .guarantorCloudMirrorTip').eq(i).html(html);
                    }

                    if(data[i].decisionStatus === 0 || data[i].decisionStatus === 1 || data[i].decisionStatus === 200){
                        $('#getLoanGuarantorInfo .guarantorCloudMirror').eq(i).addClass('hide');
                    }
                }
            }
            showReport(data);

            //获取反担保人-查询云镜大数据总次数
            function getSearchReportTimes() {
                comn.ajax({
                    url: interUrl.cloudMirrorReport.decisionengineLoanQueryTimes,
                    data: { loanApplyId: args['loanApplyId'] },
                    success: function (res) {
                        searchReportTimes = res.data;
                        var tip = '查询云镜大数据(' + res.data.userdTimes +  '/' + res.data.totalTimes + '次)';
                        $('#cloudMirrorSearch').attr('data-original-title',tip);
                    }
                });
            }
            getSearchReportTimes();



            //循环绑定省市区下拉选择事件
            $("select[name='companyAddressPid'], select[name='homeAddressPid']", $("#guarantee")[0]).getProvinceC({
                callback: function () {
                    for (var j = 0, len = data.length; j < len; j++) {
                        var item = data[j], _form = $("#getLoanGuarantorInfo").children().eq(j);
                        //单位地址
                        _form.find("select[name='companyAddressCid']").getCityC(item.companyAddressPid, {
                            code: item.companyAddressCid,
                            value: item.companyAddressCname
                        }, _form.find("select[name='companyAddressCid']").is(":disabled"))

                        _form.find("select[name='companyAddressRid']").getAreaC(item.companyAddressCid, {
                            code: item.companyAddressRid,
                            value: item.companyAddressRname
                        }, _form.find("select[name='companyAddressRid']").is(":disabled"))

                        //家庭地址
                        _form.find("select[name='homeAddressCid']").getCityC(item.homeAddressPid, {
                            code: item.homeAddressCid,
                            value: item.homeAddressCname
                        }, _form.find("select[name='homeAddressCid']").is(":disabled"))

                        _form.find("select[name='homeAddressRid']").getAreaC(item.homeAddressCid, {
                            code: item.homeAddressRid,
                            value: item.homeAddressRname
                        }, _form.find("select[name='homeAddressRid']").is(":disabled"))
                        _form.values($.extend(item, { loanApplyId: args['loanApplyId'] }));
                    }
                }
            }, false);
            $(".professionCode").getOccupationList(item.professionCode);//职业

            //判断流程节点
            if (documnetFlag) {
                $("#getLoanGuarantorInfo").find("fieldset").attr("disabled", false);
            }

            //文档传递流程所有节点(禁止反担保信息删除)
            if (args['releventFlow'] == "DOCUMENT_TRANSMIT_FLOW") {
                $(".btnDelete").attr('disabled', true);
            }
        }
    });

    //关联担保人
    $("#relationGuarantor").click(function () {
        guarantyRelationship = 1;
        $("#table_rGuarantor").bootstrapTable("refresh", { url: '...' })
        $("#guarantorModal").modal("show");
    });

    //添加反担保人
    $("#addGuarantor").click(function () {
        guarantyRelationship = 2;
        $("#table_rGuarantor").bootstrapTable("refresh", { url: '...' })
        $("#guarantorModal").modal("show");
    });

    //公安网查询不到此人，是否继续录入？   确定时再调保存,取消时调删除
    //再次调用保存反担保人接口时把needInquiry设成false
    function saveLoanGuarantorInfo(_form) {
        $("#gaQuery").modal("hide");
        if (_form.valid()) {
            comn.ajax({
                url: interUrl.myTask.saveLoanGuarantorInfo,
                data: $.extend(_form.values(), {
                    guarantyRelationship: guarantyRelationship,
                    loanApplyId: args['loanApplyId'],
                    projectId: args['projectId'] || "",
                    needInquiry: false
                }),
                success: function (res) {
                    _form.values(res.data);
                    tip({ content: "保存成功！！" });
                }
            });
        }
    }

    //删除反担保人,并给出信息添加失败
    function deleteLoanGuarantorInfo(_form) {
        $("#gaQuery").modal("hide");
        //删除
        var values = _form.values();
        comn.ajax({
            url: interUrl.myTask.deleteLoanGuarantorInfo,
            data: values,
            success: function (res) {
                _current--;
                _form.remove();
                tip({ content: "反担保人添加失败！" });
            }
        });
    }


    //保存
    $("#getLoanGuarantorInfo").on("click", ".btnSave", function () {
        var $form = $(this).parents("form");
        var url; // 文档传递流程 资料审核(担保人 读取和保存调用小哥接口)
        if (['DOCUMENT_VERIFY', 'COPY_CONTRACT'].indexOf(args['currentNodeKey']) != -1) {
            url = interUrl.myTask.dSaveLoanGuarantorInfo;
        } else {
            url = interUrl.myTask.saveLoanGuarantorInfo
        }
        if ($form.valid()) {
            comn.ajax({
                url: url,
                data: $.extend({
                    guarantyRelationship: guarantyRelationship,
                    loanApplyId: args['loanApplyId'],
                    projectId: args['projectId'] || "",
                    needInquiry: true
                }, $form.values()),
                success: function (res) {
                    tip({ content: "保存成功！！" });
                    if (res.data.inquiryResult) {
                        $form.values(res.data);
                    } else if (!res.data.inquiryResult) {
                        /*if(args['businessTypeCode'] != "DOCUMENT_TRANSMIT_FLOW"){
                            $("#gaQuery").modal("show");
                            $("#gaQuerySure").unbind("click").click(function(){
                                saveLoanGuarantorInfo($form);
                            })
                            $("#gaQueryCancel").unbind("click").click(function(){
                                deleteLoanGuarantorInfo($form);
                            })
                        }*/
                    }

                }
            });
        }
    }).on("click", ".btnDelete", function () {
        //删除
        var $form = $(this).parents("form"), values = $form.values();
        if (values['id']) {
            $("#deleteLoanGuarantor").modal("show");
            delteLoanGuarantor = function () {
                comn.ajax({
                    url: interUrl.myTask.deleteLoanGuarantorInfo,
                    data: values,
                    success: function (res) {
                        _current--;
                        $form.remove();
                        $("#deleteLoanGuarantor").modal("hide");
                        tip({ content: "删除成功！！" });
                    }
                });
            };
        } else {
            $form.remove();
        }

    }).on("change", ".housingStatus", function () {
        var $el = $(this);
        var a = "<span class='text-danger'>*</span>";
        var c = $el.parents("form").find(".mortgageRepayment").eq(0);

        //if($el.val()==1 || $el.val()==""){
        //	c.hide();
        //}else if($el.val()==2){
        //	c.show().find("label").html(a+"月还款:");
        //}else if($el.val()==3){
        //	c.show().find("label").html(a+"月租:");
        //}else if($el.val()==4){
        //	c.show().find("label").html(a+"说明:");
        //}
        if ($el.val() == 5) {
            c.show().find("label").html(a + "租金:");
        } else if ($el.val() == 6) {
            c.show().find("label").html(a + "说明:");
        } else {
            c.hide();
        }
    });

    $("#deleteBtnSure").click(function () {
        if (typeof delteLoanGuarantor == "function") {
            delteLoanGuarantor();
        }
    });

});
//职业更变
$(document).on("change", ".professionCode", function () {
    $(this).prev().val($(this).find("option:selected").text());
});


//云镜大数据相关start
//手动添加担保人点击事件
$("#addGuarantor2").click(function () {
    //清空弹窗数据
    $('#addGuarantorPopup input').val('');
    //手动添加担保人弹窗-证件类型赋值，身份证-1
    $('#addGuarantorPopup input').eq(1).val('1');
    $("#addGuarantorPopup").modal("show");
});
//手动添加担保人-弹窗-保存点击事件
$("#addGuarantorPopupSave").click(function () {
    if (_current == 4) {
        tip({ content: "已添加至最大担保人！！" });
        return;
    }

    if ($("#addGuarantorPopupForm").valid()) {
        url = interUrl.myTask.saveLoanGuarantorInfo;

        var data = $("#addGuarantorPopupForm").values();
        guarantyRelationship = 2
        data = $.extend({
            guarantyRelationship: guarantyRelationship,
            loanApplyId: args['loanApplyId'],
            projectId: args['projectId'] || "",
            needInquiry: true,
            newAdd : 1,
            isInuse : 1,
            decisionStatus:0,
            userId: comn.user.uid,
            userName: comn.user.realname,
            orgId: comn.user.companyId,
            orgName: comn.user.companyName,
        }, data);
        comn.ajax({
            url: url,
            data:data,
            success: function (res) {
                $("#addGuarantorPopup").modal("hide");
                tip({ content: "保存成功！！" });

                _current++;
                var item = res.data;
                addGuarrantor($.extend(res.data, { guarantyRelationship: guarantyRelationship }), _current);

                $("#getLoanGuarantorInfo").prepend(addGuarrantor(res.data, _current));
                var _form = $("#getLoanGuarantorInfo").children().eq(0);
                _form.values($.extend(res.data, { loanApplyId: args['loanApplyId'] }));

                //循环绑定省市区下拉选择事件
                _form.find("select[name='companyAddressPid']", $("#guarantee")[0]).getProvince(item['companyAddressPid']);
                _form.find("select[name='homeAddressPid']", $("#guarantee")[0]).getProvince(item['homeAddressPid']);

                _form.find("select[name='companyAddressCid']", $("#guarantee")[0]).getCity(item['companyAddressPid'], item['companyAddressCid']);
                _form.find("select[name='homeAddressCid']", $("#guarantee")[0]).getCity(item['homeAddressPid'], item['homeAddressCid']);

                _form.find("select[name='companyAddressRid']", $("#guarantee")[0]).getArea(item['companyAddressCid'], item['companyAddressRid']);
                _form.find("select[name='homeAddressRid']", $("#guarantee")[0]).getArea(item['homeAddressCid'], item['homeAddressRid']);
                //|| args['documentFlowType'] == "2" || args['documentFlowType'] == "3" 文档流程可修改
                if (documnetFlag) {
                    $("#getLoanGuarantorInfo").find("fieldset").attr("disabled", false);
                }
                $("#getLoanGuarantorInfo form:eq(0) .professionCode").getOccupationList();//职业

                $("#guarantorModal").modal("hide");
                $("#getLoanGuarantorInfo").find(".guarranRecord").attr("readonly", true);
            }
        });
    }
});
//查询云镜大数据按钮-提示次数弹窗显示方法
$('[data-toggle="tooltip"]').tooltip();
//查询云镜大数据-按钮点击事件
$("#cloudMirrorSearch").click(function() {
    //调担保人列表，无担保人提示添加担保人
    comn.ajax({
        url: interUrl.tempLoanQuery.getLoanGuarantorInfo,
        data: oData,
        success: function (res) {
            if(res.data.length === 0) {
                tip({content:'请添加并保存担保人后再点击查询'});
                return
            }

            //超过查询次数不允许查询
            if(searchReportTimes.userdTimes >= searchReportTimes.totalTimes) {
                tip({content:'查询次数超限'});
                return
            }

            //调担保人列表，有担保人调云镜大数据接口
            comn.ajax({
                url: interUrl.cloudMirrorReport.decisionengineLoanQueryDecision,
                data: {
                    loanApplyId: args['loanApplyId'],
                    type:2,
                },
                success: function (res) {
                    function setTime(n) {
                        var times = n;
                        var t = setInterval(function(){
                            times --;
                            var timesStr = '查询中(' + times + '秒)';
                            $('#cloudMirrorSearch').addClass('hide');
                            $('#cloudMirrorSearchTip').removeClass('hide');
                            $('#cloudMirrorSearchTip').html(timesStr);
                            if(times === 0) {
                                clearInterval(t);
                                function getInfoPersonList() {
                                    comn.ajax({
                                        url: interUrl.tempLoanQuery.getLoanGuarantorInfo,
                                        data: oData,
                                        success: function (res) {
                                            var data = res.data;

                                            //担保人云镜报告结果显示
                                            function showReport(data) {
                                                if(data.length === 0) {
                                                    return
                                                }

                                                if(data[0].decisionStatus === 1) {
                                                    $('#cloudMirrorSearchTip').text('请稍后再刷新查看');
                                                }else{
                                                    $('#cloudMirrorSearch').removeClass('hide');
                                                    $('#cloudMirrorSearchTip').addClass('hide');
                                                }

                                                for(var i = 0 ; i < data.length ; i++) {
                                                    if(data[i].decisionStatus === 2) {
                                                        $('#getLoanGuarantorInfo .guarantorCloudMirror').eq(i).removeClass('hide');
                                                        var html = "<span class='glyphicon glyphicon-ok glyphicon-ok-ico'></span>云镜大数据通过";
                                                        $('#getLoanGuarantorInfo .guarantorCloudMirror .guarantorCloudMirrorTip').eq(i).html(html);
                                                    }

                                                    if(data[i].decisionStatus === 3 || data[i].decisionStatus === 4) {
                                                        $('#getLoanGuarantorInfo .guarantorCloudMirror').eq(i).removeClass('hide');
                                                        var html = "<span class='glyphicon glyphicon-remove glyphicon-ok-ico'></span>云镜大数据不通过";
                                                        $('#getLoanGuarantorInfo .guarantorCloudMirror .guarantorCloudMirrorTip').eq(i).html(html);
                                                    }

                                                    if(data[i].decisionStatus === 0 || data[i].decisionStatus === 1 || data[i].decisionStatus === 200){
                                                        $('#getLoanGuarantorInfo .guarantorCloudMirror').eq(i).addClass('hide');
                                                    }
                                                }
                                            }
                                            showReport(data);
                                        }
                                    });

                                }
                                getInfoPersonList();
                            }
                        },1000)
                    }
                    setTime(9);
                }
            })
        }
    });
});
//云镜大数据相关end

