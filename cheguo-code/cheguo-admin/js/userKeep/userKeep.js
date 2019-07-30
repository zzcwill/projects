var keep,userTable,handle,tableEvent,map,user,userChoice,address,tableData,statue;
//获取机构
$(".orgId").getOrg();
$("#orgId").getOrg();
//用户角色信息
$("#role").getRole();
//新增地址
$("#newAddress").click(function(){
    address(0);
});
tableData = function(params, data, url, callback){
    var p;
    p = params.data;
    if (url) {
        return comn.ajax({
            url: url,
            data: $.extend(data, p),
            success: function(res) {
                params.success({
                    'total': res.totalItem,
                    'rows': res.data
                });
                params.complete();
                return typeof callback === "function" ? callback(res) : void 0;
            }
        });
    }
};
//保管地列表获取
keep=function(params){
    var p;
    p = params.data;
    tableData(
        params,
        $.extend($("#searchForm").values(),p),
        'documentAddressManage/list'
    )
};
//保管员列表获取
userTable=function(params){
    var p;
    p = params.data;
    tableData(params,
        $.extend($("#userForm").values(),p,{status:'NORMAL'}),
        'za/user/list'
    )
};
handle=function(value,row,index){
    var li = row.status == 0 ? '<li><a href="javascript:;" class="start">启用</a></li>' : '<li><a a href="javascript:;" class="stop">停用</a></li>';
    return ["<div class='btn-group btn-group-xs'>",
        "<button type='button' class='btn btn-primary'>操作</button>",
        "<button type='button' class='btn btn-primary dropdown-toggle' " +
        "data-toggle='dropdown'>", "<span class='caret'></span>",
        "<span class='sr-only'>下拉切换</span>", "</button>",
        "<ul class='dropdown-menu' role='menu'>",
        li,
        "<li><a class='modify'>修改</a></li>",
        "<li><a class='view'>查看</a></li>", "</ul>",
        "</div>"].join("");
};
tableEvent={
    'click .modify': function(e,a,item,index){
        comn.ajax({
            url:'documentAddressManage/get',
            data:{id:item.id},
            success:function(res){
                address(2,res.data);
            }
        })
    },
    'click .view' :function(e,a,item,index){
        comn.ajax({
            url:'documentAddressManage/get',
            data:{id:item.id},
            success:function(res){
                address(1,res.data);
            }
        })
    },
    'click .start': function(e,a,item,index){
        comn.ajax({
            url: 'documentAddressManage/open',
            data: {
                id: item.id
            },
            success: function (){
                $("#table").bootstrapTable('refresh',{url:'...'})
            }
        })
    },
    'click .stop': function(e,a,item,index){
        comn.ajax({
            url: 'documentAddressManage/stop',
            data: {
                id: item.id
            },
            success: function(res){
                $("#table").bootstrapTable('refresh',{url:'...'})
            }
        })
    }
};
//选择用户
user=function(value,row,index){
    return ['<a href="javascript:;" class="choose">选择</a>']
};
userChoice={
    'click .choose': function(e,a,item,index){
        $("#keepUser").val(item.realname);
        $("input[name=keepUserId]").val(item.uid);
        $("#userMode").modal("hide");
    }
};
statue = function(value,row,index){
    return ['停用','启用'][value];
};
//保管信息
address=function(type,data){
    //type=0:新增 type=1:查看 type=2:修改
    var html=[];
    html.push(
        '<form id="addressForm" class="form-horizontal">',
        '<fieldset '+(type==1?"disabled":"")+'>',
        '<div class="form-group form-group-sm">',
        '<div class="input-tip">',
        '<label class="col-md-1 col-xs-1 col-sm-1 control-label">',
        '<sapn class="text-danger">*&nbsp;</sapn>',
        '保管地:</label>',
        '<div class="col-md-3 col-xs-3 col-sm-3">',
        '<input type="text" name="name" placeholder="请输入保管地址" class="form-control required">',
        '</div>',
        '</div>',
        '<div class="input-tip">',
        '<label class="col-md-1 col-xs-1 col-sm-1 control-label">',
        '<sapn class="text-danger">*&nbsp;</sapn>',
        '所属机构:</label>',
        '<div class="col-md-3 col-xs-3 col-sm-3">',
        '<input type="hidden" name="orgName">',
        '<select name="orgId" id="org" class="form-control required orgId">',

        '</select>',
        '</div>',
        '</div>',
        '<div class="input-tip">',
        '<label class="col-md-1 col-xs-1 col-sm-1 control-label">',
        '<sapn class="text-danger">*&nbsp;</sapn>',
        '保管员:</label>',
        '<div class="col-md-3 col-xs-3 col-sm-3">',
        '<div class="input-group input-group-sm">',
        '<input type="hidden" name="keepUserId">',
        '<input type="text" name="keepUserName" readonly="readonly" class="form-control required" id="keepUser">',
        '<span class="input-group-btn">',
        '<button class="btn btn-primary" type="button" id="addUser">...</button>',
        '</span>',
        '</div>',
        '</div>',
        '</div>',
        '</div>',
        '<div class="form-group form-group-sm">',
        '<div class="input-tip">',
        '<label class="col-md-1 col-xs-1 col-sm-1 control-label">省/直辖市:</label>',
        '<div class="col-md-3 col-xs-3 col-sm-3">',
        '<input type="hidden" name="provinceName">',
        '<select name="provinceCode" id="province" class="form-control">',
        '</select>',
        '</div>',
        '</div>',
        '<div class="input-tip">',
        '<label class="col-md-1 col-xs-1 col-sm-1 control-label">市:</label>',
        '<div class="col-md-3 col-xs-3 col-sm-3">',
        '<input type="hidden" name="cityName">',
        '<select name="cityCode" id="city" class="form-control">',
        '</select>',
        '</div>',
        '</div>',
        '<div class="input-tip">',
        '<label class="col-md-1 col-xs-1 col-sm-1 control-label">区/县:</label>',
        '<div class="col-md-3 col-xs-3 col-sm-3">',
        '<input type="hidden" name="areaName">',
        '<select name="areaCode" id="area" class="form-control">',
        '</select>',
        '</div>',
        '</div>',
        '</div>',
        '<div class="form-group form-group-sm">',
        '<div class="input-tip">',
        '<label class="col-md-1 col-xs-1 col-sm-1 control-label">详细地址:</label>',
        '<div class="col-md-3 col-xs-3 col-sm-3">',
        '<input type="text" name="addrDetail" class="form-control" id="addrDetail" placeholder="请输入详细地址">',
        '</div>',
        '</div>',
        '<div class="col-md-1 col-xs-1 col-sm-1">',
        '<button type="button" class="btn btn-primary" id="getPosition">获取地址</button>',
        '</div>',
        '<div class="input-tip">',
        '<label class="col-md-1 col-xs-1 col-sm-1 col-md-offset-3 col-xs-offset-3 col-sm-offset-3 control-label">',
        '<sapn class="text-danger">*&nbsp;</sapn>',
        '坐标位置:</label>',
        '<div class="col-md-3 col-xs-3 col-sm-3">',
        '<input type="text" name="addrItude" id="position" class="form-control required" readonly>',
        '<input type="hidden" name="addrLongitude" id="longitude">',
        '<input type="hidden" name="addrLatitude" id="latitude">',
        '</div>',
        '</div>',
        '</div>',
        '</fieldset>',
        '<div class="form-group form-group-sm">',
        '<div class="col-md-24 col-xs-24 col-sm-24 text-right">',
        '<button type="button" class="btn btn-primary '+(type==1?"hide":"")+'" id="btn-save">保存</button>',
        '<button type="button" class="btn btn-default" id="btn-cancel">取消</button>',
        '</div>',
        '</div>',
        '<div class="panel panel-default">',
        '<div class="panel-heading">',
        '<h3 class="panel-title">地图</h3>',
        '</div>',
        '<div id="map" style="height: 500px" class="panel-body"></div>',
        '</div>',
        '</form>'
    );
    $("#address").html(html.join(""));

    //初始化地图
    var menu;
    map=new BMap.Map("map");
    menu = new BMap.ContextMenu();
    if(type!=1){
        menu.addItem(new BMap.MenuItem("获取当前位置", function (e) {
            map.clearOverlays();
            map.addOverlay(new BMap.Marker(e));
            $("#position").val(e.lng + "," + e.lat);
            $("#longitude").val(e.lng);   //经度
            $("#latitude").val(e.lat);    //纬度
            return
        }));
    }
    map.addContextMenu(menu);

    $("#province").getProvince();
    $("#org").getOrg();
    //初始化
    var point;
    if(data){
        $("#city").getCity(data.provinceCode);
        $("#area").getArea(data.cityCode);
        $("#addressForm").values(data);
        point=new BMap.Point(data.addrLongitude,data.addrLatitude);
    }else{
        point=new BMap.Point(120.161693, 30.280059);
    }
    map.centerAndZoom(point, 12);
    map.addOverlay(new BMap.Marker(point));
    //省市区三级联动
    $("#province").on('change',function(){
        $("#city").getCity($(this).val());
        var text=$(this).find('option:selected').html();
        $("input[name=provinceName]").val(text);
    });
    $("#city").on('change',function(){
        $("#area").getArea($(this).val());
        var text=$(this).find('option:selected').html();
        $("input[name=cityName]").val(text);
    });
    $("#area").on('change',function(){
        var text=$(this).find('option:selected').html();
        $("input[name=areaName]").val(text);
    });
    //获取机构名称
    $("#org").on('change',function(){
        var text=$(this).find("option:selected").html();
        $("input[name=orgName]").val(text);
    });
    //获取地图地址
    $("#getPosition").click(function(){
        if ($("#province").val()) {
            province = $("#province").find("option:selected").text()
        } else {
            province = ""
        }

        if ($("#city").val()) {
            cityText = $("#city").find("option:selected").text();
            city = cityText == "省直辖县级行政区划" ? "" : cityText;
        } else {
            city = ""
        }

        if ($("#area").val()) {
            area = $("#area").find("option:selected").text()
        } else {
            area = ""
        }
        setPlace(province + city + area + $("#addrDetail").val());
    });

    //保存信息
    $("#btn-save").click(function(){
        $("#addressForm").validate();
        if($("#addressForm").valid()==true){
            if(type==2){
                comn.ajax({
                    url:'documentAddressManage/edit',
                    data:$.extend($("#addressForm").values(),{id:data.id}),
                    success:function(){
                        tip({
                            content:"修改成功"
                        });
                        location.reload();
                        $("#address").html("");
                    }
                })
            }else{
                comn.ajax({
                    url:'documentAddressManage/add',
                    data:$("#addressForm").values(),
                    success:function(){
                        tip({
                            content:'保存成功'
                        });
                        location.reload();
                        $("#address").html("");
                    }
                })
            }

        }
    });

    //取消
    $("#btn-cancel").click(function(){
        $("#address").html("");
    });

    //保管员列表显示
    $("#addUser").click(function(){
        $("#userMode").modal('show');
        $("#orgId").val($("#org").val());
        $("#table2").bootstrapTable("refresh",{url:'...'})
    });
    //查询保管员
    $("#userSearch").click(function(){
        $("#table2").bootstrapTable("refresh",{url:'...'})
    })
};
//查询保管地
$("#btn-search").click(function(){
    $("#table").bootstrapTable('refresh',{url:'...'});
});

function setPlace(address) {//设置地图地点坐标
    var local, sc;
    map.clearOverlays();
    sc = function () {
        try {
            var p;
            p = local.getResults().getPoi(0).point;
            map.centerAndZoom(p, 18);
            return map.addOverlay(new BMap.Marker(p));
        } catch (e) {
            tip({content: '没有搜索到当前地理位置！'});
            /* handle error */
        }
    };
    local = new BMap.LocalSearch(map, {
        onSearchComplete: sc
    });
    return local.search(address);
};

