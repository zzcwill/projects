var args, dataLoad_1, tableEvent, handle, zTreeOnClick,g_isModify = false;
args = comn.getArgs();
jQuery.browser = {};

(function() {
    jQuery.browser.msie = false;
    jQuery.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        jQuery.browser.msie = true;
        return jQuery.browser.version = RegExp.$1;
    }
})();

var current_node = null;
zTreeOnClick = function(event, treeId, treeNod) {
    current_node = treeNod;
    openBank();
};

openBank = function(){
    setButtonStatus();

    comn.ajax({
        url: interUrl.channelDealer.get,
        data: {id:current_node.id},
        success: function(res) {
            if(res.data){
                $("#channelForm").values(current_node);
            }
        }
    });
    $("#stop .title").html(current_node['status']==0?"启用":"停用");
};

openTree = function(){
    comn.ajax({
        url: interUrl.channelDealer.tree,
        success: function(res) {
            var treeObj;
            treeObj = $.fn.zTree.init($("#tree"), {
                showLine: true,
                expand: true,
                callback: {
                    onClick: zTreeOnClick
                },
                data: {
                    key: {
                        name: "name"
                    },
                    simpleData: {
                        enable: true,
                        idKey: "id",
                        pIdKey: "parentId",
                        rootPId: 0
                    }
                }
            }, res.data);

            return treeObj.expandAll(true);
        }
    });
}
setButtonStatus = function(){
    var span = $('#modify').find("span:last");
    if(g_isModify==true){
        span.html("&nbsp;取消&nbsp;");
        $("#channelForm").find(":input").attr("disabled",false);
        $("#channelForm").find("#save").show();
    }else{
        span.html("&nbsp;修改&nbsp;");
        $("#channelForm").find(":input").not(":button").attr("disabled",true);
        $("#channelForm").find("#save").hide();
    }
}
saveChannel = function(_form, _callback){
    var _data = _form.values();
    var _url = _data.id?interUrl.channelDealer.update:interUrl.channelDealer.add;
    return comn.ajax({
        url: _url,
        data: _data,
        success: function(res) {
            if(res.status==10000){
                if(_callback)_callback();
                openTree();
                g_isModify = false;
                setButtonStatus();
            }else{
                tip({content: res.message});
            }
        }
    });
}

$(function() {
    $("#province_1").getProvince().change(function() {
        var v = this.value || $(this).attr('defaultValue');
        if (v) {
            $("#area_1").val("");
            return $("#city_1").getCity(v).unbind("change").change(function() {
                if (this.value || $(this).attr('defaultValue')) {
                    return $("#area_1").getArea(this.value || $(this).attr('defaultValue'));
                }
            });
        }
    });
    $("#province_2").getProvince().change(function() {
        if (this.value) {
            $("#area_2").val("");
            return $("#city_2").getCity(this.value).unbind("change").change(function() {
                if (this.value) {
                    return $("#area_2").getArea(this.value);
                }
            });
        }
    });

    var validate = {
        rules: {
            tel: {phoneMix: true},
        },
        messages: {
            tel: {phoneMix: "公司电话格式不正确"},
        }
    };
    $("#addChannelForm").validate(validate);
    $("#channelForm").validate(validate);
    $("#add").click(function() {
        $("#addChannel").modal("show");
    });
    $("#saveChannel").click(function() {
        if($("#addChannelForm").valid()==false)return;
        saveChannel($("#addChannelForm"), function(){$("#addChannel").modal("hide");});
    });
    $("#modify").click(function(){
        g_isModify = g_isModify?false:true;
        setButtonStatus();
    });
    $("#save").click(function(){
        if($("#channelForm").valid()==false)return;
        saveChannel($("#channelForm"));
    });
    $("#stop").click(function() {
        if(!current_node){
            tip({content: "请选择一个保险公司!"});
        }
        return comn.ajax({
            url: interUrl.channelDealer["setStatus"],
            data: {
                id: current_node.id,
                status: (current_node['status']==0?1:0)
            },
            success: function(res) {
                tip({content: "操作成功!"});
                openTree();
            }
        });
    });
    $("#del").click(function() {
        if(!current_node){
            tip({content: "请选择一个保险公司!"});
        }
        $("#sure").modal("show");
        return $("#OK").unbind("click").on("click", function() {
            return comn.ajax({
                url: interUrl.channelDealer["setStatus"],
                data: {
                    id: current_node.id,
                    status: '-1'
                },
                success: function(res) {
                    tip({content: "操作成功!"});
                    $("#sure").modal("hide");
                    openTree();
                }
            });
        });
    });
    openTree();
});

