var args , zTreeOnClick;
args = comn.getArgs();
current_node = null;
jQuery.browser = {};

(function() {
    jQuery.browser.msie = false;
    jQuery.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        jQuery.browser.msie = true;
        return jQuery.browser.version = RegExp.$1;
    }
})();

zTreeOnClick = function(event, treeId, treeNod) {
    current_node = treeNod;
    console.log(current_node);
    $("#stop .title").html(current_node['isInuse'] == false ? "&nbsp;启用&nbsp;" : "&nbsp;停用&nbsp;");
};

openTree = function() {
    comn.ajax({
        url : interUrl.directory.tree,
        success : function(res) {
            var treeObj;
            treeObj = $.fn.zTree.init($("#tree"), {
                showLine : true,
                expand : true,
                callback : {
                    onClick : zTreeOnClick
                },
                data : {
                    key : {
                        name : "directoryPath"
                    },
                    simpleData : {
                        enable : true,
                        idKey : "id",
                        pIdKey : "parentDicId",
                        rootPId : 0
                    }
                }
            }, res.data);
            return treeObj.expandAll(true);
        }
    });
}

$(function() {
    var validate = {
        rules : {
            companyPhone : {
                phoneMix : true
            },
            companyFax : {
                telephone : true
            }
        },
        messages : {
            companyPhone : {
                phoneMix : "公司电话格式不正确"
            },
            companyFax : {
                telephone : "传真格式不正确"
            }
        }
    };
    $("#add").click(function() {
        $("#addCatalogue .modal-title").html("新增目录");
        $("#addCatalogueForm input").val("");
        var childNodeHtml = $("#tree").children().html();
        console.log(childNodeHtml)
        if(childNodeHtml == null) {
            $("#addCatalogue").modal("show");
            $("#parentDicId").val(0);
        } else {
            if (current_node) {
                $("#addCatalogue").modal("show");
                $("#parentDicId").val((current_node.getParentNode() == []) ? '0' : current_node.id);
                var _name = "";
                if ((current_node.directoryPath).indexOf('-停用') >= 0) {
                    _name = (current_node.directoryPath).split("-")[0];
                    $("#parentDicName").val(_name);
                } else {
                    $("#parentDicName").val(current_node.directoryPath);
                }
            } else {
                return tip({
                    content : "请选择一个目录!"
                });
            }
        }
    });
    $("#modify").click(function() {
        $("#addCatalogueForm input").val("");
        console.log(current_node)
        if (current_node) {
            $("#addCatalogue").modal("show");
            $("#addCatalogue .modal-title").html("修改目录");
            var o = current_node;
            if ((o.directoryPath).indexOf('-停用') >= 0) {
                o.directoryPath = (o.directoryPath).split("-")[0];
            }
            $("#addCatalogueForm").values(o);
            $("#parentDicName").val(current_node.getParentNode().directoryPath);
        } else {
            tip({
                content : "请选择一个目录!"
            });
        }
    });
    $("#saveCatalogue").click(function() {
        if ($("#addCatalogueForm").valid() == false)
            return;
        saveCatalogue($("#addCatalogueForm"));
    });
    $("#stop").click(function() {
        if (!current_node) {
            tip({
                content : "请选择一个目录!"
            });
            return false;
        }
        var _data = {
            id : current_node['id'],
            isInuse : (current_node['isInuse'] == false ? 'true' : 'false')
        }
        return comn.ajax({
            url : interUrl.directory.setStatus,
            data : _data,
            success : function(res) {
                tip({
                    content : "操作成功!"
                });
                openTree();
                current_node = null;
            }
        });
    });
    $("#del").click(function() {
        if (!current_node) {
            tip({
                content : "请选择一个银行!"
            });
            return false;
        }
        $("#sure").modal("show");
        return $("#OK").unbind("click").on("click", function() {
            return comn.ajax({
                url : interUrl.directory.del,
                data : {
                    id : current_node.id
                },
                success : function(res) {
                    tip({
                        content : "操作成功!"
                    });
                    $("#sure").modal("hide");
                    openTree();
                    current_node = null;
                }
            });
        });
    });
    openTree();
});
saveCatalogue = function(_form, _callback) {
    var _data = _form.values();
    var _url = _data.id ? interUrl.directory.update : interUrl.directory.add;
    return comn.ajax({
        url : _url,
        data : _data,
        success : function(res) {
            if (res.status == 10000) {
                if (_callback)
                    _callback();
            } else {
                tip({
                    content : res.message
                });
                $("#addCatalogue").modal("hide");
                current_node = null;
            }
            openTree();
        }
    });
}
