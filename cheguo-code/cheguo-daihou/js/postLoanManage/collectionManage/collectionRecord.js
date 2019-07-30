var args = comn.getArgs();
var projectId = args['projectId']; //项目id
var currentPlanNo = args['currentPlanNo']; //当前期数
var tableName = args["tableName"];

comn.table.height = '274';

$.fn.extend({
    getCollectionObjList: function (data) {
        var relationshipTxt = function (value, row, index) {
            return ['', "本人", "夫妻", "父亲", "母亲", "兄弟", "姐妹", "儿子", "亲戚", "朋友", "合伙人", "同事", "女儿", "姐夫", "嫂子", "儿媳", "担保人", "借款人", "合同还款人"][value] || '';
        };

        comn.ajax({
            url: interUrl.collectionManage.getCollectionObjList,
            data: data,
            success: (function (_this) {
                return function (res) {
                    var o;
                    return $(_this).html("<option value=''>--请选择--</option>" + ((function () {
                        var j, len, ref, results;
                        ref = res.data;
                        results = [];
                        for (j = 0, len = ref.length; j < len; j++) {
                            o = ref[j];
                            results.push("<option value='" + o.userId + "' " + (o.relationShip == '17' ? 'selected' : '') + " >" + o.userName + '(' + relationshipTxt(o.relationShip) + ')' + "</option>");
                        }
                        return results;
                    })()).join("")).change();
                };
            })(this)
        });
        return this;
    },
    getCollectionUserList: function () {
        data = { projectId: projectId, isOutsource: $("[name='isOutsource']:checked").val(), collectionType: $("[name='collectionType']").val() };
        comn.ajax({
            url: interUrl.collectionManage.collectionUserList,
            data: data,
            success: (function (_this) {
                return function (res) {
                    var o;
                    return $(_this).html("<option value=''>--请选择--</option>" + ((function () {
                        var j, len, ref, results;
                        ref = res.data;
                        results = [];
                        for (j = 0, len = ref.length; j < len; j++) {
                            o = ref[j];
                            results.push("<option value='" + o.uid + "'>" + o.realname + "</option>");
                        }
                        return results;
                    })()).join(""));
                };
            })(this)
        });
        return this;
    }
});

//boostarp-table相应配置start
//联系人信息
var table_3 = function (params) {
    var p = params.data;
    comn.ajax({
        url: interUrl.collectionManage.otherPeopleList,
        data: $.extend({ projectId: projectId }, p),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            params.complete();
        }
    });
}

//逾期记录
var table_1 = function (params) {
    var p = params.data;
    comn.ajax({
        url: interUrl.collectionManage.overdueList,
        data: $.extend({ projectId: projectId }, p),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            params.complete();
        }
    });
};

//催收记录
var table_2 = function (params) {
    var p = params.data;
    comn.ajax({
        url: interUrl.collectionManage.loanCollectionInfoCollectionList,
        data: $.extend({ projectId: projectId }, p),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            params.complete();
        }
    });
};

var tableEvent_2 = {
    "click .detail": function (e, a, item, index) { //催收详情
        $("#detailModal").modal("show").find(".detail").html(a);
    }
};

var handle_2 = function (value, row, index) {
    return ["<a class='detail' href='javascript:;'>查看详情</a>"].join("");
};
//催收附件数
var tableEvent_num = {
    "click .postloanNum": function (e, a, item, index) { //催收附件数
        comn.ajax({
            url: interUrl.collectionManage.getPostLoanFileList,
            data: {
                tableName: tableName,
                tableKeyValue: item.id
            },
            success: function (res) {
                //查看图片
                var imgArr = [];
                for (i = 0; i < res.data.length; i++) {
                    imgArr.push(res.data[i].filePath);
                }
                window.parent.switchImage(imgArr, 0);
            }
        })
    }
}
var handle_num = function (value, row, index) {
    return row.fileCout > 0 ? ["<a class='postloanNum' href='javascript:;'>" + row.fileCout + "</a>"].join("") : '--';
}
//boostarp-table相应配置end


$(function () {
    //获取基本信息
    function getInfo() {
        //基本信息
        comn.ajax({
            url: interUrl.collectionManage.loanCollectionInfoGet,
            data: { projectId: projectId },
            success: function (res) {
                function nameValues(obj) {
                    $("#baseInfo").find("[data-name]").each(function (index, item) {
                        var key = $(this).data("name");
                        $(item).html(obj[key]);
                    });
                }

                nameValues(res.data);
                $("[name='overdueTotalAmount']").val(res.data.overdueTotalAmount);
                $("[name='advanceBalanceAmount']").val(res.data.advanceBalanceAmount);
            }
        });
    }

    //省市级联start
    $("#collectionAddressPid").getProvince().change(function () {
        if (this.value) {
            $("#collectionAddressPname").val($(this).find('option:selected').text());
            $("#collectionAddressRname").val("");
            return $("#collectionAddressCid").getCity(this.value).unbind("change").change(function () {
                if (this.value) {
                    $("#collectionAddressCname").val($(this).find('option:selected').text());
                    return $("#collectionAddressRid").getArea(this.value);
                }
            });
        }
    });
    $("#collectionAddressCid").change(function () {
        if (this.value) {
            $("#collectionAddressCname").val($(this).find('option:selected').text());
            return $("#collectionAddressRid").getArea(this.value);
        }
    });
    $("#collectionAddressRid").change(function () {
        $("#collectionAddressRname").val($(this).find('option:selected').text());
    });
    //省市级联end

    //催收对象
    $("#collectionObjId").getCollectionObjList({ projectId: projectId }).change(function () {
        var text = $(this).find('option:selected').text();
        $("[name='collectionObjRealname']").val(text);
    });

    ////催收人
    $("#collectionUserId").getCollectionUserList().change(function () {
        var text = $(this).find('option:selected').text();
        $("[name='collectionUserRealname']").val(text);
    });

    //催收日期
    $("[name='collectionDate']").getToday();


    //催收方式
    $("#collectionType").change(function () {
        var val = $(this).val();
        if (val == 1) {
            $(".collectionType2").hide();
            $(".collectionType3").hide();
            $(".collectionType23").hide();
            $("#collectionRecordImg").addClass("hide");
        }

        if (val == 2) {
            $(".collectionType2").show();
            $(".collectionType23").show();
            $(".collectionType3").hide();
            $("#collectionRecordImg").removeClass("hide");
        }

        if (val == 3) {
            $(".collectionType2").hide();
            $(".collectionType23").show();
            $(".collectionType3").show();
            $("#collectionRecordImg").removeClass("hide");
        }

        $("#collectionUserId").getCollectionUserList();
    });

    //催收结果
    $("#collectionResult").change(function () {
        var val = $(this).val();
        if (val == 1) {
            $(".collectionResult1").show();
        } else {
            $(".collectionResult1").hide();
        }
    });

    //全额还款
    $("[name='isFullPayment']").click(function () {
        var checkedV = $("input[name='isFullPayment']:checked").val();
        if (checkedV == 1) {
            var a = parseFloat($("[name='overdueTotalAmount']").val() || 0);
            var b = parseFloat($("[name='advanceBalanceAmount']").val() || 0);
            $("[name='willPaymentAmount']").val((a + b).toFixed(2));
        } else {
            $("[name='willPaymentAmount']").val(0);
        }
    });

    //是否委外
    $("[name='isOutsource']").click(function () {
        var checkedV = $("input[name='isOutsource']:checked").val();
        $("#collectionUserId").getCollectionUserList();
    });

    //保存催收信息
    $("#btn-save").click(function () {
        function save() {
            //如果是新增催收对象
            var formData = $("#collectionForm_2").values();
            if ($('.newAddPersonInfo').attr('display') === 'none') {
                formData.collectionObjRealname = $('#collectionObjRealname2').val();
            }

            comn.ajax({
                url: interUrl.collectionManage.loanCollectionInfoSave,
                data: $.extend(formData, { projectId: projectId, planNo: currentPlanNo, id: $("#keyId").val() }),
                success: function (res) {
                    $("#keyId").val(res.data)
                    tip({
                        content: res.message || "保存成功!"
                    });
                    comn.closeTabOnly();
                }
            });
        }

        $("#collectionForm_2").validate();
        if ($("#collectionForm_2").valid() == true) {
            if (($("#collectionType").val() === "3") && ($("#fileType").children().length < 2)) {
                tip({
                    content: '律师函催收请上传至少两个催收材料'
                });
                return
            }

            //上门催收-图片未上传提示
            if (($("#collectionType").val() === "2") && ($("#fileType").children().length === 0)) {
                $("#isUpdateImg").modal("show");
                $("#BtnSure").unbind("click").on("click", function () {
                    save();
                });
                return
            }
            save();

        }
    });

    //图片上传封装函数
    base64 = function (file, index, callback) {
        return lrz(file).then(function (rst) {
            var imgRst;
            imgRst = rst.base64;//获取到图片base64
            return typeof callback === "function" ? callback(file, imgRst, index) : void 0;
        });
    };
    //图片上传
    $(".upImage").unbind("click").click(function () {
        var _this = $(this);
        $("#collectionForm_2").validate();
        if ($("#collectionForm_2").valid() == true) {
            var keyId = $("#keyId").val();
            //如果是修改
            if (keyId) {
                _this.parent("div").find(".upImageInput").trigger("click");
                return false;
            } else {
                comn.ajax({
                    url: interUrl.collectionManage.loanCollectionInfoSave,
                    data: $.extend($("#collectionForm_2").values(), { projectId: projectId, planNo: currentPlanNo, id: $("#keyId").val() }),
                    success: function (res) {
                        $("#keyId").val(res.data);
                    }
                });
            }
            _this.parent("div").find(".upImageInput").trigger("click");
        }
    });
    //ajax上传图片
    function uploadImg(imgBase64, imgName, tableKeyValue) {
        if (!$("#keyId").val()) {
            return false;
        }
        comn.ajax({
            url: interUrl.common.commonImgUploadFile,
            data: {
                tableName: tableName,
                tableKeyValue: tableKeyValue,
                filePath: imgBase64,
                fileName: imgName,
                type: 1
            },
            success: function (res) {
                html = ["<li data-id='" + res.data + "'>",
                "<img class='img showImg' src='" + imgBase64 + "' data-src='" + imgBase64 + "' height='57' />",
                    "<div class='text-center'><a href='javascript:;' class='upCancle'>删除</a></div>",
                    "</li>"].join("");

                $("#fileType").prepend(html);
            }
        });
    }
    //图片上传前保存，会返回个id
    function save_s(o, name) {
        uploadImg(o, name, $("#keyId").val());
    }
    //图片上传域改变时触发
    $(".upImageInput").change(function () {
        var _this = $(this);
        var fileArr, i, j, k, len, results;
        fileArr = this.files;
        results = [];

        for (k = j = 0, len = fileArr.length; j < len; k = ++j) {
            i = fileArr[k];
            results.push(base64(i, k, function (f, o, index) {
                save_s(o, f.name);
            }));
        }
        return results;
    });
    //删除图片  delDocument
    $(".files-ul").on("click", ".upCancle", function () {
        var _this;
        _this = $(this);
        fileId = _this.parents("li").attr("data-id");
        comn.ajax({
            url: interUrl.common.commonImgDelFile,
            data: {
                fileId: fileId
            },
            success: function (res) {
                _this.parents("li").remove();
                _this.parents("ul").prev("div").find(".upImageInput").val("");
                tip({
                    content: "\u5220\u9664\u6210\u529f"
                });
            }
        });

    });
    //查看图片
    $(document).on("click", ".showImg", function () {
        var _this = $(this), imgArr = [];
        var imgA = _this.parents("#fileType").find("img.showImg");
        var _index = _this.parent().index();
        imgA.each(function (index) {
            imgArr.push($(this).attr("data-src"));
        });
        window.parent.switchImage(imgArr, _index);
    });

    //获取图片
    function getDocumentList(id) {
        var result = "";
        comn.ajax({
            url: interUrl.common.commonImgGetFileList,
            data: {
                tableName: tableName,
                tableKeyValue: id
            },
            success: function (res) {
                var del = ((args["typeOption"] === "submit")) ? "<a href='javascript:;' class='upCancle'>删除</a>" : "";
                var i, list = res.data;
                for (i = 0; i < list.length; i++) {
                    var o = list[i];
                    result += "<li class='loaded' data-id='" + o.id + "'>" +
                        "<img class='img showImg img-thumbnail' src='" + o.filePath + "' height='57' style='height:57px' data-src='" + o.filePath + "' />" +
                        "<div class='text-center'>" + del + "</div>" +
                        "</li>";
                }
                $("#fileType").html(result);
            }
        });
    }

    //新增催收对象
    $('#newAddPerson').bind('click', function () {
        $('.newAddPersonInfo').show();

        //催收对象下拉禁止选择
        $('#collectionObjId').removeClass('required');
        $("#collectionObjId option:first").prop("selected", 'selected');
        $('#collectionObjId').prop("disabled", true);
    })
    //去掉催收对象
    $('#reduceAddPerson').bind('click', function () {
        $('.newAddPersonInfo').hide();

        $('.newAddPersonInfo input').val('');
        $('.newAddPersonInfo select').val('');

        //催收对象恢复选择
        $('#collectionObjId').addClass('required');
        $('#collectionObjId').prop("disabled", false);
    })

    //首次加载执行方法
    getInfo();
});