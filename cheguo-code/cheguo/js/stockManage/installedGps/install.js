//注册组件
Vue.component('v-input',vueComponent.inputComponent);
Vue.component('v-table',vueComponent.tableComp);
Vue.component('v-select',vueComponent.selectComp);
Vue.component('modal',vueComponent.modalFade);
/*
  toInstallTable: 待安装数据列表
  installedTable: 已安装数据列表
  imgSrc: 图片数据展示
  gpsData: 传给后台的要安装的数据
  imei: 安装的gps 唯一imei号
  index: 安装的GPS数据索引值
  imgId: 安装图片索引值
  type: 操作类型 install: 设备安装  modify: 修改安装 view: 查看详情
  imgList: 查看照片详情数据
 */
var vm=new Vue({
  el:"#install",
  data:{
    toInstallTable:[
      {field:'supplierName',text:'供应商'},
      {field:'productSpec',text:'规格型号'},
      {field:'productType',text:'产品类型',formater:'typeProduct'},
      {field:'imei',text:'IMEI'},
      {field:'sim',text:'SIM'},
      {field:'stockTimeClerk',text:'签收时间'}
    ],
    installedTable:[
      {field:'supplierName',text:'供应商'},
      {field:'productSpec',text:'规格型号'},
      {field:'productType',text:'产品类型',formater:'typeProduct'},
      {field:'imei',text:'IMEI'},
      {field:'sim',text:'SIM'},
      {field:'position',text:'安装位置'},
      {field:'createTime',text:'安装时间'},
      {field:'userName',text:'安装人'}
    ],
    imgSrc:[],
    gpsData:[],
    installProductId:0,
    imei:0,
    index:'',
    imgId: 0,
    type: 'install',
    imgList: []
  },
  methods:{
    //设备安装数据添加
    allocation: function(){
      var gpData=$("#table1").bootstrapTable('getSelections');
      this.gpsData=gpData;
    },
    //删除安装数据
    delete: function(id){
      this.gpsData=this.gpsData.filter(function(ele,index){
        return ele.id != id;
      });
    },
    //列表查询
    btnSearch: function(){
      var table = $('.tab-pane.active').find('table').eq(1).attr('id');
      $("#" + table).bootstrapTable('refresh', {url: '...'});
    },
    //重置查询条件
    reset: function(){
      var args = comn.getArgs();
      Vue.nextTick(function(){
        $("#orgId").getOrg(args['orgId']);
        $("input[name=productType]").val("");
        $("#productType").attr("disabled",false);
        $("#spec").html("<option value=''>--请选择--</option>");
      })

    },
    //图片选择
    imgUp: function(id,index){
      this.index=index;
      this.imei=id;
      $("#upImageInput").trigger('click');
    },
    //上传图片
    imgGet: function(){
      var _this=this;
      _this.imgId += 1;
      var file= event.target.files[0];
      var typeImg = function(file){
        var index = file.name.indexOf('.');
        var imgType = file.name.substr(index);
        var reg = /^\.jpg|png|.JPG|.PNG$/;
        if(reg.test(imgType)){
          lrz(file)
            .then(function(rst){
              var imgRst=rst.base64;
              var arr={};
              var args = comn.getArgs();
              arr = {
                imei:_this.imei,
                imageName:file.name,
                imagePath:imgRst,
                imgId: _this.imgId,
                projectId:args['projectId'],
                position:$(".position")[_this.index].value
              };
              _this.imgSrc.push(arr);
            })
        }else{
          tip({
            content:'图片上传只支持jpg/png格式'
          })
        };
      };
      typeImg(file);

    },
    //删除图片
    imgDelete: function(id){
      var _this=this;
      _this.imgSrc=_this.imgSrc.filter(function(ele){
        return ele.imgId != id;
      });
      tip({
        content:'图片删除成功'
      });
    },
    //取消安装
    back: function(){
      comn.closeTab();
    },
    //确认安装
    confirm: function(){
      var _this=this;
      var args = comn.getArgs();
      $("#imgSrc").validate();
      if($("#imgSrc").valid()){
        for(var i= 0;i<$(".position").length;i++){
          _this.gpsData[i]['position']=$(".position")[i].value;
        };
        var imeis=_this.imgSrc.map(function(ele,index){
          return ele.imei
        });
        function unique(arr){
          var newArr=[];
          var obj={};
          for(var i=0;i<arr.length;i++){
            if(!obj[arr[i]]){
              obj[arr[i]]=1;
              newArr.push(arr[i])
            }
          }
          return newArr;
        }
        unique(imeis);
        if(_this.gpsData.length>0){
          if(unique(imeis).length==_this.gpsData.length){
            var imgUp = new Promise(function(resolve,reject){
              comn.ajax({
                url:interUrl.purchase.uploadFile,
                data:{
                  data: JSON.stringify(_this.imgSrc)
                },
                success:function(res){
                  resolve();
                }
              });
            });
            imgUp.then(function(){
              comn.ajax({
                url:interUrl.purchase.gpsInstall,
                data:{
                  date:JSON.stringify(_this.gpsData),
                  projectId:args['projectId']
                },
                success:function(res){
                  tip({
                    content:'GPS安装成功'
                  });
                  comn.closeTab();
                }
              })
            })
          }else{
            tip({
              content:'请上传gps安装照片'
            })
          }
        }else{
          tip({
            content:'请选择要安装的设备'
          })
        }
      }
    },
    //图片查看
    viewImg: function (pictures,modal) {
      var options = {
        url: 'data-src',
        title: true,
        transition: false,
        fullscreen: false,
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
      var viewer = new Viewer(pictures, options);
    }
  },
  watch: {
    imgSrc: function () {
      var pictures = document.getElementById('imgSrc');
      vm.viewImg(pictures);
    }
  },
  ready: function(){
    var args = comn.getArgs();
    this.type = args['type'];
    if(this.type != 'install'){
      $('.installed').addClass('active');
      $('.toInstall').removeClass('active');
    }
    $("input[name=orgId]").val(args['orgId']);
    $("#orgId").getOrg(args['orgId']);
    $("#supplier").getSpecificSupp();
  }
});
var dataLoad1,typeProduct,dataLoad2,operate,operation;
//安装详情列表
dataLoad1=function(params){
  var p;
  p = params.data;
  tableData(
    params,
    $.extend($("#installForm").values(), p),
    interUrl.purchase.stockClerklist
  )
};
//已安装设备列表
dataLoad2 = function(params){
  var p;
  p = params.data;
  tableData(
    params,
    $.extend($('#installForm').values(),{projectId: comn.getArgs()['projectId']}, p),
    interUrl.purchase.installList
  )
};

operation = function (value,row,index) {
  if(vm.type == 'view'){
    return ['<button type="button" class="btn btn-primary btn-xs viewImg">查看照片</button>']
  }
  return ['<div class="btn-group">' +
  '<button type="button" class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">操作' +
  '<span class="caret"></span>' +
  '</button>' +
  '<ul class="dropdown-menu">' +
  '<li><a href="javascript:;" class="remove">解除安装</a></li>' +
  '<li><a href="javascript:;" class="viewImg">查看照片</a></li>' +
  '</ul>'+
  '</div>'].join('');
};
operate = {
  //解除安装
  'click .remove': function (e,a,item,index) {
    $('#remove').modal('show');
    $('#removeConfirm').unbind('click').on('click',function () {
        comn.ajax({
            url: interUrl.purchase.unInstallGps,
            data:{
                imei: item.imei,
                projectId: item.installId,
                sim: item.sim,
                productType: item.productType,
                projectNo: comn.getArgs()['projectNo']
            },
            success: function (res) {
                $('#remove').modal('hide');
                tip({
                    content:'解除安装成功'
                });
                $('#table1').bootstrapTable('refresh',{url:'...'});
                $('#table2').bootstrapTable('refresh',{url:'...'});
            }
        })
    })
  },
  'click .viewImg': function (e,a,item,index) {
    $('#viewImg').modal('show');
    comn.ajax({
      url: interUrl.purchase.installImgList,
      data: {
        imei: item.imei
      },
      success: function (res) {
        vm.imgList = res.data;
      }
    });
  }
}
typeProduct = function(value,row,index){
  return [null,'有线','无线'][value];
};
$("#supplier").on("change",function(){
  var $productType=$("#productType");
  $productType.val('').attr("disabled",false);
  $("input[name=productType]").val("");
  if($(this).val()){
    $("#spec").getProductSpec($(this).val())
      .on('change',function(){
        var type=$(this).find("option:selected").attr('data-type');
        $productType.val(type).attr("disabled",true);
        $("input[name=productType]").val(type);
      });
  }else{
    $("#spec").html("<option value=''>--请选择--</option>");
  }
});
function isCheck(value,row,index){
  if(vm.type == 'view'){
    return {
      disabled: true
    }
  }
  return {
    disabled: false
  }
}


