/**
 * Created by apple on 17/12/7.
 */
Vue.component('com-select',vueComponent.selectComp);
Vue.component('com-input',vueComponent.inputComponent);
Vue.component('com-table',vueComponent.tableComp);
Vue.component('modal-fade',vueComponent.modalFade);
Vue.component('text-area',vueComponent.textArea);

var vm = new Vue({
  el:'#sealList',
  data:{
    title:'新增印章',
    status: [
      {name:'启用',value:'1'},
      {name:'停用',value:'0'}
    ],
    field: [
      {field:'orgName',text:'分公司'},
      {field:'sealTypeName',text:'印章类型'},
      {field:'sealName',text:'印章名称'},
      {field:'createTime',text:'新增日期'},
      {field:'modifyTime',text:'最后修改日期'},
      {field:'status',text:'模版状态',formater:'temStatus'}
    ],
    imgSrc: {}
  },
  methods: {
    btnSearch: function () {
      $('#tableList').bootstrapTable('refresh', {url: '...'})
    },
    addSeal: function () {
      this.imgSrc = {};
      $('#modalForm').values({});
      this.title = '新增印章';
      $('#sealMode').modal('show');
    },
    saveSeal: function () {
      var _this = this;
      $('#modalForm').validate();
      if ($('#modalForm').valid()) {
        if (_this.imgSrc.imagePath) {
          comn.ajax({
            url: interUrl.onlineSigning.saveSeal,
            data: $.extend($('#modalForm').values(), {
              sealImageData: _this.imgSrc.imagePath
            }),
            success: function (res) {
              $('#sealMode').modal('hide');
              _this.imgSrc = {};
              $('#tableList').bootstrapTable('refresh', {url: '...'})
            }
          })
        }else{
          layer.msg('必须上传印章图片')
        }
      }

    },
    //图片选择
    imgUp: function () {
      $("#upImageInput").trigger('click');
    },
    //上传图片
    imgGet: function () {
      var _this = this;
      var file = event.target.files[0];
      var typeImg = function (file) {
        var index = file.name.indexOf('.');
        var imgType = file.name.substr(index);
        var reg = /^\.png|\.PNG$/;
        if (reg.test(imgType) && file.size < 51200) {
          lrz(file)
            .then(function (rst) {
              var imgRst = rst.base64;
              _this.imgSrc = {
                imageName: file.name,
                imagePath: imgRst
              };
            })
        } else {
          layer.msg('图片上传只支持小于50KB大小的png格式图片');
        }
      };
      typeImg(file);

    },
    //删除图片
    imgDelete: function () {
      this.imgSrc = {};
      tip({
        content: '图片删除成功'
      });
    }
  },
  ready: function () {
    $.getCommonMethodPort([['#sealType','SealType']]);
    $('#orgId').getOrg();
    $.getCommonMethodPort([['#modalSealType','SealType']]);
    $('#modalOrg').getOrg();
  }
});

var dataLoad,operation,operate,temStatus;
temStatus = function (value) {
  return ['停用','启用'][value];
}
dataLoad = function(params) {
  tableData(params, $("#searchForm").values(), interUrl.onlineSigning.sealList)
};

operation = function (value,row,index) {
  return ['<div class="btn-group">',
    '<button type="button" class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">',
    '操作 <span class="caret"></span>',
    '</button>',
    '<ul class="dropdown-menu">',
      '<li><a href="javascript:;" class="changeStatus">'+ (row.status == 0 ? '启用' :'停用') +'</a></li>',
      '<li><a href="javascript:;" class="viewDetail">查看详情</a></li>',
    '</ul>',
    '</div>'].join("");
};
operate = {
  'click .changeStatus': function (e,a,item,index) {
    var status = [1,0][item.status];
    comn.ajax({
      url: interUrl.onlineSigning.statusChange,
      data:{
        status: status,
        id: item.id
      },
      success: function () {
        layer.msg('操作成功');
        $('#tableList').bootstrapTable('refresh',{url:'...'})
      }
    })
  },
  'click .viewDetail': function (e,a,item,index) {
    vm.title='查看详情';
    $('#sealMode').modal('show');
    $('#modalForm').values(item);
    vm.imgSrc = {
      imagePath: item.sealImageData
    }
  }
};

$('#modalOrg').on('change', function () {
  var text = $(this).find('option:selected').html();
  $('input[name=orgName]').val(text)
});
$('#modalSealType').on('change', function () {
  var text = $(this).find('option:selected').html();
  $('input[name=sealTypeName]').val(text)
});