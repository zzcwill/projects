var alarmData,operation,operate;
var imei = comn.getArgs()['imei'];
if(imei) {
  $('input[name=imei]').val(imei);
}
alarmData = function (params) {
  return tableData(params,$('#searchForm').values(),interUrl.purchase.getWarnLsit,function () {
    var tableData = $('#alarmDeal').bootstrapTable('getData');
    if(tableData.length < 1) {
      $('#dealAll').attr('disabled','disabled');
      return;
    }
    $('#dealAll').removeAttr('disabled');
  })
};

operation = function (value,row,index) {
  if(row.status == 1) {
    return ['<button type="button" class="btn btn-warning btn-xs" disabled>已读</button>']
  }
  return ['<button type="button" class="btn btn-primary btn-xs deal">标记为已读处理</button>'].join('')
};

operate = {
  'click .deal': function (e,a,item,index) {
    console.log(item.id);
    comn.ajax({
      url: interUrl.purchase.doWarnMsg,
      data: {
        ids: item.id || ''
      },
      success: function (res) {
        tip({
          content: res.message || '标记已读完成'
        });
        $('#alarmDeal').bootstrapTable('refresh',{url:'...'})
      }
    })
  }
};

$('#btn-search').click(function () {
  $('#alarmDeal').bootstrapTable('refresh',{url: '...'})
});

$('#dealAll').on('click',function () {
  var ids = [];
  var tableData = $('#alarmDeal').bootstrapTable('getData');
  tableData.forEach(function (item) {
    ids.push(item.id);
  });
  if(ids.length > 0) {
    comn.ajax({
      url: interUrl.purchase.doWarnMsg,
      data: {
        ids: ids.join(',')
      },
      success: function (res) {
        tip({
          content: res.message || '标记已读完成'
        });
        $('#alarmDeal').bootstrapTable('refresh',{url:'...'})
      }
    })
  }
});
$.getCommonMethodPort([['#warnZacode','WarnTypeMappingZA']]);