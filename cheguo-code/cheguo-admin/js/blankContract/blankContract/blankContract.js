var current_node,contract,statue,handle,operate;
jQuery.browser = {};
(function() {
  jQuery.browser.msie = false;
  jQuery.browser.version = 0;
  if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
    jQuery.browser.msie = true;
    return jQuery.browser.version = RegExp.$1;
  }
})();

zTreeOnClick = function(event,treeId,treeNode){
  $("#stop .title").html(treeNode['status']==0 ? '启用' : "停用");
  $('.bankTitle').html(treeNode.name);
  current_node = treeNode;
  $('#table').bootstrapTable('refresh',{url:'...'});
};
var setting = {
  showLine: true,
  expand: true,
  callback: {
    onClick: zTreeOnClick
  },
  data:{
    key:{
      name:'name'
    }
  }
};
//加载空白合同列表
var ontree = function(){
  comn.ajax({
    url: interUrl.blankContract.list,
    success: function(res){
      if(res.data.length > 0){
        var zTreeObj;
        zTreeObj = $.fn.zTree.init($("#tree"), setting, res.data);
        $("#tree_1_a").trigger('click');
      }else{
        $('#contractList').addClass('hidden');
      }
    }
  })
};
//新增合同类型
$("#add").on('click',function(){
  $("#addContract").modal('show');
});
$("#saveContract").on('click',function(){
  $("#addType").validate();
  if($("#addType").valid()){
    comn.ajax({
      url: interUrl.blankContract.addType,
      data: $.extend({},$('#addType').values()),
      success: function(){
        $("#addContract").modal('hide');
        ontree();
      }
    })
  }
})
//删除合同
$("#del").on('click',function(){
  if(current_node){
    comn.ajax({
      url:interUrl.blankContract.delType,
      data:{
        typeId: current_node.id
      },
      success: function(){
        tip({
          content:'删除成功'
        });
        ontree();
      }
    })
  }else{
    tip({
      content:'请选择合同类型'
    })
  }
});
//启用/停用 合同
$("#stop").on('click',function(){
  var url;
  if(current_node){
    if(current_node.status == 0){
      url = interUrl.blankContract.startType;
    }else{
      url = interUrl.blankContract.stopType
    }
    return comn.ajax({
      url: url,
      data:{
        contractTypeId: current_node.id
      },
      success: function(){
        comn.ajax({
          url: interUrl.blankContract.list,
          success: function(res){
            var zTreeObj;
            zTreeObj = $.fn.zTree.init($("#tree"), setting, res.data);
            $('#' + current_node.tId + '_a').trigger('click');
          }
        })
      }
    })
  }
  tip({
    content:'请选择合同类型'
  })
});

//银行列表获取
var type = 'new';//操作类型: new: 添加银行 modify: 修改银行
var bankId;
contract = function (params) {
  if(current_node){
    tableData(params,{contractTypeId: current_node.id},interUrl.blankContract.bankList)
  }
};
//状态
statue = function(value,row,index){
  if(current_node.status == 0){
    return '--'
  }
  return ['停用','启用'][value]
};
//操作
handle = function(value,row,index){
  if(current_node.status == 0){
    return '--'
  }
  return '<div class="btn-group">' +
    '<button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
    '操作<span class="caret"></span>' +
    '</button>' +
    '<ul class="dropdown-menu">' +
    '<li><a href="javascript:;" class="changeStatue">'+(row.status == 0?'启用':'停用')+'</a></li>' +
    '<li><a href="javascript:;" class="modify">修改</a></li>' +
    '<li><a href="javascript:;" class="delete">删除</a></li>' +
    '</ul>'+
    '</div>'
};
operate = {
  //启用/停用
  'click .changeStatue': function(e,a,item,index){
    var url,message;
    if(item.status == 0){
      url = interUrl.blankContract.bankStart;
      message = '启用成功'
    }else{
      url = interUrl.blankContract.bankStop;
      message= '停用成功'
    }
    comn.ajax({
      url: url,
      data: {
        contractBankId: item.id
      },
      success: function(){
        $('#table').bootstrapTable('refresh',{url:'...'});
        tip({
          content:message
        })
      }
    })
  },
  //修改银行
  'click .modify': function(e,a,item,index){
    $("#addBank").modal('show');
    $("#bankForm").values(item);
    $("#bankModal").html(current_node.name + '-修改银行');
    type = 'modify';
    bankId = item.id;
  },
  //删除银行
  'click .delete': function(e,a,item,index){
      comn.ajax({
        url: interUrl.blankContract.bankDel,
        data: {bankId: item.id},
        success: function(){
          $('#table').bootstrapTable('refresh',{url:'...'});
          tip({
            content:'删除成功'
          })
        }
      })
  }
};
//获取银行名称
$("#bankId").on('change', function () {
  var text = $(this).find('option:selected').html();
  $("input[name=bankName]").val(text);
});
//新增银行
$('#newBank').on('click', function () {
  $("#addBank").modal('show');
  $("#bankModal").html(current_node.name + '-添加银行');
  type = 'new'
});
//银行(新增/修改)保存
$("#saveBank").on('click',function(){
  var url = interUrl.blankContract.addBank;
  var data = {
    contractTypeName: current_node.name,
    contractTypeId: current_node.id
  };
  if(type == 'modify'){
    url = interUrl.blankContract.updateBank;
    data = Object.assign(data,{id: bankId});
  }
  $("#bankForm").validate();
  if($("#bankForm").valid()){
    comn.ajax({
      url: url,
      data: $.extend($("#bankForm").values(),data),
      success: function(res){
        $("#addBank").modal('hide');
        $("#table").bootstrapTable('refresh',{url: '...'});
      }
    })
  }

});
//初始化合同列表和合作银行
$(document).ready(function(){
  ontree();
  comn.ajax({
    url: interUrl.bank.tree,
    success: function(res){
      var html = '<option value="">--请选择--</option>' + (function(){
          var content = [];
          for(var i = 0;i < res.data.length;i++){
            var o = res.data[i];
            content.push('<option value="'+ o.id+'">'+ o.bankName+'</option>')
          }
          return content.join("");
        })();
    $('#bankId').html(html);
    }
  })
});
